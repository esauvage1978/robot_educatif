---
layout: ../../../layouts/DePost.astro
title: "Smart-Home-Anfängerfehler (FAQ)"
description: "Muss ich programmieren? Cloud oder lokal? Und wenn das Internet ausfällt? Die Fragen, die Einsteiger sich nicht zu stellen trauen, mit ehrlichen Antworten und Tipps gegen die Fallen."
updated: "30. Oktober 2026"
faqSchema:
  - question: "Muss ich programmieren können, um anzufangen?"
    answer: "Nein. Home Assistant bietet einen visuellen Editor, und Homey nutzt Karten, die Sie zusammensetzen, die sogenannten Flows. YAML, ESPHome und MQTT kommen später, wenn Sie Lust zum Basteln bekommen. Unsere zehn ersten Automatisierungen gelingen ohne Programmieren."
  - question: "Cloud oder lokal: was wählen?"
    answer: "Wenn Heizung und Licht auch bei ausgefallenem Internet weiterlaufen sollen, setzen Sie auf lokal: Home Assistant, Homey mit lokalen Geräten, Zigbee oder Shelly-Module, die in Ihrem Netz gesteuert werden. Die Cloud ist praktisch für die Sprachsteuerung, schafft aber eine Abhängigkeit. Viele Haushalte kombinieren beides: zuerst lokal, die Sprache als Ergänzung."
  - question: "Was kostet der Start wirklich?"
    answer: "Es gibt keine einzelne Zahl. Mit WLAN allein genügt ein bescheidener Betrag; mit Zentrale, Zigbee-Stick und Sensoren liegt die Summe deutlich höher. Optionale Abos, etwa für Fernzugriff oder Kamera-Speicher, kommen hinzu. Prüfen Sie die Preise am Kauftag beim Händler."
  - question: "Was passiert, wenn das Internet ausfällt?"
    answer: "Zigbee-Sensoren mit einer lokalen Zentrale (Home Assistant oder Homey) führen ihre Automatisierungen weiter aus. Steckdosen, die von den Servern des Herstellers abhängen, reagieren oft nicht mehr, und die Sprachsteuerung ist nicht verfügbar oder stark eingeschränkt. Der Fernzugriff ist unterbrochen, aber alles bleibt von zu Hause aus nutzbar."
  - question: "Ist Home Assistant zu schwer für mich?"
    answer: "Es gibt eine Lernkurve: Updates, Vokabular. Der kurze Einstieg und der komplette Leitfaden führen Sie Schritt für Schritt. Homey bleibt eine weniger technische Alternative."
---

Wenn man im Smart Home anfängt, stellt man sich viele Fragen, die technische Ratgeber nicht offen ansprechen: Muss ich programmieren? Was passiert, wenn das Internet ausfällt? Was kostet es wirklich? Kann ich es auch zur Miete?

Diese Seite beantwortet sie ohne Umschweife. Sie finden die Fehler, die fast alle Einsteiger machen, und wie Sie sie vermeiden, bevor Sie einen Euro ausgegeben haben. Diese Antworten ersetzen weder die Sicherheitshinweise der Geräte noch eine Elektrofachkraft, wenn es darum geht, an die Elektroinstallation zu gehen.

## Weiterlesen

- [Welche Smart-Home-Zentrale für Einsteiger](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/)
- [Smart Home zur Miete ohne Bohren](/de/smart-home/smart-home-mietwohnung-ohne-bohren/)
- [Smart-Home-Glossar](/de/smart-home/smart-home-glossar/)
- [Kompatibilitätstabelle der Geräte](/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/)

## Die sieben häufigsten Fehler

1. **Kaufen, bevor Sie ein Ziel haben.** Man kommt mit zehn Geräten nach Hause und ohne eine nützliche Regel. Schreiben Sie zuerst auf, was das Haus tun soll.
2. **Die Apps der Marken vervielfachen.** Jede hat ihre eigene App und ihr eigenes Konto, und am Ende sitzen Sie in jeder fest. Besser sind Geräte, die eine gemeinsame Sprache sprechen (Zigbee, ein sparsamer Funk, oder Matter, eine Sprache, die mehrere Marken verstehen) und von einer einzigen Zentrale zusammengeführt werden.
3. **Die Zigbee-Relais vergessen.** Ein einzelner Sensor am Ende des Gartens „hält“ nicht. Es braucht netzbetriebene Geräte, etwa eine Steckdose, die sein Signal weiterleiten.
4. **Home Assistant direkt ins Internet stellen.** Home Assistant ist die kostenlose Software, die Ihre Geräte vereint. Für den Zugriff von außen nutzen Sie ein virtuelles privates Netz (VPN) oder eine dokumentierte Lösung wie das Abo Nabu Casa. Wählen Sie starke Passwörter und aktivieren Sie die Zwei-Faktor-Anmeldung, wenn es sie gibt.
5. **Jede beliebige Steckdose abschalten.** Manche Geräte, etwa eine Netzwerkfestplatte, mögen es nicht, abrupt abgeschaltet zu werden.
6. **Vergessen, dass man Mieter ist.** Bohren oder ein Unterputzmodul einzubauen kann verboten sein: Lesen Sie unsere Seite zu [Smart Home zur Miete](/de/smart-home/smart-home-mietwohnung-ohne-bohren/).
7. **Glauben, Matter löse alles.** Matter ist eine vielversprechende gemeinsame Sprache, doch der Katalog muss weiterhin Gerät für Gerät geprüft werden; siehe unseren Artikel zu den [Protokollen 2027](/de/smart-home/matter-thread-zigbee-wifi-protokoll-wahl-2027/).

## Häufige Fragen

### Muss ich programmieren können, um anzufangen?

Nein. Home Assistant bietet einen visuellen Editor, und Homey (eine fertige Zentrale) nutzt Karten, die Sie zusammensetzen, die sogenannten Flows. YAML (ein Textformat, um Regeln zu schreiben), ESPHome (ein Werkzeug, um kleine Elektronikplatinen zu programmieren) und MQTT (ein Nachrichtensystem zwischen Geräten) kommen später, wenn Sie Lust zum Basteln bekommen. Unsere [zehn ersten Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/) gelingen ohne Programmieren.

### Cloud oder lokal: was wählen?

Die Cloud sind die Server des Herstellers im Internet. Lokal heißt, dass alles bei Ihnen zu Hause bleibt. Wenn Heizung und Licht auch bei ausgefallenem Internet weiterlaufen sollen, setzen Sie auf lokal: Home Assistant, Homey mit lokalen Geräten, Zigbee oder Shelly-Module, die in Ihrem Netz gesteuert werden. Die Cloud ist praktisch für die Sprachsteuerung und manche Herstellerfunktionen, schafft aber eine Abhängigkeit. Viele Haushalte kombinieren beides: zuerst lokal, die Sprache als Ergänzung.

### Woran erkenne ich, ob ein Gerät kompatibel ist?

Schauen Sie zuerst ins Datenblatt des Herstellers, das angibt, ob es mit Matter oder Zigbee funktioniert oder eine lokale Steuerung bietet. Prüfen Sie dann die [Kompatibilitätstabelle](/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/) und die Gerätelisten von ZHA, Zigbee2MQTT (zwei Werkzeuge, die Zigbee in Home Assistant verwalten) und der Homey-Apps. Seien Sie misstrauisch bei vagen Versprechen wie „kompatibel mit Alexa“, wenn Sie einen lokalen Betrieb mit Home Assistant anstreben.

### Ich wohne zur Miete: was kann ich tun?

Vieles ohne Bohren: Steckdosen, Batteriesensoren, Taster, abnehmbare Heizkörperthermostate zum Aufschrauben, manchmal Lampen zum Einschrauben. Vermeiden Sie Unterputzmodule ohne Zustimmung des Vermieters. Unsere Seite [Smart Home zur Miete ohne Bohren](/de/smart-home/smart-home-mietwohnung-ohne-bohren/) beschreibt das ausführlich.

### Was kostet der Start wirklich?

Es gibt keine einzelne Zahl. Mit WLAN allein genügt ein bescheidener Betrag; mit Zentrale, Zigbee-Stick und Sensoren liegt die Summe deutlich höher. Optionale Abos, etwa für Fernzugriff oder Kamera-Speicher, kommen hinzu. Den Vergleich finden Sie auf unseren Seiten zur [Wahl der Zentrale](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/) und zu den [ersten Geräten](/de/smart-home/erste-smart-home-geraete-kaufen/); prüfen Sie die Preise am Kauftag beim Händler.

### Sicherheit und Privatsphäre: welche Gewohnheiten sind richtig?

Nutzen Sie für jedes Konto und für die Zentrale ein anderes Passwort und halten Sie alles aktuell. Bevorzugen Sie bei Kameras solche, deren Bilder bei Ihnen bleiben, und wissen Sie, wohin die Bilder gehen, wenn das nicht der Fall ist. Stellen Sie die Verwaltungsoberfläche der Zentrale nie ungeschützt ins Internet. Wenn Sie es können, trennen Sie die vernetzten Geräte in einem eigenen Netz vom Rest des Hauses; sonst beginnen Sie einfach, ändern aber immer die Werkspasswörter.

### Was passiert, wenn das Internet ausfällt?

| Ihre Installation | Was in der Regel passiert |
|---|---|
| Zigbee-Sensoren mit lokaler Zentrale (Home Assistant oder Homey) | Die Automatisierungen laufen weiter |
| Steckdosen, die von den Servern des Herstellers abhängen | Sie reagieren oft nicht mehr |
| Sprachsteuerung (Google, Alexa) | Nicht verfügbar oder stark eingeschränkt |
| Fernzugriff von außen | Unterbrochen, aber alles bleibt von zu Hause aus nutzbar |

### Brauche ich sofort eine Zentrale?

Nein. Zwei WLAN-Steckdosen zum Ausprobieren für eine Woche können genügen. Sobald mehrere Geräte zusammenarbeiten sollen, gehen Sie zur [Wahl der Zentrale](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/).

### Ist Home Assistant zu schwer für mich?

Es gibt eine Lernkurve: Updates, Vokabular. Die [Kurzfassung des Pfads](/de/smart-home/einstieg/) und der [komplette Leitfaden](/de/smart-home/smart-home-einstieg-kompletter-leitfaden/) führen Sie Schritt für Schritt. Homey bleibt eine weniger technische Alternative.

### Kann ich alles allein mit Matter machen?

Noch nicht für jeden Bedarf: Der Gerätekatalog und der Reifegrad schwanken. Matter ist eine Wette auf Kompatibilität, nützlich, aber Zigbee bleibt 2026 sehr pragmatisch. Siehe die Seite zu den [Protokollen](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

### Wie ersetze ich eine erste Zentrale, die nicht passt?

Wenn Ihre Geräte Zigbee oder Matter sprechen, ist der Wechsel zu Home Assistant oder Homey realistisch. Die eigentliche Falle sind Geräte, die ganz von den Servern ihrer Marke abhängen. Deshalb lohnt es sich, von Anfang an gut zu wählen, mit dem [kompletten Leitfaden](/de/smart-home/smart-home-einstieg-kompletter-leitfaden/).

### Sind die „ungefähr so viel“-Preise aus dem Web verlässlich?

Nicht als Zusage. Nehmen Sie sie als Größenordnungen und öffnen Sie am Kauftag die Seite des Händlers.

### Sind die empfohlenen Produkte auf dieser Seite gesponsert?

Manche Links sind Affiliate-Links (Amazon, Shelly) und als solche gekennzeichnet. Wenn Sie darüber kaufen, kann die Website eine Provision erhalten, ohne Mehrkosten für Sie. Das ändert nichts am Anspruch: Kein Preis wird erfunden, und die Grenzen jedes Produkts werden genannt.

### Wo bekomme ich danach Hilfe?

Beginnen Sie mit der offiziellen Dokumentation von Home Assistant, Homey oder Jeedom, dann mit den Nutzer-Communities. Auf dieser Website können die Seite zu [Fehlercodes und Störungen](/de/smart-home/fehlercodes-stoerungen-zigbee-home-assistant-shelly/) und die [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/) weiterhelfen.

---

*Autor: Emmanuel Sauvage.*
