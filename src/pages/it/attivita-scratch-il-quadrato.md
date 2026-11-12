---
layout: ../../layouts/ItPost.astro
title: "Come fare un quadrato su Scratch (attività facile)"
description: "Come fare un quadrato su Scratch: posiziona lo sprite, pensa al percorso, poi programmalo con la penna e il ciclo «ripeti 4 volte». Attività passo passo per iniziare."
updated: "31 ottobre 2026"
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite questi link, possiamo ricevere una commissione senza costi aggiuntivi.

Disegnare un quadrato è una delle migliori prime sfide per imparare a programmare. Servono pochissimi blocchi, ma ti costringe a farti le domande giuste: dov’è lo sprite? In che direzione guarda? Cosa deve fare, e quante volte?

In questa attività farai camminare un piccolo sprite (il personaggio della scena, qui un panda) lungo un quadrato con lati di 200 passi. Prima capirai come è organizzata la scena, poi metterai lo sprite nel punto giusto e infine **programmerai il percorso da solo**. La soluzione si trova più in basso, richiusa, così potrai prima provare: si impara meglio provando, e anche sbagliando un po’.

L’attività va bene a partire dagli 8 anni, con un adulto accanto per i più piccoli. Calcola circa 30 minuti.

## Cosa ti serve prima di iniziare

Un programma per programmare a blocchi e un po’ di confidenza con il suo schermo:

- **Scratch** (il software gratuito del MIT, il Massachusetts Institute of Technology, utilizzabile online su [scratch.mit.edu](https://scratch.mit.edu/)) oppure **mBlock 5** (il software di Makeblock, costruito a partire da Scratch 3, che aggiunge la programmazione dei robot). Per installare mBlock, segui la nostra guida [installare mBlock 5 su Windows 10/11](/it/installare-mblock-5-windows/).
- Aver fatto un giro dello schermo: la scena, le categorie di blocchi e l’area script. La guida [primi passi con mBlock 5](/it/primi-passi-mblock-5/) presenta ciascuna di queste zone.

Gli screenshot di questo articolo vengono da mBlock 5. Con Scratch online i blocchi sono gli stessi; cambiano solo leggermente alcune voci di menu.

## La scena e il suo sistema di coordinate

Per dire a uno sprite dove andare serve un modo per indicare un punto preciso sulla scena. Scratch e mBlock usano per questo un **piano cartesiano ortonormale**: due assi che si incrociano ad angolo retto, con la stessa graduazione su entrambi.

- L’asse **X** è orizzontale: i valori aumentano verso destra.
- L’asse **Y** è verticale: i valori aumentano verso l’alto.
- Il punto in cui i due assi si incrociano si chiama **origine**. Ha coordinate **(0, 0)** e si trova al **centro** della scena.

Le coordinate di un punto si scrivono **(x, y)**: prima l’**ascissa** (la posizione orizzontale), poi l’**ordinata** (la posizione verticale). Il punto (50, −30), per esempio, è 50 unità a destra del centro e 30 unità sotto.

![Schema del piano cartesiano della scena mBlock / Scratch: origine al centro, asse x da −240 a +240, asse y da −180 a +180.](/images/blog/activite-scratch-carre/repere-orthonorme-mblock.svg)

*La scena è larga 480 unità e alta 360. Un’unità corrisponde a un «passo» dello sprite: quando scriverai «fai 10 passi», si sposterà di 10 unità.*

> **Limiti della scena:** perché lo sprite resti visibile, **x** deve restare tra **−240** e **+240**, e **y** tra **−180** e **+180**.

## Posizionare lo sprite nel punto di partenza

Il nostro quadrato partirà dall’angolo in alto a sinistra. Posiziona quindi lo sprite alle coordinate **(−100, 100)**.

![Il panda posizionato nella parte alta a sinistra della scena, nel punto (−100, 100).](/capture/carre/01-placement-lutin-moins100-100.png)

*Il panda, posizionato in alto a sinistra nella scena.*

Ci sono due modi: **trascinare lo sprite con il mouse** sulla scena oppure **digitare i valori** nel pannello dello sprite, nella scheda **Sprite**. Il secondo metodo è il più preciso.

![Il pannello Sprite di mBlock, con X = −100, Y = 100, Dimensione = 100 e Direzione = 90.](/capture/carre/02-saisie-coordonnees-lutin.png)

*Il pannello Sprite: X vale −100 e Y vale 100. Nota anche il campo **Direzione**, che vale 90: lo sprite guarda verso destra. Tieni a mente questa informazione, ti servirà.*

## Tocca a te programmare!

Ecco la sfida. Lo sprite è in (−100, 100), guarda verso destra e il lato del quadrato misura **200 passi**.

> **La tua missione:** quando si preme la **barra spaziatrice**, lo sprite percorre i quattro lati del quadrato in **senso orario** (il verso delle lancette dell’orologio), poi torna al punto di partenza.

Prima di toccare un solo blocco, prendi un foglio. Disegna il quadrato, annota dove si trova ciascuno dei quattro angoli e immagina cosa deve fare lo sprite a ogni angolo. Questo minuto di riflessione ti farà risparmiare molto tempo.

### Dove trovare i blocchi

I blocchi sono ordinati per **categorie**, nella colonna di sinistra dell’area di programmazione. Ogni categoria ha il suo colore: blu per **Movimento**, arancione per **Controllo**, giallo per **Eventi**, e così via. In fondo alla colonna, il pulsante **estensione** permette di aggiungere altre categorie.

![L’elenco delle categorie di blocchi di mBlock 5: Cerca, Movimento, Aspetto, Suono, Eventi, Controllo, Sensori, Operatori, Variabili, Blocchi personalizzati e il pulsante estensione.](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

*Le categorie di blocchi di mBlock 5. Il pulsante «estensione», in basso, serve ad aggiungere quella della penna.*

Poi assembli i blocchi nella grande **area script**, trascinandoli e incastrandoli uno sotto l’altro, come i pezzi di un puzzle. Un blocco che non si incastra non fa nulla: se resta separato dagli altri, non verrà eseguito.

![L’area script di mBlock 5, vuota: una griglia di punti su cui si depositano i blocchi.](/images/blog/premier-pas-mblock/mblock-zone-script.png)

*L’area script, ancora vuota. È qui che costruirai il tuo programma.*

### Un suggerimento per riuscirci: la penna e il ciclo

Con la **penna** puoi far tracciare allo sprite una linea dietro di sé. Ecco gli ingredienti del metodo che usa meno blocchi, senza dirti in quale ordine metterli:

- un blocco della categoria **Eventi** per partire dalla tastiera: «quando si preme il tasto spazio»;
- la **penna**, che si aggiunge con il pulsante **estensione** (scegli l’estensione Penna): va abbassata perché lo sprite lasci una traccia;
- il blocco **fai … passi**, della categoria **Movimento**;
- il blocco **ruota ↻ di … gradi**, sempre in **Movimento**. La freccia ↻ ruota in senso orario;
- il **ciclo** «**ripeti … volte**» della categoria **Controllo**: invece di copiare più volte gli stessi blocchi, li metti dentro il ciclo, che li ripete tutte le volte richieste.

Un quadrato è quattro volte la stessa cosa: un lato, poi una curva. Chiediti quindi cosa mettere nel ciclo, quante volte ripeterlo e di quanti gradi ruotare a ogni angolo.

Se preferisci ragionare con le **coordinate** dei quattro angoli, puoi usare anche il blocco «scivola in … secondi a x: … y: …», che sposta dolcemente lo sprite fino a un punto dato. Entrambi i metodi sono validi.

### Come verificare il tuo lavoro

Premi la **barra spaziatrice** sulla tastiera. Hai fatto bene se:

1. lo sprite fa un giro completo in senso orario;
2. torna esattamente al punto di partenza;
3. se usa la penna, la traccia disegna davvero un quadrato, e non un rettangolo o una spirale.

Qualche indizio se non funziona: una rotazione nel verso sbagliato (↺ invece di ↻) manda lo sprite fuori dalla scena, dove resta bloccato sul bordo. Un blocco dimenticato nel ciclo dà una figura aperta. E se non si muove nulla, controlla che tutti i blocchi siano incastrati sotto il blocco «quando si preme il tasto spazio».

Prenditi il tempo di provare. Quando hai finito, o se sei bloccato, apri la soluzione qui sotto.

<details class="exercise-solution">
<summary class="exercise-solution__summary">Vedi una soluzione (dopo aver provato)</summary>

### Le coordinate dei quattro angoli

Il quadrato misura 200 passi per lato e il punto di partenza è (−100, 100). In senso orario, i quattro angoli sono quindi:

| Tappa | Angolo | Coordinate |
|---|---|---|
| Partenza | In alto a sinistra | (−100, 100) |
| 1 | In alto a destra | (100, 100) |
| 2 | In basso a destra | (100, −100) |
| 3 | In basso a sinistra | (−100, −100) |
| Ritorno | In alto a sinistra | (−100, 100) |

Per passare da un angolo all’altro cambia una sola delle due coordinate, e cambia di 200: proprio la lunghezza del lato.

### Soluzione con le coordinate

Ecco lo script contenuto nel file del progetto: quando si preme spazio, lo sprite scivola per 1 secondo verso ciascuno dei tre angoli successivi, poi torna alla partenza.

![Lo script: quando si preme il tasto spazio, quattro blocchi «scivola in 1 secondi a x: y:» con i valori (100, 100), (100, −100), (−100, −100), (−100, 100).](/capture/carre/03-scene-preparee-carre.png)

*Lo script della soluzione. I quattro blocchi «scivola» seguono gli angoli del quadrato in senso orario.*

Puoi **[scaricare il progetto `quadrato.mblock`](/capture/carre/quadrato.mblock)** : contiene il panda già posizionato in (−100, 100) e questo script. Aprilo con mBlock 5 (menu **File**, poi **Apri**). Se usi Scratch online, ricopia semplicemente i blocchi dallo screenshot.

### Soluzione con la penna e «ripeti 4 volte»

Questa versione usa una rotazione di 90 gradi a ogni angolo. Lo sprite guarda verso destra (direzione 90): avanza di 200 passi, ruota di 90° verso destra e guarda quindi verso il basso, avanza di 200 passi, e così via fino a ritrovare la posizione di partenza. Le quattro rotazioni di 90° fanno proprio un giro completo, cioè 360°.

Ecco la struttura dello script, blocco dopo blocco (in forma di testo, da ricostruire nell’area script):

```text
quando si preme il tasto [spazio]
cancella tutto
vai a x: -100 y: 100
punta in direzione 90
abbassa penna
ripeti 4 volte
    fai 200 passi
    ruota ↻ di 90 gradi
alza penna
```

Le prime tre righe dopo l’evento riportano lo sprite al suo stato iniziale: così puoi rilanciare il programma quante volte vuoi, senza che le tracce precedenti o la posizione finale diano fastidio. Vale la pena prendere questa abitudine.

</details>

## Per andare oltre

Quando il quadrato è riuscito, modificalo per vedere cosa cambia ogni valore:

- cambia la lunghezza del lato, per esempio 100 o 150 passi;
- cambia il colore o lo spessore della linea con i blocchi dell’estensione Penna;
- traccia un **triangolo equilatero**: ha 3 lati e lo sprite ruota di 120° a ogni angolo (360 diviso 3);
- traccia un **esagono**: 6 lati e 60° a ogni angolo (360 diviso 6).

Hai appena scoperto una regola utile: per una figura regolare con n lati, si ripete n volte «avanza, poi ruota di 360 ÷ n gradi».

Se questo primo programma ti è piaciuto, il passo successivo su un robot reale è il [primo programma mBot](/it/primo-programma-mbot/). E se esiti tra i due programmi, leggi [mBlock o Scratch: quale scegliere?](/it/mblock-vs-scratch/).

## Domande frequenti

### Come si fa un quadrato su Scratch?

Posiziona lo sprite su un angolo, abbassa la penna, poi ripeti 4 volte «fai 200 passi» e «ruota di 90 gradi». Lo sprite traccia così quattro lati uguali e quattro angoli retti. L’altro metodo consiste nell’usare le coordinate dei quattro angoli con il blocco «scivola a x: y:». Le due soluzioni sono spiegate sopra, nella sezione richiusa.

### Perché ripetere 4 volte e perché ruotare di 90°?

Un quadrato ha 4 lati uguali e 4 angoli retti. Un angolo retto misura 90 gradi. Il ciclo «ripeti 4 volte» riesegue le stesse due istruzioni (un lato, una curva) a ogni angolo, senza copiare i blocchi. Dopo quattro rotazioni di 90°, lo sprite ha girato di 360°: guarda di nuovo nella direzione di partenza.

### C’è una differenza tra Scratch e mBlock per questa attività?

No, i blocchi di movimento, controllo e penna sono gli stessi, perché mBlock 5 è costruito a partire da Scratch 3. La differenza sta nelle possibilità: Scratch serve a creare animazioni e giochi, mBlock permette in più di programmare robot (come mBot) e offre una modalità Python. Per scegliere, leggi [mBlock o Scratch: quale scegliere?](/it/mblock-vs-scratch/).

### Lo sprite non traccia nessuna linea, cosa fare?

Controlla che il blocco che abbassa la penna («abbassa penna») venga eseguito prima degli spostamenti e che non sia seguito troppo presto da un blocco che la alza. Verifica anche di aver aggiunto l’estensione Penna.

*Autore: Emmanuel Sauvage.*
