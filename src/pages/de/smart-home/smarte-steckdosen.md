---
layout: ../../../layouts/DePost.astro
title: "Smarte Steckdosen (Schuko) für Home Assistant: Ratgeber 2026"
description: "So wählen Sie eine smarte Steckdose für Deutschland, Österreich (Schuko Typ F, 230 V) oder die Schweiz (Typ J): Zigbee vs WLAN vs Matter, Energiemessung, Kennzeichnung und Einrichtung in Home Assistant."
updated: "22. Oktober 2026"
---

Die smarte Steckdose ist das einfachste erste Smart-Home-Gerät, aber auch das, bei dem **das Land am meisten zählt**. Ein Modell für britische (Typ G) oder US-Steckdosen (Typ A/B) ist für einen deutschen Haushalt das falsche Produkt. Dieser Ratgeber erklärt, worauf Sie achten sollten.

## 1. Elektrische Grundlagen

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Deutschland / Österreich</th>
<th scope="col">Schweiz</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Steckdose</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">Typ F (Schuko)</span></td>
<td data-label="Schweiz"><span class="td-val">Typ J (T13)</span></td>
</tr>
<tr>
<td><span class="td-val">Spannung</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">230 V, 50 Hz</span></td>
<td data-label="Schweiz"><span class="td-val">230 V, 50 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Belastbarkeit</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">Schuko-Steckdosen sind für 16 A ausgelegt; die Nennlast der smarten Steckdose steht auf dem Gerät</span></td>
<td data-label="Schweiz"><span class="td-val">T13-Steckdosen sind für 10 A ausgelegt</span></td>
</tr>
<tr>
<td><span class="td-val">Kennzeichnung</span></td>
<td data-label="Deutschland / Österreich"><span class="td-val">CE</span></td>
<td data-label="Schweiz"><span class="td-val">CE; Schweizer Version (Typ J) wählen</span></td>
</tr>
</tbody>
</table>
</div>

**Prüfen Sie immer die Nennlast** auf der Steckdose, bevor Sie einen Heizlüfter oder Wasserkocher anschließen, und vermeiden Sie das Hintereinanderstecken mehrerer Steckdosen.

## 2. Zigbee, WLAN oder Matter?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Typ</th>
<th scope="col">Vorteile</th>
<th scope="col">Nachteile</th>
<th scope="col">Wählen Sie ihn, wenn</th>
</tr></thead><tbody>
<tr>
<td data-label="Typ"><span class="td-val"><strong>Zigbee</strong></span></td>
<td data-label="Vorteile"><span class="td-val">lokal, sparsam, arbeitet als Mesh-Repeater</span></td>
<td data-label="Nachteile"><span class="td-val">braucht einen Zigbee-Koordinator</span></td>
<td data-label="Wählen Sie ihn, wenn"><span class="td-val">Sie Home Assistant mit einem <a href="/de/smart-home/bester-zigbee-stick-home-assistant/">Zigbee-Stick</a> betreiben</span></td>
</tr>
<tr>
<td data-label="Typ"><span class="td-val"><strong>WLAN</strong></span></td>
<td data-label="Vorteile"><span class="td-val">keine Zentrale, schnelle Einrichtung per App</span></td>
<td data-label="Nachteile"><span class="td-val">belastet das WLAN, oft Cloud-abhängig</span></td>
<td data-label="Wählen Sie ihn, wenn"><span class="td-val">Sie gerade erst anfangen</span></td>
</tr>
<tr>
<td data-label="Typ"><span class="td-val"><strong>Matter (über WLAN oder Thread)</strong></span></td>
<td data-label="Vorteile"><span class="td-val">funktioniert mit Apple Home, Google Home, Alexa, SmartThings und Home Assistant</span></td>
<td data-label="Nachteile"><span class="td-val">Matter-Logo und Version auf der Verpackung prüfen</span></td>
<td data-label="Wählen Sie ihn, wenn"><span class="td-val">Sie sich nicht an einen Hersteller binden wollen</span></td>
</tr>
</tbody>
</table>
</div>

## 3. Worauf Sie im Datenblatt achten sollten

- **Energiemessung** (W, kWh): nützlich, um Standby-Verbrauch zu entdecken und „Waschmaschine fertig“-Meldungen auszulösen.
- **Nennlast**: bei Schuko-Modellen häufig 16 A, aber immer die Angabe des Herstellers prüfen.
- **Lokale Steuerung**: Funktioniert sie ohne die Cloud des Herstellers? Shelly, die meisten Zigbee-Steckdosen und Matter-Steckdosen können das.
- **Taste und LED am Gerät**: praktisch für Gäste; prüfen, ob sich die LED im Schlafzimmer abschalten lässt.

## 4. Beispiel: Shelly-Steckdosen

Shelly verkauft seine Steckdosen in **Länderversionen** (EU-Schuko, UK, US), mit WLAN, lokaler Steuerung und Home-Assistant-Integration. Wählen Sie Ihre Länderversion im [Shelly-Steckdosensortiment](https://www.shelly.com/collections/smart-plugs). Zigbee-Steckdosen mit Energiemessung finden Sie auch [bei Amazon.de](https://www.amazon.de/s?k=Zigbee+Steckdose+Strommessung&tag=roboteducat00-21) (Werbelink). Für fest verdrahtete Beleuchtung akzeptiert das Relais [Shelly 1 Gen4](https://www.shelly.com/products/shelly-1-gen4) **110–240 V AC** und schaltet bis zu **16 A bei 240 V** ([Shelly Knowledge Base](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4)). Es wird hinter einem Schalter eingebaut, und das ist Sache einer Elektrofachkraft.

## 5. Eine Steckdose in Home Assistant einbinden

1. **Zigbee-Steckdose**: in Home Assistant die Integration ZHA oder Zigbee2MQTT öffnen, *Gerät hinzufügen* wählen, dann die Taste der Steckdose gedrückt halten, bis die LED blinkt.
2. **WLAN-Steckdose**: mit der App des Herstellers ins Netz bringen, dann die passende Integration hinzufügen (Shelly wird im lokalen Netz automatisch erkannt).
3. **Matter-Steckdose**: den Matter-QR-Code mit der Home-Assistant-Companion-App scannen.

## 6. Zwei nützliche Automationen

- **Waschmaschine fertig**: Wenn die Leistung zwei Minuten lang unter wenige Watt fällt, eine Benachrichtigung aufs Handy senden.
- **Standby nachts abschalten**: die TV-Ecke um Mitternacht aus- und um 7 Uhr wieder einschalten.

Ganz am Anfang? Lesen Sie [Smart Home für Einsteiger](/de/smart-home/einstieg/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
