export const CHECK_PRICE = {
	fr: 'Voir le prix du jour',
	en: "See today's price",
	de: 'Tagespreis ansehen',
	it: 'Vedi il prezzo del giorno',
	es: 'Ver el precio del día',
};

export function localeForMarket(market) {
	if (market === 'de' || market === 'it' || market === 'es' || market === 'fr') return market;
	return 'en';
}

const PRICE_LABEL = /prix|price|preis|prezzo|precio|tarif/i;

export function isPriceColumnLabel(label) {
	if (!label || typeof label !== 'string') return false;
	if (!PRICE_LABEL.test(label)) return false;
	if (/abonnement|subscription|radio|learning|usage|rôle|role|einsatz|uso|produit|product|produkt|producto|prodotto/i.test(label)) {
		return false;
	}
	return true;
}

/** Ligne de tableau → ASIN seulement si un seul produit du relevé est identifiable. */
export function resolveRowAsin(text) {
	const t = String(text || '').replace(/\s+/g, ' ');
	if (!t.trim()) return null;
	const has = (re) => re.test(t);
	const mbot2 = has(/mbot\s*2|mbot2/i);
	const mbot = has(/(?<![a-z0-9])mbot(?!\s*2)/i);
	if (mbot2 && mbot) return null;
	if (has(/mbot\s*ranger/i)) return null;
	if (has(/raspberry pi 5/i) && has(/4\s?g[bo]/i) && has(/8\s?g[bo]/i)) return null;

	if (mbot2) {
		if (has(/rover/i)) return null;
		return 'B0919F9CKS';
	}
	if (has(/codey\s*rocky/i)) return 'B07CGH8NZ7';
	if (has(/penguin\s*bot/i)) return 'B07GVD6GQH';
	if (has(/cyberpi/i)) return 'B0BBZY9L59';
	if (has(/home assistant green/i)) return 'B0CXVKSG19';
	if (has(/zbdongle-e/i)) return 'B0B6P22YJC';
	if (has(/zbt-2|connect zbt/i)) return 'B0G34ZTW51';
	if (has(/snzb-02d/i)) return 'B0BYZP8NK2';
	if (has(/raspberry pi 5/i) && has(/8\s?g[bo]/i)) return 'B0CK2FCG1K';
	if (has(/raspberry pi 5/i) && has(/4\s?g[bo]/i)) return 'B0CK3L9WD3';
	if (has(/elegoo/i) && has(/v4|voiture|car kit|robot car/i)) return 'B078Y9RYM2';
	if (has(/uno r3/i)) return 'B01JD2Z5XW';
	if (has(/code\s*&\s*go|code and go|souris robot/i)) return 'B01A5YMCH4';
	if (has(/freenove/i) && has(/esp32/i)) return 'B08X6PTQFM';
	if (has(/freenove/i) && has(/raspberry|pi 5|pi 4/i)) return 'B07YD2LT9D';
	if (has(/picar-x|picar x/i)) return 'B0CGLPF29H';
	if (mbot) return 'B07XR98YYQ';
	const dp = /\/dp\/([A-Z0-9]{10})/i.exec(t);
	if (dp) return dp[1].toUpperCase();
	return null;
}

const PRICE_CELL =
	/(≈|€|£|\$|voir prix|see today|tagespreis|precio del día|prezzo del giorno|prix amazon|indicative price|richtpreis)/i;

export function isPriceCellText(text) {
	const t = String(text || '').replace(/\s+/g, ' ').trim();
	if (!t || t.length > 80) return false;
	if (/\b(kWh|Wh|watt|volts?)\b/i.test(t)) return false;
	if (/\b\d+\s*h\b/i.test(t)) return false;
	return PRICE_CELL.test(t);
}
