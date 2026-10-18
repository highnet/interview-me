import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AGENTS } from "../src/agents.js";
import { detectAgents, installTo, installedAgents, parseArgs, projectScope, removeFrom } from "../src/cli.js";

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
  assert.deepEqual(detectAgents(scope, { checkPath: false }), ["claude", "cursor"]);
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
