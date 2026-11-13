---
layout: ../../layouts/EnPost.astro
lang: nl
title: "Slimme woning voor beginners (VK en VS): waar je in 2026 begint"
description: "Een eerste plan voor een slimme woning in het VK of de VS: wifi, Zigbee, Thread en Matter, wat je eerst koopt, en het verschil tussen 230 V en 120 V."
updated: "21 oktober 2026"
faqSchema:
  - question: "Waar begin je, zonder meteen een hub te kopen?"
    answer: "Met wifi en zonder hub. Eén of twee slimme stekkers met energiemeting laten je een lamp plannen en zien wat apparaten echt verbruiken."
  - question: "Wat als je huurt?"
    answer: "Blijf bij insteekapparaten en batterijsensoren die geen spoor achterlaten. Bedrading achter schakelaars is werk voor iemand die daarvoor bevoegd is."
---

Een slimme woning hoeft niet te beginnen met een grote hub en een weekend bedraden. Deze gids geeft een pad dat werkt in een **flat in het Verenigd Koninkrijk** of een **huis in de Verenigde Staten**, en wijst aan waar die twee landen echt verschillen: **stekkers, netspanning, keurmerken en wie wat mag bedraden**. De pagina beschrijft die twee landen, zoals de bron. We verzinnen hier geen Nederlandse installatieregel en geen Nederlands schapprijs.

## 1. Drie vragen vóór je iets koopt

1. **Wat wil je eerst automatiseren?** Lampen, verwarming, een seintje van de wasmachine of energie meten? Begin met één echte behoefte.
2. **Wil je zelf sleutelen?** Wifi-apparaten werken uit de doos met een app; Zigbee en Home Assistant geven je lokale besturing, maar vragen een beetje installatie.
3. **Huur je of ben je eigenaar?** Huurders blijven bij **insteekapparaten** en batterijsensoren die geen spoor achterlaten.

## 2. Draadloze standaarden in gewone taal

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Standaard</th>
<th scope="col">Sterke punten</th>
<th scope="col">Grenzen</th>
<th scope="col">Geschikt voor</th>
</tr></thead><tbody>
<tr>
<td data-label="Standaard"><span class="td-val"><strong>Wifi (2,4 GHz)</strong></span></td>
<td data-label="Sterke punten"><span class="td-val">geen hub, eenvoudige app</span></td>
<td data-label="Grenzen"><span class="td-val">verbruikt meer stroom, leunt vaak op de cloud van de maker</span></td>
<td data-label="Geschikt voor"><span class="td-val">je eerste slimme stekker of lamp</span></td>
</tr>
<tr>
<td data-label="Standaard"><span class="td-val"><strong>Zigbee 3.0</strong></span></td>
<td data-label="Sterke punten"><span class="td-val">laag verbruik, meshnetwerk, werkt lokaal</span></td>
<td data-label="Grenzen"><span class="td-val">heeft een USB-coördinator of hub nodig</span></td>
<td data-label="Geschikt voor"><span class="td-val">sensoren, stekkers, radiatorkranen</span></td>
</tr>
<tr>
<td data-label="Standaard"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Sterke punten"><span class="td-val">mesh, laag verbruik, op IP gebaseerd</span></td>
<td data-label="Grenzen"><span class="td-val">tot nu toe minder apparaten</span></td>
<td data-label="Geschikt voor"><span class="td-val">batterijapparaten die meegaan</span></td>
</tr>
<tr>
<td data-label="Standaard"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Sterke punten"><span class="td-val">één standaard over Apple Home, Google Home, Alexa en SmartThings</span></td>
<td data-label="Grenzen"><span class="td-val">nog in ontwikkeling; loopt over wifi of Thread</span></td>
<td data-label="Geschikt voor"><span class="td-val">apparaten kopen die je niet opsluiten</span></td>
</tr>
</tbody>
</table>
</div>

## 3. Wat verschilt tussen het VK en de VS

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Verenigd Koninkrijk</th>
<th scope="col">Verenigde Staten</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Stekker / stopcontact</span></td>
<td data-label="Verenigd Koninkrijk"><span class="td-val">Type G (BS 1363), stekker met zekering, max. 13 A</span></td>
<td data-label="Verenigde Staten"><span class="td-val">Type A/B (NEMA 1-15 / 5-15), meestal groepen van 15 A</span></td>
</tr>
<tr>
<td><span class="td-val">Netspanning</span></td>
<td data-label="Verenigd Koninkrijk"><span class="td-val">230 V, 50 Hz</span></td>
<td data-label="Verenigde Staten"><span class="td-val">120 V, 60 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Veiligheidsmerk</span></td>
<td data-label="Verenigd Koninkrijk"><span class="td-val">UKCA (CE wordt voor veel goederen nog aanvaard)</span></td>
<td data-label="Verenigde Staten"><span class="td-val">FCC voor radioapparaten; UL- of ETL-listing voor netveiligheid</span></td>
</tr>
<tr>
<td><span class="td-val">Bedrade schakelaars en relais</span></td>
<td data-label="Verenigd Koninkrijk"><span class="td-val">elektrisch werk in huis moet voldoen aan Part P (Engeland en Wales); neem een geregistreerde elektricien voor nieuwe groepen</span></td>
<td data-label="Verenigde Staten"><span class="td-val">volg de lokale elektrische code (NEC); vergunningen en erkende elektriciens verschillen per staat</span></td>
</tr>
</tbody>
</table>
</div>

**Praktische regel:** koop altijd de **Britse of Amerikaanse versie** van een insteekapparaat. Een EU-stekker in een reisadapter is geen veilige vaste oplossing, zeker niet bij zware lasten zoals kachels.

## 4. Een pad in stappen

**Stap 1: begin met wifi en zonder hub.** Eén of twee slimme stekkers met energiemeting laten je een lamp plannen en zien wat je apparaten echt verbruiken. Shelly maakt stekkers in lokale versies: zie het [assortiment slimme stekkers van Shelly](https://www.shelly.com/collections/smart-plugs) en kies het Britse of Amerikaanse model.

**Stap 2: voeg een huis-hub toe.** Voor lokale besturing installeer je [Home Assistant](https://www.home-assistant.io/) op een kant-en-klare **Home Assistant Green** of op een **Raspberry Pi 5**: vergelijk ze in [Home Assistant Green versus Raspberry Pi 5](/domotique/home-assistant-green-vs-raspberry-pi-5/).

**Stap 3: voeg een Zigbee-coördinator en je eerste sensoren toe.** Temperatuur-, deur- en bewegingssensoren zijn goedkoop en doen maanden op een knoopcel. Zie [de beste Zigbee-dongle voor Home Assistant](/domotique/meilleur-dongle-zigbee-home-assistant/).

**Stap 4: breid uit waar het helpt.** Relais achter schakelaars (werk voor een elektricien als je zelf niet bevoegd bent), radiatorkranen, een robotstofzuiger of zelfgebouwde ESP32-sensoren.

## 5. Fouten om te vermijden

- Apparaten kopen uit vijf verschillende apps: geef de voorkeur aan **Matter** of **Zigbee**, zodat alles op één plek uitkomt.
- Een goedkope, niet-gekeurde stekker gebruiken voor een kachel of waterkoker: controleer de **nominale belasting** en het merk **UKCA** of **UL/ETL**.
- Lichtschakelaars zelf opnieuw bedraden zonder de juiste bevoegdheid.

**Daarna:** [slimme stekkers voor het VK en de VS](/domotique/prise-connectee-zigbee-home-assistant/).

[Alle gidsen voor de slimme woning](/domotique/)
