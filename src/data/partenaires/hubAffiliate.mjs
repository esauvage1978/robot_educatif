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
			fr: 'Entrée de gamme courante en école — budget souvent autour de 110 € le kit neuf.',
			en: 'Frequent school entry kit — often around 110 euros for a new set (check today’s price).',
			de: 'Häufiger Schulteinstieg — oft um 110 Euro für ein Neukit (Tagespreis prüfen).',
			it: 'Kit scuola di base — spesso intorno a 110 euro il set nuovo.',
			es: 'Kit escolar de entrada — a menudo unos 110 euros el pack nuevo.',
			nl: 'Instapkit voor scholen — vaak rond 110 euro voor een nieuwe set.',
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
			'L’annuaire ne remplace pas un comparatif : ces kits reviennent dans nos pages école et programmation. Liens partenaires — prix du jour chez le marchand.',
		compare: 'Lire le guide',
		amazon: 'Voir sur Amazon',
		faqTitle: 'Questions fréquentes',
	},
	en: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots often mentioned on this site',
		railLead:
			'This directory is not a buying guide by itself. These kits appear in our school and coding pages. Affiliate links — check today’s price at the shop.',
		compare: 'Read the guide',
		amazon: 'View on Amazon',
		faqTitle: 'FAQ',
	},
	de: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Roboter, die auf der Website oft vorkommen',
		railLead:
			'Das Verzeichnis ersetzt keinen Vergleich. Diese Kits tauchen in Schul- und Programmierseiten auf. Werbelinks — Tagespreis beim Händler prüfen.',
		compare: 'Zum Guide',
		amazon: 'Bei Amazon ansehen',
		faqTitle: 'Häufige Fragen',
	},
	it: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robot citati spesso sul sito',
		railLead:
			'L’elenco non sostituisce un confronto. Questi kit compaiono nelle pagine scuola e programmazione. Link affiliati — prezzo del giorno sul negozio.',
		compare: 'Leggi la guida',
		amazon: 'Vedi su Amazon',
		faqTitle: 'Domande frequenti',
	},
	es: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots citados a menudo en el sitio',
		railLead:
			'El directorio no sustituye una comparativa. Estos kits aparecen en nuestras páginas de aula y programación. Enlaces afiliados — precio del día en la tienda.',
		compare: 'Ver la guía',
		amazon: 'Ver en Amazon',
		faqTitle: 'Preguntas frecuentes',
	},
	nl: {
		indexTitleHint: 'robot-educatif.info',
		railTitle: 'Robots die vaak op de site voorkomen',
		railLead:
			'Deze directory is geen koopgids op zich. Deze kits komen terug op school- en programmeerpagina’s. Partnerlinks — controleer de dagprijs bij de winkel.',
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
				'Chaque fiche correspond à un programme d’affiliation accepté (hors Amazon, géré à part). Le filtre aide à retrouver un marchand par pays ou par type marque / revendeur.',
		},
		{
			question: 'Les liens vers un partenaire sont-ils sponsorisés ?',
			answer:
				'Oui lorsqu’un bouton « Voir chez … » ou un lien /go/ est présent : rel="sponsored nofollow". Aucun surcoût pour vous ; la rémunération ne change pas notre méthode de test.',
		},
		{
			question: 'Pourquoi un partenaire n’a pas de prix sur cette page ?',
			answer:
				'Sans flux produit autorisé ou sans lien marchand validé, nous n’affichons pas de comparateur de prix. Consultez la fiche officielle du programme ou nos articles éditoriaux cités plus bas.',
		},
	],
	en: [
		{
			question: 'What does robot-educatif.info list in this partners hub?',
			answer:
				'Each page is one accepted affiliate programme (Amazon is handled separately). Filters help you find a merchant by country or by brand vs retailer.',
		},
		{
			question: 'Are links to a partner sponsored?',
			answer:
				'Yes when a “View at …” button or a /go/ link is shown: rel="sponsored nofollow". There is no extra cost for you; compensation does not change how we test.',
		},
		{
			question: 'Why is there no price on some partner pages?',
			answer:
				'Without an authorised product feed or a validated shop link, we do not show a price comparator. Use the official programme page or the editorial articles listed on the partner profile.',
		},
	],
	de: [
		{
			question: 'Was listet robot-educatif.info in diesem Partner-Verzeichnis?',
			answer:
				'Jede Seite ist ein angenommenes Partnerprogramm (Amazon separat). Filter nach Land oder Marke/Händler.',
		},
		{
			question: 'Sind Partnerlinks Werbung?',
			answer:
				'Ja, wenn ein Button oder /go/-Link gesetzt ist: rel="sponsored nofollow". Kein Mehrpreis für Sie.',
		},
		{
			question: 'Warum steht auf manchen Seiten kein Preis?',
			answer:
				'Ohne autorisierten Produkt-Feed oder validierten Shop-Link zeigen wir keinen Preisvergleich. Nutzen Sie die offizielle Programmeite oder die verlinkten Artikel.',
		},
	],
	it: [
		{
			question: 'Cosa elenca robot-educatif.info in questo hub partner?',
			answer:
				'Ogni scheda è un programma affiliato accettato (Amazon a parte). I filtri aiutano per paese o tipo marchio/rivenditore.',
		},
		{
			question: 'I link verso un partner sono sponsorizzati?',
			answer:
				'Sì quando c’è un pulsante o un link /go/: rel="sponsored nofollow". Nessun sovrapprezzo per voi.',
		},
		{
			question: 'Perché alcune schede non hanno un prezzo?',
			answer:
				'Senza feed prodotti autorizzato o link negozio validato non mostriamo un comparatore. Usate il sito ufficiale o gli articoli elencati.',
		},
	],
	es: [
		{
			question: '¿Qué lista robot-educatif.info en este hub de socios?',
			answer:
				'Cada ficha es un programa de afiliación aceptado (Amazon aparte). Los filtros ayudan por país o tipo marca/distribuidor.',
		},
		{
			question: '¿Los enlaces a un socio son patrocinados?',
			answer:
				'Sí cuando hay botón o enlace /go/: rel="sponsored nofollow". No hay recargo para usted.',
		},
		{
			question: '¿Por qué algunas fichas no muestran precio?',
			answer:
				'Sin feed de productos autorizado o enlace validado no mostramos comparador. Consulte la web oficial o los artículos enlazados.',
		},
	],
	nl: [
		{
			question: 'Wat staat in deze partner-hub op robot-educatif.info?',
			answer:
				'Elke pagina is één aanvaard partnerprogramma (Amazon apart). Filters op land of merk/winkel.',
		},
		{
			question: 'Zijn partnerlinks gesponsord?',
			answer:
				'Ja bij een knop of /go/-link: rel="sponsored nofollow". Geen meerprijs voor u.',
		},
		{
			question: 'Waarom staat er niet overal een prijs?',
			answer:
				'Zonder geautoriseerde productfeed of gevalideerde shoplink tonen we geen prijsvergelijker. Gebruik de officiële site of gelinkte artikelen.',
		},
	],
};