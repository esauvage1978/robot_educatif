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

const esp = guidePath('it', 'ouvrir-porte-garage-smartphone-esp32-esphome');
const dongle = guidePath('it', 'meilleur-dongle-zigbee-home-assistant');
const zha = guidePath('it', 'home-assistant-zigbee2mqtt-ou-zha');

const PULSE = `alias: Impulso porta garage
mode: single
sequence:
  - action: switch.turn_on
    target:
      entity_id: switch.sostituire_shelly
  - delay:
      milliseconds: 500
  - action: switch.turn_off
    target:
      entity_id: switch.sostituire_shelly
`;

const COVER = `template:
  - cover:
      - name: Porta del garage
        unique_id: porta_garage_contatto_pulito
        device_class: garage
        availability: "{{ not is_state('binary_sensor.sostituire_contatto', 'unavailable') and not is_state('binary_sensor.sostituire_contatto', 'unknown') }}"
        state: "{{ 'closed' if is_state('binary_sensor.sostituire_contatto', 'off') else 'open' }}"
        open_cover:
          - condition: state
            entity_id: binary_sensor.sostituire_contatto
            state: "off"
          - action: script.impulso_porta_garage
        close_cover:
          - condition: state
            entity_id: binary_sensor.sostituire_contatto
            state: "on"
          - action: script.impulso_porta_garage
        stop_cover:
          - action: script.impulso_porta_garage
`;

const CARD = `type: button
entity: cover.porta_del_garage
name: Porta del garage
show_state: true
tap_action:
  action: toggle
  confirmation:
    text: "Azionare la porta del garage?"
`;

const ALERT = `alias: Porta garage rimasta aperta
description: Solo notifica. Nessun comando al motore.
mode: single
triggers:
  - trigger: state
    entity_id: binary_sensor.sostituire_contatto
    to: "on"
    for: "00:15:00"
actions:
  - action: notify.notify
    data:
      message: "La porta del garage è aperta da 15 minuti."
`;

export const garageDoorIt = {
	lang: 'it',
	inLanguage: 'it',
	title: 'Aprire una porta garage motorizzata dal telefono',
	description:
		'Contatto pulito sul pulsante a parete, stato aperto o chiuso, avviso se resta aperta. I 230 V del motore non vengono commutati.',
	howToDescription:
		'Trovare i morsetti del pulsante, collegare un contatto pulito, regolare un impulso breve e mostrare lo stato in Home Assistant senza chiudere la porta a orario.',
	articleDescription:
		'Il modulo imita il pulsante a parete con un contatto pulito. Non commuta la rete della motorizzazione. Un sensore a parte dice se la porta è chiusa.',
	tocAria: 'Indice',
	stepWord: 'Passo',
	whereWord: 'Dove:',
	checkWord: 'Controllo:',
	steps: [
		{
			title: 'Leggere il manuale prima di aprire il carter',
			why: 'Il telefono ripete solo il pulsante a parete. Se la motorizzazione non ha questo ingresso, il progetto si ferma qui.',
			where: 'Il manuale cartaceo o il PDF del costruttore, non la scatola.',
			actions: [
				'Cercate pulsante, contatto pulito, START, PP o « passo-passo ». Lo schema mostra allora due morsetti previsti per il pulsante a parete.',
				'Su BFT, Nice, Came o FAAC il nome cambia da un modello all’altro. Lo dice il manuale. Se il manuale descrive solo un telecomando radio, non aprite il carter per inventare un morsetto.',
				'Trovate anche le fotocellule e la regolazione della forza. Restano al loro posto. Il relè non le sostituisce.',
			],
			observe: 'Sapete nominare i due morsetti del pulsante e sapete se esistono.',
			check: 'Con il passaggio libero, una pressione sul pulsante a parete fa partire la porta e una seconda pressione durante la corsa la ferma. È esattamente ciò che dovrà fare l’impulso.',
		},
		{
			title: 'Togliere tensione al circuito, e solo dopo aprire il carter',
			why: 'Il pulsante a parete è di solito un contatto pulito, ma nel carter della motorizzazione c’è la rete del motore e della lampada.',
			where: 'Il quadro, poi il carter. Il collegamento fisso dell’alimentazione del modulo si fa a tensione tolta, da un elettricista qualificato. In Italia la norma di riferimento degli impianti a bassa tensione è la CEI 64-8.',
			actions: [
				'Individuate l’interruttore della motorizzazione. Se non è segnato, non indovinate: il circuito sbagliato lascia i 230 V nella scatola.',
				'Aprite quell’interruttore. La lampada e il pulsante a parete non devono più rispondere.',
				'Fotografate la morsettiera prima di spostare un filo. Ritrovate la coppia descritta nel manuale. Non staccate i fili di potenza del motore, né la terra.',
				'Se non siete in grado di verificare l’assenza di tensione sui morsetti di rete, limitatevi a guardare e a fotografare. L e N del modulo li collega chi sa farlo.',
			],
			observe: 'La foto mostra due morsetti del pulsante, distinti da quelli di alimentazione del motore.',
			check: 'Il pulsante a parete è ancora collegato a questi due morsetti. Non avete tolto nessun filo di fotocellula né di motore.',
		},
		{
			title: 'Capire i cinque morsetti dello Shelly prima di serrarli',
			why: 'Lo Shelly 1 Mini Gen3 ha un contatto pulito, ma la sua alimentazione è a 110–240 V. Mescolare le due cose manda la rete sulla scheda della motorizzazione.',
			where: 'Il modulo, sul tavolo, pagina Shelly aperta. Fonte: shelly.com, Shelly 1 Mini Gen3.',
			actions: [
				'L e N alimentano il modulo, 110–240 V in alternata. Il Mini Gen3 non si alimenta a 12 V: non collegatelo a un’uscita accessoria a 12 o 24 V della scheda motore.',
				'I e O sono il contatto pulito normalmente aperto. Sono gli unici due fili che andranno ai morsetti del pulsante, in parallelo al pulsante già presente. Quando il relè chiude, I e O si toccano, come un dito sul pulsante. Non portano la rete dello Shelly.',
				'SW è un ingresso per un interruttore sul circuito di alimentazione dello Shelly. Il pulsante della porta non si collega lì.',
				'La pagina Shelly indica un relè a contatto pulito, 8 A al massimo, una temperatura ambiente da −20 °C a 40 °C e un’umidità dal 30 al 70 %. Un soffitto di garage che supera i 40 °C d’estate esce da questa scheda: mettete il modulo più in basso, in una scatola, non contro il tetto.',
			],
			observe: 'Riuscite a indicare L, N, I, O e SW senza esitare.',
			check: 'Nessun filo del pulsante a parete è previsto su L, N o SW.',
		},
		{
			title: 'Collegare I e O, e alimentare il modulo a parte',
			why: 'Il pulsante a parete deve continuare a funzionare. Lo Shelly si aggiunge accanto, non lo sostituisce.',
			where: 'A tensione tolta: i due morsetti del pulsante, poi L e N dello Shelly sulla sua alimentazione a 230 V.',
			actions: [
				'Due conduttori partono da I e da O verso i due morsetti del pulsante. Il verso non conta: è un contatto, non un’alimentazione. Lasciate i fili del pulsante a parete al loro posto, in parallelo.',
				'Non mandate né la fase né il neutro dello Shelly su questi morsetti. Non usate l’uscita come se commutasse il motore.',
				'L e N dello Shelly si collegano a un’alimentazione 110–240 V tutta loro: il circuito della motorizzazione o un altro circuito già protetto. Questo collegamento fisso è un lavoro elettrico. Se non è già il vostro mestiere, fatelo fare. Il modulo sta in una scatola, non a fili nudi nel carter.',
				'Serrate alla coppia indicata da Shelly, 0,4 N·m, senza schiacciare i trefoli. Richiudete il carter prima di riarmare l’interruttore.',
			],
			observe: 'Il carter è chiuso, l’interruttore è riarmato, niente odora di caldo.',
			check: 'Il pulsante a parete fa ancora partire e fermare la porta, passaggio libero, prima di qualsiasi prova dal telefono. Se il pulsante è morto, lo Shelly è in parallelo sulla coppia sbagliata: togliete tensione e rileggete la foto.',
		},
		{
			title: 'Regolare un impulso breve, poi provare una volta',
			why: 'Senza temporizzatore il relè può restare chiuso. La motorizzazione vede allora un dito che non lascia il pulsante.',
			where: 'Il Wi-Fi 2,4 GHz di casa, l’interfaccia dello Shelly (browser sul suo indirizzo IP, o app Shelly Smart Control), passaggio libero.',
			actions: [
				'Lo Shelly 1 Mini Gen3 parla solo a 2,4 GHz. Una rete solo a 5 GHz non lo vede. In garage la pagina del modulo deve aprirsi senza attesa. Altrimenti avvicinate un punto di accesso prima di chiudere la scatola per davvero.',
				'Sull’uscita attivate lo spegnimento automatico. Partite da 0,5 s, come una pressione breve. La scritta esatta dipende dal firmware: è il temporizzatore dell’uscita, non una scena.',
				'Riservate l’indirizzo dello Shelly nel router (lease DHCP fisso), così Home Assistant lo ritrova dopo un’interruzione.',
				'Un solo impulso, nessuno sotto la porta. La porta deve muoversi come col pulsante a parete. Se non si muove nulla, provate 1 s. Se parte e si ferma subito, l’impulso è troppo lungo: la scheda lo conta come due pressioni. Tornate verso 0,5 s.',
				'Il cloud Shelly può restare spento se non volete che l’ordine esca di casa. L’integrazione Home Assistant parla al modulo sulla rete locale.',
			],
			observe: 'Il relè scatta brevemente, la porta parte, e una seconda prova durante la corsa la ferma.',
			check: 'Spegnendo il Wi-Fi del telefono, il pulsante a parete funziona ancora. Lo Shelly non ha preso il posto del telecomando originale.',
		},
		{
			title: 'Aggiungere lo Shelly a Home Assistant, senza comandarlo dal sensore',
			why: 'Home Assistant deve vedere un interruttore che dà l’impulso. Non deve avviare il motore ogni volta che cambia lo stato della porta.',
			where: 'Home Assistant, meglio da un computer: Impostazioni, Dispositivi e servizi.',
			actions: [
				'Aggiungete l’integrazione Shelly. Un modulo Gen3 si scopre sulla rete locale. Se non compare, indicate l’indirizzo IP riservato al passo precedente. Documentazione: home-assistant.io/integrations/shelly.',
				'Aprite Strumenti per sviluppatori, Stati, e annotate l’identificativo dell’interruttore, del tipo switch.qualcosa. Non è ancora una porta.',
				'Create lo script di impulso in Impostazioni, Automazioni e scene, Script. Accende l’interruttore, attende 0,5 s, poi lo spegne. La modalità single ignora una seconda chiamata finché la prima non è finita. L’esempio YAML più sotto non è stato caricato su un’installazione del sito: se l’editor lo rifiuta, ricreate le tre azioni nell’editor visuale.',
				'Lo spegnimento automatico impostato nello Shelly resta. Apre il contatto anche se Home Assistant si interrompe a metà script.',
			],
			observe: 'Lanciare lo script una volta, passaggio libero, fa lo stesso movimento di una pressione sul pulsante a parete.',
			check: 'Nel registro di Home Assistant lo script non parte da solo quando aprite la porta a mano o col telecomando.',
		},
		{
			title: 'Misurare il gioco, poi posare il sensore di stato',
			why: 'Senza sensore il telefono sa di aver inviato un impulso. Non sa se la porta è aperta. Il SONOFF SNZB-04P va bene solo se il gioco a porta chiusa è di 20 mm al massimo.',
			where: 'Porta chiusa, un righello, poi Home Assistant se la misura passa.',
			actions: [
				'A porta completamente chiusa, cercate due superfici che si guardano a 20 mm o meno: spesso la sommità del manto e il telaio, o il carrello e un finecorsa. Se il gioco è maggiore, non comprate questo sensore per questa porta. Un contatto finestra incollato « più o meno » resterà visto aperto.',
				'La pagina Sonoff dello SNZB-04P limita l’apparecchio agli interni, da −10 °C a 60 °C, senza pioggia né sole diretto. Un garage chiuso e al riparo dal gelo può entrare in questo intervallo. Una tettoia esposta no.',
				'Se non c’è ancora un coordinatore Zigbee, la chiavetta della nota acquisti serve a questo. Se uno è già in funzione (ZHA o Zigbee2MQTT), non collegatene un secondo. Sonoff cita lo ZBDongle-E tra i gateway compatibili con questo sensore.',
				'Nell’integrazione Zigbee che usate già per gli altri apparecchi, consentite l’associazione, poi tenete premuto il tasto del sensore fino al lampeggio descritto nel suo manuale (pressione lunga di circa 5 s). Allineate i riferimenti di corpo e magnete.',
				'L’Aqara Door and Window Sensor P2 non è un sostituto Zigbee: è un apparecchio Thread con Matter. Gli serve un border router Thread, e il manuale lo tiene in interni. Non si associa a una chiavetta Zigbee.',
			],
			observe: 'Negli Strumenti per sviluppatori lo stato del sensore cambia quando allontanate il magnete, e torna quando la porta è chiusa.',
			check: 'Annotate se « on » significa aperto. Su un binary_sensor di classe porta è il caso più comune. Se da voi è invertito, invertite le condizioni del modello di porta. Non cambiate il cablaggio dello Shelly.',
		},
		{
			title: 'Mostrare una porta, con una richiesta di conferma',
			why: 'Un interruttore in tasca apre il garage senza volerlo. La conferma e lo stato reale limitano questo. Non sostituiscono le fotocellule.',
			where: 'La plancia di Home Assistant, poi il telefono sulla stessa rete.',
			actions: [
				'Aggiungete il modello di porta solo dopo aver copiato gli identificativi veri. L’esempio sotto suppone che il sensore sia « off » a porta chiusa e « on » a porta aperta. Non è stato caricato su un’installazione del sito.',
				'Aprire invia l’impulso solo se il sensore dice chiuso. Chiudere lo invia solo nel caso opposto. Se il sensore non è disponibile, la porta di Home Assistant non deve accettare l’ordine.',
				'Su un ingresso a un solo pulsante, « non chiuso » mescola tre casi: porta aperta e ferma, porta che sale, porta che scende. Un impulso durante la corsa ferma il movimento. Serve un secondo ordine per ripartire. Il sensore magnetico non distingue questi tre casi.',
				'Sulla plancia, una scheda pulsante con conferma. Il testo chiede se si vuole davvero azionare la porta. Azioni delle schede: home-assistant.io/dashboards/actions.',
				'Da fuori casa usate un accesso remoto di cui vi fidate già: Nabu Casa, WireGuard o Tailscale. Non inoltrate la porta 8123 sul router. La pagina ufficiale è home-assistant.io/docs/configuration/remote.',
			],
			observe: 'Il telefono mostra chiuso quando la porta lo è, e chiede conferma prima di inviare l’impulso.',
			check: 'Una pressione annullata nella conferma non muove la porta. Un ordine inviato con la pila del sensore tolta non deve far scattare nulla.',
		},
		{
			title: 'Avvisare se la porta resta aperta, senza richiuderla da sola',
			why: 'Una chiusura automatica può schiacciare una persona, un animale o un oggetto. Le fotocellule riducono questo rischio. Non lo annullano, soprattutto se sono sporche o disallineate.',
			where: 'Impostazioni, Automazioni e scene. L’innesco è il sensore, non solo l’ora.',
			actions: [
				'Create un’automazione: se il sensore resta « aperto » per 15 minuti, inviare una notifica al telefono. Nessuna azione su interruttore, script o cover.',
				'Non aggiungete una chiusura alle 22, all’uscita di casa, né « se tutti sono usciti ». Queste scene esistono per altri apparecchi della casa. Qui sono rifiutate.',
				'Quindici minuti sono un esempio. Allungate il tempo se lavorate spesso a porta aperta. Lo YAML più sotto non è stato eseguito qui.',
			],
			observe: 'Tenendo il magnete lontano per il tempo scelto, il telefono riceve il messaggio e la porta non si muove.',
			check: 'Lo storico dell’interruttore Shelly non mostra un’accensione al momento della notifica.',
		},
	],
	faq: [
		{
			question: 'Si possono commutare i 230 V del motore con lo Shelly per aprire il garage?',
			answer:
				'No. Motore, finecorsa e rilevamento ostacolo restano della motorizzazione. Lo Shelly 1 Mini Gen3 chiude solo per un attimo il suo contatto pulito, morsetti I e O, in parallelo al pulsante. La sua alimentazione, L e N, è un altro circuito, a 110–240 V, e non va sulla morsettiera del pulsante.',
		},
		{
			question: 'Serve un coordinatore Zigbee per aprire la porta?',
			answer:
				'Non per il comando. Lo Shelly 1 Mini Gen3 è in Wi-Fi. Lo Zigbee serve solo al sensore di stato SNZB-04P. Se ZHA o Zigbee2MQTT è già in funzione, la chiavetta della nota non si compra. Senza questo sensore il telefono può ancora inviare l’impulso, ma non sa se la porta è aperta.',
		},
		{
			question: 'L’Aqara P2 va bene con una chiavetta Zigbee?',
			answer:
				'No. L’Aqara Door and Window Sensor P2 parla Thread e Matter. Aqara chiede un border router Thread, e il manuale lo destina agli interni. Non si associa al SONOFF ZBDongle-E. Il sensore scelto qui per il caso Zigbee è il SONOFF SNZB-04P, a condizione che il gioco a porta chiusa resti di 20 mm al massimo.',
		},
		{
			question: 'Che fare se il manuale non ha i morsetti del pulsante?',
			answer:
				'Non si appoggia il relè a caso sulla scheda. Alcune motorizzazioni si comandano solo col loro telecomando, o con un’interfaccia venduta dal costruttore. Questo cablaggio allora non si applica. I passi suppongono che il manuale descriva quella coppia di morsetti.',
		},
		{
			question: 'Si può chiudere la porta da sola la sera?',
			answer:
				'Questa guida non lo fa. Un impulso inviato senza nessuno davanti alla porta può fermare la corsa nel momento sbagliato, o chiudere su un ostacolo che le fotocellule non vedono. L’automazione utile è una notifica se il sensore resta aperto. La chiusura resta un gesto confermato, sul posto o con la porta in vista.',
		},
		{
			question: 'Due porte, o una porta e un cancello?',
			answer:
				'Ogni motorizzazione ha il suo relè e, se il gioco lo consente, il suo sensore. Home Assistant resta uno, e così il coordinatore Zigbee. Un cancello a battente o scorrevole è un’altra motorizzazione: la stessa idea vale solo se il suo manuale mostra anch’esso una coppia per il pulsante. Le fotocellule di un cancello su strada contano ancora di più.',
		},
		{
			question: 'Funziona senza Internet?',
			answer:
				'Sì, sul posto, se router, Wi-Fi 2,4 GHz, Home Assistant e Shelly sono accesi e se l’integrazione Shelly è locale. Un’interruzione di Internet blocca la notifica fuori casa e l’accesso remoto. Non blocca il pulsante a parete. Il cloud Shelly non serve a questa integrazione locale.',
		},
	],
	blocks: [
		p(
			'La porta del garage si apre già con un pulsante a parete e un telecomando. Il telefono fa lo stesso gesto, e soprattutto dice se il manto è rimasto alzato. Il modulo non sostituisce la motorizzazione: unisce due morsetti già previsti per il pulsante, per la durata di una pressione. Motore, fotocellule e arresto su ostacolo restano quelli d’origine.',
		),
		p(
			'Testo rivisto il 29 ottobre 2026. I morsetti dello Shelly 1 Mini Gen3 e i limiti del SONOFF SNZB-04P vengono dalle schede dei costruttori citate in fondo. Gli esempi YAML di Home Assistant non sono stati caricati su un’installazione del sito. Il cablaggio della vostra scheda motore è quello del suo manuale.',
		),
		h2('perche', 'A che serve', 'A che serve comandare la porta dal telefono'),
		p(
			'Il telecomando resta in auto, o in una tasca difficile da raggiungere davanti alla porta. Il telefono è già in mano. Permette di aprire a chi arriva, poi di verificare un’ora dopo che la porta non è rimasta spalancata. Home Assistant conserva la storia di questo stato. L’app del modulo, da sola, sa soprattutto di aver inviato un impulso.',
		),
		p(
			'È utile solo se la motorizzazione ha già un ingresso per un pulsante. La guida non trasforma una porta manuale in porta motorizzata, e non cortocircuita una scheda che ha solo morsetti di potenza.',
		),
		h2('risultato', 'Risultato', 'Che cosa ottenete'),
		p(
			'Una motorizzazione a soffitto, invariata nel suo ruolo: tira il manto, si ferma sulle sue finecorsa e le fotocellule sorvegliano il passaggio. Il cordino rosso che si vede spesso sotto la guida è lo sblocco manuale. Non si collega al modulo.',
		),
		{
			type: 'photo',
			src: MOTOR_PHOTO,
			width: 1600,
			height: 1200,
			alt: 'Motorizzazione di porta garage fissata al soffitto, con guida, lampada e cordino rosso di sblocco.',
			caption: [
				'Motorizzazione a soffitto. Il modulo si collega ai morsetti del pulsante descritti nel manuale, non ai fili del motore. Su questa serie LiftMaster Security+ 2.0 questa coppia semplice non è sempre presente. Foto: ',
				link('Tony Webster', MOTOR_CREDIT),
				', ',
				link('CC BY 2.0', CC_BY),
				'.',
			],
		},
		p(
			'Dopo il lavoro, il pulsante a parete e il telecomando funzionano come prima. Il telefono chiede conferma, poi invia lo stesso impulso. Se il sensore è posato, lo schermo mostra aperto o chiuso. Parte una notifica se la porta resta aperta. Nessuna automazione di questa guida la richiude da sola.',
		),
		h2('prima', 'Prima', 'Prima di cominciare'),
		{
			type: 'table',
			headers: ['Punto', 'Che cosa sapere'],
			rows: [
				['Obiettivo', 'Inviare l’impulso del pulsante dal telefono e sapere se la porta è chiusa.'],
				[
					'Difficoltà',
					'Intermedia. Bisogna leggere un manuale di motorizzazione e distinguere contatto pulito e 230 V. Il collegamento fisso dell’alimentazione del modulo è un lavoro elettrico.',
				],
				[
					'Tempo',
					'Contate mezza giornata se il manuale è chiaro e Home Assistant risponde già. Non è una durata cronometrata su un cantiere.',
				],
				[
					'Budget',
					'Stima catalogo: circa 8–62 € secondo il profilo (solo modulo, o con sensore di apertura e dongle Zigbee se serve). Il configuratore dettaglia l’elenco.',
				],
				[
					'Software',
					'Home Assistant e la sua integrazione Shelly per il caso seguito da questa pagina. L’app Shelly Smart Control se restate senza server. ESPHome per la variante a scheda nuda, in un’altra guida.',
				],
				[
					'Prerequisiti',
					'Una porta già motorizzata, un pulsante a parete che la muove, il Wi-Fi 2,4 GHz in garage e il manuale. Per il caso di questa pagina: Home Assistant già raggiungibile sulla rete locale.',
				],
				[
					'Rischi',
					'230 V nel carter. Schiacciamento se un comando parte a passaggio non sorvegliato. Non ponticellare mai le fotocellule. Non aprire la porta 8123 su Internet. Non chiudere la porta con un’automazione oraria.',
				],
			],
		},
		h2('tre-casi', 'Tre casi', 'Tre modi per arrivare allo stesso impulso'),
		p(
			'Il gesto è lo stesso: un contatto che si chiude per un attimo sull’ingresso del pulsante. Cambia ciò che possedete già. I passi più sotto seguono il primo caso: Home Assistant è già in funzione, una porta, morsetti del pulsante nel manuale.',
		),
		{
			type: 'sit',
			current: true,
			title: 'Caso A — Home Assistant è già in funzione',
			parts: [
				'Non comprate un secondo server. Lo Shelly 1 Mini Gen3 invia l’impulso in Wi-Fi. Il sensore SONOFF SNZB-04P è Zigbee: dice se la porta è aperta. La chiavetta è solo per chi non ha ancora un coordinatore. « Contatto pulito » significa che il manuale mostra i morsetti del pulsante. Lo stesso cablaggio ha una regola in più: questo ingresso non accetta la rete.',
			],
		},
		{
			type: 'sit',
			title: 'Caso B — Flashate una scheda ESP32',
			parts: [
				'Una ESP32, un modulo relè il cui contatto pulito si comanda a 3,3 V e un reed filare sostituiscono lo Shelly. I 230 V del motore non si collegano nemmeno su quel relè. I passi di questa pagina descrivono lo Shelly. Il flash, i pin GPIO e lo YAML provato con ESPHome sono nel ',
				link('tutorial porta garage ESPHome', esp),
				'. Home Assistant non è un acquisto in più in quella lista: senza di lui la scheda non ha la schermata descritta più avanti.',
			],
		},
		{
			type: 'sit',
			title: 'Caso C — Basta l’app Shelly',
			parts: [
				'Niente Home Assistant. L’app invia l’impulso, a condizione di aver regolato lo spegnimento automatico dell’uscita. Questo caso non ha un sensore di stato: l’app non prova che il manto si sia mosso. Il pulsante a parete resta il modo di verificare sul posto.',
			],
		},
		h3('Che cosa cambia il numero di porte'),
		{
			type: 'table',
			headers: ['Scelta', 'Effetto'],
			rows: [
				['Una porta', 'Un relè. Un sensore di stato nel caso A, dopo la misura del gioco.'],
				['Più porte', 'Un relè per motorizzazione e un sensore per porta. Coordinatore e Home Assistant restano unici.'],
				['Il manuale mostra la coppia del pulsante', 'È il caso dei passi.'],
				['L’ingresso è solo a contatto pulito', 'Stesso cablaggio. L e N del modulo non vanno lì.'],
			],
		},
		{
			type: 'config',
			noscript: 'Senza JavaScript, i pulsanti non aggiornano l’elenco materiale. I tre casi sopra restano validi.',
		},
		p(
			'La pagina prodotto dello Shelly 1 Mini Gen3 è quella ufficiale. I prezzi di catalogo compaiono nel configuratore; i link Amazon sono ricerche per nome e non garantiscono il modello esatto né la disponibilità. Misurate il gioco della porta prima di ordinare lo SNZB-04P. La ricerca dello ZBDongle-E vale solo per una casa che non ha ancora un coordinatore Zigbee.',
		),
		p(
			link('Shelly 1 Mini Gen3, pagina ufficiale', SHELLY_PRODUCT),
			' · ',
			link('Cercare su Amazon.it', marketSearch('it', 'Shelly 1 Mini Gen3'), true),
			'. Sensore: ',
			link('SONOFF SNZB-04P su Amazon.it', marketSearch('it', 'SONOFF SNZB-04P'), true),
			'. Coordinatore solo se manca: ',
			link('SONOFF ZBDongle-E su Amazon.it', marketSearch('it', 'SONOFF ZBDongle-E'), true),
			'.',
		),
		h2('percorso', 'Il percorso', 'Come l’ordine arriva alla porta'),
		p(
			'Tenete una frase: il telefono chiede, Home Assistant chiama lo Shelly, lo Shelly imita il pulsante. Fotocellule e scheda motore decidono ancora se il manto può muoversi. Il sensore Zigbee riporta solo uno stato. Non è nel circuito del pulsante.',
		),
		{
			type: 'schema',
			caption: 'Solo il principio. In verde, l’ordine e lo stato. In arancione, l’alimentazione del modulo, che non va sul pulsante.',
			title: 'Comando di una porta garage a contatto pulito',
			desc: 'Il telefono raggiunge Home Assistant. Home Assistant comanda lo Shelly. I morsetti I e O dello Shelly sono in parallelo al pulsante della motorizzazione. L e N alimentano solo lo Shelly. Il sensore Zigbee riporta aperto o chiuso a Home Assistant e non comanda il motore.',
			phoneTitle: '1. Telefono',
			phoneLine: 'Richiesta confermata. Non guida il motore.',
			net: 'rete locale',
			haTitle: '2. Home Assistant',
			haLine: 'Già presente. Script di impulso.',
			wifi: 'Wi-Fi 2,4 GHz',
			shellyTitle: '3. Shelly 1 Mini Gen3',
			shellyA: 'I e O: contatto pulito, impulso',
			shellyB: 'L e N: alimentazione a parte',
			ioOnly: 'solo I e O',
			btnTitle: '4. Morsetti del pulsante',
			btnA: 'In parallelo al pulsante',
			btnB: 'I nomi sono nel manuale',
			motorTitle: '5. Motorizzazione originale',
			motorA: 'Motore, finecorsa, fotocellule',
			motorB: 'Telecomando invariato',
			powerTitle: 'Alimentazione del modulo, a parte',
			powerLine: '6. 110–240 V solo su L e N',
			sensorTitle: '7. Sensore Zigbee',
			sensorA: 'Al coordinatore, poi a HA',
			sensorB: 'Dice aperto o chiuso',
			sensorC: 'Non comanda il motore',
		},
		p(
			'Il Wi-Fi porta solo l’ordine verso lo Shelly, e la pagina di Home Assistant verso il telefono. I due fili I e O non portano la rete del modulo: riproducono il contatto del pulsante. Il sensore, a tratteggio, torna dal coordinatore Zigbee già collegato al server, o da quello che aggiungete se non ce n’è. Gli altri apparecchi Zigbee della casa restano su questo stesso coordinatore.',
		),
		p(
			'Scegliete un coordinatore solo se non ne avete uno: ',
			link('quale chiavetta Zigbee', dongle),
			', poi ',
			link('ZHA o Zigbee2MQTT', zha),
			'. Lo Shelly non usa questa chiavetta.',
		),
		h2('materiale', 'Materiale', 'Quale materiale per il caso di questa pagina'),
		p(
			'Lo Shelly 1 Mini Gen3 è un modulo piccolo. I morsetti si seguono: I e O sono il contatto pulito, L e N alimentano il modulo, SW non riceve il pulsante della porta.',
		),
		p(
			'Il sensore di stato è un magnete e un corpo. I due riferimenti devono guardarsi. Il manuale Sonoff chiede al massimo 20 mm a porta chiusa, e un uso in interni. Se dovete allontanare i due pezzi per incollarli su questa porta, non è il sensore giusto per lei.',
		),
		{
			type: 'table',
			headers: ['Bisogno', 'Scelta di questa guida', 'Limite'],
			rows: [
				[
					'Dare l’impulso',
					'Shelly 1 Mini Gen3, contatto pulito, Wi-Fi 2,4 GHz',
					'Alimentazione solo 110–240 V. Ambiente da −20 °C a 40 °C, umidità dal 30 al 70 % sulla pagina Shelly.',
				],
				[
					'Sapere se è chiusa',
					'SONOFF SNZB-04P, Zigbee 3.0, pila CR2477',
					'Gioco 20 mm. Interni. Inutile comprarne uno se la misura non passa.',
				],
				[
					'Collegare il sensore',
					'Il coordinatore già installato, altrimenti uno ZBDongle-E',
					'Una seconda chiavetta accanto alla prima non fa meglio. Crea un’altra rete.',
				],
				['Restare senza server', 'Lo stesso Shelly, nella sua app', 'Niente stato affidabile, niente storico Home Assistant.'],
				[
					'Fare tutto in ESPHome',
					'ESP32, relè 3,3 V a contatto pulito, reed filare',
					'Il dettaglio è il tutorial ESPHome, non una seconda lista improvvisata qui.',
				],
			],
		},
		p(
			'Anche lo Shelly Plus 1 ha un contatto pulito, e la sua scheda accetta in più un’alimentazione a 12 V, che il Mini Gen3 rifiuta. Questi passi cablano il Mini Gen3, perché è il modulo della lista. Non si mescolano le morsettiere dei due modelli. Un’alimentazione a 12 V « presa dalla scheda motore » non si tenta senza il manuale di quella scheda.',
		),
		h2('passi', 'Passo per passo', 'Collegare e provare, passo per passo'),
		p(
			'I nove passi descrivono il caso A: Home Assistant già presente, una porta, morsetti del pulsante. Seguiteli nell’ordine. Se l’osservazione attesa non arriva, passate alla risoluzione prima di continuare. La zona sotto la porta resta libera a ogni prova.',
		),
		{ type: 'steps' },
		h3('Fotocellule: restano padrone della corsa'),
		p(
			'La spia in fondo a una fotocellula indica in genere che il fascio passa. Se è spenta, o se la porta rifiuta di scendere, pulite le ottiche e riallineatele. Non ponticellate i fili per « finire la prova dello Shelly ».',
		),
		{
			type: 'photo',
			src: CELL_PHOTO,
			width: 1600,
			height: 1100,
			alt: 'Fotocellula nera fissata sul montante di una porta garage, spia rossa accesa.',
			caption: [
				'Fotocellula in basso sul montante. Resta collegata com’era. Foto: ',
				link('Jud McCranie', CELL_CREDIT),
				', ',
				link('CC BY-SA 4.0', CC_BY_SA),
				'.',
			],
		},
		h3('Esempi Home Assistant, da personalizzare'),
		p(
			'Create prima lo script nell’editor visuale: accendere l’interruttore dello Shelly, attendere mezzo secondo, spegnerlo. Lo YAML dice la stessa cosa. Sostituite ',
			{ code: 'switch.sostituire_shelly' },
			' con l’identificativo letto negli Strumenti per sviluppatori. La modalità ',
			{ code: 'single' },
			' ignora una seconda chiamata finché la prima non è finita.',
		),
		{ type: 'pre', code: PULSE },
		p(
			'Il modello di porta invia l’ordine di apertura solo se il sensore è « off », e l’ordine di chiusura solo se è « on ». Adattate queste due condizioni se il vostro sensore è invertito. ',
			{ code: 'script.impulso_porta_garage' },
			' deve essere l’identificativo reale dello script. Se la vostra versione rifiuta questo blocco, ricreate la porta nell’editor invece di forzare il file. Non è stato eseguito su un’installazione del sito.',
		),
		{ type: 'pre', code: COVER },
		p(
			'Scheda di plancia, con conferma. L’entità ',
			{ code: 'cover' },
			' è quella creata sopra, non l’interruttore nudo dello Shelly.',
		),
		{ type: 'pre', code: CARD },
		p(
			'Notifica se il sensore resta aperto. Non c’è alcuna azione sullo Shelly. Sostituite ',
			{ code: 'notify.notify' },
			' con il servizio di notifica del vostro telefono, visibile negli Strumenti per sviluppatori.',
		),
		{ type: 'pre', code: ALERT },
		p(
			'Documentazione usata: ',
			link('integrazione Shelly', HA_SHELLY),
			', ',
			link('modelli', HA_TEMPLATE),
			', ',
			link('azioni delle schede e conferma', HA_ACTIONS),
			'.',
		),
		h2('verifica', 'Verifica', 'Verificare che l’insieme tenga'),
		{
			type: 'ul',
			items: [
				'Il pulsante a parete apre, ferma e richiude, come prima del lavoro.',
				'Anche il telecomando originale.',
				'Un ostacolo nel fascio delle fotocellule impedisce ancora la chiusura, o rimanda la porta, come dice il manuale.',
				'Un impulso Shelly, passaggio libero, fa lo stesso effetto di una pressione breve sul pulsante.',
				'Il relè non resta chiuso: si sente un clic breve, non un mantenimento.',
				'Il sensore, se è posato, passa a chiuso solo quando la porta è completamente chiusa.',
				'Annullare la conferma sul telefono non fa muovere la porta.',
				'La notifica « rimasta aperta » parte senza accendere l’interruttore dello Shelly.',
				'Dopo aver aperto e richiuso l’interruttore, la porta non parte da sola.',
				'La porta 8123 non è inoltrata verso Internet.',
			],
		},
		h2('guasti', 'Guasti', 'Quando non funziona'),
		h3('La porta non si muove, il relè scatta'),
		p(
			'I e O non sono sui morsetti del pulsante, o l’impulso è troppo corto per questa scheda. Riaprite l’interruttore, riprendete foto e manuale, e non « provate » un morsetto di lampada o di motore. Se il pulsante a parete funziona ancora, lo Shelly è semplicemente accanto alla coppia di viti sbagliata. Solo dopo, alzate il temporizzatore verso un secondo.',
		),
		h3('La porta parte e si ferma subito'),
		p(
			'L’impulso dura troppo. La scheda lo legge come due pressioni: partenza, poi stop. Riportate lo spegnimento automatico verso 0,5 s. Anche lo script di Home Assistant non deve richiamare lo Shelly subito dopo.',
		),
		h3('Il pulsante a parete non funziona più'),
		p(
			'I fili del pulsante sono stati spostati, oppure I e O sono in cortocircuito permanente. Togliete tensione. A riposo il relè deve lasciare I e O aperti. Il pulsante a parete torna sui suoi due morsetti d’origine, lo Shelly solo in parallelo.',
		),
		h3('Lo Shelly non compare nell’app'),
		p(
			'Wi-Fi solo a 5 GHz, rete ospiti, o garage troppo lontano dal punto di accesso. Il modulo vuole il 2,4 GHz, sulla stessa rete del telefono che lo configura. Aprite l’indirizzo IP dello Shelly dal garage prima di riavvitare il carter. Una prenotazione DHCP evita che gli venga dato un altro indirizzo dopo un riavvio del router.',
		),
		h3('Home Assistant vede lo Shelly, non la porta'),
		p(
			'È normale finché il modello di porta non esiste. L’integrazione Shelly espone un interruttore. La porta a schermo viene dal modello, che si appoggia al sensore. Se il sensore non è disponibile, il modello deve rifiutare gli ordini invece di inviare un impulso alla cieca.',
		),
		h3('Il sensore resta « aperto » a porta chiusa'),
		p(
			'Il gioco supera i 20 mm, i riferimenti non si guardano, o il magnete è su una parte del manto che si allontana in posizione chiusa. Rimisurate. Spostare il corpo di qualche centimetro basta spesso. Se non esiste nessun punto a 20 mm o meno, togliete questo sensore dalla lista: non darà uno stato utile, e non è un difetto dello Shelly.',
		),
		h3('La porta si muove quando cambia il sensore'),
		p(
			'Un’automazione comanda lo Shelly o la porta su un cambio di stato. Aprite Impostazioni, Automazioni, e cercate un innesco su questo sensore la cui azione non sia una semplice notifica. Disattivatela. Il sensore informa. Non pilota.',
		),
		h3('Niente risponde dopo un’interruzione di corrente'),
		p(
			'Al ritorno della rete il relè deve restare aperto. Lo spegnimento automatico e lo script che spegne l’interruttore vanno in questo senso. Se la porta parte al riarmo, il contatto è mantenuto: non riprovate in ciclo, togliete tensione e verificate che I e O non siano ponticellati da un filo dimenticato.',
		),
		h2('oltre', 'Oltre', 'Andare oltre, quando la base funziona'),
		p(
			'Un secondo telefono si aggiunge come utente Home Assistant, senza diritti di amministratore, con la stessa conferma sulla scheda. Non è una condivisione della password dell’account principale. L’accesso fuori casa passa da ',
			link('l’accesso remoto di Home Assistant', HA_REMOTE),
			': Nabu Casa, WireGuard o Tailscale, non da una porta aperta.',
		),
		p(
			'La variante ESP32 riprende la stessa logica di impulso e di reed, con pin da scegliere nello YAML. Il file già pubblicato sul sito forza il relè a riposo all’avvio, e apre solo se il reed dice la porta chiusa. È spiegato nel ',
			link('tutorial ESPHome', esp),
			'. Non copiate i suoi numeri di pin sullo Shelly: lo Shelly non ha quei GPIO.',
		),
		p(
			'Un cancello a battente o scorrevole è una motorizzazione a parte, e solo se il suo manuale ha anch’esso una coppia per il pulsante. Le fotocellule di un cancello su strada contano ancora di più: il comando a distanza non le dispensa.',
		),
		h2('domande', 'Domande', 'Domande frequenti'),
		{ type: 'faq' },
		h2('fonti', 'Fonti', 'Per continuare'),
		{
			type: 'sources',
			items: [
				{ href: SHELLY_PRODUCT, text: 'Scheda Shelly 1 Mini Gen3', note: ': contatto pulito, alimentazione 110–240 V, limiti di ambiente' },
				{ href: SONOFF_SNZB, text: 'Manuale SONOFF SNZB-04P', note: ': Zigbee 3.0, gioco di 20 mm, interni' },
				{ href: AQARA_P2, text: 'Aqara Door and Window Sensor P2', note: ': Thread e Matter, non un sensore Zigbee' },
				{ href: HA_SHELLY, text: 'Home Assistant, integrazione Shelly' },
				{ href: HA_TEMPLATE, text: 'Home Assistant, modelli' },
				{ href: HA_REMOTE, text: 'Accesso remoto Home Assistant' },
				{ href: esp, text: 'La stessa porta, in ESPHome' },
				{ href: dongle, text: 'Chiavetta Zigbee' },
				{ href: zha, text: 'ZHA o Zigbee2MQTT' },
			],
		},
	],
};
