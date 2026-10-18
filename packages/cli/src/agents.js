// Where each agent looks for skills, relative to the project root (or home dir with --global).
export const AGENTS = {
  claude: { label: "Claude Code", dir: ".claude/skills", detect: [".claude", "CLAUDE.md"] },
  codex: { label: "Codex", dir: ".agents/skills", detect: [".codex", "AGENTS.md"] },
  cursor: { label: "Cursor", dir: ".cursor/skills", detect: [".cursor", ".cursorrules"] },
  copilot: { label: "GitHub Copilot", dir: ".github/skills", detect: [".github/copilot-instructions.md"] },
  gemini: { label: "Gemini CLI", dir: ".gemini/skills", detect: [".gemini", "GEMINI.md"] },
  opencode: { label: "OpenCode", dir: ".opencode/skills", detect: [".opencode", "opencode.json"] },
};

export const SKILL_NAME = "interview-me";
