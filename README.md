# Yash Panchal — portfolio

An eight-chapter interactive record. Full-screen chapters, pointer parallax,
and a canvas that changes scene with each chapter. (Hold-to-advance and
generative ambient audio exist in the code but are currently disabled.)

## Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 15, App Router                              |
| UI         | React 19, TypeScript (strict)                       |
| Styling    | Plain CSS with custom properties (no CSS framework) |
| Fonts      | `next/font` self-hosting Bricolage Grotesque + IBM Plex Mono |
| Graphics   | Canvas 2D API, hand-written render loops            |
| Audio      | Web Audio API, synthesised at runtime (zero audio files) |
| Animation  | CSS transitions + `requestAnimationFrame` (no animation library) |
| Deploy     | Vercel, zero config                                 |

No runtime dependencies beyond React and Next.
