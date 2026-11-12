---
layout: ../../../layouts/ItPost.astro
title: "Sensore Zigbee temperatura: SNZB-02D, Aqara (Home Assistant)"
description: "Confronto sensori temperatura e umidità Zigbee 2026: SONOFF SNZB-02D, Aqara T1, Tuya. Precisione, autonomia, posizionamento, automazioni riscaldamento in Home Assistant."
updated: "2 novembre 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/it/domotica/">Domotica</a> · Sensore temperatura Zigbee</nav>

> **Risposta rapida (novembre 2026)** — Per la maggior parte delle case: **SONOFF SNZB-02D** (display, ±0,2 °C, pile CR2450 ~2 anni). Serve pressione atmosferica o design e-ink? **Aqara T1**. Budget minimo senza display: **Tuya TS0201** (±0,5 °C accettabile per soglie semplici).

Guida del [percorso domotica](/it/domotica/) per chi usa **Home Assistant** con **ZHA** o **Zigbee2MQTT** (**Zigbee** = rete mesh a basso consumo; **ZHA** = integrazione Zigbee inclusa in Home Assistant).

Un **sensore temperatura Zigbee** monitora ogni stanza, automatizza il riscaldamento e avvisa se l’aria è troppo secca o se scende sotto lo zero. Confronto di cinque sensori Zigbee 3.0 popolari per Home Assistant (ZHA o Zigbee2MQTT).

## Scelta rapida: SONOFF SNZB-02D

- **Display LCD** integrato  
- Precisione **±0,2 °C**, umidità ±2 % RH  
- Autonomia **~2 anni** (CR2450)  
- Storico min/max 24 h sul display  

Compatibile ZHA e Zigbee2MQTT.

Link Amazon.it: [SONOFF SNZB-02D](https://www.amazon.it/dp/B0BYZP8NK2?tag=roboteducat0f-21), [confezione da 2](https://www.amazon.it/dp/B0BZCV658S?tag=roboteducat0f-21).

## Tabella comparativa

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modello</th>
<th scope="col">Misure</th>
<th scope="col">Display</th>
<th scope="col">Precisione</th>
<th scope="col">Autonomia</th>
<th scope="col">Pila</th>
<th scope="col">Per chi</th>
</tr></thead><tbody>
<tr>
<td data-label="Modello"><span class="td-val"><strong>SONOFF SNZB-02D</strong></span></td>
<td data-label="Misure"><span class="td-val">temp, umidità</span></td>
<td data-label="Display"><span class="td-val">LCD</span></td>
<td data-label="Precisione"><span class="td-val">±0,2 °C, ±2 %</span></td>
<td data-label="Autonomia"><span class="td-val">2 anni</span></td>
<td data-label="Pila"><span class="td-val">CR2450</span></td>
<td data-label="Per chi"><span class="td-val"><strong>miglior equilibrio</strong></span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>Aqara T1</strong></span></td>
<td data-label="Misure"><span class="td-val">temp, umidità, pressione</span></td>
<td data-label="Display"><span class="td-val">e-ink</span></td>
<td data-label="Precisione"><span class="td-val">±0,3 °C</span></td>
<td data-label="Autonomia"><span class="td-val">1–2 anni</span></td>
<td data-label="Pila"><span class="td-val">CR2032</span></td>
<td data-label="Per chi"><span class="td-val">design, pressione</span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>SONOFF SNZB-02P</strong></span></td>
<td data-label="Misure"><span class="td-val">temp, umidità</span></td>
<td data-label="Display"><span class="td-val">no</span></td>
<td data-label="Precisione"><span class="td-val">±0,4 °C</span></td>
<td data-label="Autonomia"><span class="td-val">1,5 anni</span></td>
<td data-label="Pila"><span class="td-val">CR2477</span></td>
<td data-label="Per chi"><span class="td-val">budget senza display</span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>Tuya TS0201</strong></span></td>
<td data-label="Misure"><span class="td-val">temp, umidità</span></td>
<td data-label="Display"><span class="td-val">no</span></td>
<td data-label="Precisione"><span class="td-val">±0,5 °C</span></td>
<td data-label="Autonomia"><span class="td-val">1 anno</span></td>
<td data-label="Pila"><span class="td-val">AAA ×2</span></td>
<td data-label="Per chi"><span class="td-val">prezzo minimo</span></td>
</tr>
<tr>
<td data-label="Modello"><span class="td-val"><strong>Aqara FP2</strong></span></td>
<td data-label="Misure"><span class="td-val">temp, umidità, <strong>presenza</strong></span></td>
<td data-label="Display"><span class="td-val">no</span></td>
<td data-label="Precisione"><span class="td-val">±0,5 °C</span></td>
<td data-label="Autonomia"><span class="td-val">USB-C</span></td>
<td data-label="Pila"><span class="td-val">rete</span></td>
<td data-label="Per chi"><span class="td-val">mmWave + bonus temp</span></td>
</tr>
</tbody>
</table>
</div>

Prezzi: verificare sul rivenditore.

## Dettaglio modelli

### SONOFF SNZB-02D — scelta consigliata

Display senza aprire HA, precisione top, compatto 4,3 cm. Uso: camera bambino, automazione termosifone, umidità bagno > 70 %.

### Aqara T1

E-ink elegante, pressione atmosferica per trend meteo locale. Leggermente meno preciso e pile CR2032 più piccole.

### SNZB-02P / Tuya

Senza display: controllo solo da app. Tuya ±0,5 °C accettabile per automazioni a soglia ±1 °C.

### Aqara FP2

Presenza mmWave + temperatura; prezzo alto se serve solo la temperatura.

## Come scegliere

1. **Display?** SNZB-02D o Aqara T1 sì; SNZB-02P / Tuya no.  
2. **Precisione**: ±0,2 °C (SNZB-02D) per riscaldamento fine; ±0,5 °C va bene per « accendi se < 19 °C ».  
3. **Autonomia**: CR2450 (2 anni) vs AAA annuali.  
4. **Quanti sensori**: studio 1; 50 m² → 2; 80 m² → 3; 120 m² → 4–5 (una stanza riscaldata rilevante ciascuno).

## Posizionamento

**Sì**: centro stanza, 1,2–1,8 m, ombra, mensola.  
**No**: vicino finestra, sopra termosifone, cucina fornelli, bagno vapore intenso.

**Portata Zigbee**: 10–15 m indoor; oltre, aggiungete [prese Zigbee ripetitore](/it/domotica/prese-smart/).

## Appairing ZHA

1. Home Assistant → ZHA → Aggiungi  
2. Togliere linguetta pile SNZB-02D  
3. Pulsante **5 secondi**, LED lampeggia  
4. Rinominare e assegnare area  

Entità: `sensor.snzb_02d_salone_temperature`, umidità, batteria.

### Calibrazione (opzionale)

sensor:
  - platform: template
    sensors:
      temperature_salone_calibrata:
        friendly_name: "Temperatura salone (calibrata)"
        unit_of_measurement: "°C"
        value_template: "{{ states('sensor.snzb_02d_salone_temperature')|float - 0.5 }}"

## Automazioni utili

**Riscaldamento < 19 °C** (6:00–22:00), **alert camera bambino** fuori 17–24 °C, **umidità > 70 %** in cantina, **grafico storico** 7 giorni in Lovelace.

## Problemi comuni

- **Non si appaia**: avvicinare chiavetta, reset 10 s, pile nuove Duracell/Energizer.  
- **Temperatura errata**: spostare al centro stanza, calibrare se > 1,5 °C di scarto vs termometro di riferimento.  
- **Umidità bloccata a 99 %**: condensa — asciugare sensore, evitare stanze > 80 % RH.

## Temperatura e umidità ideali

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Stanza</th>
<th scope="col">Temp. giorno</th>
<th scope="col">Notte</th>
</tr></thead><tbody>
<tr>
<td data-label="Stanza"><span class="td-val">Soggiorno</span></td>
<td data-label="Temp. giorno"><span class="td-val">19–21 °C</span></td>
<td data-label="Notte"><span class="td-val">18–19 °C</span></td>
</tr>
<tr>
<td data-label="Stanza"><span class="td-val">Camera</span></td>
<td data-label="Temp. giorno"><span class="td-val">18–20 °C</span></td>
<td data-label="Notte"><span class="td-val">16–18 °C</span></td>
</tr>
<tr>
<td data-label="Stanza"><span class="td-val">Bambini</span></td>
<td data-label="Temp. giorno"><span class="td-val">18–20 °C</span></td>
<td data-label="Notte"><span class="td-val">18–19 °C</span></td>
</tr>
</tbody>
</table>
</div>

Umidità confort **40–60 %** (OMS).

## FAQ

**±0,5 °C basta per il riscaldamento?** Sì per soglie tipo 19 °C.  
**Quanti sensori per 100 m²?** 4–5.  
**Zigbee vs ESP32 DIY?** Zigbee: pile, plug-and-play. ESP32: USB, personalizzabile — [tutorial ESP32](/it/domotica/esp32-esphome-sensore-temperatura/).  
**Esterno?** IP20: no; serve box IP65 o ESP32 in contenitore stagno.

Vedi anche [Zigbee2MQTT o ZHA](/it/domotica/zigbee2mqtt-o-zha-home-assistant/), [installare Home Assistant](/it/domotica/installare-home-assistant-raspberry-pi-5/), [miglior chiavetta Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

*Affiliazione Amazon.it tag roboteducat0f-21. Prezzi ottobre 2026, indicativi.*

[Tutte le guide](/it/domotica/)
