---
layout: ../../../layouts/ItPost.astro
title: "Robot aspirapolvere: LiDAR vs telecamera (2026)"
description: "Navigazione casuale, giroscopio, telecamera vSLAM o LiDAR: confronto per mappa, stanze e Home Assistant. Esempi e FAQ."
updated: "2 novembre 2026"
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/it/domotica/">Domotica</a> · Navigazione robot</nav>

> **Risposta rapida (novembre 2026)** — Per la maggior parte delle case: **LiDAR** (laser rotante). Mappa precisa, funziona al buio, pulizia per stanza e integrazione Home Assistant più affidabile. Entry level recenti: [sotto 200 €](/it/domotica/robot-aspirapolvere-sotto-200-euro/).

Guida del [percorso domotica](/it/domotica/) — qui spieghiamo **come si orienta** un robot aspirapolvere (**LiDAR** = laser; **vSLAM** = telecamera che ricostruisce la mappa; **HA** = Home Assistant).

In scheda tecnica attira la potenza di aspirazione, ma è la **navigazione** a decidere se il robot copre tutta la stanza o ripassa tre volte lo stesso punto dimenticando il corridoio.

## L'essenziale in una tabella

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Navigazione</th>
<th scope="col">Principio</th>
<th scope="col">Mappa casa</th>
<th scope="col">Pulizia per stanza</th>
<th scope="col">Al buio</th>
<th scope="col">Fascia</th>
</tr></thead><tbody>
<tr>
<td data-label="Navigazione"><span class="td-val"><strong>Casuale</strong></span></td>
<td data-label="Principio"><span class="td-val">rimbalza sugli ostacoli</span></td>
<td data-label="Mappa casa"><span class="td-val">no</span></td>
<td data-label="Pulizia per stanza"><span class="td-val">no</span></td>
<td data-label="Al buio"><span class="td-val">sì</span></td>
<td data-label="Fascia"><span class="td-val">primo prezzo</span></td>
</tr>
<tr>
<td data-label="Navigazione"><span class="td-val"><strong>Giroscopio</strong></span></td>
<td data-label="Principio"><span class="td-val">linee parallele con sensori movimento</span></td>
<td data-label="Mappa casa"><span class="td-val">approssimativa o assente</span></td>
<td data-label="Pulizia per stanza"><span class="td-val">raro</span></td>
<td data-label="Al buio"><span class="td-val">sì</span></td>
<td data-label="Fascia"><span class="td-val">entry level</span></td>
</tr>
<tr>
<td data-label="Navigazione"><span class="td-val"><strong>Telecamera (vSLAM)</strong></span></td>
<td data-label="Principio"><span class="td-val">punti di riferimento visivi</span></td>
<td data-label="Mappa casa"><span class="td-val">sì</span></td>
<td data-label="Pulizia per stanza"><span class="td-val">sì</span></td>
<td data-label="Al buio"><span class="td-val">dipende dalla luce</span></td>
<td data-label="Fascia"><span class="td-val">media-alta</span></td>
</tr>
<tr>
<td data-label="Navigazione"><span class="td-val"><strong>LiDAR (laser)</strong></span></td>
<td data-label="Principio"><span class="td-val">laser rotante 360°</span></td>
<td data-label="Mappa casa"><span class="td-val">sì, precisa</span></td>
<td data-label="Pulizia per stanza"><span class="td-val">sì</span></td>
<td data-label="Al buio"><span class="td-val">sì</span></td>
<td data-label="Fascia"><span class="td-val">anche entry recente</span></td>
</tr>
</tbody>
</table>
</div>

**La nostra scelta: LiDAR.** Mappa precisa al primo giro, funziona al buio, pulizia stanza per stanza anche da Home Assistant.

## Esempio concreto: corridoio + cucina

1. **Casuale** : dopo 45 minuti il corridoio può restare poussiéreux mentre la cucina è passata quattro volte.  
2. **LiDAR** : prima passata = mappa; seconda passata = « solo cucina » se l’app o HA lo permette.  
3. **Telecamera** : stessa logica, ma con luci spente la mappa può **driftare** (spostamento).

## Casuale e giroscopio

Il **casuale** avanza fino a un ostacolo e riparte altrove: copre una stanza piccola ma in modo lento e irregolare. Il **giroscopio** migliora con linee parallele, ma in case multi-stanza perde i riferimenti e spesso non tiene una mappa utile.

## Telecamera (vSLAM)

Filma soffitto o ambiente e si localizza. Buona mappa e pulizia per stanza. Limiti: prestazioni in penombra; telecamera in casa e **privacy** (leggete la policy del produttore).

## LiDAR

Torretta con laser che misura distanze. Mappa precisa, rilocalizzazione rapida, funziona al buio. Contro: altezza extra — misurate lo spazio sotto divano e confrontate con la scheda tecnica.

## Evitamento ostacoli

La navigazione orienta; l’**evitamento** evita cavi e calzini. IR, luce strutturata o telecamera frontale. In entry level l’evitamento è spesso limitato: raccogliete cavi e oggetti piccoli prima del passaggio.

## Navigazione e domotica

Mappa precisa = Home Assistant può dire « pulisci la cucina ». Dipende dall’integrazione: [robot compatibili HA](/it/domotica/robot-aspirapolvere-home-assistant/). Per mop e stazioni: [lavapavimenti](/it/domotica/robot-lavapavimenti-stazione-autopulente/). Budget: [sotto 200 €](/it/domotica/robot-aspirapolvere-sotto-200-euro/).

## FAQ

**LiDAR consuma più batteria?**  
Un po’ più del casuale, ma finisce prima il lavoro: meno passate inutili.

**vSLAM è sempre peggio del LiDAR?**  
No in monolocale luminoso; sì se volete stanze separate al buio.

**Come verifico il tipo sullo shop?**  
Cercate « LiDAR », « laser navigation » o torretta rotante in foto — evitate solo « gyro » o « random ».

**Marca consigliata con HA?**  
Roborock con integrazione ufficiale — dettagli nel guide compatibilità.

[Tutte le guide domotica](/it/domotica/)
