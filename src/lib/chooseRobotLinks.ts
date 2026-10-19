/**
 * Encart « Quel robot choisir ? » (ChooseRobotBox) affiché en fin d'article
 * sur les tutoriels les plus lus (GSC 28 j). Clé = slug de l'article.
 * Valeur = âges des guides d'achat à proposer, en plus du comparatif général et du guide de Noël.
 */
export type AgeGuide = 5 | 6 | 8 | 10 | 12;

export const AGE_GUIDES: Record<AgeGuide, { href: string; label: string }> = {
	5: { href: '/quel-robot-acheter-enfant-5-ans-guide-achat/', label: 'Robot pour un enfant de 5 ans' },
	6: { href: '/robot-enfant-6-ans/', label: 'Robot pour un enfant de 6 ans' },
	8: { href: '/quel-robot-acheter-enfant-8-ans-guide-achat/', label: 'Robot pour un enfant de 8 ans' },
	10: { href: '/quel-robot-acheter-enfant-10-ans-guide-achat/', label: 'Robot pour un enfant de 10 ans' },
	12: { href: '/quel-robot-acheter-enfant-12-ans-guide-achat/', label: 'Robot pour un ado de 12 ans' },
};

const MBOT: AgeGuide[] = [8, 10, 12];
const SCRATCH: AgeGuide[] = [6, 8, 10];

export const CHOOSE_ROBOT_SLUGS: Record<string, AgeGuide[]> = {
	'installer-mblock-5-sous-windows-10': MBOT,
	'10-projets-mbot-gratuits-classe-faciles': MBOT,
	'idees-projets-mbot-rapides-une-heure': MBOT,
	'premier-pas-avec-mblock-5': MBOT,
	'accessoires-mbot-par-ou-commencer': MBOT,
	'activite-mbot-mesurer-des-distances': MBOT,
	'logiciel-mblock-makeblock-mbot-quel-choisir': MBOT,
	'mblock-vs-scratch-lequel-choisir': SCRATCH,
	'installer-les-blocs-du-mbot': MBOT,
	'serie-capteur-ultrason-mbot-1-mesurer-distance': MBOT,
	'serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle': MBOT,
	'activite-mbot-faire-clignoter-les-leds': MBOT,
	'activite-mbot-faire-defiler-un-texte': MBOT,
	'mon-premier-programme-mbot': MBOT,
	'scratch-ecole-maison-par-ou-commencer': SCRATCH,
	'activite-scratch-le-carre': SCRATCH,
};
