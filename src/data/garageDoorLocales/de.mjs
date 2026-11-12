import {
	AQARA_P2,
	CC_BY,
	CC_BY_SA,
	CELL_CREDIT,
	CELL_PHOTO,
	HA_ACTIONS,
	HA_REMOTE,
	HA_SHELLY,
	HA_TEMPLATE,
	MOTOR_CREDIT,
	MOTOR_PHOTO,
	SHELLY_PRODUCT,
	SONOFF_SNZB,
	guidePath,
	marketSearch,
} from './links.mjs';

const p = (...parts) => ({ type: 'p', parts });
const h2 = (id, toc, text) => ({ type: 'h2', id, toc, text });
const h3 = (text) => ({ type: 'h3', text });
const link = (a, href, sponsored = false) => ({ a, href, sponsored });

const esp = guidePath('de', 'ouvrir-porte-garage-smartphone-esp32-esphome');
const dongle = guidePath('de', 'meilleur-dongle-zigbee-home-assistant');
const zha = guidePath('de', 'home-assistant-zigbee2mqtt-ou-zha');

const PULSE = `alias: Impuls Garagentor
mode: single
sequence:
  - action: switch.turn_on
    target:
      entity_id: switch.ersetzen_shelly
  - delay:
      milliseconds: 500
  - action: switch.turn_off
    target:
      entity_id: switch.ersetzen_shelly
`;

const COVER = `template:
  - cover:
      - name: Garagentor
        unique_id: garagentor_potenzialfrei
        device_class: garage
        availability: "{{ not is_state('binary_sensor.ersetzen_kontakt', 'unavailable') and not is_state('binary_sensor.ersetzen_kontakt', 'unknown') }}"
        state: "{{ 'closed' if is_state('binary_sensor.ersetzen_kontakt', 'off') else 'open' }}"
        open_cover:
          - condition: state
            entity_id: binary_sensor.ersetzen_kontakt
            state: "off"
          - action: script.impuls_garagentor
        close_cover:
          - condition: state
            entity_id: binary_sensor.ersetzen_kontakt
            state: "on"
          - action: script.impuls_garagentor
        stop_cover:
          - action: script.impuls_garagentor
`;

const CARD = `type: button
entity: cover.garagentor
name: Garagentor
show_state: true
tap_action:
  action: toggle
  confirmation:
    text: "Garagentor betätigen?"
`;

const ALERT = `alias: Garagentor offen geblieben
description: Nur Benachrichtigung. Kein Befehl an den Motor.
mode: single
triggers:
  - trigger: state
    entity_id: binary_sensor.ersetzen_kontakt
    to: "on"
    for: "00:15:00"
actions:
  - action: notify.notify
    data:
      message: "Das Garagentor ist seit 15 Minuten offen."
`;

export const garageDoorDe = {
	lang: 'de',
	inLanguage: 'de',
	title: 'Ein motorisiertes Garagentor vom Smartphone öffnen',
	description:
		'Potenzialfreier Kontakt am Wandtaster, Zustand auf oder zu, Hinweis wenn das Tor offen bleibt. Die 230 V des Motors werden nicht geschaltet.',
	howToDescription:
		'Tasterklemmen finden, einen potenzialfreien Kontakt anschließen, einen kurzen Impuls einstellen und den Zustand in Home Assistant anzeigen, ohne das Tor zeitgesteuert zu schließen.',
	articleDescription:
		'Das Modul ahmt den Wandtaster mit einem potenzialfreien Kontakt nach. Es schaltet nicht die Netzspannung des Antriebs. Ein eigener Sensor meldet, ob das Tor zu ist.',
	tocAria: 'Inhalt',
	stepWord: 'Schritt',
	whereWord: 'Wo:',
	checkWord: 'Kontrolle:',
	steps: [
		{
			title: 'Die Anleitung lesen, bevor die Haube aufgeht',
			why: 'Das Telefon wiederholt nur den Wandtaster. Hat der Antrieb diesen Eingang nicht, endet das Projekt hier.',
			where: 'Die gedruckte Anleitung oder das PDF des Herstellers, nicht das Gehäuse.',
			actions: [
				'Suchen Sie nach Taster, potenzialfreier Kontakt, Impuls, START oder „Schritt“. Der Plan zeigt dann zwei Klemmen für den Innentaster.',
				'Bei Hörmann, Sommer oder Novoferm heißt dieses Paar je nach Modell anders. Die Anleitung nennt es. Fehlt dort nur der Hinweis auf einen Funkhandsender, öffnen Sie die Haube nicht, um eine Klemme zu erfinden.',
				'Lichtschranke und Kraftbegrenzung bleiben, wo sie sind. Das Relais ersetzt sie nicht.',
			],
			observe: 'Sie können die beiden Tasterklemmen benennen und wissen, ob es sie gibt.',
			check: 'Bei freier Durchfahrt startet ein Druck auf den Wandtaster das Tor, ein zweiter Druck während der Fahrt stoppt es. Genau das muss der Impuls tun.',
		},
		{
			title: 'Den Stromkreis abschalten, erst dann die Haube öffnen',
			why: 'Der Wandtaster ist meist ein potenzialfreier Kontakt, im Gehäuse des Antriebs liegen aber Netzspannung von Motor und Lampe.',
			where: 'Der Verteiler, dann die Haube. Der feste Anschluss der Modulversorgung erfolgt spannungsfrei durch eine Elektrofachkraft, nach VDE 0100.',
			actions: [
				'Finden Sie den Leitungsschutzschalter des Antriebs. Ist er nicht beschriftet, raten Sie nicht: der falsche Stromkreis lässt 230 V im Gehäuse.',
				'Schalten Sie diesen Schalter aus. Lampe und Wandtaster dürfen nicht mehr reagieren.',
				'Fotografieren Sie die Klemmleiste, bevor ein Draht wandert. Suchen Sie das Paar aus der Anleitung. Lösen Sie weder die Motoradern noch den Schutzleiter.',
				'Können Sie die Spannungsfreiheit der Netzklemmen nicht sicher feststellen, bleiben Sie beim Ansehen und Fotografieren. L und N des Moduls schließt an, wer das gelernt hat.',
			],
			observe: 'Das Foto zeigt zwei Tasterklemmen, getrennt von der Motorversorgung.',
			check: 'Der Wandtaster liegt noch an diesen beiden Klemmen. Kein Draht der Lichtschranke und keiner des Motors wurde gezogen.',
		},
		{
			title: 'Die fünf Klemmen des Shelly verstehen, bevor sie angezogen werden',
			why: 'Der Shelly 1 Mini Gen3 hat einen potenzialfreien Kontakt, seine eigene Versorgung ist aber 110–240 V. Wer beides mischt, legt Netzspannung auf die Antriebsplatine.',
			where: 'Das Modul auf dem Tisch, Shelly-Seite offen. Quelle: shelly.com, Shelly 1 Mini Gen3.',
			actions: [
				'L und N versorgen das Modul mit 110–240 V Wechselspannung. Der Mini Gen3 läuft nicht an 12 V: nicht an einen 12- oder 24-V-Ausgang der Antriebsplatine hängen.',
				'I und O sind der potenzialfreie Schließer. Nur diese beiden Adern gehen zu den Tasterklemmen, parallel zum vorhandenen Taster. Zieht das Relais an, berühren sich I und O, wie ein Finger auf dem Taster. Sie geben nicht die Netzspannung des Shelly ab.',
				'SW ist ein Eingang für einen Schalter im Versorgungskreis des Shelly. Der Tor-Taster kommt dort nicht hin.',
				'Die Shelly-Seite nennt ein potenzialfreies Relais mit höchstens 8 A, eine Umgebung von −20 °C bis 40 °C und 30 bis 70 % Luftfeuchte. Eine Garagendecke, die im Sommer über 40 °C steigt, liegt außerhalb dieser Angabe: Modul tiefer setzen, in einem Gehäuse, nicht an die Dachhaut.',
			],
			observe: 'Sie zeigen ohne Zögern auf L, N, I, O und SW.',
			check: 'Kein Draht des Wandtasters ist für L, N oder SW vorgesehen.',
		},
		{
			title: 'I und O anschließen, das Modul getrennt versorgen',
			why: 'Der Wandtaster muss weiter funktionieren. Der Shelly kommt daneben, er ersetzt ihn nicht.',
			where: 'Spannungsfrei: die beiden Tasterklemmen, danach L und N des Shelly an seiner eigenen 230-V-Versorgung.',
			actions: [
				'Zwei Leiter gehen von I und von O zu den beiden Tasterklemmen. Die Richtung ist egal: das ist ein Kontakt, keine Versorgung. Die Drähte des Wandtasters bleiben parallel liegen.',
				'Weder Außenleiter noch Neutralleiter des Shelly auf diese Klemmen legen. Den Ausgang nicht so benutzen, als schaltete er den Motor.',
				'L und N des Shelly kommen an eine eigene 110–240-V-Versorgung: Stromkreis des Antriebs oder ein anderer bereits abgesicherter Kreis. Dieser feste Anschluss ist Elektroarbeit. Ist das nicht Ihr Beruf, lassen Sie ihn machen. Das Modul sitzt in einem Gehäuse, nicht als blanke Drähte unter der Haube.',
				'Mit dem von Shelly genannten Drehmoment 0,4 N·m anziehen, ohne Litzen zu quetschen. Haube schließen, bevor der Schalter wieder ein geht.',
			],
			observe: 'Die Haube ist zu, der Schalter ist wieder ein, nichts riecht warm.',
			check: 'Der Wandtaster startet und stoppt das Tor noch, Durchfahrt frei, bevor irgendein Versuch vom Telefon kommt. Ist der Wandtaster tot, liegt der Shelly am falschen Klemmenpaar: Strom aus und das Foto noch einmal lesen.',
		},
		{
			title: 'Einen kurzen Impuls einstellen und einmal probieren',
			why: 'Ohne Zeitschalter kann das Relais angezogen bleiben. Der Antrieb sieht dann einen Finger, der den Taster nicht loslässt.',
			where: 'Das 2,4-GHz-WLAN des Hauses, die Shelly-Oberfläche (Browser auf seiner IP oder App Shelly Smart Control), Durchfahrt frei.',
			actions: [
				'Der Shelly 1 Mini Gen3 spricht nur 2,4 GHz. Ein reines 5-GHz-Netz sieht ihn nicht. In der Garage muss die Modulseite ohne Wartezeit aufgehen. Sonst einen Zugangspunkt näher bringen, bevor das Gehäuse endgültig zu geht.',
				'Am Ausgang die automatische Abschaltung einschalten. Mit 0,5 s beginnen, wie ein kurzer Druck. Die genaue Beschriftung hängt von der Firmware ab: es ist der Ausgangszeitgeber, keine Szene.',
				'Die Adresse des Shelly im Router fest vergeben (feste DHCP-Lease), damit Home Assistant ihn nach einem Stromausfall wiederfindet.',
				'Ein Impuls, niemand unter dem Tor. Das Tor muss sich wie mit dem Wandtaster bewegen. Bewegt sich nichts, 1 s versuchen. Startet es und stoppt sofort, ist der Impuls zu lang: die Platine zählt zwei Drücke. Zurück Richtung 0,5 s.',
				'Die Shelly-Cloud kann aus bleiben, wenn der Befehl das Haus nicht verlassen soll. Die Home-Assistant-Integration spricht das Modul im lokalen Netz an.',
			],
			observe: 'Das Relais klickt kurz, das Tor fährt an, ein zweiter Versuch während der Fahrt stoppt es.',
			check: 'WLAN des Telefons aus: der Wandtaster funktioniert noch. Der Shelly hat den Original-Handsender nicht ersetzt.',
		},
		{
			title: 'Den Shelly in Home Assistant aufnehmen, ohne ihn vom Sensor steuern zu lassen',
			why: 'Home Assistant braucht einen Schalter, der den Impuls gibt. Er darf den Motor nicht jedes Mal starten, wenn sich der Torzustand ändert.',
			where: 'Home Assistant, am besten vom Rechner: Einstellungen, Geräte und Dienste.',
			actions: [
				'Die Shelly-Integration hinzufügen. Ein Gen3-Modul wird im lokalen Netz gefunden. Erscheint es nicht, die im vorigen Schritt reservierte IP eintragen. Dokumentation: home-assistant.io/integrations/shelly.',
				'Entwicklerwerkzeuge, Zustände öffnen und die Kennung des Schalters notieren, in der Form switch.etwas. Das ist noch kein Tor.',
				'Das Impulsskript unter Einstellungen, Automatisierungen und Szenen, Skripte anlegen. Es schaltet den Schalter ein, wartet 0,5 s und schaltet ihn aus. Der Modus single ignoriert einen zweiten Aufruf, solange der erste läuft. Das YAML weiter unten wurde auf keiner Installation dieser Website geladen: lehnt der Editor es ab, die drei Aktionen im visuellen Editor nachbauen.',
				'Die automatische Abschaltung im Shelly bleibt. Sie öffnet den Kontakt auch dann, wenn Home Assistant mitten im Skript abbricht.',
			],
			observe: 'Einmal das Skript starten, Durchfahrt frei: dieselbe Bewegung wie ein Druck auf den Wandtaster.',
			check: 'Im Protokoll von Home Assistant startet das Skript nicht von allein, wenn Sie das Tor von Hand oder mit dem Handsender öffnen.',
		},
		{
			title: 'Den Spalt messen, dann den Zustandssensor setzen',
			why: 'Ohne Sensor weiß das Telefon, dass es einen Impuls gesendet hat. Es weiß nicht, ob das Tor offen ist. Der SONOFF SNZB-04P passt nur, wenn der Spalt bei geschlossenem Tor höchstens 20 mm beträgt.',
			where: 'Tor geschlossen, ein Lineal, danach Home Assistant, wenn das Maß passt.',
			actions: [
				'Bei ganz geschlossenem Tor zwei Flächen suchen, die sich auf 20 mm oder weniger gegenüberstehen: oft Torblatt oben und Zarge, oder Laufwagen und Anschlag. Ist der Spalt größer, diesen Sensor für dieses Tor nicht kaufen. Ein Fensterkontakt, nur „ungefähr“ geklebt, bleibt dauerhaft offen gemeldet.',
				'Die Sonoff-Seite zum SNZB-04P beschränkt das Gerät auf Innenräume, −10 °C bis 60 °C, ohne Regen und ohne direkte Sonne. Eine geschlossene, frostfreie Garage kann in diesen Bereich fallen. Ein offenes Vordach nicht.',
				'Gibt es noch keinen Zigbee-Coordinator, ist der Stick in der Einkaufszeile dafür da. Läuft schon einer (ZHA oder Zigbee2MQTT), keinen zweiten einstecken. Sonoff nennt den ZBDongle-E unter den mit diesem Sensor kompatiblen Gateways.',
				'In der Zigbee-Integration, die Sie schon für die anderen Geräte nutzen, das Koppeln erlauben und die Sensortaste halten, bis das Blinken aus der Anleitung kommt (langer Druck von etwa 5 s). Die Marken an Gehäuse und Magnet aufeinander ausrichten.',
				'Der Aqara Door and Window Sensor P2 ist kein Zigbee-Ersatz: er spricht Thread und Matter. Aqara verlangt einen Thread-Border-Router, die Anleitung bleibt bei Innenräumen. Er koppelt nicht an einen Zigbee-Stick.',
			],
			observe: 'In den Entwicklerwerkzeugen wechselt der Sensorzustand, wenn Sie den Magneten wegziehen, und kommt zurück, wenn das Tor zu ist.',
			check: 'Merken Sie sich, ob „on“ offen bedeutet. Bei einem binary_sensor der Klasse Tür ist das der übliche Fall. Ist er bei Ihnen umgekehrt, drehen Sie die Bedingungen der Cover-Vorlage. Die Shelly-Verdrahtung bleibt.',
		},
		{
			title: 'Ein Tor anzeigen, mit Rückfrage',
			why: 'Ein Schalter in der Tasche öffnet die Garage ohne Absicht. Rückfrage und echter Zustand begrenzen das. Sie ersetzen die Lichtschranke nicht.',
			where: 'Das Home-Assistant-Dashboard, danach das Telefon im selben Netz.',
			actions: [
				'Die Cover-Vorlage erst anlegen, wenn die echten Kennungen kopiert sind. Das Beispiel unten setzt voraus, dass der Sensor bei geschlossenem Tor „off“ und bei offenem Tor „on“ ist. Es wurde auf keiner Installation dieser Website geladen.',
				'Öffnen sendet den Impuls nur, wenn der Sensor geschlossen meldet. Schließen sendet ihn nur im umgekehrten Fall. Ist der Sensor nicht verfügbar, darf das Tor in Home Assistant keinen Befehl annehmen.',
				'Bei einem Eingang mit nur einem Taster mischt „nicht geschlossen“ drei Fälle: Tor offen und still, Tor fährt auf, Tor fährt zu. Ein Impuls während der Fahrt stoppt die Bewegung. Ein zweiter Befehl ist nötig, um wieder anzufahren. Der Magnetsensor unterscheidet diese drei Fälle nicht.',
				'Auf dem Dashboard eine Schaltfläche mit Bestätigung. Der Text fragt, ob das Tor wirklich betätigt werden soll. Kartenaktionen: home-assistant.io/dashboards/actions.',
				'Von außerhalb des Hauses den Fernzugriff nutzen, dem Sie schon vertrauen: Nabu Casa, WireGuard oder Tailscale. Port 8123 am Router nicht weiterleiten. Die offizielle Seite ist home-assistant.io/docs/configuration/remote.',
			],
			observe: 'Das Telefon zeigt zu, wenn das Tor zu ist, und fragt nach, bevor es den Impuls sendet.',
			check: 'Ein Abbruch in der Rückfrage bewegt das Tor nicht. Ein Befehl bei entnommener Sensorbatterie darf nichts auslösen.',
		},
		{
			title: 'Melden, wenn das Tor offen bleibt, ohne es selbst zu schließen',
			why: 'Ein automatisches Schließen kann eine Person, ein Tier oder einen Gegenstand einklemmen. Lichtschranken senken dieses Risiko. Sie heben es nicht auf, besonders wenn sie verschmutzt oder dejustiert sind.',
			where: 'Einstellungen, Automatisierungen und Szenen. Auslöser ist der Sensor, nicht allein die Uhr.',
			actions: [
				'Eine Automatisierung anlegen: bleibt der Sensor 15 Minuten „offen“, eine Benachrichtigung ans Telefon senden. Keine Aktion auf Schalter, Skript oder Cover.',
				'Kein Schließen um 22 Uhr, beim Verlassen oder „wenn alle weg sind“. Solche Szenen gibt es für andere Geräte im Haus. Hier sind sie ausgeschlossen.',
				'15 Minuten sind ein Beispiel. Verlängern Sie die Zeit, wenn Sie oft bei offenem Tor arbeiten. Das YAML weiter unten wurde hier nicht ausgeführt.',
			],
			observe: 'Halten Sie den Magneten die gewählte Zeit weg: das Telefon erhält die Nachricht, das Tor bewegt sich nicht.',
			check: 'Der Verlauf des Shelly-Schalters zeigt zum Zeitpunkt der Benachrichtigung kein Einschalten.',
		},
	],
	faq: [
		{
			question: 'Kann der Shelly die 230 V des Motors schalten, um die Garage zu öffnen?',
			answer:
				'Nein. Motor, Endlagen und Hinderniserkennung bleiben beim Antrieb. Der Shelly 1 Mini Gen3 schließt nur kurz seinen potenzialfreien Kontakt, Klemmen I und O, parallel zum Taster. Seine eigene Versorgung, L und N, ist ein anderer Stromkreis, 110–240 V, und geht nicht auf die Tasterklemmen.',
		},
		{
			question: 'Braucht man einen Zigbee-Coordinator, um das Tor zu öffnen?',
			answer:
				'Nicht für den Befehl. Der Shelly 1 Mini Gen3 ist im WLAN. Zigbee dient nur dem Zustandssensor SNZB-04P. Läuft ZHA oder Zigbee2MQTT schon, wird der Stick aus der Einkaufszeile nicht gekauft. Ohne diesen Sensor kann das Telefon den Impuls noch senden, weiß aber nicht, ob das Tor offen ist.',
		},
		{
			question: 'Passt der Aqara P2 zu einem Zigbee-Stick?',
			answer:
				'Nein. Der Aqara Door and Window Sensor P2 spricht Thread und Matter. Aqara verlangt einen Thread-Border-Router, die Anleitung bleibt bei Innenräumen. Er koppelt nicht an den SONOFF ZBDongle-E. Der Sensor dieser Anleitung für den Zigbee-Fall ist der SONOFF SNZB-04P, und nur wenn der Spalt bei geschlossenem Tor höchstens 20 mm beträgt.',
		},
		{
			question: 'Was tun, wenn die Anleitung keine Tasterklemmen zeigt?',
			answer:
				'Das Relais nicht irgendwo auf der Platine landen lassen. Manche Antriebe hören nur auf ihren Handsender oder auf eine Schnittstelle des Herstellers. Diese Verdrahtung gilt dann nicht. Die Schritte setzen voraus, dass die Anleitung dieses Klemmenpaar beschreibt.',
		},
		{
			question: 'Kann das Tor abends von allein zugehen?',
			answer:
				'Diese Anleitung macht das nicht. Ein Impuls ohne Person am Tor kann die Fahrt im falschen Moment stoppen oder auf ein Hindernis schließen, das die Lichtschranke nicht sieht. Die sinnvolle Automatisierung ist eine Benachrichtigung, wenn der Sensor offen bleibt. Das Schließen bleibt eine bestätigte Geste, vor Ort oder mit Sicht auf das Tor.',
		},
		{
			question: 'Zwei Tore, oder ein Tor und ein Hoftor?',
			answer:
				'Jeder Antrieb hat sein eigenes Relais und, wenn der Spalt passt, seinen eigenen Sensor. Home Assistant bleibt eines, der Zigbee-Coordinator auch. Ein Dreh- oder Schiebetor ist ein anderer Antrieb: dieselbe Idee gilt nur, wenn seine Anleitung ebenfalls ein Tasterpaar zeigt. Lichtschranken an einem Tor zur Straße sind noch wichtiger.',
		},
		{
			question: 'Geht es ohne Internet?',
			answer:
				'Ja, vor Ort, wenn Router, 2,4-GHz-WLAN, Home Assistant und Shelly laufen und die Shelly-Integration lokal ist. Ein Internetausfall blockiert die Benachrichtigung außer Haus und den Fernzugriff. Den Wandtaster blockiert er nicht. Die Shelly-Cloud ist für diese lokale Integration nicht nötig.',
		},
	],
	blocks: [
		p(
			'Das Garagentor öffnet schon mit einem Wandtaster und einem Handsender. Das Telefon macht dieselbe Geste und sagt vor allem, ob das Tor oben geblieben ist. Das Modul ersetzt den Antrieb nicht: es verbindet zwei Klemmen, die schon für den Taster gedacht sind, für die Dauer eines Drucks. Motor, Lichtschranken und Hinderniserkennung bleiben die ursprünglichen.',
		),
		p(
			'Text geprüft am 29. Oktober 2026. Die Klemmen des Shelly 1 Mini Gen3 und die Grenzen des SONOFF SNZB-04P stammen von den Herstellerseiten unten. Die YAML-Beispiele für Home Assistant wurden auf keiner Installation dieser Website geladen. Die Verdrahtung Ihrer Antriebsplatine ist die aus ihrer Anleitung.',
		),
		h2('warum', 'Wozu', 'Wozu das Tor vom Telefon'),
		p(
			'Der Handsender bleibt im Auto oder in einer Tasche, die vor dem Tor schlecht zu erreichen ist. Das Telefon ist schon in der Hand. Damit öffnen Sie für jemanden, der ankommt, und prüfen eine Stunde später, dass das Tor nicht offen stehen geblieben ist. Home Assistant behält den Verlauf dieses Zustands. Die App des Moduls allein weiß vor allem, dass sie einen Impuls gesendet hat.',
		),
		p(
			'Das lohnt sich nur, wenn der Antrieb schon einen Eingang für einen Taster hat. Die Anleitung macht aus einem Handtor kein motorisiertes Tor und überbrückt keine Platine, die nur Leistungsklemmen hat.',
		),
		h2('ergebnis', 'Ergebnis', 'Was Sie am Ende haben'),
		p(
			'Ein Deckenantrieb, in seiner Aufgabe unverändert: er zieht das Tor, er hält an seinen Endlagen, seine Lichtschranken beobachten die Durchfahrt. Die rote Schnur unter der Schiene ist die Notentriegelung. Sie wird nicht an das Modul gelegt.',
		),
		{
			type: 'photo',
			src: MOTOR_PHOTO,
			width: 1600,
			height: 1200,
			alt: 'Garagentorantrieb an der Decke, mit Schiene, Lampe und roter Notentriegelung.',
			caption: [
				'Deckenantrieb. Das Modul kommt an die Tasterklemmen aus der Anleitung, nicht an die Motoradern. Bei dieser LiftMaster-Serie Security+ 2.0 ist dieses einfache Klemmenpaar nicht immer vorhanden. Foto: ',
				link('Tony Webster', MOTOR_CREDIT),
				', ',
				link('CC BY 2.0', CC_BY),
				'.',
			],
		},
		p(
			'Danach funktionieren Wandtaster und Handsender wie zuvor. Das Telefon fragt nach und sendet denselben Impuls. Sitzt der Sensor, zeigt der Bildschirm auf oder zu. Eine Benachrichtigung geht hinaus, wenn das Tor offen bleibt. Keine Automatisierung dieser Anleitung schließt es von allein.',
		),
		h2('vorher', 'Vorher', 'Bevor Sie anfangen'),
		{
			type: 'table',
			headers: ['Punkt', 'Was Sie wissen müssen'],
			rows: [
				['Ziel', 'Den Tasterimpuls vom Telefon senden und wissen, ob das Tor zu ist.'],
				[
					'Schwierigkeit',
					'Mittel. Sie lesen eine Antriebsanleitung und unterscheiden potenzialfreien Kontakt und 230 V. Der feste Anschluss der Modulversorgung ist Elektroarbeit.',
				],
				[
					'Zeit',
					'Rechnen Sie mit einem halben Tag, wenn die Anleitung klar ist und Home Assistant schon antwortet. Das ist keine auf einer Baustelle gestoppte Dauer.',
				],
				[
					'Budget',
					'Katalogrichtwert: etwa 8–62 € je nach Profil (nur Modul, oder mit Öffnungssensor und Zigbee-Dongle falls nötig). Der Konfigurator detailliert die Liste.',
				],
				[
					'Software',
					'Home Assistant und die Shelly-Integration für den Fall, den diese Seite beschreibt. Die App Shelly Smart Control, wenn Sie ohne Server bleiben. ESPHome für die Variante mit nackter Platine, in einer anderen Anleitung.',
				],
				[
					'Voraussetzungen',
					'Ein schon motorisiertes Tor, ein Wandtaster, der es bewegt, 2,4-GHz-WLAN in der Garage und die Anleitung. Für den Fall dieser Seite: Home Assistant bereits im lokalen Netz erreichbar.',
				],
				[
					'Risiken',
					'230 V unter der Haube. Quetschen, wenn ein Befehl ohne Blick auf die Durchfahrt kommt. Lichtschranken nie überbrücken. Port 8123 nicht ins Internet öffnen. Das Tor nicht per Zeitautomatik schließen.',
				],
			],
		},
		h2('wege', 'Drei Wege', 'Drei Wege zum selben Impuls'),
		p(
			'Die Geste ist dieselbe: ein Kontakt, der sich kurz am Tastereingang schließt. Was sich ändert, ist das, was Sie schon haben. Die Schritte weiter unten folgen dem ersten Fall: Home Assistant läuft schon, ein Tor, Tasterklemmen in der Anleitung.',
		),
		{
			type: 'sit',
			current: true,
			title: 'Fall A — Home Assistant läuft schon',
			parts: [
				'Sie kaufen keinen zweiten Server. Der Shelly 1 Mini Gen3 sendet den Impuls über WLAN. Der Sensor SONOFF SNZB-04P ist Zigbee: er sagt, ob das Tor offen ist. Der Stick ist nur für ein Haus ohne Coordinator. „Potenzialfrei“ heißt: die Anleitung zeigt die Tasterklemmen. Dieselbe Verdrahtung hat eine zusätzliche Regel: dieser Eingang nimmt keine Netzspannung an.',
			],
		},
		{
			type: 'sit',
			title: 'Fall B — Sie flashen eine ESP32-Platine',
			parts: [
				'Eine ESP32, ein Relaismodul, dessen potenzialfreier Kontakt mit 3,3 V angesteuert wird, und ein verdrahteter Reed ersetzen den Shelly. Die 230 V des Motors landen auch dort nicht. Die Schritte dieser Seite beschreiben den Shelly. Flash, GPIO und das mit ESPHome geprüfte YAML stehen in der ',
				link('ESPHome-Anleitung zum Garagentor', esp),
				'. Home Assistant ist in dieser Liste kein zusätzlicher Kauf: ohne ihn hat die Platine nicht die später beschriebene Anzeige.',
			],
		},
		{
			type: 'sit',
			title: 'Fall C — Die Shelly-App genügt',
			parts: [
				'Kein Home Assistant. Die App sendet den Impuls, wenn die automatische Abschaltung des Ausgangs gesetzt ist. Dieser Fall hat keinen Zustandssensor: die App beweist nicht, dass sich das Tor bewegt hat. Der Wandtaster bleibt die Kontrolle vor Ort.',
			],
		},
		h3('Was die Anzahl der Tore ändert'),
		{
			type: 'table',
			headers: ['Wahl', 'Wirkung'],
			rows: [
				['Ein Tor', 'Ein Relais. Ein Zustandssensor in Fall A, nachdem Sie den Spalt gemessen haben.'],
				['Mehrere Tore', 'Ein Relais je Antrieb und ein Sensor je Tor. Coordinator und Home Assistant bleiben einmalig.'],
				['Die Anleitung zeigt das Tasterpaar', 'Das ist der Fall der Schritte.'],
				['Der Eingang ist nur potenzialfrei', 'Dieselbe Verdrahtung. L und N des Moduls gehen nicht dorthin.'],
			],
		},
		{
			type: 'config',
			noscript: 'Ohne JavaScript aktualisieren die Schaltflächen die Materialliste nicht. Die drei Fälle oben gelten weiterhin.',
		},
		p(
			'Die Produktseite des Shelly 1 Mini Gen3 ist die offizielle. Katalogpreise stehen im Konfigurator; Amazon-Links sind Namenssuchen und garantieren weder das genaue Modell noch den Bestand. Messen Sie den Spalt, bevor Sie den SNZB-04P bestellen. Die Suche nach dem ZBDongle-E gilt nur für ein Haus ohne Zigbee-Coordinator.',
		),
		p(
			link('Shelly 1 Mini Gen3, offizielle Seite', SHELLY_PRODUCT),
			' · ',
			link('Auf Amazon.de suchen', marketSearch('de', 'Shelly 1 Mini Gen3'), true),
			'. Sensor: ',
			link('SONOFF SNZB-04P auf Amazon.de', marketSearch('de', 'SONOFF SNZB-04P'), true),
			'. Coordinator nur bei Bedarf: ',
			link('SONOFF ZBDongle-E auf Amazon.de', marketSearch('de', 'SONOFF ZBDongle-E'), true),
			'.',
		),
		h2('weg', 'Der Weg', 'Wie der Befehl zum Tor kommt'),
		p(
			'Merken Sie sich einen Satz: das Telefon fragt, Home Assistant ruft den Shelly, der Shelly ahmt den Taster nach. Lichtschranken und Antriebsplatine entscheiden weiter, ob das Tor fahren darf. Der Zigbee-Sensor meldet nur einen Zustand. Er liegt nicht im Tasterkreis.',
		),
		{
			type: 'schema',
			caption: 'Nur das Prinzip. Grün sind Befehl und Zustand. Orange ist die Versorgung des Moduls, die nicht zum Taster geht.',
			title: 'Garagentor über potenzialfreien Kontakt',
			desc: 'Das Telefon erreicht Home Assistant. Home Assistant steuert den Shelly. Die Klemmen I und O des Shelly liegen parallel zum Taster des Antriebs. L und N versorgen nur den Shelly. Der Zigbee-Sensor meldet auf oder zu an Home Assistant und steuert den Motor nicht.',
			phoneTitle: '1. Telefon',
			phoneLine: 'Bestätigt. Steuert den Motor nicht.',
			net: 'lokales Netz',
			haTitle: '2. Home Assistant',
			haLine: 'Schon da. Impulsskript.',
			wifi: 'WLAN 2,4 GHz',
			shellyTitle: '3. Shelly 1 Mini Gen3',
			shellyA: 'I und O: potenzialfrei, kurz',
			shellyB: 'L und N: eigene Versorgung',
			ioOnly: 'nur I und O',
			btnTitle: '4. Tasterklemmen',
			btnA: 'Parallel zum Wandtaster',
			btnB: 'Namen stehen in der Anleitung',
			motorTitle: '5. Vorhandener Antrieb',
			motorA: 'Motor, Endlagen, Lichtschranke',
			motorB: 'Handsender bleibt',
			powerTitle: 'Versorgung des Moduls, extra',
			powerLine: '6. 110–240 V nur an L und N',
			sensorTitle: '7. Zigbee-Sensor',
			sensorA: 'Zum Coordinator, dann zu HA',
			sensorB: 'Meldet auf oder zu',
			sensorC: 'Steuert den Motor nicht',
		},
		p(
			'Das WLAN trägt nur den Befehl zum Shelly und die Home-Assistant-Seite zurück zum Telefon. Die beiden Adern I und O tragen nicht die Netzspannung des Moduls: sie bilden den Tasterkontakt nach. Der Sensor, gestrichelt, kommt über den Zigbee-Coordinator zurück, der schon am Server hängt, oder über den, den Sie ergänzen, wenn keiner da ist. Die anderen Zigbee-Geräte im Haus bleiben an diesem Coordinator.',
		),
		p(
			'Einen Coordinator nur wählen, wenn Sie keinen haben: ',
			link('welcher Zigbee-Stick', dongle),
			', dann ',
			link('ZHA oder Zigbee2MQTT', zha),
			'. Der Shelly nutzt diesen Stick nicht.',
		),
		h2('material', 'Material', 'Material für den Fall dieser Seite'),
		p(
			'Der Shelly 1 Mini Gen3 ist ein kleines Modul. Die Klemmen folgen aufeinander: I und O sind der potenzialfreie Kontakt, L und N versorgen das Modul, SW bekommt den Tortaster nicht.',
		),
		p(
			'Der Zustandssensor ist ein Magnet und ein Gehäuse. Die beiden Marken müssen sich ansehen. Die Sonoff-Anleitung verlangt höchstens 20 mm bei geschlossenem Tor und den Einsatz im Innenraum. Müssen Sie die beiden Teile auseinanderziehen, um sie an dieses Tor zu kleben, ist es der falsche Sensor dafür.',
		),
		{
			type: 'table',
			headers: ['Bedarf', 'Wahl in dieser Anleitung', 'Grenze'],
			rows: [
				[
					'Den Impuls geben',
					'Shelly 1 Mini Gen3, potenzialfrei, WLAN 2,4 GHz',
					'Versorgung nur 110–240 V. Umgebung −20 °C bis 40 °C, Feuchte 30 bis 70 % laut Shelly-Seite.',
				],
				[
					'Wissen, ob es zu ist',
					'SONOFF SNZB-04P, Zigbee 3.0, Batterie CR2477',
					'Spalt 20 mm. Innen. Kein Kauf, wenn das Maß nicht passt.',
				],
				[
					'Den Sensor anbinden',
					'Der schon vorhandene Coordinator, sonst ein ZBDongle-E',
					'Ein zweiter Stick neben dem ersten hilft nicht. Er baut ein anderes Netz.',
				],
				['Ohne Server bleiben', 'Derselbe Shelly, in seiner App', 'Kein verlässlicher Zustand, kein Verlauf in Home Assistant.'],
				[
					'Alles in ESPHome',
					'ESP32, Relais 3,3 V mit potenzialfreiem Kontakt, verdrahteter Reed',
					'Die Einzelheiten stehen in der ESPHome-Anleitung, nicht in einer zweiten Liste hier.',
				],
			],
		},
		p(
			'Der Shelly Plus 1 hat ebenfalls einen potenzialfreien Kontakt, und seine Seite akzeptiert zusätzlich 12 V, was der Mini Gen3 ablehnt. Diese Schritte verdrahten den Mini Gen3, weil er das Modul der Liste ist. Die Klemmbilder der beiden Modelle nicht mischen. Eine 12-V-Versorgung „von der Antriebsplatine“ nicht ohne deren Anleitung versuchen.',
		),
		h2('schritte', 'Schritte', 'Anschließen und prüfen, Schritt für Schritt'),
		p(
			'Die neun Schritte beschreiben Fall A: Home Assistant ist da, ein Tor, Tasterklemmen. Halten Sie die Reihenfolge ein. Bleibt die erwartete Beobachtung aus, gehen Sie zur Fehlersuche, bevor Sie weiter machen. Die Fläche unter dem Tor bleibt bei jedem Versuch frei.',
		),
		{ type: 'steps' },
		h3('Lichtschranken bleiben Herr der Fahrt'),
		p(
			'Die Leuchte am Ende einer Lichtschranke bedeutet meist, dass der Strahl ankommt. Ist sie aus, oder fährt das Tor nicht zu, Optiken reinigen und neu ausrichten. Die Drähte nicht überbrücken, um „den Shelly-Test zu Ende zu bringen“.',
		),
		{
			type: 'photo',
			src: CELL_PHOTO,
			width: 1600,
			height: 1100,
			alt: 'Schwarze Lichtschranke am Pfosten eines Garagentors, rote Leuchte an.',
			caption: [
				'Lichtschranke unten am Pfosten. Sie bleibt so angeschlossen, wie sie war. Foto: ',
				link('Jud McCranie', CELL_CREDIT),
				', ',
				link('CC BY-SA 4.0', CC_BY_SA),
				'.',
			],
		},
		h3('Home-Assistant-Beispiele, zum Anpassen'),
		p(
			'Legen Sie das Skript zuerst im visuellen Editor an: Shelly-Schalter ein, eine halbe Sekunde warten, aus. Das YAML sagt dasselbe. Ersetzen Sie ',
			{ code: 'switch.ersetzen_shelly' },
			' durch die Kennung aus den Entwicklerwerkzeugen. Der Modus ',
			{ code: 'single' },
			' ignoriert einen zweiten Aufruf, bis der erste fertig ist.',
		),
		{ type: 'pre', code: PULSE },
		p(
			'Die Cover-Vorlage sendet Öffnen nur, wenn der Sensor „off“ ist, und Schließen nur, wenn er „on“ ist. Passen Sie die beiden Bedingungen an, wenn Ihr Sensor umgekehrt ist. ',
			{ code: 'script.impuls_garagentor' },
			' muss die echte Kennung des Skripts sein. Lehnt Ihre Version diesen Block ab, bauen Sie das Tor im Editor nach, statt die Datei zu erzwingen. Das wurde auf keiner Installation dieser Website ausgeführt.',
		),
		{ type: 'pre', code: COVER },
		p(
			'Dashboard-Karte mit Bestätigung. Die Entität ',
			{ code: 'cover' },
			' ist die oben angelegte, nicht der nackte Shelly-Schalter.',
		),
		{ type: 'pre', code: CARD },
		p(
			'Benachrichtigung, wenn der Sensor offen bleibt. Keine Aktion am Shelly. Ersetzen Sie ',
			{ code: 'notify.notify' },
			' durch den Benachrichtigungsdienst Ihres Telefons, sichtbar in den Entwicklerwerkzeugen.',
		),
		{ type: 'pre', code: ALERT },
		p(
			'Verwendete Dokumentation: ',
			link('Shelly-Integration', HA_SHELLY),
			', ',
			link('Vorlagen', HA_TEMPLATE),
			', ',
			link('Kartenaktionen und Bestätigung', HA_ACTIONS),
			'.',
		),
		h2('pruefen', 'Prüfen', 'Prüfen, ob das Ganze hält'),
		{
			type: 'ul',
			items: [
				'Der Wandtaster öffnet, stoppt und schließt wie vor der Arbeit.',
				'Der originale Handsender auch.',
				'Ein Hindernis im Strahl der Lichtschranke verhindert das Schließen weiter oder schickt das Tor zurück, wie die Anleitung es beschreibt.',
				'Ein Shelly-Impuls bei freier Durchfahrt wirkt wie ein kurzer Druck auf den Taster.',
				'Das Relais bleibt nicht angezogen: ein kurzes Klicken, kein Halten.',
				'Der Sensor, wenn er sitzt, geht nur auf zu, wenn das Tor ganz geschlossen ist.',
				'Ein Abbruch der Rückfrage auf dem Telefon bewegt das Tor nicht.',
				'Die Meldung „offen geblieben“ geht hinaus, ohne den Shelly-Schalter einzuschalten.',
				'Nach Aus- und Wiedereinschalten des Leitungsschutzschalters fährt das Tor nicht von allein an.',
				'Port 8123 ist nicht ins Internet weitergeleitet.',
			],
		},
		h2('stoerung', 'Störung', 'Wenn es nicht geht'),
		h3('Das Tor bewegt sich nicht, das Relais klickt'),
		p(
			'I und O liegen nicht an den Tasterklemmen, oder der Impuls ist für diese Platine zu kurz. Schalter aus, Foto und Anleitung noch einmal, und keine Lampen- oder Motorklemme „ausprobieren“. Funktioniert der Wandtaster noch, sitzt der Shelly nur neben dem falschen Schraubenpaar. Erst danach den Zeitgeber Richtung eine Sekunde anheben.',
		),
		h3('Das Tor fährt an und stoppt sofort'),
		p(
			'Der Impuls dauert zu lange. Die Platine liest ihn als zwei Drücke: Start, dann Stopp. Die automatische Abschaltung zurück Richtung 0,5 s. Das Home-Assistant-Skript darf den Shelly nicht gleich noch einmal rufen.',
		),
		h3('Der Wandtaster funktioniert nicht mehr'),
		p(
			'Die Tasterdrähte wurden versetzt, oder I und O sind dauerhaft kurzgeschlossen. Schalter aus. In Ruhe muss das Relais I und O offen lassen. Der Wandtaster kommt zurück auf seine beiden ursprünglichen Klemmen, der Shelly nur parallel.',
		),
		h3('Der Shelly erscheint nicht in der App'),
		p(
			'Nur 5-GHz-WLAN, Gastnetz, oder die Garage zu weit vom Zugangspunkt. Das Modul will 2,4 GHz, im selben Netz wie das Telefon, das es einrichtet. Die IP des Shelly aus der Garage öffnen, bevor die Haube wieder zu geht. Eine DHCP-Reservierung verhindert, dass er nach einem Router-Neustart eine andere Adresse bekommt.',
		),
		h3('Home Assistant sieht den Shelly, nicht das Tor'),
		p(
			'Das ist normal, solange die Cover-Vorlage fehlt. Die Shelly-Integration zeigt einen Schalter. Das Tor auf dem Bildschirm kommt aus der Vorlage, die den Sensor braucht. Ist der Sensor nicht verfügbar, muss die Vorlage Befehle ablehnen, statt blind einen Impuls zu senden.',
		),
		h3('Der Sensor bleibt „offen“, obwohl das Tor zu ist'),
		p(
			'Der Spalt ist über 20 mm, die Marken sehen sich nicht an, oder der Magnet sitzt an einem Teil des Torblatts, das in der Zu-Stellung wegwandert. Noch einmal messen. Das Gehäuse um ein paar Zentimeter zu versetzen reicht oft. Gibt es keinen Platz mit 20 mm oder weniger, nehmen Sie diesen Sensor von der Liste: er liefert keinen brauchbaren Zustand, und das ist kein Fehler des Shelly.',
		),
		h3('Das Tor fährt, wenn der Sensor wechselt'),
		p(
			'Eine Automatisierung steuert den Shelly oder das Tor bei einer Zustandsänderung. Einstellungen, Automatisierungen öffnen und einen Auslöser auf diesen Sensor suchen, dessen Aktion keine schlichte Benachrichtigung ist. Abschalten. Der Sensor informiert. Er steuert nicht.',
		),
		h3('Nach einem Stromausfall antwortet nichts'),
		p(
			'Wenn das Netz zurückkommt, muss das Relais offen bleiben. Automatische Abschaltung und das Skript, das den Schalter aus macht, gehen in diese Richtung. Fährt das Tor beim Wiedereinschalten an, ist der Kontakt gehalten: nicht in einer Schleife weiterprobieren, Schalter aus und prüfen, dass I und O nicht von einem vergessenen Draht gebrückt sind.',
		),
		h2('weiter', 'Weiter', 'Weiter, wenn die Grundlage steht'),
		p(
			'Ein zweites Telefon kommt als Home-Assistant-Benutzer dazu, ohne Administratorrecht, mit derselben Bestätigung auf der Karte. Das ist kein Teilen des Passworts des Hauptkontos. Der Zugriff von außerhalb läuft über ',
			link('den Fernzugriff von Home Assistant', HA_REMOTE),
			': Nabu Casa, WireGuard oder Tailscale, nicht über einen offenen Port.',
		),
		p(
			'Die ESP32-Variante nutzt dieselbe Idee von Impuls und Reed, mit Pins, die Sie im YAML wählen. Die schon auf der Website veröffentlichte Datei zwingt das Relais beim Start in Ruhe und öffnet nur, wenn der Reed das Tor als geschlossen meldet. Erklärt ist das in der ',
			link('ESPHome-Anleitung', esp),
			'. Die Pin-Nummern nicht auf den Shelly übertragen: der Shelly hat diese GPIO nicht.',
		),
		p(
			'Ein Dreh- oder Schiebetor ist ein eigener Antrieb, und nur dann, wenn seine Anleitung ebenfalls ein Tasterpaar hat. Lichtschranken an einem Tor zur Straße sind noch wichtiger: ein Fernbefehl ersetzt sie nicht.',
		),
		h2('fragen', 'Fragen', 'Häufige Fragen'),
		{ type: 'faq' },
		h2('quellen', 'Quellen', 'Zum Weiterlesen'),
		{
			type: 'sources',
			items: [
				{ href: SHELLY_PRODUCT, text: 'Seite Shelly 1 Mini Gen3', note: ': potenzialfreier Kontakt, Versorgung 110–240 V, Umgebungsgrenzen' },
				{ href: SONOFF_SNZB, text: 'Anleitung SONOFF SNZB-04P', note: ': Zigbee 3.0, Spalt 20 mm, Innenraum' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: ': Thread und Matter, kein Zigbee-Sensor' },
				{ href: HA_SHELLY, text: 'Home Assistant, Shelly-Integration' },
				{ href: HA_TEMPLATE, text: 'Home Assistant, Vorlagen' },
				{ href: HA_REMOTE, text: 'Fernzugriff Home Assistant' },
				{ href: esp, text: 'Dasselbe Tor mit ESPHome' },
				{ href: dongle, text: 'Zigbee-Stick' },
				{ href: zha, text: 'ZHA oder Zigbee2MQTT' },
			],
		},
	],
};
