---
layout: ../../layouts/ItPost.astro
title: "Forza 4 in Python (6/6) — gioco completo e IA casuale"
description: "Menu due giocatori o umano vs IA casuale, download puissance4_chapitre_06.py, test da terminale e risoluzione problemi — serie Forza 4, ottobre 2026."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Come avvio il Forza 4 completo?"
    answer: "Scarica puissance4_chapitre_06.py, apri un terminale nella cartella, esegui python puissance4_chapitre_06.py e scegli 1 (due umani) o 2 (tu X vs IA O)."
  - question: "L’IA è forte?"
    answer: "No: sceglie una colonna legale a caso con random.choice. Base didattica; poi potrai bloccare allineamenti avversari."
  - question: "Servono i capitoli 1–5?"
    answer: "Sì per capire il codice. Il capitolo 6 riunisce tutte le funzioni; i capitoli 1–5 costruiscono griglia, gravità, vittoria e pareggio."
---

Alcuni link sono affiliati (**Amazon.it**). Verifica prezzo e disponibilità il giorno dell’acquisto.

**In sintesi (ottobre 2026)** — Ottieni **Forza 4** (quattro in fila su griglia **6×7**) nel **terminale** (finestra testo per `python …`): un **menu** propone **due umani** o **tu (X) vs IA (O)** con colonna **casuale ma legale**. Scarica **`puissance4_chapitre_06.py`**. Parti dal [capitolo 1 — griglia](/python-puissance-4-1-cahier-grille/). **Prerequisito:** [capitolo 5 — pareggio](/python-puissance-4-5-match-nul/).

**Serie Forza 4 (6 parti)** — [Hub](/programmation/puissance-4/) · [1](/python-puissance-4-1-cahier-grille/) · [2](/python-puissance-4-2-affichage-gravite/) · [3](/python-puissance-4-3-coup-alternance/) · [4](/python-puissance-4-4-quatre-alignes/) · [5](/python-puissance-4-5-match-nul/) · **6 (questa pagina)**

| Criterio | Dettaglio |
| --- | --- |
| **Obiettivo** | Menu, solo vs IA, uscita con `q` |
| **Livello** | Principiante (dopo parti 1–5) |
| **Tempo** | 30–60 min copiando; ~5 min solo download |
| **Materiale** | PC con **Python 3** |
| **Risultato** | Griglia, vittoria/pareggio, IA annuncia la colonna |

<figure class="article-figure">
  <img src="/images/lot10/puissance4-ch6-terminal-session.webp" alt="Terminale: menu, griglia ASCII X e O, mossa IA." width="920" height="696" loading="eager" decoding="async" />
  <figcaption>Sessione esempio dal script capitolo 6. Credit: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

**IA** (*intelligenza artificiale* qui: il computer gioca da solo) usa il modulo **`random`** di Python.

## 1. Loop a due giocatori

Vedi [capitolo 5](/python-puissance-4-5-match-nul/) e [puissance4_chapitre_05.py](/downloads/puissance4/puissance4_chapitre_05.py). Passi precedenti: [visualizzazione](/python-puissance-4-2-affichage-gravite/), [alternanza](/python-puissance-4-3-coup-alternance/), [quattro allineati](/python-puissance-4-4-quatre-alignes/).

## 2. IA casuale

```python
import random

def choix_ia(grille):
    jouables = [c for c in range(COLONNES) if colonne_jouable(grille, c)]
    return random.choice(jouables)
```

Tu **J1** (`X`), IA **J2** (`O`). Dopo ogni mossa IA viene stampata la colonna.

## 3. Avvio e verifica

```bash
python puissance4_chapitre_06.py
```

Prova modi **1** e **2**, **`q`** per uscire. Basi: [liste](/python-listes-et-chaines/), [cicli](/python-boucles-for-while/), [if/else](/python-conditions-if-else/). Altri giochi testo: [impiccato](/programmation/pendu/), [battaglia navale](/programmation/bataille-navale/), [corso Python](/programmation/python/).

## 4. Download

**[puissance4_chapitre_06.py](/downloads/puissance4/puissance4_chapitre_06.py)** — capitoli [1](/downloads/puissance4/puissance4_chapitre_01.py)–[5](/downloads/puissance4/puissance4_chapitre_05.py). Messaggi utente in francese nello script originale.

## 5. Risoluzione problemi

| Sintomo | Causa | Azione |
| --- | --- | --- |
| `python` non trovato | Fuori **PATH** | Reinstalla Python 3 con PATH o `py` su Windows |
| Colonna rifiutata | Colonna piena | Messaggio atteso |
| IA ferma | Modo 1 | Riavvia con `2` |
| `empty sequence` | Nessuna colonna libera | Controlla pareggio |
| Caratteri strani | Codifica | Riga UTF-8 nel file |

## 6. Estensioni

- Bloccare **tris** avversario.
- **Annulla** con pila.
- [Serie Todo](/programmation/carnet-todo/).

[Hub serie](/programmation/puissance-4/) · [mini-gioco terminale](/it/python-mini-gioco-terminale/).

## Amazon (partner)

- <a href="/go/az-it-544bd1b424" rel="sponsored nofollow noopener" class="affiliate-link">Libri progetti e giochi Python su Amazon.it</a>

*Emmanuel Sauvage — 31 ottobre 2026.*
