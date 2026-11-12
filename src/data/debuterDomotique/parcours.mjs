/**
 * Parcours « Débuter en domotique » : hub, étapes ordonnées et navigation.
 */
import { domotiquePath, frDomotiquePath } from '../../lib/domotiqueI18n.mjs';

export const PARCOURS_HUB = {
	frSlug: 'debuter-domotique-par-ou-commencer',
	shortTitle: {
		fr: 'Par où commencer',
		en: 'Where to start',
		de: 'Wo anfangen',
		it: 'Da dove iniziare',
		es: 'Por dónde empezar',
	},
	cardBlurb: {
		fr: 'Un premier équipement concret et un ordre de lecture pour ne pas acheter au hasard.',
		en: 'A concrete first setup and reading order so you do not buy at random.',
		de: 'Erstes konkretes Setup und Lesereihenfolge, damit Sie nicht planlos kaufen.',
		it: 'Primo allestimento concreto e ordine di lettura per non comprare a caso.',
		es: 'Primer montaje concreto y orden de lectura para no comprar al azar.',
	},
};

/** @typedef {'fr'|'en'|'de'|'it'|'es'} ParcoursLang */

export const PARCOURS_LABELS = {
	fr: {
		stepOf: (x, n) => `Étape ${x} sur ${n}`,
		hubIntro: (n) => `Parcours débutant · ${n} étapes`,
		prevLabel: 'Étape précédente',
		nextLabel: 'Étape suivante',
		backToParcours: 'Retour au parcours',
		hubTitle: 'Par où commencer',
		relatedTitle: 'Pour aller plus loin',
		pillarPrefix: 'Guide complet',
		navAria: 'Navigation du parcours débutant',
	},
	en: {
		stepOf: (x, n) => `Step ${x} of ${n}`,
		hubIntro: (n) => `Beginner path · ${n} steps`,
		prevLabel: 'Previous step',
		nextLabel: 'Next step',
		backToParcours: 'Back to the path',
		hubTitle: 'Where to start',
		relatedTitle: 'Go further',
		pillarPrefix: 'Complete guide',
		navAria: 'Beginner smart home path navigation',
	},
	de: {
		stepOf: (x, n) => `Schritt ${x} von ${n}`,
		hubIntro: (n) => `Einsteiger-Pfad · ${n} Schritte`,
		prevLabel: 'Vorheriger Schritt',
		nextLabel: 'Nächster Schritt',
		backToParcours: 'Zurück zum Pfad',
		hubTitle: 'Wo anfangen',
		relatedTitle: 'Weiterlesen',
		pillarPrefix: 'Kompletter Leitfaden',
		navAria: 'Navigation Einsteiger-Smart-Home-Pfad',
	},
	it: {
		stepOf: (x, n) => `Passo ${x} di ${n}`,
		hubIntro: (n) => `Percorso principianti · ${n} passi`,
		prevLabel: 'Passo precedente',
		nextLabel: 'Passo successivo',
		backToParcours: 'Torna al percorso',
		hubTitle: 'Da dove iniziare',
		relatedTitle: 'Per approfondire',
		pillarPrefix: 'Guida completa',
		navAria: 'Navigazione percorso principianti domotica',
	},
	es: {
		stepOf: (x, n) => `Paso ${x} de ${n}`,
		hubIntro: (n) => `Recorrido para principiantes · ${n} pasos`,
		prevLabel: 'Paso anterior',
		nextLabel: 'Paso siguiente',
		backToParcours: 'Volver al recorrido',
		hubTitle: 'Por dónde empezar',
		relatedTitle: 'Para ir más lejos',
		pillarPrefix: 'Guía completa',
		navAria: 'Navegación del recorrido para principiantes',
	},
};

export const PARCOURS_STEPS = [
	{
		frSlug: 'debuter-en-domotique-guide-complet',
		shortTitle: {
			fr: 'Le guide complet',
			en: 'Complete guide',
			de: 'Kompletter Leitfaden',
			it: 'Guida completa',
			es: 'Guía completa',
		},
		cardBlurb: {
			fr: 'La carte du parcours : objectifs, ordre des décisions et liens vers chaque thème.',
			en: 'The map of the path: goals, decision order, and links to each topic.',
			de: 'Die Landkarte: Ziele, Entscheidungsreihenfolge und Links zu jedem Thema.',
			it: 'La mappa del percorso: obiettivi, ordine delle scelte e link verso ogni tema.',
			es: 'El mapa del recorrido: objetivos, orden de decisiones y enlaces a cada tema.',
		},
	},
	{
		frSlug: 'quelle-box-domotique-choisir-debutant',
		shortTitle: {
			fr: 'Choisir sa box',
			en: 'Choose your hub',
			de: 'Zentrale wählen',
			it: 'Scegliere la centralina',
			es: 'Elegir la central',
		},
		cardBlurb: {
			fr: 'Comparer Home Assistant, Homey, Jeedom ou une solution sans box selon votre budget et vos objectifs.',
			en: 'Compare Home Assistant, Homey, Jeedom, or no hub based on budget and goals.',
			de: 'Home Assistant, Homey, Jeedom oder ohne Zentrale — nach Budget und Zielen vergleichen.',
			it: 'Confrontare Home Assistant, Homey, Jeedom o nessuna centralina in base a budget e obiettivi.',
			es: 'Comparar Home Assistant, Homey, Jeedom o sin central según presupuesto y objetivos.',
		},
	},
	{
		frSlug: 'protocoles-domotique-zigbee-wifi-thread-matter',
		shortTitle: {
			fr: 'Les protocoles',
			en: 'Protocols',
			de: 'Protokolle',
			it: 'Protocolli',
			es: 'Protocolos',
		},
		cardBlurb: {
			fr: 'Zigbee, Wi-Fi, Thread et Matter expliqués pour savoir quoi brancher chez vous.',
			en: 'Zigbee, Wi-Fi, Thread, and Matter explained so you know what to use at home.',
			de: 'Zigbee, Wi-Fi, Thread und Matter verständlich — was passt zu Ihrem Zuhause.',
			it: 'Zigbee, Wi-Fi, Thread e Matter spiegati per capire cosa usare in casa.',
			es: 'Zigbee, Wi-Fi, Thread y Matter explicados para saber qué usar en casa.',
		},
	},
	{
		frSlug: 'premiers-appareils-domotique-acheter',
		shortTitle: {
			fr: 'Premiers appareils',
			en: 'First devices',
			de: 'Erste Geräte',
			it: 'Primi dispositivi',
			es: 'Primeros dispositivos',
		},
		cardBlurb: {
			fr: 'Une short-list par objectif : éclairage, chauffage, sécurité — sans remplir la maison d’un coup.',
			en: 'A short list by goal: lighting, heating, security — without filling the house at once.',
			de: 'Kurze Liste nach Ziel: Licht, Heizung, Sicherheit — nicht alles auf einmal kaufen.',
			it: 'Lista breve per obiettivo: luci, riscaldamento, sicurezza — senza riempire la casa subito.',
			es: 'Lista breve por objetivo: luz, calefacción, seguridad — sin llenar la casa de golpe.',
		},
	},
	{
		frSlug: 'glossaire-domotique',
		shortTitle: {
			fr: 'Glossaire',
			en: 'Glossary',
			de: 'Glossar',
			it: 'Glossario',
			es: 'Glosario',
		},
		cardBlurb: {
			fr: 'Les mots que vous croiserez partout, avec des exemples concrets dans une installation.',
			en: 'Terms you will see everywhere, with concrete examples in a real setup.',
			de: 'Begriffe, die überall auftauchen — mit Beispielen aus einer echten Installation.',
			it: 'I termini che incontrerete ovunque, con esempi concreti in un’installazione reale.',
			es: 'Términos que verá en todas partes, con ejemplos concretos en una instalación real.',
		},
	},
	{
		frSlug: 'premieres-automatisations-domotique',
		shortTitle: {
			fr: 'Premières automatisations',
			en: 'First automations',
			de: 'Erste Automationen',
			it: 'Prime automazioni',
			es: 'Primeras automatizaciones',
		},
		cardBlurb: {
			fr: 'Des scénarios utiles au quotidien, testables étape par étape dans Home Assistant ou Homey.',
			en: 'Useful everyday scenarios you can build step by step in Home Assistant or Homey.',
			de: 'Alltagsszenarien, die Sie Schritt für Schritt in Home Assistant oder Homey nachbauen.',
			it: 'Scenari utili ogni giorno, da provare passo passo in Home Assistant o Homey.',
			es: 'Escenarios útiles a diario, probables paso a paso en Home Assistant o Homey.',
		},
	},
	{
		frSlug: 'erreurs-debutant-domotique-faq',
		shortTitle: {
			fr: 'Erreurs fréquentes',
			en: 'Common mistakes',
			de: 'Typische Fehler',
			it: 'Errori frequenti',
			es: 'Errores frecuentes',
		},
		cardBlurb: {
			fr: 'Cloud obligatoire, mauvais protocole, budget caché : les pièges à éviter avant d’acheter.',
			en: 'Mandatory cloud, wrong protocol, hidden costs: pitfalls to avoid before buying.',
			de: 'Pflicht-Cloud, falsches Protokoll, versteckte Kosten — Fallen vor dem Kauf.',
			it: 'Cloud obbligatorio, protocollo sbagliato, costi nascosti: trappole da evitare prima di comprare.',
			es: 'Nube obligatoria, protocolo equivocado, costes ocultos: trampas a evitar antes de comprar.',
		},
	},
];

const ALL_FR_SLUGS = new Set([
	PARCOURS_HUB.frSlug,
	...PARCOURS_STEPS.map((s) => s.frSlug),
]);

/** @param {string} frSlug */
export function isParcoursArticle(frSlug) {
	return ALL_FR_SLUGS.has(frSlug);
}

/** @param {ParcoursLang} lang */
function localizedHref(lang, frSlug) {
	if (lang === 'fr') return frDomotiquePath(frSlug);
	const path = domotiquePath(lang, frSlug);
	if (!path) return frDomotiquePath(frSlug);
	return path;
}

/** @param {ParcoursLang} lang @param {string} frSlug */
function stepMeta(lang, frSlug, shortTitleMap, cardBlurbMap) {
	return {
		frSlug,
		href: localizedHref(lang, frSlug),
		shortTitle: shortTitleMap[lang] ?? shortTitleMap.fr,
		cardBlurb: cardBlurbMap?.[lang] ?? cardBlurbMap?.fr ?? '',
	};
}

/** @param {ParcoursLang} lang @param {string} frSlug */
export function getParcoursStep(lang, frSlug) {
	if (frSlug === PARCOURS_HUB.frSlug) {
		return {
			...stepMeta(lang, frSlug, PARCOURS_HUB.shortTitle, PARCOURS_HUB.cardBlurb),
			isHub: true,
			stepIndex: null,
		};
	}
	const idx = PARCOURS_STEPS.findIndex((s) => s.frSlug === frSlug);
	if (idx === -1) return null;
	const step = PARCOURS_STEPS[idx];
	return {
		...stepMeta(lang, step.frSlug, step.shortTitle, step.cardBlurb),
		isHub: false,
		stepIndex: idx + 1,
	};
}

function hubNavTarget(lang) {
	const L = PARCOURS_LABELS[lang] ?? PARCOURS_LABELS.fr;
	return {
		frSlug: PARCOURS_HUB.frSlug,
		href: localizedHref(lang, PARCOURS_HUB.frSlug),
		shortTitle: PARCOURS_HUB.shortTitle[lang] ?? PARCOURS_HUB.shortTitle.fr,
		navLabel: L.backToParcours,
		isHub: true,
	};
}

function stepNavTarget(lang, stepDef, useBackLabel = false) {
	const L = PARCOURS_LABELS[lang] ?? PARCOURS_LABELS.fr;
	return {
		frSlug: stepDef.frSlug,
		href: localizedHref(lang, stepDef.frSlug),
		shortTitle: stepDef.shortTitle[lang] ?? stepDef.shortTitle.fr,
		navLabel: useBackLabel ? L.backToParcours : undefined,
		isHub: false,
	};
}

/**
 * @param {ParcoursLang} lang
 * @param {string} frSlug
 * @returns {{
 *   stepIndex: number | null,
 *   total: number,
 *   isHub: boolean,
 *   current: ReturnType<typeof getParcoursStep>,
 *   prev: object | null,
 *   next: object | null,
 *   hub: ReturnType<typeof hubNavTarget>,
 *   labels: typeof PARCOURS_LABELS.fr,
 * }}
 */
export function getParcoursNav(lang, frSlug) {
	const L = PARCOURS_LABELS[lang] ?? PARCOURS_LABELS.fr;
	const total = PARCOURS_STEPS.length;
	const hub = hubNavTarget(lang);
	const current = getParcoursStep(lang, frSlug);
	if (!current) return null;

	if (frSlug === PARCOURS_HUB.frSlug) {
		const first = PARCOURS_STEPS[0];
		return {
			stepIndex: null,
			total,
			isHub: true,
			current,
			prev: null,
			next: {
				...stepNavTarget(lang, first),
				rel: 'next',
				dirLabel: L.nextLabel,
			},
			hub,
			labels: L,
		};
	}

	const idx = PARCOURS_STEPS.findIndex((s) => s.frSlug === frSlug);
	if (idx === -1) return null;

	let prev = null;
	if (idx === 0) {
		prev = {
			...hubNavTarget(lang),
			rel: 'prev',
			dirLabel: L.prevLabel,
		};
	} else {
		prev = {
			...stepNavTarget(lang, PARCOURS_STEPS[idx - 1]),
			rel: 'prev',
			dirLabel: L.prevLabel,
		};
	}

	let next;
	if (idx === total - 1) {
		next = {
			...hubNavTarget(lang),
			rel: 'next',
			dirLabel: L.nextLabel,
		};
	} else {
		next = {
			...stepNavTarget(lang, PARCOURS_STEPS[idx + 1]),
			rel: 'next',
			dirLabel: L.nextLabel,
		};
	}

	return {
		stepIndex: idx + 1,
		total,
		isHub: false,
		current,
		prev,
		next,
		hub,
		labels: L,
	};
}
