---
name: interview-me
description: The conversation is the identity. One ultramarine carries the hero and the close; your answers are marked in highlighter yellow.
colors:
  brand: "oklch(0.45 0.21 264)"        # ultramarine (#2a3fc4 in OG image + theme-color)
  brand-deep: "oklch(0.37 0.18 264)"   # dark mode theme-color #243399
  brand-foreground: "oklch(0.985 0.006 265)"  # #f7f8ff
  brand-muted: "oklch(0.87 0.05 265)"
  brand-text: "oklch(0.45 0.21 264) / dark oklch(0.76 0.13 264)"
  highlight: "oklch(0.91 0.17 102)"    # #f2e64a
  highlight-foreground: "oklch(0.22 0.03 265)"  # #1b2033
  background: "oklch(0.985 0.004 265)"
  foreground: "oklch(0.2 0.03 265)"
  muted: "oklch(0.955 0.009 265)"
  muted-foreground: "oklch(0.46 0.03 265)"
  # sRGB fallbacks where oklch can't be used (OG image, <meta name="theme-color">)
  brand-hex: "#2a3fc4"
  brand-deep-hex: "#243399"
  brand-foreground-hex: "#f7f8ff"
  highlight-hex: "#f2e64a"
  highlight-foreground-hex: "#1b2033"
typography:
  display: Funnel Display 500/600, tracking -0.025em to -0.03em
  body: Geist Sans
  code: Geist Mono (real commands and paths only)
rounded: 2xl (16px) panels, xl inputs, full for chips, tabs and buttons
spacing: sections py-24 → lg:py-32; max-w-6xl; 20px mobile gutter
---

## Overview
A developer mid-afternoon, an idea half-formed, wanting to be understood before anything gets built. The site is a conversation. The hero shows an interview you take part in, and every example prompt is drawn as one of your answers.

## Colors
- **Strategy: Committed.** Ultramarine carries the hero and the install close. The middle sections use a cool off-white tinted toward the brand hue, not toward warmth.
- **Highlight yellow means "you said this."** It marks user answers, example prompts and the headline's second beat. Never use it for decoration.
- **`brand-text` for brand-colored text** on page surfaces. Raw `brand` text is 1.98:1 in dark mode.
- **Contrast:** every token pair is ≥4.5:1 in both themes. The script is in the PR notes.

## Typography
- Funnel Display has open, talkative counters; it is used for headings, the book spines and the brief title.
- Hero: clamp(3rem, 7.5vw, 6rem). Section headings: clamp(2.25rem, 4.6vw, 3.75rem).
- Body: 17–18px with relaxed leading.
- Labels are sentence case. There are no uppercase eyebrows.

## Layout
- The hero is a 2-column grid, copy then the demo (`minmax(0,30rem)`), and stacks on mobile.
- Section rhythm: plain, muted, plain, ruled, brand.
- Use `min-w-0` on grid items that hold commands.

## Motion
- Transcript lines enter with a 450ms ease-out-quart rise and unblur. With reduced motion, this becomes a 150ms fade.
- Book spines lift when selected.
- The only loop is the recording dot.
- The demo waits for a click and auto-answers only after 6s of idle. It can be paused.

## Components
- CopyCommand: scrolls instead of truncating, shows "Copied" text, has a status region and a 44px button.
- InterviewDemo: `role=log` with a separate polite live region.
- AudienceFork and InstallTabs: tabs via `useRovingTabs` (arrows, Home, End).
- Bookshelf: tabs, one per book.
- SiteHeader with speech-bubble mark.
- ThemeToggle.

## Do's and Don'ts
- Do let the transcript and answers carry the identity.
- Do keep tap targets at 44px or more.
- Don't use side-stripe borders, ruled or repeating-gradient backgrounds, border plus wide shadow, uppercase eyebrows, or numbered markers on non-sequences.
- Don't use cream backgrounds, or fonts from the reflex-reject list.
