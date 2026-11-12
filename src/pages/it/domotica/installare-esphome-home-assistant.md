---
layout: ../../../layouts/ItPost.astro
title: Installare ESPHome in Home Assistant
description: "Installate ESPHome Device Builder: add-on, secrets.yaml, cifratura, primo ESP32-C6 e adozione in HA. Materiale, schema GPIO, YAML ESPHome e Home Assistant."
updated: "30 ottobre 2026"
---

**ESPHome** è un software che trasforma una scheda ESP32, una piccola scheda elettronica con Wi-Fi, in un dispositivo domotico: descrivete ciò che la scheda deve fare in un semplice file di configurazione chiamato YAML, ed ESPHome lo trasforma nel programma della scheda, senza che dobbiate scrivere codice. In Home Assistant, il software libero che riunisce i vostri dispositivi connessi, l’add-on **ESPHome Device Builder** fornisce l’editor, il compilatore (lo strumento che costruisce il programma) e lo strumento di aggiornamento. Una volta installato, serve a tutti i vostri progetti ESP32.

**Risultato atteso:** ESPHome aperto nella barra laterale, un file `secrets.yaml` e un primo dispositivo pronto da flashare. **Durata:** 20 minuti. **Difficoltà:** principiante.

## Quale metodo di installazione?

Gli add-on esistono solo su **Home Assistant OS** (Green, Yellow, Raspberry Pi, macchina virtuale) e **Supervised**. Su un’installazione **Container** o **Core**, ESPHome si installa a parte, come descritto sotto. Se non sapete quale variante usate, aprite **Impostazioni → Sistema → Informazioni**: la riga «Tipo di installazione» lo indica.

## Metodo A: add-on (Home Assistant OS)

1. Aprite **Impostazioni → Add-on**, poi **Store degli add-on** in basso a destra.
2. Cercate **ESPHome Device Builder** e fate clic su **Installa**.
3. Una volta installato, attivate **Mostra nella barra laterale**, poi fate clic su **Avvia**.
4. Aprite **ESPHome** nella barra laterale: compare la dashboard, vuota all’inizio.

**Verifica:** la dashboard di ESPHome si carica senza errori e propone il pulsante **+ New Device**.

## Metodo B: Container o Core

Senza add-on, installate ESPHome su qualsiasi macchina Linux, macOS o Windows con Python:

```bash
pip install esphome
esphome dashboard config/
```

La dashboard si apre allora su `http://localhost:6052`. Esiste anche un’immagine Docker ufficiale (`ghcr.io/esphome/esphome`, con `--net=host` perché la scoperta di rete funzioni): seguite la [documentazione di installazione di ESPHome](https://esphome.io/guides/installing_esphome/).

## Preparare il file secrets.yaml

In ESPHome fate clic su **Secrets** (in alto a destra). Questo file tiene le password fuori dai file dei dispositivi, così potete condividerli senza divulgarle:

```yaml
wifi_ssid: "NomeDellaVostraRete"
wifi_password: "password-wifi"
ap_password: "password-di-emergenza"
api_encryption_key: "INCOLLATE-UNA-CHIAVE-GENERATA"
ota_password: "password-ota"
```

Generate la chiave di cifratura con `openssl rand -base64 32` (o con qualsiasi generatore di 32 byte in base64). La rete deve essere a **2,4 GHz**: l’ESP32-C6 non si collega a una rete solo a 5 GHz. Non pubblicate mai questo file.

## Creare il primo dispositivo

1. Fate clic su **+ New Device**, poi **Continue**.
2. Date un nome in minuscolo senza spazi, ad esempio `test-esp32`, e confermate.
3. Scegliete **ESP32-C6** come tipo di scheda. La procedura guidata crea il file del dispositivo; chiudete la finestra di installazione senza flashare per ora.
4. Fate clic su **Edit** e sostituite il contenuto con una base minima:

```yaml
esphome:
  name: test-esp32

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "test-esp32 Fallback"
    password: !secret ap_password

captive_portal:
```

Fate clic su **Validate**: il messaggio «Configuration is valid» conferma la sintassi. Questo file non è stato eseguito su una scheda per questo articolo; segue la struttura standard della documentazione di ESPHome.

## Flashare e adottare il dispositivo in Home Assistant

Il primo flash avviene via cavo USB: seguite [flashare un ESP32 con ESPHome](/it/domotica/flashare-esp32-esphome/). Poi Home Assistant rileva il dispositivo: aprite **Impostazioni → Dispositivi e servizi**, fate clic su **Configura** sulla scheda ESPHome rilevata e incollate la chiave di cifratura. Gli aggiornamenti successivi avvengono [senza cavo, via OTA](/it/domotica/aggiornamenti-ota-esphome/).

## Problemi frequenti

| Sintomo | Causa probabile | Soluzione |
|---|---|---|
| L’add-on ESPHome non si trova | Installazione Container o Core | Usate il metodo B |
| «Invalid key» all’adozione | Chiave diversa da quella dello YAML | Copiate il valore esatto di `api_encryption_key` |
| Compilazione molto lunga | Prima compilazione, cache vuota | Pazientate: le successive sono più rapide |
| Errore «secret not defined» | Voce assente da `secrets.yaml` | Aggiungete la riga mancante |
| Il dispositivo non viene mai rilevato | Wi-Fi a 5 GHz, VLAN separata o mDNS bloccato | Usate i 2,4 GHz e la stessa rete di Home Assistant |

Avanti: scegliete un [progetto ESP32](/it/domotica/progetti-esp32-domotica/) e rivedete le [basi del cablaggio GPIO](/it/domotica/basi-cablaggio-esp32-gpio/).

<small>Aggiornato il 30 ottobre 2026. Fonti: [documentazione ESPHome](https://esphome.io/) e [documentazione Home Assistant](https://www.home-assistant.io/). Verificate i nomi dei menu sulla vostra versione.</small>
