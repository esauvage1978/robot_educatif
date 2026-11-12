---
layout: ../../layouts/DePost.astro
title: "mBot-Aktivität: Text auf der LED-Matrix scrollen"
description: "Nachricht auf der mBot-LED-Matrix scrollen: Position X, Schleifen, Regel Länge×5+15. Programm-Schemata."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Beim Kauf darüber kann eine Provision anfallen — ohne Mehrkosten für Sie.

Am **mBot** kann die **LED-Matrix** (oft **5 Spalten × 8 Zeilen**) Buchstaben und Symbole zeigen. Für die Illusion eines **laufenden Bandes** drehst du Pixel nicht von Hand: du **zeigst denselben Text** mehrmals pro Sekunde, änderst aber jedes Mal seine **horizontale Position** (in mBlock oft **`X`**).

Am Ende dieser Aktivität hast du ein **wiederverwendbares Muster**, um beliebige Nachrichten mehrmals in anderen Projekten anzuzeigen.

---

## 1. Voraussetzungen

- Einen [mBot-Roboter (Makeblock)](/de/mbot-mein-erster-lernroboter/).
- [mBlock 5](/de/mblock-5-installieren-windows/) und eine erste [Orientierung in der Oberfläche](/de/erste-schritte-mblock-5/).
- Die [mBot-Blöcke](/de/mbot-bloecke-installieren/) (LED-Matrix, LEDs usw.).
- Wissen, wie man ein Programm auf die Platine **hochlädt**: [erstes mBot-Programm](/de/erstes-mbot-programm/).

Die genauen **Blocknamen** können mit **Sprache** und **Version** von mBlock variieren; die **Idee** (Variable `X`, Schleife, Wartezeit) bleibt gleich.

---

## 2. Die Matrix verstehen, bevor du programmierst

### 2.1 Ein bewegliches Fenster auf der Nachricht

Stell dir den Text als **Band** vor, breiter als der Bildschirm. Die Matrix zeigt nur ein **Fenster** weniger Spalten. Durch **Verschieben** des Bandes nach links (oder Verschieben der Anzeigeposition) lässt du die Buchstaben **laufen**.

```text
     Matrix (5 sichtbare Spalten)
          ┌─────┐
Band   … H e l l o  w o r l d …  →  wir schieben das Band
          └─────┘
```

Um zu sehen, was „echt“ passiert, hier ein Foto/Screenshot am Roboter mit einfacher Anzeige:

![Foto: ein Wort auf der LED-Matrix](/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp)

Und die passende Programm-Aufnahme (Aktivität 2.1):

![Bild der ersten Textanzeige-Aktivität](/capture/activite-mbot-faire-defiler-un-texte/2.1/premiere-activite-affichage-texte.png)

mBlock-Programm: [`afficher_1_mot.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.1/afficher_1_mot.mblock)

### 2.2 Die Rolle der Variable `X`

In mBlock setzt ein Block wie **„Text an Position X anzeigen“** (Formulierung kann variieren) den **Anfang** des Textes auf eine Abszisse `X` der Matrix.

- Wenn du den Bezug zur „Text“-Programmierung in **Arduino C** willst: `X` ist eine klassische **Variable**: du gibst ihr einen Typ (oft `int`) und änderst ihren Wert über Schleifen. Siehe: [Arduino C — Datentypen und Variablen](/de/arduino-c-datentypen-variablen/).

- **Großes `X`**: der Text beginnt **rechts**; ein Teil kann **außerhalb** (unsichtbar) sein.
- **`X` sinkt**: der Text wandert nach **links** → **Laufschrift**-Effekt.

Logisches Diagramm **eines Bildes** auf dem Screen:

```text
Position X (schematisch)
  kleines X   →  Wortanfang links sichtbar
  mittleres X →  Wort zentriert oder teilweise sichtbar
  großes X    →  Wort nach rechts / außerhalb
```

Merksatz: **zum Scrollen musst du `X` variieren** (oft Schritt für Schritt in einer Schleife verringern).

---

## 3. Erster Schritt: feste Anzeige (abgeschnittener Text)

**Ziel**: **„Hello“** anzeigen, um zu sehen, wie die Matrix reagiert.

Minimale logische Struktur:

```text
┌─────────────────────────────┐
│  Wenn mBot startet           │
│    Text "Hello" anzeigen        │
│    (an fester X-Position)           │
└─────────────────────────────┘
```

Nach dem **Hochladen** siehst du oft, dass **nur die ersten Buchstaben** erscheinen (der Rest verlässt den sichtbaren Bereich). Das ist normal: die Matrix ist **schmal**.

- Indem du **`X`** verschiebst (z. B. Richtung **10** oder **15**), kannst du den Wortanfang **verstecken** oder ihn von rechts **einlaufen** lassen.

Hier dasselbe Wort mit anderem `X`-Versatz (Beispiel `X = 10`):

![Foto: ein einzelnes Zeichen bei X = 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/photo_affichage_h.jpeg)

Programm-Aufnahme (Aktivität 2.2):

![Bild der Textanzeige-Aktivität bei X = 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/activite-affichage-texte-x-vaut-10.png)

mBlock-Programm: [`afficher_1_mot_x_vaut_10.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.2/afficher_1_mot_x_vaut_10.mblock)

**Merksatz**: die statische Anzeige **beweist** den Zusammenhang zwischen **`X`** und dem, was das Auge sieht. Scrollen ist **dieselbe Operation**, wiederholt mit **änderndem `X`**.

---

## 4. Zweiter Schritt: eine Schleife, die `X` bewegt

**Ziel**: **wiederholen**: Text an aktueller Position zeigen, **`X` verringern**, kurz warten — für Bewegung.

### 4.1 Den Start vorbereiten

- Eine Variable **`X`** anlegen.
- Am Anfang **`X = 15`** setzen (typisch, um **rechts außerhalb** zu starten und die Nachricht **einlaufen** zu lassen). An deinen Text anpassen.

### 4.2 Scroll-Schleife (ein Durchlauf)

Logische Struktur:

```text
┌──────────────────────────────────────────┐
│  Beim Start                                 │
│    X ← 15                                 │
│    ┌────────────────────────────────────┐ │
│    │  Für immer wiederholen *                   │ │
│    │    Text an Position X anzeigen         │ │
│    │    X ← X − 1                        │ │
│    │    0,1 s warten                       │ │
│    └────────────────────────────────────┘ │
└──────────────────────────────────────────┘

* Oder „für immer“ je nach verfügbaren Blöcken
```

Detaillierter Ablauf (eine Iteration):

```text
   ┌──────────────┐
   │  Anzeigen        │
   │  Text bei X   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  X ← X − 1   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Warten        │
   │  0.1 s       │
   └──────┬───────┘
          │
          └──────► (zurück zum Schleifenanfang)
```

Die **Wartezeit** (oft **0,1 s**) ist unverzichtbar: ohne sie wäre das Scrollen zu schnell zum Lesen.

Lokale Aufnahme (Abschnitt 4):

![Scrollen: Schleife, die X verringert](/capture/activite-mbot-faire-defiler-un-texte/4/defilement-boucle-diminue-x.png)

mBlock-Programm: [`boucle.mblock`](/capture/activite-mbot-faire-defiler-un-texte/4/boucle.mblock) („Schleife“).

### 4.3 Grenze dieser Version

- Das Programm kann **endlos weiterlaufen**, obwohl der Text den Screen schon **verlassen** hat.
- Du willst oft sauber einen **neuen Durchlauf** (oder **mehrere Wiederholungen**) anschließen.

→ Deshalb der **dritte Schritt**: innere Schleife **begrenzen** und in eine Schleife von **Wiederholungen** **einpacken**.

---

## 5. Dritter Schritt: mehrere Durchläufe (verschachtelte Schleifen)

**Ziel**: dieselbe Nachricht **mehrmals** scrollen, mit klarem Ende je Durchlauf.

### 5.1 Zwei Schleifenebenen

Logische Struktur **Überblick**:

```text
┌─────────────────────────────────────────────────────┐
│  Beim Start                                            │
│    ┌──────────────────────────────────────────────┐ │
│    │  Für jede Anzeige der Nachricht (z. B. 3×)      │ │  ← ÄUSSERE Schleife
│    │    X ← 15                                      │ │
│    │    ┌────────────────────────────────────────┐ │ │
│    │    │  Für eine feste Anzahl Schritte              │ │ │  ← INNERE Schleife
│    │    │    show Text bei X                         │ │ │
│    │    │    X ← X − 1                              │ │ │
│    │    │    0,1 s warten                             │ │ │
│    │    └────────────────────────────────────────┘ │ │
│    └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Verschachteltes** Diagramm („Boxen“-Ansicht):

```text
 +-- N-mal wiederholen (ganze Nachricht) ------------+
 |                                                   |
 |   X ← 15                                          |
 |   +-- (Länge × 5 + 15)-mal wiederholen ------------+  |
 |   |      anzeigen ; X←X-1 ; warten                    |  |
 |   +---------------------------------------------+  |
 +---------------------------------------------------+
```

### 5.2 Wie viele Schritte für die innere Schleife?

Damit der Übergang zwischen zwei Durchläufen weder zu lang noch zu kurz ist, gilt oft:

```text
anzahl_schritte = text_laenge * 5 + 15
```

Beispiel: für die Nachricht `Hallo` (5 Zeichen) ergibt das `5 * 5 + 15 = 40` Schritte in der inneren Schleife. So hat der Text Zeit, von rechts einzulaufen, durchzulaufen und links vollständig zu verschwinden, bevor der nächste Durchlauf beginnt.

- **`text_laenge`**: Anzahl Zeichen der Nachricht (zuerst **ohne Akzente zählen**, falls die Anzeige sie ignoriert — siehe Abschnitt 6 (Umlaute) und Abschnitt 7).
- **× 5**: praktisch ist jedes „breite“ Zeichen auf der Matrix etwa **5 Spalten** breit in der von mBlock genutzten Schrift — eine nützliche **Workshop-Näherung**, kein Naturgesetz.
- **`+ 15`**: Rand, um den Text links **vollständig** auslaufen zu lassen, nachdem er von rechts eingelaufen ist (derselbe Rand wie beim initialen **`X`**).

Du kannst **`text_laenge`** in einer Variable speichern, damit das Programm **lesbar** bleibt.

Lokale Aufnahme (Schritt 5.2):

![Drei Scroll-Wiederholungen (verschachtelte Schleifen)](/capture/activite-mbot-faire-defiler-un-texte/5.2/trois-repetitions-defilement.png)

mBlock-Programm: [`defiler52.mblock`](/capture/activite-mbot-faire-defiler-un-texte/5.2/defiler52.mblock) („Scrollen 5.2“).

### 5.2 bis DRY: dieselbe Info nicht zweimal schreiben

| Parameter | Typischer Wert | Rolle |
|---|---|---|
| **X Start** | z. B. 15 (rechts) | Startposition des Texts |
| **Schrittweite** | −1 | X sinkt → Text wandert nach links |
| **Wartezeit** | 0,1 s | Lesbarkeit vs. Tempo |

In diesem Beispiel habe ich absichtlich **den Anzeigetext nicht zweimal geschrieben** (einmal für die Länge, einmal zum Anzeigen).

Diese Programmiergewohnheit heißt **DRY** (*Don't Repeat Yourself* — Wiederholungen vermeiden):

- **wiederhole nicht** dieselbe Information an mehreren Stellen;
- sonst vergisst du beim Ändern der Nachricht vielleicht eine Stelle und bekommst ein **inkonsistentes** Programm.

Hier die DRY-Idee: **eine Quelle** für die Nachricht (eine Variable), dann wiederverwenden:

- `text_laenge` berechnen
- dieselbe Variable zum Anzeigen nutzen.

### 5.2 ter mBlock-Bug: Variable als `float`, Nachricht als Text

Standardmäßig deklariert von mBlock erzeugter Code Variablen oft als `float`. Das ist ok für Zahlen (Position `X`, Zähler …), aber **nicht** für eine Zeichenkette wie `"Meine neue Nachricht"`.

Wenn du schreibst:

```cpp
texte = "Meine neue Nachricht";
```

während `texte` als `float` deklariert ist, kann das Hochladen scheitern (Aufnahme unten):

![Upload-Fehler: float-Variable als Text verwendet](/capture/activite-mbot-faire-defiler-un-texte/5.2/erreur_televersement.png)

Beispielcode, der den Fehler auslöst. Die Variablennamen stammen aus dem mBlock-Projekt der Aufnahmen (`texte` = Text, `longueur_texte` = Textlänge, `taille_ecran` = Bildschirmbreite, `nombre_de_repetition` = Anzahl Wiederholungen); eigene Namen sind frei wählbar.

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
float texte = 0;
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "Meine neue Nachricht";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

### 5.2 quater Korrektur: Typ von `texte` ändern

Die Korrektur: `texte` als **Zeichenkette** deklarieren.

#### Schritte in mBlock (wichtig)

1. Zu `</>` → **Arduino-C-Vorschau** (nur lesen).
2. Den Code **kopieren**.
3. Den Tab **Arduino C** öffnen (dieser ist zum Bearbeiten gedacht).
4. Den Code **einfügen**, dann die Deklaration von `texte` ersetzen.

Korrigierte Version:

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
const char* texte = "";
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "Meine neue Nachricht";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

> Hinweis: auf einem mBot/mCore ist `const char*` als Global oft „leichter“ als `String`. Hier nutzen wir `String(texte)` nur für die Länge und für `c_str()` zur Anzeige.

---

## 6. Häufige Falle: Umlaute und Sonderzeichen

**Umlaute/Akzente** sind je nach Version / Anzeigemodus oft **schlecht unterstützt** oder **unsichtbar**. Für einen Workshop:

- zuerst mit **`HELLO`**, **`MBOT`**, **`SALUT`** testen;
- wenn du Text in der Landessprache brauchst, plane **ohne Umlaute** oder eine **Abkürzung**, bis du deine mBlock-Version validiert hast.

---

## 7. Überblick: didaktische Kette

```text
feste Anzeige (X und Abschneiden verstehen)
        │
        ▼
eine Schleife: X sinkt → kontinuierliches Scrollen
        │
        ▼
zwei Schleifen: N saubere Durchläufe + Schritte ≈ Länge×5+15
        │
        ▼
du kannst eine Nachricht scrollen und sauber wiederholen
```

Du kannst diese „Scroll-Engine“ jetzt in Projekten wiederverwenden (Punktestand, Anweisung, Distanz…), indem du die Logik bei Bedarf kopierst.

---

## 8. Weiterführend

- Weiter mit [Entfernungen messen](/de/mbot-aktivitaet-entfernung-messen/) , um einen dynamischen Wert anzuzeigen.
- Die **Geschwindigkeit** variieren (`warten 0,05` vs `0,2`) und die **Lesbarkeit** beobachten.
- In der Klasse diskutieren: **wie viele Spalten** pro Zeichen, wenn man auf einem Screenshot misst? (Bezug zu **Pixel** und **Typografie**).

[mBot — Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21)
