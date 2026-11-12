---
layout: ../../layouts/EsPost.astro
title: "Conecta 4 en Python: seis capítulos en la terminal"
description: "Conecta 4 en la terminal: tablero 6×7, gravedad, turnos, cuatro en línea, tablas y una partida contra un rival que elige al azar."
updated: "11 November 2026"
---

El archivo descargable es el mismo que en la página francesa, así que los mensajes siguen en francés.

Dos jugadores dejan caer fichas en las columnas. Gana quien alinea cuatro. El juego se escribe en Python 3, en la terminal, sin Pygame y sin bibliotecas extra.

Hacen falta las listas, los bucles `for` y `while`, y `if`. La serie tiene seis capítulos. Cada uno termina con un script que se puede ejecutar, y el siguiente parte de ese script.

Los mensajes de los archivos están en francés (`Grille`, `Colonne`, `Ton choix`). El Python es el mismo en todos los idiomas. Las imágenes de los capítulos 1 y 6 muestran esa salida en francés.

Cuenta de 20 a 40 minutos por capítulo. Al final del capítulo 6 se juega entre dos personas, o una persona contra un rival que elige al azar una columna aún libre. Ese rival no anticipa jugadas.

## Los seis capítulos

1. [El tablero 6×7](/es/conecta-4-python-1-tablero/): casillas vacías, jugadores 1 y 2, y por qué la fila 0 está arriba.
2. [Pantalla y gravedad](/es/conecta-4-python-2-gravedad/): imprimir el tablero y dejar caer la ficha en la casilla libre más baja.
3. [Turnos](/es/conecta-4-python-3-turnos/): leer una columna y cambiar de jugador solo después de una jugada válida.
4. [Cuatro en línea](/es/conecta-4-python-4-cuatro-en-linea/): contar en cuatro direcciones desde la última ficha.
5. [Tablas](/es/conecta-4-python-5-tablas/): tablero lleno, y por qué la victoria se comprueba antes.
6. [La partida completa](/es/conecta-4-python-6-partida-completa/): menú, salir con `q` y rival aleatorio.

## Comprobación

`python puissance4_chapitre_01.py` debe indicar un tablero 6×7, la última fila `[0, 0, 0, 1, 0, 0, 0]` y `False` si el tablero no está lleno. Otra fila significa que la ficha de prueba no está en la columna de índice 3.

