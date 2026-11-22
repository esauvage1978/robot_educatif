#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const LEGACY_FILE = path.join(SCRIPT_DIR, 'go-table-legacy-aliases.json');

export function loadLegacyAliases() {
	if (!fs.existsSync(LEGACY_FILE)) return new Map();
	const data = JSON.parse(fs.readFileSync(LEGACY_FILE, 'utf8'));
	const links = data.links || data;
	return new Map(Object.entries(links));
}

/** Injecte les alias legacy dans une Map id -> entry (go-links). */
export function applyLegacyToTable(table, urlToId = null) {
	const legacy = loadLegacyAliases();
	for (const [id, entry] of legacy) {
		const { legacyAlias: _drop, ...rest } = entry;
		const row = { ...rest, legacyAlias: true };
		table.set(id, row);
		if (urlToId && row.url && !urlToId.has(row.url)) urlToId.set(row.url, id);
	}
	return legacy.size;
}

export function legacyIdSet() {
	return new Set(loadLegacyAliases().keys());
}