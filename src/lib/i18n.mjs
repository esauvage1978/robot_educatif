// Paires FR/EN pour hreflang et sélecteur de langue (chemins sans base).
export const LANG_PAIRS = [
	{ fr: '/', en: '/en/' },
	{ fr: '/meilleur-robot-programmable-enfant-2026/', en: '/en/best-programmable-robot-for-kids/' },
	{ fr: '/installer-mblock-5-sous-windows-10/', en: '/en/install-mblock-5-windows/' },
	{ fr: '/raspberry-pi-5-quelle-version-memoire-acheter/', en: '/en/raspberry-pi-5-which-ram/' },
	{ fr: '/raspberry-pi-3-vs-4-vs-5-comparatif-2026/', en: '/en/raspberry-pi-3-vs-4-vs-5/' },
	{ fr: '/meilleur-robot-educatif-arduino-kit-choisir/', en: '/en/arduino-robot-kit-for-kids/' },
	{ fr: '/domotique/', en: '/en/smart-home/' },
	{ fr: '/domotique/debuter-domotique-par-ou-commencer/', en: '/en/smart-home/getting-started/' },
	{ fr: '/domotique/home-assistant-green-vs-raspberry-pi-5/', en: '/en/smart-home/home-assistant-green-vs-raspberry-pi-5/' },
	{ fr: '/domotique/meilleur-dongle-zigbee-home-assistant/', en: '/en/smart-home/best-zigbee-dongle-home-assistant/' },
	{ fr: '/domotique/prise-connectee-zigbee-home-assistant/', en: '/en/smart-home/smart-plugs-uk-us/' },
];
// Pages /en/ publiées (cartes accueil, menu latéral).
export const EN_PAGES = [
	{ href: '/en/best-programmable-robot-for-kids/', fr: '/meilleur-robot-programmable-enfant-2026/', title: 'Best programmable robot for kids: how to choose by age' },
	{ href: '/en/arduino-robot-kit-for-kids/', fr: '/meilleur-robot-educatif-arduino-kit-choisir/', title: 'Arduino robot kit for kids: how to choose' },
	{ href: '/en/raspberry-pi-3-vs-4-vs-5/', fr: '/raspberry-pi-3-vs-4-vs-5-comparatif-2026/', title: 'Raspberry Pi 3 vs 4 vs 5: which one to buy' },
	{ href: '/en/raspberry-pi-5-which-ram/', fr: '/raspberry-pi-5-quelle-version-memoire-acheter/', title: 'Raspberry Pi 5: 2GB, 4GB, 8GB or 16GB?' },
	{ href: '/en/install-mblock-5-windows/', fr: '/installer-mblock-5-sous-windows-10/', title: 'How to install mBlock 5 on Windows 10 and 11' },
	{ href: '/en/smart-home/getting-started/', fr: '/domotique/debuter-domotique-par-ou-commencer/', title: 'Smart home for beginners (UK & US): where to start' },
	{ href: '/en/smart-home/home-assistant-green-vs-raspberry-pi-5/', fr: '/domotique/home-assistant-green-vs-raspberry-pi-5/', title: 'Home Assistant Green vs Raspberry Pi 5' },
	{ href: '/en/smart-home/best-zigbee-dongle-home-assistant/', fr: '/domotique/meilleur-dongle-zigbee-home-assistant/', title: 'Best Zigbee dongle for Home Assistant' },
	{ href: '/en/smart-home/smart-plugs-uk-us/', fr: '/domotique/prise-connectee-zigbee-home-assistant/', title: 'Smart plugs for the UK and US' },
];
export const slugOf = (p) => p.replace(/\/$/, '').split('/').pop();
const norm = (p) => (p.endsWith('/') ? p : p + '/');
export function findPair(pathname) {
	const p = norm(pathname);
	return LANG_PAIRS.find((x) => x.fr === p || x.en === p) || null;
}
