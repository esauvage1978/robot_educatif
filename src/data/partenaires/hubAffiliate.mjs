/** Cartes produit éditoriales sur l’annuaire partenaires (photos réelles, liens /go/). */

/**
 * @typedef {{ image: string, alt: Record<string,string>, name: Record<string,string>, blurb: Record<string,string>, go: Record<string,string>, guide: Record<string,string> }} PartnerHubCard
 */

/** @type {PartnerHubCard[]} */
export const PARTNER_HUB_ROBOT_CARDS = [
	{
		image: '/images/models/makeblock-mbot2.webp',
		alt: {
			fr: 'Robot éducatif Makeblock mBot2 avec carte CyberPi',
			en: 'Makeblock mBot2 educational robot with CyberPi board',
			de: 'Makeblock mBot2 Lernroboter mit CyberPi-Platine',
			it: 'Robot educativo Makeblock mBot2 con scheda CyberPi',
			es: 'Robot educativo Makeblock mBot2 con placa CyberPi',
			nl: 'Makeblock mBot2 leerrobot met CyberPi-bord',
		},
		name: {
			fr: 'Makeblock mBot2',
			en: 'Makeblock mBot2',
			de: 'Makeblock mBot2',
			it: 'Makeblock mBot2',
			es: 'Makeblock mBot2',
			nl: 'Makeblock mBot2',
		},
		blurb: {
			fr: 'Robot programmable en Scratch et Python — référence fréquente dans nos guides classe.',
			en: 'Scratch and Python programmable robot — common pick in our classroom guides.',
			de: 'Programmierbar mit Scratch und Python — häufig in unseren Klassen-Guides.',
			it: 'Programmabile in Scratch e Python — scelta frequente nelle guide scuola.',
			es: 'Programable en Scratch y Python — referencia habitual en guías de aula.',
			nl: 'Te programmeren met Scratch en Python — veel genoemd in onze klasgidsen.',
		},
		go: {
			fr: '/go/az-fr-1aa86e758c/',
			en: '/go/az-us-aa0fb23b7b/',
			de: '/go/az-de-4ea6c3bb28/',
			it: '/go/az-it-9c79b7f2c0/',
			es: '/go/az-es-995228ebcb/',
		},
		guide: {
			fr: '/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants/',
			en: '/en/mbot-vs-mbot2/',
			de: '/de/mbot-vs-mbot2/',
			it: '/it/mbot-vs-mbot2/',
			es: '/es/mbot-vs-mbot2/',
		},
	},
	{
		image: '/images/models/makeblock-mbot-mcore.webp',
		alt: {
			fr: 'Makeblock mBot classique à carte mCore',
			en: 'Classic Makeblock mBot with mCore board',
			de: 'Klassischer Makeblock mBot mit mCore',
			it: 'Makeblock mBot classico con scheda mCore',
			es: 'Makeblock mBot clásico con placa mCore',
			nl: 'Klassieke Makeblock mBot met mCore',
		},
		name: {
			fr: 'Makeblock mBot',
			en: 'Makeblock mBot',
			de: 'Makeblock mBot',
			it: 'Makeblock mBot',
			es: 'Makeblock mBot',
			nl: 'Makeblock mBot',
		},
		blurb: {
			fr: 'Entrée de gamme courante en école — idéal pour une première séance robot en binôme.',
			en: 'Popular school entry kit — a good first classroom robot in pairs.',
			de: 'Häufiger Schulteinstieg in der Schule — gut für erste Robotersitzungen im Team.',
			it: 'Kit scuola di base — adatto alle prime lezioni di robotica in coppia.',
			es: 'Kit escolar de entrada — útil para las primeras sesiones de robot en parejas.',
			nl: 'Instapkit voor scholen — geschikt voor eerste robotlessen in duo’s.',
		},
		go: {
			fr: '/go/az-fr-1d10774f85/',
			en: '/go/az-us-d15f4ee758/',
			de: '/go/az-de-cba2aade06/',
			it: '/go/az-it-2b788b17eb/',
			es: '/go/az-es-3d4cce7de1/',
		},
		guide: {
			fr: '/robot-pedagogique-ecole/',
			en: '/en/robots-for-school/',
			de: '/de/mbot-test-kaufen/',
			it: '/it/mbot-vs-mbot2/',
			es: '/es/mbot-vs-mbot2/',
		},
	},
];

export const PARTNER_HUB_COPY = {
	fr: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots souvent cités sur le site',
		railLead:
			'L’annuaire ne remplace pas un comparatif : ces kits reviennent dans nos pages école et programmation. Vérifiez le prix du jour chez le marchand.',
		compare: 'Lire le guide',
		amazon: 'Voir sur Amazon',
		faqTitle: 'Questions fréquentes',
	},
	en: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots often mentioned on this site',
		railLead:
			'This directory is not a buying guide by itself. These kits appear in our school and coding pages. Check today’s price at the shop.',
		compare: 'Read the guide',
		amazon: 'View on Amazon',
		faqTitle: 'FAQ',
	},
	de: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Roboter, die auf der Website oft vorkommen',
		railLead:
			'Das Verzeichnis ersetzt keinen Vergleich. Diese Kits tauchen in Schul- und Programmierseiten auf. Tagespreis beim Händler prüfen.',
		compare: 'Zum Guide',
		amazon: 'Bei Amazon ansehen',
		faqTitle: 'Häufige Fragen',
	},
	it: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robot citati spesso sul sito',
		railLead:
			'L’elenco non sostituisce un confronto. Questi kit compaiono nelle pagine scuola e programmazione. Controllate il prezzo del giorno sul negozio.',
		compare: 'Leggi la guida',
		amazon: 'Vedi su Amazon',
		faqTitle: 'Domande frequenti',
	},
	es: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots citados a menudo en el sitio',
		railLead:
			'El directorio no sustituye una comparativa. Estos kits aparecen en nuestras páginas de aula y programación. Consulte el precio del día en la tienda.',
		compare: 'Ver la guía',
		amazon: 'Ver en Amazon',
		faqTitle: 'Preguntas frecuentes',
	},
	nl: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots die vaak op de site voorkomen',
		railLead:
			'Deze directory is geen koopgids op zich. Deze kits komen terug op school- en programmeerpagina’s. Controleer de dagprijs bij de winkel.',
		compare: 'Lees de gids',
		amazon: 'Bekijk op Amazon',
		faqTitle: 'Veelgestelde vragen',
	},
};

/** FAQ annuaire (toutes langues) — réponses factuelles, sans inventer offres partenaires. */
export const PARTNER_HUB_FAQ = {
	fr: [
		{
			question: 'Que liste robot-educatif.info dans cet annuaire ?',
			answer:
				'Une fiche par partenariat accepté avec une marque ou un revendeur. Amazon a ses propres pages produit ; ici on retrouve surtout les autres marchands. Les filtres aident à choisir un pays ou un type.',
		},
		{
			question: 'Les liens vers un partenaire sont-ils sponsorisés ?',
			answer:
				'Certains liens sont affiliés : cela ne change pas le prix pour vous. La rémunération n’influence pas la façon dont nous testons les produits.',
		},
		{
			question: 'Pourquoi un partenaire n’a pas de prix sur cette page ?',
			answer:
				'Quand nous n’avons pas de lien boutique fiable sur la fiche, nous n’affichons pas de prix. Consultez le site officiel du partenaire ou nos articles éditoriaux en bas de page.',
		},
	],
	en: [
		{
			question: 'What does robot-educatif.info list in this partners hub?',
			answer:
				'One page per accepted partnership with a brand or retailer. Amazon product pages are handled elsewhere; this hub focuses on other merchants. Filters help by country or type.',
		},
		{
			question: 'Are links to a partner sponsored?',
			answer:
				'Some links are affiliate links: they do not change what you pay. Compensation does not change how we test products.',
		},
		{
			question: 'Why is there no price on some partner pages?',
			answer:
				'When we cannot offer a reliable shop link on the profile, we do not show a price. Check the partner’s official site or the editorial articles at the bottom of the page.',
		},
	],
	de: [
		{
			question: 'Was listet robot-educatif.info in diesem Partner-Verzeichnis?',
			answer:
				'Eine Seite pro angenommener Partnerschaft mit Marke oder Händler. Amazon-Produktseiten gibt es separat; hier stehen vor allem andere Shops. Filter nach Land oder Typ.',
		},
		{
			question: 'Sind Partnerlinks Werbung?',
			answer:
				'Einige Links sind Partnerlinks: Sie ändern den Preis für Sie nicht. Vergütung beeinflusst nicht, wie wir Produkte testen.',
		},
		{
			question: 'Warum steht auf manchen Seiten kein Preis?',
			answer:
				'Ohne verlässlichen Shop-Link auf der Seite zeigen wir keinen Preis. Nutzen Sie die offizielle Website des Partners oder die verlinkten Artikel unten.',
		},
	],
	it: [
		{
			question: 'Cosa elenca robot-educatif.info in questo hub partner?',
			answer:
				'Una scheda per ogni partnership accettata con marca o rivenditore. Le pagine prodotto Amazon sono altrove; qui compaiono soprattutto altri negozi. Filtri per paese o tipo.',
		},
		{
			question: 'I link verso un partner sono sponsorizzati?',
			answer:
				'Alcuni link sono affiliati: non cambiano il prezzo per voi. La remunerazione non influenza come testiamo i prodotti.',
		},
		{
			question: 'Perché alcune schede non hanno un prezzo?',
			answer:
				'Senza un link affidabile al negozio non mostriamo un prezzo. Consultate il sito ufficiale del partner o gli articoli editoriali in fondo alla pagina.',
		},
	],
	es: [
		{
			question: '¿Qué lista robot-educatif.info en este hub de socios?',
			answer:
				'Una ficha por colaboración aceptada con marca o tienda. Las páginas de producto de Amazon están aparte; aquí aparecen sobre todo otros comercios. Filtros por país o tipo.',
		},
		{
			question: '¿Los enlaces a un socio son patrocinados?',
			answer:
				'Algunos enlaces son de afiliación: no cambian el precio para usted. La remuneración no influye en cómo probamos los productos.',
		},
		{
			question: '¿Por qué algunas fichas no muestran precio?',
			answer:
				'Sin un enlace fiable a la tienda no mostramos precio. Consulte la web oficial del socio o los artículos editoriales al final de la página.',
		},
	],
	nl: [
		{
			question: 'Wat staat in deze partner-hub op robot-educatif.info?',
			answer:
				'Eén pagina per aanvaarde samenwerking met een merk of winkel. Amazon-productpagina’s staan elders; hier staan vooral andere verkopers. Filters op land of type.',
		},
		{
			question: 'Zijn partnerlinks gesponsord?',
			answer:
				'Sommige links zijn partnerlinks: ze veranderen de prijs voor u niet. Vergoeding beïnvloedt niet hoe wij producten testen.',
		},
		{
			question: 'Waarom staat er niet overal een prijs?',
			answer:
				'Zonder betrouwbare shoplink op de pagina tonen we geen prijs. Raadpleeg de officiële site van de partner of de redactionele artikelen onderaan.',
		},
	],
};