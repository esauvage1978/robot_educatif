---
layout: ../../../layouts/ItPost.astro
title: "Prime automazioni domotica utili"
description: "Dieci prime automazioni semplici per la vostra casa: luce, riscaldamento, lavatrice, assenza... spiegate per Home Assistant e per Homey, senza obbligo di programmare."
updated: "30 ottobre 2026"
faqSchema:
  - question: "Devo imparare YAML?"
    answer: "Non per cominciare. L'editor visivo di Home Assistant copre questi dieci casi. YAML diventa utile più avanti, per conservare una copia delle vostre regole o per esigenze avanzate."
  - question: "I Flow di Homey e Home Assistant sono equivalenti?"
    answer: "Per questi dieci esempi sì: producono lo stesso risultato. I dettagli cambiano per la localizzazione del telefono, i modelli di regole e gli script. Partite dal box che avete, oppure fatevi aiutare dalla pagina sulla scelta del box."
  - question: "Perché la mia automazione funziona solo una volta su due?"
    answer: "Le cause più frequenti sono un sensore troppo lontano dal resto della rete radio, una pila scarica o una condizione troppo rigida. Guardate lo storico degli stati del dispositivo e la qualità del collegamento radio."
  - question: "Dove trovo altre idee di progetto?"
    answer: "Nei nostri progetti ESP32 e nella guida completa per iniziare, che mostra l'intero percorso."
---

Il vostro box è collegato, i primi sensori sono riconosciuti, e adesso? È il momento in cui la domotica diventa davvero utile: quando la casa agisce da sola. Una buona automazione risponde a un bisogno reale («non voglio scaldare con le finestre aperte»), non alla voglia di un gadget.

Questa pagina vi dà dieci idee semplici. Per ciascuna saprete a cosa serve, di cosa avete bisogno e come crearla in Home Assistant (un software gratuito che riunisce tutti i vostri dispositivi) e in Homey (un box già pronto che si compra in negozio). Non serve saper programmare. Il materiale necessario è presentato nei [primi dispositivi da comprare](/it/domotica/primi-dispositivi-domotica-da-comprare/), e le parole sconosciute sono nel [glossario](/it/domotica/glossario-domotica/).

## Per approfondire

- [I primi dispositivi da comprare](/it/domotica/primi-dispositivi-domotica-da-comprare/)
- [Glossario della domotica](/it/domotica/glossario-domotica/)
- [Homey Pro mini: unboxing e installazione](/it/domotica/test-homey-pro-mini-unboxing-installazione/)
- [Installare Home Assistant su Raspberry Pi 5](/it/domotica/installare-home-assistant-raspberry-pi-5/)

## Il principio, in tre parole

Ogni automazione segue lo stesso schema: un evento la avvia, eventualmente una condizione precisa in quale caso deve agire, e un'azione fa ciò che viene chiesto. I due software usano parole diverse per la stessa idea.

| Cosa vogliamo dire | In Home Assistant | In Homey |
|---|---|---|
| L'evento che avvia la regola (l'attivatore) | Attivatore | «Quando...» |
| Il filtro che precisa in quale caso agire (la condizione) | Condizione | «E...» |
| Ciò che fa la casa (l'azione) | Azione | «Allora...» |

In Home Assistant, create una regola dal menu Impostazioni, poi Automazioni e scene, con un editor visivo: le etichette possono variare un po' a seconda della versione. In Homey, assemblate delle schede nella sezione dei Flow. Per questi dieci casi non serve nessuna riga di codice. Il piccolo esempio in YAML (un formato di testo per scrivere una regola a mano) più sotto serve solo da illustrazione.

## 1. Accendere la luce quando si passa

**A cosa serve:** il corridoio si illumina di notte senza cercare l'interruttore, poi si spegne quando nessuno si muove più.  
**Di cosa avete bisogno:** un rilevatore di movimento e una luce (lampadina smart, presa o relè).

In Home Assistant, scegliete il rilevatore di movimento come attivatore, aggiungete una condizione «è notte» (sole sotto l'orizzonte, o luminosità bassa), poi l'azione di accendere la luce. Per lo spegnimento, create una seconda regola con un ritardo dopo l'ultimo rilevamento.

In Homey, assemblate una scheda «Quando viene rilevato un movimento», «E è notte», «Allora accendi la luce». Un secondo Flow, con una scheda di ritardo, spegne la luce.

## 2. Essere avvisati se una finestra resta aperta con il riscaldamento acceso

**A cosa serve:** evitare di scaldare per niente.  
**Di cosa avete bisogno:** un sensore di apertura e un apparecchio di riscaldamento connesso (valvola per termosifone, presa o termostato).

In Home Assistant, avviate la regola quando il sensore indica «aperto», aggiungete la condizione «il riscaldamento è attivo», poi inviate una notifica al telefono. Potete anche abbassare la temperatura o spegnere il riscaldamento.

In Homey, è la stessa sequenza con una scheda «Quando il contatto si apre», «E il riscaldamento è acceso», «Allora invia una notifica» e, se il vostro apparecchio lo consente, una scheda per abbassare la temperatura impostata.

## 3. Sapere quando la lavatrice ha finito

**A cosa serve:** ricevere un messaggio appena finisce il ciclo, per non lasciare il bucato umido.  
**Di cosa avete bisogno:** una presa che misura il consumo di elettricità.

In Home Assistant, la regola scatta quando la potenza torna sotto una soglia bassa dopo aver superato una soglia alta. Per questo la comunità propone modelli di regola chiamati blueprint, che evitano di costruire tutto a mano. In Homey basta una scheda sulla potenza assorbita (a seconda dell'app della vostra presa), con una notifica come azione.

Le soglie giuste dipendono dalla vostra lavatrice: osservate una volta la sua curva di consumo prima di impostare i valori.

## 4. Modalità «assente»: spegnere tutto uscendo

**A cosa serve:** un solo gesto, oppure la vostra uscita di casa, spegne le luci e alcune prese.  
**Di cosa avete bisogno:** un pulsante senza fili, o il rilevamento di presenza del vostro telefono.

In Home Assistant, avviate la regola quando la persona esce di casa (o quando si attiva un interruttore virtuale «assente»), poi spegnete le luci e le prese scelte, oppure lanciate una scena (un insieme di stati richiamati in un colpo solo). In Homey, usate «Quando esco di casa» (localizzazione del telefono) o la pressione di un pulsante, poi spegnete le luci della zona.

La localizzazione via telefono non è mai perfetta. Tenete sempre un pulsante fisico di riserva.

## 5. Una luce notturna a orario fisso per i bambini

**A cosa serve:** una luce soffusa che si accende all'ora di andare a letto.  
**Di cosa avete bisogno:** una lampadina con intensità regolabile.

In Home Assistant, scegliete un orario come attivatore e accendete la luce a bassa luminosità. In Homey, «Quando l'ora è...», «Allora accendi la luce a tale percentuale».

## 6. Un avviso se la temperatura scende troppo

**A cosa serve:** individuare un rischio di gelo per le tubature, o una mancanza di riscaldamento.  
**Di cosa avete bisogno:** un sensore di temperatura.

In Home Assistant, avviate la regola quando la temperatura scende sotto una soglia (per esempio cinque gradi) e inviate una notifica, eventualmente accendendo un riscaldamento. In Homey, «Quando la temperatura diventa inferiore a...», «Allora invia un avviso».

## 7. Accendere una lampada al tramonto

**A cosa serve:** un'atmosfera calda a fine giornata.  
**Di cosa avete bisogno:** una luce connessa.

In Home Assistant, usate l'attivatore «tramonto» (potete spostarlo di qualche minuto), poi accendete la luce. In Homey, «Quando il sole tramonta», «Allora accendi».

## 8. Staccare lo standby di notte

**A cosa serve:** risparmiare l'elettricità di apparecchi che restano accesi per niente, come un televisore e il suo decoder.  
**Di cosa avete bisogno:** prese comandabili a distanza.

In Home Assistant, spegnete le prese alle 23:30 e riaccendetele alle 7 se serve. In Homey, riprendete la stessa idea con «Quando l'ora è...».

Verificate prima che l'apparecchio sopporti di essere staccato di colpo: un disco di rete (NAS) o certi decoder non lo gradiscono per niente.

## 9. Essere avvisati quando si apre la porta d'ingresso

**A cosa serve:** sapere chi entra, per esempio quando i bambini rientrano da soli.  
**Di cosa avete bisogno:** un sensore di apertura.

In Home Assistant, inviate una notifica appena il sensore si apre, con in più, se volete, la condizione «non c'è nessuno in casa». In Homey, «Quando la porta si apre», «Allora invia una notifica».

## 10. Ricordarsi di arieggiare

**A cosa serve:** un promemoria per aprire le finestre dieci minuti, a orario fisso o quando l'aria è troppo viziata.  
**Di cosa avete bisogno:** o niente, solo l'orario; oppure un sensore di CO₂, il gas che si accumula in una stanza chiusa (vedete [questo progetto con un Raspberry Pi e un sensore SCD41](/it/domotica/raspberry-pi-co2-scd41-home-assistant/)).

In Home Assistant, avviate la regola a orario regolare, o quando il livello di CO₂ supera una soglia, poi inviate una notifica. In Homey, «Quando arriva l'ora» o «Quando la CO₂ è alta», poi «Allora notifica».

## Un esempio in YAML per Home Assistant

Ecco la prima automazione (la luce del corridoio) scritta come testo. Potete copiarla nell'editor in modalità YAML, dopo aver sostituito i nomi con quelli dei vostri dispositivi.

```yaml
# A titolo illustrativo: sostituite gli entity_id con i vostri
automation:
  - alias: "Corridoio: movimento di notte"
    trigger:
      - platform: state
        entity_id: binary_sensor.corridoio_movimento
        to: "on"
    condition:
      - condition: state
        entity_id: sun.sun
        state: "below_horizon"
    action:
      - service: light.turn_on
        target:
          entity_id: light.corridoio
```

Questo esempio non è stato eseguito sulla vostra installazione. Dopo averlo adattato, usate lo strumento di verifica dell'editor di Home Assistant prima di salvarlo.

## Qualche consiglio per non annegare

Un'automazione deve rispondere a un solo bisogno, non a tre. Datele un nome chiaro, del tipo «Avviso finestra soggiorno con termosifone», per ritrovarla fra sei mesi. Provatela prima con una semplice notifica prima di affidarle un'azione più pesante, come spegnere il riscaldamento. E per le soglie di consumo della lavatrice, misurate prima di impostare.

Per proseguire il percorso, passate agli [errori dei principianti](/it/domotica/errori-principianti-domotica-faq/) o tornate alla [guida completa](/it/domotica/iniziare-domotica-guida-completa/).

## Domande frequenti

**Devo imparare YAML?**
Non per cominciare. L'editor visivo di Home Assistant copre questi dieci casi. YAML diventa utile più avanti, per conservare una copia delle vostre regole o per esigenze avanzate.

**I Flow di Homey e Home Assistant sono equivalenti?**
Per questi dieci esempi sì: producono lo stesso risultato. I dettagli cambiano per la localizzazione del telefono, i modelli di regole e gli script. Partite dal box che avete, oppure fatevi aiutare dalla [pagina sulla scelta del box](/it/domotica/quale-box-domotica-per-principianti/).

**Perché la mia automazione funziona solo una volta su due?**
Le cause più frequenti sono un sensore troppo lontano dal resto della rete radio, una pila scarica o una condizione troppo rigida. Guardate lo storico degli stati del dispositivo e la qualità del collegamento radio.

**Dove trovo altre idee di progetto?**
Nei nostri [progetti ESP32](/it/domotica/progetti-esp32-domotica/) e nella [guida completa per iniziare](/it/domotica/iniziare-domotica-guida-completa/), che mostra l'intero percorso.

---

*Autore: Emmanuel Sauvage. Esempi didattici: adattate i nomi dei dispositivi e le soglie alla vostra installazione.*
