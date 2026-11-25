import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AGENTS } from "../src/agents.js";
import { describe, detectAgents, installTo, installedAgents, parseArgs, projectScope, removeFrom, resolveInstall } from "../src/cli.js";
import { detectHarnesses } from "../src/harness.js";

const tmp = () => projectScope(mkdtempSync(join(tmpdir(), "interview-me-")));

test("parseArgs reads command and flags", () => {
  assert.deepEqual(parseArgs(["install", "-a", "claude,cursor", "-y"]), {
    command: "install", agents: ["claude", "cursor"], global: false, yes: true,
  });
  assert.equal(parseArgs(["install", "--agent=all"]).agents.length, Object.keys(AGENTS).length);
});

test("detects agents from project markers", () => {
  const scope = tmp();
  mkdirSync(join(scope.root, ".claude"));
  mkdirSync(join(scope.root, ".cursor"));
  assert.deepEqual(detectAgents(scope, { checkPath: false, env: {} }), ["claude", "cursor"]);
});

const NO_ENV = { checkPath: false, env: {} };

test("parseArgs accepts --harness and --all", () => {
  assert.deepEqual(parseArgs(["install", "--harness", "claude, gemini"]).agents, ["claude", "gemini"]);
  assert.deepEqual(parseArgs(["install", "--harness=codex"]).agents, ["codex"]);
  assert.equal(parseArgs(["install", "--all"]).agents.length, Object.keys(AGENTS).length);
});

test("a Claude-only repo with AGENTS.md installs for Claude only", () => {
  const scope = tmp();
  mkdirSync(join(scope.root, ".claude"));
  writeFileSync(join(scope.root, "AGENTS.md"), "# conventions");
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["claude"]);
});

test("CLAUDE.md alone is enough", () => {
  const scope = tmp();
  writeFileSync(join(scope.root, "CLAUDE.md"), "");
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["claude"]);
});

test("AGENTS.md counts when nothing more specific is found", () => {
  const scope = tmp();
  writeFileSync(join(scope.root, "AGENTS.md"), "");
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["codex"]);
});

test("copilot, gemini and opencode markers", () => {
  const scope = tmp();
  mkdirSync(join(scope.root, ".github"));
  writeFileSync(join(scope.root, ".github/copilot-instructions.md"), "");
  mkdirSync(join(scope.root, ".gemini"));
  writeFileSync(join(scope.root, "opencode.json"), "{}");
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["copilot", "gemini", "opencode"]);
});

test("a bare .github folder is not Copilot", () => {
  const scope = tmp();
  mkdirSync(join(scope.root, ".github/workflows"), { recursive: true });
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, []);
});

test("the running harness is detected from env", () => {
  const scope = tmp();
  assert.deepEqual(detectHarnesses(scope.root, { checkPath: false, env: { CLAUDECODE: "1" } }).ids, ["claude"]);
  assert.deepEqual(detectHarnesses(scope.root, { checkPath: false, env: { GEMINI_CLI: "1" } }).ids, ["gemini"]);
  assert.deepEqual(detectHarnesses(scope.root, { checkPath: false, env: { OPENCODE: "1" } }).ids, ["opencode"]);
});

test("env beats a shared AGENTS.md", () => {
  const scope = tmp();
  writeFileSync(join(scope.root, "AGENTS.md"), "");
  assert.deepEqual(detectHarnesses(scope.root, { checkPath: false, env: { CLAUDECODE: "1" } }).ids, ["claude"]);
});

test("folders holding only an earlier interview-me install are weak evidence", () => {
  const scope = tmp();
  mkdirSync(join(scope.root, ".claude"));
  installTo(scope, ["gemini", "opencode", "copilot", "codex"]);
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["claude"]);
  writeFileSync(join(scope.root, ".gemini/settings.json"), "{}");
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["claude", "gemini"]);
});

test("a leftover install alone still counts", () => {
  const scope = tmp();
  installTo(scope, ["claude"]);
  assert.deepEqual(detectHarnesses(scope.root, NO_ENV).ids, ["claude"]);
});

test("PATH counts only when it names a single agent", () => {
  const scope = tmp();
  const bin = mkdtempSync(join(tmpdir(), "bin-"));
  writeFileSync(join(bin, "codex"), "");
  assert.deepEqual(detectHarnesses(scope.root, { env: { PATH: bin } }).ids, ["codex"]);
  writeFileSync(join(bin, "gemini"), "");
  const found = detectHarnesses(scope.root, { env: { PATH: bin } });
  assert.deepEqual(found.ids, []);
  assert.deepEqual(found.onPath, ["codex", "gemini"]);
});

test("nothing detected falls back to Claude Code", () => {
  assert.deepEqual(resolveInstall(tmp(), NO_ENV).ids, ["claude"]);
});

test("describe names each folder once with its harnesses", () => {
  const scope = tmp();
  const lines = describe(scope, ["claude", "codex", "antigravity"]);
  assert.equal(lines.length, 2);
  assert.match(lines[1], /^Codex CLI, Antigravity → .*interview-me$/);
});

test("install, list and uninstall round-trip", () => {
  const scope = tmp();
  installTo(scope, ["claude", "codex"]);
  assert.ok(existsSync(join(scope.root, ".claude/skills/interview-me/SKILL.md")));
  assert.ok(existsSync(join(scope.root, ".agents/skills/interview-me/references/sources.md")));
  assert.deepEqual(installedAgents(scope), ["claude", "codex", "antigravity"]);
  removeFrom(scope, ["claude"]);
  assert.deepEqual(installedAgents(scope), ["codex", "antigravity"]);
});

test("agents sharing a folder are written once", () => {
  assert.equal(installTo(tmp(), ["codex", "antigravity"]).length, 1);
});

test("every agent resolves a global folder", () => {
  for (const a of Object.values(AGENTS)) assert.ok(a.global("/home/x", {}).startsWith("/"));
});
