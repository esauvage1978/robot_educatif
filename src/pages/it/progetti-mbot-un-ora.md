---
layout: ../../layouts/ItPost.astro
title: "Programmare mBot in 1 ora: idee di sfide e metodo"
description: "Programmazione mBot per una sessione di un’ora: piano minuto per minuto, 7 sfide (LED, ultrasuoni, percorso) e link ai tutorial passo passo per la classe."
updated: "31 ottobre 2026"
faqSchema:
  - question: "Quanto tempo serve per un programma mBot in laboratorio?"
    answer: "Prevedi da 45 a 60 minuti per sfida: 5 min di obiettivo, 30 min di codice e test, 10 min di robustezza, 5 min di demo."
  - question: "Cosa programmare su mBot in un’ora?"
    answer: "Sfide brevi: semaforo a LED, radar a ultrasuoni, contatore di intrusioni, percorso a durate fisse o mini scenario sulla matrice LED."
---

Cerchi un **programma mBot** (il robot educativo Makeblock programmabile a blocchi) che stia in **un’ora** di lezione, di club o a casa? Questa pagina dà prima il **metodo** (suddivisione minuto per minuto), poi un **elenco di sfide** pronte da lanciare, con link ai tutorial passo passo del sito.

> **Risposta diretta (ottobre 2026)** — Prevedi **45–60 minuti** per sfida: 5 min di obiettivo, 30 min di codice/test, 10 min di robustezza, 5 min di demo. Idee rapide: [LED](/it/attivita-mbot-far-lampeggiare-led/), [ultrasuoni](/it/attivita-mbot-misurare-distanze/), [intrusione](/it/attivita-mbot-rilevatore-intrusione/). Installa [mBlock 5](/it/installare-mblock-5-windows/) prima della sessione.

Prerequisiti: **mBlock** installato, robot **carico** (o pile a posto) e [primi passi con mBlock](/it/primi-passi-mblock-5/) già fatti. Alcuni link di acquisto compaiono **dopo** le sfide; sono link di affiliazione (commissione possibile). Controlla il prezzo del giorno su Amazon.it.

![mBot Makeblock visto di tre quarti, pronto per una sfida di un’ora](/images/lot1/mbot-premier-hero.webp)

*Il mBot classico — ideale per sfide brevi a blocchi in Scratch / mBlock. Foto prodotto usata per questo articolo.*

## 1. Spezzare l’ora (un metodo che funziona)

| Minuti | Attività |
|---------|----------|
| 0–5 | Richiamo dell’obiettivo + **criterio di riuscita** («ci fermiamo quando…»). |
| 5–35 | Codice e **test brevi** (niente programma mostro da 80 blocchi). |
| 35–50 | **Robustezza**: cosa succede se si sposta il robot o l’ostacolo? |
| 50–60 | **Demo** di 2 minuti + una frase «cosa faremmo la prossima volta». |

Questa scaletta evita di passare tutta la sessione a cercare un bug senza mai mostrare un risultato.

## 2. Idee di sfide (programmazione mBot)

### Semaforo express (~30 min di codice)

Alternare **rosso / verde** (poi arancione se disponibile) sui LED con temporizzazioni — base: [far lampeggiare i LED](/it/attivita-mbot-far-lampeggiare-led/).

### Radar «stop» (~30 min)

**Allerta** (LED o matrice) quando la distanza misurata scende sotto una soglia — prolunga [misurare le distanze](/it/attivita-mbot-misurare-distanze/).

### Contatore di intrusioni (~35 min)

Combinare **ultrasuoni + contatore + display** — vedi [rilevatore di intrusione](/it/attivita-mbot-rilevatore-intrusione/).

### Sfida «un minuto di silenzio» (~25 min)

Il robot resta immobile finché non viene rilevato un **suono** oltre una soglia — **solo se** il tuo modello ha un microfono utilizzabile in mBlock (il mBot v1 classico non lo include di serie; mBot2 / CyberPi sì). Altrimenti sostituisci il trigger con il pulsante di bordo o con un sensore di linea.

### Mini scenario narrativo (~30 min)

Il robot «consegna» un messaggio sulla matrice o sui LED tra due spostamenti — ottimo per una **restituzione orale** in classe. Scorrimento sulla matrice: [far scorrere un testo](/it/attivita-mbot-far-scorrere-testo/).

### Percorso imposto senza pista nera (~35 min)

Programmare **avanti / gira / indietro** con durate fisse per uscire da un labirinto disegnato a terra col gesso — all’inizio non serve il seguilinea. Punto di partenza: [primo programma mBot](/it/primo-programma-mbot/).

### Semaforo + ultrasuoni combinati (~45–55 min)

Concatena la sequenza LED e la soglia di distanza se il gruppo procede spedito: il semaforo resta verde finché la via è libera e passa al rosso appena un ostacolo si avvicina sotto la soglia. Tieni la demo breve.

## Materiale utile (dopo le sfide)

Quando metodo e idee sono chiari, ecco il materiale più comune per questi laboratori. I prezzi Amazon cambiano: controlla la scheda il giorno dell’acquisto.

**Makeblock mBot** — circa 8–12 anni · Scratch e Arduino · montaggio rapido per un laboratorio · LED e sensore a ultrasuoni adatti alle sfide da 1 h · [Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)

**ELEGOO Penguin Bot** (alternativa economica, non è un mBot) — circa 8–14 anni · Arduino C · robot bipede originale per laboratori di altro tipo · [Amazon.it](https://www.amazon.it/s?k=ELEGOO+Penguin+Bot&tag=roboteducat0f-21)

## 3. Approfondimenti

- Presentazione del robot: [mBot, il mio primo robot educativo](/it/mbot-il-mio-primo-robot-educativo/).
- Accessori per dopo: [accessori mBot — da dove iniziare](/it/accessori-mbot-da-dove-iniziare/).
- Sequenza più lunga: [10 progetti mBot gratis per la classe](/it/10-progetti-mbot-gratis-classe/).

## 4. Trappole da evitare in 1 h

- Obiettivo **troppo ampio** («facciamo tutto») — preferisci **una** funzionalità ben finita.
- Dimenticare la **demo finale**: è lei che consolida l’apprendimento.
- Perdere 40 minuti su un cavo USB o sul Bluetooth: prova la connessione **prima** della sessione ([risolvere i problemi Bluetooth di mBlock](/it/mblock-bluetooth-problemi/) se serve).

## Link Amazon (affiliazione)

- [Makeblock mBot](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)

*Partner Amazon — commissione possibile sugli acquisti idonei, senza costi aggiuntivi per te.*

**Consiglio.** Termina sempre con una **demo di 2 minuti** davanti a qualcuno: fissa l’obiettivo ed evita di complicare troppo il programma.

**Da leggere anche**: [miglior robot educativo 2026](/it/miglior-robot-educativo-2026/).

*Autore: Emmanuel Sauvage · aggiornato il 31 ottobre 2026.*
