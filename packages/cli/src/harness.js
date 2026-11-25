// Which harness(es) is this project actually using?
// Kept apart from agents.js, which mirrors highnet/variantly's agent list.
import { existsSync, readdirSync, statSync } from "node:fs";
import { delimiter, join, relative, sep } from "node:path";
import { AGENTS, SKILL_NAME } from "./agents.js";

// Environment variables a harness sets for the commands it runs. Running inside
// one is the strongest sign of which harness is in use.
export const HARNESS_ENV = {
  claude: ["CLAUDECODE", "CLAUDE_CODE_ENTRYPOINT"],
  codex: ["CODEX_SANDBOX", "CODEX_SANDBOX_NETWORK_DISABLED"],
  gemini: ["GEMINI_CLI"],
  opencode: ["OPENCODE"],
};

// Markers many harnesses share (AGENTS.md is read by Codex, Cursor, Copilot,
// OpenCode and others). They only count when nothing more specific is found.
export const WEAK_MARKERS = new Set(["AGENTS.md", ".agents"]);

// A marker folder that holds nothing but an interview-me install we wrote
// earlier is weak evidence: it may be a leftover from an install-everywhere run.
function onlyOurSkill(dir) {
  if (!existsSync(join(dir, "skills", SKILL_NAME))) return false;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const rel = relative(dir, p).split(sep).join("/");
      if (rel === `skills/${SKILL_NAME}`) continue;
      if (rel === "skills" && statSync(p).isDirectory()) {
        if (!walk(p)) return false;
        continue;
      }
      return false;
    }
    return true;
  };
  try {
    return walk(dir);
  } catch {
    return false;
  }
}

// "strong", "weak", or null when the marker is absent.
function markerStrength(root, marker) {
  const p = join(root, marker);
  if (!existsSync(p)) return null;
  if (WEAK_MARKERS.has(marker)) return "weak";
  if (statSync(p).isDirectory()) {
    if (onlyOurSkill(p)) return "weak";
    // A marker that is itself a skills folder (.github/skills) holding only ours.
    const entries = readdirSync(p);
    if (entries.length === 1 && entries[0] === SKILL_NAME) return "weak";
  }
  return "strong";
}

const onPath = (bin, env) =>
  (env.PATH ?? env.Path ?? "")
    .split(delimiter)
    .some((d) => d && ["", ".cmd", ".exe"].some((ext) => existsSync(join(d, bin + ext))));

export function envHarnesses(env = process.env) {
  return Object.entries(HARNESS_ENV)
    .filter(([, keys]) => keys.some((k) => env[k]))
    .map(([id]) => id);
}

// Returns { ids, reasons, onPath } where `ids` is what to install for and
// `reasons[id]` says why. `onPath` lists CLIs found on PATH: a hint only.
export function detectHarnesses(root, { env = process.env, checkPath = true } = {}) {
  const reasons = {};
  const add = (id, why) => (reasons[id] ??= []).push(why);

  for (const id of envHarnesses(env)) add(id, "running inside it");
  const weak = {};
  for (const [id, a] of Object.entries(AGENTS)) {
    for (const m of a.detect) {
      const strength = markerStrength(root, m);
      if (strength === "weak") (weak[id] ??= []).push(m);
      else if (strength === "strong") add(id, m);
    }
  }
  if (!Object.keys(reasons).length) for (const [id, ms] of Object.entries(weak)) for (const m of ms) add(id, m);

  const path = checkPath ? Object.keys(AGENTS).filter((id) => onPath(AGENTS[id].bin, env)) : [];
  if (!Object.keys(reasons).length && path.length === 1) add(path[0], "only agent CLI on PATH");

  const order = Object.keys(AGENTS);
  const ids = Object.keys(reasons).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return { ids, reasons, onPath: path };
}
