---
name: interview-me
description: A reporter's notebook. Warm paper, graphite ink, one red pen.
colors:
  background: "oklch(0.978 0.007 85)"
  foreground: "oklch(0.21 0.012 60)"
  accent: "oklch(0.63 0.185 38)"
  muted: "oklch(0.945 0.009 85)"
  border: "oklch(0.89 0.01 80)"
typography:
  display: Instrument Serif 400, italic for emphasis
  body: Geist Sans
  code: Geist Mono
rounded: full for chips and buttons, 2xl for panels
spacing: sections py-24; 6xl max width; 16-20px gutters
---

## Overview
The scene is an interview in a reporter's notebook. The transcript demo sits on steno ruling (the `ruled` utility). Headlines read like magazine pull-quotes.

## Colors
Tokens live in `src/app/globals.css`, with `:root` for light and `.dark` for the night desk. The accent is the red pen. Use it only for emphasis, live state, and the user's choices.

## Typography
- Serif display at clamp(3rem, 7vw, 5.5rem) for the hero, and clamp(2.2rem, 4.5vw, 3.5rem) for section headings.
- Mono labels are 11px, uppercase, with wide tracking.

## Layout
- One column on mobile.
- An asymmetric 1.05fr / 1fr hero on desktop.
- Sections alternate between plain background and `bg-muted/40`.
- The install section is inverted.

## Motion
- Messages enter with a 450ms ease-out-quart fade, rise, and unblur.
- Nothing loops except the REC dot.
- Reduced motion turns all of it off.

## Components
- `CopyCommand`
- `InterviewDemo`
- `AudienceFork` (human / agent)
- `InstallTabs`
- `ThemeToggle`
- `ui/button`, `ui/badge`

## Do's and Don'ts
- Do quote only verified sources.
- Do keep copy declarative, ending in a period.
- Don't add icon-card grids, gradients, or a second accent colour.
