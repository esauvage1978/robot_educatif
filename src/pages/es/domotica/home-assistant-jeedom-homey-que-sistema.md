---
layout: ../../../layouts/EsPost.astro
title: "Home Assistant, Jeedom, Homey o caja comercial: ¿qué «cerebro» para la domótica?"
description: "Home Assistant, Jeedom, Homey Pro, Google Home, Alexa o Apple Casa: local o nube, protocolos, dificultad y perfil recomendado. Tabla comparativa para empezar."
updated: "24 de octubre de 2026"
---

Una casa conectada necesita un **cerebro**: el software o caja que recibe datos de sensores y lanza automatizaciones. Condiciona protocolos, funcionamiento sin Internet y facilidad diaria. Opciones principales según documentación oficial ([Home Assistant](https://www.home-assistant.io/installation/), [Jeedom](https://doc.jeedom.com/), [Homey Pro](https://homey.app/es-es/homey-pro/)).

## Lo esencial en una tabla

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Sistema</th>
<th scope="col">Tipo</th>
<th scope="col">¿Sin Internet?</th>
<th scope="col">Protocolos nativos</th>
<th scope="col">Dificultad</th>
<th scope="col">Para quién</th>
</tr></thead><tbody>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Home Assistant</strong></span></td>
<td data-label="Tipo"><span class="td-val">software libre en Raspberry Pi, mini-PC o caja oficial</span></td>
<td data-label="¿Sin Internet?"><span class="td-val">sí</span></td>
<td data-label="Protocolos nativos"><span class="td-val">Wi-Fi, Matter; Zigbee, Z-Wave, Thread con dongle</span></td>
<td data-label="Dificultad"><span class="td-val">media</span></td>
<td data-label="Para quién"><span class="td-val">quien quiere control local total</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Jeedom</strong></span></td>
<td data-label="Tipo"><span class="td-val">software con caja oficial</span></td>
<td data-label="¿Sin Internet?"><span class="td-val">sí</span></td>
<td data-label="Protocolos nativos"><span class="td-val">vía plugins (algunos de pago)</span></td>
<td data-label="Dificultad"><span class="td-val">media</span></td>
<td data-label="Para quién"><span class="td-val">ecosistema de plugins</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Homey Pro</strong></span></td>
<td data-label="Tipo"><span class="td-val">caja todo en uno</span></td>
<td data-label="¿Sin Internet?"><span class="td-val">sí (dispositivos locales)</span></td>
<td data-label="Protocolos nativos"><span class="td-val">Zigbee, Z-Wave, Thread, Matter, Wi-Fi, Bluetooth, 433 MHz, IR</span></td>
<td data-label="Dificultad"><span class="td-val">baja</span></td>
<td data-label="Para quién"><span class="td-val">caja lista sin montar radios</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Google / Alexa / Apple Casa</strong></span></td>
<td data-label="Tipo"><span class="td-val">asistente vocal</span></td>
<td data-label="¿Sin Internet?"><span class="td-val">parcial</span></td>
<td data-label="Protocolos nativos"><span class="td-val">Wi-Fi, Matter, Thread según dispositivo</span></td>
<td data-label="Dificultad"><span class="td-val">muy baja</span></td>
<td data-label="Para quién"><span class="td-val">pocas luces y enchufes, voz</span></td>
</tr>
</tbody>
</table>
</div>

**Nuestra recomendación: Home Assistant**, en [Green o Raspberry Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/). Gratis, local y compatible con casi todas las marcas. Es el sistema de nuestros tutoriales.

## Home Assistant: el más abierto

Proyecto open source de Nabu Casa. Se instala en [Raspberry Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/), mini-PC o Green. Más de 1 500 integraciones, de Philips Hue a [robots aspiradores Roborock](/es/domotica/robot-aspirador-home-assistant/). Un dongle USB añade Zigbee o Thread ([qué dongle](/es/domotica/mejor-dongle-zigbee-home-assistant/)).

A cambio: configuración ocasional y actualizaciones mensuales. Acceso remoto: propio o Home Assistant Cloud (opcional de pago).

## Jeedom: alternativa con plugins

Código GPL, Raspberry Pi o cajas oficiales. Funciones por **plugins** (gratis o de pago en el Market). Buena opción si prefieres ecosistema de plugins.

## Homey Pro: la caja completa

Zigbee, Z-Wave, Thread, Matter, Wi-Fi, Bluetooth, 433 MHz e infrarrojo en un solo equipo. App cuidada y automatizaciones visuales «Flows». Menos técnico, pero hardware propietario.

Probamos la versión compacta: [Homey Pro mini, unboxing e instalación](/es/domotica/test-homey-pro-mini-unboxing-instalacion/).

## Google, Alexa, Apple: práctico pero limitado

Gestionan bien unos enchufes y bombillas; se abren a **Matter** (ver [protocolos](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/)). Para automatizaciones avanzadas o sin Internet, se quedan cortos. Complemento útil: Home Assistant puede exponer dispositivos para voz.

## Cómo decidir

1. **Solo quiero encender luces por voz**: asistente vocal.
2. **Casa local sin suscripción**: Home Assistant.
3. **Local sin configurar**: Homey Pro.
4. **Prefiero plugins**: Jeedom.

Siguiente paso: [Domótica para principiantes](/es/domotica/como-empezar/) y [domótica en alquiler](/es/domotica/domotica-alquiler-sin-obras/).

[Todas las guías](/es/domotica/)
