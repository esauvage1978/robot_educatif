/**
 * Copy and SEO metadata for /en/, /uk/, /ca/ best-programmable-robot-for-kids.
 * Native Astro pages per market (not post-build mirror) — see scripts/mirror-en-to-uk-ca.mjs KEEP_IF_PRESENT.
 */
import { fmtMarketPrice } from '../lib/amazonMarket.mjs';
import amazonUk from './amazon-latest-uk.json';

function ukBand(ids) {
	const items = amazonUk.items || {};
	const bits = ids
		.map((asin) => items[asin])
		.filter((r) => r?.prix != null)
		.map((r) => fmtMarketPrice(r.prix, 'uk'));
	if (!bits.length) return '';
	return bits.join('–');
}

const ukBotley = ukBand(['B083T5G5ZK', 'B083T58PKM']);
const ukMbot = amazonUk.items?.B07XR98YYQ?.prix != null ? fmtMarketPrice(amazonUk.items.B07XR98YYQ.prix, 'uk') : '';
const ukMbot2 = amazonUk.items?.B0919F9CKS?.prix != null ? fmtMarketPrice(amazonUk.items.B0919F9CKS.prix, 'uk') : '';

export const BEST_PROGRAMMABLE_ROBOT_ANGLO = {
	us: {
		prefix: '/en/',
		htmlLang: 'en',
		market: 'us',
		title: 'Best programmable robot for kids (2026): US guide ages 5–14',
		description:
			'Compare Botley 2.0, mBot, mBot2, Codey Rocky and ELEGOO for US families. Amazon.com listings, block coding and grades 1–8 buying tips.',
		updated: '4 November 2026',
		intro:
			'This hub helps <strong>American families</strong> pick a <strong>coding robot</strong> for children in <strong>grades 1–8</strong> (roughly ages 5–14). Listings use <strong>Amazon.com</strong>; sales tax is added at checkout and varies by state. The comparison table below shows our last Creators API snapshot (date under the table) in <strong>USD</strong> where available.',
		specsLead:
			'Figures from official datasheets (October 2026). Confirm today’s <strong>USD</strong> price on Amazon.com before you order.',
		giftBullets: [
			'Order before Thanksgiving if you need delivery before winter break — stock on Amazon.com moves fast.',
			'Many schools use <strong>Scratch</strong> in grades 3–6; match the robot to the software your district already teaches.',
		],
		ageBullets: {
			young: 'Kindergarten and grades 1–2 — short sessions, often <strong>no screen</strong>',
			mid: 'Grades 3–5 — Scratch-style blocks, 15–30 min assembly, first sensors',
			older: 'Grades 6–8 — bridge to <strong>Python</strong>, Wi‑Fi projects, longer challenges',
			teen: 'High school with an adult — Arduino C++ kits such as the ELEGOO car',
		},
		specAgeMbot2: 'Upper elementary to middle school (Makeblock curriculum)',
		mistakeDoc: 'no English documentation',
		closing: 'confirm today’s price on Amazon.com',
	},
	uk: {
		prefix: '/uk/',
		htmlLang: 'en-GB',
		market: 'uk',
		title: 'Best programmable robot for kids (2026): UK guide ages 5–14',
		description:
			'Botley 2.0, mBot, mBot2 and ELEGOO compared for UK homes. Amazon.co.uk prices in GBP (VAT included), Key Stage 1–3 tips and age guides.',
		updated: '4 November 2026',
		intro: `This hub helps <strong>UK families</strong> choose a <strong>programmable robot</strong> for children aged <strong>5–14</strong> (Key Stage 1 through Key Stage 3). Shop on <strong>Amazon.co.uk</strong>; displayed prices include VAT where Amazon lists them. Snapshot <strong>11 November 2026</strong>: Botley 2.0 from about <strong>${ukBotley || '£57–£68'}</strong>, Makeblock mBot about <strong>${ukMbot || '£48'}</strong>, mBot2 about <strong>${ukMbot2 || '£115'}</strong> — always re-check the live listing.`,
		specsLead:
			'Manufacturer specs below (October 2026). Our comparison table uses <strong>GBP</strong> from the Amazon.co.uk feed when the ASIN is in that snapshot.',
		giftBullets: [
			'Order early in December — Royal Mail and courier cut-offs bite before Christmas; Prime delivery is not guaranteed on every kit.',
			'If the school mentions <strong>Key Stage 2 computing</strong>, block-based kits such as mBot fit the national curriculum angle without extra software licences.',
		],
		ageBullets: {
			young: 'Ages 5–7 — short sessions, often <strong>no screen</strong>',
			mid: 'Ages 8–10 — Scratch-style blocks in mBlock, 15–30 min assembly',
			older: 'Ages 10–14 — <strong>Python</strong> on mBot2, Wi‑Fi projects, longer challenges',
			teen: 'Ages 13+ with an adult — Arduino C++ kits such as the ELEGOO car',
		},
		specAgeMbot2: 'Key Stage 2–3 (Makeblock curriculum)',
		mistakeDoc: 'no UK English documentation or a US-only plug in the box',
		closing: 'confirm today’s price on Amazon.co.uk (VAT included)',
	},
	ca: {
		prefix: '/ca/',
		htmlLang: 'en-CA',
		market: 'ca',
		title: 'Best programmable robot for kids (2026): Canada guide ages 5–14',
		description:
			'Coding robots for Canadian families: mBot, mBot2, Botley and ELEGOO with Amazon.ca links. Grades 1–8, STEM programmes and CAD pricing notes.',
		updated: '4 November 2026',
		intro:
			'This page targets <strong>Canadian households</strong> shopping on <strong>Amazon.ca</strong> (Ontario, Quebec, BC, Alberta and other provinces). Prices in the table appear in <strong>CAD</strong> when our feed lists them; at checkout Amazon adds <strong>GST/HST/PST</strong> depending on your province. Typical listings we see in autumn 2026: Botley 2.0 around <strong>CA$75–CA$95</strong>, mBot around <strong>CA$85–CA$110</strong>, mBot2 around <strong>CA$150–CA$185</strong> — verify on the product page before buying.',
		specsLead:
			'Specs from manufacturers (October 2026). Cross-border US listings do not include Canadian duties — stay on Amazon.ca for STEM classroom and home use.',
		giftBullets: [
			'Holiday shipping to rural addresses often needs an extra week — factor in Canada Post or courier delays.',
			'Many provinces fund <strong>STEM</strong> kits through school boards; keep the receipt if your child’s teacher runs a robotics club.',
		],
		ageBullets: {
			young: 'Grades 1–3 — short sessions, often <strong>no screen</strong>',
			mid: 'Grades 4–6 — Scratch-style blocks, first sensors, bilingual instructions when available',
			older: 'Grades 7–8 — <strong>Python</strong>, Wi‑Fi projects, science-fair depth',
			teen: 'Secondary school with an adult — Arduino C++ kits such as the ELEGOO car',
		},
		specAgeMbot2: 'Upper elementary / junior high (Makeblock curriculum)',
		mistakeDoc: 'a US-only power adapter without a compatible Canadian plug',
		closing: 'confirm today’s price on Amazon.ca including provincial tax',
	},
};