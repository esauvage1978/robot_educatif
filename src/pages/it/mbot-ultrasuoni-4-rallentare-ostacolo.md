---
layout: ../../layouts/ItPost.astro
title: "mBot ultrasuoni (4/4): rallentare davanti ostacolo"
description: "Tutorial mBlock 4/4: il mBot avanza, rallenta e si ferma davanti a un ostacolo piatto — soglie in cm, velocità motori, upload USB e risoluzione problemi."
updated: "31 ottobre 2026"
faqSchema:
  - question: "Serve codice Arduino o blocchi mBlock?"
    answer: "Solo blocchi mBlock / mBot. Impilate eventi, sensore a ultrasuoni, condizioni e motori. Nessuno sketch Arduino necessario."
  - question: "Cosa misura il sensore a ultrasuoni del mBot?"
    answer: "La distanza in centimetri fino a un ostacolo davanti al robot. Il programma trasforma il valore in velocità dei motori usando le soglie scelte."
  - question: "Il mBot2 è adatto a questo tutorial?"
    answer: "Sì, con blocchi mBot attivi e sensore ultrasonico anteriore collegato. Le soglie in cm sono punti di partenza da adattare al vostro pavimento."
---

Alcuni link di questa pagina sono di affiliazione. Se acquisti tramite questi link possiamo ricevere una commissione senza costi aggiuntivi per te.

> **Risposta diretta (ottobre 2026)** — In **mBlock 5** (software a blocchi Makeblock, simile a **Scratch**) leggete la **distanza ultrasonica** in **cm** (centimetri), calcolate una **velocità** tra due soglie (es. stop a 15 cm, massima oltre 50 cm) e impostate **motore sinistro e destro** alla stessa velocità. Caricate via **USB** (cavo dati PC ↔ scheda), ostacolo **piatto** (libro): il robot **rallenta** poi **si ferma** senza urtare. Non serve codice **Arduino**.

Chiudete la serie sul **sensore a ultrasuoni** del [mBot Makeblock](/it/mbot-il-mio-primo-robot-educativo/) — il modulo anteriore che misura in centimetri. Obiettivo: **avanzare**, **rallentare**, **fermarsi**. Tutto in **mBlock** con i **blocchi mBot**.

<aside class="article-callout" role="note">
<p><strong>Obiettivo didattico</strong></p>
<p>Comportamento robotico completo in <strong>blocchi mBlock</strong>: la misura (distanza) comanda la velocità, con <strong>soglie</strong> e progressione morbida (rallentare → stop).</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Prerequisiti</strong></p>
<ul>
<li>Leggere il sensore: <a href="/it/attivita-mbot-misurare-distanze/">misurare distanze</a> e <a href="/it/attivita-mbot-rilevatore-intrusione/">rilevatore di intrusione</a> (passi completi in italiano).</li>
<li>Approfondimento opzionale (pagine in francese, stessa logica): <a href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">ep. 1 — misura</a>, <a href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">ep. 2 — gradini</a>, <a href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">ep. 3 — radar a bip</a>.</li>
<li><a href="/it/installare-mblock-5-windows/">mBlock 5</a>, <a href="/it/installare-blocchi-mbot/">blocchi mBot</a>, batterie cariche, ostacolo piatto.</li>
<li><a href="/it/primo-programma-mbot/">Caricare un programma</a> sulla scheda (modalità Upload).</li>
</ul>
<p>Tutorial pensato per il <strong>mBot classico</strong> (mCore). Anche il <strong>mBot2</strong> va bene con sensore ultrasonico riconosciuto.</p>
</aside>

| Criterio | Dettaglio |
|---|---|
| **Livello** | Intermedio (loop, condizioni, formula semplice) |
| **Tempo** | 45–75 minuti circa |
| **Materiale** | mBot con ultrasonico anteriore, PC, USB, ostacolo piatto |
| **Software** | mBlock 5, Dispositivo → mBot, Upload |
| **Esito** | Veloce oltre ~50 cm, rallentamento tra 50 e 15 cm, stop a ~15 cm |

## Consegna

Programmate il robot affinché:

1. **Avanzi dritto**
2. **Suoni / bip** in marcia
3. **Rallenti** con ostacolo davanti
4. **Si fermi** se troppo vicino

Progressione **morbida** — velocità calcolata dalla distanza.

---

## 1) Distanze di riferimento

- `DIST_STOP = 15` cm · `DIST_RALLENTA = 50` cm

### Zone di velocità

| Distanza davanti al sensore | Comportamento |
|----------------------------|---------------|
| **≥ 50 cm** | Velocità normale (es. 80 %) |
| **15–50 cm** | Rallentamento progressivo |
| **≤ 15 cm** | Stop |

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="mBot Makeblock di fronte a un ostacolo piatto; il sensore a ultrasuoni misura la distanza in centimetri." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Test con ostacolo piatto: puntare il sensore perpendicolarmente. Foto: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

---

## 2) Costruire la logica

Variabili: `distance_cm`, `velocita` (0–100).

### 2.1 Aggiornare la distanza

Come in <a href="/it/attivita-mbot-misurare-distanze/">misurare distanze</a>: sensore in loop **per sempre**, breve attesa.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="Screenshot mBlock: loop che legge il sensore ultrasonico del mBot in una variabile distanza." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>mBlock: salvare la distanza in una variabile. Screenshot: Emmanuel Sauvage, Robot Éducatif — ottobre 2026. I nomi dei blocchi dipendono dalla lingua di mBlock.</figcaption>
</figure>

### 2.2 Velocità che scende avvicinandosi

- `VELOCITA_MAX = 80`, `VELOCITA_MIN = 30`
- regole: `>= 50` → 80 ; `<= 15` → 0 ; tra i due, formula o **gradini**

**In primaria — 3–4 gradini (consigliato):**

| Distanza | Velocità |
|----------|----------|
| ≥ 50 cm | 80 |
| 30–49 cm | 55 |
| 16–29 cm | 30 |
| ≤ 15 cm | 0 |

**Opzione avanzata — formula lineare** tra 15 e 50 cm:

`velocita = VELOCITA_MIN + (distance_cm - 15) × (VELOCITA_MAX - VELOCITA_MIN) / 35`

In classe, restate sui **gradini** finché « se… allora » è chiaro — come in [ep. 2 (francese)](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/).

---

## 3) Motori in linea retta

Stessa velocità sinistra/destra.

Pseudo-logica:

```text
all'avvio
  per sempre
    imposta distance_cm a (distanza ultrasonica)

    se distance_cm <= 15
      imposta velocita a 0
      ferma motori
      nota bassa / bip lungo
      attendi 0,1 s
    altrimenti
      se distance_cm >= 50 → velocita 80
      altrimenti → formula o gradini

      avanti (sinistra = velocita, destra = velocita)
      bip corto
      attendi 0,5 s
```

### 3.1 Suoni

- bip ogni 0,5 s in marcia normale ;
- bip più rapidi in rallentamento (opzionale, [ep. 3 (francese)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)) ;
- suono diverso allo stop.

---

## 4) Test

USB, poi upload. Libro piatto. Se « trema »: `DIST_STOP` 18 cm, `attendi 0,05 s`, `VELOCITA_MIN` 30–40.

**Successo:** ~40 cm veloce, ~25 cm più lento, ~15 cm stop senza urto.

---

## 5) Elenco blocchi

Evento mBot · per sempre · variabili · distanza ultrasonica cm · se/altrimenti · operatori · motori · suono · attendi.

Aiuto: [Primi passi mBlock 5](/it/primi-passi-mblock-5/) · [Bluetooth mBlock](/it/mblock-bluetooth-problemi/).

---

## Risoluzione problemi

| Sintomo | Causa probabile | Cosa fare |
|---------|-----------------|-----------|
| Distanza **0** o **400+** | Ostacolo mal posizionato o superficie inclinata | Obiettivo piatto a 20–80 cm |
| Nessun rallentamento | Velocità non su entrambi i motori | Controllare sinistra e destra |
| **Scatti** | Soglia stop troppo bassa | `DIST_STOP` → 18 cm, pausa dopo sensore |
| Nessun suono | Blocco note assente | Testare un bip fuori dal loop |
| Robot non visto | USB o modalità Live | [Primo programma](/it/primo-programma-mbot/) |

Prima di comprare un sensore di ricambio, controllate la porta **RJ25** anteriore (connettore a colori Makeblock) — [accessori mBot](/it/accessori-mbot-da-dove-iniziare/).

---

## Per approfondire

- LED verde / arancione / rosso in base alla distanza.
- « Parcheggio assistito »: retromarcia lenta poi stop.
- [mBlock vs Scratch](/it/mblock-vs-scratch/) per scegliere il software a scuola.

---

## FAQ

### Arduino o mBlock?

**Solo blocchi mBlock** — nessuno sketch Arduino.

### Cosa misura il sensore?

**Distanza in cm** → **velocità motori** con le vostre soglie.

### mBot2?

Sì, con sensore ultrasonico funzionante. Regolate le soglie sul vostro pavimento.

---

## Materiale (indicazioni)

<a href="/go/az-it-2b788b17eb/" rel="sponsored nofollow noopener">mBot Makeblock su Amazon.it</a> — verificate il prezzo del giorno. Partner Amazon — commissione possibile senza costi extra.

---

## Serie

[← Ep. 3 radar a bip (francese)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) · [Misurare distanze](/it/attivita-mbot-misurare-distanze/) · [Primo programma](/it/primo-programma-mbot/) · [Installare blocchi](/it/installare-blocchi-mbot/)

*Emmanuel Sauvage — aggiornato il 31 ottobre 2026.*
