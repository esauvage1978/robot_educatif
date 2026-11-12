---
layout: ../../layouts/ItPost.astro
title: "Attività mBot: misurare le distanze (sensore a ultrasuoni)"
description: "Tutorial mBlock per principianti: sensore a ultrasuoni del mBot in Live, distanza sulla matrice LED con blocchi unisci. Upload, controlli e risoluzione problemi."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Come leggo la distanza del sensore a ultrasuoni del mBot in mBlock?"
    answer: "Crea una variabile, collega l'mBot, attiva la modalità Live, in un ciclo infinito assegna alla variabile la lettura del blocco ultrasuoni. Il valore appare in centimetri vicino allo sprite."
  - question: "Perché la matrice LED non accetta direttamente il numero?"
    answer: "Il sensore restituisce un numero; il blocco scorrimento testo vuole una stringa. Unisci distanza e unità, ad esempio unisci(distanza, \" cm\")."
  - question: "Modalità Live o Upload per questa attività?"
    answer: "Live mostra la variabile sul PC. Per la distanza senza cavo USB costruisci il programma a blocchi e carica in Upload."
  - question: "La misura resta a 0 o salta — cosa controllare?"
    answer: "Ostacolo tra circa 3 e 400 cm, superficie piana, USB o upload, blocchi mBot installati."
---

Alcuni link di questa pagina sono link di affiliazione (Amazon.it). Su acquisti idonei possiamo ricevere una commissione, senza costi aggiuntivi per te.

> **Risposta diretta (ottobre 2026)** — In **mBlock 5** (software a blocchi Makeblock, simile a **Scratch**), leggi il **sensore a ultrasuoni** dell'mBot in una **variabile** in **Live** (tempo reale con il PC, senza caricare a ogni clic), poi mostra la stessa distanza sulla **matrice LED** convertendo il **numero** in testo (**unisci** + `" cm"`) e **caricando** il programma sul robot.

Questa attività in **due tempi** guida a:

1. **Leggere la distanza** del **sensore a ultrasuoni** dell'<a href="/go/az-it-2b788b17eb/" rel="sponsored nofollow noopener" class="affiliate-link">mBot Makeblock</a> e vederla **sul computer** (variabile + **Live**);
2. **Visualizzare la distanza sulla matrice LED** **senza cavo** (programma **integrato sul robot**), gestendo **numero → testo**.

Le etichette dei blocchi possono variare; la **sequenza logica** resta la stessa.

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="mBot Makeblock visto di fronte: sensore a ultrasuoni e matrice LED sulla scheda mCore." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Sull'mBot classico il sensore a ultrasuoni è in genere davanti; la matrice LED mostra messaggi o valori. Foto: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

<aside class="article-callout" role="note">
<p><strong>mBot classico o mBot2?</strong></p>
<p>Questo tutorial riguarda l'<strong>mBot con scheda mCore</strong> e il modulo ultrasuoni RJ25 più comune. L'<strong>mBot2</strong> usa blocchi mBuild; i concetti (variabile, Live, unisci, matrice) restano simili. Prima dell'acquisto: <a href="/it/mbot-vs-mbot2/">confronto mBot vs mBot2</a>.</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Live e Upload — due modalità</strong></p>
<ol>
<li><strong>Live</strong>: lo script dialoga con il robot <strong>in tempo reale</strong> dal PC — ideale per vedere la variabile distanza sullo schermo.</li>
<li><strong>Upload</strong> (caricamento): il programma è <strong>salvato sulla scheda</strong> dell'mBot; senza cavo USB la matrice LED può mostrare la distanza da sola.</li>
<li>Prima testa in Live, poi adatta per <strong>quando mBot inizia</strong> in Upload (vedi <a href="/it/primi-passi-mblock-5/">primi passi mBlock</a>).</li>
</ol>
</aside>

| Criterio | Dettaglio |
| --- | --- |
| **Difficoltà** | Principiante (variabili, sensore); parte C opzionale: intermedio |
| **Durata** | Circa 45–75 minuti |
| **Materiale** | mBot carico, PC, cavo USB (Bluetooth opzionale) |
| **Software** | <a href="/it/installare-mblock-5-windows/">mBlock 5</a>, <a href="/it/installare-blocchi-mbot/">blocchi mBot</a> |
| **Risultato** | cm sul PC, poi circa **`42 cm`** sulla matrice |

<aside class="article-callout" role="note">
<p><strong>In classe</strong></p>
<p>In una lezione: <strong>misura reale</strong>, feedback su mBlock, poi lo stesso principio con un <strong>programma autonomo sul robot</strong> — sensore, variabile, tipi di dati, programma senza PC.</p>
</aside>

> **Video** — dimostrazione (audio in francese): [YouTube](https://www.youtube.com/watch?v=1smaSvnB7Aw). Attiva i **sottotitoli automatici** in italiano se disponibili.

## Materiale e software

- [mBot panoramica](/it/mbot-il-mio-primo-robot-educativo/) · [Installare mBlock 5](/it/installare-mblock-5-windows/) · [Primi passi](/it/primi-passi-mblock-5/) · [Blocchi mBot](/it/installare-blocchi-mbot/) · [mBlock vs Scratch](/it/mblock-vs-scratch/)

## 1. Prerequisiti

- [Robot educativo mBot](/it/mbot-il-mio-primo-robot-educativo/).
- [mBlock 5](/it/installare-mblock-5-windows/) e [interfaccia](/it/primi-passi-mblock-5/).
- [Blocchi mBot](/it/installare-blocchi-mbot/).
- Sapere [caricare un primo programma](/it/primo-programma-mbot/) (**Upload**).
- [Far scorrere un testo](/it/attivita-mbot-far-scorrere-testo/) sulla matrice (stessa logica per una **stringa**).

## 2. Il sensore a ultrasuoni

Misura la **distanza** con onde sonore e tempo di ritorno dopo la riflessione. Sul mBot classico è **davanti**; punta il robot verso l'ostacolo.

- **Intervallo usuale**: spesso **circa 3–400 cm** — troppo vicino o lontano, lettura **poco affidabile**.
- **Usi**: evitamento ostacoli, [rilevatore intrusione](/it/attivita-mbot-rilevatore-intrusione/), gioco « stop » a distanza fissa, ecc.

Il valore del blocco è in **centimetri (cm)** — verifica l'unità in mBlock.

## 3. Prima parte: distanza sullo schermo (Live)

**Obiettivo**: **variabile** aggiornata in ciclo, visibile **vicino allo sprite**.

1. Crea **variabile** con visualizzazione sulla scena.
2. Collega mBot (USB o **Bluetooth** — senza fili; vedi [Bluetooth mBlock](/it/mblock-bluetooth-problemi/) se si disconnette) e modalità **Live** — **tempo reale**, senza caricare tutto a ogni clic.
3. Ciclo **ripeti all'infinito** → lettura ultrasuoni → variabile (blocco « distanza / ultrasuoni » in **mBot** o **Sensori**).
4. Breve **aspetta** (decine di ms) stabilizza la lettura.

Avviando lo script (bandiera verde o pulsante Live), la variabile si aggiorna in **cm** finché l'ostacolo resta nel range valido.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="Screenshot mBlock: ciclo con sensore ultrasuoni e variabile." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Esempio: ciclo → sensore → variabile. Screenshot mBlock 5 — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

Progetto esempio: [distance_sans_affichage.mblock](/capture/capteur/distance_sans_affichage.mblock).

**Controllo:** foglio a **40 cm** — valore vicino a **40**. A **42** pronuncia « quarantadue centimetri » — stessa stringa sulla matrice.

## 4. Seconda parte: distanza sulla matrice LED

**Obiettivo**: robot **solo** con distanza sulla **matrice LED**, con **scorrimento** se serve — come [far scorrere un testo](/it/attivita-mbot-far-scorrere-testo/).

<figure class="article-figure">
  <img src="/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp" alt="Foto: parola sulla matrice LED dell'mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Stessa matrice del testo scorrevole — mostrerai « 42 cm ». Foto: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

### 4.1 Numero vs testo

Il blocco **scorrimento testo** vuole una **stringa** (testo), es. `"42 cm"`. Il sensore restituisce un **numero**. In Scratch / mBlock serve **unire** testo.

### 4.2 Approccio A — Solo blocchi (consigliato)

Resta nella **palette blocchi** — tab **Arduino** non obbligatoria.

1. Leggi distanza in variabile.
2. **Unisci** / combina: `unisci(distanza, " cm")`.
3. Stesso blocco **scorrimento** dell'articolo testo.
4. **Upload** — cavo staccato, display attivo; evento **quando mBot inizia** se proposto.

**Criterio di successo:** ~**42 cm** dal muro → **`42 cm`** sulla matrice.

- **Vantaggio**: tutto in **blocchi** per gli studenti.
- **Svantaggio**: due procedure se mescoli testo libero e distanza — nominali (`scorri_distanza`, `scorri_messaggio`).

Salva `distanza_matrice.mblock` prima dell'approccio B.

### 4.3 Approccio B — Codice Arduino / C (opzionale)

Dopo l'approccio A. mBlock **genera** codice; modifica **Arduino C** (tab **Codice** / `</>`).

**Passi tipici**:

1. Programma **a blocchi** (ciclo, sensore, scroll).
2. Vista **codice**, **copia tutto**.
3. Tab **Arduino**, **incolla**, adatta la chiamata scroll — **numero + unità** in **stringa**.

```cpp
scorri_testo_N_N(String(distanza) + String(" cm"), 1);
```

**Sicurezza**: backup `.mblock`, ricarica, cavo e pile.

## 5. Estensioni

- Filtrare valori anomali; [rilevatore intrusione](/it/attivita-mbot-rilevatore-intrusione/).
- [Serie ultrasuoni ep. 1 (pagina FR, stessa logica)](/serie-capteur-ultrason-mbot-1-mesurer-distance/), [progetti in un'ora](/it/progetti-mbot-un-ora/) o [LED lampeggianti](/it/attivita-mbot-far-lampeggiare-led/).

## 6. Controlli e risoluzione problemi

| Problema | Causa frequente | Cosa fare |
|----------|-----------------|-----------|
| Variabile ferma | Live disattivato o mBot scollegato | USB, **mBot**, riavvia Live |
| **0** o valore assurdo | Fuori intervallo 3–400 cm | Superficie piatta 10–200 cm |
| Bluetooth instabile | Portata / pile | USB in classe; [Bluetooth mBlock](/it/mblock-bluetooth-problemi/) |
| Matrice vuota senza cavo | Non caricato | **Upload**; **quando mBot inizia** |
| Blocchi assenti | Libreria mBot off | [Installare blocchi](/it/installare-blocchi-mbot/) |
| Errore tipo | Numero invece di stringa | **Unisci** + `" cm"` |
| Valore che salta | Superficie inclinata / mano nel fascio | Superficie piana; mani lontane |

## FAQ

### Come leggo la distanza?

Variabile + ciclo + ultrasuoni in **Live** con variabile sulla scena.

### Perché `" cm"`?

Lo scroll vuole **testo**; il sensore invia un **numero**.

### Live o Upload?

**Live** al PC; **Upload** senza cavo.

## 7. Andare oltre

[Rilevatore intrusione](/it/attivita-mbot-rilevatore-intrusione/), [LED](/it/attivita-mbot-far-lampeggiare-led/), [primo programma](/it/primo-programma-mbot/), guide **mBlock** in sidebar.

**Classe**: [10 progetti mBot gratis](/it/10-progetti-mbot-gratis-classe/).

Hardware: <a href="/go/az-it-2b788b17eb/" rel="sponsored nofollow noopener" class="affiliate-link">mBot su Amazon.it</a> — verifica il prezzo del giorno.

*Partner Amazon — commissione possibile, senza costi aggiuntivi.*

*Emmanuel Sauvage — aggiornamento 31 ottobre 2026.*
