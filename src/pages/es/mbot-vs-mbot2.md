---
layout: ../../layouts/EsPost.astro
title: "mBot vs mBot2: diferencias, precios y cuál elegir"
description: "Comparativa mBot vs mBot2 2026: precios octubre, CyberPi, Python, RJ25 y mBuild. Qué robot Makeblock elegir por edad, presupuesto y accesorios."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Los accesorios RJ25 del mBot clásico valen para el mBot2?"
    answer: "No directamente. El mBot clásico usa puertos RJ25; el mBot2 usa el bus mBuild de la CyberPi. Consulta la compatibilidad oficial Makeblock o el resumen de accesorios de esta página antes de comprar."
  - question: "¿A partir de qué edad mBot o mBot2?"
    answer: "El mBot suele encajar desde los 8 años con un adulto para la instalación. El mBot2 conviene más hacia 9–10 años si buscas Python y proyectos largos."
  - question: "¿Qué presupuesto prever (octubre 2026)?"
    answer: "El 9 de noviembre de 2026 Amazon.es mostraba 89,99 € para el mBot (B07XR98YYQ) y 205,68 € para el mBot2 (B0919F9CKS). Los precios cambian: verifica el anuncio al comprar."
  - question: "¿Hace falta el mBot2 para aprender Python?"
    answer: "El mBot2 facilita Python gracias a CyberPi y mBlock. El mBot clásico se centra en bloques; para Python serio sin recomprar, el mBot2 suele ser mejor opción."
---

> **Transparencia de afiliación** — Algunos enlaces son de socio (Amazon.es). Compras elegibles pueden generar comisión para el sitio, sin coste extra. **Precios orientativos: octubre de 2026** — confirma el precio en la tienda.

> **Respuesta directa (octubre de 2026)** — Elige el **mBot** (**89,99 €** en Amazon.es el 9 de noviembre de 2026) para una primera robótica **Scratch** / **mBlock** (programación por bloques): placa **mCore**, pilas **AA**, puertos **RJ25** (conector Makeblock de 4 vías del mBot clásico). Elige el **mBot2** (**205,68 €** en Amazon.es el 9 de noviembre de 2026) si apuntas a **Python**, pantalla **CyberPi** (placa con pantalla a color y **Wi‑Fi**), batería **Li-ion** integrada (acumulador de litio recargable, como en un móvil) y sensores avanzados (giroscopio, micrófono). Los accesorios **RJ25** del mBot antiguo **no** van en el mBot2: usa **mBuild** (bus magnético modular en la CyberPi).

Eliges entre el **mBot** « clásico » y el **mBot2** : dos generaciones del ecosistema [Makeblock](/es/marca-makeblock/). El primero usa la placa **mCore**; el segundo la **CyberPi**, más reciente y potente. Esta página compara **precios**, **funciones**, **accesorios** y **solución de problemas** — comprueba siempre la ficha oficial (revisión del kit, Bluetooth incluido o no, etc.).

<figure class="article-figure">
  <img src="/images/models/makeblock-mbot-mcore.webp" alt="Makeblock mBot clásico con placa mCore — foto de producto para comparativa mBot vs mBot2" width="1200" height="800" loading="eager" decoding="async" />
  <figcaption>mBot clásico (mCore). Foto de producto Makeblock — Emmanuel Sauvage, robot-educatif.info — octubre de 2026.</figcaption>
</figure>

<figure class="article-figure">
  <img src="/images/models/makeblock-mbot2.webp" alt="Makeblock mBot2 con CyberPi integrada — foto de producto" width="1200" height="800" loading="lazy" decoding="async" />
  <figcaption>mBot2 (CyberPi en el chasis). Foto de producto Makeblock — Emmanuel Sauvage, robot-educatif.info — octubre de 2026.</figcaption>
</figure>

## Precios orientativos (España, octubre de 2026)

**A título indicativo en octubre de 2026** en ofertas habituales (Amazon.es y otros vendedores):

| Modelo | Precio indicativo* |
|--------|------------------|
| **mBot** (kit básico) | **89,99 €** el 9 de noviembre de 2026 |
| **mBot2** | **205,68 €** el 9 de noviembre de 2026 |

\*Importes **variables** según promociones, stock e IVA. Verifica el **precio en el momento de la compra**.

**Diferencia de presupuesto**: el mBot2 cuesta a menudo **casi el doble** del mBot de entrada. La pregunta es **qué priorizas**: un primer robot asequible o una plataforma más rica para **Python** y **Wi‑Fi**.

Consulta también [mejor robot programable para niños](/es/mejor-robot-programable-para-ninos/) y [opinión mBot: ¿merece la pena?](/es/mbot-opinion-vale-la-pena/).

## Qué tienen en común

- **Mismo software**: **mBlock** (cercano a Scratch), tutoriales y comunidad — [instalar mBlock 5](/es/instalar-mblock-5-windows/).
- **Misma idea pedagógica**: montar chasis, conectar sensores, hacer recorridos.
- **Mismo ecosistema Makeblock**, pero accesorios **no siempre compatibles** entre generaciones.

## Tabla comparativa

**Arduino** es una familia de placas electrónicas muy usada en educación; el mBot clásico lleva un chip **ATmega328P** compatible con ese ecosistema. **ESP32** es un chip más reciente y rápido, en el centro de la **CyberPi** del mBot2 (Wi‑Fi, más margen para **Python**).

Los detalles pueden variar según la **revisión** del kit.

| Criterio | mBot (clásico) | mBot2 |
|--------|-------------------|--------|
| **MCU** (microcontrolador = « cerebro » del robot) | **ATmega328P** en mCore (16 MHz, compatible **Arduino**) | **ESP32** (CyberPi, dual-core 240 MHz) |
| **Alimentación** | 4× pilas **AA** (~1 h) o **LiPo** opcional | Batería **Li-ion 2500 mAh** integrada (~5 h) |
| **Placa** | **mCore** | **CyberPi** (Wi‑Fi, **Python** avanzado) |
| **Programación** | Bloques **mBlock** | **mBlock** + **Python** |
| **Bus de sensores** | **RJ25** (puertos 1–4) | **mBuild** (CyberPi) |
| **Motores** | Dos motores | Motores con **encoders** (movimientos más precisos) |
| **Sensores habituales** | **Línea**, **ultrasonidos**, **IR** (infrarrojos, mando según kit) | Ultrasonidos, línea, **luz**, **giroscopio** |
| **Retorno visual / sonido** | LED RGB, **zumbador** | **Pantalla 1,44"**, **altavoz**, **micrófono** |
| **Conectividad** | A menudo **Bluetooth** (verifica ficha) | **Bluetooth** y **Wi‑Fi** |
| **Chasis** | Aleación de aluminio | Aleación de aluminio, batería integrada |
| **Público aconsejado** | Descubrimiento, clubes, **precio controlado** | Secundaria, proyectos largos, **Python** |

**En resumen**: el **mBot** cubre **descubrimiento y primeros retos**; el **mBot2** añade **proyectos ambiciosos** (precisión, pantalla, sonido) y **Scratch → Python**. Contexto: [CyberPi](/es/makeblock-cyberpi-resumen/) y [mi primer robot mBot](/es/mbot-mi-primer-robot-educativo/).

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Entrada de gama · pilas AA · puertos RJ25.</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">89,99 € el 9 de noviembre de 2026 — consulta el precio del día</a></p>
    <a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 0.9rem;border-radius:8px;text-decoration:none;font-size:0.9rem;">Consultar precio en Amazon</a>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">CyberPi · Python · batería Li-ion.</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">205,68 € el 9 de noviembre de 2026 — consulta el precio del día</a></p>
    <a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 0.9rem;border-radius:8px;text-decoration:none;font-size:0.9rem;">Consultar precio en Amazon</a>
  </div>
</div>

## Accesorios y evolución

### mBot clásico

- Puertos **RJ25** y extensiones históricas Makeblock.
- Antes de comprar: [Accesorios mBot: por dónde empezar](/es/accesorios-mbot-por-donde-empezar/).
- **Error frecuente**: comprar un módulo sin comprobar **tu** revisión de mBot.

### mBot2

- **mBuild** en la **CyberPi**. Accesorios **RJ25** antiguos **no** se conectan directamente — [soporte Makeblock](https://support.makeblock.com) antes del pedido.

### Compatibilidad de accesorios (RJ25 vs mBuild)

| Tipo de extensión | mBot clásico (RJ25) | mBot2 (mBuild / CyberPi) |
|-------------------|---------------------|---------------------------|
| Sensores RJ25 históricos (ultrasonidos, línea) | Sí (puertos 1–4) | No (sin adaptador) |
| Módulos mBuild magnéticos | No | Sí |
| Brazos, orugas, packs explorer | Revisar ficha Makeblock (a menudo línea mBot v1) | Kits mBot2 / mBuild |

Para una **matriz completa** (interfaz en francés, referencias universales), abre también la [matriz compatibilidad Makeblock](/compatibilite-makeblock/) junto a la documentación del fabricante.

Más lecturas: [mBot vs Codey Rocky](/en/mbot-vs-codey-rocky/) (artículo en inglés en el sitio), [Thymio 3 vs mBot2](/es/thymio-3-opinion-precio-vs-mbot2/) o [mejor robot educativo 2026](/es/mejor-robot-educativo-2026/).

## Software y arranque

Ambos se pilotan con **mBlock** en el ordenador. En el mBot2 puedes **encadenar** bloques y **Python**. ¿Dudas con el software? [Qué software mBlock elegir](/es/software-mblock-cual-elegir/). Bloques: [Instalar bloques mBot](/es/instalar-bloques-mbot/). Primer programa: [Primer programa mBot](/es/primer-programa-mbot/).

## Solución de problemas (Bluetooth, mBlock, módulo incorrecto)

| Síntoma | Causa frecuente | Qué hacer |
|---------|-----------------|-----------|
| mBlock no ve el robot | Modelo equivocado (mBot vs mBot2), driver USB ausente | Elige **mBot (mCore)** o **mBot2**; primera sesión por **USB**; [Descargar mBlock 5](/es/descargar-mblock-5-gratis/) |
| Bluetooth inestable | Pilas bajas (mBot AA), distancia, mBlock antiguo | Cambia pilas; acerca el PC; [Bluetooth mBlock](/es/mblock-bluetooth-solucion/) |
| Bloques distintos de los tutoriales | Tienes la otra generación | Relee esta página; [Instalar bloques mBot](/es/instalar-bloques-mbot/) |
| El accesorio no encaja | RJ25 comprado para mBot2 (o al revés) | Tabla anterior + [matriz de accesorios](/compatibilite-makeblock/) |

## ¿Qué robot elegir?

- **mBot**: primer robot sólido, comunidad enorme, **presupuesto** ajustado, talleres línea/obstáculo/LED.
- **mBot2**: varios años de uso, proyectos audio/luz, **precisión**, **Python** sin recomprar de inmediato.

## Comprar en Amazon.es (afiliados)

- [mBot Makeblock en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)
- [mBot2 Makeblock en Amazon.es](https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21)

*Enlaces de afiliados — comisión posible en compras elegibles, sin coste extra.*

## Para ir más lejos

- [Mejor robot educativo 2026](/es/mejor-robot-educativo-2026/)
- [mBot vs robot LEGO](/es/mbot-vs-lego-robot/)
- [Mejor robot programable](/es/mejor-robot-programable-para-ninos/)
- [Thymio 3 vs mBot2](/es/thymio-3-opinion-precio-vs-mbot2/)

## FAQ

### ¿Los accesorios RJ25 v1 valen para el mBot2?

No, salvo adaptadores específicos. El mBot2 usa módulos **mBuild**. Revisa el resumen anterior o la [matriz de accesorios](/compatibilite-makeblock/).

### ¿Qué robot a los 8 años?

Suele bastar el **mBot**. El **mBot2** si ya apuntas a **Python** — [robot programable 10 años](/es/robot-programable-10-anos/).

### ¿Vale la pena pagar casi el doble por el mBot2?

Si solo usas bloques básicos, la diferencia parece pequeña al principio. Compensa sobre todo **Python**, **pantalla**, **giroscopio**, **batería** y **encoders** en proyectos largos.

### ¿Otras marcas?

[Mejor robot programable](/es/mejor-robot-programable-para-ninos/), [mBot vs LEGO](/es/mbot-vs-lego-robot/) o [mBot vs Codey Rocky](/en/mbot-vs-codey-rocky/).

---

*Emmanuel Sauvage — actualizado el 31 de octubre de 2026.*
