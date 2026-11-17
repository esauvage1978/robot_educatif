/** Dates JSON-LD pour les pages guide (.md / layouts *Post). */
const MONTHS = {
	janvier: 0,
	january: 0,
	januar: 0,
	enero: 0,
	gennaio: 0,
	février: 1,
	fevrier: 1,
	february: 1,
	februar: 1,
	febrero: 1,
	febbraio: 1,
	mars: 2,
	march: 2,
	märz: 2,
	maerz: 2,
	marzo: 2,
	avril: 3,
	april: 3,
	abril: 3,
	mai: 4,
	may: 4,
	yo: 4,
	maggio: 4,
	juin: 6,
	june: 6,
	juni: 6,
	junio: 6,
	giugno: 6,
	juillet: 7,
	july: 7,
	juli: 7,
	julio: 7,
	luglio: 7,
	août: 7,
	aout: 7,
	august: 7,
	augustus: 7,
	agosto: 7,
	septembre: 8,
	september: 8,
	septiembre: 8,
	settembre: 8,
	octobre: 9,
	october: 9,
	oktober: 9,
	octubre: 9,
	ottobre: 9,
	novembre: 10,
	november: 10,
	noviembre: 10,
	décembre: 11,
	decembre: 11,
	december: 11,
	dezember: 11,
	diciembre: 11,
	dicembre: 11,
};

function parseUpdatedString(raw) {
	if (!raw || typeof raw !== 'string') return undefined;
	const trimmed = raw.trim();
	const iso = Date.parse(trimmed);
	if (/^\d{4}-\d{2}-\d{2}/.test(trimmed) && !Number.isNaN(iso)) return new Date(iso);
	const m = trimmed.match(/^(\d{1,2})\s+([a-zàâäéèêëïîôùûüç.]+)\s+(\d{4})$/i);
	if (!m) return undefined;
	const day = Number(m[1]);
	const mon = MONTHS[m[2].toLowerCase().replace(/\./g, '')];
	const year = Number(m[3]);
	if (mon === undefined || !day || !year) return undefined;
	return new Date(Date.UTC(year, mon, day, 12, 0, 0));
}

export function guideArticleDates(fm) {
	const pubDate = fm?.pubDate ? new Date(fm.pubDate) : new Date('2026-10-01T12:00:00+02:00');
	let updatedDate = fm?.updatedDate ? new Date(fm.updatedDate) : undefined;
	if (!updatedDate && fm?.updated) {
		updatedDate = parseUpdatedString(fm.updated);
	}
	return { pubDate, updatedDate };
}