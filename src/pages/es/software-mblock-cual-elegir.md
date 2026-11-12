---
layout: ../../layouts/EsPost.astro
title: "mBlock 5, app o Python: ¿qué software para el mBot?"
description: "PC, tablet o navegador: ¿qué software Makeblock elegir para mBot y mBot2 según la edad y el nivel? Una comparativa clara."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste extra para ti. Consulta el precio del día en Amazon.es antes de comprar.

Abres **mBlock** por primera vez y no sabes si **instalarlo**, abrirlo **en el navegador** o pasar directamente a **Python**. Esta página compara las tres puertas de entrada con palabras sencillas, para que elijas según tu ordenador, tus derechos de administrador y tu robot (**mBot**, **mBot2**, etc.).

> **Respuesta directa (octubre 2026)** — Para abrir el **IDE** (entorno de desarrollo integrado: la ventana donde se montan los bloques) **sin instalar nada**, ve a [ide.mblock.cc](https://ide.mblock.cc/) y sigue la guía [mBlock en línea](/es/mblock-online-sin-instalar/). Para la aplicación de escritorio: [instalar mBlock 5](/es/instalar-mblock-5-windows/) o [descargar mBlock 5](/es/descargar-mblock-5-gratis/). Para Scratch solo (sin robot Makeblock): [mBlock vs Scratch](/es/mblock-vs-scratch/). Contenido revisado con mBlock 5.x (interfaz al estilo Scratch 3).

![La interfaz de mBlock en línea: escenario, objetos, bloques y zona de scripts.](/images/blog/guides-2026/mblock-online-wikimedia.png)

*Captura real del IDE mBlock en línea ([ide.mblock.cc](https://ide.mblock.cc/)) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es).*

**mBlock** sirve para programar robots **Makeblock** con **bloques** (en el mismo espíritu que **Scratch**) y, a veces, más adelante con **Python** (un lenguaje de texto). La aplicación instalada, la versión web y el modo Python **no son equivalentes**: todo depende del robot que conectes, de los derechos de administrador y del Bluetooth (la conexión inalámbrica).

**Acceso rápido**

- **En línea:** [ide.mblock.cc](https://ide.mblock.cc/) en Chrome o Edge.
- **En PC:** [descarga oficial](https://www.mblock.cc/en-us/download/) + [guía para Windows](/es/instalar-mblock-5-windows/).
- **Primera prueba en 2 minutos:** el objeto Panda, los bloques «al hacer clic en la bandera verde» y luego «decir ¡Hola!», y después clic en la bandera verde.

## Vista general: tres «puertas» hacia el mismo universo

| | **Aplicación (escritorio)** | **mBlock Web (navegador)** | **Python en mBlock** |
| --- | --- | --- | --- |
| **Ideal si…** | **conectas** un robot (USB / Bluetooth), actualizas el **firmware** (el software interno del robot), quieres la **máxima fiabilidad**. | el colegio **prohíbe** las instalaciones, taller **puntual**, demostración rápida. | el alumnado ya **domina** los bloques y pasa a la **sintaxis** (secundaria). |
| **Límites** | requiere **descarga** y a veces derechos de **admin** (Windows). | el **Bluetooth** a veces es **inestable** según el navegador y el equipo; no siempre es tan cómodo como la app. | depende del **modelo** (mBot2, CyberPi, etc.) y de la **versión**; reservarlo para cuando se entiende la **lógica** de los bloques. |

No es una elección **para toda la vida**: mucha gente usa la **app** en casa o en el laboratorio y la versión **Web** en los equipos bloqueados.

Si después necesitas un robot compatible: [mBot clásico](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21) o [mBot2](https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21) (enlaces de afiliados: comprueba el modelo en la ficha). Guías por edad: [robot para 8 años](/es/robot-programable-8-anos/), [robot para 10 años](/es/robot-programable-10-anos/).

## 1. La aplicación mBlock (Windows / macOS / Chromebook / móvil según la versión)

**Priorízala** para todo lo que toca el **hardware real**:

- **conectar** el robot por **USB** o **Bluetooth**;
- **cargar** el programa en la placa del robot;
- **actualizar el firmware** (a menudo **imposible** o desaconsejado sin USB: consulta la documentación de Makeblock para tu modelo);
- **controladores** y **estabilidad**: menos sorpresas que un navegador que cambia a menudo.

**En este sitio**, sigue las guías [instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/) y luego [primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/) para reconocer **Dispositivos**, **bloques**, la **zona de scripts** y la **conexión**.

## 2. Versión de navegador sin instalación (Chromebook y PC bloqueados)

La versión **web** ([mBlock en línea](https://ide.mblock.cc/) y equivalentes según el periodo) es **muy útil** cuando:

- el ordenador del aula **prohíbe** instalar software;
- haces un **taller puntual** sin derechos de administrador;
- quieres mostrar **bloques** sin sacar el robot (escenario en pantalla).

**Puntos de atención:** el **Bluetooth** puede ser **más caprichoso** que en la aplicación (permisos del navegador, batería, controlador). Para conectar un robot físico desde el navegador, normalmente hace falta **mLink**, un pequeño programa auxiliar de Makeblock que une el navegador con la conexión USB o Bluetooth. Si hay desconexiones o el dispositivo no aparece, sigue la [solución de problemas Bluetooth / mBlock](/es/mblock-bluetooth-solucion/).

## 3. Python en mBlock

El paso a **Python** suele llegar **después** de una fase de **bloques**: tiene un interés **pedagógico** (sintaxis, sangría, variables) y da **continuidad** con la enseñanza secundaria. No es el mismo público ni el mismo ritmo que ensamblar bloques al principio.

Según el **modelo** (**mBot2**, **CyberPi**, **Codey Rocky**, etc.) y la **versión** del software, el acceso al modo texto y las **API** disponibles (interfaces de programación: las funciones que se llaman para controlar el hardware) varían. Lee la documentación del producto y prueba con **un** robot antes de generalizarlo en clase. Para el contexto de hardware: [mBot vs mBot2](/es/mbot-vs-mbot2/), [CyberPi](/es/makeblock-cyberpi-resumen/).

## 4. Extensiones y bloques del mBot (motores, sensores)

Sin una **buena configuración**, los bloques de **motores** o **sensores** del **mBot** no aparecen: hay que **añadir el dispositivo** o la **extensión** correspondiente en mBlock. Procedimiento paso a paso: [instalar los bloques del mBot](/es/instalar-bloques-mbot/).

## 5. Scratch oficial frente a mBlock: no lo mezcles todo

- **Scratch** ([sitio oficial](https://scratch.mit.edu/)): proyectos **en pantalla**, compartir en línea, ecosistema **generalista**.
- **mBlock**: pensado para el **ecosistema Makeblock** (robots, placas, sensores) con **bloques específicos** y **conexión** con el hardware.

Para un taller con **robot Makeblock**, casi siempre se empieza por **mBlock**, no por Scratch solo.

## 6. Mini-FAQ

**¿Tengo que elegir solo uno?**  
No. Usa la **aplicación** en cuanto haya un **robot real** sobre la mesa; guarda la versión **Web** para los equipos donde no se pueda instalar nada; abre **Python** solo cuando los **bloques** se **entiendan**, no solo se copien.

**¿Qué es «Live» frente a la carga?**  
En modo **Live** (conectado), a menudo **pruebas** en tiempo real. La **carga** envía el programa **al** robot para que funcione **sin** el cable; es útil cuando el script ya está validado.

**¿mBlock 5 y mBlock 3 son lo mismo?**  
En los tutoriales recientes de este sitio partimos de **mBlock 5** (la interfaz actual al estilo Scratch 3). Si abres un tutorial muy antiguo, las etiquetas pueden diferir un poco.

**¿«Minecraft mblock» y Minecraft con mBlock son lo mismo?**  
**No.** **Minecraft** es un **juego** de construcción con bloques 3D. **mBlock** es el **software de programación** de Makeblock (bloques de código, robots **mBot**, etc.). Si una búsqueda no encuentra la herramienta correcta, añade **Makeblock** o **mBot** a la consulta.

## Enlaces Amazon (afiliación)

- [Robot Makeblock mBot](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)
- [mBot2 Makeblock](https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21)
- [Libro de Scratch y programación para niños](https://www.amazon.es/s?k=libro+Scratch+programacion+ninos&tag=roboteducat07-21)

<p style="margin:1rem 0;"><a href="https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21" class="affiliate-link" data-product-id="mbot2" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;">Ver el precio del día en Amazon (mBot2)</a> · <a href="https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21" class="affiliate-link" data-product-id="mbot" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#f1f5f9;color:#0f172a;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;border:1px solid #cbd5e1;">Precio del día (mBot v1)</a></p>

*Enlaces de afiliados Amazon.es — comisión posible en compras elegibles.*

---

**Para recordar**: instala la **aplicación** en el equipo principal del proyecto de robot; guarda la versión **Web** para los equipos bloqueados o las demostraciones rápidas; abre **Python** solo cuando la **lógica de los bloques** sea sólida. El software es solo una herramienta: el **proyecto** y la **comprensión** siguen en el centro.

**También puedes leer**: [¿mBlock o Scratch?](/es/mblock-vs-scratch/)

*Autor: Emmanuel Sauvage.*
