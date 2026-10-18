import { cpSync, existsSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { AGENTS, SKILL_NAME } from "./agents.js";

const SKILL_SRC = fileURLToPath(new URL("../skill", import.meta.url));

const HELP = `interview-me: your agent asks before it builds.

Usage
  npx interview-me install     Add the skill to this project
  npx interview-me update      Replace installed copies with the latest
  npx interview-me uninstall   Remove the skill
  npx interview-me list        Show where it's installed

Options
  -a, --agent <ids>   Comma-separated: ${Object.keys(AGENTS).join(", ")}, or all
  -g, --global        Install to your home directory instead of this project
  -y, --yes           Skip prompts and use the agents found in this project
  -h, --help          Show this help
`;

export function parseArgs(argv) {
  const opts = { command: "help", agents: null, global: false, yes: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-a" || a === "--agent") opts.agents = argv[++i]?.split(",").map((s) => s.trim());
    else if (a.startsWith("--agent=")) opts.agents = a.slice(8).split(",");
    else if (a === "-g" || a === "--global") opts.global = true;
    else if (a === "-y" || a === "--yes") opts.yes = true;
    else if (a === "-h" || a === "--help") opts.command = "help";
    else if (!a.startsWith("-")) opts.command = a;
  }
  if (opts.agents?.includes("all")) opts.agents = Object.keys(AGENTS);
  return opts;
}

// A scope is where skills go: this project, or the user's home (--global).
export function scopeFor(global, env = process.env) {
  const home = homedir();
  return global
    ? { root: home, dirOf: (id) => AGENTS[id].global(home, env) }
    : { root: process.cwd(), dirOf: (id) => join(process.cwd(), AGENTS[id].project) };
}

export function projectScope(root) {
  return { root, dirOf: (id) => join(root, AGENTS[id].project) };
}

const onPath = (bin, env = process.env) =>
  (env.PATH ?? "").split(delimiter).some((d) => d && ["", ".cmd", ".exe"].some((ext) => existsSync(join(d, bin + ext))));

export function detectAgents(scope, { checkPath = true } = {}) {
  return Object.entries(AGENTS)
    .filter(([, a]) => a.detect.some((p) => existsSync(join(scope.root, p))) || (checkPath && onPath(a.bin)))
    .map(([id]) => id);
}

export function installedAgents(scope) {
  return Object.keys(AGENTS).filter((id) => existsSync(join(scope.dirOf(id), SKILL_NAME)));
}

// Several agents share a folder (e.g. .agents/skills); write each folder once.
const destinations = (scope, ids) => [...new Set(ids.map((id) => join(scope.dirOf(id), SKILL_NAME)))];

export function installTo(scope, ids) {
  return destinations(scope, ids).map((dest) => {
    rmSync(dest, { recursive: true, force: true });
    cpSync(SKILL_SRC, dest, { recursive: true });
    return dest;
  });
}

export function removeFrom(scope, ids) {
  return destinations(scope, ids).map((dest) => {
    rmSync(dest, { recursive: true, force: true });
    return dest;
  });
}

async function pickAgents(detected) {
  const ids = Object.keys(AGENTS);
  console.log("\nWhich agents should get the skill?\n");
  ids.forEach((id, i) => {
    const mark = detected.includes(id) ? " (found)" : "";
    console.log(`  ${i + 1}. ${AGENTS[id].label}${mark}`);
  });
  const fallback = detected.length ? detected : ["claude"];
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`\nNumbers, comma-separated [${fallback.map((d) => ids.indexOf(d) + 1).join(",")}]: `);
  rl.close();
  if (!answer.trim()) return fallback;
  return answer
    .split(",")
    .map((n) => ids[Number(n.trim()) - 1])
    .filter(Boolean);
}

function validate(ids) {
  const bad = ids.filter((id) => !AGENTS[id]);
  if (bad.length) throw new Error(`Unknown agent: ${bad.join(", ")}. Try: ${Object.keys(AGENTS).join(", ")}`);
  return ids;
}

export async function run(argv) {
  const opts = parseArgs(argv);
  const scope = scopeFor(opts.global);

  switch (opts.command) {
    case "install": {
      const detected = detectAgents(scope);
      const interactive = !opts.yes && process.stdin.isTTY;
      const ids = validate(opts.agents ?? (interactive ? await pickAgents(detected) : detected.length ? detected : ["claude"]));
      for (const p of installTo(scope, ids)) console.log(`  ✓ ${p}`);
      console.log(`\nDone. Next time an idea is fuzzy, tell your agent:\n  "Use the interview-me skill to understand what I mean."`);
      return 0;
    }
    case "update": {
      const ids = validate(opts.agents ?? installedAgents(scope));
      if (!ids.length) {
        console.log("Nothing installed here. Run `npx interview-me install` first.");
        return 1;
      }
      for (const p of installTo(scope, ids)) console.log(`  ↻ ${p}`);
      return 0;
    }
    case "uninstall": {
      const ids = validate(opts.agents ?? installedAgents(scope));
      for (const p of removeFrom(scope, ids)) console.log(`  ✕ ${p}`);
      return 0;
    }
    case "list": {
      const ids = installedAgents(scope);
      if (!ids.length) console.log("Not installed here.");
      for (const id of ids) console.log(`  ${AGENTS[id].label.padEnd(20)} ${join(scope.dirOf(id), SKILL_NAME)}`);
      return 0;
    }
    default:
      console.log(HELP);
      return opts.command === "help" ? 0 : 1;
  }
}
