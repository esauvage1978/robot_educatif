---
layout: ../../../layouts/ItPost.astro
title: "Domotica in affitto: cosa si può installare senza lavori?"
description: "Inquilino o casa temporanea: prese smart, sensori a batteria, teste termostatiche, interruttori wireless e telecamere senza forare. Cosa installare, cosa chiedere al proprietario e come portare via tutto al trasloco."
updated: "24 ottobre 2026"
---

Essere in affitto non vi impedisce di avere una casa connessa. Regola pratica: **tutto ciò che si inserisce nella presa, si incolla o si avvita su un attacco esistente** si può montare e portare via. Ciò che tocca il quadro elettrico, gli interruttori incassati o la caldaia richiede l’ok del proprietario e, spesso, un elettricista abilitato (in Italia, lavori sull’impianto fissato vanno valutati con attenzione).

## L’essenziale in una tabella

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Dispositivo</th>
<th scope="col">Installazione</th>
<th scope="col">Ok del proprietario</th>
<th scope="col">Recuperabile al trasloco</th>
<th scope="col">Protocollo comune</th>
</tr></thead><tbody>
<tr>
<td data-label="Dispositivo"><span class="td-val">Presa smart</span></td>
<td data-label="Installazione"><span class="td-val">si inserisce nella presa</span></td>
<td data-label="Ok del proprietario"><span class="td-val">di solito no</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì</span></td>
<td data-label="Protocollo comune"><span class="td-val">Wi-Fi, Zigbee, Matter</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Sensore temperatura / umidità</span></td>
<td data-label="Installazione"><span class="td-val">appoggiato o incollato</span></td>
<td data-label="Ok del proprietario"><span class="td-val">no</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì</span></td>
<td data-label="Protocollo comune"><span class="td-val">Zigbee, Bluetooth</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Sensore apertura</span></td>
<td data-label="Installazione"><span class="td-val">adesivo</span></td>
<td data-label="Ok del proprietario"><span class="td-val">no</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì (rimuovere l’adesivo)</span></td>
<td data-label="Protocollo comune"><span class="td-val">Zigbee</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Lampadina smart</span></td>
<td data-label="Installazione"><span class="td-val">si avvita</span></td>
<td data-label="Ok del proprietario"><span class="td-val">no</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì (rimontare quella vecchia)</span></td>
<td data-label="Protocollo comune"><span class="td-val">Zigbee, Wi-Fi, Matter</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Pulsante / interruttore wireless</span></td>
<td data-label="Installazione"><span class="td-val">adesivo</span></td>
<td data-label="Ok del proprietario"><span class="td-val">no</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì</span></td>
<td data-label="Protocollo comune"><span class="td-val">Zigbee</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Testa termostatica smart</span></td>
<td data-label="Installazione"><span class="td-val">sostituisce la testa del radiatore</span></td>
<td data-label="Ok del proprietario"><span class="td-val">da verificare</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì (conservare la testa originale)</span></td>
<td data-label="Protocollo comune"><span class="td-val">Zigbee, Thread</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Telecamera interna</span></td>
<td data-label="Installazione"><span class="td-val">posata</span></td>
<td data-label="Ok del proprietario"><span class="td-val">no (rispettare la privacy)</span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sì</span></td>
<td data-label="Protocollo comune"><span class="td-val">Wi-Fi</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Modulo dietro interruttore, tapparelle</span></td>
<td data-label="Installazione"><span class="td-val">lavori elettrici</span></td>
<td data-label="Ok del proprietario"><span class="td-val"><strong>sì</strong></span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">sconsigliato</span></td>
<td data-label="Protocollo comune"><span class="td-val">—</span></td>
</tr>
<tr>
<td data-label="Dispositivo"><span class="td-val">Termostato caldaia</span></td>
<td data-label="Installazione"><span class="td-val">cablaggio</span></td>
<td data-label="Ok del proprietario"><span class="td-val"><strong>sì</strong></span></td>
<td data-label="Recuperabile al trasloco"><span class="td-val">—</span></td>
<td data-label="Protocollo comune"><span class="td-val">—</span></td>
</tr>
</tbody>
</table>
</div>

**Per iniziare in affitto consigliamo**: chiavetta Zigbee su Home Assistant, più prese e sensori Zigbee. Niente fori nel muro; al trasloco tutto sta in una scatola. Dettaglio chiavette: [confronto chiavette Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

## Dispositivi a basso rischio

**Prese smart.** Ideale per programmare un termoconvettore, misurare i consumi o spegnere a distanza. Rispettate la corrente massima del produttore (spesso 16 A su prese Schuko) ed evitate multiprese incatenate. Vedi [prese smart Zigbee](/it/domotica/prese-smart/).

**Sensori a batteria.** Temperatura, umidità, apertura finestra, perdita d’acqua: si posano o incollano. Scelta modelli: [sensori temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/). Usate adesivi removibili per non rovinare le pareti.

**Pulsanti wireless.** Un pulsante Zigbee vicino alla porta può spegnere tutte le luci in uscita, senza toccare l’impianto.

## Da verificare

**Teste termostatiche.** Su un radiatore con valvola termostatica, la testa si svita e si sostituisce con una testa smart, senza svuotare l’impianto. Tenete la testa originale per il check-out. Controllate filettatura e adattatori.

**Telecamere.** Una telecamera interna è tecnicamente semplice; filmare parti comuni del condominio o la strada pubblica non è consentito. Orientatela solo verso il vostro appartamento, come ricorda il [Garante privacy – videosorveglianza in casa](https://www.garanteprivacy.it/home/docweb/-/docweb/display/docweb/3134436).

## Lasciare al proprietario

Moduli incassati, tapparelle motorizzate, quadro elettrico, termostato caldaia: modificano l’immobile. Chiedete autorizzazione scritta e un elettricista qualificato.

## Il « cervello »: discreto e trasportabile

Un [Home Assistant Green o Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/) si collega al router via cavo. Al trasloco lo ricollegate: automazioni e storico seguono. Per scegliere il sistema: [Home Assistant, Jeedom, Homey](/it/domotica/home-assistant-jeedom-homey-quale-sistema/) e [domotica per principianti](/it/domotica/come-iniziare/).

Un robot educativo nello stesso alloggio si sceglie sullo spazio a terra, sul rumore dei motori e su una sola scatola il giorno del trasloco: [attrezzatura robotica per inquilini](/it/attrezzatura-robotica-per-inquilini/).

[Tutte le guide](/it/domotica/)
