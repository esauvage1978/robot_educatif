export const SVG_LIBRARY_PAGE = {
	title: 'Schémas SVG capteurs mBot et mBot2 (broches, RJ25, mBuild)',
	description:
		'Bibliothèque de schémas vectoriels : ports RJ25 1 à 4, bus mBuild, ultrason, suiveur de ligne, servomoteur et matrice LED — visualisation interactive et téléchargement SVG pour affiches ou fiches techniques.',
	intro:
		'Schémas simplifiés pour la classe (broches et polarité à vérifier sur la documentation Makeblock avant câblage). Cliquez sur un schéma pour l’agrandir, puis téléchargez le fichier SVG.',
};

export const SVG_SCHEMES = [
	{
		id: 'rj25-ports',
		title: 'Ports RJ25 (mCore / mBot classique)',
		tags: ['RJ25', 'ports 1–4', 'mCore'],
		description: 'Vue des quatre ports RJ25 sur le mCore : moteurs (M1/M2) et ports génériques 3–4 pour capteurs analogiques ou ultrason.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320" role="img" aria-label="Ports RJ25 mCore">
  <rect width="520" height="320" fill="#f8fafc"/>
  <rect x="40" y="60" width="440" height="200" rx="12" fill="#334155" stroke="#1e293b" stroke-width="2"/>
  <text x="260" y="45" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#0f172a">mCore — connecteurs RJ25</text>
  <g font-family="system-ui,sans-serif" font-size="13" fill="#e2e8f0">
    <rect x="70" y="100" width="80" height="50" rx="6" fill="#475569"/><text x="110" y="130" text-anchor="middle">Port 1</text><text x="110" y="168" text-anchor="middle" font-size="11" fill="#94a3b8">Moteur L</text>
    <rect x="170" y="100" width="80" height="50" rx="6" fill="#475569"/><text x="210" y="130" text-anchor="middle">Port 2</text><text x="210" y="168" text-anchor="middle" font-size="11" fill="#94a3b8">Moteur R</text>
    <rect x="270" y="100" width="80" height="50" rx="6" fill="#0ea5e9"/><text x="310" y="130" text-anchor="middle">Port 3</text><text x="310" y="168" text-anchor="middle" font-size="11" fill="#bae6fd">I/O capteur</text>
    <rect x="370" y="100" width="80" height="50" rx="6" fill="#0ea5e9"/><text x="410" y="130" text-anchor="middle">Port 4</text><text x="410" y="168" text-anchor="middle" font-size="11" fill="#bae6fd">I/O capteur</text>
  </g>
  <text x="260" y="230" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#64748b">Câble RJ25 : orientation unique — ne pas forcer.</text>
  <line x1="110" y1="150" x2="110" y2="200" stroke="#f97316" stroke-width="3"/><text x="95" y="218" font-size="11" fill="#c2410c">M1</text>
  <line x1="210" y1="150" x2="210" y2="200" stroke="#f97316" stroke-width="3"/><text x="195" y="218" font-size="11" fill="#c2410c">M2</text>
  <line x1="310" y1="150" x2="310" y2="210" stroke="#22c55e" stroke-width="3"/><text x="295" y="228" font-size="11" fill="#15803d">Capteur</text>
  <line x1="410" y1="150" x2="410" y2="210" stroke="#22c55e" stroke-width="3"/>
</svg>`,
	},
	{
		id: 'mbuild-bus',
		title: 'Bus mBuild (mBot2)',
		tags: ['mBuild', 'mBot2', 'chaînage'],
		description: 'Les modules mBuild se connectent en série sur le port dédié du CyberPi / mBot2 ; chaque module a une adresse logique dans mBlock.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" role="img" aria-label="Bus mBuild">
  <rect width="560" height="280" fill="#f8fafc"/>
  <text x="280" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#0f172a">Chaîne mBuild (mBot2)</text>
  <rect x="40" y="80" width="120" height="90" rx="10" fill="#6366f1" stroke="#4338ca" stroke-width="2"/>
  <text x="100" y="118" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="14" font-weight="600">mBot2</text>
  <text x="100" y="140" text-anchor="middle" fill="#e0e7ff" font-size="11">port mBuild</text>
  <rect x="200" y="95" width="90" height="60" rx="8" fill="#14b8a6" stroke="#0f766e" stroke-width="2"/>
  <text x="245" y="130" text-anchor="middle" fill="#fff" font-size="12">Module 1</text>
  <rect x="320" y="95" width="90" height="60" rx="8" fill="#14b8a6" stroke="#0f766e" stroke-width="2"/>
  <text x="365" y="130" text-anchor="middle" fill="#fff" font-size="12">Module 2</text>
  <rect x="440" y="95" width="90" height="60" rx="8" fill="#14b8a6" stroke="#0f766e" stroke-width="2"/>
  <text x="485" y="130" text-anchor="middle" fill="#fff" font-size="12">Module n</text>
  <line x1="160" y1="125" x2="200" y2="125" stroke="#334155" stroke-width="4"/>
  <line x1="290" y1="125" x2="320" y2="125" stroke="#334155" stroke-width="4"/>
  <line x1="410" y1="125" x2="440" y2="125" stroke="#334155" stroke-width="4"/>
  <text x="280" y="210" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#64748b">Un seul câble mBuild entre chaque module — ordre détecté au démarrage.</text>
</svg>`,
	},
	{
		id: 'ultrasonic-rj25',
		title: 'Capteur ultrason sur RJ25',
		tags: ['ultrason', 'RJ25', 'distance'],
		description: 'Branchement type capteur ultrason Makeblock sur port 3 ou 4 : alimentation 5 V et signal sur broches dédiées du connecteur.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" role="img" aria-label="Ultrason RJ25">
  <rect width="500" height="300" fill="#f8fafc"/>
  <text x="250" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#0f172a">Capteur ultrason → port RJ25</text>
  <rect x="50" y="70" width="100" height="140" rx="8" fill="#64748b"/>
  <text x="100" y="145" text-anchor="middle" fill="#fff" font-size="13">mCore</text>
  <text x="100" y="165" text-anchor="middle" fill="#cbd5e1" font-size="11">Port 3</text>
  <path d="M150 140 L220 140" stroke="#334155" stroke-width="4" fill="none"/>
  <rect x="220" y="90" width="140" height="100" rx="10" fill="#0ea5e9" stroke="#0369a1" stroke-width="2"/>
  <text x="290" y="125" text-anchor="middle" fill="#fff" font-weight="600" font-size="14">Ultrason</text>
  <text x="290" y="148" text-anchor="middle" fill="#e0f2fe" font-size="11">Trig / Echo</text>
  <path d="M360 115 L420 95 L420 175 L360 155 Z" fill="#bae6fd" stroke="#0284c7"/>
  <text x="400" y="140" text-anchor="middle" font-size="10" fill="#0c4a6e">onde</text>
  <text x="250" y="250" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Vérifier le port dans mBlock (capteur ultrason sur broche correspondante).</text>
</svg>`,
	},
	{
		id: 'line-follower',
		title: 'Suiveur de ligne (analogique)',
		tags: ['ligne', 'analogique', 'RJ25'],
		description: 'Capteur IR sous le châssis : sortie analogique lue dans mBlock ; régler le seuil selon le contraste du tapis.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 280" role="img" aria-label="Suiveur de ligne">
  <rect width="500" height="280" fill="#f8fafc"/>
  <text x="250" y="30" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700">Suiveur de ligne</text>
  <rect x="120" y="80" width="260" height="80" rx="12" fill="#475569"/>
  <text x="250" y="125" text-anchor="middle" fill="#fff" font-size="14">Châssis mBot (vue dessous)</text>
  <rect x="200" y="165" width="100" height="35" rx="6" fill="#22c55e" stroke="#15803d"/>
  <text x="250" y="188" text-anchor="middle" fill="#fff" font-size="11">Capteur ligne</text>
  <rect x="80" y="210" width="340" height="12" fill="#1e293b"/>
  <rect x="180" y="210" width="80" height="12" fill="#f8fafc"/>
  <text x="250" y="250" text-anchor="middle" font-size="11" fill="#64748b" font-family="system-ui,sans-serif">Bande claire sur fond sombre — calibrer le seuil analogique.</text>
</svg>`,
	},
	{
		id: 'servo-motor',
		title: 'Servomoteur sur port RJ25',
		tags: ['servo', 'PWM', 'actionneur'],
		description: 'Servo 9g sur port numérique : angle 0–180° via bloc « servo » ; attention à l’intensité (un servo à la fois sur petit port).',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" role="img" aria-label="Servomoteur">
  <rect width="480" height="300" fill="#f8fafc"/>
  <text x="240" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700">Servomoteur</text>
  <rect x="60" y="90" width="90" height="110" rx="8" fill="#64748b"/>
  <text x="105" y="150" text-anchor="middle" fill="#fff" font-size="12">Port 4</text>
  <line x1="150" y1="145" x2="200" y2="145" stroke="#334155" stroke-width="3"/>
  <rect x="200" y="100" width="70" height="90" rx="6" fill="#f97316" stroke="#c2410c"/>
  <circle cx="270" cy="145" r="28" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
  <line x1="270" y1="145" x2="295" y2="125" stroke="#9a3412" stroke-width="3"/>
  <text x="240" y="240" text-anchor="middle" font-size="11" fill="#64748b" font-family="system-ui,sans-serif">Signal PWM + 5 V + masse (connecteur Makeblock).</text>
</svg>`,
	},
	{
		id: 'led-matrix',
		title: 'Matrice LED (mBot2 / CyberPi)',
		tags: ['LED', 'affichage', 'mBot2'],
		description: 'Matrice intégrée au mBot2 ou module LED mBuild : blocs « afficher », « dessiner », coordonnées X/Y.',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" role="img" aria-label="Matrice LED">
  <rect width="400" height="320" fill="#f8fafc"/>
  <text x="200" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="700">Matrice LED 8×16 (schéma)</text>
  <rect x="80" y="60" width="240" height="120" rx="8" fill="#1e293b" stroke="#0f172a"/>
  <g fill="#4ade80">
    ${Array.from({ length: 8 }, (_, row) =>
			Array.from({ length: 16 }, (_, col) => {
				const on = (row + col) % 3 === 0;
				return `<rect x="${88 + col * 14}" y="${68 + row * 13}" width="10" height="10" rx="1" fill="${on ? '#4ade80' : '#334155'}"/>`;
			}).join(''),
		).join('')}
  </g>
  <text x="200" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#64748b">Programmer texte, icônes ou animations frame par frame.</text>
</svg>`,
	},
];
