---
layout: ../../../layouts/EsPost.astro
title: "Unboxing del kit ElectroHobby.es: 2 ESP32 DevKit, ESP32-C3 Super Mini y sensores (producto cedido)"
description: "Unboxing del kit cedido por ElectroHobby.es: 2 ESP32 DevKit WROOM-32 USB-C, ESP32-C3 Super Mini, relés, sensores y cables Dupont, y los proyectos ESP32 previstos en el sitio."
updated: "19 de noviembre de 2026"
---

<nav class="breadcrumb" aria-label="Miga de pan"><a href="/es/domotica/">Domótica</a> · Unboxing ElectroHobby</nav>

> **Respuesta directa** — El 19 de noviembre de 2026 recibimos un paquete **cedido por ElectroHobby.es**, tienda española de electrónica educativa con sede en Murcia. Este artículo es un **unboxing**: presenta el contenido real del envío y los usos que prevemos en robot-educatif.info. **Todavía no se ha realizado ninguna prueba**, así que no hay mediciones ni un veredicto de test.

Los enlaces de Amazon son **enlaces de afiliado** (`/go/`): pueden generar una comisión sin coste añadido. El enlace a ElectroHobby.es es un **enlace directo, no afiliado**.

<figure>
<img src="/images/domotique/electrohobby-unboxing/15-colis-papier-bulle.webp" alt="Paquete de ElectroHobby.es abierto, piezas aún en plástico de burbujas" width="1600" height="1200" />
<figcaption>El paquete al abrirlo, todavía en su plástico de burbujas.</figcaption>
</figure>

## Contenido del paquete

<figure>
<img src="/images/domotique/electrohobby-unboxing/14-colis-ouvert-cartes-electrohobby.webp" alt="Contenido del paquete ElectroHobby.es con módulos ESP32, sensores y dos tarjetas memo" width="1600" height="2133" />
<figcaption>Vista general del kit, con las dos tarjetas memo ElectroHobby (código de colores de las resistencias y ley de Ohm).</figcaption>
</figure>

Inventario comprobado el 19 de noviembre de 2026:

- **2 ESP32 DevKit** WROOM-32, conector USB-C, 30 pines ;
- un **ESP32-C3 Super Mini**, con sus tiras de pines ;
- una **placa de expansión** para ESP32-C3 Super Mini, con conector de batería ;
- un **módulo de 2 relés 5 V** (JQC3F-05VDC-C, con optoacopladores) ;
- un sensor de ultrasonidos **HC-SR04** ;
- un sensor de luz **TEMT6000** ;
- un sensor de **nivel de agua** ;
- un **micrófono I2S de tipo INMP441** (pines SD, VDD, GND, SCK, WS y LR) ;
- un módulo **AHT20 + BMP280** (temperatura, humedad y presión, bus I2C) ;
- una decena de **interruptores reed** ;
- tres tiras de **cables Dupont** (macho-macho, macho-hembra, hembra-hembra) ;
- dos **tarjetas memo ElectroHobby** (código de colores de las resistencias, ley de Ohm).

## Los 2 ESP32 DevKit WROOM-32 USB-C

El envío incluye **2 ESP32 DevKit** distintos, en el formato clásico de 30 pines, con toma **USB-C**. Es el tipo de placa que recomendamos para empezar con ESPHome, en [qué placa ESP32 elegir](/es/domotica/que-placa-esp32-domotica/).

<figure>
<img src="/images/domotique/electrohobby-unboxing/05-esp32-devkit-wroom-32-usbc-1.webp" alt="Primer ESP32 DevKit WROOM-32 USB-C de 30 pines, vista frontal" width="1600" height="1200" />
<figcaption>El primero de los 2 ESP32 DevKit recibidos.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/06-esp32-devkit-wroom-32-usbc-2.webp" alt="Segundo ESP32 DevKit WROOM-32 USB-C, una placa distinta" width="1600" height="1200" />
<figcaption>El segundo ESP32 DevKit: una segunda placa, no otro ángulo de la primera.</figcaption>
</figure>

Dos placas idénticas permiten llevar dos proyectos en paralelo, por ejemplo un sensor y un relé, sin desmontar el primer montaje.

## El ESP32-C3 Super Mini y su placa de expansión

El **ESP32-C3 Super Mini** es una placa muy compacta, con núcleo RISC-V, Wi-Fi y Bluetooth Low Energy. Resulta práctica cuando falta espacio en la caja. Las tiras de pines venían aparte, para soldarlas si hace falta.

<figure>
<img src="/images/domotique/electrohobby-unboxing/01-esp32-c3-super-mini-recto.webp" alt="ESP32-C3 Super Mini visto de frente, botón y USB-C visibles" width="1600" height="1200" />
<figcaption>Anverso del ESP32-C3 Super Mini.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/02-esp32-c3-super-mini-verso.webp" alt="ESP32-C3 Super Mini visto por detrás, apantallamiento metálico y pads de soldadura" width="1600" height="1200" />
<figcaption>Reverso de la misma placa.</figcaption>
</figure>

El kit incluye también una **placa de expansión** para este Super Mini, con **conector de batería**. Debería facilitar los nodos alimentados por batería. Eso se comprobará en montajes posteriores, no en este unboxing.

<figure>
<img src="/images/domotique/electrohobby-unboxing/12-carte-extension-esp32-c3.webp" alt="Placa de expansión para ESP32-C3 Super Mini con conector de batería" width="1600" height="2133" />
<figcaption>Placa de expansión para el ESP32-C3 Super Mini, con el conector de batería visible.</figcaption>
</figure>

## Módulo de 2 relés 5 V

El módulo lleva dos relés **JQC3F-05VDC-C** y optoacopladores. Este tipo de placa sirve para mandar un contacto seco: es la misma necesidad descrita en la guía para [abrir la puerta del garaje con el móvil y un ESP32](/es/domotica/puerta-garaje-smartphone-esp32-esphome/). Aquí aún no se ha cableado nada.

<figure>
<img src="/images/domotique/electrohobby-unboxing/07-module-2-relais-5v.webp" alt="Módulo de dos relés 5 V JQC3F-05VDC-C con optoacopladores" width="1600" height="1200" />
<figcaption>Módulo de 2 relés 5 V, con bornes y optoacopladores visibles.</figcaption>
</figure>

## Sensores y micrófono

Los sensores permiten imaginar varios tutoriales ESP32. No adelantamos prestaciones mientras no se hayan probado.

<figure>
<img src="/images/domotique/electrohobby-unboxing/10-hc-sr04.webp" alt="Sensor de ultrasonidos HC-SR04, cuatro pines VCC Trig Echo GND" width="1600" height="2133" />
<figcaption>Sensor de ultrasonidos HC-SR04, para una medida de distancia o de nivel (fuera del líquido).</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/03-temt6000.webp" alt="Sensor de luz ambiental TEMT6000 en una placa pequeña" width="1600" height="1200" />
<figcaption>Sensor de luz TEMT6000.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/04-capteur-niveau-eau.webp" alt="Sensor de nivel de agua con pistas al descubierto y borne de tres hilos" width="1600" height="1200" />
<figcaption>Sensor de nivel de agua, pensado para un depósito o un descalcificador.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/09-micro-i2s-inmp441.webp" alt="Micrófono I2S de tipo INMP441 con pines SD, VDD, GND, SCK, WS y LR" width="1600" height="1200" />
<figcaption>Micrófono I2S de tipo INMP441, identificado por la serigrafía SD / VDD / GND / SCK / WS / LR.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/08-aht20-bmp280.webp" alt="Módulo combinado AHT20 y BMP280, conector I2C" width="1600" height="1200" />
<figcaption>Módulo AHT20 + BMP280: temperatura, humedad y presión por I2C.</figcaption>
</figure>

El módulo meteorológico AHT20 + BMP280 encaja con nuestro [tutorial del sensor de temperatura ESP32 + ESPHome](/es/domotica/esp32-esphome-sensor-temperatura/). El sensor de agua y el HC-SR04 podrán servir para un seguimiento de nivel. El micrófono I2S podrá, más adelante, abrir la puerta a una orden de voz local.

## Interruptores reed y cables Dupont

<figure>
<img src="/images/domotique/electrohobby-unboxing/11-interrupteurs-reed-ils.webp" alt="Una decena de interruptores reed sobre el escritorio" width="1600" height="2133" />
<figcaption>Interruptores reed, para detectar la apertura de una puerta o una tapa con un imán.</figcaption>
</figure>

<figure>
<img src="/images/domotique/electrohobby-unboxing/13-cables-dupont.webp" alt="Tres tiras de cables Dupont macho-macho, macho-hembra y hembra-hembra" width="1600" height="2133" />
<figcaption>Las tres tiras Dupont incluidas: macho-macho, macho-hembra y hembra-hembra.</figcaption>
</figure>

Junto con un imán, los reed son una forma sencilla de señalar la apertura de una puerta, una ventana o una tapa. Los cables Dupont evitan tener que preparar hilos antes de las primeras pruebas en protoboard.

## Los proyectos que prevemos en el sitio

El kit aún no se ha puesto en tensión. Los siguientes artículos están **previstos**, todavía no escritos como pruebas:

- una **estación meteorológica** ESP32 + AHT20/BMP280, a partir del [tutorial ESPHome ya publicado](/es/domotica/esp32-esphome-sensor-temperatura/) ;
- un **seguimiento del nivel de agua** (depósito o descalcificador) con el sensor previsto, quizá junto con el HC-SR04 ;
- una **detección de apertura** con los interruptores reed ;
- un **mando por relé**, en la línea de la guía de la [puerta del garaje](/es/domotica/puerta-garaje-smartphone-esp32-esphome/) ;
- más adelante, una prueba del **micrófono I2S** para una orden de voz local.

Hay más ideas en la página [10 proyectos ESP32 para la domótica](/es/domotica/proyectos-esp32-domotica/).

## Dónde encontrar estas placas y sensores

El paquete fue **cedido por** <a href="https://www.electrohobby.es/" rel="sponsored noopener" target="_blank">ElectroHobby.es</a> <small>(enlace directo, no afiliado)</small>. La tienda, con sede en Murcia, vende componentes y kits de electrónica educativa.

Si buscáis una placa equivalente, en el sitio ya existe una búsqueda de afiliado, sin un precio indicado aquí: <a href="/go/az-es-0f514360b9/" rel="sponsored nofollow noopener">ESP32 DevKit en Amazon.es</a> <small>(enlace de afiliado)</small>. Comprobad siempre la ficha del vendedor (número de pines, USB-C o micro-USB, memoria flash) antes de pedir.
