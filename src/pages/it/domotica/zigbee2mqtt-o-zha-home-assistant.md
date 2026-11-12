---
layout: ../../../layouts/ItPost.astro
title: "Zigbee2MQTT o ZHA: quale stack per Home Assistant?"
description: "ZHA o Zigbee2MQTT per dispositivi Zigbee in Home Assistant: differenze, installazione passo passo, chiavette compatibili ed errori frequenti — guida aggiornata."
updated: "2 novembre 2026"
shareTitle: "ZHA vs Zigbee2MQTT"
shareDescription: "Confronto ZHA e Zigbee2MQTT per Home Assistant in italiano."
---

<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/it/domotica/">Domotica</a> · ZHA o Zigbee2MQTT</nav>

> **Risposta diretta (novembre 2026)** — Per iniziare in pochi clic: **ZHA** (*Zigbee Home Automation*, integrazione Zigbee inclusa in **Home Assistant**, la centralina domotica open source). Per catalogo dispositivi ampio, interfaccia dedicata e dati anche fuori da Home Assistant via **MQTT** (*Message Queuing Telemetry Transport*, messaggistica leggera tra servizi): **Zigbee2MQTT**. **Una sola chiavetta USB = un solo stack** (ZHA **oppure** Zigbee2MQTT). Tutto il percorso è nel nostro [hub domotica](/it/domotica/).

Avete collegato una **chiavetta Zigbee** al [Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/) o al **Home Assistant Green** ([confronto hardware](/it/domotica/home-assistant-green-vs-raspberry-pi-5/)) e Home Assistant vi propone due strade. Entrambe fanno parlare sensori, [prese smart](/it/domotica/prese-smart/) e lampadine **Zigbee** (rete mesh a basso consumo su **2,4 GHz**, come il Wi‑Fi ma con protocollo diverso), ma l’architettura cambia.

*Metodo: questo confronto segue la [documentazione ufficiale ZHA](https://www.home-assistant.io/integrations/zha/) e la [guida Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) (consultate a ottobre 2026). Non abbiamo misurato velocità o portata su banco prova: nessun numero inventato.*

![Rete mesh Zigbee con coordinatore USB e Home Assistant — schema visivo](/images/illustrations/home-assistant-zigbee2mqtt-ou-zha.webp)

<p class="ai-illustration-caption">Illustrazione generata con IA</p>

## La risposta breve

- **Principianti, setup rapido?** **ZHA**. Integrato in Home Assistant: niente broker MQTT, tutto in *Impostazioni*.
- **Maker, dispositivi rari o dati anche in Node-RED / script Python?** **Zigbee2MQTT**. Add-on separato, interfaccia web ricca, entità pubblicate su MQTT.
- **Regola d’oro:** **un coordinatore Zigbee, un solo software.** La chiavetta non può essere aperta da ZHA e Zigbee2MQTT insieme.

## Come funziona, in due frasi

Una rete Zigbee ha bisogno di un **coordinatore**: la chiavetta USB ([SONOFF ZBDongle-E](/it/domotica/miglior-chiavetta-zigbee-home-assistant/), Home Assistant Connect ZBT-2, ecc.). Il programma che pilota il coordinatore è **ZHA** (dentro Home Assistant) oppure **Zigbee2MQTT** (servizio a parte che traduce Zigbee in MQTT; Home Assistant legge poi i topic MQTT).

ZHA:          sensore Zigbee → chiavetta USB → Home Assistant (integrazione ZHA)
Zigbee2MQTT:  sensore Zigbee → chiavetta USB → Zigbee2MQTT → Mosquitto (MQTT) → Home Assistant

## Tabella comparativa

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col"> </th>
<th scope="col"><strong>ZHA</strong></th>
<th scope="col"><strong>Zigbee2MQTT</strong></th>
</tr></thead><tbody>
<tr>
<td><span class="td-val">Dove gira</span></td>
<td data-label="**ZHA**"><span class="td-val">Integrazione inclusa in Home Assistant</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Programma separato (add-on Home Assistant OS o altro host)</span></td>
</tr>
<tr>
<td><span class="td-val">Server MQTT</span></td>
<td data-label="**ZHA**"><span class="td-val">Non serve</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Obbligatorio (<strong>Mosquitto</strong> consigliato)</span></td>
</tr>
<tr>
<td><span class="td-val">Installazione</span></td>
<td data-label="**ZHA**"><span class="td-val">Pochi clic; chiavetta spesso auto-rilevata</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Mosquitto, repository add-on, installazione, wizard web</span></td>
</tr>
<tr>
<td><span class="td-val">Interfaccia</span></td>
<td data-label="**ZHA**"><span class="td-val"><em>Impostazioni → Connettività → Zigbee</em></span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Frontend web Zigbee2MQTT, molto dettagliato</span></td>
</tr>
<tr>
<td><span class="td-val">Chiavette (famiglie chip)</span></td>
<td data-label="**ZHA**"><span class="td-val">Silicon Labs (EZSP), Texas Instruments (ZNP), deCONZ, ZiGate</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">TI (zStack) e Silicon Labs (EmberZNet) consigliati; deCONZ supportato; ZiGate sconsigliata</span></td>
</tr>
<tr>
<td><span class="td-val">Dispositivi non standard</span></td>
<td data-label="**ZHA**"><span class="td-val">Corretti con « quirks » (moduli di compatibilità)</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Corretti con « converters »</span></td>
</tr>
<tr>
<td><span class="td-val">Aggiornamenti OTA firmware</span></td>
<td data-label="**ZHA**"><span class="td-val">Sì, per una lista limitata di produttori</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Sì, da repository community</span></td>
</tr>
<tr>
<td><span class="td-val">Backup rete</span></td>
<td data-label="**ZHA**"><span class="td-val">Backup automatici; migrazione tra alcune chiavette in ZHA</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Backup coordinatore (zStack / Ember); cambio stack = spesso ri-appairing</span></td>
</tr>
<tr>
<td><span class="td-val">Usare i sensori fuori da Home Assistant</span></td>
<td data-label="**ZHA**"><span class="td-val">No</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Sì — qualsiasi client MQTT</span></td>
</tr>
<tr>
<td><span class="td-val">Hardware minimo</span></td>
<td data-label="**ZHA**"><span class="td-val">Quello della vostra centralina</span></td>
<td data-label="**Zigbee2MQTT**"><span class="td-val">Add-on 64 bit; minimo <strong>Raspberry Pi 4</strong> consigliato dagli sviluppatori</span></td>
</tr>
</tbody>
</table>
</div>

*Fonti: documentazioni ufficiali ZHA e Zigbee2MQTT, ottobre 2026.*

## ZHA: punti di forza e limiti

**Punti di forza**

- **Niente componenti extra.** Meno pezzi che possono guastarsi.
- **Auto-rilevamento** di molte chiavette USB.
- **Backup automatici** del network key Zigbee; la documentazione ZHA descrive la migrazione verso una nuova chiavetta (Silicon Labs, TI, ConBee/RaspBee) senza ri-appairing, se il backup è recente.
- **Mappa rete** in *Impostazioni → Connettività → Zigbee → Mostra mappa*.

**Limiti**

- Un dispositivo fuori standard può mostrare solo parte delle funzioni finché non esiste un quirk.
- I sensori restano visibili solo in Home Assistant.

## Zigbee2MQTT: punti di forza e limiti

**Punti di forza**

- **Interfaccia web completa**: dispositivi, log, mappa, OTA.
- **[Elenco dispositivi supportati](https://www.zigbee2mqtt.io/supported-devices/)** online — utile per verificare un [sensore temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/) **prima** dell’acquisto.
- **Indipendente da Home Assistant**: Node-RED, script sul Pi, ecc. leggono gli stessi topic MQTT.

**Limiti**

- **Due servizi in più** da aggiornare: Mosquitto e Zigbee2MQTT.
- Su **Raspberry Pi 3** l’add-on può essere instabile; documentazione e community consigliano almeno un **Pi 4**.

## Quale chiavetta Zigbee?

Le chiavette **Silicon Labs** e **Texas Instruments** funzionano con entrambi gli stack. La **SONOFF ZBDongle-E** (chip EFR32MG21) è nella lista ZHA; Zigbee2MQTT usa l’adapter `ember`. La **Home Assistant Connect ZBT-2** (MG24) è la chiavetta ufficiale: rete Zigbee **o** **Thread** (protocollo IPv6 mesh per Matter), a scelta firmware.

Dettaglio modelli e tabella: [miglior chiavetta Zigbee per Home Assistant](/it/domotica/miglior-chiavetta-zigbee-home-assistant/).

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Prodotto</th>
<th scope="col">Dove leggere il prezzo</th>
</tr></thead><tbody>
<tr>
<td data-label="Prodotto"><span class="td-val">SONOFF ZBDongle-E</span></td>
<td data-label="Dove leggere il prezzo"><span class="td-val">Scheda del venditore del giorno, in Italia</span></td>
</tr>
<tr>
<td data-label="Prodotto"><span class="td-val">Home Assistant Connect ZBT-2</span></td>
<td data-label="Dove leggere il prezzo"><span class="td-val">Scheda del venditore del giorno, in Italia</span></td>
</tr>
</tbody>
</table>
</div>

**Consiglio documentazione Zigbee2MQTT:** collegate la chiavetta con una **prolunga USB** (~1 m), lontano dal case del Pi e dalle porte USB 3 — primo rimedio per dispositivi che cadono o non si appaiano (interferenze 2,4 GHz).

## Installare ZHA passo passo

1. Chiavetta su Pi o Green, preferibilmente via prolunga USB.
2. Se rilevata: *Impostazioni → Dispositivi e servizi* → dispositivo scoperto → **Configura**.
3. Altrimenti: **Aggiungi integrazione** → **Zigbee Home Automation** → porta seriale della chiavetta.
4. Lasciate che ZHA crei la rete (canale modificabile dopo).
5. Nuovo dispositivo: *Connettività → Zigbee → Aggiungi dispositivo*. Reset del sensore secondo la **procedura del produttore** (spesso pressione lunga sul pulsante). Rinominate e assegnate l’area.

## Installare Zigbee2MQTT (Home Assistant OS)

Se ZHA usa già la chiavetta, **rimuovete l’integrazione ZHA** prima.

1. Add-on **Mosquitto broker** → installate e avviate.
2. *Negozio add-on → ⋮ → Repository* → `https://github.com/zigbee2mqtt/hassio-zigbee2mqtt` → **Aggiungi**.
3. Installate **Zigbee2MQTT** (versione **stable**, non Edge) → **Avvia**.
4. Aprire l’interfaccia web: wizard → chiavetta in *Found Devices*; indicare il canale Wi‑Fi vicino per scegliere un canale Zigbee adatto.
5. Errore `502 Bad Gateway` all’inizio: normale, attendete; oltre ~2 min controllate il **Log** dell’add-on.
6. Appairing dall’interfaccia Z2M; le entità compaiono in Home Assistant via integrazione MQTT.

Configurazione manuale esempio **ZBDongle-E** (porta da `Impostazioni → Sistema → Hardware` o `ls -l /dev/serial/by-id/`):

adapter: ember
port: /dev/serial/by-id/usb-…-if00-port0

Chiavette **Texas Instruments**: adapter `zstack` invece di `ember`.

## Passare da uno all’altro

- **Migrare senza ri-appairing** è documentato soprattutto **dentro ZHA** (cambio chiavetta). Cambiare stack (ZHA ↔ Zigbee2MQTT) implica in pratica **ri-appairing** di tutti i dispositivi — meglio scegliere prima di installare venti sensori.
- **Backup completo** Home Assistant (*Impostazioni → Sistema → Backup*) e annotare nome/posizione di ogni dispositivo prima di qualsiasi cambio.

## Errori più frequenti

**« Chiavetta già in uso »**  
ZHA, Zigbee2MQTT o deCONZ non possono aprire la stessa USB. Un solo stack.

**Dispositivi che escono dalla rete**  
Zigbee e Wi‑Fi condividono 2,4 GHz. Documentazione ZHA: **fissate prima il canale Wi‑Fi** del router, poi aggiungete **router mesh** — [prese smart alimentate](/it/domotica/prese-smart/) e lampadine Zigbee relayano il segnale. Lampadina sempre spenta all’interruttore = buco nella mesh.

**Cambio canale Zigbee in ZHA**  
Possibile, ma i dispositivi possono impiegare fino a ~1 ora per seguire il nuovo canale. Evitatelo senza motivo.

**ZHA non parte su Linux in container**  
Il servizio `modemmanager` può intercettare la USB — disinstallarlo (doc ZHA).

## Consiglio per profilo

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Profilo</th>
<th scope="col">Scelta</th>
</tr></thead><tbody>
<tr>
<td data-label="Profilo"><span class="td-val">Famiglia, 5–20 dispositivi comuni (temp, prese, contatti)</span></td>
<td data-label="Scelta"><span class="td-val"><strong>ZHA</strong></span></td>
</tr>
<tr>
<td data-label="Profilo"><span class="td-val">Script MQTT, automazioni esterne al dashboard HA (<a href="/it/domotica/raspberry-pi-sensore-porta-notifica/">sensore porta Raspberry</a>)</span></td>
<td data-label="Scelta"><span class="td-val"><strong>Zigbee2MQTT</strong></span></td>
</tr>
<tr>
<td data-label="Profilo"><span class="td-val">Modello preciso in mente</span></td>
<td data-label="Scelta"><span class="td-val">Cercatelo in Z2M e nella compatibilità ZHA <strong>prima</strong> dell’acquisto</span></td>
</tr>
</tbody>
</table>
</div>

## FAQ

**ZHA e Zigbee2MQTT insieme?**  
Non sulla stessa chiavetta. Servirebbero due coordinatori = due reti separate — raro e scomodo in casa.

**Zigbee2MQTT è più « professionale »?**  
Più dettagliato e aperto, non necessariamente migliore per tutti. ZHA è l’integrazione promossa da Home Assistant per l’uso domestico.

**Serve MQTT per ZHA?**  
No. Solo Zigbee2MQTT.

**ConBee II ancora valida?**  
Sì: ZHA (deCONZ) e Z2M (`deconz`); Z2M preferisce comunque chiavette TI / Silicon Labs recenti.

**Raspberry Pi 3 basta?**  
Per Zigbee2MQTT: meglio **Pi 4+**. Per la centralina: [Home Assistant Green vs Raspberry Pi 5](/it/domotica/home-assistant-green-vs-raspberry-pi-5/).

## Per approfondire

- [Installare Home Assistant su Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/)
- [Sensore temperatura Zigbee](/it/domotica/sensore-temperatura-zigbee/) — primo dispositivo da appairare
- [Prese smart Zigbee](/it/domotica/prese-smart/) — consumo e ripetitori mesh
- [Hub domotica](/it/domotica/) — indice guide in italiano

---

*Affiliazione: i link Amazon.it usano il tag **roboteducat0f-21**; un acquisto può generare una commissione senza costi extra. Confronto basato sulle documentazioni ufficiali, senza test fisici sul banco.*
