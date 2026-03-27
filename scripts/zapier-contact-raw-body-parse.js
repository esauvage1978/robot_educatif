/**
 * À coller dans l’étape « Code by Zapier » (après le Catch Hook).
 *
 * Important : le déclencheur « Catch Hook » parse souvent le corps (formulaire ou JSON) et met
 * chaque champ directement dans `inputData` (name, email, etc.). Dans ce cas `raw_body` est vide
 * ou absent → d’où l’erreur « No data received » si on ne lit que `raw_body`.
 *
 * Ordre : 1) champs déjà présents dans inputData  2) chaîne brute (raw_body, body, …).
 */
function strField(obj, key) {
	const v = obj[key];
	if (v === undefined || v === null) return '';
	return String(v).trim();
}

const name0 = strField(inputData, 'name');
const email0 = strField(inputData, 'email');
const message0 = strField(inputData, 'message');

if (name0 || email0 || message0) {
	return {
		name: name0,
		company: strField(inputData, 'company'),
		email: email0,
		message: message0,
		submitted_at:
			strField(inputData, 'submitted_at') ||
			strField(inputData, 'privacy_policy_accepted_at'),
		source: strField(inputData, 'source'),
	};
}

const rawBody = String(
	inputData.raw_body ||
		inputData.body ||
		inputData.data ||
		inputData['Request body'] ||
		'',
).trim();

if (!rawBody) {
	const keys = Object.keys(inputData || {}).join(', ') || '(aucune clé)';
	throw new Error(
		'No data received in webhook payload. Clés reçues dans inputData : ' +
			keys +
			'. Vérifiez que l’étape précédente est bien le Catch Hook et refaites un test.',
	);
}

let name, company, email, message, submitted_at, source;

if (rawBody.startsWith('{')) {
	let formData;
	try {
		formData = JSON.parse(rawBody);
	} catch (error) {
		throw new Error('Failed to parse JSON: ' + error.message);
	}
	name = formData.name;
	company = formData.company;
	email = formData.email;
	message = formData.message;
	submitted_at = formData.submitted_at || formData.privacy_policy_accepted_at;
	source = formData.source || '';
} else {
	const params = new URLSearchParams(rawBody);
	name = params.get('name') || '';
	company = params.get('company') || '';
	email = params.get('email') || '';
	message = params.get('message') || '';
	submitted_at =
		params.get('submitted_at') || params.get('privacy_policy_accepted_at') || '';
	source = params.get('source') || '';
}

return { name, company, email, message, submitted_at, source };
