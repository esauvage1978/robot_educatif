---
layout: ../../layouts/EsPost.astro
title: "Condiciones Python: if, elif, else — lección 4 (20 ejercicios)"
description: "Aprender if, elif, else en Python 3: comparaciones, and/or/not, menús y notas. 20 ejercicios corregidos, resolución de problemas y siguientes pasos del recorrido en terminal."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Para qué sirve if en Python?"
    answer: "if ejecuta un bloque solo si la condición probada es verdadera. elif encadena otras pruebas; else cubre el caso restante. La indentación (4 espacios) marca el bloque."
  - question: "¿Cuál es la diferencia entre if y elif?"
    answer: "Con if / elif / else se elige un solo bloque. Varios if separados pueden ejecutarse todos si sus condiciones son verdaderas."
  - question: "¿Por qué mi if no hace nada después de input()?"
    answer: "input() devuelve texto (str). Para comparar números, convierte con int() o float() como en la lección 3; si no, 10 < \"2\" puede sorprender."
---

**Respuesta directa (octubre de 2026)** — En **Python 3**, una **condición** (`if`, `elif`, `else`) **elige** qué instrucciones se ejecutan según que una prueba sea **verdadera** o **falsa**. Comparas valores con `==`, `!=`, `<`, `>`, … y combinas pruebas con **`and`**, **`or`**, **`not`**. No hace falta un robot: basta un **terminal** (ventana donde ejecutas `python`).

**Lección 4** del [curso Python](/programmation/python/). Parte de [lección 3 — tipos y entrada](/es/python-tipos-y-entrada/) (`int(input(...))`, etc.). Después: [lección 5 — bucles](/python-boucles-for-while/) y el [mini-juego « mayor o menor »](/es/python-mini-juego-terminal/) que mezcla condiciones y bucles.

| Información | Detalle |
| --- | --- |
| **Objetivo** | Escribir `if` / `elif` / `else` claros y probar entradas de teclado |
| **Nivel** | Principiante (después de variables e `input`) |
| **Duración** | 45–90 min (lección + 5–10 ejercicios) |
| **Material** | PC con **Python 3** (intérprete gratuito) |
| **Prerrequisitos** | [Lección 2 — variables](/python-variables-affichage/), [lección 3 — input](/es/python-tipos-y-entrada/) |
| **Resultado esperado** | Scripts par/impar, validar nota, reaccionar a un menú |

![Terminal: demasiado bajo / alto / ganado en mayor o menor](/images/lot2/python-plus-ou-moins-terminal.webp)

*Sesión reconstruida: la misma lógica de comparación alimenta mayor o menor (ejercicio 4) y el [mini-proyecto en terminal](/es/python-mini-juego-terminal/). Crédito: Emmanuel Sauvage, Robot Éducatif — octubre de 2026.*

Las **condiciones** deciden qué parte del programa se ejecuta. En Python un bloque ligado a un `if` se reconoce por la **indentación** (normalmente **4 espacios**): sin llaves `{}` como en **C** o **Java**.

## 1. Comparaciones y operadores lógicos

**Comparaciones**: `==` (igual), `!=` (distinto), `<`, `>`, `<=`, `>=`.

**Combinar** pruebas:

- **`and`**: ambas deben ser verdaderas.
- **`or`**: al menos una verdadera.
- **`not`**: invierte el resultado.

```python
age = 14
if 10 <= age <= 18:   # forma práctica « entre » en Python
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

Los **`:`** tras la condición son obligatorios. La línea siguiente **debe** estar indentada.

## 3. Encadenar con `elif`

Python prueba las condiciones **en orden** y ejecuta el **primer** bloque cuya condición es verdadera. Cubre el caso « resto » con un **`else`** final si hace falta.

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

Si varios `if` siguen **sin** `elif`, **varios** bloques podrían ejecutarse; con `elif`, solo gana uno.

## 4. « Verdadero » o « falso » implícitos

Un valor « vacío » puede servir de condición:

```python
texte = input("Pseudo (Entrée = anonyme) ? ").strip()
if not texte:
    texte = "Invité"
print(f"Bonjour {texte}")
```

(`not texte` es verdadero para `""`, pero ojo: `not "0"` es falso porque la cadena no está vacía.)

## 5. Anidamiento (vista general)

Puedes poner un `if` **dentro** de otro: mantén la indentación coherente. En casos complejos, las [funciones](/python-fonctions/) (lección 6) ayudan a dividir el código.

## 6. Comprobar tu script

1. Guarda `test_conditions.py` con uno de los ejemplos anteriores.
2. Abre un terminal en la carpeta (PowerShell, Símbolo del sistema o terminal integrado de **Thonny** / **VS Code**).
3. Ejecuta `python test_conditions.py` y prueba **al menos** un valor « verdadero » y uno « falso » por rama.
4. Si no se muestra nada, revisa **`:`** tras `if` / `elif` / `else` y que la línea siguiente esté **indentada**.

## 7. Errores frecuentes (solución de problemas)

| Síntoma | Causa probable | Corrección |
| --- | --- | --- |
| `IndentationError` | Sin espacios tras `if:` | Indenta el bloque con 4 espacios (o tab coherente) |
| Comparación rara (`10 < "2"`) | `input()` sin `int()` | Convierte: `n = int(input(...))` ([lección 3](/es/python-tipos-y-entrada/)) |
| Varios mensajes | Varios `if` en lugar de `elif` | Encadena con `elif` para una sola elección |
| `SyntaxError` en `else` | `else` mal colocado | `else` sigue a `if` / cadena `elif`, mismo nivel |
| `ValueError` en `int(input())` | Texto no numérico | Mensaje claro; más adelante [try / except](/python-erreurs-debogage/) |

## Ejercicios (20)

Cada ejercicio reutiliza las **condiciones** de la lección (`if`, `elif`, `else`, `and`, `or`, `not`, comparaciones). Las **soluciones** están ocultas: pulsa **Mostrar la solución** para comparar.

### Nivel fácil

**Ejercicio 1** — Con `n = 8`, muestra `pair` o `impair` según que `n % 2` valga `0` o no. <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 8
if n % 2 == 0:
    print("pair")
else:
    print("impair")</code></pre>
</div>
</details>

**Ejercicio 2** — Pide un entero con `int(input(...))` y muestra si es **estrictamente positivo**, **estrictamente negativo** o **cero**. <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 3** — Dos variables `a = 3` y `b = 9`: muestra el **mayor** usando solo `if` / `else` (sin `max`). <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = 3
b = 9
if a >= b:
    print(a)
else:
    print(b)</code></pre>
</div>
</details>

**Ejercicio 4** — **Mayor o menor (un intento)**: `secret = 42`. Pide un entero; muestra `trop petit`, `trop grand` o `gagné`. <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 5** — Pide una cadena; si tras `strip()` está **vacía**, muestra `Erreur : pseudo vide`; si no, `Bienvenue,` y la cadena. <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = input("Pseudo ? ").strip()
if not s:
    print("Erreur : pseudo vide")
else:
    print("Bienvenue,", s)</code></pre>
</div>
</details>

**Ejercicio 6** — `x = int(input(...))`: muestra `dans [0, 10]` si `0 <= x <= 10`, si no `hors plage`. <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = int(input("Un nombre ? "))
if 0 <= x <= 10:
    print("dans [0, 10]")
else:
    print("hors plage")</code></pre>
</div>
</details>

**Ejercicio 7** — `ok = True`: si `ok` es verdadero, muestra `OK`; si no, `KO` (`if ok:` sin `== True`). <span class="exo-badge exo-badge--simple">Fácil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">ok = True
if ok:
    print("OK")
else:
    print("KO")</code></pre>
</div>
</details>

### Nivel intermedio

**Ejercicio 8** — Pide una **edad** (`int`). Si `< 0` o `> 120`, muestra `âge improbable`; si no, si `age < 18` → `mineur`, else `majeur`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 9** — Pide una **nota** sobre 20 (`int`). `recalé` si `< 10`, `passable` si `< 12`, `bien` si `< 16`, else `très bien` (cadena `elif`). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 10** — **Menú**: muestra `1 = Salut` y `2 = Au revoir`, pide elección (`input`), muestra el mensaje; si no es `1` ni `2` → `option inconnue`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 11** — Pide `a` y `b` (enteros). Si `a == b` muestra `égaux`; si no, cuál es mayor. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 12** — `n = int(input(...))`: con `and`, muestra `dans la plage` solo si `n` es **≥ 10 y ≤ 20**; si no, `dehors`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("n ? "))
if n >= 10 and n <= 20:
    print("dans la plage")
else:
    print("dehors")</code></pre>
</div>
</details>

**Ejercicio 13** — Pide `rep` (carácter o cadena corta). `oui` si `o`/`O` (tras `strip()`), `non` si `n`/`N`, else `réponse inattendue`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 14** — `x = int(input(...))`: `positif ou nul` si `x >= 0`; si no, **`if` anidado** para `négatif pair` o `négatif impair`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

### Nivel difícil

**Ejercicio 15** — Pide una **contraseña** (cadena). Longitud **menor de 6** → `trop court`; **mayor de 24** → `trop long`; si no, `OK`. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 16** — **Nota** sobre 20. Fuera de 0–20 → `note invalide`; si no, cadena `elif` como en la lección (16+ → Très bien, …). <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 17** — Tres enteros `a`, `b`, `c`: muestra `tous égaux`, `deux égaux` o `tous différents`. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 18** — **Edad** para tarifa reducida: menor de 12 → `enfant`, 12–17 → `ado`, 18–64 → `adulte`, 65+ → `senior`; negativa o mayor de 120 → `âge invalide`. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 19** — Dos respuestas sí/no; `oui` (mayúsculas/minúsculas, tras `strip()`) cuenta como verdadero. `les deux` / `au moins un` / `aucun`. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

**Ejercicio 20** — Pide un **entero** `n`. `Fizz` si múltiplo de 3, `Buzz` si de 5, `FizzBuzz` si ambos, si no muestra `n` (`elif`, un solo mensaje). <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
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

## Siguientes pasos — lección 5 y mini-proyecto

Dominas las **ramas**; la [lección 5 — bucles for y while](/python-boucles-for-while/) **repite** código (varios intentos en mayor o menor, recorrer una lista). Sigue con el [mini-juego en terminal](/es/python-mini-juego-terminal/) que combina `if`, `while` y `random`. Para la serie: [hub Python](/programmation/python/), [listas y cadenas](/python-listes-et-chaines/) (lección 7), [ahorcado](/programmation/pendu/) y [batalla naval](/programmation/bataille-navale/). Repasa la entrada: [lección 3](/es/python-tipos-y-entrada/).

## Amazon (afiliado)

Los precios en Amazon cambian; comprueba tarifa y edición antes de comprar.

- <a href="/go/az-es-4684743b04" rel="sponsored nofollow noopener" class="affiliate-link">Libros de proyectos y juegos Python en Amazon.es</a>

*Emmanuel Sauvage — actualizado el 31 de octubre de 2026.*
