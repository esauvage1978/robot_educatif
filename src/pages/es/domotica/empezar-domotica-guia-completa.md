---
layout: ../../../layouts/EsPost.astro
title: "Empezar en domótica: guía completa"
description: "¿Empiezas en domótica? Esta guía explica en orden qué decidir, comprar y configurar para que tu casa reaccione sola, con palabras sencillas."
updated: "30 de octubre de 2026"
faqSchema:
  - question: "¿Por dónde empiezo si solo tengo una hora?"
    answer: "Lee los pasos 1 y 2, elige un único objetivo y pasa después a la versión corta del recorrido. Sobre todo, no compres cinco marcas Wi-Fi distintas el primer día: acabarías con cinco aplicaciones que gestionar."
  - question: "¿Es obligatorio usar Home Assistant?"
    answer: "No. Para dos enchufes y una bombilla pueden bastar la aplicación del fabricante o Matter (un lenguaje común que entienden muchas marcas). Home Assistant, u Homey, resulta útil cuando quieres que los dispositivos actúen juntos y sigan funcionando sin internet."
  - question: "¿Funciona todo si se cae internet?"
    answer: "Lo que se gestiona en local sigue funcionando: sensores Zigbee, central local, automatizaciones. Todo lo que pasa por los servidores de un fabricante (la nube) se detiene, como el control por voz. Los detalles están en la página de errores de principiante."
  - question: "¿Dónde encuentro el significado de una palabra técnica que no entiendo?"
    answer: "En el glosario de domótica. Cada término se explica en una o dos frases, con un ejemplo sacado de una casa real."
---

Te gustaría que la casa se ocupara de pequeñas cosas por ti: bajar la calefacción cuando una ventana se queda abierta, encender el pasillo de noche, avisarte cuando se abre la puerta. Eso es exactamente lo que hace la domótica: objetos conectados que reaccionan solos, según reglas que eliges tú.

Esta guía te acompaña paso a paso. Al terminar sabrás por dónde empezar, qué comprar primero (y qué dejar en la estantería) y cómo crear tu primera regla automática. No hace falta conocer el vocabulario: cada palabra técnica se explica en cuanto aparece.

![Una mano sostiene un smartphone con la aplicación de una cerradura inteligente instalada en una puerta blanca](/images/debutant/living-room-tech.webp)

*Una cerradura inteligente controlada desde el móvil: es el primer reflejo de la domótica, un objeto de la casa que se maneja a distancia o se programa. Foto: Sebastian Scholz (Nuki), licencia Unsplash.*

## Para ir más lejos

- [Qué box domótica elegir (principiante)](/es/domotica/que-box-domotica-elegir-principiante/)
- [Cómo se hablan tus dispositivos: los protocolos explicados con sencillez](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/)
- [Los primeros dispositivos que comprar](/es/domotica/primeros-dispositivos-domotica-comprar/)
- [Glosario de domótica](/es/domotica/glosario-domotica/)
- [Tus primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/)
- [Errores de principiante y respuestas](/es/domotica/errores-principiante-domotica-faq/)
- [La versión corta: por dónde empezar](/es/domotica/como-empezar/)

## Lo esencial en pocas líneas

Si quieres automatizaciones que funcionen sin suscripción, e incluso cuando internet no responde, basta una base sencilla. Se compone de tres elementos.

El primero es un cerebro. Es Home Assistant, un programa gratuito que reúne todos tus dispositivos en una sola aplicación. Funciona en una pequeña caja: o bien el [Home Assistant Green](/es/domotica/home-assistant-green-vs-raspberry-pi-5/), una caja lista para conectar, o bien una Raspberry Pi 5, un pequeño ordenador del tamaño de una tarjeta de crédito.

El segundo es una llave de radio, también llamada dongle o coordinador: una pequeña memoria USB que permite al cerebro hablar con los sensores sin cables. Funciona con Zigbee, un lenguaje de radio de bajo consumo, perfecto para sensores que duran meses con una sola pila. Nuestra [guía de dongles Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/) te ayuda a elegirlo.

El tercero es un puñado de sensores y enchufes inteligentes, elegidos para un solo objetivo: confort, ahorro de energía o seguridad.

¿Prefieres no instalar nada tú mismo? Homey Pro mini es una caja ya preparada que reúne varias radios y se configura desde una app: mira nuestra [prueba con unboxing e instalación](/es/domotica/test-homey-pro-mini-unboxing-instalacion/). Y si vives de alquiler, empieza por el [recorrido sin obras](/es/domotica/domotica-alquiler-sin-obras/).

Búsquedas de compra, para comprobar el precio actualizado y el modelo para tu país:

- [Home Assistant Green en Amazon.es](https://www.amazon.es/s?k=Home+Assistant+Green&tag=roboteducat07-21)
- [Homey Pro mini en Amazon.es](https://www.amazon.es/s?k=Homey+Pro+mini&tag=roboteducat07-21)
- [SONOFF ZBDongle-E en Amazon.es](https://www.amazon.es/s?k=SONOFF+ZBDongle-E&tag=roboteducat07-21)

## Paso 1: saber qué quieres de verdad

Antes de comprar nada, escribe una sola frase. Por ejemplo: «Quiero bajar la calefacción cuando una ventana está abierta» o «Quiero que la luz del pasillo se encienda de noche». Todo lo demás, la elección de la marca y la del equipo, se deduce de esa frase.

Tres preguntas ayudan a verlo claro.

| Pregunta | Por qué lo cambia todo |
|---|---|
| ¿Vives de alquiler o eres propietario? | Quien alquila evita taladrar o tocar la instalación eléctrica y se orienta hacia enchufes, sensores de pila y cabezales termostáticos que se enroscan en el radiador. Un propietario puede instalar además módulos ocultos en la pared. |
| ¿Te gusta trastear o prefieres algo listo para usar? | Trastear es instalar un programa en una Raspberry Pi o construir un sensor con una placa ESP32 (una pequeña placa electrónica programable con Wi-Fi). Listo para usar es una caja Home Assistant Green u Homey, preparada desde el primer día. |
| ¿Qué presupuesto tienes para empezar? | Con poco, se arranca con Wi-Fi, sin caja central. Con algo más, se compra enseguida una caja y un dongle Zigbee. |

¿Te falta una palabra? El [glosario](/es/domotica/glosario-domotica/) las explica todas, con un ejemplo. Las preguntas que no nos atrevemos a hacer («¿hay que saber programar?», «¿y si se cae internet?») tienen su respuesta en la página de [errores de principiante](/es/domotica/errores-principiante-domotica-faq/).

## Paso 2: elegir al director de orquesta de la casa (la caja)

![Primer plano de varias placas Raspberry Pi verdes con sus puertos USB y de red](/images/debutant/raspberry-pi.webp)

*Varias Raspberry Pi vistas de cerca. Este pequeño ordenador puede convertirse en el cerebro de tu casa en cuanto se le instala Home Assistant. Foto: Craig Dennis, Pexels, licencia libre.*

La caja, llamada también hub o central, es el director de orquesta. Recibe la información de los sensores («la puerta se acaba de abrir») y lanza las acciones que has previsto («enciende la entrada»).

No estás obligado a comprar una enseguida. Puedes empezar con las aplicaciones de cada fabricante y reunirlo todo más tarde, si te apetece.

| Tu perfil | Lo que mejor te encaja |
|---|---|
| Quieres ahorrar en calefacción o seguir tus consumos | Home Assistant, con sensores de temperatura y enchufes que miden el consumo |
| Quieres que te avisen si pasa algo | Home Assistant u Homey, con sensores de apertura y de movimiento |
| Solo quieres controlar un par de lámparas | Bombillas o enchufes Wi-Fi, sin caja central, y Home Assistant más adelante si hace falta |
| Vives de alquiler | Enchufes, sensores de pila y cabezales termostáticos que se enroscan en el radiador |
| Te gusta trastear | Home Assistant en una Raspberry Pi o un miniPC, con placas [ESP32](/es/domotica/proyectos-esp32-domotica/) |

Para cada objetivo, los rangos de presupuesto y las trampas que evitar (como una suscripción oculta) están en la página [qué box domótica elegir](/es/domotica/que-box-domotica-elegir-principiante/). Si quieres comparar los programas en sí, lee nuestra [comparativa entre Home Assistant, Jeedom y Homey](/es/domotica/home-assistant-jeedom-homey-que-sistema/).

El Home Assistant Green es la forma más sencilla de empezar: Home Assistant viene preinstalado, funciona en local y no exige una suscripción obligatoria. Comprueba el precio actualizado con el vendedor antes de comprar.

¿Prefieres una central lista para usar que se configura por completo desde una app? El Homey Pro mini de Athom es la alternativa más sencilla. Habla de serie Zigbee, Thread y Matter (los idiomas de radio que explica nuestro [glosario](/es/domotica/glosario-domotica/)) y funciona en local, incluso si se corta Internet. Z-Wave, Bluetooth e infrarrojos necesitan el Homey Bridge, que se vende aparte; el Homey Pro, más caro, los lleva integrados. Estamos probando el Homey Pro mini: mira nuestro [desembalaje e instalación paso a paso](/es/domotica/test-homey-pro-mini-unboxing-instalacion/). [Ver el precio del Homey Pro mini en Amazon.es](https://www.amazon.es/s?k=Homey+Pro+mini&tag=roboteducat07-21).

## Paso 3: entender cómo se hablan tus dispositivos

Cada dispositivo conectado usa un lenguaje de radio para intercambiar mensajes con la casa. Ese lenguaje se llama protocolo. Los más habituales son el Wi-Fi (el de tu router) y Zigbee, del que ya hemos hablado. Después vienen Z-Wave, un primo de Zigbee que usa otra frecuencia de radio; Thread, una red de bajo consumo; y Matter, un lenguaje común que cada vez más marcas entienden. También se encuentran el Bluetooth y los 433 MHz, una radio más antigua que aparece en algunas persianas viejas.

Estos lenguajes no son intercambiables. Se diferencian por el alcance, por el apetito de energía (un sensor de pila no puede usar Wi-Fi mucho tiempo) y por el equipo que hay que añadir.

Quédate sobre todo con una idea: con Zigbee, los dispositivos conectados a un enchufe de la red eléctrica hacen de repetidores. Cada uno retransmite el mensaje del vecino, un poco como una cadena de personas que se pasan un cubo de agua. Se habla de red en malla (mesh). Cuantos más dispositivos alimentados por la red añadas, más sólida será la red.

Tres lecturas para profundizar:

- La guía [Zigbee, Wi-Fi, Thread y Matter explicados con sencillez](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/), con una tabla a mano.
- El artículo [Matter, Thread, Zigbee, Wi-Fi: qué elegir en 2027](/es/domotica/matter-thread-zigbee-wifi-que-protocolo-2027/), para ver hacia dónde va el mercado.
- La [tabla de compatibilidad entre marcas y cajas](/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/), para comprobar que un dispositivo se reconoce.

Nuestra regla de partida: Zigbee para los sensores de pila, Wi-Fi local para enchufes y módulos alimentados por la red (por ejemplo los de la marca Shelly, que se controlan sin pasar por internet) y Matter cuando no quieres depender de una sola marca.

## Paso 4: comprar los primeros dispositivos, un kit y no un almacén

Un buen kit de inicio se compone de pocos objetos: un dongle Zigbee si eliges esta radio, uno o dos sensores, uno o dos enchufes y, si quieres, una bombilla o una válvula para radiador. La página [primeros dispositivos que comprar](/es/domotica/primeros-dispositivos-domotica-comprar/) propone kits por objetivo y por presupuesto, solo como rangos, sin precios fijos inventados.

El SONOFF ZBDongle-E es un coordinador Zigbee USB que funciona con ZHA o Zigbee2MQTT, las dos formas de conectar Zigbee a Home Assistant, y tiene un amplio catálogo de sensores compatibles. El coordinador es la pieza que dirige la red Zigbee de tu casa. Los precios varían de una tienda a otra: compruébalos con el vendedor antes de comprar.

## Paso 5: crear las primeras automatizaciones

Una automatización es una regla del tipo «si pasa esto, entonces haz aquello». Se compone de un disparador (qué ocurre), condiciones opcionales (en qué caso) y acciones (qué hace la casa).

Ejemplo: cuando el detector del pasillo ve movimiento (disparador) y está oscuro (condición), la luz se enciende (acción).

La página de [primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/) presenta diez ideas concretas, desde la luz que se enciende sola hasta el aviso de que la lavadora ha terminado, tanto para Home Assistant como para Homey.

## ¿Y después?

Con la base asentada, aquí tienes dónde profundizar:

- Instalar Home Assistant: el [tutorial para Raspberry Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/), o la [comparativa entre Green y Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/) si dudas.
- Elegir Homey: [Pro mini, unboxing e instalación](/es/domotica/test-homey-pro-mini-unboxing-instalacion/).
- Construir tus propios sensores: los [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/).
- Elegir entre dos formas de conectar Zigbee a Home Assistant: [Zigbee2MQTT o ZHA](/es/domotica/zigbee2mqtt-o-zha-home-assistant/).
- Recorrer todas nuestras guías para principiantes: el [resumen de guías de domótica](/es/domotica/).

## Preguntas frecuentes

**¿Por dónde empiezo si solo tengo una hora?**
Lee los pasos 1 y 2, elige un único objetivo y pasa después al [recorrido corto](/es/domotica/como-empezar/). Sobre todo, no compres cinco marcas Wi-Fi distintas el primer día: acabarías con cinco aplicaciones que gestionar.

**¿Es obligatorio usar Home Assistant?**
No. Para dos enchufes y una bombilla pueden bastar la aplicación del fabricante o Matter (un lenguaje común que entienden muchas marcas). Home Assistant, u Homey, resulta útil cuando quieres que los dispositivos actúen juntos y sigan funcionando sin internet.

**¿Funciona todo si se cae internet?**
Lo que se gestiona en local sigue funcionando: sensores Zigbee, central local, automatizaciones. En cambio, todo lo que pasa por los servidores de un fabricante (la nube) se detiene, como el control por voz. Los detalles están en la página de [errores de principiante](/es/domotica/errores-principiante-domotica-faq/).

**¿Dónde encuentro el significado de una palabra técnica que no entiendo?**
En el [glosario de domótica](/es/domotica/glosario-domotica/). Cada término se explica en una o dos frases, con un ejemplo sacado de una casa real.

---

*Aviso de afiliación: los enlaces a Amazon.es llevan el identificador del sitio (roboteducat07-21). Si compras a través de ellos, puede recibirse una comisión, sin coste adicional para ti. Comprueba precios y disponibilidad con el vendedor. Autor: Emmanuel Sauvage.*
