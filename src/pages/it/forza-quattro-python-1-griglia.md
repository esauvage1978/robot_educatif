---
layout: ../../layouts/ItPost.astro
title: "Forza Quattro in Python, capitolo 1: la griglia 6×7"
description: "Capitolo 1: una lista di sei liste da sette numeri. 0 è vuoto, 1 e 2 sono i giocatori."
updated: "11 November 2026"
---

Il file da scaricare è lo stesso della pagina francese, quindi i messaggi restano in francese.

Un tavoliere di Forza Quattro ha 6 righe e 7 colonne. Questo capitolo costruisce solo la griglia. Non c’è ancora una stampa di gioco e niente cade: la gravità è il capitolo 2.

Una casella è un intero. `0` è vuota, `1` è il primo giocatore, `2` il secondo. I numeri si confrontano più facilmente dei testi `"X"` e `"O"`.

`nouvelle_grille` restituisce una lista di 6 liste, ognuna con 7 zeri. L’indice esterno è la riga. **La riga 0 è in alto**, la riga 5 è in basso. Nel capitolo 2 la ricerca parte dal basso e si ferma alla prima casella vuota.

`grille_pleine` è vera solo quando nella riga 0 non resta nessuno zero. Se la riga in alto è piena, ogni colonna è piena, perché le pedine cadono sempre il più in basso possibile. Il capitolo 5 userà la funzione per il pareggio.

La dimostrazione scrive un `1` alla riga 5, colonna di indice 3. Per una persona è l’ultima riga, colonna 4, perché la tastiera userà le colonne da 1 a 7.

![PowerShell dopo il capitolo 1: griglia creata, ultima riga [0, 0, 0, 1, 0, 0, 0], griglia non piena.](/images/lot10/puissance4-ch1-terminal-output.webp)

*Output di `puissance4_chapitre_01.py`. I messaggi sono in francese perché è il file pubblicato con la serie. L’`1` è nell’ultima riga, quarta colonna.*

## Esecuzione

Salva lo script come `puissance4_chapitre_01.py` oppure scarica il file. Nella cartella del file:

```text
python puissance4_chapitre_01.py
```

Devi leggere `Grille 6 x 7 creee.`, poi l’ultima riga `[0, 0, 0, 1, 0, 0, 0]`, poi `Grille pleine ? False`.

## Esercizi

1. Stampa tutta la griglia, una riga per volta, prima di passare al capitolo 2.
2. Metti una seconda pedina alla riga 4, stessa colonna, e controlla che stia subito sopra la prima.
3. Cosa restituisce `grille_pleine` se riempi solo la riga 5? Deve restare falsa: la riga in alto è ancora vuota.

## Lo script

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Puissance 4 — Chapitre 1/6 : constantes, grille 6x7, demo pile dans une colonne.
Lancer : python puissance4_chapitre_01.py
"""

VIDE = 0
J1 = 1
J2 = 2
LIGNES = 6
COLONNES = 7


def nouvelle_grille():
    return [[VIDE for _ in range(COLONNES)] for _ in range(LIGNES)]


def grille_pleine(grille):
    """True si la ligne du haut est pleine (plus aucun coup possible)."""
    return all(grille[0][c] != VIDE for c in range(COLONNES))


if __name__ == "__main__":
    g = nouvelle_grille()
    print("Grille", LIGNES, "x", COLONNES, "creee.")
    assert len(g) == LIGNES and len(g[0]) == COLONNES

    # Demo : empiler trois J1 dans la colonne d'indice 3 (colonne 4 pour l'humain)
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

## Scarica

**[puissance4_chapitre_01.py](/downloads/puissance4/puissance4_chapitre_01.py)**

## Dopo

[Capitolo 2 — mostrare il tavoliere e far cadere una pedina](/it/forza-quattro-python-2-visualizzazione/).

