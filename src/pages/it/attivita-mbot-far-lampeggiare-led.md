---
layout: ../../layouts/ItPost.astro
title: "Programma mBot: far lampeggiare i LED (mBlock)"
description: "Tre attività mBlock sui LED RGB del mBot: rosso alternato, ciclo RGB e dissolvenza con variabili. Modalità Carica, controlli e risoluzione problemi."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Come faccio lampeggiare i LED del mBot in mBlock?"
    answer: "In mBlock 5 con dispositivo mBot: evento di avvio, ciclo, blocchi LED RGB (0–255) e attendi. Usa la modalità Carica (Upload) se il robot deve lampeggiare senza cavo USB."
  - question: "Perché un LED resta acceso dopo il programma?"
    answer: "Un LED acceso non si spegne da solo: imposta 0, 0, 0. Nell’attività 1 spegni un lato prima di accendere l’altro."
  - question: "Modalità Live o Carica per lampeggiare?"
    answer: "Live serve a testare con il PC collegato. Per una demo senza cavo: Carica (Upload); l’evento è di solito all’avvio del mBot invece della bandiera verde."
  - question: "Non trovo i blocchi LED mBot — cosa controllo?"
    answer: "Attiva l’estensione mBot (Dispositivo → mBot) e segui la guida installare blocchi mBot. Senza i blocchi arancioni non puoi regolare i LED RGB."
---

Alcuni link in questa pagina sono di affiliazione (Amazon.it). Se acquisti tramite questi link, possiamo ricevere una commissione senza costi aggiuntivi.

> **Risposta diretta (ottobre 2026)** — In **mBlock 5** (software a blocchi Makeblock, simile a **Scratch**), impila **avvio**, **ciclo**, blocchi **LED RGB** e **attendi** sul **mBot classico**; **carica** in modalità **Carica (Upload)** se il robot deve lampeggiare **senza cavo USB**.

Il [robot educativo mBot Makeblock](/it/mbot-il-mio-primo-robot-educativo/) ha **due LED RGB** sulla scheda **mCore** — la **scheda elettronica principale** del robot (microcontrollore, alimentazione, connettori). Ogni LED è un **diodo luminoso (LED)** che mescola **rosso, verde e blu** (**RGB**: *Red, Green, Blue*). Tre brevi programmi: lampeggio **rosso alternato**, ciclo **rosso/verde/blu**, poi **dissolvenza progressiva** con una **variabile**. Ideale dopo il [primo programma mBot](/it/primo-programma-mbot/) o le [idee progetto in un’ora](/it/progetti-mbot-un-ora/).

<figure class="article-figure">
  <img src="/images/lot1/mbot-premier-hero.webp" alt="Robot educativo mBot Makeblock classico, vista frontale, due LED RGB sulla scheda mCore." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Le due LED RGB si trovano a sinistra e a destra del pulsante centrale sulla mCore. Foto prodotto — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>mBot classico o mBot2?</strong></p>
<p>Questo tutorial riguarda il <strong>mBot con scheda mCore</strong> (kit blu più diffuso). Il <strong>mBot2</strong> usa un’altra scheda e blocchi diversi in mBlock; i principi RGB restano simili. Prima dell’acquisto: <a href="/it/mbot-vs-mbot2/">mBot vs mBot2</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Prima dell’attività 1 — modalità Carica</strong></p>
<ol>
<li>Collega il mBot in <strong>USB</strong>, apri mBlock, <strong>Dispositivo</strong> → <strong>mBot</strong>.</li>
<li>Costruisci l’attività 1; prova in <strong>Live</strong> se serve (tempo reale con PC, cavo o Bluetooth).</li>
<li>Passa a <strong>Carica (Upload)</strong>, evento <strong>quando mBot avvia</strong> se disponibile.</li>
<li>Carica, scollega il cavo: il lampeggio deve continuare da solo (vedi <a href="/it/primi-passi-mblock-5/">primi passi mBlock</a> se i menu differiscono).</li>
</ol>
</aside>

| Criterio | Dettaglio |
| --- | --- |
| **Livello** | Principiante (cicli, attese); attività 3: intermedio (variabile) |
| **Durata** | Circa 30–60 minuti per le tre attività |
| **Materiale** | mBot carico, PC, cavo USB |
| **Software** | <a href="/it/installare-mblock-5-windows/">mBlock 5</a>, <a href="/it/installare-blocchi-mbot/">blocchi mBot</a> |
| **Risultato atteso** | LED che lampeggiano come descritto; attività 3: rampa colore fluida |

<aside class="article-callout" role="note">
<p><strong>Prerequisiti</strong></p>
<ul>
<li>Sapere aprire mBlock e selezionare il <strong>mBot</strong>.</li>
<li><a href="/it/installare-blocchi-mbot/">Installare blocchi mBot</a> se mancano i blocchi LED.</li>
<li>Opzionale: aver già <a href="/it/primo-programma-mbot/">caricato un programma</a>.</li>
</ul>
</aside>

## Materiale e software

- [Panoramica mBot](/it/mbot-il-mio-primo-robot-educativo/) · [Installare mBlock 5](/it/installare-mblock-5-windows/) · [Primi passi](/it/primi-passi-mblock-5/) · [Blocchi mBot](/it/installare-blocchi-mbot/) · [mBlock vs Scratch](/it/mblock-vs-scratch/)

<figure class="article-figure">
  <img src="/images/blog/installer-blocs-mbot/etape-04-palette-blocs-mbot.webp" alt="Screenshot mBlock 5: palette arancione blocchi mBot con categoria LED visibile." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>I blocchi LED compaiono nella palette arancione « mBot » dopo aver selezionato il dispositivo mBot. Screenshot mBlock 5 — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

Ogni componente **R**, **G**, **B** da **0 a 255**; **0, 0, 0** = **spento**. Non confondere questi **LED laterali RGB** con la **matrice LED** centrale (testo scorrevole): vedi [far scorrere un testo](/it/attivita-mbot-far-scorrere-testo/).

## 1. Un po’ di teoria

Nel [modello RGB](https://it.wikipedia.org/wiki/RGB), ogni componente va da **0 a 255**.

Esempi: rosso **255 – 0 – 0** · verde **0 – 255 – 0** · blu **0 – 0 – 255** · bianco **255 – 255 – 255** · spento **0 – 0 – 0**.

Circa **16 milioni** di colori (**16.777.216**).

## 2. Attività 1: lampeggio rosso alternato

**Obiettivo:** accendere i LED **alternativamente sinistra e destra in rosso**, **10 volte**, **1 secondo** ciascuno. Un LED acceso **non** si spegne da solo: **0-0-0**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite1-clignotement.webp" alt="Diagramma pedagogico dei blocchi mBlock per lampeggio rosso alternato dei LED del mBot" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Sequenza blocchi attività 1 (ricostruire in mBlock 5). Diagramma — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

**Pseudo-codice:**

```text
quando mBot avvia
ripeti 10 volte
  LED sinistro rosso; LED destro spento
  attendi 1 s
  LED sinistro spento; LED destro rosso
  attendi 1 s
```

**Criterio di successo:** dieci cicli, rosso a sinistra poi a destra, senza entrambi accesi.

Salva come `led_lampeggio_01.mblock`.

<figure class="article-figure">
  <img src="/capture/premier_programme/12-televersement.png" alt="Screenshot mBlock 5: progresso o conferma dopo il caricamento del programma sul mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Dopo un caricamento riuscito, scollega l’USB: il robot lampeggia da solo. Screenshot mBlock 5 — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

## 3. Attività 2: rosso, verde, blu

**Obiettivo:** **rosso, verde e blu** su **entrambi** i LED, **10 cicli**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite2-rgb.webp" alt="Diagramma pedagogico dei blocchi mBlock per ciclo rosso-verde-blu dei LED" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Sequenza blocchi attività 2. Diagramma — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

**Pseudo-codice:**

```text
quando mBot avvia
ripeti 10 volte
  entrambi i LED rosso → attendi 1 s
  entrambi i LED verde → attendi 1 s
  entrambi i LED blu → attendi 1 s
```

**Criterio di successo:** entrambi i LED alternano rosso, verde e blu dieci volte con circa un secondo di pausa.

Salva come `led_rgb_ciclo.mblock`. Prossimo passo: [misurare distanze](/it/attivita-mbot-misurare-distanze/) o [rilevatore intrusione](/it/attivita-mbot-rilevatore-intrusione/).

## 4. Attività 3: visualizzazione progressiva

**Obiettivo:** aumentare progressivamente rosso, verde e blu da **0 a 255**. Variabile (es. `intensita`), partenza **0**, incremento **1**, ogni passo **0,01 s**.

<figure class="article-figure">
  <img src="/images/lot3/leds-activite3-progressif.webp" alt="Diagramma pedagogico della dissolvenza progressiva dei LED con variabile intensità" width="800" height="450" loading="lazy" decoding="async" />
  <figcaption>Attività 3: una variabile aumenta l’intensità colore. Diagramma — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

**Pseudo-codice (fade rosso — ripetere per verde e blu):**

```text
imposta intensita a 0
ripeti 255 volte
  cambia intensita di 1
  LED sinistro e destro = (intensita, 0, 0)
  attendi 0,01 secondi
```

Poi cicli con `(0, intensita, 0)` e `(0, 0, intensita)`. Esporta `led_fade_rgb.mblock`.

**Criterio di successo:** salita graduale della luminosità per ogni colore; mantieni **0,01 s** o regola leggermente.

### Blocco personalizzato

Tre parametri (passo, ritardo, indice colore **0/1/2**) evitano ripetizioni — utile nei [10 progetti mBot gratuiti per la classe](/it/10-progetti-mbot-gratis-classe/).

Conclusione: hai **usato** i LED RGB e visto **cicli**, **variabili** e **blocchi personalizzati** in mBlock.

## 5. Verifiche e risoluzione problemi

| Problema | Causa frequente | Cosa fare |
| --- | --- | --- |
| Nessun LED acceso | Non collegato / dispositivo sbagliato | USB, batterie, **mBot** in mBlock |
| Un LED resta acceso | Manca **0, 0, 0** | Spegni dopo ogni colore |
| Ok in Live, stop senza cavo | Non caricato | **Carica** e ricarica |
| Blocchi LED assenti | Libreria mBot off | <a href="/it/installare-blocchi-mbot/">Installare blocchi mBot</a> |
| Lampeggio troppo veloce / lento | Valore **attendi** errato | **1 secondo** per attività 1 e 2 |
| Colori spenti o sbagliati | RGB fuori range | Ogni componente **0–255** |

Problemi Bluetooth in Live? Usa l’**USB** e consulta [mBlock Bluetooth](/it/mblock-bluetooth-problemi/).

## FAQ

### Come lampeggiare i LED?

Impila avvio, ciclo, blocchi **LED RGB** e **attendi**, poi carica.

### Perché resta acceso?

Invia esplicitamente **0, 0, 0**.

### Live o Carica?

**Live** = test con PC; **Carica** = programma nel robot senza cavo.

## 6. Approfondire

- [Primo programma mBot](/it/primo-programma-mbot/)
- [Misurare distanze](/it/attivita-mbot-misurare-distanze/)
- [Tutorial mBlock](/en/tutorials/)
- [Rilevatore intrusione](/it/attivita-mbot-rilevatore-intrusione/)
- [Quale software mBlock scegliere?](/it/software-mblock-quale-scegliere/)

*Emmanuel Sauvage — aggiornato il 31 ottobre 2026.*
