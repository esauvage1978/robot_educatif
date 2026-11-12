---
layout: ../../../layouts/ItPost.astro
title: "Cablaggio ESP32: GPIO, 3,3 V, pull-up"
description: "Cablare un ESP32-C6 senza danni: 3,3 V, pin da evitare, pull-up, resistenza LED, massa comune e test. Materiale, schema GPIO, YAML ESPHome e Home Assistant"
updated: "30 ottobre 2026"
---

Cablare un ESP32, una piccola scheda elettronica con Wi-Fi, richiede il rispetto di poche regole semplici, ma ignorarne una sola basta a bruciare un pin o ad avere misure instabili. Questo tutorial raccoglie le basi utili ai [progetti ESP32 del sito](/it/domotica/progetti-esp32-domotica/), con la ESP32-C6-DevKitC-1 come scheda di riferimento. Imparerete cosa sono i GPIO, i pin metallici allineati sul bordo della scheda, come scegliere quello giusto e come collegare in sicurezza un pulsante e un LED.

**Risultato atteso:** saper scegliere un pin, collegare un pulsante e un LED senza rischi e provare il montaggio con ESPHome. **Durata:** 30 minuti. **Difficoltà:** principiante.

## Regola 1: i pin lavorano a 3,3 V

I pin GPIO dell’ESP32-C6 lavorano a **3,3 V** e non tollerano i 5 V. Collegare l’uscita a 5 V di un sensore direttamente a un ingresso può danneggiarlo. Due soluzioni: alimentare il sensore a 3,3 V se lo accetta, oppure abbassare il suo segnale con un **convertitore di livello** o un **partitore di tensione** (due resistenze, ad esempio 10 kΩ e 20 kΩ per passare da 5 V a circa 3,3 V).

Ogni pin fornisce una corrente limitata: puntate a **una decina di milliampere al massimo** e non superate mai i valori della scheda tecnica Espressif. Per un carico più grande (relè, striscia LED, motore), usate un modulo fatto apposta, alimentato separatamente, con **massa comune** al microcontrollore.

## Quali pin sulla ESP32-C6-DevKitC-1?

| Pin | Nota | Uso consigliato |
|---|---|---|
| Da GPIO0 a GPIO3, GPIO6, GPIO7, GPIO10, GPIO11, da GPIO18 a GPIO23 | Liberi all’avvio | Ingressi, uscite, I²C, UART |
| Da GPIO0 a GPIO6 | Possono leggere una tensione analogica (ADC) | Sonde analogiche |
| GPIO4, GPIO5, GPIO8, GPIO9, GPIO15 | Pin di configurazione all’avvio; GPIO8 pilota il LED RGB della scheda, GPIO9 è il pulsante BOOT | Da evitare o da usare con cautela |
| GPIO12, GPIO13 | Collegamento USB nativo | Da lasciare liberi |
| GPIO16, GPIO17 | Console seriale (UART0) | Da lasciare liberi |

Questo elenco segue la documentazione Espressif della scheda; verificatelo per un’altra scheda (ad esempio XIAO ESP32C6), i cui pin hanno altri numeri.

## Resistenze di pull-up e ingressi

Un ingresso collegato a nulla «fluttua» e legge valori casuali. Una **resistenza di pull-up** lo fissa a un livello noto. L’ESP32 ha resistenze interne attivabili in ESPHome:

```yaml
binary_sensor:
  - platform: gpio
    name: "Pulsante di prova"
    pin:
      number: GPIO10
      mode: INPUT_PULLUP      # livello alto a riposo
      inverted: true          # pressione = ON
    filters:
      - delayed_on: 50ms      # antirimbalzo
      - delayed_off: 50ms
```

Il pulsante è collegato tra GPIO10 e GND: a riposo il pin legge 3,3 V, premuto legge 0 V. Le resistenze interne sono piuttosto deboli; per un cavo più lungo di qualche metro aggiungete una resistenza esterna da 10 kΩ verso 3V3.

## Collegare un LED con la sua resistenza

Un LED senza resistenza assorbe troppa corrente. Il calcolo è semplice: R = (3,3 V − tensione del LED) ÷ corrente voluta. Per un LED rosso di circa 2 V a 5 mA: (3,3 − 2) ÷ 0,005 = 260 Ω, quindi va bene una **resistenza da 330 Ω**. Collegate GPIO18 → resistenza → anodo (piedino lungo) → catodo → GND.

```yaml
output:
  - platform: gpio
    pin: GPIO18
    id: led_out

light:
  - platform: binary
    name: "LED di prova"
    output: led_out
```

Questi due estratti non sono stati eseguiti su una scheda per questo articolo; seguono la sintassi standard della documentazione ESPHome.

## Altre regole da conoscere

- **Massa comune:** tutti i moduli collegati al microcontrollore devono condividere il GND, altrimenti i segnali non hanno riferimento.
- **Polarità:** invertire + e − distrugge spesso il componente. Controllate con la marcatura o la scheda tecnica.
- **Bus I²C:** SDA e SCL ricevono resistenze di pull-up (già presenti sulla maggior parte dei moduli); ogni dispositivo ha un indirizzo. L’opzione `scan: true` li elenca.
- **Carichi induttivi** (relè, elettrovalvole, motori): aggiungete un diodo di ricircolo per i carichi in corrente continua.
- **230 V:** non collegate mai la rete a un pin, a una scheda di prova o a un modulo senza protezione. I montaggi di rete spettano a un elettricista.

## Metodo di prova in quattro passaggi

1. **Montate su breadboard** prima di saldare.
2. **Controllate con il multimetro:** continuità dei collegamenti, nessun cortocircuito tra 3V3 e GND, a circuito spento.
3. **Collegate un componente alla volta** e provatelo prima di aggiungere il successivo.
4. **Leggete i log di ESPHome** se un componente non risponde.

**Verifica:** in Home Assistant, «Pulsante di prova» passa a «on» quando premete e «LED di prova» accende il LED.

## Problemi frequenti

| Sintomo | Causa probabile | Soluzione |
|---|---|---|
| La scheda non si avvia più dopo un collegamento | Un componente tira un pin di configurazione | Scollegate GPIO4, 5, 8, 9 o 15, o cambiate pin |
| L’ingresso cambia da solo | Pin flottante o cavo lungo | Pull-up interno o esterno, cavo più corto |
| LED debolissimo o spento | Polarità invertita o resistenza troppo alta | Girate il LED, provate da 220 a 330 Ω |
| Valori analogici instabili | Alimentazione rumorosa o pin non ADC | Usate da GPIO0 a GPIO6, aggiungete un filtro `median` |
| Un componente è caldo | Cortocircuito o polarità errata | Scollegate subito e ricontrollate |

Per andare oltre: [flashare una scheda](/it/domotica/flashare-esp32-esphome/) e [aggiornare senza cavo](/it/domotica/aggiornamenti-ota-esphome/). Documentazione ufficiale: [ESP32-C6-DevKitC-1, Espressif](https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c6/esp32-c6-devkitc-1/user_guide.html).

<small>Aggiornato il 30 ottobre 2026. Verificate i numeri dei pin della vostra scheda prima di ogni cablaggio.</small>
