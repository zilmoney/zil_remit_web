# CloudFront SPA Configuration Fix for 403 Errors

## Problem
The ZilRemit about page (`/about`) returns a 403 error when accessed directly or crawled by Google because:
- It's a React SPA route that only exists in JavaScript
- CloudFront/S3 looks for a physical file at `/about` or `/about/index.html`
- When the file doesn't exist, S3 returns 403 Forbidden

## Solution
Configure CloudFront to handle SPA routing by redirecting all requests to `index.html` with a 200 status code.

## CloudFront Configuration Steps

### Option 1: Using CloudFront Error Pages (Recommended)

1. **Go to AWS CloudFront Console**
2. **Select your distribution** (the one serving zilremit.com)
3. **Go to "Error Pages" tab**
4. **Create custom error responses:**

   **For 403 Errors:**
   - HTTP Error Code: `403: Forbidden`
   - Customize Error Response: `Yes`
   - Response Page Path: `/index.html`
   - HTTP Response Code: `200: OK`
   - Click "Create"

   **For 404 Errors:**
   - HTTP Error Code: `404: Not Found`
   - Customize Error Response: `Yes`
   - Response Page Path: `/index.html`
   - HTTP Response Code: `200: OK`
   - Click "Create"

5. **Create an invalidation** to clear the cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

### Option 2: Using CloudFront Functions (Advanced)

Create a CloudFront Function to rewrite URLs:

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check if the URI is missing a file extension
    if (!uri.includes('.')) {
        request.uri = '/index.html';
    }
    
    return request;
}
```

Then attach this function to your CloudFront distribution's viewer request.

## Files Added to Repository

1. **`public/robots.txt`** - Allows all search engine crawlers
2. **`public/_redirects`** - Netlify-style redirects (for future compatibility)
3. **This documentation file** - Instructions for CloudFront configuration

## Verification Steps

After applying the CloudFront configuration:

1. **Test direct access:**
   ```bash
   curl -I https://zilremit.com/about
   ```
   Should return `200 OK` instead of `403 Forbidden`

2. **Test with Google Search Console:**
   - Go to URL Inspection tool
   - Enter: `https://zilremit.com/about`
   - Click "Test Live URL"
   - Should show "URL is on Google" or "URL can be indexed"

3. **Request indexing:**
   - After successful test, click "Request Indexing"
   - Google will recrawl and index the page

## Why This Works

- **SPA Routing:** React Router handles routing on the client side
- **CloudFront Fallback:** All requests now return `index.html` with 200 status
- **React Takes Over:** Once `index.html` loads, React Router displays the correct page
- **SEO Friendly:** Google sees 200 status and can execute JavaScript to render content

## Alternative: Pre-render Static HTML (Future Enhancement)

For better SEO, consider using:
- **Vite SSG Plugin** - Generate static HTML for each route
- **React Snap** - Pre-render React pages to static HTML
- **Next.js** - Server-side rendering framework

This would create actual `about/index.html` files that don't require JavaScript.

## Monitoring

After deployment, monitor:
- CloudFront access logs for 403/404 errors
- Google Search Console for indexing status
- Core Web Vitals for performance impact

## Support

If issues persist after CloudFront configuration:
1. Check S3 bucket policy allows public read access
2. Verify CloudFront origin settings point to S3 website endpoint (not REST endpoint)
3. Ensure cache behaviors are configured correctly
4. Check if any WAF rules are blocking requests
