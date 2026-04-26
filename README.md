# NowWorksAI Website

Production-ready static website for NowWorksAI — AI Enablement Company.

## Files

- `index.html` — Main site
- `styles.css` — All styles
- `script.js` — Interactivity (animations, mobile menu, counters)

## Deploy to Cloudflare Pages

### Option 1: Using Wrangler CLI (recommended)

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 2: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project** → **Direct upload**
3. Select the `website/` folder
4. Click **Deploy site**
5. Your site will be live at `nowworksai.pages.dev`

### Option 3: Using Zoho Sites

1. Export the `website/` folder as a ZIP
2. Go to [Zoho Sites](https://www.zoho.com/sites/)
3. Create a new site and import your HTML/CSS/JS files
4. Configure your domain in Zoho Sites settings

## Brand Assets

Logo and icon files are located in `../Brand Icons/`:
- `NowWorksAI_logo_full_gradient.svg` — Full logo with gradient
- `NowWorksAI_icon_gradient.svg` — Icon-only version
- `nowworksai_logo_package/` — PNG variants (favicon, social, etc.)

## Tech Stack

- Pure HTML / CSS / JavaScript — no framework, no dependencies
- Google Fonts: Syne (display) + Plus Jakarta Sans (body)
- CSS custom properties for brand tokens
- Intersection Observer for scroll animations
- Fully responsive (mobile, tablet, desktop)
