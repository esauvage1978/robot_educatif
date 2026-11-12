import fs from 'node:fs';
import path from 'node:path';

const DIST_ROOT = path.resolve(process.env.ASTRO_OUT_DIR || path.join(process.cwd(), 'dist'));

/** Vérifie la présence de la page dans dist (build Astro). */
export function pageExists(href) {
	if (!href || typeof href !== 'string' || !href.startsWith('/')) return false;
	if (process.env.ASTRO_SKIP_SIDEBAR_LINK_FILTER === '1') return true;
	if (!fs.existsSync(DIST_ROOT)) return true;
	const rel = href.replace(/^\//, '').replace(/\/$/, '');
	return fs.existsSync(path.join(DIST_ROOT, rel, 'index.html'));
}

export function localePrefix(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	const m = p.match(/^\/(en|uk|us|ca|de|it|es)(?=\/|$)/);
	return m ? `/${m[1]}` : '';
}

export function localeKey(pathname) {
	const pre = localePrefix(pathname);
	if (pre === '/de') return 'de';
	if (pre === '/it') return 'it';
	if (pre === '/es') return 'es';
	if (pre === '/en' || pre === '/uk' || pre === '/us' || pre === '/ca') return 'en';
	return 'fr';
}

/** Adapte un href FR ou EN vers la variante locale si la page existe. */
export function localizeGuideHref(href, pathname) {
	if (!href) return href;
	const prefix = localePrefix(pathname);
	if (!prefix) return href;
	if (href.startsWith(`${prefix}/`) || href === prefix || href === `${prefix}/`) return href;
	if (href.startsWith('/en/') && (prefix === '/uk' || prefix === '/us' || prefix === '/ca')) {
		const alt = href.replace(/^\/en\//, `${prefix}/`);
		if (pageExists(alt)) return alt;
	}
	if (href.startsWith('/en/') && prefix === '/en') return href;
	if (href.startsWith('/de/') && prefix === '/de') return href;
	if (href.startsWith('/it/') && prefix === '/it') return href;
	if (href.startsWith('/es/') && prefix === '/es') return href;
	if (!/^\/(en|uk|us|ca|de|it|es)\//.test(href)) {
		const alt = `${prefix}${href}`.replace(/\/{2,}/g, '/');
		if (pageExists(alt)) return alt;
	}
	return href;
}

function filterGroup(group, pathname) {
	const links = group.links
		.map((l) => {
			const href = localizeGuideHref(l.href, pathname);
			return pageExists(href) ? { ...l, href } : null;
		})
		.filter(Boolean);
	return links.length ? { ...group, links } : null;
}

const SIDEBAR_NAV = {
	fr: {
		quickNavTitle: 'Sommaire',
		readAlsoTitle: 'À lire aussi',
		groups: [
			{
				title: 'Par âge',
				type: 'chips',
				links: [
					{ href: '/robot-enfant-4-ans/', label: '4 ans' },
					{ href: '/quel-robot-acheter-enfant-5-ans-guide-achat/', label: '5 ans' },
					{ href: '/quel-robot-acheter-enfant-6-ans-guide-achat/', label: '6 ans' },
					{ href: '/quel-robot-acheter-enfant-7-ans-guide-achat/', label: '7 ans' },
					{ href: '/quel-robot-acheter-enfant-8-ans-guide-achat/', label: '8 ans' },
					{ href: '/quel-robot-acheter-enfant-10-ans-guide-achat/', label: '10 ans' },
					{ href: '/quel-robot-acheter-enfant-12-ans-guide-achat/', label: '12 ans' },
					{ href: '/robot-programmable-14-ans-ado/', label: 'Ado 14+' },
				],
			},
			{
				title: 'Par budget',
				type: 'chips',
				links: [
					{ href: '/robot-moins-de-50-euros/', label: '< 50 €' },
					{ href: '/robot-moins-de-100-euros/', label: '< 100 €' },
					{ href: '/quel-robot-educatif-autour-de-200-euros-guide-2026/', label: '~200 €' },
					{ href: '/quel-robot-educatif-entre-200-et-500-euros-guide-2026/', label: '200–500 €' },
					{ href: '/quel-robot-educatif-entre-500-et-1000-euros-guide-2026/', label: '500–1000 €' },
					{ href: '/quel-robot-educatif-plus-de-1000-euros-guide-expert-2026/', label: '> 1000 €' },
				],
			},
			{
				title: 'Guides spécialisés',
				type: 'list',
				links: [
					{ href: '/robot-pedagogique-ecole/', label: 'Robot pédagogique pour l’école' },
					{ href: '/equiper-classe-robots-budget-packs-2026/', label: 'Équiper une classe (packs)' },
					{ href: '/robot-educatif-sans-ecran-guide/', label: 'Robots sans écran' },
					{ href: '/equipement-robotique-locataire/', label: 'Robotique pour locataire' },
				],
			},
			{
				title: 'Infos pratiques',
				type: 'list',
				links: [
					{ href: '/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/', label: 'Codes erreurs & SAV' },
					{ href: '/mblock-vs-scratch-lequel-choisir/', label: 'Scratch ou Python ?' },
					{ href: '/telecharger-mblock-5-gratuit-guide-2026/', label: 'mBlock en ligne' },
				],
			},
		],
	},
	en: {
		quickNavTitle: 'Contents',
		readAlsoTitle: '📚 Read next',
		groups: [
			{
				title: 'By age',
				type: 'chips',
				links: [
					{ href: '/en/best-robot-for-a-4-year-old/', label: 'Age 4' },
					{ href: '/en/best-robot-for-a-5-year-old/', label: 'Age 5' },
					{ href: '/en/best-robot-for-a-6-year-old/', label: 'Age 6' },
					{ href: '/en/best-robot-for-a-7-year-old/', label: 'Age 7' },
					{ href: '/en/best-robot-for-an-8-year-old/', label: 'Age 8' },
					{ href: '/en/best-robot-for-a-10-year-old/', label: 'Age 10' },
					{ href: '/en/best-robot-for-a-12-year-old/', label: 'Age 12' },
					{ href: '/en/best-robot-for-a-14-year-old/', label: 'Age 14+' },
				],
			},
			{
				title: 'By budget',
				type: 'chips',
				links: [
					{ href: '/en/educational-robot-200-500-guide/', label: '£200–500' },
					{ href: '/en/best-programmable-robot-for-kids/', label: 'Compare robots' },
					{ href: '/en/educational-robot-christmas-gifts-2026/', label: 'Christmas gifts' },
				],
			},
			{
				title: 'Special guides',
				type: 'list',
				links: [
					{ href: '/en/best-programmable-robot-for-kids/', label: 'Programmable robots hub' },
					{ href: '/en/educational-robot-christmas-gifts-2026/', label: 'Christmas robot gifts 2026' },
					{ href: '/en/mbot-vs-mbot2/', label: 'mBot vs mBot2' },
					{ href: '/en/robotics-equipment-for-renters/', label: 'Robotics for renters' },
				],
			},
			{
				title: 'Practical info',
				type: 'list',
				links: [
					{
						href: '/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly/',
						label: 'Error codes & support',
					},
					{ href: '/en/mblock-vs-scratch/', label: 'Scratch or Python?' },
					{ href: '/en/mblock-online-no-install/', label: 'mBlock online' },
				],
			},
		],
	},
	de: {
		quickNavTitle: 'Inhalt',
		readAlsoTitle: 'Mehr lesen',
		groups: [
			{
				title: 'Nach Alter',
				type: 'chips',
				links: [
					{ href: '/de/lernroboter-4-jahre/', label: '4 Jahre' },
					{ href: '/de/lernroboter-5-jahre/', label: '5 Jahre' },
					{ href: '/de/lernroboter-8-jahre/', label: '8 Jahre' },
					{ href: '/de/lernroboter-10-jahre/', label: '10 Jahre' },
					{ href: '/de/lernroboter-12-jahre/', label: '12 Jahre' },
					{ href: '/de/lernroboter-14-jahre/', label: '14+' },
				],
			},
			{
				title: 'Budget',
				type: 'chips',
				links: [
					{ href: '/de/bester-programmierbarer-roboter-fuer-kinder/', label: 'Roboter vergleichen' },
					{ href: '/de/lernroboter-weihnachtsgeschenke-2026/', label: 'Weihnachten 2026' },
				],
			},
			{
				title: 'Spezial-Guides',
				type: 'list',
				links: [
					{ href: '/de/bester-programmierbarer-roboter-fuer-kinder/', label: 'Programmierbare Roboter' },
					{ href: '/de/lernroboter-weihnachtsgeschenke-2026/', label: 'Weihnachtsgeschenke 2026' },
					{ href: '/de/mbot-vs-mbot2/', label: 'mBot vs mBot2' },
					{ href: '/de/robotik-ausruestung-fuer-mieter/', label: 'Robotik für Mieter' },
				],
			},
			{
				title: 'Praxis',
				type: 'list',
				links: [
					{
						href: '/de/smart-home/fehlercodes-loesung-zigbee-home-assistant-shelly/',
						label: 'Fehlercodes & Support',
					},
					{ href: '/de/mblock-vs-scratch/', label: 'Scratch oder Python?' },
					{ href: '/de/mblock-online-ohne-installation/', label: 'mBlock online' },
				],
			},
		],
	},
	it: {
		quickNavTitle: 'Indice',
		readAlsoTitle: '📚 Da leggere anche',
		groups: [
			{
				title: 'Per età',
				type: 'chips',
				links: [
					{ href: '/it/robot-programmabile-4-anni/', label: '4 anni' },
					{ href: '/it/robot-programmabile-5-anni/', label: '5 anni' },
					{ href: '/it/robot-programmabile-8-anni/', label: '8 anni' },
					{ href: '/it/robot-programmabile-10-anni/', label: '10 anni' },
					{ href: '/it/robot-programmabile-12-anni/', label: '12 anni' },
					{ href: '/it/robot-programmabile-14-anni/', label: '14+' },
				],
			},
			{
				title: 'Budget',
				type: 'chips',
				links: [
					{ href: '/it/miglior-robot-programmabile-per-bambini/', label: 'Confronta robot' },
					{ href: '/it/regalo-natale-robot-educativo-2026/', label: 'Natale 2026' },
				],
			},
			{
				title: 'Guide speciali',
				type: 'list',
				links: [
					{ href: '/it/miglior-robot-programmabile-per-bambini/', label: 'Robot programmabili' },
					{ href: '/it/regalo-natale-robot-educativo-2026/', label: 'Regali Natale 2026' },
					{ href: '/it/thymio-3-recensione-prezzo-vs-mbot2/', label: 'Thymio 3 vs mBot2' },
					{ href: '/it/attrezzatura-robotica-per-inquilini/', label: 'Robotica per inquilini' },
				],
			},
			{
				title: 'Info pratiche',
				type: 'list',
				links: [
					{
						href: '/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly/',
						label: 'Codici errore & assistenza',
					},
					{ href: '/it/mblock-vs-scratch/', label: 'Scratch o Python?' },
					{ href: '/it/installare-mblock-5-windows/', label: 'mBlock online' },
				],
			},
		],
	},
	es: {
		quickNavTitle: 'Índice',
		readAlsoTitle: '📚 También te interesa',
		groups: [
			{
				title: 'Por edad',
				type: 'chips',
				links: [
					{ href: '/es/robot-programable-4-anos/', label: '4 años' },
					{ href: '/es/robot-programable-8-anos/', label: '8 años' },
					{ href: '/es/robot-programable-10-anos/', label: '10 años' },
				],
			},
			{
				title: 'Presupuesto',
				type: 'chips',
				links: [
					{ href: '/es/mejor-robot-programable-para-ninos/', label: 'Comparar robots' },
					{ href: '/es/regalo-navidad-robot-educativo-2026/', label: 'Navidad 2026' },
				],
			},
			{
				title: 'Guías especializadas',
				type: 'list',
				links: [
					{ href: '/es/mejor-robot-programable-para-ninos/', label: 'Robots programables' },
					{ href: '/es/regalo-navidad-robot-educativo-2026/', label: 'Regalos Navidad 2026' },
					{ href: '/es/domotica/', label: 'Domótica' },
					{ href: '/es/equipo-robotica-para-inquilinos/', label: 'Robótica para inquilinos' },
				],
			},
			{
				title: 'Info práctica',
				type: 'list',
				links: [
					{
						href: '/es/domotica/codigos-error-solucion-zigbee-home-assistant-shelly/',
						label: 'Códigos error y soporte',
					},
					{ href: '/en/mblock-vs-scratch/', label: 'Scratch o Python (EN)' },
					{ href: '/en/install-mblock-5-windows/', label: 'mBlock (EN)' },
				],
			},
		],
	},
};

export function getSidebarGuideNav(pathname) {
	const key = localeKey(pathname);
	const cfg = SIDEBAR_NAV[key] ?? SIDEBAR_NAV.fr;
	const groups = cfg.groups.map((g) => filterGroup(g, pathname)).filter(Boolean);
	return { quickNavTitle: cfg.quickNavTitle, readAlsoTitle: cfg.readAlsoTitle, groups };
}

/** Chemins guide Noël par locale (pour check.py). */
export const NOEL_GUIDE_PATH = {
	fr: '/robot-educatif-cadeau-noel-2026/',
	en: '/en/educational-robot-christmas-gifts-2026/',
	us: '/us/educational-robot-christmas-gifts-2026/',
	uk: '/uk/educational-robot-christmas-gifts-2026/',
	ca: '/ca/educational-robot-christmas-gifts-2026/',
	de: '/de/lernroboter-weihnachtsgeschenke-2026/',
	it: '/it/regalo-natale-robot-educativo-2026/',
	es: '/es/regalo-navidad-robot-educativo-2026/',
};
