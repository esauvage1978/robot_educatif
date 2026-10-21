// Paires FR/EN pour hreflang et sélecteur de langue (chemins sans base).
export const LANG_PAIRS = [
	{ fr: '/', en: '/en/' },
	{ fr: '/meilleur-robot-programmable-enfant-2026/', en: '/en/best-programmable-robot-for-kids/' },
	{ fr: '/installer-mblock-5-sous-windows-10/', en: '/en/install-mblock-5-windows/' },
	{ fr: '/raspberry-pi-5-quelle-version-memoire-acheter/', en: '/en/raspberry-pi-5-which-ram/' },
	{ fr: '/raspberry-pi-3-vs-4-vs-5-comparatif-2026/', en: '/en/raspberry-pi-3-vs-4-vs-5/' },
	{ fr: '/meilleur-robot-educatif-arduino-kit-choisir/', en: '/en/arduino-robot-kit-for-kids/' },
];
const norm = (p) => (p.endsWith('/') ? p : p + '/');
export function findPair(pathname) {
	const p = norm(pathname);
	return LANG_PAIRS.find((x) => x.fr === p || x.en === p) || null;
}
