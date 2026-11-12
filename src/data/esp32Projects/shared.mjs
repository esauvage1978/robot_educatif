import { DOMOTIQUE_SLUGS, domotiquePath } from '../../lib/domotiqueI18n.mjs';
import { TUTORIAL_BY_ID, tutorialPath } from './tutorials.mjs';

/**
 * Chemins (5 langues) d'un guide long déjà publié, à partir de son slug FR (clé de DOMOTIQUE_SLUGS).
 * @param {string} frSlug
 */
export function fullGuideFor(frSlug) {
	if (!DOMOTIQUE_SLUGS[frSlug]) throw new Error(`fullGuideFor: slug inconnu dans DOMOTIQUE_SLUGS : ${frSlug}`);
	return {
		fr: `/domotique/${frSlug}/`,
		en: domotiquePath('en', frSlug),
		de: domotiquePath('de', frSlug),
		it: domotiquePath('it', frSlug),
		es: domotiquePath('es', frSlug),
	};
}

/** Langues du site, dans l'ordre d'affichage. */
export const LANGS = ['fr', 'en', 'de', 'it', 'es'];

export const AUTHOR = 'Emmanuel Sauvage';

/** Date de rédaction de la série de projets (ISO) — à mettre à jour lors d'une revue. */
export const PROJECTS_DATE = '2026-10-31';

export const SITE_ORIGIN = 'https://robot-educatif.info';

/** Cartes ESP32 recommandées (images déjà présentes dans /public/images/products/). */
export const PRODUCTS = {
	'esp32-c6-devkitc': {
		name: 'ESP32-C6-DevKitC-1',
		image: '/images/products/esp32-c6-devkitc.webp',
	},
	'xiao-esp32c6': {
		name: 'Seeed Studio XIAO ESP32C6',
		image: '/images/products/xiao-esp32c6.webp',
	},
};

/** Textes ProductBox (carte ESP32) par langue. */
export const BOARD_BOX = {
	fr: {
		badge: 'Carte conseillée',
		price: 'à vérifier chez le vendeur',
		pros: ['Wi-Fi 6, Bluetooth 5, Zigbee et Thread (au niveau du matériel)', 'Pris en charge par ESPHome (cadre ESP-IDF)', 'USB-C pour flasher et alimenter'],
		cons: ['Wi-Fi 2,4 GHz uniquement', 'Choisir un câble USB qui transmet les données'],
	},
	en: {
		badge: 'Suggested board',
		price: 'check with the seller',
		pros: ['Wi-Fi 6, Bluetooth 5, Zigbee and Thread (at hardware level)', 'Supported by ESPHome (ESP-IDF framework)', 'USB-C for flashing and power'],
		cons: ['2.4 GHz Wi-Fi only', 'Use a USB cable that carries data'],
	},
	de: {
		badge: 'Empfohlene Platine',
		price: 'beim Händler prüfen',
		pros: ['Wi-Fi 6, Bluetooth 5, Zigbee und Thread (auf Hardware-Ebene)', 'Von ESPHome unterstützt (ESP-IDF-Framework)', 'USB-C zum Flashen und für die Stromversorgung'],
		cons: ['Nur 2,4-GHz-WLAN', 'USB-Kabel mit Datenleitungen verwenden'],
	},
	it: {
		badge: 'Scheda consigliata',
		price: 'da verificare presso il venditore',
		pros: ['Wi-Fi 6, Bluetooth 5, Zigbee e Thread (a livello hardware)', 'Supportata da ESPHome (framework ESP-IDF)', 'USB-C per flashare e alimentare'],
		cons: ['Solo Wi-Fi a 2,4 GHz', 'Usare un cavo USB che trasmette i dati'],
	},
	es: {
		badge: 'Placa recomendada',
		price: 'consultar con el vendedor',
		pros: ['Wi-Fi 6, Bluetooth 5, Zigbee y Thread (a nivel de hardware)', 'Compatible con ESPHome (framework ESP-IDF)', 'USB-C para flashear y alimentar'],
		cons: ['Solo Wi-Fi de 2,4 GHz', 'Usar un cable USB que transmita datos'],
	},
};

/**
 * Petit matériel commun, réutilisable par id dans chaque projet (smallMaterialIds).
 * Pas de prix : seulement rôle et précautions.
 */
export const SMALL_MATERIAL = {
	usb: {
		qty: 1,
		fr: { name: 'Câble USB-C « données »', note: 'Pour flasher et alimenter. Les câbles « charge seule » ne transmettent pas les données.' },
		en: { name: 'USB-C data cable', note: 'For flashing and power. Charge-only cables do not carry data.' },
		de: { name: 'USB-C-Datenkabel', note: 'Zum Flashen und zur Stromversorgung. Reine Ladekabel übertragen keine Daten.' },
		it: { name: 'Cavo USB-C dati', note: 'Per flashare e alimentare. I cavi solo ricarica non trasmettono dati.' },
		es: { name: 'Cable USB-C de datos', note: 'Para flashear y alimentar. Los cables solo de carga no transmiten datos.' },
	},
	psu: {
		qty: 1,
		fr: { name: 'Alimentation USB 5 V (chargeur certifié CE)', note: 'Au moins 1 A pour la carte seule ; plus si des périphériques sont alimentés par la carte.' },
		en: { name: 'USB 5 V power supply (CE/UKCA-marked charger)', note: 'At least 1 A for the board alone; more if peripherals draw power from it.' },
		de: { name: 'USB-Netzteil 5 V (CE-geprüftes Ladegerät)', note: 'Mindestens 1 A für die Platine allein; mehr, wenn Peripherie daran hängt.' },
		it: { name: 'Alimentatore USB 5 V (caricatore con marchio CE)', note: 'Almeno 1 A per la sola scheda; di più se alimenta periferiche.' },
		es: { name: 'Fuente de alimentación USB 5 V (cargador con marcado CE)', note: 'Al menos 1 A para la placa sola; más si alimenta periféricos.' },
	},
	dupont: {
		qty: 1,
		fr: { name: 'Fils Dupont (mâle-femelle et femelle-femelle)', note: 'Un lot mixte suffit pour tous les prototypes.' },
		en: { name: 'Dupont jumper wires (male-female and female-female)', note: 'One mixed pack covers every prototype.' },
		de: { name: 'Dupont-Kabel (Stecker-Buchse und Buchse-Buchse)', note: 'Ein gemischtes Set reicht für alle Prototypen.' },
		it: { name: 'Cavetti Dupont (maschio-femmina e femmina-femmina)', note: 'Un set misto basta per tutti i prototipi.' },
		es: { name: 'Cables Dupont (macho-hembra y hembra-hembra)', note: 'Un lote mixto basta para todos los prototipos.' },
	},
	breadboard: {
		qty: 1,
		fr: { name: 'Plaque d’essai (breadboard)', note: 'Pour tester sans souder ; remplacée ensuite par un montage soudé si besoin.' },
		en: { name: 'Breadboard', note: 'To test without soldering; replace with a soldered build if you need it permanent.' },
		de: { name: 'Steckplatine (Breadboard)', note: 'Zum Testen ohne Löten; für Dauerbetrieb später verlöten.' },
		it: { name: 'Breadboard', note: 'Per provare senza saldare; poi sostituibile con un montaggio saldato.' },
		es: { name: 'Placa de pruebas (breadboard)', note: 'Para probar sin soldar; después se puede pasar a un montaje soldado.' },
	},
	resistors: {
		qty: 1,
		fr: { name: 'Assortiment de résistances 1/4 W', note: 'Utile pour résistances de rappel (4,7 kΩ à 10 kΩ) et de protection (330 Ω).' },
		en: { name: 'Assorted 1/4 W resistors', note: 'Handy for pull-ups (4.7 kΩ to 10 kΩ) and protection (330 Ω).' },
		de: { name: 'Widerstandssortiment 1/4 W', note: 'Praktisch für Pull-ups (4,7 kΩ bis 10 kΩ) und Schutzwiderstände (330 Ω).' },
		it: { name: 'Assortimento di resistenze 1/4 W', note: 'Utile per pull-up (da 4,7 kΩ a 10 kΩ) e protezione (330 Ω).' },
		es: { name: 'Surtido de resistencias de 1/4 W', note: 'Útil para pull-up (4,7 kΩ a 10 kΩ) y protección (330 Ω).' },
	},
	heatshrink: {
		qty: 1,
		fr: { name: 'Gaine thermorétractable', note: 'Isole les soudures et les épissures ; aucun ruban adhésif en montage définitif.' },
		en: { name: 'Heat-shrink tubing', note: 'Insulates solder joints and splices; avoid tape in a permanent build.' },
		de: { name: 'Schrumpfschlauch', note: 'Isoliert Lötstellen und Verbindungen; im Dauerbetrieb kein Klebeband.' },
		it: { name: 'Guaina termorestringente', note: 'Isola saldature e giunzioni; niente nastro adesivo nel montaggio definitivo.' },
		es: { name: 'Tubo termorretráctil', note: 'Aísla soldaduras y empalmes; evita la cinta adhesiva en un montaje definitivo.' },
	},
	enclosure: {
		qty: 1,
		fr: { name: 'Boîtier plastique ventilé ou imprimé en 3D', note: 'Protège la carte ; prévoir un passage pour le câble et la ventilation si le capteur mesure l’air.' },
		en: { name: 'Vented plastic or 3D-printed enclosure', note: 'Protects the board; leave a cable gland and vents if the sensor measures air.' },
		de: { name: 'Belüftetes Kunststoff- oder 3D-gedrucktes Gehäuse', note: 'Schützt die Platine; Kabeldurchführung und Lüftung vorsehen, wenn der Sensor Luft misst.' },
		it: { name: 'Contenitore in plastica ventilato o stampato in 3D', note: 'Protegge la scheda; prevedere passacavo e fori di ventilazione se il sensore misura l’aria.' },
		es: { name: 'Caja de plástico ventilada o impresa en 3D', note: 'Protege la placa; prever pasacables y ventilación si el sensor mide el aire.' },
	},
	terminals: {
		qty: 1,
		fr: { name: 'Bornier à vis ou Wago basse tension', note: 'Pour raccorder proprement les fils de capteur ou de contact sec.' },
		en: { name: 'Low-voltage screw terminals or lever connectors', note: 'To connect sensor or dry-contact wires cleanly.' },
		de: { name: 'Schraubklemmen oder Hebelklemmen für Kleinspannung', note: 'Zum sauberen Anschluss von Sensor- oder Kontaktkabeln.' },
		it: { name: 'Morsetti a vite o a leva per bassa tensione', note: 'Per collegare in modo pulito i fili di sensori o contatti puliti.' },
		es: { name: 'Bornes de tornillo o conectores de palanca de baja tensión', note: 'Para conectar limpiamente los cables de sensores o contactos secos.' },
	},
	solder: {
		qty: 1,
		fr: { name: 'Fer à souder et étain (optionnel)', note: 'Seulement pour un montage définitif ; le prototype fonctionne sans.' },
		en: { name: 'Soldering iron and solder (optional)', note: 'Only for a permanent build; the prototype works without.' },
		de: { name: 'Lötkolben und Lötzinn (optional)', note: 'Nur für den Dauereinsatz; der Prototyp funktioniert ohne.' },
		it: { name: 'Saldatore e stagno (opzionale)', note: 'Solo per un montaggio definitivo; il prototipo funziona senza.' },
		es: { name: 'Soldador y estaño (opcional)', note: 'Solo para un montaje definitivo; el prototipo funciona sin él.' },
	},
};

/**
 * Transforme une liste d'ids (ou {id, qty}) en lignes de tableau pour la langue donnée.
 * @param {'fr'|'en'|'de'|'it'|'es'} lang
 * @param {(string | { id: string, qty?: number|string })[]} ids
 */
export function smallMaterialRows(lang, ids = []) {
	return ids
		.map((entry) => {
			const id = typeof entry === 'string' ? entry : entry.id;
			const def = SMALL_MATERIAL[id];
			if (!def) return null;
			const qty = typeof entry === 'string' ? def.qty : (entry.qty ?? def.qty);
			return { name: def[lang].name, qty, note: def[lang].note };
		})
		.filter(Boolean);
}

/**
 * En-tête ESPHome commun (carte ESP32-C6 DevKitC-1, framework ESP-IDF).
 * Les commentaires du YAML sont volontairement en anglais (convention de la documentation ESPHome).
 */
export function esphomeHeader(deviceName, friendlyName) {
	return `esphome:
  name: ${deviceName}
  friendly_name: ${friendlyName}

esp32:
  board: esp32-c6-devkitc-1   # XIAO ESP32C6: use board: seeed_xiao_esp32c6
  framework:
    type: esp-idf             # required for ESP32-C6

logger:                       # serial logs, also visible over Wi-Fi

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid       # 2.4 GHz network only
  password: !secret wifi_password
  ap:                           # fallback hotspot if the Wi-Fi is unreachable
    ssid: "${deviceName} fallback"
    password: !secret ap_password

captive_portal:
`;
}

/** Étapes communes (préparation ESPHome et premier flash) insérées automatiquement dans chaque projet. */
export function commonSteps(lang, deviceName) {
	const labels = {
		fr: {
			prepare: {
				title: 'Préparer ESPHome et créer l’appareil',
				actions: [
					`Dans Home Assistant, ouvrez le module complémentaire ESPHome Device Builder (procédure : tuto « ${TUTORIAL_BY_ID['install-esphome'].title.fr} »). ESPHome est le logiciel qui transforme un simple fichier de réglages en programme pour votre carte ESP32, sans que vous ayez à écrire de code.`,
					'Ouvrez « Secrets » (en haut à droite) : ce fichier garde vos mots de passe à part, pour que vous puissiez partager vos configurations sans les divulguer. Vérifiez que wifi_ssid (le nom de votre réseau Wi-Fi), wifi_password, api_encryption_key (la clé qui chiffre la liaison avec Home Assistant), ota_password (pour les mises à jour sans câble) et ap_password (pour le réseau Wi-Fi de secours de la carte) existent, et ajoutez les lignes manquantes. Une clé API valide est une longue chaîne de 32 octets encodée en base64, que vous pouvez générer avec « openssl rand -base64 32 ».',
					`Cliquez sur « New device », nommez-le « ${deviceName} », choisissez ESP32-C6, ignorez le flash pour l’instant, puis remplacez le contenu du fichier par le YAML de cette page (menu « Edit »). Le YAML est un fichier de configuration écrit en texte simple : il décrit, ligne par ligne, ce que la carte doit faire.`,
				],
				observe: 'Le fichier s’ouvre dans l’éditeur et les mots-clés sont colorés ; aucune ligne n’est soulignée en rouge.',
				check: 'Le bouton « Validate » (menu ⋮) répond « Configuration is valid ».',
			},
			flash: {
				title: 'Flasher la carte et l’ajouter à Home Assistant',
				actions: [
					'Branchez la carte à votre ordinateur avec le câble USB-C « données » : « flasher » veut dire écrire le programme dans la mémoire de la carte, et cette première écriture se fait obligatoirement par câble. La carte peut être déjà câblée ou posée sur la breadboard, mais tout périphérique externe qui a sa propre alimentation doit rester éteint.',
					'Dans ESPHome, cliquez sur « Install », puis « Plug into this computer » (navigateur Chrome ou Edge, accès en HTTPS) ou « Manual download » et envoyez le fichier avec ESPHome Web (web.esphome.io). Si le port n’apparaît pas, passez par le tuto de flash.',
					'Après le redémarrage, ouvrez Paramètres → Appareils et services : l’appareil ESPHome est découvert, cliquez sur « Configurer » et collez la clé de chiffrement API.',
				],
				observe: 'Les journaux (« Logs ») affichent la connexion Wi-Fi puis « Successfully connected to Home Assistant ».',
				check: 'L’appareil apparaît dans Appareils et services → ESPHome avec ses entités ; les mises à jour suivantes se font sans câble, par le Wi-Fi (c’est l’OTA, « Over The Air »).',
			},
		},
		en: {
			prepare: {
				title: 'Prepare ESPHome and create the device',
				actions: [
					`In Home Assistant, open the ESPHome Device Builder add-on (see the tutorial “${TUTORIAL_BY_ID['install-esphome'].title.en}”). ESPHome is the software that turns a simple settings file into the program for your ESP32 board, without you having to write any code.`,
					'Open “Secrets” (top right): this file keeps your passwords apart, so you can share your configurations without revealing them. Check that wifi_ssid (the name of your Wi-Fi network), wifi_password, api_encryption_key (the key that encrypts the link with Home Assistant), ota_password (for updates without a cable) and ap_password (for the board’s fallback Wi-Fi network) exist, and add any missing line. A valid API key is a long 32-byte string encoded in base64, which you can generate with “openssl rand -base64 32”.',
					`Click “New device”, name it “${deviceName}”, pick ESP32-C6, skip the flash for now, then replace the file content with the YAML from this page (“Edit”). YAML is a configuration file written in plain text: it describes, line by line, what the board must do.`,
				],
				observe: 'The file opens in the editor with syntax highlighting and no red underline.',
				check: 'The “Validate” action (⋮ menu) answers “Configuration is valid”.',
			},
			flash: {
				title: 'Flash the board and add it to Home Assistant',
				actions: [
					'Connect the board to your computer with the USB-C data cable: “flashing” means writing the program into the board’s memory, and this first write must be done over a cable. The board can already be wired or sitting on the breadboard, but any external peripheral with its own power supply must stay switched off.',
					'In ESPHome click “Install”, then “Plug into this computer” (Chrome or Edge over HTTPS) or “Manual download” and upload the file with ESPHome Web (web.esphome.io). If the port is missing, follow the flashing tutorial.',
					'After the reboot open Settings → Devices & services: the ESPHome device is discovered; click “Configure” and paste the API encryption key.',
				],
				observe: 'The “Logs” show the Wi-Fi connection and then “Successfully connected to Home Assistant”.',
				check: 'The device appears under Devices & services → ESPHome with its entities; later updates need no cable and go over Wi-Fi (this is OTA, “Over The Air”).',
			},
		},
		de: {
			prepare: {
				title: 'ESPHome vorbereiten und das Gerät anlegen',
				actions: [
					`Öffnen Sie in Home Assistant das Add-on ESPHome Device Builder (Anleitung: „${TUTORIAL_BY_ID['install-esphome'].title.de}“). ESPHome ist die Software, die aus einer einfachen Einstellungsdatei das Programm für Ihre ESP32-Platine macht, ohne dass Sie Code schreiben müssen.`,
					'Öffnen Sie „Secrets“ (oben rechts): Diese Datei bewahrt Ihre Passwörter getrennt auf, damit Sie Ihre Konfigurationen weitergeben können, ohne sie preiszugeben. Prüfen Sie, dass wifi_ssid (der Name Ihres WLANs), wifi_password, api_encryption_key (der Schlüssel, der die Verbindung zu Home Assistant verschlüsselt), ota_password (für Updates ohne Kabel) und ap_password (für das Notfall-WLAN der Platine) vorhanden sind, und ergänzen Sie fehlende Zeilen. Ein gültiger API-Schlüssel ist eine lange, Base64-kodierte Zeichenfolge mit 32 Byte, die Sie mit „openssl rand -base64 32“ erzeugen können.',
					`Klicken Sie auf „New device“, nennen Sie es „${deviceName}“, wählen Sie ESP32-C6, überspringen Sie das Flashen vorerst und ersetzen Sie den Dateiinhalt durch das YAML dieser Seite („Edit“). YAML ist eine in einfachem Text geschriebene Konfigurationsdatei: Sie beschreibt Zeile für Zeile, was die Platine tun soll.`,
				],
				observe: 'Die Datei öffnet sich im Editor mit Syntaxfarben und ohne rote Unterstreichung.',
				check: '„Validate“ (⋮-Menü) meldet „Configuration is valid“.',
			},
			flash: {
				title: 'Platine flashen und in Home Assistant einbinden',
				actions: [
					'Verbinden Sie die Platine mit dem USB-C-Datenkabel mit Ihrem Computer: „Flashen“ heißt, das Programm in den Speicher der Platine zu schreiben, und dieses erste Schreiben muss zwingend per Kabel geschehen. Die Platine darf schon verdrahtet sein oder auf dem Breadboard stecken, doch jede externe Peripherie mit eigener Stromversorgung muss ausgeschaltet bleiben.',
					'Klicken Sie in ESPHome auf „Install“ und dann auf „Plug into this computer“ (Chrome oder Edge, per HTTPS) oder „Manual download“ und laden Sie die Datei mit ESPHome Web (web.esphome.io) hoch. Fehlt der Port, hilft die Flash-Anleitung.',
					'Nach dem Neustart öffnen Sie Einstellungen → Geräte & Dienste: Das ESPHome-Gerät wird erkannt, klicken Sie auf „Konfigurieren“ und fügen Sie den API-Verschlüsselungsschlüssel ein.',
				],
				observe: 'Die „Logs“ zeigen die WLAN-Verbindung und danach „Successfully connected to Home Assistant“.',
				check: 'Das Gerät erscheint unter Geräte & Dienste → ESPHome samt Entitäten; spätere Updates brauchen kein Kabel mehr und laufen per WLAN (das ist OTA, „Over The Air“).',
			},
		},
		it: {
			prepare: {
				title: 'Preparare ESPHome e creare il dispositivo',
				actions: [
					`In Home Assistant aprite il componente aggiuntivo ESPHome Device Builder (procedura: tutorial «${TUTORIAL_BY_ID['install-esphome'].title.it}»). ESPHome è il software che trasforma un semplice file di impostazioni nel programma della vostra scheda ESP32, senza che dobbiate scrivere codice.`,
					'Aprite «Secrets» (in alto a destra): questo file tiene le vostre password separate, così potete condividere le configurazioni senza svelarle. Verificate che wifi_ssid (il nome della vostra rete Wi-Fi), wifi_password, api_encryption_key (la chiave che cifra il collegamento con Home Assistant), ota_password (per gli aggiornamenti senza cavo) e ap_password (per la rete Wi-Fi di emergenza della scheda) esistano, e aggiungete le righe mancanti. Una chiave API valida è una lunga stringa di 32 byte codificata in base64, che potete generare con «openssl rand -base64 32».',
					`Cliccate «New device», chiamatelo «${deviceName}», scegliete ESP32-C6, saltate il flash per ora e sostituite il contenuto del file con lo YAML di questa pagina («Edit»). Lo YAML è un file di configurazione scritto in testo semplice: descrive, riga per riga, ciò che la scheda deve fare.`,
				],
				observe: 'Il file si apre nell’editor con la sintassi colorata e senza sottolineature rosse.',
				check: '«Validate» (menu ⋮) risponde «Configuration is valid».',
			},
			flash: {
				title: 'Flashare la scheda e aggiungerla a Home Assistant',
				actions: [
					'Collegate la scheda al computer con il cavo USB-C dati: «flashare» significa scrivere il programma nella memoria della scheda, e questa prima scrittura va fatta per forza via cavo. La scheda può essere già cablata o sulla breadboard, ma ogni periferica esterna con la propria alimentazione deve restare spenta.',
					'In ESPHome cliccate «Install», poi «Plug into this computer» (Chrome o Edge, in HTTPS) oppure «Manual download» e caricate il file con ESPHome Web (web.esphome.io). Se la porta non compare, seguite il tutorial sul flash.',
					'Dopo il riavvio aprite Impostazioni → Dispositivi e servizi: il dispositivo ESPHome viene rilevato, cliccate «Configura» e incollate la chiave di cifratura API.',
				],
				observe: 'I «Logs» mostrano la connessione Wi-Fi e poi «Successfully connected to Home Assistant».',
				check: 'Il dispositivo compare in Dispositivi e servizi → ESPHome con le sue entità; i prossimi aggiornamenti non richiedono più il cavo e passano dal Wi-Fi (è l’OTA, «Over The Air»).',
			},
		},
		es: {
			prepare: {
				title: 'Preparar ESPHome y crear el dispositivo',
				actions: [
					`En Home Assistant abre el complemento ESPHome Device Builder (procedimiento: tutorial «${TUTORIAL_BY_ID['install-esphome'].title.es}»). ESPHome es el software que convierte un sencillo archivo de ajustes en el programa de tu placa ESP32, sin que tengas que escribir código.`,
					'Abre «Secrets» (arriba a la derecha): este archivo guarda tus contraseñas aparte, para que puedas compartir tus configuraciones sin revelarlas. Comprueba que existan wifi_ssid (el nombre de tu red Wi-Fi), wifi_password, api_encryption_key (la clave que cifra la conexión con Home Assistant), ota_password (para las actualizaciones sin cable) y ap_password (para la red Wi-Fi de emergencia de la placa), y añade las líneas que falten. Una clave API válida es una cadena larga de 32 bytes codificada en base64, que puedes generar con «openssl rand -base64 32».',
					`Pulsa «New device», llámalo «${deviceName}», elige ESP32-C6, omite el flasheo por ahora y sustituye el contenido del archivo por el YAML de esta página («Edit»). El YAML es un archivo de configuración escrito en texto sencillo: describe, línea por línea, lo que debe hacer la placa.`,
				],
				observe: 'El archivo se abre en el editor con la sintaxis coloreada y sin subrayados rojos.',
				check: '«Validate» (menú ⋮) responde «Configuration is valid».',
			},
			flash: {
				title: 'Flashear la placa y añadirla a Home Assistant',
				actions: [
					'Conecta la placa a tu ordenador con el cable USB-C de datos: «flashear» significa escribir el programa en la memoria de la placa, y esta primera escritura debe hacerse obligatoriamente por cable. La placa puede estar ya cableada o sobre la breadboard, pero cualquier periférico externo con alimentación propia debe permanecer apagado.',
					'En ESPHome pulsa «Install» y después «Plug into this computer» (Chrome o Edge, por HTTPS) o «Manual download» y sube el archivo con ESPHome Web (web.esphome.io). Si no aparece el puerto, sigue el tutorial de flasheo.',
					'Tras el reinicio abre Ajustes → Dispositivos y servicios: se descubre el dispositivo ESPHome, pulsa «Configurar» y pega la clave de cifrado de la API.',
				],
				observe: 'Los «Logs» muestran la conexión Wi-Fi y después «Successfully connected to Home Assistant».',
				check: 'El dispositivo aparece en Dispositivos y servicios → ESPHome con sus entidades; las siguientes actualizaciones ya no necesitan cable y van por Wi-Fi (es el OTA, «Over The Air»).',
			},
		},
	};
	return labels[lang];
}

/** Équivalences de lecture seule pour les gabarits (évite les imports circulaires dans les pages). */
export { tutorialPath };
