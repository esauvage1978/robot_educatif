---
layout: ../../../layouts/ItPost.astro
title: "Aprire il garage dallo smartphone con ESP32, ESPHome e Home Assistant"
description: "Tutorial sicuro: relè a contatto pulito sul pulsante della motorizzazione, sensore reed, entità cover in app mobile, YAML ESPHome completo."
updated: "24 ottobre 2026"
---

Comandare il garage dal telefono e **sapere se è rimasto aperto**: relè **in parallelo al pulsante a muro** (impulso come un dito) + **reed** per stato reale + entità `cover` in Home Assistant.

## Sicurezza — leggete prima

- Verificate in **manuale motorizzazione** l’ingresso **pulsante / contatto pulito** basse tensioni.  
- **Mai 230 V** senza competenza: lavorare solo sul bornier BT con corrente tagliata.  
- Mantenete fotocellule e sicurezza anti-schiacciamento.  
- Accesso remoto: Nabu Casa, Tailscale o VPN — non esporre HA su Internet senza protezione.  
- **Conferma** in app prima di azionare.  
- Comando remoto solo se nessuno sotto la porta.

## Obiettivo e tempi

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Durata</th>
<th scope="col">Livello</th>
<th scope="col">Budget</th>
</tr></thead><tbody>
<tr>
<td data-label="Durata"><span class="td-val">2–3 h</span></td>
<td data-label="Livello"><span class="td-val">intermedio</span></td>
<td data-label="Budget"><span class="td-val">ESP32, relè 3,3 V, reed — componenti comuni su Amazon.it</span></td>
</tr>
</tbody>
</table>
</div>

## Materiale

- ESP32 DevKit ([Amazon.it ESP32](https://www.amazon.it/s?k=ESP32+DevKit&tag=roboteducat0f-21))  
- Modulo relè **1 canale compatibile 3,3 V** in ingresso  
- Contatto reed filare  
- Alimentatore USB 5 V  

## Cablaggio

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Elemento</th>
<th scope="col">Verso</th>
</tr></thead><tbody>
<tr>
<td data-label="Elemento"><span class="td-val">Relè IN</span></td>
<td data-label="Verso"><span class="td-val">GPIO26</span></td>
</tr>
<tr>
<td data-label="Elemento"><span class="td-val">Relè COM/NO</span></td>
<td data-label="Verso"><span class="td-val">parallelo al pulsante muro (contatto pulito motorizzazione)</span></td>
</tr>
<tr>
<td data-label="Elemento"><span class="td-val">Reed</span></td>
<td data-label="Verso"><span class="td-val">GPIO27 e GND (pull-up interno)</span></td>
</tr>
</tbody>
</table>
</div>

Reed chiuso = porta **chiusa** (aimant vicino).

## ESPHome — logica essenziale

Relè impulso ~700 ms (`restore_mode: ALWAYS_OFF`). Template `cover` con `open_action` solo se reed dice chiuso, `close_action` solo se aperto — evita di chiudere per errore su singolo pulsante.

Scaricare YAML completo: `/code/esphome/porte-garage.yaml` (stesso contenuto del tutorial FR).

Primo flash USB, poi OTA.

## Home Assistant mobile

Card con `confirmation` prima del toggle. Automazione « garage aperto 15 min » → notifica.

## Note

Dopo blackout ESP32 riparte da solo; relè off al boot = niente impulso accidentale.

Errori: relè su alimentazione invece che ingresso pulsante; relè 5 V che non scatta a 3,3 V; port forwarding HA aperto.

Vedi anche: [sensore ESP32](/it/domotica/esp32-esphome-sensore-temperatura/), [progetti ESP32](/it/domotica/progetti-esp32-domotica/), [sensore porta su Pi](/it/domotica/raspberry-pi-sensore-porta-notifica/).

Documentazione verificata con `esphome config` / compile; cablaggio segue **vostro** manuale motorizzazione.

[Tutte le guide](/it/domotica/)
