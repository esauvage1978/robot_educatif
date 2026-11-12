---
layout: ../../../layouts/EsPost.astro
title: "Robot fregasuelos y estación de autolimpieza: mopas y bases comparadas"
description: "Mopa arrastrada, vibrante, rotativa o rodillo; estación de vaciado, lavado y secado. Tablas, mantenimiento y enlaces domótica HA."
updated: "4 de noviembre de 2026"
---

<nav class="breadcrumb" aria-label="Miga de pan"><a href="/es/">Inicio</a> · <a href="/es/domotica/">Domótica</a> · Robots fregasuelos</nav>

> **Respuesta directa** — Un robot **fregasuelos** no es un solo producto: la **mopa arrastrada** sirve para mantenimiento ligero; las **discos rotativos** o el **rodillo** limpian manchas secas; la **estación** vacía el polvo, enjuaga la mopa y a veces seca. Para muchos hogares con suelo duro y alguna alfombra, busque **mopa rotativa con elevación automática** y base con **lavado + secado**. Hub: [domótica](/es/domotica/) · [por dónde empezar](/es/domotica/como-empezar/) · [guía completa](/es/domotica/empezar-domotica-guia-completa/) · robots en HA: [aspirador compatible Home Assistant](/es/domotica/robot-aspirador-home-assistant/) · presupuesto: [robots &lt; 200 €](/es/domotica/robot-aspirador-menos-200-euros/).

« Aspirador y fregador » aparece en casi todos los robots recientes, pero cubre sistemas muy distintos. Una mopa húmeda arrastrada no se parece a dos discos rotativos. Esta guía compara **mecanismos**, **estaciones** y **mantenimiento** con cifras orientativas (precios a verificar en tienda).

![Robot aspirador — illustration guide budget](/images/illustrations/robot-aspirateur-moins-de-200-euros.webp)

*Robots entrée de gamme : souvent mopa arrastrada; vérifiez elevación de mopa si tiene alfombras.*

![Console Puissance 4 — exemple visuel pédagogique du site](/images/blog/lot11/puissance4-console-exemple.png)

*Autre illustration du site (programmation) — les tableaux ci-dessus restent la référence pour choisir mopas et stations.*

## Mopas: tabla resumen

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Sistema</th>
<th scope="col">Principio</th>
<th scope="col">Manchas</th>
<th scope="col">Alfombras</th>
<th scope="col">Gama orientativa</th>
</tr></thead><tbody>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Mopa arrastrada</strong></span></td>
<td data-label="Principio"><span class="td-val">paño húmedo por peso del robot</span></td>
<td data-label="Manchas"><span class="td-val">baja: mantenimiento ligero</span></td>
<td data-label="Alfombras"><span class="td-val">evitar o quitar mopa</span></td>
<td data-label="Gama orientativa"><span class="td-val">entrada (≈ 200–350 € robot)</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Mopa vibrante</strong></span></td>
<td data-label="Principio"><span class="td-val">placa que vibra</span></td>
<td data-label="Manchas"><span class="td-val">media</span></td>
<td data-label="Alfombras"><span class="td-val">a menudo elevación de mopa</span></td>
<td data-label="Gama orientativa"><span class="td-val">media</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Mopas rotativas</strong></span></td>
<td data-label="Principio"><span class="td-val">dos discos presionando</span></td>
<td data-label="Manchas"><span class="td-val">buena</span></td>
<td data-label="Alfombras"><span class="td-val">elevación según modelo</span></td>
<td data-label="Gama orientativa"><span class="td-val">media-alta (≈ 400–700 €)</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Rodillo</strong></span></td>
<td data-label="Principio"><span class="td-val">rodillo que se enjuaga</span></td>
<td data-label="Manchas"><span class="td-val">buena</span></td>
<td data-label="Alfombras"><span class="td-val">elevación</span></td>
<td data-label="Gama orientativa"><span class="td-val">alta (≈ 700 €+)</span></td>
</tr>
</tbody>
</table>
</div>

**Recomendación para muchos hogares: mopa rotativa con elevación automática**, para fregar bien sin empapar alfombras. Con presupuesto ajustado, mopa arrastrada sigue siendo útil, como en la selección [por menos de 200 €](/es/domotica/robot-aspirador-menos-200-euros/).

## Estaciones: tabla resumen

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Función</th>
<th scope="col">Qué hace</th>
<th scope="col">Qué queda por hacer</th>
</tr></thead><tbody>
<tr>
<td data-label="Función"><span class="td-val"><strong>Vaciado automático</strong></span></td>
<td data-label="Qué hace"><span class="td-val">aspira el depósito del robot a una bolsa</span></td>
<td data-label="Qué queda por hacer"><span class="td-val">cambiar la bolsa (cada 30–60 días según uso)</span></td>
</tr>
<tr>
<td data-label="Función"><span class="td-val"><strong>Relleno de agua</strong></span></td>
<td data-label="Qué hace"><span class="td-val">llena el depósito del robot</span></td>
<td data-label="Qué queda por hacer"><span class="td-val">llenar agua limpia, vaciar sucia</span></td>
</tr>
<tr>
<td data-label="Función"><span class="td-val"><strong>Lavado de mopas</strong></span></td>
<td data-label="Qué hace"><span class="td-val">enjuaga mopas entre pasadas</span></td>
<td data-label="Qué queda por hacer"><span class="td-val">limpiar la bandeja semanalmente</span></td>
</tr>
<tr>
<td data-label="Función"><span class="td-val"><strong>Secado</strong></span></td>
<td data-label="Qué hace"><span class="td-val">aire caliente/templado</span></td>
<td data-label="Qué queda por hacer"><span class="td-val">limita olores (≈ 2–3 h ciclo)</span></td>
</tr>
<tr>
<td data-label="Función"><span class="td-val"><strong>Conexión a agua</strong> (algunos)</span></td>
<td data-label="Qué hace"><span class="td-val">entrada y desagüe</span></td>
<td data-label="Qué queda por hacer"><span class="td-val">instalación cerca del grifo</span></td>
</tr>
</tbody>
</table>
</div>

## Suelo y sistema

- **Baldosa, parquet lacado, vinilo**: todos valen; rotativas y rodillo quitan mejor marcas secas.
- **Parquet aceitado o encerado**: poca agua y consulta al fabricante del suelo.
- **Con alfombras**: **elevación automática** de mopa o base que retire mopas antes de alfombra.

Comparativa de navegación (LiDAR vs cámara): [LiDAR, cámara o giroscopio](/es/domotica/robot-aspirador-navegacion-lidar/).

## Mantenimiento (coste anual orientativo)

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Consumible</th>
<th scope="col">Frecuencia típica</th>
<th scope="col">Orden de magnitud</th>
</tr></thead><tbody>
<tr>
<td data-label="Consumible"><span class="td-val">Bolsas estación</span></td>
<td data-label="Frecuencia típica"><span class="td-val">1–2 / mes (hogar medio)</span></td>
<td data-label="Orden de magnitud"><span class="td-val">15–40 € / año</span></td>
</tr>
<tr>
<td data-label="Consumible"><span class="td-val">Filtro HEPA</span></td>
<td data-label="Frecuencia típica"><span class="td-val">2–4 / año</span></td>
<td data-label="Orden de magnitud"><span class="td-val">20–50 €</span></td>
</tr>
<tr>
<td data-label="Consumible"><span class="td-val">Mopas / rodillos</span></td>
<td data-label="Frecuencia típica"><span class="td-val">2–6 / año</span></td>
<td data-label="Orden de magnitud"><span class="td-val">25–80 €</span></td>
</tr>
</tbody>
</table>
</div>

La estación reduce trabajo pero no lo elimina. Comprueba **consumibles en España** y SAV. **Home Assistant** (**HA** — automatización local) puede seguir desgaste si la integración lo permite: [robots compatibles con HA](/es/domotica/robot-aspirador-home-assistant/).

## FAQ

**¿Mopa rotativa en parquet?**  
Sí con poca agua y sin productos agresivos; prueba en una zona oculta.

**¿Estación obligatoria?**  
No, pero evita vaciar el depósito a diario en hogares con mascotas.

**¿Zigbee / Matter?**  
Algunos modelos exponen mapa o estado vía cloud; para HA local, verifique integración antes de comprar — [matriz compatibilidad EN](/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/) o guías en [domótica](/es/domotica/).

## Siguiente lectura

- [Todas las guías domótica](/es/domotica/)
- [Empezar en domótica](/es/domotica/empezar-domotica-guia-completa/)
- [Robots aspirador Home Assistant](/es/domotica/robot-aspirador-home-assistant/)
