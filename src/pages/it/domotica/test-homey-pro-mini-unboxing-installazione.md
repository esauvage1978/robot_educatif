---
layout: ../../../layouts/ItPost.astro
title: "Test Homey Pro mini: unboxing e installazione (parte 1)"
description: "Homey Pro mini provato da noi: contenuto scatola, connettività, Ethernet e installazione passo passo nell’app. Pronto in circa 15 minuti."
updated: "24 ottobre 2026"
---

*Test iniziato il 23 ottobre 2026.*

Il **Homey Pro mini** di Athom è la versione compatta del Homey Pro: « cervello » con Zigbee, Matter, Thread, Z-Wave, 433 MHz e infrarossi senza chiavette aggiuntive. Prima di associare prese e sensori, ecco unboxing e installazione fino alla schermata « Tutto pronto! ».

![Contenuto scatola Homey Pro mini](/images/domotique/homey/homey-pro-mini-boite-v2.webp)

## In sintesi

**Ci è piaciuto finora**
- Installazione **guidata e facile**: ~15 minuti dal collegamento alla fine.
- Aggiornamento firmware automatico all’avvio (~4 minuti nel nostro test).
- **Ethernet RJ45** integrato e cavo in scatola.
- Configurazione casa (piani, stanze) subito.
- Molte tecnologie in « Nuovo dispositivo »: 433 MHz, IR, Matter, Z-Wave, Zigbee.

**Limiti a questo stadio**
- L’adattatore Ethernet extra non serve sul mini (ha già la rete).
- Nessun dispositivo ancora associato: portata e automazioni da valutare nella parte 2.

Confronto sistemi: [Home Assistant, Jeedom, Homey](/it/domotica/home-assistant-jeedom-homey-quale-sistema/).

## Unboxing

Scatola nera con il box e la scritta « mini ». Contenuto:

1. Homey Pro mini  
2. cavo Ethernet piatto  
3. cavo USB-C  
4. caricatore USB  
5. notice con QR verso [setup.homey.app](https://setup.homey.app)

Box quadrato nero opaco, LED frontale, discreto accanto al router.

## Connettività

Retro: **Ethernet RJ45** e **USB-C** alimentazione. L’« Homey Pro Ethernet Adapter » serve al Homey Pro grande, **non al mini**. La prova del modello grande: [unboxing e installazione](/it/domotica/test-homey-pro-unboxing-installazione/).

## Collegamento

Ethernet a uno switch, alimentazione USB-C: LED viola = pronto per la configurazione. Wi-Fi possibile; il cavo resta la scelta più stabile.

## Installazione nell’app Homey

1. App da QR code notice  
2. Account Homey  
3. **Aggiornamento firmware** (~4 min, non scollegare)  
4. « Benvenuto a casa »  
5. Numero livelli (es. 2)  
6. Piani: piano terra, primo piano, garage, giardino…  
7. Stanze per piano  
8. Riepilogo ad albero  
9. Rete **Thread** (autorizzazione)  
10. « Tutto pronto! »  
11. Nuovo dispositivo: 433 MHz, IR, Matter, Z-Wave, Zigbee  

Totale **~15 minuti**. Spiegazioni chiare, poco tecnicismo.

Pagina ufficiale: [Homey Pro mini](https://homey.app/homey-pro-mini/) (prezzo sul sito del produttore; in Italia spesso via rivenditori UE).

## FAQ

**Serve l’adattatore Ethernet sul mini?** No, RJ45 e cavo inclusi.

**Quanto dura l’installazione?** ~15 minuti nel nostro test.

**Quali tecnologie all’aggiunta dispositivo?** 433 MHz, IR, Matter, Z-Wave, Zigbee; Thread configurato in setup.

**Da quale protocollo iniziare?** [Zigbee, Wi-Fi, Thread o Matter](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/).

**Prossima parte del test**: associare dispositivi Matter su Thread e Zigbee, prime automazioni e giudizio completo.

Intanto: [domotica per principianti](/it/domotica/come-iniziare/).

[Tutte le guide](/it/domotica/)
