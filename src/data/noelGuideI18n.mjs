/** Textes UI guide Noël i18n (badges comparatif, divulgation). */

export const NOEL_COMPARISON = {
	en: {
		title: 'Our Christmas 2026 gift picks',
		products: [
			{ id: 'mbot', badge: 'Best gift ages 8–12' },
			{ id: 'mbot2', badge: 'Premium gift ages 10–14' },
			{ id: 'elegoo-penguin', badge: 'Small budget' },
			{ id: 'raspberry-pi-5-8gb', badge: 'Teen builder' },
		],
	},
	ca: {
		title: 'Our Christmas 2026 gift picks (Canada)',
		products: [
			{ id: 'mbot', badge: 'Best gift ages 8–12' },
			{ id: 'mbot2', badge: 'Premium gift ages 10–14' },
			{ id: 'elegoo-penguin', badge: 'Small budget' },
			{ id: 'raspberry-pi-5-8gb', badge: 'Teen builder' },
		],
	},
	de: {
		title: 'Unsere Weihnachts-Geschenk-Tipps 2026',
		products: [
			{ id: 'mbot', badge: 'Bestes Geschenk 8–12 Jahre' },
			{ id: 'mbot2', badge: 'Premium 10–14 Jahre' },
			{ id: 'elegoo-penguin', badge: 'Kleines Budget' },
			{ id: 'raspberry-pi-5-8gb', badge: 'Teenager-Projekt' },
		],
	},
	it: {
		title: 'I nostri regali Natale 2026 consigliati',
		products: [
			{ id: 'mbot', badge: 'Regalo ideale 8–12 anni' },
			{ id: 'mbot2', badge: 'Premium 10–14 anni' },
			{ id: 'elegoo-penguin', badge: 'Budget contenuto' },
			{ id: 'raspberry-pi-5-8gb', badge: 'Per adolescenti' },
		],
	},
	es: {
		title: 'Nuestras ideas regalo Navidad 2026',
		products: [
			{ id: 'mbot', badge: 'Mejor regalo 8–12 años' },
			{ id: 'mbot2', badge: 'Premium 10–14 años' },
			{ id: 'elegoo-penguin', badge: 'Presupuesto ajustado' },
			{ id: 'raspberry-pi-5-8gb', badge: 'Adolescentes' },
		],
	},
};

export const AFFILIATE_DISCLOSURE = {
	en: {
		full: '<strong>Disclosure:</strong> This guide includes Amazon affiliate links. As an Amazon Associate we earn from qualifying purchases, at no extra cost to you. Commissions help keep these guides free and up to date.',
	},
	de: {
		full: '<strong>Hinweis:</strong> Dieser Artikel enthält Amazon-Partnerlinks. Als Amazon-Partner verdienen wir an qualifizierten Käufen, ohne Mehrkosten für Sie. Die Provisionen finanzieren redaktionelle Updates.',
	},
	it: {
		full: '<strong>Informativa:</strong> Questa guida contiene link affiliati Amazon. In qualità di Associate Amazon percepiamo una commissione sugli acquisti idonei, senza costi aggiuntivi. I ricavi sostengono gli aggiornamenti editoriali.',
	},
	es: {
		full: '<strong>Aviso:</strong> Esta guía incluye enlaces de afiliado de Amazon. Como Asociado de Amazon obtenemos ingresos por compras cualificadas, sin coste extra para usted. Las comisiones financian las actualizaciones del sitio.',
	},
};

export const NOEL_PATHS = {
	fr: '/robot-educatif-cadeau-noel-2026/',
	en: '/en/educational-robot-christmas-gifts-2026/',
	uk: '/uk/educational-robot-christmas-gifts-2026/',
	ca: '/ca/educational-robot-christmas-gifts-2026/',
	us: '/us/educational-robot-christmas-gifts-2026/',
	de: '/de/lernroboter-weihnachtsgeschenke-2026/',
	it: '/it/regalo-natale-robot-educativo-2026/',
	es: '/es/regalo-navidad-robot-educativo-2026/',
};

export const NOEL_DIST_SLUGS = [
	'robot-educatif-cadeau-noel-2026',
	'en/educational-robot-christmas-gifts-2026',
	'de/lernroboter-weihnachtsgeschenke-2026',
	'it/regalo-natale-robot-educativo-2026',
	'es/regalo-navidad-robot-educativo-2026',
];

/** Champs catalogue localisés (nom court, âge, points forts) par locale. */
export const NOEL_PRODUCT_COPY = {
	fr: {
		mbot: { shortName: 'Makeblock mBot' },
		mbot2: { shortName: 'Makeblock mBot2' },
		'elegoo-penguin': { shortName: 'ELEGOO Penguin Bot' },
		'raspberry-pi-5-8gb': { shortName: 'Raspberry Pi 5 (8 Go)' },
	},
	en: {
		'botley-2': {
			shortName: 'Botley 2.0',
			ages: '5–9 years',
			languages: ['Arrow remote', 'Coding cards'],
			pros: ['Screen-free coding', 'Arrow remote & coding cards', 'Obstacle detection', 'Ready to play out of the box'],
		},
		mbot: {
			shortName: 'Makeblock mBot',
			ages: '8–12 years',
			pros: ['15-minute build', 'Scratch-style blocks in mBlock', 'Grows into Arduino C++', 'Line follow & obstacle sensors'],
		},
		mbot2: {
			shortName: 'Makeblock mBot2',
			ages: '10–14 years',
			pros: ['CyberPi with colour screen', 'Python and Scratch', 'Built-in Wi‑Fi', 'mBuild expansion ecosystem'],
		},
		'elegoo-penguin': {
			shortName: 'ELEGOO Penguin Bot',
			ages: '8–14 years',
			pros: ['Biped robot with personality', 'Dance & music projects', 'Arduino C learning path', 'Often the cheapest programmable kit'],
		},
		'raspberry-pi-5-8gb': {
			shortName: 'Raspberry Pi 5 (8GB)',
			ages: '12+ years',
			pros: ['8 GB RAM for vision & Docker', 'Huge maker community', 'Python on real Linux', 'Pairs with robot HATs & cameras'],
		},
		'codey-rocky': {
			shortName: 'Codey Rocky',
			ages: '6–12 years',
			pros: ['Scratch and mBlock blocks', 'Voice recognition & AI demos', 'Line follow and light sensors', 'Compact all-in-one body'],
		},
		'elegoo-robot-car': {
			shortName: 'ELEGOO Smart Robot Car V4.0',
			ages: '13+ years',
			pros: ['Complete UNO R3 kit', 'Step-by-step tutorials included', 'Wi‑Fi control & FPV camera', 'Strong value Arduino project'],
		},
		'code-and-go-souris': {
			shortName: 'Code & Go Robot Mouse',
			ages: '4+ years',
			languages: ['Buttons on the robot', 'Challenge cards'],
			pros: ['Screen-free coding', 'Modular maze', 'Progressive challenge cards', 'Ready to play out of the box'],
		},
		'elegoo-uno-super-starter': {
			shortName: 'ELEGOO UNO R3 Super Starter Kit',
			ages: 'Teens',
			languages: ['Arduino C/C++'],
			pros: ['More than 22 lessons', 'No soldering', 'Reusable components', 'Breadboard electronics, not a finished robot'],
		},
		'raspberry-pi-5-4gb': {
			shortName: 'Raspberry Pi 5 (4GB)',
			ages: '12+ years',
			pros: ['Faster than a Pi 4', 'Board only — power, case and microSD extra', 'Python on real Linux', 'Enough RAM for a first robot project'],
		},
	},
	de: {
		'botley-2': {
			shortName: 'Botley 2.0',
			ages: '5–9 Jahre',
			languages: ['Pfeiltasten-Fernsteuerung', 'Codierkarten'],
			pros: ['Bildschirmfreie Programmierung', 'Pfeiltasten-Fernsteuerung & Codierkarten', 'Hinderniserkennung', 'Sofort spielbereit'],
		},
		mbot: {
			shortName: 'Makeblock mBot',
			ages: '8–12 Jahre',
			pros: ['Aufbau in ca. 15 Minuten', 'Scratch-Blöcke in mBlock', 'Arduino C++ als nächster Schritt', 'Linienfolger & Ultraschall'],
		},
		mbot2: {
			shortName: 'Makeblock mBot2',
			ages: '10–14 Jahre',
			pros: ['CyberPi mit Farbdisplay', 'Python und Scratch', 'WLAN onboard', 'Viele mBuild-Erweiterungen'],
		},
		'elegoo-penguin': {
			shortName: 'ELEGOO Penguin Bot',
			ages: '8–14 Jahre',
			pros: ['Zweibeiner mit Charakter', 'Tanz- & Musikprojekte', 'Einstieg in Arduino C', 'Günstiger Einstiegspreis'],
		},
		'raspberry-pi-5-8gb': {
			shortName: 'Raspberry Pi 5 (8 GB)',
			ages: '12+ Jahre',
			pros: ['8 GB RAM für KI & Docker', 'Riesige Community', 'Python unter Linux', 'Robot-HATs & Kameras'],
		},
		'codey-rocky': {
			shortName: 'Codey Rocky',
			ages: '6–12 Jahre',
			pros: ['Scratch- und mBlock-Blöcke', 'Spracherkennung & KI-Demos', 'Linienfolger & Lichtsensor', 'Kompakter Alles-in-einem-Roboter'],
		},
		'elegoo-robot-car': {
			shortName: 'ELEGOO Smart Robot Car V4.0',
			ages: '13+ Jahre',
			pros: ['Komplettes UNO-R3-Kit', 'Ausführliche Schritt-für-Schritt-Anleitungen', 'WLAN-Steuerung & FPV-Kamera', 'Gutes Preis-Leistungs-Arduino-Projekt'],
		},
		'code-and-go-souris': {
			shortName: 'Code & Go Robotermaus',
			ages: 'ab 4 Jahren',
			languages: ['Tasten auf der Maus', 'Aufgabenkarten'],
			pros: ['Ohne Bildschirm', 'Modulares Labyrinth', 'Aufgaben in Stufen', 'Sofort spielbereit'],
		},
		'elegoo-uno-super-starter': {
			shortName: 'ELEGOO UNO R3 Super Starter Kit',
			ages: 'Jugendliche',
			languages: ['Arduino C/C++'],
			pros: ['Mehr als 22 Lektionen', 'Ohne Löten', 'Wiederverwendbare Bauteile', 'Steckbrett, kein fertiger Roboter'],
		},
		'raspberry-pi-5-4gb': {
			shortName: 'Raspberry Pi 5 (4 GB)',
			ages: 'ab 12 Jahren',
			pros: ['Schneller als ein Pi 4', 'Nur das Board — Netzteil, Gehäuse und microSD extra', 'Python unter Linux', 'Reicht für ein erstes Roboterprojekt'],
		},
	},
	it: {
		'botley-2': {
			shortName: 'Botley 2.0',
			ages: '5–9 anni',
			languages: ['Telecomando a frecce', 'Schede di coding'],
			pros: ['Programmazione senza schermo', 'Telecomando a frecce e schede di coding', 'Rilevamento ostacoli', 'Pronto a giocare'],
		},
		mbot: {
			shortName: 'Makeblock mBot',
			ages: '8–12 anni',
			pros: ['Montaggio in 15 minuti', 'Blocchi stile Scratch in mBlock', 'Evoluzione verso Arduino C++', 'Sensore linea e ultrasuoni'],
		},
		mbot2: {
			shortName: 'Makeblock mBot2',
			ages: '10–14 anni',
			pros: ['CyberPi con schermo a colori', 'Python e Scratch', 'Wi‑Fi integrato', 'Ecosistema mBuild'],
		},
		'elegoo-penguin': {
			shortName: 'ELEGOO Penguin Bot',
			ages: '8–14 anni',
			pros: ['Robot bipede divertente', 'Progetti danza e musica', 'Percorso Arduino C', 'Prezzo contenuto su Amazon.it'],
		},
		'raspberry-pi-5-8gb': {
			shortName: 'Raspberry Pi 5 (8 GB)',
			ages: '12+ anni',
			pros: ['8 GB RAM per visione e Docker', 'Community vastissima', 'Python su Linux', 'HAT robotici e telecamere'],
		},
		'codey-rocky': {
			shortName: 'Codey Rocky',
			ages: '6–12 anni',
			pros: ['Blocchi Scratch e mBlock', 'Riconoscimento vocale e demo IA', 'Seguimento linea e sensore luce', 'Robot compatto tutto-in-uno'],
		},
		'elegoo-robot-car': {
			shortName: 'ELEGOO Smart Robot Car V4.0',
			ages: '13+ anni',
			pros: ['Kit UNO R3 completo', 'Tutorial passo passo inclusi', 'Controllo Wi‑Fi e camera FPV', 'Ottimo rapporto qualità-prezzo Arduino'],
		},
		'code-and-go-souris': {
			shortName: 'Code & Go, topo robot',
			ages: 'dai 4 anni',
			languages: ['Tasti sul robot', 'Schede sfida'],
			pros: ['Senza schermo', 'Labirinto componibile', 'Sfide progressive', 'Pronto da giocare'],
		},
		'elegoo-uno-super-starter': {
			shortName: 'ELEGOO UNO R3 Super Starter Kit',
			ages: 'Ragazzi',
			languages: ['Arduino C/C++'],
			pros: ['Oltre 22 lezioni', 'Senza saldature', 'Componenti riutilizzabili', 'Breadboard, non un robot finito'],
		},
		'raspberry-pi-5-4gb': {
			shortName: 'Raspberry Pi 5 (4 GB)',
			ages: 'dai 12 anni',
			pros: ['Più veloce di un Pi 4', 'Solo la scheda — alimentatore, case e microSD a parte', 'Python su Linux', 'Ram sufficiente per un primo robot'],
		},
	},
	es: {
		'botley-2': {
			shortName: 'Botley 2.0',
			ages: '5–9 años',
			languages: ['Mando de flechas', 'Tarjetas de código'],
			pros: ['Programación sin pantalla', 'Mando de flechas y tarjetas de código', 'Detección de obstáculos', 'Listo para jugar'],
		},
		mbot: {
			shortName: 'Makeblock mBot',
			ages: '8–12 años',
			pros: ['Montaje en 15 minutos', 'Bloques tipo Scratch en mBlock', 'Paso a Arduino C++', 'Seguidor de línea y ultrasonidos'],
		},
		mbot2: {
			shortName: 'Makeblock mBot2',
			ages: '10–14 años',
			pros: ['CyberPi con pantalla a color', 'Python y Scratch', 'Wi‑Fi integrado', 'Extensiones mBuild'],
		},
		'elegoo-penguin': {
			shortName: 'ELEGOO Penguin Bot',
			ages: '8–14 años',
			pros: ['Robot bípedo original', 'Proyectos de baile y música', 'Aprendizaje Arduino C', 'Buena relación calidad-precio'],
		},
		'raspberry-pi-5-8gb': {
			shortName: 'Raspberry Pi 5 (8 GB)',
			ages: '12+ años',
			pros: ['8 GB RAM para visión y Docker', 'Comunidad enorme', 'Python en Linux real', 'HATs robóticos y cámaras'],
		},
		'codey-rocky': {
			shortName: 'Codey Rocky',
			ages: '6–12 años',
			pros: ['Bloques Scratch y mBlock', 'Reconocimiento de voz e IA', 'Seguidor de línea y sensor de luz', 'Robot compacto todo en uno'],
		},
		'elegoo-robot-car': {
			shortName: 'ELEGOO Smart Robot Car V4.0',
			ages: '13+ años',
			pros: ['Kit UNO R3 completo', 'Tutoriales paso a paso incluidos', 'Control Wi‑Fi y cámara FPV', 'Buena relación calidad-precio Arduino'],
		},
		'code-and-go-souris': {
			shortName: 'Code & Go, ratón robot',
			ages: 'desde 4 años',
			languages: ['Botones en el robot', 'Tarjetas de retos'],
			pros: ['Sin pantalla', 'Laberinto modular', 'Retos progresivos', 'Listo para jugar'],
		},
		'elegoo-uno-super-starter': {
			shortName: 'ELEGOO UNO R3 Super Starter Kit',
			ages: 'Adolescentes',
			languages: ['Arduino C/C++'],
			pros: ['Más de 22 lecciones', 'Sin soldadura', 'Componentes reutilizables', 'Placa de pruebas, no un robot terminado'],
		},
		'raspberry-pi-5-4gb': {
			shortName: 'Raspberry Pi 5 (4 GB)',
			ages: 'desde 12 años',
			pros: ['Más rápido que un Pi 4', 'Solo la placa — fuente, carcasa y microSD aparte', 'Python en Linux', 'RAM suficiente para un primer robot'],
		},
	},
};
