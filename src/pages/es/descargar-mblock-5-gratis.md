---
layout: ../../layouts/EsPost.astro
title: "Descargar mBlock 5 gratis: enlace oficial e IDE en línea"
description: "Descarga mBlock 5 gratis desde el sitio oficial Makeblock (Windows, Mac) o usa ide.mblock.cc en línea sin instalar. Controlador CH340 mBot, UAC y solución de problemas — guía oct. 2026."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "¿Dónde descargar mBlock 5 gratis?"
    answer: "Usa solo mblock.cc/en-us/download, descarga el instalador Windows de 64 bits (unos 380 MB) o macOS .dmg y ejecútalo. Cambia el idioma con el icono del globo arriba a la izquierda."
  - question: "¿Hay que crear una cuenta para usar mBlock 5?"
    answer: "No. El uso sin conexión, guardar proyectos en el PC y la carga USB hacia mBot o mBot2 funcionan sin registro. La cuenta Makeblock solo sirve para copia en la nube."
  - question: "¿Cómo instalar el controlador USB CH340 del mBot en 3 minutos?"
    answer: "Al final de la instalación de mBlock 5 confirma la ventana Setup_Driver_CH341 y haz clic en Install. El robot se reconocerá en un puerto COM en la primera conexión USB."
  - question: "¿Qué hacer si no puedo instalar nada en el ordenador?"
    answer: "Abre ide.mblock.cc en Chrome o Edge o sigue la guía mBlock en línea sin instalar. No hace falta descargar 380 MB."
  - question: "¿Cuál es la diferencia entre mblock.cc e ide.mblock.cc?"
    answer: "mblock.cc/download sirve para descargar la app de escritorio mBlock 5 (Windows/Mac). ide.mblock.cc es el IDE en línea: programas en el navegador sin instalar la app de escritorio."
  - question: "¿mBlock 5 es realmente gratis?"
    answer: "Sí. El instalador oficial Makeblock y la versión del navegador son gratuitos. Evita sitios espejo y enlaces crack."
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra. Consulta el precio del día en Amazon.es; no inventamos precios locales.

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#f0fdfa;color:#134e4a;font-size:1.03rem;">
<strong>¿No quieres instalar nada?</strong> Abre el <strong>IDE</strong> (entorno de desarrollo integrado: la ventana donde se encajan los bloques) oficial <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#0f766e;text-decoration:underline;">ide.mblock.cc</a> (mBlock en línea) y sigue nuestra guía <a href="/es/mblock-online-sin-instalar/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock en línea sin instalar</a>. Esta página solo sirve para <strong>descargar</strong> la aplicación de escritorio Windows/Mac.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:0 0 1.25rem;background:#f2f7ff;color:#1f2430;">
<strong>Respuesta directa (octubre 2026)</strong> — Para <strong>descargar mBlock 5 gratis</strong>, abre la página oficial <a href="https://www.mblock.cc/en-us/download/">Makeblock Download</a>, descarga el instalador de <strong>Windows 10/11 (64 bits)</strong> o <strong>Mac</strong> (~380&nbsp;MB), valida el control <strong>UAC</strong> de Windows (<strong>Control de cuentas de usuario</strong>) con <strong>Sí</strong>, termina la instalación, luego instala el <strong>controlador CH340</strong> para conectar un <a href="/es/mbot-mi-primer-robot-educativo/">mBot</a> por USB. Sin derechos de administrador: <a href="/es/mblock-online-sin-instalar/">mBlock en línea</a>.
</div>

<p><strong>Descargar mBlock 5 gratis</strong> suele llevar **menos de 3 minutos** para la descarga, el UAC y el controlador USB — copiar archivos depende del disco. Tanto si equipas un PC con <strong>Windows 10 o 11</strong>, un <strong>Mac (Intel o Apple Silicon M1/M2/M3)</strong> o un aula, encontrarás abajo los <strong>enlaces oficiales verificados</strong>, <strong>capturas reales</strong>, el procedimiento para el <strong>controlador USB CH340 para mBot</strong> (chip serie en puerto <code>COM</code>) y el cambio de idioma <strong>sin registro obligatorio</strong>.</p>

<h2 id="descarga-oficial">1. Enlaces oficiales verificados (Windows 10/11, Mac, Linux, tablet)</h2>

Nunca descargues mBlock desde sitios espejo de terceros: recupera siempre el instalador firmado por **Makeblock Co., Ltd.** para incluir las bibliotecas mBot, mBot2 (**CyberPi**: placa Wi-Fi de Makeblock para el mBot2) y el controlador serie USB.

| Sistema operativo | Versión oficial recomendada (2026) | Tamaño indicativo | Controlador USB CH340 incluido |
|---|---|---|---|
| **PC Windows 10 / Windows 11 (64 bits)** | `mBlock 5 PC Version (.exe)` en [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~380 MB (≈ 1,05 GB instalado) | Sí (automático) |
| **Mac (macOS Intel & Apple M1/M2/M3)** | `mBlock 5 Mac Version (.dmg/.pkg)` en [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~390 MB | Sí |
| **Chromebook / PC escolar bloqueado** | Guía: <a href="/es/mblock-online-sin-instalar/">programar con mBlock en línea sin instalar</a> | 0 MB (navegador) | Vía **WebUSB** (USB desde el navegador) y **mLink** (puente serie Makeblock) |
| **Tablet iPad (iOS) / Android** | App *mBlock* en App Store / Google Play | ~180 MB | Conexión Bluetooth |

![Captura: página oficial Makeblock Download para mBlock 5 en Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Captura: página Makeblock Download (mblock.cc), sección Windows. Crédito: Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

<div class="article-cta-row" style="display:flex;flex-wrap:wrap;gap:0.75rem;margin:1.25rem 0;">
<a class="article-cta article-cta--primary" href="https://www.mblock.cc/en-us/download/" rel="noopener noreferrer" target="_blank" style="background:#1d4ed8;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Abrir la página oficial Makeblock Download</a>
<a class="article-cta article-cta--secondary" href="/es/mblock-online-sin-instalar/" style="background:#0f766e;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Programar con mBlock en línea (sin instalar)</a>
</div>

<h2 id="windows">2. Instalar mBlock 5 en PC Windows 10 y 11</h2>

**Requisitos rápidos:** Internet (~380 MB), cuenta **administrador** de Windows (o adulto para **Sí** en UAC), al menos **1,5–2 GB** libres.

1. **Descarga el ejecutable oficial** (`V5.6.x.exe` unos 380 MB) en **mBlock PC version → Download for Windows**.
2. **Ejecuta el archivo `.exe`** desde *Descargas* (`Ctrl + J`).

![Captura: Explorador de Windows — instalador mBlock en Descargas](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Doble clic en el `.exe` descargado. Crédito: Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

3. **Valida el UAC** — **Control de cuentas de usuario** — clic **Sí**. Sin admin: <a href="/es/mblock-online-sin-instalar/">mBlock en línea</a>.
4. **SmartScreen**: si muestra *«Windows protegió tu PC»* → **Más información** → **Ejecutar de todos modos** solo si el editor es **Makeblock** y la fuente es [mblock.cc](https://www.mblock.cc/en-us/download/).
5. **Progreso**: copia en `Program Files` sin preguntas intermedias.

![Captura: progreso de instalación mBlock 5 en Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Barra de progreso (Windows 10/11). Crédito: Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

6. **Fin**: clic **Finalizar** / **Finish**.

![Captura: fin del instalador mBlock 5](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

*Fin del asistente. Crédito: Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

Más detalle: [Instalar mBlock 5 en Windows 10 y 11](/es/instalar-mblock-5-windows/) · [Solución Bluetooth/USB mBlock](/es/mblock-bluetooth-solucion/).

<h2 id="controlador-ch340">3. Controlador USB mBot (CH340): el paso clave que no hay que cerrar</h2>

Al final de la instalación se abre **Driver Setup (CH340 / CH341SER)**:

- Clic **Install**, espera *Driver install success*.
- El **CH340** es el chip USB-serie en la **mCore del mBot**; necesario para **Arduino UNO / Nano** en `COM3`, `COM4`, etc.
- **Sin registro obligatorio** para programar y guardar `.mblock`.

![Captura: instalación de mBlock 5 finalizada en Windows](/images/blog/installer-mblock/ecran-10-termine.png)

*Fin de la instalación de escritorio. Crédito: Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

<h2 id="macos">4. Instalación en Mac (macOS), Linux y Chromebook</h2>

- **Mac**: `.dmg`/`.pkg` → arrastra **mBlock** a **Aplicaciones**; si bloquea: **Ajustes del Sistema → Privacidad y seguridad → Abrir de todos modos**.
- **Linux**: navegador con **mLink** ([mBlock en línea](/es/mblock-online-sin-instalar/)).
- **Chromebook**: [mBlock en línea](/es/mblock-online-sin-instalar/) + **mLink** en Chrome.

<h2 id="sin-instalacion">5. Alternativa en el navegador (PC bloqueado o Chromebook)</h2>

<div class="callout-web-link" style="border-left:4px solid #2563eb;background:#eff6ff;padding:0.9rem 1.15rem;border-radius:8px;margin:1rem 0;">
<strong>Acceso en el navegador:</strong> <a href="/es/mblock-online-sin-instalar/">programar con mBlock en línea sin instalar</a> (idioma, USB/Bluetooth con mLink, guardado local).
</div>

Comparativa: [¿Qué software mBlock elegir?](/es/software-mblock-cual-elegir/).

<h2 id="despues-descarga">6. Cambiar el idioma y conectar el mBot</h2>

1. **Globo** → Español o English.
2. **Dispositivos** → **+ Añadir** → **mBot** (o **CyberPi / mBot2**) → **OK**.
3. USB → **Conectar** → puerto `COM`.
4. [Primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/) · [Instalar los bloques del mBot](/es/instalar-bloques-mbot/).

<h2 id="que-robot">7. ¿Con qué robot usar mBlock 5?</h2>

El recuadro de productos al final resume los enlaces mBot/mBot2. **Las tarjetas siguientes** detallan modelos con **rango de precio orientativo** en Amazon.es.

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot (v1.1 Bluetooth)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideal desde 8 años · Montaje ~15 min</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Precio orientativo: ~85–109 € (consultar precio del día)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Ver en Amazon.es</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2 (con CyberPi Wi-Fi)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideal 10–14 años · Batería ~5 h</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Precio orientativo: ~159–179 € (consultar precio del día)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Ver en Amazon.es</a>
    </div>
  </div>
</div>

<h2 id="solucion-problemas">8. Solución de problemas descarga e instalación</h2>

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Descarga bloqueada | Antivirus, red escolar | Solo [mblock.cc](https://www.mblock.cc/en-us/download/); excepción tras verificar; [mBlock en línea](/es/mblock-online-sin-instalar/) |
| **No** en UAC | Sin derechos admin | Cuenta administrador o [ide.mblock.cc](https://ide.mblock.cc/) |
| SmartScreen bloquea | Archivo poco conocido | **Más información → Ejecutar de todos modos** si **Makeblock** |
| Sin puerto **COM** | CH340 omitido | **Setup_Driver_CH341** · [Bluetooth mBlock](/es/mblock-bluetooth-solucion/) |
| Interfaz en inglés | Idioma por defecto | **Globo → Español** · [Primeros pasos](/es/primeros-pasos-mblock-5/) |
| Bloques mBot ausentes | Extensiones faltantes | [Instalar bloques mBot](/es/instalar-bloques-mbot/) |

<h2 id="faq">9. FAQ — Descargar mBlock 5</h2>

### ¿Dónde descargar mBlock 5 gratis?

**mblock.cc/en-us/download**, **mBlock PC version**, ejecuta el instalador. Idioma con el icono del globo.

### ¿Hay que crear una cuenta?

**No.** Uso sin conexión, guardado local y carga USB sin cuenta.

### ¿Controlador CH340 en 3 minutos?

Confirma **Setup_Driver_CH341**, clic **Install**.

### ¿No puedo instalar nada?

**[ide.mblock.cc](https://ide.mblock.cc/)** o <a href="/es/mblock-online-sin-instalar/">mBlock en línea sin instalar</a>.

### ¿mblock.cc vs ide.mblock.cc?

**mblock.cc/download** = descarga de escritorio. **ide.mblock.cc** = **IDE** en línea.

### ¿Realmente gratis?

Sí — [Makeblock Download](https://www.mblock.cc/en-us/download/) o [ide.mblock.cc](https://ide.mblock.cc/).

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Guía actualizada el 31 de octubre de 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
