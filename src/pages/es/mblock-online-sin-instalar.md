---
layout: ../../layouts/EsPost.astro
title: "mBlock online (ide.mblock.cc): programar sin instalar"
description: "Programar mBot online en ide.mblock.cc sin instalar: conexión, mLink, guardar .mblock en local. Guía gratuita 2026 para Chrome y Edge."
updated: "30 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste adicional. Comprueba el precio del día en la ficha de la tienda.

<div class="callout-quick" style="border:2px solid #2563eb;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#eff6ff;color:#1e293b;">
<p style="margin:0 0 0.5rem;font-weight:700;font-size:1.05rem;">Acceso directo a mBlock online (gratis, sin cuenta obligatoria)</p>
<ul style="margin:0 0 0.75rem;padding-left:1.2rem;">
  <li><strong>Editor web oficial:</strong> <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#1d4ed8;">Abrir ide.mblock.cc en el navegador</a> (prioriza <strong>Google Chrome</strong> o <strong>Microsoft Edge</strong>).</li>
  <li><strong>Idioma:</strong> haz clic en el icono del <strong>globo</strong> arriba a la izquierda → elige el idioma.</li>
  <li><strong>Guardar sin registro:</strong> menú <strong>Archivo → Guardar en el ordenador</strong> (archivo local <code>.mblock</code>).</li>
  <li><strong>¿Prefieres la aplicación completa sin conexión?</strong> Consulta <a href="/es/descargar-mblock-5-gratis/">Descargar mBlock 5 gratis</a>.</li>
</ul>
</div>

**mBlock online** (gratis en **[ide.mblock.cc](https://ide.mblock.cc/)**) permite programar con **bloques al estilo Scratch 3** y **Python** (en dispositivos compatibles) **directamente en el navegador**, sin instalar el software de escritorio completo (~1 GB). Es la solución ideal en un **Chromebook**, en un **PC de colegio sin derechos de administrador**, o para arrancar un taller en menos de 30 segundos.

![Interfaz de mBlock online (ide.mblock.cc): escenario Panda, bloques Scratch y zona de script](/images/blog/guides-2026/mblock-online-wikimedia.png)

<h2 id="paso-a-paso">1. Guía paso a paso: abrir ide.mblock.cc en Chrome o Edge</h2>

Así puedes iniciar una sesión en **mBlock online** en menos de un minuto:

1. **Abre Chrome o Edge (versión reciente)** — Firefox y Safari suelen limitar el acceso USB serie (**WebSerial** / **WebUSB**). **Google Chrome**, **Microsoft Edge** y **Chromium** gestionan de forma nativa la comunicación con placas robóticas.
2. **Ve a `https://ide.mblock.cc/`** — el espacio de trabajo carga con la mascota Panda.
3. **Configura el idioma de la interfaz** — haz clic en el icono del **globo** arriba a la izquierda de la barra azul y elige **Español** (u otro idioma). Las categorías (*Movimiento, Apariencia, Eventos, Control, Sensores*) cambian al instante.
4. **Elige el objetivo (Objetos o Dispositivos)**:
   - Pestaña **Objetos (Sprites)**: crea un juego o una animación en pantalla al estilo Scratch, sin robot conectado.
   - Pestaña **Dispositivos (Devices)**: programa un **mBot**, **mBot2 (CyberPi)**, **mBot Ranger**, **Codey Rocky**, **Halocode** o una placa **Arduino UNO / Mega**.

<h2 id="conectar-mbot">2. Conectar un mBot o mBot2 por USB con mLink / WebUSB</h2>

Por defecto, un navegador está aislado del hardware del ordenador por seguridad. Para que **mBlock online (`ide.mblock.cc`)** pueda enviar tu programa por el cable USB del robot, coexisten dos modos:

### Paso A — Añadir el robot en la pestaña Dispositivos

1. Abajo a la izquierda bajo el escenario, abre la pestaña **Dispositivos**.
2. Si *CyberPi* aparece por defecto y usas un **mBot clásico (v1.1)**, haz clic en **+ Añadir**, selecciona **mBot** en la biblioteca de dispositivos y confirma con **OK**.
3. Para activar extensiones (matriz LED, servo, sensor ultrasónico…), haz clic en **+ Extensión** al final de la columna de bloques (ver [Instalar los bloques del mBot](/es/instalar-bloques-mbot/)).

### Paso B — Establecer el enlace USB (mLink 2 o conexión web directa)

1. Conecta el **mBot** por USB al ordenador y pon el interruptor del robot en **ON**.
2. Haz clic en el botón azul **Conectar** abajo a la izquierda de `ide.mblock.cc`.
3. Si el servicio **mLink** aún no está activo, mBlock online propone lanzar o descargar **mLink** (puente ligero de unos 60 MB para Windows, Mac, Linux o extensión Chromebook):
   - En **Chromebook**, instala la extensión oficial *mLink* desde Chrome Web Store.
   - En **Windows / Mac**, si mLink ya está presente, marca **Mostrar todos los dispositivos conectables**, selecciona el puerto serie (`COM3`, `COM4` o `/dev/tty.wchusbserial…`) y haz clic en **Conectar**.
4. Elige por último el modo abajo a la izquierda:
   - **Modo En directo (Live)**: el programa corre en tiempo real con el cable conectado (ideal para probar con la bandera verde).
   - **Modo Cargar (Upload)**: el código se compila y se flashea en la memoria del mBot para que funcione de forma autónoma al desconectar el cable.

<h2 id="guardar-sin-cuenta">3. Guardar y reabrir un archivo .mblock sin crear una cuenta</h2>

En clase o en casa **no es obligatorio crear una cuenta Makeblock** (también evita recoger correos de alumnos):

- **Para guardar el trabajo**: haz clic en **Archivo** (arriba a la izquierda) → **Guardar en el ordenador**. El navegador descarga un archivo `.mblock` en *Descargas* o en una memoria USB.
- **Para retomar un proyecto**: en `ide.mblock.cc`, haz clic en **Archivo → Abrir desde el ordenador** y selecciona tu archivo `.mblock`.
- **Compatibilidad total**: un archivo `.mblock` creado en `ide.mblock.cc` se abre igual en la aplicación de escritorio [mBlock 5](/es/descargar-mblock-5-gratis/), y al revés.

<h2 id="comparativa">4. Comparativa: mBlock online vs mBlock 5 de escritorio</h2>

| Criterio | **mBlock online (`ide.mblock.cc`)** | **mBlock 5 escritorio (Windows / Mac)** |
|---|---|---|
| **Instalación requerida** | **Ninguna** (o un pequeño puente mLink ~60 MB para USB) | Instalador completo (~380 MB de descarga, ~1 GB en disco) |
| **Chromebook y PC bloqueados** | **Perfectamente adecuado** | No instalable en Chromebook |
| **Funcionamiento sin Internet** | No (hay que cargar `ide.mblock.cc`) | **100 % sin conexión** una vez instalado |
| **Programación en pantalla (Scratch)** | Inmediata, cero configuración | Inmediata tras la instalación |
| **Carga USB mBot / mBot2** | Sí vía Chrome/Edge + mLink | **Muy estable** (driver CH340 incluido) |
| **Actualización de firmware y Bluetooth** | Más sensible a los ajustes del navegador | **Recomendado** para restaurar el programa por defecto |

Para comparar también la app de tableta **mBlock Blockly** y el editor **Python**, consulta [Qué software mBlock elegir](/es/software-mblock-cual-elegir/).

<h2 id="problemas">5. Solución de problemas: ¿por qué no se detecta mi mBot online?</h2>

1. **No aparece ningún puerto COM en la ventana Conectar**:
   - Comprueba que el interruptor del mBot está en **ON** y que usas un cable USB con datos (algunos cables de carga de teléfono no tienen hilos de datos).
   - Marca **Mostrar todos los dispositivos conectables**.
   - Si falta el driver serie en Windows, instala el driver **CH340** vía mLink o sigue [Instalar mBlock 5 en Windows](/es/instalar-mblock-5-windows/).
2. **Usas Firefox o Safari**:
   - Abre `https://ide.mblock.cc/` en **Google Chrome** o **Microsoft Edge**.
3. **El Bluetooth se corta o rechaza el emparejamiento**:
   - Nunca emparejes el mBot primero en los ajustes Bluetooth de Windows: pasa por el botón **Conectar** de mBlock. Detalles: [Solución Bluetooth mBlock](/es/mblock-bluetooth-solucion/).

<h2 id="robots-compatibles">6. Robots compatibles</h2>

Los robots educativos Makeblock se programan desde `ide.mblock.cc`. Verifica el nombre del anuncio y el precio del día antes de comprar:

- **[Makeblock mBot (aprox. 8–12 años)](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)** — clásico de escuelas · bloques Scratch y Arduino · [ver precio en Amazon.es](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)
- **[Makeblock mBot2 CyberPi (aprox. 10–14 años)](https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21)** — pantalla a color, Wi‑Fi, batería · bloques y Python
- **[Makeblock Codey Rocky (aprox. 6–12 años)](https://www.amazon.es/dp/B07CGH8NZ7?tag=roboteducat07-21)** — listo para jugar, matriz LED · Scratch y Python

<h2 id="faq">7. FAQ — mBlock online</h2>

### ¿Cómo abrir mBlock online gratis?

Abre **https://ide.mblock.cc** en Chrome o Edge, haz clic en el icono del **globo** arriba a la izquierda y elige el idioma.

### ¿Se puede programar un mBot real con mBlock online?

Sí: conecta el mBot por USB, haz clic en **Conectar** abajo a la izquierda de `ide.mblock.cc` y usa el puente **mLink** (o la extensión Chromebook) para cargar el código.

### ¿Cómo guardar un proyecto sin cuenta?

Usa **Archivo → Guardar en el ordenador** para obtener tu archivo `.mblock` en local.

### ¿Cuándo preferir la versión PC/Mac para descargar?

Cuando trabajas sin conexión o debes actualizar el firmware USB del mBot: sigue [Descargar mBlock 5 gratis](/es/descargar-mblock-5-gratis/).

## Consejos de aula para ide.mblock.cc

En PC escolares bloqueados: marca **https://ide.mblock.cc/** y instala solo la extensión **mLink** de Chromebook o el puente ligero Windows/Mac cuando haga falta USB. Pide a los alumnos que guarden una copia .mblock en memoria USB o en la nube al final de la sesión — la caché del navegador no es una copia de seguridad.

Si varios robots comparten el aula, etiqueta cables USB y puertos COM. En modo En directo, solo una pestaña del navegador debería poseer el puerto serie; cerrarla o actualizarla suele liberarlo.

Cuando más adelante necesites restaurar firmware sin conexión o cargas frecuentes sin Wi‑Fi, pasa a la [guía de descarga de escritorio](/es/descargar-mblock-5-gratis/) y conserva los mismos archivos .mblock.

## Modos En directo vs Cargar — cuándo usar cada uno

| Situación | Preferir |
|---|---|
| Depurar bloques con la bandera verde mirando sensores | **En directo** (cable conectado) |
| El robot debe circular solo sin el PC | **Cargar (Upload)** |
| Actualizar o restaurar el firmware por defecto | mejor **mBlock 5 de escritorio** |
| Juego Scratch rápido sin hardware | pestaña Objetos — no hace falta Conectar |

En directo es ideal para la primera clase. Cargar es el objetivo cuando el programa es estable.

## Fichas de producto (comprueba el precio del día)

### Makeblock mBot (aprox. 8–12 años)

Clásico de escuelas · bloques Scratch y luego Arduino. Confirma que el anuncio sea el kit educativo Bluetooth/USB, no solo una placa de repuesto.

- [Amazon.es — consultar precio](https://www.amazon.es/dp/B07XR98YYQ?tag=roboteducat07-21)

### Makeblock mBot2 CyberPi (aprox. 10–14 años)

Pantalla a color, Wi‑Fi, batería · bloques y Python. Ideal cuando un solo robot debe crecer con el alumno.

- [Amazon.es — consultar precio](https://www.amazon.es/dp/B0919F9CKS?tag=roboteducat07-21)

### Makeblock Codey Rocky (aprox. 6–12 años)

Listo para jugar · matriz LED expresiva · Scratch y Python.

- [Codey Rocky en Amazon.es — 178,99 € el 9 de noviembre de 2026](https://www.amazon.es/dp/B07CGH8NZ7?tag=roboteducat07-21)

Guías relacionadas: [Qué software mBlock](/es/software-mblock-cual-elegir/), [Primeros pasos mBlock 5](/es/primeros-pasos-mblock-5/), [Solución Bluetooth](/es/mblock-bluetooth-solucion/).

## Nota de privacidad para centros escolares

mBlock online se puede usar **sin crear una cuenta Makeblock**. Prefiere **Archivo → Guardar en el ordenador** para que el trabajo quede en el almacenamiento del centro o en una memoria USB. Si la política exige cuentas, sigue la normativa TI y evita correos personales de alumnos pequeños.

Los avisos WebSerial / WebUSB son diálogos de seguridad del navegador: los alumnos solo deben aceptarlos para un robot conectado físicamente.

## Flujo Chromebook (resumen)

1. Abrir Chrome → ide.mblock.cc  
2. Si hace falta USB, instalar **mLink** desde Chrome Web Store  
3. Dispositivos → añadir mBot o mBot2 → Conectar  
4. Guardar .mblock antes de cerrar la sesión del Chromebook  

Así se evita la app de escritorio de ~1 GB en dispositivos gestionados.

## Siguientes pasos tras conectar

Cuando En directo funcione, prueba un test de un bloque: ambos LED RGB en rojo un segundo. Luego [Primeros pasos en mBlock 5](/es/primeros-pasos-mblock-5/) o [Instalar bloques mBot](/es/instalar-bloques-mbot/) si faltan extensiones. Solo Bluetooth: lee [Solución Bluetooth](/es/mblock-bluetooth-solucion/) antes de cambiar el emparejamiento de Windows.

*Autor: Emmanuel Sauvage.*
