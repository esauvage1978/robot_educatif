---
layout: ../../../layouts/ItPost.astro
title: "Backup elettrico per Home Assistant: UPS o power station, autonomia e spegnimento sicuro"
description: "Tenere HA (Pi 5 o Green), router e Zigbee accesi durante black-out: calcolo consumi e autonomia, UPS vs stazione portatile, NUT, alert e shutdown."
updated: "24 ottobre 2026"
---

Anche pochi secondi senza corrente riavviano Home Assistant, il router e parte dello Zigbee. In blackout più lunghi spariscono allarmi e notifiche proprio quando servirebbero. Guida per **dimensionare** il backup, scegliere **UPS o power station**, portare lo stato batteria in HA e **spegnere in sicurezza** prima dello scarico totale.

Punto spesso dimenticato: la **mesh Zigbee** dipende da prese/lampade a rete — senza backup su di esse, sensori lontani possono cadere.

## Obiettivo

- Misurare i watt del « cuore » domotico  
- Calcolare autonomia o capacità Wh necessaria  
- Bascule secteur→batterie compatibile  
- Notifiche e `hassio.host_shutdown` sotto soglia

## Cosa tenere acceso

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Apparecchio</th>
<th scope="col">Perché</th>
</tr></thead><tbody>
<tr>
<td data-label="Apparecchio"><span class="td-val">Server HA (Pi 5, Green…)</span></td>
<td data-label="Perché"><span class="td-val">automazioni, storico, push</span></td>
</tr>
<tr>
<td data-label="Apparecchio"><span class="td-val">Chiavetta/coordinatore Zigbee</span></td>
<td data-label="Perché"><span class="td-val">link sensori</span></td>
</tr>
<tr>
<td data-label="Apparecchio"><span class="td-val">Router / ONT fibra</span></td>
<td data-label="Perché"><span class="td-val">notifiche e accesso remoto</span></td>
</tr>
<tr>
<td data-label="Apparecchio"><span class="td-val">Switch LAN se presente</span></td>
<td data-label="Perché"><span class="td-val">rete locale</span></td>
</tr>
</tbody>
</table>
</div>

Sensori a **batteria** no. **Prese Zigbee a rete** = router mesh: valutate quali restano alimentate.

## Misurare e calcolare

**P** = somma watt reali (wattmetro o presa smart in HA).  
**Autonomia (h) ≈ Wh × η_uso × η_inverter / P**.

Esempio prudente: Green ~3 W + router misurato 15 W + switch 2 W → **P = 20 W**.  
Stazione 300 Wh, uscita 230 V, η ~0,85×0,9 → **~11,5 h**.  
Per **24 h**: ~630 Wh.

Il **router** pesa spesso più del server HA. Togliete dalla presa di backup tutto il non essenziale.

**Green in 12 V DC**: se la stazione ha uscita 12 V compatibile (5,5×2,1 mm, 1 A), evitate doppia conversione — verificate sempre manuale stazione.

## UPS vs power station

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">UPS</th>
<th scope="col">Power station</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Uso</span></td>
<td data-label="UPS"><span class="td-val">minuti–ore + shutdown</span></td>
<td data-label="Power station"><span class="td-val">riserva grande, anche portatile</span></td>
</tr>
<tr>
<td><span class="td-val">Bascule</span></td>
<td data-label="UPS"><span class="td-val">progettata per UPS</span></td>
<td data-label="Power station"><span class="td-val">solo se funzione <strong>UPS/EPS</strong> in scheda</span></td>
</tr>
<tr>
<td><span class="td-val">HA</span></td>
<td data-label="UPS"><span class="td-val">spesso USB + <strong>NUT</strong></span></td>
<td data-label="Power station"><span class="td-val">raro NUT; app cloud spesso</span></td>
</tr>
<tr>
<td><span class="td-val">Autonomia @ 20 W</span></td>
<td data-label="UPS"><span class="td-val">ore tipiche</span></td>
<td data-label="Power station"><span class="td-val">mezza giornata+</span></td>
</tr>
</tbody>
</table>
</div>

Attenzione: **passthrough** ≠ UPS garantito. Leggete **tempo di switchover** in scheda tecnica.

UPS con USB: [ricerca Amazon.it](https://www.amazon.it/s?k=ups+usb+nut&tag=roboteducat0f-21). Confrontate modelli su [lista NUT](https://networkupstools.org/stable-hcl.html).

## Test reale

Carica piena → staccare **spina a muro** dell’UPS/stazione → server non reboot, Zigbee risponde → misurare % batteria in 30 min e ricalibrare autonomia.

## NUT in Home Assistant

1. UPS USB al server HA  
2. Add-on **Network UPS Tools**  
3. Integrazione **NUT** → `sensor.ups_status`, `sensor.ups_battery_charge`

Stazioni senza NUT: **sentinella** su presa **non** backup (ESP32 ESPHome o presa smart: `unavailable` = blackout rete).

## Automazioni

Notifica su `On Battery`; sotto **25 %** carica e ancora su batteria → avviso + delay 2 min → `hassio.host_shutdown` (con **condizione** ancora su batteria).

## Riavvio dopo corrente

Dopo shutdown pulito, Pi/Green ripartono solo se **alimentazione viene tolta e ripristinata**. Verificate comportamento UPS/stazione; notifica « HA avviato » utile.

## Errori

Dimensionare su etichetta alimentatore; dimenticare router; passthrough = UPS; carichi pesanti sulla presa di backup; integrazioni cloud batteria inutile se router morto.

Vedi [installare HA](/it/domotica/installare-home-assistant-raspberry-pi-5/), [CO2 Pi](/it/domotica/raspberry-pi-co2-scd41-home-assistant/), [telecamera solare](/it/domotica/telecamera-esterna-solare-iegeek/).

[Tutte le guide](/it/domotica/)
