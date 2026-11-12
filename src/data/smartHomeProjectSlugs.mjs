/** Mapping permanent SEO : id cas d’usage → slug URL `/domotique/projets/<slug>/` */
export const USE_CASE_ID_TO_SLUG = {
	"garage-porte-smartphone": "porte-garage-connectee",
	"portail-electrique": "portail-electrique-connecte",
	"boite-lettres-colis": "boite-aux-lettres-connectee",
	"sonnette-carillon-photo": "sonnette-connectee-notification-photo",
	"volets-roulants-filaires": "volet-roulant-connecte",
	"store-banne-soleil-vent": "store-banne-automatise-vent-soleil",
	"rideaux-switchbot": "motoriser-rideaux-existants",
	"eclairage-sans-neutre": "eclairage-sans-neutre",
	"va-et-vient-domotise": "va-et-vient-connecte",
	"presence-couloir-wc": "eclairage-automatique-presence",
	"dimmer-spots-led": "variateur-led-connecte",
	"radiateurs-robinets": "tetes-thermostatiques-connectees",
	"radiateur-fil-pilote-electric": "radiateur-fil-pilote",
	"chaudiere-contact-sec": "thermostat-connecte-chaudiere-contact-sec",
	"chauffe-eau-heures-creuses": "chauffe-eau-connecte",
	"vmc-humidite-sdb": "vmc-automatisee-humidite",
	"conso-tableau-solaire": "suivi-consommation-electrique",
	"alerte-lave-linge": "alerte-fin-lave-linge",
	"coupure-veilles": "couper-veilles-automatiquement",
	"secours-ups-box": "onduleur-box-internet-home-assistant",
	"alerte-congelateur-cave": "alarme-temperature-congelateur",
	"camera-solaire-exterieure": "camera-exterieure-solaire-sans-fil",
	"box-home-assistant-locale": "installer-home-assistant",
	"portillon-gache-electrique-connectee": "portillon-gache-electrique-nfc-smartphone",
	"serrure-connectee-cylindre-europeen": "serrure-connectee-cylindre-europeen-sans-percer",
	"clavier-code-exterieur-connecte": "clavier-code-exterieur-zigbee-wifi",
	"domotiser-interphone-existant": "domotiser-interphone-filaire-contact-sec",
	"ouverture-portail-approche-voiture": "ouverture-portail-approche-voiture-beacon",
	"eclairage-allee-ouverture-portail": "eclairage-allee-couplage-portail",
	"detecteur-place-parking-garage": "detecteur-place-parking-garage-ultrason",
	"alerte-portillon-jardin-ouvert": "alerte-portillon-jardin-reste-ouvert",
	"verrouillage-nocturne-porte-garage": "verrouillage-nocturne-porte-garage-secours",
	"boite-a-colis-connectee-livraison": "boite-colis-connectee-livraison-location",
	"centraliser-volets-roulants-bouton-unique": "centraliser-volets-roulants-un-bouton",
	"volets-automatiques-canicule-soleil": "volets-fermeture-automatique-canicule-soleil",
	"motoriser-volet-sangle-manivelle": "motoriser-volet-sangle-manivelle-existant",
	"velux-fenetre-toit-pluie-connectee": "velux-fenetre-toit-pluie-automatique",
	"pergola-bioclimatique-connectee": "pergola-bioclimatique-lames-soleil-pluie",
	"store-enrouleur-interieur-motorise": "store-enrouleur-interieur-motorise-zigbee",
	"arrosage-automatique-jardin-meteo": "arrosage-jardin-automatique-meteo-locale",
	"electrovanne-arrosage-multizone-connectee": "electrovanne-arrosage-multizone-24v",
	"sonde-humidite-sol-potager-zigbee": "sonde-humidite-sol-potager-zigbee",
	"serre-jardin-temperature-ouverture": "serre-jardin-aeration-temperature-connectee",
	"porte-poulailler-automatique-connectee": "porte-poulailler-automatique-solaire-connectee",
	"robot-tondeuse-meteo-home-assistant": "robot-tondeuse-inhibition-pluie-gel-home-assistant",
	"domotiser-telerupteur-tableau-electrique": "domotiser-telerupteur-tableau-shelly-pro",
	"ruban-led-cuisine-detection-mouvement": "ruban-led-cuisine-detection-main-mouvement",
	"eclairage-escalier-automatique-nuit": "eclairage-escalier-marche-par-marche-nuit",
	"detecteur-presence-radar-mmwave": "detecteur-presence-radar-mmwave-immobile",
	"projecteur-exterieur-detecteur-connecte": "projecteur-exterieur-detecteur-mouvement-connecte",
	"eclairage-circadien-biologique-home-assistant": "eclairage-circadien-temperature-couleur-ha",
	"interrupteur-mode-decouple-ampoule-zigbee": "interrupteur-mode-decouple-ampoule-zigbee",
	"creer-va-et-vient-sans-fil-zigbee": "va-et-vient-sans-fil-bouton-zigbee",
	"eclairage-automatique-placard-dressing": "eclairage-automatique-placard-dressing-porte",
	"minuterie-cave-couloir-connectee": "minuterie-cave-couloir-extinction-preavis",
	"simulation-presence-eclairage-vacances": "simulation-presence-eclairage-vacances-realiste",
	"eclairage-salle-de-bain-mode-nuit": "eclairage-salle-bain-mode-nuit-anti-eblouissement",
	"eclairage-jardin-basse-tension-connecte": "eclairage-jardin-12v-24v-connecte",
	"piloter-climatisation-pac-air-air": "piloter-climatisation-pac-air-air-ir-wifi",
	"connecter-poele-a-granules": "connecter-poele-granules-contact-sec",
	"plancher-chauffant-hydraulique-connecte": "plancher-chauffant-hydraulique-collecteur-connecte",
	"thermostat-plancher-chauffant-electrique": "thermostat-plancher-chauffant-electrique-ntc",
	"seche-serviettes-connecte-programmation": "seche-serviettes-connecte-programmation-douche",
	"couper-chauffage-fenetre-ouverte": "couper-chauffage-fenetre-ouverte-automatique",
	"circulateur-bouclage-ecs-connecte": "circulateur-bouclage-eau-chaude-sanitaire-connecte",
	"capteur-co2-qualite-air-interieur": "capteur-co2-cov-humidite-qualite-air",
	"deshumidificateur-automatique-cave-buanderie": "deshumidificateur-automatique-cave-hygrometre",
	"ventilateur-automatique-temperature-ete": "ventilateur-plafond-automatique-temperature-ete",
	"chauffage-hors-gel-residence-secondaire": "chauffage-hors-gel-residence-secondaire-distance",
	"chauffage-multizone-sonde-deportee": "chauffage-multizone-sonde-deportee-equilibrage",
	"filtration-piscine-temperature-eau-connectee": "filtration-piscine-temperature-eau-connectee",
	"routeur-solaire-surplus-chauffe-eau": "routeur-solaire-surplus-chauffe-eau",
	"suivre-production-kit-solaire-balcon": "suivre-production-kit-solaire-balcon-plug-play",
	"delestage-electrique-automatique-linky": "delestage-electrique-automatique-linky-abonnement",
	"prise-renforcee-recharge-voiture-heures-creuses": "prise-renforcee-recharge-voiture-heures-creuses",
	"alerte-fin-seche-linge-lave-vaisselle": "alerte-fin-seche-linge-lave-vaisselle-puissance",
	"compteur-eau-connecte-impulsions": "compteur-eau-connecte-impulsions-divisionnaire",
	"niveau-cuve-eau-pluie-ultrason": "niveau-cuve-eau-pluie-fioul-ultrason",
	"automatisation-edf-tempo-jours-rouges": "automatisation-edf-tempo-jours-rouges-blancs",
	"mesurer-consommation-pompe-a-chaleur": "mesurer-consommation-pompe-a-chaleur-tableau",
	"piscine-filtration-surplus-solaire": "piscine-filtration-surplus-solaire-photovoltaique",
	"prise-connectee-exterieure-etanche-jardin": "prise-connectee-exterieure-etanche-ip44-jardin",
	"couper-chargeur-velo-trottinette-fin-charge": "couper-chargeur-velo-trottinette-fin-charge",
	"detecter-talon-consommation-electrique": "detecter-talon-consommation-electrique-derive",
	"detecteur-fuite-eau-zigbee-alerte": "detecteur-fuite-eau-zigbee-alerte",
	"vanne-eau-motorisee-coupure-fuite": "vanne-eau-motorisee-coupure-automatique-fuite",
	"detecteur-fumee-connecte-zigbee": "detecteur-fumee-connecte-zigbee",
	"detecteur-monoxyde-carbone-connecte": "detecteur-monoxyde-carbone-co-connecte",
	"alarme-maison-home-assistant-alarmo": "alarme-maison-diy-home-assistant-alarmo",
	"sirene-connectee-zigbee-alarme": "sirene-connectee-zigbee-alarme",
	"capteur-vibration-bris-vitre-zigbee": "capteur-vibration-bris-vitre-zigbee",
	"sauvegarde-automatique-home-assistant": "sauvegarde-automatique-chiffree-home-assistant",
	"acces-distance-securise-home-assistant": "acces-distance-securise-home-assistant-vpn",
	"tablette-murale-dashboard-home-assistant": "tablette-murale-dashboard-home-assistant",
	"bouton-urgence-senior-maintien-domicile": "bouton-urgence-senior-maintien-domicile",
	"veilleuse-automatique-pied-de-lit": "veilleuse-automatique-pied-de-lit-nuit",
	"detection-presence-famille-ble-home-assistant": "detection-presence-famille-ble-proxy-esphome",
	"buanderie-sechage-linge-humidite-connectee": "buanderie-sechage-linge-humidite-vmc-connectee",
	"redemarrage-automatique-box-internet-watchdog": "redemarrage-automatique-box-internet-watchdog",
	"etendre-portee-reseau-zigbee-routeurs": "etendre-portee-reseau-zigbee-prises-routeurs"
};

/** @type {Record<string, string>} */
export const SLUG_TO_USE_CASE_ID = Object.fromEntries(
	Object.entries(USE_CASE_ID_TO_SLUG).map(([id, slug]) => [slug, id]),
);

export const PROJECT_SLUGS = Object.values(USE_CASE_ID_TO_SLUG);

/** @param {string} useCaseId */
export function slugForUseCase(useCaseId) {
	return USE_CASE_ID_TO_SLUG[useCaseId] ?? useCaseId;
}

/** @param {string} slug */
export function useCaseIdForSlug(slug) {
	return SLUG_TO_USE_CASE_ID[slug] ?? null;
}

/** @param {string} slug */
export function projectPagePath(slug) {
	return `/domotique/projets/${slug}/`;
}

/** Ancres legacy configurateur → slug projet */
export const LEGACY_ANCHOR_TO_SLUG = Object.fromEntries(
	Object.entries(USE_CASE_ID_TO_SLUG).map(([id, slug]) => [`shuc-ref-${id}`, slug]),
);
