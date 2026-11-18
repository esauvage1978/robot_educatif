#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { B09_ORPHAN_PATHS } from '../src/data/b09-orphan-paths.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const REDIRECT = new Map(
	Object.entries({
		'/domotique/100-projets-domotique-utiles-2026/': '/domotique/configurateur-projet-domotique/',
		'/domotique/automatiser-porte-garage-homey/': '/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/',
		'/domotique/codes-erreurs-domotique/': '/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/',
		'/domotique/maison-connectee-sans-cloud-100-pourcent-locale/': '/domotique/debuter-en-domotique-guide-complet/',
		'/domotique/pieces-detachees-sav-domotique/': '/domotique/pieces-detachees-capteurs-compatibles-moins-cher/',
		'/domotique/suivre-consommation-electrique-prise-connectee/': '/domotique/projets/suivi-consommation-electrique/',
		'/domotique/volet-roulant-sans-neutral/': '/domotique/projets/volet-roulant-connecte/',
		'/python-listes-et-boucles-for/': '/python-boucles-for-while/',
		'/meilleur-robot-educatif-6-ans/': '/quel-robot-acheter-enfant-6-ans-guide-achat/',
		'/outils/quel-robot-educatif-choisir/': '/outil-quel-robot-enfant/',
		'/en/robot-for-8-year-old/': '/en/best-robot-for-an-8-year-old/',
		'/en/robot-for-10-year-old/': '/en/best-robot-for-a-10-year-old/',
		'/en/robot-for-12-year-old/': '/en/best-robot-for-a-12-year-old/',
		'/en/best-screen-free-coding-toys/': '/en/best-robot-for-a-6-year-old/',
		'/en/smart-home/esp32-smart-home-projects/': '/en/smart-home/esp32-smart-home-project-ideas/',
		'/uk/smart-home/esp32-smart-home-projects/': '/uk/smart-home/esp32-smart-home-project-ideas/',
		'/ca/smart-home/esp32-smart-home-projects/': '/ca/smart-home/esp32-smart-home-project-ideas/',
		'/ca/robot-for-8-year-old/': '/ca/best-robot-for-an-8-year-old/',
		'/ca/robot-for-10-year-old/': '/ca/best-robot-for-a-10-year-old/',
		'/ca/robot-for-12-year-old/': '/ca/best-robot-for-a-12-year-old/',
		'/ca/best-screen-free-coding-toys/': '/ca/best-robot-for-a-6-year-old/',
		'/uk/robot-for-8-year-old/': '/uk/best-robot-for-an-8-year-old/',
		'/uk/robot-for-10-year-old/': '/uk/best-robot-for-a-10-year-old/',
		'/uk/robot-for-12-year-old/': '/uk/best-robot-for-a-12-year-old/',
		'/uk/best-screen-free-coding-toys/': '/uk/best-robot-for-a-6-year-old/',
	}),
);

const B09 = B09_ORPHAN_PATHS.map((p) => (p.endsWith('/') ? p : `${p}/`));

function proseLinks(html) {
	const $ = cheerio.load(html);
	const prose = $('article .prose, main article .prose, main .prose').first();
	const links = [];
	prose.find('a[href]').each((_, el) => {
		let h = $(el).attr('href');
		if (!h?.startsWith('/')) return;
		links.push(h.endsWith('/') ? h : `${h}/`);
	});
	return links;
}

function walk(dir, fn) {
	for (const name of fs.readdirSync(dir)) {
		const p = path.join(dir, name);
		if (fs.statSync(p).isDirectory()) walk(p, fn);
		else if (name.endsWith('.html')) fn(p);
	}
}

const inbound = new Map();
walk(dist, (file) => {
	const html = fs.readFileSync(file, 'utf8');
	const links = proseLinks(html);
	for (const l of links) {
		if (!inbound.has(l)) inbound.set(l, 0);
		inbound.set(l, inbound.get(l) + 1);
	}
});

let ok = 0;
const miss = [];
for (const p of B09) {
	if (p.includes('404') || p.includes('gestion-des-cookies') || p.includes('stats-articles')) continue;
	const canon = REDIRECT.get(p) || p;
	const n = (inbound.get(p) || 0) + (canon !== p ? inbound.get(canon) || 0 : 0);
	if (n >= 3) ok++;
	else miss.push({ p, n, canon: canon !== p ? canon : undefined });
}
console.log(`B09 éditorial: ${ok}/${B09.length} avec >=3 entrants`);
console.log('Manquants:', miss.slice(0, 30));