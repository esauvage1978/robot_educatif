---
layout: ../../../layouts/EsPost.astro
title: Flashear un ESP32 con ESPHome (USB)
description: "Primer flasheo de un ESP32-C6: cable USB, controladores CP210x/CH340, ESPHome Web, modo boot y errores. Material, esquema GPIO, YAML ESPHome y Home Assista"
updated: "30 de octubre de 2026"
---

**Flashear** una placa ESP32 es escribir por primera vez su programa en su memoria. Esta primera escritura debe hacerse por cable USB, porque una placa nueva no conoce todavía ni tu red Wi-Fi ni ESPHome, el software que prepara ese programa a partir de un archivo de configuración llamado YAML (un simple texto que describe lo que debe hacer la placa). Después, todas las actualizaciones van por la red sin cable: se llaman [actualizaciones OTA](/es/domotica/actualizaciones-ota-esphome/). Este tutorial te guía paso a paso en ese primer flasheo con una ESP32-C6-DevKitC-1, una pequeña placa electrónica con Wi-Fi, desde un ordenador con Windows, macOS o Linux.

**Resultado esperado:** la placa arranca con tu configuración, se conecta al Wi-Fi de 2,4 GHz y aparece en Home Assistant. **Duración:** de 15 a 30 minutos. **Dificultad:** principiante.

![Placa Espressif ESP32-C6-DevKitC-1: módulo ESP32-C6-WROOM-1, puertos UART y USB, botones BOOT y RESET](/images/products/esp32-c6-devkitc.webp)

La placa de este tutorial es la **ESP32-C6-DevKitC-1**. El puerto **UART** sirve para el primer flasheo por cable; el puerto **USB** es el puerto nativo del microcontrolador. Los dos botones del frente son **RESET** y **BOOT**.

## Qué necesitas antes de empezar

- Una placa ESP32 (consulta [qué placa ESP32 elegir](/es/domotica/que-placa-esp32-domotica/)) y un **cable USB-C de datos**: muchos cables «solo carga» no transmiten datos, la primera causa de placa no encontrada.
- ESPHome instalado en Home Assistant ([instalar ESPHome](/es/domotica/instalar-esphome-home-assistant/)) y un archivo YAML del dispositivo.
- Un navegador **Chrome o Edge** (Firefox y Safari no admiten el USB serie en el navegador).

## Paso 1: conectar la placa e instalar el controlador si hace falta

La ESP32-C6-DevKitC-1 tiene dos puertos USB-C. Usa el marcado como **UART**: pasa por un chip de conversión USB-serie (CP210x en la placa oficial). El otro, marcado USB, es el puerto nativo del microcontrolador.

En Windows 10 y 11 el controlador suele instalarse solo. Si no, instala el controlador **CP210x** de Silicon Labs, o el **CH340** para las placas con ese chip. Comprueba que aparezca un puerto «COM» en el Administrador de dispositivos, sección «Puertos (COM y LPT)». En macOS el controlador suele venir integrado. En Linux, añade tu usuario al grupo `dialout` (`sudo usermod -a -G dialout $USER`) y vuelve a iniciar sesión.

**Comprobación:** al desenchufar y volver a enchufar la placa, una línea aparece y desaparece en la lista de puertos.

## Paso 2: generar el archivo de flasheo

En ESPHome Device Builder, en la tarjeta de tu dispositivo, abre el menú **⋮ → Install** y luego **Manual download**. Cuando termine la compilación (unos minutos la primera vez), elige **Factory format** y guarda el archivo `.bin`.

Si Home Assistant está abierto por HTTPS y la placa está conectada al ordenador que muestra la página, la opción **Plug into the computer running ESPHome Dashboard** evita la descarga. No funciona en una dirección local con HTTP simple.

## Paso 3: flashear con ESPHome Web

1. Abre [web.esphome.io](https://web.esphome.io/) en Chrome o Edge.
2. Haz clic en **Connect** y elige el puerto de la placa (por ejemplo «USB JTAG/serial» o «CP210x»).
3. Haz clic en **Install**, selecciona el archivo `.bin` descargado y confirma.
4. Espera a que termine la escritura: la página muestra el progreso y luego un mensaje de éxito.

**Si falla la conexión:** pon la placa en modo descarga. Mantén pulsado **BOOT**, pulsa brevemente **RESET** (o EN), suelta BOOT y vuelve a intentarlo.

## Paso 4: comprobar que todo funciona

En ESPHome Web abre **Logs** tras la instalación: las líneas de arranque deben mostrar la conexión Wi-Fi y luego la dirección IP. En Home Assistant abre **Ajustes → Dispositivos y servicios**: el dispositivo ESPHome aparece entre los descubiertos. Haz clic en **Configurar** e introduce la clave de cifrado de la API que figura en tu YAML.

## Problemas frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| Ningún puerto en la lista | Cable solo carga o puerto USB equivocado | Cambia de cable, usa el puerto UART |
| «Failed to connect» | La placa no está en modo descarga | BOOT pulsado, RESET, soltar BOOT |
| Escritura interrumpida | Cable o hub USB poco fiable | Conecta directamente al ordenador |
| La placa se reinicia en bucle | Configuración no válida o pin reservado | Lee los logs; consulta las [bases del cableado GPIO](/es/domotica/bases-cableado-esp32-gpio/) |
| Sin conexión Wi-Fi | Red solo de 5 GHz o contraseña errónea | Usa los 2,4 GHz, revisa `secrets.yaml` |

## ¿Y ahora qué?

Ponlo en práctica con un [proyecto ESP32 paso a paso](/es/domotica/proyectos-esp32-domotica/) o con la guía completa del [sensor de temperatura](/es/domotica/esp32-esphome-sensor-temperatura/). Documentación oficial: [ESPHome Web](https://web.esphome.io/) y la [guía de inicio de ESPHome](https://esphome.io/guides/getting_started_hassio/).

<small>Actualizado el 30 de octubre de 2026. Los nombres de menús de ESPHome y Home Assistant cambian: compruébalos en tu versión.</small>
