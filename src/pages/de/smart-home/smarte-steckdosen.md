---
layout: ../../../layouts/DePost.astro
title: "Smarte Steckdosen (Schuko) für Home Assistant: Ratgeber 2026"
description: "So wählen Sie eine smarte Steckdose für Deutschland, Österreich (Schuko Typ F, 230 V) oder die Schweiz (Typ J): Zigbee vs WLAN vs Matter, Energiemessung, Kennzeichnung und Einrichtung in Home Assistant."
updated: "22. Oktober 2026"
---

Die smarte Steckdose ist das einfachste erste Smart-Home-Gerät, aber auch das, bei dem **das Land am meisten zählt**. Ein Modell für britische (Typ G) oder US-Steckdosen (Typ A/B) ist für einen deutschen Haushalt das falsche Produkt. Dieser Ratgeber erklärt, worauf Sie achten sollten.

## 1. Elektrische Grundlagen

| | Deutschland / Österreich | Schweiz |
|---|---|---|
| Steckdose | Typ F (Schuko) | Typ J (T13) |
| Spannung | 230 V, 50 Hz | 230 V, 50 Hz |
| Belastbarkeit | Schuko-Steckdosen sind für 16 A ausgelegt; die Nennlast der smarten Steckdose steht auf dem Gerät | T13-Steckdosen sind für 10 A ausgelegt |
| Kennzeichnung | CE | CE; Schweizer Version (Typ J) wählen |

**Prüfen Sie immer die Nennlast** auf der Steckdose, bevor Sie einen Heizlüfter oder Wasserkocher anschließen, und vermeiden Sie das Hintereinanderstecken mehrerer Steckdosen.

## 2. Zigbee, WLAN oder Matter?

| Typ | Vorteile | Nachteile | Wählen Sie ihn, wenn |
|---|---|---|---|
| **Zigbee** | lokal, sparsam, arbeitet als Mesh-Repeater | braucht einen Zigbee-Koordinator | Sie Home Assistant mit einem [Zigbee-Stick](/de/smart-home/bester-zigbee-stick-home-assistant/) betreiben |
| **WLAN** | keine Zentrale, schnelle Einrichtung per App | belastet das WLAN, oft Cloud-abhängig | Sie gerade erst anfangen |
| **Matter (über WLAN oder Thread)** | funktioniert mit Apple Home, Google Home, Alexa, SmartThings und Home Assistant | Matter-Logo und Version auf der Verpackung prüfen | Sie sich nicht an einen Hersteller binden wollen |

## 3. Worauf Sie im Datenblatt achten sollten

- **Energiemessung** (W, kWh): nützlich, um Standby-Verbrauch zu entdecken und „Waschmaschine fertig“-Meldungen auszulösen.
- **Nennlast**: bei Schuko-Modellen häufig 16 A, aber immer die Angabe des Herstellers prüfen.
- **Lokale Steuerung**: Funktioniert sie ohne die Cloud des Herstellers? Shelly, die meisten Zigbee-Steckdosen und Matter-Steckdosen können das.
- **Taste und LED am Gerät**: praktisch für Gäste; prüfen, ob sich die LED im Schlafzimmer abschalten lässt.

## 4. Beispiel: Shelly-Steckdosen

Shelly verkauft seine Steckdosen in **Länderversionen** (EU-Schuko, UK, US), mit WLAN, lokaler Steuerung und Home-Assistant-Integration. Wählen Sie Ihre Länderversion im [Shelly-Steckdosensortiment](https://www.shelly.com/collections/smart-plugs). Für fest verdrahtete Beleuchtung akzeptiert das Relais [Shelly 1 Gen4](https://www.shelly.com/products/shelly-1-gen4) **110–240 V AC** und schaltet bis zu **16 A bei 240 V** ([Shelly Knowledge Base](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4)). Es wird hinter einem Schalter eingebaut, und das ist Sache einer Elektrofachkraft.

## 5. Eine Steckdose in Home Assistant einbinden

1. **Zigbee-Steckdose**: in Home Assistant die Integration ZHA oder Zigbee2MQTT öffnen, *Gerät hinzufügen* wählen, dann die Taste der Steckdose gedrückt halten, bis die LED blinkt.
2. **WLAN-Steckdose**: mit der App des Herstellers ins Netz bringen, dann die passende Integration hinzufügen (Shelly wird im lokalen Netz automatisch erkannt).
3. **Matter-Steckdose**: den Matter-QR-Code mit der Home-Assistant-Companion-App scannen.

## 6. Zwei nützliche Automationen

- **Waschmaschine fertig**: Wenn die Leistung zwei Minuten lang unter wenige Watt fällt, eine Benachrichtigung aufs Handy senden.
- **Standby nachts abschalten**: die TV-Ecke um Mitternacht aus- und um 7 Uhr wieder einschalten.

Ganz am Anfang? Lesen Sie [Smart Home für Einsteiger](/de/smart-home/einstieg/).

[Alle Smart-Home-Ratgeber](/de/smart-home/)
