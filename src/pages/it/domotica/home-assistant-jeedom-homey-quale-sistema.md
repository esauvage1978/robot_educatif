---
layout: ../../../layouts/ItPost.astro
title: "Home Assistant, Jeedom, Homey o box commerciali: quale « cervello » per la domotica?"
description: "Home Assistant, Jeedom, Homey Pro, Google Home, Alexa o Apple Casa: locale o cloud, protocolli, difficoltà e profilo consigliato. Tabella comparativa per chi inizia in Italia."
updated: "24 ottobre 2026"
---

Una casa smart ha bisogno di un **software o box** che riceve i dati dei sensori e lancia le automazioni. La scelta condiziona protocolli, funzionamento senza Internet e complessità quotidiana. Ecco le opzioni principali, dalle documentazioni ufficiali ([Home Assistant](https://www.home-assistant.io/installation/), [Jeedom](https://doc.jeedom.com/), [Homey Pro](https://homey.app/homey-pro/)).

## L’essenziale in una tabella

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Sistema</th>
<th scope="col">Tipo</th>
<th scope="col">Funziona senza Internet</th>
<th scope="col">Protocolli nativi</th>
<th scope="col">Difficoltà</th>
<th scope="col">Per chi</th>
</tr></thead><tbody>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Home Assistant</strong></span></td>
<td data-label="Tipo"><span class="td-val">software libero su Raspberry Pi, mini-PC o box ufficiale</span></td>
<td data-label="Funziona senza Internet"><span class="td-val">sì</span></td>
<td data-label="Protocolli nativi"><span class="td-val">Wi-Fi, Matter; Zigbee, Z-Wave, Thread con chiavetta</span></td>
<td data-label="Difficoltà"><span class="td-val">media</span></td>
<td data-label="Per chi"><span class="td-val">chi vuole tutto in locale</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Jeedom</strong></span></td>
<td data-label="Tipo"><span class="td-val">software con community francofona, box ufficiali</span></td>
<td data-label="Funziona senza Internet"><span class="td-val">sì</span></td>
<td data-label="Protocolli nativi"><span class="td-val">via plugin (alcuni a pagamento)</span></td>
<td data-label="Difficoltà"><span class="td-val">media</span></td>
<td data-label="Per chi"><span class="td-val">chi preferisce ecosistema a plugin</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Homey Pro</strong></span></td>
<td data-label="Tipo"><span class="td-val">box tutto-in-uno</span></td>
<td data-label="Funziona senza Internet"><span class="td-val">sì, per dispositivi locali</span></td>
<td data-label="Protocolli nativi"><span class="td-val">Zigbee, Z-Wave, Thread, Matter, Wi-Fi, Bluetooth, 433 MHz, IR</span></td>
<td data-label="Difficoltà"><span class="td-val">bassa</span></td>
<td data-label="Per chi"><span class="td-val">chi vuole hardware pronto</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Google Home / Alexa / Apple Casa</strong></span></td>
<td data-label="Tipo"><span class="td-val">assistente vocale</span></td>
<td data-label="Funziona senza Internet"><span class="td-val">parzialmente</span></td>
<td data-label="Protocolli nativi"><span class="td-val">Wi-Fi, Matter, Thread (a seconda del dispositivo)</span></td>
<td data-label="Difficoltà"><span class="td-val">molto bassa</span></td>
<td data-label="Per chi"><span class="td-val">poche prese e lampadine, voce</span></td>
</tr>
</tbody>
</table>
</div>

**La nostra scelta: Home Assistant** su [Green o Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/). Gratuito, locale, compatibile con quasi tutte le marche. È anche il sistema usato nei nostri tutorial.

## Home Assistant: il più aperto

Progetto open source di Nabu Casa. Si installa su [Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/), mini-PC o box Green. Oltre 1 500 integrazioni, da Philips Hue ai [robot aspirapolvere Roborock](/it/domotica/robot-aspirapolvere-home-assistant/). Una chiavetta USB aggiunge Zigbee o Thread ([quale chiavetta](/it/domotica/miglior-chiavetta-zigbee-home-assistant/)).

Contro: serve accettare un po’ di configurazione e attenzione agli aggiornamenti. L’accesso remoto: configurazione propria o abbonamento opzionale Home Assistant Cloud.

## Jeedom: alternativa a plugin

Sviluppato in Francia, con documentazione anche in italiano limitata rispetto al francese. Core GPL; funzioni via **plugin** (gratuiti o a pagamento sul Market). Buona scelta se venite da quell’ecosistema.

## Homey Pro: box completo

Radio domestiche in un unico box: Zigbee, Z-Wave, Thread, Matter, Wi-Fi, Bluetooth, 433 MHz e infrarossi. App curata e automazioni « Flow » visuali. Meno tecnico dei sistemi locali « puri », ma hardware proprietario.

Abbiamo iniziato a testare la versione compatta: [Homey Pro mini, unboxing e installazione](/it/domotica/test-homey-pro-mini-unboxing-installazione/).

## Google Home, Alexa, Apple Casa: comodi ma limitati

Gestiscono bene poche prese e lampadine e si aprono a **Matter** (vedi [protocolli](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/)). Per automazioni avanzate o uso offline mostrano presto i limiti. Restano un buon complemento: Home Assistant può esporre i dispositivi per la voce.

## Come decidere

1. **Solo qualche lampada a voce**: un assistente basta.
2. **Casa locale, senza abbonamento**: Home Assistant.
3. **Locale senza configurazione**: Homey Pro.
4. **Community e plugin in francese**: Jeedom.

Prossimi passi: [domotica per principianti](/it/domotica/come-iniziare/) e [domotica in affitto](/it/domotica/domotica-in-affitto-senza-lavori/).

[Tutte le guide](/it/domotica/)
