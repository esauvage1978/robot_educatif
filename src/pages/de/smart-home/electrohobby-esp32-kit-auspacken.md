---
layout: ../../../layouts/DePost.astro
title: "ElectroHobby.es-Kit ausgepackt: 2 ESP32-DevKit, ESP32-C3 Super Mini und Sensoren (Geschenk der Marke)"
description: "Unboxing des von ElectroHobby.es geschenkten Kits: 2 ESP32-DevKit WROOM-32 USB-C, ESP32-C3 Super Mini, Relais, Sensoren und Jumper-Kabel sowie die geplanten ESP32-Projekte."
updated: "20. November 2026"
---

<nav class="breadcrumb" aria-label="Brotkrumen"><a href="/de/smart-home/">Smart Home</a> · ElectroHobby ausgepackt</nav>

> **Kurzantwort** — Am 19. November 2026 haben wir ein Paket erhalten, das **von ElectroHobby.es geschenkt** wurde, einem Shop für Bildungselektronik in Murcia (Spanien). Dieser Text ist ein **Unboxing**: er beschreibt den tatsächlichen Inhalt und die Projekte, die wir auf robot-educatif.info dazu planen. **Es wurde noch nichts getestet**, deshalb gibt es hier keine Messwerte und kein Testurteil.

Amazon-Links sind **Partnerlinks** (`/go/`): sie können eine Provision ohne Aufpreis auslösen. Der Link zu ElectroHobby.es ist ein **direkter, nicht affiliierter** Link.

<figure>
<img src="/images/domotique/electrohobby-unboxing/15-colis-papier-bulle.webp" alt="Geöffnetes Paket von ElectroHobby.es, Teile noch in Luftpolsterfolie" width="1600" height="1200" />
<figcaption>Das Paket beim Öffnen, noch in der Luftpolsterfolie.</figcaption>
</figure>

## Inhalt des Pakets

<figure>
<img src="/images/domotique/electrohobby-unboxing/14-colis-ouvert-cartes-electrohobby.webp" alt="Inhalt des ElectroHobby.es-Pakets mit ESP32-Modulen, Sensoren und zwei Merkkarten" width="1600" height="2133" />
<figcaption>Überblick über das Kit, einschließlich der zwei ElectroHobby-Merkkarten (Widerstandsfarbcode und Ohmsches Gesetz).</figcaption>
</figure>

Inventar vom 19. November 2026:

- **2 ESP32-DevKit** WROOM-32, USB-C, 30 Pins ;
- ein **ESP32-C3 Super Mini**, mit Stiftleisten ;
- eine **Erweiterungsplatine** für den ESP32-C3 Super Mini, mit Batterieanschluss ;
- ein **2-Relais-Modul 5 V** (JQC3F-05VDC-C, mit Optokopplern) ;
- ein Ultraschallsensor **HC-SR04** ;
- ein Lichtsensor **TEMT6000** ;
- ein **Wasserstands**-Sensor ;
- ein **I2S-Mikrofon vom Typ INMP441** (Pins SD, VDD, GND, SCK, WS und LR) ;
- ein Modul **AHT20 + BMP280** (Temperatur, Feuchte und Luftdruck, I2C) ;
- etwa zehn **Reed-Kontakte** ;
- drei Bänder **Dupont-Jumperkabel** (Male-Male, Male-Female, Female-Female) ;
- zwei **ElectroHobby-Merkkarten** (Widerstandsfarbcode, Ohmsches Gesetz).

## Die 2 ESP32-DevKit WROOM-32 USB-C

Im Paket liegen **2 voneinander unabhängige ESP32-DevKit**-Platinen im klassischen 30-Pin-Format mit **USB-C**. Genau diesen Kartentyp empfehlen wir für den Einstieg in ESPHome, siehe [welche ESP32-Platine wählen](/de/smart-home/welche-esp32-platine-smart-home/).

<figure>
<img src="/images/domotique/electrohobby-unboxing/05-esp32-devkit-wroom-32-usbc-1.webp" alt="Erste ESP32-DevKit WROOM-32 USB-C mit 30 Pins, Vorderseite" width="1600" height="1200" />
<figcaption>Die erste der 2 erhaltenen ESP32-DevKit-Platinen.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/06-esp32-devkit-wroom-32-usbc-2.webp" alt="Zweite ESP32-DevKit WROOM-32 USB-C, eine eigene Platine" width="1600" height="1200" />
<figcaption>Die zweite ESP32-DevKit — eine zweite Platine, nicht nur ein anderer Blickwinkel.</figcaption>
</figure>

Mit zwei gleichen Karten lassen sich zwei Projekte parallel aufbauen, etwa ein Sensor und eine Relaissteuerung, ohne die erste Schaltung wieder zu zerlegen.

## ESP32-C3 Super Mini und Erweiterungsplatine

Der **ESP32-C3 Super Mini** ist eine sehr kleine RISC-V-Platine mit WLAN und Bluetooth Low Energy. Er eignet sich, wenn im Gehäuse wenig Platz ist. Die Stiftleisten lagen separat bei und können bei Bedarf gelötet werden.

<figure>
<img src="/images/domotique/electrohobby-unboxing/01-esp32-c3-super-mini-recto.webp" alt="ESP32-C3 Super Mini von vorn, Taste und USB-C sichtbar" width="1600" height="1200" />
<figcaption>Vorderseite des ESP32-C3 Super Mini.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/02-esp32-c3-super-mini-verso.webp" alt="ESP32-C3 Super Mini von hinten, Metallabschirmung und Lötpads" width="1600" height="1200" />
<figcaption>Rückseite derselben Platine.</figcaption>
</figure>

Zum Super Mini gehört eine **Erweiterungsplatine** mit **Batterieanschluss**. Sie soll netzunabhängige Sensorknoten erleichtern. Das prüfen wir in späteren Aufbauten, nicht in diesem Unboxing.

<figure>
<img src="/images/domotique/electrohobby-unboxing/12-carte-extension-esp32-c3.webp" alt="Erweiterungsplatine für den ESP32-C3 Super Mini mit Batterieanschluss" width="1600" height="2133" />
<figcaption>Erweiterungsplatine für den ESP32-C3 Super Mini, Batterieanschluss sichtbar.</figcaption>
</figure>

## 2-Relais-Modul 5 V

Das Modul trägt zwei Relais **JQC3F-05VDC-C** und Optokoppler. Solche Karten steuern einen potentialfreien Kontakt — denselben Bedarf beschreibt unser Leitfaden zur [Garagentorsteuerung per Smartphone mit einem ESP32](/de/smart-home/garagentor-smartphone-esp32-esphome/). Hier wurde noch nichts verdrahtet.

<figure>
<img src="/images/domotique/electrohobby-unboxing/07-module-2-relais-5v.webp" alt="2-Kanal-Relaismodul 5 V JQC3F-05VDC-C mit Optokopplern" width="1600" height="1200" />
<figcaption>5-V-2-Relais-Modul, Klemmleisten und Optokoppler sichtbar.</figcaption>
</figure>

## Sensoren und Mikrofon

Die Sensoren legen mehrere künftige ESP32-Tutorials nahe. Solange sie nicht erprobt sind, gibt es keine Aussage zur Genauigkeit.

<figure>
<img src="/images/domotique/electrohobby-unboxing/10-hc-sr04.webp" alt="Ultraschallsensor HC-SR04, vier Pins VCC Trig Echo GND" width="1600" height="2133" />
<figcaption>Ultraschallsensor HC-SR04, für Abstand oder Füllstand ohne Flüssigkeitskontakt.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/03-temt6000.webp" alt="Umgebungslichtsensor TEMT6000 auf kleiner Platine" width="1600" height="1200" />
<figcaption>Lichtsensor TEMT6000.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/04-capteur-niveau-eau.webp" alt="Wasserstandssensor mit offenen Leiterbahnen und dreipoliger Klemme" width="1600" height="1200" />
<figcaption>Wasserstandssensor, gedacht für einen Tank oder einen Enthärter.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/09-micro-i2s-inmp441.webp" alt="I2S-Mikrofon vom Typ INMP441 mit Pins SD, VDD, GND, SCK, WS und LR" width="1600" height="1200" />
<figcaption>I2S-Mikrofon vom Typ INMP441, erkannt am Aufdruck SD / VDD / GND / SCK / WS / LR.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/08-aht20-bmp280.webp" alt="Kombimodul AHT20 und BMP280, I2C-Anschluss" width="1600" height="1200" />
<figcaption>Modul AHT20 + BMP280: Temperatur, Feuchte und Luftdruck über I2C.</figcaption>
</figure>

Das Wettermodul AHT20 + BMP280 passt zu unserem bestehenden [ESP32-ESPHome-Temperatursensor](/de/smart-home/esp32-esphome-temperatursensor/). Wasser- und HC-SR04-Sensor können einen Füllstand überwachen. Das I2S-Mikrofon könnte später eine lokale Sprachsteuerung ermöglichen.

## Reed-Kontakte und Dupont-Kabel

<figure>
<img src="/images/domotique/electrohobby-unboxing/11-interrupteurs-reed-ils.webp" alt="Etwa zehn Reed-Kontakte auf dem Schreibtisch" width="1600" height="2133" />
<figcaption>Reed-Kontakte (ILS), um mit einem Magneten das Öffnen einer Tür oder eines Deckels zu erkennen.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/13-cables-dupont.webp" alt="Drei Bänder Dupont-Jumperkabel: Male-Male, Male-Female, Female-Female" width="1600" height="2133" />
<figcaption>Die drei beiliegenden Dupont-Bänder: Male-Male, Male-Female und Female-Female.</figcaption>
</figure>

Zusammen mit einem Magneten sind Reed-Kontakte ein einfacher Weg, eine Tür, ein Fenster oder einen Deckel zu überwachen. Die Jumperkabel ersparen das Zuschneiden von Litzen vor den ersten Steckbrett-Versuchen.

## Geplante Projekte auf der Website

Das Kit wurde noch nicht eingeschaltet. Die folgenden Beiträge sind **geplant**, noch keine Tests:

Der nächste Aufbau, den wir dokumentieren möchten, ist ein **Salzstands-Kontroller für einen Wasserenthärter**, mit einer Füllstandsmessung unter dem Deckel des Salzbehälters und einer **Leckerkennung** am Boden. Dieses Projekt wurde noch nicht umgesetzt: es gibt daher noch kein Testergebnis.

- eine ESP32-**Wetterstation** mit AHT20/BMP280, aufbauend auf dem [bereits veröffentlichten ESPHome-Tutorial](/de/smart-home/esp32-esphome-temperatursensor/) ;
- eine **Füllstandsüberwachung** (Tank oder Enthärter) mit dem Wasserstandssensor, optional ergänzt um den HC-SR04 ;
- eine **Öffnungserkennung** mit den Reed-Kontakten ;
- eine **Relaissteuerung** im Sinne des [Garagentor-Leitfadens](/de/smart-home/garagentor-smartphone-esp32-esphome/) ;
- später ein Versuch mit dem **I2S-Mikrofon** für lokale Sprachsteuerung.

Weitere Ideen stehen auf der Seite [10 ESP32-Projekte fürs Smart Home](/de/smart-home/esp32-smart-home-projektideen/).

## Wo es diese Platinen und Sensoren gibt

Das Paket wurde **von** <a href="https://www.electrohobby.es/" rel="sponsored noopener" target="_blank">ElectroHobby.es</a> **geschenkt** <small>(direkter, nicht affiliierter Link)</small>. Der Shop in Murcia verkauft Bauteile und Kits für die Bildungselektronik.

Wer eine vergleichbare Platine suchen möchte, findet auf dieser Website bereits eine Partnersuche ohne hier genannten Preis: <a href="/go/az-de-6daeb0d4ac/" rel="sponsored nofollow noopener">ESP32 DevKit bei Amazon.de</a> <small>(Partnerlink)</small>. Prüfen Sie vor der Bestellung immer die Händlerseite (Pinzahl, USB-C oder Micro-USB, Flash-Speicher).

## FAQ

### Wie versorgt man die ESP32-Platinen mit Strom?

Die **ESP32-DevKit**-Platinen (die Entwicklungsboards im 30-Pin-Format, mit **USB-C**-Buchse — dem heutigen, ovalen USB-Anschluss) steckt man an ein gewöhnliches **5-V**-Handy-Netzteil, das mindestens **1 A** (ein Ampere) liefern kann. Pro Platine braucht man ein Netzteil und ein Kabel, die an einer Steckdose bleiben.

Das **2-Relais-Modul 5 V** (die kleine Karte, die einen elektrischen Kontakt öffnet oder schließt) braucht kein zweites Netzteil: sobald ein ESP32-DevKit bereits per USB versorgt wird, verbindet man den **5-V**-Pin des ESP32 (oft auch **VIN** genannt, von *voltage input*, dem Versorgungseingang) mit den Versorgungsklemmen des Moduls, über die beiliegenden **Dupont-Jumperkabel** (fertig konfektionierte Leitungen mit Steckenden).

Der **ESP32-C3 Super Mini** (die kompakteste Platine im Kit) kann grundsätzlich mit einem **3,7-V-LiPo**-Akku betrieben werden (ein Lithium-Polymer-Akku, üblich in kleinen netzunabhängigen Geräten), dank der **Erweiterungsplatine** und ihres Batterieanschlusses. Das haben wir an unserem Kit noch nicht geprüft: es wird bei späteren Aufbauten bestätigt.

### Wie verbindet man das Kit mit Homey?

Zuerst installiert man **ESPHome** auf dem ESP32. ESPHome ist eine Software (eine *Firmware*), die man auf die Platine lädt, damit sie sich mit dem **WLAN** (dem drahtlosen Heimnetz) verbindet und ihre Sensoren bereitstellt. Zum Einstieg öffnet man [ESPHome Web](https://web.esphome.io) im Browser, schließt die Platine per USB-Kabel an und richtet WLAN und Sensoren ein.

Anschließend installiert man auf **Homey** (der Hausautomationszentrale, die die Geräte im Haus steuert) die App **ESPHome** von Abe Haverkamp aus dem Homey App Store (eine Community-App): [Seite der ESPHome-App](https://homey.app/de-de/app/io.esphome/). Diese App läuft auf **Homey Pro** (Modelle 2023 und neuer), **Homey Pro mini** und einem selbst gehosteten Homey-Server, mit Homey-Software 13.0.0 oder neuer. Sie läuft **nicht** auf **Homey Cloud** (dem Angebot ohne Pro-Gerät zu Hause) und auch nicht auf älteren Homey-Pro-Geräten (2016–2019). Homey spricht dann lokal im Heimnetz mit der Platine, über die **native API** von ESPHome (die dafür vorgesehene Kommunikationsschnittstelle, die in der Konfiguration aktiviert werden muss).

Ist die App installiert, erscheint der ESP32 als Homey-Gerät. Man kann ihn in **Flows** nutzen (den Homey-Automatisierungen: „wenn dies geschieht, dann tue das“).

### Wie schließe ich den HC-SR04 an einen ESP32 an?

Der **HC-SR04** ist ein Ultraschall-Abstandssensor (er sendet einen sehr hohen, unhörbaren Ton und lauscht auf das Echo). Er arbeitet mit **5 V**. Sein Pin **ECHO** (der Ausgang, der das zurückkehrende Echo signalisiert) gibt daher ein **5-V**-Signal aus. Die Eingangspins eines **ESP32** sind aber nur für **3,3 V** ausgelegt: ein 5-V-Signal kann sie beschädigen.

Dieses Signal muss deshalb mit einem **Spannungsteiler** abgesenkt werden: zwei Widerstände in Reihe, **1 kΩ** (1 000 Ohm, auf der ECHO-Seite) und **2 kΩ** (2 000 Ohm, auf der Masse-/GND-Seite). Die Leitung zum ESP32-Pin geht vom Mittelpunkt zwischen den beiden Widerständen ab. So erhält man etwa **3,3 V** (5 × 2 / 3). Der Pin **TRIG** (der Trigger-Eingang) kann direkt verbunden bleiben: ein 3,3-V-Pegel vom ESP32 reicht in der Regel, um den Sensor auszulösen. Die Versorgung **VCC** des HC-SR04 bleibt bei 5 V.

Diese Verkabelung haben wir am erhaltenen Kit noch nicht ausgeführt: das ist die übliche Vorsichtsmaßnahme, die bei den kommenden Aufbauten geprüft wird.

### Funktioniert der ESP32 in einem 5-GHz-WLAN?

Nein. Die **ESP32**-Boards in diesem Kit (die beiden DevKit WROOM-32 und der ESP32-C3 Super Mini) verbinden sich nur mit einem **2,4-GHz-WLAN**. Ein reines **5-GHz**-Netz wird vom Board nicht gesehen. Bei einem Router mit beiden Bändern brauchen Sie entweder ein eigenes 2,4-GHz-Netz oder ein Mischnetz, in dem 2,4 GHz aktiv bleibt. Dieselbe Einstellung gilt, wenn Sie das WLAN in ESPHome einrichten.

### Kann ich den ESP32 mit 5 V am VIN-Pin versorgen?

Ja. Bei einem typischen **ESP32-DevKit** ist der Pin **VIN** (häufig auch mit **5 V** beschriftet) der Versorgungseingang: Sie können dort eine geregelte **5-V**-Spannung einspeisen (zum Beispiel von einem USB-Netzteil oder einem Regler), die Masse kommt an **GND**. Es ist derselbe Pin, den Sie nutzen, wenn das Board bereits per USB versorgt wird, um dem Relaismodul 5 V bereitzustellen.

Legen Sie **kein** 5 V an den **3,3-V**-Pin (dieser Pin ist ein geregelter Ausgang, kein 5-V-Eingang). Vermeiden Sie außerdem, USB-Versorgung und eine weitere 5-V-Quelle an VIN unbedacht zu kombinieren. Diesen Anschluss haben wir an unserem Kit noch nicht ausprobiert: er wird bei den kommenden Aufbauten bestätigt.
