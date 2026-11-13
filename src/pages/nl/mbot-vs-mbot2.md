---
layout: ../../layouts/EnPost.astro
lang: nl
title: "mBot versus mBot2: de verschillen en welke je kiest"
description: "Makeblock mBot en mBot2: mCore of CyberPi, sensoren, encodermotoren, wifi, Python en accessoires. Een keuze per leeftijd, zonder verzonnen prijs."
updated: "23 oktober 2026"
faqSchema:
  - question: "Wanneer kies je de mBot, en wanneer de mBot2?"
    answer: "De mBot past bij een eerste robot, een club en een krapper budget. De mBot2 past vanaf ongeveer 10 jaar, bij langere projecten en als je van blokken naar Python wilt zonder een andere robot te kopen."
  - question: "Zijn de accessoires van de mBot en de mBot2 uitwisselbaar?"
    answer: "Niet vanzelf. De klassieke mBot gebruikt RJ25-poorten. De mBot2 gebruikt mBuild-modules voor de CyberPi. Houd je aan de compatibiliteitslijst van Makeblock."
---

De **mBot** en de **mBot2** zijn twee generaties van de klasrobot van [Makeblock](/marque-makeblock/). Beide programmeer je met **mBlock** (blokken in de stijl van Scratch), maar de mBot2 is gebouwd rond het krachtigere **CyberPi**-bord, met wifi en een natuurlijke weg naar Python. De specificaties hieronder komen uit Makeblocks [introductie van de mBot2](https://www.lemona.lt/Files/Instrukcijos/TI/En/Pdf/mBot2%20introduction.pdf) (tabel mBot 1.1 versus mBot2). Kijk vóór de aankoop altijd op de officiële productpagina: revisies van de set verschillen (Bluetooth-module wel of niet meegeleverd, kleur van het chassis, onderdelen in de doos).

## 1. Vergelijkingstabel

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>mBot (klassiek)</strong></th>
<th scope="col"><strong>mBot2</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Bord</span></td>
<td data-label="mBot (klassiek)"><span class="td-val"><strong>mCore</strong> (compatibel met Arduino)</span></td>
<td data-label="mBot2"><span class="td-val"><strong>CyberPi</strong> (krachtiger, wifi)</span></td>
</tr>
<tr>
<td><span class="td-val">Programmeren</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">mBlock-blokken; Arduino C voor wie verder is</span></td>
<td data-label="mBot2"><span class="td-val">mBlock-blokken plus <strong>Python</strong>, ingebouwd</span></td>
</tr>
<tr>
<td><span class="td-val">Motoren</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">twee gelijkstroommotoren</span></td>
<td data-label="mBot2"><span class="td-val"><strong>encodermotoren</strong> (precieze bewegingen)</span></td>
</tr>
<tr>
<td><span class="td-val">Typische sensoren</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">lijnvolger, ultrasoon, infrarood (afhankelijk van de set)</span></td>
<td data-label="mBot2"><span class="td-val">ultrasoon, lijnvolger, licht, <strong>gyroscoop</strong></span></td>
</tr>
<tr>
<td><span class="td-val">Scherm / geluid</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">RGB-leds, zoemer</span></td>
<td data-label="mBot2"><span class="td-val"><strong>kleurenscherm van 1,44 inch</strong> (128 × 128) op de CyberPi, luidspreker en microfoon</span></td>
</tr>
<tr>
<td><span class="td-val">Verbinding</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">Bluetooth of 2,4 GHz, afhankelijk van de verpakking</span></td>
<td data-label="mBot2"><span class="td-val"><strong>Bluetooth en wifi</strong></span></td>
</tr>
<tr>
<td><span class="td-val">Chassis</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">aluminiumlegering</span></td>
<td data-label="mBot2"><span class="td-val">aluminiumlegering</span></td>
</tr>
<tr>
<td><span class="td-val">Voeding</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">batterijhouder (AA-cellen, afhankelijk van de set)</span></td>
<td data-label="mBot2"><span class="td-val">ingebouwde oplaadbare batterij van <strong>2.500 mAh</strong>, USB-C</span></td>
</tr>
<tr>
<td><span class="td-val">Past het best bij</span></td>
<td data-label="mBot (klassiek)"><span class="td-val">eerste robot, club, krap budget</span></td>
<td data-label="mBot2"><span class="td-val">vanaf 10 jaar, langere projecten, overstap naar Python</span></td>
</tr>
</tbody>
</table>
</div>

**Onze keuze:** de **mBot** als eerste robot met een krapper budget. De **mBot2** als je hem een paar jaar wilt gebruiken en soepel van blokken naar Python wilt, zonder een andere robot te kopen.

## 2. Wat ze gemeen hebben

- **Dezelfde software**: mBlock, dicht bij Scratch, met veel handleidingen en een grote gemeenschap. Installeren doe je met onze [gids voor mBlock 5](/nl/mblock-5-installeren-windows/).
- **Hetzelfde lesidee**: een chassis bouwen, sensoren aansluiten en daarna parcours en obstakels oplossen.
- **Hetzelfde merkenecosysteem**, maar accessoires zijn tussen de generaties **niet altijd compatibel** (zie hieronder).

## 3. Accessoires en uitbreidingen

De **mBot (klassiek)** gebruikt **RJ25**-poorten en het oudere accessoire-ecosysteem van Makeblock: extra sensoren, armen, rupsbanden, reserveonderdelen. De meest gemaakte fout is een uitbreiding kopen zonder te controleren of die bij *jouw* revisie van de mBot past.

De **mBot2** leunt op **mBuild**-modules voor de CyberPi. Houd je aan de officiële compatibiliteitslijst van Makeblock en wacht met extra’s tot de basis zit.

## 4. Welke kies je?

- **Kies de mBot** voor een stevige eerste robot, een grote bibliotheek aan activiteiten, een krapper budget en workshops met lijn, obstakel en leds.
- **Kies de mBot2** voor gebruik over meerdere jaren, projecten met geluid en licht, precieze bewegingen en later serieus Python.

Vergelijk je nog merken? Zie de [gids programmeerbare robots](/nl/beste-programmeerbare-robot-voor-kinderen/) en [mBot versus Codey Rocky](/mbot-vs-codey-rocky-comparatif/). Al onze vergelijkingen staan in [Vergelijkingen](/categorie/comparatif/).

## 5. Waar je hem koopt

Prijzen wisselen vaak en verschillen per winkel. Deze pagina verzint geen Nederlandse schapprijs en rekent geen ponden of dollars om naar euro. Een europrijs op deze site blijft de gedateerde Amazon.fr-aflezing op de pagina die hem noemt. De gedateerde ponden, als die in de tabel staan, staan in de [gids programmeerbare robots](/nl/beste-programmeerbare-robot-voor-kinderen/).

<a href="https://www.amazon.nl/dp/B07XR98YYQ?tag=manuso0607-21" rel="sponsored nofollow noopener">Bekijk de prijs van vandaag op Amazon</a> (mBot, ASIN B07XR98YYQ)

<a href="https://www.amazon.nl/dp/B0919F9CKS?tag=manuso0607-21" rel="sponsored nofollow noopener">Bekijk de prijs van vandaag op Amazon</a> (mBot2, ASIN B0919F9CKS)
