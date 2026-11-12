---
layout: ../../../layouts/ItPost.astro
title: "Installare Home Assistant su Raspberry Pi 5: guida completa 2026"
description: "Passo passo: Home Assistant OS su Raspberry Pi 5, boot NVMe, rete, HACS, backup, chiavetta Zigbee, accesso remoto sicuro. Aggiornato ottobre 2026, contesto Italia."
updated: "24 ottobre 2026"
---

**Home Assistant su Raspberry Pi 5** nel 2026 è semplice con **Raspberry Pi Imager** e boot su SSD NVMe. Da hardware al primo sensore Zigbee: rete, backup, HACS e accesso remoto. In Italia usate alimentazione **27 W ufficiale**, cavo Ethernet al router (Wi-Fi sconsigliato con Zigbee 2,4 GHz) e fuseau **Europe/Rome**.

## Hardware consigliato

- **Raspberry Pi 5 4 GB** — sufficiente per ~30 dispositivi e poche telecamere  
- **Pi 5 8 GB** — Frigate, NAS leggero, 50+ entità  
- **Alimentatore ufficiale 27 W USB-C** — critico (sottodimensionato = freeze)  
- **microSD SanDisk Extreme 64 GB** o **NVMe 256 GB** + HAT M.2 (consigliato per durata)  
- **Case con ventola** (ufficiale o Argon NEO 5 per silenzio)  
- **SONOFF ZBDongle-E** per Zigbee — [confronto chiavette](/it/domotica/miglior-chiavetta-zigbee-home-assistant/)

Link ricerca Amazon.it (prezzi variabili): [Pi 5 4 GB](https://www.amazon.it/s?k=raspberry+pi+5+4gb&tag=roboteducat0f-21), [alimentatore 27W](https://www.amazon.it/s?k=raspberry+pi+power+supply+27w&tag=roboteducat0f-21), [ZBDongle-E](https://www.amazon.it/dp/B0B6P22YJC?tag=roboteducat0f-21).

**NVMe vs SD**: ~5× velocità, meno corruzione; 256 GB Crucial P3 basta per HA + storico.

## Passo 1: flash SD o NVMe

1. [Raspberry Pi Imager](https://www.raspberrypi.com/software/)  
2. Dispositivo: **Raspberry Pi 5**  
3. OS: **Other → Home Assistant** (HAOS 13+)  
4. Storage: SD o SSD via adattatore  
5. Impostazioni (ingranaggio): hostname `homeassistant`, locale **Europe/Rome**, tastiera IT se serve  
6. Scrivi (10–15 min)

Boot **solo NVMe**: firmware Pi 5 recente; SSD su HAT M.2, niente SD.

## Passo 2: primo avvio

Ethernet al router, alimentazione. Primo boot **5–8 min** (download container). Browser: **`http://homeassistant.local:8123`** oppure IP dal pannello del router (TIM, Fastweb, Fritz! Box, ecc.).

Account admin, nome casa, posizione sulla mappa (automazioni sole), unità metriche, **EUR**.

## Passo 3: rete (opzionale)

**IP riservato DHCP** sul router (consigliato). Wi-Fi solo se necessario: Pi 5 Wi-Fi = 2,4 GHz, latenza e conflitto con Zigbee.

## Passo 4: aggiornamenti

*Impostazioni → Sistema → Aggiornamenti* — Core, Supervisor, OS. Aggiornamenti automatici solo per add-on se volete controllo manuale su Core.

## Passo 5: primo backup

*Sistema → Backup* — backup completo, scaricare `.tar` su PC/NAS. Add-on **Google Drive Backup** opzionale.

## Passo 6: HACS

Add-on **Terminal & SSH**, poi:

wget -O - https://get.hacs.xyz | bash -

Riavvio, integrazione **HACS** (account GitHub gratuito).

## Passo 7: Zigbee con ZHA

1. ZBDongle-E su USB (prolunga consigliata)  
2. *Dispositivi e servizi → Aggiungi → ZHA*  
3. Porta `/dev/ttyUSB0` o `/dev/ttyACM0`, radio EZSP per ZBDongle-E  
4. Appairing es. [SONOFF SNZB-02D](/it/domotica/sensore-temperatura-zigbee/)

Alternativa: [Zigbee2MQTT](/it/domotica/zigbee2mqtt-o-zha-home-assistant/).

## Passo 8: add-on utili

**File editor**, **Studio Code Server**, **ESPHome**, **Samba share**, **Terminal & SSH**.

## Passo 9: prima automazione

Esempio: accendi [presa smart](/it/domotica/prese-smart/) se temperatura < 19 °C (6:00–22:00). Interfaccia grafica o YAML in `automations.yaml`.

## Passo 10: accesso remoto

1. **Nabu Casa** (a pagamento, semplice, niente port forwarding)  
2. **DuckDNS + Let's Encrypt** (gratis, richiede IP pubblico e port forwarding 443 — attenzione sicurezza)  
3. **Tailscale** (VPN WireGuard, consigliato per sicurezza)

In Italia molti FWA/ CGNAT complicano DuckDNS: Tailscale o Nabu Casa sono spesso più pratici.

## Troubleshooting

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Problema</th>
<th scope="col">Azione</th>
</tr></thead><tbody>
<tr>
<td data-label="Problema"><span class="td-val">LED verde 4 lampeggi</span></td>
<td data-label="Azione"><span class="td-val">SD/NVMe o firmware; reflashing</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val"><code>homeassistant.local</code> non risolve</span></td>
<td data-label="Azione"><span class="td-val">IP diretta; Bonjour su Windows</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">Freeze / undervoltage</span></td>
<td data-label="Azione"><span class="td-val">Alimentatore 27 W ufficiale</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">Chiavetta assente</span></td>
<td data-label="Azione"><span class="td-val">Porta USB diversa, no hub non alimentato</span></td>
</tr>
<tr>
<td data-label="Problema"><span class="td-val">SD corrotta dopo mesi</span></td>
<td data-label="Azione"><span class="td-val">NVMe + <code>recorder.purge_keep_days: 7</code></span></td>
</tr>
</tbody>
</table>
</div>

Confronto hardware: [Home Assistant Green vs Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/).

## Tutorial sensori su Raspberry Pi

- [CO2 SCD41 + MQTT](/it/domotica/raspberry-pi-co2-scd41-home-assistant/)
- [Stazione meteo BME280](/it/domotica/raspberry-pi-stazione-meteo-bme280/)
- [PIR e luci](/it/domotica/raspberry-pi-sensore-movimento-luci/)
- [Sensore porta + notifica](/it/domotica/raspberry-pi-sensore-porta-notifica/)

Backup elettrico: [UPS e stazione](/it/domotica/backup-elettrico-home-assistant/).

*Affiliazione Amazon.it tag roboteducat0f-21.*

[Tutte le guide](/it/domotica/)
