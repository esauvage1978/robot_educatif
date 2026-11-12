---
layout: ../../../layouts/ItPost.astro
title: Flashare un ESP32 con ESPHome (USB)
description: "Primo flash di un ESP32-C6: cavo USB, driver CP210x/CH340, ESPHome Web, modalità boot e errori comuni. Materiale, schema GPIO, YAML ESPHome e Home Assistan"
updated: "30 ottobre 2026"
---

**Flashare** una scheda ESP32 significa scrivere per la prima volta il suo programma nella memoria. Questa prima scrittura deve passare da un cavo USB, perché una scheda nuova non conosce ancora né la vostra rete Wi-Fi né ESPHome, il software che prepara quel programma partendo da un file di configurazione chiamato YAML (un semplice testo che descrive ciò che la scheda deve fare). Dopo, ogni aggiornamento avviene via rete senza cavo: si parla di [aggiornamenti OTA](/it/domotica/aggiornamenti-ota-esphome/). Questo tutorial vi accompagna passo dopo passo nel primo flash con una ESP32-C6-DevKitC-1, una piccola scheda elettronica con Wi-Fi, da un computer Windows, macOS o Linux.

**Risultato atteso:** la scheda si avvia con la vostra configurazione, si collega al Wi-Fi a 2,4 GHz e compare in Home Assistant. **Durata:** da 15 a 30 minuti. **Difficoltà:** principiante.

![Scheda Espressif ESP32-C6-DevKitC-1: modulo ESP32-C6-WROOM-1, porte UART e USB, pulsanti BOOT e RESET](/images/products/esp32-c6-devkitc.webp)

La scheda di questo tutorial è la **ESP32-C6-DevKitC-1**. La porta **UART** serve al primo flash via cavo; la porta **USB** è la porta nativa del microcontrollore. I due pulsanti sul fronte sono **RESET** e **BOOT**.

## Cosa serve prima di iniziare

- Una scheda ESP32 (vedi [quale scheda ESP32 scegliere](/it/domotica/quale-scheda-esp32-domotica/)) e un **cavo USB-C dati**: molti cavi «solo ricarica» non trasmettono dati, prima causa di scheda non trovata.
- ESPHome installato in Home Assistant ([installare ESPHome](/it/domotica/installare-esphome-home-assistant/)) e un file YAML del dispositivo.
- Un browser **Chrome o Edge** (Firefox e Safari non gestiscono la seriale USB nel browser).

## Passaggio 1: collegare la scheda e installare il driver se serve

La ESP32-C6-DevKitC-1 ha due porte USB-C. Usate quella contrassegnata **UART**: passa da un chip di conversione USB-seriale (CP210x sulla scheda ufficiale). L’altra, contrassegnata USB, è la porta nativa del microcontrollore.

Su Windows 10 e 11 il driver di solito si installa da solo. Altrimenti installate il driver **CP210x** di Silicon Labs, o il driver **CH340** per le schede con quel chip. Verificate che compaia una porta «COM» in Gestione dispositivi, sezione «Porte (COM e LPT)». Su macOS il driver è spesso integrato. Su Linux aggiungete il vostro utente al gruppo `dialout` (`sudo usermod -a -G dialout $USER`) e riaprite la sessione.

**Verifica:** scollegando e ricollegando la scheda, una riga compare e scompare nell’elenco delle porte.

## Passaggio 2: generare il file di flash

In ESPHome Device Builder, sulla scheda del vostro dispositivo, aprite il menu **⋮ → Install** e poi **Manual download**. A compilazione finita (qualche minuto la prima volta), scegliete **Factory format** e salvate il file `.bin`.

Se Home Assistant è aperto in HTTPS e la scheda è collegata al computer che mostra la pagina, l’opzione **Plug into the computer running ESPHome Dashboard** evita il download. Non funziona su un indirizzo locale in semplice HTTP.

## Passaggio 3: flashare con ESPHome Web

1. Aprite [web.esphome.io](https://web.esphome.io/) in Chrome o Edge.
2. Fate clic su **Connect** e scegliete la porta della scheda (ad esempio «USB JTAG/serial» o «CP210x»).
3. Fate clic su **Install**, selezionate il file `.bin` scaricato e confermate.
4. Attendete la fine della scrittura: la pagina mostra l’avanzamento e poi un messaggio di riuscita.

**Se la connessione fallisce:** mettete la scheda in modalità download. Tenete premuto **BOOT**, premete brevemente **RESET** (o EN), rilasciate BOOT e riprovate.

## Passaggio 4: verificare che tutto funzioni

In ESPHome Web aprite **Logs** dopo l’installazione: le righe di avvio devono mostrare la connessione Wi-Fi e poi l’indirizzo IP. In Home Assistant aprite **Impostazioni → Dispositivi e servizi**: il dispositivo ESPHome compare tra quelli rilevati. Fate clic su **Configura** e inserite la chiave di cifratura dell’API presente nel vostro YAML.

## Problemi frequenti

| Sintomo | Causa probabile | Soluzione |
|---|---|---|
| Nessuna porta nell’elenco | Cavo solo ricarica o porta USB sbagliata | Cambiate cavo, usate la porta UART |
| «Failed to connect» | Scheda non in modalità download | BOOT premuto, RESET, rilasciare BOOT |
| Scrittura interrotta | Cavo o hub USB poco affidabile | Collegate direttamente al computer |
| La scheda riavvia in loop | Configurazione non valida o pin riservato | Leggete i log; vedi [basi del cablaggio GPIO](/it/domotica/basi-cablaggio-esp32-gpio/) |
| Nessuna connessione Wi-Fi | Rete solo a 5 GHz o password errata | Usate i 2,4 GHz, verificate `secrets.yaml` |

## E poi?

Mettete in pratica con un [progetto ESP32 passo dopo passo](/it/domotica/progetti-esp32-domotica/) o con la guida completa del [sensore di temperatura](/it/domotica/esp32-esphome-sensore-temperatura/). Documentazione ufficiale: [ESPHome Web](https://web.esphome.io/) e la [guida introduttiva di ESPHome](https://esphome.io/guides/getting_started_hassio/).

<small>Aggiornato il 30 ottobre 2026. I nomi dei menu di ESPHome e Home Assistant cambiano: verificateli sulla vostra versione.</small>
