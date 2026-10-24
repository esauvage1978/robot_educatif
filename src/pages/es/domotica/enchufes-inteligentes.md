---
layout: ../../../layouts/EsPost.astro
title: "Enchufes inteligentes para Home Assistant en España: guía 2026"
description: "Cómo elegir un enchufe inteligente para hogares en España (Schuko tipo F, 230 V): Zigbee, Wi-Fi o Matter, medición de consumo, marcado y configuración en Home Assistant."
updated: "24 de octubre de 2026"
---

El enchufe inteligente es el primer aparato domótico más fácil de adoptar, pero también aquel en el que **el país importa más**. Un modelo para enchufes británicos (tipo G) o estadounidenses (tipo A/B) es el producto equivocado para una casa en España. Esta guía explica en qué fijarse.

## 1. Lo básico de la electricidad

| | España |
|---|---|
| Enchufes | Schuko tipo F; las clavijas planas europeas (tipo C) también encajan |
| Tensión | 230 V, 50 Hz |
| Carga | la carga nominal del enchufe inteligente figura en el propio aparato: compruébala |
| Marcado | CE |

**Comprueba siempre la carga nominal** del enchufe antes de conectar un calefactor o un hervidor, y evita encadenar varios enchufes uno detrás de otro.

## 2. ¿Zigbee, Wi-Fi o Matter?

| Tipo | Ventajas | Inconvenientes | Elígelo si |
|---|---|---|---|
| **Zigbee** | local, bajo consumo, hace de repetidor en la malla | necesita un coordinador Zigbee | usas Home Assistant con un [dongle Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/) |
| **Wi-Fi** | sin central, configuración rápida con la app | carga la red Wi-Fi, a menudo depende de la nube | estás empezando |
| **Matter (sobre Wi-Fi o Thread)** | funciona con Apple Casa, Google Home, Alexa, SmartThings y Home Assistant | revisa el logo Matter y la versión en la caja | no quieres atarte a un fabricante |

## 3. Qué mirar en la ficha técnica

- **Medición de consumo** (W, kWh): útil para detectar consumos en espera y para avisarte cuando termina la lavadora.
- **Carga nominal**: en los modelos Schuko suele ser de 16 A, pero comprueba siempre el dato del fabricante.
- **Control local**: ¿funciona sin la nube del fabricante? Shelly, la mayoría de los enchufes Zigbee y los enchufes Matter lo permiten.
- **Botón y LED en el aparato**: prácticos para las visitas; comprueba si el LED se puede apagar en el dormitorio.

## 4. Ejemplo: los enchufes Shelly

Shelly vende sus enchufes en **versiones por país** (europea Schuko, UK, EE. UU.), con Wi-Fi, control local e integración con Home Assistant. Elige tu versión en la [gama de enchufes Shelly](https://www.shelly.com/collections/smart-plugs). Para la iluminación cableada en la instalación, el relé [Shelly 1 Gen4](https://www.shelly.com/es/products/shelly-1-gen4) admite **110–240 V AC** y conmuta hasta **16 A a 240 V** ([Shelly Knowledge Base](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4)). Se instala detrás de un interruptor, y es un trabajo para un instalador autorizado: comparativa completa en [Shelly Gen4: qué módulo elegir](/es/shelly-gen4-que-modulo-elegir/).

## 5. Añadir un enchufe a Home Assistant

1. **Enchufe Zigbee**: en Home Assistant abre la integración ZHA o Zigbee2MQTT, elige *Añadir dispositivo* y mantén pulsado el botón del enchufe hasta que el LED parpadee.
2. **Enchufe Wi-Fi**: conéctalo a la red con la app del fabricante y añade después la integración correspondiente (Shelly se detecta automáticamente en la red local).
3. **Enchufe Matter**: escanea el código QR Matter con la app Home Assistant Companion.

## 6. Dos automatizaciones útiles

- **Lavadora terminada**: cuando la potencia se queda por debajo de unos pocos vatios durante dos minutos, envía una notificación al móvil.
- **Apagar el modo espera por la noche**: apaga el rincón de la tele a medianoche y vuelve a encenderlo a las 7.

¿Estás empezando de cero? Lee [Domótica para principiantes](/es/domotica/como-empezar/).

[Todas las guías de domótica](/es/domotica/)
