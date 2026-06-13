import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const SESSION_KEY = 'db_traffic_session';

function initSession() {
  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached) return JSON.parse(cached);

  let referrer_domain = 'direct';
  try {
    if (document.referrer) {
      const url = new URL(document.referrer);
      const own = window.location.hostname;
      referrer_domain = (url.hostname === own || url.hostname.includes('base44.app'))
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
      utm_source: session.utm_source,
      utm_medium: session.utm_medium,
      utm_campaign: session.utm_campaign,
      utm_content: session.utm_content,
    }).catch(() => {});

  }, [location.pathname]);

  return null;
}