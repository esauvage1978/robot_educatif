---
layout: ../../layouts/ItPost.astro
title: "Gioco Python al terminale: indovina il numero (mini-progetto)"
description: "Creare un gioco Python « indovina il numero » nel terminale: random, while, input, try/except. Codice completo, test e varianti."
updated: "31 ottobre 2026"
faqSchema:
  - question: "Come creare un gioco in Python da principiante?"
    answer: "Basta un gioco « indovina il numero » al terminale: random.randint per il segreto, input per i tentativi, while per ripetere, try/except per input non validi."
  - question: "Serve un robot per questo tutorial Python?"
    answer: "No. Questo mini-progetto si gioca solo nel terminale. Bastano un computer e Python 3."
---

Vuoi un **gioco in Python** semplice, giocabile subito nel **terminale** (la finestra di testo dove lanci `python`)? Questo mini-progetto « indovina il numero » riprende **`input`**, **`int`**, **`while`**, **`if` / `elif` / `else`**, **`random`** e **`try` / `except`** ([gestione degli errori con try/except](/python-erreurs-debogage/)).

Salva lo script come `indovina_numero.py`, poi esegui:

```bash
python indovina_numero.py
```

![Esempio di partita nel terminale: proposte 50 e 75, abc rifiutato, vittoria in 3 colpi](/images/lot2/python-plus-ou-moins-terminal.webp)

*Sessione di esempio nel terminale: il programma chiede un numero, risponde troppo piccolo / troppo grande, rifiuta `abc`, poi annuncia la vittoria in 3 colpi.*

**Percorso.** È la **lezione 10** della serie Python. Se serve, rivedi [tipi e input](/it/python-tipi-e-input/) o [pathlib](/it/python-pathlib/). Panoramica completa: [corso Python](/programmation/python/).

Alcuni link ai libri più sotto sono di affiliazione. Controlla il prezzo del giorno sulla scheda.

## 1. Regole del gioco

- Il computer sceglie un **numero segreto** tra **1** e **100** (inclusi).
- Proponi **interi**; dopo ogni tentativo il programma risponde **troppo piccolo**, **troppo grande** o conferma la vittoria.
- Alla fine mostra **quanti tentativi** sono serviti.

## 2. Passi di progettazione (prima di scrivere tutto d’un fiato)

1. Estrarre il segreto con **`random.randint(1, 100)`**.
2. Inizializzare **`tentativi = 0`**.
3. Ciclo: leggere una proposta, **incrementare**, confrontare, **`break`** quando si vince.
4. Se l’input non è un intero, **non crashare**: `except ValueError`, messaggio chiaro, `continue`.

## 3. Soluzione di riferimento

```python
import random

segreto = random.randint(1, 100)
tentativi = 0

while True:
    try:
        proposta = int(input("Il tuo numero (1-100)? "))
    except ValueError:
        print("Inserisci un intero.")
        continue

    tentativi += 1
    if proposta < segreto:
        print("Troppo piccolo.")
    elif proposta > segreto:
        print("Troppo grande.")
    else:
        print(f"Vinto in {tentativi} colpo/i!")
        break
```

### Esempio di sessione

```text
Il tuo numero (1-100)? 50
Troppo piccolo.
Il tuo numero (1-100)? 75
Troppo grande.
Il tuo numero (1-100)? abc
Inserisci un intero.
Il tuo numero (1-100)? 62
Vinto in 3 colpo/i!
```

## 4. Test rapidi a mano

- Vincere in **un** colpo: il contatore mostra **1**.
- Digitare **`abc`**: messaggio, ciclo **senza** crash.
- Concatenare **troppo piccolo** poi **troppo grande**: continuare a guidare.

## Esercizi per andare oltre

1. **Limite di tentativi** (es. **7**): a esaurimento, mostra il **segreto** e « perso ».
2. **Due livelli**: intervallo **1–50** o **1–200**.
3. Salvare il **miglior punteggio** in **`record.txt`** — vedi [leggere e scrivere file di testo](/python-fichiers-texte/).
4. Mostrare un **indizio** ogni 5 tentativi.
5. **Rigiocare** con domanda sì/no alla fine.

## Dopo questo percorso

Altri giochi testuali: [impiccato](/programmation/pendu/), [battaglia navale](/programmation/bataille-navale/), [forza 4](/programmation/puissance-4/). Torna al [corso Python](/programmation/python/).

Libri di esercizi (link partner — Amazon.it):

- [Progetti Python giochi](https://www.amazon.it/s?k=python+progetti+giochi+libro&tag=roboteducat0f-21)
- [Imparare Python 3 con esercizi](https://www.amazon.it/s?k=python+3+imparare+esercizi+libro&tag=roboteducat0f-21)

*Autore: Emmanuel Sauvage · aggiornato il 31 ottobre 2026.*
