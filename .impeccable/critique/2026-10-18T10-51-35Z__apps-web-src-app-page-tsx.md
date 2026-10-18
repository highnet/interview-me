---
target: interview-me site
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:/home/user/interview-me/apps/web/src/app/page.tsx"
target_fingerprint: "sha256:6a4395e66dfb2132e7a3262fd1f4439cab2ac9f90dc07a40a8135476fdeecf30"
target_path: /home/user/interview-me/apps/web/src/app/page.tsx
timestamp: 2026-10-18T10-51-35Z
slug: apps-web-src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser audit)
Score 25/32 (7, 10 n/a, Persuade). P1: template split hero (page.tsx:33); agent tab H1 pushes toggle below fold + duplicate hero-heading id (audience-fork.tsx); book tabpanel unnamed, ids with spaces (use-roving-tabs.ts, bookshelf.tsx); focus lost on bookshelf Next (key remount). P2: six-areas numbered tile grid (page.tsx:93-103); dark mode muddy hero seam, card barely separates; double live announcements (interview-demo.tsx:120/122); pulsing dot ignores reduced motion; tap targets: copy button 40px, w-10 spine. P3: /agents generic, no footer, no skill.md link; unstyled demo scrollbar; DESIGN.md drift (hero clamp, rise has no unblur); hero top misalignment and empty blue under card; works-with orphan.
