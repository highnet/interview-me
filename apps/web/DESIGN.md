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
A developer mid-afternoon, an idea half-formed, wanting to be understood before anything gets built. The site is a conversation, and the conversation carries the page:
- The hero opens with the visitor's request (a yellow bubble), and the agent's reply is the H1.
- The interview continues on the same blue, with no card. The brief is the only paper object in it.
- Further down, the method is shown as the brief an interview produces, with the visitor's answers highlighted.

## Colors
- **Strategy: Committed.** Ultramarine carries the hero and the install close. The middle sections use a cool off-white tinted toward the brand hue, not toward warmth.
- **Highlight yellow means "you said this."** It marks user answers, example prompts and the headline's second beat. Never use it for decoration.
- **`brand-text` for brand-colored text** on page surfaces. Raw `brand` text is 1.98:1 in dark mode.
- **Dark mode:** the same ultramarine room with the lights down. Background, muted, card and muted text are all tinted toward hue 266, never neutral gray or black.
- **Contrast:** every text token pair is ≥4.5:1 in both themes.

## Typography
- Funnel Display has open, talkative counters; it is used for headings, the book spines and the brief title.
- Hero H1: clamp(2.9rem, 7vw, 5.5rem). Demo questions: clamp(1.35rem, 2.4vw, 1.75rem). Section headings: clamp(2.25rem, 4.6vw, 3.75rem).
- Body: 17–18px with relaxed leading.
- Labels are sentence case. There are no uppercase eyebrows.

## Layout
- **Hero:** one column (`max-w-4xl`), a conversation rather than a split layout. The Human and Agent panels share one grid cell (`grid-cols-[minmax(0,1fr)]`), so switching never moves the page.
- **Section rhythm:** plain, muted (the brief), plain, ruled (books), brand (close).
- **Close:** one column on brand, continuing the conversation: your yellow request, the heading, then the install tabs.
- Use `min-w-0` on grid items that hold commands.

## Motion
- Transcript lines enter with a 450ms ease-out-quart rise and unblur, and the bookshelf panel uses the same `rise`. With reduced motion, these become a fade or nothing.
- Book spines lift when selected. Nothing loops; the status dot is static.
- The demo shows its first question from the start, waits for a click, and auto-answers only after 6s of idle. It can be paused. Answered options give way to your reply.

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
