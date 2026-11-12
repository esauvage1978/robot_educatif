---
layout: ../../../layouts/DePost.astro
title: "Saugroboter mit Home Assistant: Marken, Integration und lokale Steuerung"
description: "Roborock, iRobot, Ecovacs, SwitchBot, Shark, Xiaomi, Dreame und Matter: offizielle und Community-Integrationen in Home Assistant — Stand Oktober 2026, für den deutschsprachigen Raum."
updated: "24. Oktober 2026"
---

Ein Saugroboter wird richtig nützlich, wenn er **von selbst startet** — wenn niemand zu Hause ist oder nur die Küche gereinigt werden soll. Dafür muss er in Home Assistant erscheinen. Nicht jede Marke integriert sich gleich: lokal, über die Cloud oder nur per Community. Die Tabelle folgt der [Home-Assistant-Dokumentation](https://www.home-assistant.io/integrations/#vacuum) (IoT-Klasse pro Integration, Oktober 2026).

<figure>
<img src="/images/schemas/ha-aspirateur.svg" alt="Zwei Wege: der Roboter erreicht Home Assistant im lokalen Netz oder über die Hersteller-Cloud" width="780" height="672" />
<figcaption>Grüner Pfeil: der Roboter spricht im lokalen Netz mit Home Assistant. Oranger Pfeil: die Befehle laufen über die Cloud des Herstellers. Die Tabelle nennt den Weg, den die Home-Assistant-Dokumentation für jede Marke beschreibt.</figcaption>
</figure>

## Übersicht

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Marke</th>
<th scope="col">Integration</th>
<th scope="col">Verbindung (laut HA-Doku)</th>
<th scope="col">Hinweis</th>
</tr></thead><tbody>
<tr>
<td data-label="Marke"><span class="td-val"><strong>Roborock</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roborock/">Roborock</a> (offiziell)</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">Local Polling</span></td>
<td data-label="Hinweis"><span class="td-val">Konto für Einrichtung, danach lokal</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>iRobot Roomba / Braava</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roomba/">Roomba</a> (offiziell)</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">Local Push</span></td>
<td data-label="Hinweis"><span class="td-val">WLAN-Modelle</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>Ecovacs</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/ecovacs/">Ecovacs</a> (offiziell)</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">Cloud Push</span></td>
<td data-label="Hinweis"><span class="td-val">abhängig von Ecovacs-Cloud</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>SwitchBot</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/switchbot_cloud/">SwitchBot Cloud</a> (offiziell)</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">Cloud Polling</span></td>
<td data-label="Hinweis"><span class="td-val">u. a. K10+, S10, S20</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>Shark</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/sharkiq/">Shark IQ</a> (offiziell)</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">Cloud Polling</span></td>
<td data-label="Hinweis"><span class="td-val">Shark-IQ-Serie</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>Xiaomi (ältere Modelle)</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/xiaomi_miio/">Xiaomi Miio</a> (offiziiel)</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">Local Polling</span></td>
<td data-label="Hinweis"><span class="td-val">modellabhängig</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>Dreame</strong></span></td>
<td data-label="Integration"><span class="td-val">keine offizielle Integration</span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">—</span></td>
<td data-label="Hinweis"><span class="td-val">oft HACS (Community)</span></td>
</tr>
<tr>
<td data-label="Marke"><span class="td-val"><strong>Matter-Roboter</strong></span></td>
<td data-label="Integration"><span class="td-val"><a href="https://www.home-assistant.io/integrations/matter/">Matter</a></span></td>
<td data-label="Verbindung (laut HA-Doku)"><span class="td-val">lokal</span></td>
<td data-label="Hinweis"><span class="td-val">Kategorie „Vacuum“ ab Matter 1.2 (<a href="https://csa-iot.org/newsroom/matter-1-2-arrives-with-nine-new-device-types-improvements-across-the-board/">CSA</a>)</span></td>
</tr>
</tbody>
</table>
</div>

**Empfehlung:** **Roborock** — offizielle Integration, lokale Steuerung, Räume, Verbrauchsmaterial, Fehler. Budget-Tipp: [Saugroboter unter 200 Euro](/de/smart-home/saugroboter-unter-200-euro/) (Roborock Q7 M5). Saugroboter [bei Amazon.de](https://www.amazon.de/s?k=Roborock+Saugroboter&tag=roboteducat00-21) (Werbelink).

## Lokal oder Cloud

- **Lokal:** Befehle gehen direkt im LAN — schnell, funktioniert bei Internetausfall.
- **Cloud:** Befehle über Hersteller-Server — anfällig für API-Änderungen oder Dienstende.

Langfristig: Integration mit **Local** in der HA-Doku bevorzugen.

## Automatisierungen

Entität `vacuum` — Beispiele: Reinigung wenn alle `zone.home` verlassen haben; Küche nach dem Essen; Benachrichtigung bei vollem Behälter; Verschleiß Bürsten/FILTER.

automation:
  - alias: "Reinigung wenn niemand zu Hause"
    trigger:
      - platform: state
        entity_id: zone.home
        to: "0"
        for: "00:15:00"
    action:
      - action: vacuum.start
        target:
          entity_id: vacuum.robot_wohnzimmer

Entitäts-ID anpassen.

## Vor dem Kauf

1. Exaktes Modell in der Integrationsseite der Marke suchen.
2. **Offiziell** und **lokal** prüfen.
3. Navigation: LiDAR für Raumreinigung — [LiDAR, Kamera, Gyro](/de/smart-home/saugroboter-navigation-lidar-kamera-gyro/).
4. Wischfunktion und Station: [Wischroboter und Stationen](/de/smart-home/saugroboter-wischstation-selbstreinigung/).

Noch keine Zentrale? [Home Assistant auf Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
