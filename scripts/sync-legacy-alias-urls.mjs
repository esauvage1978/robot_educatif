#!/usr/bin/env node
/** Aligne go-table-legacy-aliases.json sur les URL courantes de go-table.json (fiches /dp/). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGACY_FILE } from './go-legacy-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TABLE = path.join(ROOT, 'scripts/go-table.json');

if (!fs.existsSync(LEGACY_FILE)) {
	console.log('[sync-legacy-alias-urls] fichier legacy absent — ignoré');
	process.exit(0);
}

const legacyData = JSON.parse(fs.readFileSync(LEGACY_FILE, 'utf8'));
const legacyLinks = legacyData.links || legacyData;
const table = JSON.parse(fs.readFileSync(TABLE, 'utf8'));
const cur = table.links || table;

let updated = 0;
let removed = 0;
for (const id of Object.keys({ ...legacyLinks })) {
	const row = cur[id];
	if (!row?.url) {
		delete legacyLinks[id];
		removed++;
		continue;
	}
	if (legacyLinks[id].url !== row.url || legacyLinks[id].tag !== row.tag) {
		legacyLinks[id] = { ...row, legacyAlias: true };
		updated++;
	}
}

legacyData.links = legacyLinks;
legacyData.count = Object.keys(legacyLinks).length;
legacyData.updated = new Date().toISOString();
fs.writeFileSync(LEGACY_FILE, JSON.stringify(legacyData, null, 1) + '\n');
console.log(`[sync-legacy-alias-urls] ${updated} URLs mises à jour, ${removed} ids retirés`);