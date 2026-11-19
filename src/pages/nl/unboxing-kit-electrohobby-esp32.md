---
layout: ../../layouts/EnPost.astro
lang: nl
title: "Unboxing van de ElectroHobby.es-kit: 2 ESP32 DevKit, ESP32-C3 Super Mini en sensors (cadeau van het merk)"
description: "Unboxing van de kit die ElectroHobby.es schonk: 2 ESP32 DevKit WROOM-32 USB-C, ESP32-C3 Super Mini, relais, sensors en jumperkabels, plus de geplande ESP32-projecten op deze site."
updated: "19 november 2026"
---

<nav class="breadcrumb" aria-label="Broodkruimel"><a href="/nl/">Robot educatief</a> · ElectroHobby unboxing</nav>

> **Kort antwoord** — Op 19 november 2026 ontvingen we een pakket **geschonken door ElectroHobby.es**, een Spaanse winkel voor educatieve elektronica in Murcia. Dit artikel is een **unboxing**: het beschrijft de echte inhoud van het pakket en de projecten die we daarvoor op robot-educatif.info plannen. **Er is nog niets getest**, dus u vindt hier geen metingen en geen testoordeel.

> *Also available in [French](/domotique/unboxing-kit-electrohobby-esp32/) and [English](/en/smart-home/electrohobby-esp32-kit-unboxing/).*

De link naar ElectroHobby.es is een **directe, niet-geaffiliateerde** link.

<figure>
<img src="/images/domotique/electrohobby-unboxing/15-colis-papier-bulle.webp" alt="Geopend pakket van ElectroHobby.es, onderdelen nog in noppenfolie" width="1600" height="1200" />
<figcaption>Het pakket bij het openen, nog in de noppenfolie.</figcaption>
</figure>

## Inhoud van het pakket

<figure>
<img src="/images/domotique/electrohobby-unboxing/14-colis-ouvert-cartes-electrohobby.webp" alt="Inhoud van het ElectroHobby.es-pakket met ESP32-modules, sensors en twee memokaarten" width="1600" height="2133" />
<figcaption>Overzicht van de kit, met de twee ElectroHobby-memokaarten (kleurencode van weerstanden en wet van Ohm).</figcaption>
</figure>

Inventaris van 19 november 2026:

- **2 ESP32 DevKit** WROOM-32, USB-C-aansluiting, 30 pinnen ;
- een **ESP32-C3 Super Mini**, met pinheaders ;
- een **uitbreidingsbord** voor de ESP32-C3 Super Mini, met accuconnector ;
- een **2-relaismodule 5 V** (JQC3F-05VDC-C, met optocouplers) ;
- een ultrasone sensor **HC-SR04** ;
- een lichtsensor **TEMT6000** ;
- een **waterniveau**-sensor ;
- een **I2S-microfoon van het type INMP441** (pinnen SD, VDD, GND, SCK, WS en LR) ;
- een module **AHT20 + BMP280** (temperatuur, vochtigheid en luchtdruk, I2C) ;
- ongeveer tien **reedcontacten** ;
- drie linten **Dupont-jumperkabels** (male-male, male-female, female-female) ;
- twee **ElectroHobby-memokaarten** (kleurencode van weerstanden, wet van Ohm).

## De 2 ESP32 DevKit WROOM-32 USB-C

Het pakket bevat **2 aparte ESP32 DevKit**-borden, in het klassieke 30-pinsformaat, met een **USB-C**-aansluiting. Dat is het type bord dat we aanraden om met ESPHome te beginnen, in [welke ESP32-plaat kiezen](/en/smart-home/which-esp32-board-for-smart-home/) (Engelse gids).

<figure>
<img src="/images/domotique/electrohobby-unboxing/05-esp32-devkit-wroom-32-usbc-1.webp" alt="Eerste ESP32 DevKit WROOM-32 USB-C met 30 pinnen, voorkant" width="1600" height="1200" />
<figcaption>De eerste van de 2 ontvangen ESP32 DevKit-borden.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/06-esp32-devkit-wroom-32-usbc-2.webp" alt="Tweede ESP32 DevKit WROOM-32 USB-C, een apart bord" width="1600" height="1200" />
<figcaption>De tweede ESP32 DevKit: een tweede bord, niet een andere hoek van het eerste.</figcaption>
</figure>

Twee identieke borden maken het makkelijk om twee projecten tegelijk te bouwen, bijvoorbeeld een sensor en een relais, zonder de eerste schakeling weer uit elkaar te halen.

## De ESP32-C3 Super Mini en het uitbreidingsbord

De **ESP32-C3 Super Mini** is een zeer compact bord met een RISC-V-kern, wifi en Bluetooth Low Energy. Hij is handig als er weinig ruimte is in een behuizing. De pinheaders zaten los bij, om desgewenst te solderen.

<figure>
<img src="/images/domotique/electrohobby-unboxing/01-esp32-c3-super-mini-recto.webp" alt="ESP32-C3 Super Mini aan de voorkant, knop en USB-C zichtbaar" width="1600" height="1200" />
<figcaption>Voorkant van de ESP32-C3 Super Mini.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/02-esp32-c3-super-mini-verso.webp" alt="ESP32-C3 Super Mini aan de achterkant, metalen afscherming en soldeervlakken" width="1600" height="1200" />
<figcaption>Achterkant van hetzelfde bord.</figcaption>
</figure>

Bij de kit zit ook een **uitbreidingsbord** voor deze Super Mini, met een **accuconnector**. Dat zou autonome sensorknooppunten moeten vergemakkelijken. We controleren dat in latere opstellingen, niet in deze unboxing.

<figure>
<img src="/images/domotique/electrohobby-unboxing/12-carte-extension-esp32-c3.webp" alt="Uitbreidingsbord voor de ESP32-C3 Super Mini met accuconnector" width="1600" height="2133" />
<figcaption>Uitbreidingsbord voor de ESP32-C3 Super Mini, accuconnector zichtbaar.</figcaption>
</figure>

## 2-relaismodule 5 V

De module heeft twee relais **JQC3F-05VDC-C** en optocouplers. Zo'n bord stuurt een droog contact aan: precies de behoefte uit onze gids over een [garagedeur openen met de telefoon en een ESP32](/en/smart-home/garage-door-smartphone-esp32-esphome/). Hier is nog niets bedraad.

<figure>
<img src="/images/domotique/electrohobby-unboxing/07-module-2-relais-5v.webp" alt="Tweekanaals 5 V-relaismodule JQC3F-05VDC-C met optocouplers" width="1600" height="1200" />
<figcaption>5 V 2-relaismodule, met klemmen en optocouplers zichtbaar.</figcaption>
</figure>

## Sensors en microfoon

De sensors suggereren verschillende toekomstige ESP32-handleidingen. We doen geen uitspraken over prestaties zolang ze niet zijn uitgeprobeerd.

<figure>
<img src="/images/domotique/electrohobby-unboxing/10-hc-sr04.webp" alt="Ultrasone sensor HC-SR04, vier pinnen VCC Trig Echo GND" width="1600" height="2133" />
<figcaption>Ultrasone sensor HC-SR04, voor een afstands- of niveaumeting (buiten de vloeistof).</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/03-temt6000.webp" alt="Omgevingslichtsensor TEMT6000 op een klein printplaatje" width="1600" height="1200" />
<figcaption>Lichtsensor TEMT6000.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/04-capteur-niveau-eau.webp" alt="Waterniveausensor met blootliggende sporen en een drieaderige klem" width="1600" height="1200" />
<figcaption>Waterniveausensor, bedoeld voor een tank of een ontharder.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/09-micro-i2s-inmp441.webp" alt="I2S-microfoon van het type INMP441 met pinnen SD, VDD, GND, SCK, WS en LR" width="1600" height="1200" />
<figcaption>I2S-microfoon van het type INMP441, herkend aan de opdruk SD / VDD / GND / SCK / WS / LR.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/08-aht20-bmp280.webp" alt="Gecombineerde module AHT20 en BMP280, I2C-connector" width="1600" height="1200" />
<figcaption>Module AHT20 + BMP280: temperatuur, vochtigheid en luchtdruk via I2C.</figcaption>
</figure>

De weermodule AHT20 + BMP280 sluit aan bij onze bestaande [ESP32 + ESPHome-temperatuursensor](/en/smart-home/esp32-esphome-temperature-sensor/). De watersensor en de HC-SR04 kunnen een niveaumeting ondersteunen. De I2S-microfoon kan later een lokale spraakopdracht mogelijk maken.

## Reedcontacten en Dupont-kabels

<figure>
<img src="/images/domotique/electrohobby-unboxing/11-interrupteurs-reed-ils.webp" alt="Ongeveer tien reedcontacten op het bureau" width="1600" height="2133" />
<figcaption>Reedcontacten, om met een magneet het openen van een deur of deksel te detecteren.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/13-cables-dupont.webp" alt="Drie linten Dupont-jumperkabels: male-male, male-female en female-female" width="1600" height="2133" />
<figcaption>De drie meegeleverde Dupont-linten: male-male, male-female en female-female.</figcaption>
</figure>

Samen met een magneet zijn reedcontacten een eenvoudige manier om een deur, raam of deksel te bewaken. De jumperkabels maken de eerste breadboardproeven mogelijk zonder eerst draden te knippen.

## Projecten die we op de site plannen

De kit is nog niet onder spanning gezet. De volgende artikelen zijn **gepland**, nog geen tests:

De volgende opstelling die we willen documenteren is een **zoutniveaucontroller voor een waterontharder**, met een niveaumeting onder het deksel van het zoutvat en **lektetectie** op de vloer. Dit project is nog niet gebouwd: er is dus nog geen testresultaat.

- een ESP32-**weerstation** met AHT20/BMP280, voortbouwend op de [al gepubliceerde ESPHome-handleiding](/en/smart-home/esp32-esphome-temperature-sensor/) ;
- een **waterniveaumeting** (tank of ontharder) met de bijbehorende sensor, eventueel aangevuld met de HC-SR04 ;
- **openingsdetectie** met de reedcontacten ;
- een **relaisaansturing**, in de geest van de [garagedeurgids](/en/smart-home/garage-door-smartphone-esp32-esphome/) ;
- later een proef met de **I2S-microfoon** voor lokale spraakbesturing.

Meer ideeën staan in [10 ESP32-projecten voor het slimme huis](/en/smart-home/esp32-smart-home-project-ideas/).

## Waar u deze borden en sensors vindt

Het pakket werd **geschonken door** <a href="https://www.electrohobby.es/" rel="sponsored noopener" target="_blank">ElectroHobby.es</a> <small>(directe, niet-geaffiliateerde link)</small>. De winkel in Murcia verkoopt componenten en kits voor educatieve elektronica.

## FAQ

### Hoe voedt u de ESP32-borden?

De **ESP32 DevKit**-borden (de ontwikkelborden in het 30-pinsformaat, met een **USB-C**-aansluiting — de huidige, ovale USB-connector) sluit u aan op een gewone **5 V**-telefoonadapter die minstens **1 A** (één ampère) kan leveren. U hebt per bord een adapter en een kabel nodig, die u in een stopcontact laat zitten.

De **2-relaismodule 5 V** (het kleine bord dat een elektrisch contact opent of sluit) heeft geen tweede voeding nodig: zodra een ESP32 DevKit al via USB wordt gevoed, verbindt u de **5 V**-pin van de ESP32 (vaak ook **VIN** genoemd, van *voltage input*, de voedingsingang) met de voedingsklemmen van de module, via de meegeleverde **Dupont-jumperkabels** (kant-en-klare draden met stekkeruiteinden).

De **ESP32-C3 Super Mini** (het compactste bord in de kit) kan in principe werken op een **LiPo-accu van 3,7 V** (een lithium-polymeeraccu, gebruikelijk in kleine autonome apparaatjes), dankzij het **uitbreidingsbord** en de accuconnector. Dat hebben we op onze kit nog niet gecontroleerd: het wordt bevestigd bij latere opstellingen.

### Hoe verbindt u de kit met Homey?

Eerst installeert u **ESPHome** op de ESP32. ESPHome is software (firmware) die u op het bord zet, zodat het zich met de **wifi** (het draadloze thuisnetwerk) verbindt en zijn sensors publiceert. Om te beginnen opent u [ESPHome Web](https://web.esphome.io) in een browser, sluit u het bord met een USB-kabel aan en configureert u de wifi en de sensors.

Daarna installeert u op **Homey** (de huisautomatiseringscentrale die de apparaten in huis aanstuurt) de app **ESPHome** van Abe Haverkamp, beschikbaar in de Homey App Store (een community-app): [pagina van de ESPHome-app](https://homey.app/nl-nl/app/io.esphome/). Deze app werkt op **Homey Pro** (modellen uit 2023 en nieuwer), **Homey Pro mini** en een zelf gehoste Homey-server, met Homey-software 13.0.0 of nieuwer. Ze werkt **niet** op **Homey Cloud** (het aanbod zonder Pro-apparaat in huis) en ook niet op oudere Homey Pro-toestellen (2016-2019). Homey praat dan lokaal, op het thuisnetwerk, met het bord via de **native API** van ESPHome (de daarvoor bedoelde communicatie-interface, die u in de configuratie moet inschakelen).

Zodra de app is geïnstalleerd, verschijnt de ESP32 als een Homey-apparaat. U kunt hem gebruiken in **Flows** (de Homey-automatiseringen: «wanneer dit gebeurt, doe dan dat»).
