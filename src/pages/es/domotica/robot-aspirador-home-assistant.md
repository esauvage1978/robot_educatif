---
layout: ../../../layouts/EsPost.astro
title: "Robot aspirador compatible con Home Assistant: marcas e integración"
description: "Roborock, iRobot Roomba, Ecovacs, SwitchBot, Shark, Xiaomi, Dreame: integración oficial o comunitaria, local o nube según Home Assistant. Tabla y consejos de compra."
updated: "24 de octubre de 2026"
---

Un robot aspirador brilla cuando se lanza **solo**: cuando la casa está vacía o solo en la cocina. Para eso debe estar en Home Assistant. No todas las marcas se integran igual: algunas en local, otras por nube, otras solo vía HACS. Tabla basada en la [documentación de Home Assistant](https://www.home-assistant.io/integrations/#vacuum) (octubre 2026).

<figure>
<img src="/images/schemas/ha-aspirateur.svg" alt="Dos caminos: el robot llega a Home Assistant por la red local o por la nube del fabricante" width="780" height="672" />
<figcaption>Flecha verde: el robot habla con Home Assistant en la red local. Flecha naranja: las órdenes pasan por la nube del fabricante. La tabla indica el camino que describe la documentación de Home Assistant para cada marca.</figcaption>
</figure>

## Lo esencial en una tabla

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Marca</th>
<th scope="col">Integración HA</th>
<th scope="col">Conexión (doc HA)</th>
<th scope="col">Nota</th>
</tr></thead><tbody>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Roborock</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roborock/">Roborock</a> (oficial)</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">Local Polling</span></td>
<td data-label="Nota"><span class="td-val">cuenta Roborock al configurar; luego control local</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>iRobot Roomba / Braava</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roomba/">Roomba</a> (oficial)</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">Local Push</span></td>
<td data-label="Nota"><span class="td-val">modelos Wi-Fi</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Ecovacs</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/ecovacs/">Ecovacs</a> (oficial)</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">Cloud Push</span></td>
<td data-label="Nota"><span class="td-val">depende de nube Ecovacs</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>SwitchBot</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/switchbot_cloud/">SwitchBot Cloud</a> (oficial)</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">Cloud Polling</span></td>
<td data-label="Nota"><span class="td-val">K10+, S10, etc.</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Shark</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/sharkiq/">Shark IQ</a> (oficial)</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">Cloud Polling</span></td>
<td data-label="Nota"><span class="td-val">gama Shark IQ</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Xiaomi (modelos antiguos)</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/xiaomi_miio/">Xiaomi Miio</a> (oficial)</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">Local Polling</span></td>
<td data-label="Nota"><span class="td-val">variable por modelo</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Dreame</strong></span></td>
<td data-label="Integración HA"><span class="td-val">sin integración oficial</span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">—</span></td>
<td data-label="Nota"><span class="td-val">comunitaria vía HACS</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Robots Matter</strong></span></td>
<td data-label="Integración HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/matter/">Matter</a></span></td>
<td data-label="Conexión (doc HA)"><span class="td-val">local</span></td>
<td data-label="Nota"><span class="td-val">categoría aspirador en Matter 1.2</span></td>
</tr>
</tbody>
</table>
</div>

**Nuestra recomendación: Roborock.** Integración oficial y control local, habitaciones y consumibles. También nuestro favorito económico, Roborock Q7 M5, en [robots por menos de 200 €](/es/domotica/robot-aspirador-menos-200-euros/).

## Local o nube

- **Local**: HA habla con el robot en la red. Rápido y sigue si cae Internet.
- **Nube**: cada orden pasa por servidores del fabricante; más frágil a largo plazo.

Para uso duradero, prioriza integración **Local** en la documentación.

## Qué automatizar

Entidad `vacuum`. Ejemplos:

- limpiar cuando nadie está en casa;
- solo cocina tras comer (si la integración lo permite);
- aviso de depósito lleno o robot atascado;
- desgaste de cepillos y filtros.

automation:
  - alias: "Limpieza cuando la casa está vacía"
    trigger:
      - platform: state
        entity_id: zone.home
        to: "0"
        for: "00:15:00"
    action:
      - action: vacuum.start
        target:
          entity_id: vacuum.robot_salon

Sustituye `vacuum.robot_salon` por tu entidad.

## Antes de comprar

1. Busca el modelo exacto en la página de integración de la marca.
2. Comprueba que sea **oficial** y **local** si puedes.
3. Navegación: LiDAR permite limpieza por habitaciones ([LiDAR, cámara o giroscopio](/es/domotica/robot-aspirador-navegacion-lidar/)).
4. Fregado y base: [robot fregasuelos y estaciones](/es/domotica/robot-fregasuelos-estacion-autolimpieza/).

¿Aún no tienes servidor? [Instalar Home Assistant en Raspberry Pi 5](/es/domotica/instalar-home-assistant-raspberry-pi-5/).

[Todas las guías](/es/domotica/)
