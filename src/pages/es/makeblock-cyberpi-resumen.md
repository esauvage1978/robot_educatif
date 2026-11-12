---
layout: ../../layouts/EsPost.astro
title: "CyberPi de Makeblock: opinión y tutorial de Python para empezar"
description: "Opinión sobre la CyberPi de Makeblock, una placa programable con pantalla y sensores: puntos fuertes, límites, seguridad de la batería y primer programa en Python con mBlock."
updated: "31 de octubre de 2026"
---

¿Has oído hablar de la **CyberPi** de [Makeblock](/es/marca-makeblock/) y te preguntas qué se puede hacer realmente con esta pequeña placa transparente con pantalla? Interesa a los estudiantes curiosos de secundaria, a los profesores de tecnología y a los padres que quieren ir un poco más allá del simple videojuego. En este artículo te decimos a quién le conviene, qué hace bien, qué no hace y, a continuación, te guiamos paso a paso para escribir tu primer programa en **Python**, un lenguaje de programación muy utilizado que se escribe con texto, a diferencia de los bloques de colores que se ensamblan con el ratón.

## ¿Qué es la CyberPi?

La CyberPi es una **placa de desarrollo**: una pequeña placa electrónica que se programa para que reaccione a lo que percibe y a lo que se le pide. Se puede ver como el cerebro de un proyecto, al que luego se añaden motores, luces o sensores. Es el cerebro que Makeblock incluye también en el robot [mBot2](/es/mbot-vs-mbot2/), pero la placa existe también sola, sin ruedas, para proyectos que se quedan sobre la mesa.

![La CyberPi de Makeblock en el kit CyberPi Go: placa con carcasa translúcida, pantalla a color y joystick, extensión Pocket Shield, cable USB-C y manual](/images/products/cyberpi.webp)

*La CyberPi en el kit CyberPi Go de Makeblock: la placa, la extensión Pocket Shield, el cable USB-C y el manual. Imagen: Makeblock.*

En la propia placa hay lo necesario para interactuar sin conectar nada:

- una **pantalla a color** de 1,44 pulgadas (unos 3,7 centímetros de diagonal), de 128 puntos por 128;
- un **joystick** y botones para jugar o navegar por los menús;
- un **altavoz** y un **micrófono**;
- un **sensor de luz** y un **giroscopio**, que mide las rotaciones y la inclinación de la placa, como en un teléfono;
- **luces de colores** programables (LED).

El cerebro de la placa es un chip de la familia **ESP32**, muy extendido entre los aficionados a la electrónica y capaz de conectarse sin cables. El contenido exacto del kit varía según la oferta: algunas tiendas venden la placa sola, otras kits con la extensión Pocket Shield u otros accesorios. Comprueba la lista exacta antes de pedir.

## Wi-Fi y Bluetooth: ¿para qué sirven en la práctica?

El **Wi-Fi** conecta la placa a tu red doméstica y, por tanto, a Internet. Permite, por ejemplo, recuperar una información en línea o enviar un mensaje desde un proyecto. El **Bluetooth** es una conexión inalámbrica de corto alcance, como la de un altavoz portátil: se usa para conectar la placa a un ordenador o una tableta sin cable USB. Para empezar, el cable USB sigue siendo el medio más fiable. Si la conexión Bluetooth te da problemas, nuestra página de [errores frecuentes de Bluetooth con mBlock](/es/mblock-bluetooth-solucion/) enumera los ajustes que conviene revisar.

Algunas presentaciones de la placa mencionan también funciones de inteligencia artificial, como el reconocimiento de voz, que pasan por Internet. No las hemos verificado: dependen de la versión del software y de un servicio en línea, por lo que no las contamos en nuestra opinión.

## Alimentación, batería y seguridad

Usada sola, fuera del chasis del mBot2, la CyberPi se alimenta por su **cable USB** o por una **batería LiPo** (de litio-polímero, la misma tecnología que muchos teléfonos) compatible con Makeblock. **No hay que hacer ninguna conexión a la red de 230 voltios**: ni cuadro eléctrico que tocar, ni para usar la placa ni para cambiar un sensor.

Las baterías de litio exigen, no obstante, algunas precauciones sencillas:

- usa el cable y el cargador suministrados, o una toma USB corriente de ordenador o de cargador de teléfono;
- no recargues la batería sin vigilancia, por ejemplo durante la noche;
- deja de usar cualquier batería hinchada, dañada o que se caliente de forma anormal, y no la perfores nunca;
- no cortocircuites sus cables, ni siquiera un instante.

## mBuild o RJ25: no confundas los conectores

Las extensiones oficiales de la CyberPi se conectan al sistema **mBuild**, módulos unidos por conectores magnéticos o por cable. **No** es el conector **RJ25** del antiguo [mBot](/es/mbot-mi-primer-robot-educativo/), que se parece a una toma de teléfono. Antes de comprar un módulo, incluso de segunda mano, comprueba que esté indicado para la CyberPi o para mBuild en el [sitio de soporte de Makeblock](https://support.makeblock.com).

## Nuestra opinión sobre la CyberPi

Esta opinión se basa en la documentación de Makeblock, en las especificaciones publicadas de la placa y en cómo se usan en clase los demás productos de esta gama. No hemos medido la autonomía de la batería, por lo que no damos ninguna cifra.

**¿Para quién?**

- Un estudiante de secundaria o un adolescente que quiere pasar de los bloques a Python sobre un objeto que ve reaccionar (a partir de unos 10 años y autónomo, y desde los 8 o 9 años acompañado para la parte de bloques: es nuestra referencia, no una edad fijada por el fabricante).
- Un profesor que busca material compacto, utilizable en una mesa, sin terreno de juego ni robot que mover.
- Un padre o un maker que quiere explorar la electrónica sin soldar.

**Puntos fuertes**

- La pantalla, el sonido, la luz y el joystick integrados permiten lograr un primer proyecto sin conectar nada más.
- Se puede empezar con bloques y pasar a Python en el mismo software, mBlock, sin cambiar de equipo.
- Es compacta, ligera y puede después colocarse en un robot mBot2.

**Límites**

- Sola no rueda: si quieres un robot que se desplace y siga líneas, mira mejor el [mBot2 y su comparativa](/es/mbot-vs-mbot2/).
- Necesita un ordenador o una tableta para programarse.
- Las extensiones son propias de Makeblock: no todos los sensores del mercado se conectan directamente.
- Si lo que buscas es aprender Linux y montar un pequeño servidor, una placa tipo Raspberry Pi responde mejor a esa necesidad. Nuestra guía de [Raspberry Pi: primeros pasos](/es/raspberry-pi-3-primeros-pasos/) ayuda a decidir.

Si dudas para un niño de 10 años, nuestra guía de [robot programable para un niño de 10 años](/es/robot-programable-10-anos/) compara las opciones por perfil.

El precio cambia según las ofertas y los kits: consulta la tarifa actual en la ficha de Amazon antes de pedir.

[Ver la CyberPi de Makeblock en Amazon.es](https://www.amazon.es/dp/B0BBZY9L59?tag=roboteducat07-21)

*Enlace de afiliado: el sitio recibe una pequeña comisión si compras a través de este enlace, sin coste adicional para ti. Asegúrate de que el anuncio sea la placa CyberPi y no el robot mBot2 completo.*

## Tutorial: mostrar un mensaje y reaccionar al botón A en Python

Este pequeño programa muestra un texto en la pantalla y, cada vez que pulsas el botón A, enciende la luz en verde, reproduce un sonido y muestra «Muy bien!».

**Nivel**: principiante. **Duración**: calcula media hora, sin contar la instalación de mBlock (estimación, no cronometrada).

### Requisitos previos

- Una CyberPi cargada.
- Un cable USB-C **que transmita datos**. Algunos cables vendidos solo para la carga no permiten que el ordenador vea la placa.
- **mBlock 5** instalado en el ordenador: si aún no lo has hecho, sigue nuestra [guía para descargar mBlock 5](/es/descargar-mblock-5-gratis/) y descubre después la interfaz con [Primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/).

### Paso 1: conectar la placa

Conecta la CyberPi al ordenador y enciéndela. En mBlock 5, añade el dispositivo **CyberPi** a la lista de dispositivos y luego solicita la conexión. Las etiquetas exactas dependen de la versión de mBlock instalada. Sabrás que ha funcionado cuando el software muestre la placa como conectada.

### Paso 2: pasar a Python

En el espacio de programación, cambia del modo **Bloques** al modo **Python**: el editor muestra entonces texto en lugar de bloques.

### Paso 3: escribir el programa

Copia el siguiente código. Los textos de la pantalla están escritos sin acentos ni signos especiales, por prudencia: no hemos comprobado cómo se muestran los caracteres acentuados en la pantalla de la placa.

```python
import cyberpi
import time

# Borra la pantalla y luego muestra dos líneas de texto
cyberpi.console.clear()
cyberpi.console.println("Hola!")
cyberpi.console.println("Pulsa A")

# Bucle infinito: el programa vigila el botón A
while True:
    if cyberpi.controller.is_press("a"):
        cyberpi.led.on(0, 255, 0)      # luz verde (rojo 0, verde 255, azul 0)
        cyberpi.audio.play("hello")    # sonido pregrabado
        cyberpi.console.println("Muy bien!")
        time.sleep(1)                  # espera un segundo
        cyberpi.led.off()              # apaga la luz
```

Para entender el código:

- `import cyberpi` carga las funciones que controlan la placa, e `import time` las que gestionan las pausas.
- `cyberpi.console.println` escribe una línea en la pantalla.
- `while True` repite eternamente lo que está sangrado debajo, y `if` ejecuta las líneas siguientes solo si el botón A está pulsado en ese instante.
- `cyberpi.led.on(0, 255, 0)` fija el color con tres números entre 0 y 255: rojo, verde, azul.

### Paso 4: ejecutar y comprobar

Ejecuta el programa en modo directo, o envíalo a la placa si quieres que siga funcionando sin ordenador. En la pantalla debes ver «Hola!» y luego «Pulsa A». Cuando pulses A, la luz se pone verde, suena un sonido y aparece «Muy bien!». Para jugar con el código, cambia los tres números de la luz (por ejemplo 255, 0, 0 para el rojo) o el texto mostrado.

*No hemos ejecutado este ejemplo en una placa para este artículo: retoma los nombres de funciones de la documentación de Makeblock para la CyberPi, pero esos nombres pueden cambiar de una versión de mBlock a otra. Si una línea provoca un error, compárala con los ejemplos de la sección CyberPi de la documentación de Makeblock.*

### Si no funciona

- **La placa no aparece en mBlock**: prueba otro cable USB, otro puerto y reinicia después la placa y el software.
- **No se muestra nada o el programa ya no obedece**: detén el programa, vuelve a lanzarlo y comprueba que esté seleccionado el dispositivo correcto.
- **Sin sonido**: comprueba el volumen de la placa, porque el altavoz es pequeño y el sonido discreto.
- **Mensaje de error en una línea**: fíjate en los espacios al comienzo de las líneas, porque en Python la alineación cuenta, y en las comillas, que deben cerrarse.

¿Y ahora qué? Puedes añadir un segundo botón, mostrar el valor del sensor de luz o, si quieres ver cómo tu código hace rodar un robot, descubrir el [mBot2](/es/mbot-vs-mbot2/). Para elegir el software adecuado a tu dispositivo, lee nuestra guía [mBlock 5: app de escritorio, navegador o Python para mBot](/es/software-mblock-cual-elegir/).

*Socio de Amazon — puede generarse una comisión en compras elegibles, sin coste adicional para ti.*
