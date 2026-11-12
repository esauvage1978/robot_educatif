---
layout: ../../layouts/ItPost.astro
title: "Installare i blocchi mBot in mBlock 5 (screenshot reali)"
description: "Aggiungere mBot o mBot2 come dispositivo in mBlock 5: catture reali, palette arancione, scelta del modello e risoluzione problemi — ottobre 2026."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Serve l’USB per installare i blocchi mBot?"
    answer: "No. Aggiungere il dispositivo mBot carica i blocchi arancioni senza cavo. USB o Bluetooth servono dopo per collegare e caricare il programma."
  - question: "Vedo solo blocchi Scratch, non mBot"
    answer: "Apri Dispositivi, clic Aggiungi (+), scegli mBot o mBot2, OK, poi clicca mBot nell’elenco per tenerlo attivo."
  - question: "mBot o mBot2 nella libreria?"
    answer: "Kit blu classico con scheda mCore → mBot. CyberPi o mBot2 → mBot2. In dubbio: mBot vs mBot2 sul sito."
  - question: "I blocchi mBot sono spariti dopo un altro progetto"
    answer: "È selezionato un altro dispositivo (CyberPi, Ranger…). Clicca di nuovo su mBot in Dispositivi."
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite essi, possiamo ricevere una commissione senza costi aggiuntivi per te. Verifica il prezzo su [Amazon.it](https://www.amazon.it/s?k=Makeblock+mBot&tag=roboteducat0f-21) — non inventiamo prezzi del giorno.

> **Risposta diretta (ottobre 2026)** — In **mBlock 5** (editor a blocchi Makeblock simile a **Scratch** del MIT): **Dispositivi** → **Aggiungi (+)** → **mBot** (kit classico **mCore**) o **mBot2** (**CyberPi**) → **OK**. Compare la palette **arancione** (motori, sensori, LED, buzzer). Senza questo passo restano solo i blocchi Scratch standard. Prima: [Installare mBlock 5 su Windows](/it/installare-mblock-5-windows/) o [Scaricare mBlock 5 gratis](/it/scaricare-mblock-5-gratis/). Poi: [Primi passi mBlock 5](/it/primi-passi-mblock-5/) e [Primo programma mBot](/it/primo-programma-mbot/).

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Screenshot mBlock 5: libreria dispositivi con la tessera mBot nella griglia Makeblock." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Libreria dispositivi mBlock 5 — la tessera **mBot** (seconda riga) è il robot blu classico. Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

| Criterio | Valore |
| --- | --- |
| **Obiettivo** | Mostrare i blocchi di comando mBot in mBlock 5 |
| **Difficoltà** | Principiante (configurazione software) |
| **Tempo** | 2–5 minuti |
| **Materiale** | PC con [mBlock 5](/it/installare-mblock-5-windows/); il robot può restare spento |
| **Risultato** | **mBot** in **Dispositivi**; categoria blocchi mBot visibile |

Per programmare l’[mBot educativo Makeblock](/it/mbot-il-mio-primo-robot-educativo/) serve **registrare il modello** nella libreria Makeblock. Non è un download separato: il **dispositivo attivo** carica motori, sensori e LED nella palette. Dubbi su desktop, browser o Python? Guida pilastro: [Quale software mBlock per mBot?](/it/software-mblock-quale-scegliere/).

## Quale dispositivo scegliere?

| Il tuo kit | Seleziona in mBlock | Non confondere con |
| --- | --- | --- |
| mBot blu, due motori, **mCore** | **mBot** | mBot2, Ranger |
| **mBot2**, **CyberPi** | **mBot2** o **CyberPi** | mBot v1 |
| Pack **Ranger** | **mBot Ranger** | mBot classico |

Menu diversi? Leggi [mBot vs mBot2](/it/mbot-vs-mbot2/).

## Prerequisiti

- **mBlock 5** installato — [Installare mBlock 5 su Windows](/it/installare-mblock-5-windows/).
- Conoscere l’interfaccia: [Primi passi con mBlock 5](/it/primi-passi-mblock-5/).
- **USB** / **Bluetooth** servono **dopo** per testare; non obbligatori solo per i blocchi.

**Tablet / iPad:** procedura per **mBlock desktop**. Sull’iPad usa l’app ufficiale mBlock.

## 1. Aprire la zona «Dispositivi»

Colonna sinistra → scheda **Dispositivi** (o **Devices** se l’UI è in inglese). Qui scegli **quale robot** programmi.

Etichette tipiche: **Dispositivi**, **Aggiungi**, **Connetti**, **Live** / **Carica**.

<figure class="article-figure">
  <img src="/capture/mblock_appareil.png" alt="Screenshot mBlock 5: pannello Dispositivi con pulsante Aggiungi (+)." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Pannello **Dispositivi** — **Aggiungi (+)** apre la libreria. Può comparire un altro robot (es. CyberPi). Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

Clic su **Aggiungi** (o **+**).

## 2. Scegliere mBot dall’elenco

Finestra **Libreria dispositivi**: **mBot**, **mBot2**, **Ranger**, **CyberPi**…

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Screenshot mBlock 5: griglia libreria con icona mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Tessera **mBot**. Usa **Cerca** se l’elenco è lungo. Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

## 3. Confermare con OK

Seleziona **mBot** (o **mBot2**) → **OK**.

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot_validation.webp" alt="Screenshot mBlock 5: mBot selezionato, pulsante OK attivo." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>**mBot** evidenziato prima di **OK**. Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

## 4. Verificare i blocchi mBot

**mBot** compare in **Dispositivi** — clic per tenerlo **attivo**. Palette: **avanti**, **matrice LED**, **ultrasuoni** / **linea**, **buzzer**…

<figure class="article-figure">
  <img src="/capture/mbot_verification_bloc.webp" alt="Screenshot mBlock 5: mBot attivo e blocchi motore/LED nello script." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Con **mBot** attivo compaiono blocchi di movimento e LED. Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

**Verifica rapida:** mBot selezionato · blocchi **mBot** / **mCore** · prosegui con [Primo programma mBot](/it/primo-programma-mbot/).

## Risoluzione problemi

| Sintomo | Causa | Azione |
| --- | --- | --- |
| Nessun **mBot** in lista | Versione vecchia / Lite | Aggiorna da [mblock.cc](https://www.mblock.cc/en-us/download/); disattiva Lite; riavvia |
| Solo Scratch | Nessun dispositivo Makeblock | **Dispositivi → Aggiungi → mBot → OK** |
| Blocchi spariti | Altro dispositivo attivo | Clic di nuovo su **mBot** |
| UI diversa | Modello sbagliato | [mBot vs mBot2](/it/mbot-vs-mbot2/) |
| Robot muto dopo | Connessione | [Bluetooth mBlock](/it/mblock-bluetooth-problemi/); prova **USB** |
| Senza installazione | Browser | [mBlock online](/it/mblock-online-senza-installazione/) |

**Estensioni:** **Extension** / **+ Extension** — [support.makeblock.com](https://support.makeblock.com).

## FAQ

**I blocchi bastano per muovere il robot?**  
No — poi **collega** e **carica**: [Primi passi mBlock 5](/it/primi-passi-mblock-5/).

**Scratch ufficiale al posto di mBlock?**  
Scratch da solo non comanda l’hardware Makeblock — [mBlock vs Scratch](/it/mblock-vs-scratch/).

## Prezzi indicativi (ottobre 2026)

[Makeblock mBot su Amazon.it](https://www.amazon.it/s?k=Makeblock+mBot&tag=roboteducat0f-21) — verifica mBot vs mBot2 sulla scheda prodotto.

---

**Passo successivo:** [Primo programma mBot](/it/primo-programma-mbot/).

*Revisione 31 ottobre 2026 — Emmanuel Sauvage.*
