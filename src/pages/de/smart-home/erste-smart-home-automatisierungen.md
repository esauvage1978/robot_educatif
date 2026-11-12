---
layout: ../../../layouts/DePost.astro
title: "Erste nützliche Smart-Home-Automatisierungen"
description: "Zehn einfache erste Automatisierungen für Ihr Zuhause: Licht, Heizung, Waschmaschine, Abwesenheit... erklärt für Home Assistant und für Homey, ganz ohne Programmieren."
updated: "30. Oktober 2026"
faqSchema:
  - question: "Muss ich YAML lernen?"
    answer: "Nicht zum Einstieg. Der visuelle Editor von Home Assistant deckt diese zehn Fälle ab. YAML wird später nützlich, um eine Kopie Ihrer Regeln aufzubewahren oder für fortgeschrittene Zwecke."
  - question: "Sind Homey Flows und Home Assistant gleichwertig?"
    answer: "Für diese zehn Beispiele ja: Sie führen zum selben Ergebnis. Die Details unterscheiden sich bei der Handy-Ortung, bei Regelvorlagen und bei Skripten. Gehen Sie von der Zentrale aus, die Sie haben, oder entscheiden Sie mit der Seite zur Wahl der Zentrale."
  - question: "Warum funktioniert meine Automatisierung nur jedes zweite Mal?"
    answer: "Die häufigsten Ursachen sind ein Sensor, der zu weit vom Rest Ihres Funknetzes entfernt ist, eine schwache Batterie oder eine zu strenge Bedingung. Sehen Sie sich den Zustandsverlauf des Geräts und die Qualität der Funkverbindung an."
  - question: "Wo finde ich weitere Projektideen?"
    answer: "In unseren ESP32-Projektideen und im kompletten Einsteiger-Leitfaden, der den ganzen Weg aufzeigt."
---

Ihre Zentrale ist angeschlossen, Ihre ersten Sensoren sind erkannt, und jetzt? Das ist der Moment, in dem das Smart Home wirklich nützlich wird: wenn das Haus von allein handelt. Eine gute Automatisierung beantwortet einen echten Bedarf („Ich will nicht bei offenen Fenstern heizen“), nicht die Lust auf ein Gadget.

Diese Seite gibt Ihnen zehn einfache Ideen. Zu jeder erfahren Sie, wofür sie gut ist, was Sie brauchen und wie Sie sie in Home Assistant (einer kostenlosen Software, die alle Ihre Geräte vereint) und in Homey (einer fertigen Zentrale aus dem Handel) anlegen. Programmieren müssen Sie nicht können. Das nötige Material steht in den [ersten Geräten zum Kaufen](/de/smart-home/erste-smart-home-geraete-kaufen/), und unbekannte Wörter finden Sie im [Glossar](/de/smart-home/smart-home-glossar/).

## Weiterlesen

- [Erste Smart-Home-Geräte kaufen](/de/smart-home/erste-smart-home-geraete-kaufen/)
- [Smart-Home-Glossar](/de/smart-home/smart-home-glossar/)
- [Homey Pro mini: Auspacken und Einrichtung](/de/smart-home/homey-pro-mini-auspacken-einrichtung/)
- [Home Assistant auf dem Raspberry Pi 5 installieren](/de/smart-home/home-assistant-raspberry-pi-5-installation/)

## Das Prinzip in drei Worten

Jede Automatisierung folgt demselben Muster: Ein Ereignis löst sie aus, eine Bedingung legt gegebenenfalls fest, in welchem Fall sie handeln soll, und eine Aktion tut das Gewünschte. Die beiden Programme verwenden für dieselbe Idee unterschiedliche Wörter.

| Was wir meinen | In Home Assistant | In Homey |
|---|---|---|
| Das Ereignis, das die Regel startet (der Auslöser) | Auslöser | „Wenn...“ |
| Der Filter, der festlegt, in welchem Fall zu handeln ist (die Bedingung) | Bedingung | „Und...“ |
| Was das Haus tut (die Aktion) | Aktion | „Dann...“ |

In Home Assistant legen Sie eine Regel über das Menü Einstellungen und dann Automatisierungen & Szenen an, mit einem visuellen Editor: Die Bezeichnungen können je nach Version leicht abweichen. In Homey setzen Sie Karten im Bereich Flows zusammen. Für diese zehn Fälle ist keine Zeile Code nötig. Das kleine YAML-Beispiel weiter unten (ein Textformat, um eine Regel von Hand zu schreiben) dient nur zur Veranschaulichung.

## 1. Licht einschalten, wenn jemand vorbeigeht

**Wozu es dient:** Der Flur wird nachts beleuchtet, ohne dass Sie den Schalter suchen, und geht wieder aus, wenn sich niemand mehr bewegt.  
**Was Sie brauchen:** einen Bewegungsmelder und ein Licht (smarte Lampe, Steckdose oder Relais).

In Home Assistant wählen Sie den Bewegungsmelder als Auslöser, fügen die Bedingung „es ist Nacht“ hinzu (Sonne unter dem Horizont oder geringe Helligkeit) und dann die Aktion, das Licht einzuschalten. Für das Ausschalten legen Sie eine zweite Regel mit einer Verzögerung nach der letzten Erkennung an.

In Homey setzen Sie die Karten „Wenn Bewegung erkannt wird“, „Und es ist Nacht“, „Dann Licht einschalten“ zusammen. Ein zweiter Flow mit einer Verzögerungskarte schaltet das Licht aus.

## 2. Gewarnt werden, wenn ein Fenster bei laufender Heizung offen bleibt

**Wozu es dient:** nicht umsonst heizen.  
**Was Sie brauchen:** einen Kontaktsensor und ein vernetztes Heizgerät (Heizkörperventil, Steckdose oder Thermostat).

In Home Assistant lösen Sie die Regel aus, wenn der Sensor „offen“ meldet, fügen die Bedingung „die Heizung ist aktiv“ hinzu und senden dann eine Benachrichtigung auf Ihr Telefon. Sie können auch die Temperatur senken oder die Heizung abschalten.

In Homey ist es dieselbe Kette mit einer Karte „Wenn sich der Kontakt öffnet“, „Und die Heizung läuft“, „Dann Benachrichtigung senden“ und, wenn Ihr Gerät es zulässt, einer Karte, um den Sollwert zu senken.

## 3. Wissen, wann die Waschmaschine fertig ist

**Wozu es dient:** Sie erhalten eine Nachricht, sobald der Waschgang endet, damit die Wäsche nicht feucht liegen bleibt.  
**Was Sie brauchen:** eine Steckdose, die den Stromverbrauch misst.

In Home Assistant löst die Regel aus, wenn die Leistung unter eine niedrige Schwelle fällt, nachdem sie eine hohe überschritten hat. Dafür gibt es von der Community vorgeschlagene Regelvorlagen, Blueprints genannt, die Ihnen ersparen, alles von Hand zu bauen. In Homey genügt eine Karte zur aufgenommenen Leistung (je nach App Ihrer Steckdose), mit einer Benachrichtigung als Aktion.

Die richtigen Schwellenwerte hängen von Ihrer Maschine ab: Sehen Sie sich einmal ihre Verbrauchskurve an, bevor Sie die Werte einstellen.

## 4. Modus „abwesend“: beim Gehen alles ausschalten

**Wozu es dient:** Eine einzige Geste oder Ihr Verlassen des Hauses schaltet Lichter und einige Steckdosen aus.  
**Was Sie brauchen:** einen Funktaster oder die Anwesenheitserkennung Ihres Telefons.

In Home Assistant lösen Sie die Regel aus, wenn die Person das Haus verlässt (oder wenn ein virtueller Schalter „abwesend“ aktiviert wird), und schalten dann die gewählten Lichter und Steckdosen aus oder starten eine Szene (eine Gruppe von Zuständen, die auf einmal abgerufen wird). In Homey nutzen Sie „Wenn ich das Haus verlasse“ (Ortung des Telefons) oder einen Tastendruck und schalten dann die Lichter der Zone aus.

Die Handy-Ortung ist nie perfekt. Halten Sie immer einen physischen Taster als Reserve bereit.

## 5. Ein Nachtlicht zu einer festen Uhrzeit für die Kinder

**Wozu es dient:** ein sanftes Licht, das zur Schlafenszeit angeht.  
**Was Sie brauchen:** eine dimmbare Lampe.

In Home Assistant wählen Sie eine Uhrzeit als Auslöser und schalten das Licht mit geringer Helligkeit ein. In Homey: „Wenn die Uhrzeit ... ist“, „Dann Licht mit so viel Prozent einschalten“.

## 6. Eine Meldung, wenn die Temperatur zu niedrig wird

**Wozu es dient:** die Gefahr von Frost an den Leitungen oder zu wenig Heizung erkennen.  
**Was Sie brauchen:** einen Temperatursensor.

In Home Assistant lösen Sie die Regel aus, wenn die Temperatur unter eine Schwelle fällt (zum Beispiel fünf Grad), und senden eine Benachrichtigung, eventuell zusammen mit dem Einschalten einer Heizung. In Homey: „Wenn die Temperatur unter ... fällt“, „Dann Warnung senden“.

## 7. Eine Lampe bei Sonnenuntergang einschalten

**Wozu es dient:** eine warme Atmosphäre am Ende des Tages.  
**Was Sie brauchen:** ein vernetztes Licht.

In Home Assistant nutzen Sie den Auslöser „Sonnenuntergang“ (Sie können ihn um einige Minuten verschieben) und schalten dann das Licht ein. In Homey: „Wenn die Sonne untergeht“, „Dann einschalten“.

## 8. Standby in der Nacht abschalten

**Wozu es dient:** den Strom von Geräten sparen, die umsonst eingeschaltet bleiben, etwa ein Fernseher und seine Box.  
**Was Sie brauchen:** aus der Ferne schaltbare Steckdosen.

In Home Assistant schalten Sie die Steckdosen um 23:30 Uhr aus und bei Bedarf um 7 Uhr wieder ein. In Homey übernehmen Sie dieselbe Idee mit „Wenn die Uhrzeit ... ist“.

Prüfen Sie zuerst, ob das Gerät ein hartes Abschalten verträgt: Eine Netzwerkfestplatte (NAS) oder manche Receiver mögen das überhaupt nicht.

## 9. Benachrichtigt werden, wenn die Haustür aufgeht

**Wozu es dient:** wissen, wer hereinkommt, zum Beispiel wenn die Kinder allein nach Hause kommen.  
**Was Sie brauchen:** einen Kontaktsensor.

In Home Assistant senden Sie eine Benachrichtigung, sobald der Sensor öffnet, optional mit der Bedingung „niemand ist zu Hause“. In Homey: „Wenn sich die Tür öffnet“, „Dann Benachrichtigung senden“.

## 10. Ans Lüften erinnern

**Wozu es dient:** eine Erinnerung, zehn Minuten die Fenster zu öffnen, zu einer festen Uhrzeit oder wenn die Luft zu verbraucht ist.  
**Was Sie brauchen:** entweder nichts, nur die Uhrzeit; oder einen CO₂-Sensor, der das Gas misst, das sich in einem geschlossenen Raum anreichert (siehe [dieses Projekt mit einem Raspberry Pi und einem SCD41-Sensor](/de/smart-home/raspberry-pi-co2-scd41-home-assistant/)).

In Home Assistant lösen Sie die Regel zu einer regelmäßigen Uhrzeit aus oder wenn der CO₂-Wert eine Schwelle überschreitet, und senden dann eine Benachrichtigung. In Homey: „Wenn die Uhrzeit erreicht ist“ oder „Wenn CO₂ hoch ist“, dann „Dann benachrichtigen“.

## Ein YAML-Beispiel für Home Assistant

Hier ist die erste Automatisierung (das Flurlicht) als Text geschrieben. Sie können sie im Editor im YAML-Modus einfügen, nachdem Sie die Namen durch die Ihrer Geräte ersetzt haben.

```yaml
# Zur Veranschaulichung: entity_id durch Ihre eigenen Werte ersetzen
automation:
  - alias: "Flur: Bewegung nachts"
    trigger:
      - platform: state
        entity_id: binary_sensor.flur_bewegung
        to: "on"
    condition:
      - condition: state
        entity_id: sun.sun
        state: "below_horizon"
    action:
      - service: light.turn_on
        target:
          entity_id: light.flur
```

Dieses Beispiel wurde auf Ihrer Installation nicht ausgeführt. Nutzen Sie nach der Anpassung das Prüfwerkzeug des Home-Assistant-Editors, bevor Sie speichern.

## Ein paar Tipps, damit Sie nicht untergehen

Eine Automatisierung sollte einen einzigen Bedarf erfüllen, nicht drei. Geben Sie ihr einen sprechenden Namen, etwa „Fensterwarnung Wohnzimmer mit Heizkörper“, damit Sie sie in sechs Monaten wiederfinden. Testen Sie sie zuerst mit einer einfachen Benachrichtigung, bevor Sie ihr eine schwerere Aktion anvertrauen, etwa die Heizung abzuschalten. Und bei den Verbrauchsschwellen der Waschmaschine gilt: erst messen, dann einstellen.

Für den weiteren Weg gehen Sie zu den [Anfängerfehlern](/de/smart-home/smart-home-anfaengerfehler-faq/) oder zurück zum [kompletten Leitfaden](/de/smart-home/smart-home-einstieg-kompletter-leitfaden/).

## Häufige Fragen

**Muss ich YAML lernen?**
Nicht zum Einstieg. Der visuelle Editor von Home Assistant deckt diese zehn Fälle ab. YAML wird später nützlich, um eine Kopie Ihrer Regeln aufzubewahren oder für fortgeschrittene Zwecke.

**Sind Homey Flows und Home Assistant gleichwertig?**
Für diese zehn Beispiele ja: Sie führen zum selben Ergebnis. Die Details unterscheiden sich bei der Handy-Ortung, bei Regelvorlagen und bei Skripten. Gehen Sie von der Zentrale aus, die Sie haben, oder entscheiden Sie mit der [Seite zur Wahl der Zentrale](/de/smart-home/welche-smart-home-zentrale-fuer-einsteiger/).

**Warum funktioniert meine Automatisierung nur jedes zweite Mal?**
Die häufigsten Ursachen sind ein Sensor, der zu weit vom Rest Ihres Funknetzes entfernt ist, eine schwache Batterie oder eine zu strenge Bedingung. Sehen Sie sich den Zustandsverlauf des Geräts und die Qualität der Funkverbindung an.

**Wo finde ich weitere Projektideen?**
In unseren [ESP32-Projektideen](/de/smart-home/esp32-smart-home-projektideen/) und im [kompletten Einsteiger-Leitfaden](/de/smart-home/smart-home-einstieg-kompletter-leitfaden/), der den ganzen Weg aufzeigt.

---

*Autor: Emmanuel Sauvage. Lehrbeispiele: Passen Sie Gerätenamen und Schwellenwerte an Ihre eigene Installation an.*
