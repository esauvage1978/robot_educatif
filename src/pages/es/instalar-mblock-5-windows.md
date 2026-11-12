---
layout: ../../layouts/EsPost.astro
title: "Instalar mBlock 5 en Windows 10/11 (controlador CH340)"
description: "Instalación de mBlock 5 paso a paso con capturas: descarga, controlador CH340 para mBot, bloqueo SmartScreen resuelto."
updated: "31 de octubre de 2026"
schemaUpdated: "2026-10-31"
---

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.2rem;margin:1rem 0 1.25rem;background:#f0fdfa;color:#134e4a;">
<strong>¿No quieres instalar nada?</strong> Usa <a href="/es/mblock-online-sin-instalar/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock en línea en el navegador (sin instalación)</a>.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:1rem 0 1.5rem;background:#f2f7ff;color:#1f2430;">

**Respuesta directa (octubre 2026)** — En **Windows 10/11**: descarga **mBlock 5 PC** en [mblock.cc](https://www.mblock.cc/en-us/download/) (ver [descargar mBlock 5 gratis](/es/descargar-mblock-5-gratis/)), ejecuta el instalador, pulsa **Sí** en el **UAC** (**Control de cuentas de usuario**), espera la copia y confirma **Setup_Driver_CH341** para el controlador **CH340**. Desbloquea **SmartScreen** solo si el editor es **Makeblock**. Después: [primeros pasos mBlock](/es/primeros-pasos-mblock-5/) y [bloques mBot](/es/instalar-bloques-mbot/). Software: [qué mBlock elegir](/es/software-mblock-cual-elegir/).

**Acceso rápido a mBlock 5**

- **En línea, sin instalación:** abre [ide.mblock.cc](https://ide.mblock.cc/) en Chrome o Edge y empieza a programar enseguida.
- **En PC:** descarga gratis la aplicación en [mblock.cc](https://www.mblock.cc/en-us/download/), y sigue esta guía para Windows 10 u 11.
- **Después de instalar:** para un primer proyecto guiado (bandera verde, sprites), ve a [primeros pasos mBlock 5](/es/primeros-pasos-mblock-5/).

**El robot más sencillo de pilotar con mBlock:** el [Makeblock mBot2 con placa CyberPi](https://www.amazon.es/s?k=Makeblock+mBot2&tag=roboteducat07-21) (enlace de afiliado Amazon.es), programable por bloques y luego en Python. Para elegir según la edad: [robot para 8 años](/es/robot-programable-8-anos/), [robot para 10 años](/es/robot-programable-10-anos/), [kits de robot Arduino](/es/kit-robot-arduino-para-ninos/).

</div>

<figure class="article-figure">
  <img src="/images/blog/installer-mblock/ecran-01-page-makeblock.png" alt="Captura: página oficial Makeblock Download, sección Windows para mBlock 5." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Página de descarga oficial Makeblock (mblock.cc). Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.</figcaption>
</figure>

**mBlock 5 se descarga gratis** en el sitio oficial **[mblock.cc](https://www.mblock.cc/en-us/download/)** (instalador Windows de unos 380 MB). Esta guía te acompaña **de la A a la Z** para **instalar mBlock 5.6** (programación por bloques Makeblock) en **Windows 10** o **Windows 11**. El número exacto de versión puede evolucionar (**5.6.x**) según el sitio oficial. En las versiones recientes del instalador, **tras aceptar el Control de cuentas de usuario (UAC)**, la instalación **arranca de inmediato**: ya **no hay pantalla** para el idioma por defecto, la carpeta de instalación, el menú Inicio, el acceso directo del escritorio ni un resumen antes de copiar los archivos.

**Ilustraciones:** capturas reales de la instalación; las etiquetas pueden variar según Windows o la versión de mBlock.

mBlock existe también para **macOS**, **iOS**, **Android**, **Linux** y **Chromebook** — aquí solo tratamos **Windows**. ¿Imposible instalar software en el equipo? **mBlock en línea** funciona en el navegador: ve la guía para [programar con mBlock en línea sin instalar nada](/es/mblock-online-sin-instalar/).

Una vez hecha la instalación, podrás programar un robot como el **[mBot](https://www.amazon.es/s?k=Makeblock+mBot&tag=roboteducat07-21)** (enlace Amazon afiliado).

## Antes de empezar (requisitos previos)

- **Cuenta de administrador** (o contraseña de administrador): Windows mostrará a menudo una ventana de **Control de cuentas de usuario**; hay que poder hacer clic en **Sí**.
- **Conexión a Internet** solo para **descargar** el instalador; el uso de mBlock en local puede hacerse después sin red según el uso.
- **Espacio en disco**: el archivo de instalación pesa **unos 380 MB**; **una vez instalado**, el programa ocupa **unos 1,05 GB** en el disco (carpeta bajo `Program Files`, valor que puede variar ligeramente según la versión). Prevé **al menos 1,5–2 GB** libres en el disco del sistema para la instalación, los archivos desplegados y las actualizaciones (margen cómodo).
- **Antivirus / cortafuegos**: si el archivo `.exe` se bloquea en casos raros, verifica que la fuente sea realmente **mblock.cc** (sitio oficial) antes de autorizar la excepción.

---

## Paso 1 — Descargar el instalador Windows

### 1.1 Abrir la página oficial

Ve a la página de descarga de Makeblock:

**[mblock.cc — Download (Windows)](https://www.mblock.cc/en-us/download/)**

Usa de preferencia **Chrome**, **Edge** o **Firefox** actualizados. Evita enlaces «espejo» o sitios de terceros: descarga **solo** desde el dominio oficial.

### 1.2 Elegir Windows y la variante correcta

En la página:

- Selecciona la sección **Windows**.
- Privilegia la versión **64 bits** si el PC es reciente (caso más habitual). Si no lo sabes: en Windows, **Configuración → Sistema → Acerca de** indica el tipo de sistema (**64 bits** o **32 bits**).

El archivo descargado suele parecerse a un nombre del tipo **`mblock5-win32-….exe`**, **`mblock5-win64-….exe`** o **`V5.6.0.exe`** — el nombre exacto puede variar según la versión publicada.

Prefiere siempre **[mblock.cc](https://www.mblock.cc/en-us/download/)** cuando vuelva a estar accesible, para tener la **última** versión y las **huellas** esperadas.

![Captura de pantalla: página de descarga Makeblock — mBlock 5 para Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Localiza la sección **mBlock 5** y el botón **Download** para **Windows** (etiquetas que pueden variar según la versión del sitio).*

### 1.3 ¿Dónde se guarda el archivo?

Tras hacer clic en **Download**:

- El archivo suele llegar a **`Este equipo → Descargas`**.
- En **Edge** o **Chrome**, una barra abajo en la ventana puede mostrar la descarga: puedes hacer clic en **Abrir archivo** o **Mostrar en la carpeta**.
- Atajo útil: **`Ctrl + J`** abre la lista de descargas en varios navegadores.

**Sobre mLink:** la herramienta **mLink** sirve sobre todo a la conexión hardware / ciertos usos. Para trabajar **con la aplicación instalada** como en esta guía, concéntrate en **mBlock 5** para Windows. También puedes usar **[mBlock en línea](https://ide.mblock.cc/)** si prefieres no instalar nada.

---

## Paso 2 — Ejecutar el instalador

### 2.1 Abrir el archivo `.exe`

1. Abre el **Explorador de archivos** (`Windows + E`).
2. Ve a **Descargas**.
3. Localiza el archivo **`.exe`** descargado (icono de aplicación o de instalador).
4. **Doble clic** en ese archivo para lanzar la instalación.

![Captura de pantalla: Explorador de Windows — archivo instalador mBlock en Descargas](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*El **nombre exacto** del archivo depende de la versión; lo importante es lanzar el **`.exe` correcto** que acabas de descargar.*

### 2.2 Control de cuentas de usuario (UAC)

Windows puede mostrar una ventana **«¿Desea permitir que esta aplicación…»** con los botones **No** y **Sí**.

- Haz clic en **Sí** para autorizar al instalador a modificar el equipo (comportamiento normal para un software instalado en `Program Files`).

El **UAC** (**Control de cuentas de usuario**) pregunta si la aplicación puede hacer cambios en el sistema: hace falta **Sí** para instalar en `Program Files`.

*Si no eres administrador, pide ayuda a alguien con derechos en la máquina.*

### 2.3 Instalación automática (sin asistente «paso a paso»)

Tras **Sí** en el **UAC**, el instalador **reciente** ya **no** propone:

- un **idioma** de instalación;
- una **carpeta** de destino a elegir manualmente;
- opciones de **menú Inicio** / **acceso directo en el escritorio**;
- una pantalla de **Resumen** con un botón **Instalar** separado.

La **copia de archivos** empieza **directamente** (ubicación habitual: bajo **`Program Files`**, gestionada por el instalador). Espera hasta la pantalla final.

### 2.4 Barra de progreso

Durante la **copia de archivos**, puede mostrarse una ventana con una **barra de progreso**. **No cierres** la ventana hasta que el instalador lo indique.

![Captura: progreso de instalación mBlock 5 en Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Barra de progreso tras validar el UAC. Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

### 2.5 Fin de la instalación

Al final, aparece una pantalla del tipo **«Install Finished»** / instalación **terminada**. En general **ya no hay casilla** del estilo «Iniciar mBlock»: haz clic en **Finish** / **Finalizar** para cerrar el asistente.

![Captura de pantalla: fin de la instalación mBlock — botón Finalizar / Finish](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

### 2.6 Tamaño en disco tras la instalación

Tras la instalación, la carpeta **mBlock** (a menudo **`Program Files\mBlock5`**) muestra unos **1,05 GB** en las **propiedades** de Windows (**Tamaño** / **Tamaño en disco**) — la cifra exacta puede variar un poco según la **versión** de mBlock y el **sistema de archivos**.

![Captura de pantalla: propiedades de la carpeta mBlock — tamaño en disco tras la instalación](/capture/installer-mblock-5-sous-windows-10/taille-dossier-mblock-apres-install.png)

### 2.7 Abrir mBlock tras la instalación

Después, abre mBlock mediante:

- el **acceso directo del escritorio**, o  
- el **menú Inicio**: escribe **mBlock** en la búsqueda y haz clic en la aplicación.

Después, sigue el artículo **[Primeros pasos con mBlock 5](/es/primeros-pasos-mblock-5/)** para orientarte en la interfaz.

### 2.8 Controlador CH340 / CH341 (puerto COM del mBot)

Al **final** de la instalación de mBlock suele abrirse **Setup_Driver_CH341**: pulsa **Install** y espera *Driver install success*.

Cuando conectas el **mBot** por USB, Windows debe crear un **puerto COM** (por ejemplo `COM3`). Si el Administrador de dispositivos muestra un dispositivo desconocido o un error de controlador:

1. Conecta el robot por USB y enciéndelo (**ON**).
2. Abre **Administrador de dispositivos** → **Puertos (COM y LPT)** o **Otros dispositivos**.
3. Si aparece un chip **CH340** / **CH341** con signo de advertencia, instala el controlador oficial del fabricante del chip (busca «CH340 Windows driver» en el sitio del fabricante WCH) o el que indique Makeblock en [support.makeblock.com](https://support.makeblock.com/).
4. Reinicia mBlock y elige el **puerto COM** correcto en **Conectar**.

Sin este controlador, la **carga** (Upload) del programa al robot falla aunque mBlock esté bien instalado. Más ayuda: [solución Bluetooth/USB mBlock](/es/mblock-bluetooth-solucion/), [primer programa mBot](/es/primer-programa-mbot/).

![Captura: instalación de mBlock 5 finalizada en Windows](/images/blog/installer-mblock/ecran-10-termine.png)

*Fin de la instalación de escritorio. Captura — Emmanuel Sauvage, Robot Éducatif — octubre 2026.*

### 2.9 Primer arranque de mBlock

1. Abre mBlock desde el acceso directo o el menú Inicio.
2. Si aparece un asistente o una pantalla de idioma, elige **Español** si está disponible.
3. Crea un proyecto vacío o elige un dispositivo más tarde (el detalle de la interfaz está en [primeros pasos mBlock 5](/es/primeros-pasos-mblock-5/)).
4. Para el robot: [instalar los bloques mBot](/es/instalar-bloques-mbot/) y luego [primer programa](/es/primer-programa-mbot/).

---

## Solución rápida de problemas

| Problema | Pista |
|----------|--------|
| El archivo `.exe` no se inicia | **Propiedades** → **Desbloquear** si es visible; **Ejecutar como administrador**; vuelve a descargar el archivo; ve la FAQ más abajo. |
| Mensaje **Windows protegió su PC** (SmartScreen) | **Más información** → **Ejecutar de todas formas** — solo si el archivo proviene realmente de **mblock.cc** o del **enlace de reserva** propuesto más arriba en **este sitio**. |
| Instalación interrumpida / pantalla de error | Antivirus o cortafuegos: autoriza el instalador o desactiva **temporalmente** la protección el tiempo de la instalación (y luego reactivala). |
| UAC bloqueado / sin derechos de admin | Cuenta de administrador o ayuda de un adulto / del servicio informático. |
| Robot ausente en **Conectar** | Controlador **CH340** sin instalar o cable solo carga — **Setup_Driver_CH341**, cable de datos, [Bluetooth/USB](/es/mblock-bluetooth-solucion/) |
| Pantallas del instalador en inglés | Las etiquetas **Finish**, **Install Finished**, etc. son habituales; el **idioma de la interfaz** de mBlock se ajusta en la **aplicación** tras abrirla. |

---

## Preguntas frecuentes (FAQ)

### ¿Qué es mBlock 5?

**mBlock 5** (a veces escrito **mblock 5**) es el entorno de programación por bloques desarrollado por **Makeblock**, cercano a **Scratch**, usado sobre todo para los robots **mBot** y el resto del ecosistema Makeblock.

### ¿Dónde descargar mBlock 5.6 gratis?

Página oficial: **[mblock.cc — download](https://www.mblock.cc/en-us/download/)**. Selecciona **Windows** y la variante adecuada (**64 bits** prioritario). Evita instaladores en sitios de terceros no oficiales.

### ¿mBlock 5 es gratis y está disponible en español?

Sí: la descarga estándar es **gratuita**. El instalador **ya no pide** el idioma al principio: la interfaz de **mBlock** puede seguir **Windows** o ajustarse en los **ajustes / idioma** del software tras la instalación.

### Windows 11: ¿el mismo procedimiento?

Sí. Los pasos descritos para **Windows 10** se aplican en general tal cual en **Windows 11** (UAC, copia directa de archivos, carpeta bajo `Program Files`).

### ¿Debo instalar exactamente la 5.6?

Instala la **última versión estable** propuesta en el sitio oficial (a menudo **5.6.x** o más reciente): el instalador puede **ir directo a la copia** de archivos tras el **UAC**, sin las antiguas pantallas «Siguiente» intermedias.

### «Descargar mblock» y «descargar mblock 5», ¿es lo mismo?

En la mayoría de los casos, sí: se trata de **mBlock 5** para PC. Verifica que la fuente sea **Makeblock** / **mblock.cc**.

### Búsquedas tipo «mblock 5 descargar», «descargar mblock», «mblock download», «mblock5 download»

Todas remiten al **mismo software** (mBlock **5** para Windows). La **página oficial** sigue siendo **[mblock.cc — Download](https://www.mblock.cc/en-us/download/)**; para el **PC con Windows**, elige la sección **Windows** (a menudo **64 bits**). Los equivalentes en inglés (**mblock download**, **mblock 5 download**, **download mblock 5**) apuntan a la misma instalación.

### «mblock5», «mblock v5», «m block 5», «mbloc 5» (falta), «mblcok»: ¿es mBlock?

Sí: en la práctica es el **mismo programa** (**mBlock 5**, entorno Makeblock cercano a Scratch). Si una búsqueda no encuentra nada, escribe **mBlock 5 Makeblock** o ve directamente a **mblock.cc**.

### Versiones antiguas (5.3, 5.4.3, «descargar mblock 5.4 3»): ¿hay que instalarlas?

Los tutoriales o vídeos pueden citar **5.3** o **5.4.3**: son **referencias antiguas**. Para un PC **nuevo**, instala más bien la **última versión estable** mostrada en el sitio oficial (a menudo **5.6.x** o más reciente). Una versión vieja solo sirve en un caso **muy específico** (compatibilidad de hardware señalada por el fabricante).

### «mblock PC», «mblock download pc», «descargar mblock para windows»

En **mblock.cc**, la sección **Windows** proporciona el instalador **para PC** (fijo o portátil). El procedimiento de esta guía se aplica a **Windows 10** y **Windows 11**.

### «Instalar mblock» tras la descarga: ¿nada más que buscar?

Una vez recuperado el **.exe**, basta con **lanzarlo** (ve la sección **«Paso 2 — Ejecutar el instalador»** más arriba); en general **no** hay un asistente «Siguiente» múltiple en los instaladores recientes — la copia arranca tras el **UAC**.

### mBlock en línea, «mblock 5 web», o instalación: ¿qué elegir?

**[mBlock en línea](https://ide.mblock.cc/)** (navegador) conviene cuando **no se puede** instalar software. Para **firmware**, **USB** estable y **carga** hacia el robot, la **aplicación de escritorio** suele ser preferible — ve [Qué software mBlock: app, Web, Python](/es/software-mblock-cual-elegir/).

### ¿Qué es «mblock planet»?

A menudo se trata del **espacio de cuenta / nube** histórico alrededor de mBlock (dirección tipo **planet.mblock.cc**). Para **crear una cuenta** y el procedimiento en el software, ve la guía [Registrarse en mBlock 5](/sinscrire-sur-mblock/) (procedimiento idéntico en la app).

### Logo mBlock, «imagen mblock»: ¿dónde encontrar una ilustración oficial?

Los **logos** y visuales de marca corresponden al **sitio Makeblock** y a sus **condiciones de uso**. Para aprender el software, las **capturas de pantalla** de la interfaz en los tutoriales del sitio muestran la app tal como aparece en el escritorio.

### ¿mBlock y Minecraft: confusión?

**No**: **mBlock** (Makeblock, robots como el **mBot**) **no es** el juego **Minecraft**. Si la búsqueda mezcla ambos, precisa **Makeblock** o **mBot**.

---

## FAQ — Cuando la instalación no funciona

Las causas más frecuentes vienen de **Windows Defender / SmartScreen**, de un **antivirus de terceros**, de **derechos insuficientes** o de un **archivo descargado incompleto**. La documentación Makeblock indica en particular que algunos **programas de seguridad** (antivirus, suites «todo en uno») pueden **bloquear** la instalación o la ejecución: hay que **autorizar** la aplicación o **añadirla a las excepciones** tras verificar que el archivo proviene del **sitio oficial**.

### Windows muestra «Windows protegió su PC» o SmartScreen bloquea el instalador

Es habitual con archivos **descargados recientemente** o poco «conocidos» por SmartScreen, incluso para software legítimo.

1. Verifica que el `.exe` proviene realmente de **[mblock.cc](https://www.mblock.cc/en-us/download/)** o, en reserva, del **enlace del instalador** facilitado más arriba en este artículo (no de un sitio desconocido).
2. En el aviso, haz clic en **Más información** (o **More info**), luego **Ejecutar de todas formas** / **Run anyway**.
3. Si la opción no aparece: clic derecho en el archivo → **Propiedades** → marca **Desbloquear** abajo si la casilla existe → **Aceptar**, y vuelve a lanzar el instalador.

### El antivirus o el cortafuegos bloquea la instalación (fallo, archivo eliminao, cuarentena)

Varias suites de seguridad **interceptan** los instaladores durante la copia de archivos. La documentación Makeblock recomienda en particular **cerrar temporalmente** algunos programas de protección **el tiempo de la instalación** (y luego reabrirlos), o **añadir una excepción** para el instalador / la carpeta de instalación.

- Abre el antivirus y mira la sección **Cuarentena**, **Amenazas bloqueadas** o **Historial**.
- Si **mblock** o el **instalador** aparecen ahí: restaura el archivo **solo** si proviene de la descarga oficial, y luego añade una **exclusión** para la carpeta de instalación (a menudo bajo `Program Files`) o para el ejecutable.
- Para el **cortafuegos de Windows**: si hay un bloqueo raro al abrir mBlock, autoriza la aplicación cuando Windows lo proponga, o crea una regla que autorice **mBlock** (ve *Firewall de Windows Defender* en la configuración).

### No pasa nada al hacer doble clic en el `.exe`

1. **Clic derecho** en el archivo → **Ejecutar como administrador**.
2. **Propiedades** → pestaña **General** → marca **Desbloquear** si está presente.
3. **Vuelve a descargar** el instalador (archivo incompleto o corrupto: corte de red, navegador que interrumpió la descarga). Compara el **tamaño** del archivo con lo que indica el sitio si se muestra un tamaño; elimina la copia anterior antes de volver a descargar.
4. Verifica que no estés en una sesión **sin derechos de administración** en un PC escolar o de empresa: en ese caso, contacta el **servicio informático**.

### Mensaje tipo «Acceso denegado» o error de escritura en una carpeta

- El instalador **reciente** coloca en principio mBlock bajo **`Program Files\…`** sin pedir la ruta; si falla, verifica los **derechos** en el disco **C:** y la ausencia de una **directiva** que bloquee la escritura.
- Evita cualquier escenario en el que un **software de terceros** redirija la instalación hacia una carpeta personal **restringida** o rutas con **caracteres especiales**.
- Asegúrate de haber confirmado **Sí** en el **UAC** cuando Windows lo pida.

### He descargado la arquitectura incorrecta (32 / 64 bits)

Si el PC es de **64 bits** (caso más habitual), toma la versión **64 bits** en la página de descarga. Una versión incompatible puede negarse a instalarse o funcionar mal. Verifica en **Configuración → Sistema → Acerca de** el **Tipo de sistema operativo**.

### Ya hay una versión antigua de mBlock instalada y causa problemas

1. **Configuración → Aplicaciones → Aplicaciones y características** (o **Panel de control → Programas**).
2. Desinstala **mBlock** (o **Makeblock mBlock** según la etiqueta).
3. Reinicia el PC si el asistente lo propone, y luego vuelve a descargar e instalar la **última versión** desde **mblock.cc**.

### Confusión entre mBlock y mLink

**mBlock** es la aplicación de programación por bloques. **mLink** es una **herramienta separada** (conexión / uso con ciertas configuraciones, sobre todo la web). Si instalas **mLink** y veis un error ligado al **.NET Framework**, sigue los mensajes en pantalla o la **[documentación mLink](https://support.makeblock.com/)**: actualizar **Windows** y los **componentes opcionales .NET** mediante *Configuración → Aplicaciones → Características opcionales* puede ayudar según la versión de Windows.

### La instalación parece correcta pero mBlock no arranca

- Misma lógica que arriba: **antivirus** que bloquea el ejecutable en el primer arranque → excepción para `mblock.exe` (o el nombre mostrado en la carpeta de instalación).
- Lanza mBlock como **administrador** una vez para probar (clic derecho en el acceso directo). Si funciona, el problema venía a menudo de los **derechos** o del **bloqueo en tiempo real** del antivirus.
- Reinstala **encima** o tras una **desinstalación limpia** si el programa aparece en la lista pero está roto.

### Espacio en disco insuficiente

Libera espacio en el disco **C:** (vaciar la papelera, archivos temporales, *Configuración → Almacenamiento*). Prevé **al menos ~1,5–2 GB** libres: instalador **~380 MB** + programa instalado **~1,05 GB** + margen para actualizaciones.

### ¿Dónde pedir ayuda si nada funciona?

- **[Centro de ayuda Makeblock](https://support.makeblock.com/)** (artículos, tickets).
- **Correo** a menudo indicado en el sitio oficial: **service@makeblock.com** — adjuntad la **versión de Windows**, el **mensaje de error exacto** (captura de pantalla) y la **versión** del archivo descargado.

*Las etiquetas de error y las pantallas pueden variar según la versión de mBlock y de Windows; los principios anteriores corresponden a los casos más señalados por los usuarios y a las recomendaciones de los editores de software en Windows.*

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Guía actualizada el 31 de octubre de 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
