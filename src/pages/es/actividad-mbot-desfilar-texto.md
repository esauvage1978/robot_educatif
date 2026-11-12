---
layout: ../../layouts/EsPost.astro
title: "Actividad mBot: hacer desfilar un texto en la matriz LED"
description: "Hacer desfilar un mensaje en la matriz LED del mBot: posición X, bucles, regla longitud×5+15. Esquemas del programa."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti.

En el **mBot**, la **matriz LED** (a menudo **5 columnas × 8 filas**) permite mostrar letras y símbolos. Para dar la ilusión de un **banner que desfila**, no «haces girar los píxeles» a mano: **muestras el mismo texto** varias veces por segundo, pero cada vez cambias su **posición horizontal** (a menudo llamada **`X`** en mBlock).

Al final de esta actividad tendrás una **lógica reutilizable** para mostrar cualquier mensaje, varias veces, en otros proyectos.

---

## 1. Requisitos previos

- Un [robot mBot (Makeblock)](/es/mbot-mi-primer-robot-educativo/).
- [mBlock 5](/es/instalar-mblock-5-windows/) y un primer [manejo de la interfaz](/es/primeros-pasos-mblock-5/).
- Los [bloques del mBot](/es/instalar-bloques-mbot/) (LED matrix, LEDs, etc.).
- Saber **cargar** un programa en la placa: [primer programa mBot](/es/primer-programa-mbot/).

Los **nombres exactos** de los bloques pueden variar según el **idioma** y la **versión** de mBlock; la **idea** (variable `X`, bucle, temporización) se mantiene.

---

## 2. Entender la matriz antes de programar

### 2.1 Una ventana móvil sobre el mensaje

Imagina el texto como una **cinta** más ancha que la pantalla. La matriz solo muestra una **ventana** de unas columnas. Al **desplazar** la cinta hacia la izquierda (o al desplazar la posición de visualización), haces **desfilar** las letras.

```text
     matriz (5 columnas visibles)
          ┌─────┐
cinta  … H e l l o  w o r l d …  →  deslizamos la cinta
          └─────┘
```

Para ver qué ocurre «de verdad», aquí hay una foto/captura en el robot con una visualización simple:

![Foto: una palabra en la matriz LED](/capture/activite-mbot-faire-defiler-un-texte/2.1/photo_affichage_hel.webp)

Y la captura del programa correspondiente (actividad 2.1):

![Imagen de la primera actividad de visualización de texto](/capture/activite-mbot-faire-defiler-un-texte/2.1/premiere-activite-affichage-texte.png)

Programa mBlock: [`afficher_1_mot.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.1/afficher_1_mot.mblock) («mostrar una palabra»).

### 2.2 El papel de la variable `X`

En mBlock, un bloque del tipo **«mostrar el texto en la posición X»** (el texto puede variar) coloca el **inicio** del texto en una abscisa `X` en la matriz.

- Si quieres el vínculo con la programación «texto» en **Arduino C**, `X` es una **variable** clásica: le das un tipo (a menudo `int`) y modificas su valor a lo largo de los bucles. Ver: [Arduino C — tipos y variables](/c-arduino-types-variables/).

- **`X` grande**: el texto empieza **a la derecha**; una parte puede quedar **fuera de pantalla** (invisible).
- **`X` disminuye**: el texto se desplaza hacia la **izquierda** → efecto de **desfile**.

Esquema lógico de **una sola imagen** en pantalla:

```text
posición X (esquemática)
  X pequeño  →  inicio de la palabra visible a la izquierda
  X medio    →  palabra centrada o parcialmente visible
  X grande   →  palabra empujada a la derecha / fuera de campo
```

Conclusión: **para desfilar, hay que hacer variar `X`** (a menudo disminuyéndolo poco a poco en un bucle).

---

## 3. Primer paso: visualización fija (texto truncado)

**Objetivo**: mostrar **«Hello»** para ver cómo reacciona la matriz.

Estructura lógica mínima:

```text
┌─────────────────────────────┐
│  Al arrancar el mBot           │
│    mostrar texto "Hello"        │
│    (en una posición X fija)           │
└─────────────────────────────┘
```

Tras la **carga**, a menudo constatas que **solo aparecen las primeras letras** (las demás salen de la zona visible). Es normal: la matriz es **estrecha**.

- Al empujar **`X`** (p. ej. hacia **10** o **15**), puedes **ocultar** el inicio de la palabra o hacerla **entrar** por la derecha.

Aquí la misma palabra, pero con un desfase `X` distinto (ejemplo `X = 10`):

![Foto: un solo carácter cuando X vale 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/photo_affichage_h.jpeg)

Captura del programa (actividad 2.2):

![Imagen de la actividad de visualización cuando X vale 10](/capture/activite-mbot-faire-defiler-un-texte/2.2/activite-affichage-texte-x-vaut-10.png)

Programa mBlock: [`afficher_1_mot_x_vaut_10.mblock`](/capture/activite-mbot-faire-defiler-un-texte/2.2/afficher_1_mot_x_vaut_10.mblock) («mostrar una palabra, X = 10»).

**Idea a retener**: la visualización estática **demuestra** el vínculo entre **`X`** y lo que ve el ojo. El desfile será **la misma operación**, repetida con **`X` que cambia**.

---

## 4. Segundo paso: un bucle que mueve `X`

**Objetivo**: **repetir**: mostrar el texto en la posición actual, **disminuir `X`**, esperar un poco — para crear el movimiento.

### 4.1 Preparar la salida

- Crear una variable **`X`**.
- Al principio, poner **`X = 15`** (valor típico para empezar **fuera de campo a la derecha** y dejar que el mensaje **entre**). Ajústalo según tu texto.

### 4.2 Bucle de desfile (una pasada)

Estructura lógica:

```text
┌──────────────────────────────────────────┐
│  Al arrancar                                 │
│    X ← 15                                 │
│    ┌────────────────────────────────────┐ │
│    │  Repetir indefinidamente *                   │ │
│    │    mostrar texto en la posición X         │ │
│    │    X ← X − 1                        │ │
│    │    esperar 0,1 s                       │ │
│    └────────────────────────────────────┘ │
└──────────────────────────────────────────┘

* O «para siempre» según los bloques disponibles
```

Flujo detallado (una iteración):

```text
   ┌──────────────┐
   │  Mostrar     │
   │  texto en X   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  X ← X − 1   │
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  Esperar     │
   │  0,1 s       │
   └──────┬───────┘
          │
          └──────► (vuelta al inicio del bucle)
```

La **temporización** (a menudo **0,1 s**) es indispensable: sin ella, el desfile sería demasiado rápido para leer.

Captura local (punto 4):

![Desfile: bucle que disminuye X](/capture/activite-mbot-faire-defiler-un-texte/4/defilement-boucle-diminue-x.png)

Programa mBlock: [`boucle.mblock`](/capture/activite-mbot-faire-defiler-un-texte/4/boucle.mblock) («bucle»).

### 4.3 Límite de esta versión

- El programa puede **seguir indefinidamente** cuando el texto ya ha **salido** de la pantalla.
- A menudo quieres **encadenar** una **nueva pasada** (o **varias repeticiones** del mensaje) de forma limpia.

→ De ahí el **tercer paso**: **acotar** el bucle interior y **envolverlo** en un bucle de **repeticiones**.

---

## 5. Tercer paso: varias pasadas (doble bucle)

**Objetivo**: hacer desfilar el **mismo mensaje varias veces**, con un final claro para cada pasada.

### 5.1 Dos niveles de bucles

Estructura lógica **visión de conjunto**:

```text
┌─────────────────────────────────────────────────────┐
│  Al arrancar                                            │
│    ┌──────────────────────────────────────────────┐ │
│    │  Por cada visualización del mensaje (p. ej. 3×)      │ │  ← bucle EXTERIOR
│    │    X ← 15                                      │ │
│    │    ┌────────────────────────────────────────┐ │ │
│    │    │  Durante un número fijo de pasos              │ │ │  ← bucle INTERIOR
│    │    │    show texto en X                         │ │ │
│    │    │    X ← X − 1                              │ │ │
│    │    │    esperar 0,1 s                             │ │ │
│    │    └────────────────────────────────────────┘ │ │
│    └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

Esquema **anidado** (representación «cajas»):

```text
 +-- repetir N veces (mensaje entero) ---------------+
 |                                                   |
 |   X ← 15                                          |
 |   +-- repetir (longitud × 5 + 15) veces ------------+  |
 |   |      mostrar ; X←X-1 ; esperar                    |  |
 |   +---------------------------------------------+  |
 +---------------------------------------------------+
```

### 5.2 ¿Cuántos pasos para el bucle interior?

Para que el encadenamiento entre dos pasadas no sea ni demasiado largo ni demasiado corto, se usa a menudo:

```text
numero_de_pasos = longitud_texto * 5 + 15
```

Ejemplo: para el mensaje `Hola` (4 caracteres) se obtienen `4 * 5 + 15 = 35` pasos en el bucle interior. Así el texto tiene tiempo de entrar por la derecha, desfilar y salir por completo por la izquierda antes de la siguiente pasada.

- **`longitud_texto`**: número de caracteres del mensaje (al principio, **sin contar acentos** si tu visualización los ignora — ver el apartado 7).
- **× 5**: en la práctica, cada carácter «ancho» en la matriz corresponde a unas **5 columnas** de ancho en la tipografía que usa mBlock para esta matriz — una **aproximación útil** para un taller, no una ley física.
- **`+ 15`**: margen para **sacar** el texto **por completo** a la izquierda tras haberlo hecho entrar por la derecha (el mismo margen que ya usabas con el **`X` inicial**).

Puedes guardar **`longitud_texto`** en una variable para que el programa sea **legible**.

Captura local (paso 5.2):

![Tres repeticiones del desfile (doble bucle)](/capture/activite-mbot-faire-defiler-un-texte/5.2/trois-repetitions-defilement.png)

Programa mBlock: [`defiler52.mblock`](/capture/activite-mbot-faire-defiler-un-texte/5.2/defiler52.mblock) («desfile 5.2»).

### 5.2 bis DRY: no escribir dos veces la misma info

En este ejemplo, he hecho a propósito **no escribir dos veces** el texto a mostrar (una para calcular la longitud, luego una para mostrarlo).

Es un buen hábito de programación llamado **DRY** (*Don't Repeat Yourself* = **no repetirte**):

- **no repitas** la misma información en varios sitios;
- si no, el día que cambies el mensaje, puedes olvidar una aparición y tener un programa **incoherente**.

Aquí la idea DRY es: **una sola fuente** para el mensaje (una variable), luego reutilizar esa variable:

- para calcular `longitud_texto`;
- para mostrar el mensaje en la matriz.

Así, si cambias el texto de la variable, la longitud y el desfile se actualizan juntos. Es el mismo principio que usarás más adelante en Arduino C: una función o una constante en lugar de copiar el valor.

### 5.2 ter Bug mBlock: variable en `float` pero mensaje en texto

Por defecto, el código generado por mBlock declara a menudo las variables en `float`. Está bien para números (posición `X`, contador, etc.), pero **no** para una cadena como `"Mi nuevo mensaje"`.

Si haces:

```cpp
texte = "Mi nuevo mensaje";
```

mientras `texte` está declarado en `float`, la carga puede fallar (captura abajo):

![Error de carga: variable float usada como texto](/capture/activite-mbot-faire-defiler-un-texte/5.2/erreur_televersement.png)

Ejemplo de código que provoca el error. Los nombres de las variables vienen del proyecto mBlock de las capturas (`texte` = texto, `longueur_texte` = longitud del texto, `taille_ecran` = ancho de pantalla, `nombre_de_repetition` = número de repeticiones); puedes llamar a las tuyas como prefieras.

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
float texte = 0;
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "Mi nuevo mensaje";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

### 5.2 quater Corrección: cambiar el tipo de `texte`

La corrección consiste en declarar `texte` como **cadena**.

#### Pasos en mBlock (importante)

1. Ir a `</>` → **Vista previa Arduino C** (solo lectura).
2. **Copiar** el código.
3. Ir a la pestaña **Arduino C** (esta está hecha para editarse).
4. **Pegar** el código y luego reemplazar la declaración de `texte`.

Versión corregida:

```cpp
// generated by mBlock5 for mBot
// codes make you happy

#include <MeMCore.h>
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>

MeLEDMatrix ledMtx_1(1);

float x = 0;
const char* texte = "";
float longueur_texte = 0;
float nombre_de_repetition = 0;
float i = 0;
float j = 0;
float taille_ecran = 0;

void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

void setup() {
  ledMtx_1.setColorIndex(1);
  ledMtx_1.setBrightness(6);
  texte = "Mi nuevo mensaje";
  longueur_texte = String(texte).length();
  taille_ecran = 15;
  nombre_de_repetition = 3;
  for(int i=0;i<(int)ceil(nombre_de_repetition);i+=1){
    x = taille_ecran;
    for(int count=0;count<int((longueur_texte * 5 + taille_ecran));count++){

      ledMtx_1.drawStr(x, 0 + 7, String(texte).c_str());
      x += -1;
      _delay(0.1);
    }

  }

}

void _loop() {
}

void loop() {
  _loop();
}
```

> Nota: en un mBot/mCore, `const char*` suele ser más «ligero» que `String` como variable global. Aquí usamos `String(texte)` solo para obtener la longitud y para dar un `c_str()` a la visualización.

---

## 6. Trampa frecuente: acentos y caracteres especiales

Los caracteres **acentuados** suelen estar **mal soportados** o ser **invisibles** según la versión / el modo de visualización. Para un taller:

- prueba primero con **`HELLO`**, **`MBOT`**, **`SALUT`**;
- si debes mostrar texto en español, prevé **sin acentos** o una **abreviatura**, hasta validar en tu versión de mBlock.

---

## 7. Resumen: cadena pedagógica

```text
visualización fija (entender X y el truncado)
        │
        ▼
un bucle: X disminuye → desfile continuo
        │
        ▼
dos bucles: N pasadas limpias + pasos ≈ longitud×5+15
        │
        ▼
sabes hacer desfilar un mensaje y repetirlo limpiamente
```

Ya puedes usar este «motor de desfile» en tus proyectos (mostrar una puntuación, una consigna, una distancia…), copiando la lógica cuando la necesites.

---

## 8. Para ir más lejos

- Continúa con [medir distancias](/es/actividad-mbot-medir-distancias/) para mostrar un valor dinámico.
- Variar la **velocidad** (`esperar 0,05` vs `0,2`) y observar la **legibilidad**.
- Discutir en clase: **¿cuántas columnas** por carácter si se mide en una captura? (vínculo con **píxel** y **tipografía**).

[mBot — Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)
