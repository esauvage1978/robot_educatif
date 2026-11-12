---
layout: ../../layouts/EsPost.astro
title: "Python 3 input: tipos y pedir un valor (lección 3)"
description: "Python input y tipos: int, float, str, bool, conversiones, strip(). 20 ejercicios con soluciones para pedir un valor por teclado."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Cómo pedir un valor en Python 3?"
    answer: "Usa input(\"mensaje\"). Siempre devuelve una cadena (str). Luego convierte con int() o float() si necesitas calcular."
  - question: "¿Por qué input() devuelve texto y no un número?"
    answer: "Porque el teclado envía caracteres. \"12\" es texto; int(\"12\") da el número 12 para calcular."
---

Ya sabes mostrar variables ([lección 2 — variables y print](/python-variables-affichage/)). Aquí el programa **reacciona** al teclado. En **Python 3**, todo pasa por **`input()`**: **pide un valor**, espera Intro y **siempre** devuelve una cadena (`str`). Convertir bien a `int` o `float` es indispensable antes de las [condiciones e if/else](/python-conditions-if-else/) y de proyectos como [mayor o menor](/es/python-mini-juego-terminal/).

**Lección 3** del recorrido Python. No hace falta un robot: basta la terminal o la consola del editor.

![Consola: input() devuelve str, luego int() para calcular](/images/lot2/python-input-console.webp)

*Sesión en consola: `input()` devuelve una cadena de texto y luego `int()` la convierte en número para calcular.*

## 1. Los tipos más útiles al principio

Python manipula valores de **tipos** distintos. Los cuatro primeros a dominar:

| Tipo    | Rol breve               | Ejemplos         |
|---------|-------------------------|------------------|
| `int`   | entero                  | `42`, `-3`, `0`  |
| `float` | número decimal          | `3.14`, `2.0`    |
| `str`   | texto                   | `"hola"`, `'x'`  |
| `bool`  | verdadero / falso       | `True`, `False`  |

Para **inspeccionar** el tipo mientras aprendes:

```python
x = 10
y = "10"
print(type(x), type(y))  # <class 'int'> <class 'str'>
```

## 2. Conversiones explícitas

- **`int("42")`** → `42`. Falla con `"3.5"` o `"doce"` → **`ValueError`**.
- **`float("3.5")`** o **`float("2")`** → número decimal.
- **`str(2026)`** → `"2026"` (para concatenar o construir un mensaje).

Regla práctica: en cuanto quieras **calcular** a partir de una entrada, convierte después de `input()`.

## 3. `input()`: siempre texto

```python
respuesta = input("¿Un entero? ")
n = int(respuesta)
print(f"El siguiente es {n + 1}")
```

Los espacios antes/después al teclear suelen molestar. Muchos scripts empiezan por:

```python
texto = input("¿Ciudad? ").strip()
```

`strip()` quita los espacios (y saltos de línea invisibles) al inicio y al final de la cadena.

## 4. `bool` y comparaciones (avance)

Las comparaciones (`==`, `<`, …) ya producen un booleano. También puedes escribir `bool(0)` → `False`, `bool(1)` → `True` (los detalles vendrán con la práctica de los `if`).

## 5. Trampa clásica: mezclar texto y cálculo

`"3" + "5"` da `"35"`. Para una suma:

```python
a = int(input("¿Primer número? "))
b = int(input("¿Segundo número? "))
print(a + b)
```

Si el usuario introduce `3.5` cuando esperabas un `int`, **`int()`** lanza un error: la [lección 9 — errores y depuración](/python-erreurs-debogage/) muestra cómo gestionarlo con `try` / `except`.

## Ejercicios (20)

Los ejercicios asumen que **ejecutas el script** y tecleas los valores pedidos en la consola. Las **soluciones** están ocultas por defecto: abre **Mostrar la solución** para comparar.

### Nivel sencillo

**Ejercicio 1** — Muestra con `print` los resultados de `type(7)` y `type("7")` (dos valores en una línea o dos `print`). <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">print(type(7), type("7"))</code></pre>
</div>
</details>

**Ejercicio 2** — Pide un texto con `input("¿Tu nombre? ")` (sin conversión), guárdalo en `nombre`, luego muestra `Hola` seguido de una coma y `nombre` con **un solo** `print` y comas. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombre = input("¿Tu nombre? ")
print("Hola,", nombre)</code></pre>
</div>
</details>

**Ejercicio 3** — Pide una frase con `input()`, encadena `.strip()` en la misma línea que `input`, muestra la cadena limpia en un mensaje `Has escrito: ...`. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">frase = input("Una frase: ").strip()
print(f"Has escrito: {frase}")</code></pre>
</div>
</details>

**Ejercicio 4** — Crea `s = "15"`, convierte a entero con `int(s)`, muestra el resultado y su `type(...)`. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "15"
n = int(s)
print(n, type(n))</code></pre>
</div>
</details>

**Ejercicio 5** — Crea `t = "2.5"`, convierte a `float`, muestra el valor multiplicado por `2` (sin f-string: un solo `print` con coma basta). <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">t = "2.5"
x = float(t)
print(x * 2)</code></pre>
</div>
</details>

**Ejercicio 6** — Con `n = 2026`, muestra la cadena `"Año: "` seguida de `str(n)` usando **concatenación** con `+`. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = 2026
print("Año: " + str(n))</code></pre>
</div>
</details>

**Ejercicio 7** — Pide **dos** cadenas con dos `input()` (`palabra1`, `palabra2`) y muestra su **concatenación directa** (sin espacio), para mostrar la trampa `"3"` + `"5"` → `"35"`. <span class="exo-badge exo-badge--simple">Sencillo</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">palabra1 = input("Primera palabra: ")
palabra2 = input("Segunda palabra: ")
print(palabra1 + palabra2)</code></pre>
</div>
</details>

### Nivel intermedio

**Ejercicio 8** — Pide un **entero** con `input`, convierte con `int`, muestra `El siguiente es` seguido de `n + 1` (f-string). <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("¿Un entero? "))
print(f"El siguiente es {n + 1}")</code></pre>
</div>
</details>

**Ejercicio 9** — Pide un número **decimal** (`float`), muestra su **doble** con una f-string. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("¿Un número decimal? "))
print(f"Doble: {x * 2}")</code></pre>
</div>
</details>

**Ejercicio 10** — Pide **dos enteros**, muestra su **suma** y su **producto** en **dos líneas**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("¿Primer entero? "))
b = int(input("¿Segundo entero? "))
print(f"Suma: {a + b}")
print(f"Producto: {a * b}")</code></pre>
</div>
</details>

**Ejercicio 11** — Pide un **nombre** (cadena) y una **edad** (`int`), luego muestra `… tiene … años` con una f-string. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombre = input("¿Nombre? ")
edad = int(input("¿Edad? "))
print(f"{nombre} tiene {edad} años")</code></pre>
</div>
</details>

**Ejercicio 12** — Pide una temperatura en **°C** en `float`, calcula **°F** con `f = c * 9 / 5 + 32` y muestra el resultado redondeado a **1** decimal con `round(f, 1)`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">c = float(input("¿Temperatura °C? "))
f = c * 9 / 5 + 32
print(f"En °F: {round(f, 1)}")</code></pre>
</div>
</details>

**Ejercicio 13** — Pide una cadena (sin convertirla a número), muestra su **longitud** con `len(...)`. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">texto = input("Una palabra o una frase: ")
print(len(texto))</code></pre>
</div>
</details>

**Ejercicio 14** — Lee en el código una cadena que representa un decimal (`s = "12.5"`), convierte a `float`, muestra el **triple**. <span class="exo-badge exo-badge--inter">Intermedio</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">s = "12.5"
x = float(s)
print(x * 3)</code></pre>
</div>
</details>

### Nivel difícil

**Ejercicio 15** — Pide **tres enteros** seguidos, calcula la **suma** y la **media** `(a+b+c)/3`, muestra ambas con f-strings. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = int(input("¿a? "))
b = int(input("¿b? "))
c = int(input("¿c? "))
suma = a + b + c
media = suma / 3
print(f"Suma: {suma}")
print(f"Media: {media}")</code></pre>
</div>
</details>

**Ejercicio 16** — Pide un `float`, luego muestra el valor **redondeado a 2 decimales** usando `round(x, 2)` **dentro** de una f-string. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">x = float(input("¿Número? "))
print(f"Valor redondeado (2 dec.): {round(x, 2)}")</code></pre>
</div>
</details>

**Ejercicio 17** — Pide una cadena, aplica `.strip()`, convierte a `int`, luego muestra el **cuadrado** `n * n` con una f-string. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">n = int(input("Un entero (espacios permitidos): ").strip())
print(f"Cuadrado: {n * n}")</code></pre>
</div>
</details>

**Ejercicio 18** — Pide **dos** números en `float`, calcula y muestra la **media** `(a+b)/2` con un mensaje claro. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">a = float(input("¿Primer número? "))
b = float(input("¿Segundo número? "))
m = (a + b) / 2
print(f"Media: {m}")</code></pre>
</div>
</details>

**Ejercicio 19** — Pide un **año de nacimiento** y el **año actual** en enteros (`int`), calcula una **edad** aproximada `actual - nacimiento` y muéstrala (sin gestionar el día del calendario: simplificado a propósito). <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nacimiento = int(input("¿Año de nacimiento? "))
actual = int(input("¿Año actual? "))
edad = actual - nacimiento
print(f"Edad aproximada: {edad} años")</code></pre>
</div>
</details>

**Ejercicio 20** — Encadena: `input` del **nombre** con `.strip()`, `input` de una **altura** en metros en `float`, luego una **f-string** en **una línea** del tipo `Paul mide unos 1.72 m`. <span class="exo-badge exo-badge--hard">Difícil</span>

<details class="exercise-solution">
<summary class="exercise-solution__summary">Mostrar la solución</summary>
<div class="exercise-solution__body">
<pre class="exercise-solution__pre"><code class="language-python">nombre = input("¿Nombre? ").strip()
altura = float(input("¿Altura en m? "))
print(f"{nombre} mide unos {altura} m")</code></pre>
</div>
</details>

## Continuación del recorrido

La [lección 4 — condiciones e if/else](/python-conditions-if-else/) usa estas conversiones para **probar** valores: par / impar, menús, notas, etc. Práctica: [mini-proyecto mayor o menor](/es/python-mini-juego-terminal/). Para los archivos: [pathlib: rutas y archivos](/es/python-pathlib/).

## Amazon (afiliado)

- [Ejercicios y problemas Python](https://www.amazon.es/s?k=ejercicios+python+libro&tag=roboteducat07-21) — consulta el precio actual en el anuncio.
