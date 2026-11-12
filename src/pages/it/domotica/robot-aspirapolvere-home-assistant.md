---
layout: ../../../layouts/ItPost.astro
title: "Robot aspirapolvere compatibile con Home Assistant: marche e integrazione"
description: "Roborock, iRobot Roomba, Ecovacs, SwitchBot, Shark, Xiaomi, Dreame: integrazione ufficiale o community, locale o cloud secondo la documentazione Home Assistant. Tabella e consigli d’acquisto in Italia."
updated: "24 ottobre 2026"
---

Un robot aspirapolvere diventa davvero utile quando parte **da solo**: casa vuota, dopo cena, solo cucina. Serve l’integrazione in Home Assistant. Non tutte le marche funzionano allo stesso modo: alcune parlano in locale, altre solo via cloud, altre hanno solo integrazioni HACS. La tabella segue la [documentazione Home Assistant](https://www.home-assistant.io/integrations/#vacuum) (ottobre 2026).

<figure>
<img src="/images/schemas/ha-aspirateur.svg" alt="Due percorsi: il robot raggiunge Home Assistant in rete locale oppure tramite il cloud del produttore" width="780" height="672" />
<figcaption>Freccia verde: il robot parla con Home Assistant sulla rete locale. Freccia arancione: i comandi passano dal cloud del produttore. La tabella indica il percorso descritto dalla documentazione Home Assistant per ogni marca.</figcaption>
</figure>

## L’essenziale in una tabella

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Marca</th>
<th scope="col">Integrazione HA</th>
<th scope="col">Connessione (doc HA)</th>
<th scope="col">Nota</th>
</tr></thead><tbody>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Roborock</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roborock/">Roborock</a> (ufficiale)</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">Local Polling</span></td>
<td data-label="Nota"><span class="td-val">account Roborock in setup, poi controllo locale</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>iRobot Roomba / Braava</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/roomba/">Roomba</a> (ufficiale)</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">Local Push</span></td>
<td data-label="Nota"><span class="td-val">modelli Wi-Fi</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Ecovacs</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/ecovacs/">Ecovacs</a> (ufficiale)</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">Cloud Push</span></td>
<td data-label="Nota"><span class="td-val">dipende dal cloud Ecovacs</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>SwitchBot</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/switchbot_cloud/">SwitchBot Cloud</a> (ufficiale)</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">Cloud Polling</span></td>
<td data-label="Nota"><span class="td-val">es. K10+, S10, S20</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Shark</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/sharkiq/">Shark IQ</a> (ufficiale)</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">Cloud Polling</span></td>
<td data-label="Nota"><span class="td-val">gamma Shark IQ</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Xiaomi (modelli vecchi)</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/xiaomi_miio/">Xiaomi Miio</a> (ufficiale)</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">Local Polling</span></td>
<td data-label="Nota"><span class="td-val">compatibilità variabile</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Dreame</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val">nessuna ufficiale</span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">—</span></td>
<td data-label="Nota"><span class="td-val">integrazione community via HACS</span></td>
</tr>
<tr>
<td data-label="Marca"><span class="td-val"><strong>Robot Matter</strong></span></td>
<td data-label="Integrazione HA"><span class="td-val"><a href="https://www.home-assistant.io/integrations/matter/">Matter</a></span></td>
<td data-label="Connessione (doc HA)"><span class="td-val">locale</span></td>
<td data-label="Nota"><span class="td-val">categoria aspirapolvere in Matter 1.2</span></td>
</tr>
</tbody>
</table>
</div>

**La nostra scelta: Roborock.** Integrazione ufficiale, controllo locale, stanze, consumabili ed errori. Anche la scelta budget: Roborock Q7 M5 in [robot sotto 200 €](/it/domotica/robot-aspirapolvere-sotto-200-euro/).

## Locale o cloud

- **Locale**: HA parla al robot sulla LAN. Comandi rapidi e funzionamento se Internet cade.
- **Cloud**: ogni comando passa dai server del produttore; rischio interruzioni se cambiano API o servizio.

Per un uso duraturo, preferite integrazioni **Local** nella documentazione HA.

## Cosa automatizzare

Entità `vacuum`. Esempi:

- pulizia quando la casa è vuota (zone presenza);
- solo cucina dopo il pasto (se l’integrazione lo permette);
- notifica bacino pieno o robot bloccato;
- usura spazzole e filtri.

automation:
  - alias: "Pulizia quando casa vuota"
    trigger:
      - platform: state
        entity_id: zone.home
        to: "0"
        for: "00:15:00"
    action:
      - action: vacuum.start
        target:
          entity_id: vacuum.robot_salone

Sostituite `vacuum.robot_salone` con la vostra entità.

## Prima dell’acquisto

1. Cercate il modello esatto nella pagina integrazione del marchio.
2. Verificate integrazione **ufficiale** e **locale**.
3. Scegliete la navigazione: LiDAR per mappa e stanze ([LiDAR, telecamera o giroscopio](/it/domotica/robot-aspirapolvere-navigazione-lidar/)).
4. Lavaggio e stazione: [robot lavapavimenti e stazioni](/it/domotica/robot-lavapavimenti-stazione-autopulente/).

Non avete ancora un server? [Installare Home Assistant su Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/).

[Tutte le guide](/it/domotica/)
