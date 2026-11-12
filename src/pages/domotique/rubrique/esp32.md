---
layout: ../../../layouts/DomotiqueHub.astro
title: "Projets ESP32 avec ESPHome et Home Assistant"
description: "Projets ESP32 et ESPHome : quelle carte choisir (ESP32, S3, C3, C6, H2), un capteur de température, une porte de garage pilotée au smartphone et 10 idées de projets."
pubDate: 2026-10-23
category: esp32
---

L'ESP32 coûte peu, se programme sans écrire de code grâce à ESPHome et s'intègre directement à Home Assistant. Voici nos guides, du choix de la carte au projet complet.

<figure>
<img src="/images/schemas/esp32-esphome.svg" alt="Chaîne ESP32, ESPHome, Home Assistant" width="780" height="496" />
<figcaption>La carte ESP32 exécute ESPHome. ESPHome publie les capteurs et les commandes sur Home Assistant, dans la maison.</figcaption>
</figure>

## L'essentiel en un tableau

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Guide</th>
<th scope="col">Niveau</th>
<th scope="col">Ce que vous obtenez</th>
</tr></thead><tbody>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/quelle-carte-esp32-choisir-domotique/">Quelle carte ESP32 choisir</a></span></td>
<td data-label="Niveau"><span class="td-val">débutant</span></td>
<td data-label="Ce que vous obtenez"><span class="td-val">les 5 puces comparées d'après les fiches Espressif</span></td>
</tr>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/esp32-esphome-capteur-temperature/">Capteur température ESP32 + ESPHome</a></span></td>
<td data-label="Niveau"><span class="td-val">débutant</span></td>
<td data-label="Ce que vous obtenez"><span class="td-val">votre premier capteur dans Home Assistant</span></td>
</tr>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/ouvrir-porte-garage-smartphone-esp32-esphome/">Porte de garage pilotée au smartphone</a></span></td>
<td data-label="Niveau"><span class="td-val">intermédiaire</span></td>
<td data-label="Ce que vous obtenez"><span class="td-val">un relais ESP32 câblé sur la motorisation</span></td>
</tr>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/projets-esp32-domotique/">10 projets ESP32 pour la domotique</a></span></td>
<td data-label="Niveau"><span class="td-val">tous niveaux</span></td>
<td data-label="Ce que vous obtenez"><span class="td-val">des idées classées, avec le matériel</span></td>
</tr>
</tbody>
</table>
</div>

## Notre meilleur choix

**Une carte ESP32 classique (DevKitC) pour commencer**, la plus documentée dans ESPHome. Passez à l'ESP32-S3 pour une caméra, à l'ESP32-C6 pour Thread : voir [quelle carte ESP32 choisir](/domotique/quelle-carte-esp32-choisir-domotique/).

Votre ESP32 aura besoin d'un serveur : rubrique [Home Assistant](/domotique/rubrique/home-assistant/).
