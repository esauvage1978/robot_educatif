---
layout: ../../layouts/ItPost.astro
title: "Imparare Arduino C — percorso robotica per principianti"
description: "Imparare Arduino C passo passo: setup e loop, tipi, condizioni, cicli e funzioni. Corso gratuito con esercizi per la robotica educativa."
updated: "31 ottobre 2026"
faqSchema:
  - question: "Cos’è Arduino C?"
    answer: "Arduino C indica il C/C++ semplificato usato per programmare una scheda Arduino. Ogni programma (sketch) ha setup() una volta, poi loop() all’infinito."
  - question: "Come imparare Arduino da zero?"
    answer: "Segui questo percorso in ordine: struttura dello sketch, tipi e variabili, condizioni con sensori, cicli e timing, poi funzioni. Ogni lezione include codice ed esercizi."
  - question: "Devo già conoscere il linguaggio C?"
    answer: "No. Questo percorso parte da zero e spiega setup, loop, i tipi di base e la lettura dei sensori prima di arrivare alle funzioni."
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite questi link, possiamo ricevere una commissione senza costi aggiuntivi per te. Controlla il prezzo del giorno sulla scheda prodotto.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Imparare Arduino C — percorso robotica per principianti",
  "description": "Corso gratuito di Arduino C: struttura setup/loop, tipi, condizioni, cicli e funzioni, con esercizi di robotica.",
  "url": "https://robot-educatif.info/it/arduino-c/",
  "inLanguage": "it",
  "isAccessibleForFree": true,
  "provider": { "@type": "Organization", "name": "Robot Éducatif", "sameAs": "https://robot-educatif.info/" },
  "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "inLanguage": "it" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Lezioni del percorso Arduino C",
  "numberOfItems": 5,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Struttura sketch, setup/loop, Serial", "url": "https://robot-educatif.info/en/arduino-c-sketch-structure-serial/" },
    { "@type": "ListItem", "position": 2, "name": "Tipi e variabili", "url": "https://robot-educatif.info/en/arduino-c-types-variables/" },
    { "@type": "ListItem", "position": 3, "name": "Condizioni, sensori e attuatori", "url": "https://robot-educatif.info/en/arduino-c-conditions-sensors/" },
    { "@type": "ListItem", "position": 4, "name": "Cicli e timing", "url": "https://robot-educatif.info/c-arduino-boucles-timing/" },
    { "@type": "ListItem", "position": 5, "name": "Funzioni, modularità, buone pratiche", "url": "https://robot-educatif.info/it/arduino-c-funzioni-buone-pratiche/" }
  ]
}
</script>

![Scheda Arduino Uno vista di tre quarti — la scheda blu più comune da programmare in Arduino C](/images/lot2/arduino-uno-perspective.webp)

*La scheda Arduino Uno, il modello più comune per iniziare. Esegue il tuo programma `setup()` / `loop()`. Foto: Creative Tools — [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Arduino-uno-perspective.jpg) (ridimensionata / WebP).*

> **In una frase.** Il cosiddetto «linguaggio Arduino» è **C/C++** semplificato per schede a microcontrollore: ogni programma (uno **sketch**, file `.ino`) contiene **`setup()`** (preparazione, una volta) e **`loop()`** (poi si ripete senza fermarsi). L’ambiente ufficiale compila con **avr-gcc** (il compilatore incluso nell’IDE Arduino) e invia il programma via USB. Prima lezione: [struttura dello sketch](/en/arduino-c-sketch-structure-serial/).

Vuoi imparare Arduino per far lampeggiare un LED, leggere un sensore o guidare un piccolo robot, ma molti tutorial saltano troppo avanti. Questo percorso gratuito ti accompagna lezione dopo lezione: struttura dello sketch, tipi di variabili, condizioni, cicli, poi funzioni. Ogni pagina propone codice da digitare, esercizi e gli errori più frequenti.

Risorse di approfondimento su [Amazon.it](https://www.amazon.it/s?k=arduino+imparare+c+programmazione&tag=roboteducat0f-21) (affiliazione).

## C standard vs linguaggio Arduino — quale differenza?

Nel corso di C sul PC si scrive spesso una funzione **`main()`**. Su Arduino non scrivi **`main()`** tu: l’IDE ne genera una che chiama prima il tuo **`setup()`**, poi ripete **`loop()`**. Controlli i pin con **`pinMode`**, **`digitalWrite`**, **`digitalRead`** e **`analogRead`**.

![Schema del ciclo Arduino: setup una volta, poi loop che legge i sensori e comanda le uscite](/images/lot2/arduino-setup-loop-cycle.svg)

*All’avvio: `setup()` una volta. Poi `loop()` legge gli ingressi (sensori), comanda le uscite (LED, motori) e ricomincia.*

## Compilazione e caricamento (passi)

1. Apri o crea uno sketch (`.ino`) nell’IDE Arduino.
2. Seleziona la **scheda** (per esempio Uno) e la **porta seriale** (`COM` su Windows, `/dev/ttyUSB*` su Linux).
3. Clicca **Verifica** per compilare. Correggi gli errori di sintassi (punto e virgola, tipi).
4. Clicca **Carica** e attendi «Done uploading» / «Caricamento completato».

## Errori frequenti di compilazione e caricamento

| Messaggio / sintomo | Cosa provare |
|---|---|
| `stk500_getsync()` | Porta sbagliata, cavo USB solo carica, scheda non selezionata, altro programma che blocca la porta |
| Porta seriale assente | Installa il driver USB (spesso CH340/CH341 o FTDI sulle schede clone) |
| `expected ';' before …` | Punto e virgola mancante a fine riga C |
| Tipi / conversione | Mescolare `int` e `float` — vedi [tipi e variabili](/en/arduino-c-types-variables/) |

## Esempio minimo commentato

```cpp
const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);  // pin 13 in uscita
}

void loop() {
  digitalWrite(LED, HIGH);  // accendi
  delay(500);               // attendi 500 ms
  digitalWrite(LED, LOW);   // spegni
  delay(500);
}
```

Risultato atteso: il LED integrato lampeggia circa due volte al secondo. Se non succede nulla, controlla prima caricamento e selezione scheda.

## Lezioni del percorso

Segui l’ordine: ogni lezione si appoggia sulla precedente.

| # | Lezione | Cosa impari |
|---|---|---|
| 1 | [Struttura sketch, setup/loop, Serial](/en/arduino-c-sketch-structure-serial/) | Come gira uno sketch, Serial Monitor, prime abitudini |
| 2 | [Tipi e variabili](/en/arduino-c-types-variables/) | `int`, `float`, `bool`, `const`, scope |
| 3 | [Condizioni, sensori e attuatori](/en/arduino-c-conditions-sensors/) | `if`/`else`, soglie, `digitalRead` / `analogRead` |
| 4 | [Cicli e timing](/c-arduino-boucles-timing/) | `for`/`while`, `delay` vs `millis()` |
| 5 | [Funzioni, modularità, buone pratiche](/it/arduino-c-funzioni-buone-pratiche/) | DRY, parametri, helper riutilizzabili |

Dopo Arduino, casa connessa: [Domotica: come iniziare](/it/domotica/come-iniziare/).

## Perché imparare Arduino C per la robotica?

I programmi robotici crescono in fretta: sensori, soglie, motori, timing. Partendo da una **struttura dello sketch** chiara, poi **tipi**, **condizioni**, **cicli** e **funzioni**, eviti il codice spaghetti e fai debug più in fretta con il Serial Monitor.

Progressione tipica dopo l’esempio blink:

1. Leggere un pulsante digitale o un sensore di linea.
2. Azionare un motore o un LED quando si supera una soglia.
3. Sostituire `delay()` bloccante con `millis()` così il robot può ancora reagire.
4. Dividere i comportamenti in funzioni con nome.

## Checklist prima del primo caricamento

- Cavo USB **dati** (non solo carica).
- **Scheda** corretta selezionata nell’IDE (UNO, Mega, Nano…).
- **Porta** corretta visibile dopo il collegamento.
- Lo sketch compila con **Verifica** prima di Carica.
- Il baud rate del Serial Monitor coincide con `Serial.begin(...)`.

## FAQ

<details>
<summary>Cos’è Arduino C?</summary>

È il nome comune del C/C++ adattato alle schede Arduino. Scrivi uno sketch con `setup()` e `loop()`; l’IDE compila e lo carica sulla scheda.
</details>

<details>
<summary>Come imparare Arduino da zero?</summary>

Segui questo percorso in ordine con una scheda Uno (o compatibile) e un cavo USB dati. Passa oltre solo quando l’esempio della lezione corrente compila e funziona.
</details>

<details>
<summary>Devo già conoscere il linguaggio C?</summary>

No. Le basi utili (tipi, condizioni, cicli, funzioni) arrivano lungo il percorso, con esempi di robotica concreti.
</details>

*Autore: Emmanuel Sauvage.*
