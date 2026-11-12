---
layout: ../../layouts/EsPost.astro
title: "Primeros pasos con mBlock 5: entender el entorno"
description: "mBlock 5 para empezar: escenario, objetos, paletas de bloques y conexión del robot. Guía paso a paso para niños y padres que abren su primer programa."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra. Consulta el precio del día en Amazon.es antes de comprar.

> **Respuesta directa (octubre 2026)** — **mBlock 5** es un entorno parecido a **Scratch** (programación con bloques de colores) más los bloques para robots Makeblock. Tras la [instalación](/es/instalar-mblock-5-windows/), añade tu dispositivo (por ejemplo un **mBot**), conéctalo por **USB** o **Bluetooth** (conexión inalámbrica) y elige después el **modo en vivo (Live)** (prueba inmediata mientras el cable o el Bluetooth estén activos) o **Cargar** (el programa se guarda en el robot). Bloqueos frecuentes: el modo equivocado o el **puerto COM** equivocado (el nombre que Windows da al cable USB serie); consulta la [solución de problemas Bluetooth](/es/mblock-bluetooth-solucion/).

¿Acabas de abrir **mBlock 5** y la ventana te parece llena de zonas misteriosas? Esta guía te muestra, con **capturas reales** de la interfaz, dónde están el **escenario**, los **objetos**, las **paletas de bloques** y la **conexión** del robot, antes de comprar nada y antes de escribir un programa largo.

**mBlock 5** es la aplicación de programación por bloques de Makeblock. Se parece a Scratch, pero está pensada para conectar robots (**mBot**, **mBot2**, Codey Rocky, **CyberPi**, etc.) además de animar objetos en la pantalla. Una vez [instalado mBlock](/es/instalar-mblock-5-windows/), oriéntate aquí y pasa después al [primer programa mBot](/es/primer-programa-mbot/).

## 1. Una pantalla «tipo Scratch» y un robot: qué permite mBlock

mBlock **no** está dividido en dos franjas en la ventana: es **un único** software, con **zonas** (escenario, scripts, paletas de bloques) que se parecen a Scratch.

**Del lado de la pantalla**, usas el **escenario**, los **objetos** (los personajes y elementos que animas, también llamados sprites) y los fondos como en Scratch: animar personajes, decorados y pequeños juegos. Todo se queda **dentro** de la ventana de mBlock.

**Del lado del robot**, no es «otra mitad» de la interfaz: una vez añadido un **dispositivo Makeblock** (mBot, etc.) y **conectado** por USB o Bluetooth, aparecen **bloques adicionales** para el hardware real: motores, LED, sensores, zumbador, etc. Mientras no hayas añadido ningún dispositivo, solo ves la parte de **objetos / escenario**; después de añadirlo, programas con los bloques **específicos del robot**, solos o **junto a** los objetos si el proyecto mezcla ambos (por ejemplo, una puntuación en pantalla mientras el robot avanza).

En la práctica: **sin robot**, te quedas con la animación en pantalla como en Scratch. **Con robot**, a menudo te concentras en los bloques del **dispositivo** y el escenario puede esperar. **Ambos** se pueden combinar también en un mismo proyecto.

## 2. Vista general de la ventana

![Vista general de la ventana de mBlock 5: barra de título, escenario, paletas, zona de scripts](/images/blog/premier-pas-mblock/mblock-vue-globale.png)

Si recorres la interfaz de izquierda a derecha y de arriba abajo, encontrarás normalmente:

1. **Barra de menús**: archivo, edición, ajustes, idioma, ayuda y, a veces, la cuenta de Makeblock.
2. **Escenario**: vista previa del proyecto visual (objetos, fondo).
3. **Controles bajo el escenario**: la **bandera verde** (inicio), **detener**, a veces **pantalla completa** y **tamaño de los bloques**.
4. **Zona de objetos / dispositivos**: pestañas para elegir **quién** se programa (un objeto, el robot…).
5. **Categorías de bloques**: columnas de colores (Movimiento, Apariencia, etc., más las categorías de **mBot** o de otro dispositivo una vez añadido).
6. **Zona de scripts**: el gran espacio central donde **encajas** los bloques para formar el programa.

Las etiquetas exactas pueden variar según el **idioma** y la **versión** de mBlock; la **lógica** de las zonas sigue siendo la misma.

## 3. El menú principal

![Barra de menús: Nuevo, Abrir, Guardar, idioma, tutorial](/images/blog/premier-pas-mblock/mblock-menu-principal.png)

Lo que conviene saber desde el principio:

- **Nuevo / Abrir / Guardar**: tus proyectos suelen ser archivos **.mblock** (acuérdate de guardar a menudo).
- **Idioma**: pasa la interfaz a **español** si hace falta, normalmente en las preferencias o en el menú.
- **Tutorial o ayuda en línea**: un atajo útil durante la primera semana.
- **Conexión / cuenta**: opcional según el uso; para manejar un robot lo esencial es la **conexión con el dispositivo** (ver más abajo), no necesariamente una cuenta en la nube.

## 4. El escenario y los controles de reproducción

![Escenario con un objeto, bandera verde, detener y ajuste del tamaño de los bloques](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

- **Escenario**: el «teatro» de los objetos. Coordenadas, tamaño, orden de las capas: la misma idea que en [scratch.mit.edu](https://scratch.mit.edu/).
- **Bandera verde**: inicia los scripts que empiezan con el bloque «al hacer clic en la bandera verde».
- **Botón detener**: lo para todo, imprescindible si un bucle no termina nunca.
- **Tamaño de los bloques**: agranda o reduce los bloques para los más pequeños o para las demostraciones con proyector.

## 5. Objetos, dispositivos y las tres pestañas

![Pestañas Dispositivo, Objeto (sprites) y Fondo](/images/blog/premier-pas-mblock/mblock-onglets-lutins-appareil.png)

Bajo o junto al escenario, la zona que gestiona **quién** está seleccionado suele tener tres pestañas:

| Pestaña | Uso |
|--------|--------|
| **Dispositivo** | Añadir un robot Makeblock (mBot, etc.), **conectarlo** (USB / Bluetooth) y usar después sus **bloques** específicos. |
| **Objeto** (sprites) | Elegir el objeto activo, crear o importar uno; su posición en el escenario. |
| **Fondo** | Elegir o importar el decorado del escenario. |

Para el [mBot](/es/mbot-mi-primer-robot-educativo/), empieza **añadiendo el dispositivo** y [instala después los bloques mBot](/es/instalar-bloques-mbot/) si la paleta no aparece. La conexión por **USB** es la más sencilla para resolver problemas; el **Bluetooth** es práctico por ser inalámbrico, pero más sensible a las interferencias: consulta la [solución de problemas Bluetooth](/es/mblock-bluetooth-solucion/).

## 6. Categorías de bloques y color

![Columna de categorías y paleta de bloques del objeto o dispositivo seleccionado](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

- Las **categorías** agrupan los bloques por tema: movimiento, apariencia, sonido, control, sensores, etc.
- Los bloques **del robot** solo aparecen cuando el **dispositivo** correspondiente está **añadido** y **seleccionado**.
- La categoría **«Mis bloques»** (o equivalente) sirve para crear **tus propios** bloques a partir de scripts reutilizables, útil más adelante para organizar proyectos grandes.

Los **colores** ayudan a encontrar rápidamente una familia de comandos. No son solo decorativos: son una **referencia visual** en clase.

## 7. La zona de scripts

![Zona de scripts con bloques encajados](/images/blog/premier-pas-mblock/mblock-zone-script.png)

Aquí es donde **construyes** el programa:

- Los bloques **encajan** como piezas de puzle; solo algunos ensamblajes son válidos (formas compatibles).
- La ejecución sigue normalmente el **flujo de arriba abajo** en una pila de bloques (salvo que uses estructuras de control más avanzadas).
- Puedes tener **varios scripts** en paralelo (varias pilas que arrancan con eventos distintos).

**Consejo:** empieza siempre con un bloque **desencadenante** (bandera verde, tecla, mensaje, evento del robot…) para saber **cuándo** arranca el programa.

## 8. Modo Python (visión general)

En algunas versiones y dispositivos, mBlock ofrece un paso a **Python** (un lenguaje de programación de texto). No hace falta para los primeros pasos con bloques; es la continuación lógica cuando la sintaxis de texto se convierte en un objetivo, como con [mBot2](/es/mbot-vs-mbot2/) o [CyberPi](/es/makeblock-cyberpi-resumen/). Para saber cuándo abrir el editor de Python, lee [qué software mBlock elegir](/es/software-mblock-cual-elegir/).

## Material compatible (después de entender la interfaz)

Cuando el entorno está claro, aquí tienes dos robots que se usan a menudo con mBlock 5. Los rangos de precio cambian: consulta la ficha del día. **IoT** significa aquí «objetos conectados» (proyectos que pasan por la red Wi‑Fi, por ejemplo).

- **Makeblock mBot2** — 10–14 años · Scratch y Python · placa CyberPi con pantalla en color · Wi‑Fi y proyectos conectados · muy adecuado para aprender mBlock 5. [Amazon.es](https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21)
- **Makeblock CyberPi** — desde 10 años · Scratch y Python · placa programable versátil con pantalla integrada, Wi‑Fi y varios sensores · solo la placa, útil para proyectos conectados con mBlock. [Amazon.es](https://www.amazon.es/dp/B0BBZY9L59?tag=roboteducat07-21)

## 9. Conexión con el robot: qué comprobar

Antes de hacer clic en «conectar»:

1. El **robot está encendido** y la **batería** o las pilas son suficientes.
2. El **cable USB** está bien conectado *o* el **Bluetooth** está emparejado en Windows (consulta [software: app o Web](/es/software-mblock-cual-elegir/)).
3. En mBlock, el **dispositivo correcto** está seleccionado en la lista (evita confundir dos robots idénticos en clase).

Después, según el modo:

- **Ejecución en vivo**: el programa funciona **mientras** el enlace con el PC esté activo (útil para probar).
- **Carga**: el programa se **guarda en el robot** para que funcione **sin** el cable, como se explica en el [primer programa mBot](/es/primer-programa-mbot/).

## 10. Mini-FAQ

### ¿mBlock 5 y Scratch en línea son lo mismo?

**Casi**, en la parte de objetos / escenario. La diferencia principal es el **hardware Makeblock**: controladores, bloques de robots, actualización del **firmware** (el software interno del robot). Para Scratch puro sin robot basta el sitio oficial; para un **mBot**, mBlock es la herramienta adecuada.

### No veo los bloques de mi robot

Añade primero el **dispositivo** en la pestaña correspondiente y comprueba después el [procedimiento de la extensión mBot](/es/instalar-bloques-mbot/). Sin un dispositivo reconocido, los bloques específicos no aparecen.

### La interfaz está en otro idioma

Busca **Language** / **Preferencias** / **Ajustes** en el menú (la ubicación varía según la versión) y elige **Español**.

### mBlock se cierra en el primer arranque

Actualiza **Windows**, **mBlock** y los **controladores**; prueba una vez como **administrador**; si un antivirus lo bloquea, consulta la FAQ del [artículo de instalación](/es/instalar-mblock-5-windows/).

### ¿Qué es un «programa mblock»?

En mBlock, un **programa** es el **script de bloques** (una o varias pilas) que montas en la **zona de scripts**, a menudo guardado en un archivo de proyecto **`.mblock`**. Para ver un ejemplo con un **robot mBot**, sigue el [primer programa mBot](/es/primer-programa-mbot/).

### ¿«mBlock 5 web» y la aplicación instalada hacen lo mismo?

La **interfaz** (escenario, bloques, zona de scripts) se parece entre **[mBlock en línea](https://ide.mblock.cc/)** y la **aplicación de escritorio**. En cambio, la **conexión del robot**, el **Bluetooth** y la **carga** suelen ser **más fiables** en la aplicación: detalles en [Qué software mBlock](/es/software-mblock-cual-elegir/).

---

## Enlaces Amazon (afiliación)

- [Makeblock mBot](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)

*Enlaces de afiliados Amazon.es — comisión posible en compras elegibles.*

---

**Siguiente paso:** continúa con la [instalación de los bloques mBot](/es/instalar-bloques-mbot/) si hace falta y después con el [primer programa mBot](/es/primer-programa-mbot/) para unir **interfaz**, **conexión** y **carga**.

**También puedes leer**: [¿mBlock o Scratch?](/es/mblock-vs-scratch/)

*Autor: Emmanuel Sauvage.*
