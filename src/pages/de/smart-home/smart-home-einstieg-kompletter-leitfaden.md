---
layout: ../../../layouts/DePost.astro
title: "Smart Home Einstieg: kompletter Leitfaden"
description: "Neu im Smart Home? Dieser Leitfaden zeigt der Reihe nach, was Sie entscheiden, kaufen und einrichten, damit Ihr Zuhause von allein reagiert, in einfachen Worten."
updated: "30. Oktober 2026"
faqSchema:
  - question: "Wo anfangen, wenn ich nur eine Stunde habe?"
    answer: "Lesen Sie Schritt 1 und 2, wählen Sie ein einziges Ziel und gehen Sie dann zum kurzen Einstieg weiter. Kaufen Sie vor allem nicht am ersten Tag fünf verschiedene WLAN-Marken: Sie hätten sonst fünf Apps zu verwalten."
  - question: "Muss ich Home Assistant nutzen?"
    answer: "Nein. Für zwei Steckdosen und eine Lampe kann die App des Herstellers oder Matter (eine gemeinsame Sprache, die viele Marken verstehen) genügen. Home Assistant oder Homey wird sinnvoll, sobald Ihre Geräte zusammenarbeiten und auch ohne Internet weiterlaufen sollen."
  - question: "Funktioniert alles weiter, wenn das Internet ausfällt?"
    answer: "Lokal gesteuerte Geräte laufen weiter: Zigbee-Sensoren, eine lokale Zentrale, Automatisierungen. Alles, was über die Server eines Herstellers (die Cloud) läuft, fällt aus, ebenso die Sprachsteuerung. Die Einzelheiten stehen auf der Seite zu den Anfängerfehlern."
  - question: "Wo finde ich die Bedeutung eines Fachbegriffs, den ich nicht verstehe?"
    answer: "Im Smart-Home-Glossar. Dort wird jeder Begriff in ein oder zwei Sätzen erklärt, mit einem Beispiel aus einem echten Zuhause."
---

Sie hätten gern ein Zuhause, das kleine Dinge für Sie erledigt: die Heizung herunterdrehen, wenn ein Fenster offen bleibt, nachts den Flur beleuchten, Sie warnen, wenn die Haustür aufgeht. Genau das leistet ein Smart Home: vernetzte Geräte, die von allein reagieren, nach Regeln, die Sie selbst festlegen.

Dieser Leitfaden führt Sie Schritt für Schritt. Am Ende wissen Sie, womit Sie anfangen, was Sie zuerst kaufen (und was Sie im Regal lassen) und wie Sie Ihre erste automatische Regel anlegen. Sie müssen die Fachwörter nicht kennen: Jeder technische Begriff wird erklärt, sobald er zum ersten Mal auftaucht.

![Eine Hand hält ein Smartphone, das die App eines smarten Türschlosses an einer weißen Tür zeigt](/images/debutant/living-room-tech.webp)

*Ein smartes Türschloss, per Telefon gesteuert: der erste Reflex im Smart Home, ein Gegenstand im Haus, den man aus der Ferne bedient oder programmiert. Foto: Sebastian Scholz (Nuki), Unsplash-Lizenz.*

## Weiterlesen

- [Welche Smart-Home-Zentrale für Einsteiger](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/)
- [Smart-Home-Protokolle einfach erklärt](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/)
- [Erste Smart-Home-Geräte kaufen](/de/smart-home/erste-smart-home-geraete-kaufen/)
- [Smart-Home-Glossar](/de/smart-home/smart-home-glossar/)
- [Ihre ersten Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/)
- [Anfängerfehler und ihre Antworten](/de/smart-home/smart-home-anfaengerfehler-faq/)
- [Die Kurzfassung: wo anfangen](/de/smart-home/einstieg/)

## Das Wichtigste in wenigen Zeilen

Wenn Sie Automatisierungen wollen, die ohne Abo und auch bei ausgefallenem Internet laufen, genügt eine einfache Basis. Sie besteht aus drei Teilen.

Der erste ist ein Gehirn. Das ist Home Assistant, eine kostenlose Software, die alle Ihre Geräte in einer einzigen App vereint. Sie läuft auf einem kleinen Gerät: entweder dem [Home Assistant Green](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/), einer Zentrale zum Einstecken und Loslegen, oder einem Raspberry Pi 5, einem Computer in der Größe einer Bankkarte.

Der zweite ist ein Funkstick, auch Dongle oder Koordinator genannt: ein kleiner USB-Stick, mit dem das Gehirn mit kabellosen Sensoren sprechen kann. Er arbeitet mit Zigbee, einer sparsamen Funksprache, die zu Sensoren passt, die monatelang mit einer einzigen Batterie laufen. Unser [Ratgeber zu Zigbee-Sticks](/de/smart-home/bester-zigbee-stick-home-assistant/) hilft Ihnen bei der Wahl.

Der dritte ist eine Handvoll Sensoren und smarter Steckdosen, ausgewählt für ein einziges Ziel: Komfort, Energiesparen oder Sicherheit.

Möchten Sie lieber nichts selbst installieren? Homey ist eine fertige Zentrale, die mehrere Funkstandards vereint und per App eingerichtet wird: siehe unser [Homey Pro mini: Auspacken und Einrichtung](/de/smart-home/homey-pro-mini-auspacken-einrichtung/). Und wenn Sie zur Miete wohnen, starten Sie mit dem [Weg ohne Bohren für Mieter](/de/smart-home/smart-home-mietwohnung-ohne-bohren/).

Einkaufssuchen, um den aktuellen Preis und den Steckertyp für Ihr Land zu prüfen:

- [Home Assistant Green bei Amazon.de](https://www.amazon.de/s?k=Home+Assistant+Green&tag=roboteducat00-21)
- [Homey Pro mini bei Amazon.de](https://www.amazon.de/s?k=Homey+Pro+mini&tag=roboteducat00-21)
- [SONOFF ZBDongle-E bei Amazon.de](https://www.amazon.de/s?k=SONOFF+ZBDongle-E&tag=roboteducat00-21)

## Schritt 1: wissen, was Sie wirklich wollen

Bevor Sie etwas kaufen, schreiben Sie einen einzigen Satz auf. Zum Beispiel: „Ich möchte, dass die Heizung ausgeht, wenn ein Fenster offen ist“ oder „Ich möchte, dass nachts das Flurlicht angeht“. Alles andere, Marke wie Hardware, ergibt sich aus diesem Satz.

Drei Fragen helfen Ihnen, klar zu sehen.

| Frage | Warum sie alles ändert |
|---|---|
| Mieten Sie oder besitzen Sie? | Mieter vermeiden Bohren und Eingriffe in die Elektroinstallation und greifen zu Steckdosen, Batteriesensoren und Heizkörperthermostaten zum Aufschrauben. Eigentümer können zusätzlich Module in der Wand verbauen. |
| Basteln Sie gern, oder wollen Sie eine fertige Lösung? | Basteln heißt: Software auf einem Raspberry Pi installieren oder einen Sensor mit einer ESP32-Platine bauen (eine kleine programmierbare Elektronikplatine mit WLAN). Fertig heißt: ein Home Assistant Green oder ein Homey, sofort einsatzbereit. |
| Wie hoch ist Ihr Startbudget? | Mit wenig Geld beginnen Sie mit WLAN-Geräten ohne zentrale Box. Mit etwas mehr nehmen Sie gleich eine Zentrale und einen Zigbee-Stick. |

Ein Wort, das Sie nicht kennen? Das [Glossar](/de/smart-home/smart-home-glossar/) erklärt sie alle, jeweils mit einem Beispiel. Die Fragen, die man sich kaum zu stellen traut („muss ich programmieren?“, „was, wenn das Internet ausfällt?“), beantwortet die Seite zu den [Anfängerfehlern](/de/smart-home/smart-home-anfaengerfehler-faq/).

## Schritt 2: den Dirigenten des Hauses wählen (die Zentrale)

![Nahaufnahme mehrerer grüner Raspberry-Pi-Platinen mit ihren USB- und Netzwerkanschlüssen](/images/debutant/raspberry-pi.webp)

*Mehrere Raspberry-Pi-Platinen aus der Nähe. Dieser kleine Computer kann zum Gehirn Ihres Hauses werden, sobald Home Assistant darauf installiert ist. Foto: Craig Dennis, Pexels, freie Lizenz.*

Die Zentrale, auch Hub oder Gateway genannt, ist der Dirigent. Sie empfängt die Meldungen Ihrer Sensoren („die Tür hat sich gerade geöffnet“) und löst die Aktionen aus, die Sie vorgesehen haben („Flurlicht an“).

Sie müssen nicht sofort eine kaufen. Sie können mit den Apps der einzelnen Hersteller beginnen und später alles zusammenführen, wenn Sie Lust dazu haben.

| Ihr Profil | Was am besten passt |
|---|---|
| Sie wollen Heizkosten sparen oder Ihren Verbrauch verfolgen | Home Assistant, mit Temperatursensoren und Steckdosen, die den Verbrauch messen |
| Sie wollen gewarnt werden, wenn etwas passiert | Home Assistant oder Homey, mit Tür- und Bewegungssensoren |
| Sie wollen nur ein paar Lampen steuern | WLAN-Lampen oder -Steckdosen ohne zentrale Box, später bei Bedarf Home Assistant |
| Sie wohnen zur Miete | Steckdosen, Batteriesensoren und Heizkörperthermostate zum Aufschrauben |
| Sie basteln gern | Home Assistant auf einem Raspberry Pi oder Mini-PC, mit [ESP32](/de/smart-home/esp32-smart-home-projektideen/)-Platinen |

Zu jedem Ziel finden Sie Budgetspannen und die Fallen, die Sie vermeiden sollten (etwa ein verstecktes Abo), auf der Seite [welche Smart-Home-Zentrale für Einsteiger](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/). Wenn Sie die Software selbst vergleichen möchten, lesen Sie unseren [Vergleich von Home Assistant, Jeedom und Homey](/de/smart-home/home-assistant-jeedom-homey-welche-zentrale/).

Der Home Assistant Green ist der einfachste Einstieg: Home Assistant ist vorinstalliert, er läuft lokal und braucht kein Pflicht-Abo. Prüfen Sie den aktuellen Preis vor dem Kauf beim Händler.

Sie möchten lieber eine fertige Zentrale, die Sie komplett per App einrichten? Der Homey Pro mini von Athom ist die einfachste Alternative. Er spricht ab Werk Zigbee, Thread und Matter (die Funksprachen erklärt unser [Glossar](/de/smart-home/smart-home-glossar/)) und läuft lokal, auch wenn das Internet ausfällt. Z-Wave, Bluetooth und Infrarot brauchen die separat erhältliche Homey Bridge; der teurere Homey Pro hat sie eingebaut. Den Homey Pro mini testen wir gerade selbst: siehe unser [Auspacken und Einrichten Schritt für Schritt](/de/smart-home/homey-pro-mini-auspacken-einrichtung/). [Aktuellen Preis des Homey Pro mini bei Amazon.de prüfen](https://www.amazon.de/s?k=Homey+Pro+mini&tag=roboteducat00-21).

## Schritt 3: verstehen, wie Ihre Geräte miteinander sprechen

Jedes vernetzte Gerät nutzt eine Funksprache, um mit dem Haus Nachrichten auszutauschen. Diese Sprache heißt Protokoll. Am häufigsten sind WLAN (das Ihres Internet-Routers) und Zigbee, das wir schon erwähnt haben. Dazu kommen Z-Wave, ein Verwandter von Zigbee mit einer anderen Funkfrequenz, Thread, ein sparsames Funknetz, und Matter, eine gemeinsame Sprache, die immer mehr Marken verstehen. Außerdem begegnen Ihnen Bluetooth und 433 MHz, ein älterer Funkstandard, der sich in manchen älteren Rollläden findet.

Diese Sprachen sind nicht austauschbar. Sie unterscheiden sich in Reichweite, Stromhunger (ein Batteriesensor kann nicht dauerhaft per WLAN funken) und in der zusätzlich nötigen Hardware.

Merken Sie sich vor allem eine Idee: Bei Zigbee dienen Geräte an einer Steckdose als Relais. Jedes gibt die Nachricht seines Nachbarn weiter, ähnlich wie eine Kette von Menschen, die Eimer mit Wasser weiterreichen. Man spricht von einem Mesh-Netz (Maschennetz). Je mehr netzbetriebene Geräte Sie hinzufügen, desto stabiler wird das Netz.

Drei Lesetipps zum Vertiefen:

- Der Ratgeber [Zigbee, WLAN, Thread und Matter einfach erklärt](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/), mit einer Tabelle zum Griffbereithalten.
- Der Artikel [Matter, Thread, Zigbee, WLAN: welche Wahl 2027](/de/smart-home/matter-thread-zigbee-wifi-protokoll-wahl-2027/), um zu sehen, wohin sich der Markt bewegt.
- Die [Kompatibilitätstabelle zwischen Marken und Zentralen](/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/), um zu prüfen, ob ein Gerät erkannt wird.

Unsere Startregel: Zigbee für Batteriesensoren, lokales WLAN für Steckdosen und Module am Netz (zum Beispiel die Marke Shelly, die sich ohne Umweg über das Internet steuern lässt) und Matter, wenn Sie nicht von einer einzigen Marke abhängen möchten.

## Schritt 4: die ersten Geräte kaufen, ein Set statt ein Lager

Ein gutes Startset besteht aus wenigen Teilen: einem Zigbee-Stick, wenn Sie sich für diesen Funk entscheiden, ein oder zwei Sensoren, ein oder zwei Steckdosen und eventuell einer Lampe oder einem Heizkörperventil. Die Seite [erste Smart-Home-Geräte kaufen](/de/smart-home/erste-smart-home-geraete-kaufen/) schlägt Sets nach Ziel und Budget vor, nur als Spannen, ohne erfundene Festpreise.

Der SONOFF ZBDongle-E ist ein USB-Zigbee-Koordinator, der mit ZHA oder Zigbee2MQTT arbeitet, den beiden Wegen, Zigbee mit Home Assistant zu verbinden, und er hat einen großen Katalog kompatibler Sensoren. Der Koordinator ist das Teil, das das Zigbee-Netz des Hauses führt. Die Preise unterscheiden sich von Shop zu Shop, prüfen Sie sie deshalb vor dem Kauf beim Händler.

## Schritt 5: Ihre ersten Automatisierungen anlegen

Eine Automatisierung ist eine Regel nach dem Muster „wenn das passiert, dann tu jenes“. Sie besteht aus einem Auslöser (was geschieht), optionalen Bedingungen (in welchem Fall) und Aktionen (was das Haus tut).

Beispiel: Erkennt der Melder im Flur eine Bewegung (Auslöser) und ist es dunkel (Bedingung), geht das Licht an (Aktion).

Die Seite [erste Smart-Home-Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/) liefert zehn konkrete Ideen, vom Licht, das sich von selbst einschaltet, bis zur Meldung, wenn die Waschmaschine fertig ist, für Home Assistant und für Homey.

## Und danach?

Steht die Basis, können Sie hier tiefer einsteigen:

- Home Assistant installieren: die [Anleitung für den Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/) oder der [Vergleich Green gegen Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/), wenn Sie schwanken.
- Homey wählen: [Pro mini, Auspacken und Einrichtung](/de/smart-home/homey-pro-mini-auspacken-einrichtung/).
- Eigene Sensoren bauen: die [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/).
- Zwischen zwei Wegen wählen, Zigbee mit Home Assistant zu verbinden: [Zigbee2MQTT oder ZHA](/de/smart-home/zigbee2mqtt-oder-zha-home-assistant/).
- Alle Einsteiger-Artikel durchstöbern: die [Übersicht aller Smart-Home-Ratgeber](/de/smart-home/).

## Häufige Fragen

**Wo anfangen, wenn ich nur eine Stunde habe?**
Lesen Sie Schritt 1 und 2, wählen Sie ein einziges Ziel und gehen Sie dann zum [kurzen Einstieg](/de/smart-home/einstieg/) weiter. Kaufen Sie vor allem nicht am ersten Tag fünf verschiedene WLAN-Marken: Sie hätten sonst fünf Apps zu verwalten.

**Muss ich Home Assistant nutzen?**
Nein. Für zwei Steckdosen und eine Lampe kann die App des Herstellers oder Matter (eine gemeinsame Sprache, die viele Marken verstehen) genügen. Home Assistant oder Homey wird sinnvoll, sobald Ihre Geräte zusammenarbeiten und auch ohne Internet weiterlaufen sollen.

**Funktioniert alles weiter, wenn das Internet ausfällt?**
Lokal gesteuerte Geräte laufen weiter: Zigbee-Sensoren, eine lokale Zentrale, Automatisierungen. Alles, was über die Server eines Herstellers (die Cloud) läuft, fällt dagegen aus, ebenso die Sprachsteuerung. Die Einzelheiten stehen auf der Seite zu den [Anfängerfehlern](/de/smart-home/smart-home-anfaengerfehler-faq/).

**Wo finde ich die Bedeutung eines Fachbegriffs, den ich nicht verstehe?**
Im [Smart-Home-Glossar](/de/smart-home/smart-home-glossar/). Dort wird jeder Begriff in ein oder zwei Sätzen erklärt, mit einem Beispiel aus einem echten Zuhause.

---

*Hinweis zu Affiliate-Links: Die Amazon.de-Links tragen die Kennung der Website (roboteducat00-21). Wenn Sie darüber kaufen, kann eine Provision gezahlt werden, ohne Mehrkosten für Sie. Aktuelle Preise und Verfügbarkeit beim Händler prüfen. Autor: Emmanuel Sauvage.*
