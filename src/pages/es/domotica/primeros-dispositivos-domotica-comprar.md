---
layout: ../../../layouts/EsPost.astro
title: "Primeros dispositivos de domótica a comprar"
description: "¿Qué meter en el primer carrito de domótica? Kits de inicio por objetivo y presupuesto: sensores, enchufes, bombillas, válvulas para radiador, dongle Zigbee y pequeños accesorios."
updated: "30 de octubre de 2026"
faqSchema:
  - question: "¿Zigbee o Wi-Fi para la primera compra?"
    answer: "El Wi-Fi permite probar sin caja, con una app por marca. Zigbee resulta más interesante cuando ya tienes una caja y quieres sensores de pila y automatizaciones que se queden en casa. Los detalles están en nuestra página sobre protocolos."
  - question: "¿Cuántos repetidores Zigbee debo prever?"
    answer: "Como referencia, un enchufe o una bombilla Zigbee alimentados por la red cada ocho o diez metros suele ayudar, y hacen falta más si los muros son gruesos. Más que una regla ya hecha, mide la calidad del enlace de radio en tu app (ZHA o Zigbee2MQTT, las dos herramientas que gestionan Zigbee en Home Assistant)."
  - question: "¿Puedo mezclar Sonoff, Aqara e IKEA?"
    answer: "A menudo sí con Zigbee y Home Assistant, pero cada dispositivo tiene sus pequeñas particularidades (método de emparejamiento, pila, comportamientos propios). La tabla de compatibilidad y las listas de dispositivos de ZHA y Zigbee2MQTT ayudan a comprobarlo."
  - question: "¿Dónde veo automatizaciones con este material?"
    answer: "En nuestras primeras automatizaciones. Para retomar el hilo general, vuelve a la guía completa para empezar."
---

Comprar «un poco de todo» es la forma más rápida de desanimarse: acabas con cinco apps, dispositivos que no se hablan y ninguna regla realmente útil. El método correcto es partir de lo que quieres conseguir y elegir después pocos objetos.

Esta página propone kits de inicio por objetivo (confort, ahorro, seguridad, luz, calefacción) y por presupuesto. También encontrarás los pequeños accesorios que todo el mundo olvida: el alargador USB, las pilas, la fuente de alimentación adecuada. Al terminar sabrás qué poner en el carrito y qué dejar de lado por ahora.

![Un enchufe inteligente, una cámara giratoria, un detector de movimiento, una bombilla y otra pequeña caja blanca colocados juntos sobre un fondo claro](/images/debutant/smart-home-devices.webp)

*Los objetos de un primer kit de domótica: enchufe inteligente, cámara, detector de movimiento y bombilla. Cada uno responde a una necesidad distinta (medir, vigilar, detectar, iluminar), lo que evita comprar varias veces lo mismo. Foto: Jakub Zerdzicki, Pexels, licencia libre.*

## Para ir más lejos

- [Qué box domótica elegir (principiante)](/es/domotica/que-box-domotica-elegir-principiante/)
- [Elegir el dongle Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/)
- [Sensores de temperatura Zigbee](/es/domotica/sensor-temperatura-zigbee/)
- [Enchufes inteligentes](/es/domotica/enchufes-inteligentes/)
- [Primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/)

## ¿Cuánto prever para empezar?

Una palabra sobre el vocabulario antes de mirar presupuestos. Zigbee es una radio de bajo consumo, perfecta para sensores de pila. Para que tu caja la entienda, se le conecta una pequeña memoria USB, llamada dongle Zigbee. En cuanto a Home Assistant, es el programa gratuito que reúne todos tus dispositivos en una sola aplicación.

| Tu presupuesto inicial | Qué puedes hacer |
|---|---|
| Muy pequeño | Uno o dos enchufes Wi-Fi que miden el consumo, y quizá una bombilla inteligente. No hace falta ninguna caja central. |
| Medio | Una caja central ya elegida (o una Raspberry Pi, un pequeño ordenador del tamaño de una tarjeta de crédito), más un dongle Zigbee, dos o tres sensores y un enchufe Zigbee alimentado por la red que hará también de repetidor. |
| Más amplio | La misma base, con además válvulas para radiador, un detector de presencia o una cámara, según el objetivo. |

Antes de comprar, comprueba siempre que tu caja reconoce un dispositivo, consultando la [tabla de compatibilidad](/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/) y la página [qué box elegir](/es/domotica/que-box-domotica-elegir-principiante/).

## Los pequeños accesorios que se olvidan

Un alargador USB corto sirve para alejar el dongle Zigbee del router. Ambos usan la misma frecuencia de radio y pueden molestarse; a menudo bastan unas decenas de centímetros para resolver el problema.

Si eliges una Raspberry Pi 5, hace falta una fuente de alimentación lo bastante potente: nuestro tutorial para [instalar Home Assistant](/es/domotica/instalar-home-assistant-raspberry-pi-5/) precisa cuál.

Prevé también pilas del formato adecuado. Los sensores suelen usar pilas de botón CR2032 o CR2450: comprueba la ficha del producto.

Un enchufe Zigbee alimentado por la red hace doble trabajo: controla un aparato y repite al mismo tiempo la señal de los demás sensores. Entonces se llama router Zigbee.

Por último, cualquier módulo empotrado en la pared o conectado al mando de un radiador debe instalarlo un electricista si no tienes la cualificación.

## Kits según el objetivo

### Para confort y temperatura

Un sensor Zigbee de temperatura y humedad, como el SONOFF SNZB-02D (mira nuestra [guía de sensores de temperatura](/es/domotica/sensor-temperatura-zigbee/)), da una primera visión de la casa. Puedes añadir un enchufe para una estufa, pero solo si la potencia y la seguridad lo permiten. Un aviso del tipo «hay menos de 16 grados en el salón» es un excelente primer ejemplo: consulta las [primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/).

### Para ahorrar energía

Los enchufes con medición de potencia muestran cuánto consume cada aparato. El enchufe Wi-Fi Tapo P110 es un ejemplo, igual que los enchufes Zigbee de varias marcas ([guía de enchufes](/es/domotica/enchufes-inteligentes/)). Más adelante podrás seguir el contador eléctrico de casa con un módulo adecuado, según lo que ofrezcan los contadores de tu país.

### Para la seguridad, versión ligera

Un sensor de apertura en la puerta de entrada y un detector de movimiento en el pasillo bastan para empezar. Tu caja puede enviar una notificación al móvil, sin central de alarma profesional.

### Para la iluminación

Basta una bombilla inteligente, o un enchufe al que conectas una lámpara que ya tienes. Añade un detector de movimiento para que la luz se encienda cuando pasas. Evita comprar diez marcas Wi-Fi distintas: cada una tendrá su app.

### Para la calefacción, habitación por habitación

Elige válvulas termostáticas (pequeños cabezales que se enroscan en el radiador) en Zigbee o en Matter, un lenguaje común a varias marcas, y comprueba bien que el racor de la válvula coincide con tu radiador. Un sensor de temperatura colocado en otro punto de la habitación ayuda si la válvula está en una posición desfavorable.

### Si vives de alquiler

Enchufes, sensores de pila, pulsadores y cabezales termostáticos que se quitan sin dejar huella: la página sobre [domótica de alquiler sin obras](/es/domotica/domotica-alquiler-sin-obras/) describe las opciones.

## Kits según el presupuesto

Las descripciones de abajo muestran cómo se presenta un primer mes de prueba, no precios. Los precios cambian de una tienda a otra y de un país a otro: compruébalos con el vendedor antes de comprar.

### Sin caja: para descubrir

Dos enchufes Wi-Fi que miden el consumo y, si quieres, una bombilla inteligente. El gasto es contenido, pero depende de marcas y packs: confírmalo con el vendedor.

### Con Home Assistant: la base Zigbee

Necesitas un cerebro: la caja [Home Assistant Green](/es/domotica/home-assistant-green-vs-raspberry-pi-5/) o una [Raspberry Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/). Después, un dongle Zigbee ([comparativa de dongles](/es/domotica/mejor-dongle-zigbee-home-assistant/)), un sensor de temperatura, un sensor de apertura y un enchufe Zigbee.

El SONOFF ZBDongle-E es un coordinador USB que funciona con ZHA o Zigbee2MQTT y tiene antena externa. El SONOFF SNZB-02D mide temperatura y humedad, tiene una pequeña pantalla y funciona con pilas. El TP-Link Tapo P110 es un enchufe Wi-Fi que mide el consumo y, al principio, se puede usar sin caja. Búsquedas en Amazon.es, para comprobar el precio actualizado y el modelo:

- [Home Assistant Green](https://www.amazon.es/s?k=Home+Assistant+Green&tag=roboteducat07-21)
- [SONOFF ZBDongle-E](https://www.amazon.es/s?k=SONOFF+ZBDongle-E&tag=roboteducat07-21)
- [SONOFF SNZB-02D](https://www.amazon.es/s?k=SONOFF+SNZB-02D&tag=roboteducat07-21)
- [TP-Link Tapo P110](https://www.amazon.es/s?k=TP-Link+Tapo+P110&tag=roboteducat07-21)

### Con Homey

Coge un Homey Pro o Pro mini (mira nuestro artículo sobre [Homey Pro mini](/es/domotica/test-homey-pro-mini-unboxing-instalacion/)), y después los mismos tipos de dispositivos que arriba. Para cada dispositivo, comprueba que aparece en la app de Homey antes de comprarlo.

## Qué conviene no comprar primero

Cinco cámaras conectadas antes de un solo sensor útil no te aportarán nada. Evita también los módulos empotrados si vives de alquiler o no te sientes cómodo con la electricidad, y los accesorios de control propios de cada marca cuando un dongle Zigbee y un solo programa suelen bastar. Misma prudencia con los dispositivos de 433 MHz (viejas radios de mando) cuando no sabes si tu caja los recibe.

Si tienes un proyecto concreto (garaje, persianas...), elige el material según la [guía de protocolos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/). Y si te apetece construir tú mismo algunos sensores, echa un vistazo a los [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/).

## Preguntas frecuentes

**¿Zigbee o Wi-Fi para la primera compra?**
El Wi-Fi permite probar sin caja, con una app por marca. Zigbee resulta más interesante cuando ya tienes una caja y quieres sensores de pila y automatizaciones que se queden en casa. Detalles en nuestra página sobre [protocolos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/).

**¿Cuántos repetidores Zigbee debo prever?**
Como referencia, un enchufe o una bombilla Zigbee alimentados por la red cada ocho o diez metros suele ayudar, y hacen falta más si los muros son gruesos. Más que una regla ya hecha, mide la calidad del enlace de radio en tu app (ZHA o Zigbee2MQTT, las dos herramientas que gestionan Zigbee en Home Assistant).

**¿Puedo mezclar Sonoff, Aqara e IKEA?**
A menudo sí con Zigbee y Home Assistant, pero cada dispositivo tiene sus pequeñas particularidades (método de emparejamiento, pila, comportamientos propios). La [tabla de compatibilidad](/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/) y las listas de dispositivos de ZHA y Zigbee2MQTT ayudan a comprobarlo.

**¿Dónde veo automatizaciones con este material?**
En nuestras [primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/). Para retomar el hilo general, vuelve a la [guía completa para empezar](/es/domotica/empezar-domotica-guia-completa/).

---

*Aviso de afiliación: los enlaces a Amazon.es llevan el identificador del sitio (roboteducat07-21). Si compras a través de ellos, puede recibirse una comisión, sin coste adicional para ti. Comprueba los precios con el vendedor. Autor: Emmanuel Sauvage.*
