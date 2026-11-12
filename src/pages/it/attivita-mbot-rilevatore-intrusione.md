---
layout: ../../layouts/ItPost.astro
title: "Attività mBot: rilevatore di intrusione"
description: "Rilevatore di intrusione con mBot: l’ultrasonico sorveglia una soglia; LED e buzzer allertano. Variabili e condizioni."
updated: "30 ottobre 2026"
---

Alcuni link di questa pagina sono di affiliazione. Se acquisti tramite questi link possiamo ricevere una commissione senza costi aggiuntivi per te.

Trasformi il tuo **mBot** in un piccolo «guardiano»:

- **Sorveglia** ciò che ha davanti (con il **sensore ultrasonico**).
- Se qualcosa si muove ed «entra» nella zona, attiva un **allarme**:
  - LED **rossi**
  - una faccia «scontenta» sulla **matrice LED**
  - un **bip**
- Nella versione migliorata, **conta** anche il numero di intrusioni.

> **In classe / a casa:** abbassa il volume del buzzer o usa **solo i LED** se l’aula è silenziosa o se ci sono persone sensibili al rumore.

## 1. Prerequisiti

Prima di iniziare, assicurati di avere:

- Un [robot educativo mBot (Makeblock)](/it/mbot-il-mio-primo-robot-educativo/).
- [mBlock 5 installato](/it/installare-mblock-5-windows/).
- Una prima presa di confidenza con l’[interfaccia mBlock 5](/it/primi-passi-mblock-5/) (dove sono i blocchi, l’area script, la scheda Dispositivo).
- I [blocchi di istruzione del mBot](/it/installare-blocchi-mbot/) (i blocchi **arancioni**).

**Consiglio**: per evitare problemi di connessione, inizia se possibile in **USB** (il Bluetooth funziona, ma può essere più capriccioso).

## 2. Sensore ultrasonico

Il **sensore ultrasonico** serve a misurare una **distanza**.

### Come funziona (versione semplice)

Il sensore fa come un pipistrello:

- **Invia** un piccolo «ping» (un ultrasuono, inudibile).
- **Ascolta** l’eco che torna dopo aver rimbalzato su un ostacolo.
- Calcola la distanza con il **tempo** tra «ping» ed «eco».

```text
mBot (sensore)                         ostacolo
  ping  ───────────────────────────────►
        ◄──────────────────────────────  eco
```

<details>
<summary><strong>Per chi vuole approfondire</strong> — fisica del suono e formula della distanza</summary>

Il suono viaggia nell’aria a una velocità finita: in pratica si usa spesso **circa 340 m/s** (in realtà piuttosto **~343 m/s a 20 °C**; il valore esatto dipende un po’ da **temperatura** e **umidità**).

Alla scala dell’Universo, 340 m/s è **enorme** per un essere umano (come un aereo di linea). Alla scala di un **piccolo robot** a poche decine di centimetri da un ostacolo, è invece **abbastanza lento** — e per fortuna:

- la **luce** va quasi a **300 000 km al secondo**: per misurare una distanza «soggiorno / aula», un sensore luminoso (laser, infrarosso molto rapido) vedrebbe un ritardo quasi nullo;
- l’**onda sonora**, invece, impiega un **tempo misurabile** per l’**andata e ritorno**. È questo ritardo (qualche **microsecondo** o millisecondo) che la scheda del sensore misura con un cronometro elettronico.

**Formula (andata e ritorno).** Se `t` è il tempo tra l’emissione del ping e il ritorno dell’eco, la distanza `d` fino all’ostacolo è:

`d = (v_suono × t) / 2`

Il **÷2** viene dal fatto che `t` conta il **tragitto andata + ritorno**: l’onda percorre **due volte** la distanza `d`.

**Esempio d’ordine di grandezza.** Per un ostacolo a **34 cm** (0,34 m), l’andata e ritorno rappresenta **0,68 m**; con `v_suono ≈ 340 m/s`, il ritardo è dell’ordine di `0,68 / 340 ≈ 0,002 s`, cioè **2 ms**. È breve per noi, ma **ampiamente sufficiente** per un chip elettronico — da cui la precisione «a pochi centimetri» dei sensori ultrasonici comuni.

</details>

### Consigli pratici (per misure stabili)

- Il sensore in genere funziona bene tra **~3 cm e ~400 cm**.
- Per testare, usa un ostacolo **piatto** (libro, scatola), ben di fronte.
- Se l’ostacolo è **morbido** (tenda) o **inclinato**, la misura può «saltare».

In questa attività non cerchiamo una misura perfetta al millimetro: vogliamo soprattutto rilevare un **cambiamento** (qualcosa è apparso / si è mosso).



| Ruolo | Nome tipico nel codice | Nome consigliato IT | Nota |
|-------|------------------------|---------------------|------|
| Soglia di riposo | `reference` | `riferimento` | Distanza «normale» all’avvio |
| Misura corrente | `mesure` / `measure` | `misura` | Distanza letta adesso |
| Contatore | `intrusions` | `n_intrusioni` | Nome principale da usare ovunque |
| Parametro didattico | `nbr_intrusion` | (stesso contatore) | Alias solo nel blocco «Stato standby» — vedi §3.3 |

## 3. Programma di rilevamento intrusione

### 3.1 Programma di base

**Scopo**: il robot memorizza una distanza di «riferimento» all’avvio, poi confronta in loop.  
Se cambia molto, grida «intrusione!».

#### L’idea

1. Posiziona il mBot in modo che guardi la zona da sorvegliare.
2. Attende 3 secondi (il tempo di posarlo).
3. Misura una prima distanza: è il **riferimento**.
4. Poi misura in loop:
   - se è quasi uguale → resta calmo
   - se è molto diverso → attiva l’allarme

### Illustrazioni (screenshot)

![Immagine del robot mBot in attesa di rilevamento](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-attente-detection.png)

![Immagine del robot mBot che rileva un’intrusione](/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png)

![Immagine del programma di rilevamento di base](/capture/activite-mbot-detecteur-dintrusion/programme-detection-basique.png)

#### Perché aspettare 3 secondi all’inizio?

Per darti il tempo di:

- accendere il robot,
- posarlo bene di fronte alla zona,
- non muovere le mani davanti al sensore mentre prende il riferimento.

#### Le variabili (parole semplici)

- `reference`: la distanza «normale» all’inizio.
- `mesure`: la distanza misurata adesso.

### 3.1 bis Redazione del programma (mBlock 5) — versione molto guidata

**Da creare in Variabili**:

| Variabile (codice) | Nome IT consigliato | A cosa serve |
|---|---|---|
| `reference` | `riferimento` | Distanza di partenza (cm) |
| `mesure` | `misura` | Distanza attuale (cm) |
| `intrusions` | `intrusioni` | Contatore (versione 3.2); alias didattico `nbr_intrusion` = stesso valore passato a un blocco |

**Programma di base (rilevamento semplice)**:

1. **Quando si clicca la bandiera verde** *(o «quando il mBot si avvia» se carichi)*  
2. **Attendere 3 secondi**  
3. **Impostare `reference` a** la `distanza ultrasonica (cm)`  
4. **Per sempre**:
   - impostare `mesure` alla `distanza ultrasonica (cm)`
   - **se** `mesure` è molto diversa da `reference` **allora**:
     - LED **rossi**
     - faccia «arrabbiata»
     - suonare una nota (bip) **0,25 pulsazione**
   - **altrimenti**:
     - LED **verdi**
     - faccia «calma»

#### Il trucco che cambia tutto (molto importante)

Il sensore può variare un po’ anche se nessuno passa.  
Quindi invece di «≠», usa una **soglia**, ad esempio **3 cm**:

```text
se |mesure - reference| > 3 allora intrusione
```

Così un piccolo «tremolio» di misura non fa scattare l’allarme.

> Se non hai il blocco «valore assoluto», puoi fare un test più semplice:  
> «intrusione se `mesure > reference + 3` O `mesure < reference - 3`».

## 3.2 Aggiunta di funzionalità

Il programma di base funziona, ma manca una cosa:  
**quante volte** è passato qualcuno?

Quindi:

- creare (o usare) la variabile `intrusions`,
- incrementarla a ogni intrusione,
- mostrare il numero sulla matrice LED (o farlo scorrere).

![Immagine del programma con contatore intrusioni](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion.png)

#### Da aggiungere nei blocchi (versione semplice)

- All’inizio: **impostare `intrusions` a 0**
- Nel ramo «intrusione»:
  - **aggiungere 1 a `intrusions`**
  - mostrare `intrusions` sulla matrice LED

> Suggerimento: per evitare di contare 20 volte la stessa intrusione (quando qualcuno resta davanti), aggiungi `attendere 1 secondo` dopo l’allarme.

### 3.3 Refactoring

Quando lo script cresce, diventa difficile da leggere.

Quindi organizziamo le azioni in «piccole funzioni» (in mBlock: **I miei blocchi**).

**Scopo**: che il programma principale resti corto e chiaro.

![Immagine del programma con contatore e sottoprogrammi](/capture/activite-mbot-detecteur-dintrusion/programme-detection-compteur-intrusion-sous-programme.png)

#### Idea di suddivisione (molto semplice)

- **Blocco personalizzato «Stato standby»**:
  - LED verdi
  - faccia calma
  - *(opzione didattica)* un parametro `nbr_intrusion` per mostrare il contatore anche in standby — vedi riquadro sotto
- **Blocco personalizzato «Allarme intrusione»**:
  - LED rossi
  - faccia arrabbiata
  - bip
  - `intrusions = intrusions + 1`
  - mostrare il contatore

Poi, nel loop, fai solo:

- se intrusione → chiamare **Allarme intrusione**
- altrimenti → chiamare **Stato standby**

#### Perché ho aggiunto `nbr_intrusion` al blocco «Stato standby»? (didattica)

Per l’insegnamento, ho volutamente dato al blocco personalizzato **«Stato standby»** un **parametro** del tipo `nbr_intrusion`, anche se **non era strettamente necessario**.

In mBlock / Scratch, la variabile `intrusions` è in genere una variabile **globale**: una volta creata nella scheda *Variabili*, **tutto il programma** (compreso l’interno di un blocco personalizzato) può **leggerla** e **modificarla** senza doverla «passare come argomento».

**Cos’è lo *scope* di una variabile?**

In informatica, lo **scope** (o portata) è **il posto del programma in cui una variabile esiste ed è visibile**.

- **Variabile globale**: conosciuta **dappertutto** nel progetto (script principale, blocchi personalizzati, ecc.). Spesso è il caso di `intrusions`.
- **Variabile locale**: visibile **solo** in un piccolo pezzo di codice (ad esempio **dentro** una funzione, o un parametro che esiste solo per quel blocco). Quando la funzione termina, quella variabile spesso «scompare» dal punto di vista del programma.

Quindi, per **Stato standby**, si *potrebbe* usare direttamente `intrusions` dentro il blocco: il contatore sarebbe comunque corretto, grazie allo scope **globale**.

**Allora perché aggiungere `nbr_intrusion` lo stesso?**

- Per mostrare agli studenti l’idea di **funzione che riceve un’informazione** (come in matematica: \(f(x)\)), anche se qui l’informazione è già disponibile altrove.
- Per preparare linguaggi in cui si evita di contare troppo sulle variabili globali: si **passano esplicitamente** i valori di cui il blocco ha bisogno, il che rende il programma più leggibile.

Quando mBlock **genera** il programma in **C** (Arduino), si vede spesso sotto forma di **funzioni** con **parametri**. Lo screenshot sotto illustra questa idea di scope e il modo in cui il blocco personalizzato riceve `nbr_intrusion`:

![Estratto di codice C: scope della variabile intrusions e parametro nbr_intrusion](/capture/activite-mbot-detecteur-dintrusion/code-c-portee-variable.png)

## 3.4 Ottimizzazione della visualizzazione

Ultimo piccolo dettaglio: a volte il contatore si mostra con **virgole** (es. `3.00`).  
Per un contatore di intrusioni vogliamo un **numero intero**: `1`, `2`, `3`…

### Opzione 1 (consigliata per i più giovani): restare nei blocchi

In molte versioni di mBlock, se usi «aggiungere 1 a `intrusions`» e lo mostri così com’è, già si visualizza bene.

### Opzione 2 (avanzata): passaggio dal codice Arduino (se serve)

Se da te appare in decimale, puoi correggere lato codice.

1. Cliccare sul simbolo </>  
2. Copiare il codice sorgente visualizzato (CTRL + A poi CTRL + C)  
3. Premere la scheda Arduino C  
4. Incollare il codice  
5. Modificare il tipo della variabile `intrusions` da `float` a `int`

> Da fare con un adulto / un insegnante se sei giovane: si tocca il codice «testo».

### 3.5 Programmi mBlock

Puoi scaricare i programmi mBlock dell’attività:

- Programma di base: [`programme_detection_basique.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_basique.mblock)
- Versione contatore: [`programme_detection_compteur intrusion.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur%20intrusion.mblock)
- Versione «sottoprogrammi»: [`programme_detection_compteur_intrusion_sous_programme.mblock`](/capture/activite-mbot-detecteur-dintrusion/programme_detection_compteur_intrusion_sous_programme.mblock)

Se preferisci ricostruirlo a mano, puoi anche seguire:

- la sezione **3.1 bis** (programma di base),
- poi le aggiunte delle sezioni **3.2** e **3.3**,
- aiutandoti con gli screenshot.

Vedi anche: [Programmi mBlock](/programmes/) (indice francese).

## 4. Imparare lo sviluppo

Se vuoi progredire, ecco una progressione «facile»:

- rifare questa attività cambiando un solo parametro (soglia 3 cm → 5 cm),
- aggiungere un LED «arancione» quando l’ostacolo è «in mezzo»,
- poi passare ad altre attività mBot del sito (sensori, motori, piccole sfide).

E se vuoi andare oltre in programmazione, Scratch/mBlock sono una porta d’ingresso ottima: la cosa più importante è capire **variabili + condizioni + loop**.

**Per la classe**: i nostri [10 progetti mBot gratis](/it/10-progetti-mbot-gratis-classe/) propongono una progressione completa in 10 sessioni, con schede alunni e soluzioni in PDF.

[mBot — Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)

