---
layout: ../../../layouts/DePost.astro
title: "Notstrom für Home Assistant: USV oder Powerstation, Autonomie berechnen"
description: "Pi 5, Green, Fritzbox und Zigbee-Mesh bei Stromausfall: messen statt schätzen, USV vs. Powerstation, NUT in HA, sauberes Herunterfahren — 230 V Schuko, DE/AT/CH."
updated: "24. Oktober 2026"
---

Kurze **Stromausfälle** in Deutschland (Gewitter, Netzstörung) rebooten Home Assistant, die **Fritzbox** und Teile des **Zigbee-Mesh**. Länger ausfallende Alarme und Leck-Sensoren fehlen genau dann. Dieser Ratgeber hilft beim **Dimensionieren**, der Wahl zwischen **USV** und **Powerstation**, MQTT/NUT-Anbindung und **sauberem Shutdown** — **ohne erfundene Preise**.

Voraussetzung: laufendes [Home Assistant OS](/de/smart-home/home-assistant-raspberry-pi-5-installation/), Handy-App für Benachrichtigungen, **Steckdosen-Zähler** oder Wattmeter.

## Schritt 1: Was muss weiterlaufen?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Gerät</th>
<th scope="col">Warum</th>
</tr></thead><tbody>
<tr>
<td data-label="Gerät"><span class="td-val">Home Assistant (Pi 5, Green …)</span></td>
<td data-label="Warum"><span class="td-val">Automatisierungen, Historie, Push</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Zigbee-USB-Stick</span></td>
<td data-label="Warum"><span class="td-val">bereits im Pi-Verbrauch enthalten</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val"><strong>Fritzbox / Router / ONT</strong></span></td>
<td data-label="Warum"><span class="td-val">sonst keine Push-Meldungen</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Netzwerk-Switch</span></td>
<td data-label="Warum"><span class="td-val">ohne Switch kein LAN</span></td>
</tr>
</tbody>
</table>
</div>

**Batterie-Zigbee-Sensoren** laufen weiter; **Schuko-Steckdosen als Router** fallen aus — entfernte Sensoren können offline gehen (Karte in ZHA/Z2M prüfen).

## Schritt 2: Messen

Etiketten-Watt sind **Maximalwerte**. Jede Last **1 h** mit Wattmeter messen (oder smarte Steckdose mit Leistung in HA).

Richtwerte (Quelle Hersteller, real messen):

- **Home Assistant Green:** ca. 1,7–3 W laut [HA-Green-Doku](https://www.home-assistant.io/green/)
- **Raspberry Pi 5:** Netzteil 27 W ist Obergrenze — typisch deutlich weniger am Server, **messen**
- **Fritzbox:** oft **mehr als der Pi** — unbedingt messen

## Schritt 3: Autonomie

- **P** = Summe gemessener W (W)
- **E** = Kapazität (Wh) × nutzbarer Anteil × Wirkungsgrad Ausgang
- **t (h) = E / P**
- Für **24 h** bei P=20 W und 85 % Wirkung, 90 % nutzbar: C ≈ 20×24/(0,85×0,9) ≈ **630 Wh**

Green optional an **12 V DC** der Powerstation (Doppelwandler vermeiden) — nur wenn Spannung, Strom und Stecker laut Station **passen**.

## Schritt 4: USV oder Powerstation?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">USV</th>
<th scope="col">Powerstation</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Typisch</span></td>
<td data-label="USV"><span class="td-val">Minuten bis wenige Stunden</span></td>
<td data-label="Powerstation"><span class="td-val">viele Stunden</span></td>
</tr>
<tr>
<td><span class="td-val">Umschaltzeit</span></td>
<td data-label="USV"><span class="td-val">für USV angegeben</span></td>
<td data-label="Powerstation"><span class="td-val">nur mit <strong>UPS/EPS</strong>-Funktion — Datenblatt!</span></td>
</tr>
<tr>
<td><span class="td-val">HA-Anbindung</span></td>
<td data-label="USV"><span class="td-val">oft <strong>USB + NUT</strong></span></td>
<td data-label="Powerstation"><span class="td-val">selten NUT, oft App/Cloud</span></td>
</tr>
<tr>
<td><span class="td-val">Dauerbetrieb am Netz</span></td>
<td data-label="USV"><span class="td-val">USV dafür ausgelegt</span></td>
<td data-label="Powerstation"><span class="td-val">manche Hersteller warnen — Handbuch lesen</span></td>
</tr>
</tbody>
</table>
</div>

**Passthrough ≠ UPS.** Ohne dokumentierte kurze Umschaltzeit bootet der Pi.

USV mit USB: [Amazon.de Suche UPS HID](https://www.amazon.de/s?k=USV+USB+HID&tag=roboteducat00-21) (Werbelink). NUT-HCL: [networkupstools.org](https://networkupstools.org/stable-hcl.html).

## Schritt 5: Test

Alles Secourables an USV/Station, laden, **Netzstecker der USV ziehen** (nicht nur Gerät ausschalten), 30 Min. beobachten, Ladeverlust in % → reale Autonomie.

## Schritt 6: NUT in Home Assistant

1. USV per USB am HA-Host
2. Add-on **Network UPS Tools** (Community)
3. Integration **NUT** — Sensoren `ups_status`, `ups_battery_charge`

## Schritt 7: Automatisierung

Benachrichtigung bei Batteriebetrieb; unter 25 % Ladung **und** noch auf Batterie → `hassio.host_shutdown` nach 2 Min. Verzögerung (Entität prüfen unter *Entwicklerwerkzeuge → Aktionen*).

Ohne NUT: **ESP32-Temperatursensor** an **nicht** gesicherter Steckdose als Stromausfall-Indikator (`unavailable`).

## Schritt 8: Neustart nach Stromrückkehr

Nach sauberem Shutdown startet Pi/Green oft erst wieder, wenn die **Ausgangsspannung kurz unterbrochen** wurde — je nach USV Handbuch oder manuell Station ein/aus.

Quellen: [HA NUT](https://www.home-assistant.io/integrations/nut/), [Add-on NUT](https://github.com/hassio-addons/addon-nut).

Weiter: [Einstieg](/de/smart-home/einstieg/), [Solar-Außenkamera](/de/smart-home/solar-aussenkamera-iegeek/), [ESP32](/de/smart-home/esp32-esphome-temperatursensor/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
