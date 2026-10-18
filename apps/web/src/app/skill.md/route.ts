import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

// Serves the canonical skill so any agent can read it with a plain fetch.
export async function GET() {
  const body = await readFile(join(process.cwd(), "../../skills/interview-me/SKILL.md"), "utf8");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
