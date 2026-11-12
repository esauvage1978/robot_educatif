import {
	AQARA_P2,
	CC_BY,
	CC_BY_SA,
	CELL_CREDIT,
	CELL_PHOTO,
	HA_ACTIONS,
	HA_REMOTE,
	HA_SHELLY,
	HA_TEMPLATE,
	MOTOR_CREDIT,
	MOTOR_PHOTO,
	SHELLY_PRODUCT,
	SONOFF_SNZB,
	guidePath,
	marketSearch,
} from './links.mjs';

const p = (...parts) => ({ type: 'p', parts });
const h2 = (id, toc, text) => ({ type: 'h2', id, toc, text });
const h3 = (text) => ({ type: 'h3', text });
const link = (a, href, sponsored = false) => ({ a, href, sponsored });

const esp = guidePath('es', 'ouvrir-porte-garage-smartphone-esp32-esphome');
const dongle = guidePath('es', 'meilleur-dongle-zigbee-home-assistant');
const zha = guidePath('es', 'home-assistant-zigbee2mqtt-ou-zha');

const PULSE = `alias: Impulso puerta de garaje
mode: single
sequence:
  - action: switch.turn_on
    target:
      entity_id: switch.sustituir_shelly
  - delay:
      milliseconds: 500
  - action: switch.turn_off
    target:
      entity_id: switch.sustituir_shelly
`;

const COVER = `template:
  - cover:
      - name: Puerta de garaje
        unique_id: puerta_garaje_contacto_seco
        device_class: garage
        availability: "{{ not is_state('binary_sensor.sustituir_contacto', 'unavailable') and not is_state('binary_sensor.sustituir_contacto', 'unknown') }}"
        state: "{{ 'closed' if is_state('binary_sensor.sustituir_contacto', 'off') else 'open' }}"
        open_cover:
          - condition: state
            entity_id: binary_sensor.sustituir_contacto
            state: "off"
          - action: script.impulso_puerta_garaje
        close_cover:
          - condition: state
            entity_id: binary_sensor.sustituir_contacto
            state: "on"
          - action: script.impulso_puerta_garaje
        stop_cover:
          - action: script.impulso_puerta_garaje
`;

const CARD = `type: button
entity: cover.puerta_de_garaje
name: Puerta de garaje
show_state: true
tap_action:
  action: toggle
  confirmation:
    text: "¿Accionar la puerta del garaje?"
`;

const ALERT = `alias: Puerta de garaje abierta
description: Solo aviso. Ninguna orden al motor.
mode: single
triggers:
  - trigger: state
    entity_id: binary_sensor.sustituir_contacto
    to: "on"
    for: "00:15:00"
actions:
  - action: notify.notify
    data:
      message: "La puerta del garaje lleva 15 minutos abierta."
`;

export const garageDoorEs = {
	lang: 'es',
	inLanguage: 'es',
	title: 'Abrir una puerta de garaje motorizada desde el móvil',
	description:
		'Contacto seco en el pulsador de pared, estado abierta o cerrada, aviso si se queda abierta. Los 230 V del motor no se conmutan.',
	howToDescription:
		'Localizar los bornes del pulsador, conectar un contacto seco, ajustar un pulso corto y mostrar el estado en Home Assistant sin cerrar la puerta por horario.',
	articleDescription:
		'El módulo imita el pulsador de pared con un contacto seco. No conmuta la red del motor. Un sensor aparte indica si la puerta está cerrada.',
	tocAria: 'Contenido',
	stepWord: 'Paso',
	whereWord: 'Dónde:',
	checkWord: 'Comprobación:',
	steps: [
		{
			title: 'Lee el manual antes de abrir la tapa',
			why: 'El móvil solo repite el pulsador de pared. Si el motor no tiene esa entrada, el proyecto se detiene ahí.',
			where: 'El manual en papel o el PDF del fabricante, no la caja.',
			actions: [
				'Busca pulsador, contacto seco, START, PP o « paso a paso ». El esquema muestra entonces dos bornes previstos para el pulsador de pared.',
				'En Nice, Erreka o BFT el nombre cambia según el modelo. Lo dice el manual. Si el manual solo describe un mando de radio, no abras la tapa para inventar un borne.',
				'Localiza también las fotocélulas y el ajuste de fuerza. Se quedan donde están. El relé no las sustituye.',
			],
			observe: 'Puedes nombrar los dos bornes del pulsador y sabes si existen.',
			check: 'Con el hueco libre, una pulsación en el pulsador de pared arranca la puerta y una segunda durante el recorrido la para. Eso es exactamente lo que deberá hacer el pulso.',
		},
		{
			title: 'Corta el circuito y solo entonces abre la tapa',
			why: 'El pulsador de pared suele ser un contacto seco, pero dentro de la tapa del motor están los 230 V del motor y de la lámpara.',
			where: 'El cuadro, luego la tapa. La conexión fija de la alimentación del módulo se hace sin tensión, por un instalador autorizado, según el REBT.',
			actions: [
				'Identifica el interruptor del motor. Si no está rotulado, no adivines: el circuito equivocado deja los 230 V dentro de la caja.',
				'Corta ese interruptor. La lámpara y el pulsador de pared ya no deben responder.',
				'Fotografía la regleta antes de mover un cable. Encuentra el par descrito en el manual. No desconectes los cables de potencia del motor ni la tierra.',
				'Si no puedes comprobar que los bornes de red están sin tensión, limítate a mirar y a fotografiar. L y N del módulo los conecta quien sabe hacerlo.',
			],
			observe: 'La foto muestra dos bornes de pulsador, distintos de los de alimentación del motor.',
			check: 'El pulsador de pared sigue conectado a esos dos bornes. No has quitado ningún cable de fotocélula ni de motor.',
		},
		{
			title: 'Entiende los cinco bornes del Shelly antes de apretarlos',
			why: 'El Shelly 1 Mini Gen3 tiene un contacto seco, pero su propia alimentación es de 110–240 V. Mezclar las dos cosas manda la red a la placa del motor.',
			where: 'El módulo, sobre la mesa, con la página de Shelly abierta. Fuente: shelly.com, Shelly 1 Mini Gen3.',
			actions: [
				'L y N alimentan el módulo, 110–240 V en alterna. El Mini Gen3 no se alimenta a 12 V: no lo conectes a una salida auxiliar de 12 o 24 V de la placa del motor.',
				'I y O son el contacto seco normalmente abierto. Son los únicos dos hilos que irán a los bornes del pulsador, en paralelo con el pulsador que ya está. Cuando el relé cierra, I y O se tocan, como un dedo en el pulsador. No entregan la red del Shelly.',
				'SW es una entrada para un interruptor del circuito de alimentación del Shelly. El pulsador de la puerta no se conecta ahí.',
				'La página de Shelly indica un relé de contacto seco, 8 A como máximo, una temperatura ambiente de −20 °C a 40 °C y una humedad del 30 al 70 %. Un techo de garaje que supere los 40 °C en verano sale de esa ficha: coloca el módulo más abajo, en una caja, no pegado al tejado.',
			],
			observe: 'Puedes señalar L, N, I, O y SW sin dudar.',
			check: 'Ningún hilo del pulsador de pared está previsto en L, N o SW.',
		},
		{
			title: 'Conecta I y O, y alimenta el módulo aparte',
			why: 'El pulsador de pared tiene que seguir funcionando. El Shelly se añade al lado. No lo sustituye.',
			where: 'Sin tensión: los dos bornes del pulsador, luego L y N del Shelly en su alimentación de 230 V.',
			actions: [
				'Dos conductores salen de I y de O hacia los dos bornes del pulsador. El sentido no importa: es un contacto, no una alimentación. Deja los hilos del pulsador de pared en su sitio, en paralelo.',
				'No lleves ni la fase ni el neutro del Shelly a esos bornes. No uses la salida como si conmutara el motor.',
				'L y N del Shelly se conectan a una alimentación de 110–240 V propia: el circuito del motor u otro circuito ya protegido. Esa conexión fija es trabajo eléctrico. Si no es ya tu oficio, haz que la haga un instalador. El módulo va en una caja, no con hilos desnudos bajo la tapa.',
				'Aprieta al par que indica Shelly, 0,4 N·m, sin aplastar los hilos. Cierra la tapa antes de volver a conectar el interruptor.',
			],
			observe: 'La tapa está cerrada, el interruptor está otra vez conectado y nada huele a caliente.',
			check: 'El pulsador de pared sigue arrancando y parando la puerta, con el hueco libre, antes de cualquier prueba desde el móvil. Si el pulsador ha muerto, el Shelly está en paralelo sobre el par equivocado: corta la corriente y vuelve a la foto.',
		},
		{
			title: 'Ajusta un pulso corto y prueba una vez',
			why: 'Sin temporizador, el relé puede quedarse cerrado. El motor ve entonces un dedo que no suelta el pulsador.',
			where: 'El Wi-Fi de 2,4 GHz de casa, la interfaz del Shelly (el navegador en su dirección IP, o la aplicación Shelly Smart Control), hueco libre.',
			actions: [
				'El Shelly 1 Mini Gen3 solo habla en 2,4 GHz. Una red solo de 5 GHz no lo verá. En el garaje, la página del módulo debe abrirse sin espera. Si no, acerca un punto de acceso antes de cerrar la caja de forma definitiva.',
				'En la salida, activa el apagado automático. Empieza en 0,5 s, como una pulsación breve. El texto exacto depende del firmware: es el temporizador de la salida, no una escena.',
				'Reserva la dirección del Shelly en el router (concesión DHCP fija), para que Home Assistant lo encuentre después de un corte.',
				'Un solo pulso, nadie bajo la puerta. La puerta debe moverse como con el pulsador de pared. Si no se mueve nada, prueba 1 s. Si arranca y se para enseguida, el pulso es demasiado largo: la placa lo cuenta como dos pulsaciones. Vuelve hacia 0,5 s.',
				'La nube de Shelly puede quedarse apagada si no quieres que la orden salga de casa. La integración de Home Assistant habla con el módulo en la red local.',
			],
			observe: 'El relé hace un clic breve, la puerta arranca y una segunda prueba durante el recorrido la para.',
			check: 'Apaga el Wi-Fi del móvil: el pulsador de pared sigue funcionando. El Shelly no ha ocupado el lugar del mando original.',
		},
		{
			title: 'Añade el Shelly a Home Assistant, sin mandarlo desde el sensor',
			why: 'Home Assistant necesita un interruptor que dé el pulso. No debe arrancar el motor cada vez que cambia el estado de la puerta.',
			where: 'Home Assistant, mejor desde un ordenador: Ajustes, Dispositivos y servicios.',
			actions: [
				'Añade la integración Shelly. Un módulo Gen3 se descubre en la red local. Si no aparece, indica la dirección IP reservada en el paso anterior. Documentación: home-assistant.io/integrations/shelly.',
				'Abre Herramientas para desarrolladores, Estados, y anota el identificador del interruptor, del tipo switch.algo. Eso todavía no es una puerta.',
				'Crea el script de pulso en Ajustes, Automatizaciones y escenas, Scripts. Enciende el interruptor, espera 0,5 s y lo apaga. El modo single ignora una segunda llamada mientras la primera no ha terminado. El ejemplo YAML de más abajo no se ha cargado en una instalación del sitio: si el editor lo rechaza, vuelve a crear las tres acciones en el editor visual.',
				'El apagado automático del Shelly se queda. Suelta el contacto aunque Home Assistant se interrumpa a mitad del script.',
			],
			observe: 'Lanzar el script una vez, con el hueco libre, hace el mismo movimiento que una pulsación en el pulsador de pared.',
			check: 'En el registro de Home Assistant, el script no arranca solo cuando abres la puerta a mano o con el mando.',
		},
		{
			title: 'Mide la holgura y luego coloca el sensor de estado',
			why: 'Sin sensor, el móvil sabe que ha enviado un pulso. No sabe si la puerta está abierta. El SONOFF SNZB-04P solo sirve si la holgura con la puerta cerrada es de 20 mm como máximo.',
			where: 'Puerta cerrada, una regla y después Home Assistant si la medida vale.',
			actions: [
				'Con la puerta completamente cerrada, busca dos superficies que se miren a 20 mm o menos: a menudo la parte alta de la hoja y el marco, o el carro y un tope. Si la holgura es mayor, no compres este sensor para esta puerta. Un contacto de ventana pegado « más o menos » se quedará visto como abierto.',
				'La página de Sonoff del SNZB-04P limita el aparato al interior, de −10 °C a 60 °C, sin lluvia ni sol directo. Un garaje cerrado y a salvo de heladas puede entrar en ese margen. Un toldo expuesto, no.',
				'Si todavía no hay un coordinador Zigbee, el dongle de la nota de compra es para eso. Si ya hay uno (ZHA o Zigbee2MQTT), no conectes un segundo. Sonoff cita el ZBDongle-E entre las pasarelas compatibles con este sensor.',
				'En la integración Zigbee que ya usas para los demás aparatos, permite el emparejamiento y mantén pulsado el botón del sensor hasta el parpadeo descrito en su manual (pulsación larga de unos 5 s). Alinea las marcas del cuerpo y del imán.',
				'El Aqara Door and Window Sensor P2 no es un sustituto Zigbee: es un aparato Thread con Matter. Necesita un router de borde Thread, y su manual lo reserva al interior. No se empareja con un dongle Zigbee.',
			],
			observe: 'En Herramientas para desarrolladores, el estado del sensor cambia cuando separas el imán y vuelve cuando la puerta está cerrada.',
			check: 'Anota si « on » significa abierta. En un binary_sensor de clase puerta es el caso más habitual. Si en tu caso está invertido, invierte las condiciones de la plantilla. No cambies el cableado del Shelly.',
		},
		{
			title: 'Muestra una puerta, con una petición de confirmación',
			why: 'Un interruptor en el bolsillo abre el garaje sin querer. La confirmación y el estado real limitan eso. No sustituyen a las fotocélulas.',
			where: 'El panel de Home Assistant y luego el móvil en la misma red.',
			actions: [
				'Añade la plantilla de puerta solo después de copiar los identificadores reales. El ejemplo de abajo supone que el sensor está en « off » con la puerta cerrada y en « on » con la puerta abierta. No se ha cargado en una instalación del sitio.',
				'Abrir envía el pulso solo si el sensor dice cerrada. Cerrar lo envía solo en el caso contrario. Si el sensor no está disponible, la puerta de Home Assistant no debe aceptar la orden.',
				'En una entrada de un solo pulsador, « no cerrada » mezcla tres casos: puerta abierta y parada, puerta subiendo y puerta bajando. Un pulso durante el recorrido detiene el movimiento. Hace falta una segunda orden para volver a arrancar. El sensor magnético no distingue esos tres casos.',
				'En el panel, una tarjeta de botón con confirmación. El texto pregunta si de verdad quieres accionar la puerta. Acciones de tarjeta: home-assistant.io/dashboards/actions.',
				'Desde fuera de casa, usa un acceso remoto en el que ya confíes: Nabu Casa, WireGuard o Tailscale. No redirijas el puerto 8123 en el router. La página oficial es home-assistant.io/docs/configuration/remote.',
			],
			observe: 'El móvil muestra cerrada cuando la puerta lo está, y pide confirmación antes de enviar el pulso.',
			check: 'Una pulsación cancelada en la confirmación no mueve la puerta. Una orden enviada con la pila del sensor quitada no debe disparar nada.',
		},
		{
			title: 'Avisa si la puerta se queda abierta, sin cerrarla sola',
			why: 'Un cierre automático puede atrapar a una persona, un animal o un objeto. Las fotocélulas reducen ese riesgo. No lo anulan, sobre todo si están sucias o desalineadas.',
			where: 'Ajustes, Automatizaciones y escenas. El disparador es el sensor, no solo la hora.',
			actions: [
				'Crea una automatización: si el sensor sigue « abierto » durante 15 minutos, envía un aviso al móvil. Ninguna acción de interruptor, script o cover.',
				'No añadas un cierre a las 22 h, al salir de casa ni « si todo el mundo se ha ido ». Esas escenas existen para otros aparatos de la casa. Aquí se rechazan.',
				'Quince minutos son un ejemplo. Alarga el tiempo si sueles trabajar con la puerta abierta. El YAML de más abajo no se ha ejecutado aquí.',
			],
			observe: 'Si mantienes el imán separado el tiempo elegido, el móvil recibe el mensaje y la puerta no se mueve.',
			check: 'El historial del interruptor Shelly no muestra un encendido en el momento del aviso.',
		},
	],
	faq: [
		{
			question: '¿Se pueden conmutar los 230 V del motor con el Shelly para abrir el garaje?',
			answer:
				'No. El motor, los finales de carrera y la detección de obstáculo siguen siendo del automatismo. El Shelly 1 Mini Gen3 solo cierra un instante su contacto seco, bornes I y O, en paralelo con el pulsador. Su propia alimentación, L y N, es otro circuito, de 110–240 V, y no va a los bornes del pulsador.',
		},
		{
			question: '¿Hace falta un coordinador Zigbee para abrir la puerta?',
			answer:
				'No para la orden. El Shelly 1 Mini Gen3 va por Wi-Fi. El Zigbee solo sirve al sensor de estado SNZB-04P. Si ZHA o Zigbee2MQTT ya funcionan, no compres el dongle de la nota. Sin ese sensor, el móvil todavía puede enviar el pulso, pero no sabe si la puerta está abierta.',
		},
		{
			question: '¿El Aqara P2 vale con un dongle Zigbee?',
			answer:
				'No. El Aqara Door and Window Sensor P2 habla Thread y Matter. Aqara pide un router de borde Thread, y su manual lo destina al interior. No se empareja con el SONOFF ZBDongle-E. El sensor elegido aquí para el caso Zigbee es el SONOFF SNZB-04P, y solo si la holgura con la puerta cerrada es de 20 mm como máximo.',
		},
		{
			question: '¿Qué hacer si el manual no tiene bornes de pulsador?',
			answer:
				'No apoyes el relé al azar en la placa. Algunos motores solo se mandan con su mando, o con una interfaz que vende el fabricante. Este cableado entonces no se aplica. Los pasos suponen que el manual describe ese par de bornes.',
		},
		{
			question: '¿La puerta puede cerrarse sola por la noche?',
			answer:
				'Esta guía no lo hace. Un pulso enviado sin nadie delante de la puerta puede parar el recorrido en el momento equivocado, o cerrar sobre un obstáculo que las fotocélulas no ven. La automatización útil es un aviso si el sensor sigue abierto. El cierre sigue siendo un gesto confirmado, en el sitio o con la puerta a la vista.',
		},
		{
			question: '¿Dos puertas, o una puerta y una cancela?',
			answer:
				'Cada motor tiene su propio relé y, si la holgura lo permite, su propio sensor. Home Assistant sigue siendo uno, y el coordinador Zigbee también. Una cancela batiente o corredera es otro motor: la misma idea solo vale si su manual también muestra un par de pulsador. Las fotocélulas de una cancela a la calle importan todavía más.',
		},
		{
			question: '¿Funciona sin Internet?',
			answer:
				'Sí, en casa, si el router, el Wi-Fi de 2,4 GHz, Home Assistant y el Shelly están encendidos y si la integración Shelly es local. Un corte de Internet bloquea el aviso fuera de casa y el acceso remoto. No bloquea el pulsador de pared. La nube de Shelly no hace falta para esta integración local.',
		},
	],
	blocks: [
		p(
			'La puerta del garaje ya se abre con un pulsador de pared y un mando. El móvil hace el mismo gesto y, sobre todo, dice si la hoja se ha quedado arriba. El módulo no sustituye al motor: une dos bornes que ya están previstos para el pulsador, el tiempo de una pulsación. El motor, las fotocélulas y la parada por obstáculo siguen siendo los de origen.',
		),
		p(
			'Texto revisado el 29 de octubre de 2026. Los bornes del Shelly 1 Mini Gen3 y los límites del SONOFF SNZB-04P vienen de las fichas de fabricante citadas al final. Los ejemplos YAML de Home Assistant no se han cargado en una instalación del sitio. El cableado de tu placa es el de su manual.',
		),
		h2('para-que', 'Para qué', 'Para qué mandar la puerta desde el móvil'),
		p(
			'El mando se queda en el coche, o en un bolsillo difícil de alcanzar delante de la puerta. El móvil ya está en la mano. Permite abrir a quien llega y comprobar una hora después que la puerta no se ha quedado abierta de par en par. Home Assistant guarda el historial de ese estado. La aplicación del módulo, sola, sobre todo sabe que ha enviado un pulso.',
		),
		p(
			'Solo es útil si el motor ya tiene una entrada para un pulsador. La guía no convierte una puerta manual en una puerta motorizada, y no puentea una placa que solo tiene bornes de potencia.',
		),
		h2('resultado', 'Resultado', 'Qué vas a obtener'),
		p(
			'Un motor de techo, igual en su papel: tira de la hoja, se para en sus finales de carrera y sus fotocélulas vigilan el paso. El cordón rojo que se ve a menudo bajo el raíl es el desbloqueo manual. No se conecta al módulo.',
		),
		{
			type: 'photo',
			src: MOTOR_PHOTO,
			width: 1600,
			height: 1200,
			alt: 'Motor de puerta de garaje fijado al techo, con su raíl, su lámpara y el cordón rojo de desbloqueo.',
			caption: [
				'Motor de techo. El módulo se conecta a los bornes del pulsador descritos en el manual, no a los cables del motor. En esta serie LiftMaster Security+ 2.0 ese par sencillo no siempre está. Foto: ',
				link('Tony Webster', MOTOR_CREDIT),
				', ',
				link('CC BY 2.0', CC_BY),
				'.',
			],
		},
		p(
			'Después del trabajo, el pulsador de pared y el mando funcionan como antes. El móvil pide confirmación y luego envía el mismo pulso. Si el sensor está puesto, la pantalla muestra abierta o cerrada. Sale un aviso si la puerta se queda abierta. Ninguna automatización de esta guía la cierra sola.',
		),
		h2('antes', 'Antes', 'Antes de empezar'),
		{
			type: 'table',
			headers: ['Punto', 'Qué hay que saber'],
			rows: [
				['Objetivo', 'Enviar el pulso del pulsador desde el móvil y saber si la puerta está cerrada.'],
				[
					'Dificultad',
					'Intermedia. Hay que leer un manual de motor y distinguir contacto seco y 230 V. La conexión fija de la alimentación del módulo es trabajo eléctrico.',
				],
				[
					'Tiempo',
					'Cuenta medio día si el manual es claro y Home Assistant ya responde. No es una duración cronometrada en una obra.',
				],
				[
					'Presupuesto',
					'Estimación de catálogo: unos 8–62 € según el perfil (solo módulo, o con sensor de apertura y dongle Zigbee si hace falta). El configurador detalla la lista.',
				],
				[
					'Software',
					'Home Assistant y su integración Shelly para el caso que sigue esta página. La aplicación Shelly Smart Control si te quedas sin servidor. ESPHome para la variante de placa desnuda, en otra guía.',
				],
				[
					'Requisitos',
					'Una puerta ya motorizada, un pulsador de pared que la mueve, Wi-Fi de 2,4 GHz en el garaje y el manual. Para el caso de esta página: Home Assistant ya accesible en la red local.',
				],
				[
					'Riesgos',
					'230 V bajo la tapa. Atrapamiento si una orden sale con el hueco sin vigilar. No puentes nunca las fotocélulas. No abras el puerto 8123 a Internet. No cierres la puerta con una automatización horaria.',
				],
			],
		},
		h2('tres-casos', 'Tres casos', 'Tres maneras de llegar al mismo pulso'),
		p(
			'El gesto es el mismo: un contacto que se cierra un instante en la entrada del pulsador. Lo que cambia es lo que ya tienes. Los pasos de más abajo siguen el primer caso: Home Assistant ya funciona, una puerta, bornes de pulsador en el manual.',
		),
		{
			type: 'sit',
			current: true,
			title: 'Caso A — Home Assistant ya funciona',
			parts: [
				'No compras un segundo servidor. El Shelly 1 Mini Gen3 envía el pulso por Wi-Fi. El sensor SONOFF SNZB-04P es Zigbee: dice si la puerta está abierta. El dongle es solo para quien todavía no tiene coordinador. « Contacto seco » significa que el manual muestra los bornes del pulsador. El mismo cableado tiene una regla más: esa entrada no admite red.',
			],
		},
		{
			type: 'sit',
			title: 'Caso B — Flasheas una placa ESP32',
			parts: [
				'Una ESP32, un módulo de relé cuyo contacto seco se manda a 3,3 V y un reed cableado sustituyen al Shelly. Los 230 V del motor tampoco van a ese relé. Los pasos de esta página describen el Shelly. El flasheo, los pines GPIO y el YAML probado con ESPHome están en el ',
				link('tutorial de puerta de garaje con ESPHome', esp),
				'. Home Assistant no es una compra más en esa lista: sin él, la placa no tiene la pantalla descrita más adelante.',
			],
		},
		{
			type: 'sit',
			title: 'Caso C — Basta la aplicación Shelly',
			parts: [
				'Sin Home Assistant. La aplicación envía el pulso, siempre que hayas ajustado el apagado automático de la salida. Este caso no lleva sensor de estado: la aplicación no demuestra que la hoja se haya movido. El pulsador de pared sigue siendo la forma de comprobarlo in situ.',
			],
		},
		h3('Qué cambia el número de puertas'),
		{
			type: 'table',
			headers: ['Elección', 'Efecto'],
			rows: [
				['Una puerta', 'Un relé. Un sensor de estado en el caso A, después de medir la holgura.'],
				['Varias puertas', 'Un relé por motor y un sensor por puerta. El coordinador y Home Assistant siguen siendo únicos.'],
				['El manual muestra el par del pulsador', 'Es el caso de los pasos.'],
				['La entrada es solo de contacto seco', 'El mismo cableado. L y N del módulo no van ahí.'],
			],
		},
		{
			type: 'config',
			noscript: 'Sin JavaScript, los botones no actualizan la lista de material. Los tres casos de arriba siguen valiendo.',
		},
		p(
			'La página de producto del Shelly 1 Mini Gen3 es la oficial. Los precios de catálogo aparecen en el configurador; los enlaces de Amazon son búsquedas por nombre y no garantizan el modelo exacto ni el stock. Mide la holgura de la puerta antes de pedir el SNZB-04P. La búsqueda del ZBDongle-E es solo para una casa que todavía no tiene coordinador Zigbee.',
		),
		p(
			link('Shelly 1 Mini Gen3, página oficial', SHELLY_PRODUCT),
			' · ',
			link('Buscar en Amazon.es', marketSearch('es', 'Shelly 1 Mini Gen3'), true),
			'. Sensor: ',
			link('SONOFF SNZB-04P en Amazon.es', marketSearch('es', 'SONOFF SNZB-04P'), true),
			'. Coordinador solo si falta: ',
			link('SONOFF ZBDongle-E en Amazon.es', marketSearch('es', 'SONOFF ZBDongle-E'), true),
			'.',
		),
		h2('recorrido', 'Recorrido', 'Cómo llega la orden a la puerta'),
		p(
			'Quédate con una frase: el móvil pide, Home Assistant llama al Shelly y el Shelly imita el pulsador. Las fotocélulas y la placa del motor siguen decidiendo si la hoja puede moverse. El sensor Zigbee solo devuelve un estado. No está en el circuito del pulsador.',
		),
		{
			type: 'schema',
			caption: 'Solo el principio. En verde, la orden y el estado. En naranja, la alimentación del módulo, que no va al pulsador.',
			title: 'Mando de una puerta de garaje por contacto seco',
			desc: 'El móvil llega a Home Assistant. Home Assistant manda al Shelly. Los bornes I y O del Shelly están en paralelo con el pulsador del motor. L y N alimentan solo al Shelly. El sensor Zigbee devuelve abierta o cerrada a Home Assistant y no manda el motor.',
			phoneTitle: '1. Móvil',
			phoneLine: 'Petición confirmada. No mueve el motor.',
			net: 'red local',
			haTitle: '2. Home Assistant',
			haLine: 'Ya está. Script de pulso.',
			wifi: 'Wi-Fi 2,4 GHz',
			shellyTitle: '3. Shelly 1 Mini Gen3',
			shellyA: 'I y O: contacto seco, pulso',
			shellyB: 'L y N: su alimentación, aparte',
			ioOnly: 'solo I y O',
			btnTitle: '4. Bornes del pulsador',
			btnA: 'En paralelo con el pulsador',
			btnB: 'Los nombres están en el manual',
			motorTitle: '5. Motor de origen',
			motorA: 'Motor, finales, fotocélulas',
			motorB: 'Mando sin cambios',
			powerTitle: 'Alimentación del módulo, aparte',
			powerLine: '6. 110–240 V solo en L y N',
			sensorTitle: '7. Sensor Zigbee',
			sensorA: 'Al coordinador y luego a HA',
			sensorB: 'Dice abierta o cerrada',
			sensorC: 'No manda el motor',
		},
		p(
			'El Wi-Fi solo lleva la orden hacia el Shelly, y la página de Home Assistant de vuelta al móvil. Los dos hilos I y O no llevan la red del módulo: reproducen el contacto del pulsador. El sensor, en trazos, vuelve por el coordinador Zigbee ya conectado al servidor, o por el que añades si no hay ninguno. Los demás aparatos Zigbee de la casa siguen en ese mismo coordinador.',
		),
		p(
			'Elige un coordinador solo si no tienes uno: ',
			link('qué dongle Zigbee', dongle),
			', y después ',
			link('ZHA o Zigbee2MQTT', zha),
			'. El Shelly no usa ese dongle.',
		),
		h2('material', 'Material', 'Qué material para el caso de esta página'),
		p(
			'El Shelly 1 Mini Gen3 es un módulo pequeño. Los bornes se siguen: I y O son el contacto seco, L y N alimentan el módulo, y SW no recibe el pulsador de la puerta.',
		),
		p(
			'El sensor de estado es un imán y un cuerpo. Las dos marcas tienen que mirarse. El manual de Sonoff pide 20 mm como máximo con la puerta cerrada, y un uso en interior. Si tienes que separar las dos piezas para pegarlas en esta puerta, no es el sensor adecuado.',
		),
		{
			type: 'table',
			headers: ['Necesidad', 'Elección de esta guía', 'Límite'],
			rows: [
				[
					'Dar el pulso',
					'Shelly 1 Mini Gen3, contacto seco, Wi-Fi 2,4 GHz',
					'Alimentación solo de 110–240 V. Ambiente de −20 °C a 40 °C, humedad del 30 al 70 % en la página de Shelly.',
				],
				[
					'Saber si está cerrada',
					'SONOFF SNZB-04P, Zigbee 3.0, pila CR2477',
					'Holgura de 20 mm. Interior. No tiene sentido comprar uno si la medida no vale.',
				],
				[
					'Unir el sensor',
					'El coordinador ya instalado; si no, un ZBDongle-E',
					'Un segundo dongle al lado del primero no mejora nada. Crea otra red.',
				],
				['Quedarte sin servidor', 'El mismo Shelly, en su aplicación', 'Sin estado fiable y sin historial de Home Assistant.'],
				[
					'Hacerlo todo en ESPHome',
					'ESP32, relé de 3,3 V de contacto seco, reed cableado',
					'El detalle está en el tutorial ESPHome, no en una segunda lista improvisada aquí.',
				],
			],
		},
		p(
			'El Shelly Plus 1 también tiene un contacto seco, y su ficha acepta además una alimentación de 12 V, que el Mini Gen3 rechaza. Estos pasos cablean el Mini Gen3, porque es el módulo de la lista. No mezcles las regletas de los dos modelos. Una alimentación de 12 V « tomada de la placa del motor » no se prueba sin el manual de esa placa.',
		),
		h2('pasos', 'Paso a paso', 'Conectar y probar, paso a paso'),
		p(
			'Los nueve pasos describen el caso A: Home Assistant ya está, una puerta, bornes de pulsador. Síguelos en orden. Si la observación esperada no llega, pasa a la resolución antes de seguir. La zona bajo la puerta se queda libre en cada prueba.',
		),
		{ type: 'steps' },
		h3('Fotocélulas: siguen mandando en el recorrido'),
		p(
			'El piloto al final de una fotocélula suele indicar que el haz pasa. Si está apagado, o si la puerta se niega a bajar, limpia las ópticas y vuelve a alinearlas. No puentes los cables para « terminar la prueba del Shelly ».',
		),
		{
			type: 'photo',
			src: CELL_PHOTO,
			width: 1600,
			height: 1100,
			alt: 'Fotocélula negra fijada en la jamba de una puerta de garaje, con el piloto rojo encendido.',
			caption: [
				'Fotocélula abajo en la jamba. Sigue conectada como estaba. Foto: ',
				link('Jud McCranie', CELL_CREDIT),
				', ',
				link('CC BY-SA 4.0', CC_BY_SA),
				'.',
			],
		},
		h3('Ejemplos de Home Assistant, para adaptar'),
		p(
			'Crea primero el script en el editor visual: enciende el interruptor del Shelly, espera medio segundo y apágalo. El YAML dice lo mismo. Sustituye ',
			{ code: 'switch.sustituir_shelly' },
			' por el identificador leído en Herramientas para desarrolladores. El modo ',
			{ code: 'single' },
			' ignora una segunda llamada hasta que la primera ha terminado.',
		),
		{ type: 'pre', code: PULSE },
		p(
			'La plantilla de puerta envía la orden de apertura solo si el sensor está en « off », y la de cierre solo si está en « on ». Adapta esas dos condiciones si tu sensor está invertido. ',
			{ code: 'script.impulso_puerta_garaje' },
			' tiene que ser el identificador real del script. Si tu versión rechaza este bloque, vuelve a crear la puerta en el editor en lugar de forzar el archivo. No se ha ejecutado en una instalación del sitio.',
		),
		{ type: 'pre', code: COVER },
		p(
			'Tarjeta del panel, con confirmación. La entidad ',
			{ code: 'cover' },
			' es la creada arriba, no el interruptor desnudo del Shelly.',
		),
		{ type: 'pre', code: CARD },
		p(
			'Aviso si el sensor sigue abierto. No hay ninguna acción sobre el Shelly. Sustituye ',
			{ code: 'notify.notify' },
			' por el servicio de notificación de tu móvil, visible en Herramientas para desarrolladores.',
		),
		{ type: 'pre', code: ALERT },
		p(
			'Documentación usada: ',
			link('integración Shelly', HA_SHELLY),
			', ',
			link('plantillas', HA_TEMPLATE),
			', ',
			link('acciones de tarjeta y confirmación', HA_ACTIONS),
			'.',
		),
		h2('comprobar', 'Comprobar', 'Comprobar que el conjunto aguanta'),
		{
			type: 'ul',
			items: [
				'El pulsador de pared abre, para y cierra, como antes del trabajo.',
				'El mando original también.',
				'Un obstáculo en el haz de las fotocélulas sigue impidiendo el cierre, o devuelve la puerta, como dice el manual.',
				'Un pulso del Shelly, con el hueco libre, hace lo mismo que una pulsación breve en el pulsador.',
				'El relé no se queda cerrado: se oye un clic corto, no un mantenimiento.',
				'El sensor, si está puesto, pasa a cerrada solo cuando la puerta está completamente cerrada.',
				'Cancelar la confirmación en el móvil no mueve la puerta.',
				'El aviso de « se ha quedado abierta » sale sin encender el interruptor del Shelly.',
				'Después de cortar el interruptor y volver a conectarlo, la puerta no arranca sola.',
				'El puerto 8123 no está redirigido a Internet.',
			],
		},
		h2('fallos', 'Fallos', 'Cuando no funciona'),
		h3('La puerta no se mueve y el relé hace clic'),
		p(
			'I y O no están en los bornes del pulsador, o el pulso es demasiado corto para esta placa. Corta el interruptor, vuelve a la foto y al manual, y no « pruebes » un borne de lámpara o de motor. Si el pulsador de pared sigue funcionando, el Shelly está simplemente junto al par de tornillos equivocado. Solo después, sube el temporizador hacia un segundo.',
		),
		h3('La puerta arranca y se para enseguida'),
		p(
			'El pulso dura demasiado. La placa lo lee como dos pulsaciones: arranque y luego parada. Vuelve el apagado automático hacia 0,5 s. El script de Home Assistant tampoco debe volver a llamar al Shelly enseguida.',
		),
		h3('El pulsador de pared ya no funciona'),
		p(
			'Los hilos del pulsador se han movido, o I y O están en cortocircuito permanente. Corta la corriente. En reposo, el relé debe dejar I y O abiertos. El pulsador de pared vuelve a sus dos bornes de origen, y el Shelly solo en paralelo.',
		),
		h3('El Shelly no aparece en la aplicación'),
		p(
			'Wi-Fi solo de 5 GHz, red de invitados, o un garaje demasiado lejos del punto de acceso. El módulo quiere 2,4 GHz, en la misma red que el móvil que lo configura. Abre la dirección IP del Shelly desde el garaje antes de atornillar la tapa. Una reserva DHCP evita que le den otra dirección después de un reinicio del router.',
		),
		h3('Home Assistant ve el Shelly, no la puerta'),
		p(
			'Es normal mientras no exista la plantilla de puerta. La integración Shelly expone un interruptor. La puerta en pantalla sale de la plantilla, que se apoya en el sensor. Si el sensor no está disponible, la plantilla debe rechazar las órdenes en lugar de enviar un pulso a ciegas.',
		),
		h3('El sensor sigue en « abierta » con la puerta cerrada'),
		p(
			'La holgura supera los 20 mm, las marcas no se miran, o el imán está en una parte de la hoja que se aleja en posición cerrada. Vuelve a medir. Mover el cuerpo unos centímetros suele bastar. Si no hay ningún sitio a 20 mm o menos, quita este sensor de la lista: no dará un estado útil, y no es un fallo del Shelly.',
		),
		h3('La puerta se mueve cuando cambia el sensor'),
		p(
			'Una automatización manda al Shelly o a la puerta ante un cambio de estado. Abre Ajustes, Automatizaciones, y busca un disparador de este sensor cuya acción no sea un simple aviso. Desactívala. El sensor informa. No pilota.',
		),
		h3('Nada responde después de un corte de corriente'),
		p(
			'Cuando vuelve la red, el relé debe quedarse abierto. El apagado automático y el script que apaga el interruptor van en ese sentido. Si la puerta arranca al reconectar, el contacto está mantenido: no lo reintentes en bucle, corta el interruptor y comprueba que I y O no están puenteados por un hilo olvidado.',
		),
		h2('mas', 'Más allá', 'Ir más allá, cuando la base funciona'),
		p(
			'Un segundo móvil se añade como usuario de Home Assistant, sin derechos de administrador, con la misma confirmación en la tarjeta. No es compartir la contraseña de la cuenta principal. El acceso fuera de casa pasa por ',
			link('el acceso remoto de Home Assistant', HA_REMOTE),
			': Nabu Casa, WireGuard o Tailscale, no por un puerto abierto.',
		),
		p(
			'La variante ESP32 retoma la misma idea de pulso y de reed, con pines que eliges en el YAML. El archivo ya publicado en el sitio fuerza el relé en reposo al arrancar, y solo abre si el reed dice que la puerta está cerrada. Está explicado en el ',
			link('tutorial ESPHome', esp),
			'. No copies sus números de pin al Shelly: el Shelly no tiene esos GPIO.',
		),
		p(
			'Una cancela batiente o corredera es un motor aparte, y solo si su manual también tiene un par de pulsador. Las fotocélulas de una cancela a la calle importan todavía más: una orden a distancia no las dispensa.',
		),
		h2('preguntas', 'Preguntas', 'Preguntas frecuentes'),
		{ type: 'faq' },
		h2('fuentes', 'Fuentes', 'Para seguir'),
		{
			type: 'sources',
			items: [
				{ href: SHELLY_PRODUCT, text: 'Ficha Shelly 1 Mini Gen3', note: ': contacto seco, alimentación 110–240 V, límites de ambiente' },
				{ href: SONOFF_SNZB, text: 'Manual SONOFF SNZB-04P', note: ': Zigbee 3.0, holgura de 20 mm, interior' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: ': Thread y Matter, no es un sensor Zigbee' },
				{ href: HA_SHELLY, text: 'Home Assistant, integración Shelly' },
				{ href: HA_TEMPLATE, text: 'Home Assistant, plantillas' },
				{ href: HA_REMOTE, text: 'Acceso remoto de Home Assistant' },
				{ href: esp, text: 'La misma puerta, con ESPHome' },
				{ href: dongle, text: 'Dongle Zigbee' },
				{ href: zha, text: 'ZHA o Zigbee2MQTT' },
			],
		},
	],
};
