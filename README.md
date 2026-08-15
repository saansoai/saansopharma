# Saanso Pharma — website

A ground-up redesign replacing the legacy `saansopharma.com`, which was a
repurposed software-agency template with no server rendering and no SEO.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx      Fonts, metadata, Organization JSON-LD
    page.tsx        Section assembly
    globals.css     Design tokens, keyframes, reveal behaviour
    sitemap.ts      / robots.ts
  components/       One file per homepage section
  content/site.ts   Every piece of copy and data on the site
public/images/      Plant render, division marks
_legacy/            Audit of the old site + salvaged assets
```

**All copy lives in `src/content/site.ts`.** Components read from it and contain
no hardcoded content, so text changes never require touching layout.

## Page order

1. **Hero** — the Eluru facility, full screen
2. **About** — the name, the numbers, mission/vision and the standards band
3. **Divisions** — therapeutic divisions, interactive
4. **Capacity** — installed capacity per line with proportional bars, plus quality assurance
5. **Journey** — year-on-year progress rail toward the stated 2030 ambition
6. **Insights** — articles and company news
7. **Footer** — closing statement and directory

## Design system

Palette is derived from the logo — a deep royal blue and a lighter cyan against
navy ink and warm paper neutrals. No secondary hues, and no saturated
red/green/yellow anywhere in the UI. Type is Newsreader (display) over Inter
(everything functional). Tokens are defined in the `@theme` block of
`globals.css`; use those rather than raw hex values.

Motion is scroll-triggered reveal only, driven by one shared
`IntersectionObserver` in `ScrollReveal`. Everything respects
`prefers-reduced-motion`, and the page degrades to fully readable HTML with
JavaScript disabled.

## Outstanding — client to supply

These are rendered as visible placeholders rather than invented. Search the
codebase for `PENDING` to find each one.

| Item | Where | Notes |
|---|---|---|
| **The sixth division** | `content/site.ts` → `divisions` | The company deck states six divisions; only five are documented anywhere. Likely Nutrition, but that is inference — name it and the Divisions section picks it up. |
| **Facility photography** | `public/images/facility.jpeg` | Currently an architectural render. Replace at the same path and the hero needs no layout change. Note the render is a cut-out on a flat `#f7f7f7` ground, which the hero relies on via `mix-blend-multiply`; a normal photograph with a real sky will need that class removed. |
| **Roadmap 2027–2029** | `content/site.ts` → `milestones` | The 2028 entry is a placeholder. The progress percentage recalculates automatically from whatever milestones are present. |
| **Phone number** | `content/site.ts` → `contact.phone` | Set to `null`; the footer renders it only once a value exists. None existed on the legacy site. |
| **Social links** | `content/site.ts` → `contact.social` | Only LinkedIn is known. |
| **Leadership team** | — | Not yet built. Slots naturally between About and Divisions once names, photos and bios are available. |
| **Logo vector** | `components/Logo.tsx` | The mark is currently redrawn as inline SVG because the original ships only as a 12KB bitmap with baked-in black type that cannot invert on the dark hero. Swap in the client's vector when available. |

## Not yet built

The homepage is complete. Interior pages — divisions, manufacturing, R&D,
careers, individual articles — still need building; the legacy site's content
for all of them is captured in `_legacy/CONTENT-AUDIT.md`. Article links
currently point at in-page anchors as placeholders.
