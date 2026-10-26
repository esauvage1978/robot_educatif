---
layout: ../../../layouts/ItPost.astro
title: "Prese smart per Home Assistant in Italia: guida 2026"
description: "Come scegliere una presa smart per le case italiane (tipo L e Schuko, 230 V): Zigbee, Wi-Fi o Matter, misura dei consumi, marcatura e configurazione in Home Assistant."
updated: "24 ottobre 2026"
---

La presa smart è il primo dispositivo domotico più semplice da adottare, ma anche quello in cui **il paese conta di più**. Un modello per prese britanniche (tipo G) o americane (tipo A/B) è il prodotto sbagliato per una casa italiana. Questa guida spiega a cosa fare attenzione.

## 1. Le basi elettriche

| | Italia |
|---|---|
| Prese | tipo L (10 A e 16 A) e Schuko tipo F; molte prese recenti accettano entrambe le spine |
| Tensione | 230 V, 50 Hz |
| Carico | il carico nominale della presa smart è indicato sul dispositivo: controllatelo |
| Marcatura | CE |

**Controllate sempre il carico nominale** della presa prima di collegarci una stufetta o un bollitore, ed evitate di collegare più prese una dietro l'altra.

## 2. Zigbee, Wi-Fi o Matter?

| Tipo | Vantaggi | Svantaggi | Sceglietelo se |
|---|---|---|---|
| **Zigbee** | locale, consuma poco, fa da ripetitore nella rete mesh | serve un coordinatore Zigbee | usate Home Assistant con una [chiavetta Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/) |
| **Wi-Fi** | nessuna centralina, configurazione rapida con l'app | carica la rete Wi-Fi, spesso dipende dal cloud | state iniziando adesso |
| **Matter (su Wi-Fi o Thread)** | funziona con Apple Casa, Google Home, Alexa, SmartThings e Home Assistant | controllate il logo Matter e la versione sulla confezione | non volete legarvi a un produttore |

## 3. Cosa guardare nella scheda tecnica

- **Misura dei consumi** (W, kWh): utile per scovare i consumi in standby e per avvisarvi quando la lavatrice ha finito.
- **Carico nominale**: verificate sempre il valore dichiarato dal produttore e che la spina sia compatibile con le vostre prese.
- **Controllo locale**: funziona senza il cloud del produttore? Shelly, la maggior parte delle prese Zigbee e le prese Matter lo permettono.
- **Pulsante e LED sul dispositivo**: comodi per gli ospiti; controllate se il LED si può spegnere in camera da letto.

## 4. Esempio: le prese Shelly

Shelly vende le sue prese in **versioni per paese** (europea Schuko, UK, USA), con Wi-Fi, controllo locale e integrazione con Home Assistant. Scegliete la versione adatta nella [gamma di prese Shelly](https://www.shelly.com/collections/smart-plugs). Per l'illuminazione cablata nell'impianto, il relè [Shelly 1 Gen4](https://www.shelly.com/it/products/shelly-1-gen4) accetta **110–240 V AC** e commuta fino a **16 A a 240 V** ([Shelly Knowledge Base](https://kb.shelly.cloud/knowledge-base/shelly-1-gen4)). Si installa dietro un interruttore, ed è un lavoro da elettricista: confronto completo in [Shelly Gen4: quale modulo scegliere](/it/shelly-gen4-quale-modulo-scegliere/).

## 5. Aggiungere una presa a Home Assistant

1. **Presa Zigbee**: in Home Assistant aprite l'integrazione ZHA o Zigbee2MQTT, scegliete *Aggiungi dispositivo*, poi tenete premuto il pulsante della presa finché il LED lampeggia.
2. **Presa Wi-Fi**: collegatela alla rete con l'app del produttore, poi aggiungete l'integrazione corrispondente (Shelly viene rilevato automaticamente nella rete locale).
3. **Presa Matter**: inquadrate il codice QR Matter con l'app Home Assistant Companion.

## 6. Due automazioni utili

- **Lavatrice finita**: quando la potenza resta sotto pochi watt per due minuti, inviate una notifica al telefono.
- **Standby spento di notte**: spegnete l'angolo TV a mezzanotte e riaccendetelo alle 7.

Siete proprio all'inizio? Leggete [Domotica per principianti](/it/domotica/come-iniziare/).

[Tutte le guide alla domotica](/it/domotica/)
