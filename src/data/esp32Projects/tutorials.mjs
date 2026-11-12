/**
 * Métadonnées des 4 tutos transverses ESP32 / ESPHome (contenu : pages Markdown par langue).
 * - FR : src/content/domotique/<slug>.mdx
 * - EN : src/content/domotique-i18n/en/<slug>.mdx
 * - DE/IT/ES : src/pages/{de/smart-home,it/domotica,es/domotica}/<slug>.md
 */
const BASES = {
	fr: '/domotique/',
	en: '/en/smart-home/',
	de: '/de/smart-home/',
	it: '/it/domotica/',
	es: '/es/domotica/',
};

const DEFS = [
	{
		id: 'flash-esp32',
		slugs: {
			fr: 'flasher-code-esp32-esphome',
			en: 'flash-esp32-esphome',
			de: 'esp32-esphome-flashen',
			it: 'flashare-esp32-esphome',
			es: 'flashear-esp32-esphome',
		},
		title: {
			fr: 'Flasher un code sur ESP32 avec ESPHome (USB, pilotes, mode boot)',
			en: 'Flash an ESP32 with ESPHome (USB, drivers, boot mode)',
			de: 'ESP32 mit ESPHome flashen (USB, Treiber, Boot-Modus)',
			it: 'Flashare un ESP32 con ESPHome (USB, driver, modalità boot)',
			es: 'Flashear un ESP32 con ESPHome (USB, controladores, modo boot)',
		},
		short: {
			fr: 'Premier envoi du programme par câble USB, pilotes CP210x et CH340, mode boot',
			en: 'First upload over USB, CP210x and CH340 drivers, boot mode',
			de: 'Erstes Aufspielen per USB, CP210x- und CH340-Treiber, Boot-Modus',
			it: 'Primo caricamento via USB, driver CP210x e CH340, modalità boot',
			es: 'Primera carga por USB, controladores CP210x y CH340, modo boot',
		},
	},
	{
		id: 'install-esphome',
		slugs: {
			fr: 'installer-esphome-home-assistant',
			en: 'install-esphome-home-assistant',
			de: 'esphome-home-assistant-installieren',
			it: 'installare-esphome-home-assistant',
			es: 'instalar-esphome-home-assistant',
		},
		title: {
			fr: 'Installer ESPHome dans Home Assistant (Device Builder)',
			en: 'Install ESPHome in Home Assistant (Device Builder)',
			de: 'ESPHome in Home Assistant installieren (Device Builder)',
			it: 'Installare ESPHome in Home Assistant (Device Builder)',
			es: 'Instalar ESPHome en Home Assistant (Device Builder)',
		},
		short: {
			fr: 'Installer le module complémentaire, préparer les mots de passe (secrets) et créer le premier appareil',
			en: 'Install the add-on, prepare your passwords (secrets) and create the first device',
			de: 'Add-on installieren, Passwörter (Secrets) vorbereiten, erstes Gerät anlegen',
			it: 'Installare il componente aggiuntivo, preparare le password (secrets) e creare il primo dispositivo',
			es: 'Instalar el complemento, preparar las contraseñas (secrets) y crear el primer dispositivo',
		},
	},
	{
		id: 'ota-esphome',
		slugs: {
			fr: 'mises-a-jour-ota-esphome',
			en: 'esphome-ota-updates',
			de: 'esphome-ota-updates',
			it: 'aggiornamenti-ota-esphome',
			es: 'actualizaciones-ota-esphome',
		},
		title: {
			fr: 'Mises à jour OTA ESPHome : flasher sans câble',
			en: 'ESPHome OTA updates: flash without a cable',
			de: 'ESPHome-OTA-Updates: ohne Kabel flashen',
			it: 'Aggiornamenti OTA ESPHome: flashare senza cavo',
			es: 'Actualizaciones OTA de ESPHome: flashear sin cable',
		},
		short: {
			fr: 'Mettre à jour la carte sans câble, mot de passe OTA et récupération en cas de problème',
			en: 'Update the board without a cable, OTA password and recovery if something goes wrong',
			de: 'Die Platine ohne Kabel aktualisieren, OTA-Passwort und Wiederherstellung bei Problemen',
			it: 'Aggiornare la scheda senza cavo, password OTA e ripristino in caso di problemi',
			es: 'Actualizar la placa sin cable, contraseña OTA y recuperación si algo falla',
		},
	},
	{
		id: 'wiring-gpio',
		slugs: {
			fr: 'bases-cablage-esp32-gpio',
			en: 'esp32-wiring-gpio-basics',
			de: 'esp32-verkabelung-gpio-grundlagen',
			it: 'basi-cablaggio-esp32-gpio',
			es: 'bases-cableado-esp32-gpio',
		},
		title: {
			fr: 'Bases du câblage ESP32 : GPIO, 3,3 V, résistances de rappel',
			en: 'ESP32 wiring basics: GPIO, 3.3 V and pull-ups',
			de: 'ESP32-Verkabelung: GPIO, 3,3 V und Pull-ups',
			it: 'Basi del cablaggio ESP32: GPIO, 3,3 V e pull-up',
			es: 'Bases del cableado ESP32: GPIO, 3,3 V y pull-up',
		},
		short: {
			fr: 'Quelles broches éviter, 3,3 V contre 5 V, résistance de rappel et masse commune',
			en: 'Which pins to avoid, 3.3 V versus 5 V, pull-up resistors and common ground',
			de: 'Welche Pins Sie meiden, 3,3 V gegen 5 V, Pull-up-Widerstände und gemeinsame Masse',
			it: 'Quali pin evitare, 3,3 V contro 5 V, resistenze di pull-up e massa comune',
			es: 'Qué pines evitar, 3,3 V frente a 5 V, resistencias pull-up y masa común',
		},
	},
];

export const ESP32_TUTORIALS = DEFS.map((def) => ({
	...def,
	paths: Object.fromEntries(Object.entries(def.slugs).map(([lang, slug]) => [lang, `${BASES[lang]}${slug}/`])),
}));

export const TUTORIAL_BY_ID = Object.fromEntries(ESP32_TUTORIALS.map((t) => [t.id, t]));

/** @param {'fr'|'en'|'de'|'it'|'es'} lang @param {string} id */
export function tutorialPath(lang, id) {
	return TUTORIAL_BY_ID[id]?.paths[lang] ?? null;
}

/** Paires hreflang des tutos (même forme que LANG_PAIRS). */
export function esp32TutorialLangPairs() {
	return ESP32_TUTORIALS.map((t) => ({ ...t.paths }));
}
