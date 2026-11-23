#!/usr/bin/env node
/**
 * Smoke test recherche Pagefind (après build + preview).
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const outDir = process.env.SCREENSHOT_DIR || '/opt/cursor/artifacts/search-smoke';

const CASES = [
	{ path: '/recherche/', query: 'robot 6 ans', expect: /robot|mbot|programm/i },
	{ path: '/en/search/', query: 'coding robot', expect: /robot|mbot|program/i },
	{ path: '/de/suche/', query: 'Lego', expect: /lego|robot/i },
	{ path: '/it/cerca/', query: 'Lego', expect: /lego|robot/i },
	{ path: '/es/buscar/', query: 'Lego', expect: /lego|robot/i },
	{ path: '/nl/zoeken/', query: 'Lego', expect: /lego|robot/i },
	{ path: '/uk/search/', query: 'coding robot', expect: /robot|mbot/i },
	{ path: '/ca/search/', query: 'Lego', expect: /lego|robot/i },
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const results = [];

for (const c of CASES) {
	const url = base + c.path;
	await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 });
	await page.waitForSelector('.pagefind-ui__search-input', { timeout: 60_000 });
	const input = page.locator('.pagefind-ui__search-input');
	await input.fill(c.query);
	await page.waitForTimeout(800);
	const text = await page.locator('.search-root').innerText();
	const hasHits = (await page.locator('.pagefind-ui__result').count()) > 0;
	const ok = hasHits && c.expect.test(text);
	const shot = join(outDir, c.path.replace(/\//g, '_').replace(/^_|_$/g, '') + '.png');
	await page.screenshot({ path: shot, fullPage: true });
	results.push({ path: c.path, query: c.query, ok, sample: text.slice(0, 200) });
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(JSON.stringify({ base, results, failed: failed.length }, null, 2));
if (failed.length) process.exit(1);