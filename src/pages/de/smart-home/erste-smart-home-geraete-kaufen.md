---
layout: ../../../layouts/DePost.astro
title: "Erste Smart-Home-Geräte kaufen"
description: "Was gehört in Ihren ersten Smart-Home-Warenkorb? Starterkits nach Ziel und Budget: Sensoren, Steckdosen, Lampen, Heizkörperventile, Zigbee-Stick und das oft vergessene Kleinmaterial."
updated: "30. Oktober 2026"
faqSchema:
  - question: "Zigbee oder WLAN für meinen ersten Kauf?"
    answer: "Mit WLAN testen Sie ohne Zentrale, mit einer App pro Marke. Zigbee wird interessanter, sobald Sie eine Zentrale haben und Batteriesensoren sowie Automatisierungen wollen, die bei Ihnen zu Hause bleiben. Die Einzelheiten stehen auf unserer Protokoll-Seite."
  - question: "Wie viele Zigbee-Repeater sollte ich einplanen?"
    answer: "Als Anhaltspunkt hilft oft eine netzbetriebene Zigbee-Steckdose oder -Lampe alle acht bis zehn Meter, bei dicken Wänden braucht es mehr. Statt einer fertigen Regel messen Sie die Qualität der Funkverbindung in Ihrer App (ZHA oder Zigbee2MQTT, die beiden Werkzeuge, die Zigbee in Home Assistant verwalten)."
  - question: "Kann ich Sonoff, Aqara und IKEA mischen?"
    answer: "Bei Zigbee mit Home Assistant oft ja, aber jedes Gerät hat seine kleinen Eigenheiten (Kopplungsweise, Batterie, besonderes Verhalten). Die Kompatibilitätstabelle und die Gerätelisten von ZHA und Zigbee2MQTT helfen beim Prüfen."
  - question: "Wo sehe ich Automatisierungen mit diesem Material?"
    answer: "In unserem Ratgeber zu den ersten Automatisierungen. Um den roten Faden wieder aufzunehmen, gehen Sie zurück zum kompletten Einsteiger-Leitfaden."
---

„Ein bisschen von allem“ zu kaufen ist der schnellste Weg, entmutigt zu werden: Am Ende haben Sie fünf Apps, Geräte, die nicht miteinander sprechen, und keine wirklich nützliche Regel. Die richtige Methode ist, von dem auszugehen, was Sie erreichen wollen, und dann nur wenige Geräte zu wählen.

Diese Seite bietet Starterkits nach Ziel (Komfort, Sparen, Sicherheit, Licht, Heizung) und nach Budget. Sie finden auch das Kleinmaterial, das alle vergessen: das USB-Verlängerungskabel, die Batterien, das richtige Netzteil. Am Ende wissen Sie, was in Ihren Warenkorb gehört und was Sie vorerst weglassen.

![Eine smarte Steckdose, eine drehbare Kamera, ein Bewegungsmelder, eine Lampe und ein weiteres kleines weißes Gehäuse, zusammen auf hellem Hintergrund](/images/debutant/smart-home-devices.webp)

*Die Geräte eines ersten Smart-Home-Sets: smarte Steckdose, Kamera, Bewegungsmelder und Lampe. Jedes deckt einen anderen Bedarf ab (messen, überwachen, erkennen, beleuchten), sodass Sie nicht mehrfach dasselbe kaufen. Foto: Jakub Zerdzicki, Pexels, freie Lizenz.*

## Weiterlesen

- [Welche Smart-Home-Zentrale für Einsteiger](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/)
- [Den Zigbee-Stick wählen](/de/smart-home/bester-zigbee-stick-home-assistant/)
- [Zigbee-Temperatursensoren](/de/smart-home/zigbee-temperatursensor/)
- [Smarte Steckdosen](/de/smart-home/smarte-steckdosen/)
- [Erste Smart-Home-Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/)

## Wie viel sollten Sie zum Start einplanen?

Ein Wort zum Vokabular, bevor wir auf die Budgets schauen. Zigbee ist ein sparsamer Funk, ideal für Batteriesensoren. Damit Ihre Zentrale ihn versteht, stecken Sie einen kleinen USB-Stick an, genannt Zigbee-Stick oder Dongle. Home Assistant wiederum ist die kostenlose Software, die alle Ihre Geräte in einer einzigen App vereint.

| Ihr Startbudget | Was Sie tun können |
|---|---|
| Sehr klein | Eine oder zwei WLAN-Steckdosen, die den Verbrauch messen, und vielleicht eine smarte Lampe. Eine zentrale Box ist nicht nötig. |
| Mittel | Eine bereits gewählte Zentrale (oder ein Raspberry Pi, ein kleiner Computer in der Größe einer Bankkarte), dazu ein Zigbee-Stick, zwei oder drei Sensoren und eine netzbetriebene Zigbee-Steckdose, die zugleich als Relais dient. |
| Größer | Dieselbe Basis, ergänzt um Heizkörperventile, einen Anwesenheitsmelder oder eine Kamera, je nach Ziel. |

Prüfen Sie vor dem Kauf immer, ob ein Gerät von Ihrer Zentrale erkannt wird, anhand der [Kompatibilitätstabelle](/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/) und der Seite [welche Zentrale wählen](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/).

## Das Kleinmaterial, das alle vergessen

Ein kurzes USB-Verlängerungskabel hält den Zigbee-Stick von Ihrem Internet-Router fern. Beide nutzen dieselbe Funkfrequenz und können sich stören; oft genügen schon einige Dutzend Zentimeter, um das Problem zu lösen.

Wenn Sie sich für einen Raspberry Pi 5 entscheiden, braucht er ein ausreichend starkes Netzteil: Unsere Anleitung zur [Home-Assistant-Installation](/de/smart-home/home-assistant-raspberry-pi-5-installation/) sagt, welches.

Planen Sie auch Batterien im richtigen Format ein. Sensoren nutzen oft Knopfzellen vom Typ CR2032 oder CR2450; prüfen Sie das Datenblatt.

Eine netzbetriebene Zigbee-Steckdose erfüllt einen Doppelzweck: Sie schaltet ein Gerät und leitet zugleich das Signal der anderen Sensoren weiter. Dann nennt man sie einen Zigbee-Router.

Und schließlich: Jedes Modul, das in die Wand eingebaut oder an eine Heizungssteuerung angeschlossen wird, gehört in die Hand einer Elektrofachkraft, wenn Sie selbst nicht qualifiziert sind.

## Sets nach Ziel

### Für Komfort und Temperatur

Ein Zigbee-Sensor für Temperatur und Luftfeuchtigkeit, etwa der SONOFF SNZB-02D (siehe unseren [Ratgeber zu Temperatursensoren](/de/smart-home/zigbee-temperatursensor/)), gibt einen ersten Überblick über das Haus. Sie können eine Steckdose für einen Heizlüfter ergänzen, aber nur, wenn Leistung und Sicherheit es erlauben. Eine Meldung wie „im Wohnzimmer sind es weniger als 16 Grad“ ist eine hervorragende erste Einstellung: siehe [erste Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/).

### Fürs Energiesparen

Steckdosen mit Leistungsmessung zeigen, was jedes Gerät verbraucht. Die WLAN-Steckdose Tapo P110 ist ein Beispiel, ebenso Zigbee-Steckdosen verschiedener Marken ([Ratgeber zu Steckdosen](/de/smart-home/smarte-steckdosen/)). Später können Sie den Stromzähler des Hauses mit einem passenden Modul verfolgen, je nachdem, was die Zähler in Ihrem Land anbieten.

### Für Sicherheit, in der leichten Version

Ein Kontaktsensor an der Haustür und ein Bewegungsmelder im Flur genügen für den Anfang. Ihre Zentrale kann eine Benachrichtigung auf das Telefon schicken, ohne professionelle Alarmzentrale.

### Für die Beleuchtung

Eine smarte Lampe oder eine Steckdose, an die Sie eine vorhandene Lampe anschließen, reicht. Ergänzen Sie einen Bewegungsmelder, damit das Licht angeht, wenn Sie vorbeigehen. Vermeiden Sie es, zehn verschiedene WLAN-Marken zu kaufen: Jede hat ihre eigene App.

### Für die Heizung, Raum für Raum

Wählen Sie Heizkörperthermostate (kleine Köpfe, die auf den Heizkörper geschraubt werden) in Zigbee oder Matter, einer gemeinsamen Sprache mehrerer Marken, und prüfen Sie genau, ob der Anschluss des Ventils zu Ihrem Heizkörper passt. Ein Temperatursensor an anderer Stelle im Raum hilft, wenn das Ventil ungünstig sitzt.

### Wenn Sie zur Miete wohnen

Steckdosen, Batteriesensoren, Taster und Heizkörperthermostate, die sich spurlos wieder abnehmen lassen: Die Seite [Smart Home zur Miete ohne Bohren](/de/smart-home/smart-home-mietwohnung-ohne-bohren/) beschreibt die Möglichkeiten.

## Sets nach Budget

Die folgenden Beschreibungen zeigen, wie ein erster Testmonat aussieht, keine Preise. Preise ändern sich von Shop zu Shop und von Land zu Land: Prüfen Sie sie vor dem Kauf beim Händler.

### Ohne Zentrale: zum Entdecken

Zwei WLAN-Steckdosen, die den Verbrauch messen, und eventuell eine smarte Lampe. Der Aufwand ist gering, hängt aber von Marken und Paketen ab: Lassen Sie ihn sich vom Händler bestätigen.

### Mit Home Assistant: die Zigbee-Basis

Sie brauchen ein Gehirn: die Zentrale [Home Assistant Green](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/) oder einen Raspberry Pi 5. Dazu kommen ein Zigbee-Stick ([Stick-Vergleich](/de/smart-home/bester-zigbee-stick-home-assistant/)), ein Temperatursensor, ein Kontaktsensor und eine Zigbee-Steckdose.

Der SONOFF ZBDongle-E ist ein USB-Koordinator, der mit ZHA oder Zigbee2MQTT arbeitet und eine externe Antenne hat. Der SONOFF SNZB-02D misst Temperatur und Luftfeuchtigkeit, hat ein kleines Display und läuft mit Batterie. Die TP-Link Tapo P110 ist eine WLAN-Steckdose, die den Verbrauch misst und anfangs ohne Zentrale genutzt werden kann. Suchlinks bei Amazon.de, um den aktuellen Preis und das Modell zu prüfen:

- [Home Assistant Green](https://www.amazon.de/s?k=Home+Assistant+Green&tag=roboteducat00-21)
- [SONOFF ZBDongle-E](https://www.amazon.de/s?k=SONOFF+ZBDongle-E&tag=roboteducat00-21)
- [SONOFF SNZB-02D](https://www.amazon.de/s?k=SONOFF+SNZB-02D&tag=roboteducat00-21)
- [TP-Link Tapo P110](https://www.amazon.de/s?k=TP-Link+Tapo+P110&tag=roboteducat00-21)

### Mit Homey

Nehmen Sie einen Homey Pro oder Pro mini (siehe unseren Artikel zum [Homey Pro mini](/de/smart-home/homey-pro-mini-auspacken-einrichtung/)), dazu dieselben Gerätetypen wie oben. Prüfen Sie bei jedem Gerät vor dem Kauf, ob es in der Homey-App erscheint.

## Was Sie lieber nicht zuerst kaufen

Fünf vernetzte Kameras vor einem einzigen nützlichen Sensor bringen Ihnen nichts. Vermeiden Sie auch Unterputzmodule, wenn Sie zur Miete wohnen oder sich mit Elektrik nicht wohlfühlen, sowie markeneigenes Steuerzubehör, wenn ein Zigbee-Stick und eine einzige Software oft genügen. Seien Sie ebenso vorsichtig mit 433-MHz-Geräten (alten Fernbedienungsfunks), bei denen Sie nicht wissen, ob Ihre Zentrale sie empfängt.

Wenn Sie ein bestimmtes Projekt im Blick haben (Garage, Rollläden...), wählen Sie die Geräte anhand der [Protokoll-Übersicht](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/). Und wenn Sie Lust haben, einige Sensoren selbst zu bauen, werfen Sie einen Blick auf die [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/).

## Häufige Fragen

**Zigbee oder WLAN für meinen ersten Kauf?**
Mit WLAN testen Sie ohne Zentrale, mit einer App pro Marke. Zigbee wird interessanter, sobald Sie eine Zentrale haben und Batteriesensoren sowie Automatisierungen wollen, die bei Ihnen zu Hause bleiben. Die Einzelheiten stehen auf unserer [Protokoll-Seite](/de/smart-home/smart-home-protokolle-zigbee-wifi-thread-matter/).

**Wie viele Zigbee-Repeater sollte ich einplanen?**
Als Anhaltspunkt hilft oft eine netzbetriebene Zigbee-Steckdose oder -Lampe alle acht bis zehn Meter, bei dicken Wänden braucht es mehr. Statt einer fertigen Regel messen Sie die Qualität der Funkverbindung in Ihrer App (ZHA oder Zigbee2MQTT, die beiden Werkzeuge, die Zigbee in Home Assistant verwalten).

**Kann ich Sonoff, Aqara und IKEA mischen?**
Bei Zigbee mit Home Assistant oft ja, aber jedes Gerät hat seine kleinen Eigenheiten (Kopplungsweise, Batterie, besonderes Verhalten). Die [Kompatibilitätstabelle](/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/) und die Gerätelisten von ZHA und Zigbee2MQTT helfen beim Prüfen.

**Wo sehe ich Automatisierungen mit diesem Material?**
In unseren [ersten Automatisierungen](/de/smart-home/erste-smart-home-automatisierungen/). Um den roten Faden wieder aufzunehmen, gehen Sie zurück zum [kompletten Einsteiger-Leitfaden](/de/smart-home/smart-home-einstieg-kompletter-leitfaden/).

---

*Hinweis zu Affiliate-Links: Die Amazon.de-Links tragen die Kennung der Website (roboteducat00-21). Wenn Sie darüber kaufen, kann eine Provision gezahlt werden, ohne Mehrkosten für Sie. Preise beim Händler prüfen. Autor: Emmanuel Sauvage.*
