---
layout: ../../layouts/ItPost.astro
title: "mBlock Bluetooth: il mBot non si connette (soluzioni)"
description: "mBot, mBot2 o Codey Rocky non si collegano in mBlock? Controlla USB, firmware, Bluetooth del PC, associazione, distanza e interferenze, in quest’ordine. Prima il cavo USB."
updated: "11 novembre 2026"
---

Il **Bluetooth** tra **mBlock** e un robot (**mBot**, **mBot2**, **Codey Rocky**) è spesso il primo intoppo: con il cavo USB funziona, senza filo no. Le cause stanno in pochi gruppi: **software**, **radio del PC**, **associazione** e **ambiente**. L’ordine qui sotto evita di mescolare tutto.

## 1. L’ordine da seguire

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Passo</th>
<th scope="col">Controllo</th>
<th scope="col">Perché</th>
</tr></thead><tbody>
<tr>
<td data-label="Passo"><span class="td-val">1</span></td>
<td data-label="Controllo"><span class="td-val"><strong>Provare il robot via USB</strong></span></td>
<td data-label="Perché"><span class="td-val">se il caricamento USB fallisce, il Bluetooth non è il problema</span></td>
</tr>
<tr>
<td data-label="Passo"><span class="td-val">2</span></td>
<td data-label="Controllo"><span class="td-val"><strong>Aggiornare mBlock</strong></span></td>
<td data-label="Perché"><span class="td-val">serve una versione adatta al sistema</span></td>
</tr>
<tr>
<td data-label="Passo"><span class="td-val">3</span></td>
<td data-label="Controllo"><span class="td-val"><strong>Aggiornare il firmware del robot</strong></span></td>
<td data-label="Perché"><span class="td-val">un firmware vecchio può bloccare il Bluetooth</span></td>
</tr>
<tr>
<td data-label="Passo"><span class="td-val">4</span></td>
<td data-label="Controllo"><span class="td-val"><strong>Bluetooth del PC</strong></span></td>
<td data-label="Perché"><span class="td-val">modalità aereo, tasto Fn, driver</span></td>
</tr>
<tr>
<td data-label="Passo"><span class="td-val">5</span></td>
<td data-label="Controllo"><span class="td-val"><strong>Associare di nuovo</strong></span></td>
<td data-label="Perché"><span class="td-val">togliere il vecchio dispositivo, poi associare</span></td>
</tr>
<tr>
<td data-label="Passo"><span class="td-val">6</span></td>
<td data-label="Controllo"><span class="td-val"><strong>Distanza e interferenze</strong></span></td>
<td data-label="Perché"><span class="td-val">provare prima a circa 1 m</span></td>
</tr>
</tbody>
</table>
</div>

## 2. Software e firmware

Installa mBlock dal sito ufficiale e leggi le note della versione del tuo modello: [installare mBlock 5](/it/installare-mblock-5-windows/). Aggiorna il firmware seguendo la documentazione Makeblock **del tuo** robot. Dopo un aggiornamento importante, riavvia il robot e il PC.

## 3. Bluetooth sul computer

Su un portatile, la **modalità aereo** o un **tasto Fn** può spegnere la radio senza un avviso chiaro. Se i tentativi restano vuoti, un adattatore USB Bluetooth recente può essere più stabile del chip integrato. Questa pagina non indica un modello.

## 4. Associazione in Windows

Se Windows è in italiano, apri **Impostazioni**, poi **Bluetooth e dispositivi**. Rimuovi il vecchio dispositivo e associa di nuovo. Chiudi le altre app che possono tenere il robot (telecomandi, una seconda finestra di mBlock). I nomi dei menu seguono la lingua di Windows.

## 5. Distanza e interferenze

Prova **vicino al computer** (circa 1 m), senza un muro metallico in mezzo. Allontana i dispositivi **USB 3.0**: possono disturbare alcuni collegamenti a 2,4 GHz. Non è sistematico.

## 6. USB o Bluetooth?

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Situazione</th>
<th scope="col">Scelta</th>
</tr></thead><tbody>
<tr>
<td data-label="Situazione"><span class="td-val">Aula</span></td>
<td data-label="Scelta"><span class="td-val">USB per <strong>caricare</strong> il programma; Bluetooth per le prove se la stanza lo consente</span></td>
</tr>
<tr>
<td data-label="Situazione"><span class="td-val">Gara o dimostrazione</span></td>
<td data-label="Scelta"><span class="td-val">USB, oppure un collegamento <strong>provato il giorno prima</strong></span></td>
</tr>
<tr>
<td data-label="Situazione"><span class="td-val">Ricerca del guasto</span></td>
<td data-label="Scelta"><span class="td-val"><strong>sempre</strong> verificare via USB prima di incolpare il robot</span></td>
</tr>
</tbody>
</table>
</div>

Prima l’**USB**, per vedere se il robot risponde. Poi il **Bluetooth**, con mBlock aggiornato e un’associazione pulita. Il passo successivo è il [primo programma mBot](/it/primo-programma-mbot/).
