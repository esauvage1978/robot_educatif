---
layout: ../../../layouts/ItPost.astro
title: Aggiornamenti OTA ESPHome senza cavo
description: "Aggiornate un ESP32 via Wi-Fi con ESPHome: OTA, password, Home Assistant, safe mode e problemi frequenti. Materiale, schema GPIO, YAML ESPHome e Home Assis"
updated: "30 ottobre 2026"
---

**OTA** sta per «Over The Air», letteralmente «via etere»: aggiornare il programma di un ESP32, una piccola scheda elettronica con Wi-Fi, tramite la rete wireless, senza scollegarlo dal muro né riportarlo al computer per collegare un cavo USB. Per un sensore fissato nel controsoffitto, un tablet a muro o un’elettrovalvola in giardino, è ciò che rende la manutenzione praticabile: modificate il file di configurazione (lo YAML) comodamente dal divano e la scheda si aggiorna da sola.

**Risultato atteso:** una nuova versione dello YAML installata senza cavo e una procedura di recupero se qualcosa va storto. **Durata:** 10 minuti. **Difficoltà:** principiante.

## Prerequisiti

- Un dispositivo già flashato una volta via USB con uno YAML che contiene il blocco `ota:` ([primo flash](/it/domotica/flashare-esp32-esphome/)).
- Il dispositivo acceso, connesso al Wi-Fi e visibile in ESPHome (indicatore «Online»).
- Un computer o un Home Assistant sulla stessa rete locale.

## Attivare l’OTA nello YAML

Le configurazioni di questo sito contengono già questo blocco:

```yaml
ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "mio-dispositivo Fallback"
    password: !secret ap_password

captive_portal:
```

La password impedisce a qualsiasi altra macchina della rete di inviare un programma alla vostra scheda. I blocchi `ap` e `captive_portal` creano una rete Wi-Fi di emergenza se la scheda non ritrova quella abituale: vedi la sezione recupero.

## Aggiornare da ESPHome Device Builder

1. Modificate il file YAML del dispositivo, ad esempio cambiando un intervallo di misura.
2. Fate clic su **Install** (o **⋮ → Install**).
3. Scegliete **Wirelessly**.
4. Attendete la compilazione e poi il caricamento: compare una barra di avanzamento e poi la scheda si riavvia.

Da riga di comando, `esphome run mio-dispositivo.yaml` propone la stessa scelta e trova il dispositivo in rete.

**Verifica:** nei log la scheda si ricollega al Wi-Fi e poi a Home Assistant. In **Impostazioni → Dispositivi e servizi**, la versione di ESPHome del dispositivo è aggiornata nella sua scheda.

## Cosa fare se l’OTA fallisce?

La scheda si recupera quasi sempre senza cavo:

- **Safe mode:** se la scheda si riavvia più volte di seguito (10 per impostazione predefinita) senza avviarsi correttamente, ESPHome lancia una modalità minima che accetta solo l’OTA. Correggete lo YAML e reinstallatelo senza fili.
- **Wi-Fi di emergenza:** se la rete abituale non si trova, collegatevi al Wi-Fi «Fallback» della scheda con la password `ap_password`. La pagina del portale permette di scegliere una rete o di caricare un file `.bin`.
- **Ultima risorsa:** riflashate via USB ([tutorial](/it/domotica/flashare-esp32-esphome/)).

## Problemi frequenti

| Sintomo | Causa probabile | Soluzione |
|---|---|---|
| «Error resolving IP address» | Il nome `.local` non si risolve (mDNS) | Aggiungete `use_address: 192.168.x.x` sotto `wifi:` e riservate quell’IP nel router |
| Password rifiutata | La password è cambiata nello YAML | Riflashate una volta via USB con la nuova password |
| Caricamento interrotto | Segnale Wi-Fi debole | Avvicinate la scheda al router e riprovate |
| Dispositivo «Offline» | Spento o su un’altra rete | Verificate alimentazione e Wi-Fi |
| Compila ma non invia | Firewall o VLAN tra computer e scheda | Consentite la porta 3232 tra i due |

## Buone pratiche di sicurezza

Mantenete una password OTA, non esponetela mai su Internet (la porta 3232 non deve mai essere inoltrata dal router) e conservate al sicuro la chiave di cifratura dell’API. Aggiornate ESPHome regolarmente: ogni versione elenca le modifiche nel [changelog](https://esphome.io/changelog/). Dopo un salto di versione, leggete i breaking changes prima di reinstallare i dispositivi.

Avanti: [progetti ESP32 passo dopo passo](/it/domotica/progetti-esp32-domotica/) e [basi del cablaggio GPIO](/it/domotica/basi-cablaggio-esp32-gpio/).

<small>Aggiornato il 30 ottobre 2026. Fonte: [documentazione ESPHome, piattaforma OTA](https://esphome.io/components/ota/esphome/). I valori predefiniti possono cambiare tra le versioni.</small>
