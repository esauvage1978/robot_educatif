---
layout: ../../../layouts/ItPost.astro
title: "10 progetti ESP32 per la domotica con ESPHome e Home Assistant"
description: "Idee ESP32 + ESPHome: sensori, relè, LED, stazione meteo, assistente vocale, display. Da principiante ad avanzato. Integrazione Home Assistant."
updated: "24 ottobre 2026"
---

**ESP32 + ESPHome** trasforma un microcontrollore Wi-Fi in sensore, relè o display per Home Assistant. Dieci progetti per difficoltà crescente. Prezzi materiali: verificare su Amazon.it o negozi elettronica in Italia.

## Hardware consigliato

**ESP32-C6 DevKitC**: Wi-Fi 6, Zigbee/Thread nativi, USB-C, compatibile ESPHome — ideale per iniziare ([quale scheda ESP32](/it/domotica/quale-scheda-esp32-domotica/)).

## Principianti (1–2 ore)

### 1. Sensore temperatura DHT22

ESP32-C6 + DHT22. [Tutorial completo](/it/domotica/esp32-esphome-sensore-temperatura/).

### 2. Pulsante emergenza

ESP32 + pulsante su GPIO4 → evento Home Assistant (allarme, scena panico).

### 3. LED di stato

WS2812: verde OK, rosso finestra aperta, blu assenti.

## Intermedi (2–4 ore)

### 4. Stazione meteo

BME280 + BH1750: temp, umidità, pressione, luce; automazione tapparelle.

### 5. Relè 4 canali

Termoconvettore, ventola, pompa, cancello.

### 6. Presenza mmWave LD2410

Migliore del PIR per persone ferme (scrivania, letto).

## Avanzati (4–8 ore)

### 7. Display e-paper meteo

Waveshare 2,9": temp e previsioni senza display sempre acceso.

### 8. Sensore CO2 MH-Z19B

Alert > 1000 ppm, boost VMC via automazione HA.

### 9. Assistente vocale locale

Atom Echo / HA Voice: comandi senza cloud Google/Alexa.

### 10. Contatore acqua/elettrico

Impulsi contatore o teleinfo Linky (UART) — verificare normativa e sicurezza impianto in Italia.

## Bonus expert

Porta con ESP32-CAM, irrigazione con umidità suolo, allarme PIR + sirena 12 V, campanello video DIY, BME680 + PMS5003 qualità aria.

## ESP32 vs Zigbee?

**Pro ESP32**: personalizzabile, Wi-Fi diretto, spesso più economico a parità funzioni.  
**Contro**: alimentazione USB (salvo batteria), cablagio.

**Pro Zigbee**: pile, mesh, [sensori pronti](/it/domotica/sensore-temperatura-zigbee/).

Risorse: [esphome.io](https://esphome.io), [community.home-assistant.io](https://community.home-assistant.io).

Altri progetti: [porta garage ESP32](/it/domotica/porta-garage-smartphone-esp32-esphome/), [installare Home Assistant](/it/domotica/installare-home-assistant-raspberry-pi-5/), [come iniziare](/it/domotica/come-iniziare/).

[Tutte le guide](/it/domotica/)
