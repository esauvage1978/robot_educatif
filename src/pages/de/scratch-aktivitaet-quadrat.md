---
layout: ../../layouts/DePost.astro
title: "Quadrat in Scratch zeichnen (einfache Aktivität)"
description: "So zeichnen Sie ein Quadrat in Scratch: Figur platzieren, den Weg überlegen und dann mit Stift und der Schleife „wiederhole 4 mal“ programmieren. Schritt für Schritt für Einsteiger."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Bei einem Kauf können wir eine Provision erhalten — ohne Mehrkosten für Sie.

Ein Quadrat zu zeichnen gehört zu den besten ersten Aufgaben, um das Programmieren zu lernen. Man braucht nur wenige Blöcke, aber man muss sich die richtigen Fragen stellen: Wo steht die Figur? In welche Richtung schaut sie? Was soll sie tun, und wie oft?

In dieser Aktivität lassen Sie eine kleine Figur (die Spielfigur auf der Bühne, hier ein Panda) um ein Quadrat mit 200 Schritten Seitenlänge laufen. Zuerst verstehen Sie, wie die Bühne vermessen ist, dann setzen Sie die Figur an die richtige Stelle, und schließlich **programmieren Sie den Weg selbst**. Die Lösung steht weiter unten, eingeklappt, damit Sie zuerst selbst suchen können: Man lernt am besten durch Ausprobieren, und auch durch ein paar Fehler.

Die Aktivität eignet sich ab 8 Jahren, bei den Jüngsten mit einem Erwachsenen an der Seite. Planen Sie etwa 30 Minuten ein.

## Was Sie vor dem Start brauchen

Ein Programm, mit dem man mit Blöcken programmiert, und etwas Vertrautheit mit dessen Bildschirm:

- **Scratch** (die kostenlose Software des MIT, des Massachusetts Institute of Technology, online nutzbar unter [scratch.mit.edu](https://scratch.mit.edu/)) oder **mBlock 5** (die Software von Makeblock, auf Basis von Scratch 3, mit zusätzlicher Roboterprogrammierung). Zur Installation von mBlock folgen Sie unserer Anleitung [mBlock 5 unter Windows 10/11 installieren](/de/mblock-5-installieren-windows/).
- Einen ersten Rundgang über die Oberfläche: Bühne, Blockkategorien und Skriptbereich. Der Leitfaden [Erste Schritte in mBlock 5](/de/erste-schritte-mblock-5/) stellt jeden dieser Bereiche vor.

Die Screenshots in diesem Artikel stammen aus mBlock 5. In Scratch online sind die Blöcke dieselben; nur einige Menübezeichnungen weichen leicht ab.

## Die Bühne und ihr Koordinatensystem

Damit man einer Figur sagen kann, wohin sie gehen soll, braucht man eine Möglichkeit, eine genaue Stelle auf der Bühne zu benennen. Scratch und mBlock verwenden dafür ein **orthonormales Koordinatensystem**: zwei Achsen, die sich im rechten Winkel kreuzen, mit derselben Einteilung auf beiden.

- Die **X-Achse** verläuft waagerecht: Die Werte wachsen nach rechts.
- Die **Y-Achse** verläuft senkrecht: Die Werte wachsen nach oben.
- Der Punkt, an dem sich beide Achsen kreuzen, heißt **Ursprung**. Er hat die Koordinaten **(0, 0)** und liegt in der **Mitte** der Bühne.

Die Koordinaten eines Punktes schreibt man **(x, y)**: zuerst die **Abszisse** (die waagerechte Position), dann die **Ordinate** (die senkrechte Position). Der Punkt (50, −30) liegt zum Beispiel 50 Einheiten rechts von der Mitte und 30 Einheiten darunter.

![Schema des Koordinatensystems der mBlock-/Scratch-Bühne: Ursprung in der Mitte, x-Achse von −240 bis +240, y-Achse von −180 bis +180.](/images/blog/activite-scratch-carre/repere-orthonorme-mblock.svg)

*Die Bühne ist 480 Einheiten breit und 360 hoch. Eine Einheit entspricht einem „Schritt“ der Figur: Wenn Sie „gehe 10er-Schritt“ schreiben, bewegt sie sich um 10 Einheiten.*

> **Bühnengrenzen:** Damit die Figur sichtbar bleibt, muss **x** zwischen **−240** und **+240** bleiben und **y** zwischen **−180** und **+180**.

## Die Figur an den Startpunkt setzen

Unser Quadrat beginnt in der linken oberen Ecke. Setzen Sie die Figur daher auf die Koordinaten **(−100, 100)**.

![Der Panda im oberen linken Teil der Bühne, am Punkt (−100, 100).](/capture/carre/01-placement-lutin-moins100-100.png)

*Der Panda, oben links auf der Bühne platziert.*

Dafür gibt es zwei Wege: die **Figur mit der Maus** auf der Bühne **verschieben** oder die **Werte eintippen** im Figurenbereich, im Reiter **Figuren**. Die zweite Methode ist die genauere.

![Der mBlock-Figurenbereich mit X = −100, Y = 100, Größe = 100 und Richtung = 90.](/capture/carre/02-saisie-coordonnees-lutin.png)

*Der Figurenbereich: X ist −100 und Y ist 100. Beachten Sie auch das Feld **Richtung** mit dem Wert 90: Die Figur schaut nach rechts. Merken Sie sich das, Sie brauchen es gleich.*

## Jetzt sind Sie dran!

Hier ist die Aufgabe. Die Figur steht bei (−100, 100), schaut nach rechts, und die Seite des Quadrats ist **200 Schritte** lang.

> **Ihre Aufgabe:** Wenn die **Leertaste** gedrückt wird, läuft die Figur die vier Seiten des Quadrats **im Uhrzeigersinn** ab und kehrt dann zu ihrem Startpunkt zurück.

Bevor Sie einen einzigen Block anfassen, nehmen Sie ein Blatt Papier. Zeichnen Sie das Quadrat, notieren Sie, wo die vier Ecken liegen, und überlegen Sie, was die Figur an jeder Ecke tun muss. Diese Minute Nachdenken spart Ihnen viel Zeit.

### Wo man die Blöcke findet

Die Blöcke sind in **Kategorien** sortiert, in der linken Spalte des Programmierbereichs. Jede Kategorie hat ihre Farbe: Blau für **Bewegung**, Orange für **Steuerung**, Gelb für **Ereignisse** und so weiter. Unten in der Spalte können Sie mit der Schaltfläche **Erweiterung** weitere Kategorien hinzufügen.

![Die Liste der Blockkategorien in mBlock 5: Suchen, Bewegung, Aussehen, Klang, Ereignisse, Steuerung, Fühlen, Operatoren, Variablen, Meine Blöcke und die Schaltfläche Erweiterung.](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

*Die Blockkategorien in mBlock 5. Die Schaltfläche „Erweiterung“ unten dient dazu, die Kategorie Stift hinzuzufügen.*

Die Blöcke setzen Sie dann im großen **Skriptbereich** zusammen: Sie ziehen sie dorthin und stecken sie untereinander zusammen, wie Puzzleteile. Ein Block, der nicht einrastet, tut nichts: Bleibt er von den anderen getrennt, wird er nicht ausgeführt.

![Der leere Skriptbereich von mBlock 5: ein Punktraster, auf dem man die Blöcke ablegt.](/images/blog/premier-pas-mblock/mblock-zone-script.png)

*Der Skriptbereich, noch leer. Hier bauen Sie Ihr Programm.*

### Ein Hinweis, wie es gelingt: Stift und Schleife

Mit dem **Stift** kann die Figur hinter sich eine Linie zeichnen. Hier sind die Zutaten der Methode mit den wenigsten Blöcken, ohne dass wir die Reihenfolge verraten:

- ein Block aus der Kategorie **Ereignisse**, um mit der Tastatur zu starten: „Wenn Taste Leertaste gedrückt wird“;
- der **Stift**, den Sie mit der Schaltfläche **Erweiterung** hinzufügen (wählen Sie die Erweiterung Stift): Er muss aufgesetzt werden, damit die Figur eine Spur hinterlässt;
- der Block **gehe … Schritt** aus der Kategorie **Bewegung**;
- der Block **drehe dich ↻ um … Grad**, ebenfalls in **Bewegung**. Der Pfeil ↻ dreht im Uhrzeigersinn;
- die **Schleife** „**wiederhole … mal**“ aus der Kategorie **Steuerung**: Statt dieselben Blöcke mehrfach zu kopieren, setzt man sie in die Schleife, die sie so oft abspielt, wie Sie es verlangen.

Ein Quadrat ist viermal dasselbe: eine Seite, dann eine Drehung. Fragen Sie sich also, was in die Schleife gehört, wie oft sie wiederholt werden muss und um wie viele Grad an jeder Ecke gedreht wird.

Wenn Sie lieber mit den **Koordinaten** Ihrer vier Ecken denken, können Sie auch den Block „gleite in … Sek. zu x: … y: …“ verwenden, der die Figur sanft zu einem bestimmten Punkt bewegt. Beide Methoden sind gültig.

### So prüfen Sie Ihre Arbeit

Drücken Sie die **Leertaste** auf Ihrer Tastatur. Es ist gelungen, wenn:

1. die Figur eine volle Runde im Uhrzeigersinn macht;
2. sie genau zu ihrem Startpunkt zurückkehrt;
3. die Spur, falls Sie den Stift verwenden, ein echtes Quadrat zeichnet, kein Rechteck und keine Spirale.

Ein paar Hinweise, falls es nicht klappt: Eine Drehung in die falsche Richtung (↺ statt ↻) schickt die Figur aus der Bühne, wo sie am Rand hängen bleibt. Ein in der Schleife vergessener Block ergibt eine offene Figur. Und wenn sich nichts bewegt, prüfen Sie, ob alle Blöcke unter dem Block „Wenn Taste Leertaste gedrückt wird“ eingerastet sind.

Nehmen Sie sich Zeit zum Ausprobieren. Wenn Sie fertig sind oder nicht weiterkommen, öffnen Sie die Lösung unten.

<details class="exercise-solution">
<summary class="exercise-solution__summary">Eine Lösung ansehen (nach dem Ausprobieren)</summary>

### Die Koordinaten der vier Ecken

Das Quadrat hat 200 Schritte Seitenlänge, und der Startpunkt ist (−100, 100). Im Uhrzeigersinn sind die vier Ecken also:

| Schritt | Ecke | Koordinaten |
|---|---|---|
| Start | Oben links | (−100, 100) |
| 1 | Oben rechts | (100, 100) |
| 2 | Unten rechts | (100, −100) |
| 3 | Unten links | (−100, −100) |
| Zurück | Oben links | (−100, 100) |

Um von einer Ecke zur nächsten zu kommen, ändert sich nur eine der beiden Koordinaten, und zwar um 200: genau die Seitenlänge.

### Lösung mit Koordinaten

Das ist das Skript aus der Projektdatei: Beim Drücken der Leertaste gleitet die Figur jeweils 1 Sekunde lang zu den drei folgenden Ecken und kehrt dann zum Start zurück.

![Das Skript: Wenn Taste Leertaste gedrückt wird, vier Blöcke „gleite in 1 Sek. zu x: y:“ mit den Werten (100, 100), (100, −100), (−100, −100), (−100, 100).](/capture/carre/03-scene-preparee-carre.png)

*Das Lösungsskript. Die vier „gleite“-Blöcke folgen den Ecken des Quadrats im Uhrzeigersinn.*

Sie können das **[Projekt `carre.mblock` herunterladen](/capture/carre/carre.mblock)** (der Dateiname ist französisch und bedeutet „Quadrat“): Es enthält den Panda, bereits bei (−100, 100) platziert, und dieses Skript. Öffnen Sie es mit mBlock 5 (Menü **Datei**, dann **Öffnen**). Wenn Sie Scratch online verwenden, bauen Sie die Blöcke einfach nach dem Screenshot nach.

### Lösung mit Stift und „wiederhole 4 mal“

Diese Version verwendet an jeder Ecke eine Drehung um 90 Grad. Die Figur schaut nach rechts (Richtung 90): Sie geht 200 Schritte, dreht sich um 90° nach rechts und schaut nun nach unten, geht 200 Schritte, und so weiter, bis sie wieder an ihrem Startpunkt ist. Vier Drehungen um 90° ergeben genau eine volle Umdrehung, also 360°.

Hier ist die Struktur des Skripts, Block für Block (als Text, zum Nachbauen im Skriptbereich):

```text
Wenn Taste [Leertaste] gedrückt wird
lösche alles
gehe zu x: -100 y: 100
setze Richtung auf 90 Grad
schalte Stift ein
wiederhole 4 mal
    gehe 200er-Schritt
    drehe dich ↻ um 90 Grad
schalte Stift aus
```

Die ersten drei Zeilen nach dem Ereignis versetzen die Figur in ihren Ausgangszustand zurück: So können Sie das Programm beliebig oft neu starten, ohne dass frühere Spuren oder die Endposition stören. Diese Gewohnheit lohnt sich.

</details>

## Zum Weitermachen

Wenn Ihr Quadrat gelungen ist, verändern Sie es und beobachten Sie, was jeder Wert bewirkt:

- ändern Sie die Seitenlänge, zum Beispiel auf 100 oder 150 Schritte;
- ändern Sie Farbe oder Dicke der Linie mit den Blöcken der Erweiterung Stift;
- zeichnen Sie ein **gleichseitiges Dreieck**: 3 Seiten, und die Figur dreht sich an jeder Ecke um 120° (360 geteilt durch 3);
- zeichnen Sie ein **Sechseck**: 6 Seiten und 60° an jeder Ecke (360 geteilt durch 6).

Sie haben eine nützliche Regel entdeckt: Für eine regelmäßige Figur mit n Seiten wiederholt man n-mal „gehen, dann um 360 ÷ n Grad drehen“.

Wenn Ihnen dieses erste Programm Spaß gemacht hat, ist der nächste Schritt mit einem echten Roboter das [erste mBot-Programm](/de/erstes-mbot-programm/). Und wenn Sie zwischen den beiden Programmen schwanken: [mBlock oder Scratch: was wählen?](/de/mblock-vs-scratch/)

## Häufige Fragen

### Wie zeichnet man ein Quadrat in Scratch?

Setzen Sie die Figur auf eine Ecke, schalten Sie den Stift ein und wiederholen Sie dann 4-mal „gehe 200er-Schritt“ und „drehe dich um 90 Grad“. Die Figur zeichnet dann vier gleich lange Seiten und vier rechte Winkel. Die andere Methode nutzt die Koordinaten der vier Ecken mit dem Block „gleite zu x: y:“. Beide Lösungen sind oben im eingeklappten Bereich beschrieben.

### Warum 4-mal wiederholen, und warum um 90° drehen?

Ein Quadrat hat 4 gleich lange Seiten und 4 rechte Winkel. Ein rechter Winkel misst 90 Grad. Die Schleife „wiederhole 4 mal“ spielt an jeder Ecke dieselben zwei Anweisungen ab (eine Seite, eine Drehung), ohne die Blöcke zu kopieren. Nach vier Drehungen um 90° hat sich die Figur um 360° gedreht: Sie schaut wieder in ihre Startrichtung.

### Gibt es bei dieser Aktivität einen Unterschied zwischen Scratch und mBlock?

Nein, die Blöcke für Bewegung, Steuerung und Stift sind dieselben, denn mBlock 5 baut auf Scratch 3 auf. Der Unterschied liegt in den Möglichkeiten: Mit Scratch erstellt man Animationen und Spiele, mit mBlock lassen sich zusätzlich Roboter (wie der mBot) programmieren, und es gibt einen Python-Modus. Zur Entscheidung lesen Sie [mBlock oder Scratch: was wählen?](/de/mblock-vs-scratch/).

### Die Figur zeichnet keine Linie. Was tun?

Prüfen Sie, dass der Block, der den Stift aufsetzt („schalte Stift ein“), vor den Bewegungen ausgeführt wird und dass ihm nicht zu früh ein Block folgt, der den Stift wieder anhebt. Prüfen Sie außerdem, ob die Erweiterung Stift hinzugefügt wurde.

*Autor: Emmanuel Sauvage.*
