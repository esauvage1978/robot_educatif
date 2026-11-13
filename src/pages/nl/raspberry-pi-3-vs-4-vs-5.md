---
layout: ../../layouts/EnPost.astro
lang: nl
title: "Raspberry Pi 3, 4 of 5: welke koop je in 2026?"
description: "Raspberry Pi 3 Model B, Pi 4 Model B en Pi 5: processor, geheugen, USB, Ethernet, PCIe en voeding. Advies per gebruik, zonder verzonnen Nederlandse prijs."
updated: "21 oktober 2026"
faqSchema:
  - question: "Welke Raspberry Pi kies je voor een licht project?"
    answer: "Blijf bij een Pi 3 als je hardware hergebruikt of een heel licht project draait, zoals GPIO, een sensor of een klein script. 1 GB geheugen en geen USB 3 beperken bladeren, compileren en schijfoverdracht."
  - question: "Waar staan de gedateerde prijzen in euro voor de Pi 5?"
    answer: "Op de Franse vergelijking, bij de aflezing van Amazon.fr. Die bedragen rekenen we niet om. Een Nederlandse schapprijs verzinnen we niet. Controleer de revisie van het bord en wat erbij zit."
---

Tussen de **[Raspberry Pi](/marque-raspberry-pi/) 3 Model B**, de **Pi 4 Model B** en de **Pi 5** zit het verschil niet alleen in de prijs: **USB 3**, **echt gigabit-ethernet**, **twee videouitgangen**, en daarna **PCIe** en tot **16 GB geheugen** op de Pi 5 veranderen wat een project kan. De specificaties hieronder komen van de officiële productpagina’s van Raspberry Pi ([Pi 3 B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/), [Pi 4 B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/), [Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)).

## 1. Tabel met specificaties

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>Pi 3 Model B</strong></th>
<th scope="col"><strong>Pi 4 Model B</strong></th>
<th scope="col"><strong>Raspberry Pi 5</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">SoC</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">Broadcom BCM2837</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">Broadcom BCM2711</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">Broadcom BCM2712</span></td>
</tr>
<tr>
<td><span class="td-val">Processor</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">4 × Cortex-A53, 1,2 GHz</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">4 × Cortex-A72, 1,8 GHz</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">4 × Cortex-A76, 2,4 GHz</span></td>
</tr>
<tr>
<td><span class="td-val">Gpu / video</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">VideoCore IV, 1 × HDMI op vol formaat</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">VideoCore VI, 2 × micro-HDMI (4K)</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">VideoCore VII, 2 × micro-HDMI (4Kp60)</span></td>
</tr>
<tr>
<td><span class="td-val">Geheugen</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">1 GB LPDDR2</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">1 / 2 / 4 / 8 GB LPDDR4-3200</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">1 / 2 / 4 / 8 / 16 GB LPDDR4X-4267</span></td>
</tr>
<tr>
<td><span class="td-val">Ethernet</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">100 Mbit/s</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">Gigabit</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">Gigabit</span></td>
</tr>
<tr>
<td><span class="td-val">Wifi / Bluetooth</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">802.11n, BT 4.1</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">802.11ac, BT 5.0</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">802.11ac, BT 5.0</span></td>
</tr>
<tr>
<td><span class="td-val">Usb</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">4 × USB 2.0</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">2 × USB 3.0 + 2 × USB 2.0</span></td>
</tr>
<tr>
<td><span class="td-val">PCIe</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">Nee</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">Nee</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">PCIe 2.0 ×1</span></td>
</tr>
<tr>
<td><span class="td-val">Voeding</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">micro-usb 5 V, 2,5 A</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">USB-C 5 V, 3 A</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">USB-C 5 V, 5 A aanbevolen</span></td>
</tr>
<tr>
<td><span class="td-val">GPIO</span></td>
<td data-label="Pi 3 Model B"><span class="td-val">40 pinnen</span></td>
<td data-label="Pi 4 Model B"><span class="td-val">40 pinnen</span></td>
<td data-label="Raspberry Pi 5"><span class="td-val">40 pinnen</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Wat je van dag tot dag merkt

- **Pi 3:** makkelijk tweedehands te vinden en zeer goed gedocumenteerd, maar **1 GB geheugen** en **geen USB 3** beperken bladeren, compileren en schijfoverdracht.
- **Pi 4:** **USB 3 en echt gigabit** maken er vanaf 4 GB een bruikbare kleine NAS, server of Linux-desktop van.
- **Pi 5:** nieuwere processor, tot **16 GB**, **PCIe** voor snelle opslag, maar veeleisender voor **koeling** en **voeding**.

## 3. Prijzen

De prijzen van de Raspberry Pi schuiven vaak (voorraad, marge van de wederverkoper, btw). **Controleer de prijs van dit moment** bij een [erkende wederverkoper](https://www.raspberrypi.com/resellers/). De Franse momentopname van Amazon van 10 november 2026 zet Pi 5-borden onder ASIN-codes die bij amazon.fr horen. Die codes hergebruiken we hier niet als productpagina’s voor de VS of het Verenigd Koninkrijk, en ook niet als verzonnen Nederlandse aanbieding. Controleer altijd de revisie van het bord en wat erbij zit (voeding, koeler). De gedateerde prijzen in euro voor de Pi 5 staan op de [Franse vergelijking](/raspberry-pi-3-vs-4-vs-5-comparatif-2026/). Een Nederlandse schapprijs verzinnen we niet.

## 4. Welke Raspberry Pi voor welk gebruik?

**Blijf bij een Pi 3** als je hardware hergebruikt of een heel licht project draait (GPIO, een sensor, een klein script).

**Kies een Pi 4** voor een bescheiden doe-het-zelf-NAS, een server die doorvoer nodig heeft, schijven op USB 3, of een alledaagse Linux-desktop met een klein budget.

**Kies een Pi 5** als je rekenruimte nodig hebt, 8 GB of meer, of de PCIe-bus. Reken op actieve koeling en de voeding van 27 W. Weet je niet welk geheugen? Lees [Raspberry Pi 5: welk geheugen koop je](/nl/raspberry-pi-5-welk-geheugen/).

**Voor Home Assistant** werkt een Pi 5 met 4 GB plus een Zigbee-dongle goed. Het kant-en-klare alternatief is Home Assistant Green.

**Voor een tiener die twijfelt tussen een kaal bord en een robot** mengt een kit op basis van de Pi, zoals de [SunFounder PiCar-X](https://www.sunfounder.com/products/picar-x?ref=tpytgtyp) (partnerlink, Pi niet inbegrepen), allebei.

## 5. Waar je ze koopt

Raspberry Pi zet zijn erkende wederverkopers land voor land op de [resellerpagina](https://www.raspberrypi.com/resellers/). Een Nederlandse schapprijs verzinnen we niet: de prijs van vandaag staat bij de winkel die je opent.

**Kort:** de Pi 3 is de historische referentie, inmiddels krap. De Pi 4 is het prettige midden voor netwerk en usb. De Pi 5 is de hoogste prestatie en het meeste geheugen, tegen warmte en prijs.

## Veelgestelde vragen

**Welke Raspberry Pi kies je voor een licht project?** Blijf bij een Pi 3 als je hardware hergebruikt of een heel licht project draait. 1 GB geheugen en geen USB 3 beperken bladeren, compileren en schijfoverdracht.

**Waar staan de prijzen in euro?** Op de [Franse vergelijking](/raspberry-pi-3-vs-4-vs-5-comparatif-2026/), als gedateerde aflezing van Amazon.fr. Een Nederlandse schapprijs verzinnen we niet.
