/** Market-specific SEO and intro for ESP32 project ideas hub (native /uk/ /ca/ pages). */
export const ESP32_SMART_HOME_HUB_ANGLO = {
	us: {
		prefix: '/en/',
		htmlLang: 'en',
		title: '10 ESP32 smart-home projects with ESPHome and Home Assistant (US)',
		description:
			'DHT22, mmWave presence, relays and CO₂ sensors with ESP32 + ESPHome. US wiring (120 V), Amazon.com parts and difficulty levels.',
		updated: '17 November 2026',
		schemaLang: 'en',
		marketNote:
			'In the <strong>United States</strong>, a <strong>5 V USB phone charger</strong> powers most bench builds; Home Assistant on a Raspberry Pi 5 or mini PC sees ESPHome nodes on your LAN. Parts ship from <strong>Amazon.com</strong> in <strong>USD</strong> — a typical ESP32 DevKit is often <strong>$8–$12</strong>, a DHT22 about <strong>$5–$9</strong>. Follow <strong>NEC</strong> rules for any mains relay work.',
		piLinkLabel: 'Raspberry Pi 5 4GB (US)',
		piUrl: 'https://www.amazon.com/s?k=Raspberry%20Pi%205%20(4GB)&tag=roboteducatif-20',
		mainsVoltage: '120 V',
	},
	uk: {
		prefix: '/uk/',
		htmlLang: 'en-GB',
		title: '10 ESP32 smart-home projects with ESPHome and Home Assistant (UK)',
		description:
			'Ten ESP32 + ESPHome builds for UK homes: room sensors, mmWave, relays and e-paper. Amazon.co.uk prices in GBP, BS 7671 mains notes.',
		updated: '17 November 2026',
		schemaLang: 'en-GB',
		marketNote:
			'In the <strong>UK</strong>, power most prototypes from a <strong>5 V USB adaptor</strong> (BS 1363 plug). Buy boards and sensors on <strong>Amazon.co.uk</strong> — budget about <strong>£6–£10</strong> for a DevKit and <strong>£4–£8</strong> for a DHT22 (VAT included, November 2026 snapshots). Never wire <strong>230 V</strong> loads without an appropriately rated relay and, where required, a Part P competent installer.',
		piLinkLabel: 'Raspberry Pi 5 4GB (UK)',
		piUrl: 'https://www.amazon.co.uk/s?k=Raspberry%20Pi%205%20(4GB)&tag=roboteducatif-21',
		mainsVoltage: '230 V',
	},
	ca: {
		prefix: '/ca/',
		htmlLang: 'en-CA',
		title: '10 ESP32 smart-home projects with ESPHome and Home Assistant (Canada)',
		description:
			'ESP32 smart-home starter projects for Canadian makers: ESPHome, Home Assistant, Amazon.ca sourcing and provincial electrical cautions.',
		updated: '17 November 2026',
		schemaLang: 'en-CA',
		marketNote:
			'Across <strong>Canada</strong>, use a <strong>5 V USB adapter</strong> on your workbench and order parts from <strong>Amazon.ca</strong> (GST/HST/PST at checkout). Expect roughly <strong>CA$12–CA$18</strong> for an ESP32 DevKit and <strong>CA$8–CA$14</strong> for a DHT22 before tax. Mains work on <strong>120 V</strong> branch circuits must follow the <strong>CEC</strong> — prefer certified smart relays instead of bare modules in a wall box.',
		piLinkLabel: 'Raspberry Pi 5 4GB (Canada)',
		piUrl: 'https://www.amazon.ca/s?k=Raspberry%20Pi%205%20(4GB)&tag=roboteducat03-20',
		mainsVoltage: '120 V',
	},
};

export const ESP32_HUB_FAQ = [
	{
		question: 'Do ESP32 smart-home projects need coding?',
		answer:
			'With ESPHome and Home Assistant you write YAML configuration, not full firmware. Beginner projects (DHT22, button, LED) fit a one-hour session after you flash ESPHome once.',
	},
	{
		question: 'ESP32 or Zigbee sensors for beginners?',
		answer:
			'ESP32 + ESPHome suits wired USB-powered nodes and custom GPIO sensors. Zigbee wins on battery and mesh range when you already run a coordinator in Home Assistant.',
	},
	{
		question: 'Which ESP32 board should I buy first?',
		answer:
			'In 2026 an ESP32-C6 DevKit is a solid default (Wi-Fi 6, Matter-ready). Most tutorials still use a classic ESP32 DevKit — see our which-ESP32 board guide.',
	},
	{
		question: 'Can a Raspberry Pi 5 run Home Assistant for these projects?',
		answer:
			'Yes — many ESP32 nodes pair with HA on a Pi 5. Pick 4GB RAM for a comfortable stack; see our Pi 5 RAM guide and install tutorial.',
	},
];