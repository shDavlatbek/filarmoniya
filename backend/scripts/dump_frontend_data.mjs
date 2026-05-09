#!/usr/bin/env node
/**
 * Dump initial-seed *.js modules (originally `src/data/`, now archived under
 * `backend/seed_data/`) into a single JSON file for the Django
 * seed_from_frontend management command.
 *
 * Run from the backend dir:
 *   node scripts/dump_frontend_data.mjs seed_data dump.json
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const dataDir = path.resolve(process.argv[2] || 'seed_data');
const outFile = path.resolve(process.argv[3] || 'dump.json');

const files = (await fs.readdir(dataDir)).filter(f => f.endsWith('.js'));
const out = {};

for (const f of files) {
  const abs = path.join(dataDir, f);
  const mod = await import(url.pathToFileURL(abs).href);
  const key = path.basename(f, '.js');
  out[key] = {};
  for (const [name, value] of Object.entries(mod)) {
    out[key][name] = value;
  }
}

await fs.writeFile(outFile, JSON.stringify(out, null, 2), 'utf-8');
console.log(`Wrote ${outFile} (${Object.keys(out).length} files)`);
