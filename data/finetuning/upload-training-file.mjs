#!/usr/bin/env node
/**
 * Upload JSONL file(s) to OpenAI Files API and print file IDs.
 * Use these IDs when creating a fine-tuning job (training_file must be "file-...").
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node data/finetuning/upload-training-file.mjs [path]
 *
 * Modes:
 *   No path, or "parts" or "split"
 *     Uploads all training_data_part_*.jsonl in data/finetuning (sorted part_001, part_002, ...).
 *   Single file path
 *     Uploads that file only.
 *   Directory path
 *     Uploads all *_part_*.jsonl in that directory (sorted).
 *
 * Output: one file ID per upload; optional list written to uploaded-file-ids.txt in same dir.
 */

import OpenAI from "openai";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");
const finetuningDir = join(projectRoot, "data/finetuning");
const MAX_MB = 500;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Error: OPENAI_API_KEY environment variable is required.");
  process.exit(1);
}

const rawArg = process.argv[2];
const resolvePath = (p) => (p ? resolve(process.cwd(), p) : null);

/** Get list of files to upload: either split parts or a single file. */
function getFilesToUpload() {
  const arg = rawArg?.toLowerCase();
  if (!rawArg || arg === "parts" || arg === "split") {
    if (!fs.existsSync(finetuningDir)) {
      console.error("Error: Directory not found:", finetuningDir);
      process.exit(1);
    }
    const names = fs.readdirSync(finetuningDir);
    const partFiles = names
      .filter((n) => n.endsWith(".jsonl") && /_part_\d+\.jsonl$/.test(n))
      .sort((a, b) => {
        const na = parseInt(a.match(/_part_(\d+)/)?.[1] ?? "0", 10);
        const nb = parseInt(b.match(/_part_(\d+)/)?.[1] ?? "0", 10);
        return na - nb;
      })
      .map((n) => join(finetuningDir, n));
    if (partFiles.length === 0) {
      console.error("Error: No *_part_*.jsonl files found in", finetuningDir);
      process.exit(1);
    }
    return partFiles;
  }

  const path = resolvePath(rawArg);
  if (!path) return [join(finetuningDir, "training_data.jsonl")];
  const stat = fs.statSync(path, { throwIfNoEntry: false });
  if (!stat) {
    console.error("Error: File or directory not found:", path);
    process.exit(1);
  }
  if (stat.isDirectory()) {
    const names = fs.readdirSync(path);
    const partFiles = names
      .filter((n) => n.endsWith(".jsonl") && /_part_\d+\.jsonl$/.test(n))
      .sort((a, b) => {
        const na = parseInt(a.match(/_part_(\d+)/)?.[1] ?? "0", 10);
        const nb = parseInt(b.match(/_part_(\d+)/)?.[1] ?? "0", 10);
        return na - nb;
      })
      .map((n) => join(path, n));
    if (partFiles.length === 0) {
      console.error("Error: No *_part_*.jsonl files found in", path);
      process.exit(1);
    }
    return partFiles;
  }

  return [path];
}

const filesToUpload = getFilesToUpload();
const client = new OpenAI({ apiKey });

async function uploadOne(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found: " + filePath);
  }
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  if (stats.size > MAX_BYTES) {
    throw new Error(`File exceeds ${MAX_MB} MB (${sizeMB} MB). Split or use a smaller subset.`);
  }
  const file = await client.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });
  return { filePath, sizeMB, id: file.id };
}

async function main() {
  const ids = [];
  console.log("Uploading", filesToUpload.length, "file(s)...\n");

  for (let i = 0; i < filesToUpload.length; i++) {
    const filePath = filesToUpload[i];
    const base = filePath.split(/[/\\]/).pop();
    try {
      const { filePath: _p, sizeMB, id } = await uploadOne(filePath);
      ids.push({ file: base, id });
      console.log(base, sizeMB, "MB ->", id);
    } catch (err) {
      const msg = err.response?.data?.error?.message ?? err.message;
      console.error("Upload failed:", base, msg);
      if (err.status === 413) {
        console.error("413 = Payload Too Large. Upload from this machine directly to OpenAI.");
      }
      process.exit(1);
    }
  }

  console.log("\nDone.", ids.length, "file(s) uploaded.");
  if (ids.length > 0) {
    const outPath = join(dirname(filesToUpload[0]), "uploaded-file-ids.txt");
    const lines = ids.map(({ file, id }) => `${file}\t${id}`);
    fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
    console.log("File IDs written to:", outPath);
  }
}

main();
