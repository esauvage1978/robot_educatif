---
layout: ../../layouts/ItPost.astro
title: "Python 3 input: tipi e chiedere un valore (lezione 3)"
description: "Python input e tipi: int, float, str, bool, conversioni, strip(). 20 esercizi con soluzioni per chiedere un valore da tastiera."
updated: "31 ottobre 2026"
faqSchema:
  - question: "Come chiedere un valore in Python 3?"
    answer: "Usa input(\"messaggio\"). Restituisce sempre una stringa (str). Poi converti con int() o float() se devi calcolare."
  - question: "Perché input() restituisce testo e non un numero?"
    answer: "Perché la tastiera invia caratteri. \"12\" è testo; int(\"12\") dà il numero 12 per i calcoli."
---

Sai già usare variabili e stampa ([lezione 2 — variabili e stampa](/python-variables-affichage/)). Qui il programma **reagisce** alla tastiera. In **Python 3** tutto passa da **`input()`**: **chiede un valore**, attende Invio e restituisce **sempre** una stringa (`str`). Convertire bene in `int` o `float` è indispensabile prima delle [condizioni e if/else](/python-conditions-if-else/). Pratica: [mini-gioco al terminale](/it/python-mini-gioco-terminale/).

**Lezione 3** del percorso Python. Nessun robot necessario: basta il terminale o la console dell’editor.

![Console: input() restituisce str, poi int() per calcolare](/images/lot2/python-input-console.webp)

*Sessione in console: `input()` restituisce una stringa di testo, poi `int()` la converte in numero per calcolare.*

## 1. I tipi più utili all’inizio

Python manipola valori di **tipi** diversi. I primi quattro da padroneggiare:

| Tipo    | Ruolo breve             | Esempi          |
|---------|-------------------------|-----------------|
| `int`   | intero                  | `42`, `-3`, `0` |
| `float` | numero decimale         | `3.14`, `2.0`   |
| `str`   | testo                   | `"ciao"`, `'x'` |
| `bool`  | vero / falso            | `True`, `False` |

Per **ispezionare** il tipo durante l’apprendimento:

```python
x = 10
y = "10"
print(type(x), type(y))  # <class 'int'> <class 'str'>
```

## 2. Conversioni esplicite

- **`int("42")`** → `42`. Fallisce su `"3.5"` o `"dodici"` → **`ValueError`**.
- **`float("3.5")`** o **`float("2")`** → numero decimale.
- **`str(2026)`** → `"2026"` (per concatenare o costruire un messaggio).

Regola pratica: non appena vuoi **calcolare** a partire da un input, converti dopo `input()`.

## 3. `input()`: sempre testo

```python
risposta = input("Un intero? ")
n = int(risposta)
print(f"Il successivo è {n + 1}")
```

Gli spazi prima/dopo la digitazione sono spesso scomodi. Molti script iniziano con:

```python
testo = input("Città? ").strip()
```

`strip()` rimuove gli spazi (e i ritorni a capo invisibili) all’inizio e alla fine della stringa.

## 4. `bool` e confronti (anteprima)

I confronti (`==`, `<`, …) producono già un booleano. Puoi anche scrivere `bool(0)` → `False`, `bool(1)` → `True` (i dettagli arriveranno con la pratica degli `if`).

## 5. Trappola classica: mescolare testo e calcolo

`"3" + "5"` dà `"35"`. Per una somma:

```python
a = int(input("Primo numero? "))
b = int(input("Secondo numero? "))
print(a + b)
```

Se l’utente inserisce `3.5` mentre ti aspetti un `int`, **`int()`** solleva un errore. Puoi esercitarti con `try` / `except` nel [mini-gioco al terminale](/it/python-mini-gioco-terminale/); la lezione completa è [errori e debugging](/python-erreurs-debogage/).

## Esercizi (20)

Gli esercizi presuppongono che **esegui lo script** e digiti i valori richiesti nella console. Le **soluzioni** sono nascoste di default: apri **Mostra la soluzione** per confrontare.

### Livello semplice

**Esercizio 1** — Stampa con `print` i risultati di `type(7)` e `type("7")` (due valori su una riga o due `print`). <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(type(7), type("7"))</code></pre>
</div>
</details>

**Esercizio 2** — Chiedi un testo con `input("Il tuo nome? ")` (senza conversione), memorizza in `nome`, poi stampa `Ciao` seguito da virgola e `nome` con **un solo** `print` e virgole. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nome = input("Il tuo nome? ")
print("Ciao,", nome)</code></pre>
</div>
</details>

**Esercizio 3** — Chiedi una frase con `input()`, concatena `.strip()` sulla stessa riga di `input`, stampa la stringa ripulita in un messaggio `Hai scritto: ...`. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">frase = input("Una frase: ").strip()
print(f"Hai scritto: {frase}")</code></pre>
</div>
</details>

**Esercizio 4** — Crea `s = "15"`, converti in intero con `int(s)`, stampa il risultato e il suo `type(...)`. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "15"
n = int(s)
print(n, type(n))</code></pre>
</div>
</details>

**Esercizio 5** — Crea `t = "2.5"`, converti in `float`, stampa il valore moltiplicato per `2` (senza f-string: un solo `print` con virgola basta). <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">t = "2.5"
x = float(t)
print(x * 2)</code></pre>
</div>
</details>

**Esercizio 6** — Con `n = 2026`, stampa la stringa `"Anno: "` seguita da `str(n)` usando la **concatenazione** con `+`. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 2026
print("Anno: " + str(n))</code></pre>
</div>
</details>

**Esercizio 7** — Chiedi **due** stringhe con due `input()` (`parola1`, `parola2`) e stampa la loro **concatenazione diretta** (senza spazio), per mostrare la trappola `"3"` + `"5"` → `"35"`. <span class="exo-badge exo-badge--simple">Semplice</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">parola1 = input("Prima parola: ")
parola2 = input("Seconda parola: ")
print(parola1 + parola2)</code></pre>
</div>
</details>

### Livello intermedio

**Esercizio 8** — Chiedi un **intero** con `input`, converti con `int`, stampa `Il successivo è` seguito da `n + 1` (f-string). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un intero? "))
print(f"Il successivo è {n + 1}")</code></pre>
</div>
</details>

**Esercizio 9** — Chiedi un numero **decimale** (`float`), stampa il suo **doppio** con una f-string. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Un numero decimale? "))
print(f"Doppio: {x * 2}")</code></pre>
</div>
</details>

**Esercizio 10** — Chiedi **due interi**, stampa la **somma** e il **prodotto** su **due righe**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("Primo intero? "))
b = int(input("Secondo intero? "))
print(f"Somma: {a + b}")
print(f"Prodotto: {a * b}")</code></pre>
</div>
</details>

**Esercizio 11** — Chiedi un **nome** (stringa) e un’**età** (`int`), poi stampa `… ha … anni` con una f-string. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nome = input("Nome? ")
eta = int(input("Età? "))
print(f"{nome} ha {eta} anni")</code></pre>
</div>
</details>

**Esercizio 12** — Chiedi una temperatura in **°C** in `float`, calcola **°F** con `f = c * 9 / 5 + 32` e stampa arrotondato a **1** decimale con `round(f, 1)`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">c = float(input("Temperatura °C? "))
f = c * 9 / 5 + 32
print(f"In °F: {round(f, 1)}")</code></pre>
</div>
</details>

**Esercizio 13** — Chiedi una stringa (senza convertirla in numero), stampa la sua **lunghezza** con `len(...)`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">testo = input("Una parola o una frase: ")
print(len(testo))</code></pre>
</div>
</details>

**Esercizio 14** — Leggi nel codice una stringa che rappresenta un decimale (`s = "12.5"`), converti in `float`, stampa il **triplo**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "12.5"
x = float(s)
print(x * 3)</code></pre>
</div>
</details>

### Livello difficile

**Esercizio 15** — Chiedi **tre interi** in successione, calcola la **somma** e la **media** `(a+b+c)/3`, stampa entrambe con f-string. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("a? "))
b = int(input("b? "))
c = int(input("c? "))
somma = a + b + c
media = somma / 3
print(f"Somma: {somma}")
print(f"Media: {media}")</code></pre>
</div>
</details>

**Esercizio 16** — Chiedi un `float`, poi stampa il valore **arrotondato a 2 decimali** usando `round(x, 2)` **dentro** una f-string. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("Numero? "))
print(f"Valore arrotondato (2 dec.): {round(x, 2)}")</code></pre>
</div>
</details>

**Esercizio 17** — Chiedi una stringa, applica `.strip()`, converti in `int`, poi stampa il **quadrato** `n * n` con una f-string. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un intero (spazi ammessi): ").strip())
print(f"Quadrato: {n * n}")</code></pre>
</div>
</details>

**Esercizio 18** — Chiedi **due** numeri in `float`, calcola e stampa la **media** `(a+b)/2` con un messaggio chiaro. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = float(input("Primo numero? "))
b = float(input("Secondo numero? "))
m = (a + b) / 2
print(f"Media: {m}")</code></pre>
</div>
</details>

**Esercizio 19** — Chiedi un **anno di nascita** e l’**anno corrente** in interi (`int`), calcola un’**età** approssimativa `corrente - nascita` e stampala (senza gestire il giorno del calendario: semplificato di proposito). <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nascita = int(input("Anno di nascita? "))
corrente = int(input("Anno corrente? "))
eta = corrente - nascita
print(f"Età approssimativa: {eta} anni")</code></pre>
</div>
</details>

**Esercizio 20** — Concatena: `input` del **nome** con `.strip()`, `input` di un’**altezza** in metri in `float`, poi una **f-string** su **una riga** del tipo `Marco misura circa 1.72 m`. <span class="exo-badge exo-badge--hard">Difficile</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostra la soluzione</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nome = input("Nome? ").strip()
altezza = float(input("Altezza in m? "))
print(f"{nome} misura circa {altezza} m")</code></pre>
</div>
</details>

## Continuazione del percorso

Il passo successivo è **testare** i valori convertiti (pari / dispari, menu, voti). Pratica: [mini-gioco con confronti](/it/python-mini-gioco-terminale/). Teoria: [condizioni e if/else](/python-conditions-if-else/). Per i file: [pathlib: percorsi e file](/it/python-pathlib/).

## Amazon (partner)

- [Esercizi e problemi Python](https://www.amazon.it/s?k=esercizi+python+libro&tag=roboteducat0f-21) — verifica il prezzo attuale sulla scheda.
