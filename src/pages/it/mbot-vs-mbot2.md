---
layout: ../../layouts/ItPost.astro
title: "mBot vs mBot2: differenze, prezzi e quale scegliere"
description: "Confronto mBot vs mBot2 2026: prezzi indicativi ottobre, CyberPi, Python, RJ25 e mBuild. Quale robot Makeblock per età, budget e accessori extra."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Gli accessori RJ25 del mBot classico vanno sul mBot2?"
    answer: "Non direttamente. Il mBot classico usa porte RJ25; il mBot2 usa il bus mBuild sulla CyberPi. Controlla la compatibilità ufficiale Makeblock o il riepilogo accessori in questa pagina prima dell'acquisto."
  - question: "Da che età conviene mBot o mBot2?"
    answer: "L'mBot spesso va bene dagli 8 anni con un adulto per l'installazione. L'mBot2 è più adatto verso 9–10 anni se punti a Python e progetti lunghi."
  - question: "Che budget prevedere (ottobre 2026)?"
    answer: "Il 9 novembre 2026 Amazon.it mostrava 89,99 € per l'mBot (B07XR98YYQ) e 169,99 € per l'mBot2 (B0919F9CKS). I prezzi cambiano: verifica l'annuncio al momento dell'acquisto."
  - question: "Serve l'mBot2 per imparare Python?"
    answer: "L'mBot2 rende Python naturale grazie a CyberPi e mBlock. L'mBot classico resta centrato sui blocchi; per Python serio senza ricomprare, l'mBot2 è spesso la scelta migliore."
---

> **Trasparenza affiliati** — Alcuni link portano ad Amazon.it (partner). Acquisti idonei possono generare una commissione per il sito, senza costi extra per te. **Prezzi indicativi: ottobre 2026** — controlla sempre il prezzo in annuncio.

> **Risposta diretta (ottobre 2026)** — Scegli l’**mBot** (**89,99 €** su Amazon.it il 9 novembre 2026) per la prima robotica **Scratch** / **mBlock** (programmazione a blocchi): scheda **mCore**, pile **AA**, porte **RJ25** (connettore Makeblock a 4 pin del mBot classico). Scegli l’**mBot2** (**169,99 €** su Amazon.it il 9 novembre 2026) se punti a **Python**, schermo **CyberPi** (scheda con display a colori e **Wi‑Fi**), batteria **Li-ion** integrata (accumulatore al litio ricaricabile, come su uno smartphone) e sensori avanzati (giroscopio, microfono). Gli accessori **RJ25** del vecchio mBot **non** vanno **sul mBot2**: usa **mBuild** (bus magnetico modulare sulla CyberPi).

Stai scegliendo tra l’**mBot** « classico » e l’**mBot2** : due generazioni dell’ecosistema [Makeblock](/it/marchio-makeblock/). Il primo usa la scheda **mCore**; il secondo la **CyberPi**, più recente e potente. Questa pagina confronta **prezzi**, **funzioni**, **accessori** e **risoluzione problemi** — verifica sempre la scheda ufficiale (revisione kit, Bluetooth incluso o meno, ecc.).

<figure class="article-figure">
  <img src="/images/models/makeblock-mbot-mcore.webp" alt="Makeblock mBot classico con scheda mCore — foto prodotto per confronto mBot vs mBot2" width="1200" height="800" loading="eager" decoding="async" />
  <figcaption>mBot classico (mCore). Foto prodotto Makeblock — Emmanuel Sauvage, robot-educatif.info — ottobre 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/images/models/makeblock-mbot2.webp" alt="Makeblock mBot2 con CyberPi integrata — foto prodotto" width="1200" height="800" loading="lazy" decoding="async" />
  <figcaption>mBot2 (CyberPi sul telaio). Foto prodotto Makeblock — Emmanuel Sauvage, robot-educatif.info — ottobre 2026.</figcaption>
</figure>

## Prezzi indicativi (Italia, ottobre 2026)

**Indicativamente ad ottobre 2026** su offerte comuni (Amazon.it e altri venditori):

| Modello | Prezzo indicativo* |
|--------|------------------|
| **mBot** (kit base) | **89,99 €** il 9 novembre 2026 |
| **mBot2** | **169,99 €** il 9 novembre 2026 |

\*Importi **variabili** per promozioni, stock e IVA. Verifica il **prezzo al momento dell’acquisto**.

**Scarto di budget**: l’mBot2 costa spesso **quasi il doppio** dell’mBot in ingresso. La domanda è **cosa prioritizzi**: un primo robot accessibile o una piattaforma più ricca per **Python** e **Wi‑Fi**.

Vedi anche [miglior robot programmabile per bambini](/it/miglior-robot-programmabile-per-bambini/) e [recensione mBot: conviene comprarlo?](/it/mbot-recensione-vale-la-pena/).

## Cosa li avvicina

- **Stesso software**: **mBlock** (vicino a Scratch), tutorial e community — [installare mBlock 5](/it/installare-mblock-5-windows/).
- **Stessa idea pedagogica**: montare il telaio, collegare sensori, fare percorsi.
- **Stesso ecosistema Makeblock**, ma accessori **non sempre compatibili** tra generazioni.

## Tabella comparativa

**Arduino** è una famiglia di schede elettroniche molto usata a scuola; l’mBot classico monta un chip **ATmega328P** compatibile con quell’ecosistema. **ESP32** è un chip più recente e veloce, al centro della **CyberPi** dell’mBot2 (Wi‑Fi, più spazio per **Python**).

I dettagli possono variare leggermente per **revisione** del kit.

| Criterio | mBot (classico) | mBot2 |
|--------|-------------------|--------|
| **MCU** (microcontrollore = « cervello » del robot) | **ATmega328P** su mCore (16 MHz, compatibile **Arduino**) | **ESP32** (CyberPi, dual-core 240 MHz) |
| **Alimentazione** | 4× pile **AA** (~1 h) o **LiPo** opzionale | Batteria **Li-ion 2500 mAh** integrata (~5 h) |
| **Scheda** | **mCore** | **CyberPi** (Wi‑Fi, **Python**) |
| **Programmazione** | Blocchi **mBlock** | **mBlock** + **Python** |
| **Bus sensori** | **RJ25** (porte 1–4) | **mBuild** (CyberPi) |
| **Motori** | Due motori | Motori con **encoder** (migliore precisione) |
| **Sensori comuni** | **Linea**, **ultrasuoni**, **IR** (infrarossi, telecomando secondo kit) | Ultrasuoni, linea, **luce**, **giroscopio** |
| **Feedback visivo / sonoro** | LED RGB, **buzzer** | **Schermo 1,44"**, **altoparlante**, **microfono** |
| **Connettività** | Spesso **Bluetooth** (verifica scheda prodotto) | **Bluetooth** e **Wi‑Fi** |
| **Telaio** | Lega di alluminio | Lega di alluminio, batteria integrata |
| **Pubblico consigliato** | Scoperta, club, **budget contenuto** | Media/superiore, progetti lunghi, **Python** |

**In sintesi**: l’**mBot** copre **scoperta e prime sfide**; l’**mBot2** aggiunge **progetti ambiziosi** (precisione, schermo, suono) e **Scratch → Python**. Approfondimento: [CyberPi](/it/makeblock-cyberpi-panoramica/) e [mBot: il mio primo robot](/it/mbot-il-mio-primo-robot-educativo/).

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ingresso · pile AA · porte RJ25.</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">89,99 € il 9 novembre 2026 — verifica il prezzo del giorno</a></p>
    <a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 0.9rem;border-radius:8px;text-decoration:none;font-size:0.9rem;">Controlla il prezzo su Amazon</a>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">CyberPi · Python · batteria Li-ion.</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">169,99 € il 9 novembre 2026 — verifica il prezzo del giorno</a></p>
    <a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 0.9rem;border-radius:8px;text-decoration:none;font-size:0.9rem;">Controlla il prezzo su Amazon</a>
  </div>
</div>

## Accessori ed evolutività

### mBot classico

- Porte **RJ25** ed estensioni storiche Makeblock.
- Prima dell’acquisto: [Accessori mBot: da dove iniziare](/it/accessori-mbot-da-dove-iniziare/).
- **Errore frequente**: comprare un modulo senza verificare la **tua** revisione di mBot.

### mBot2

- **mBuild** sulla **CyberPi**. Accessori **RJ25** del vecchio mBot **non** si collegano direttamente — [supporto Makeblock](https://support.makeblock.com) prima dell’ordine.

### Compatibilità accessori (RJ25 vs mBuild)

| Tipo di estensione | mBot classico (RJ25) | mBot2 (mBuild / CyberPi) |
|--------------------|----------------------|---------------------------|
| Sensori RJ25 storici (ultrasuoni, linea) | Sì (porte 1–4) | No (senza adattatore) |
| Moduli mBuild magnetici | No | Sì |
| Bracci, cingoli, pack explorer | Verificare scheda Makeblock (spesso linea mBot v1) | Kit mBot2 / mBuild dedicati |

Per una **matrice completa** (interfaccia in francese, ID prodotto universali), apri anche la [matrice compatibilità Makeblock](/compatibilite-makeblock/) insieme alla documentazione ufficiale.

Altre letture: [mBot vs Codey Rocky](/en/mbot-vs-codey-rocky/) (articolo in inglese sul sito), [Thymio 3 vs mBot2](/it/thymio-3-recensione-prezzo-vs-mbot2/) o [miglior robot educativo 2026](/it/miglior-robot-educativo-2026/).

## Software e avvio

Entrambi si pilotano con **mBlock** su computer. Sull’mBot2 puoi **concatenare** blocchi e **Python**. Dubbi sul software? [Quale mBlock](/it/software-mblock-quale-scegliere/). Blocchi robot: [Installare i blocchi mBot](/it/installare-blocchi-mbot/). Primo programma: [Primo programma mBot](/it/primo-programma-mbot/).

## Risoluzione problemi (Bluetooth, mBlock, modulo sbagliato)

| Sintomo | Causa frequente | Cosa fare |
|---------|-----------------|-----------|
| mBlock non vede il robot | Dispositivo sbagliato (mBot vs mBot2), driver USB mancante | Scegli **mBot (mCore)** o **mBot2**; prima sessione in **USB**; [Scaricare mBlock 5](/it/scaricare-mblock-5-gratis/) |
| Bluetooth instabile | Pile scariche (mBot AA), distanza, mBlock datato | Cambia pile; avvicina il PC; [Bluetooth mBlock](/it/mblock-bluetooth-problemi/) |
| Blocchi diversi dai tutorial | Hai l’altra generazione | Rileggi questa pagina; [Installare blocchi mBot](/it/installare-blocchi-mbot/) |
| Accessorio non si collega | RJ25 comprato per mBot2 (o viceversa) | Tabella sopra + [matrice accessori](/compatibilite-makeblock/) |

## Quale robot scegliere?

- **mBot**: primo robot solido, community ampia, **budget** più stretto, laboratori linea/ostacolo/LED.
- **mBot2**: più anni d’uso, progetti audio/luce, **precisione**, **Python** senza ricomprare subito.

## Acquistare su Amazon.it (affiliati)

- [mBot Makeblock su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)
- [mBot2 Makeblock su Amazon.it](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21)

*Link affiliati — commissione possibile su acquisti idonei, senza sovraccosto.*

## Per approfondire

- [Miglior robot educativo 2026](/it/miglior-robot-educativo-2026/)
- [mBot vs robot LEGO](/it/mbot-vs-lego-robot/)
- [Miglior robot programmabile](/it/miglior-robot-programmabile-per-bambini/)
- [Thymio 3 vs mBot2](/it/thymio-3-recensione-prezzo-vs-mbot2/)

## FAQ

### Gli accessori RJ25 v1 vanno sul mBot2?

No, salvo adattatori dedicati. L’mBot2 usa moduli **mBuild**. Consulta il riepilogo sopra o la [matrice accessori](/compatibilite-makeblock/).

### Quale robot a 8 anni?

Spesso l’**mBot**. L’**mBot2** se punti già a **Python** — [robot programmabile 10 anni](/it/robot-programmabile-10-anni/).

### L’mBot2 vale quasi il doppio?

Se usi solo blocchi base, la differenza sembra piccola all’inizio. Conviene soprattutto per **Python**, **schermo**, **giroscopio**, **batteria** e **encoder**.

### Altri marchi?

[Miglior robot programmabile](/it/miglior-robot-programmabile-per-bambini/), [mBot vs LEGO](/it/mbot-vs-lego-robot/) o [mBot vs Codey Rocky](/en/mbot-vs-codey-rocky/).

---

*Emmanuel Sauvage — aggiornato il 31 ottobre 2026.*
