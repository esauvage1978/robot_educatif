---
layout: ../../layouts/ItPost.astro
title: "Forza 4 in Python (1/6) — griglia 6×7 e modello dati"
description: "Griglia 6×7 come lista di liste, costanti VIDE/J1/J2, grille_pleine — puissance4_chapitre_01.py scaricabile, serie Forza 4, ottobre 2026."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Perché una griglia 6×7 nel Forza 4?"
    answer: "È il tabellone classico: i gettoni cadono in una colonna fino alla cella libera più bassa. Sei righe e sette colonne sono lo standard."
  - question: "Cosa significano VIDE = 0, J1 = 1 e J2 = 2?"
    answer: "Costanti per cella vuota, giocatore 1 (poi X), giocatore 2 (O). I numeri semplificano la logica nella lista."
  - question: "Come verifico il capitolo 1?"
    answer: "Esegui python puissance4_chapitre_01.py: messaggio Grille 6 x 7 creee, ultima riga con un 1 all’indice 3 (tre gettoni nella stessa colonna), Grille pleine ? False, OK verso il capitolo 2."
---

Alcuni link sono affiliati. **Amazon.it** è il negozio predefinito. Controlla il prezzo del giorno — non inventiamo importi.

**In sintesi (ottobre 2026)** — Poni le **basi** del **Forza 4** in **Python 3**: **griglia 6×7** come **lista di liste**, **costanti** (`VIDE`, `J1`, `J2`) e **`grille_pleine`** per un futuro **pareggio**. Nessuna grafica ancora: lavori nel **terminale** (finestra testo con `python file.py`). Scarica **`puissance4_chapitre_01.py`**; poi [capitolo 2 — visualizzazione e gravità](/python-puissance-4-2-affichage-gravite/).

**Serie Forza 4 (6 parti)** — [Hub](/programmation/puissance-4/) · **1 — griglia (questa pagina)** · [2](/python-puissance-4-2-affichage-gravite/) · [3](/python-puissance-4-3-coup-alternance/) · [4](/python-puissance-4-4-quatre-alignes/) · [5](/python-puissance-4-5-match-nul/) · [6 — gioco completo](/it/python-forza-4-6-gioco-completo/)

| Voce | Dettaglio |
| --- | --- |
| **Obiettivo** | Costanti, `nouvelle_grille()`, `grille_pleine()` |
| **Livello** | Principiante (dopo liste e basi Python) |
| **Tempo** | 30–45 min |
| **Materiale** | PC con **Python 3** |
| **Prerequisiti** | [Percorso Python](/programmation/python/), [liste e stringhe](/python-listes-et-chaines/), [if/else](/it/python-condizioni-if-else/) |
| **Risultato** | Script che crea griglia, demo colonna, « non piena » |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch1-terminal-output.webp" alt="Terminale: output di puissance4_chapitre_01.py, griglia creata, riga inferiore con valori 1." width="920" height="520" loading="eager" decoding="async" />
  <figcaption>Output ricostruito dallo script del capitolo 1 (messaggi in francese nel file). Credit: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

## Il gioco che stai programmando

**Forza 4** (Connect Four / **Puissance 4**): gettoni in **colonne**, **gravità**, **quattro in fila** per vincere; tabellone pieno senza vincitore = **pareggio**.

Questo capitolo prepara solo la **struttura dati** (i capitoli 2–6 la estendono). Dal [mini-gioco terminale](/it/python-mini-gioco-terminale/) conosci già la console; qui aggiungi una **griglia 2D**.

## Avviare il terminale

Windows: PowerShell, eventualmente `py`. Mac/Linux: `python3`. **VS Code** / **Thonny**: terminale integrato.

## 1. Dimensioni e simboli

| Costante | Valore | Ruolo |
| --- | --- | --- |
| `LIGNES` | 6 | righe |
| `COLONNES` | 7 | colonne |
| `VIDE` | 0 | vuoto |
| `J1` / `J2` | 1 / 2 | giocatore 1 (X) / 2 (O) |

Riga **0** = **alto**, **5** = **basso**. Colonna **0** a sinistra. Demo: `col_demo = 3`.

## 2. `nouvelle_grille()`

```python
def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]
```

Ripassa [liste e stringhe](/python-listes-et-chaines/) e [cicli](/python-boucles-for-while/) se serve.

## 3. `grille_pleine()`

```python
def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))
```

Usata al [capitolo 5](/python-puissance-4-5-match-nul/).

## 4. Script completo

Uguale a **[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)** (nomi funzione in francese per tutta la serie).

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
VIDE, J1, J2 = 0, 1, 2
LIGNES, COLONNES = 6, 7

def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]

def grille_pleine(grille):
    return all(grille[0][c] != VIDE for c in range(COLONNES))

if __name__ == "__main__":
    g = nouvelle_grille()
    print("Grille", LIGNES, "x", COLONNES, "creee.")
    assert len(g) == LIGNES and len(g[0]) == COLONNES
    col_demo = 3
    for _ in range(3):
        for ligne in range(LIGNES - 1, -1, -1):
            if g[ligne][col_demo] == VIDE:
                g[ligne][col_demo] = J1
                break
    print("Derniere ligne (bas de la grille) :", g[-1])
    print("Grille pleine ?", grille_pleine(g))
    print("OK — passe au chapitre 2 pour l'affichage et jouer_colonne.")
```

## 5. Eseguire e verificare

Nessun traceback; messaggi come nello screenshot.

## 6. Risoluzione problemi

| Sintomo | Causa | Azione |
| --- | --- | --- |
| `python` non trovato | PATH | Reinstalla Python 3 o usa `py` |
| `IndentationError` | tab | 4 spazi per blocco |
| Riga bassa tutta zero | demo assente | controlla il doppio `for` |
| `grille_pleine` True su griglia nuova | test invertito | la riga alta deve avere ancora `0` |

## 7. Esercizi

1. `len(g)` e `len(g[0])` → **6** e **7**.  
2. `grille_pleine(nouvelle_grille())` → **False**.  
3. Due `J2` in colonna 0 dal basso → `g[5][0]` e `g[4][0]` valgono **2**.

Altre serie: [impiccato](/programmation/pendu/), [battaglia navale](/programmation/bataille-navale/), [capitolo 6](/it/python-forza-4-6-gioco-completo/).

## Download

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Prossimo passo

[Capitolo 2 — visualizzazione e gravità](/python-puissance-4-2-affichage-gravite/)

## Amazon (partner)

- <a href="/go/az-it-544bd1b424" rel="sponsored nofollow noopener" class="affiliate-link">Libri su progetti e giochi Python su Amazon.it</a>

*Emmanuel Sauvage — aggiornamento 31 ottobre 2026.*
