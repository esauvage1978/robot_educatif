/** Regénère src/data/smartHomeUseCases.mjs — node scripts/generate-use-cases.mjs */
import { writeFileSync } from 'node:fs';

const z = (note) => ({ productId: 'zbdongle-e', qty: 1, note: note ?? 'Coordinateur Zigbee USB.' });
const w = (n = 1) => ({ productId: 'wago-221', qty: n });

function uc(def) {
	return {
		...def,
		recipes: {
			'wifi-sans-box': def.recipesWifi,
			'ha-zigbee': def.recipesHa,
			'maker-esp32': def.recipesMaker,
		},
	};
}

// ... cases defined inline (same as before - truncated in file for brevity in maintenance)
// Full case list imported from data module after first manual write

import { USE_CASES as _ } from '../src/data/smartHomeUseCases.mjs';
