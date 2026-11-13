---
layout: ../../layouts/EnPost.astro
lang: nl
title: "Raspberry Pi 5: 2, 4, 8 of 16 GB? Welk geheugen koop je"
description: "Welk geheugen kies je voor de Raspberry Pi 5? Waar 1, 2, 4, 8 en 16 GB goed voor zijn, plus koeling, voeding en een korte beslisboom voor thuis."
updated: "21 oktober 2026"
faqSchema:
  - question: "Welk geheugen van de Raspberry Pi 5 past bij een eerste bord voor gezin of school?"
    answer: "4 GB is de ronde keuze: de desktop van Raspberry Pi OS, programmeren, een bescheiden webstapel en Home Assistant. Voor een thuislab met Docker kies je eerder 8 GB."
  - question: "Verzinnen jullie een Nederlandse prijs per geheugenmaat?"
    answer: "Nee. Deze pagina noemt geen schapprijs. De borden van 1, 2, 4, 8 en 16 GB staan op de officiële pagina van de Raspberry Pi 5. Het gat tussen 4 GB en 16 GB kan groot zijn. Bekijk de prijs van vandaag bij een erkende wederverkoper."
---

De **[Raspberry Pi](/marque-raspberry-pi/) 5** is gebouwd rond de Broadcom **BCM2712**: vier kernen **Cortex-A76** op **2,4 GHz**, een gpu **VideoCore VII** en de I/O-controller **RP1**. Het is ook de eerste Raspberry Pi op volledig formaat met een verbinding **PCIe 2.0 ×1**, wat de deur opent naar **NVMe-ssd’s** via een extra bord. Specificaties van de [officiële pagina van de Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/).

Deze gids behandelt de **geheugenopties** in de reeks (de beschikbaarheid verschilt per land), waar je **koeling** en **voeding** voor moet rekenen, en hoe je kiest. Een Nederlandse schapprijs verzinnen we niet.

## 1. Geheugenopties van de Raspberry Pi 5

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Geheugen</th>
<th scope="col">Typisch gebruik</th>
</tr></thead><tbody>
<tr>
<td data-label="Geheugen"><span class="td-val"><strong>1 GB</strong></span></td>
<td data-label="Typisch gebruik"><span class="td-val">Heel goedkope taken aan de rand: eenvoudige scripts, een lichte gateway. Weinig ruimte voor een webbrowser of een IDE.</span></td>
</tr>
<tr>
<td data-label="Geheugen"><span class="td-val"><strong>2 GB</strong></span></td>
<td data-label="Typisch gebruik"><span class="td-val">Minimale servers, schermen, bots. Niet ideaal als gezinsdesktop met veel browsertabbladen.</span></td>
</tr>
<tr>
<td data-label="Geheugen"><span class="td-val"><strong>4 GB</strong></span></td>
<td data-label="Typisch gebruik"><span class="td-val">De ronde keuze: desktop van Raspberry Pi OS, programmeren, bescheiden webstapels, Home Assistant.</span></td>
</tr>
<tr>
<td data-label="Geheugen"><span class="td-val"><strong>8 GB</strong></span></td>
<td data-label="Typisch gebruik"><span class="td-val">Meerdere containers, databases, serieus compileren, een desktop met veel achtergronddiensten.</span></td>
</tr>
<tr>
<td data-label="Geheugen"><span class="td-val"><strong>16 GB</strong></span></td>
<td data-label="Typisch gebruik"><span class="td-val">Zelden nodig op een singleboardcomputer: kleine lokale AI-modellen, grote builds, caches. Koop dit alleen als je weet waarom.</span></td>
</tr>
</tbody>
</table>
</div>

Het geheugen is **LPDDR4X-4267** op de Pi 5 (LPDDR4-3200 op de Pi 4).

## 2. Wat er echt verandert ten opzichte van de Pi 4

- **Processor:** duidelijk sneller in de meeste benchmarks voor compileren en coderen.
- **PCIe:** snellere opslag of extra kaarten, met compatibele hardware en genoeg voeding.
- **Warmte:** de Pi 5 wordt snel warm. De officiële **Active Cooler** (of een serieus equivalent) is bijna onmisbaar bij lang werk.
- **Voeding:** Raspberry Pi raadt zijn **USB-C-voeding van 27 W (5 V, 5 A)** aan om de volledige usb-stroom vrij te geven. Zwakke telefoonladers geven waarschuwingen of laten de processor terugklokken. De officiële voeding wordt verkocht met stekkers voor het Verenigd Koninkrijk, de VS en de EU.

## 3. Welke kies je?

1. **Krap budget, geen desktop:** 2 GB (of 1 GB als je het geheugengebruik van je diensten hebt gemeten).
2. **Eerste Pi voor gezin, school of maken:** **4 GB**.
3. **Thuislab met Docker** of meerdere stapels: **8 GB**.
4. **Grote compilaties, modellen die veel geheugen vragen, geen compromis:** 16 GB, nadat je hebt gecontroleerd dat opslag en koeling meekunnen.

Prijzen in het Verenigd Koninkrijk en de VS lopen uiteen, en deze pagina noemt er geen. De borden van 1, 2, 4, 8 en 16 GB staan op de [officiële pagina van de Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/). Het gat tussen 4 GB en 16 GB kan groot zijn. Een Nederlandse schapprijs verzinnen we niet.

## 4. Accessoires die je niet vergeet

- **Actieve koeling** (de officiële Active Cooler, of de officiële behuizing met ventilator).
- **Voeding:** de officiële USB-C van 27 W, of een gedocumenteerd equivalent.
- Een **snelle microSD-kaart**, of een **NVMe**-schijf als je een PCIe-bord toevoegt.
- **Micro-HDMI-kabels** voor één of twee schermen.

## 5. Waar je hem koopt

De Pi 5 wordt in elk land verkocht via de [erkende wederverkopers](https://www.raspberrypi.com/products/raspberry-pi-5/) van Raspberry Pi. In de VS is SparkFun er een van: [Raspberry Pi 5 bij SparkFun](https://www.sparkfun.com/catalogsearch/result/?q=raspberry+pi+5&affiliate_code=WRBz4h1uMN) (partnerlink). Dat is een Amerikaanse winkel. Een Nederlandse schapprijs verzinnen we daar niet bij.

Zet **Raspberry Pi OS** op de kaart met **Raspberry Pi Imager**, precies zoals bij eerdere modellen.

**De kern:** kies de Pi 5 eerst op **geheugen** (4 GB of 8 GB voor de meeste mensen), en daarna op een **goede voeding en koeling**.

Zie ook: [Raspberry Pi 3, 4 of 5](/nl/raspberry-pi-3-vs-4-vs-5/).

## Veelgestelde vragen

**Welk geheugen voor een eerste bord?** **4 GB** voor gezin, school of maken. **8 GB** als je Docker of meerdere stapels draait.

**Staan hier Nederlandse prijzen?** Nee. Een Nederlandse schapprijs verzinnen we niet. De officiële pagina en de erkende wederverkopers laten de prijs van vandaag zien.
