---
layout: ../../../layouts/EsPost.astro
title: "10 proyectos ESP32 para domótica con ESPHome y Home Assistant"
description: "Proyectos ESP32 + ESPHome: sensores, relés, LED, estación meteo, voz local y pantalla e-paper. Del principiante al avanzado, con enlaces a tutoriales."
updated: "2 de noviembre de 2026"
shareTitle: "10 proyectos ESP32 domótica"
shareDescription: "Hub de proyectos ESP32 con ESPHome: por dificultad y enlaces a guías paso a paso."
---

<nav class="breadcrumb" aria-label="Miga de pan"><a href="/es/domotica/">Domótica</a> · Proyectos ESP32</nav>

**Respuesta rápida (noviembre 2026)** — **ESP32** (*microcontrolador Wi-Fi*) + **ESPHome** (firmware declarativo) convierte un chip barato en sensor, relé o pantalla en **Home Assistant**. Cada proyecto enlazado abajo tiene su propia guía con material, YAML y pruebas.

Este hub forma parte de nuestra [domótica](/es/domotica/) con [sensor de temperatura ESP32](/es/domotica/esp32-esphome-sensor-temperatura/), [cómo empezar](/es/domotica/como-empezar/) e [instalar Home Assistant](/es/domotica/instalar-home-assistant-raspberry-pi-5/).

Un **ESP32 con ESPHome** es una pequeña placa con Wi-Fi a la que ESPHome asigna una función concreta según lo que conectes: sensor, relé, detector o luz en Home Assistant. Cada proyecto de la tabla tiene su propia página (material, esquema, YAML, Home Assistant y averías). Si empiezas desde cero, elige un proyecto **Principiante** y lee antes las cuatro guías básicas.

Los precios del material cambian a menudo: los presupuestos son **estimaciones que debes comprobar en la tienda**.

## Los proyectos de un vistazo

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Proyecto</th>
<th scope="col">Nivel</th>
<th scope="col">Tiempo</th>
<th scope="col">Presupuesto (estimación, comprobar en tienda)</th>
</tr></thead><tbody>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/sensor-temperatura-humedad/">Sensor de temperatura y humedad</a></span></td>
<td data-label="Nivel"><span class="td-val">Principiante</span></td>
<td data-label="Tiempo"><span class="td-val">1–2 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 10–25 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/timbre-conectado/">Timbre conectado</a></span></td>
<td data-label="Nivel"><span class="td-val">Principiante</span></td>
<td data-label="Tiempo"><span class="td-val">1–2 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 15–30 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/sensor-apertura-puerta-ventana/">Sensor de apertura de puerta y ventana</a></span></td>
<td data-label="Nivel"><span class="td-val">Principiante</span></td>
<td data-label="Tiempo"><span class="td-val">1–2 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 15–35 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/puerta-garaje-esp32/">Puerta de garaje conectada</a></span></td>
<td data-label="Nivel"><span class="td-val">Intermedio</span></td>
<td data-label="Tiempo"><span class="td-val">2–4 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 20–45 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/detector-presencia-mmwave-ld2410/">Detector de presencia mmWave (LD2410)</a></span></td>
<td data-label="Nivel"><span class="td-val">Intermedio</span></td>
<td data-label="Tiempo"><span class="td-val">1–2 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 15–35 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/detector-fuga-agua/">Detector de fugas de agua</a></span></td>
<td data-label="Nivel"><span class="td-val">Intermedio</span></td>
<td data-label="Tiempo"><span class="td-val">1–3 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 12–30 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/estacion-meteo-bme280-bh1750/">Estación meteorológica BME280 + BH1750</a></span></td>
<td data-label="Nivel"><span class="td-val">Intermedio</span></td>
<td data-label="Tiempo"><span class="td-val">2–3 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 20–40 € según el vendedor</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/iluminacion-led-ws2812/">Iluminación LED WS2812</a></span></td>
<td data-label="Nivel"><span class="td-val">Intermedio</span></td>
<td data-label="Tiempo"><span class="td-val">2–3 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 25–60 € según el vendedor y la longitud de la tira</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/contador-energia-impulsos/">Contador de energía (impulsos S0)</a></span></td>
<td data-label="Nivel"><span class="td-val">Avanzado</span></td>
<td data-label="Tiempo"><span class="td-val">2–4 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 15–45 € según el vendedor (contador no incluido)</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/riego-automatico/">Riego automático</a></span></td>
<td data-label="Nivel"><span class="td-val">Avanzado</span></td>
<td data-label="Tiempo"><span class="td-val">3–5 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 35–70 € según el vendedor y la válvula</span></td>
</tr>
<tr>
<td data-label="Proyecto"><span class="td-val"><a href="/es/domotica/proyectos/nivel-sal-descalcificador-sensor/">Nivel de sal del descalcificador</a></span></td>
<td data-label="Nivel"><span class="td-val">Intermedio</span></td>
<td data-label="Tiempo"><span class="td-val">2–4 h</span></td>
<td data-label="Presupuesto (estimación, comprobar en tienda)"><span class="td-val">unos 25–90 € según la solución y el vendedor</span></td>
</tr>
</tbody>
</table>
</div>

## La base: una placa ESP32-C6

Todos los proyectos usan la misma placa de control. La elección se explica en [qué placa ESP32 para domótica](/es/domotica/que-placa-esp32-domotica/). [Buscar ESP32-C6 DevKit en Amazon.es](https://www.amazon.es/s?k=ESP32-C6+DevKit&tag=roboteducat07-21) (enlace de afiliado).

## Tutoriales básicos

Estas cuatro guías sirven para todos los proyectos: flasheo, instalación de ESPHome, actualizaciones OTA y cableado.

- [Flashear un ESP32 con ESPHome (USB, controladores, modo boot)](/es/domotica/flashear-esp32-esphome/) — Primer flasheo por USB, controladores CP210x/CH340, modo boot
- [Instalar ESPHome en Home Assistant (Device Builder)](/es/domotica/instalar-esphome-home-assistant/) — Complemento, secrets, primer dispositivo
- [Actualizaciones OTA de ESPHome: flashear sin cable](/es/domotica/actualizaciones-ota-esphome/) — Actualizar a distancia, contraseña OTA, recuperación
- [Bases del cableado ESP32: GPIO, 3,3 V y pull-up](/es/domotica/bases-cableado-esp32-gpio/) — Pines a evitar, 3,3 V frente a 5 V, pull-up, masa común

## ESP32 o Zigbee?

Un sensor ESP32 se personaliza sin límite (cualquier sensor I²C, SPI o GPIO) y se conecta directamente al Wi-Fi sin coordinador. Un sensor Zigbee funciona con pila y se coloca en cualquier sitio, pero necesita un coordinador. Para un sensor de pila pegado a una ventana, Zigbee suele ser más cómodo; para un proyecto a medida alimentado por USB, el ESP32 es más flexible.

## Seguridad: los 230 V no son un proyecto de bricolaje

Ninguno de los proyectos exige tocar los 230 V: los sensores funcionan a 3,3 V y las válvulas y los LED se alimentan con fuentes certificadas CE de baja tensión. Enchufes, cuadro eléctrico y circuitos de iluminación son trabajo de un electricista autorizado.

## Otras ideas

- **Pantalla e-paper del tiempo:** muestra tiempo y temperatura sin una pantalla siempre encendida (componente ESPHome `waveshare_epaper`).
- **Sensor de CO₂:** un MH-Z19B mide el CO₂; por encima de unos 1 000 ppm conviene ventilar.
- **Asistente de voz local:** M5Stack Atom Echo o Home Assistant Voice Preview Edition.
- **Calidad del aire completa:** BME680 + sensor de partículas PMS5003.

## Para profundizar

- [Tutorial: sensor de temperatura ESP32 + ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/)
- [Abrir la puerta del garaje desde el móvil (ESP32 + ESPHome)](/es/domotica/puerta-garaje-smartphone-esp32-esphome/)
- [Instalar Home Assistant en Raspberry Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/)
- [Domótica para principiantes](/es/domotica/como-empezar/)
- [Todas las guías](/es/domotica/)

Recursos: [esphome.io](https://esphome.io), [community.home-assistant.io](https://community.home-assistant.io). Los enlaces de Amazon son enlaces de afiliado: el sitio puede recibir una comisión, sin coste adicional para ti.
