---
layout: ../../layouts/DePost.astro
title: "Arduino-Roboterbausatz für Kinder: so wählen Sie (2026)"
description: "Passt ein Arduino-Roboterbausatz zu Ihrem Kind? Alter, Vorkenntnisse, Lieferumfang, Arduino vs mBot vs Raspberry Pi und die ersten Schritte mit der Arduino IDE."
updated: "22. Oktober 2026"
---

Ein **Arduino-Roboterbausatz** ist eine Kiste mit Bauteilen (Steuerplatine, Motoren, Sensoren, Fahrgestell und Kabel), die Ihr Kind zusammenbaut und dann mit der kostenlosen [Arduino IDE](https://www.arduino.cc/en/software) in **C/C++** programmiert. Das ist ein Schritt über blockbasierte Roboter hinaus: mehr Verkabelung, mehr Tippen, aber Fähigkeiten, die sich auf fast jedes Elektronikprojekt übertragen lassen.

## 1. Was typischerweise in der Box ist

- eine **Arduino-UNO-kompatible Platine** (das Gehirn des Roboters);
- **Gleichstrommotoren** und eine Motortreiberplatine;
- **Sensoren**: Ultraschall-Abstandssensor, Linienverfolgung, manchmal Infrarot-Fernbedienung oder Kamera;
- ein **Akkupack**, Fahrgestell, Räder, Kabel und Schrauben.

## 2. Passt das Alter?

| Alter (nur Richtwert) | Empfehlung |
|---|---|
| 8–10 | Lieber ein blockbasierter Roboter (mBot) oder Arduino nur mit enger Begleitung durch Erwachsene |
| 10–12 | Einfacher Arduino-Bausatz, Verkabelung mit Hilfe von Erwachsenen |
| 12–14 | Arduino-Autobausatz mit wachsender Selbstständigkeit |
| 14+ | Autobausatz plus Erweiterungen (Kamera, weitere Sensoren) |

Zum Vergleich: [ELEGOO](/de/marke-elegoo/) gibt für sein [Smart Robot Car V4.0](https://www.elegoo.com/products/elegoo-smart-robot-car-kit-v-4-0) **13+** an (Herstellerseite, geprüft am 21. Oktober 2026).

## 3. Arduino vs mBot vs Raspberry Pi

| | Arduino-Autobausatz | Makeblock mBot | Raspberry Pi |
|---|---|---|---|
| Hauptzweck | Robotik, Echtzeit-Sensoren | erster Roboter, Schule | kleiner Computer, Server, KI |
| Programmierung | C/C++ in der Arduino IDE | Blöcke (mBlock), dann Arduino | Python, Scratch, C++ und mehr |
| Einstieg | per USB anschließen und hochladen | Bluetooth oder USB mit mBlock | Betriebssystem installieren, Bildschirm oder SSH nötig |
| Montage | technischer | etwa 15 Min. (Makeblock) | je nach Bausatz |

Blockbasierte Roboter vergleichen wir im Ratgeber [programmierbare Roboter](/de/bester-programmierbarer-roboter-fuer-kinder/), Platinen in [Raspberry Pi 3 vs 4 vs 5](/de/raspberry-pi-3-vs-4-vs-5/).

## 4. Einen Bausatz auswählen

- **Dokumentation**: eine klare PDF- oder Video-Anleitung und herunterladbarer Beispielcode sind wichtiger als die Zahl der Sensoren.
- **Standardteile**: eine echte UNO-kompatible Platine erlaubt es, später Sensoren aus anderen Bausätzen wiederzuverwenden.
- **Ersatzteile**: prüfen Sie, ob Motoren und Sensoren einzeln erhältlich sind.
- **Preis**: schwankt stark je nach Händler und Land, daher **Preis prüfen**.

## 5. Wo kaufen?

Hersteller-Shops und große Online-Marktplätze verkaufen diese Bausätze auch in Deutschland, Österreich und der Schweiz. Einzelteile und Platinen bietet der US-Händler SparkFun in seiner [Arduino-Abteilung](https://www.sparkfun.com/catalogsearch/result/?q=arduino&affiliate_code=WRBz4h1uMN) (Affiliate-Link; Versand aus den USA, Zoll und Einfuhrumsatzsteuer beachten). [DFRobot](https://www.dfrobot.com/) liefert international und verkauft Roboter-Fahrgestelle und Sensoren. Der offizielle [Arduino Store](https://store.arduino.cc/) liefert in die EU.

## 6. Erste Schritte

1. Die **Arduino IDE** von arduino.cc installieren (Windows, macOS, Linux).
2. Die Platine per USB anschließen, **Arduino Uno** und den richtigen Port wählen.
3. Das Beispiel **Blink** hochladen, um zu prüfen, ob alles funktioniert.
4. Den Roboter nach der Anleitung des Bausatzes zusammenbauen und dann seinen ersten Beispiel-Sketch laden.

## 7. Häufige Probleme

- **Roboter fährt nach dem Hochladen nicht**: Akkupack ausgeschaltet oder leer (USB allein reicht oft nicht für die Motoren).
- **Port nicht gefunden**: ein anderes USB-Kabel probieren (manche laden nur) und den USB-Treiber der Platine installieren, falls der Bausatz einen mitliefert.
- **Roboter dreht sich im Kreis**: ein Motor ist verpolt; seine beiden Kabel tauschen.

**Programmieren lernen:** unser kostenloser [Arduino-C-Kurs](/de/arduino/) beginnt mit [Sketch-Aufbau und Serial](/de/arduino-c-sketch-aufbau-serial/).
