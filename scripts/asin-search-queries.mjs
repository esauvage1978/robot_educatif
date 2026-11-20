/** Requêtes de recherche Amazon US/CA pour remplacer les /dp/ servis (CONSIGNES PR41 v3). */
export const ASIN_SEARCH = {
	B009UKZV0A: 'Arduino Starter Kit K000007',
	B01A5YMCH4: 'Learning Resources Code Go Robot Mouse',
	B01B14XK00: 'Learning Resources Code Go Robot Mouse',
	B01CO1HZJ6: 'Raspberry Pi 3 power supply 5V micro USB',
	B01JD2Z5XW: 'ELEGOO UNO R3 Super Starter Kit',
	B07474MMB5: 'ELEGOO Smart Robot Car Kit V4',
	B07CGH8NZ7: 'Makeblock Codey Rocky',
	B07GVD6GQH: 'ELEGOO Penguin Bot',
	B07HH4SLZN: 'Philips Hue motion sensor',
	B07KG4JHBH: 'Makeblock mBot Ranger',
	B07XR98YYQ: 'Makeblock mBot',
	B07YD2LT9D: 'Freenove Raspberry Pi 4WD smart car',
	B078Y9RYM2: 'ELEGOO Smart Robot Car Kit V4',
	B083T58PKM: 'Learning Resources Botley 2.0',
	B083T5G5ZK: 'Learning Resources Botley 2.0',
	B08BTJFYT3: 'TTS Bee-Bot programmable floor robot',
	B08X6PTQFM: 'Freenove ESP32 4WD smart car kit',
	B0919F9CKS: 'Makeblock mBot2',
	B098T6527G: 'OSOYOO Sport Car Arduino kit',
	B09LYTM5BC: 'Matatalab Tale-Bot Pro',
	B0B6P22YJC: 'SONOFF ZBDongle-E Zigbee USB',
	B0BB949JCP: 'BBC micro:bit V2 Go kit',
	B0BBZY9L59: 'Makeblock CyberPi',
	B0BYZP8NK2: 'SONOFF SNZB-02D temperature humidity sensor',
	B0BZCV658S: 'SONOFF SNZB-02D sensor 2 pack',
	B0CDY2962D: 'Homey Pro smart home hub',
	B0CK2FCG1K: 'Raspberry Pi 5 8GB',
	B0CK3L9WD3: 'Raspberry Pi 5 4GB',
	B0CGLPF29H: 'SunFounder PiCar-X Raspberry Pi robot',
	B0CXVKSG19: 'Home Assistant Green',
	B0CZ6R182M: 'Matatalab Tale-Bot Pro coding robot',
	B0DT4FJJXM: 'Roborock Q7 M5 robot vacuum',
	B0G1ZKHX1W: 'Home Assistant Voice Preview Edition',
	B0G34ZTW51: 'Home Assistant Connect ZBT-2',
};

export function searchUrlForAsin(host, tag, asin) {
	const q = ASIN_SEARCH[asin];
	if (!q) return null;
	return `https://${host}/s?k=${encodeURIComponent(q)}&tag=${encodeURIComponent(tag)}`;
}