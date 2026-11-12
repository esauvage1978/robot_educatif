---
layout: ../../layouts/EsPost.astro
title: "Accesorios mBot: sensores mBuild, packs y extensiones (guía 2026)"
description: "Accesorios mBot (RJ25) y mBot2 (mBuild): sensores ultrasónicos, LED, packs y extensiones Makeblock. Con qué completar el kit base."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra. Consulta el precio del día en Amazon.es antes de comprar.

Cuando tu **mBot** ya funciona, los **accesorios** alargan la vida del kit: nuevos retos, reparaciones o variantes mecánicas. El error clásico es acumular compras sin un objetivo claro. Mejor **un sensor y un proyecto** que un armario lleno de cajas incompatibles.

En el **mBot clásico** (a menudo llamado mBot v1), la placa **mCore** (el «cerebro» del robot) tiene puertos **RJ25**: son pequeños conectores rectangulares, parecidos a una toma de teléfono, numerados del **1 al 4**. Cada sensor Makeblock RJ25 se conecta al puerto que indica **su propia** ficha.

![Esquema de los puertos RJ25 numerados del 1 al 4 en la placa mCore del mBot clásico](/images/blog/guides-2026/mbot-rj25-ports.svg)

*Esquema didáctico de los puertos 1 a 4 de la mCore. En el **mBot2** y su controlador **CyberPi**, el bus se llama **mBuild** (conectores magnéticos): los módulos RJ25 del v1 no son intercambiables con él sin un adaptador adecuado.*

Antes de comprar, lee el título del producto y el tipo de conector en la ficha: **RJ25** para el mBot clásico, **mBuild** para el mBot2. Las dos generaciones no son intercambiables sin un adaptador adecuado. Consulta también la [matriz de compatibilidad Makeblock](/compatibilite-makeblock/) para comprobar que el módulo corresponde a **tu** generación de robot.

> **Respuesta directa (octubre 2026)** — En el **mBot clásico**, conecta los sensores oficiales **RJ25** a los puertos **1 a 4** de la **mCore**. Un orden de compra razonable: **pilas recargables** → **almacenamiento** → **un sensor ligado a un proyecto** (a menudo ultrasónico) → piezas de recambio → extensiones mecánicas. En el **mBot2**, elige el bus **mBuild**, no los módulos RJ25 del v1.

| Generación | Conector / bus | Dónde se conecta |
|---|---|---|
| **mBot v1** | **RJ25** (cable Makeblock de 4 vías) | puertos **1 a 4** de la mCore |
| **mBot2** | **mBuild** (modular, conectores magnéticos) | cadena mBuild del CyberPi / mBot2; no los sensores RJ25 clásicos del v1 |

No compres un módulo **solo mBuild** esperando que encaje en un puerto RJ25 del mBot v1 clásico. Lo contrario tampoco suele funcionar.

### Primera compra recomendada tras el kit

Cuando el robot ya funciona, la pareja más útil suele ser **pilas recargables** más un **telémetro ultrasónico** (un sensor que mide distancias con ondas sonoras), para [medir distancias](/es/actividad-mbot-medir-distancias/). El kit mBot clásico ya incluye ultrasonidos, siguelíneas y mando de infrarrojos. Un segundo sensor solo sirve para otro robot o un recambio, y solo si la ficha indica **RJ25**. [mBot en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21), 89,99 € el 9 de noviembre de 2026.

## 1. Un orden de prioridad razonable

| Prioridad | Tipo | Por qué |
|---|---|---|
| 1 | **Pilas recargables** + cargador adecuado | Sin una alimentación fiable, todo lo demás frustra. |
| 2 | **Almacenamiento** (caja con compartimentos) | Menos piezas perdidas = menos abandono. |
| 3 | **Sensor** ligado a un proyecto (p. ej. ultrasónico) | Un objetivo claro: mira nuestras actividades más abajo. |
| 4 | **Piezas de recambio** (ruedas, tornillos) | Si el robot sale a menudo de la escuela o del club. |
| 5 | **Extensiones «divertidas»** (brazo, orugas) | Cuando los scripts básicos están **asimilados**, no antes. |

## 2. Consumibles y comodidad

- **Pilas**: comprueba el **formato** y la **intensidad** recomendados por Makeblock para **tu** revisión de mBot.
- **Caja de almacenamiento**: poco «glamurosa», pero evita perder tornillos y el desánimo del «ya no encontramos la pieza».

## 3. Sensores que de verdad cambian los proyectos

- **Telémetro ultrasónico**: la base para [medir distancias](/es/actividad-mbot-medir-distancias/) y para el [detector de intrusión](/es/actividad-mbot-detector-intrusion/).
- Sensores de **línea** o de **luz**: útiles para recorridos en el suelo. Comprueba la compatibilidad con tu chasis y tu placa (RJ25 o mBuild). El [proyecto del sigue-líneas](/es/10-proyectos-mbot-gratis-clase/) entre los proyectos para clase encaja bien con un sensor de línea.

## 4. Extensiones «mecánicas»

Brazos, **orugas** y otras estructuras resultan interesantes cuando el niño ha **agotado** las ideas con el modelo original y quiere **reconstruirlo** mecánicamente antes de volver al código. No son una primera compra si el programa básico todavía no está claro.

## 5. Errores frecuentes

- Comprar un módulo **sin** un procedimiento claro de **actualización del firmware** o **sin** una ficha utilizable.
- Descuidar el **servicio posventa**: las piezas **oficiales** o los revendedores reconocidos limitan las incompatibilidades.
- Pedir un accesorio **para otra generación** de mBot (consulta la tabla de compatibilidad de Makeblock).
- Un ejemplo **no compatible**: un **sensor mBuild** en un **mBot v1** (RJ25). No funciona, porque el bus no es el mismo.

## 6. Mini-FAQ

**¿Merece la pena un pack «todo en uno»?**  
Sí, si comprar las piezas por separado te saldría más caro **y** vas a usar **cada** elemento. Si no, compra **sobre la marcha**.

**¿Debo coger una segunda batería?**  
Es útil en un **club** o en una **jornada de proyecto**; en casa, unas buenas pilas recargables suelen bastar.

## Enlaces Amazon.es (afiliación)

- [Makeblock mBot en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21) — 89,99 € el 9 de noviembre de 2026. Los ultrasonidos ya van en el kit.

*Enlaces de afiliados Amazon.es — comisión posible en compras elegibles.*

---

**En la práctica**: un **nuevo sensor** más un **nuevo objetivo** (recorrido, alarma, contador) reinician el entusiasmo sin multiplicar las compras. Para ideas de sesiones cortas, mira [proyectos mBot en una hora](/es/proyectos-mbot-una-hora/).

*Autor: Emmanuel Sauvage.*
