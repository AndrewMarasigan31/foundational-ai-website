# Foundational AI Systems — Website

Marketing site for [Foundational AI Systems](https://foundationalaisystems.com), a Local SEO agency.
Next.js 14 (App Router), Tailwind, Framer Motion. Navy + gold brand.

---

## Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/(main)/page.tsx` | Home — hero, service cards, why-us section, CTA band |
| `/services` | `app/(main)/services/page.tsx` | Full service detail for all offerings |
| `/about` | `app/(main)/about/page.tsx` | Company mission, how-we-work flow, who we serve |
| `/contact` | `app/(main)/contact/page.tsx` | Contact form, wired to GoHighLevel |
| `/privacy`, `/terms` | `app/(main)/privacy`, `app/(main)/terms` | Legal pages |
| `/work/car-rental` | `app/work/car-rental/page.tsx` | Case study |

Interactive pages split into a server `page.tsx` (exports `metadata` for SEO) and a client
`*Content.tsx` sibling (animations/interactivity).

---

## Local Development

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`.

---

## Contact Form / GHL Integration

The contact form (`components/ContactForm.tsx`) submits via the `submitContact` server action
(`app/(main)/actions/submitContact.ts`), which creates a contact/opportunity in GoHighLevel, then
hands off to the GHL booking widget (`NEXT_PUBLIC_GHL_CALENDAR_URL`). See
`docs/handoff-2026-06-16.md` for the full integration writeup, including known pitfalls (e.g.
omit `stageId` from opportunity creation — causes a 422).

---

## Deployment

Deployed on Vercel. Auto-deploy from `main` has been unreliable — after pushing, run
`vercel --prod` explicitly (pass `--cwd` if the CLI resolves the wrong path) and verify the
deployment before considering it live.

**Important:** the Vercel project's Root Directory setting must stay empty. Setting it to
`foundational-ai-website` breaks the build because Vercel already scopes to the connected repo
path.

---

## Brand

- Fonts: Bricolage Grotesque (display) + DM Sans (body), Playfair italic for accents
- Colors (`tailwind.config.ts`): primary gold `#C9A227`, background navy `#021524`
- No pill/tag badges, no em-dashes in copy

---

## Repo Notes

- `proposals/` — client sales collateral (proposal docs), not part of the site build
- `docs/` — handoff notes, planning docs (`docs/superpowers/`)
- `.ralph/` — config for the Ralph autonomous coding loop (`.ralph/ralph.sh --tool claude <n>`)
