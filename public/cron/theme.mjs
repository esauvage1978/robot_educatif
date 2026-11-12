/** Produits retenus pour robot-educatif.info : robots éducatifs, programmation, domotique, aspirateurs robots. */
const TERMES = [
  'mbot', 'arduino', 'microbit', 'micro-bit', 'scratch', 'esp32', 'esp8266', 'raspberry',
  'zigbee', 'home assistant', 'jeedom', 'homey', 'domotique', 'esphome', 'lorawan',
  'aspirateur', 'aspirapolvere', 'lavapavimenti', 'laveur', 'saugroboter', 'staubsauger', 'vacuum',
  'lidar', 'programmable', 'educatif', 'mindstorm', 'spike',
  'ozobot', 'sphero', 'thymi', 'capteur', 'sensor', 'senseur',
  'thermostat', 'volet', 'serrure connect', 'prise connect',
  'narwal', 'roomba',
];

export function concerneLeSite(nom) {
  const s = String(nom || '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  return TERMES.some((mot) => s.includes(mot.normalize('NFD').replace(/\p{M}/gu, '')));
}
