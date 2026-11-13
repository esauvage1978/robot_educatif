---
layout: ../../layouts/EnPost.astro
lang: nl
title: "Je eerste mBot-programma in mBlock 5 (stap voor stap)"
description: "Bouw, test en upload een eerste mBot-programma in mBlock 5: start, wacht op de knop, speel een noot, verbind via USB of Bluetooth. Inclusief projectbestand."
updated: "23 oktober 2026"
faqSchema:
  - question: "Wat doet dit eerste mBot-programma?"
    answer: "Bij het starten wacht de mBot tot je op de knop op het bord drukt. Daarna speelt hij één korte noot, C4, een kwart tel. Er zit geen lus in, dus het herhaalt zich niet vanzelf."
  - question: "USB of Bluetooth voor de eerste upload?"
    answer: "Bluetooth is handig voor een live test zonder kabel. Voor een firmware-update of een betrouwbare upload is USB de betere keuze, met de robot aangesloten en de batterijen geladen."
---

Deze handleiding neemt je **stap voor stap** mee van het eerste blok in mBlock 5 tot het **uploaden** van het programma naar een mBot van [Makeblock](/marque-makeblock/). Het programma is bewust eenvoudig: bij het starten wacht de mBot tot je op de **knop op zijn bord** drukt, en daarna speelt hij een **korte noot**. Het doel is de werkwijze leren (software openen, blokken stapelen, opslaan, verbinden, testen, uploaden), nog geen ingewikkelde algoritmes.

## Voordat je begint

- Een **mBot** (mCore-bord), batterijen geladen.
- **mBlock 5** geïnstalleerd: zie [mBlock 5 installeren op Windows](/nl/mblock-5-installeren-windows/).
- Open in mBlock het tabblad **Apparaten** en voeg de **mBot** toe, zodat de oranje mBot-blokken verschijnen.

## 1. Het programma in het kort

De namen van de blokken kunnen iets verschillen per mBlock-versie en per taal. Hieronder staat wat het blok doet. Zet mBlock op Nederlands als je de Nederlandse namen wilt zien.

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Stap</th>
<th scope="col">Blok (categorie)</th>
<th scope="col">Wat het doet</th>
</tr></thead><tbody>
<tr>
<td data-label="Stap"><span class="td-val">1</span></td>
<td data-label="Blok (categorie)"><span class="td-val"><em>wanneer mBot (mCore) start</em> (mBot / gebeurtenissen)</span></td>
<td data-label="Wat het doet"><span class="td-val">startpunt als het bord stroom krijgt of wordt gereset</span></td>
</tr>
<tr>
<td data-label="Stap"><span class="td-val">2</span></td>
<td data-label="Blok (categorie)"><span class="td-val"><em>wacht tot ⟨ ⟩</em> (Besturing)</span></td>
<td data-label="Wat het doet"><span class="td-val">wacht tot de voorwaarde waar wordt</span></td>
</tr>
<tr>
<td data-label="Stap"><span class="td-val">3</span></td>
<td data-label="Blok (categorie)"><span class="td-val"><em>knop op het bord ingedrukt?</em> (Waarnemen)</span></td>
<td data-label="Wat het doet"><span class="td-val">wordt waar als je op de knop van het bord drukt</span></td>
</tr>
<tr>
<td data-label="Stap"><span class="td-val">4</span></td>
<td data-label="Blok (categorie)"><span class="td-val"><em>speel noot C4 gedurende 0,25 tel</em> (Uiterlijk / geluid)</span></td>
<td data-label="Wat het doet"><span class="td-val">speelt één korte noot</span></td>
</tr>
</tbody>
</table>
</div>

```text
Wanneer de mBot start:
  wacht tot (knop op het bord ingedrukt)
  speel noot C4 gedurende 0,25 tel
```

**Resultaat:** bij het starten wacht de robot alleen. **Eén druk** op de knop van het bord speelt de noot **één keer**. Er zit geen lus in, dus de actie herhaalt zich niet vanzelf.

## 2. Het project opslaan

Gebruik **Bestand → Opslaan op je computer**, kies een map en een naam (extensie `.mblock`). Sla vaak op.

## 3. De mBot verbinden

Sluit de robot aan met **USB** (kabel meegeleverd) of bereid een **Bluetooth**-koppeling voor, en zet de mBot **AAN**. Klik in mBlock op **Verbinden** en kies USB of Bluetooth. Bluetooth is handig voor **live** tests zonder kabel. Voor een **firmware-update** of een betrouwbare **upload** is USB meestal de betere keuze.

Weigert Bluetooth te verbinden, volg dan de gids [Bluetooth-problemen in mBlock](/mblock-bluetooth-erreurs-frequentes-depannage/).

## 4. Firmware

Biedt mBlock een **firmware-update** aan, accepteer die dan **alleen via USB**, met de robot aangesloten en de batterijen geladen. Haal de robot er tijdens de update niet af.

## 5. Testen, daarna uploaden

Klik, terwijl je verbonden bent, op de blokken om het gedrag **live te controleren**. Als het klopt, schakel je naar de modus **Uploaden** en klik je op **Uploaden** om het programma in het geheugen van de robot te schrijven. De mBot voert het script daarna uit **zonder de computer**.

Mislukt de upload, controleer dan de verbinding en het gekozen apparaat, en loop het script blok voor blok na (blokken goed in elkaar, startblok aanwezig).

## 6. Projectbestand en vervolg

Download het project dat hier staat: **[premier_programme.mblock](/programmes/premier_programme.mblock)** (bestand voor mBlock 5).

Laat daarna de melodie herhalen zolang de knop ingedrukt blijft, of voor altijd, met de blokken **herhaal** en **voor altijd**, en test tussendoor. Probeer daarna de [cursus Arduino C](/categorie/arduino/) om dezelfde logica in code te schrijven. Meer gidsen staan bij [Handleidingen](/categorie/tutoriel/).
