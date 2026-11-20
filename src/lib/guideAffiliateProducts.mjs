import { MARKET_CONFIG, amazonDpUrl } from './amazonMarket.mjs';

/** ASIN vérifiés (Creators / fiches produit du site). */
const ASIN = {
	'bee-bot': 'B01A5YMCH4',
	'blue-bot': 'B01A5YMCH4',
	'code-go-mouse': 'B01A5YMCH4',
	'tale-bot-pro': 'B09LYTM5BC',
	'botley-2': 'B083T58PKM',
	mbot: 'B07XR98YYQ',
	mbot2: 'B0919F9CKS',
	'codey-rocky': 'B07CGH8NZ7',
	'elegoo-car': 'B078Y9RYM2',
	'elegoo-robot-car': 'B078Y9RYM2',
	'elegoo-penguin': 'B07GVD6GQH',
	cyberpi: 'B0BBZY9L59',
	'raspberry-pi-5-8gb': 'B0CK2FCG1K',
};

/** Requêtes marché US/CA (pas de /dp/ non vérifié). */
const SEARCH_QUERY = {
	'bee-bot': 'Learning Resources Code Go Robot Mouse',
	'blue-bot': 'TTS Bee-Bot',
	'code-go-mouse': 'Learning Resources Code Go Robot Mouse',
	'tale-bot-pro': 'Matatalab Tale-Bot Pro',
	'botley-2': 'Learning Resources Botley 2.0',
	mbot: 'Makeblock mBot',
	mbot2: 'Makeblock mBot2',
	'codey-rocky': 'Makeblock Codey Rocky',
	'elegoo-car': 'ELEGOO Smart Robot Car Kit V4',
	'elegoo-robot-car': 'ELEGOO Smart Robot Car Kit V4',
	'elegoo-penguin': 'ELEGOO Penguin Bot',
	cyberpi: 'Makeblock CyberPi',
	'raspberry-pi-5-8gb': 'Raspberry Pi 5 8GB',
};

function normalizeMarket(market) {
	if (market === 'en') return 'us';
	return market || 'fr';
}

function marketSearchUrl(market, query) {
	const cfg = MARKET_CONFIG[market] || MARKET_CONFIG.fr;
	return `https://${cfg.host}/s?k=${encodeURIComponent(query)}&tag=${encodeURIComponent(cfg.tag)}`;
}

/** URL Amazon affiliée (/dp/ ASIN) pour un produit clé et un marché. */
export function productAmazonUrl(productKey, market = 'fr') {
	const m = normalizeMarket(market);
	if (m === 'us' || m === 'ca') {
		const query = SEARCH_QUERY[productKey];
		if (query) return marketSearchUrl(m, query);
		return null;
	}
	const asin = ASIN[productKey];
	if (asin) return amazonDpUrl(asin, m);
	return null;
}

/** Liens directs FR pour contenus MD/MDX (réécrits en /go/ au build). */
export const FR_PRODUCT_LINKS = {
	beeBot: 'https://www.amazon.fr/dp/B01A5YMCH4?tag=manuso06-21',
	blueBot: 'https://www.amazon.fr/dp/B01A5YMCH4?tag=manuso06-21',
	taleBotPro: 'https://www.amazon.fr/dp/B09LYTM5BC?tag=manuso06-21',
	taleBot: 'https://www.amazon.fr/dp/B09LYTM5BC?tag=manuso06-21',
	codeGoMouse: 'https://www.amazon.fr/dp/B01A5YMCH4?tag=manuso06-21',
	botley: 'https://www.amazon.fr/dp/B083T58PKM?tag=manuso06-21',
	mbot: 'https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21',
	mbot2: 'https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21',
	codeyRocky: 'https://www.amazon.fr/dp/B07CGH8NZ7?tag=manuso06-21',
	elegooCar: 'https://www.amazon.fr/dp/B078Y9RYM2?tag=manuso06-21',
	elegooPenguin: 'https://www.amazon.fr/dp/B07GVD6GQH?tag=manuso06-21',
	cyberpi: 'https://www.amazon.fr/dp/B0BBZY9L59?tag=manuso06-21',
};