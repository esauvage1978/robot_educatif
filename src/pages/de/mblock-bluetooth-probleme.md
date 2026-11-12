---
layout: ../../layouts/DePost.astro
title: "mBlock: mBot verbindet sich nicht per Bluetooth? So gehen Sie vor"
description: "mBot, mBot2 oder Codey Rocky verbindet sich in mBlock nicht per Bluetooth? Prüfen Sie USB, Firmware, Kopplung, Reichweite und Störungen. Zuerst das USB-Kabel."
updated: "23. Oktober 2026"
---

Die **Bluetooth**-Verbindung zwischen **mBlock** und einem Roboter (**mBot**, **mBot2**, **Codey Rocky**) sorgt oft für den ersten Frust: Per USB klappt alles, kabellos nicht. Die Ursachen lassen sich in wenige Gruppen einteilen: **Software**, **Funk am PC**, **Kopplung** und **Umgebung**. Diese Prüfreihenfolge verhindert, dass man alles durcheinanderbringt.

## 1. Die Reihenfolge (keinen Schritt überspringen)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Schritt</th>
<th scope="col">Prüfen</th>
<th scope="col">Warum</th>
</tr></thead><tbody>
<tr>
<td data-label="Schritt"><span class="td-val">1</span></td>
<td data-label="Prüfen"><span class="td-val"><strong>Roboter per USB testen</strong></span></td>
<td data-label="Warum"><span class="td-val">scheitert schon das Hochladen per USB, liegt es nicht an Bluetooth</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">2</span></td>
<td data-label="Prüfen"><span class="td-val"><strong>mBlock aktualisieren</strong></span></td>
<td data-label="Warum"><span class="td-val">eine zum Betriebssystem passende Version nutzen</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">3</span></td>
<td data-label="Prüfen"><span class="td-val"><strong>Firmware des Roboters aktualisieren</strong></span></td>
<td data-label="Warum"><span class="td-val">eine alte Firmware kann Bluetooth blockieren</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">4</span></td>
<td data-label="Prüfen"><span class="td-val"><strong>Bluetooth am PC</strong></span></td>
<td data-label="Warum"><span class="td-val">Flugmodus, Fn-Taste, Treiber</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">5</span></td>
<td data-label="Prüfen"><span class="td-val"><strong>Sauber neu koppeln</strong></span></td>
<td data-label="Warum"><span class="td-val">altes Gerät entfernen, dann neu koppeln</span></td>
</tr>
<tr>
<td data-label="Schritt"><span class="td-val">6</span></td>
<td data-label="Prüfen"><span class="td-val"><strong>Reichweite und Störungen</strong></span></td>
<td data-label="Warum"><span class="td-val">zuerst aus etwa 1 m testen</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Software und Firmware

- mBlock von der offiziellen Website installieren und die Versionshinweise zu Ihrem Modell lesen: siehe [mBlock 5 installieren](/de/mblock-5-installieren-windows/).
- Die Firmware nach der Dokumentation von [Makeblock](/de/marke-makeblock/) für **Ihren** Roboter aktualisieren. Nach einem größeren Update Roboter und PC neu starten.

## 3. Bluetooth am Computer

- Am Laptop können **Flugmodus** oder eine **Fn-Taste** den Funk ohne deutlichen Hinweis abschalten.
- Manche **USB-Bluetooth-Adapter** laufen stabiler als der eingebaute Chip: Bleiben die Fehler, einen aktuellen Bluetooth-5-Adapter testen.

## 4. Kopplung unter Windows

- Das alte Gerät unter **Einstellungen → Bluetooth und Geräte** entfernen und neu koppeln.
- Andere Apps schließen, die den Roboter belegen könnten (Fernsteuer-Apps, ein zweites mBlock-Fenster).

## 5. Reichweite und Störungen

- Zuerst **nah am Computer** testen (etwa 1 m), ohne Metallwand dazwischen.
- **USB-3.0**-Geräte wegrücken, die manche 2,4-GHz-Verbindungen stören können (kommt vor, aber nicht immer).

## 6. USB oder Bluetooth?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Situation</th>
<th scope="col">Empfehlung</th>
</tr></thead><tbody>
<tr>
<td data-label="Situation"><span class="td-val">Klasse mit 30 Schülern</span></td>
<td data-label="Empfehlung"><span class="td-val">USB zum <strong>Hochladen</strong>; Bluetooth für Tests, wenn der Raum es zulässt</span></td>
</tr>
<tr>
<td data-label="Situation"><span class="td-val">Wettbewerb oder Vorführung</span></td>
<td data-label="Empfehlung"><span class="td-val">USB oder eine <strong>am Vortag getestete</strong> Einrichtung: keine erste Bluetooth-Verbindung am Tag selbst</span></td>
</tr>
<tr>
<td data-label="Situation"><span class="td-val">Fehlersuche</span></td>
<td data-label="Empfehlung"><span class="td-val"><strong>immer</strong> zuerst per USB prüfen, bevor man den Roboter verdächtigt</span></td>
</tr>
</tbody>
</table>
</div>

**Unser Rat:** **Zuerst USB**, um zu beweisen, dass der Roboter antwortet; **dann Bluetooth**, mit aktuellem mBlock und sauberer Kopplung. Danach geht es weiter mit dem [ersten mBot-Programm](/de/erstes-mbot-programm/). Weitere Anleitungen unter [Anleitungen](/de/anleitungen/).
