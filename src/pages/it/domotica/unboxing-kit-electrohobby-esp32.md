---
layout: ../../../layouts/ItPost.astro
title: "Unboxing del kit ElectroHobby.es: 2 ESP32 DevKit, ESP32-C3 Super Mini e sensori (prodotto offerto)"
description: "Unboxing del kit offerto da ElectroHobby.es: 2 ESP32 DevKit WROOM-32 USB-C, ESP32-C3 Super Mini, relè, sensori e cavi Dupont, con i progetti ESP32 previsti sul sito."
updated: "19 novembre 2026"
---

<nav class="breadcrumb" aria-label="Percorso di navigazione"><a href="/it/domotica/">Domotica</a> · Unboxing ElectroHobby</nav>

> **Risposta diretta** — Il 19 novembre 2026 abbiamo ricevuto un pacco **offerto da ElectroHobby.es**, negozio spagnolo di elettronica educativa con sede a Murcia. Questo articolo è un **unboxing**: descrive il contenuto reale del collo e i progetti che prevediamo di pubblicare su robot-educatif.info. **Non è stato ancora eseguito alcun test**, quindi non troverete misure né un giudizio di prova.

I link Amazon sono **link di affiliazione** (`/go/`): possono generare una commissione senza costi aggiuntivi. Il link a ElectroHobby.es è un **link diretto, non affiliato**.

<figure>
<img src="/images/domotique/electrohobby-unboxing/15-colis-papier-bulle.webp" alt="Pacco ElectroHobby.es aperto, componenti ancora nel pluriball" width="1600" height="1200" />
<figcaption>Il collo all'apertura, ancora nel pluriball.</figcaption>
</figure>

## Contenuto del pacco

<figure>
<img src="/images/domotique/electrohobby-unboxing/14-colis-ouvert-cartes-electrohobby.webp" alt="Contenuto del pacco ElectroHobby.es con moduli ESP32, sensori e due schede memo" width="1600" height="2133" />
<figcaption>Panoramica del kit, con le due schede memo ElectroHobby (codice colori delle resistenze e legge di Ohm).</figcaption>
</figure>

Inventario verificato il 19 novembre 2026:

- **2 ESP32 DevKit** WROOM-32, connettore USB-C, 30 pin ;
- un **ESP32-C3 Super Mini**, con le barrette di pin ;
- una **scheda di espansione** per ESP32-C3 Super Mini, con connettore batteria ;
- un **modulo 2 relè 5 V** (JQC3F-05VDC-C, con optoaccoppiatori) ;
- un sensore a ultrasuoni **HC-SR04** ;
- un sensore di luce **TEMT6000** ;
- un sensore di **livello dell'acqua** ;
- un **microfono I2S di tipo INMP441** (pin SD, VDD, GND, SCK, WS e LR) ;
- un modulo **AHT20 + BMP280** (temperatura, umidità e pressione, bus I2C) ;
- una decina di **interruttori reed** ;
- tre nastri di **cavi Dupont** (maschio-maschio, maschio-femmina, femmina-femmina) ;
- due **schede memo ElectroHobby** (codice colori delle resistenze, legge di Ohm).

## I 2 ESP32 DevKit WROOM-32 USB-C

Il collo contiene **2 ESP32 DevKit** distinti, nel formato classico a 30 pin, con presa **USB-C**. È il tipo di scheda che consigliamo per iniziare con ESPHome, in [quale scheda ESP32 scegliere](/it/domotica/quale-scheda-esp32-domotica/).

<figure>
<img src="/images/domotique/electrohobby-unboxing/05-esp32-devkit-wroom-32-usbc-1.webp" alt="Primo ESP32 DevKit WROOM-32 USB-C a 30 pin, vista frontale" width="1600" height="1200" />
<figcaption>Il primo dei 2 ESP32 DevKit ricevuti.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/06-esp32-devkit-wroom-32-usbc-2.webp" alt="Secondo ESP32 DevKit WROOM-32 USB-C, scheda distinta" width="1600" height="1200" />
<figcaption>Il secondo ESP32 DevKit: una seconda scheda, non un altro angolo della prima.</figcaption>
</figure>

Due schede identiche permettono di portare avanti due progetti in parallelo, per esempio un sensore e un relè, senza smontare il primo circuito.

## L'ESP32-C3 Super Mini e la scheda di espansione

L'**ESP32-C3 Super Mini** è una scheda molto compatta, con core RISC-V, Wi-Fi e Bluetooth Low Energy. È pratica quando manca spazio nel contenitore. Le barrette di pin erano fornite a parte, da saldare se necessario.

<figure>
<img src="/images/domotique/electrohobby-unboxing/01-esp32-c3-super-mini-recto.webp" alt="ESP32-C3 Super Mini visto dal recto, pulsante e USB-C visibili" width="1600" height="1200" />
<figcaption>Recto dell'ESP32-C3 Super Mini.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/02-esp32-c3-super-mini-verso.webp" alt="ESP32-C3 Super Mini visto dal verso, schermatura metallica e pad di saldatura" width="1600" height="1200" />
<figcaption>Verso della stessa scheda.</figcaption>
</figure>

Il kit include anche una **scheda di espansione** per questo Super Mini, con **connettore batteria**. Dovrebbe facilitare i nodi alimentati a batteria. Lo verificheremo nei montaggi successivi, non in questo unboxing.

<figure>
<img src="/images/domotique/electrohobby-unboxing/12-carte-extension-esp32-c3.webp" alt="Scheda di espansione per ESP32-C3 Super Mini con connettore batteria" width="1600" height="2133" />
<figcaption>Scheda di espansione per l'ESP32-C3 Super Mini, connettore batteria visibile.</figcaption>
</figure>

## Modulo 2 relè 5 V

Il modulo monta due relè **JQC3F-05VDC-C** e optoaccoppiatori. Questo tipo di scheda serve a comandare un contatto pulito: è lo stesso bisogno descritto nella guida [aprire la porta del garage dallo smartphone con un ESP32](/it/domotica/porta-garage-smartphone-esp32-esphome/). Qui non è stato ancora cablato nulla.

<figure>
<img src="/images/domotique/electrohobby-unboxing/07-module-2-relais-5v.webp" alt="Modulo due relè 5 V JQC3F-05VDC-C con optoaccoppiatori" width="1600" height="1200" />
<figcaption>Modulo 2 relè 5 V, con morsettiere e optoaccoppiatori visibili.</figcaption>
</figure>

## Sensori e microfono

I sensori suggeriscono diversi tutorial ESP32 futuri. Non anticipiamo prestazioni finché non saranno stati provati.

<figure>
<img src="/images/domotique/electrohobby-unboxing/10-hc-sr04.webp" alt="Sensore a ultrasuoni HC-SR04, quattro pin VCC Trig Echo GND" width="1600" height="2133" />
<figcaption>Sensore a ultrasuoni HC-SR04, per una misura di distanza o di livello (fuori dal liquido).</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/03-temt6000.webp" alt="Sensore di luce ambientale TEMT6000 su piccolo circuito" width="1600" height="1200" />
<figcaption>Sensore di luce TEMT6000.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/04-capteur-niveau-eau.webp" alt="Sensore di livello dell'acqua con piste scoperte e morsettiera a tre fili" width="1600" height="1200" />
<figcaption>Sensore di livello dell'acqua, pensato per un serbatoio o un addolcitore.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/09-micro-i2s-inmp441.webp" alt="Microfono I2S di tipo INMP441 con pin SD, VDD, GND, SCK, WS e LR" width="1600" height="1200" />
<figcaption>Microfono I2S di tipo INMP441, riconosciuto dalla serigrafia SD / VDD / GND / SCK / WS / LR.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/08-aht20-bmp280.webp" alt="Modulo combinato AHT20 e BMP280, connettore I2C" width="1600" height="1200" />
<figcaption>Modulo AHT20 + BMP280: temperatura, umidità e pressione su I2C.</figcaption>
</figure>

Il modulo meteo AHT20 + BMP280 si collega al nostro [tutorial sul sensore di temperatura ESP32 + ESPHome](/it/domotica/esp32-esphome-sensore-temperatura/). Il sensore d'acqua e l'HC-SR04 potranno servire a un monitoraggio di livello. Il microfono I2S potrà, più avanti, aprire a un comando vocale locale.

## Interruttori reed e cavi Dupont

<figure>
<img src="/images/domotique/electrohobby-unboxing/11-interrupteurs-reed-ils.webp" alt="Una decina di interruttori reed sparsi sulla scrivania" width="1600" height="2133" />
<figcaption>Interruttori reed, per rilevare l'apertura di una porta o di un coperchio con un magnete.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/13-cables-dupont.webp" alt="Tre nastri di cavi Dupont maschio-maschio, maschio-femmina e femmina-femmina" width="1600" height="2133" />
<figcaption>I tre nastri Dupont in dotazione: maschio-maschio, maschio-femmina e femmina-femmina.</figcaption>
</figure>

Insieme a un magnete, i reed sono un modo semplice per segnalare l'apertura di una porta, di una finestra o di un coperchio. I cavi Dupont evitano di preparare i fili prima delle prime prove su breadboard.

## I progetti che prevediamo sul sito

Il kit non è ancora stato alimentato. I seguenti articoli sono **previsti**, non ancora scritti come test:

- una **stazione meteo** ESP32 + AHT20/BMP280, partendo dal [tutorial ESPHome già online](/it/domotica/esp32-esphome-sensore-temperatura/) ;
- un **monitoraggio del livello dell'acqua** (serbatoio o addolcitore) con l'apposito sensore, eventualmente insieme all'HC-SR04 ;
- una **rilevazione di apertura** con i reed ;
- un **comando a relè**, nello spirito della guida [porta del garage](/it/domotica/porta-garage-smartphone-esp32-esphome/) ;
- più avanti, una prova del **microfono I2S** per un comando vocale locale.

Altre idee sono nella pagina [10 progetti ESP32 per la domotica](/it/domotica/progetti-esp32-domotica/).

## Dove trovare queste schede e questi sensori

Il pacco è stato **offerto da** <a href="https://www.electrohobby.es/" rel="sponsored noopener" target="_blank">ElectroHobby.es</a> <small>(link diretto, non affiliato)</small>. Il negozio, con sede a Murcia, vende componenti e kit per l'elettronica educativa.

Se cercate una scheda equivalente, sul sito esiste già una ricerca affiliata, senza un prezzo indicato qui: <a href="/go/az-it-95064ed9fa/" rel="sponsored nofollow noopener">ESP32 DevKit su Amazon.it</a> <small>(link affiliato)</small>. Controllate sempre la scheda del venditore (numero di pin, USB-C o micro-USB, memoria flash) prima di ordinare.
