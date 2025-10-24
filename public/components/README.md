# Shared Components

This directory contains reusable header and footer components that are used across all static HTML pages on the ZilRemit website.

## Files

### `header.html`
The navigation header used across all pages. Contains:
- ZilRemit logo
- Desktop navigation menu (Home, Features, Rates, Blog, Contact)
- Mobile navigation menu
- Sign Up button

### `footer.html`
The footer used across all pages. Contains:
- ZilRemit logo and description
- Social media links (Facebook, Twitter, Instagram, LinkedIn, Pinterest)
- Quick Links section (Home, Features, Exchange Rates, Blog, Contact)
- Support section (Help Center, Disclaimer, Privacy Policy, Terms & Conditions, Cookie Policy, Security)
- Copyright notice

### `loader.js`
JavaScript file that dynamically loads the header and footer into pages that use placeholders.

## How to Edit

### To update the header on ALL pages:
1. Edit `components/header.html`
2. Copy to deployment directories:
   ```bash
   cp components/header.html public/components/
   cp components/header.html dist/components/
   ```
3. Commit and push changes

### To update the footer on ALL pages:
1. Edit `components/footer.html`
2. Copy to deployment directories:
   ```bash
   cp components/footer.html public/components/
   cp components/footer.html dist/components/
   ```
3. Commit and push changes

## Pages Using These Components

The following pages automatically load header and footer from this directory:
- `disclaimer.html`
- `terms-and-condition.html`
- `privacy-policy.html`
- `cookie-policy.html`

## How It Works

Pages using shared components have two placeholders:
```html
<div id="header-placeholder"></div>
<!-- Main content here -->
<div id="footer-placeholder"></div>
<script src="/components/loader.js"></script>
```

The `loader.js` script fetches the header and footer HTML and injects them into these placeholders when the page loads.

## Benefits

- **Single source of truth**: Edit header/footer once, changes apply everywhere
- **Consistency**: All pages use the same header and footer design
- **Easy maintenance**: No need to update multiple files for simple changes
- **Quick updates**: Change navigation links or footer content in seconds

## Important Notes

- Always copy changes to both `public/` and `dist/` directories for deployment
- The React app (home page) uses its own Footer component at `src/components/layout/Footer.jsx`
- Blog pages and static pages use these HTML components

