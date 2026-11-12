---
layout: ../../../layouts/DePost.astro
title: "Saugroboter unter 200 Euro: LiDAR und Home Assistant (2026)"
description: "Leistungsfähige Saugroboter im Budget-Segment mit LiDAR und App — worauf Sie in DE achten sollten, ohne erfundene Preise. Roborock Q7 M5, Dreame, Xiaomi im Überblick."
updated: "24. Oktober 2026"
---

Ein **leistungsfähiger Saugroboter mit LiDAR** ist im Budget-Segment erreichbar — Preise schwanken stark je nach Aktion und Händler. **Keine festen Euro-Beträge hier:** beim Kauf auf Amazon.de oder im Fachhandel den aktuellen Preis prüfen. Dieser Ratgeber nennt Kriterien und Modelle, die in Europa häufig angeboten werden.

## Schnelle Empfehlung: Roborock Q7 M5

- **Navigation:** LiDAR (kein Zufallsfahren)
- **Saugleistung:** laut Hersteller rund 4200 Pa (Datenblatt prüfen)
- **Laufzeit:** laut Hersteller bis ca. 180 Minuten — für viele Wohnungen ausreichend
- **Wischen:** einfaches feuchtes Pad (keine Rotation)
- **Home Assistant:** offizielle [Roborock-Integration](https://www.home-assistant.io/integrations/roborock/) (lokal nach Einrichtung)

Gut für Wohnungen mit Haustieren und als erster Roboter. [Roborock Q7 M5 bei Amazon.de](https://www.amazon.de/dp/B0DT4FJJXM?tag=roboteducat00-21) (Werbelink, Preis beim Händler).

## Alternativen (Preis beim Händler prüfen)

### Dreame D9 Max Gen 2

LiDAR, App Dreamehome (auch auf Deutsch). Home Assistant oft über **Community-Integration (HACS)**, nicht offiziell. Verfügbarkeit in DE schwankt.

### Xiaomi S40C

Einer der günstigeren LiDAR-Roboter; geringere Saugleistung laut Datenblatt — für Hartböden OK, dicker Teppich eingeschränkt. HA-Kompatibilität modellabhängig prüfen.

## Vergleichskriterien (ohne Preistabelle)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modell</th>
<th scope="col">LiDAR</th>
<th scope="col">Saugleistung (Hersteller)</th>
<th scope="col">Wischen</th>
<th scope="col">Home Assistant</th>
</tr></thead><tbody>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Roborock Q7 M5</strong></span></td>
<td data-label="LiDAR"><span class="td-val">ja</span></td>
<td data-label="Saugleistung (Hersteller)"><span class="td-val">hoch (ca. 4200 Pa)</span></td>
<td data-label="Wischen"><span class="td-val">Pad basic</span></td>
<td data-label="Home Assistant"><span class="td-val">offiziell</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Dreame D9 Max G2</strong></span></td>
<td data-label="LiDAR"><span class="td-val">ja</span></td>
<td data-label="Saugleistung (Hersteller)"><span class="td-val">hoch</span></td>
<td data-label="Wischen"><span class="td-val">ja</span></td>
<td data-label="Home Assistant"><span class="td-val">Community</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val"><strong>Xiaomi S40C</strong></span></td>
<td data-label="LiDAR"><span class="td-val">ja</span></td>
<td data-label="Saugleistung (Hersteller)"><span class="td-val">mittel</span></td>
<td data-label="Wischen"><span class="td-val">oft nein</span></td>
<td data-label="Home Assistant"><span class="td-val">prüfen</span></td>
</tr>
</tbody>
</table>
</div>

## Worauf achten

**Navigation:** unter 200 Euro **LiDAR verlangen** — Zufall oder reines Gyro spart am falschen Ende.

**Saugleistung:** für Teppich und Tierhaar eher 3000 Pa aufwärts laut Angabe; Datenblatt lesen.

**Laufzeit:** 120 Minuten decken typische Wohngrößen; größere Flächen: Roboter lädt nach und setzt fort.

**Wischen in dieser Preisklasse:** nur leichte Feuchtpflege, kein Scheuern.

## Modelle meiden

- Reine **Zufallsnavigation** (nur IR)
- Unbekannte No-Name-Marken ohne Support in DE
- Sehr niedrige Pa-Angaben für Teppich (< 2000 Pa laut Hersteller)

## Home Assistant

Roborock Q7 M5 über Integration **Roborock**. Andere Marken: [Saugroboter mit Home Assistant](/de/smart-home/saugroboter-home-assistant/).

automation:
  - alias: "Saugen wenn abwesend"
    trigger:
      platform: state
      entity_id: person.ihr_name
      to: "not_home"
      for: "00:15:00"
    action:
      - service: vacuum.start
        target:
          entity_id: vacuum.roborock_q7_m5

Zentrale fehlt noch? [Home Assistant Raspberry Pi 5](/de/smart-home/home-assistant-raspberry-pi-5-installation/).

## Alltagstipps

- Kabel, Socken, kleine Spielteile wegräumen
- LiDAR-Turm gelegentlich abwischen
- Staubbehälter regelmäßig leeren; Bürsten von Haaren befreien
- Höhe unter Möbeln vor dem Kauf messen

## Nächster Schritt: Station

Mit etwas höherem Budget: Modelle mit **Auto-Entleerungsstation** — seltener manuelles Entleeren. Details: [Wischstationen](/de/smart-home/saugroboter-wischstation-selbstreinigung/), [Navigation](/de/smart-home/saugroboter-navigation-lidar-kamera-gyro/).

Weitere Saugroboter [bei Amazon.de suchen](https://www.amazon.de/s?k=Saugroboter+LiDAR&tag=roboteducat00-21) (Werbelink).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
