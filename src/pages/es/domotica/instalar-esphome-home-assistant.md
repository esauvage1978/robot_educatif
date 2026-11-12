---
layout: ../../../layouts/EsPost.astro
title: Instalar ESPHome en Home Assistant
description: "Instala ESPHome Device Builder: complemento, secrets.yaml, cifrado, primer ESP32-C6 y adopción en HA. Material, esquema GPIO, YAML ESPHome y Home Assistant"
updated: "30 de octubre de 2026"
---

**ESPHome** es un software que convierte una placa ESP32, una pequeña placa electrónica con Wi-Fi, en un dispositivo domótico: describes lo que debe hacer la placa en un sencillo archivo de configuración llamado YAML, y ESPHome lo convierte en el programa de la placa, sin que escribas código. En Home Assistant, el software libre que reúne tus dispositivos conectados, el complemento **ESPHome Device Builder** aporta el editor, el compilador (la herramienta que fabrica el programa) y la herramienta de actualización. Una vez instalado, sirve para todos tus proyectos ESP32.

**Resultado esperado:** ESPHome abierto en la barra lateral, un archivo `secrets.yaml` y un primer dispositivo listo para flashear. **Duración:** 20 minutos. **Dificultad:** principiante.

## ¿Qué método de instalación?

Los complementos existen solo en **Home Assistant OS** (Green, Yellow, Raspberry Pi, máquina virtual) y **Supervised**. En una instalación **Container** o **Core**, ESPHome se instala aparte, como se describe más abajo. Si no sabes qué variante usas, abre **Ajustes → Sistema → Acerca de**: la línea «Tipo de instalación» lo indica.

## Método A: complemento (Home Assistant OS)

1. Abre **Ajustes → Complementos** y luego **Tienda de complementos** abajo a la derecha.
2. Busca **ESPHome Device Builder** y haz clic en **Instalar**.
3. Una vez instalado, activa **Mostrar en la barra lateral** y haz clic en **Iniciar**.
4. Abre **ESPHome** en la barra lateral: aparece el panel, vacío al principio.

**Comprobación:** el panel de ESPHome carga sin errores y ofrece el botón **+ New Device**.

## Método B: Container o Core

Sin complementos, instala ESPHome en cualquier máquina Linux, macOS o Windows con Python:

```bash
pip install esphome
esphome dashboard config/
```

El panel se abre entonces en `http://localhost:6052`. También hay una imagen Docker oficial (`ghcr.io/esphome/esphome`, con `--net=host` para que funcione el descubrimiento de red): sigue la [documentación de instalación de ESPHome](https://esphome.io/guides/installing_esphome/).

## Preparar el archivo secrets.yaml

En ESPHome haz clic en **Secrets** (arriba a la derecha). Este archivo mantiene tus contraseñas fuera de los archivos de dispositivos, de modo que puedes compartirlos sin revelarlas:

```yaml
wifi_ssid: "NombreDeTuRed"
wifi_password: "contrasena-wifi"
ap_password: "contrasena-de-emergencia"
api_encryption_key: "PEGA-UNA-CLAVE-GENERADA"
ota_password: "contrasena-ota"
```

Genera la clave de cifrado con `openssl rand -base64 32` (o con cualquier generador de 32 bytes en base64). Tu red debe ser de **2,4 GHz**: el ESP32-C6 no se conecta a una red solo de 5 GHz. No publiques nunca este archivo.

## Crear el primer dispositivo

1. Haz clic en **+ New Device** y luego en **Continue**.
2. Ponle un nombre en minúsculas sin espacios, por ejemplo `test-esp32`, y confirma.
3. Elige **ESP32-C6** como tipo de placa. El asistente crea el archivo del dispositivo; cierra la ventana de instalación sin flashear por ahora.
4. Haz clic en **Edit** y sustituye el contenido por una base mínima:

```yaml
esphome:
  name: test-esp32

esp32:
  board: esp32-c6-devkitc-1
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "test-esp32 Fallback"
    password: !secret ap_password

captive_portal:
```

Haz clic en **Validate**: el mensaje «Configuration is valid» confirma la sintaxis. Este archivo no se ha ejecutado en una placa para este artículo; sigue la estructura estándar de la documentación de ESPHome.

## Flashear y adoptar el dispositivo en Home Assistant

El primer flasheo se hace por cable USB: sigue [flashear un ESP32 con ESPHome](/es/domotica/flashear-esp32-esphome/). Después Home Assistant detecta el dispositivo: abre **Ajustes → Dispositivos y servicios**, haz clic en **Configurar** en la tarjeta ESPHome descubierta y pega la clave de cifrado. Las actualizaciones siguientes se hacen [sin cable, por OTA](/es/domotica/actualizaciones-ota-esphome/).

## Problemas frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| No se encuentra el complemento ESPHome | Instalación Container o Core | Usa el método B |
| «Invalid key» al adoptar | Clave distinta de la del YAML | Copia el valor exacto de `api_encryption_key` |
| Compilación muy larga | Primera compilación, caché vacía | Ten paciencia: las siguientes son más rápidas |
| Error «secret not defined» | Entrada ausente de `secrets.yaml` | Añade la línea que falta |
| El dispositivo nunca se descubre | Wi-Fi de 5 GHz, VLAN aparte o mDNS bloqueado | Usa 2,4 GHz y la misma red que Home Assistant |

Siguiente: elige un [proyecto ESP32](/es/domotica/proyectos-esp32-domotica/) y repasa las [bases del cableado GPIO](/es/domotica/bases-cableado-esp32-gpio/).

<small>Actualizado el 30 de octubre de 2026. Fuentes: [documentación de ESPHome](https://esphome.io/) y [documentación de Home Assistant](https://www.home-assistant.io/). Comprueba los nombres de menús en tu versión.</small>
