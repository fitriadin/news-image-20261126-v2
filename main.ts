// The World Chronicle — Thursday 26 November 2026.
// A one-day newspaper front page, drawn in code (poster.html, 1024x1024)
// and rendered once to entry.png. This program copies that image to the
// output directory. Node 22, standard library only, no network,
// deterministic: the same entry.png bytes every run.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");

// The grader mounts the output directory as a volume: create it when it is
// missing, and clear only its contents — never remove the directory itself.
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const png = readFileSync(source);
if (png.length > 1024 * 1024) {
  throw new Error(`entry.png is ${png.length} bytes, over the 1 MiB cap`);
}
copyFileSync(source, target);
console.log(`Wrote ${target} (${png.length} bytes)`);
