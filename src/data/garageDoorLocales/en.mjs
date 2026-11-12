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
	amazonComSearch,
	guidePath,
	marketSearch,
} from './links.mjs';

const p = (...parts) => ({ type: 'p', parts });
const h2 = (id, toc, text) => ({ type: 'h2', id, toc, text });
const h3 = (text) => ({ type: 'h3', text });
const link = (a, href, sponsored = false) => ({ a, href, sponsored });

const esp = guidePath('en', 'ouvrir-porte-garage-smartphone-esp32-esphome');
const dongle = guidePath('en', 'meilleur-dongle-zigbee-home-assistant');
const zha = guidePath('en', 'home-assistant-zigbee2mqtt-ou-zha');

const PULSE = `alias: Garage door pulse
mode: single
sequence:
  - action: switch.turn_on
    target:
      entity_id: switch.replace_shelly
  - delay:
      milliseconds: 500
  - action: switch.turn_off
    target:
      entity_id: switch.replace_shelly
`;

const COVER = `template:
  - cover:
      - name: Garage door
        unique_id: garage_door_dry_contact
        device_class: garage
        availability: "{{ not is_state('binary_sensor.replace_contact', 'unavailable') and not is_state('binary_sensor.replace_contact', 'unknown') }}"
        state: "{{ 'closed' if is_state('binary_sensor.replace_contact', 'off') else 'open' }}"
        open_cover:
          - condition: state
            entity_id: binary_sensor.replace_contact
            state: "off"
          - action: script.garage_door_pulse
        close_cover:
          - condition: state
            entity_id: binary_sensor.replace_contact
            state: "on"
          - action: script.garage_door_pulse
        stop_cover:
          - action: script.garage_door_pulse
`;

const CARD = `type: button
entity: cover.garage_door
name: Garage door
show_state: true
tap_action:
  action: toggle
  confirmation:
    text: "Operate the garage door?"
`;

const ALERT = `alias: Garage left open
description: Notification only. No command to the motor.
mode: single
triggers:
  - trigger: state
    entity_id: binary_sensor.replace_contact
    to: "on"
    for: "00:15:00"
actions:
  - action: notify.notify
    data:
      message: "The garage door has been open for 15 minutes."
`;

export const garageDoorEn = {
	lang: 'en',
	inLanguage: 'en',
	title: 'Open a powered garage door from your phone',
	description:
		'Dry contact on the wall button, open or closed state, and an alert if the door stays open. The opener mains are not switched.',
	howToDescription:
		'Find the wall-button terminals, wire a dry contact, set a short pulse, then show the state in Home Assistant without closing the door on a timer.',
	articleDescription:
		'The module copies the wall button with a dry contact. It does not switch the opener mains. A separate sensor reports whether the door is closed.',
	tocAria: 'Contents',
	stepWord: 'Step',
	whereWord: 'Where:',
	checkWord: 'Check:',
	steps: [
		{
			title: 'Read the manual before you open the housing',
			why: 'The phone only repeats the wall button. If the opener has no such input, the project stops there.',
			where: 'The paper manual or the manufacturer PDF, not the housing.',
			actions: [
				'Look for push button, dry contact, START, PP, SBC or “step by step”. The diagram then shows two terminals meant for the wall button.',
				'On a LiftMaster or Chamberlain Security+ 2.0, that simple pair is not always present. Hörmann, Cardale and many European operators do have a wall-button pair, under a name that changes with the model. If the manual only describes a radio remote, do not open the housing to invent a terminal.',
				'Also find the safety photocells and the force setting. They stay as they are. The relay does not replace them.',
			],
			observe: 'You can name the two button terminals, and you know whether they exist.',
			check: 'With the doorway clear, one press on the wall button starts the door, and a second press during travel stops it. That is exactly what the pulse must do.',
		},
		{
			title: 'Switch the circuit off, and only then open the cover',
			why: 'The wall button is usually a dry contact, but the opener housing contains the motor and lamp mains.',
			where: 'The consumer unit, then the cover. Fixed wiring of the module supply is done with the power off, by a qualified person: BS 7671 in the UK, and often Part P in a dwelling; the NEC or the local code in the United States and Canada.',
			actions: [
				'Identify the breaker that feeds the opener. If it is not labelled, do not guess: the wrong circuit leaves mains inside the housing.',
				'Switch that breaker off. The opener lamp and the wall button must no longer respond.',
				'Take a photo of the terminal block before you move a wire. Find the pair described in the manual. Do not disconnect the motor power wires or the earth.',
				'If you are not comfortable proving that the mains terminals are dead, stop at looking and photographing. Someone who is qualified connects L and N on the module.',
			],
			observe: 'The photo shows two button terminals, separate from the motor supply terminals.',
			check: 'The wall button is still wired to those two terminals. You have removed no photocell wire and no motor wire.',
		},
		{
			title: 'Learn the five Shelly terminals before you tighten them',
			why: 'The Shelly 1 Mini Gen3 has a dry contact, but its own supply is 110–240 V. Mixing the two puts mains onto the opener board.',
			where: 'The module, on a table, with the Shelly page open. Source used: shelly.com, Shelly 1 Mini Gen3.',
			actions: [
				'L and N power the module, 110–240 V AC. The Mini Gen3 does not run on 12 V: do not feed it from a 12 V or 24 V accessory output on the opener board.',
				'I and O are the normally open dry contact. They are the only two wires that go to the push-button terminals, in parallel with the button already there. When the relay closes, I and O touch, like a finger on the button. They do not deliver the Shelly’s mains.',
				'SW is an input for a switch on the Shelly’s own supply circuit. The opener button does not connect there.',
				'Shelly’s page rates the dry-contact relay at 8 A maximum, an ambient range of −20 °C to 40 °C, and humidity of 30 to 70 %. A garage ceiling that exceeds 40 °C in summer is outside that page: put the module lower, in a box, not against the roof.',
			],
			observe: 'You can point to L, N, I, O and SW without hesitating.',
			check: 'No wall-button wire is planned for L, N or SW.',
		},
		{
			title: 'Connect I and O, and power the module on its own',
			why: 'The wall button has to keep working. The Shelly is added beside it. It does not replace it.',
			where: 'Power off: the two button terminals, then L and N of the Shelly on its own 230 V supply.',
			actions: [
				'Two conductors run from I and from O to the two button terminals. Polarity does not matter: this is a contact, not a supply. Leave the wall-button wires in place, in parallel.',
				'Do not send the Shelly live or neutral onto those terminals. Do not use the output as if it switched the motor.',
				'L and N of the Shelly go to a 110–240 V supply of their own: the opener circuit or another circuit that is already protected. That fixed connection is electrical work. If it is not already your trade, have it done. The module sits in an enclosure, not as bare wires in the housing.',
				'Tighten to the torque Shelly states, 0.4 N·m, without crushing strands. Close the cover before you turn the breaker back on.',
			],
			observe: 'The cover is closed, the breaker is back on, and nothing smells hot.',
			check: 'The wall button still starts and stops the door, doorway clear, before any test from the phone. If the wall button is dead, the Shelly is paralleled onto the wrong pair: switch the power off and use the photo again.',
		},
		{
			title: 'Set a short pulse, then try once',
			why: 'Without a timer, the relay can stay closed. The opener then sees a finger that never leaves the button.',
			where: 'The home 2.4 GHz Wi-Fi, the Shelly interface (a browser on its IP address, or the Shelly Smart Control app), doorway clear.',
			actions: [
				'The Shelly 1 Mini Gen3 speaks 2.4 GHz only. A 5 GHz-only network will not see it. In the garage, the module page should open without a delay. If it does not, move an access point closer before you close the housing for good.',
				'On the output, turn on the auto-off timer. Start at 0.5 s, like a brief press. The exact label depends on the firmware: it is the output timer, not a scene.',
				'Reserve the Shelly address in the router (a fixed DHCP lease), so Home Assistant finds it again after a power cut.',
				'One pulse only, with nobody under the door. The door should move as it does with the wall button. If nothing moves, try 1 s. If it starts and stops at once, the pulse is too long: the board counts it as two presses. Go back toward 0.5 s.',
				'The Shelly cloud can stay off if you do not want the command to leave the house. The Home Assistant integration talks to the module on the local network.',
			],
			observe: 'The relay clicks briefly, the door starts, and a second try during travel stops it.',
			check: 'Turn the phone Wi-Fi off: the wall button still works. The Shelly has not taken the place of the original remote.',
		},
		{
			title: 'Add the Shelly to Home Assistant, without driving it from the sensor',
			why: 'Home Assistant needs a switch that sends the pulse. It must not start the motor every time the door state changes.',
			where: 'Home Assistant, preferably from a computer: Settings, Devices and services.',
			actions: [
				'Add the Shelly integration. A Gen3 module is discovered on the local network. If it does not appear, enter the IP address reserved in the previous step. Documentation: home-assistant.io/integrations/shelly.',
				'Open Developer tools, States, and note the switch id, of the form switch.something. That is not a door yet.',
				'Create the pulse script under Settings, Automations and scenes, Scripts. It turns the switch on, waits 0.5 s, then turns it off. Single mode ignores a second call while it is running. The YAML example further down was not loaded on an install for this site: if the editor rejects it, rebuild the three actions in the visual editor.',
				'The auto-off set in the Shelly stays in place. It releases the contact even if Home Assistant stops in the middle of the script.',
			],
			observe: 'Running the script once, doorway clear, makes the same movement as a press on the wall button.',
			check: 'In the Home Assistant log, the script does not start by itself when you open the door by hand or with the remote.',
		},
		{
			title: 'Measure the gap, then fit the state sensor',
			why: 'Without a sensor, the phone knows it sent a pulse. It does not know whether the door is open. The SONOFF SNZB-04P only fits if the closed gap is 20 mm or less.',
			where: 'The door closed, a ruler, then Home Assistant if the measurement passes.',
			actions: [
				'With the door fully closed, look for two faces 20 mm apart or less: often the top of the door and the frame, or the trolley and a stop. If the gap is larger, do not buy this sensor for this door. A window contact stuck on “roughly” will stay reported open.',
				'The Sonoff page for the SNZB-04P limits the device to indoors, −10 °C to 60 °C, with no rain and no direct sun. A closed garage that stays above freezing can fall in that range. An exposed canopy does not.',
				'If there is no Zigbee coordinator yet, the dongle in the shopping note is for that. If one is already running (ZHA or Zigbee2MQTT), do not plug in a second one. Sonoff lists the ZBDongle-E among the gateways compatible with this sensor.',
				'In the Zigbee integration you already use for the other devices, allow pairing, then hold the sensor button until the blink described in its manual (a long press of about 5 s). Line up the marks on the body and the magnet.',
				'The Aqara Door and Window Sensor P2 is not a Zigbee substitute: it is a Thread device with Matter. It needs a Thread border router, and its manual keeps it indoors. It does not pair with a Zigbee dongle.',
			],
			observe: 'In Developer tools, the sensor state changes when you pull the magnet away, and returns when the door is closed.',
			check: 'Note whether “on” means open. On a binary sensor with the door class, that is the usual case. If yours is inverted, you invert the cover conditions. You do not change the Shelly wiring.',
		},
		{
			title: 'Show a door, with a confirmation prompt',
			why: 'A switch in a pocket opens the garage by accident. Confirmation and a real state limit that. They do not replace the photocells.',
			where: 'The Home Assistant dashboard, then the phone on the same network.',
			actions: [
				'Add the cover template only after you have copied the real entity ids. The example below assumes the sensor is “off” when the door is closed and “on” when it is open. It was not loaded on an install for this site.',
				'Open sends the pulse only if the sensor says closed. Close sends it only if the sensor says the opposite. If the sensor is unavailable, the Home Assistant door must refuse the command.',
				'On a single-button input, “not closed” mixes three cases: door open and stopped, door travelling up, door travelling down. A pulse during travel stops the movement. A second command is then needed to start again. The magnetic sensor does not tell those three cases apart.',
				'On the dashboard, a button card with confirmation. The text asks whether you really mean to operate the door. Card actions: home-assistant.io/dashboards/actions.',
				'From outside the house, use remote access you already trust: Nabu Casa, WireGuard or Tailscale. Do not forward port 8123 on the router. The official note is home-assistant.io/docs/configuration/remote.',
			],
			observe: 'The phone shows closed when the door is closed, and asks for confirmation before it sends the pulse.',
			check: 'A tap you cancel in the confirmation does not move the door. A command sent while the sensor battery is removed must trigger nothing.',
		},
		{
			title: 'Warn if the door stays open, without closing it by itself',
			why: 'An automatic close can trap a person, an animal or an object. Photocells reduce that risk. They do not remove it, especially if they are dirty or out of line.',
			where: 'Settings, Automations and scenes. The trigger is the sensor, not the clock alone.',
			actions: [
				'Create an automation: if the sensor stays “open” for 15 minutes, send a notification to the phone. No switch, script or cover action.',
				'Do not add a close at 10 pm, when you leave, or “when everyone has left”. Those scenes exist for other devices in the house. They are refused here.',
				'Fifteen minutes is an example. Make it longer if you often work with the door open. The YAML further down was not run here.',
			],
			observe: 'If you hold the magnet away for the chosen time, the phone receives the message, and the door does not move.',
			check: 'The Shelly switch history shows no turn-on at the moment of the notification.',
		},
	],
	faq: [
		{
			question: 'Can the Shelly switch the opener mains to open the garage?',
			answer:
				'No. The motor, the travel limits and obstacle detection stay with the opener. The Shelly 1 Mini Gen3 only closes its dry contact briefly, terminals I and O, in parallel with the push button. Its own supply, L and N, is another circuit, 110–240 V, and does not go to the button terminals.',
		},
		{
			question: 'Do you need a Zigbee coordinator to open the door?',
			answer:
				'Not for the command. The Shelly 1 Mini Gen3 is Wi-Fi. Zigbee is only for the SNZB-04P state sensor. If ZHA or Zigbee2MQTT is already running, do not buy the dongle in the note. Without that sensor, the phone can still send the pulse, but it does not know whether the door is open.',
		},
		{
			question: 'Does the Aqara P2 work with a Zigbee dongle?',
			answer:
				'No. The Aqara Door and Window Sensor P2 speaks Thread and Matter. Aqara asks for a Thread border router, and its manual keeps it indoors. It does not pair with the SONOFF ZBDongle-E. The sensor chosen here for the Zigbee case is the SONOFF SNZB-04P, and only if the closed gap is 20 mm or less.',
		},
		{
			question: 'What if the manual has no wall-button terminals?',
			answer:
				'Do not land the relay at random on the board. Some openers are commanded only by their remote, or by an interface the manufacturer sells. This wiring does not apply then. The steps assume the manual describes that terminal pair.',
		},
		{
			question: 'Can the door close by itself in the evening?',
			answer:
				'This guide does not do that. A pulse sent with nobody at the door can stop the travel at the wrong moment, or close on an obstacle the photocells do not see. The useful automation is a notification if the sensor stays open. Closing stays a confirmed gesture, on site or with the door in sight.',
		},
		{
			question: 'Two doors, or a door and a gate?',
			answer:
				'Each opener has its own relay and, if the gap allows it, its own sensor. Home Assistant stays one, and so does the Zigbee coordinator. A swing or sliding gate is another motor: the same dry-contact idea applies only if its manual also shows a wall-button pair. Photocells on a street gate matter even more.',
		},
		{
			question: 'Does it work without the Internet?',
			answer:
				'Yes, on site, if the router, the 2.4 GHz Wi-Fi, Home Assistant and the Shelly are on, and if the Shelly integration is local. An Internet outage blocks the notification away from home and remote access. It does not block the wall button. The Shelly cloud is not required for this local integration.',
		},
	],
	blocks: [
		p(
			'The garage door already opens with a wall button and a remote. The phone makes the same gesture, and above all tells you whether the door was left up. The module does not replace the opener: it joins two terminals already meant for the button, for the length of a press. The motor, the photocells and obstacle detection stay the original ones.',
		),
		p(
			'Text reviewed on 29 October 2026. The Shelly 1 Mini Gen3 terminals and the SONOFF SNZB-04P limits come from the manufacturer pages cited at the bottom. The Home Assistant YAML examples were not loaded on an install for this site. The wiring of your opener board is the one in its manual.',
		),
		h2('why', 'Why', 'Why control the door from the phone'),
		p(
			'The remote stays in the car, or in a pocket that is hard to reach in front of the door. The phone is already in your hand. It lets you open for someone who is arriving, then check an hour later that the door did not stay wide open. Home Assistant keeps a history of that state. The module app, on its own, mostly knows that it sent a pulse.',
		),
		p(
			'This is useful only if the opener already has an input for a push button. The guide does not turn a manual door into a powered door, and it does not short a board that only has power terminals.',
		),
		h2('result', 'What you get', 'What you end up with'),
		p(
			'A ceiling opener, unchanged in its job: it pulls the door, it stops on its limits, and its photocells watch the opening. The red cord often seen under the rail is the manual release. It does not connect to the module.',
		),
		{
			type: 'photo',
			src: MOTOR_PHOTO,
			width: 1600,
			height: 1200,
			alt: 'Garage door opener fixed to the ceiling, with its rail, lamp and red manual-release cord.',
			caption: [
				'Ceiling opener. The module connects to the wall-button terminals described in the manual, not to the motor wires. On this LiftMaster Security+ 2.0 series, that simple terminal pair is not always present. Photo: ',
				link('Tony Webster', MOTOR_CREDIT),
				', ',
				link('CC BY 2.0', CC_BY),
				'.',
			],
		},
		p(
			'After the work, the wall button and the remote work as before. The phone asks for confirmation, then sends the same pulse. If the sensor is fitted, the screen shows open or closed. A notification goes out if the door stays open. No automation in this guide closes it by itself.',
		),
		h2('before', 'Before you start', 'Before you start'),
		{
			type: 'table',
			headers: ['Point', 'What to know'],
			rows: [
				['Goal', 'Send the push-button pulse from the phone, and know whether the door is closed.'],
				[
					'Difficulty',
					'Intermediate. You need to read an opener manual and tell a dry contact from mains. Fixed wiring of the module supply is electrical work.',
				],
				[
					'Time',
					'Allow half a day if the manual is clear and Home Assistant already answers. This is not a time measured on a job.',
				],
				[
					'Budget',
					'Catalogue estimate: about €8–62 depending on the profile (module only, or with opening sensor and Zigbee dongle if needed). The configurator details the list.',
				],
				[
					'Software',
					'Home Assistant and its Shelly integration for the case this page follows. The Shelly Smart Control app if you stay without a server. ESPHome for the bare-board variant, in another guide.',
				],
				[
					'You already need',
					'A door that is already powered, a wall button that moves it, 2.4 GHz Wi-Fi in the garage, and the manual. For the case this page follows: Home Assistant already reachable on the local network.',
				],
				[
					'Risks',
					'Mains in the housing. Crushing if a command is sent with the doorway unwatched. Never bridge the photocells. Do not open port 8123 to the Internet. Do not close the door from a time automation.',
				],
			],
		},
		h2('situations', 'Three ways', 'Three ways to the same pulse'),
		p(
			'The gesture is the same: a contact that closes for a short moment on the button input. What changes is what you already own. The steps further down follow the first case: Home Assistant is already running, one door, wall-button terminals in the manual.',
		),
		{
			type: 'sit',
			current: true,
			title: 'Case A — Home Assistant is already running',
			parts: [
				'You do not buy a second server. The Shelly 1 Mini Gen3 sends the pulse over Wi-Fi. The SONOFF SNZB-04P sensor is Zigbee: it says whether the door is open. The dongle is only for a home that does not already have a coordinator. “Dry contact” means the manual shows the wall-button terminals. The same wiring has one extra rule: that input accepts no mains.',
			],
		},
		{
			type: 'sit',
			title: 'Case B — You flash an ESP32 board',
			parts: [
				'An ESP32, a relay module whose dry contact is driven at 3.3 V, and a wired reed replace the Shelly. The motor mains do not land on that relay either. The steps on this page describe the Shelly. The flash, the GPIO pins and the YAML tried with ESPHome are in the ',
				link('ESPHome garage-door tutorial', esp),
				'. Home Assistant is not an extra purchase in that list: without it, the board does not have the screen described later.',
			],
		},
		{
			type: 'sit',
			title: 'Case C — The Shelly app is enough',
			parts: [
				'No Home Assistant. The app sends the pulse, provided you have set the output auto-off. This case has no state sensor: the app does not prove that the door moved. The wall button remains the way to check on site.',
			],
		},
		h3('What the number of doors changes'),
		{
			type: 'table',
			headers: ['Choice', 'Effect'],
			rows: [
				['One door', 'One relay. One state sensor in case A, after you measure the gap.'],
				['Several doors', 'One relay per opener, and one sensor per door. The coordinator and Home Assistant stay unique.'],
				['Manual shows the button pair', 'That is the case the steps follow.'],
				['The input is dry-contact only', 'Same wiring. L and N of the module do not go there.'],
			],
		},
		{
			type: 'config',
			noscript: 'Without JavaScript, the buttons do not refresh the parts list. The three cases above still apply.',
		},
		p(
			'The Shelly 1 Mini Gen3 product page is the official one. Catalogue prices appear in the configurator; Amazon links are name searches and do not guarantee the exact model or stock. Measure the door gap before you order the SNZB-04P. The ZBDongle-E search is only for a home with no Zigbee coordinator yet. English pages of this site point at Amazon.co.uk and Amazon.com; the language is not a country.',
		),
		p(
			link('Shelly 1 Mini Gen3, official page', SHELLY_PRODUCT),
			' · ',
			link('Search on Amazon.co.uk', marketSearch('en', 'Shelly 1 Mini Gen3'), true),
			' · ',
			link('Search on Amazon.com', amazonComSearch('Shelly 1 Mini Gen3'), true),
			'. Sensor: ',
			link('SONOFF SNZB-04P on Amazon.co.uk', marketSearch('en', 'SONOFF SNZB-04P'), true),
			' · ',
			link('on Amazon.com', amazonComSearch('SONOFF SNZB-04P'), true),
			'. Optional coordinator: ',
			link('SONOFF ZBDongle-E on Amazon.co.uk', marketSearch('en', 'SONOFF ZBDongle-E'), true),
			' · ',
			link('on Amazon.com', amazonComSearch('SONOFF ZBDongle-E'), true),
			'.',
		),
		h2('architecture', 'How the command travels', 'How the command reaches the door'),
		p(
			'Keep one sentence: the phone asks, Home Assistant calls the Shelly, the Shelly imitates the button. The photocells and the opener board still decide whether the door is allowed to move. The Zigbee sensor only reports a state. It is not in the button circuit.',
		),
		{
			type: 'schema',
			caption: 'Principle only. Green is the command and the state. Orange is the module supply, which does not go to the button.',
			title: 'Garage door command by dry contact',
			desc: 'The phone reaches Home Assistant. Home Assistant commands the Shelly. Shelly terminals I and O are in parallel with the opener push button. L and N power only the Shelly. The Zigbee sensor reports open or closed to Home Assistant and does not command the motor.',
			phoneTitle: '1. Phone',
			phoneLine: 'Confirmed. Does not drive the motor.',
			net: 'local network',
			haTitle: '2. Home Assistant',
			haLine: 'Already running. Pulse script.',
			wifi: 'Wi-Fi 2.4 GHz',
			shellyTitle: '3. Shelly 1 Mini Gen3',
			shellyA: 'I and O: dry contact, short pulse',
			shellyB: 'L and N: its supply, separate',
			ioOnly: 'I and O only',
			btnTitle: '4. Wall-button terminals',
			btnA: 'In parallel with the wall button',
			btnB: 'The names are in the manual',
			motorTitle: '5. Original opener',
			motorA: 'Motor, limits, photocells',
			motorB: 'Remote unchanged',
			powerTitle: 'Module supply, separate',
			powerLine: '6. 110–240 V on L and N only',
			sensorTitle: '7. Zigbee sensor',
			sensorA: 'Via the coordinator, then HA',
			sensorB: 'Reports open or closed',
			sensorC: 'Does not command the motor',
		},
		p(
			'Wi-Fi only carries the command to the Shelly, and the Home Assistant page back to the phone. The two wires I and O do not carry the module’s mains: they reproduce the button contact. The sensor, drawn dashed, comes back through the Zigbee coordinator already connected to the server, or through the one you add if there is none. The other Zigbee devices in the house stay on that same coordinator.',
		),
		p(
			'Choose a coordinator only if you do not have one: ',
			link('which Zigbee dongle', dongle),
			', then ',
			link('ZHA or Zigbee2MQTT', zha),
			'. The Shelly does not use that dongle.',
		),
		h2('hardware', 'What to buy', 'Hardware for the case this page follows'),
		p(
			'The Shelly 1 Mini Gen3 is a small module. The terminals run in order: I and O are the dry contact, L and N power the module, and SW does not receive the door button.',
		),
		p(
			'The state sensor is a magnet and a body. The two marks have to face each other. The Sonoff manual asks for 20 mm at most when the door is closed, and for indoor use. If you have to pull the two pieces apart to stick them on this door, it is the wrong sensor for it.',
		),
		{
			type: 'table',
			headers: ['Need', 'Choice in this guide', 'Limit'],
			rows: [
				[
					'Send the pulse',
					'Shelly 1 Mini Gen3, dry contact, 2.4 GHz Wi-Fi',
					'Supply 110–240 V only. Ambient −20 °C to 40 °C, humidity 30 to 70 % on the Shelly page.',
				],
				[
					'Know if it is closed',
					'SONOFF SNZB-04P, Zigbee 3.0, CR2477 cell',
					'20 mm gap. Indoors. No point buying one if the measurement fails.',
				],
				[
					'Join the sensor',
					'The coordinator already installed, otherwise a ZBDongle-E',
					'A second dongle beside the first does not help. It creates another network.',
				],
				['Stay without a server', 'The same Shelly, in its app', 'No reliable state, no Home Assistant history.'],
				[
					'Do it all in ESPHome',
					'ESP32, 3.3 V dry-contact relay, wired reed',
					'The detail is the ESPHome tutorial, not a second shopping list made up here.',
				],
			],
		},
		p(
			'The Shelly Plus 1 also has a dry contact, and its page also accepts a 12 V supply, which the Mini Gen3 refuses. These steps wire the Mini Gen3, because that is the module in the list. Do not mix the terminal layouts of the two models. A 12 V supply “taken from the opener board” is not something to try without that board’s manual.',
		),
		h2('steps', 'Step by step', 'Wire it and try it, step by step'),
		p(
			'The nine steps describe case A: Home Assistant already there, one door, button terminals. Do them in order. If the expected observation does not happen, go to troubleshooting before you continue. Keep the area under the door clear at every test.',
		),
		{ type: 'steps' },
		h3('Photocells: they still own the travel'),
		p(
			'The lamp at the end of a photocell usually means the beam is getting through. If it is off, or if the door refuses to come down, clean the lenses and line them up again. Do not bridge the wires to “finish the Shelly test”.',
		),
		{
			type: 'photo',
			src: CELL_PHOTO,
			width: 1600,
			height: 1100,
			alt: 'Black safety photocell fixed on a garage door jamb, with its red lamp lit.',
			caption: [
				'Photocell low on the jamb. It stays wired as it was. Photo: ',
				link('Jud McCranie', CELL_CREDIT),
				', ',
				link('CC BY-SA 4.0', CC_BY_SA),
				'.',
			],
		},
		h3('Home Assistant examples, to adapt'),
		p(
			'First create the script in the visual editor: turn the Shelly switch on, wait half a second, turn it off. The YAML says the same thing. Replace ',
			{ code: 'switch.replace_shelly' },
			' with the id you read in Developer tools. ',
			{ code: 'single' },
			' mode ignores a second call until the first one has finished.',
		),
		{ type: 'pre', code: PULSE },
		p(
			'The cover template sends an open command only if the sensor is “off”, and a close command only if it is “on”. Adapt those two conditions if your sensor is inverted. ',
			{ code: 'script.garage_door_pulse' },
			' must be the real id of the script. If your version rejects this block, rebuild the door in the editor rather than forcing the file. This was not run on an install for this site.',
		),
		{ type: 'pre', code: COVER },
		p(
			'Dashboard card, with confirmation. The ',
			{ code: 'cover' },
			' entity is the one created above, not the bare Shelly switch.',
		),
		{ type: 'pre', code: CARD },
		p(
			'Notification if the sensor stays open. There is no action on the Shelly. Replace ',
			{ code: 'notify.notify' },
			' with the notification service of your phone, visible in Developer tools.',
		),
		{ type: 'pre', code: ALERT },
		p(
			'Documentation used: ',
			link('Shelly integration', HA_SHELLY),
			', ',
			link('templates', HA_TEMPLATE),
			', ',
			link('card actions and confirmation', HA_ACTIONS),
			'.',
		),
		h2('check', 'Check', 'Check that the whole thing holds'),
		{
			type: 'ul',
			items: [
				'The wall button opens, stops and closes, as before the work.',
				'The original remote does too.',
				'An obstacle in the photocell beam still prevents closing, or sends the door back, as the manual describes.',
				'One Shelly pulse, doorway clear, does the same as a brief press on the button.',
				'The relay does not stay closed: you hear a short click, not a hold.',
				'The sensor, if it is fitted, goes to closed only when the door is fully closed.',
				'Cancelling the confirmation on the phone does not move the door.',
				'The “left open” notification goes out without turning the Shelly switch on.',
				'After the breaker is switched off and back on, the door does not start by itself.',
				'Port 8123 is not forwarded to the Internet.',
			],
		},
		h2('trouble', 'When it fails', 'When it does not work'),
		h3('The door does not move, the relay clicks'),
		p(
			'I and O are not on the button terminals, or the pulse is too short for this board. Switch the breaker off, use the photo and the manual again, and do not “try” a lamp terminal or a motor terminal. If the wall button still works, the Shelly is simply beside the wrong pair of screws. Only then, raise the timer toward one second.',
		),
		h3('The door starts and stops at once'),
		p(
			'The pulse lasts too long. The board reads it as two presses: start, then stop. Bring the auto-off back toward 0.5 s. The Home Assistant script must not call the Shelly again immediately either.',
		),
		h3('The wall button no longer works'),
		p(
			'The button wires were moved, or I and O are permanently shorted. Switch the breaker off. At rest, the relay must leave I and O open. The wall button goes back on its two original terminals, the Shelly only in parallel.',
		),
		h3('The Shelly does not appear in the app'),
		p(
			'5 GHz Wi-Fi only, a guest network, or a garage too far from the access point. The module wants 2.4 GHz, on the same network as the phone that sets it up. Open the Shelly IP address from the garage before you screw the cover back. A DHCP reservation stops another address being given to it after the router restarts.',
		),
		h3('Home Assistant sees the Shelly, not the door'),
		p(
			'That is normal until the cover template exists. The Shelly integration exposes a switch. The door on screen comes from the template, which relies on the sensor. If the sensor is unavailable, the template must refuse commands rather than send a pulse blind.',
		),
		h3('The sensor stays “open” with the door closed'),
		p(
			'The gap is over 20 mm, the marks do not face each other, or the magnet is on a part of the door that moves away when closed. Measure again. Moving the body a few centimetres is often enough. If there is no place at 20 mm or less, take this sensor off the list: it will not give a useful state, and that is not a Shelly fault.',
		),
		h3('The door moves when the sensor changes'),
		p(
			'An automation commands the Shelly or the door on a state change. Open Settings, Automations, and look for a trigger on this sensor whose action is not a plain notification. Turn it off. The sensor informs. It does not drive.',
		),
		h3('Nothing answers after a power cut'),
		p(
			'When mains returns, the relay must stay open. The auto-off and the script that turns the switch off both go that way. If the door starts when power returns, the contact is held: do not retry in a loop, switch the breaker off and check that I and O are not bridged by a forgotten wire.',
		),
		h2('further', 'Going further', 'Going further, once the base works'),
		p(
			'A second phone is added as a Home Assistant user, without administrator rights, with the same confirmation on the card. That is not a share of the main account password. Access away from home goes through ',
			link('Home Assistant remote access', HA_REMOTE),
			': Nabu Casa, WireGuard or Tailscale, not through an open port.',
		),
		p(
			'The ESP32 variant uses the same pulse and reed idea, with pins you choose in the YAML. The file already published on the site forces the relay off at startup, and opens only if the reed says the door is closed. It is explained in the ',
			link('ESPHome tutorial', esp),
			'. Do not copy its pin numbers onto the Shelly: the Shelly does not have those GPIOs.',
		),
		p(
			'A swing or sliding gate is a separate motor, and only if its manual also has a wall-button pair. Photocells on a gate that opens onto the street matter even more: a remote command does not excuse them.',
		),
		h2('questions', 'Questions', 'Common questions'),
		{ type: 'faq' },
		h2('sources', 'Sources', 'To go on'),
		{
			type: 'sources',
			items: [
				{ href: SHELLY_PRODUCT, text: 'Shelly 1 Mini Gen3 page', note: ': dry contact, 110–240 V supply, ambient limits' },
				{ href: SONOFF_SNZB, text: 'SONOFF SNZB-04P manual', note: ': Zigbee 3.0, 20 mm gap, indoors' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: ': Thread and Matter, not a Zigbee sensor' },
				{ href: HA_SHELLY, text: 'Home Assistant, Shelly integration' },
				{ href: HA_TEMPLATE, text: 'Home Assistant, templates' },
				{ href: HA_REMOTE, text: 'Home Assistant remote access' },
				{ href: esp, text: 'The same door, with ESPHome' },
				{ href: dongle, text: 'Zigbee dongle' },
				{ href: zha, text: 'ZHA or Zigbee2MQTT' },
			],
		},
	],
};
