import { amazonSearchUrl } from '../../lib/amazonAffiliate.mjs';
import { domotiquePath } from '../../lib/domotiqueI18n.mjs';

export const SHELLY_PRODUCT = 'https://www.shelly.com/products/shelly-1-mini-gen3';
export const SONOFF_SNZB = 'https://help.sonoff.tech/docs/snzb-04p';
export const AQARA_P2 = 'https://www.aqara.com/en/product/door-and-window-sensor-p2/';
export const HA_SHELLY = 'https://www.home-assistant.io/integrations/shelly/';
export const HA_TEMPLATE = 'https://www.home-assistant.io/integrations/template/';
export const HA_ACTIONS = 'https://www.home-assistant.io/dashboards/actions/';
export const HA_REMOTE = 'https://www.home-assistant.io/docs/configuration/remote/';

export const MOTOR_PHOTO = '/images/domotique/porte-garage/motorisation-plafond-liftmaster.webp';
export const CELL_PHOTO = '/images/domotique/porte-garage/cellule-photoelectrique-porte-garage.webp';
export const MOTOR_CREDIT =
	'https://commons.wikimedia.org/wiki/File:LiftMaster_Security%2B_2.0_P3_Garage_Door_Motor_Opener.jpg';
export const CELL_CREDIT = 'https://commons.wikimedia.org/wiki/File:Electric_eye_for_garage_door_opener.jpg';
export const CC_BY = 'https://creativecommons.org/licenses/by/2.0/';
export const CC_BY_SA = 'https://creativecommons.org/licenses/by-sa/4.0/';

/** Recherche Amazon.com, identifiant partenaire US déjà utilisé sur les articles anglais du site. */
export function amazonComSearch(query) {
	return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=roboteducatif-20`;
}

export function marketSearch(lang, query) {
	return amazonSearchUrl(lang, query);
}

export function guidePath(lang, frSlug) {
	return domotiquePath(lang, frSlug);
}
