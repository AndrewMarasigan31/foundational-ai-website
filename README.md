# Foundational AI Systems — Website

Static marketing website for [Foundational AI Systems](https://foundationalaIsystems.com).
Navy + gold brand. Four pages. No build step.

---

## Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Home — hero, service cards, why-us section, CTA band |
| `services.html` | `/services` | Full service detail for all three offerings with deliverables and pricing |
| `about.html` | `/about` | Company mission, how-we-work flow, who we serve |
| `contact.html` | `/contact` | Contact form with service selector and call-request toggle |

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Markup | HTML5 | Semantic, no framework |
| Styles | CSS3 (single file) | `assets/style.css` — CSS variables, flexbox/grid, responsive |
| Font | Inter via Google Fonts | Loaded via `<link>` in each page head |
| JS | Vanilla inline | Mobile nav toggle only — ~10 lines per page |
| Images | `assets/logo.png` | PNG logo, 400×400px circular |
| Forms | Static `action="#"` | Needs a backend wired up before going live (see below) |

No npm, no bundler, no framework. Open `index.html` in a browser and it works.

---

## Local Preview

```bash
cd foundational-ai-website
python3 -m http.server 8080
# open http://localhost:8080
```

Or with Node:

```bash
npx serve .
```

---

## Deployment

### Option A — Netlify (recommended, free tier)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select repo, leave build command blank, set publish directory to `/` (root)
4. Deploy — Netlify auto-assigns a URL, custom domain available in settings

For the contact form, add `netlify` attribute to the `<form>` tag in `contact.html` and change `action="#"` to `action="/thank-you"`. Netlify handles the rest.

```html
<form name="contact" method="POST" data-netlify="true" action="/thank-you">
  <input type="hidden" name="form-name" value="contact">
  ...
</form>
```

### Option B — GitHub Pages

1. Push to a GitHub repo
2. Go to repo Settings → Pages → Source: Deploy from branch → `main` / `root`
3. Site publishes at `https://<username>.github.io/<repo-name>/`

Note: GitHub Pages does not handle form submissions. Use Formspree (see below).

### Option C — Lightsail / nginx

```bash
# Copy files to web root
sudo cp -r /path/to/foundational-ai-website/* /var/www/html/

# Or serve from a subdirectory
sudo cp -r /path/to/foundational-ai-website /var/www/html/site
```

Ensure nginx is configured to serve `index.html` at the root:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

---

## Contact Form Setup

The form in `contact.html` currently uses `action="#"` with a client-side demo handler. Before going live, swap in one of these:

### Formspree (easiest)

1. Sign up at [formspree.io](https://formspree.io) → create a new form
2. Replace `action="#"` in `contact.html` with your endpoint:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Remove the demo submit handler JS block at the bottom of the file

### GoHighLevel webhook

1. In GHL, create a form or webhook trigger
2. Set `action` to the GHL form embed URL or webhook endpoint
3. Match field `name` attributes to GHL custom field keys

### Netlify Forms

See Option A above — zero config needed if deploying to Netlify.

---

## File Structure

```
foundational-ai-website/
├── index.html          # Home
├── services.html       # Services
├── about.html          # About
├── contact.html        # Contact
└── assets/
    ├── style.css       # All styles — edit brand colors in :root variables
    └── logo.png        # Brand logo
```

## Brand Colors (CSS variables in `assets/style.css`)

```css
--c-bg: #080F1D;          /* deep navy background */
--c-surface: #0D1A30;     /* card / section surface */
--c-gold: #C9A227;        /* primary brand gold */
--c-gold-hover: #D4B340;  /* gold hover state */
--c-white: #FFFFFF;
--c-gray-light: #A8BBD0;  /* body text */
--c-gray: #7B8FA6;        /* muted / labels */
```

To change the brand color, update `--c-gold` and `--c-gold-hover` in `:root`.

---

## Pricing Reference

| Service | Price |
|---------|-------|
| AI-Powered Local SEO Content Package | $750/month + $200 onboarding |
| GBP Audit & Optimization | $500 one-time |
| Already Done Website | $1,200 one-time + $75/month optional hosting |
