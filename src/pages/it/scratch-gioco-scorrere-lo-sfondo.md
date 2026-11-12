---
layout: ../../layouts/ItPost.astro
title: "Scratch: far scorrere uno sfondo con le frecce"
description: "Parte 1: disegnare un suolo più largo del palco e spostarlo di 5 pixel con le frecce, tre variabili e un fine corsa."
updated: "12 novembre 2026"
---

Questa è la prima parte di una serie. Costruisce il suolo di un gioco e lo fa scorrere con le frecce. Personaggio, piattaforme e salto non sono in questa pagina.

## 1. Prima

[Installa mBlock 5](/it/installare-mblock-5-windows/) oppure apri [Scratch](https://scratch.mit.edu/). Palco, sprite e categorie di blocchi: [interfaccia di mBlock 5](/it/primi-passi-mblock-5/). Il [quadrato](/it/attivita-scratch-il-quadrato/) è un primo script su uno sprite.

Più script possono stare sullo stesso sprite e girare insieme. L’area degli script mostra l’oggetto selezionato.

## 2. Un suolo più largo del palco

Il suolo è uno **sprite**, non uno sfondo. Lo sfondo non ha la categoria **Movimento**, quindi non cambia x.

1. In **Sprite**, clicca **aggiungi**, poi **Disegna**.
2. Disegna una mattonella il cui sopra è di un solo colore su tutto il percorso.
3. Se ci sono più pezzi, **converti in bitmap** e poi il comando che fonde la selezione in una forma.
4. Duplica (Ctrl+C, Ctrl+V), allinea cinque copie, seleziona tutto (Ctrl+A) e fondi di nuovo.
5. Sposta il blocco sul bordo destro dell’area di disegno e aggiungi una mattonella. Nel percorso originale la larghezza passava allora a 841 pixel. Leggi il numero sul tuo schermo.
6. Ripeti fino a un costume di almeno 7 000 pixel. Il palco di Scratch è largo 480 pixel.

## 3. Il programma

Il palco va da x = −240 a x = 240. La x dello sprite è il centro del costume. Freccia destra: il suolo va di 5 pixel a sinistra. Freccia sinistra: il contrario.

Crea tre variabili **solo per questo sprite**: `decor_largeur` (larghezza letta), `decor_debut` (x di partenza), `decor_fin` (x di fine).

Quando si clicca la bandiera verde:

1. porta `decor_largeur` a quella larghezza (7 000 nell’esempio);
2. porta `decor_debut` a `(decor_largeur / 2) − 240`;
3. porta `decor_fin` a `240 − (decor_largeur / 2)`;
4. vai a x: `decor_debut`, y: 0.

Con 7 000, l’inizio vale 3 260 e la fine −3 260. Il bordo sinistro del costume coincide allora con il bordo sinistro del palco. Questo conto non è stato rifatto in Scratch per questo aggiornamento. Se il suolo non parte a sinistra, il segno o la larghezza letta non corrispondono al costume.

Dentro **ripeti per sempre**:

- se **freccia destra premuta** e **posizione x > decor_fin**, **cambia x di −5**;
- se **freccia sinistra premuta** e **posizione x < decor_debut**, **cambia x di 5**.

Controllo: bandiera verde, il suolo è a sinistra. La freccia destra lo sposta e si ferma a `decor_fin`. La freccia sinistra lo riporta e si ferma a `decor_debut`.

## 4. Dopo

Esempi su [Scratch](https://scratch.mit.edu/). Su questo sito: [il quadrato](/it/attivita-scratch-il-quadrato/), [installare mBlock 5](/it/installare-mblock-5-windows/), [primo programma mBot](/it/primo-programma-mbot/).
