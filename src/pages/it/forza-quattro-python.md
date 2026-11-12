---
layout: ../../layouts/ItPost.astro
title: "Forza Quattro in Python: sei capitoli nel terminale"
description: "Forza Quattro nel terminale: griglia 6×7, gravità, turni, quattro in fila, pareggio, poi una partita contro un avversario casuale."
updated: "11 November 2026"
---

Il file da scaricare è lo stesso della pagina francese, quindi i messaggi restano in francese.

Due giocatori fanno cadere le pedine nelle colonne. Il primo che ne allinea quattro vince. Il gioco si scrive in Python 3, nel terminale, senza Pygame e senza librerie aggiuntive.

Servono le liste, i cicli `for` e `while`, e `if`. La serie ha sei capitoli. Ognuno finisce con uno script eseguibile e il capitolo successivo riparte da lì.

I messaggi dei file sono in francese (`Grille`, `Colonne`, `Ton choix`). Il Python è lo stesso in ogni lingua. Le immagini dei capitoli 1 e 6 mostrano proprio quell’output francese.

Conta da 20 a 40 minuti per capitolo. Alla fine del capitolo 6 si gioca in due, oppure un umano contro un avversario che sceglie a caso una colonna ancora libera. Quell’avversario non prevede le mosse.

## I sei capitoli

1. [La griglia 6×7](/it/forza-quattro-python-1-griglia/): caselle vuote, giocatori 1 e 2, e perché la riga 0 è in alto.
2. [Visualizzazione e gravità](/it/forza-quattro-python-2-visualizzazione/): stampare il tavoliere e far cadere la pedina nella casella libera più bassa.
3. [Turni](/it/forza-quattro-python-3-turni/): leggere una colonna e cambiare giocatore solo dopo una mossa valida.
4. [Quattro in fila](/it/forza-quattro-python-4-quattro-in-fila/): contare in quattro direzioni dall’ultima pedina.
5. [Pareggio](/it/forza-quattro-python-5-pareggio/): tavoliere pieno, e perché la vittoria si controlla prima.
6. [La partita completa](/it/forza-quattro-python-6-partita-completa/): menu, uscita con `q` e avversario casuale.

## Controllo

`python puissance4_chapitre_01.py` deve segnalare una griglia 6×7, l’ultima riga `[0, 0, 0, 1, 0, 0, 0]` e `False` per la griglia piena. Una riga diversa significa che la pedina di prova non è nella colonna di indice 3.

