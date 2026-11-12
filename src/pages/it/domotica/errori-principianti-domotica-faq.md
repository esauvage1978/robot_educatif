---
layout: ../../../layouts/ItPost.astro
title: "Errori dei principianti in domotica (FAQ)"
description: "Serve saper programmare? Cloud o locale? E se cade internet? Le domande che i principianti non osano fare in domotica, con risposte franche e consigli per evitare le trappole."
updated: "30 ottobre 2026"
faqSchema:
  - question: "Serve saper programmare per iniziare?"
    answer: "No. Home Assistant ha un editor visivo e Homey usa schede da assemblare chiamate Flow. YAML, ESPHome e MQTT servono più avanti, quando vi viene voglia di sperimentare."
  - question: "Cloud o locale: cosa scegliere?"
    answer: "Se volete che riscaldamento e luci continuino a funzionare quando cade internet, puntate sul locale. Il cloud è comodo per la voce ma crea dipendenza. Molte case uniscono i due."
  - question: "Quanto costa davvero iniziare?"
    answer: "Non esiste una cifra unica. Come ordine di grandezza, alcune decine di euro con il solo Wi-Fi e diverse centinaia con un box, una chiavetta Zigbee e dei sensori. Verificate i prezzi presso il venditore il giorno dell'acquisto."
  - question: "Cosa succede se cade internet?"
    answer: "I sensori Zigbee con un box locale continuano a funzionare. Le prese che dipendono dai server del produttore spesso smettono di rispondere, e la voce cloud non è disponibile."
  - question: "Home Assistant è troppo difficile per me?"
    answer: "C'è una curva di apprendimento, tra aggiornamenti e vocabolario. Il percorso breve e la guida completa vi accompagnano passo dopo passo, e Homey resta un'alternativa meno tecnica."
---

Quando si comincia con la domotica ci si pone molte domande che le guide tecniche non affrontano con franchezza: dovrò programmare? Cosa succede se cade internet? Quanto costa davvero? Posso farlo se sono in affitto?

Questa pagina risponde senza giri di parole. Troverete gli errori che quasi tutti i principianti commettono e come evitarli prima di aver speso un euro. Queste risposte non sostituiscono né le istruzioni di sicurezza degli apparecchi né un elettricista qualificato quando si tratta di intervenire sull'impianto elettrico.

## Per approfondire

- [Quale box domotica per principianti](/it/domotica/quale-box-domotica-per-principianti/)
- [Domotica in affitto, senza lavori](/it/domotica/domotica-in-affitto-senza-lavori/)
- [Glossario della domotica](/it/domotica/glossario-domotica/)
- [Tabella di compatibilità dei dispositivi](/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/)

## I sette errori più frequenti

1. **Comprare prima di avere un obiettivo.** Si torna a casa con dieci oggetti e nessuna regola utile. Scrivete prima cosa volete che la casa faccia.
2. **Moltiplicare le app dei produttori.** Ognuna ha la sua app e il suo account, e si finisce prigionieri di ciascuna. Meglio dispositivi che parlano un linguaggio comune (Zigbee, una radio a basso consumo, oppure Matter, un linguaggio capito da più marche) riuniti da un solo box.
3. **Dimenticare i ripetitori Zigbee.** Un sensore isolato in fondo al giardino non «tiene». Servono apparecchi alimentati dalla rete, come una presa, che ripetano il suo segnale.
4. **Mettere Home Assistant direttamente su internet.** Home Assistant è il software gratuito che riunisce i vostri dispositivi. Per raggiungerlo da fuori, passate da una rete privata virtuale (VPN) o da una soluzione documentata come l'abbonamento Nabu Casa. Scegliete password solide e attivate la verifica in due passaggi quando esiste.
5. **Spegnere qualsiasi presa.** Alcuni apparecchi, come un disco di rete, non gradiscono di essere staccati bruscamente.
6. **Dimenticare di essere in affitto.** Forare o incassare un modulo può essere vietato: leggete la nostra pagina sulla [domotica in affitto](/it/domotica/domotica-in-affitto-senza-lavori/).
7. **Credere che Matter risolva tutto.** Matter è un linguaggio comune promettente, ma il suo catalogo va controllato dispositivo per dispositivo: vedete l'articolo sui [protocolli nel 2027](/it/domotica/matter-thread-zigbee-wifi-quale-protocollo-2027/).

## Domande frequenti

### Serve saper programmare per iniziare?

No. Home Assistant ha un editor visivo, e Homey (un box già pronto che si compra in negozio) usa schede da assemblare chiamate Flow. YAML (un formato di testo per scrivere regole), ESPHome (uno strumento per programmare piccole schede elettroniche) e MQTT (un sistema di messaggi tra dispositivi) servono più avanti, quando vi viene voglia di sperimentare. Le nostre [dieci prime automazioni](/it/domotica/prime-automazioni-domotica/) si fanno senza programmare.

### Cloud o locale: cosa scegliere?

Il cloud sono i server del produttore su internet. Il locale è quando tutto resta in casa vostra. Se volete che riscaldamento e luci continuino a funzionare quando cade internet, puntate sul locale: Home Assistant, Homey con dispositivi locali, Zigbee o moduli Shelly comandati sulla vostra rete. Il cloud è comodo per il comando vocale e per alcune funzioni del produttore, ma crea una dipendenza. Molte case uniscono i due: prima il locale, la voce come complemento.

### Come capisco se un dispositivo è compatibile?

Guardate prima la scheda del produttore, che indica se funziona con Matter, Zigbee o se offre un controllo locale. Consultate poi la [tabella di compatibilità](/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/) e gli elenchi dei dispositivi di ZHA, di Zigbee2MQTT (due strumenti che gestiscono Zigbee in Home Assistant) e delle app Homey. Diffidate delle promesse vaghe come «compatibile Alexa» se puntate a un funzionamento locale con Home Assistant.

### Sono in affitto: cosa posso fare?

Molte cose senza forare: prese, sensori a pila, pulsanti, teste termostatiche amovibili che si avvitano sul termosifone, a volte lampadine a vite. Evitate i moduli da incasso senza il consenso del proprietario. La nostra pagina sulla [domotica in affitto](/it/domotica/domotica-in-affitto-senza-lavori/) spiega tutto nel dettaglio.

### Quanto costa davvero iniziare?

Non esiste una cifra unica. Come ordine di grandezza, contate alcune decine di euro con il solo Wi-Fi e diverse centinaia con un box, una chiavetta Zigbee e dei sensori. Gli abbonamenti facoltativi, come l'accesso da remoto o l'archiviazione delle immagini delle telecamere, si aggiungono. Consultate le fasce nelle pagine sulla [scelta del box](/it/domotica/quale-box-domotica-per-principianti/) e sui [primi dispositivi](/it/domotica/primi-dispositivi-domotica-da-comprare/), e verificate i prezzi presso il venditore il giorno dell'acquisto.

### Sicurezza e privacy: quali buone abitudini adottare?

Usate una password diversa per ogni account e per il box, e fate gli aggiornamenti. Per le telecamere, preferite quelle le cui immagini restano a casa vostra, e sappiate dove finiscono le immagini se non è così. Non esponete mai l'interfaccia di amministrazione del box su internet senza protezione. Se sapete farlo, isolate gli oggetti connessi su una rete separata dal resto della casa; altrimenti cominciate semplicemente, ma cambiate sempre le password di fabbrica.

### Cosa succede se cade internet?

| La vostra installazione | Cosa succede in genere |
|---|---|
| Sensori Zigbee con un box locale (Home Assistant o Homey) | Le automazioni continuano a funzionare |
| Prese che dipendono dai server del produttore | Spesso non rispondono più |
| Comando vocale (Google, Alexa) | Non disponibile o molto limitato |
| Accesso da remoto dall'esterno | Interrotto, ma tutto resta utilizzabile da casa |

### Serve subito un box?

No. Due prese Wi-Fi da provare per una settimana possono bastare. Appena volete che più dispositivi agiscano insieme, passate alla [scelta del box](/it/domotica/quale-box-domotica-per-principianti/).

### Home Assistant è troppo difficile per me?

C'è una curva di apprendimento: gli aggiornamenti, il vocabolario. Il [percorso breve](/it/domotica/come-iniziare/) e la [guida completa](/it/domotica/iniziare-domotica-guida-completa/) vi guidano passo dopo passo. Homey resta un'alternativa meno tecnica.

### Si può fare tutto solo con Matter?

Non ancora per tutte le esigenze: il catalogo dei dispositivi e la maturità variano. Matter è una scommessa sulla compatibilità, utile, ma Zigbee resta molto pragmatico nel 2026. Vedete la pagina sui [protocolli](/it/domotica/protocolli-domotica-zigbee-wifi-thread-matter/).

### Con cosa sostituire un primo box che non va bene?

Se i vostri dispositivi parlano Zigbee o Matter, passare a Home Assistant o a Homey è realistico. La vera trappola sono i dispositivi che dipendono interamente dai server della loro marca. Da qui l'importanza di scegliere bene fin dall'inizio, con la [guida completa](/it/domotica/iniziare-domotica-guida-completa/).

### I prezzi «a circa tot euro» trovati sul web sono affidabili?

Non come un impegno. Prendeteli come ordini di grandezza e aprite la scheda del venditore il giorno dell'acquisto.

### I prodotti consigliati su questo sito sono sponsorizzati?

Alcuni link sono di affiliazione (Amazon, Shelly) e sono segnalati come tali. Se acquistate tramite questi link, il sito può ricevere una commissione, senza costi aggiuntivi per voi. Questo non cambia il criterio: nessun prezzo è inventato e i limiti di ogni prodotto sono indicati.

### Dove chiedere aiuto dopo?

Cominciate dalla documentazione ufficiale di Home Assistant, Homey o Jeedom, poi dalle comunità di utenti. Su questo sito, la pagina dei [codici di errore e risoluzione dei problemi](/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly/) e i [progetti ESP32](/it/domotica/progetti-esp32-domotica/) possono aiutarvi.

---

*Autore: Emmanuel Sauvage.*
