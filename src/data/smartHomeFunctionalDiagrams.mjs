/** Schémas fonctionnels (flux commande / retour d'état) — viewBox 780×240 avec attributs inline explicites */

import { USE_CASES } from './smartHomeUseCases.mjs';

const SVG_FONT = 'system-ui,-apple-system,Segoe UI,Roboto,sans-serif';
const VB_W = 780;
const VB_H = 240;

function escapeAttr(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;');
}

function block(x, stepNum, title, sub, w = 160) {
	const h = 76;
	const y = 72;
	const cx = x + w / 2;
	return `<g data-shuc-func-block="1">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#ffffff" stroke="#0f766e" stroke-width="2" class="shuc-svg-module"/>
  <rect x="${x}" y="${y}" width="${w}" height="28" rx="8" fill="#0f766e" class="shuc-svg-header"/>
  <rect x="${x}" y="${y + 20}" width="${w}" height="8" fill="#0f766e" class="shuc-svg-header"/>
  <text x="${cx}" y="${y + 19}" text-anchor="middle" font-family="${SVG_FONT}" font-size="11.5" font-weight="700" fill="#ffffff" class="shuc-svg-header-text">${stepNum}. ${title}</text>
  <text x="${cx}" y="${y + 52}" text-anchor="middle" font-family="${SVG_FONT}" font-size="10.5" font-weight="600" fill="#1e293b" class="shuc-svg-module-text">${sub}</text>
</g>`;
}

function arrow(x1, y1, x2, y2, label) {
	const mid = (x1 + x2) / 2;
	const pw = Math.max(46, label.length * 5.8 + 12);
	return `<g>
  <line x1="${x1}" y1="${y1}" x2="${x2 - 4}" y2="${y2}" stroke="#0f766e" stroke-width="2.5" marker-end="url(#shuc-arr)"/>
  <rect x="${mid - pw / 2}" y="${y1 - 24}" width="${pw}" height="16" rx="4" fill="#ecfdf5" stroke="#99f6e4" stroke-width="1"/>
  <text x="${mid}" y="${y1 - 13}" text-anchor="middle" font-family="${SVG_FONT}" font-size="9.5" font-weight="700" fill="#0f766e">${label}</text>
</g>`;
}

function returnLoop(fromX, toX, label) {
	const yTop = 148;
	const yBot = 192;
	const mid = (fromX + toX) / 2;
	const pw = Math.min(460, Math.max(180, label.length * 6.2 + 24));
	return `<g>
  <path d="M ${fromX} ${yTop} V ${yBot} H ${toX} V ${yTop + 6}" fill="none" stroke="#0d9488" stroke-width="2.2" stroke-dasharray="6 4" marker-end="url(#shuc-arr-teal)"/>
  <rect x="${mid - pw / 2}" y="${yBot - 11}" width="${pw}" height="22" rx="6" fill="#f0fdfa" stroke="#5eead4" stroke-width="1.5"/>
  <text x="${mid}" y="${yBot + 4}" text-anchor="middle" font-family="${SVG_FONT}" font-size="10.5" font-weight="700" fill="#0f766e">${label}</text>
</g>`;
}

/** @param {string} useCaseId */
function kindForUseCase(useCaseId) {
	if (useCaseId === 'boite-lettres-colis') return 'mailbox';
	const uc = USE_CASES.find((u) => u.id === useCaseId);
	if (uc) {
		switch (uc.category) {
			case 'acces-garage':
				return 'garage';
			case 'volets-rideaux':
				return 'cover';
			case 'eclairage':
				return 'lighting';
			case 'chauffage-vmc':
				return 'heating';
			case 'energie-conso':
				return 'plug';
			case 'securite-box':
				if (
					/portail|garage|portillon|serrure|clavier|interphone|colis|boite-a-colis|boite-lettres|sonnette|gache|verrouillage|parking|allee/.test(
						useCaseId,
					)
				)
					return 'garage';
				if (
					/box-home|secours|sauvegarde|acces-distance|tablette|alarme|etendre-portee|detection-presence-famille/.test(
						useCaseId,
					)
				)
					return 'infra';
				return 'sensor';
			default:
				break;
		}
	}
	if (useCaseId.includes('garage') || useCaseId.includes('portail') || useCaseId === 'chaudiere-contact-sec')
		return 'garage';
	if (useCaseId.includes('volet') || useCaseId.includes('store')) return 'cover';
	if (useCaseId.includes('eclairage') || useCaseId.includes('va-et-vient') || useCaseId.includes('presence'))
		return 'lighting';
	if (useCaseId.includes('radiateur') || useCaseId.includes('chauffe-eau') || useCaseId.includes('fil-pilote'))
		return 'heating';
	if (useCaseId.includes('conso') || useCaseId.includes('veilles') || useCaseId.includes('lave-linge'))
		return 'plug';
	if (useCaseId.includes('box-home') || useCaseId.includes('secours')) return 'infra';
	return 'sensor';
}

/**
 * @param {{ useCaseId: string, ecosystem: string, useCaseTitle: string }} ctx
 */
function buildMailboxFunctionalSvg(ctx) {
	const title = `Schéma fonctionnel — ${ctx.useCaseTitle.slice(0, 56)}`;
	const app =
		ctx.ecosystem === 'ha-zigbee' || ctx.ecosystem === 'maker-esp32'
			? 'Home Assistant · Matter'
			: 'App Matter';
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" class="shuc-svg shuc-svg--functional" role="img" aria-label="${escapeAttr(title)}" data-shuc-functional="1">
  <defs>
    <marker id="shuc-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8 Z" fill="#0f766e"/></marker>
    <marker id="shuc-arr-teal" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8 Z" fill="#0d9488"/></marker>
  </defs>
  <rect x="0" y="0" width="${VB_W}" height="${VB_H}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" class="shuc-svg-bg"/>
  <text x="390" y="24" text-anchor="middle" font-family="${SVG_FONT}" font-size="14" font-weight="700" fill="#0f172a" class="shuc-svg-title">${escapeAttr(title)}</text>
  <text x="390" y="43" text-anchor="middle" font-family="${SVG_FONT}" font-size="10.5" fill="#475569" class="shuc-svg-muted">Rien n’est commandé et rien n’est câblé : le volet écarte l’aimant, le téléphone apprend l’ouverture.</text>
  ${block(20, 1, 'Volet', 'L’aimant s’écarte', 152)}
  ${block(216, 2, 'Capteur P2', 'Pile CR123A · Hall', 152)}
  ${block(412, 3, 'Thread', 'Routeur de bordure', 152)}
  ${block(608, 4, 'Téléphone', app, 152)}
  ${arrow(172, 110, 216, 110, 'Ouverture')}
  ${arrow(368, 110, 412, 110, 'Radio')}
  ${arrow(564, 110, 608, 110, 'Matter')}
  ${returnLoop(684, 96, '5. État ouvert ou fermé, relu dans l’app')}
</svg>`;
}

export function buildFunctionalSvg(ctx) {
	if (ctx.useCaseId === 'boite-lettres-colis') return buildMailboxFunctionalSvg(ctx);
	const kind = kindForUseCase(ctx.useCaseId);
	const eco = ctx.ecosystem;
	const appLabel =
		eco === 'wifi-sans-box'
			? 'App Shelly / fabricant'
			: eco === 'maker-esp32'
				? 'Dashboard ESPHome'
				: 'App Home Assistant';
	const netLabel =
		eco === 'ha-zigbee' ? 'Zigbee + coordinateur' : eco === 'maker-esp32' ? 'Wi-Fi local (API)' : 'Wi-Fi 2,4 GHz local';
	const moduleLabel =
		kind === 'garage'
			? 'Relais contact sec (0,5 s)'
			: kind === 'cover'
				? 'Module volet (Calibration)'
				: kind === 'lighting'
					? 'Micromodule éclairage'
					: kind === 'heating'
						? 'Module fil pilote / relais'
						: kind === 'plug'
							? 'Prise / tore de mesure'
							: kind === 'infra'
								? 'Box HA Green + Zigbee'
								: 'Capteur / actionneur';
	const loadLabel =
		kind === 'garage'
			? 'Bornier moteur PB/START'
			: kind === 'cover'
				? 'Moteur tubulaire 230 V'
				: kind === 'lighting'
					? 'Lampe / circuit DCL'
					: kind === 'heating'
						? 'Radiateur / chaudière'
						: kind === 'plug'
							? 'Appareil électroménager'
							: kind === 'infra'
								? 'Automatisations locales'
								: 'Équipement domestique';
	const stateLabel =
		kind === 'garage' || kind === 'cover'
			? '5. Capteur magnétique (reed) → État réel Ouvert / Fermé sur le téléphone'
			: kind === 'sensor'
				? '5. Remontée instantanée d’état → Notification push sur smartphone'
				: kind === 'plug'
					? '5. Mesure puissance (W / kWh) → Détection fin de cycle ou alerte'
					: kind === 'heating'
						? '5. Sonde de température → Régulation confort / éco vérifiée'
						: '5. Retour d’état temps réel → Confirmation sur l’application';

	const title = `Schéma fonctionnel — ${ctx.useCaseTitle.slice(0, 56)}`;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" class="shuc-svg shuc-svg--functional" role="img" aria-label="${escapeAttr(title)}" data-shuc-functional="1">
  <defs>
    <marker id="shuc-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8 Z" fill="#0f766e"/></marker>
    <marker id="shuc-arr-teal" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8 Z" fill="#0d9488"/></marker>
  </defs>
  <rect x="0" y="0" width="${VB_W}" height="${VB_H}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" class="shuc-svg-bg"/>
  <text x="390" y="24" text-anchor="middle" font-family="${SVG_FONT}" font-size="14" font-weight="700" fill="#0f172a" class="shuc-svg-title">${escapeAttr(title)}</text>
  <text x="390" y="43" text-anchor="middle" font-family="${SVG_FONT}" font-size="10.5" fill="#475569" class="shuc-svg-muted">Principe clé : la commande déclenche l’action, mais seul le capteur (boucle 5) confirme l’état réel de l’équipement.</text>
  ${block(20, 1, 'Smartphone', appLabel, 152)}
  ${block(216, 2, 'Réseau local', netLabel, 152)}
  ${block(412, 3, 'Module domotique', moduleLabel, 152)}
  ${block(608, 4, 'Équipement', loadLabel, 152)}
  ${arrow(172, 110, 216, 110, 'Ordre')}
  ${arrow(368, 110, 412, 110, 'Radio')}
  ${arrow(564, 110, 608, 110, 'Contact')}
  ${returnLoop(684, 96, stateLabel)}
  <text x="390" y="226" text-anchor="middle" font-family="${SVG_FONT}" font-size="10" fill="#64748b" class="shuc-svg-muted">Les commandes d’origine (télécommande, bouton mural) restent actives en parallèle.</text>
</svg>`;
}

export function functionalExplanationPoints(ctx) {
	if (ctx.useCaseId === 'boite-lettres-colis') {
		const app =
			ctx.ecosystem === 'ha-zigbee' || ctx.ecosystem === 'maker-esp32'
				? 'Home Assistant, via l’intégration Matter'
				: 'l’application Matter (Maison, Google Home, Alexa, SmartThings ou Aqara Home)';
		return [
			'Le facteur pousse le volet. L’aimant fourni s’écarte du boîtier. C’est le seul « événement » : personne n’envoie d’ordre.',
			'Le capteur, un Aqara Door and Window Sensor P2 à pile CR123A, voit cet écart avec son capteur Hall. Il n’a pas de fil.',
			'Il annonce l’ouverture en Thread. Un routeur de bordure Thread doit déjà être allumé. Un dongle Zigbee ne le reçoit pas.',
			`${app} affiche l’état et peut envoyer la notification.`,
			'Refermer le volet ramène l’état à fermé. Le capteur ne sait pas s’il reste du courrier dedans, seulement si le volet a bougé.',
		];
	}
	const kind = kindForUseCase(ctx.useCaseId);
	const eco = ctx.ecosystem;
	const app =
		eco === 'wifi-sans-box'
			? 'l’application mobile Shelly Smart Control (ou l’app du fabricant)'
			: 'Home Assistant sur votre réseau local';
	const net = eco === 'ha-zigbee' ? 'le maillage Zigbee puis le coordinateur USB' : 'votre box internet en Wi-Fi 2,4 GHz';
	if (kind === 'garage') {
		return [
			`Depuis votre smartphone, vous appuyez sur « Ouvrir » dans ${app} : c’est une demande de commande, pas une garantie que la porte bouge déjà.`,
			`La commande traverse ${net} et arrive sur le module relais alimenté en 230 V (L/N) près de la motorisation.`,
			`Le relais ferme brièvement les bornes I–O (contact sec libre de potentiel), exactement comme si vous appuyiez sur le bouton mural : réglage Auto-Off 0,5 à 1 seconde obligatoire.`,
			`La carte moteur reçoit l’impulsion sur PB/START et entraîne le battant ; les télécommandes radio et cellules photoélectriques d’origine restent actives en parallèle.`,
			`Un capteur magnétique (reed) sur le battant renvoie l’état réel Ouvert/Fermé : seul lui confirme la position, pas le relais.`,
		];
	}
	return [
		`Vous déclenchez une action depuis ${app} (bouton manuel, automatisation horaire ou scène).`,
		`Le signal passe par ${net} jusqu’au module domotique retenu dans votre configuration.`,
		`Le module pilote l’équipement (lampe, volet, prise, vanne ou radiateur) selon le câblage du schéma électrique.`,
		`Les commandes physiques existantes (interrupteur mural, bouton poussoir, télécommande) restent utilisables normalement.`,
		`Le capteur ou la mesure de consommation associée remonte l’état réel sur votre téléphone (position, température, watts).`,
	];
}

export function functionalLegend(ctx) {
	if (ctx.useCaseId === 'boite-lettres-colis') {
		return 'Les flèches 1 à 4 vont du volet vers le téléphone. La boucle pointillée est le même état, relu dans l’app. Il n’y a pas de retour vers un moteur, parce qu’il n’y a pas de moteur.';
	}
	const kind = kindForUseCase(ctx.useCaseId);
	if (kind === 'garage') {
		return 'À observer sur ce schéma : la commande descendante (étapes 1 à 4) déclenche une impulsion de 0,5 s, tandis que la boucle pointillée (étape 5) remonte la position réelle mesurée par le capteur magnétique.';
	}
	return 'À observer : les flèches pleines (1 → 4) représentent l’ordre envoyé par votre téléphone ; la boucle pointillée (5) représente la confirmation d’état réel qui revient vers l’application.';
}
