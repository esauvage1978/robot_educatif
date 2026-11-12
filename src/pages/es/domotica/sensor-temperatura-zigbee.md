---
layout: ../../../layouts/EsPost.astro
title: "Sensor temperatura Zigbee Home Assistant: comparativa 2026"
description: "SNZB-02D, Aqara T1 y más: precisión, pilas y emparejado ZHA. Tabla comparativa y automatizaciones de calefacción."
updated: "2 de noviembre de 2026"
shareTitle: "Sensor temperatura Zigbee — comparativa compra"
shareDescription: "Elige SNZB-02D con pantalla o Aqara T1; tabla, ubicación y FAQ para Home Assistant."
---

<nav class="breadcrumb" aria-label="Miga de pan"><a href="/es/domotica/">Domótica</a> · Sensor temperatura Zigbee</nav>

> **Respuesta rápida (noviembre 2026)** — Para la mayoría de hogares con **Home Assistant**, el **SONOFF SNZB-02D** equilibra **pantalla LCD**, precisión **±0,2 °C** y **~2 años** de pila CR2450. Si priorizas diseño o **HomeKit**, mira **Aqara T1**. Necesitas un **coordinador Zigbee** (dongle USB) con **ZHA** o **Zigbee2MQTT**.

Un **sensor de temperatura Zigbee** (red mesh 2,4 GHz de bajo consumo) vigila cada habitación, automatiza calefacción y avisa si el aire está seco. Esta guía forma parte del hub [domótica para empezar](/es/domotica/como-empezar/) y complementa [Zigbee2MQTT o ZHA](/es/domotica/zigbee2mqtt-o-zha-home-assistant/).

![Sensor SONOFF SNZB-02D con pantalla](/images/products/sonoff-snzb-02d.webp)

*Foto producto : el SNZB-02D muestra temperatura y humedad sin abrir la app.*

## Nuestra elección: SONOFF SNZB-02D

- **Pantalla LCD** integrada  
- Precisión **±0,2 °C**, humedad ±2 % HR  
- Autonomía **~2 años** (CR2450)  
- Historial min/max 24 h en pantalla  
- Compatible **ZHA** (integración nativa) y **Zigbee2MQTT**

**Verificar precio:** [SONOFF SNZB-02D en Amazon.es](https://www.amazon.es/dp/B0BYZP8NK2?tag=roboteducat07-21) · [Pack de 2](https://www.amazon.es/dp/B0BZCV658S?tag=roboteducat07-21)

## Tabla comparativa

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Modelo</th>
<th scope="col">Medidas</th>
<th scope="col">Pantalla</th>
<th scope="col">Precisión</th>
<th scope="col">Autonomía</th>
<th scope="col">Pila</th>
<th scope="col">¿Para quién?</th>
</tr></thead><tbody>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>SONOFF SNZB-02D</strong></span></td>
<td data-label="Medidas"><span class="td-val">T, HR</span></td>
<td data-label="Pantalla"><span class="td-val">LCD</span></td>
<td data-label="Precisión"><span class="td-val">±0,2 °C</span></td>
<td data-label="Autonomía"><span class="td-val">2 años</span></td>
<td data-label="Pila"><span class="td-val">CR2450</span></td>
<td data-label="¿Para quién?"><span class="td-val"><strong>Mejor equilibrio</strong></span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>Aqara T1</strong></span></td>
<td data-label="Medidas"><span class="td-val">T, HR, presión</span></td>
<td data-label="Pantalla"><span class="td-val">e-ink</span></td>
<td data-label="Precisión"><span class="td-val">±0,3 °C</span></td>
<td data-label="Autonomía"><span class="td-val">1–2 años</span></td>
<td data-label="Pila"><span class="td-val">CR2032</span></td>
<td data-label="¿Para quién?"><span class="td-val">diseño, HomeKit</span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>SONOFF SNZB-02P</strong></span></td>
<td data-label="Medidas"><span class="td-val">T, HR</span></td>
<td data-label="Pantalla"><span class="td-val">—</span></td>
<td data-label="Precisión"><span class="td-val">±0,4 °C</span></td>
<td data-label="Autonomía"><span class="td-val">1,5 años</span></td>
<td data-label="Pila"><span class="td-val">CR2477</span></td>
<td data-label="¿Para quién?"><span class="td-val">sin pantalla, ahorro</span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>Tuya TS0201</strong></span></td>
<td data-label="Medidas"><span class="td-val">T, HR</span></td>
<td data-label="Pantalla"><span class="td-val">—</span></td>
<td data-label="Precisión"><span class="td-val">±0,5 °C</span></td>
<td data-label="Autonomía"><span class="td-val">1 año</span></td>
<td data-label="Pila"><span class="td-val">2×AAA</span></td>
<td data-label="¿Para quién?"><span class="td-val">mínimo precio</span></td>
</tr>
<tr>
<td data-label="Modelo"><span class="td-val"><strong>Aqara FP2</strong></span></td>
<td data-label="Medidas"><span class="td-val">T, HR, presencia mmWave</span></td>
<td data-label="Pantalla"><span class="td-val">—</span></td>
<td data-label="Precisión"><span class="td-val">±0,5 °C</span></td>
<td data-label="Autonomía"><span class="td-val">USB</span></td>
<td data-label="Pila"><span class="td-val">sectores</span></td>
<td data-label="¿Para quién?"><span class="td-val">presencia principal</span></td>
</tr>
</tbody>
</table>
</div>

*Precios: comprobar en tienda.*

## Cómo elegir

**¿Pantalla?** SNZB-02D o Aqara T1 si quieres leer sin móvil.  
**¿Precisión calefacción/bebé?** SNZB-02D (±0,2 °C). Para automatizar «si &lt;19 °C», ±0,5 °C también vale.  
**¿Cuántos sensores?** Estudio 30 m²: 1; 50 m²: 2; 80 m²: 3; 100 m²: 4–5 (no hace falta en WC o pasillo).

## Ubicación

✅ Centro de habitación, 1,2–1,8 m, a la sombra  
❌ Junto a ventana, radiador, cocina activa, baño muy húmedo

**Alcance Zigbee**: 10–15 m interior; más lejos, añade [enchufes repetidores](/es/domotica/enchufes-inteligentes/) o [dongle](/es/domotica/mejor-dongle-zigbee-home-assistant/).

## Emparejar con ZHA (paso a paso)

1. **Ajustes → Dispositivos y servicios → Zigbee (ZHA) → Añadir dispositivo**  
2. Quita lengüeta de la pila, pulsa botón **5 s** hasta parpadeo  
3. Renombra entidades (`sensor.temperatura_salon`) y asigna habitación  
4. Comprueba **batería** y **temperatura** en Registro durante 24 h  

Calibración opcional con **sensor plantilla** si hay &gt;1 °C de desviación respecto a un termómetro de referencia.

## Automatizaciones (ejemplos)

**Calefacción &lt;19 °C** (6:00–22:00): automatización `numeric_state` + `switch.turn_on` en enchufe del radiador.

**Alerta habitación bebé** &lt;17 °C o &gt;24 °C: `notify.mobile_app`.

**Humedad &gt;70 %** 1 h: aviso riesgo moho (trastero, sótano).

**Gráfico 7 días** en Lovelace: tarjeta `history-graph` con varias entidades.

## Problemas habituales

- No empareja: pila nueva, &lt;3 m del dongle, reset 10 s.  
- Lectura errónea: sol directo o junto a radiador.  
- Batería corta: Duracell/Energizer, OTA firmware vía ZHA.  
- Humedad 99 %: condensación; secar sensor, evitar &gt;80 % HR permanente.

## Temperaturas orientativas (España, confort)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Habitación</th>
<th scope="col">Día</th>
<th scope="col">Noche</th>
</tr></thead><tbody>
<tr>
<td data-label="Habitación"><span class="td-val">Salón</span></td>
<td data-label="Día"><span class="td-val">19–21 °C</span></td>
<td data-label="Noche"><span class="td-val">18–19 °C</span></td>
</tr>
<tr>
<td data-label="Habitación"><span class="td-val">Dormitorio</span></td>
<td data-label="Día"><span class="td-val">18–20 °C</span></td>
<td data-label="Noche"><span class="td-val">16–18 °C</span></td>
</tr>
<tr>
<td data-label="Habitación"><span class="td-val">Bebé</span></td>
<td data-label="Día"><span class="td-val">18–20 °C</span></td>
<td data-label="Noche"><span class="td-val">18–19 °C</span></td>
</tr>
<tr>
<td data-label="Habitación"><span class="td-val">Baño (uso)</span></td>
<td data-label="Día"><span class="td-val">22–24 °C</span></td>
<td data-label="Noche"><span class="td-val">—</span></td>
</tr>
</tbody>
</table>
</div>

Humedad confort **40–60 % RH** (OMS).

## FAQ

**¿Basta ±0,5 °C para calefacción?** Sí para confort general ; usa ±0,2 °C si comparas habitaciones o vigilas un bebé.

**¿CO2 con esto?** No; hace falta sensor CO2 ([SCD41 Pi](/es/domotica/raspberry-pi-co2-scd41-home-assistant/) o [proyectos ESP32](/es/domotica/proyectos-esp32-domotica/)).

**¿Exterior?** IP20 ; usa carcasa estanca o ESP32 DIY.

**¿Zigbee vs ESP32 DIY?** Zigbee: pilas, plug-and-play. ESP32: USB, más barato ([tuto ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/)).

## Más lectura

- [Zigbee2MQTT o ZHA](/es/domotica/zigbee2mqtt-o-zha-home-assistant/)  
- [Enchufes inteligentes](/es/domotica/enchufes-inteligentes/)  
- [Instalar Home Assistant](/es/domotica/instalar-home-assistant-raspberry-pi-5/)  
- [PIR Raspberry Pi](/es/domotica/raspberry-pi-sensor-movimiento-luces/)  
- [Protocolos domótica](/es/domotica/protocolos-domotica-zigbee-wifi-thread-matter/)

*Enlaces Amazon.es tag roboteducat07-21. Selección documental, noviembre 2026.*

[Todas las guías](/es/domotica/)
