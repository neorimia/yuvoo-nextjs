#!/usr/bin/env node
/**
 * Split a JSONL file into training and validation (last N% as validation).
 * Creates <basename>-validation.jsonl with validation examples; training stays in original.
 *
 * Usage:
 *   node data/finetuning/split-train-val.mjs <input.jsonl> [validation_fraction]
 *
 * Example:
 *   node data/finetuning/split-train-val.mjs data/finetuning/file-training-data-1000.jsonl 0.1
 *
 * Default: 0.1 (10% validation). Output: file-training-data-1000-validation.jsonl
 */

import fs from "fs";
import readline from "readline";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2] ? join(process.cwd(), process.argv[2]) : null;
const valFraction = Math.min(0.5, Math.max(0.01, parseFloat(process.argv[3]) || 0.1));

if (!inputPath || !fs.existsSync(inputPath)) {
  console.error("Usage: node split-train-val.mjs <input.jsonl> [validation_fraction=0.1]");
  process.exit(1);
}

const baseName = inputPath.replace(/\.jsonl$/, "").split(/[/\\]/).pop();
const outDir = dirname(inputPath);
const validationPath = join(outDir, `${baseName}-validation.jsonl`);

async function main() {
  const lines = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    if (line.trim().length > 0) lines.push(line);
  }
  const n = lines.length;
  const nVal = Math.max(1, Math.round(n * valFraction));
  const nTrain = n - nVal;
  const valLines = lines.slice(-nVal);
  fs.writeFileSync(validationPath, valLines.join("\n") + "\n", "utf8");
  console.log("Total examples:", n);
  console.log("Validation (last " + (valFraction * 100) + "%):", nVal);
  console.log("Written:", validationPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
