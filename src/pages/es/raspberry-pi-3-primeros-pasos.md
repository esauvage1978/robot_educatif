---
layout: ../../layouts/EsPost.astro
title: "Kit Raspberry Pi 3: puesta en marcha e instalación del sistema"
description: "Raspberry Pi 3 Model B: hardware con micro-USB, Imager, Raspberry Pi OS de 32 bits, Wi‑Fi, SSH y solución de problemas. Tutorial para principiantes."
updated: "31 de octubre de 2026"
---

Algunos enlaces de esta página son de afiliados. Si compras a través de ellos, podemos recibir una comisión sin coste adicional. Comprueba el precio del día en la ficha de la tienda.

La **Raspberry Pi 3 Model B** (2016) sigue siendo una entrada asequible al ecosistema **Linux embebido**, la **programación** (Python, C…) y los proyectos **GPIO** (pines de entrada/salida de la placa) (LED, sensores, pequeños robots de escritorio). Ya no es el modelo más reciente, pero el **flujo de puesta en marcha** es el mismo para muchas placas Pi: **tarjeta microSD**, **Raspberry Pi OS**, **red**, **actualizaciones**, luego **acceso remoto** (**SSH**, Secure Shell: un terminal a distancia; **VNC**, Virtual Network Computing: un escritorio remoto).

Este tutorial te guía **paso a paso**. Actualiza el antiguo nombre **Raspbian** (hoy **Raspberry Pi OS**) e integra las **opciones modernas** de Imager (Wi‑Fi, SSH, usuario) para evitar a menudo una pantalla en el primer arranque.

Comparativa: [Pi 3 vs 4 vs 5](/es/raspberry-pi-3-vs-4-vs-5/). RAM: [Pi 4 qué RAM](/es/raspberry-pi-4-que-ram/), [Pi 5 qué RAM](/es/raspberry-pi-5-que-ram/).

## 1. Recordatorio: qué es una Raspberry Pi 3 Model B

| Elemento | Detalle útil |
|------|----------------|
| **Procesador** | Broadcom BCM2837, cuatro núcleos **~1,2 GHz** (ARMv8, modo 32 bits habitual) |
| **Memoria** | **1 GB** de RAM LPDDR2 |
| **Red** | Ethernet **100 Mbit/s**, Wi‑Fi **802.11n**, **Bluetooth 4.1** |
| **USB** | 4 puertos USB 2.0 |
| **Vídeo** | HDMI **de tamaño completo** (no micro-HDMI como en Pi 4/5) |
| **Almacenamiento** | **Tarjeta microSD** (sistema operativo) |
| **GPIO** | 40 pines (compatible con muchas carcasas y HAT (tarjeta de extensión que se apila sobre la Pi)) |

*En la práctica*: para **multimedia 4K**, un **escritorio** muy fluido o **USB 3**, una **Pi 4** o **Pi 5** es más cómoda; para **aprender**, **domótica ligera**, un **servidor** modesto o **robótica** a pequeña escala, una Pi 3 aún puede bastar — sobre todo si ya la tienes.

**Ilustración (placa real)** — Raspberry Pi 3 Model B:

![Raspberry Pi 3 Model B, vista superior — conectores USB, Ethernet, GPIO](/images/blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.webp)

*Foto: [Sven.petersen](https://commons.wikimedia.org/wiki/File:9815_-_Raspberry_Pi_3.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), vía Wikimedia Commons.*

## 2. Material necesario

- La **placa** Raspberry Pi 3 Model B.
- **Tarjeta microSD**: 16 GB o más, **clase A1/A2** o marca fiable; 32 GB sigue siendo un buen compromiso.
- **Alimentación**: **5 V** en **micro-USB**, corriente **≥ 2,5 A** recomendada (subalimentación = pantallas raras o reinicios).
- **Pantalla + teclado + ratón** (opcionales si preparas todo con **Imager** en modo sin pantalla).
- **Cable de red** o Wi‑Fi; para el primer arranque, el **cableado** evita un paso de resolución de problemas.

Esquema de las **conexiones habituales** (alimentación, HDMI, zona SD):

![Esquema de conexiones usuales Raspberry Pi 3 Model B](/images/blog/raspberry-pi3-mise-en-route/connexions-pi3.svg)

## 3. Preparar la tarjeta SD con Raspberry Pi Imager

La herramienta oficial **Raspberry Pi Imager** escribe **Raspberry Pi OS** (u otra imagen) en la microSD desde un PC Windows, macOS o Linux.

1. Descarga **Imager** en la página oficial: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
2. Instálalo, inserta la **microSD** (adaptador USB si hace falta).
3. Lanza Imager; sigue **CHOOSE OS** (= elegir sistema) → **CHOOSE STORAGE** (= elegir almacenamiento) → **WRITE** (= escribir).

![Flujo lógico: OS, almacenamiento, escritura, luego inserción en la Pi](/images/blog/raspberry-pi3-mise-en-route/imager-etapes.svg)

### 3.1 ¿Qué OS elegir para una Pi 3?

- **Raspberry Pi OS (32-bit)**: la opción más **documentada** y **ligera** para esta placa.
- **Raspberry Pi OS (64-bit)**: posible en Pi 3, a veces un poco más **exigente** en RAM; a probar según el uso.

Evita un escritorio demasiado pesado si apuntas sobre todo a **servidor** o **robótica**: la imagen **Lite** (sin interfaz gráfica) es ideal solo para SSH.

### 3.2 Opciones avanzadas (muy recomendadas)

Antes de escribir en la tarjeta, abre el **icono en forma de engranaje** (*Advanced options*) en Imager. A menudo puedes:

- definir el **nombre de host** (ej. `raspberrypi.local`);
- activar **SSH** y autenticación por **contraseña** o **clave**;
- configurar el **Wi‑Fi** (SSID, el nombre de tu red Wi‑Fi, + contraseña);
- crear una **cuenta de usuario** y una **contraseña** (en las imágenes recientes, el par histórico `pi` / `raspberry` **ya no** es el valor por defecto impuesto — todo se configura aquí o en el primer arranque).

Eso permite un primer arranque **sin pantalla**: la placa se une a la red, SSH está listo, te conectas desde otro PC.

### 3.3 Escribir y finalizar

- Confirma que el **disco seleccionado** sea realmente tu **microSD** (todo el contenido se borrará).
- Espera el final de la escritura y de la **verificación** si se propone.
- Extrae la tarjeta correctamente, insértala **en la Pi** (contactos hacia arriba, lado «corto» según la carcasa).

## 4. Primer arranque y asistente

1. Conecta **primero** la pantalla y el teclado si los usas, luego la **alimentación** micro-USB.
2. En el primer lanzamiento, un **asistente** (según la versión) puede pedir: **país**, **idioma**, **zona horaria**, **contraseña** de la cuenta, **pantalla completa** HDMI, **Wi‑Fi**, **actualizaciones** de software.

**Consejo**: acepta las **actualizaciones** propuestas al final del asistente, o hazlas manualmente (sección siguiente).

Si lo habías preconfigurado todo en Imager y solo usas **SSH**, este asistente puede ser mínimo o ya omitido — según la imagen exacta.

## 5. Actualizar el sistema (imprescindible)

Abre un terminal en la Pi (o una sesión SSH):

```bash
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

Esto alinea **Raspberry Pi OS** y los paquetes con los parches de seguridad. Repítelo con regularidad en una máquina expuesta a la red.

## 6. Activar SSH y VNC a posteriori

Si no activaste SSH en Imager:

- Menú **Preferencias** → **Raspberry Pi Configuration** (o `sudo raspi-config`) → pestaña **Interfaces**:
  - **SSH**: **Enabled** para la consola remota;
  - **VNC**: **Enabled** para el escritorio gráfico remoto (servidor **RealVNC** integrado en Raspberry Pi OS con escritorio).

Reinicia si se solicita. Para conectarte por VNC desde otro PC, usa **VNC Viewer** (cliente oficial) con la **dirección IP** de la Pi o `raspberrypi.local` (mDNS).

## 7. Conectarse por SSH desde Windows

1. En la Pi: anota la **dirección IP** (`hostname -I` o menú de red).
2. En Windows 11, **OpenSSH** suele estar disponible: abre **PowerShell** o **Terminal** y escribe `ssh usuario@direccion_ip`.
3. Si no, **PuTTY** sigue siendo un cliente gráfico habitual para SSH.

**Seguridad**: cambia la contraseña por defecto y, a largo plazo, prefiere una **clave SSH** en lugar de una contraseña en Internet.

## 8. Transferir archivos: mejor SFTP que el «FTP clásico»

Con **SSH** activado ya tienes **SFTP** (SSH File Transfer Protocol): mismo **puerto 22**, cifrado incluido.

- **FileZilla**: protocolo **SFTP**, host = IP de la Pi, usuario / contraseña (o clave), puerto **22**.
- No hace falta instalar **vsftpd (opción avanzada: servidor FTP)** para un uso familiar o pedagógico; el **FTP** sin cifrar (puerto 21) está hoy **desaconsejado** en una red no controlada.

*(Una versión anterior de este artículo detallaba **vsftpd**: sigue siendo posible para necesidades muy específicas, pero SFTP cubre casi todos los casos «enviar un archivo a la Pi».)*

## 9. Resolución de problemas rápida

| Síntoma | Qué probar |
|---------|------|
| **Rayo amarillo** en una esquina de la pantalla | A menudo **subalimentación** o cable micro-USB demasiado fino — prueba una fuente **5 V / 2,5 A** de calidad. |
| Pantalla negra al arrancar | Comprueba **HDMI**, a veces conectar **después** del encendido; prueba otra resolución en `raspi-config`. |
| Sin IP / sin Wi‑Fi | Cable Ethernet para la prueba; verifica SSID / contraseña introducidos en **Imager**; router que acepte la Pi. |
| SSH «connection refused» | SSH no activado: conecta una pantalla una vez o reescribe la tarjeta con Imager (opciones avanzadas). |

## 10. Pi 3 y continuación del proyecto

Una vez estable la **base del sistema**, puedes pasar a:

1. **GPIO** (pines de entrada/salida): LED, botón, sensor DHT — con Python (`gpiozero` o `RPi.GPIO`).
2. **HAT** (tarjeta de extensión que se apila sobre la Pi): sensor, motor, pantalla.
3. **Servicios** ligeros: web, pequeño NAS, VPN doméstica.
4. Comparar con un **robot educativo** todo en uno — guías [robot programable 12 años](/es/robot-programable-12-anos/) y [mejor robot educativo 2026](/es/mejor-robot-educativo-2026/).

**Siguiente paso práctico:** enciende un LED en el pin 17 con un tutorial GPIO, o elige [qué RAM para Pi 4](/es/raspberry-pi-4-que-ram/) / [Pi 5](/es/raspberry-pi-5-que-ram/) si vas a renovar la placa.

## Material compatible con Raspberry Pi 3 (afiliados)

Este tutorial trata de la **Pi 3**: se alimenta por **micro-USB** (no por USB-C como la Pi 4 y la Pi 5) y se recomienda un sistema de **32 bits** para empezar. Los enlaces de abajo apuntan a este material. **Comprueba** el conector, la intensidad y la compatibilidad en cada ficha antes de comprar, porque los precios cambian. Los enlaces de kit, microSD y libro son búsquedas para comparar ofertas. El enlace de la fuente apunta a la referencia oficial micro-USB 5 V / 2,5 A para la Pi 3; comprueba igualmente el conector en la ficha.

- [Kit Raspberry Pi 3 Model B](https://www.amazon.es/s?k=Raspberry+Pi+3+Model+B+kit&tag=roboteducat07-21)
- [Tarjeta microSD 32 GB clase A1](https://www.amazon.es/s?k=microSD+32GB+A1+Raspberry+Pi&tag=roboteducat07-21)
- [Fuente de alimentación 5 V / 2,5 A micro-USB para Pi 3](https://www.amazon.es/dp/B01CO1HZJ6?tag=roboteducat07-21)
- [Libro Raspberry Pi para principiantes](https://www.amazon.es/s?k=Raspberry+Pi+libro+principiantes&tag=roboteducat07-21)

Para una placa más reciente (USB-C), consulta la [comparativa Pi 3 vs 4 vs 5](/es/raspberry-pi-3-vs-4-vs-5/). No mezcles nunca la fuente de alimentación de una Pi 5 con la de una Pi 3.

*Enlaces de afiliados Amazon.es — comisión posible en compras elegibles.*

---

**En resumen**: **Raspberry Pi Imager** + **Raspberry Pi OS**, **opciones avanzadas** para SSH/Wi‑Fi, **actualizaciones** `apt`, luego **SSH** y **VNC** según tus necesidades — tienes una base sana para todo lo que viene después en una **Raspberry Pi 3 Model B**.

*Autor: Emmanuel Sauvage.*
