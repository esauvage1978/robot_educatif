/** Requêtes de recherche Amazon US/CA pour remplacer les /dp/ servis (CONSIGNES PR41 v3). */
export const ASIN_SEARCH = {
	B01A5YMCH4: 'Learning Resources Code Go Robot Mouse',
	B07XR98YYQ: 'Makeblock mBot',
	B07CGH8NZ7: 'Makeblock Codey Rocky',
	B07GVD6GQH: 'ELEGOO Penguin Bot',
	B07KG4JHBH: 'Makeblock mBot Ranger',
	B078Y9RYM2: 'ELEGOO Smart Robot Car Kit V4',
	B083T58PKM: 'Learning Resources Botley 2.0',
	B083T5G5ZK: 'Learning Resources Botley 2.0',
	B0919F9CKS: 'Makeblock mBot2',
	B09LYTM5BC: 'Matatalab Tale-Bot Pro',
	B0BBZY9L59: 'Makeblock CyberPi',
	B0CK2FCG1K: 'Raspberry Pi 5 8GB',
	B0CK3L9WD3: 'Raspberry Pi 5 4GB',
};

export function searchUrlForAsin(host, tag, asin) {
	const q = ASIN_SEARCH[asin] || `product ${asin}`;
	return `https://${host}/s?k=${encodeURIComponent(q)}&tag=${encodeURIComponent(tag)}`;
}