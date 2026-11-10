# Portfolio redesign: progress and handoff

Last updated: 10 Nov 2026. Branch: `redesign/hero`, draft PR [#3](https://github.com/PCollinx/portfolio/pull/3).
Live preview of this branch: https://portfolio-git-redesign-hero-collins-projects-3ea7974f.vercel.app

## Goal

A full redesign and content refresh of the portfolio, done one section at a time. Each section is
reviewed in light and dark mode, on desktop and on phone, before moving to the next.

## Where things stand

| Step | Status |
| --- | --- |
| 1. Clean up leftover files | Done, merged in PR #2 |
| 2. Pick a design direction | Done: **Open Sky** = light mode, **Dusk** = dark mode |
| 3. Hero + header | Built in code on `redesign/hero` (PR #3, draft), waiting for your review on the preview |
| 4. Projects | Next. Not started |
| 5. About + Experience | Not started |
| 6. Skills | Not started |
| 7. Contact + Footer | Not started |

Design mockups (all three directions, plus the hero in four screens) are on the design canvas:
https://claude.ai/artifact/JKxNwM9RoawzwUAPCBQXoy

## Run it

```bash
git fetch origin && git checkout redesign/hero
npm install
npm run dev        # http://localhost:3000
npx eslint . && npx tsc --noEmit && npm run build   # checks before pushing
```

Pushing to the branch updates the Vercel preview automatically.

## Design system

Use the same layout in both modes; only colours change. Dark mode is class-based (`.dark` on `<html>`,
set by `ThemeProvider`), so use Tailwind `dark:` classes.

| Token | Light (Open Sky) | Dark (Dusk) |
| --- | --- | --- |
| Hero background | `#CFE6F6` sky | `#0E1726` night |
| Page background | `#F7FBFE` | `#0A111D` |
| Text | `#12263A` | `#E8EEF6` |
| Secondary text | `#2E4A61` | `#B7C4D6` |
| Accent (buttons, links) | `#B4461A` (white text) | `#FF9B6E` (dark text `#0E1726`) |
| Borders | `#B9CFE0` / `#DCE8F1` | `#2C3D57` / `#3A4D6A` |
| Raised surface | `#FFFFFF` | `#162236` |

- **Type:** Fraunces (500/600) for headings via the `font-display` class; Inter for everything else
  (default `font-sans`). Both load through `next/font` in `app/layout.tsx`.
- **Layout:** content max width 1200px; phone side padding 20px.
- **Buttons:** pill shaped (`rounded-full`), at least 44px tall. Icon buttons need an `aria-label`.
- **Motion:** every animation must stop for `prefers-reduced-motion`.
- **Mobile first:** every section ships with a phone layout (390px wide), reviewed alongside desktop.

## What's in the hero branch

| File | What it does |
| --- | --- |
| `components/sections/Hero.tsx` | Hero content: avatar, label, headline, intro, CTAs, socials, scroll cue |
| `components/hero/Sky.tsx` | Background: clouds by day, moon, stars and dark clouds by night |
| `components/hero/Parrot.tsx` | The animated parrot (details below) |
| `components/layout/SiteHeader.tsx` | Fixed header, theme toggle, phone menu. Replaces `Navigation` and `MobileBottomNav` (those files are now unused and can be deleted) |
| `app/globals.css` | `@custom-variant dark`, font tokens, new palette variables, sky keyframes |
| `public/parrot.json` | Lottie animation |

### The parrot

- **Asset:** "Parrot" by Summer on LottieFiles, free under the Lottie Simple License:
  https://lottiefiles.com/free-animation/parrot-ApC1HPHYZP. It is a 21-frame flapping loop that faces left.
  **It has no legs and no landing or perching frames.**
- **How it works:** `Parrot.tsx` uses `lottie-web` (light build) for the wings and a
  `requestAnimationFrame` loop for the flight path. Each frame it reads the avatar's real position
  (`getBoundingClientRect`), so the perch stays correct at any screen size.
- **Loop (18 s):** flies in from the right → slows and lands on the avatar's upper-right rim → perches
  (frozen on frame 13, wings folded, rotated upright) → lifts off up-left → off screen, and immediately
  comes back from the right.
- **Tuning knobs** (constants at the top of `Parrot.tsx`):
  - `PERCH_RIM_X`: where along the avatar's top edge it sits (0 = centre, 1 = right edge). Now `0.62`.
  - `BELLY_OFFSET_Y`: raises or lowers the body on the rim. Higher numbers lift it.
  - `PERCH_ROTATION`, `PERCH_FRAME`: perched pose.
  - `APPROACH_END`, `LAND_END`, `PERCH_END`, `TAKEOFF_END`, `CYCLE_MS`: timing of each phase.
  - Size: `perchScale` and `flyScale` inside `poses()`.
- **Behaviour:** sits above the content (`z-20`) but never blocks clicks, pauses when the hero is off
  screen, and stays still on the perch for reduced-motion users.
- **Open issue:** you want the parrot's legs to touch the avatar. This asset has no legs, so getting
  that means new artwork: a Lottie with a perch or landing sequence, or a rigged 3D parrot
  (fly, land and perch clips) rendered with Three.js. Check the licence of whichever you pick.

## Content source

Copy comes from your CV (Nov 2026). Key facts to use in the next sections:

- **Role:** Mobile & Frontend Developer, Abuja, Nigeria.
- **eCampusMart**, Lead Mobile / Senior Frontend Developer (2026 to now): React Native, Expo,
  TypeScript campus marketplace. Feature architecture, TanStack Query data layer, Clerk and Google
  sign-in, Paystack payments, wallet and withdrawals with transaction PINs, Socket.IO chat with media
  and price offers, push notifications, Android releases through EAS Build.
- **Sericode**, Frontend Developer (2024 to 2026): led the MokoHost hosting platform frontend; built
  the Bunex crypto trading frontend (Next.js 16, React 19, Tailwind 4, Motion).
- **Education:** B.Eng. Petroleum and Gas Engineering, Federal University Otuoke (2018 to 2024).

## Plan for the remaining sections

1. **Projects** (next): detailed case-study cards plus a detail view per project. Each covers the
   problem, your role, the stack, the result, and live and code links. Order:
   1. iKnowBall (flagship): playiknowball.com. Solo-built football quiz: Daily quiz, 60-second Clash
      duels, matchweek mini-leagues, server-side answer checks, Wikidata SPARQL, Supabase Auth + RLS, PWA.
   2. eCampusMart: the marketplace app from the experience section.
   3. WordWise: React Native, Expo, Firebase words app with streaks and a Firestore cache.
   4. NexusHost: Next.js 15 and Tailwind hosting site.
   5. Fitness Tracker, plus older projects lower down.
   **Needed from you:** screenshots of iKnowBall, eCampusMart and WordWise, and any live or store links.
2. **About + Experience:** timeline of eCampusMart and Sericode (MokoHost, Bunex). Add a short note on
   how the engineering degree shapes your systems-first approach.
3. **Skills:** grouped as Mobile, Web, Data & services and Tools. No percentage bars.
4. **Contact + Footer:** restyle in the new system.

## Decisions and open questions

- `public/cv.pdf` is still the **old** CV. The new one lists your phone numbers, so it was not
  published. Replace the file when you're ready.
- The old site-wide overrides in `app/globals.css` (the `!important` rules for `nav *`, `.bg-white`,
  `section` padding and so on) still exist so the old sections keep working. They fight new styles:
  for example, any class containing `bg-white/` gets forced to the page background. Delete them once
  every section is rebuilt. The hero opts out of the section padding rule with `.hero`.
- `tailwind.config.js` is not read by Tailwind 4 (there is no `@config`), so put new theme values in
  `@theme` in `globals.css`.
- LottieFiles is blocked from Claude's cloud environment. Download assets yourself and add them to
  `public/`.
