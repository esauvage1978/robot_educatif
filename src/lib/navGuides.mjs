/** Menus « Guides d'achat » (header desktop + mobile) — alignés sur la prod robot-educatif.info. */

export const NAV_GUIDES_FR = {
	trigger: "Guides d'achat",
	cols: 3,
	groups: [
		{
			title: 'Par âge',
			links: [
				{ href: '/robot-enfant-4-ans/', label: '4 ans', hint: 'Sans écran' },
				{ href: '/quel-robot-acheter-enfant-5-ans-guide-achat/', label: '5 ans', hint: 'Premiers robots' },
				{ href: '/quel-robot-acheter-enfant-6-ans-guide-achat/', label: '6 ans', hint: 'CP' },
				{ href: '/quel-robot-acheter-enfant-7-ans-guide-achat/', label: '7 ans', hint: 'CE1' },
				{ href: '/quel-robot-acheter-enfant-8-ans-guide-achat/', label: '8 ans', hint: 'Scratch' },
				{ href: '/quel-robot-acheter-enfant-10-ans-guide-achat/', label: '10 ans', hint: 'Blocs et Python' },
				{ href: '/quel-robot-acheter-enfant-12-ans-guide-achat/', label: '12 ans', hint: 'Kits à construire' },
				{ href: '/robot-programmable-14-ans-ado/', label: '14 ans', hint: 'Arduino et Python' },
			],
		},
		{
			title: 'Par budget',
			links: [
				{ href: '/quel-robot-educatif-autour-de-200-euros-guide-2026/', label: 'Autour de 200 €', hint: '' },
				{ href: '/quel-robot-educatif-entre-200-et-500-euros-guide-2026/', label: '200 à 500 €', hint: '' },
				{ href: '/quel-robot-educatif-entre-500-et-1000-euros-guide-2026/', label: '500 à 1 000 €', hint: '' },
				{ href: '/quel-robot-educatif-plus-de-1000-euros-guide-expert-2026/', label: 'Plus de 1 000 €', hint: '' },
			],
		},
		{
			title: 'Pour comparer',
			links: [
				{ href: '/meilleur-robot-programmable-enfant-2026/', label: 'Comparatif 5 à 14 ans', hint: '' },
				{ href: '/equipement-robotique-locataire/', label: 'Locataire', hint: 'Sans atelier' },
				{ href: '/robot-educatif-cadeau-noel-2026/', label: 'Guide cadeaux Noël', hint: '' },
				{ href: '/robot-educatif-sans-ecran-guide/', label: 'Robots sans écran', hint: '' },
				{ href: '/robot-programmable-scratch-lequel-choisir/', label: 'Robots Scratch', hint: '' },
				{ href: '/outil-quel-robot-enfant/', label: 'Quiz : quel robot ?', hint: '' },
			],
		},
	],
};

export const NAV_GUIDES_EN = {
	trigger: 'Buying guides',
	cols: 3,
	groups: [
		{
			title: 'By age',
			links: [
				{ href: '/en/best-robot-for-a-4-year-old/', label: 'Age 4', hint: 'Screen-free' },
				{ href: '/en/best-robot-for-a-5-year-old/', label: 'Age 5', hint: 'First robots' },
				{ href: '/en/best-robot-for-a-6-year-old/', label: 'Age 6', hint: 'Arrow robots' },
				{ href: '/en/best-robot-for-a-7-year-old/', label: 'Age 7', hint: 'Arrows or blocks' },
				{ href: '/en/best-robot-for-an-8-year-old/', label: 'Age 8', hint: 'Scratch-style blocks' },
				{ href: '/en/best-robot-for-a-10-year-old/', label: 'Age 10', hint: 'Blocks and Python' },
				{ href: '/en/best-robot-for-a-12-year-old/', label: 'Age 12', hint: 'Kits to build' },
				{ href: '/en/best-robot-for-a-14-year-old/', label: 'Age 14', hint: 'Arduino and Python' },
			],
		},
		{
			title: 'To compare',
			links: [
				{ href: '/en/best-programmable-robot-for-kids/', label: 'Compare the main robots', hint: '' },
				{ href: '/en/robotics-equipment-for-renters/', label: 'For renters', hint: 'No workshop' },
				{ href: '/en/educational-robot-christmas-gifts-2026/', label: 'Christmas gifts 2026', hint: '' },
				{ href: '/en/mbot-vs-mbot2/', label: 'mBot vs mBot2', hint: '' },
				{ href: '/en/mbot-vs-codey-rocky/', label: 'mBot vs Codey Rocky', hint: '' },
				{ href: '/en/thymio-3-review-price-vs-mbot2/', label: 'Thymio 3 vs mBot2', hint: '' },
				{
					href: '/en/lego-education-computer-science-ai-2026-spike-prime-alternatives/',
					label: 'LEGO SPIKE alternatives',
					hint: '',
				},
				{ href: '/en/sphero-blueprint-robotics-review-modular-robot/', label: 'Sphero Blueprint', hint: '' },
				{ href: '/en/mbot3-release-date-rumors-mbot2-rover-alternatives/', label: 'mBot3 and alternatives', hint: '' },
				{ href: '/en/educational-robots-2026-2027-calendar-buying-guide/', label: 'New robots 2026–2027', hint: '' },
			],
		},
		{
			title: 'Also',
			links: [
				{ href: '/en/buying-guides/', label: 'All buying guides', hint: '' },
				{ href: '/en/raspberry-pi-5-which-ram/', label: 'Raspberry Pi 5 RAM', hint: '' },
				{ href: '/en/smart-home/best-zigbee-dongle-home-assistant/', label: 'Zigbee dongle', hint: '' },
				{ href: '/en/smart-home/smart-plugs-uk-us/', label: 'Smart plugs, UK and US', hint: '' },
			],
		},
	],
};

export const NAV_GUIDES_DE = {
	trigger: 'Kaufberater',
	cols: 3,
	groups: [
		{
			title: 'Nach Alter',
			links: [
				{ href: '/de/lernroboter-4-jahre/', label: '4 Jahre', hint: 'Ohne Bildschirm' },
				{ href: '/de/lernroboter-5-jahre/', label: '5 Jahre', hint: 'Erste Roboter' },
				{ href: '/de/lernroboter-6-jahre/', label: '6 Jahre', hint: 'Pfeiltasten' },
				{ href: '/de/lernroboter-7-jahre/', label: '7 Jahre', hint: 'Pfeile oder Blöcke' },
				{ href: '/de/lernroboter-8-jahre/', label: '8 Jahre', hint: 'Blöcke wie Scratch' },
				{ href: '/de/lernroboter-10-jahre/', label: '10 Jahre', hint: 'Blöcke und Python' },
				{ href: '/de/lernroboter-12-jahre/', label: '12 Jahre', hint: 'Bausätze' },
				{ href: '/de/lernroboter-14-jahre/', label: '14 Jahre', hint: 'Arduino und Python' },
			],
		},
		{
			title: 'Vergleichen',
			links: [
				{ href: '/de/bester-programmierbarer-roboter-fuer-kinder/', label: 'Die wichtigsten Roboter', hint: '' },
				{ href: '/de/robotik-ausruestung-fuer-mieter/', label: 'Für Mieter', hint: 'Ohne Werkstatt' },
				{ href: '/de/lernroboter-weihnachtsgeschenke-2026/', label: 'Weihnachtsgeschenke 2026', hint: '' },
				{ href: '/de/mbot-vs-mbot2/', label: 'mBot vs mBot2', hint: '' },
				{ href: '/de/mbot-vs-codey-rocky/', label: 'mBot vs Codey Rocky', hint: '' },
				{ href: '/de/thymio-3-test-preis-vs-mbot2/', label: 'Thymio 3 vs mBot2', hint: '' },
				{
					href: '/de/lego-education-computer-science-ai-2026-spike-prime-alternativen/',
					label: 'Alternativen zu LEGO SPIKE',
					hint: '',
				},
				{ href: '/de/sphero-blueprint-robotics-test-modularer-roboter/', label: 'Sphero Blueprint', hint: '' },
				{
					href: '/de/mbot3-erscheinungstermin-geruechte-mbot2-rover-alternativen/',
					label: 'mBot3 und Alternativen',
					hint: '',
				},
				{
					href: '/de/bildungsroboter-2026-2027-kalender-kaufberater/',
					label: 'Neue Roboter 2026–2027',
					hint: '',
				},
			],
		},
		{
			title: 'Weiter',
			links: [
				{ href: '/de/kaufberater/', label: 'Alle Kaufberater', hint: '' },
				{ href: '/de/raspberry-pi-5-welcher-ram/', label: 'Raspberry Pi 5: RAM', hint: '' },
				{ href: '/de/smart-home/bester-zigbee-stick-home-assistant/', label: 'Zigbee-Stick', hint: '' },
				{ href: '/de/smart-home/smarte-steckdosen/', label: 'Smarte Steckdosen', hint: '' },
			],
		},
	],
};

export const NAV_GUIDES_IT = {
	trigger: "Guide all'acquisto",
	cols: 3,
	groups: [
		{
			title: 'Per età',
			links: [
				{ href: '/it/robot-programmabile-4-anni/', label: '4 anni', hint: 'Senza schermo' },
				{ href: '/it/robot-programmabile-5-anni/', label: '5 anni', hint: 'Primi robot' },
				{ href: '/it/robot-programmabile-6-anni/', label: '6 anni', hint: 'Frecce' },
				{ href: '/it/robot-programmabile-7-anni/', label: '7 anni', hint: 'Frecce o blocchi' },
				{ href: '/it/robot-programmabile-8-anni/', label: '8 anni', hint: 'Blocchi tipo Scratch' },
				{ href: '/it/robot-programmabile-10-anni/', label: '10 anni', hint: 'Blocchi e Python' },
				{ href: '/it/robot-programmabile-12-anni/', label: '12 anni', hint: 'Kit da montare' },
				{ href: '/it/robot-programmabile-14-anni/', label: '14 anni', hint: 'Arduino e Python' },
			],
		},
		{
			title: 'Confrontare',
			links: [
				{ href: '/it/miglior-robot-programmabile-per-bambini/', label: 'I robot principali', hint: '' },
				{ href: '/it/attrezzatura-robotica-per-inquilini/', label: 'Per inquilini', hint: 'Senza laboratorio' },
				{ href: '/it/regalo-natale-robot-educativo-2026/', label: 'Regali Natale 2026', hint: '' },
				{
					href: '/it/lego-education-computer-science-ai-2026-alternative-spike-prime/',
					label: 'Alternative a LEGO SPIKE',
					hint: '',
				},
				{
					href: '/it/sphero-blueprint-robotics-recensione-robot-modulare/',
					label: 'Sphero Blueprint',
					hint: '',
				},
				{ href: '/it/thymio-3-recensione-prezzo-vs-mbot2/', label: 'Thymio 3 vs mBot2', hint: '' },
				{
					href: '/it/mbot3-data-uscita-voci-mbot2-rover-alternative/',
					label: 'mBot3 e alternative',
					hint: '',
				},
				{
					href: '/it/robot-educativi-2026-2027-calendario-guida-acquisto/',
					label: 'Novità robot 2026–2027',
					hint: '',
				},
			],
		},
		{
			title: 'Anche',
			links: [
				{ href: '/it/domotica/', label: 'Hub domotica', hint: '' },
				{ href: '/it/raspberry-pi-3-vs-4-vs-5/', label: 'Raspberry Pi 3 vs 4 vs 5', hint: '' },
				{ href: '/it/domotica/miglior-chiavetta-zigbee-home-assistant/', label: 'Chiavetta Zigbee', hint: '' },
			],
		},
	],
};

export const NAV_GUIDES_ES = {
	trigger: 'Guías de compra',
	cols: 3,
	groups: [
		{
			title: 'Comparar',
			links: [
				{ href: '/es/mejor-robot-programable-para-ninos/', label: 'Robots programables', hint: '' },
				{ href: '/es/equipo-robotica-para-inquilinos/', label: 'Para inquilinos', hint: 'Sin taller' },
				{ href: '/es/regalo-navidad-robot-educativo-2026/', label: 'Regalos Navidad 2026', hint: '' },
				{ href: '/en/mbot-vs-mbot2/', label: 'mBot vs mBot2 (EN)', hint: '' },
			],
		},
		{
			title: 'También',
			links: [
				{ href: '/es/domotica/', label: 'Domótica', hint: '' },
				{ href: '/en/install-mblock-5-windows/', label: 'Instalar mBlock (EN)', hint: '' },
			],
		},
	],
};

export function blackFridayPromo(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	const isUk = p === '/uk' || p.startsWith('/uk/');
	const isCa = p === '/ca' || p.startsWith('/ca/');
	const isUs = p === '/us' || p.startsWith('/us/');
	const isEn = p === '/en' || p.startsWith('/en/');
	if (p === '/de' || p.startsWith('/de/')) {
		return {
			href: '/de/black-friday/',
			title: 'Black Friday 2026',
			text: 'Lernroboter, Smart Home und geprüfte Aktionen',
		};
	}
	if (p === '/it' || p.startsWith('/it/')) {
		return {
			href: '/it/black-friday/',
			title: 'Black Friday 2026',
			text: 'Robot educativi, domotica e offerte verificate',
		};
	}
	if (p === '/es' || p.startsWith('/es/')) {
		return {
			href: '/es/black-friday/',
			title: 'Black Friday 2026',
			text: 'Robots educativos, domótica y ofertas comprobadas',
		};
	}
	if (isCa) {
		return {
			href: '/ca/black-friday/',
			title: 'Black Friday 2026',
			text: 'Educational robots and smart home, with today’s Amazon.ca price',
		};
	}
	if (isUk) {
		return {
			href: '/uk/black-friday/',
			title: 'Black Friday 2026',
			text: 'Educational robots, smart home and checked UK offers',
		};
	}
	if (isEn || isUs) {
		return {
			href: '/en/black-friday/',
			title: 'Black Friday 2026',
			text: 'Educational robots, smart home and checked UK offers',
		};
	}
	return {
		href: '/black-friday/',
		title: 'Black Friday 2026',
		text: 'Robots éducatifs, domotique et codes promo vérifiés',
	};
}

export function navGuidesForPath(pathname) {
	const p = pathname.replace(/^\/site_vitrine\/robot_educatif/, '');
	const isEn = p === '/en' || p.startsWith('/en/');
	const isUk = p === '/uk' || p.startsWith('/uk/');
	const isCa = p === '/ca' || p.startsWith('/ca/');
	const isUs = p === '/us' || p.startsWith('/us/');
	const promo = blackFridayPromo(pathname);
	if (isEn || isUk || isCa || isUs) return { ...NAV_GUIDES_EN, promo };
	if (p === '/de' || p.startsWith('/de/')) return { ...NAV_GUIDES_DE, promo };
	if (p === '/it' || p.startsWith('/it/')) return { ...NAV_GUIDES_IT, promo };
	if (p === '/es' || p.startsWith('/es/')) return { ...NAV_GUIDES_ES, promo };
	return { ...NAV_GUIDES_FR, promo };
}
