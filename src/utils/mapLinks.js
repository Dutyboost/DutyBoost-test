/**
 * Build a walking-directions link for a destination.
 * Apple Maps on Apple devices, Google Maps everywhere else.
 */
export function buildDirectionsUrl(destination) {
  const query = encodeURIComponent(destination);
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isApple = /iPhone|iPad|iPod|Macintosh/.test(ua);

  return isApple
    ? `https://maps.apple.com/?daddr=${query}&dirflg=w`
    : `https://www.google.com/maps/dir/?api=1&destination=${query}&travelmode=walking`;
}