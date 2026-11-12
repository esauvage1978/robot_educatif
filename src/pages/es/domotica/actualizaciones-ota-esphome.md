---
layout: ../../../layouts/EsPost.astro
title: Actualizaciones OTA ESPHome sin cable
description: "Actualiza un ESP32 por Wi-Fi con ESPHome: OTA, contraseña, Home Assistant, modo seguro y errores comunes. Material, esquema GPIO, YAML ESPHome y Home Assis"
updated: "30 de octubre de 2026"
---

**OTA** significa «Over The Air», literalmente «por el aire»: actualizar el programa de un ESP32, una pequeña placa electrónica con Wi-Fi, por la red inalámbrica, sin desenchufarlo de la pared ni llevarlo de vuelta al ordenador para conectar un cable USB. Para un sensor fijado en un falso techo, una tableta de pared o una electroválvula en el jardín, es lo que hace practicable el mantenimiento: modificas tu archivo de configuración (el YAML) desde el sofá y la placa se actualiza sola.

**Resultado esperado:** una nueva versión del YAML instalada sin cable y un procedimiento de recuperación si algo sale mal. **Duración:** 10 minutos. **Dificultad:** principiante.

## Requisitos previos

- Un dispositivo ya flasheado una vez por USB con un YAML que contenga el bloque `ota:` ([primer flasheo](/es/domotica/flashear-esp32-esphome/)).
- El dispositivo encendido, conectado al Wi-Fi y visible en ESPHome (indicador «Online»).
- Un ordenador o un Home Assistant en la misma red local.

## Activar la OTA en el YAML

Las configuraciones de este sitio ya contienen este bloque:

```yaml
ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "mi-dispositivo Fallback"
    password: !secret ap_password

captive_portal:
```

La contraseña impide que cualquier otra máquina de la red envíe un programa a tu placa. Los bloques `ap` y `captive_portal` crean una red Wi-Fi de emergencia si la placa no encuentra la habitual: consulta la sección de recuperación.

## Actualizar desde ESPHome Device Builder

1. Edita el archivo YAML del dispositivo, por ejemplo cambiando un intervalo de medida.
2. Haz clic en **Install** (o **⋮ → Install**).
3. Elige **Wirelessly**.
4. Espera a la compilación y luego a la subida: aparece una barra de progreso y después la placa se reinicia.

Por línea de comandos, `esphome run mi-dispositivo.yaml` ofrece la misma elección y encuentra el dispositivo en la red.

**Comprobación:** en los logs, la placa vuelve a conectarse al Wi-Fi y luego a Home Assistant. En **Ajustes → Dispositivos y servicios**, la versión de ESPHome del dispositivo se actualiza en su ficha.

## ¿Qué hacer si falla la OTA?

La placa casi siempre se recupera sin cable:

- **Modo seguro (safe mode):** si la placa se reinicia varias veces seguidas (10 por defecto) sin arrancar bien, ESPHome lanza un modo mínimo que solo acepta OTA. Corrige el YAML y reinstálalo sin cables.
- **Wi-Fi de emergencia:** si no se encuentra la red habitual, conéctate al Wi-Fi «Fallback» de la placa con la contraseña `ap_password`. La página del portal permite elegir una red o subir un archivo `.bin`.
- **Último recurso:** vuelve a flashear por USB ([tutorial](/es/domotica/flashear-esp32-esphome/)).

## Problemas frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| «Error resolving IP address» | El nombre `.local` no se resuelve (mDNS) | Añade `use_address: 192.168.x.x` bajo `wifi:` y reserva esa IP en el router |
| Contraseña rechazada | La contraseña cambió en el YAML | Reflashea una vez por USB con la nueva contraseña |
| La subida se interrumpe | Señal Wi-Fi débil | Acerca la placa al router y reintenta |
| Dispositivo «Offline» | Apagado o en otra red | Revisa la alimentación y el Wi-Fi |
| Compila pero no envía | Cortafuegos o VLAN entre el ordenador y la placa | Permite el puerto 3232 entre ambos |

## Buenas prácticas de seguridad

Mantén una contraseña OTA, no la expongas nunca a Internet (el puerto 3232 no debe redirigirse nunca desde el router) y guarda a buen recaudo la clave de cifrado de la API. Actualiza ESPHome con regularidad: cada versión enumera sus cambios en el [registro de cambios](https://esphome.io/changelog/). Tras un salto de versión, lee los cambios incompatibles antes de reinstalar tus dispositivos.

Siguiente: [proyectos ESP32 paso a paso](/es/domotica/proyectos-esp32-domotica/) y [bases del cableado GPIO](/es/domotica/bases-cableado-esp32-gpio/).

<small>Actualizado el 30 de octubre de 2026. Fuente: [documentación de ESPHome, plataforma OTA](https://esphome.io/components/ota/esphome/). Los valores por defecto pueden cambiar entre versiones.</small>
