# Yash Panchal — portfolio

An eight-chapter interactive record. Full-screen chapters, hold-to-advance,
generative ambient audio, pointer parallax, and a canvas that changes scene
with each chapter.

## Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 15, App Router                              |
| UI         | React 19, TypeScript (strict)                       |
| Styling    | Plain CSS with custom properties — no CSS framework |
| Fonts      | `next/font` self-hosting Bricolage Grotesque + IBM Plex Mono |
| Graphics   | Canvas 2D API, hand-written render loops            |
| Audio      | Web Audio API, synthesised at runtime — zero audio files |
| Animation  | CSS transitions + `requestAnimationFrame` — no animation library |
| Deploy     | Vercel, zero config                                 |

No runtime dependencies beyond React and Next. Nothing to break on install,
nothing to keep patched.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Vercel

```bash
git init
git add .
git commit -m "Portfolio"
git remote add origin git@github.com:<you>/portfolio.git
git push -u origin main
```

Then go to vercel.com → **Add New → Project** → import the repo. Vercel detects
Next.js and needs no settings. Add your domain under **Settings → Domains**.

Or skip GitHub entirely:

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Where to edit

| I want to change…            | File                        |
| ---------------------------- | --------------------------- |
| Any words on the site        | `components/Chapters.tsx`   |
| Chapter order, colours, scenes | `lib/data.ts` → `CHAPTER_META` |
| Timeline bars and tooltips   | `lib/data.ts` → `FRAMES`    |
| Skill marquee rows           | `lib/data.ts` → `STACK_ROWS` |
| Contact details              | `lib/data.ts` → `CONTACT`   |
| Colours, spacing, type scale | `app/globals.css`           |
| Music character              | `lib/audio.ts`              |
| Hold duration                | `components/HoldToContinue.tsx` → `FILL_SECONDS` |
| Site title, OG tags, domain  | `app/layout.tsx` → `SITE`   |

## Before you ship

- Set `SITE` in `app/layout.tsx` to your real domain.
- Add `app/opengraph-image.png` (1200×630) so links preview properly.
- Check the sub-project date spans in `FRAMES` — those are approximations.
