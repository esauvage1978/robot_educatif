---
layout: ../../../layouts/ItPost.astro
title: "ESP32 e ESPHome: sensore temperatura in Home Assistant"
description: "Tutorial ESP32 + ESPHome con DHT22 o BME280: cablaggio, YAML, flash, automazioni riscaldamento e FAQ. Progetto DIY per principianti."
updated: "2 novembre 2026"
shareTitle: "Sensore temp ESP32 ESPHome"
shareDescription: "Costruire un sensore temperatura Wi-Fi con ESP32 e ESPHome."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/it/domotica/">Domotica</a> · ESP32 temperatura ESPHome</nav>

> **Risposta diretta (novembre 2026)** — Con una scheda **ESP32** (microcontrollore Wi‑Fi), un sensore **DHT22** o **BME280** e l’add-on **ESPHome** (firmware che si configura con file **YAML**, testo strutturato) create un sensore temperatura/umidità che **Home Assistant** rileva in automatico, senza cloud obbligatorio. Alternativa pronta all’uso: [sensore temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/). Tutte le guide: [hub domotica](/it/domotica/).

Un sensore fai-da-te costa pochi euro, si aggiorna via **OTA** (*Over-The-Air*, aggiornamento Wi‑Fi senza cavo USB) e insegna cablaggio e automazioni. Centralina consigliata già operativa: [installare Home Assistant su Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/) o altro host con add-on ESPHome.

![Scheda ESP32 collegata a un sensore di temperatura su breadboard — riferimento progetto](/images/illustrations/esp32-esphome-capteur-temperature.webp)

<p class="ai-illustration-caption">Illustrazione generata con IA</p>

## Cosa imparerete

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Voce</th>
<th scope="col">Dettaglio</th>
</tr></thead><tbody>
<tr>
<td data-label="Voce"><span class="td-val"><strong>Durata</strong></span></td>
<td data-label="Dettaglio"><span class="td-val">~60–90 min (prima volta)</span></td>
</tr>
<tr>
<td data-label="Voce"><span class="td-val"><strong>Livello</strong></span></td>
<td data-label="Dettaglio"><span class="td-val">Principiante (saldatura non richiesta)</span></td>
</tr>
<tr>
<td data-label="Voce"><span class="td-val"><strong>Risultato</strong></span></td>
<td data-label="Dettaglio"><span class="td-val">Entità <code>sensor.temperatura_*</code> e umidità in Home Assistant</span></td>
</tr>
</tbody>
</table>
</div>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Sigla</th>
<th scope="col">Significato</th>
</tr></thead><tbody>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>ESP32</strong></span></td>
<td data-label="Significato"><span class="td-val">Microcontrollore Espressif con Wi‑Fi (e spesso Bluetooth)</span></td>
</tr>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>ESPHome</strong></span></td>
<td data-label="Significato"><span class="td-val">Tool che genera firmware ESP32/8266 da YAML e si integra nativamente in HA</span></td>
</tr>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>YAML</strong></span></td>
<td data-label="Significato"><span class="td-val">Formato di configurazione a indentazione, leggibile anche senza essere programmatori</span></td>
</tr>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>DHT22</strong></span></td>
<td data-label="Significato"><span class="td-val">Sensore temperatura/umidità digitale (semplice, ±0,5 °C)</span></td>
</tr>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>BME280</strong></span></td>
<td data-label="Significato"><span class="td-val">Sensore I2C più preciso + <strong>pressione atmosferica</strong></span></td>
</tr>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>GPIO</strong></span></td>
<td data-label="Significato"><span class="td-val">Pin digitali della scheda (numerati GPIOx in ESPHome)</span></td>
</tr>
<tr>
<td data-label="Sigla"><span class="td-val"><strong>I2C</strong></span></td>
<td data-label="Significato"><span class="td-val">Bus a due fili (SDA/SCL) per sensori come BME280</span></td>
</tr>
</tbody>
</table>
</div>

Altri progetti simili: [10 idee ESP32 domotica](/it/domotica/progetti-esp32-domotica/).

## 1. Materiale necessario

### Essenziale

- **ESP32-C6-DevKitC-1** (consigliato: Wi‑Fi 6, compatibile ESPHome recente) oppure ESP32-S3 DevKit
- **DHT22 (AM2302)** *oppure* modulo **BME280** (I2C)
- Breadboard 400 punti, cavi Dupont, cavo **USB-C** dati (non solo ricarica)
- **Home Assistant** con add-on **ESPHome** installato

### Opzionale

- Resistenza **4,7 kΩ** (pull-up su linea DATA DHT22 se cavo > 20 cm)
- Alimentatore USB **5 V 1 A** per installazione fissa
- Scatola stampata 3D o ABS forato

**Amazon.it (affiliato tag roboteducat0f-21, prezzi da verificare)**

- [ESP32-C6 DevKit](https://www.amazon.it/s?k=ESP32-C6+DevKit&tag=roboteducat0f-21)
- [DHT22](https://www.amazon.it/s?k=DHT22&tag=roboteducat0f-21)
- [BME280](https://www.amazon.it/s?k=BME280+module&tag=roboteducat0f-21)
- [Kit breadboard e jumper](https://www.amazon.it/s?k=breadboard+jumper+kit&tag=roboteducat0f-21)

## 2. Installare l’add-on ESPHome

**ESPHome** compila il firmware dal YAML e lo carica via USB o OTA.

1. *Impostazioni → Add-on → Negozio add-on* → cercate **ESPHome**
2. **Installa** → attivate **Avvio automatico** e **Mostra nella barra laterale**
3. **Avvia** — compare **ESPHome** nel menu sinistro

Versione consigliata: ESPHome **2024.10+** (compatibilità ESP32-C6). La centralina deve essere sulla stessa rete **Wi‑Fi 2,4 GHz** del sensore (l’ESP32 non usa il 5 GHz).

## 3. Cablaggio DHT22 (variante principiante)

Collegate il sensore a **3,3 V** (non 5 V se il modulo non lo richiede esplicitamente).

DHT22              ESP32-C6 DevKit (esempio)
─────              ─────────────────────────
VCC (rosso)   →    3,3V
DATA (giallo) →    GPIO4
GND (nero)    →    GND

Opzionale: resistenza 4,7 kΩ tra 3,3V e DATA (pull-up)

**Nota pinout:** su altre board il GPIO4 può cambiare — controllate lo schema stampato sulla DevKit. Tenete il DHT lontano dal chip ESP32 (calore skew +2–5 °C).

### Variante BME280 (I2C)

BME280 VCC → 3,3V
BME280 GND → GND
BME280 SDA → GPIO6  (verificare pinout board)
BME280 SCL → GPIO7

Indirizzo I2C tipico: `0x76` o `0x77` (salta se il sensore non compare).

## 4. Creare il dispositivo in ESPHome

1. ESPHome → **Nuovo dispositivo**
2. Nome host: `sensore-salone` (solo minuscole e trattini)
3. Board: **ESP32-C6** → modello **esp32-c6-devkitc-1**
4. Inserite **SSID** e password Wi‑Fi **2,4 GHz**
5. **Modifica** il YAML generato (sezione successiva) prima del flash

## 5. YAML completo (DHT22)

Sostituite rete Wi‑Fi e, dopo il primo flash, conservate la chiave `api.encryption.key` generata.

esphome:
  name: sensore-salone
  friendly_name: Sensore salone

esp32:
  board: esp32-c6-devkitc-1
  variant: ESP32C6
  framework:
    type: esp-idf

wifi:
  ssid: "VostroSSID_2.4GHz"
  password: "VostraPasswordSicura"
  ap:
    ssid: "Sensore-Salone-Fallback"
    password: "12345678"

api:
  encryption:
    key: "GENERATA_DA_ESPHOME"

ota:
  - platform: esphome

logger:

sensor:
  - platform: dht
    pin: GPIO4
    model: DHT22
    temperature:
      name: "Temperatura salone"
      accuracy_decimals: 1
      filters:
        - offset: 0.0
    humidity:
      name: "Umidità salone"
      accuracy_decimals: 0
    update_interval: 60s

**BME280:** aggiungete prima del blocco `sensor:`:

i2c:
  sda: GPIO6
  scl: GPIO7
  scan: true

sensor:
  - platform: bme280_i2c
    address: 0x76
    temperature:
      name: "Temperatura salone"
    pressure:
      name: "Pressione salone"
    humidity:
      name: "Umidità salone"
    update_interval: 60s

## 6. Flash via USB

1. ESPHome → dispositivo → **Installa** → **Plug into this computer**
2. Autorizzate la porta seriale nel browser (Chrome/Edge)
3. Se fallisce: tenete **BOOT** premuto mentre inserite l’USB; usate cavo dati
4. Al termine, log ESPHome deve mostrare connessione Wi‑Fi e IP

Aggiornamenti successivi: **Install → Wirelessly (OTA)**.

## 7. Integrazione in Home Assistant

1. *Impostazioni → Dispositivi e servizi* — compare **ESPHome** con il nuovo nodo (o notifica « nuovo dispositivo »)
2. **Configura** → inserite la chiave API se richiesta (copiata dal YAML)
3. Entità tipiche: `sensor.temperatura_salone`, `sensor.umidita_salone`
4. Aggiungete una card **Entità** o **Grafico storico** al dashboard

Confronto con sensori a batteria: [sensore temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/) — niente cablaggio, ma serve coordinatore [ZHA o Zigbee2MQTT](/it/domotica/zigbee2mqtt-o-zha-home-assistant/).

## 8. Automazioni di esempio

Automazioni in *Impostazioni → Automazioni* (interfaccia) o YAML in `automations.yaml`.

### Riscaldamento sotto 19 °C (fascia giorno)

automation:
  - alias: "Riscaldamento salone sotto 19 C"
    trigger:
      - platform: numeric_state
        entity_id: sensor.temperatura_salone
        below: 19
    condition:
      - condition: time
        after: "06:00:00"
        before: "22:00:00"
    action:
      - service: climate.set_temperature
        target:
          entity_id: climate.termosifone_salone
        data:
          temperature: 20

Adattate `entity_id` al vostro termostato o [presa smart](/it/domotica/prese-smart/) su termoconvettore.

### Alert umidità alta (bagno / muffa)

automation:
  - alias: "Umidità salone troppo alta"
    trigger:
      - platform: numeric_state
        entity_id: sensor.umidita_salone
        above: 70
        for: "00:15:00"
    action:
      - service: notify.mobile_app_telefono
        data:
          title: "Umidità elevata"
          message: "Umidità salone {{ states('sensor.umidita_salone') }} % — aerare o deumidificare."

### Spegnimento riscaldamento sopra 21 °C

automation:
  - alias: "Stop riscaldamento sopra 21 C"
    trigger:
      - platform: numeric_state
        entity_id: sensor.temperatura_salone
        above: 21
    action:
      - service: switch.turn_off
        target:
          entity_id: switch.presa_termosifone_salone

## 9. Risoluzione problemi

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Problema</th>
<th scope="col">Causa probabile</th>
<th scope="col">Cosa fare</th>
</tr></thead><tbody>
<tr>
<td data-label="Problema"><span class="td-val">Wi‑Fi fallisce</span></td>
<td data-label="Causa probabile"><span class="td-val">SSID 5 GHz o guest isolato</span></td>
<td data-label="Cosa fare"><span class="td-val">Solo rete 2,4 GHz; disabilitare AP isolation</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val"><code>nan</code> su DHT22</span></td>
<td data-label="Causa probabile"><span class="td-val">Cablaggio, GPIO errato</span></td>
<td data-label="Cosa fare"><span class="td-val">Verificare 3,3V/GND/DATA; <code>update_interval</code> ≥ 60s</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">BME280 assente</span></td>
<td data-label="Causa probabile"><span class="td-val">Indirizzo I2C</span></td>
<td data-label="Cosa fare"><span class="td-val">Provare <code>0x77</code>; controllare SDA/SCL</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">+3–5 °C di errore</span></td>
<td data-label="Causa probabile"><span class="td-val">Calore ESP32</span></td>
<td data-label="Cosa fare"><span class="td-val">Allontanare sensore; <code>offset</code> nel filtro YAML</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">OTA fallisce</span></td>
<td data-label="Causa probabile"><span class="td-val">mDNS instabile</span></td>
<td data-label="Cosa fare"><span class="td-val">Aggiornare via IP fisso invece di <code>.local</code></span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">Entità non in HA</span></td>
<td data-label="Causa probabile"><span class="td-val">Firewall o chiave API</span></td>
<td data-label="Cosa fare"><span class="td-val">Ricontrollare integrazione ESPHome e log</span></td>
</tr>
</tbody>
</table>
</div>

## FAQ

**ESPHome senza Home Assistant?**  
Possibile in teoria, ma questo tutorial assume HA — è l’integrazione più semplice per automazioni.

**DHT22 o BME280?**  
**DHT22** per imparare; **BME280** se volete pressione e stabilità I2C.

**ESP32 alimentato a batteria?**  
Sì con deep sleep — progetto più avanzato; per salone usate USB 5 V.

**Meglio Zigbee?**  
Zigbee: pile, mesh, nessun cablaggio. ESP32: controllo totale, cablato, ideale per maker — [confronto sensori](/it/domotica/sensore-temperatura-zigbee/).

**Quale centralina?**  
Qualsiasi HA con add-on ESPHome; [Green vs Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/) se dovete ancora scegliere l’hardware.

## Per approfondire

- [Progetti ESP32 domotica](/it/domotica/progetti-esp32-domotica/)
- [Porta garage con smartphone (ESP32 + ESPHome)](/it/domotica/porta-garage-smartphone-esp32-esphome/)
- [Sensore temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/)
- [Installare Home Assistant su Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/)
- [Hub domotica](/it/domotica/)

---

*Affiliazione Amazon.it: tag **roboteducat0f-21**. Componenti generici: verificate compatibilità ESPHome prima dell’acquisto.*
