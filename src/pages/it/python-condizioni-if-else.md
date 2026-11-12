---
layout: ../../layouts/ItPost.astro
title: "Condizioni Python: if, elif, else — lezione 4 (20 esercizi)"
description: "Imparare if, elif, else in Python 3: confronti, and/or/not, menu e voti. 20 esercizi corretti, risoluzione problemi e prossimi passi del percorso terminale."
updated: "31 ottobre 2026"
faqSchema:
  - question: "A cosa serve if in Python?"
    answer: "if esegue un blocco solo se la condizione testata è vera. elif concatena altri test; else copre il caso restante. L'indentazione (4 spazi) delimita il blocco."
  - question: "Qual è la differenza tra if e elif?"
    answer: "Con if / elif / else viene scelto un solo blocco. Più if separati possono eseguirsi tutti se le rispettive condizioni sono vere."
  - question: "Perché il mio if non fa nulla dopo input()?"
    answer: "input() restituisce testo (str). Per confrontare numeri, converti con int() o float() come nella lezione 3; altrimenti 10 < \"2\" può sorprendere."
---

**Risposta diretta (ottobre 2026)** — In **Python 3**, una **condizione** (`if`, `elif`, `else`) **sceglie** quali istruzioni eseguire a seconda che un test sia **vero** o **falso**. Confronti valori con `==`, `!=`, `<`, `>`, … e combini test con **`and`**, **`or`**, **`not`**. Nessun robot: basta un **terminale** (finestra in cui lanci `python`).

**Lezione 4** del [corso Python](/programmation/python/). Si parte da [lezione 3 — tipi e input](/it/python-tipi-e-input/) (`int(input(...))`, ecc.). Poi: [lezione 5 — cicli](/python-boucles-for-while/) e il [mini-gioco « più o meno »](/it/python-mini-gioco-terminale/) che unisce condizioni e cicli.

| Informazione | Dettaglio |
| --- | --- |
| **Obiettivo** | Scrivere `if` / `elif` / `else` chiari e testare input da tastiera |
| **Livello** | Principiante (dopo variabili e `input`) |
| **Durata** | 45–90 min (lezione + 5–10 esercizi) |
| **Materiale** | PC con **Python 3** (interprete gratuito) |
| **Prerequisiti** | [Lezione 2 — variabili](/python-variables-affichage/), [lezione 3 — input](/it/python-tipi-e-input/) |
| **Risultato atteso** | Script pari/dispari, validazione voto, reazione a un menu |

![Terminale: troppo basso / troppo alto / vinto al gioco del numero](/images/lot2/python-plus-ou-moins-terminal.webp)

*Sessione ricostruita: lo stesso principio di confronto alimenta « più o meno » (esercizio 4) e il [mini-progetto terminale](/it/python-mini-gioco-terminale/). Credit: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

Le **condizioni** decidono quale parte del programma gira. In Python un blocco legato a un `if` si riconosce dall’**indentazione** (di solito **4 spazi**): niente parentesi graffe `{}` come in **C** o **Java**.

## 1. Confronti e operatori logici

**Confronti**: `==` (uguale), `!=` (diverso), `<`, `>`, `<=`, `>=`.

**Combinare** test:

- **`and`**: entrambi devono essere veri.
- **`or`**: almeno uno vero.
- **`not`**: inverte il risultato.

```python
age = 14
if 10 <= age <= 18:   # forma pratica « tra » in Python
    print("Collège / lycée")
```

## 2. `if` / `else`

```python
note = int(input("Note sur 20 ? "))
if note >= 10:
    print("Validé")
else:
    print("À retravailler")
```

I **`:`** dopo la condizione sono obbligatori. La riga successiva **deve** essere indentata.

## 3. Concatenare con `elif`

Python prova le condizioni **in ordine** ed esegue il **primo** blocco la cui condizione è vera. Copri il caso « resto » con un **`else`** finale se serve.

```python
note = int(input("Note /20 ? "))
if note >= 16:
    mention = "Très bien"
elif note >= 14:
    mention = "Bien"
elif note >= 12:
    mention = "Assez bien"
elif note >= 10:
    mention = "Passable"
else:
    mention = "Insuffisant"
print(f"Mention : {mention}")
```

Se più `if` si susseguono **senza** `elif`, **più** blocchi potrebbero eseguirsi; con `elif` ne vince uno solo.

## 4. « Vero » o « falso » impliciti

Un valore « vuoto » può fungere da condizione:

```python
texte = input("Pseudo (Entrée = anonyme) ? ").strip()
if not texte:
    texte = "Invité"
print(f"Bonjour {texte}")
```

(`not texte` è vero per `""`, ma attenzione: `not "0"` è falso perché la stringa non è vuota.)

## 5. Annidamento (cenni)

Puoi mettere un `if` **dentro** un altro: mantieni l’indentazione coerente. Per casi complessi, le [funzioni](/python-fonctions/) (lezione 6) aiutano a spezzare il codice.

## 6. Verificare lo script

1. Salva `test_conditions.py` con uno degli esempi sopra.
2. Apri un terminale nella cartella (PowerShell, Prompt dei comandi o terminale integrato **Thonny** / **VS Code**).
3. Esegui `python test_conditions.py` e prova **almeno** un valore « vero » e uno « falso » per ogni ramo.
4. Se non compare nulla, controlla **`:`** dopo `if` / `elif` / `else` e l’**indentazione** della riga seguente.

## 7. Errori frequenti (risoluzione)

| Sintomo | Causa probabile | Correzione |
| --- | --- | --- |
| `IndentationError` | Nessuno spazio dopo `if:` | Indenta il blocco con 4 spazi (o tab coerente) |
| Confronto strano (`10 < "2"`) | `input()` senza `int()` | Converti: `n = int(input(...))` ([lezione 3](/it/python-tipi-e-input/)) |
| Più messaggi stampati | Più `if` invece di `elif` | Concatena con `elif` per una sola scelta |
| `SyntaxError` su `else` | `else` mal posizionato | `else` segue `if` / catena `elif`, stesso livello |
| `ValueError` su `int(input())` | Testo non numerico | Messaggio chiaro; più avanti [try / except](/python-erreurs-debogage/) |

## Esercizi (20)

Ogni esercizio riusa le **condizioni** della lezione (`if`, `elif`, `else`, `and`, `or`, `not`, confronti). Le **soluzioni** sono nascoste: clic su **Mostra la soluzione** per confrontare.

### Livello facile

**Esercizio 1** — Con `n = 8`, stampa `pair` o `impair` a seconda che `n % 2` valga `0` o meno. <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 8
if n % 2 == 0:
    print("pair")
else:
    print("impair")</code></pre>
</div>
</details>

**Esercizio 2** — Chiedi un intero con `int(input(...))` e stampa se è **strettamente positivo**, **strettamente negativo** o **zero**. <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un entier ? "))
if n > 0:
    print("positif")
elif n < 0:
    print("négatif")
else:
    print("nul")</code></pre>
</div>
</details>

**Esercizio 3** — Due variabili `a = 3` e `b = 9`: stampa il **maggiore** usando solo `if` / `else` (senza `max`). <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = 3
b = 9
if a >= b:
    print(a)
else:
    print(b)</code></pre>
</div>
</details>

**Esercizio 4** — **Più o meno (un tentativo)**: `secret = 42`. Chiedi un intero; stampa `trop petit`, `trop grand` o `gagné`. <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">secret = 42
n = int(input("Nombre entre 1 et 100 ? "))
if n < secret:
    print("trop petit")
elif n > secret:
    print("trop grand")
else:
    print("gagné")</code></pre>
</div>
</details>

**Esercizio 5** — Chiedi una stringa; se dopo `strip()` è **vuota**, stampa `Erreur : pseudo vide`; altrimenti `Bienvenue,` e la stringa. <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Pseudo ? ").strip()
if not s:
    print("Erreur : pseudo vide")
else:
    print("Bienvenue,", s)</code></pre>
</div>
</details>

**Esercizio 6** — `x = int(input(...))`: stampa `dans [0, 10]` se `0 <= x <= 10`, altrimenti `hors plage`. <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("Un nombre ? "))
if 0 <= x <= 10:
    print("dans [0, 10]")
else:
    print("hors plage")</code></pre>
</div>
</details>

**Esercizio 7** — `ok = True`: se `ok` è vero, stampa `OK`; altrimenti `KO` (`if ok:` senza `== True`). <span class="exo-badge exo-badge--simple">Facile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">ok = True
if ok:
    print("OK")
else:
    print("KO")</code></pre>
</div>
</details>

### Livello intermedio

**Esercizio 8** — Chiedi un **età** (`int`). Se `< 0` o `> 120`, stampa `âge improbable`; altrimenti se `age < 18` → `mineur`, else `majeur`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = int(input("Âge ? "))
if age < 0 or age > 120:
    print("âge improbable")
elif age < 18:
    print("mineur")
else:
    print("majeur")</code></pre>
</div>
</details>

**Esercizio 9** — Chiedi un **voto** su 20 (`int`). `recalé` se `< 10`, `passable` se `< 12`, `bien` se `< 16`, else `très bien` (catena `elif`). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note = int(input("Note /20 ? "))
if note < 10:
    print("recalé")
elif note < 12:
    print("passable")
elif note < 16:
    print("bien")
else:
    print("très bien")</code></pre>
</div>
</details>

**Esercizio 10** — **Menu**: stampa `1 = Salut` e `2 = Au revoir`, chiedi scelta (`input`), stampa il messaggio; se non è `1` né `2` → `option inconnue`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print("1 = Salut")
print("2 = Au revoir")
c = input("Choix ? ")
if c == "1":
    print("Salut")
elif c == "2":
    print("Au revoir")
else:
    print("option inconnue")</code></pre>
</div>
</details>

**Esercizio 11** — Chiedi `a` e `b` (interi). Se `a == b` stampa `égaux`; altrimenti quale è maggiore. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
if a == b:
    print("égaux")
elif a > b:
    print("a est plus grand")
else:
    print("b est plus grand")</code></pre>
</div>
</details>

**Esercizio 12** — `n = int(input(...))`: con `and`, stampa `dans la plage` solo se `n` è **≥ 10 e ≤ 20**, altrimenti `dehors`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n >= 10 and n <= 20:
    print("dans la plage")
else:
    print("dehors")</code></pre>
</div>
</details>

**Esercizio 13** — Chiedi `rep` (carattere o breve stringa). `oui` se `o`/`O` (dopo `strip()`), `non` se `n`/`N`, else `réponse inattendue`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">rep = input("o/n ? ").strip()
if rep == "o" or rep == "O":
    print("oui")
elif rep == "n" or rep == "N":
    print("non")
else:
    print("réponse inattendue")</code></pre>
</div>
</details>

**Esercizio 14** — `x = int(input(...))`: `positif ou nul` se `x >= 0`; altrimenti **`if` annidato** per `négatif pair` o `négatif impair`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("x ? "))
if x >= 0:
    print("positif ou nul")
else:
    if x % 2 == 0:
        print("négatif pair")
    else:
        print("négatif impair")</code></pre>
</div>
</details>

### Livello difficile

**Esercizio 15** — Chiedi una **password** (stringa). Lunghezza **minore di 6** → `trop court`; **maggiore di 24** → `trop long`; altrimenti `OK`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">mdp = input("Mot de passe ? ")
if len(mdp) < 6:
    print("trop court")
elif len(mdp) > 24:
    print("trop long")
else:
    print("OK")</code></pre>
</div>
</details>

**Esercizio 16** — **Voto** su 20. Fuori da 0–20 → `note invalide`; altrimenti catena `elif` come in lezione (16+ → Très bien, …). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">note = int(input("Note /20 ? "))
if note < 0 or note > 20:
    print("note invalide")
elif note >= 16:
    print("Très bien")
elif note >= 14:
    print("Bien")
elif note >= 12:
    print("Assez bien")
elif note >= 10:
    print("Passable")
else:
    print("Insuffisant")</code></pre>
</div>
</details>

**Esercizio 17** — Tre interi `a`, `b`, `c`: stampa `tous égaux`, `deux égaux` o `tous différents`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a ? "))
b = int(input("b ? "))
c = int(input("c ? "))
if a == b == c:
    print("tous égaux")
elif a == b or a == c or b == c:
    print("deux égaux")
else:
    print("tous différents")</code></pre>
</div>
</details>

**Esercizio 18** — **Età** per tariffa ridotta: sotto 12 → `enfant`, 12–17 → `ado`, 18–64 → `adulte`, 65+ → `senior`; negativa o oltre 120 → `âge invalide`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">age = int(input("Âge ? "))
if age < 0 or age > 120:
    print("âge invalide")
elif age < 12:
    print("enfant")
elif age <= 17:
    print("ado")
elif age <= 64:
    print("adulte")
else:
    print("senior")</code></pre>
</div>
</details>

**Esercizio 19** — Due risposte sì/no; `oui` (maiuscole/minuscole, dopo `strip()`) vale vero. `les deux` / `au moins un` / `aucun`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">u = input("Premier oui/non ? ").strip().lower() == "oui"
v = input("Deuxième oui/non ? ").strip().lower() == "oui"
if u and v:
    print("les deux")
elif u or v:
    print("au moins un")
else:
    print("aucun")</code></pre>
</div>
</details>

**Esercizio 20** — Chiedi un **intero** `n`. `Fizz` se multiplo di 3, `Buzz` se di 5, `FizzBuzz` se entrambi, altrimenti `n` (`elif`, un solo messaggio). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n % 15 == 0:
    print("FizzBuzz")
elif n % 3 == 0:
    print("Fizz")
elif n % 5 == 0:
    print("Buzz")
else:
    print(n)</code></pre>
</div>
</details>

## Prossimi passi — lezione 5 e mini-progetto

Padroneggi i **rami**; la [lezione 5 — cicli for e while](/python-boucles-for-while/) **ripete** il codice (più tentativi al « più o meno », scorrere una lista). Prosegui con il [mini-gioco terminale](/it/python-mini-gioco-terminale/) che unisce `if`, `while` e `random`. Per la serie: [hub Python](/programmation/python/), [liste e stringhe](/python-listes-et-chaines/) (lezione 7), [impiccato](/programmation/pendu/) e [battaglia navale](/programmation/bataille-navale/). Ripassa l’input: [lezione 3](/it/python-tipi-e-input/).

## Amazon (partner)

I prezzi su Amazon cambiano; controlla listino ed edizione prima dell’acquisto.

- <a href="/go/az-it-544bd1b424" rel="sponsored nofollow noopener" class="affiliate-link">Libri di progetti e giochi Python su Amazon.it</a>

*Emmanuel Sauvage — aggiornato il 31 ottobre 2026.*
