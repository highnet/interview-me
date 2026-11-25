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

The CLI installs only for the harness(es) your project uses, and prints each folder it wrote. It picks:

1. the harness you're running it from (Claude Code, Codex CLI, Gemini CLI, OpenCode, via their environment variables), plus
2. any harness whose files are in the project: `.claude/` or `CLAUDE.md`, `.github/copilot-instructions.md`, `.gemini/` or `GEMINI.md`, `.cursor/`, `.opencode/` or `opencode.json`, `.grok/`, `.hermes/`, `.pi/`, `.codex/`.
3. `AGENTS.md` and `.agents/` are shared by many harnesses, so they count (as Codex) only when nothing above matched. So do folders that hold nothing but an earlier interview-me install.
4. Still nothing? The only agent CLI on your PATH, if there's exactly one; otherwise Claude Code.

Override it with `--harness claude,gemini` (alias `--agent`), or install for every supported harness with `--all` (the old install-everywhere behaviour). It supports Claude Code, Codex CLI, Cursor, GitHub Copilot CLI, Gemini CLI, OpenCode, Grok Build, Hermes Agent, Pi, and Antigravity. No install? Tell any agent: `Read https://interviewme.at/skill.md and interview me.` Other flags: `--global`, `--yes`. Also: `update`, `uninstall`, `list`.

## How it works

1. **Reads what's in reach first.** It never asks what your code or the conversation already answers.
2. **Asks one question at a time.** It uses your harness's question tool if there is one; otherwise it gives lettered options.
3. **Covers six things:** core, the real challenge, picture, references, edges, and success. It adds extra questions for each kind of problem: software, design, API, data, writing, strategy, research, and decisions.
4. **Plays back** what it heard until you say "that's right."
5. **Writes a brief, then builds** once you confirm it.

## Sources


Full docs, sources, and the site: https://interviewme.at · https://github.com/highnet/interview-me
