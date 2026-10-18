# AGENTS.md

Conventions for every agent (Claude Code included) working in this repo.

## Layout
- `skills/interview-me/` is the source of truth for the skill. Edit it here only; `packages/cli/skill/` is a generated copy (`pnpm --filter interview-me sync-skill`).
- `packages/cli/` is the `interview-me` npm package. It has no runtime dependencies. Its agent list mirrors `highnet/variantly` `src/agents.mjs`; update both together.
- `apps/web/` is the site (Next.js 16, Tailwind v4, shadcn new-york/neutral, next-themes). Read `apps/web/DESIGN.md` and `apps/web/PRODUCT.md` before UI work.

## Rules
- Run `pnpm test`, `pnpm lint`, and `pnpm build` before you push.
- Any quote in the skill or on the site must be marked verified in `skills/interview-me/references/sources.md`. Paraphrase anything else.
- Keep `SKILL.md` harness-agnostic. Never assume a specific tool exists without giving a plain-text fallback.
- Use Conventional Commits. Never push to `main` directly.
