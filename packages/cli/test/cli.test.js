import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { detectAgents, installTo, installedAgents, parseArgs, removeFrom } from "../src/cli.js";

const tmp = () => mkdtempSync(join(tmpdir(), "interview-me-"));

test("parseArgs reads command and flags", () => {
  assert.deepEqual(parseArgs(["install", "-a", "claude,cursor", "-y"]), {
    command: "install", agents: ["claude", "cursor"], global: false, yes: true,
  });
  assert.equal(parseArgs(["install", "--agent=all"]).agents.length, 6);
});

test("detects agents from project markers", () => {
  const root = tmp();
  mkdirSync(join(root, ".claude"));
  mkdirSync(join(root, ".cursor"));
  assert.deepEqual(detectAgents(root), ["claude", "cursor"]);
});

test("install, list and uninstall round-trip", () => {
  const root = tmp();
  installTo(root, ["claude", "codex"]);
  assert.ok(existsSync(join(root, ".claude/skills/interview-me/SKILL.md")));
  assert.ok(existsSync(join(root, ".agents/skills/interview-me/references/question-bank.md")));
  assert.deepEqual(installedAgents(root), ["claude", "codex"]);
  removeFrom(root, ["claude"]);
  assert.deepEqual(installedAgents(root), ["codex"]);
});
