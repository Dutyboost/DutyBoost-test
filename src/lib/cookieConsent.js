// Granular cookie consent helper — stores per-category consent in localStorage.
// Categories: essential (always on), functional, analytics.

export const CONSENT_VERSION = 2;
const STORAGE_KEY = 'dutyboost_cookie_consent';
const LEGACY_KEY = 'cookie_consent';

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...parsed, essential: true };
    }
    // Migrate the legacy accept/decline values from the previous banner.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === 'accepted' || legacy === 'declined') {
      const migrated = {
        version: 1,
        essential: true,
        functional: legacy === 'accepted',
        analytics: legacy === 'accepted',
        ts: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {}
  return null;
}

export function hasConsent(category) {
  if (category === 'essential') return true;
  const c = getCookieConsent();
  return Boolean(c && c[category]);
}

export function setCookieConsent({ functional, analytics }) {
  const value = {
    version: CONSENT_VERSION,
    essential: true,
    functional: !!functional,
    analytics: !!analytics,
    ts: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    localStorage.removeItem(LEGACY_KEY);
  } catch {}
  return value;
}

export function resetCookieConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch {}
}