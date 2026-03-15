'use strict';

(function () {
  const config = window.SITE_CONFIG || {};
  const token =
    typeof config.cloudflareWebAnalyticsToken === 'string'
      ? config.cloudflareWebAnalyticsToken.trim()
      : '';

  if (!token) {
    return;
  }

  if (document.querySelector('script[src*="static.cloudflareinsights.com/beacon.min.js"]')) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: token }));
  script.setAttribute('data-cloudflare-analytics-loader', 'true');

  if (document.body) {
    document.body.appendChild(script);
    return;
  }

  document.head.appendChild(script);
})();
