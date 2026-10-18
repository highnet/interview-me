// Copies the canonical skill from /skills into the package so it ships with npm.
import { cpSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../../../skills/interview-me", import.meta.url));
const dest = fileURLToPath(new URL("../skill", import.meta.url));
rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
