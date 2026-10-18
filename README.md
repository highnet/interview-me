# interview-me

**Agents can't read your mind. So let it ask.**

An agent skill for ideas you can't fully put into words yet. Your agent asks you questions, a few at a time, until it understands what you mean. Then it writes a brief you sign off before any code gets written.

```
"I want a new onboarding flow. Use the interview-me skill to understand what I mean."
```

## Install

| Method | Command |
|---|---|
| CLI (recommended) | `npx interview-me install` |
| Shared skill | `npx skills add highnet/interview-me` |
| Claude Code plugin | `/plugin marketplace add highnet/interview-me`, then install from `/plugin` → Discover |

The CLI finds your agents and installs to each one's skills folder: Claude Code (`.claude/skills`), Codex (`.agents/skills`), Cursor, GitHub Copilot, Gemini CLI, and OpenCode. Flags: `--agent claude,cursor`, `--global`, `--yes`. Also: `update`, `uninstall`, `list`.

## How it works

1. **Reads the repo first.** It never asks what your code already answers.
2. **Asks 1 to 3 questions per round**, with options to pick from and its best guess first.
3. **Covers six things:** core, picture, references, edges, constraints, success.
4. **Plays back** what it heard and names any answers that conflict.
5. **Writes a brief** to `docs/briefs/<slug>.md` and builds only after you confirm it.

## Repo layout

```
skills/interview-me/      The skill (source of truth): SKILL.md + references/
packages/cli/             The `interview-me` npm package (installer, no dependencies)
apps/web/                 The website (Next.js, Tailwind v4, TypeScript, custom shadcn/ui)
.claude-plugin/           Claude Code marketplace + plugin manifest
```

## Develop

```
pnpm install
pnpm dev                          # website at localhost:3000
pnpm --filter interview-me test   # CLI tests
```

MIT licensed.
