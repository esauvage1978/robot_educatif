---
layout: ../../../layouts/DomotiqueHub.astro
title: "Robots aspirateurs : bien choisir et les intégrer à Home Assistant"
description: "Choisir un robot aspirateur : modèles à moins de 200 €, marques compatibles Home Assistant, navigation LiDAR ou caméra, serpillières et stations."
pubDate: 2026-10-23
updatedDate: 2026-11-18
category: robots-aspirateurs
---

Un **robot aspirateur** s'achète sur trois critères : la **navigation**, le **système de lavage** et l'**intégration Home Assistant** (locale ou cloud). Nos guides passent ces trois points en revue, fiches constructeur et intégrations officielles à l'appui.

<nav class="page-toc" aria-label="Sommaire">
<p><strong>Sommaire</strong></p>
<ol>
<li><a href="#l-essentiel-en-un-tableau">Tableau des guides</a></li>
<li><a href="#notre-meilleur-choix">Notre meilleur choix</a></li>
<li><a href="#robots-aspirateurs-maillage">Guides connexes</a></li>
<li><a href="#faq-robots-aspirateurs">FAQ</a></li>
</ol>
</nav>

## L'essentiel en un tableau

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Guide</th>
<th scope="col">La question traitée</th>
<th scope="col">Notre réponse courte</th>
</tr></thead><tbody>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/robot-aspirateur-moins-de-200-euros/">Robot aspirateur à moins de 200 €</a></span></td>
<td data-label="La question traitée"><span class="td-val">quel modèle à petit budget</span></td>
<td data-label="Notre réponse courte"><span class="td-val">Roborock Q7 M5 (LiDAR, 4200 Pa selon le fabricant)</span></td>
</tr>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/robot-aspirateur-compatible-home-assistant/">Robots compatibles Home Assistant</a></span></td>
<td data-label="La question traitée"><span class="td-val">quelles marques s'intègrent, en local ou en cloud</span></td>
<td data-label="Notre réponse courte"><span class="td-val">Roborock (intégration officielle, pilotage local)</span></td>
</tr>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/robot-aspirateur-navigation-lidar-camera-gyroscope/">LiDAR, caméra ou gyroscope</a></span></td>
<td data-label="La question traitée"><span class="td-val">quelle navigation</span></td>
<td data-label="Notre réponse courte"><span class="td-val">le LiDAR</span></td>
</tr>
<tr>
<td data-label="Guide"><span class="td-val"><a href="/domotique/robot-aspirateur-laveur-serpilliere-station/">Robot laveur : serpillières et stations</a></span></td>
<td data-label="La question traitée"><span class="td-val">quel système de lavage</span></td>
<td data-label="Notre réponse courte"><span class="td-val">serpillières rotatives avec relevage automatique</span></td>
</tr>
</tbody>
</table>
</div>

## Notre meilleur choix

**Un robot à navigation LiDAR d'une marque intégrée officiellement à Home Assistant, comme Roborock.** À petit budget, c'est le [Roborock Q7 M5](/domotique/robot-aspirateur-moins-de-200-euros/). Pas encore de serveur domotique ? Voir la rubrique [Débuter](/domotique/rubrique/debuter/).

## Guides connexes robots aspirateurs {#robots-aspirateurs-maillage}

- **Budget** : [robot aspirateur à moins de 200 €](/domotique/robot-aspirateur-moins-de-200-euros/) (LiDAR, aspiration, lavage simple).
- **Intégration** : [marques compatibles Home Assistant](/domotique/robot-aspirateur-compatible-home-assistant/) (Roborock, Dreame, etc.).
- **Navigation** : [LiDAR, caméra ou gyroscope](/domotique/robot-aspirateur-navigation-lidar-camera-gyroscope/).
- **Lavage** : [serpillières et stations](/domotique/robot-aspirateur-laveur-serpilliere-station/).
- **Dépannage** : [diagnostic par symptôme](/domotique/diagnostic-par-symptome/) si le robot est « unavailable » dans HA.

## FAQ robots aspirateurs {#faq-robots-aspirateurs}

<details>
<summary>Un robot Wi-Fi sans Home Assistant est-il une erreur ?</summary>
<p>Pas forcément pour une maison sans box domotique. Dès que vous voulez des automatisations avec capteurs Zigbee, un robot <strong>intégré officiellement à HA</strong> évite un cloud propriétaire supplémentaire.</p>
</details>
<details>
<summary>LiDAR ou caméra pour un salon encombré ?</summary>
<p>Le <strong>LiDAR</strong> gère mieux les obstacles bas et les tapis ; la caméra peut suffire sur budget très serré. Voir le comparatif navigation ci-dessus.</p>
</details>
