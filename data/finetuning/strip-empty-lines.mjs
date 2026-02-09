#!/usr/bin/env node
/**
 * Remove empty lines from JSONL file(s). OpenAI fine-tuning requires each line to be a valid JSON object; empty lines cause "Example N is not a valid JSON object".
 *
 * Usage:
 *   node data/finetuning/strip-empty-lines.mjs [file.jsonl ...]
 *   node data/finetuning/strip-empty-lines.mjs parts   # all training_data_part_*.jsonl in same dir
 *
 * Before uploading for fine-tuning, run strip on training parts AND validation:
 *   node data/finetuning/strip-empty-lines.mjs parts
 *   node data/finetuning/strip-empty-lines.mjs data/finetuning/validation_data.jsonl
 * Then upload (or re-upload) and use the NEW file IDs in the job — do not reuse old IDs.
 *
 * Writes to same path (overwrites). Uses temp file then rename to avoid corruption.
 */

import fs from "fs";
import readline from "readline";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptDir = __dirname;

function getFiles() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node strip-empty-lines.mjs <file.jsonl ...> | parts");
    process.exit(1);
  }
  if (args[0].toLowerCase() === "parts") {
    const names = fs.readdirSync(scriptDir);
    return names
      .filter((n) => n.endsWith(".jsonl") && /training_data_part_\d+\.jsonl$/.test(n))
      .sort((a, b) => {
        const na = parseInt(a.match(/_part_(\d+)/)?.[1] ?? "0", 10);
        const nb = parseInt(b.match(/_part_(\d+)/)?.[1] ?? "0", 10);
        return na - nb;
      })
      .map((n) => join(scriptDir, n));
  }
  return args.map((p) => (p.startsWith("/") ? p : join(process.cwd(), p)));
}

async function stripFile(filePath) {
  const tempPath = filePath + ".strip.tmp";
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
  const out = fs.createWriteStream(tempPath, { encoding: "utf8" });
  let total = 0;
  let removed = 0;
  for await (const line of rl) {
    total++;
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      removed++;
      continue;
    }
    out.write(line + "\n");
  }
  out.end();
  await new Promise((resolve) => out.on("finish", resolve));
  fs.renameSync(tempPath, filePath);
  return { total, removed };
}

async function main() {
  const files = getFiles();
  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.error("Skip (not found):", filePath);
      continue;
    }
    const { total, removed } = await stripFile(filePath);
    const name = filePath.split(/[/\\]/).pop();
    console.log(name, "lines:", total, "->", total - removed, "removed:", removed);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
