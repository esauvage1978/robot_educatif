---
layout: ../../../layouts/ItPost.astro
title: "Iniziare la domotica: guida completa"
description: "Siete alle prime armi con la domotica? Questa guida spiega in ordine cosa decidere, comprare e configurare perché la casa reagisca da sola, con parole semplici."
updated: "30 ottobre 2026"
faqSchema:
  - question: "Da dove iniziare se ho solo un'ora?"
    answer: "Leggete i passi 1 e 2, scegliete un solo obiettivo, poi passate al percorso breve per iniziare. Soprattutto, non comprate cinque marche Wi-Fi diverse il primo giorno: vi ritrovereste con cinque app da gestire."
  - question: "Devo per forza usare Home Assistant?"
    answer: "No. Per due prese e una lampadina possono bastare l'app del produttore o Matter (un linguaggio comune capito da molte marche). Home Assistant, o Homey, diventa utile quando volete che i dispositivi agiscano insieme e continuino a funzionare anche senza internet."
  - question: "Funziona tutto se cade internet?"
    answer: "I dispositivi gestiti in locale continuano a funzionare: sensori Zigbee, centralina locale, automazioni. Tutto ciò che passa dai server di un produttore (il cloud) si ferma, come il comando vocale. I dettagli sono nella pagina sugli errori dei principianti."
  - question: "Dove trovo il significato di una parola tecnica che non capisco?"
    answer: "Nel glossario della domotica. Ogni termine è spiegato in una o due frasi, con un esempio preso da una casa vera."
---

Vorreste che la casa si occupasse di piccole cose al posto vostro: abbassare il riscaldamento quando una finestra resta aperta, accendere il corridoio di notte, avvisarvi quando si apre la porta. È esattamente ciò che fa la domotica: oggetti connessi che reagiscono da soli, secondo regole che scegliete voi.

Questa guida vi accompagna passo dopo passo. Alla fine saprete da cosa cominciare, cosa comprare per primo (e cosa lasciare sullo scaffale) e come creare la vostra prima regola automatica. Non serve conoscere il vocabolario: ogni parola tecnica è spiegata appena compare.

![Una mano che tiene uno smartphone con l'app di una serratura smart montata su una porta bianca](/images/debutant/living-room-tech.webp)

*Una serratura smart comandata dal telefono: è il primo riflesso della domotica, un oggetto di casa che si comanda a distanza o si programma. Foto: Sebastian Scholz (Nuki), licenza Unsplash.*

## Per approfondire

- [Quale box domotica per principianti](/it/domotica/quale-box-domotica-per-principianti/)
- [Come si parlano i vostri dispositivi: i protocolli spiegati semplicemente](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/)
- [I primi dispositivi da comprare](/it/domotica/primi-dispositivi-domotica-da-comprare/)
- [Glossario della domotica](/it/domotica/glossario-domotica/)
- [Le vostre prime automazioni](/it/domotica/prime-automazioni-domotica/)
- [Gli errori dei principianti e le risposte](/it/domotica/errori-principianti-domotica-faq/)
- [La versione breve: da dove iniziare](/it/domotica/come-iniziare/)

## L'essenziale in poche righe

Se volete automazioni che funzionano senza abbonamento, e anche quando internet è fuori uso, basta una base semplice. Si compone di tre elementi.

Il primo è un cervello. È Home Assistant, un software gratuito che riunisce tutti i vostri dispositivi in un'unica app. Gira su un piccolo box: o l'[Home Assistant Green](/it/domotica/home-assistant-green-vs-raspberry-pi-5/), un box pronto da collegare, oppure un Raspberry Pi 5, un piccolo computer grande come una carta di credito.

Il secondo è una chiavetta radio, detta anche dongle o coordinatore: una piccola chiavetta USB che permette al cervello di parlare con i sensori senza fili. Funziona con Zigbee, un linguaggio radio a basso consumo, perfetto per sensori che durano mesi con una sola pila. La nostra [guida alle chiavette Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/) vi aiuta a sceglierla.

Il terzo è una manciata di sensori e prese smart, scelti per un solo obiettivo: comfort, risparmio energetico o sicurezza.

Preferite non installare nulla da soli? Homey Pro mini è un box già pronto che riunisce più radio e si configura da un'app: vedete la nostra [prova con unboxing e installazione](/it/domotica/test-homey-pro-mini-unboxing-installazione/). E se siete in affitto, partite dal [percorso senza lavori](/it/domotica/domotica-in-affitto-senza-lavori/).

Ricerche di acquisto, per verificare il prezzo aggiornato e il modello per il vostro paese:

- [Home Assistant Green su Amazon.it](https://www.amazon.it/s?k=Home+Assistant+Green&tag=roboteducat0f-21)
- [Homey Pro mini su Amazon.it](https://www.amazon.it/s?k=Homey+Pro+mini&tag=roboteducat0f-21)
- [SONOFF ZBDongle-E su Amazon.it](https://www.amazon.it/s?k=SONOFF+ZBDongle-E&tag=roboteducat0f-21)

## Passo 1: sapere cosa volete davvero

Prima di comprare qualsiasi cosa, scrivete una sola frase. Per esempio: «Voglio abbassare il riscaldamento quando una finestra è aperta» oppure «Voglio che la luce del corridoio si accenda di notte». Tutto il resto, la scelta della marca come quella dell'hardware, deriva da questa frase.

Tre domande aiutano a vederci chiaro.

| Domanda | Perché cambia tutto |
|---|---|
| Siete in affitto o proprietari? | Chi è in affitto evita di forare o di toccare l'impianto elettrico e si orienta su prese, sensori a pila e teste termostatiche da avvitare al termosifone. Un proprietario può anche installare moduli nascosti nei muri. |
| Vi piace smanettare o volete una soluzione già pronta? | Smanettare vuol dire installare un software su un Raspberry Pi o costruire un sensore con una scheda ESP32 (una piccola scheda elettronica programmabile, dotata di Wi-Fi). Già pronto vuol dire un box Home Assistant Green o Homey, pronto all'uso. |
| Che budget avete per iniziare? | Con poco, si parte dal Wi-Fi, senza box centrale. Con un po' di più, si prende subito un box e una chiavetta Zigbee. |

Una parola vi sfugge? Il [glossario](/it/domotica/glossario-domotica/) le spiega tutte, con un esempio. Le domande che non si osa fare («devo saper programmare?», «e se cade internet?») hanno la loro risposta nella pagina sugli [errori dei principianti](/it/domotica/errori-principianti-domotica-faq/).

## Passo 2: scegliere il direttore d'orchestra della casa (il box)

![Primo piano di diverse schede elettroniche Raspberry Pi verdi con le loro porte USB e di rete](/images/debutant/raspberry-pi.webp)

*Alcuni Raspberry Pi visti da vicino. Questo piccolo computer può diventare il cervello della vostra casa non appena vi si installa Home Assistant. Foto: Craig Dennis, Pexels, licenza libera.*

Il box, detto anche hub o centralina, è il direttore d'orchestra. Riceve le informazioni dei sensori («la porta si è appena aperta») e avvia le azioni che avete previsto («accendi l'ingresso»).

Non siete obbligati a comprarne uno subito. Potete cominciare con le app di ogni produttore e riunire tutto più tardi, se vi viene voglia.

| Il vostro profilo | Cosa vi si addice di più |
|---|---|
| Volete risparmiare sul riscaldamento o seguire i consumi | Home Assistant, con sensori di temperatura e prese che misurano il consumo |
| Volete essere avvisati se succede qualcosa | Home Assistant o Homey, con sensori di apertura e di movimento |
| Volete solo comandare qualche lampada | Lampadine o prese Wi-Fi, senza box centrale, poi Home Assistant più avanti se serve |
| Siete in affitto | Prese, sensori a pila e teste termostatiche da avvitare al termosifone |
| Vi piace smanettare | Home Assistant su un Raspberry Pi o un mini PC, con schede [ESP32](/it/domotica/progetti-esp32-domotica/) |

Per ogni obiettivo, le fasce di budget e le trappole da evitare (come un abbonamento nascosto) si trovano nella pagina [quale box domotica per principianti](/it/domotica/quale-box-domotica-per-principianti/). Se volete confrontare i software stessi, leggete il nostro [confronto tra Home Assistant, Jeedom e Homey](/it/domotica/home-assistant-jeedom-homey-quale-sistema/).

L'Home Assistant Green è il modo più semplice per cominciare: Home Assistant è preinstallato, funziona in locale e non richiede un abbonamento obbligatorio. Verificate il prezzo aggiornato presso il venditore prima di comprare.

Preferite una centralina pronta all'uso, da configurare interamente con un'app? L'Homey Pro mini di Athom è l'alternativa più semplice. Parla di serie Zigbee, Thread e Matter (le lingue radio spiegate nel nostro [glossario](/it/domotica/glossario-domotica/)) e funziona in locale, anche se Internet cade. Z-Wave, Bluetooth e infrarossi richiedono l'Homey Bridge, venduto a parte; l'Homey Pro, più costoso, li ha integrati. Stiamo testando l'Homey Pro mini: guardate il nostro [unboxing e installazione passo passo](/it/domotica/test-homey-pro-mini-unboxing-installazione/). [Vedi il prezzo dell'Homey Pro mini su Amazon.it](https://www.amazon.it/s?k=Homey+Pro+mini&tag=roboteducat0f-21).

## Passo 3: capire come si parlano i vostri dispositivi

Ogni dispositivo connesso usa un linguaggio radio per scambiare messaggi con la casa. Questo linguaggio si chiama protocollo. I più comuni sono il Wi-Fi (quello del vostro router) e Zigbee, di cui abbiamo già parlato. Poi vengono Z-Wave, un cugino di Zigbee che usa un'altra frequenza radio, Thread, una rete a basso consumo, e Matter, un linguaggio comune che sempre più marche capiscono. Si incontrano anche il Bluetooth e i 433 MHz, una radio più vecchia che si trova su alcune vecchie tapparelle.

Questi linguaggi non sono intercambiabili. Si differenziano per portata, per fame di energia (un sensore a pila non può usare a lungo il Wi-Fi) e per l'hardware da aggiungere.

Tenete a mente soprattutto un'idea: con Zigbee, i dispositivi collegati a una presa di corrente fanno da ripetitori. Ognuno trasmette il messaggio del vicino, un po' come una catena di persone che si passano un secchio d'acqua. Si parla di rete mesh (a maglia). Più dispositivi alimentati dalla rete aggiungete, più la rete diventa solida.

Tre letture per approfondire:

- La guida [Zigbee, Wi-Fi, Thread e Matter spiegati semplicemente](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/), con una tabella da tenere a portata di mano.
- L'articolo [Matter, Thread, Zigbee, Wi-Fi: quale scelta nel 2027](/it/domotica/matter-thread-zigbee-wifi-quale-protocollo-2027/), per vedere dove va il mercato.
- La [tabella di compatibilità tra marche e box](/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/), per verificare che un dispositivo venga riconosciuto.

La nostra regola di partenza: Zigbee per i sensori a pila, Wi-Fi locale per prese e moduli alimentati dalla rete (per esempio quelli del marchio Shelly, che si comandano senza passare da internet) e Matter quando non volete dipendere da una sola marca.

## Passo 4: comprare i primi dispositivi, un kit e non un magazzino

Un buon kit di partenza è composto da pochi oggetti: una chiavetta Zigbee se scegliete questa radio, uno o due sensori, una o due prese e, volendo, una lampadina o una valvola per termosifone. La pagina [primi dispositivi da comprare](/it/domotica/primi-dispositivi-domotica-da-comprare/) propone kit per obiettivo e per budget, solo come fasce, senza prezzi fissi inventati.

La SONOFF ZBDongle-E è un coordinatore Zigbee USB che funziona con ZHA o Zigbee2MQTT, i due modi di collegare Zigbee a Home Assistant, e ha un vasto catalogo di sensori compatibili. Il coordinatore è la parte che dirige la rete Zigbee di casa. I prezzi variano da un negozio all'altro: verificateli presso il venditore prima di comprare.

## Passo 5: creare le prime automazioni

Un'automazione è una regola del tipo «se succede questo, allora fai quello». È composta da un attivatore (cosa succede), da condizioni facoltative (in quale caso) e da azioni (cosa fa la casa).

Esempio: quando il rilevatore del corridoio vede un movimento (attivatore) ed è buio (condizione), la luce si accende (azione).

La pagina [prime automazioni](/it/domotica/prime-automazioni-domotica/) presenta dieci idee concrete, dalla luce che si accende da sola all'avviso quando la lavatrice ha finito, per Home Assistant come per Homey.

## E poi?

Una volta messa a posto la base, ecco dove approfondire:

- Installare Home Assistant: il [tutorial per Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/), oppure il [confronto tra Green e Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/) se avete dubbi.
- Scegliere Homey: [Pro mini, unboxing e installazione](/it/domotica/test-homey-pro-mini-unboxing-installazione/).
- Costruire i propri sensori: i [progetti ESP32](/it/domotica/progetti-esp32-domotica/).
- Scegliere tra due modi di collegare Zigbee a Home Assistant: [Zigbee2MQTT o ZHA](/it/domotica/zigbee2mqtt-o-zha-home-assistant/).
- Sfogliare tutte le nostre guide per principianti: la [panoramica delle guide alla domotica](/it/domotica/).

## Domande frequenti

**Da dove iniziare se ho solo un'ora?**
Leggete i passi 1 e 2, scegliete un solo obiettivo, poi passate al [percorso breve](/it/domotica/come-iniziare/). Soprattutto, non comprate cinque marche Wi-Fi diverse il primo giorno: vi ritrovereste con cinque app da gestire.

**Devo per forza usare Home Assistant?**
No. Per due prese e una lampadina possono bastare l'app del produttore o Matter (un linguaggio comune capito da molte marche). Home Assistant, o Homey, diventa utile quando volete che i dispositivi agiscano insieme e continuino a funzionare anche senza internet.

**Funziona tutto se cade internet?**
I dispositivi gestiti in locale continuano a funzionare: sensori Zigbee, centralina locale, automazioni. Invece tutto ciò che passa dai server di un produttore (il cloud) si ferma, come il comando vocale. I dettagli sono nella pagina sugli [errori dei principianti](/it/domotica/errori-principianti-domotica-faq/).

**Dove trovo il significato di una parola tecnica che non capisco?**
Nel [glossario della domotica](/it/domotica/glossario-domotica/). Ogni termine è spiegato in una o due frasi, con un esempio preso da una casa vera.

---

*Informativa sull'affiliazione: i link Amazon.it riportano l'identificativo del sito (roboteducat0f-21). Se acquistate tramite questi link, può essere riconosciuta una commissione, senza costi aggiuntivi per voi. Verificate prezzi e disponibilità presso il venditore. Autore: Emmanuel Sauvage.*
