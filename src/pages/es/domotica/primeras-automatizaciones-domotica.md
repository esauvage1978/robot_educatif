---
layout: ../../../layouts/EsPost.astro
title: "Primeras automatizaciones domóticas útiles"
description: "Diez primeras automatizaciones sencillas para tu casa: luz, calefacción, lavadora, ausencia... explicadas para Home Assistant y para Homey, sin obligación de programar."
updated: "30 de octubre de 2026"
faqSchema:
  - question: "¿Tengo que aprender YAML?"
    answer: "No para empezar. El editor visual de Home Assistant cubre estos diez casos. YAML resulta útil más adelante, para conservar una copia de tus reglas o para necesidades avanzadas."
  - question: "¿Los Flows de Homey y Home Assistant son equivalentes?"
    answer: "Para estos diez ejemplos sí: dan el mismo resultado. Los detalles cambian en la localización del móvil, las plantillas de reglas y los scripts. Parte de la caja que tengas, o apóyate en la página sobre la elección de la caja."
  - question: "¿Por qué mi automatización solo funciona una de cada dos veces?"
    answer: "Las causas más frecuentes son un sensor demasiado lejos del resto de la red de radio, una pila agotada o una condición demasiado estricta. Mira el historial de estados del dispositivo y la calidad del enlace de radio."
  - question: "¿Dónde encuentro más ideas de proyecto?"
    answer: "En nuestros proyectos ESP32 y en la guía completa para empezar, que muestra todo el recorrido."
---

Tu caja está conectada, los primeros sensores reconocidos, ¿y ahora? Es el momento en que la domótica se vuelve realmente útil: cuando la casa actúa sola. Una buena automatización responde a una necesidad real («no quiero calentar con las ventanas abiertas»), no a las ganas de un gadget.

Esta página te da diez ideas sencillas. De cada una sabrás para qué sirve, qué necesitas y cómo crearla en Home Assistant (un programa gratuito que reúne todos tus dispositivos) y en Homey (una caja ya preparada que se compra en tienda). No hace falta saber programar. El material necesario se presenta en los [primeros dispositivos que comprar](/es/domotica/primeros-dispositivos-domotica-comprar/), y las palabras desconocidas están en el [glosario](/es/domotica/glosario-domotica/).

## Para ir más lejos

- [Los primeros dispositivos que comprar](/es/domotica/primeros-dispositivos-domotica-comprar/)
- [Glosario de domótica](/es/domotica/glosario-domotica/)
- [Homey Pro mini: unboxing e instalación](/es/domotica/test-homey-pro-mini-unboxing-instalacion/)
- [Instalar Home Assistant en Raspberry Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/)

## El principio, en tres palabras

Toda automatización sigue el mismo esquema: un evento la inicia, eventualmente una condición precisa en qué caso debe actuar, y una acción hace lo que se pide. Los dos programas usan palabras distintas para la misma idea.

| Lo que queremos decir | En Home Assistant | En Homey |
|---|---|---|
| El evento que inicia la regla (el disparador) | Disparador | «Cuando...» |
| El filtro que precisa en qué caso actuar (la condición) | Condición | «Y...» |
| Lo que hace la casa (la acción) | Acción | «Entonces...» |

En Home Assistant, creas una regla desde el menú Ajustes, luego Automatizaciones y escenas, con un editor visual: las etiquetas pueden variar un poco según la versión. En Homey, ensamblas tarjetas en la sección de los Flows. Para estos diez casos no hace falta ninguna línea de código. El pequeño ejemplo en YAML (un formato de texto para escribir una regla a mano) más abajo sirve solo de ilustración.

## 1. Encender la luz al pasar

**Para qué sirve:** el pasillo se ilumina de noche sin buscar el interruptor, y se apaga cuando ya nadie se mueve.  
**Qué necesitas:** un detector de movimiento y una luz (bombilla inteligente, enchufe o relé).

En Home Assistant, elige el detector de movimiento como disparador, añade una condición «es de noche» (sol bajo el horizonte, o luminosidad baja) y después la acción de encender la luz. Para el apagado, crea una segunda regla con un retardo tras la última detección.

En Homey, ensambla una tarjeta «Cuando se detecta movimiento», «Y es de noche», «Entonces enciende la luz». Un segundo Flow, con una tarjeta de retardo, apaga la luz.

## 2. Recibir un aviso si una ventana se queda abierta con la calefacción encendida

**Para qué sirve:** evitar calentar para nada.  
**Qué necesitas:** un sensor de apertura y un aparato de calefacción conectado (válvula para radiador, enchufe o termostato).

En Home Assistant, inicia la regla cuando el sensor indica «abierto», añade la condición «la calefacción está activa» y envía una notificación al móvil. También puedes bajar la temperatura o apagar la calefacción.

En Homey, es la misma secuencia con una tarjeta «Cuando el contacto se abre», «Y la calefacción está encendida», «Entonces envía una notificación» y, si tu aparato lo permite, una tarjeta para bajar la temperatura de consigna.

## 3. Saber cuándo ha terminado la lavadora

**Para qué sirve:** recibir un mensaje en cuanto acaba el ciclo, para no dejar la colada húmeda.  
**Qué necesitas:** un enchufe que mida el consumo de electricidad.

En Home Assistant, la regla salta cuando la potencia vuelve a bajar de un umbral bajo tras haber superado uno alto. Para ello, la comunidad propone plantillas de regla llamadas blueprints, que evitan construirlo todo a mano. En Homey basta una tarjeta sobre la potencia consumida (según la app de tu enchufe), con una notificación como acción.

Los umbrales adecuados dependen de tu lavadora: observa una vez su curva de consumo antes de fijar los valores.

## 4. Modo «ausente»: apagar todo al salir

**Para qué sirve:** un solo gesto, o tu salida de casa, apaga las luces y algunos enchufes.  
**Qué necesitas:** un pulsador inalámbrico, o la detección de presencia de tu móvil.

En Home Assistant, inicia la regla cuando la persona sale de casa (o cuando se activa un interruptor virtual «ausente»), y apaga las luces y los enchufes elegidos, o lanza una escena (un conjunto de estados que se activan de golpe). En Homey, usa «Cuando salgo de casa» (localización del móvil) o la pulsación de un botón, y apaga las luces de la zona.

La localización por móvil nunca es perfecta. Conserva siempre un pulsador físico de reserva.

## 5. Una luz nocturna a hora fija para los niños

**Para qué sirve:** una luz suave que se enciende a la hora de ir a dormir.  
**Qué necesitas:** una bombilla con intensidad regulable.

En Home Assistant, elige una hora como disparador y enciende la luz con poca luminosidad. En Homey, «Cuando la hora es...», «Entonces enciende la luz a tal porcentaje».

## 6. Un aviso si la temperatura baja demasiado

**Para qué sirve:** detectar un riesgo de helada para las tuberías, o una falta de calefacción.  
**Qué necesitas:** un sensor de temperatura.

En Home Assistant, inicia la regla cuando la temperatura baja de un umbral (por ejemplo cinco grados) y envía una notificación, encendiendo si quieres una calefacción. En Homey, «Cuando la temperatura pasa a ser inferior a...», «Entonces envía un aviso».

## 7. Encender una lámpara al atardecer

**Para qué sirve:** un ambiente cálido al final del día.  
**Qué necesitas:** una luz conectada.

En Home Assistant, usa el disparador «puesta de sol» (puedes desplazarlo unos minutos) y enciende la luz. En Homey, «Cuando se pone el sol», «Entonces enciende».

## 8. Cortar el standby por la noche

**Para qué sirve:** ahorrar la electricidad de aparatos que se quedan encendidos para nada, como un televisor y su descodificador.  
**Qué necesitas:** enchufes controlables a distancia.

En Home Assistant, apaga los enchufes a las 23:30 y vuelve a encenderlos a las 7 si hace falta. En Homey, retoma la misma idea con «Cuando la hora es...».

Comprueba antes que el aparato soporta que lo corten de golpe: un disco de red (NAS) o ciertos descodificadores no lo toleran nada bien.

## 9. Recibir un aviso cuando se abre la puerta de entrada

**Para qué sirve:** saber quién entra, por ejemplo cuando los niños vuelven solos.  
**Qué necesitas:** un sensor de apertura.

En Home Assistant, envía una notificación en cuanto el sensor se abre, añadiendo si quieres la condición «no hay nadie en casa». En Homey, «Cuando la puerta se abre», «Entonces envía una notificación».

## 10. Acordarse de ventilar

**Para qué sirve:** un recordatorio para abrir las ventanas diez minutos, a hora fija o cuando el aire está demasiado cargado.  
**Qué necesitas:** o nada, solo la hora; o un sensor de CO₂, el gas que se acumula en una habitación cerrada (mira [este proyecto con una Raspberry Pi y un sensor SCD41](/es/domotica/raspberry-pi-co2-scd41-home-assistant/)).

En Home Assistant, inicia la regla a una hora regular, o cuando el nivel de CO₂ supera un umbral, y envía una notificación. En Homey, «Cuando llega la hora» o «Cuando el CO₂ es alto», y «Entonces notifica».

## Un ejemplo en YAML para Home Assistant

Aquí tienes la primera automatización (la luz del pasillo) escrita como texto. Puedes copiarla en el editor en modo YAML, tras sustituir los nombres por los de tus dispositivos.

```yaml
# A título ilustrativo: sustituye los entity_id por los tuyos
automation:
  - alias: "Pasillo: movimiento de noche"
    trigger:
      - platform: state
        entity_id: binary_sensor.pasillo_movimiento
        to: "on"
    condition:
      - condition: state
        entity_id: sun.sun
        state: "below_horizon"
    action:
      - service: light.turn_on
        target:
          entity_id: light.pasillo
```

Este ejemplo no se ha ejecutado en tu instalación. Tras adaptarlo, usa la herramienta de comprobación del editor de Home Assistant antes de guardarlo.

## Algunos consejos para no ahogarse

Una automatización debe responder a una sola necesidad, no a tres. Ponle un nombre claro, del tipo «Aviso ventana salón con radiador», para encontrarla dentro de seis meses. Pruébala primero con una simple notificación antes de confiarle una acción más pesada, como apagar la calefacción. Y para los umbrales de consumo de la lavadora, mide antes de fijarlos.

Para seguir el recorrido, pasa a los [errores de principiante](/es/domotica/errores-principiante-domotica-faq/) o vuelve a la [guía completa](/es/domotica/empezar-domotica-guia-completa/).

## Preguntas frecuentes

**¿Tengo que aprender YAML?**
No para empezar. El editor visual de Home Assistant cubre estos diez casos. YAML resulta útil más adelante, para conservar una copia de tus reglas o para necesidades avanzadas.

**¿Los Flows de Homey y Home Assistant son equivalentes?**
Para estos diez ejemplos sí: dan el mismo resultado. Los detalles cambian en la localización del móvil, las plantillas de reglas y los scripts. Parte de la caja que tengas, o apóyate en la [página sobre la elección de la caja](/es/domotica/que-box-domotica-elegir-principiante/).

**¿Por qué mi automatización solo funciona una de cada dos veces?**
Las causas más frecuentes son un sensor demasiado lejos del resto de la red de radio, una pila agotada o una condición demasiado estricta. Mira el historial de estados del dispositivo y la calidad del enlace de radio.

**¿Dónde encuentro más ideas de proyecto?**
En nuestros [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/) y en la [guía completa para empezar](/es/domotica/empezar-domotica-guia-completa/), que muestra todo el recorrido.

---

*Autor: Emmanuel Sauvage. Ejemplos didácticos: adapta los nombres de los dispositivos y los umbrales a tu instalación.*
