---
layout: ../../../layouts/ItPost.astro
title: "Glossario domotica: termini essenziali"
description: "Le parole della domotica spiegate semplicemente: box, hub, Zigbee, Matter, MQTT, ESPHome, automazione, Flow, OTA, mesh... ciascuna con un esempio concreto."
updated: "30 ottobre 2026"
faqSchema:
  - question: "Box, hub e gateway sono la stessa cosa?"
    answer: "Nel linguaggio comune, quasi. In dettaglio, il box (o hub) è il cervello della casa, mentre un gateway può essere solo un traduttore da un linguaggio radio a un altro."
  - question: "Serve conoscere MQTT per iniziare?"
    answer: "No. ZHA funziona senza MQTT. Questo sistema di messaggi diventa utile se scegliete Zigbee2MQTT o fate molti progetti fai-da-te."
  - question: "Dove ritrovo queste parole nel percorso?"
    answer: "Nella scelta del box, nei protocolli e nelle automazioni."
---

State leggendo un articolo sulla domotica e una parola vi blocca: una sigla, un termine inglese o il nome di una marca che nessuno ha spiegato? È normale. Questo settore ha preso l'abitudine di mescolare tutto.

Questo glossario serve a questo. Ogni termine è spiegato in una o due frasi, poi illustrato con un esempio preso da una casa vera. Potete scorrerlo lettera per lettera grazie all'indice, oppure tornarci quando una parola vi sfugge. Per le specifiche complete, fate riferimento ai documenti ufficiali dei produttori e degli enti di normazione (Connectivity Standards Alliance, Thread Group, Z-Wave Alliance).

## Per approfondire

- [Come si parlano i vostri dispositivi (protocolli)](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/)
- [Le vostre prime automazioni](/it/domotica/prime-automazioni-domotica/)
- [Errori dei principianti](/it/domotica/errori-principianti-domotica-faq/)
- [Quale box domotica per principianti](/it/domotica/quale-box-domotica-per-principianti/)

## Indice alfabetico

[4](#numeri) · [A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [M](#m) · [O](#o) · [R](#r) · [S](#s) · [T](#t) · [W](#w) · [Y](#y) · [Z](#z)

## 4

### <span id="numeri"></span>433 MHz

Una banda radio più vecchia usata da molte tapparelle, campanelli e prese telecomandate. Qualità e sicurezza variano molto.  
**Esempio:** una presa telecomandata di qualche anno fa che un ricevitore, o un Homey, sa ancora pilotare.

## A

### <span id="a"></span>Associazione (pairing)

Il passaggio in cui «presentate» un nuovo dispositivo al vostro box, perché lo riconosca. In inglese si dice pairing.  
**Esempio:** tenete premuto il pulsante di un sensore Zigbee finché il software annuncia «nuovo dispositivo trovato».

### Attivatore (trigger)

L'evento che avvia un'automazione. In inglese si dice trigger.  
**Esempio:** un sensore di apertura passa da «chiuso» ad «aperto».

### Automazione

Una regola del tipo «se succede questo, allora fai quello», a volte con condizioni aggiuntive. Vedete le nostre [prime automazioni](/it/domotica/prime-automazioni-domotica/).  
**Esempio:** se c'è movimento nel corridoio ed è buio, la luce si accende.

### Azione

Ciò che fa la casa quando un'automazione scatta: accendere una lampada, inviare una notifica, regolare il riscaldamento.  
**Esempio:** ricevete un messaggio «la lavatrice ha finito».

## B

### <span id="b"></span>Bluetooth Low Energy (BLE)

Una radio a corto raggio e a basso consumo presente negli smartwatch, in alcune serrature e in sensori vicini.  
**Esempio:** una serratura che si apre dal telefono quando siete davanti alla porta.

### Border router (router di bordo)

Un apparecchio che collega una rete Thread (vedi più sotto) alla vostra rete internet di casa, perché i dispositivi Thread possano essere comandati.  
**Esempio:** alcuni altoparlanti smart o box recenti integrano questa funzione.

### Box domotica

Il box, o la piccola macchina, che centralizza tutta la casa: riceve le informazioni dei sensori e avvia le automazioni. Si chiama anche hub. Vedete [quale box scegliere](/it/domotica/quale-box-domotica-per-principianti/).  
**Esempio:** Home Assistant Green o Homey Pro mini.

## C

### <span id="c"></span>Cloud e locale

Il **cloud** sono i server del produttore, su internet. Il **locale** è quando tutto avviene a casa vostra, tra i dispositivi e il box.  
**Esempio:** una presa che si comanda solo dall'app del produttore smette di rispondere se il servizio o la vostra connessione va giù; una presa gestita in locale continua a funzionare.

### Condizione

Un filtro che precisa in quale caso l'automazione deve agire: un orario, uno stato, una presenza.  
**Esempio:** accendere il termosifone solo tra le 6 e le 22.

### Controllo locale

Comandare un dispositivo senza dipendere dai server del produttore.  
**Esempio:** un modulo Shelly comandato direttamente dal suo indirizzo sulla vostra rete, o un sensore Zigbee gestito da ZHA.

### Coordinatore (Zigbee)

Il capo della rete Zigbee: accetta i dispositivi e organizza i loro scambi. In pratica, è quasi sempre una piccola chiavetta USB.  
**Esempio:** la chiavetta SONOFF ZBDongle-E collegata a un box Home Assistant.

## D

### <span id="d"></span>Dongle

Una piccola chiavetta USB che aggiunge una radio al vostro box (Zigbee, Z-Wave o Thread, per esempio).  
**Esempio:** la nostra guida alla [miglior chiavetta Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

## E

### <span id="e"></span>Entità

In Home Assistant, ogni informazione e ogni comando è un'entità: una temperatura, un interruttore, una luce. Ciascuna ha un nome tecnico.  
**Esempio:** `sensor.soggiorno_temperatura` è la temperatura del soggiorno.

### ESP32

Una piccola scheda elettronica programmabile, molto economica, dotata di Wi-Fi e Bluetooth. Permette di costruire da soli sensori o comandi.  
**Esempio:** un sensore di temperatura fatto in casa con una ESP32, vedete i nostri [progetti ESP32](/it/domotica/progetti-esp32-domotica/).

### ESPHome

Uno strumento gratuito per programmare schede come la ESP32 e farle riconoscere da Home Assistant, senza scrivere un vero programma.  
**Esempio:** [un sensore di temperatura ESP32 con ESPHome](/it/domotica/esp32-esphome-sensore-temperatura/).

## F

### <span id="f"></span>Flow (Homey)

Il modo in cui Homey costruisce un'automazione: si assemblano schede visive «Quando... E... Allora...».  
**Esempio:** quando una porta si apre, e il riscaldamento è acceso, allora invia una notifica.

## G

### <span id="g"></span>Gateway (passerella)

Un apparecchio o un software che traduce un linguaggio in un altro, per esempio dalla radio alla vostra rete internet, o dal cloud al locale.  
**Esempio:** Zigbee2MQTT fa da gateway tra Zigbee e MQTT.

### GPIO

I piccoli pin metallici di una scheda come il Raspberry Pi, su cui si collegano direttamente componenti elettronici (un LED, un sensore).  
**Esempio:** collegare un sensore di temperatura ai pin di un Raspberry Pi.

## H

### <span id="h"></span>Home Assistant

Un software gratuito che riunisce tutti i vostri dispositivi connessi in un'unica app e che funziona a casa vostra, senza abbonamento obbligatorio.  
**Esempio:** gira su un box Home Assistant Green o su un Raspberry Pi 5.

### Hub o bridge

Due parole spesso usate per indicare il box. Un bridge può anche essere un piccolo modulo che traduce un linguaggio radio in un altro.  
**Esempio:** il bridge Philips Hue traduce i comandi dell'app in ordini per le lampadine.

## I

### <span id="i"></span>Integrazione

Un modulo software che insegna al vostro box a parlare con una certa marca o tecnologia.  
**Esempio:** l'integrazione Matter di Home Assistant.

## M

### <span id="m"></span>Matter

Un linguaggio comune, creato da diverse grandi marche, che viaggia su Wi-Fi, Thread o cavo di rete. Permette a uno stesso dispositivo di essere capito da più sistemi.  
**Esempio:** una lampadina Matter visibile sia in Home Assistant sia in Google Home (a seconda della configurazione scelta).

### Mesh (rete a maglia)

Un'organizzazione in cui i dispositivi ripetono i messaggi dei vicini, come persone che si passano un secchio d'acqua. Zigbee, Z-Wave e Thread funzionano così.  
**Esempio:** una presa Zigbee nel corridoio trasmette il messaggio del sensore della camera. Vedete la pagina sui [protocolli](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/).

### MQTT

Un sistema di messaggi molto leggero, molto usato dagli smanettoni. Un dispositivo vi «pubblica» un'informazione sotto un indirizzo, e gli altri possono leggerla.  
**Esempio:** la temperatura del soggiorno è pubblicata sotto l'indirizzo `zigbee2mqtt/soggiorno_temp`.

## O

### <span id="o"></span>OTA (aggiornamento senza fili)

OTA significa «over the air». È un aggiornamento del software interno di un dispositivo, senza cavo.  
**Esempio:** [aggiornamenti OTA con ESPHome](/it/domotica/aggiornamenti-ota-esphome/).

## R

### <span id="r"></span>Raspberry Pi

Un piccolo computer grande come una carta di credito, molto usato per far girare Home Assistant.  
**Esempio:** il Raspberry Pi 5, con un alimentatore adatto e una scheda di memoria.

### Router Zigbee

Un dispositivo alimentato dalla rete che ripete i messaggi Zigbee degli altri: una presa, una lampadina.  
**Esempio:** una presa Zigbee a metà casa permette di raggiungere un sensore lontano.

## S

### <span id="s"></span>Scena

Un insieme di stati che si richiamano in un colpo solo: «serata film», «assenza».  
**Esempio:** spegnere tutte le luci e abbassare il riscaldamento con un solo gesto.

## T

### <span id="t"></span>Thread

Una rete mesh che consuma pochissima energia. Ha bisogno di un border router per essere collegata alla vostra rete internet di casa.  
**Esempio:** un sensore Matter che usa Thread come radio.

## W

### <span id="w"></span>Wi-Fi

La rete senza fili del vostro router. I dispositivi Wi-Fi vi si collegano direttamente, senza chiavetta aggiuntiva, ma consumano di più e raramente funzionano a pila.  
**Esempio:** una presa Tapo P110 si collega al Wi-Fi di casa.

## Y

### <span id="y"></span>YAML

Un formato di testo che serve a scrivere regole a mano, con rientri per segnare la struttura. Per cominciare se ne può fare a meno.  
**Esempio:** gli esempi delle [prime automazioni](/it/domotica/prime-automazioni-domotica/) mostrano un piccolo blocco YAML.

## Z

### <span id="z"></span>Z-Wave

Una radio mesh che funziona intorno agli 868 MHz in Europa (in altre regioni la frequenza cambia), quindi meno disturbata dal Wi-Fi.  
**Esempio:** un modulo Z-Wave per tapparelle, comandato da una chiavetta USB dedicata.

### ZHA

Il modo integrato in Home Assistant per gestire una rete Zigbee. Il nome viene da «Zigbee Home Automation».  
**Esempio:** per un confronto, vedete [ZHA o Zigbee2MQTT](/it/domotica/zigbee2mqtt-o-zha-home-assistant/).

### Zigbee

Una radio a basso consumo, perfetta per sensori che funzionano mesi a pila. Funziona a mesh e usa la banda dei 2,4 GHz.  
**Esempio:** il sensore SONOFF SNZB-02D, collegato a Home Assistant tramite una chiavetta USB.

### Zigbee2MQTT

Un altro modo di gestire Zigbee in Home Assistant: traduce i messaggi Zigbee in messaggi MQTT. È un'alternativa a ZHA.  
**Esempio:** il catalogo dei dispositivi compatibili è molto documentato dalla comunità.

## Domande frequenti

**Box, hub e gateway sono la stessa cosa?**
Nel linguaggio comune, quasi. In dettaglio, il box (o hub) è il cervello della casa, mentre un gateway può essere solo un traduttore da un linguaggio radio a un altro. Per riprendere il filo generale, vedete la [guida completa per iniziare](/it/domotica/iniziare-domotica-guida-completa/).

**Serve conoscere MQTT per iniziare?**
No. ZHA funziona senza MQTT. Questo sistema di messaggi diventa utile se scegliete Zigbee2MQTT o fate molti progetti fai-da-te.

**Dove ritrovo queste parole nel percorso?**
Nella [scelta del box](/it/domotica/quale-box-domotica-per-principianti/), nei [protocolli](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/) e nelle [automazioni](/it/domotica/prime-automazioni-domotica/).

---

*Autore: Emmanuel Sauvage. Questo glossario spiega le parole per iniziare; per i dettagli tecnici completi, fanno fede le specifiche degli enti di normazione (CSA, Thread Group, Z-Wave Alliance) e le documentazioni dei produttori.*
