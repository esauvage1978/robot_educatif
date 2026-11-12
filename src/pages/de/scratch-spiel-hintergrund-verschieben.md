---
layout: ../../layouts/DePost.astro
title: "Scratch: einen Hintergrund mit den Pfeiltasten verschieben"
description: "Teil 1: einen Boden zeichnen, der breiter ist als die Bühne, und ihn mit den Pfeiltasten um 5 Pixel verschieben."
updated: "12. November 2026"
---

Das ist der erste Teil einer Reihe. Er baut den Boden eines Spiels und lässt ihn mit den Pfeiltasten laufen. Figur, Plattformen und Sprung stehen nicht auf dieser Seite.

## 1. Vorher

[mBlock 5 unter Windows installieren](/de/mblock-5-installieren-windows/) oder [Scratch](https://scratch.mit.edu/) öffnen. Bühne, Figur und Blockkategorien sollten bekannt sein: [Oberfläche von mBlock 5](/de/erste-schritte-mblock-5/). Das [Quadrat](/de/scratch-aktivitaet-quadrat/) ist ein erstes Skript an einer Figur.

Mehrere Skripte können auf derselben Figur liegen und gleichzeitig laufen. Der Skriptbereich zeigt das ausgewählte Objekt.

## 2. Einen Boden zeichnen, der breiter ist als die Bühne

Der Boden ist eine **Figur**, kein Bühnenbild. Das Bühnenbild hat keine Kategorie **Bewegung**, also kein x.

1. Unter **Figuren** auf **hinzufügen**, dann **Malen**.
2. Eine Platte zeichnen, deren Oberseite auf der ganzen Strecke eine Farbe hat.
3. Mehrere Teile mit **in Bitmap umwandeln** und danach dem Befehl, der die Auswahl zu einer Form macht, zusammenfassen. Die englische Oberfläche nennt den zweiten Schritt oft im Bitmap-Werkzeug.
4. Die Platte duplizieren (Strg+C, Strg+V), fünf Kopien ausrichten, alles markieren (Strg+A) und wieder zusammenfassen.
5. Diesen Block an den rechten Rand der Zeichenfläche schieben und eine Platte ansetzen. In der ursprünglichen Übung stand die Breite dann auf 841 Pixel. Lesen Sie die Zahl auf Ihrem Bildschirm.
6. Wiederholen, bis das Kostüm mindestens 7 000 Pixel breit ist. Die Scratch-Bühne ist 480 Pixel breit.

## 3. Das Programm

Die Bühne geht von x = −240 bis x = 240. Das x der Figur ist die Mitte des Kostüms. Pfeil rechts: der Boden wandert 5 Pixel nach links. Pfeil links: umgekehrt.

Legen Sie drei Variablen **nur für diese Figur** an: `decor_largeur` (gelesene Breite), `decor_debut` (Start-x), `decor_fin` (End-x).

Wenn die grüne Flagge angeklickt wird:

1. setze `decor_largeur` auf diese Breite (im Beispiel 7 000);
2. setze `decor_debut` auf `(decor_largeur / 2) − 240`;
3. setze `decor_fin` auf `240 − (decor_largeur / 2)`;
4. gehe zu x: `decor_debut`, y: 0.

Bei 7 000 ist der Start 3 260 und das Ende −3 260. Der linke Rand des Kostüms liegt dann am linken Bühnenrand. Diese Rechnung wurde für diese Aktualisierung nicht in Scratch nachgespielt. Wenn der Boden nicht links startet, passen Vorzeichen oder gelesene Breite nicht zum Kostüm.

In **wiederhole fortlaufend**:

- wenn **Pfeil rechts gedrückt** und **x-Position > decor_fin**, **ändere x um −5**;
- wenn **Pfeil links gedrückt** und **x-Position < decor_debut**, **ändere x um 5**.

Kontrolle: grüne Flagge, der Boden steht links. Pfeil rechts verschiebt ihn und stoppt bei `decor_fin`. Pfeil links bringt ihn zurück und stoppt bei `decor_debut`.

## 4. Weiter

Beispiele auf [Scratch](https://scratch.mit.edu/). Auf dieser Website: [das Quadrat](/de/scratch-aktivitaet-quadrat/), [mBlock 5 installieren](/de/mblock-5-installieren-windows/), [erstes mBot-Programm](/de/erstes-mbot-programm/).
