---
layout: ../../../layouts/DePost.astro
title: "Smart Home in der Mietwohnung: was ohne Bohren geht (DE, AT, CH)"
description: "Mieter und temporäre Wohnungen: Schuko-Steckdosen, batteriebetriebene Sensoren, Heizkörperthermostate, Funk-Taster und Kameras ohne Bohrlöcher — was erlaubt ist und was mitzieht beim Umzug."
updated: "24. Oktober 2026"
---

Als Mieter können Sie trotzdem ein vernetztes Zuhause haben. Die Regel: **Alles, was eingesteckt, geklebt oder auf eine bestehende Aufnahme geschraubt wird**, lässt sich wieder mitnehmen. Alles an der festen Elektroinstallation, an Unterputz-Schaltern oder an der Heizungsanlage braucht die Zustimmung des Vermieters — und oft eine Elektrofachkraft.

## Übersicht

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Gerät</th>
<th scope="col">Montage</th>
<th scope="col">Vermieter</th>
<th scope="col">Mitnahme beim Umzug</th>
<th scope="col">Protokoll</th>
</tr></thead><tbody>
<tr>
<td data-label="Gerät"><span class="td-val">Smarte Steckdose (Schuko)</span></td>
<td data-label="Montage"><span class="td-val">einstecken</span></td>
<td data-label="Vermieter"><span class="td-val">nein</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja</span></td>
<td data-label="Protokoll"><span class="td-val">WLAN, Zigbee, Matter</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Temperatur / Luftfeuchte</span></td>
<td data-label="Montage"><span class="td-val">abstellen oder kleben</span></td>
<td data-label="Vermieter"><span class="td-val">nein</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja</span></td>
<td data-label="Protokoll"><span class="td-val">Zigbee, Bluetooth</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Tür-/Fensterkontakt</span></td>
<td data-label="Montage"><span class="td-val">Klebeband</span></td>
<td data-label="Vermieter"><span class="td-val">nein</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja (Kleber entfernen)</span></td>
<td data-label="Protokoll"><span class="td-val">Zigbee</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Smarte Lampe</span></td>
<td data-label="Montage"><span class="td-val">einschrauben</span></td>
<td data-label="Vermieter"><span class="td-val">nein</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja (alte Lampe zurück)</span></td>
<td data-label="Protokoll"><span class="td-val">Zigbee, WLAN, Matter</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Funk-Taster</span></td>
<td data-label="Montage"><span class="td-val">kleben</span></td>
<td data-label="Vermieter"><span class="td-val">nein</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja</span></td>
<td data-label="Protokoll"><span class="td-val">Zigbee</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Heizkörperthermostat</span></td>
<td data-label="Montage"><span class="td-val">ersetzt den Kopf am Heizkörper</span></td>
<td data-label="Vermieter"><span class="td-val">prüfen</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja (alten Kopf aufbewahren)</span></td>
<td data-label="Protokoll"><span class="td-val">Zigbee, Thread</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Innenkamera</span></td>
<td data-label="Montage"><span class="td-val">aufstellen</span></td>
<td data-label="Vermieter"><span class="td-val">nein (Privatsphäre beachten)</span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">ja</span></td>
<td data-label="Protokoll"><span class="td-val">WLAN</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Unterputz-Schalter, Modul hinter Schalter</span></td>
<td data-label="Montage"><span class="td-val">Elektroarbeit</span></td>
<td data-label="Vermieter"><span class="td-val"><strong>ja</strong></span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">nicht empfohlen</span></td>
<td data-label="Protokoll"><span class="td-val">—</span></td>
</tr>
<tr>
<td data-label="Gerät"><span class="td-val">Heizungsregler</span></td>
<td data-label="Montage"><span class="td-val">Verdrahtung</span></td>
<td data-label="Vermieter"><span class="td-val"><strong>ja</strong></span></td>
<td data-label="Mitnahme beim Umzug"><span class="td-val">—</span></td>
<td data-label="Protokoll"><span class="td-val">—</span></td>
</tr>
</tbody>
</table>
</div>

**Guter Start in der Mietwohnung:** Zigbee-Stick an Home Assistant plus Steckdosen und Sensoren — nichts an der Wand fixiert, beim Umzug passt alles in einen Karton. Stick: [bester Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/).

## Unkritische Geräte

**Smarte Steckdosen (Typ F Schuko in DE/AT, Typ J in der CH).** Programmierbare Zusatzheizung, Verbrauch messen, aus der Ferne abschalten. Nennstrom des Herstellers beachten (häufig 16 A bei Schuko) und keine Steckdosenleisten kaskadieren. Übersicht: [smarte Steckdosen](/de/smart-home/smarte-steckdosen/).

**Batterie-Sensoren.** Temperatur, Luftfeuchte, Fenster, Wasserleck — kleben oder abstellen. Auswahl: [Zigbee-Temperatursensor](/de/smart-home/zigbee-temperatursensor/). Abziehbare Kleber schonen die Wandfarbe.

**Funk-Taster.** Ein Zigbee-Taster an der Tür kann beim Verlassen alle Lampen ausschalten — ohne Kabel an der Installation.

## Vorher klären

**Heizkörperthermostate.** Am Wasserheizkörper mit Thermostatventil lässt sich der Kopf gegen ein smartes Modell tauschen, ohne zu entleeren. Alten Kopf aufheben und beim Auszug wieder montieren. Gewinde und Adapter prüfen.

**Kameras.** Technisch unproblematisch innen. Filmen von Gemeinschaftsflächen oder der Straße ist in Deutschland problematisch (Datenschutz): Kamera nur auf Ihr Eigentum richten. Orientierung: [BfDI – Videoüberwachung im Privathaushalt](https://www.bfdi.bund.de/DE/Themen/Technik/Telekommunikation/Videoüberwachung/videoueberwachung-node.html).

## Dem Vermieter überlassen

Module hinter Schaltern, Rollläden, Sicherungskasten, Heizungsregler — schriftliche Erlaubnis und Elektrofachkraft.

## Die Zentrale: diskret und transportabel

[Home Assistant Green oder Raspberry Pi 5](/de/smart-home/home-assistant-green-vs-raspberry-pi-5/) per Ethernet an den Router. Beim Umzug neu einstecken — Automatisierungen und Historie bleiben. Systemwahl: [Home Assistant, Jeedom, Homey](/de/smart-home/home-assistant-jeedom-homey-welche-zentrale/). Gesamtplan: [Einstieg Smart Home](/de/smart-home/einstieg/).

Ein Lernroboter in derselben Wohnung hängt an der Bodenfläche, am Motorengeräusch und an einer Kiste am Umzugstag: [Robotik-Ausrüstung für Mieter](/de/robotik-ausruestung-fuer-mieter/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
