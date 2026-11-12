/** Guide porte de garage. Prix indicatifs catalogue (PRODUCTS). */

export const GARAGE_DOOR_PAGE = {
	title: 'Ouvrir une porte de garage motorisée depuis le téléphone',
	description:
		'Contact sec sur le bouton poussoir, état ouvert ou fermé, alerte si la porte reste ouverte. Le 230 V du moteur n’est pas commuté.',
};

export const PULSE_YAML = `alias: Impulsion porte de garage
mode: single
sequence:
  - action: switch.turn_on
    target:
      entity_id: switch.remplacer_shelly
  - delay:
      milliseconds: 500
  - action: switch.turn_off
    target:
      entity_id: switch.remplacer_shelly
`;

export const COVER_YAML = `template:
  - cover:
      - name: Porte de garage
        unique_id: porte_garage_contact_sec
        device_class: garage
        availability: "{{ not is_state('binary_sensor.remplacer_contact', 'unavailable') and not is_state('binary_sensor.remplacer_contact', 'unknown') }}"
        state: "{{ 'closed' if is_state('binary_sensor.remplacer_contact', 'off') else 'open' }}"
        open_cover:
          - condition: state
            entity_id: binary_sensor.remplacer_contact
            state: "off"
          - action: script.impulsion_porte_garage
        close_cover:
          - condition: state
            entity_id: binary_sensor.remplacer_contact
            state: "on"
          - action: script.impulsion_porte_garage
        stop_cover:
          - action: script.impulsion_porte_garage
`;

export const ALERT_YAML = `alias: Garage resté ouvert
description: Notification seulement. Aucune commande du moteur.
mode: single
triggers:
  - trigger: state
    entity_id: binary_sensor.remplacer_contact
    to: "on"
    for: "00:15:00"
actions:
  - action: notify.notify
    data:
      message: "La porte de garage est ouverte depuis 15 minutes."
`;

export const GARAGE_DOOR_STEPS = [
	{
		title: 'Lire la notice avant d’ouvrir le capot',
		why: 'Le téléphone ne fait que reproduire le bouton mural. Si la motorisation n’a pas cette entrée, le projet s’arrête là.',
		where: 'La notice papier ou le PDF du fabricant, pas le boîtier.',
		actions: [
			'Cherchez les mots bouton poussoir, contact sec, dry contact, START, PP, SBC ou « commande pas à pas ». Le schéma montre alors deux bornes prévues pour le bouton mural.',
			'Si la notice ne décrit qu’une télécommande radio, sans bornier de bouton, n’ouvrez pas le capot pour en inventer un. Certaines séries récentes, dont des LiftMaster Security+ 2.0, n’offrent pas ce bornier simple : il faut l’interface prévue par le fabricant, ou un autre projet.',
			'Repérez aussi les cellules photoélectriques et le réglage de force. Ils restent en place. Le relais ne les remplace pas.',
		],
		observe: 'Vous savez nommer les deux bornes du bouton, et vous savez si elles existent.',
		check: 'Avec la porte dégagée, un appui sur le bouton mural fait partir la porte, un second appui pendant la course l’arrête. C’est exactement ce que l’impulsion devra faire.',
	},
	{
		title: 'Couper le circuit, puis seulement ouvrir le capot',
		why: 'Le bouton mural est en général un contact sec, mais le boîtier de la motorisation contient le 230 V du moteur et de la lampe.',
		where: 'Le tableau électrique, puis le capot. Le raccordement fixe au 230 V se fait hors tension, par une personne qualifiée, selon la NF C 15-100.',
		actions: [
			'Identifiez le disjoncteur de la motorisation. S’il n’est pas repéré, ne devinez pas : un mauvais circuit laisse le 230 V dans le boîtier.',
			'Coupez ce disjoncteur. La lampe de la motorisation et le bouton mural ne doivent plus réagir.',
			'Ouvrez le capot. Photographiez le bornier avant de déplacer un fil. Retrouvez la paire décrite dans la notice. Ne débranchez pas les fils de puissance du moteur, ni la terre.',
			'Si vous n’êtes pas à l’aise pour contrôler l’absence de tension sur les bornes 230 V, limitez-vous à regarder et à photographier. Le raccordement de L et N du module se fera par quelqu’un qui sait le faire.',
		],
		observe: 'La photo montre deux bornes de bouton, distinctes des bornes d’alimentation du moteur.',
		check: 'Le bouton mural est encore raccordé à ces deux bornes. Vous n’avez retiré aucun fil de cellule ni de moteur.',
	},
	{
		title: 'Comprendre les cinq bornes du Shelly avant de les serrer',
		why: 'Le Shelly 1 Mini Gen3 a un contact sec, mais son alimentation à lui est en 110–240 V. Mélanger les deux envoie le secteur sur la carte de la motorisation.',
		where: 'Le module, sur une table, notice Shelly ouverte. Fiche utilisée : shelly.com, Shelly 1 Mini Gen3.',
		actions: [
			'L et N alimentent le module, en 110–240 V alternatif. Le Mini Gen3 ne se nourrit pas en 12 V : ne le branchez pas sur une sortie accessoire 12 ou 24 V de la carte moteur.',
			'I et O sont le contact sec, normalement ouvert. Ce sont les deux seuls fils qui iront vers le bouton poussoir, en parallèle du bouton déjà en place. Quand le relais colle, I et O se touchent, comme un doigt sur le bouton. Ils ne délivrent pas le 230 V du Shelly.',
			'SW est une entrée pour un interrupteur du circuit d’alimentation du Shelly. Le bouton de la motorisation ne s’y raccorde pas.',
			'La fiche Shelly indique un relais contact sec, 8 A au plus, une température ambiante de −20 °C à 40 °C et une humidité de 30 à 70 %. Un plafond de garage qui dépasse 40 °C en été sort de cette fiche : placez alors le module plus bas, dans un boîtier, pas collé à la toiture.',
		],
		observe: 'Vous pouvez montrer du doigt L, N, I, O et SW sans hésiter.',
		check: 'Aucun fil du bouton mural n’est prévu sur L, N ou SW.',
	},
	{
		title: 'Raccorder I et O, et alimenter le module à part',
		why: 'Le bouton mural doit continuer de fonctionner. Le Shelly s’ajoute à côté, il ne le remplace pas.',
		where: 'Hors tension : les deux bornes du bouton, puis L et N du Shelly sur son alimentation 230 V.',
		actions: [
			'Deux conducteurs partent de I et de O vers les deux bornes du bouton. Le sens n’a pas d’importance : c’est un contact, pas une alimentation. Laissez les fils du bouton mural en place, en parallèle.',
			'N’envoyez ni la phase ni le neutre du Shelly sur ces bornes. N’utilisez pas la sortie comme si elle commutait le moteur.',
			'L et N du Shelly se raccordent à une alimentation 110–240 V qui lui est propre : circuit de la motorisation ou autre circuit déjà protégé. Ce raccordement fixe est du travail électrique. S’il n’est pas déjà votre métier, faites-le faire. Le module se loge dans un boîtier, pas en fils nus dans le capot.',
			'Serrez au couple indiqué par Shelly, 0,4 N·m, sans écraser des brins. Refermez le capot avant de réenclencher le disjoncteur.',
		],
		observe: 'Le capot est fermé, le disjoncteur est réenclenché, rien ne sent le chaud.',
		check: 'Le bouton mural fait encore partir et arrêter la porte, zone dégagée, avant tout essai depuis le téléphone. Si le bouton mural est mort, le Shelly est mal mis en parallèle : recoupez le courant et reprenez la photo du bornier.',
	},
	{
		title: 'Régler une impulsion courte, puis essayer une fois',
		why: 'Sans minuteur, le relais peut rester collé. La motorisation voit alors un doigt qui ne lâche pas le bouton.',
		where: 'Le Wi-Fi 2,4 GHz de la maison, l’interface du Shelly (navigateur sur son adresse IP, ou application Shelly Smart Control), porte dégagée.',
		actions: [
			'Le Shelly 1 Mini Gen3 ne parle qu’en 2,4 GHz. Un réseau uniquement 5 GHz ne le verra pas. Dans le garage, la page du module doit s’ouvrir sans délai. Sinon, rapprochez un point d’accès avant de refermer le boîtier pour de bon.',
			'Sur la sortie, activez l’arrêt automatique (souvent Auto off). Partez de 0,5 s, comme un appui bref. Le libellé exact dépend du firmware : c’est le minuteur de la sortie, pas une scène.',
			'Réservez l’adresse du Shelly dans la box (bail DHCP fixe), pour que Home Assistant le retrouve après une coupure.',
			'Une seule impulsion, personne sous la porte. La porte doit partir comme avec le bouton mural. Si rien ne bouge, passez à 1 s. Si elle part puis s’arrête tout de suite, l’impulsion est trop longue : elle compte pour deux appuis. Revenez vers 0,5 s.',
			'Le cloud Shelly peut rester coupé si vous ne voulez pas que l’ordre quitte la maison. L’intégration Home Assistant parle au module sur le réseau local.',
		],
		observe: 'Le relais colle brièvement, la porte part, et un second essai pendant la course l’arrête.',
		check: 'Coupez le Wi-Fi du téléphone : le bouton mural fonctionne encore. Le Shelly n’a pas pris la place de la télécommande d’origine.',
	},
	{
		title: 'Ajouter le Shelly à Home Assistant, sans commander depuis le capteur',
		why: 'Home Assistant doit voir un interrupteur qui donne l’impulsion. Il ne doit pas lancer le moteur chaque fois que l’état de la porte change.',
		where: 'Home Assistant, de préférence depuis un ordinateur : Paramètres, Appareils et services.',
		actions: [
			'Ajoutez l’intégration Shelly. Le module Gen3 se découvre sur le réseau local. S’il n’apparaît pas, indiquez l’adresse IP réservée à l’étape précédente. Documentation : home-assistant.io/integrations/shelly.',
			'Ouvrez Outils de développement, États, et notez l’identifiant de l’interrupteur, du type switch.quelque_chose. Ce n’est pas encore une porte.',
			'Créez le script d’impulsion dans Paramètres, Automatisations et scènes, Scripts. Il allume l’interrupteur, attend 0,5 s, puis l’éteint. Le mode single ignore un deuxième appel pendant qu’il tourne. L’exemple YAML plus bas n’a pas été exécuté sur une installation du site : si l’éditeur le refuse, recréez les trois actions dans l’éditeur visuel.',
			'L’arrêt automatique réglé dans le Shelly reste en place. Il lâche le contact même si Home Assistant s’interrompt au milieu du script.',
		],
		observe: 'Lancer le script, une fois, porte dégagée, fait le même mouvement qu’un appui sur le bouton mural.',
		check: 'Dans le journal de Home Assistant, le script ne part pas tout seul quand vous ouvrez la porte à la main ou avec la télécommande.',
	},
	{
		title: 'Mesurer l’écart, puis poser le capteur d’état',
		why: 'Sans capteur, le téléphone sait qu’il a envoyé une impulsion. Il ne sait pas si la porte est ouverte. Le SONOFF SNZB-04P ne convient que si l’écart porte fermée est d’au plus 20 mm.',
		where: 'La porte fermée, un réglet, puis Home Assistant si la mesure passe.',
		actions: [
			'Porte complètement fermée, cherchez deux surfaces qui se font face à 20 mm ou moins : souvent le haut du tablier et le dormant, ou le chariot et une butée. Si le jeu est plus grand, n’achetez pas ce capteur pour cette porte. Un contact de fenêtre collé « à peu près » restera vu ouvert en permanence.',
			'La notice Sonoff (SNZB-04P) limite l’appareil à l’intérieur, de −10 °C à 60 °C, sans pluie ni soleil direct. Un garage fermé et hors gel peut entrer dans cette plage. Un auvent exposé, non.',
			'S’il n’y a pas encore de coordinateur Zigbee, le dongle de la liste sert à ça. S’il y en a déjà un (ZHA ou Zigbee2MQTT), n’en branchez pas un second. Sonoff cite le ZBDongle-E parmi les passerelles compatibles avec ce capteur.',
			'Dans l’intégration Zigbee déjà utilisée pour vos autres appareils, autorisez l’association, puis maintenez le bouton du capteur jusqu’au clignotement décrit dans sa notice (appui long d’environ 5 s). Alignez les repères du boîtier et de l’aimant.',
			'L’Aqara Door and Window Sensor P2 n’est pas un remplaçant Zigbee : c’est un appareil Thread avec Matter. Il lui faut un routeur de bordure Thread, et sa notice le réserve à l’intérieur. Il ne s’associe pas à un dongle Zigbee.',
		],
		observe: 'Dans Outils de développement, l’état du capteur change quand vous écartez l’aimant, et revient quand la porte est fermée.',
		check: 'Notez si « on » veut dire ouvert. Sur un binary_sensor de classe porte, c’est le cas le plus courant. S’il est inversé chez vous, vous inverserez les conditions du modèle de porte, vous ne changerez pas le câblage du Shelly.',
	},
	{
		title: 'Afficher une porte, avec une demande de confirmation',
		why: 'Un interrupteur dans la poche ouvre le garage sans le vouloir. La confirmation et l’état réel limitent ça. Ils ne remplacent pas les cellules.',
		where: 'Le tableau de bord Home Assistant, puis le téléphone sur le même réseau.',
		actions: [
			'Ajoutez le modèle de porte (template cover) seulement après avoir copié les vrais identifiants. L’exemple plus bas suppose que le capteur est « off » porte fermée et « on » porte ouverte. Il n’a pas été chargé sur une installation du site.',
			'Ouvrir n’envoie l’impulsion que si le capteur dit fermé. Fermer ne l’envoie que s’il dit le contraire. Si le capteur est indisponible, la porte Home Assistant ne doit pas accepter d’ordre.',
			'Sur une entrée à un seul bouton, « pas fermé » mélange trois cas : porte ouverte à l’arrêt, porte en train de monter, porte en train de descendre. Une impulsion pendant la course arrête le mouvement. Il faut alors un second ordre pour repartir. Le capteur magnétique ne distingue pas ces trois cas.',
			'Sur le tableau de bord, une carte bouton avec confirmation. Le texte demande si l’on actionne bien la porte. Documentation des actions de carte : home-assistant.io/dashboards/actions.',
			'Depuis l’extérieur de la maison, passez par l’accès distant déjà documenté sur le site (Nabu Casa, WireGuard ou Tailscale). Ne redirigez pas le port 8123 sur la box.',
		],
		observe: 'Le téléphone affiche fermé quand la porte l’est, et demande confirmation avant d’envoyer l’impulsion.',
		check: 'Un appui annulé dans la confirmation ne fait pas bouger la porte. Un ordre lancé pendant que le capteur est retiré de sa pile ne doit rien déclencher.',
	},
	{
		title: 'Prévenir si la porte reste ouverte, sans la refermer tout seul',
		why: 'Une fermeture automatique peut coincer une personne, un animal ou un objet. Les cellules réduisent ce risque, elles ne le rendent pas nul, surtout si elles sont sales ou désalignées.',
		where: 'Paramètres, Automatisations et scènes. Le déclencheur est le capteur, pas l’heure seule.',
		actions: [
			'Créez une automatisation : si le capteur reste « ouvert » pendant 15 minutes, envoyer une notification au téléphone. Aucune action switch, script ou cover.',
			'N’ajoutez pas de fermeture à 22 h, au départ de la maison, ni « si tout le monde est parti ». Ces scénarios existent sur d’autres appareils de la maison. Ici ils sont refusés.',
			'La durée de 15 minutes est un exemple. Allongez-la si vous bricolez souvent porte ouverte. Le YAML plus bas n’a pas été exécuté ici.',
		],
		observe: 'En maintenant l’aimant écarté le temps choisi, le téléphone reçoit le message, et la porte ne bouge pas.',
		check: 'L’historique de l’interrupteur Shelly ne montre pas d’allumage au moment de la notification.',
	},
];

export const GARAGE_DOOR_FAQ = [
	{
		question: 'Peut-on couper le 230 V du moteur avec le Shelly pour ouvrir le garage ?',
		answer:
			'Non. Le moteur, les fins de course et la détection d’obstacle doivent rester ceux de la motorisation. Le Shelly 1 Mini Gen3 ne fait que coller brièvement son contact sec, bornes I et O, en parallèle du bouton poussoir. Sa propre alimentation, L et N, est un autre circuit, en 110–240 V, et ne va pas sur le bornier du bouton.',
	},
	{
		question: 'Faut-il un coordinateur Zigbee pour ouvrir la porte ?',
		answer:
			'Non pour la commande. Le Shelly 1 Mini Gen3 est en Wi-Fi. Le Zigbee ne sert qu’au capteur d’état SNZB-04P. Si ZHA ou Zigbee2MQTT tourne déjà, le dongle de la liste ne s’achète pas. Sans ce capteur, le téléphone peut encore envoyer l’impulsion, mais il ne sait pas si la porte est ouverte.',
	},
	{
		question: 'Le capteur Aqara P2 convient-il avec un dongle Zigbee ?',
		answer:
			'Non. L’Aqara Door and Window Sensor P2 parle en Thread et en Matter. Aqara demande un routeur de bordure Thread, et sa notice le destine à l’intérieur. Il ne s’associe pas au SONOFF ZBDongle-E. Le capteur retenu ici pour le profil Zigbee est le SONOFF SNZB-04P, à condition que l’écart porte fermée reste d’au plus 20 mm.',
	},
	{
		question: 'Que faire si la notice n’a pas de bornier bouton poussoir ?',
		answer:
			'On ne branche pas le relais au hasard sur la carte. Certaines motorisations ne se commandent qu’avec leur télécommande, ou avec une interface vendue par le fabricant. Dans ce cas ce montage ne s’applique pas. La variante d’adresse contact-sec suppose que ce bornier est décrit dans la notice.',
	},
	{
		question: 'Peut-on fermer la porte automatiquement le soir ?',
		answer:
			'Ce guide ne le fait pas. Une impulsion envoyée sans personne devant la porte peut arrêter la course au mauvais moment, ou refermer sur un obstacle que les cellules ne voient pas. L’automatisation utile est une notification si le capteur reste ouvert. La fermeture reste un geste confirmé, sur place ou avec la porte en vue.',
	},
	{
		question: 'Deux portes, ou une porte et un portail ?',
		answer:
			'Chaque motorisation a son propre relais et, si l’écart le permet, son propre capteur. La quantité du configurateur multiplie ces éléments. Elle ne multiplie pas Home Assistant, ni le coordinateur Zigbee. Un portail est une autre motorisation : la même idée de contact sec peut s’y appliquer seulement si sa notice montre aussi un bornier de bouton.',
	},
	{
		question: 'Ça marche sans Internet ?',
		answer:
			'Oui sur place, si la box, le Wi-Fi 2,4 GHz, Home Assistant et le Shelly sont allumés, et si l’intégration Shelly est locale. Une coupure Internet empêche la notification à l’extérieur et l’accès distant. Elle n’empêche pas le bouton mural. Le cloud Shelly n’est pas nécessaire à cette intégration locale.',
	},
];
