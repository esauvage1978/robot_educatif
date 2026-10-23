---
layout: ../../layouts/DePost.astro
title: "mBlock: mBot verbindet sich nicht per Bluetooth? So gehen Sie vor"
description: "mBot, mBot2 oder Codey Rocky verbinden sich in mBlock nicht per Bluetooth? Prüfen Sie in der richtigen Reihenfolge: zuerst USB, dann mBlock und Firmware, Bluetooth am PC, Kopplung, Reichweite und Störungen. Mit Tabelle: USB oder Bluetooth je nach Situation."
updated: "23. Oktober 2026"
---

Die **Bluetooth**-Verbindung zwischen **mBlock** und einem Roboter (**mBot**, **mBot2**, **Codey Rocky**) sorgt oft für den ersten Frust: Per USB klappt alles, kabellos nicht. Die Ursachen lassen sich in wenige Gruppen einteilen: **Software**, **Funk am PC**, **Kopplung** und **Umgebung**. Diese Prüfreihenfolge verhindert, dass man alles durcheinanderbringt.

## 1. Die Reihenfolge (keinen Schritt überspringen)

| Schritt | Prüfen | Warum |
|---|---|---|
| 1 | **Roboter per USB testen** | scheitert schon das Hochladen per USB, liegt es nicht an Bluetooth |
| 2 | **mBlock aktualisieren** | eine zum Betriebssystem passende Version nutzen |
| 3 | **Firmware des Roboters aktualisieren** | eine alte Firmware kann Bluetooth blockieren |
| 4 | **Bluetooth am PC** | Flugmodus, Fn-Taste, Treiber |
| 5 | **Sauber neu koppeln** | altes Gerät entfernen, dann neu koppeln |
| 6 | **Reichweite und Störungen** | zuerst aus etwa 1 m testen |

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

| Situation | Empfehlung |
|---|---|
| Klasse mit 30 Schülern | USB zum **Hochladen**; Bluetooth für Tests, wenn der Raum es zulässt |
| Wettbewerb oder Vorführung | USB oder eine **am Vortag getestete** Einrichtung: keine erste Bluetooth-Verbindung am Tag selbst |
| Fehlersuche | **immer** zuerst per USB prüfen, bevor man den Roboter verdächtigt |

**Unser Rat:** **Zuerst USB**, um zu beweisen, dass der Roboter antwortet; **dann Bluetooth**, mit aktuellem mBlock und sauberer Kopplung. Danach geht es weiter mit dem [ersten mBot-Programm](/de/erstes-mbot-programm/). Weitere Anleitungen unter [Anleitungen](/de/anleitungen/).
