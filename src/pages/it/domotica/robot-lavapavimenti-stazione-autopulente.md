---
layout: ../../../layouts/ItPost.astro
title: "Robot lavapavimenti: mop e stazioni autopulenti"
description: "Mop trascinato, vibrante o rotativo; stazioni svuotamento, lavaggio e asciugatura. Tabella comparativa, pavimenti, tappeti e Home Assistant."
updated: "2 novembre 2026"
shareTitle: "Robot aspirapolvere e lavapavimenti: come scegliere"
shareDescription: "Tipi di mop, stazioni autopulenti, manutenzione e collegamento a Home Assistant."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/it/domotica/">Domotica</a> · Robot lavapavimenti</nav>

« Aspirazione e lavaggio » compare su quasi tutti i robot recenti, ma indica sistemi molto diversi. Un panno umido trascinato non ha nulla a che fare con due dischi rotanti premuti sul pavimento. Questa guida fa parte del nostro [hub domotica](/it/domotica/) e si collega ai [robot sotto 200 €](/it/domotica/robot-aspirapolvere-sotto-200-euro/) e alla [compatibilità Home Assistant](/it/domotica/robot-aspirapolvere-home-assistant/).

![Robot aspirapolvere con serpillière e stazione di ricarica](/images/blog-thumbnails/robot-aspirateur-laveur-serpilliere-station.webp)

## Tabella: i sistemi mop

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Sistema</th>
<th scope="col">Principio</th>
<th scope="col">Efficacia sulle macchie</th>
<th scope="col">Tappeti</th>
<th scope="col">Fascia</th>
</tr></thead><tbody>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Mop trascinato</strong></span></td>
<td data-label="Principio"><span class="td-val">panno umido per peso del robot</span></td>
<td data-label="Efficacia sulle macchie"><span class="td-val">bassa: manutenzione leggera</span></td>
<td data-label="Tappeti"><span class="td-val">da evitare o togliere il panno</span></td>
<td data-label="Fascia"><span class="td-val">entry level</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Mop vibrante</strong></span></td>
<td data-label="Principio"><span class="td-val">piastra che vibra</span></td>
<td data-label="Efficacia sulle macchie"><span class="td-val">media</span></td>
<td data-label="Tappeti"><span class="td-val">spesso sollevamento mop</span></td>
<td data-label="Fascia"><span class="td-val">media</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Mop rotativi</strong></span></td>
<td data-label="Principio"><span class="td-val">due dischi che ruotano</span></td>
<td data-label="Efficacia sulle macchie"><span class="td-val">buona</span></td>
<td data-label="Tappeti"><span class="td-val">sollevamento o smontaggio</span></td>
<td data-label="Fascia"><span class="td-val">media-alta</span></td>
</tr>
<tr>
<td data-label="Sistema"><span class="td-val"><strong>Rullo</strong></span></td>
<td data-label="Principio"><span class="td-val">rullo che ruota e si riscia</span></td>
<td data-label="Efficacia sulle macchie"><span class="td-val">buona</span></td>
<td data-label="Tappeti"><span class="td-val">sollevamento</span></td>
<td data-label="Fascia"><span class="td-val">alta</span></td>
</tr>
</tbody>
</table>
</div>

**Per molte famiglie: mop rotativo con sollevamento automatico**, per lavare bene senza bagnare i tappeti. Budget stretto: mop trascinato utile per manutenzione quotidiana.

**Zigbee e hub:** se integrate il robot in Home Assistant, serve spesso un [dongle Zigbee](/it/domotica/miglior-chiavetta-zigbee-home-assistant/) sul server — vedi anche [Home Assistant Green vs Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/).

## Tabella: le stazioni autopulenti

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Funzione</th>
<th scope="col">Cosa fa</th>
<th scope="col">Cosa resta da fare</th>
</tr></thead><tbody>
<tr>
<td data-label="Funzione"><span class="td-val"><strong>Svuotamento automatico</strong></span></td>
<td data-label="Cosa fa"><span class="td-val">aspira il cestino nel sacco</span></td>
<td data-label="Cosa resta da fare"><span class="td-val">cambiare il sacco</span></td>
</tr>
<tr>
<td data-label="Funzione"><span class="td-val"><strong>Riempimento acqua</strong></span></td>
<td data-label="Cosa fa"><span class="td-val">riempie il serbatoio del robot</span></td>
<td data-label="Cosa resta da fare"><span class="td-val">riempire acqua pulita, svuotare acqua sporca</span></td>
</tr>
<tr>
<td data-label="Funzione"><span class="td-val"><strong>Lavaggio mop</strong></span></td>
<td data-label="Cosa fa"><span class="td-val">riscia i mop tra un passaggio e l’altro</span></td>
<td data-label="Cosa resta da fare"><span class="td-val">pulire il vassoio</span></td>
</tr>
<tr>
<td data-label="Funzione"><span class="td-val"><strong>Asciugatura</strong></span></td>
<td data-label="Cosa fa"><span class="td-val">aria calda/tiepida sui mop</span></td>
<td data-label="Cosa resta da fare"><span class="td-val">limita odori</span></td>
</tr>
<tr>
<td data-label="Funzione"><span class="td-val"><strong>Allaccio idraulico</strong> (alcuni modelli)</span></td>
<td data-label="Cosa fa"><span class="td-val">acqua ed scarico</span></td>
<td data-label="Cosa resta da fare"><span class="td-val">installazione vicino a un punto acqua</span></td>
</tr>
</tbody>
</table>
</div>

![Confronto navigazione LiDAR e telecamera su robot](/images/blog-thumbnails/robot-aspirateur-navigation-lidar-camera-gyroscope.webp)

## Quale sistema per quale pavimento

- **Gres, parquet verniciato, vinile**: tutti vanno bene; rotativi e rullo puliscono meglio le tracce secche.
- **Parquet oliato o cerato**: poca acqua, regolazione minima, seguire il produttore del parquet.
- **Casa con tappeti**: sollevamento automatico del mop o stazione che rimuove i mop prima dei tappeti — approfondisci in [navigazione LiDAR, telecamera o giroscopio](/it/domotica/robot-aspirapolvere-navigazione-lidar/).

## Manutenzione

La stazione riduce il lavoro ma non lo elimina: sacchi, filtri, spazzole, mop e vassoio acqua sporca. Prima dell’acquisto verificate **consumabili disponibili in Italia** e assistenza. Home Assistant può tracciare l’usura se l’integrazione lo permette.

## Domande frequenti

**Serve una stazione completa?**  
No: molti modelli entry level hanno solo la base di ricarica. La stazione autopulente ha senso se lavate spesso e volete meno contatto con acqua sporca.

**Posso usare solo aspirazione?**  
Sì: quasi tutti i robot permettono di staccare i mop o disattivare il lavaggio nelle app.

**Matter o solo app cloud?**  
Controllate l’etichetta **Matter** o l’integrazione **Home Assistant** ufficiale prima dell’acquisto — non tutti i modelli espongono entità locali.

[Tutte le guide domotica](/it/domotica/)
