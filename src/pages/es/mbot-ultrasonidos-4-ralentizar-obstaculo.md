---
layout: ../../layouts/EsPost.astro
title: "mBot ultrasonidos (4/4): ralentizar ante obstáculo"
description: "Tutorial mBlock 4/4: el mBot avanza, ralentiza y se detiene ante un obstáculo plano — umbrales en cm, velocidad de motores, subida USB y solución de problemas."
updated: "31 de octubre de 2026"
faqSchema:
  - question: "¿Hace falta código Arduino o bloques mBlock?"
    answer: "Solo bloques mBlock / mBot. Apiláis eventos, sensor de ultrasonidos, condiciones y motores. No hace falta sketch Arduino."
  - question: "¿Qué mide el sensor de ultrasonidos del mBot?"
    answer: "La distancia en centímetros hasta un obstáculo delante del robot. El programa convierte ese valor en velocidad de motores con los umbrales que elijáis."
  - question: "¿El mBot2 sirve para este tutorial?"
    answer: "Sí, con bloques mBot activos y el módulo de ultrasonidos delantero conectado. Los umbrales en cm son valores de partida; ajustadlos en vuestro suelo."
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti.

> **Respuesta directa (octubre de 2026)** — En **mBlock 5** (software de bloques Makeblock, parecido a **Scratch**) leed la **distancia ultrasónica** en **cm** (centímetros), calculáis una **velocidad** entre dos umbrales (p. ej. parada a 15 cm, máxima a partir de 50 cm) y ponéis **motor izquierdo y derecho** a la misma velocidad. Subid el programa por **USB** (cable de datos PC ↔ placa), obstáculo **plano** (libro): el robot **ralentiza** y **se detiene** sin golpe. No hace falta código **Arduino**.

Cerráis la serie del **sensor de ultrasonidos** del [mBot Makeblock](/es/mbot-mi-primer-robot-educativo/) — el módulo delantero mide en centímetros. Objetivo: **avanzar**, **ralentizar**, **parar**. Todo en **mBlock** con **bloques mBot**.

<aside class="article-callout" role="note">
<p><strong>Objetivo pedagógico</strong></p>
<p>Comportamiento robótico completo en <strong>bloques mBlock</strong>: la medida (distancia) manda la velocidad, con <strong>umbrales</strong> y progresión suave (ralentizar → parada).</p>
</aside>

<aside class="article-callout" role="note">
<p><strong>Prerrequisitos</strong></p>
<ul>
<li>Leer el sensor: <a href="/es/actividad-mbot-medir-distancias/">medir distancias</a> y <a href="/es/actividad-mbot-detector-intrusion/">detector de intrusión</a> (pasos completos en español).</li>
<li>Profundización opcional (páginas en francés, misma lógica): <a href="/serie-capteur-ultrason-mbot-1-mesurer-distance/">ep. 1 — medir</a>, <a href="/serie-capteur-ultrason-mbot-2-radar-recul-paliers/">ep. 2 — escalones</a>, <a href="/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/">ep. 3 — radar con pitidos</a>.</li>
<li><a href="/es/instalar-mblock-5-windows/">mBlock 5</a>, <a href="/es/instalar-bloques-mbot/">bloques mBot</a>, pilas cargadas, obstáculo plano.</li>
<li><a href="/es/primer-programa-mbot/">Subir un programa</a> a la placa (modo Upload).</li>
</ul>
<p>Enfoque en el <strong>mBot clásico</strong> (mCore). El <strong>mBot2</strong> también vale con ultrasonidos reconocido.</p>
</aside>

| Criterio | Detalle |
|---|---|
| **Nivel** | Intermedio |
| **Tiempo** | Unos 45–75 minutos |
| **Material** | mBot con ultrasonidos delante, PC, USB, obstáculo plano |
| **Software** | mBlock 5, Dispositivo → mBot, Upload |
| **Éxito** | Rápido por encima de ~50 cm, más lento entre 50 y 15 cm, parada ~15 cm |

## Enunciado

Programa el robot para que:

1. **Avance en línea recta**
2. **Suene / pitidos** en marcha
3. **Ralentice** si hay obstáculo delante
4. **Se detenga** si está demasiado cerca

Progresión **suave** — velocidad a partir de la distancia.

---

## 1) Distancias de referencia

- `DIST_STOP = 15` cm · `DIST_RALENTI = 50` cm

### Zonas de velocidad

| Distancia delante del sensor | Comportamiento |
|------------------------------|----------------|
| **≥ 50 cm** | Velocidad normal (p. ej. 80 %) |
| **Entre 15 y 50 cm** | Ralentizado progresivo |
| **≤ 15 cm** | Parada |

<figure class="article-figure">
  <img src="/capture/activite-mbot-detecteur-dintrusion/robot-mbot-detectant-intrusion.png" alt="mBot Makeblock frente a un obstáculo plano; el sensor de ultrasonidos mide la distancia en centímetros." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>Prueba con obstáculo plano: apuntar el sensor de frente. Foto: Emmanuel Sauvage, Robot Éducatif — octubre de 2026.</figcaption>
</figure>

---

## 2) Construir la lógica

Variables: `distancia_cm`, `velocidad` (0–100).

### 2.1 Actualizar la distancia

Como en <a href="/es/actividad-mbot-medir-distancias/">medir distancias</a>: sensor en bucle **para siempre**, breve espera.

<figure class="article-figure">
  <img src="/capture/capteur/mblock-capteur-ultrason-variable-lutin.png" alt="Captura mBlock: bucle que lee el sensor ultrasónico del mBot en una variable de distancia." width="960" height="540" loading="lazy" decoding="async" />
  <figcaption>mBlock: guardar la distancia en una variable. Captura: Emmanuel Sauvage, Robot Éducatif — octubre de 2026. Los nombres de bloques dependen del idioma de mBlock.</figcaption>
</figure>

### 2.2 Velocidad al acercarse

- `VELOCIDAD_MAX = 80`, `VELOCIDAD_MIN = 30`
- `>= 50` → 80 ; `<= 15` → 0 ; entre medias, **escalones** o **fórmula lineal**:

`velocidad = VELOCIDAD_MIN + (distancia_cm - 15) × (VELOCIDAD_MAX - VELOCIDAD_MIN) / 35`

Escalones sugeridos (primaria): 80 / 55 / 30 / 0 como en [ep. 2 (francés)](/serie-capteur-ultrason-mbot-2-radar-recul-paliers/).

---

## 3) Avanzar recto

Misma velocidad izquierda/derecha.

Pseudo-lógica:

```text
al iniciar
  para siempre
    establecer distancia_cm a (distancia ultrasónica)

    si distancia_cm <= 15
      velocidad 0
      parar motores
      nota grave / pitido largo
      esperar 0,1 s
    si no
      si distancia_cm >= 50 → velocidad 80
      si no → fórmula o escalones

      avanzar (izquierda = velocidad, derecha = velocidad)
      pitido corto
      esperar 0,5 s
```

### 3.1 Sonidos

- pitido cada 0,5 s en marcha normal ;
- pitidos más rápidos al ralentizar (opcional, [ep. 3 (francés)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/)) ;
- sonido distinto al parar.

---

## 4) Pruebas

USB, luego subida. Libro plano. Si « tiembla »: subid `DIST_STOP` a 18 cm, `esperar 0,05 s`, `VELOCIDAD_MIN` 30–40.

**Éxito:** ~40 cm rápido, ~25 cm más lento, ~15 cm parada sin golpe.

---

## 5) Lista de bloques

Evento mBot · para siempre · variables · distancia ultrasónica cm · si/sino · operadores · motores · sonido · esperar.

Ayuda: [Primeros pasos mBlock 5](/es/primeros-pasos-mblock-5/) · [Bluetooth mBlock](/es/mblock-bluetooth-solucion/).

---

## Solución de problemas

| Síntoma | Causa probable | Qué hacer |
|---------|----------------|-----------|
| Distancia **0** o **400+** | Obstáculo mal colocado o superficie blanda | Objetivo plano a 20–80 cm |
| No ralentiza | Velocidad no en ambos motores | Revisar izquierda y derecha |
| **Tirones** | Umbral de parada bajo | `DIST_STOP` → 18 cm, pausa tras sensor |
| Sin pitidos | Falta bloque de sonido | Probar un pitido fuera del bucle |
| mBlock no ve el robot | USB o modo Live | [Primer programa](/es/primer-programa-mbot/) |

Antes de comprar un sensor de repuesto, comprobad el puerto **RJ25** delantero (conector Makeblock por colores) — [accesorios mBot](/es/accesorios-mbot-por-donde-empezar/).

---

## Para profundizar

- LED verde / naranja / rojo según distancia.
- « Aparcamiento asistido »: marcha atrás lenta y parada.
- [mBlock vs Scratch](/es/mblock-vs-scratch/) para elegir software en clase.

---

## FAQ

### ¿Arduino o mBlock?

**Solo bloques mBlock** — sin sketch Arduino.

### ¿Qué mide el sensor?

**Distancia en cm** delante del robot → **velocidad** con vuestros umbrales.

### ¿mBot2?

Sí, con ultrasonidos operativo. Ajustad umbrales en vuestro suelo.

---

## Material (enlaces orientativos)

<a href="/go/az-es-3d4cce7de1/" rel="sponsored nofollow noopener">mBot Makeblock en Amazon.es</a> — consultad el precio del día. Socio Amazon — comisión posible sin coste extra.

---

## Serie

[← Ep. 3 radar con pitidos (francés)](/serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance/) · [Medir distancias](/es/actividad-mbot-medir-distancias/) · [Primer programa](/es/primer-programa-mbot/) · [Instalar bloques](/es/instalar-bloques-mbot/)

*Emmanuel Sauvage — actualizado el 31 de octubre de 2026.*
