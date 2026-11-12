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

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Protocollo</th>
<th scope="col">Punti di forza</th>
<th scope="col">Limiti</th>
<th scope="col">Ideale per</th>
</tr></thead><tbody>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Wi-Fi (2,4 GHz)</strong></span></td>
<td data-label="Punti di forza"><span class="td-val">nessuna centralina, app semplice</span></td>
<td data-label="Limiti"><span class="td-val">consuma di più, spesso dipende dal cloud del produttore</span></td>
<td data-label="Ideale per"><span class="td-val">la prima presa o lampadina smart</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Zigbee 3.0</strong></span></td>
<td data-label="Punti di forza"><span class="td-val">consuma poco, rete mesh, funziona in locale</span></td>
<td data-label="Limiti"><span class="td-val">serve un coordinatore USB o una centralina</span></td>
<td data-label="Ideale per"><span class="td-val">sensori, prese, valvole termostatiche</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Thread</strong></span></td>
<td data-label="Punti di forza"><span class="td-val">mesh, basso consumo, basato su IP</span></td>
<td data-label="Limiti"><span class="td-val">per ora meno dispositivi</span></td>
<td data-label="Ideale per"><span class="td-val">dispositivi a batteria pensati per durare</span></td>
</tr>
<tr>
<td data-label="Protocollo"><span class="td-val"><strong>Matter</strong></span></td>
<td data-label="Punti di forza"><span class="td-val">un unico standard per Apple Casa, Google Home, Alexa e SmartThings</span></td>
<td data-label="Limiti"><span class="td-val">ancora in evoluzione; passa per Wi-Fi o Thread</span></td>
<td data-label="Ideale per"><span class="td-val">comprare senza legarsi a una marca</span></td>
</tr>
</tbody>
</table>
</div>

## 3. Le basi elettriche in Italia

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col">Italia</th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Spine e prese</span></td>
<td data-label="Italia"><span class="td-val">tipo L (10 A e 16 A) e Schuko tipo F; molte prese recenti accettano entrambe</span></td>
</tr>
<tr>
<td><span class="td-val">Tensione di rete</span></td>
<td data-label="Italia"><span class="td-val">230 V, 50 Hz</span></td>
</tr>
<tr>
<td><span class="td-val">Marcatura</span></td>
<td data-label="Italia"><span class="td-val">CE (conformità UE)</span></td>
</tr>
<tr>
<td><span class="td-val">Interruttori e relè da incasso</span></td>
<td data-label="Italia"><span class="td-val">i lavori sull'impianto fisso vanno affidati a un elettricista qualificato, nel rispetto della norma CEI 64-8</span></td>
</tr>
</tbody>
</table>
</div>

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
