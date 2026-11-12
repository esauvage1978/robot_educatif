---
layout: ../../layouts/ItPost.astro
title: "Attività mBot: far scorrere un testo sulla matrice LED"
description: "Far scorrere un messaggio sulla matrice LED del mBot: posizione X, loop, regola lunghezza×5+15. Schemi del programma."
updated: "31 ottobre 2026"
---

Alcuni link di questa pagina sono di affiliazione. Se acquisti tramite questi link possiamo ricevere una commissione senza costi aggiuntivi per te.

Sul **mBot**, la **matrice LED** (spesso **5 colonne × 8 righe**) può mostrare lettere e simboli. Per creare l'illusione di un **banner scorrevole**, non «ruoti i pixel» a mano: **mostri lo stesso testo** più volte al secondo, ma ogni volta cambi la sua **posizione orizzontale** (spesso chiamata **`X`** in mBlock).

Alla fine di questa attività avrai una **logica riutilizzabile** per mostrare qualsiasi messaggio, più volte, in altri progetti.

---

## 1. Prerequisiti

- Un [robot mBot (Makeblock)](/it/mbot-il-mio-primo-robot-educativo/).
- [mBlock 5](/it/installare-mblock-5-windows/) e una prima [presa di confidenza con l'interfaccia](/it/primi-passi-mblock-5/).
- I [blocchi mBot](/it/installare-blocchi-mbot/) (LED matrix, LEDs, etc.).
- Saper **caricare** un programma sulla scheda: [primo programma mBot](/it/primo-programma-mbot/).

I **nomi esatti** dei blocchi possono variare con **lingua** e **versione** di mBlock; l'**idea** (variabile `X`, loop, ritardo) resta la stessa.

---

## 2. Capire la matrice prima di programmare

### 2.1 Una finestra mobile sul messaggio

Immagina il testo come un **nastro** più largo dello schermo. La matrice mostra solo una **finestra** di poche colonne. **Facendo scorrere** il nastro a sinistra (o spostando la posizione di visualizzazione), fai **scorrere** le lettere.

```text
     matrice (5 colonne visibili)
          ┌─────┐
nastro … H e l l o  w o r l d …  →  facciamo scorrere il nastro
          └─────┘
```

Passo pratico: carica un programma che mostra una sola parola (es. «HELLO») a X fisso, poi osserva la matrice: spesso vedi solo le prime lettere perché lo schermo è stretto.

![Foto: una parola sulla matrice LED](/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp)

E la cattura del programma corrispondente (attività 2.1):

![Immagine della prima attività di visualizzazione testo](/capture/activite-mbot-faire-defiler-un-texte/2.1/premiere-activite-affichage-texte.png)

Programma mBlock: [`afficher_1_mot.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.1/afficher_1_mot.mblock) («mostra una parola»).

### 2.2 Il ruolo della variabile `X`

In mBlock, un blocco del tipo **«mostra il testo alla posizione X»** (etichetta variabile) colloca l'**inizio** del testo a un'ascissa `X` sulla matrice.

- Se vuoi il collegamento con la programmazione «testo» in **Arduino C**, `X` è una **variabile** classica: le dai un tipo (spesso `int`) e ne modifichi il valore nei loop. Vedi: [Arduino C — tipi e variabili](/c-arduino-types-variables/).

- **`X` grande**: il testo inizia **a destra**; una parte può essere **fuori schermo** (invisibile).
- **`X` diminuisce**: il testo si sposta a **sinistra** → effetto **scorrimento**.

Schema logico di **una sola immagine** a schermo:

```text
posizione X (schematica)
  X piccolo   →  inizio della parola visibile a sinistra
  X medio     →  parola centrata o parzialmente visibile
  X grande    →  parola spinta a destra / fuori campo
```

Conclusione: **per far scorrere, devi far variare `X`** (spesso diminuendolo a poco a poco in un loop).

---

## 3. Prima tappa: visualizzazione fissa (testo troncato)

**Scopo**: mostrare **«Hello»** per vedere come reagisce la matrice.

Struttura logica minima:

```text
┌─────────────────────────────┐
│  All'avvio del mBot           │
│    mostra testo "Hello"        │
│    (a una posizione X fissa)           │
└─────────────────────────────┘
```

Dopo il **caricamento**, spesso costati che **solo le prime lettere** appaiono (le altre escono dalla zona visibile). È normale: la matrice è **stretta**.

- Spingendo **`X`** (ad es. verso **10** o **15**), puoi **nascondere** l'inizio della parola o farla **entrare** da destra.

Ecco la stessa parola, ma con uno scostamento `X` diverso (esempio `X = 10`):

![Foto: un solo carattere quando X vale 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/photo_affichage_h.jpeg)

Cattura del programma (attività 2.2):

![Immagine dell'attività di visualizzazione quando X vale 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/activite-affichage-texte-x-vaut-10.png)

Programma mBlock: [`afficher_1_mot_x_vaut_10.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.2/afficher_1_mot_x_vaut_10.mblock) («mostra una parola, X = 10»).

**Idea da trattenere**: la visualizzazione statica **prova** il legame tra **`X`** e ciò che l'occhio vede. Lo scorrimento sarà **la stessa operazione**, ripetuta con **`X` che cambia**.

---

## 4. Seconda tappa: un loop che muove `X`

**Scopo**: **ripetere**: mostrare il testo alla posizione attuale, **diminuire `X`**, attendere un po' — per creare il movimento.

### 4.1 Preparare la partenza

- Creare una variabile **`X`**.
- All'inizio, impostare **`X = 15`** (valore tipico per partire **fuori campo a destra** e far **entrare** il messaggio). Regola in base al tuo testo.

### 4.2 Loop di scorrimento (una passata)

Struttura logica:

```text
┌──────────────────────────────────────────┐
│  All'avvio                                 │
│    X ← 15                                 │
│    ┌────────────────────────────────────┐ │
│    │  Ripeti all'infinito *                   │ │
│    │    mostra testo alla posizione X         │ │
│    │    X ← X − 1                        │ │
│    │    attendi 0,1 s                       │ │
│    └────────────────────────────────────┘ │
└──────────────────────────────────────────┘

* O «per sempre» secondo i blocchi disponibili
```

Flusso dettagliato (un'iterazione):

```text
   ┌──────────────┐
   │  Mostra      │
   │  testo a X   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  X ← X − 1   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Attendi     │
   │  0,1 s       │
   └──────┬───────┘
          │
          └──────► (ritorno all'inizio del loop)
```

Il **ritardo** (spesso **0,1 s**) è indispensabile: senza di esso lo scorrimento sarebbe troppo rapido per leggere.

Cattura locale (punto 4):

![Scorrimento: loop che diminuisce X](/capture/activite-mbot-faire-defiler-un-texte/4/defilement-boucle-diminue-x.png)

Programma mBlock: [`boucle.mblock`](/capture/activite-mbot-faire-defiler-un-texte/4/boucle.mblock) («ciclo»).

### 4.3 Limite di questa versione

- Il programma può **continuare all'infinito** mentre il testo è già **uscito** dallo schermo.
- Spesso vuoi **concatenare** una **nuova passata** (o **più ripetizioni** del messaggio) in modo pulito.

→ Da qui la **terza tappa**: **limitare** il loop interno e **avvolgerlo** in un loop di **ripetizioni**.

---

## 5. Terza tappa: più passate (doppio loop)

**Scopo**: far scorrere lo **stesso messaggio più volte**, con una fine chiara per ogni passata.

### 5.1 Due livelli di loop

Struttura logica **visione d'insieme**:

```text
┌─────────────────────────────────────────────────────┐
│  All'avvio                                            │
│    ┌──────────────────────────────────────────────┐ │
│    │  Per ogni visualizzazione del messaggio (es. 3×)      │ │  ← loop ESTERNO
│    │    X ← 15                                      │ │
│    │    ┌────────────────────────────────────────┐ │ │
│    │    │  Per un numero fisso di passi              │ │ │  ← loop INTERNO
│    │    │    show text at X                         │ │ │
│    │    │    X ← X − 1                              │ │ │
│    │    │    attendi 0,1 s                             │ │ │
│    │    └────────────────────────────────────────┘ │ │
│    └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

Schema **annidato** (rappresentazione «scatole»):

```text
 +-- ripeti N volte (messaggio intero) --------------+
 |                                                   |
 |   X ← 15                                          |
 |   +-- ripeti (lunghezza × 5 + 15) volte ------------+  |
 |   |      mostra ; X←X-1 ; attendi                    |  |
 |   +---------------------------------------------+  |
 +---------------------------------------------------+
```

### 5.2 Quanti passi per il loop interno?

Perché il passaggio tra due passate non sia né troppo lungo né troppo corto, si usa spesso:

```text
numero_di_passi = lunghezza_testo * 5 + 15
```

Esempio: per il messaggio `Ciao` (4 caratteri) si ottengono `4 * 5 + 15 = 35` passi nel loop interno. Così il testo ha il tempo di entrare da destra, scorrere e uscire completamente a sinistra prima della passata successiva.

- **`lunghezza_testo`**: numero di caratteri del messaggio (all'inizio, **senza contare gli accenti** se la visualizzazione li ignora — vedi sezione 7 (accenti sulla matrice)).
- **× 5**: in pratica, ogni carattere «largo» sulla matrice corrisponde a circa **5 colonne** di larghezza nel font usato da mBlock per questa matrice — un'**approssimazione utile** per un laboratorio, non una legge fisica.
- **`+ 15`**: margine per **far uscire** il testo **completamente** a sinistra dopo averlo fatto entrare da destra (lo stesso margine già usato con **`X` iniziale**).

Puoi memorizzare **`lunghezza_testo`** in una variabile per rendere il programma **leggibile**.

Cattura locale (passo 5.2):

![Tre ripetizioni dello scorrimento (doppio loop)](/capture/activite-mbot-faire-defiler-un-texte/5.2/trois-repetitions-defilement.png)

Programma mBlock: [`defiler52.mblock`](/capture/activite-mbot-faire-defiler-un-texte/5.2/defiler52.mblock) («scorrimento 5.2»).

### 5.2 bis DRY: non scrivere due volte la stessa info

In questo esempio, ho fatto apposta a **non scrivere due volte** il testo da mostrare (una per calcolare la lunghezza, poi una per mostrarlo).

È una buona abitudine di programmazione chiamata **DRY** (*Don't Repeat Yourself*):

- **non ripetere** la stessa informazione in più posti;
- altrimenti, il giorno in cui cambi il messaggio, rischi di dimenticarne uno e di avere un programma **incoerente**.

Qui l'idea DRY è: **un'unica fonte** per il messaggio (una variabile), poi riusarla:

- per calcolare `lunghezza_testo`
- per mostrare il messaggio.

### 5.2 ter Bug mBlock: variabile in `float` ma messaggio in testo

Di default, il codice generato da mBlock dichiara spesso le variabili in `float`. Va bene per i numeri (posizione `X`, contatore, ecc.), ma **non** per una stringa come `"Il mio nuovo messaggio"`.

Se fai:

```cpp
testo = "Il mio nuovo messaggio";
```

mentre `testo` è dichiarato in `float`, il caricamento può fallire (cattura sotto):

![Errore di caricamento: variabile float usata come testo](/capture/activite-mbot-faire-defiler-un-texte/5.2/erreur_televersement.png)

Esempio di codice che provoca l'errore. I nomi delle variabili vengono dal progetto mBlock delle catture (`testo`, `longueur_texte` = lunghezza del testo, `taille_ecran` = larghezza schermo, `nombre_de_repetition` = numero di ripetizioni); puoi chiamare le tue come preferisci.

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
float testo = 0;  // BUG: dovrebbe essere una stringa
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
  testo = "Il mio nuovo messaggio";
  longueur_texte = String(testo).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(testo).c_str());
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

### 5.2 quater Correzione: cambiare il tipo di `testo`

La correzione consiste nel dichiarare `testo` come **stringa**.

#### Passi in mBlock (importante)

1. Andare in `</>` → **Anteprima Arduino C** (sola lettura).
2. **Copiare** il codice.
3. Andare nella scheda **Arduino C** (questa è fatta per essere modificata).
4. **Incollare** il codice poi sostituire la dichiarazione di `testo`.

Versione corretta:

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
const char* testo = "";
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
  testo = "Il mio nuovo messaggio";
  longueur_texte = String(testo).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(testo).c_str());
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

> Nota: su un mBot/mCore, `const char*` è spesso più «leggero» di `String` come variabile globale. Qui usiamo `String(testo)` solo per ottenere la lunghezza e per fornire un `c_str()` alla visualizzazione.

---

## 6. Trappola frequente: accenti e caratteri speciali

I caratteri **accentati** sono spesso **mal supportati** o **invisibili** a seconda della versione / modalità di visualizzazione. Per un laboratorio:

- prova prima con **`HELLO`**, **`MBOT`**, **`SALUT`**;
- se devi mostrare testo in italiano, prevedi **senza accenti** o una **abbreviazione**, finché non validi sulla tua versione di mBlock.

---

## 7. Riepilogo: catena didattica

```text
visualizzazione fissa (capire X e il troncamento)
        │
        ▼
un loop: X diminuisce → scorrimento continuo
        │
        ▼
due loop: N passate pulite + passi ≈ lunghezza×5+15
        │
        ▼
sai far scorrere un messaggio e ripeterlo in modo pulito
```

Ora puoi usare questo «motore di scorrimento» nei tuoi progetti (mostrare un punteggio, una consegna, una distanza…), copiando la logica quando ti serve.

---

## 8. Per andare oltre

- Prosegui con [misurare distanze](/it/attivita-mbot-misurare-distanze/) per mostrare un valore dinamico.
- Variare la **velocità** (`attendi 0,05` vs `0,2`) e osservare la **leggibilità**.
- Discutere in classe: **quante colonne** per carattere se si misura su uno screenshot? (legame con **pixel** e **tipografia**).

[mBot — Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)
