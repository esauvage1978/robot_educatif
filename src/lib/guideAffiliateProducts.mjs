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

function normalizeMarket(market) {
	if (market === 'en') return 'uk';
	return market || 'fr';
}

/** URL Amazon affiliée (/dp/ ASIN) pour un produit clé et un marché. */
export function productAmazonUrl(productKey, market = 'fr') {
	const m = normalizeMarket(market);
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
