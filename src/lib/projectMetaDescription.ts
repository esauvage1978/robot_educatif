import { fitMetaDescription } from './metaDescription';

/** Nettoie les caractères qui cassent les attributs HTML meta. */
export function sanitizeMetaText(text: string): string {
	return (text || '')
		.replace(/[<>"']/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/** Meta description unique pour une fiche projet domotique (140–160 car.). */
export function buildSmartHomeProjectMetaDescription(
	shortDesc: string,
	pathname: string,
): string {
	const core = sanitizeMetaText(
		`${shortDesc} Schéma NFC, liste matériel, budget et tutoriel Home Assistant pas à pas.`,
	);
	return fitMetaDescription(core, { pathname });
}

/** Descriptions dédiées (contenu courtDesc avec comparateurs ou texte atypique). */
const PROJECT_META_OVERRIDES: Record<string, string> = {
	'alerte-portillon-jardin-reste-ouvert':
		'Alerte si le portillon reste ouvert plus de 10 min : capteur Aqara Door P2, notification smartphone et scénario Home Assistant.',
	'piscine-filtration-surplus-solaire-photovoltaique':
		'Piloter la pompe de filtration piscine selon le surplus solaire : capteurs, contacteur et automatisations Home Assistant.',
	'serre-jardin-aeration-temperature-connectee':
		'Serre connectée : ventilation et suivi température/hygrométrie, capteurs Zigbee et règles Home Assistant.',
	'ventilateur-plafond-automatique-temperature-ete':
		'Ventilateur de plafond automatique selon la température estivale : relais, sonde et scénarios Home Assistant.',
};

export function projectMetaDescriptionForSlug(
	slug: string,
	shortDesc: string,
	pathname: string,
): string {
	const override = PROJECT_META_OVERRIDES[slug];
	if (override) {
		return fitMetaDescription(sanitizeMetaText(override), { pathname });
	}
	return buildSmartHomeProjectMetaDescription(shortDesc, pathname);
}
