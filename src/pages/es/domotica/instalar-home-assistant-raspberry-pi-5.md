---
layout: ../../../layouts/EsPost.astro
title: "Instalar Home Assistant en Raspberry Pi 5: guía completa 2026"
description: "Paso a paso: Home Assistant OS en Raspberry Pi 5, arranque NVMe, red, HACS, copias de seguridad, dongle Zigbee y acceso remoto seguro."
updated: "24 de octubre de 2026"
---

Instalar **Home Assistant en Raspberry Pi 5** en 2026 es sencillo con **Raspberry Pi Imager** y arranque directo desde SSD NVMe. De la compra del material a la primera automatización: red, copias, HACS, Zigbee y acceso remoto.

## Material recomendado

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Componente</th>
<th scope="col">Notas</th>
</tr></thead><tbody>
<tr>
<td data-label="Componente"><span class="td-val"><strong>Raspberry Pi 5 4 GB</strong></span></td>
<td data-label="Notas"><span class="td-val">Suficiente para ~30 dispositivos y pocas cámaras</span></td>
</tr>
<tr>
<td data-label="Componente"><span class="td-val"><strong>Pi 5 8 GB</strong></span></td>
<td data-label="Notas"><span class="td-val">Frigate, NAS ligero, 50+ dispositivos</span></td>
</tr>
<tr>
<td data-label="Componente"><span class="td-val"><strong>Fuente oficial 27 W USB-C</strong></span></td>
<td data-label="Notas"><span class="td-val">Imprescindible; fuentes débiles provocan cuelgues</span></td>
</tr>
<tr>
<td data-label="Componente"><span class="td-val"><strong>microSD SanDisk Extreme 64 GB</strong></span></td>
<td data-label="Notas"><span class="td-val">O NVMe 256 GB (recomendado a largo plazo)</span></td>
</tr>
<tr>
<td data-label="Componente"><span class="td-val"><strong>Caja con ventilador</strong></span></td>
<td data-label="Notas"><span class="td-val">Oficial Pi 5 o Argon NEO 5</span></td>
</tr>
<tr>
<td data-label="Componente"><span class="td-val"><strong>Cable Ethernet</strong></span></td>
<td data-label="Notas"><span class="td-val">Wi-Fi no recomendado como único enlace (interferencias con Zigbee 2,4 GHz)</span></td>
</tr>
<tr>
<td data-label="Componente"><span class="td-val"><strong>SONOFF ZBDongle-E</strong></span></td>
<td data-label="Notas"><span class="td-val">Zigbee ZHA/Z2M (<a href="https://www.amazon.es/dp/B0B6P22YJC?tag=roboteducat07-21" data-amazon-query="SONOFF ZBDongle-E" data-amazon-query="SONOFF ZBDongle-E">Amazon.es</a>)</span></td>
</tr>
</tbody>
</table>
</div>

Enlaces: [Pi 5 4 GB](https://www.amazon.es/s?k=raspberry+pi+5+4gb&tag=roboteducat07-21), [fuente 27 W](https://www.amazon.es/s?k=raspberry+pi+power+supply+27w&tag=roboteducat07-21), [SanDisk 64 GB](https://www.amazon.es/s?k=sandisk+extreme+64gb&tag=roboteducat07-21).

**NVMe (opcional)**: HAT M.2 oficial + SSD 256 GB (Crucial P3). ~5× más rápido y fiable que SD para escrituras intensas de HA.

## Paso 1: Imager (SD o NVMe)

1. [Raspberry Pi Imager](https://www.raspberrypi.com/software/)  
2. Dispositivo: **Raspberry Pi 5**  
3. SO: *Otros → Home Assistant* (HAOS 13+)  
4. Almacenamiento: microSD o SSD  
5. Ajustes (engranaje): hostname `homeassistant`, locale **Europe/Madrid**, teclado **es**  
6. Escribir (~10 min)

NVMe: SSD en PC o adaptador USB; firmware Pi ≥ sept 2024 para arranque sin SD.

## Paso 2: Primer arranque

Ethernet al router, alimentación USB-C. Primer boot **5–8 min** (descarga contenedores). Luego **http://homeassistant.local:8123**

Si no resuelve mDNS: IP en router (Movistar HGU, Orange Livebox, Vodafone, Digi…) o app **Fing**. En Windows: instalar Bonjour si hace falta.

Cuenta admin, nombre de casa, mapa (sol/lever útil), zona **Europe/Madrid**, métrico, **EUR**.

## Paso 3: IP fija (recomendado)

Reserva DHCP en router: MAC del Pi → IP fija (ej. `192.168.1.100`).

## Paso 4: Actualizaciones

*Ajustes → Sistema → Actualizaciones* → Core, Supervisor, OS.

## Paso 5: Copia de seguridad

*Sistema → Copias de seguridad* → completa (~2–5 GB) → descargar `.tar`. Opcional: complemento Google Drive Backup, 1/día.

## Paso 6: HACS

Complemento **Terminal & SSH** → en terminal:

wget -O - https://get.hacs.xyz | bash -

Reiniciar → *Añadir integración HACS* (cuenta GitHub).

## Paso 7: Zigbee con ZHA

1. Dongle USB (extensión ~1 m).  
2. *Dispositivos y servicios → ZHA* → puerto `/dev/ttyUSB0` o `/dev/ttyACM0`, EZSP para ZBDongle-E.  
3. Emparejar p. ej. [SONOFF SNZB-02D](/es/domotica/sensor-temperatura-zigbee/): botón 5 s.

Alternativa: [Zigbee2MQTT](/es/domotica/zigbee2mqtt-o-zha-home-assistant/).

## Paso 8: Complementos útiles

- **File editor** / **Studio Code Server**  
- **ESPHome** ([sensor ESP32](/es/domotica/esp32-esphome-sensor-temperatura/))  
- **Samba share**, **Terminal & SSH**

## Paso 9: Primera automatización

Ejemplo: si `sensor.temperatura_salon` &lt;19 entre 6:00 y 22:00 → `switch.turn_on` en enchufe del radiador; apagar si &gt;21.

Interfaz gráfica o YAML en `automations.yaml`.

## Paso 10: Acceso remoto

1. **Nabu Casa** (de pago, sin abrir puertos): *Home Assistant Cloud*.  
2. **DuckDNS + Let's Encrypt** (gratis, requiere IPv4 pública y port forwarding 443→8123).  
3. **Tailscale** (VPN WireGuard, sin exponer HA): complemento Tailscale + app móvil.

En España muchos operadores usan CG-NAT: Tailscale o Nabu Casa evitan depender de abrir puertos.

## Solución de problemas

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Síntoma</th>
<th scope="col">Causa probable</th>
<th scope="col">Acción</th>
</tr></thead><tbody>
<tr>
<td data-label="Síntoma"><span class="td-val">LED verde 4 parpadeos</span></td>
<td data-label="Causa probable"><span class="td-val">NVMe/firmware o SD</span></td>
<td data-label="Acción"><span class="td-val">Actualizar EEPROM; reflashear SD</span></td>
</tr>
<tr>
<td data-label="Síntoma"><span class="td-val"><code>homeassistant.local</code> no va</span></td>
<td data-label="Causa probable"><span class="td-val">mDNS bloqueado</span></td>
<td data-label="Acción"><span class="td-val">Usar IP</span></td>
</tr>
<tr>
<td data-label="Síntoma"><span class="td-val">Cuelgues</span></td>
<td data-label="Causa probable"><span class="td-val">Fuente no 27 W o SD barata</span></td>
<td data-label="Acción"><span class="td-val">Fuente oficial; migrar NVMe</span></td>
</tr>
<tr>
<td data-label="Síntoma"><span class="td-val">Dongle no detectado</span></td>
<td data-label="Causa probable"><span class="td-val">Hub USB sin alimentación</span></td>
<td data-label="Acción"><span class="td-val">Directo al Pi; probar puertos</span></td>
</tr>
<tr>
<td data-label="Síntoma"><span class="td-val">SD corrupta a los 12 meses</span></td>
<td data-label="Causa probable"><span class="td-val">Muchas escrituras</span></td>
<td data-label="Acción"><span class="td-val">SanDisk Extreme o NVMe; <code>recorder.purge_keep_days: 7</code></span></td>
</tr>
</tbody>
</table>
</div>

## Tutoriales sensores en Raspberry Pi

- [CO2 SCD41](/es/domotica/raspberry-pi-co2-scd41-home-assistant/)  
- [Estación BME280](/es/domotica/raspberry-pi-estacion-meteo-bme280/)  
- [PIR e iluminación](/es/domotica/raspberry-pi-sensor-movimiento-luces/)  
- [Puerta con notificación](/es/domotica/raspberry-pi-sensor-puerta-notificacion/)

Respaldo en apagones: [SAI o estación](/es/domotica/respaldo-electrico-home-assistant/).

## Comparar hardware

[Home Assistant Green vs Pi 5](/es/domotica/home-assistant-green-vs-raspberry-pi-5/) · [Mejor dongle Zigbee](/es/domotica/mejor-dongle-zigbee-home-assistant/) · [Enchufes inteligentes](/es/domotica/enchufes-inteligentes/)

*Enlaces Amazon.es tag roboteducat07-21. Guía documental, octubre 2026.*

[Todas las guías](/es/domotica/)
