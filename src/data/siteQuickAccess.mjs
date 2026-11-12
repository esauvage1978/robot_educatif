import { getAllCatalogEntries } from './unifiedErrorCatalog.mjs';
import {
	URL_CODES_ERREURS_DOMOTIQUE,
	URL_CONFIGURATEUR_DOMOTIQUE,
	URL_PIECES_SAV_DOMOTIQUE,
	URL_QUIZ_ROBOT_ENFANT,
} from '../lib/siteToolUrls.mjs';

/** @typedef {{ title: string, href: string, kind: string, searchText: string }} QuickAccessItem */

const STATIC_TOOLS = [
	{
		title: 'Configurateur projet domotique',
		href: URL_CONFIGURATEUR_DOMOTIQUE,
		kind: 'Configurateur',
		searchText:
			'configurateur domotique dimensionner installation shelly zigbee home assistant garage volets éclairage',
	},
	{
		title: 'Répertoire codes erreurs domotique (48 fiches)',
		href: URL_CODES_ERREURS_DOMOTIQUE,
		kind: 'Dépannage',
		searchText: 'codes erreurs zigbee shelly home assistant dépannage panne diagnostic',
	},
	{
		title: 'Diagnostic par symptôme',
		href: '/domotique/diagnostic-par-symptome/',
		kind: 'Dépannage',
		searchText: 'symptôme panne capteur hors ligne zigbee',
	},
	{
		title: 'Pièces détachées & capteurs compatibles',
		href: URL_PIECES_SAV_DOMOTIQUE,
		kind: 'SAV',
		searchText: 'pièces détachées sav capteur remplacement budget',
	},
	{
		title: 'Matrice compatibilité Home Assistant / Homey / Matter',
		href: '/domotique/matrice-compatibilite-home-assistant-homey-zigbee-matter/',
		kind: 'Outil',
		searchText: 'compatibilité zigbee matter home assistant homey',
	},
	{
		title: 'Tableau Raspberry Pi & HAT',
		href: '/domotique/tableau-raspberry-hat/',
		kind: 'Outil',
		searchText: 'raspberry pi hat gpio domotique',
	},
	{
		title: 'Quel robot éducatif choisir ? (quiz)',
		href: URL_QUIZ_ROBOT_ENFANT,
		kind: 'Configurateur',
		searchText: 'robot enfant quiz âge choisir guide',
	},
	{
		title: 'Configurateur kit robotique classe',
		href: '/configurateur-kit-robotique-classe/',
		kind: 'Configurateur',
		searchText: 'classe école kit robot pack enseignant',
	},
	{
		title: 'Calculateur budget robot classe',
		href: '/calculateur-budget-robot-classe/',
		kind: 'Calculateur',
		searchText: 'budget classe robot calculateur',
	},
	{
		title: 'Compatibilité Makeblock mBot',
		href: '/compatibilite-makeblock/',
		kind: 'Outil',
		searchText: 'makeblock mbot mbot2 compatibilité capteur',
	},
	{
		title: 'Tableau réglages capteurs mBot2',
		href: '/tableau-reglages-capteurs-mbot2-depannage/',
		kind: 'Dépannage',
		searchText: 'mbot capteur ultrason ligne dépannage étalonnage',
	},
	{
		title: 'Dépannage mBlock & codes erreurs mBot',
		href: '/mblock-depannage-codes-erreurs-mbot-arduino/',
		kind: 'Dépannage',
		searchText: 'mblock arduino erreur mbot dépannage',
	},
	{
		title: 'Générateur fiche séance robotique PDF',
		href: '/generateur-fiche-seance-robotique-pdf/',
		kind: 'Outil',
		searchText: 'fiche séance pdf enseignant classe',
	},
	{
		title: 'Parcours Scratch → Python (6 semaines)',
		href: '/parcours-scratch-python-6-semaines/',
		kind: 'Guide',
		searchText: 'scratch python progression classe',
	},
	{
		title: 'Guide domotique — par où commencer',
		href: '/domotique/debuter-domotique-par-ou-commencer/',
		kind: 'Guide',
		searchText: 'débuter domotique home assistant',
	},
	{
		title: 'Home Assistant vs Jeedom vs Homey',
		href: '/domotique/home-assistant-jeedom-homey-quel-systeme-choisir/',
		kind: 'Guide',
		searchText: 'box domotique hub central',
	},
];

/** Index pour recherche instantanée (accueil, 404). */
export function buildQuickAccessSearchIndex() {
	/** @type {QuickAccessItem[]} */
	const items = STATIC_TOOLS.map((t) => ({
		title: t.title,
		href: t.href,
		kind: t.kind,
		searchText: `${t.title} ${t.searchText}`.toLowerCase(),
	}));

	for (const entry of getAllCatalogEntries()) {
		const code = entry.error_code || '';
		const titleFr = entry.title?.fr || entry.slug;
		const symptoms = entry.symptoms?.fr || '';
		items.push({
			title: code ? `${code} — ${titleFr}` : titleFr,
			href: `/domotique/code-erreur/${entry.slug}/`,
			kind: 'Code erreur',
			searchText: `${code} ${titleFr} ${symptoms} ${entry.brand_slug || ''}`.toLowerCase(),
		});
	}

	return items;
}

export const HOME_QUICK_LINKS = [
	{ label: '⚡ Configurateur domotique', href: URL_CONFIGURATEUR_DOMOTIQUE, accent: 'primary' },
	{ label: '🔧 Codes erreurs', href: URL_CODES_ERREURS_DOMOTIQUE, accent: 'warm' },
	{ label: 'Pièces détachées & SAV', href: URL_PIECES_SAV_DOMOTIQUE, accent: 'neutral' },
	{ label: 'Quel robot choisir ?', href: URL_QUIZ_ROBOT_ENFANT, accent: 'neutral' },
];
