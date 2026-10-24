---
layout: ../../../layouts/ItPost.astro
title: "Domotica per principianti: da dove iniziare nel 2026?"
description: "Un primo piano domotico concreto per appartamenti e case in Italia: Wi-Fi, Zigbee, Thread e Matter spiegati, cosa comprare per primo e quali regole elettriche rispettare."
updated: "24 ottobre 2026"
---

Una casa smart non deve per forza cominciare con una grande centralina e un fine settimana di cablaggi. Questa guida propone un percorso passo dopo passo che funziona tanto in un **appartamento in affitto** quanto in una **casa di proprietà**, e indica i punti a cui fare attenzione in Italia: **prese, marcatura e chi può mettere mano all'impianto**.

## 1. Tre domande prima del primo acquisto

1. **Cosa volete automatizzare per primo?** Luci, riscaldamento, un avviso quando la lavatrice ha finito, oppure la misura dei consumi? Partite da un bisogno reale.
2. **Vi piace smanettare?** I dispositivi Wi-Fi funzionano subito con un'app; Zigbee e Home Assistant offrono il controllo locale, ma richiedono un po' di configurazione.
3. **Siete in affitto o proprietari?** In affitto conviene restare su **dispositivi a spina** e sensori a batteria, che non lasciano tracce.

## 2. I protocolli spiegati in modo semplice

| Protocollo | Punti di forza | Limiti | Ideale per |
|---|---|---|---|
| **Wi-Fi (2,4 GHz)** | nessuna centralina, app semplice | consuma di più, spesso dipende dal cloud del produttore | la prima presa o lampadina smart |
| **Zigbee 3.0** | consuma poco, rete mesh, funziona in locale | serve un coordinatore USB o una centralina | sensori, prese, valvole termostatiche |
| **Thread** | mesh, basso consumo, basato su IP | per ora meno dispositivi | dispositivi a batteria pensati per durare |
| **Matter** | un unico standard per Apple Casa, Google Home, Alexa e SmartThings | ancora in evoluzione; passa per Wi-Fi o Thread | comprare senza legarsi a una marca |

## 3. Le basi elettriche in Italia

| | Italia |
|---|---|
| Spine e prese | tipo L (10 A e 16 A) e Schuko tipo F; molte prese recenti accettano entrambe |
| Tensione di rete | 230 V, 50 Hz |
| Marcatura | CE (conformità UE) |
| Interruttori e relè da incasso | i lavori sull'impianto fisso vanno affidati a un elettricista qualificato, nel rispetto della norma CEI 64-8 |

**Regola pratica:** comprate sempre i dispositivi a spina nella **versione adatta alle vostre prese**. Un adattatore da viaggio non è una soluzione sicura a lungo termine, soprattutto con carichi importanti come una stufetta.

## 4. Un percorso passo dopo passo

**Passo 1: iniziare con il Wi-Fi, senza centralina.** Una o due prese smart con misura dei consumi bastano per programmare una lampada e scoprire quanto consumano davvero i vostri apparecchi. Shelly propone prese in versioni per i diversi paesi: guardate la [gamma di prese Shelly](https://www.shelly.com/collections/smart-plugs) e scegliete la versione europea.

**Passo 2: aggiungere una centralina.** Per il controllo locale installate [Home Assistant](https://www.home-assistant.io/) su un **Home Assistant Green** già pronto oppure su un **Raspberry Pi 5**: confronto in [Home Assistant Green vs Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/).

**Passo 3: aggiungere un coordinatore Zigbee e i primi sensori.** I sensori di temperatura, apertura e movimento costano poco e durano mesi con una pila a bottone. Vedete [la miglior chiavetta Zigbee per Home Assistant](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

**Passo 4: ampliare dove serve.** Moduli dietro gli interruttori (lavoro da elettricista, vedi [Shelly Gen4: quale modulo scegliere](/it/shelly-gen4-quale-modulo-scegliere/)), valvole termostatiche, un robot aspirapolvere o sensori ESP32 fatti in casa.

## 5. Errori da evitare

- Comprare dispositivi che richiedono cinque app diverse: preferite **Matter** o **Zigbee**, così tutto finisce nello stesso posto.
- Usare una presa economica senza marcatura per una stufetta o un bollitore: controllate il **carico massimo** e la **marcatura CE**.
- Ricablare da soli gli interruttori della luce senza la qualifica necessaria.

**Prossima lettura:** [Prese smart per l'Italia](/it/domotica/prese-smart/).

[Tutte le guide alla domotica](/it/domotica/)
