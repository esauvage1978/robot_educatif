#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultF41DistDir, readF41GoTable, slugsFromDist } from './go-legacy-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const f41Table = readF41GoTable(ROOT);
const f41links = f41Table.links || f41Table;

const f41Dist = process.argv[2] || defaultF41DistDir();
const curDist = process.argv[3] || path.join(ROOT, 'dist');
const f41s = slugsFromDist(f41Dist);
let curs = new Set();
if (fs.existsSync(curDist)) curs = slugsFromDist(curDist);

const ids = new Set([...f41s].filter((id) => !curs.has(id)));
ids.add('aw-14133-8e0f4a2bc1');

const links = {};
for (const id of [...ids].sort()) {
	if (!f41links[id]) {
		console.error('[generate-go-legacy-aliases] entrée f41 manquante:', id);
		process.exit(1);
	}
	const { legacyAlias: _d, ...rest } = f41links[id];
	links[id] = { ...rest, legacyAlias: true };
}

const outPath = path.join(ROOT, 'scripts/go-table-legacy-aliases.json');
fs.writeFileSync(
	outPath,
	JSON.stringify(
		{
			site: 'robot-educatif.info',
			description:
				'Aliases /go/ conservés depuis f41bd1e (slugs absents du HTML courant + aw-14133)',
			count: Object.keys(links).length,
			links,
		},
		null,
		1,
	) + '\n',
);
console.log(`[generate-go-legacy-aliases] ${Object.keys(links).length} ids → ${outPath}`);