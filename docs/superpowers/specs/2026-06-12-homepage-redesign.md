# PRD: Homepage Redesign — Next.js + Tailwind + Framer Motion

## Problem Statement

The current website is a static HTML/CSS site with no build system, no component reuse, and no animations. The design, while functional, lacks the visual polish and interactivity expected of a premium AI consultancy. Placeholder images are used for hero and dashboard visuals. Every page duplicates the full nav and footer HTML. There is no framework to support future interactive features or routing.

## Solution

Migrate the homepage to a Next.js 14 (App Router) project styled with Tailwind CSS v3, animated with Framer Motion, and built around reusable React components. Replace all placeholder images with code-based animated visual components. Reintegrate sections from the current site (Why Us, FAQ, CTA Band) that were absent from the Stitch design reference. The result is a complete, fully responsive, visually premium homepage that serves as the foundation for migrating the remaining three pages (Services, About, Contact).

## User Stories

1. As a visitor, I want to see a sticky navigation bar so that I can access any page without scrolling back to the top.
2. As a visitor on mobile, I want the navigation to collapse into a hamburger menu so that the header does not take up excessive space on small screens.
3. As a visitor, I want the navigation background to blur and show a subtle border so that I can still read the nav links over any background content.
4. As a visitor, I want to see a bold hero headline ("Your Competitors Rank Higher. That's Fixable.") so that the value proposition is immediately clear.
5. As a visitor, I want to see a pill-label eyebrow above the hero headline so that I know who this page is for at a glance.
6. As a visitor, I want two hero CTA buttons ("Book a Free Audit Call" and "See the Services") so that I can take immediate action or learn more.
7. As a visitor, I want the hero to use a split layout on desktop (text left, visual right) so that the page feels modern and editorial.
8. As a visitor, I want the hero right panel to show an animated local pack visualization (not a stock image) so that the service offering is immediately illustrated.
9. As a visitor, I want the local pack visualization to include animated elements (pulsing Top 3 badge, staggered listing entry) so that it feels dynamic and premium.
10. As a visitor, I want to see a "Business Growth Engine" dashboard section so that I understand the data-driven nature of the service.
11. As a visitor, I want the dashboard section to show a bar chart with animated entry on scroll so that the section feels alive rather than static.
12. As a visitor, I want two stat cards ("42.8K views", "94% retention") with numbers that count up on scroll entry so that the metrics feel impactful.
13. As a visitor, I want to see a "What We Do" services section so that I understand what is offered before booking a call.
14. As a visitor, I want the services to be displayed in an asymmetric bento grid (GBP Audit spans wide, others narrower) so that the primary service is visually emphasized.
15. As a visitor, I want each service card to lift and show a gold border glow on hover so that the cards feel interactive.
16. As a visitor, I want the GBP Audit service card to include a secondary animated mock UI panel so that the service is visually demonstrated.
17. As a visitor, I want a "How It Works" section with four numbered steps so that I understand the engagement process.
18. As a visitor, I want the process steps to be displayed as circular numbered icons connected by a horizontal line on desktop so that the sequence is visually clear.
19. As a visitor, I want the active step (step 1) to be gold-highlighted and subsequent steps to activate as I scroll so that the sequence feels intentional.
20. As a visitor, I want a "Why Foundational AI Systems" section so that I understand the differentiators before deciding to book.
21. As a visitor, I want the Why Us items displayed as surface cards with large faded gold numbers so that the section has visual weight without clutter.
22. As a visitor, I want an FAQ section with six questions so that my objections are addressed before I book a call.
23. As a visitor, I want each FAQ item to expand and collapse on click so that the page stays scannable.
24. As a visitor, I want a closing CTA band with the headline "Start with a free audit call. No pitch, no pressure." so that there is a final conversion prompt before the footer.
25. As a visitor, I want the CTA band to have a primary and secondary button so that I can book a call or view services.
26. As a visitor, I want the footer to show brand, Services, Company, Legal, and Contact columns so that I can navigate to any section from the bottom of the page.
27. As a visitor, I want the footer to include LinkedIn and Twitter social icon links so that I can follow the brand.
28. As a visitor on mobile, I want all multi-column grids to collapse to a single column so that the content is fully readable on small screens.
29. As a visitor, I want all section headings to fade and slide in on scroll entry so that the page feels polished and progressive.
30. As a developer, I want a shared `layout.tsx` that wraps all pages with Nav and Footer so that I never duplicate header/footer HTML across pages.
31. As a developer, I want an `AnimatedSection` wrapper component so that scroll-triggered entry animations are consistent and reusable across all sections.
32. As a developer, I want `LocalPackVisual` and `DashboardVisual` to be self-contained components with no external image dependencies so that they load instantly and look crisp at any resolution.

## Implementation Decisions

### Tech Stack
- **Framework:** Next.js 14, App Router
- **Styling:** Tailwind CSS v3 with custom color tokens matching the DESIGN.md palette (primary `#C9A227`, background `#021524`, surface `#0e2131`)
- **Animation:** Framer Motion — `useInView` for scroll entry, `motion.div` for hover and stagger
- **Font:** Plus Jakarta Sans (Google Fonts) — matches Stitch design reference
- **Icons:** Material Symbols Outlined (Google Fonts CDN)
- **Charts:** Recharts for DashboardVisual bar chart (lightweight, SSR-compatible with dynamic import)

### Project Structure
```
app/
  layout.tsx         ← shared Nav + Footer
  page.tsx           ← homepage
  services/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  Nav.tsx
  Footer.tsx
  shared/
    AnimatedSection.tsx
  visuals/
    LocalPackVisual.tsx
    DashboardVisual.tsx
  sections/
    HeroSection.tsx
    DashboardSection.tsx
    ServicesSection.tsx
    HowItWorksSection.tsx
    WhyUsSection.tsx
    FAQSection.tsx
    CTABand.tsx
```

### AnimatedSection
Wraps children in a `motion.div` that uses `useInView` with `once: true`. Accepts optional `direction` prop (`up` | `left` | `right`) to vary the entry animation. Default: fade up 24px.

### LocalPackVisual
Pure SVG + CSS component. Renders three mock business listing cards with star ratings, a map pin SVG, and a "Top 3 Local Pack" badge. The badge pulses via a CSS `animate-pulse` class. Listings stagger in using Framer Motion `staggerChildren` on mount.

### DashboardVisual
Split into two parts: a `BarChartPanel` (Recharts `BarChart`, dynamically imported with `ssr: false`) and two `StatCard` components. Each `StatCard` uses Framer Motion's `useMotionValue` + `useTransform` to count from 0 to the target number when the section enters the viewport.

### ServiceCard
Accepts props: `title`, `description`, `icon` (Material Symbol name), `featured` (boolean). Featured cards span `md:col-span-8`; standard cards span `md:col-span-4`. Hover state managed by Tailwind `group` + `group-hover` utilities.

### FAQSection
Each item manages its own `isOpen` boolean state with `useState`. The answer panel uses Framer Motion `AnimatePresence` + `motion.div` for smooth height animation on open/close.

### HowItWorksSection
Step circles use a `isActive` boolean. On desktop, a `motion.div` overlay animates the connecting line from left to right using `useInView`. Step 1 is gold by default; steps 2–4 transition to gold color on hover.

### Color Tokens (tailwind.config.ts)
Mirrors DESIGN.md tokens exactly — `primary`, `background`, `surface`, `on-surface`, `outline`, etc. — so Tailwind utilities like `bg-primary` and `text-on-surface` work throughout.

### Content
All copy sourced from the existing HTML pages. Nav links: `Services`, `About`, `Book a Call`. Services: GBP Audit, Local SEO Content, Website Built to Convert, Performance Tracking. How It Works: 4 steps with full copy. Why Us: 3 items. FAQ: 6 Q&As.

## Testing Decisions

A good test verifies observable external behavior — what a user or consumer sees — not implementation details like internal state or CSS class names.

### Modules with tests
- **`FAQSection`** — test that clicking a question expands the answer panel and clicking again collapses it (tests the accordion contract)
- **`LocalPackVisual`** — snapshot test to confirm it renders without throwing (guards against animation library breakage)
- **`DashboardVisual`** — render test confirming stat cards display their target values after animation (mocked `useInView` returning true)

### Visual verification
All other UI components are verified visually by Ralph's dev-browser skill during implementation. Not every component needs a unit test — the browser verification pass is the acceptance gate for UI stories.

## Out of Scope

- Services, About, and Contact page migration (homepage first; other pages follow in a subsequent PRD)
- CMS integration or dynamic content
- Analytics / tracking scripts
- Authentication
- Contact form backend / email delivery
- SEO metadata beyond basic `<title>` and `<meta description>`
- Dark/light mode toggle (dark mode only)
- Pricing information (removed from site in a prior commit)

## Further Notes

- The Stitch design file (`assets/stitch_foundational_ai_systems_homepage.zip`) contains `code.html`, `screen.png`, and `DESIGN.md`. These are the visual reference. The `code.html` maps almost directly to JSX.
- External images in the Stitch file (`lh3.googleusercontent.com`) must not be used in production — all visuals are replaced by the animated React components above.
- The `assets/logo.png` (400×400px circular PNG) should be copied into `public/` for use with Next.js `Image`.
- Ralph should run `npm run build` and typecheck after each story before marking it complete.
