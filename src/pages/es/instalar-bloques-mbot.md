---
layout: ../../layouts/EsPost.astro
title: "Instalar los bloques del mBot en mBlock 5 (capturas reales)"
description: "Añadir mBot o mBot2 como dispositivo en mBlock 5: capturas reales, paleta naranja, elección de modelo y solución de problemas — octubre 2026."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Hace falta USB para instalar los bloques del mBot?"
    answer: "No. Añadir el dispositivo mBot carga los bloques naranjas sin cable. USB o Bluetooth sirven después para conectar y cargar el programa."
  - question: "Solo veo bloques Scratch, no del mBot"
    answer: "Abre Dispositivos, clic Añadir (+), elige mBot o mBot2, OK, y haz clic en mBot en la lista para mantenerlo activo."
  - question: "¿mBot o mBot2 en la biblioteca?"
    answer: "Kit azul clásico con placa mCore → mBot. CyberPi o mBot2 → mBot2. En duda: mBot vs mBot2 en esta web."
  - question: "Los bloques mBot desaparecieron tras otro proyecto"
    answer: "Hay otro dispositivo activo (CyberPi, Ranger…). Vuelve a hacer clic en mBot en Dispositivos."
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti. Comprueba el precio en [Amazon.es](https://www.amazon.es/s?k=Makeblock+mBot&tag=roboteducat07-21) — no inventamos precios del día.

> **Respuesta directa (octubre 2026)** — En **mBlock 5** (editor por bloques de Makeblock, parecido a **Scratch** del MIT): **Dispositivos** → **Añadir (+)** → **mBot** (kit clásico **mCore**) o **mBot2** (**CyberPi**) → **OK**. Aparecen los bloques **naranjas** (motores, sensores, LED, zumbador). Sin este paso solo ves Scratch estándar. Antes: [Instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/) o [Descargar mBlock 5 gratis](/es/descargar-mblock-5-gratis/). Después: [Primeros pasos en mBlock 5](/es/primeros-pasos-mblock-5/) y [Primer programa mBot](/es/primer-programa-mbot/).

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Captura mBlock 5: biblioteca de dispositivos con la ficha mBot en la cuadrícula Makeblock." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Biblioteca de dispositivos mBlock 5 — la ficha **mBot** (segunda fila) es el robot azul clásico. Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

| Criterio | Valor |
| --- | --- |
| **Objetivo** | Mostrar los bloques de mando del mBot en mBlock 5 |
| **Dificultad** | Principiante (configuración de software) |
| **Tiempo** | 2–5 minutos |
| **Material** | PC con [mBlock 5](/es/instalar-mblock-5-windows/); el robot puede estar apagado |
| **Resultado** | **mBot** en **Dispositivos**; categoría de bloques mBot visible |

Para programar el [mBot educativo Makeblock](/es/mbot-mi-primer-robot-educativo/) hay que **declarar el modelo** en la biblioteca Makeblock. No es una extensión aparte: el **dispositivo activo** carga motores, sensores y LED en la paleta. ¿Duda entre escritorio, navegador o Python? Guía pilar: [¿Qué software mBlock para mBot?](/es/software-mblock-cual-elegir/).

## ¿Qué dispositivo elegir?

| Tu kit | Selecciona en mBlock | No confundir con |
| --- | --- | --- |
| mBot azul, dos motores, **mCore** | **mBot** | mBot2, Ranger |
| **mBot2**, **CyberPi** | **mBot2** o **CyberPi** | mBot v1 |
| Pack **Ranger** | **mBot Ranger** | mBot clásico |

¿Menús distintos? Lee [mBot vs mBot2](/es/mbot-vs-mbot2/).

## Requisitos previos

- **mBlock 5** instalado — [Instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/).
- Conocer la interfaz: [Primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/).
- **USB** / **Bluetooth** después para probar; no obligatorios solo para los bloques.

**Tablet / iPad:** procedimiento para **mBlock de escritorio**. En iPad usa la app oficial mBlock.

## 1. Abrir la zona «Dispositivos»

Columna izquierda → pestaña **Dispositivos**. Aquí indicas **qué robot** programas.

Etiquetas habituales: **Dispositivos**, **Añadir**, **Conectar**, **En directo** / **Cargar**.

<figure class="article-figure">
  <img src="/capture/mblock_appareil.png" alt="Captura mBlock 5: panel Dispositivos con botón Añadir (+)." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Panel **Dispositivos** — **Añadir (+)** abre la biblioteca. Puede aparecer otro robot (p. ej. CyberPi). Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

Clic en **Añadir** (o **+**).

## 2. Elegir el mBot en la lista

Ventana **Biblioteca de dispositivos**: **mBot**, **mBot2**, **Ranger**, **CyberPi**…

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot.webp" alt="Captura mBlock 5: cuadrícula de biblioteca con icono mBot." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Ficha **mBot**. Usa **Buscar** si la lista es larga. Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

## 3. Confirmar con OK

Selecciona **mBot** (o **mBot2**) → **OK**.

<figure class="article-figure">
  <img src="/capture/mblock_add_mbot_validation.webp" alt="Captura mBlock 5: mBot seleccionado, botón OK activo." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>**mBot** resaltado antes de **OK**. Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

## 4. Comprobar los bloques mBot

**mBot** aparece en **Dispositivos** — clic para dejarlo **activo**. Paleta: **avanzar**, **matriz LED**, **ultrasonido** / **línea**, **zumbador**…

<figure class="article-figure">
  <img src="/capture/mbot_verification_bloc.webp" alt="Captura mBlock 5: mBot activo y bloques de motor/LED en el script." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Con **mBot** activo aparecen bloques de movimiento y LED. Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

**Comprobación rápida:** mBot seleccionado · bloques **mBot** / **mCore** · sigue con [Primer programa mBot](/es/primer-programa-mbot/).

## Solución de problemas

| Síntoma | Causa | Acción |
| --- | --- | --- |
| No hay **mBot** en la lista | Versión antigua / Lite | Actualiza desde [mblock.cc](https://www.mblock.cc/en-us/download/); desactiva Lite; reinicia |
| Solo Scratch | Sin dispositivo Makeblock | **Dispositivos → Añadir → mBot → OK** |
| Bloques desaparecen | Otro dispositivo activo | Clic de nuevo en **mBot** |
| UI distinta | Modelo incorrecto | [mBot vs mBot2](/es/mbot-vs-mbot2/) |
| Robot no responde después | Conexión | [Bluetooth mBlock](/es/mblock-bluetooth-solucion/); prueba **USB** |
| Sin instalación | Navegador | [mBlock online](/es/mblock-online-sin-instalar/) |

**Extensiones:** **Extension** / **+ Extension** — [support.makeblock.com](https://support.makeblock.com).

## Preguntas frecuentes

**¿Los bloques bastan para mover el robot?**  
No — luego **conecta** y **carga**: [Primeros pasos mBlock 5](/es/primeros-pasos-mblock-5/).

**¿Scratch oficial en lugar de mBlock?**  
Scratch solo no controla el hardware Makeblock — [mBlock vs Scratch](/es/mblock-vs-scratch/).

## Precios orientativos (octubre 2026)

[mBot Makeblock en Amazon.es](https://www.amazon.es/s?k=Makeblock+mBot&tag=roboteducat07-21) — verifica mBot vs mBot2 en la ficha.

---

**Siguiente paso:** [Primer programa mBot](/es/primer-programa-mbot/).

*Revisión 31 de octubre de 2026 — Emmanuel Sauvage.*
