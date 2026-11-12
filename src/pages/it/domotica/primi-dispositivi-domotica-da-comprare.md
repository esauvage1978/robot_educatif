---
layout: ../../../layouts/ItPost.astro
title: "Primi dispositivi domotica da comprare"
description: "Cosa mettere nel primo carrello di domotica? Kit di partenza per obiettivo e per budget: sensori, prese, lampadine, valvole per termosifone, chiavetta Zigbee e piccoli accessori."
updated: "30 ottobre 2026"
faqSchema:
  - question: "Zigbee o Wi-Fi per il primo acquisto?"
    answer: "Il Wi-Fi permette di provare senza box, con un'app per marca. Zigbee diventa più interessante quando avete un box e volete sensori a pila e automazioni che restano in casa. I dettagli sono nella nostra pagina sui protocolli."
  - question: "Quanti ripetitori Zigbee devo prevedere?"
    answer: "Come riferimento, una presa o una lampadina Zigbee alimentata dalla rete ogni otto-dieci metri spesso aiuta, e ne servono di più se i muri sono spessi. Più che una regola già pronta, misurate la qualità del collegamento radio nella vostra app (ZHA o Zigbee2MQTT, i due strumenti che gestiscono Zigbee in Home Assistant)."
  - question: "Posso mescolare Sonoff, Aqara e IKEA?"
    answer: "Spesso sì con Zigbee e Home Assistant, ma ogni dispositivo ha le sue piccole particolarità (metodo di associazione, pila, comportamenti propri). La tabella di compatibilità e gli elenchi dei dispositivi di ZHA e Zigbee2MQTT aiutano a verificare."
  - question: "Dove vedo le automazioni con questo materiale?"
    answer: "Nelle nostre prime automazioni. Per riprendere il filo generale, tornate alla guida completa per iniziare."
---

Comprare «un po' di tutto» è il modo più rapido per scoraggiarsi: ci si ritrova con cinque app, dispositivi che non si parlano e nessuna regola davvero utile. Il metodo giusto è partire da ciò che volete ottenere, poi scegliere pochi oggetti.

Questa pagina propone kit di partenza per obiettivo (comfort, risparmio, sicurezza, luce, riscaldamento) e per budget. Troverete anche i piccoli accessori che tutti dimenticano: la prolunga USB, le pile, l'alimentatore giusto. Alla fine saprete cosa mettere nel carrello e cosa lasciare da parte per ora.

![Una presa smart, una telecamera girevole, un rilevatore di movimento, una lampadina e un altro piccolo box bianco appoggiati insieme su fondo chiaro](/images/debutant/smart-home-devices.webp)

*Gli oggetti di un primo kit di domotica: presa smart, telecamera, rilevatore di movimento e lampadina. Ognuno risponde a un bisogno diverso (misurare, sorvegliare, rilevare, illuminare), il che evita di comprare più volte la stessa cosa. Foto: Jakub Zerdzicki, Pexels, licenza libera.*

## Per approfondire

- [Quale box domotica per principianti](/it/domotica/quale-box-domotica-per-principianti/)
- [Scegliere la chiavetta Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/)
- [Sensori di temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/)
- [Prese smart](/it/domotica/prese-smart/)
- [Prime automazioni](/it/domotica/prime-automazioni-domotica/)

## Quanto prevedere per cominciare?

Una parola sul vocabolario prima di guardare i budget. Zigbee è una radio a basso consumo, perfetta per i sensori a pila. Perché il vostro box la capisca, gli si collega una piccola chiavetta USB, chiamata chiavetta Zigbee o dongle. Quanto a Home Assistant, è il software gratuito che riunisce tutti i vostri dispositivi in un'unica app.

| Il vostro budget iniziale | Cosa potete fare |
|---|---|
| Molto piccolo | Una o due prese Wi-Fi che misurano il consumo, e magari una lampadina smart. Non serve alcun box centrale. |
| Medio | Un box centrale già scelto (o un Raspberry Pi, un piccolo computer grande come una carta di credito), più una chiavetta Zigbee, due o tre sensori e una presa Zigbee alimentata dalla rete che farà anche da ripetitore. |
| Più ampio | La stessa base, con in più valvole per termosifone, un rilevatore di presenza o una telecamera, secondo l'obiettivo. |

Prima di comprare, verificate sempre che un dispositivo sia riconosciuto dal vostro box, consultando la [tabella di compatibilità](/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/) e la pagina [quale box scegliere](/it/domotica/quale-box-domotica-per-principianti/).

## I piccoli accessori che si dimenticano

Una breve prolunga USB serve ad allontanare la chiavetta Zigbee dal router. Entrambi usano la stessa frequenza radio e possono disturbarsi; spesso bastano poche decine di centimetri per risolvere il problema.

Se scegliete un Raspberry Pi 5, serve un alimentatore abbastanza potente: il nostro tutorial per [installare Home Assistant](/it/domotica/installare-home-assistant-raspberry-pi-5/) precisa quale.

Prevedete anche pile del formato giusto. I sensori usano spesso pile a bottone di tipo CR2032 o CR2450: controllate la scheda prodotto.

Una presa Zigbee alimentata dalla rete fa doppio lavoro: comanda un apparecchio e ripete nello stesso tempo il segnale degli altri sensori. Si chiama allora router Zigbee.

Infine, qualsiasi modulo da incasso nel muro o collegato al comando di un termosifone deve essere installato da un elettricista se non siete qualificati.

## Kit in base all'obiettivo

### Per comfort e temperatura

Un sensore Zigbee di temperatura e umidità, come il SONOFF SNZB-02D (vedete la nostra [guida ai sensori di temperatura](/it/domotica/sensore-temperatura-zigbee/)), dà una prima visione della casa. Potete aggiungere una presa per una stufetta, ma solo se potenza e sicurezza lo permettono. Un avviso del tipo «ci sono meno di 16 gradi in soggiorno» è un ottimo primo esempio: vedete le [prime automazioni](/it/domotica/prime-automazioni-domotica/).

### Per risparmiare energia

Le prese con misura della potenza mostrano quanto consuma ciascun apparecchio. La presa Wi-Fi Tapo P110 ne è un esempio, così come le prese Zigbee di varie marche ([guida alle prese](/it/domotica/prese-smart/)). In seguito potrete seguire il contatore elettrico di casa con un modulo adatto, a seconda di ciò che offrono i contatori del vostro paese.

### Per la sicurezza, versione leggera

Un sensore di apertura sulla porta d'ingresso e un rilevatore di movimento nel corridoio bastano per cominciare. Il vostro box può inviare una notifica sul telefono, senza una centrale d'allarme professionale.

### Per l'illuminazione

Basta una lampadina smart, o una presa a cui collegate una lampada già in casa. Aggiungete un rilevatore di movimento perché la luce si accenda quando passate. Evitate di comprare dieci marche Wi-Fi diverse: ognuna avrà la sua app.

### Per il riscaldamento, stanza per stanza

Scegliete valvole termostatiche (piccole teste che si avvitano al termosifone) in Zigbee o in Matter, un linguaggio comune a più marche, e controllate bene che il raccordo della valvola corrisponda al vostro termosifone. Un sensore di temperatura messo altrove nella stanza aiuta se la valvola è in una posizione sfavorevole.

### Se siete in affitto

Prese, sensori a pila, pulsanti e teste termostatiche che si tolgono senza lasciare tracce: la pagina sulla [domotica in affitto](/it/domotica/domotica-in-affitto-senza-lavori/) descrive le opzioni.

## Kit in base al budget

Le descrizioni qui sotto mostrano come si presenta un primo mese di prova, non dei prezzi. I prezzi cambiano da un negozio all'altro e da un paese all'altro: verificateli presso il venditore prima di comprare.

### Senza box: per scoprire

Due prese Wi-Fi che misurano il consumo, ed eventualmente una lampadina smart. La spesa è contenuta, ma dipende da marche e confezioni: confermatela presso il venditore.

### Con Home Assistant: la base Zigbee

Vi serve un cervello: il box [Home Assistant Green](/it/domotica/home-assistant-green-vs-raspberry-pi-5/) o un [Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/). Poi una chiavetta Zigbee ([confronto delle chiavette](/it/domotica/miglior-chiavetta-zigbee-home-assistant/)), un sensore di temperatura, un sensore di apertura e una presa Zigbee.

La SONOFF ZBDongle-E è un coordinatore USB che funziona con ZHA o Zigbee2MQTT e ha un'antenna esterna. Il SONOFF SNZB-02D misura temperatura e umidità, ha un piccolo schermo e funziona a pila. La TP-Link Tapo P110 è una presa Wi-Fi che misura il consumo e, all'inizio, si può usare senza box. Ricerche su Amazon.it, per verificare il prezzo aggiornato e il modello:

- [Home Assistant Green](https://www.amazon.it/s?k=Home+Assistant+Green&tag=roboteducat0f-21)
- [SONOFF ZBDongle-E](https://www.amazon.it/s?k=SONOFF+ZBDongle-E&tag=roboteducat0f-21)
- [SONOFF SNZB-02D](https://www.amazon.it/s?k=SONOFF+SNZB-02D&tag=roboteducat0f-21)
- [TP-Link Tapo P110](https://www.amazon.it/s?k=TP-Link+Tapo+P110&tag=roboteducat0f-21)

### Con Homey

Prendete un Homey Pro o Pro mini (vedete il nostro articolo su [Homey Pro mini](/it/domotica/test-homey-pro-mini-unboxing-installazione/)), poi gli stessi tipi di dispositivi di cui sopra. Per ogni dispositivo, verificate che compaia nell'app Homey prima di comprarlo.

## Cosa è meglio non comprare per primo

Cinque telecamere connesse prima di un solo sensore utile non vi daranno nulla. Evitate anche i moduli da incasso se siete in affitto o poco a vostro agio con l'elettricità, e gli accessori di comando propri di ogni marca quando una chiavetta Zigbee e un solo software spesso bastano. Stessa prudenza con i dispositivi a 433 MHz (vecchie radio da telecomando) quando non sapete se il vostro box li riceve.

Se avete un progetto preciso (garage, tapparelle...), scegliete il materiale in base alla [guida ai protocolli](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/). E se avete voglia di costruire voi stessi alcuni sensori, guardate i [progetti ESP32](/it/domotica/progetti-esp32-domotica/).

## Domande frequenti

**Zigbee o Wi-Fi per il primo acquisto?**
Il Wi-Fi permette di provare senza box, con un'app per marca. Zigbee diventa più interessante quando avete un box e volete sensori a pila e automazioni che restano in casa. Dettagli nella nostra pagina sui [protocolli](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/).

**Quanti ripetitori Zigbee devo prevedere?**
Come riferimento, una presa o una lampadina Zigbee alimentata dalla rete ogni otto-dieci metri spesso aiuta, e ne servono di più se i muri sono spessi. Più che una regola già pronta, misurate la qualità del collegamento radio nella vostra app (ZHA o Zigbee2MQTT, i due strumenti che gestiscono Zigbee in Home Assistant).

**Posso mescolare Sonoff, Aqara e IKEA?**
Spesso sì con Zigbee e Home Assistant, ma ogni dispositivo ha le sue piccole particolarità (metodo di associazione, pila, comportamenti propri). La [tabella di compatibilità](/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/) e gli elenchi dei dispositivi di ZHA e Zigbee2MQTT aiutano a verificare.

**Dove vedo le automazioni con questo materiale?**
Nelle nostre [prime automazioni](/it/domotica/prime-automazioni-domotica/). Per riprendere il filo generale, tornate alla [guida completa per iniziare](/it/domotica/iniziare-domotica-guida-completa/).

---

*Informativa sull'affiliazione: i link Amazon.it riportano l'identificativo del sito (roboteducat0f-21). Se acquistate tramite questi link, può essere riconosciuta una commissione, senza costi aggiuntivi per voi. Verificate i prezzi presso il venditore. Autore: Emmanuel Sauvage.*
