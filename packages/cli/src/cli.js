import { cpSync, existsSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
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

export function detectAgents(root) {
  return Object.entries(AGENTS)
    .filter(([, a]) => a.detect.some((p) => existsSync(join(root, p))))
    .map(([id]) => id);
}

export function installedAgents(root) {
  return Object.keys(AGENTS).filter((id) => existsSync(join(root, AGENTS[id].dir, SKILL_NAME)));
}

export function installTo(root, ids) {
  return ids.map((id) => {
    const dest = join(root, AGENTS[id].dir, SKILL_NAME);
    rmSync(dest, { recursive: true, force: true });
    cpSync(SKILL_SRC, dest, { recursive: true });
    return dest;
  });
}

export function removeFrom(root, ids) {
  return ids.map((id) => {
    const dest = join(root, AGENTS[id].dir, SKILL_NAME);
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
  const root = opts.global ? homedir() : process.cwd();

  switch (opts.command) {
    case "install": {
      const detected = detectAgents(root);
      const interactive = !opts.yes && process.stdin.isTTY;
      const ids = validate(opts.agents ?? (interactive ? await pickAgents(detected) : detected.length ? detected : ["claude"]));
      for (const p of installTo(root, ids)) console.log(`  ✓ ${p}`);
      console.log(`\nDone. Try it: "I want a new onboarding flow. Use the interview-me skill to understand what I mean."`);
      return 0;
    }
    case "update": {
      const ids = validate(opts.agents ?? installedAgents(root));
      if (!ids.length) {
        console.log("Nothing installed here. Run `npx interview-me install` first.");
        return 1;
      }
      for (const p of installTo(root, ids)) console.log(`  ↻ ${p}`);
      return 0;
    }
    case "uninstall": {
      const ids = validate(opts.agents ?? installedAgents(root));
      for (const p of removeFrom(root, ids)) console.log(`  ✕ ${p}`);
      return 0;
    }
    case "list": {
      const ids = installedAgents(root);
      if (!ids.length) console.log("Not installed here.");
      for (const id of ids) console.log(`  ${AGENTS[id].label.padEnd(16)} ${join(root, AGENTS[id].dir, SKILL_NAME)}`);
      return 0;
    }
    default:
      console.log(HELP);
      return opts.command === "help" ? 0 : 1;
  }
}
