---
layout: ../../layouts/DePost.astro
title: "Makeblock CyberPi: Test und Python-Tutorial für Einsteiger"
description: "Test der Makeblock CyberPi, einer programmierbaren Platine mit Display und Sensoren: Stärken, Grenzen, Akkusicherheit und ein erstes Python-Programm mit mBlock."
updated: "31. Oktober 2026"
---

Du hast von der **CyberPi** von [Makeblock](/de/marke-makeblock/) gehört und fragst dich, was man mit dieser kleinen durchsichtigen Platine mit Display wirklich anfangen kann? Sie interessiert neugierige Schülerinnen und Schüler der weiterführenden Schule, Technik-Lehrkräfte und Eltern, die ein Stück weiter gehen wollen als beim bloßen Videospiel. In diesem Artikel sagen wir dir, für wen sie sich eignet, was sie gut kann und was nicht, und führen dich dann Schritt für Schritt durch dein erstes Programm in **Python** – einer sehr verbreiteten Programmiersprache, die man als Text schreibt, im Gegensatz zu den bunten Blöcken, die man mit der Maus zusammensetzt.

## Was ist die CyberPi?

Die CyberPi ist eine **Entwicklungsplatine**: eine kleine elektronische Platine, die man so programmiert, dass sie auf das reagiert, was sie wahrnimmt und was man von ihr verlangt. Man kann sie als das Gehirn eines Projekts sehen, zu dem man anschließend Motoren, Lichter oder Sensoren hinzufügt. Dieses Gehirn setzt Makeblock auch in den Roboter [mBot2](/de/mbot-vs-mbot2/) ein, aber die Platine gibt es auch einzeln, ohne Räder, für Projekte, die auf dem Tisch bleiben.

![Die Makeblock CyberPi im Set CyberPi Go: Platine mit durchscheinendem Gehäuse, Farbdisplay und Joystick, Erweiterung Pocket Shield, USB-C-Kabel und Anleitung](/images/products/cyberpi.webp)

*Die CyberPi im Makeblock-Set CyberPi Go: die Platine, die Erweiterung Pocket Shield, das USB-C-Kabel und die Anleitung. Bild: Makeblock.*

Auf der Platine selbst findet man alles, um zu interagieren, ohne etwas anzuschließen:

- ein **Farbdisplay** von 1,44 Zoll (etwa 3,7 Zentimeter Diagonale) mit 128 mal 128 Punkten;
- einen **Joystick** und Tasten zum Spielen oder zum Navigieren in Menüs;
- einen **Lautsprecher** und ein **Mikrofon**;
- einen **Lichtsensor** und ein **Gyroskop**, das die Drehungen und die Neigung der Platine misst, wie in einem Smartphone;
- programmierbare **farbige Lichter** (LEDs).

Das Gehirn der Platine ist ein Chip der **ESP32**-Familie, bei Elektronik-Bastlern sehr verbreitet und in der Lage, sich drahtlos zu verbinden. Der genaue Inhalt des Sets variiert je nach Angebot: Manche Shops verkaufen die Platine allein, andere Sets mit der Erweiterung Pocket Shield oder weiterem Zubehör. Prüfe die genaue Liste vor der Bestellung.

## WLAN und Bluetooth: wozu dienen sie konkret?

Das **WLAN** (Wi-Fi) verbindet die Platine mit deinem Heimnetz und damit mit dem Internet. Es ermöglicht zum Beispiel, eine Information aus dem Netz abzurufen oder aus einem Projekt eine Nachricht zu senden. **Bluetooth** ist eine drahtlose Verbindung mit kurzer Reichweite, wie bei einem tragbaren Lautsprecher: Man nutzt sie, um die Platine ohne USB-Kabel mit einem Computer oder Tablet zu verbinden. Zum Einstieg bleibt das USB-Kabel der zuverlässigste Weg. Wenn dir die Bluetooth-Verbindung Probleme bereitet, listet unsere Seite zu [häufigen Bluetooth-Fehlern mit mBlock](/de/mblock-bluetooth-probleme/) die zu prüfenden Einstellungen auf.

Manche Vorstellungen der Platine erwähnen auch Funktionen künstlicher Intelligenz, etwa Spracherkennung, die über das Internet laufen. Wir haben sie nicht überprüft: Sie hängen von der Softwareversion und von einem Online-Dienst ab, und wir rechnen sie deshalb nicht in unsere Bewertung ein.

## Stromversorgung, Akku und Sicherheit

Allein genutzt, außerhalb des mBot2-Chassis, wird die CyberPi über ihr **USB-Kabel** oder über einen zu Makeblock kompatiblen **LiPo-Akku** (Lithium-Polymer, dieselbe Technik wie in vielen Smartphones) versorgt. Es ist **kein Anschluss ans 230-Volt-Netz** nötig: kein Sicherungskasten, den man anfassen müsste, weder zum Benutzen der Platine noch zum Wechseln eines Sensors.

Lithium-Akkus verlangen trotzdem ein paar einfache Vorsichtsmaßnahmen:

- Nutze das mitgelieferte Kabel und Ladegerät oder eine gewöhnliche USB-Buchse an Computer oder Handy-Ladegerät;
- lade den Akku nicht unbeaufsichtigt, zum Beispiel nicht über Nacht;
- benutze keinen Akku mehr, der aufgebläht, beschädigt ist oder ungewöhnlich heiß wird, und durchsteche ihn nie;
- schließe seine Drähte nicht kurz, auch nicht kurzzeitig.

## mBuild oder RJ25: die Anschlüsse nicht verwechseln

Die offiziellen Erweiterungen der CyberPi werden an das System **mBuild** angeschlossen, Module, die über magnetische Stecker oder per Kabel verbunden sind. Das ist **nicht** der **RJ25**-Anschluss des älteren [mBot](/de/mbot-mein-erster-lernroboter/), der wie eine Telefonbuchse aussieht. Prüfe vor dem Kauf eines Moduls – auch eines gebrauchten – auf der [Support-Seite von Makeblock](https://support.makeblock.com), dass es ausdrücklich für die CyberPi oder für mBuild angegeben ist.

## Unsere Einschätzung der CyberPi

Diese Einschätzung stützt sich auf die Dokumentation von Makeblock, auf die veröffentlichten Spezifikationen der Platine und auf die Art, wie die anderen Produkte dieser Reihe im Unterricht genutzt werden. Wir haben die Akkulaufzeit nicht gemessen und nennen deshalb keine Zahl.

**Für wen?**

- Ein Schüler oder Jugendlicher, der von Blöcken zu Python wechseln möchte, an einem Objekt, das er reagieren sieht (ab etwa 10 Jahren und selbstständig, und ab 8 oder 9 Jahren mit Begleitung für den Blockteil: das ist unsere Orientierung, kein vom Hersteller festgelegtes Alter).
- Eine Lehrkraft, die kompaktes Material sucht, das am Schreibtisch nutzbar ist, ohne Spielfläche und ohne Roboter, der bewegt werden muss.
- Ein Elternteil oder Maker, der Elektronik ohne Löten erkunden möchte.

**Stärken**

- Display, Ton, Licht und Joystick sind integriert: Ein erstes Projekt gelingt, ohne etwas dazuzustecken.
- Man kann mit Blöcken beginnen und in derselben Software, mBlock, zu Python wechseln, ohne die Hardware zu wechseln.
- Sie ist kompakt, leicht und kann später in einen mBot2-Roboter eingesetzt werden.

**Grenzen**

- Allein fährt sie nicht: Wenn du einen Roboter willst, der sich bewegt und Linien folgt, schau lieber auf den [mBot2 und seinen Vergleich](/de/mbot-vs-mbot2/).
- Zum Programmieren braucht sie einen Computer oder ein Tablet.
- Die Erweiterungen sind Makeblock-spezifisch: Nicht alle handelsüblichen Sensoren lassen sich direkt anschließen.
- Wenn du eher Linux lernen und einen kleinen Server betreiben möchtest, passt eine Platine vom Typ Raspberry Pi besser. Unser [Raspberry-Pi-Einstieg](/de/raspberry-pi-3-erste-schritte/) hilft bei der Entscheidung.

Wenn du für ein 10-jähriges Kind unsicher bist, vergleicht unser Ratgeber [Lernroboter für 10-Jährige](/de/lernroboter-10-jahre/) die Optionen nach Profil.

Der Preis ändert sich je nach Angeboten und Sets: Prüfe vor der Bestellung den aktuellen Preis im Amazon-Angebot.

[Die Makeblock CyberPi auf Amazon.de ansehen](https://www.amazon.de/dp/B0BBZY9L59?tag=roboteducat00-21)

Lieber gleich einen fertigen Roboter? Die CyberPi ist auch das „Gehirn“ des mBot2: [mBot2 / CyberPi-Kit auf Amazon.de](https://www.amazon.de/dp/B0919F9CKS?tag=roboteducat00-21). Weitere Makeblock-Elektronikkits: [Suche auf Amazon.de](https://www.amazon.de/s?k=Makeblock+programmierbares+Elektronik+Kit&tag=roboteducat00-21).

*Affiliate-Links: Die Seite erhält eine kleine Provision, wenn du über diese Links kaufst, ohne Mehrkosten für dich. Prüfe vor der Bestellung, ob das Angebot die CyberPi-Platine allein ist oder ein Set, das bereits den mBot2-Roboter enthält.*

## Tutorial: eine Nachricht anzeigen und auf Taste A reagieren (Python)

Dieses kleine Programm zeigt einen Text auf dem Display an und schaltet dann, jedes Mal wenn du Taste A drückst, das Licht auf Grün, spielt einen Ton und zeigt „Super!“ an.

**Niveau**: Einsteiger. **Dauer**: rechne mit einer halben Stunde, ohne die Installation von mBlock (Schätzung, nicht gestoppt).

### Voraussetzungen

- Eine geladene CyberPi.
- Ein USB-C-Kabel, **das Daten überträgt**. Manche Kabel, die nur zum Laden verkauft werden, lassen den Computer die Platine nicht erkennen.
- **mBlock 5** auf dem Computer installiert: Falls noch nicht geschehen, folge unserer [Anleitung zum Herunterladen von mBlock 5](/de/mblock-5-kostenlos-herunterladen/) und lerne dann die Oberfläche mit den [Ersten Schritten mit mBlock 5](/de/erste-schritte-mblock-5/) kennen.

### Schritt 1: die Platine verbinden

Schließe die CyberPi an den Computer an und schalte sie ein. Füge in mBlock 5 das Gerät **CyberPi** zur Geräteliste hinzu und fordere dann die Verbindung an. Die genauen Bezeichnungen hängen von der installierten mBlock-Version ab. Du erkennst den Erfolg daran, dass die Software die Platine als verbunden anzeigt.

### Schritt 2: zu Python wechseln

Wechsle im Programmierbereich vom Modus **Blöcke** in den Modus **Python**: Der Editor zeigt dann Text statt Blöcken.

### Schritt 3: das Programm schreiben

Tippe den folgenden Code ab. Die Texte auf dem Display sind vorsichtshalber ohne Umlaute geschrieben: Wir haben nicht geprüft, wie Sonderzeichen auf dem Display der Platine dargestellt werden.

```python
import cyberpi
import time

# Display leeren, dann zwei Textzeilen anzeigen
cyberpi.console.clear()
cyberpi.console.println("Hallo!")
cyberpi.console.println("Druecke A")

# Endlosschleife: das Programm überwacht Taste A
while True:
    if cyberpi.controller.is_press("a"):
        cyberpi.led.on(0, 255, 0)      # grünes Licht (Rot 0, Grün 255, Blau 0)
        cyberpi.audio.play("hello")    # vorab aufgenommener Ton
        cyberpi.console.println("Super!")
        time.sleep(1)                  # eine Sekunde warten
        cyberpi.led.off()              # Licht ausschalten
```

So verstehst du den Code:

- `import cyberpi` lädt die Funktionen, die die Platine steuern, und `import time` die, die Pausen verwalten.
- `cyberpi.console.println` schreibt eine Zeile auf das Display.
- `while True` wiederholt endlos alles, was darunter eingerückt ist, und `if` führt die folgenden Zeilen nur aus, wenn Taste A in diesem Moment gedrückt ist.
- `cyberpi.led.on(0, 255, 0)` stellt die Farbe mit drei Zahlen zwischen 0 und 255 ein: Rot, Grün, Blau.

### Schritt 4: starten und prüfen

Starte das Programm im Live-Modus oder sende es an die Platine, wenn es ohne Computer weiterlaufen soll. Auf dem Display solltest du „Hallo!“ und dann „Druecke A“ sehen. Wenn du A drückst, wird das Licht grün, ein Ton erklingt und „Super!“ erscheint. Zum Experimentieren ändere die drei Zahlen des Lichts (zum Beispiel 255, 0, 0 für Rot) oder den angezeigten Text.

*Wir haben dieses Beispiel für diesen Artikel nicht auf einer Platine ausgeführt: Es übernimmt die Funktionsnamen aus der Makeblock-Dokumentation zur CyberPi, aber diese Namen können sich von einer mBlock-Version zur nächsten ändern. Wenn eine Zeile einen Fehler auslöst, vergleiche sie mit den Beispielen im CyberPi-Bereich der Makeblock-Dokumentation.*

### Wenn es nicht funktioniert

- **Die Platine erscheint nicht in mBlock**: Probiere ein anderes USB-Kabel, einen anderen Anschluss, dann starte Platine und Software neu.
- **Nichts wird angezeigt oder das Programm reagiert nicht mehr**: Stoppe das Programm, starte es erneut und prüfe, ob das richtige Gerät gewählt ist.
- **Kein Ton**: Prüfe die Lautstärke der Platine, denn der Lautsprecher ist klein und der Ton leise.
- **Fehlermeldung in einer Zeile**: Achte auf die Leerzeichen am Zeilenanfang, denn in Python zählt die Einrückung, und auf die Anführungszeichen, die geschlossen werden müssen.

Und danach? Du kannst eine zweite Taste hinzufügen, den Wert des Lichtsensors anzeigen oder – wenn du deinen Code einen Roboter fahren lassen willst – den [mBot2](/de/mbot-vs-mbot2/) kennenlernen. Welche Software zu deinem Gerät passt, erfährst du in unserem Ratgeber [mBlock 5: Desktop, Browser oder Python für mBot?](/de/mblock-software-welche-waehlen/).

*Amazon-Partner — bei qualifizierten Käufen kann eine Provision anfallen, ohne Mehrkosten für dich.*
