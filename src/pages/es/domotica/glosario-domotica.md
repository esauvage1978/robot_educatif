---
layout: ../../../layouts/EsPost.astro
title: "Glosario de domótica: términos esenciales"
description: "Las palabras de la domótica explicadas con sencillez: box, hub, Zigbee, Matter, MQTT, ESPHome, automatización, Flow, OTA, malla... cada una con un ejemplo concreto."
updated: "30 de octubre de 2026"
faqSchema:
  - question: "¿Box, hub y gateway son lo mismo?"
    answer: "En el lenguaje corriente, casi. En detalle, la box (o hub) es el cerebro de la casa, mientras que una pasarela (gateway) puede ser solo un traductor de un lenguaje de radio a otro."
  - question: "¿Hace falta conocer MQTT para empezar?"
    answer: "No. ZHA funciona sin MQTT. Este sistema de mensajes resulta útil si eliges Zigbee2MQTT o haces muchos proyectos de bricolaje."
  - question: "¿Dónde vuelvo a encontrar estas palabras en el recorrido?"
    answer: "En la elección de la caja, en los protocolos y en las automatizaciones."
---

Estás leyendo un artículo sobre domótica y una palabra te frena: una sigla, un término en inglés o el nombre de una marca que nadie ha explicado. Es normal. Este sector ha cogido la costumbre de mezclarlo todo.

Este glosario sirve para eso. Cada término se explica en una o dos frases y se ilustra después con un ejemplo sacado de una casa real. Puedes recorrerlo letra por letra gracias al índice, o volver cuando una palabra se te escape. Para las especificaciones completas, consulta los documentos oficiales de los fabricantes y de los organismos de normalización (Connectivity Standards Alliance, Thread Group, Z-Wave Alliance).

## Para ir más lejos

- [Cómo se hablan tus dispositivos (protocolos)](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/)
- [Tus primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/)
- [Errores de principiante](/es/domotica/errores-principiante-domotica-faq/)
- [Qué box domótica elegir (principiante)](/es/domotica/que-box-domotica-elegir-principiante/)

## Índice alfabético

[4](#numeros) · [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [M](#m) · [N](#n) · [O](#o) · [R](#r) · [S](#s) · [T](#t) · [W](#w) · [Y](#y) · [Z](#z)

## 4

### <span id="numeros"></span>433 MHz

Una banda de radio más antigua que usan muchas persianas, timbres y enchufes con mando. La calidad y la seguridad varían mucho.  
**Ejemplo:** un enchufe con mando de hace unos años que un receptor, o un Homey, aún sabe controlar.

## A

### <span id="a"></span>Acción

Lo que hace la casa cuando salta una automatización: encender una lámpara, enviar una notificación, regular la calefacción.  
**Ejemplo:** recibes un mensaje «la lavadora ha terminado».

### Automatización

Una regla del tipo «si pasa esto, entonces haz aquello», a veces con condiciones adicionales. Mira nuestras [primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/).  
**Ejemplo:** si hay movimiento en el pasillo y está oscuro, la luz se enciende.

## B

### <span id="b"></span>Bluetooth Low Energy (BLE)

Una radio de corto alcance y bajo consumo presente en relojes inteligentes, en algunas cerraduras y en sensores cercanos.  
**Ejemplo:** una cerradura que se abre desde el móvil cuando estás delante de la puerta.

### Border router (router de borde)

Un aparato que conecta una red Thread (ver más abajo) con tu red de internet doméstica, para que los dispositivos Thread puedan controlarse.  
**Ejemplo:** algunos altavoces inteligentes o cajas recientes incluyen esta función.

### Box domótica

La caja, o el pequeño equipo, que centraliza toda la casa: recibe la información de los sensores y lanza las automatizaciones. También se llama hub. Mira [qué box elegir](/es/domotica/que-box-domotica-elegir-principiante/).  
**Ejemplo:** Home Assistant Green o Homey Pro mini.

## C

### <span id="c"></span>Condición

Un filtro que precisa en qué caso debe actuar la automatización: una hora, un estado, una presencia.  
**Ejemplo:** encender el radiador solo entre las 6 y las 22 h.

### Control local

Controlar un dispositivo sin depender de los servidores del fabricante.  
**Ejemplo:** un módulo Shelly controlado directamente desde su dirección en tu red, o un sensor Zigbee gestionado por ZHA.

### Coordinador (Zigbee)

El jefe de la red Zigbee: acepta los dispositivos y organiza sus intercambios. En la práctica, casi siempre es una pequeña memoria USB.  
**Ejemplo:** el dongle SONOFF ZBDongle-E conectado a una caja Home Assistant.

## D

### <span id="d"></span>Disparador (trigger)

El evento que inicia una automatización. En inglés se dice trigger.  
**Ejemplo:** un sensor de apertura pasa de «cerrado» a «abierto».

### Dongle

Una pequeña memoria USB que añade una radio a tu caja (Zigbee, Z-Wave o Thread, por ejemplo).  
**Ejemplo:** nuestra guía del [mejor dongle Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/).

## E

### <span id="e"></span>Emparejamiento (pairing)

El paso en el que «presentas» un nuevo dispositivo a tu caja para que lo reconozca. En inglés se dice pairing.  
**Ejemplo:** mantienes pulsado el botón de un sensor Zigbee hasta que el programa anuncia «nuevo dispositivo encontrado».

### Entidad

En Home Assistant, cada información y cada mando es una entidad: una temperatura, un interruptor, una luz. Cada una tiene un nombre técnico.  
**Ejemplo:** `sensor.salon_temperatura` es la temperatura del salón.

### ESP32

Una pequeña placa electrónica programable, muy económica, con Wi-Fi y Bluetooth. Permite construir uno mismo sensores o mandos.  
**Ejemplo:** un sensor de temperatura casero con una ESP32, mira nuestros [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/).

### ESPHome

Una herramienta gratuita para programar placas como la ESP32 y hacer que Home Assistant las reconozca, sin escribir un programa de verdad.  
**Ejemplo:** [un sensor de temperatura ESP32 con ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/).

## F

### <span id="f"></span>Flow (Homey)

La forma en que Homey construye una automatización: se ensamblan tarjetas visuales «Cuando... Y... Entonces...».  
**Ejemplo:** cuando se abre una puerta, y la calefacción está encendida, entonces envía una notificación.

## G

### <span id="g"></span>Gateway (pasarela)

Un aparato o un programa que traduce un lenguaje a otro, por ejemplo de la radio a tu red de internet, o de la nube al local.  
**Ejemplo:** Zigbee2MQTT hace de pasarela entre Zigbee y MQTT.

### GPIO

Los pequeños pines metálicos de una placa como la Raspberry Pi, a los que se conectan directamente componentes electrónicos (un LED, un sensor).  
**Ejemplo:** conectar un sensor de temperatura a los pines de una Raspberry Pi.

## H

### <span id="h"></span>Home Assistant

Un programa gratuito que reúne todos tus dispositivos conectados en una sola aplicación y que funciona en tu casa, sin suscripción obligatoria.  
**Ejemplo:** funciona en una caja Home Assistant Green o en una Raspberry Pi 5.

### Hub o bridge

Dos palabras que se usan a menudo para designar la caja. Un bridge también puede ser un pequeño módulo que traduce un lenguaje de radio a otro.  
**Ejemplo:** el bridge de Philips Hue traduce los comandos de la app en órdenes para las bombillas.

## I

### <span id="i"></span>Integración

Un módulo de software que enseña a tu caja a hablar con una marca o una tecnología concreta.  
**Ejemplo:** la integración Matter de Home Assistant.

## M

### <span id="m"></span>Malla (mesh)

Una organización en la que los dispositivos repiten los mensajes de sus vecinos, como personas que se pasan un cubo de agua. Zigbee, Z-Wave y Thread funcionan así.  
**Ejemplo:** un enchufe Zigbee del pasillo transmite el mensaje del sensor del dormitorio. Mira la página sobre [protocolos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/).

### Matter

Un lenguaje común, creado por varias grandes marcas, que viaja por Wi-Fi, Thread o cable de red. Permite que un mismo dispositivo lo entiendan varios sistemas.  
**Ejemplo:** una bombilla Matter visible tanto en Home Assistant como en Google Home (según la configuración elegida).

### MQTT

Un sistema de mensajes muy ligero, muy usado por los aficionados. Un dispositivo «publica» una información bajo una dirección, y los demás pueden leerla.  
**Ejemplo:** la temperatura del salón se publica bajo la dirección `zigbee2mqtt/salon_temp`.

## N

### <span id="n"></span>Nube y local

La **nube** son los servidores del fabricante, en internet. El **local** es cuando todo ocurre en tu casa, entre los dispositivos y la caja.  
**Ejemplo:** un enchufe que solo se controla desde la app del fabricante deja de responder si el servicio o tu conexión se cae; un enchufe gestionado en local sigue funcionando.

## O

### <span id="o"></span>OTA (actualización inalámbrica)

OTA significa «over the air». Es una actualización del software interno de un dispositivo, sin cable.  
**Ejemplo:** [actualizaciones OTA con ESPHome](/es/domotica/actualizaciones-ota-esphome/).

## R

### <span id="r"></span>Raspberry Pi

Un pequeño ordenador del tamaño de una tarjeta de crédito, muy usado para hacer funcionar Home Assistant.  
**Ejemplo:** la Raspberry Pi 5, con una fuente de alimentación adecuada y una tarjeta de memoria.

### Router Zigbee

Un dispositivo alimentado por la red eléctrica que repite los mensajes Zigbee de los demás: un enchufe, una bombilla.  
**Ejemplo:** un enchufe Zigbee a mitad de la casa permite llegar a un sensor lejano.

## S

### <span id="s"></span>Escena

Un conjunto de estados que se activan de golpe: «noche de película», «ausencia».  
**Ejemplo:** apagar todas las luces y bajar la calefacción con un solo gesto.

## T

### <span id="t"></span>Thread

Una red en malla que consume muy poca energía. Necesita un border router para conectarse a tu red de internet doméstica.  
**Ejemplo:** un sensor Matter que usa Thread como radio.

## W

### <span id="w"></span>Wi-Fi

La red inalámbrica de tu router. Los dispositivos Wi-Fi se conectan directamente, sin dongle adicional, pero consumen más y raramente funcionan con pilas.  
**Ejemplo:** un enchufe Tapo P110 se conecta al Wi-Fi de casa.

## Y

### <span id="y"></span>YAML

Un formato de texto que sirve para escribir reglas a mano, con sangrías para marcar la estructura. Para empezar se puede prescindir de él.  
**Ejemplo:** los ejemplos de las [primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/) muestran un pequeño bloque YAML.

## Z

### <span id="z"></span>Z-Wave

Una radio en malla que funciona en torno a los 868 MHz en Europa (en otras regiones la frecuencia cambia), por lo que la molesta menos el Wi-Fi.  
**Ejemplo:** un módulo Z-Wave para persianas, controlado por un dongle USB dedicado.

### ZHA

La forma integrada en Home Assistant de gestionar una red Zigbee. El nombre viene de «Zigbee Home Automation».  
**Ejemplo:** para una comparación, mira [ZHA o Zigbee2MQTT](/es/domotica/zigbee2mqtt-o-zha-home-assistant/).

### Zigbee

Una radio de bajo consumo, perfecta para sensores que funcionan meses con pilas. Funciona en malla y usa la banda de 2,4 GHz.  
**Ejemplo:** el sensor SONOFF SNZB-02D, conectado a Home Assistant mediante un dongle USB.

### Zigbee2MQTT

Otra forma de gestionar Zigbee en Home Assistant: traduce los mensajes Zigbee en mensajes MQTT. Es una alternativa a ZHA.  
**Ejemplo:** el catálogo de dispositivos compatibles está muy documentado por la comunidad.

## Preguntas frecuentes

**¿Box, hub y gateway son lo mismo?**
En el lenguaje corriente, casi. En detalle, la box (o hub) es el cerebro de la casa, mientras que una pasarela (gateway) puede ser solo un traductor de un lenguaje de radio a otro. Para retomar el hilo general, mira la [guía completa para empezar](/es/domotica/empezar-domotica-guia-completa/).

**¿Hace falta conocer MQTT para empezar?**
No. ZHA funciona sin MQTT. Este sistema de mensajes resulta útil si eliges Zigbee2MQTT o haces muchos proyectos de bricolaje.

**¿Dónde vuelvo a encontrar estas palabras en el recorrido?**
En la [elección de la caja](/es/domotica/que-box-domotica-elegir-principiante/), en los [protocolos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/) y en las [automatizaciones](/es/domotica/primeras-automatizaciones-domotica/).

---

*Autor: Emmanuel Sauvage. Este glosario explica las palabras para empezar; para los detalles técnicos completos, hacen fe las especificaciones de los organismos de normalización (CSA, Thread Group, Z-Wave Alliance) y la documentación de los fabricantes.*
