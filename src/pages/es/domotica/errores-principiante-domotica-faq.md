---
layout: ../../../layouts/EsPost.astro
title: "Errores de principiante en domótica (FAQ)"
description: "¿Hay que saber programar? ¿Nube o local? ¿Y si se cae internet? Las preguntas que los principiantes no se atreven a hacer en domótica, con respuestas francas y consejos para evitar trampas."
updated: "30 de octubre de 2026"
faqSchema:
  - question: "¿Hay que saber programar para empezar?"
    answer: "No. Home Assistant tiene un editor visual y Homey usa tarjetas que se ensamblan, llamadas Flows. YAML, ESPHome y MQTT sirven más adelante, cuando te entran ganas de trastear."
  - question: "¿Nube o local: qué elegir?"
    answer: "Si quieres que la calefacción y las luces sigan funcionando cuando se cae internet, apuesta por el local. La nube es cómoda para la voz pero crea dependencia. Muchas casas combinan las dos."
  - question: "¿Cuánto cuesta de verdad empezar?"
    answer: "No existe una cifra única. Como orden de magnitud, algunas decenas de euros solo con Wi-Fi y varios cientos con una caja, un dongle Zigbee y sensores. Comprueba los precios con el vendedor el día de la compra."
  - question: "¿Qué pasa si se cae internet?"
    answer: "Los sensores Zigbee con una caja local siguen funcionando. Los enchufes que dependen de los servidores del fabricante suelen dejar de responder, y la voz en la nube no está disponible."
  - question: "¿Home Assistant es demasiado difícil para mí?"
    answer: "Hay una curva de aprendizaje, entre actualizaciones y vocabulario. El recorrido corto y la guía completa te acompañan paso a paso, y Homey sigue siendo una alternativa menos técnica."
---

Cuando se empieza en domótica surgen muchas preguntas que las guías técnicas no abordan con franqueza: ¿tendré que programar? ¿Qué pasa si se cae internet? ¿Cuánto cuesta de verdad? ¿Puedo hacerlo si vivo de alquiler?

Esta página responde sin rodeos. Encontrarás los errores que casi todos los principiantes cometen y cómo evitarlos antes de haber gastado un euro. Estas respuestas no sustituyen ni las instrucciones de seguridad de los aparatos ni a un electricista cualificado cuando se trata de intervenir en la instalación eléctrica.

## Para ir más lejos

- [Qué box domótica elegir (principiante)](/es/domotica/que-box-domotica-elegir-principiante/)
- [Domótica de alquiler, sin obras](/es/domotica/domotica-alquiler-sin-obras/)
- [Glosario de domótica](/es/domotica/glosario-domotica/)
- [Tabla de compatibilidad de dispositivos](/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/)

## Los siete errores más frecuentes

1. **Comprar antes de tener un objetivo.** Se vuelve a casa con diez objetos y ninguna regla útil. Escribe primero qué quieres que haga la casa.
2. **Multiplicar las apps de los fabricantes.** Cada una tiene su app y su cuenta, y acabas prisionero de cada una. Mejor dispositivos que hablen un lenguaje común (Zigbee, una radio de bajo consumo, o Matter, un lenguaje que entienden varias marcas) reunidos por una sola caja.
3. **Olvidar los repetidores Zigbee.** Un sensor aislado al fondo del jardín no «aguanta». Hacen falta aparatos alimentados por la red, como un enchufe, que repitan su señal.
4. **Poner Home Assistant directamente en internet.** Home Assistant es el programa gratuito que reúne tus dispositivos. Para acceder desde fuera, pasa por una red privada virtual (VPN) o por una solución documentada como la suscripción Nabu Casa. Elige contraseñas sólidas y activa la verificación en dos pasos cuando exista.
5. **Cortar cualquier enchufe.** Algunos aparatos, como un disco de red, no soportan que los corten bruscamente.
6. **Olvidar que se vive de alquiler.** Taladrar o empotrar un módulo puede estar prohibido: lee nuestra página sobre [domótica de alquiler](/es/domotica/domotica-alquiler-sin-obras/).
7. **Creer que Matter lo resuelve todo.** Matter es un lenguaje común prometedor, pero su catálogo hay que comprobarlo dispositivo por dispositivo: mira el artículo sobre los [protocolos en 2027](/es/domotica/matter-thread-zigbee-wifi-que-protocolo-2027/).

## Preguntas frecuentes

### ¿Hay que saber programar para empezar?

No. Home Assistant tiene un editor visual, y Homey (una caja ya preparada que se compra en tienda) usa tarjetas que se ensamblan, llamadas Flows. YAML (un formato de texto para escribir reglas), ESPHome (una herramienta para programar pequeñas placas electrónicas) y MQTT (un sistema de mensajes entre dispositivos) sirven más adelante, cuando te entran ganas de trastear. Nuestras [diez primeras automatizaciones](/es/domotica/primeras-automatizaciones-domotica/) se hacen sin programar.

### ¿Nube o local: qué elegir?

La nube son los servidores del fabricante en internet. El local es cuando todo se queda en tu casa. Si quieres que la calefacción y las luces sigan funcionando cuando se cae internet, apuesta por el local: Home Assistant, Homey con dispositivos locales, Zigbee o módulos Shelly controlados en tu red. La nube es cómoda para el control por voz y para algunas funciones del fabricante, pero crea una dependencia. Muchas casas combinan las dos: primero el local, la voz como complemento.

### ¿Cómo sé si un dispositivo es compatible?

Mira primero la ficha del fabricante, que indica si funciona con Matter, con Zigbee o si ofrece control local. Consulta después la [tabla de compatibilidad](/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/) y las listas de dispositivos de ZHA, de Zigbee2MQTT (dos herramientas que gestionan Zigbee en Home Assistant) y de las apps de Homey. Desconfía de las promesas vagas como «compatible con Alexa» si buscas un funcionamiento local con Home Assistant.

### Vivo de alquiler: ¿qué puedo hacer?

Muchas cosas sin taladrar: enchufes, sensores de pila, pulsadores, cabezales termostáticos desmontables que se enroscan en el radiador y, a veces, bombillas de rosca. Evita los módulos empotrados sin el acuerdo del propietario. Nuestra página sobre [domótica de alquiler](/es/domotica/domotica-alquiler-sin-obras/) lo detalla todo.

### ¿Cuánto cuesta de verdad empezar?

No existe una cifra única. Como orden de magnitud, cuenta algunas decenas de euros solo con Wi-Fi y varios cientos con una caja, un dongle Zigbee y sensores. Las suscripciones opcionales, como el acceso remoto o el almacenamiento de las imágenes de las cámaras, se suman. Consulta los rangos en nuestras páginas sobre la [elección de la caja](/es/domotica/que-box-domotica-elegir-principiante/) y sobre los [primeros dispositivos](/es/domotica/primeros-dispositivos-domotica-comprar/), y comprueba los precios con el vendedor el día de la compra.

### Seguridad y privacidad: ¿qué hábitos adoptar?

Usa una contraseña distinta para cada cuenta y para la caja, y haz las actualizaciones. Para las cámaras, prefiere aquellas cuyas imágenes se quedan en tu casa, y averigua adónde van las imágenes si no es así. No expongas nunca la interfaz de administración de la caja en internet sin protección. Si sabes hacerlo, aísla los objetos conectados en una red separada del resto de la casa; si no, empieza con sencillez, pero cambia siempre las contraseñas de fábrica.

### ¿Qué pasa si se cae internet?

| Tu instalación | Lo que suele pasar |
|---|---|
| Sensores Zigbee con una caja local (Home Assistant u Homey) | Las automatizaciones siguen funcionando |
| Enchufes que dependen de los servidores del fabricante | A menudo dejan de responder |
| Control por voz (Google, Alexa) | No disponible o muy limitado |
| Acceso remoto desde fuera | Cortado, pero todo sigue siendo utilizable desde casa |

### ¿Hace falta una caja desde el principio?

No. Dos enchufes Wi-Fi para probar durante una semana pueden bastar. En cuanto quieras que varios dispositivos actúen juntos, pasa a la [elección de la caja](/es/domotica/que-box-domotica-elegir-principiante/).

### ¿Home Assistant es demasiado difícil para mí?

Hay una curva de aprendizaje: las actualizaciones, el vocabulario. El [recorrido corto](/es/domotica/como-empezar/) y la [guía completa](/es/domotica/empezar-domotica-guia-completa/) te guían paso a paso. Homey sigue siendo una alternativa menos técnica.

### ¿Se puede hacer todo solo con Matter?

Todavía no para todas las necesidades: el catálogo de dispositivos y la madurez varían. Matter es una apuesta por la compatibilidad, útil, pero Zigbee sigue siendo muy pragmático en 2026. Mira la página sobre los [protocolos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/).

### ¿Con qué sustituir una primera caja que no encaja?

Si tus dispositivos hablan Zigbee o Matter, pasar a Home Assistant o a Homey es realista. La verdadera trampa son los dispositivos que dependen por completo de los servidores de su marca. De ahí la importancia de elegir bien desde el principio, con la [guía completa](/es/domotica/empezar-domotica-guia-completa/).

### ¿Son fiables los precios «de unos tantos euros» que se encuentran en la web?

No como un compromiso. Tómalos como órdenes de magnitud y abre la ficha del vendedor el día de la compra.

### ¿Los productos recomendados en este sitio están patrocinados?

Algunos enlaces son de afiliación (Amazon, Shelly) y se señalan como tales. Si compras a través de estos enlaces, el sitio puede recibir una comisión, sin coste adicional para ti. Esto no cambia el criterio: ningún precio se inventa y los límites de cada producto se indican.

### ¿Dónde pedir ayuda después?

Empieza por la documentación oficial de Home Assistant, de Homey o de Jeedom, y después por las comunidades de usuarios. En este sitio, la página de [códigos de error y resolución de problemas](/es/domotica/codigos-error-solucion-zigbee-home-assistant-shelly/) y los [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/) pueden ayudarte.

---

*Autor: Emmanuel Sauvage.*
