/** Chemins des hubs outils domotique (hreflang). */
export const SMART_HOME_TOOL_PATHS = {
	troubleshooting: {
		fr: '/domotique/codes-erreurs-depannage-zigbee-home-assistant-shelly/',
		en: '/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly/',
		de: '/de/smart-home/fehlercodes-stoerungen-zigbee-home-assistant-shelly/',
		it: '/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly/',
		es: '/es/domotica/codigos-error-solucion-zigbee-home-assistant-shelly/',
	},
	spareParts: {
		fr: '/domotique/pieces-detachees-capteurs-compatibles-moins-cher/',
		en: '/en/smart-home/spare-parts-sensors-compatible-budget/',
		de: '/de/smart-home/ersatzteile-sensoren-kompatible-guenstiger/',
		it: '/it/domotica/ricambi-sensori-compatibili-economici/',
		es: '/es/domotica/repuestos-sensores-compatibles-baratos/',
	},
	compatMatrix: {
		fr: '/domotique/matrice-compatibilite-home-assistant-homey-zigbee-matter/',
		en: '/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/',
		de: '/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/',
		it: '/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/',
		es: '/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/',
	},
};

export const SMART_HOME_TOOL_LANG_PAIRS = Object.keys(SMART_HOME_TOOL_PATHS).map((key) => {
	const p = SMART_HOME_TOOL_PATHS[key];
	return { fr: p.fr, en: p.en, de: p.de, it: p.it, es: p.es };
});
