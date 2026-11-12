/** @typedef {'fr'|'en'|'de'|'it'|'es'} RepairLang */

/** Robots / cartes basse tension (piles, USB) — sans mention secteur 230 V */
/** Domotique basse tension / logiciel (capteurs Zigbee sur pile, clés USB, hubs alimentés USB) */
export const PROFESSIONAL_ASSISTANCE_LOW_VOLTAGE = {
	fr:
		"En cas de doute, consultez la base de connaissances du fabricant (Aqara, Sonoff, Home Assistant…) ou ouvrez un ticket SAV — aucune coupure au disjoncteur 230 V n'est nécessaire pour un capteur sur pile, une clé Zigbee USB ou un réglage logiciel.",
	en:
		"If in doubt, use the manufacturer's knowledge base (Aqara, Sonoff, Home Assistant…) or open a warranty ticket — no 230 V breaker shutdown is required for coin-cell sensors, USB Zigbee sticks or software-only fixes.",
	de:
		'Im Zweifel Wissensdatenbank des Herstellers (Aqara, Sonoff, Home Assistant…) oder SAV-Ticket — für Batterie-Sensoren, USB-Zigbee-Sticks oder reine Software-Einstellungen ist kein 230-V-Hauptschalter nötig.',
	it:
		"In caso di dubbio, consultate la knowledge base del produttore (Aqara, Sonoff, Home Assistant…) o aprite un ticket SAV — nessuno spegnimento del magnetotérmico 230 V per sensori a pile, chiavette Zigbee USB o interventi solo software.",
	es:
		'En caso de duda, consulte la base de conocimiento del fabricante (Aqara, Sonoff, Home Assistant…) o abra un ticket SAV — no hace falta cortar el magnetotérmico de 230 V para sensores a pilas, dongles Zigbee USB o ajustes solo software.',
};

export const DISCLAIMER_LOW_VOLTAGE = {
	fr:
		"Clause de non-responsabilité : diagnostics et solutions indicatifs. Capteurs Zigbee sur pile (CR2032, CR2450, AAA), coordinateurs USB (Zigbee2MQTT, ZHA) et réglages Home Assistant se font hors secteur 230 V — respectez la polarité des piles et débranchez l'USB avant de changer de port si besoin. Ne travaillez jamais sur un micromodule sous tension (Shelly, Sonoff ZBMini-L2, fil pilote) : pour ceux-là, coupez le disjoncteur dédié. Robot Éducatif décline toute responsabilité en cas de mauvaise manipulation ou perte de garantie.",
	en:
		"Disclaimer: guidance only. Coin-cell Zigbee sensors (CR2032, CR2450, AAA), USB coordinators (Zigbee2MQTT, ZHA) and Home Assistant tweaks do not involve mains 230 V — mind battery polarity and unplug USB before moving a dongle if needed. Never work on live in-wall modules (Shelly, Sonoff ZBMini-L2, pilot wire): switch the dedicated breaker off first. Robot Éducatif accepts no liability for misuse or voided warranty.",
	de:
		'Haftungsausschluss: nur Orientierung. Zigbee-Batteriesensoren (CR2032, CR2450, AAA), USB-Koordinatoren (Zigbee2MQTT, ZHA) und Software-Einstellungen ohne 230 V — Polung beachten, USB vor Portwechsel trennen. Niemals unter Spannung an Unterputzmodulen (Shelly, Sonoff ZBMini-L2) arbeiten: vorgeschaltete Sicherung aus. Keine Haftung bei Fehlbedienung oder Garantieverlust.',
	it:
		"Esclusione di responsabilità: contenuto indicativo. Sensori Zigbee a pile (CR2032, CR2450, AAA), coordinatori USB (Zigbee2MQTT, ZHA) e regolazioni software senza 230 V — rispettare polarità pile e scollegare USB prima di cambiare porta. Mai intervenire su micromoduli sotto tensione (Shelly, Sonoff ZBMini-L2): interruttore dedicato spento. Nessuna responsabilità per uso scorretto o garanzia persa.",
	es:
		'Aviso legal: orientativo. Sensores Zigbee a pilas (CR2032, CR2450, AAA), coordinadores USB (Zigbee2MQTT, ZHA) y ajustes software sin 230 V — respete polaridad de pilas y desenchufe USB antes de cambiar de puerto. Nunca trabaje en micromódulos bajo tensión (Shelly, Sonoff ZBMini-L2): corte el magnetotérmico dedicado. Sin responsabilidad por mal uso o pérdida de garantía.',
};

export const PROFESSIONAL_ASSISTANCE_ROBOT = {
	fr:
		"En cas de doute, contactez l'assistance officielle Makeblock (support.makeblock.com) ou le SAV de la marque pour tout matériel sous garantie — n'ouvrez pas la carte principale (mCore, CyberPi) vous-même.",
	en:
		"If in doubt, contact Makeblock official support (support.makeblock.com) or the brand warranty service — do not open the main board (mCore, CyberPi) yourself.",
	de:
		'Im Zweifel Makeblock-Support (support.makeblock.com) oder Marken-SAV kontaktieren — Hauptplatine (mCore, CyberPi) nicht selbst öffnen.',
	it:
		"In caso di dubbio, contattate il supporto ufficiale Makeblock (support.makeblock.com) o il SAV del marchio — non aprite la scheda principale (mCore, CyberPi).",
	es:
		'En caso de duda, contacte con el soporte oficial de Makeblock (support.makeblock.com) o el SAV de la marca — no abra la placa principal (mCore, CyberPi).',
};

export const PROFESSIONAL_ASSISTANCE = {
	fr:
		"En cas de doute, contactez l'assistance officielle du constructeur, faites réparer par le SAV de la marque (ou faites appel à un électricien qualifié pour tout raccordement 230 V).",
	en:
		"If in doubt, contact the manufacturer's official support, use the brand's warranty service (or hire a qualified electrician for any 230 V wiring).",
	de:
		'Im Zweifel wenden Sie sich an den offiziellen Hersteller-Support oder das Marken-SAV (für 230-V-Anschlüsse nur einen qualifizierten Elektriker beauftragen).',
	it:
		"In caso di dubbio, contattate l'assistenza ufficiale del produttore o il SAV del marchio (per collegamenti 230 V rivolgetevi a un elettricista qualificato).",
	es:
		'En caso de duda, contacte con la asistencia oficial del fabricante o el servicio posventa de la marca (para conexiones a 230 V, recurra a un electricista cualificado).',
};

export const DISCLAIMER_ROBOT = {
	fr:
		"Clause de non-responsabilité : les diagnostics et solutions présentés sont indicatifs. Toute manipulation (câbles RJ25/mBuild, piles, USB) relève de votre responsabilité : coupez l'alimentation, retirez les piles ou débranchez l'USB avant de changer un capteur. Aucune intervention sur le secteur 230 V n'est requise sur un mBot, mBot2 ou CyberPi alimenté en piles/USB. Robot Éducatif décline toute responsabilité en cas de mauvaise manipulation, perte de garantie ou dommage matériel. En cas de doute, contactez le SAV Makeblock.",
	en:
		"Disclaimer: diagnostics and fixes here are for guidance only. Swapping RJ25/mBuild cables, batteries or USB work is your responsibility — power off, remove batteries or unplug USB before changing a sensor. No mains (230 V) work applies to battery/USB mBot, mBot2 or CyberPi. Robot Éducatif accepts no liability for misuse, voided warranty or damage. When unsure, contact Makeblock support.",
	de:
		'Haftungsausschluss: Diagnosen und Lösungen sind nur Orientierung. RJ25/mBuild-Kabel, Akkus oder USB tauschen Sie auf eigenes Risiko — vorher ausschalten, Akkus entfernen oder USB trennen. Keine 230-V-Arbeiten an batterie-/USB-betriebenen mBot/mBot2/CyberPi. Bei Zweifeln Makeblock-Support kontaktieren.',
	it:
		"Esclusione di responsabilità: diagnosi e soluzioni sono indicative. Cavi RJ25/mBuild, pile o USB: intervenite a vostro rischio — spegnere, togliere le pile o scollegare l'USB prima di cambiare un sensore. Nessun lavoro a 230 V su mBot/mBot2/CyberPi a pile/USB. In dubbio, supporto Makeblock.",
	es:
		'Aviso legal: diagnósticos y soluciones orientativos. Cables RJ25/mBuild, pilas o USB bajo su responsabilidad — apague, retire pilas o desenchufe USB antes de cambiar un sensor. No hay trabajo a 230 V en mBot/mBot2/CyberPi a pilas/USB. En duda, soporte Makeblock.',
};

export const DISCLAIMER = {
	fr:
		"Clause de non-responsabilité : Les codes erreurs, diagnostics et solutions présentés sur cette page sont fournis à titre strictement indicatif. Toute intervention s'effectue sous l'entière responsabilité de l'utilisateur (et obligatoirement hors tension, disjoncteur coupé, pour les équipements reliés au secteur 230 V). L'éditeur du site Robot Éducatif décline toute responsabilité en cas de mauvaise manipulation, de perte de garantie constructeur, de blessure ou de dommage matériel aggravé. En cas de doute, contactez toujours l'assistance officielle du fabricant.",
	en:
		"Disclaimer: Error codes, diagnostics and fixes on this page are for information only. Any work is entirely your responsibility (and mains-powered gear must be fully isolated — breaker off — before you touch 230 V wiring). Robot Éducatif accepts no liability for misuse, voided warranty, injury or aggravated damage. When unsure, always contact the manufacturer's official support.",
	de:
		'Haftungsausschluss: Fehlercodes, Diagnosen und Lösungen auf dieser Seite sind nur als Orientierung gedacht. Jeder Eingriff liegt in Ihrer Verantwortung (Geräte am 230-V-Netz nur spannungsfrei, Sicherung aus). Robot Éducatif haftet nicht für Fehlmanipulation, Garantieverlust, Verletzungen oder verschlimmerte Schäden. Im Zweifel immer den offiziellen Hersteller-Support kontaktieren.',
	it:
		"Clausola di esclusione di responsabilità: codici errore, diagnosi e soluzioni sono solo indicative. Ogni intervento è sotto la vostra responsabilità (e, per apparecchi a 230 V, solo a tensione zero con interruttore generale spento). Robot Éducatif declina ogni responsabilità per uso scorretto, perdita di garanzia, infortuni o danni aggravati. In caso di dubbio contattate sempre l'assistenza ufficiale del produttore.",
	es:
		'Aviso legal: los códigos de error, diagnósticos y soluciones son solo orientativos. Cualquier intervención es bajo su responsabilidad (y, en equipos a 230 V, siempre sin tensión y con el magnetotérmico desconectado). Robot Éducatif declina responsabilidad por mal uso, pérdida de garantía, lesiones o daños agravados. En caso de duda, contacte siempre con la asistencia oficial del fabricante.',
};

export const SAV_POLICY_LOW_VOLTAGE = {
	fr:
		"Remplacement de pile CR2032/CR2450/AAA, ré-appairage Zigbee, mise à jour firmware USB ou réglage Home Assistant : faisable par l'utilisateur avec la doc officielle. Hub ou capteur défectueux sous garantie → SAV constructeur.",
	en:
		"CR2032/CR2450/AAA battery swap, Zigbee re-pairing, USB stick firmware or Home Assistant tuning: doable at home with official docs. Defective in-warranty hub or sensor → manufacturer warranty.",
	de:
		'CR2032/CR2450/AAA tauschen, Zigbee neu koppeln, USB-Firmware oder Home-Assistant-Einstellungen: mit Hersteller-Doku selbst möglich. Defektes Gerät in Garantie → Marken-SAV.',
	it:
		"Sostituzione pile CR2032/CR2450/AAA, ri-accoppiamento Zigbee, firmware USB o regolazioni Home Assistant: fattibile con documentazione ufficiale. Hub o sensore difettoso in garanzia → SAV costruttore.",
	es:
		"Sustitución de pilas CR2032/CR2450/AAA, reemparejado Zigbee, firmware USB o ajustes Home Assistant: viable con documentación oficial. Hub o sensor defectuoso en garantía → SAV del fabricante.",
};

export const SAV_POLICY = {
	fr:
		"Ce qui relève du paramétrage logiciel, du remplacement d'un câble USB ou d'un capteur complémentaire peut être fait par l'utilisateur. Pour tout matériel défectueux ou sous garantie (box domotique, micromodule défaillant, carte mCore mBot), orientez-vous vers le SAV officiel et la garantie du constructeur — sans détourner la réparation officielle.",
	en:
		"Software setup, swapping a USB cable or an add-on sensor can be done at home. For defective or in-warranty hardware (hub, failed Shelly/Sonoff module, mCore board), use the manufacturer's official warranty service — do not bypass it.",
	de:
		'Software-Einstellungen, USB-Kabel oder Zusatzsensoren können Sie selbst tauschen. Defekte oder garantierte Hardware (Hub, Shelly/Sonoff-Modul, mCore-Platine) gehört in das offizielle Marken-SAV — keine inoffiziellen Reparaturen.',
	it:
		'Configurazione software, cavo USB o sensore aggiuntivo: potete intervenire voi. Hardware difettoso o in garanzia (hub, micromodulo Shelly/Sonoff, scheda mCore) va al SAV ufficiale del produttore.',
	es:
		'Ajustes de software, cable USB o sensor adicional: puede hacerlo el usuario. Hardware defectuoso o en garantía (hub, micromódulo Shelly/Sonoff, placa mCore) debe pasar por el SAV oficial de la marca.',
};

export const SUPPORT_BLOCK_TITLE = {
	fr: "Contacter l'assistance officielle & SAV constructeur",
	en: 'Official manufacturer support & warranty',
	de: 'Offizieller Hersteller-Support & SAV',
	it: 'Assistenza ufficiale & SAV costruttore',
	es: 'Asistencia oficial y SAV del fabricante',
};

export const CAUTION_LABEL = {
	fr: 'Prudence',
	en: 'Caution',
	de: 'Vorsicht',
	it: 'Attenzione',
	es: 'Precaución',
};

/** @type {{ id: string, name: Record<RepairLang,string>, links: { label: Record<RepairLang,string>, url: string }[], email?: string, phone?: string }[]} */
export const SMART_HOME_MANUFACTURERS = [
	{
		id: 'shelly',
		name: { fr: 'Shelly (Allterco Robotics)', en: 'Shelly (Allterco Robotics)', de: 'Shelly (Allterco Robotics)', it: 'Shelly (Allterco Robotics)', es: 'Shelly (Allterco Robotics)' },
		links: [
			{
				label: { fr: 'Portail ticket & support', en: 'Ticket & support portal', de: 'Ticket- & Support-Portal', it: 'Portale ticket e supporto', es: 'Portal de tickets y soporte' },
				url: 'https://support.shelly.cloud',
			},
			{
				label: { fr: 'Base de connaissances', en: 'Knowledge base', de: 'Wissensdatenbank', it: 'Knowledge base', es: 'Base de conocimiento' },
				url: 'https://kb.shelly.cloud',
			},
		],
	},
	{
		id: 'sonoff',
		name: { fr: 'Sonoff (ITEAD)', en: 'Sonoff (ITEAD)', de: 'Sonoff (ITEAD)', it: 'Sonoff (ITEAD)', es: 'Sonoff (ITEAD)' },
		links: [
			{
				label: { fr: 'Support officiel', en: 'Official support', de: 'Offizieller Support', it: 'Supporto ufficiale', es: 'Soporte oficial' },
				url: 'https://itead.cc/contact/',
			},
		],
		email: 'support@itead.cc',
	},
	{
		id: 'homey',
		name: { fr: 'Homey (Athom)', en: 'Homey (Athom)', de: 'Homey (Athom)', it: 'Homey (Athom)', es: 'Homey (Athom)' },
		links: [
			{
				label: { fr: "Centre d'assistance", en: 'Help centre', de: 'Hilfe-Center', it: 'Centro assistenza', es: 'Centro de ayuda' },
				url: 'https://support.homey.app',
			},
		],
	},
	{
		id: 'aqara',
		name: { fr: 'Aqara', en: 'Aqara', de: 'Aqara', it: 'Aqara', es: 'Aqara' },
		links: [
			{
				label: { fr: 'Support officiel', en: 'Official support', de: 'Offizieller Support', it: 'Supporto ufficiale', es: 'Soporte oficial' },
				url: 'https://www.aqara.com/fr/support/',
			},
		],
		email: 'support@aqara.com',
	},
	{
		id: 'makeblock',
		name: { fr: 'Makeblock (mBot / mBlock)', en: 'Makeblock (mBot / mBlock)', de: 'Makeblock (mBot / mBlock)', it: 'Makeblock (mBot / mBlock)', es: 'Makeblock (mBot / mBlock)' },
		links: [
			{
				label: { fr: 'Portail SAV', en: 'Support portal', de: 'SAV-Portal', it: 'Portale SAV', es: 'Portal SAV' },
				url: 'https://support.makeblock.com',
			},
		],
		email: 'support@makeblock.com',
		phone: '+86 755 2639 2228',
	},
];
