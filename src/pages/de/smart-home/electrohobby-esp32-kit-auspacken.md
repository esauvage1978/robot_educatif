---
layout: ../../../layouts/DePost.astro
title: "ElectroHobby.es-Kit ausgepackt: 2 ESP32-DevKit, ESP32-C3 Super Mini und Sensoren (Geschenk der Marke)"
description: "Unboxing des von ElectroHobby.es geschenkten Kits: 2 ESP32-DevKit WROOM-32 USB-C, ESP32-C3 Super Mini, Relais, Sensoren und Jumper-Kabel sowie die geplanten ESP32-Projekte."
updated: "19. November 2026"
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

- eine ESP32-**Wetterstation** mit AHT20/BMP280, aufbauend auf dem [bereits veröffentlichten ESPHome-Tutorial](/de/smart-home/esp32-esphome-temperatursensor/) ;
- eine **Füllstandsüberwachung** (Tank oder Enthärter) mit dem Wasserstandssensor, optional ergänzt um den HC-SR04 ;
- eine **Öffnungserkennung** mit den Reed-Kontakten ;
- eine **Relaissteuerung** im Sinne des [Garagentor-Leitfadens](/de/smart-home/garagentor-smartphone-esp32-esphome/) ;
- später ein Versuch mit dem **I2S-Mikrofon** für lokale Sprachsteuerung.

Weitere Ideen stehen auf der Seite [10 ESP32-Projekte fürs Smart Home](/de/smart-home/esp32-smart-home-projektideen/).

## Wo es diese Platinen und Sensoren gibt

Das Paket wurde **von** <a href="https://www.electrohobby.es/" rel="sponsored noopener" target="_blank">ElectroHobby.es</a> **geschenkt** <small>(direkter, nicht affiliierter Link)</small>. Der Shop in Murcia verkauft Bauteile und Kits für die Bildungselektronik.

Wer eine vergleichbare Platine suchen möchte, findet auf dieser Website bereits eine Partnersuche ohne hier genannten Preis: <a href="/go/az-de-6daeb0d4ac/" rel="sponsored nofollow noopener">ESP32 DevKit bei Amazon.de</a> <small>(Partnerlink)</small>. Prüfen Sie vor der Bestellung immer die Händlerseite (Pinzahl, USB-C oder Micro-USB, Flash-Speicher).
