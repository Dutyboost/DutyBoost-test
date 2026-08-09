import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { hasConsent } from '@/lib/cookieConsent';

const SESSION_KEY = 'db_traffic_session';

// Map IANA timezone → country name (focused on Europe + key global markets)
const TIMEZONE_TO_COUNTRY = {
  'Europe/Amsterdam': 'Netherlands',
  'Europe/Brussels': 'Belgium',
  'Europe/Paris': 'France',
  'Europe/Berlin': 'Germany',
  'Europe/Vienna': 'Austria',
  'Europe/Zurich': 'Switzerland',
  'Europe/Madrid': 'Spain',
  'Europe/Lisbon': 'Portugal',
  'Europe/Rome': 'Italy',
  'Europe/Dublin': 'Ireland',
  'Europe/London': 'United Kingdom',
  'Europe/Oslo': 'Norway',
  'Europe/Stockholm': 'Sweden',
  'Europe/Copenhagen': 'Denmark',
  'Europe/Helsinki': 'Finland',
  'Europe/Warsaw': 'Poland',
  'Europe/Prague': 'Czech Republic',
  'Europe/Budapest': 'Hungary',
  'Europe/Athens': 'Greece',
  'Europe/Luxembourg': 'Luxembourg',
  'Atlantic/Canary': 'Spain',
  'America/New_York': 'United States',
  'America/Chicago': 'United States',
  'America/Denver': 'United States',
  'America/Los_Angeles': 'United States',
  'America/Toronto': 'Canada',
  'America/Vancouver': 'Canada',
  'America/Sao_Paulo': 'Brazil',
  'America/Mexico_City': 'Mexico',
  'Asia/Dubai': 'United Arab Emirates',
  'Asia/Tokyo': 'Japan',
  'Asia/Singapore': 'Singapore',
  'Asia/Hong_Kong': 'Hong Kong',
  'Asia/Shanghai': 'China',
  'Asia/Kolkata': 'India',
  'Australia/Sydney': 'Australia',
  'Pacific/Auckland': 'New Zealand',
};

function detectCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_TO_COUNTRY[tz]) return TIMEZONE_TO_COUNTRY[tz];
    // Fallback: extract region from timezone (e.g. "Europe/Amsterdam" → "Amsterdam")
    if (tz) return tz.split('/').pop().replace(/_/g, ' ');
  } catch {}
  // Final fallback: navigator.language region code
  try {
    const parts = navigator.language.split('-');
    if (parts.length >= 2) return parts[1];
  } catch {}
  return 'Unknown';
}

function initSession() {
  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached) return JSON.parse(cached);

  let referrer_domain = 'direct';
  try {
    if (document.referrer) {
      const url = new URL(document.referrer);
      const own = window.location.hostname;
      referrer_domain = (url.hostname === own || url.hostname.includes('base44'))
        ? 'internal'
        : url.hostname;
    }
  } catch {}

  const params = new URLSearchParams(window.location.search);
  const session = {
    referrer_domain,
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export default function TrafficTracker() {
  const location = useLocation();

  useEffect(() => {
    // Analytics tracking only fires when the visitor has consented to analytics cookies.
    if (!hasConsent('analytics')) return;

    const session = initSession();
    const page_path = location.pathname;

    // 1. Fire base44 built-in analytics
    base44.analytics.track({
      eventName: 'page_view',
      properties: {
        page: page_path,
        referrer: session.referrer_domain,
        ...(session.utm_source && { utm_source: session.utm_source }),
        ...(session.utm_medium && { utm_medium: session.utm_medium }),
        ...(session.utm_campaign && { utm_campaign: session.utm_campaign }),
      }
    });

    // 2. Store in PageVisit entity for in-app dashboard
    base44.entities.PageVisit.create({
      page_path,
      referrer_domain: session.referrer_domain,
      country: detectCountry(),
      utm_source: session.utm_source,
      utm_medium: session.utm_medium,
      utm_campaign: session.utm_campaign,
      utm_content: session.utm_content,
    }).then(async (visit) => {
      // 3. Enrich with IP → org lookup (fire and forget)
      try {
        const ipResp = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResp.json();
        if (ip && visit?.id) {
          base44.functions.invoke('enrichPageVisit', { visit_id: visit.id, ip_address: ip }).catch(() => {});
        }
      } catch {}
    }).catch(() => {});

  }, [location.pathname]);

  return null;
}