---
layout: ../../layouts/ItPost.astro
title: "Primo programma mBot in mBlock 5 (passo passo)"
description: "Primo programma mBlock 5 per mBot: all'avvio attendere il pulsante della scheda, poi suonare una nota. Guida per principianti con screenshot e file .mblock."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Qual è il primo programma mBot consigliato?"
    answer: "Uno script semplice in mBlock 5: all'avvio del mBot attendere il pulsante della scheda mCore, poi suonare una nota. Valida il caricamento senza logica complessa."
  - question: "Serve il cavo USB o il Bluetooth per questo tutorial?"
    answer: "L'USB è consigliato per il primo caricamento e gli aggiornamenti firmware. Il Bluetooth va bene per i test in Live con il PC; per scrivere il programma nel robot l'USB è più affidabile."
  - question: "Questo tutorial funziona con mBot2?"
    answer: "Blocchi e logica sono simili, ma la guida riguarda l'mBot classico (scheda mCore). Su mBot2 seleziona il dispositivo mBot2 in mBlock e consulta il confronto mBot vs mBot2 se i menu differiscono."
  - question: "Dove scaricare il file .mblock dell'articolo?"
    answer: "In fondo all'articolo: link diretto a premier_programme.mblock. Aprilo in mBlock 5 (File → Apri) per confrontarlo con il tuo script."
---

Alcuni link sono link di affiliazione **Amazon.it**: in caso di acquisto potremmo ricevere una commissione, senza costi aggiuntivi per te.

> **Risposta diretta (ottobre 2026)** — Apri **mBlock 5** (software a blocchi Makeblock, vicino a **Scratch**), aggiungi il dispositivo **mBot**, costruisci: **Quando il mBot si avvia** → **aspetta fino a** (pulsante scheda premuto) → **suona una nota**. Salva, collega via **USB**, **carica**. All'avvio, una pressione sul pulsante fa suonare la nota. Aiuto connessione: [primi passi mBlock](/it/primi-passi-mblock-5/).

Questo tutorial ti guida **passo passo** dal primo blocco in mBlock 5 fino al **caricamento** (invio del programma nella memoria del robot). Il programma resta volutamente **semplice**: all'avvio il mBot attende che premi il **pulsante sulla scheda**; poi riproduce una **nota breve**. L'obiettivo è imparare il **flusso di lavoro** (aprire il software → impilare i blocchi → salvare → collegare → testare → caricare), non ancora algoritmi avanzati.

<figure class="article-figure">
  <img src="/capture/premier_programme/04-jouer-note-c4.png" alt="Screenshot mBlock 5: programma mBot completo con blocco di avvio, attesa pulsante scheda e nota C4." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Programma finale in mBlock 5: tre blocchi annidati bastano per validare il caricamento. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

| Criterio | Dettaglio |
| --- | --- |
| **Livello** | Principiante (primo caricamento) |
| **Durata** | Circa 30–45 minuti (connessione + test) |
| **Materiale** | [mBot classico (mCore)](/it/mbot-il-mio-primo-robot-educativo/) carico, PC, cavo USB |
| **Software** | [mBlock 5](/it/installare-mblock-5-windows/), [blocchi mBot](/it/installare-blocchi-mbot/) |
| **Risultato** | Una nota dopo la pressione del pulsante, robot autonomo senza PC |

<aside class="article-callout" role="note">
<p><strong>mBot classico o mBot2?</strong></p>
<p>Questa guida assume un <strong>mBot con scheda mCore</strong>. L'<strong>mBot2</strong> usa un'altra scheda: i menu mBlock cambiano leggermente. Confronta entrambi in <a href="/it/mbot-vs-mbot2/">mBot vs mBot2</a> prima di acquistare o prestare un robot.</p>
</aside>

## Prima di iniziare

- Un [robot educativo mBot Makeblock](/it/mbot-il-mio-primo-robot-educativo/) con batterie cariche.
- [Installare mBlock 5](/it/installare-mblock-5-windows/) (o provare [mBlock online](/it/mblock-online-senza-installazione/)).
- Conoscere l'[interfaccia di mBlock 5](/it/primi-passi-mblock-5/) (sprite, modalità **Dispositivo**, area script).
- [Aggiungere i blocchi mBot](/it/installare-blocchi-mbot/) se manca la palette arancione.

In mBlock 5 passa alla modalità **Dispositivo** e seleziona l'**mBot** (scheda **mCore**). La **mCore** è la **scheda principale** del mBot: ospita il **microcontrollore** (piccolo processore che esegue il programma), il **pulsante** che userai, i connettori per **motori** e **sensori**, le interfacce **USB** (cavo verso il PC) e, se presente, **Bluetooth** (collegamento senza fili al computer).

## Costruire il programma

### 1. Punto di ingresso: all'avvio del robot

Inizia con **Quando il mBot (mcore) si avvia** (categoria **mBot** / eventi) — corrisponde ad **accensione** o **reset** della scheda.

<figure class="article-figure">
  <img src="/capture/premier_programme/01-bloc-demarrage-mbot.png" alt="Blocco arancione mBlock Quando il mBot (mcore) si avvia." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Blocco di avvio sul robot — senza di esso lo script non gira da solo. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

### 2. Aspettare un'azione

Sotto aggiungi **aspetta fino a** (**Controllo**). L'**esagono** attende una condizione **vero/falso**: finché è falsa, il programma **resta** in attesa.

<figure class="article-figure">
  <img src="/capture/premier_programme/02-attendre-jusqua.png" alt="Blocco mBlock aspetta fino a con spazio per una condizione." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Struttura di attesa: il robot prosegue solo quando la condizione diventa vera. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

### 3. Condizione: pulsante premuto

Nell'esagono: **pulsante sulla scheda premuto?** (**Rilevamento**). Premendo il pulsante sulla **mCore**, la condizione diventa vera.

<figure class="article-figure">
  <img src="/capture/premier_programme/03-appui-bouton-carte.png" alt="Condizione pulsante sulla scheda premuto dentro aspetta fino a." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Il pulsante è sulla scheda, non sul corpo del robot — individualo prima del test. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

### 4. Suonare una nota

Sotto **aspetta fino a**: **suona la nota … per … battiti** (**Aspetto** / suono). Qui **C4** e **0,25 battiti**.

<figure class="article-figure">
  <img src="/capture/premier_programme/04-jouer-note-c4.png" alt="Blocco suona la nota C4 per 0,25 battiti sotto aspetta fino a." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Feedback sonoro dopo la pressione. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

**Risultato:** all'avvio il robot attende; **una pressione** fa suonare la nota **una volta**. Senza un ciclo, l'azione non si ripete da sola.

```text
All'avvio del mBot:
  aspetta fino a (pulsante scheda premuto)
    suona la nota C4 per 0,25 battiti
```

## Salvare il progetto

Salva spesso: **File → Salva sul computer**, cartella e nome (**estensione .mblock**).

<figure class="article-figure">
  <img src="/capture/premier_programme/05-enregistrement-barre.png" alt="Barra strumenti mBlock con salvataggio." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Salvataggio da menu File o icona disco. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/capture/premier_programme/06-save-destination.png" alt="Finestra nome file e cartella per .mblock." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Conserva una copia prima di ogni caricamento. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

I salvataggi successivi sono più rapidi con l'**icona disco** nella barra strumenti.

## Collegare il mBot al computer

Collega il robot in **USB** (cavo in dotazione) o prepara l'**accoppiamento Bluetooth**. Accendi il mBot. In mBlock clicca **Connetti**: compare l'elenco dispositivi.

<figure class="article-figure">
  <img src="/capture/premier_programme/07-connexion-dialogue.png" alt="Finestra Connetti mBlock con elenco dispositivi." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Lista vuota: controlla cavo USB e driver (vedi sotto). Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

Il chip **CH340** (a volte **CP2102**) è un convertitore **USB-seriale**: collega PC e **mCore**. Senza **driver** installato su Windows, macOS o Linux, **Connetti** resta vuoto. Installalo con la nostra [guida installazione mBlock 5](/it/installare-mblock-5-windows/) o dal sito del produttore del chip (nome nel gestore dispositivi). Usa un cavo **dati**, non solo ricarica.

Scegli **USB** o **Bluetooth** (etichette variabili).

<figure class="article-figure">
  <img src="/capture/premier_programme/08-choix-connexion-usb-bluetooth.png" alt="Scelta USB o Bluetooth." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Primo caricamento: preferisci USB. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/capture/premier_programme/09-bluetooth-connecte.png" alt="Bluetooth connesso." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Bluetooth — comodo per la modalità Live. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/capture/premier_programme/10-usb-connecte.png" alt="USB connesso." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>USB — consigliato per caricamento e firmware. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

**Bluetooth** per test **Live**; **USB** per **firmware** e **caricamento** affidabile. Vedi [problemi Bluetooth mBlock](/it/mblock-bluetooth-problemi/).

## Firmware

Aggiornamento **solo in USB**, batterie cariche. **Non scollegare** durante l'operazione.

<figure class="article-figure">
  <img src="/capture/premier_programme/11-firmware-a-jour.png" alt="mBlock: firmware aggiornato." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Non spegnere durante l'aggiornamento firmware. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

## Testare prima del caricamento

Clic sui blocchi nell'area script (o bandiera verde) per **verificare** il comportamento finché PC e mBot sono collegati. **Test rapido:** premi il pulsante — la nota suona una volta. I blocchi devono essere **annidati**, non solo vicini.

## Caricare il programma nel mBot

**Carica** / **Scarica sul dispositivo** — poi lo script gira **senza** computer.

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="mBlock durante il caricamento." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Attendi la fine del trasferimento prima di spegnere. Screenshot mBlock 5 — Emmanuel Sauvage, Robotica educativa — ottobre 2026.</figcaption>
</figure>

Se il **caricamento fallisce**, mBlock mostra un errore (connessione persa, dispositivo non trovato): mantieni il robot **alimentato**, **ricollega in USB**, seleziona **mBot (mCore)**, controlla il programma **blocco per blocco** — tutto annidato sotto **Quando il mBot si avvia**. Salva, ritesta in **Live**, **Carica** di nuovo. Se il Bluetooth fallisce, passa all'USB e leggi [Bluetooth mBlock](/it/mblock-bluetooth-problemi/).

## Verifiche e risoluzione problemi

| Problema | Causa frequente | Cosa fare |
| --- | --- | --- |
| Elenco **Connetti** vuoto | Cavo solo ricarica, driver **CH340** assente | Cavo **dati**; driver USB-seriale — [installare mBlock](/it/installare-mblock-5-windows/) |
| Nessun suono dopo il caricamento | mBot2 selezionato, blocchi mal impilati | Scegli **mBot mCore**; verifica i tre blocchi annidati |
| Ok in Live, nulla scollegato | Programma non scritto nel robot | **Carica** fino al messaggio di fine |
| Caricamento fallisce spesso | Batterie basse, firmware in corso | Ricarica; completa l'aggiornamento **firmware** in USB |
| Menu diversi dalle immagini | Altro modello | [mBot vs mBot2](/it/mbot-vs-mbot2/) o [blocchi mBot](/it/installare-blocchi-mbot/) |

## File di progetto e passi successivi

- **[Scarica `premier_programme.mblock`](/programmes/premier_programme.mblock)** (file mBlock 5).

Per andare oltre: fai **ripetere** la melodia con **ripeti** / **per sempre** — testa man mano. Poi [LED RGB](/it/attivita-mbot-far-lampeggiare-led/) o [misurare distanze](/it/attivita-mbot-misurare-distanze/).

## Andare oltre con Scratch e mBlock

**Scratch** è il linguaggio a blocchi del MIT; **mBlock 5** aggiunge i blocchi **mBot**. Per proseguire:

- [mBlock vs Scratch](/it/mblock-vs-scratch/) — differenze prima di un libro o corso.
- [Attività Scratch: il quadrato](/it/attivita-scratch-il-quadrato/) — cicli senza robot.
- [10 progetti mBot gratis per la classe](/it/10-progetti-mbot-gratis-classe/) — progressione su più ore.
- [Progetti in un'ora](/it/progetti-mbot-un-ora/) — brevi follow-up dopo questo caricamento.

Libri generali su Scratch e robotica possono integrare questi tutorial del sito; inizia dalle attività mBot sopra, allineate al tuo hardware.

## FAQ

### Primo programma consigliato?

Attendere il **pulsante scheda**, poi **suonare una nota** — validi connessione, blocchi e caricamento.

### USB o Bluetooth?

**USB** per caricamento e firmware; **Bluetooth** per Live. Vedi [primi passi](/it/primi-passi-mblock-5/).

### mBot2?

Guida per **mCore**; su **mBot2** scegli il dispositivo giusto — [mBot vs mBot2](/it/mbot-vs-mbot2/).

### File .mblock?

**[premier_programme.mblock](/programmes/premier_programme.mblock)**

*Emmanuel Sauvage — aggiornato il 31 ottobre 2026.*
