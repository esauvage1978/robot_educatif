---
layout: ../../layouts/EsPost.astro
title: "Juego Python en terminal: mayor o menor (mini-proyecto)"
description: "Crear un juego Python « mayor o menor » en la terminal: random, while, input, try/except. Código completo, pruebas y variantes."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Cómo hacer un juego en Python para principiantes?"
    answer: "Basta un juego « mayor o menor » en la terminal: random.randint para el secreto, input para los intentos, while para repetir, try/except para entradas inválidas."
  - question: "¿Hace falta un robot para este tutorial de Python?"
    answer: "No. Este mini-proyecto se juega solo en la terminal. Basta un ordenador con Python 3."
---

¿Quieres un **juego en Python** sencillo, jugable al momento en la **terminal** (la ventana de texto donde lanzas `python`)? Este mini-proyecto « mayor o menor » repasa **`input`**, **`int`**, **`while`**, **`if` / `elif` / `else`**, **`random`** y **`try` / `except`** ([gestión de errores con try/except](/python-erreurs-debogage/)).

Guarda el script como `mayor_menor.py` y ejecuta:

```bash
python mayor_menor.py
```

![Ejemplo de partida en la terminal: propuestas 50 y 75, abc rechazado, victoria en 3 intentos](/images/lot2/python-plus-ou-moins-terminal.webp)

*Sesión de ejemplo en la terminal: el programa pide un número, responde demasiado bajo / demasiado alto, rechaza `abc` y anuncia la victoria en 3 intentos.*

**Recorrido.** Es la **lección 10** de la serie Python. Si lo necesitas, revisa [tipos y entrada](/es/python-tipos-y-entrada/) o [pathlib](/es/python-pathlib/). Visión completa: [curso de Python](/programmation/python/).

Algunos enlaces a libros más abajo son de afiliados. Comprueba el precio del día en la ficha.

## 1. Reglas del juego

- El ordenador elige un **número secreto** entre **1** y **100** (incluidos).
- Propones **enteros**; tras cada intento el programa responde **demasiado bajo**, **demasiado alto** o confirma la victoria.
- Al final muestra **cuántos intentos** han hecho falta.

## 2. Pasos de diseño (antes de codificarlo todo de golpe)

1. Sacar el secreto con **`random.randint(1, 100)`**.
2. Inicializar **`intentos = 0`**.
3. Bucle: leer una propuesta, **incrementar**, comparar, **`break`** al ganar.
4. Si la entrada no es un entero, **no tumbar el programa**: `except ValueError`, mensaje claro, `continue`.

## 3. Solución de referencia

```python
import random

secreto = random.randint(1, 100)
intentos = 0

while True:
    try:
        propuesta = int(input("Tu número (1-100)? "))
    except ValueError:
        print("Introduce un entero.")
        continue

    intentos += 1
    if propuesta < secreto:
        print("Demasiado bajo.")
    elif propuesta > secreto:
        print("Demasiado alto.")
    else:
        print(f"¡Ganado en {intentos} intento(s)!")
        break
```

### Ejemplo de sesión

```text
Tu número (1-100)? 50
Demasiado bajo.
Tu número (1-100)? 75
Demasiado alto.
Tu número (1-100)? abc
Introduce un entero.
Tu número (1-100)? 62
¡Ganado en 3 intento(s)!
```

## 4. Pruebas rápidas a mano

- Ganar en **un** intento: el contador muestra **1**.
- Escribir **`abc`**: mensaje, bucle **sin** fallo.
- Encadenar **demasiado bajo** y luego **demasiado alto**: seguir guiando.

## Ejercicios para ir más lejos

1. **Límite de intentos** (p. ej. **7**): al agotarse, muestra el **secreto** y « perdido ».
2. **Dos niveles**: rango **1–50** o **1–200**.
3. Guardar el **mejor marcador** en **`record.txt`** — ver [leer y escribir archivos de texto](/python-fichiers-texte/).
4. Mostrar una **pista** cada 5 intentos.
5. **Volver a jugar** con pregunta sí/no al final.

## Después de este recorrido

Más juegos de texto: [ahorcado](/programmation/pendu/), [batalla naval](/programmation/bataille-navale/), [cuatro en raya](/programmation/puissance-4/). Vuelve al [curso de Python](/programmation/python/).

Libros de ejercicios (enlaces de afiliado — Amazon.es):

- [Proyectos Python juegos](https://www.amazon.es/s?k=python+proyectos+juegos+libro&tag=roboteducat07-21)
- [Aprender Python 3 con ejercicios](https://www.amazon.es/s?k=python+3+aprender+ejercicios+libro&tag=roboteducat07-21)

*Autor: Emmanuel Sauvage · actualizado el 31 de octubre de 2026.*
