/**
 * Cloudflare Workers script to serve static files.
 * This is the entry point for the nowworksai-website Workers service.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Default to index.html for root or empty paths
    if (path === '/' || path === '') {
      path = '/index.html';
    }

    try {
      // Try to fetch the asset
      const assetResponse = await env.ASSETS.fetch(request);

      if (assetResponse.status === 200) {
        return assetResponse;
      }
    } catch (e) {
      // Asset not found, continue to fallback
    }

    // Fallback to index.html for SPA-style routing
    return env.ASSETS.fetch(new Request(url.origin + '/index.html', request));
  },
};
