#!/usr/bin/env node
/**
 * Split a large JSONL file into parts under 500 MB (uses 450 MB target to be safe).
 * Each part is valid JSONL and can be uploaded to OpenAI separately.
 *
 * Usage:
 *   node data/finetuning/split-training-data.mjs [input.jsonl] [maxMB]
 *
 * Defaults: data/finetuning/training_data.jsonl, 450 MB max per part.
 * Output: same dir, <basename>_part_001.jsonl, _part_002.jsonl, ...
 */

import fs from "fs";
import readline from "readline";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultInput = join(__dirname, "training_data.jsonl");
const MAX_MB = 450;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const inputPath = resolve(process.argv[2] || defaultInput);
const maxMB = Number(process.argv[3]) || MAX_MB;
const maxBytes = maxMB * 1024 * 1024;

const baseName = inputPath.replace(/\.jsonl$/, "").split(/[/\\]/).pop();
const outDir = dirname(inputPath);

if (!fs.existsSync(inputPath)) {
  console.error("Error: File not found:", inputPath);
  process.exit(1);
}

async function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });

  let partIndex = 0;
  let currentSize = 0;
  let currentLineCount = 0;
  let totalLines = 0;
  let outStream = null;

  const startNewPart = () => {
    if (outStream) {
      outStream.end();
      const sizeMB = (currentSize / (1024 * 1024)).toFixed(2);
      console.log(`  ${currentLineCount} lines  ${sizeMB} MB`);
      totalLines += currentLineCount;
    }
    partIndex++;
    const outPath = join(outDir, `${baseName}_part_${String(partIndex).padStart(3, "0")}.jsonl`);
    outStream = fs.createWriteStream(outPath, { encoding: "utf8" });
    console.log(outPath);
    currentSize = 0;
    currentLineCount = 0;
  };

  for await (const line of rl) {
    if (line.trim().length === 0) continue; // skip empty lines (invalid in JSONL)
    const lineBytes = Buffer.byteLength(line + "\n", "utf8");
    if (outStream && currentSize + lineBytes > maxBytes) {
      startNewPart();
    }
    if (!outStream) startNewPart();
    outStream.write(line + "\n");
    currentSize += lineBytes;
    currentLineCount++;
  }

  if (outStream) {
    outStream.end();
    const sizeMB = (currentSize / (1024 * 1024)).toFixed(2);
    console.log(`  ${currentLineCount} lines  ${sizeMB} MB`);
    totalLines += currentLineCount;
  }

  console.log(`Done. ${totalLines} total lines in ${partIndex} part(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
