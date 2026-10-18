// Where each agent reads skills. Mirrors the agent list in highnet/variantly (src/agents.mjs).
// `project` is relative to the project root; `global(home, env)` is the user-level folder.
import { join, resolve } from "node:path";

const dirFrom = (env, key, fallback) => (env[key] ? resolve(String(env[key])) : fallback);

const opencodeConfigDir = (home, env) =>
  env.OPENCODE_CONFIG_DIR
    ? resolve(String(env.OPENCODE_CONFIG_DIR))
    : join(env.XDG_CONFIG_HOME ? resolve(String(env.XDG_CONFIG_HOME)) : join(home, ".config"), "opencode");

const hermesHome = (home, env) =>
  env.HERMES_HOME
    ? resolve(String(env.HERMES_HOME))
    : process.platform === "win32" && env.LOCALAPPDATA
      ? join(String(env.LOCALAPPDATA), "hermes")
      : join(home, ".hermes");

export const AGENTS = {
  claude: {
    label: "Claude Code",
    bin: "claude",
    project: ".claude/skills",
    global: (home, env) => join(dirFrom(env, "CLAUDE_CONFIG_DIR", join(home, ".claude")), "skills"),
    detect: [".claude", "CLAUDE.md"],
  },
  codex: {
    label: "Codex CLI",
    bin: "codex",
    project: ".agents/skills",
    global: (home) => join(home, ".agents", "skills"),
    detect: [".codex", "AGENTS.md"],
  },
  copilot: {
    label: "GitHub Copilot CLI",
    bin: "copilot",
    project: ".github/skills",
    global: (home, env) => join(dirFrom(env, "COPILOT_HOME", join(home, ".copilot")), "skills"),
    detect: [".github/copilot-instructions.md", ".github/skills"],
  },
  gemini: {
    label: "Gemini CLI",
    bin: "gemini",
    project: ".gemini/skills",
    global: (home, env) => join(dirFrom(env, "GEMINI_CLI_HOME", home), ".gemini", "skills"),
    detect: [".gemini", "GEMINI.md"],
  },
  cursor: {
    label: "Cursor",
    bin: "cursor-agent",
    project: ".cursor/skills",
    global: (home) => join(home, ".cursor", "skills"),
    detect: [".cursor", ".cursorrules"],
  },
  opencode: {
    label: "OpenCode",
    bin: "opencode",
    project: ".opencode/skills",
    global: (home, env) => join(opencodeConfigDir(home, env), "skills"),
    detect: [".opencode", "opencode.json"],
  },
  grok: {
    label: "Grok Build",
    bin: "grok",
    project: ".grok/skills",
    global: (home, env) => join(dirFrom(env, "GROK_HOME", join(home, ".grok")), "skills"),
    detect: [".grok"],
  },
  hermes: {
    label: "Hermes Agent",
    bin: "hermes",
    project: ".hermes/skills",
    global: (home, env) => join(hermesHome(home, env), "skills"),
    detect: [".hermes"],
  },
  pi: {
    label: "Pi",
    bin: "pi",
    project: ".pi/skills",
    global: (home, env) => join(dirFrom(env, "PI_CODING_AGENT_DIR", join(home, ".pi", "agent")), "skills"),
    detect: [".pi"],
  },
  antigravity: {
    label: "Antigravity",
    bin: "agy",
    project: ".agents/skills",
    global: (home) => join(home, ".gemini", "antigravity-cli", "skills"),
    detect: [".agent", ".agents"],
  },
};

export const SKILL_NAME = "interview-me";
