---
layout: ../../../layouts/DePost.astro
title: "Saugroboter-Navigation: LiDAR, Kamera oder Gyro"
description: "LiDAR, vSLAM-Kamera oder Gyroskop: Karte, Raumreinigung und Home Assistant. Kaufberatung mit Beispielmodellen, ohne erfundene Leistungszahlen."
updated: "3. November 2026"
---

> **Kurzantwort** — Für die meisten Wohnungen lohnt sich **LiDAR** (Laser-Karte, funktioniert im Dunkeln). **Gyro** reicht für kleine, rechteckige Räume. **Kamera (vSLAM)** ist gut bei Tageslicht, empfindlich bei wenig Licht.

Einsteiger-Hub: [Smart Home Einstieg](/de/smart-home/einstieg/) · Saugroboter in HA: [Integration](/de/smart-home/saugroboter-home-assistant/) · Budget: [unter 200 €](/de/smart-home/saugroboter-unter-200-euro/).

![Saugroboter mit LiDAR-Turm — Illustration](/images/blog-thumbnails/robot-aspirateur-navigation-lidar-camera-gyroscope.webp)

*Illustration — Navigationstechnologien, robot-educatif.info.*

## Sigle & Begriffe

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Kürzel</th>
<th scope="col">Bedeutung</th>
</tr></thead><tbody>
<tr>
<td data-label="Kürzel"><span class="td-val"><strong>LiDAR</strong></span></td>
<td data-label="Bedeutung"><span class="td-val"><em>Light Detection and Ranging</em> — drehender Laser misst Abstände und baut eine Karte</span></td>
</tr>
<tr>
<td data-label="Kürzel"><span class="td-val"><strong>vSLAM</strong></span></td>
<td data-label="Bedeutung"><span class="td-val"><em>visual Simultaneous Localization and Mapping</em> — Kamera erkennt Landmarken</span></td>
</tr>
<tr>
<td data-label="Kürzel"><span class="td-val"><strong>HA</strong></span></td>
<td data-label="Bedeutung"><span class="td-val"><em>Home Assistant</em> — Open-Source-Zentrale für Automatisierung</span></td>
</tr>
<tr>
<td data-label="Kürzel"><span class="td-val"><strong>Gyro</strong></span></td>
<td data-label="Bedeutung"><span class="td-val">Gyroskop — schätzt Richtung über Beschleunigung, ohne echte Karte</span></td>
</tr>
</tbody>
</table>
</div>

## Vergleich

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Navigation</th>
<th scope="col">Prinzip</th>
<th scope="col">Hauskarte</th>
<th scope="col">Raumweise</th>
<th scope="col">Im Dunkeln</th>
<th scope="col">Typisches Segment</th>
</tr></thead><tbody>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>Zufall</strong></span></td>
<td data-label="Prinzip"><span class="td-val">Abprallen an Hindernissen</span></td>
<td data-label="Hauskarte"><span class="td-val">nein</span></td>
<td data-label="Raumweise"><span class="td-val">nein</span></td>
<td data-label="Im Dunkeln"><span class="td-val">ja</span></td>
<td data-label="Typisches Segment"><span class="td-val">sehr günstig</span></td>
</tr>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>Gyroskop</strong></span></td>
<td data-label="Prinzip"><span class="td-val">parallele Bahnen</span></td>
<td data-label="Hauskarte"><span class="td-val">grob oder nein</span></td>
<td data-label="Raumweise"><span class="td-val">selten</span></td>
<td data-label="Im Dunkeln"><span class="td-val">ja</span></td>
<td data-label="Typisches Segment"><span class="td-val">Einstieg</span></td>
</tr>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>Kamera (vSLAM)</strong></span></td>
<td data-label="Prinzip"><span class="td-val">visuelle Landmarken</span></td>
<td data-label="Hauskarte"><span class="td-val">ja</span></td>
<td data-label="Raumweise"><span class="td-val">ja</span></td>
<td data-label="Im Dunkeln"><span class="td-val">lichtabhängig</span></td>
<td data-label="Typisches Segment"><span class="td-val">Mittel–Premium</span></td>
</tr>
<tr>
<td data-label="Navigation"><span class="td-val"><strong>LiDAR</strong></span></td>
<td data-label="Prinzip"><span class="td-val">Laser 360°</span></td>
<td data-label="Hauskarte"><span class="td-val">ja, präzise</span></td>
<td data-label="Raumweise"><span class="td-val">ja</span></td>
<td data-label="Im Dunkeln"><span class="td-val">ja</span></td>
<td data-label="Typisches Segment"><span class="td-val">auch günstiger werdend</span></td>
</tr>
</tbody>
</table>
</div>

**Empfehlung: LiDAR** — präzise Karte, dunkeltauglich, Raumreinigung auch aus Home Assistant planbar.

## Beispiel-Produkte (Stand November 2026, Preise prüfen)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modell</th>
<th scope="col">Navigation</th>
<th scope="col">Hinweis</th>
</tr></thead><tbody>
<tr>
<td data-label="Modell"><span class="td-val">Roborock S8 / Q-Reihe</span></td>
<td data-label="Navigation"><span class="td-val">LiDAR</span></td>
<td data-label="Hinweis"><span class="td-val">oft in HA-Integrationen</span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val">Dreame L10s Ultra</span></td>
<td data-label="Navigation"><span class="td-val">LiDAR</span></td>
<td data-label="Hinweis"><span class="td-val">Station mit Wischfunktion — siehe <a href="/de/smart-home/saugroboter-wischstation-selbstreinigung/">Wischstationen</a></span></td>
</tr>
<tr>
<td data-label="Modell"><span class="td-val">Einstiegs-Gyro</span></td>
<td data-label="Navigation"><span class="td-val">Gyro</span></td>
<td data-label="Hinweis"><span class="td-val">günstig, aber ohne zuverlässige Karte</span></td>
</tr>
</tbody>
</table>
</div>

Werbelinks (Amazon.de, Preise variieren): [LiDAR Saugroboter suchen](https://www.amazon.de/s?k=Roborock+LiDAR+Saugroboter&tag=roboteducat00-21) · [Saugroboter unter 200 €](/de/smart-home/saugroboter-unter-200-euro/).

## Zufall und Gyroskop

**Zufall** deckt kleine Räume irgendwann ab, langsam und ungleichmäßig. **Gyroskop** fährt Bahnen, verliert aber in mehrstöckigen Wohnungen oft die Orientierung — selten eine nutzbare Karte für „nur Küche“.

## Kamera (vSLAM)

Gute Karte und Raumreinigung bei Tageslicht; schwächer bei wenig Licht oder spiegelnden Böden. Datenschutz: Bildverarbeitung in der Hersteller-Policy lesen — oft lokale Verarbeitung, aber nicht überall.

## LiDAR

Turm mit rotierendem Laser — schnelle Relokalisierung, dunkeltauglich. Nachteil: **Höhe** — unter niedrigen Sofas messen und mit Datenblatt vergleichen (LiDAR-Turm ~8–10 cm).

## Hinderniserkennung

Navigation = Orientierung; **Hindernisse** = Kabel, Socken. Einstiegsmodelle oft begrenzt — Kabel und Kleinteile vor dem Lauf wegräumen.

## Smart Home

Präzise Karte ermöglicht „nur Küche“ statt „alles“. Hängt von Marke und Integration ab: [Saugroboter in HA](/de/smart-home/saugroboter-home-assistant/). Matter/Thread: [Protokolle 2027](/de/smart-home/matter-thread-zigbee-wifi-protokoll-wahl-2027/).

## FAQ

**Reicht Gyro für 80 m²?** Oft unscharf — LiDAR lohnt sich ab mittlerer Wohnung.

**LiDAR + HA ohne Cloud?** Möglich bei unterstützten Modellen (Roborock, Dreame, Vacuum …) — Integration vor Kauf prüfen.

[Alle Smart-Home-Ratgeber](/de/smart-home/)
