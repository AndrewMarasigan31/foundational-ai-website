# Foundational AI Systems — Website

Static marketing website for Foundational AI Systems.
Navy + gold brand. Five pages. No build step.

---

## Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Home — hero, service cards, why-us section, CTA band |
| `services.html` | `/services` | Full service detail for all three offerings with deliverables and pricing |
| `about.html` | `/about` | Company mission, how-we-work flow, who we serve |
| `contact.html` | `/contact` | Contact form with service selector and call-request toggle |
| `thank-you.html` | `/thank-you` | Contact form success page |

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Markup | HTML5 | Semantic, no framework |
| Styles | CSS3 (single file) | `assets/style.css` — CSS variables, flexbox/grid, responsive |
| Font | Inter via Google Fonts | Loaded via `<link>` in each page head |
| JS | Vanilla + shared helper | `assets/site.js` handles nav, attribution persistence, booking handoff, and optional GHL webhook submit |
| Images | `assets/logo.png` | PNG logo, 400×400px circular |
| Forms | Native HTML form | Supports Netlify Forms by default and optional direct GHL webhook submission |

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
4. Deploy. Netlify auto-assigns a URL, and the contact form works through Netlify Forms.

### Option B — GitHub Pages

1. Push to a GitHub repo
2. Go to repo Settings → Pages → Source: Deploy from branch → `main` / `root`
3. Site publishes at `https://<username>.github.io/<repo-name>/`

Note: GitHub Pages does not handle form submissions. Use Formspree or a GoHighLevel webhook if deploying there.

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

`contact.html` now uses a native HTML form plus `assets/site.js` to persist attribution and service intent across the site.

Current Phase 1 behavior:

- stores `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- stores `gclid`, `fbclid`, and `msclkid` when present
- carries CTA label, CTA page, and intended service into the form
- pre-checks the call request path when the visitor came from a booking CTA
- redirects booking-intent submissions to `thank-you.html` with a live calendar CTA handoff
- can submit the lead payload directly to a GHL inbound webhook when configured in `assets/site-config.js`

The base form markup still posts like a normal static-site form:

```html
<form name="contact" action="thank-you.html" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
</form>
```

If deploying outside Netlify, swap the form action to one of these:

### Formspree (easiest)

1. Sign up at [formspree.io](https://formspree.io) → create a new form
2. Replace `action="thank-you.html"` in `contact.html` with your endpoint:
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```
3. Remove the Netlify-only `data-netlify`, `netlify-honeypot`, and hidden `form-name` fields

### GoHighLevel Phase 1

For this repo, the Phase 1 safe pattern is:

1. Keep the native form and static pages
2. Add HighLevel External Tracking in production
3. Put the inbound workflow webhook URL in `assets/site-config.js`
4. Use the hidden attribution fields already present in `contact.html`
5. Send booking-intent users to the live calendar widget after submit

The live custom fields already created in GHL for `locationId AAPY6H2WOEr7wRAWxdSO` are:

- `Offer / Service Interest`
- `Landing Page URL`
- `utm_source`
- `utm_medium`
- `utm_campaign`

The current form already captures the values needed to populate those fields.

This repo now also includes a Netlify serverless relay at:

`netlify/functions/ghl-intake.js`

That function can:

- upsert the contact in GHL
- write the five core custom fields
- add source / offer / intent tags
- create a `New Lead` opportunity in the current Marketing Pipeline

This repo also now includes:

`netlify/functions/ghl-booking-status.js`

That function can:

- check whether the contact has a real appointment yet
- promote the matching opportunity into a dedicated booked stage
- keep the booked-stage logic separate from the current sales stages

This avoids exposing the PIT in the browser and removes the dependency on a GHL inbound workflow for the basic lead-capture path.

`assets/site-config.js` now exposes the only values the site needs:

```js
window.FAS_SITE_CONFIG = {
  bookingCalendarUrl: "https://api.leadconnectorhq.com/widget/booking/...",
  ghlWebhookMode: "live",
  ghlWebhookUrl: "/.netlify/functions/ghl-intake",
  ghlWebhookTimeoutMs: 8000,
  ghlBookingStatusUrl: "/.netlify/functions/ghl-booking-status"
};
```

Webhook mode behavior:

- `off`: skip GHL and use the host fallback path
- `dry-run`: do not send a lead anywhere; log/store the payload locally and continue to `thank-you.html`
- `live`: POST JSON to the configured HighLevel webhook URL

Fallback behavior is intentionally host-aware:

- Netlify host or `data-netlify` form present: native submit remains available as the fallback path
- Local preview / other static hosts with no live endpoint: the site redirects in preview mode so UX can be tested without pretending a lead was captured

If `ghlWebhookMode` is `live` and `ghlWebhookUrl` is blank or fails, the site falls back safely and records the delivery mode for the thank-you page note.

The JSON payload sent to the webhook looks like this:

```json
{
  "submittedAt": "2026-06-15T07:30:00.000Z",
  "contact": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@smithplumbing.com",
    "phone": "(512) 555-0100",
    "businessName": "Smith Plumbing LLC",
    "city": "Austin, TX"
  },
  "lead": {
    "service": "gbp-audit",
    "serviceLabel": "GBP Audit & Optimization",
    "wantsCall": true,
    "message": "Need help getting more map pack calls."
  },
  "attribution": {
    "landingPageUrl": "https://foundationalaisystems.com/contact?utm_source=google",
    "landingPagePath": "/contact",
    "originalEntryUrl": "https://foundationalaisystems.com/",
    "currentPageUrl": "https://foundationalaisystems.com/contact",
    "referrer": "https://google.com/",
    "ctaLabel": "Book a Free Strategy Call",
    "ctaPage": "index.html",
    "timezone": "America/Chicago",
    "language": "en-US",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "brand",
    "utm_term": "local seo agency",
    "utm_content": "hero-button",
    "gclid": "abc123",
    "fbclid": "",
    "msclkid": ""
  },
  "pageContext": {}
}
```

Use the workflow to:

1. Create or update the contact from `contact.email`
2. Map `lead.serviceLabel` into `Offer / Service Interest`
3. Map `attribution.landingPageUrl` into `Landing Page URL`
4. Map `attribution.utm_source`, `attribution.utm_medium`, and `attribution.utm_campaign` into the existing custom fields
5. If `lead.wantsCall` is true, tag the lead for calendar follow-up and send them through the booking handoff page so the site can watch for the real appointment

### Safe Local Testing

Use this repo without any secrets:

1. Set `ghlWebhookMode: "dry-run"` in `assets/site-config.js`
2. Run a local server and submit the contact form
3. Confirm the thank-you page shows the dry-run note
4. Open DevTools and inspect the `GHL dry-run payload` console log or `sessionStorage.fasContactSubmission`

This verifies:

- service selection and booking-intent carry through correctly
- hidden attribution fields are being hydrated
- thank-you routing behaves correctly for standard vs booking-intent leads

When the real webhook exists, switch to:

```js
ghlWebhookMode: "live",
ghlWebhookUrl: "/.netlify/functions/ghl-intake"
```

### Netlify Function Setup

If this site is deployed on Netlify, set these environment variables in the Netlify dashboard:

- `GHL_PIT`
- `GHL_LOCATION_ID`
- `GHL_PIPELINE_ID` (optional if using the current Foundational AI Systems pipeline)
- `GHL_NEW_LEAD_STAGE_ID` (optional if using the current `New Lead` stage)
- `GHL_BOOKED_STAGE_ID` (required if you want the booking-sync function to move opportunities after an appointment is created)

Current defaults embedded in the function match the live objects I verified on June 15, 2026:

- Location: `AAPY6H2WOEr7wRAWxdSO`
- Pipeline: `Marketing Pipeline` → `rfnYDQwA3yas4OIP4NSA`
- Stage: `New Lead` → `4d237f32-29f2-4ee8-9e68-da32ab9cccf8`
- Stage: `Booked` → `ffa4c61e-5e02-4754-96a7-a536cda6c14c`

Important limitation:

- The relay covers contact creation, tagging, custom field mapping, and opportunity creation.
- The booking-status function can promote an opportunity after a real appointment is detected, but only after you create a dedicated `Booked` stage in GHL and set `GHL_BOOKED_STAGE_ID`.
- Custom reminder sequences still need to be configured inside GHL if required.

### Deployment Reality Check

This is a static site. Without one of the following, no lead is actually captured:

- Netlify Forms on a Netlify deployment
- a live HighLevel inbound workflow webhook in `live` mode
- another external form backend the operator chooses to wire in

GitHub Pages or plain local preview are suitable for UX testing, not lead capture, unless `ghlWebhookMode` points at a real backend.

### Netlify Forms

Already configured. No extra code changes needed.

---

## File Structure

```
foundational-ai-website/
├── index.html          # Home
├── services.html       # Services
├── about.html          # About
├── contact.html        # Contact
├── thank-you.html      # Form success page
├── book-call.html      # Booking handoff page with live sync status
├── netlify/
│   └── functions/
│       ├── ghl-intake.js         # GHL lead intake relay
│       └── ghl-booking-status.js # Appointment check + booked-stage promotion
└── assets/
    ├── style.css       # All styles — edit brand colors in :root variables
    ├── site-config.js  # Booking URL + GHL endpoint config
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
