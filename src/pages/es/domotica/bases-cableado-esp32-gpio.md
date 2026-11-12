---
layout: ../../../layouts/EsPost.astro
title: "Cableado ESP32: GPIO, 3,3 V y pull-up"
description: "Cablea un ESP32-C6 sin dañarlo: 3,3 V, pines a evitar, pull-up, resistencia LED, masa común y prueba. Material, esquema GPIO, YAML ESPHome y Home Assistant"
updated: "30 de octubre de 2026"
---

Cablear un ESP32, una pequeña placa electrónica con Wi-Fi, exige respetar unas pocas reglas sencillas, pero ignorar una sola basta para quemar un pin u obtener medidas inestables. Este tutorial reúne las bases útiles para los [proyectos ESP32 del sitio](/es/domotica/proyectos-esp32-domotica/), con la ESP32-C6-DevKitC-1 como placa de referencia. Aprenderás qué son los GPIO, los pines metálicos alineados en el borde de la placa, cómo elegir el adecuado y cómo conectar con seguridad un pulsador y un LED.

**Resultado esperado:** saber elegir un pin, conectar un pulsador y un LED sin riesgo y probar el montaje con ESPHome. **Duración:** 30 minutos. **Dificultad:** principiante.

## Regla 1: los pines funcionan a 3,3 V

Los pines GPIO del ESP32-C6 trabajan a **3,3 V** y no toleran 5 V. Conectar la salida de 5 V de un sensor directamente a una entrada puede dañarla. Dos soluciones: alimentar el sensor a 3,3 V si lo admite, o rebajar su señal con un **convertidor de nivel** o un **divisor de tensión** (dos resistencias, por ejemplo 10 kΩ y 20 kΩ para pasar de 5 V a unos 3,3 V).

Cada pin da solo una corriente limitada: apunta a **una decena de miliamperios como máximo** y no superes nunca los valores de la hoja de datos de Espressif. Para una carga mayor (relé, tira LED, motor), usa un módulo pensado para ello, alimentado por separado, con **masa común** al microcontrolador.

## ¿Qué pines usar en la ESP32-C6-DevKitC-1?

| Pines | Nota | Uso recomendado |
|---|---|---|
| GPIO0 a GPIO3, GPIO6, GPIO7, GPIO10, GPIO11, GPIO18 a GPIO23 | Libres al arrancar | Entradas, salidas, I²C, UART |
| GPIO0 a GPIO6 | Pueden leer una tensión analógica (ADC) | Sondas analógicas |
| GPIO4, GPIO5, GPIO8, GPIO9, GPIO15 | Pines de configuración al arrancar; GPIO8 controla el LED RGB de la placa, GPIO9 es el botón BOOT | Evitar o usar con cuidado |
| GPIO12, GPIO13 | Enlace USB nativo | Dejar libres |
| GPIO16, GPIO17 | Consola serie (UART0) | Dejar libres |

Esta lista sigue la documentación de Espressif de la placa; compruébala para otra placa (por ejemplo XIAO ESP32C6), cuyos pines llevan otros números.

## Resistencias pull-up y entradas

Una entrada sin conectar «flota» y lee valores aleatorios. Una **resistencia pull-up** la fija en un nivel conocido. El ESP32 tiene resistencias internas que se activan en ESPHome:

```yaml
binary_sensor:
  - platform: gpio
    name: "Pulsador de prueba"
    pin:
      number: GPIO10
      mode: INPUT_PULLUP      # nivel alto en reposo
      inverted: true          # pulsar = ON
    filters:
      - delayed_on: 50ms      # antirrebote
      - delayed_off: 50ms
```

El pulsador va entre GPIO10 y GND: en reposo el pin lee 3,3 V, pulsado lee 0 V. Las resistencias internas son bastante débiles; para un cable de más de unos metros, añade una resistencia externa de 10 kΩ hacia 3V3.

## Conectar un LED con su resistencia

Un LED sin resistencia consume demasiada corriente. El cálculo es sencillo: R = (3,3 V − tensión del LED) ÷ corriente deseada. Para un LED rojo de unos 2 V a 5 mA: (3,3 − 2) ÷ 0,005 = 260 Ω, así que sirve una **resistencia de 330 Ω**. Conecta GPIO18 → resistencia → ánodo (patilla larga) → cátodo → GND.

```yaml
output:
  - platform: gpio
    pin: GPIO18
    id: led_out

light:
  - platform: binary
    name: "LED de prueba"
    output: led_out
```

Estos dos extractos no se han ejecutado en una placa para este artículo; siguen la sintaxis estándar de la documentación de ESPHome.

## Otras reglas que conviene conocer

- **Masa común:** todos los módulos unidos al microcontrolador deben compartir GND; si no, las señales carecen de referencia.
- **Polaridad:** invertir + y − suele destruir el componente. Comprueba el marcado o la hoja de datos.
- **Bus I²C:** SDA y SCL llevan resistencias pull-up (ya presentes en la mayoría de módulos); cada dispositivo tiene una dirección. La opción `scan: true` las lista.
- **Cargas inductivas** (relés, electroválvulas, motores): añade un diodo de rueda libre para las cargas de corriente continua.
- **230 V:** no conectes nunca la red a un pin, a una placa de pruebas ni a un módulo sin protección. Los montajes de red son cosa de un electricista.

## Método de prueba en cuatro pasos

1. **Monta en una placa de pruebas** antes de soldar.
2. **Comprueba con el multímetro:** continuidad de las uniones, ausencia de cortocircuito entre 3V3 y GND, sin tensión.
3. **Conecta un componente cada vez** y pruébalo antes de añadir el siguiente.
4. **Lee los logs de ESPHome** si un componente no responde.

**Comprobación:** en Home Assistant, «Pulsador de prueba» pasa a «on» al pulsar y «LED de prueba» enciende el LED.

## Problemas frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| La placa ya no arranca tras un cableado | Un componente tira de un pin de configuración | Desconecta GPIO4, 5, 8, 9 o 15, o cambia de pin |
| La entrada cambia sola | Pin flotante o cable largo | Pull-up interno o externo, cable más corto |
| LED muy débil o apagado | Polaridad invertida o resistencia demasiado alta | Gira el LED, prueba de 220 a 330 Ω |
| Valores analógicos inestables | Alimentación con ruido o pin sin ADC | Usa GPIO0 a GPIO6, añade un filtro `median` |
| Un componente está caliente | Cortocircuito o polaridad errónea | Desconecta de inmediato y revisa |

Para seguir: [flashear una placa](/es/domotica/flashear-esp32-esphome/) y [actualizar sin cable](/es/domotica/actualizaciones-ota-esphome/). Documentación oficial: [ESP32-C6-DevKitC-1, Espressif](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c6/esp32-c6-devkitc-1/user_guide.html).

<small>Actualizado el 30 de octubre de 2026. Comprueba los números de pin de tu placa antes de cualquier cableado.</small>
