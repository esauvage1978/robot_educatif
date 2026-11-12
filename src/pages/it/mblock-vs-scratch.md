---
layout: ../../layouts/ItPost.astro
title: "mBlock o Scratch: quale scegliere per iniziare?"
description: "Solo Scratch o mBlock con un robot Makeblock? Differenze, età consigliata e quando passare dall’uno all’altro."
updated: "2026-11-06"
---

Questa pagina confronta Scratch e mBlock come linguaggi e ambienti. Non è la pagina per scaricare o aprire l’IDE. Per quello usa [mBlock online](/it/mblock-online-senza-installazione/), [scaricare mBlock 5](/it/scaricare-mblock-5-gratis/) o [quale software Makeblock scegliere](/it/software-mblock-quale-scegliere/). Scratch online basta se non c’è un robot. mBlock aggiunge i blocchi Makeblock, compreso il mBot.

Sono due ambienti di programmazione a blocchi, pensati per bambini e principianti. Scratch serve a inventare un gioco, un’animazione o una storia sul computer. mBlock prende la stessa logica e la manda a un robot o a una scheda. La scelta dipende dal contesto: scuola, casa o robotica.

## Riepilogo rapido: mBlock vs Scratch

| Criterio | Scratch | mBlock |
|---------|---------|--------|
| **Uso principale** | Videogiochi, animazioni, storie | Robotica, IoT (Internet delle cose), progetti elettronici |
| **Hardware** | 100% software (solo computer) | Compatibile con robot (mBot, Arduino, micro:bit…) |
| **Età target** | 6–14 anni | 8–16 anni |
| **Community** | Molto ampia (progetti pubblici su scratch.mit.edu) | Media, legata ai robot Makeblock |
| **Gratuito** | Sì, del tutto | Sì, account opzionale |
| **Online** | Sì, scratch.mit.edu | Sì, ide.mblock.cc |
| **App** | Sì: Windows, Mac, Linux, tablet | Sì: Windows, Mac, Linux, iOS, Android |
| **Export codice** | No, solo blocchi | Sì: Arduino C e Python |
| **Linguaggio successivo** | Python, JavaScript | Arduino C, Python |

In una frase: Scratch crea giochi e animazioni sul computer, mBlock programma robot e oggetti connessi.

## Cos’è Scratch?

![Logo Scratch](/images/logos/scratch-logo.svg)

Scratch è un linguaggio di programmazione visivo creato dal MIT (Massachusetts Institute of Technology) nel 2007. Il bambino impila blocchi di codice colorati per costruire un gioco, un’animazione o una storia interattiva.

Si parte dal browser, senza un’installazione complicata. La community è molto ampia, i progetti pubblici di scratch.mit.edu si possono aprire e modificare. Tutorial, corsi online e libri esistono in molte lingue. Basta un computer, e questo va bene a scuola. I progetti tipici sono giochi a piattaforme (platform games), quiz e storie animate.

I limiti stanno sullo stesso piano. Il programma resta virtuale: Scratch, di serie, non si collega a un robot o a un sensore fisico. Non c’è un passaggio integrato dai blocchi al codice testo, e un progetto non diventa un’app esportata. I giochi complessi incontrano abbastanza in fretta i limiti di prestazioni.

Scratch va bene dai 6 ai 12 anni, per chi scopre la programmazione, e resta utilizzabile fino a circa 14 anni. È lo strumento della scuola primaria quando il progetto è una storia, un gioco o un’animazione e bastano computer o tablet. Il punto di partenza è [Scratch a scuola e a casa](/it/scratch-scuola-casa-inizio/).

## Cos’è mBlock?

![Logo mBlock](/images/logos/mblock-logo.svg)

mBlock è l’ambiente di Makeblock, azienda cinese di robotica educativa. Si basa su Scratch, con blocchi in più per pilotare robot fisici: mBot, Arduino, micro:bit e altre schede.

Parla ai robot Makeblock (mBot, mBot2), ad Arduino, al micro:bit e a CyberPi. I blocchi si esportano in Arduino C o in Python, quindi il passaggio al testo si vede. I progetti possono usare Wi-Fi, Bluetooth e sensori connessi. Il software è gratuito su Windows, Mac, Linux, iOS e Android. Due modi stanno affiancati: «Live» prova mentre il robot resta collegato al computer, «Carica» copia il programma nel robot, che poi gira da solo.

La community è più piccola di quella di Scratch e i progetti condivisi sono meno numerosi. La documentazione è a volte in inglese, con meno risorse locali. Per usare mBlock per intero serve dell’hardware. L’installazione può fare i capricci: driver, Bluetooth, cavo USB.

mBlock è per gli 8-16 anni che vogliono programmare un oggetto che si muove. Alle medie, in tecnologia o in un club di robotica, serve per robot, sensori, LED e motori, e prepara la programmazione embedded, cioè il codice che gira sulla scheda. Per installare e partire: [Installare mBlock 5 su Windows](/it/installare-mblock-5-windows/), [Primi passi con mBlock 5](/it/primi-passi-mblock-5/), [mBot: il mio primo robot educativo](/it/mbot-il-mio-primo-robot-educativo/) e [Robot programmabile con Scratch: quale scegliere?](/robot-programmable-scratch-lequel-choisir/).

## Confronto dettagliato

### 1. Interfaccia e primi passi

Scratch è pulito e colorato. La tavolozza dei blocchi sta a sinistra, la scena al centro, il codice a destra. Un primo script richiede circa cinque minuti.

mBlock riprende questa disposizione di proposito. La tavolozza resta, e le estensioni hardware mettono il robot accanto agli sprite. Conta dieci o quindici minuti, perché il robot va ancora collegato.

Scratch è l’avvio più semplice. mBlock chiede una fase di installazione.

### 2. Progetti possibili

Con Scratch si fanno giochi (a piattaforme, labirinto, quiz), animazioni e cartoni, simulazioni come un sistema solare o un ecosistema, e arte generativa (frattali, spirografi).

Con mBlock il programma esce dallo schermo: robot seguilinea, evitamento ostacoli, rilevatore di intrusione, matrice di LED, oppure un piccolo progetto connesso (temperatura, meteo, domotica). L’IoT, l’Internet delle cose, è proprio questo: oggetti che si scambiano dati in rete.

Sono due universi. Si sceglie in base all’obiettivo, virtuale o fisico.

### 3. Apprendimento della programmazione

Scratch copre le idee di base: cicli, condizioni, variabili, eventi. La logica si vede senza la distrazione dell’hardware, e i bambini inventano le proprie regole. Il passaggio successivo a Python o JavaScript non è preparato dallo strumento: si resta nei blocchi.

mBlock riprende questi concetti e aggiunge sensori e attuatori. L’export mostra come un blocco diventa C o Python. Il codice guida un oggetto reale, e il seguito naturale è Arduino C o Python.

mBlock prepara meglio una programmazione più tecnica.

### 4. Hardware richiesto

Scratch chiede un computer o un tablet con browser, una connessione internet o la versione offline, e nient’altro.

mBlock chiede un computer Windows, Mac o Linux, un cavo USB (a volte il Bluetooth) e pile o un alimentatore. Il robot più diretto è il Makeblock mBot: 89,99 € su Amazon.it, rilevamento del 6 novembre 2026. Una scheda Arduino o un micro:bit possono sostituire il robot completo. Controlla il prezzo: questo rilevamento non riporta un importo attuale per quelle schede. Scratch non costa nulla in hardware. mBlock presuppone l’acquisto di un robot o di una scheda.

### 5. Risorse e community

Scratch pubblica i progetti su scratch.mit.edu: si possono consultare e modificare. I forum sono attivi, il supporto arriva dal MIT, e libri, corsi e MOOC (corsi online aperti) esistono in molte lingue.

mBlock resta legato ai prodotti Makeblock. I tutorial ufficiali ci sono, con una qualità diseguale. I forum sono meno attivi di quelli di Arduino o di Scratch. Come risorse locali restano soprattutto questo sito e alcuni canali YouTube.

Sulla dimensione della community, Scratch è nettamente avanti.

### 6. Evoluzione e durata

Scratch accompagna all’incirca dai 6 ai 14 anni. Dopo, i passi abituali sono Python con pygame o JavaScript con p5.js. I progetti restano accessibili online.

mBlock copre piuttosto dagli 8 ai 16 anni, poi Arduino C o Python. I progetti si salvano in locale nel formato .mblock, oppure nel cloud.

Grazie all’export del codice, mBlock dura di più.

## Casi d’uso: quando scegliere cosa?

Scratch è il primo contatto giusto tra i 6 e gli 8 anni, soprattutto se non c’è budget per l’hardware. Va bene a una scuola primaria che ha computer ma non robot, quando la priorità è un gioco, una storia o le arti visive e non è previsto un seguito di robotica. Una quarta o una quinta elementare che scopre gli algoritmi è esattamente questo caso.

mBlock si impone quando il robot c’è già, o sta per essere comprato, in genere dagli 8 anni, quando un progetto fisico è realistico. È lo strumento della scuola media e del club di robotica, della preparazione ad Arduino e dei sensori connessi o della domotica. Una seconda media di tecnologia con i mBot ne è l’esempio tipo.

I due strumenti si succedono bene. Si comincia con Scratch verso i 6-8 anni, il tempo di imparare la logica per uno o due anni. Verso gli 8-10 anni, mBlock riusa quelle basi su un robot, per un altro anno o due. Dai 12 anni, Arduino C o Python passano al codice testo.

## Differenze tecniche

### Blocchi disponibili

Scratch propone il movimento degli sprite, l’aspetto (costumi, fumetti, effetti), il suono (note e registrazioni), gli eventi (clic e tasti), il controllo (cicli e condizioni), i sensori di mouse, microfono e orologio, gli operatori matematici, logici e di testo, poi variabili e liste.

mBlock tiene tutti questi blocchi. Aggiunge i motori (avanti, indietro, velocità), i sensori (ultrasuoni, linea, luce, temperatura), gli attuatori (LED RGB, buzzer, servomotori), la comunicazione (Bluetooth, Wi-Fi, seriale) e le estensioni per Arduino, micro:bit, CyberPi e IA.

### Modalità di esecuzione

Scratch gira online, in tempo reale nel browser. L’app offline è l’eccezione.

mBlock ha tre modi. «Live» prova subito, robot collegato al computer. «Carica» copia il programma nel robot, che poi funziona senza PC. «Scratch» si comporta come Scratch, senza robot.

### Export del codice

Scratch non esporta. Il progetto si rilegge solo in Scratch.

mBlock esporta in Arduino C: si vede il codice generato e lo si può modificare nell’IDE Arduino. L’export Python riguarda i robot compatibili, in particolare CyberPi e micro:bit. L’interesse è capire che cosa fa davvero il blocco.

Esempio:

```cpp
// Blocco mBlock: «Avanti a velocità 100»
// diventa in Arduino C:
mBot.motor.leftWheel.setSpeed(100);
mBot.motor.rightWheel.setSpeed(100);
```

## Installazione e primi passi

Per Scratch, apri [scratch.mit.edu](https://scratch.mit.edu) e clicca su Crea. Il progetto parte nel browser. Esiste anche l’app offline per Windows, Mac e Linux.

Per mBlock, l’editor online è su [ide.mblock.cc](https://ide.mblock.cc). Per la versione installata, scarica mBlock 5 da [mblock.cc](https://mblock.cc/), segui la procedura guidata, collega il robot in USB o Bluetooth, aggiungi la sua estensione (per esempio «mBot») e prova la connessione. I passi su Windows sono in [Installare mBlock 5 su Windows](/it/installare-mblock-5-windows/).

## Progetti di esempio

### Progetto Scratch: gioco Pong

```
Quando si clicca la bandiera verde
Ripeti all’infinito
  Se tasto «spazio» premuto
    Sposta racchetta di 10 pixel
  Se palla tocca il bordo
    Rimbalza
```

Un gioco completo sta in 20-30 blocchi e si gioca nel browser.

### Progetto mBlock: robot seguilinea

```
Quando il programma inizia
Ripeti all’infinito
  Se sensore linea sinistro = nero E destro = bianco
    Gira a sinistra
  Altrimenti se destro = nero E sinistro = bianco
    Gira a destra
  Altrimenti
    Vai dritto
```

Il robot autonomo segue una linea nera su fondo bianco.

## Compatibilità hardware

Scratch non ha un robot compatibile in modo nativo. Esistono estensioni non ufficiali, ScratchX e Snap!, ma sono poco affidabili.

mBlock riconosce il mBot (robot su ruote Makeblock), il mBot2 (versione avanzata con CyberPi), Codey Rocky, le schede Arduino UNO, Nano e Mega, il micro:bit della BBC, il Raspberry Pi Pico, il CyberPi usato da solo e i sensori Grove dell’ecosistema Seeed Studio.

Il Makeblock mBot è il primo robot abituale per mBlock, circa dagli 8 ai 12 anni. Si programma a blocchi, sullo stile di Scratch, e in Arduino. I blocchi restano accessibili e nel kit ci sono già diversi sensori. Su Amazon.it costa 89,99 €, rilevamento del 6 novembre 2026.

[mBot su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21) — verifica prezzo e scheda del giorno.

*Partner Amazon — può essere versata una commissione sugli acquisti idonei, senza costi aggiuntivi per te.*

## FAQ — mBlock vs Scratch

### mBlock è più difficile di Scratch?

Non proprio. L’interfaccia è quasi la stessa. La difficoltà in più viene dal collegamento del robot (USB, Bluetooth, driver) e dalla lettura dell’hardware: sensori e motori. Una volta stabilito il collegamento, programmare è dello stesso ordine.

### Si può passare facilmente da Scratch a mBlock?

Sì. Chi padroneggia Scratch si orienta in una trentina di minuti. I blocchi sono gli stessi. Cambia solo la parte hardware.

### Serve obbligatoriamente un robot per usare mBlock?

No. La modalità «Scratch» funziona senza robot, come Scratch. L’interesse principale di mBlock resta però programmare dell’hardware.

### mBlock funziona con i robot LEGO?

No. Mindstorms e SPIKE hanno un loro software. Per LEGO serve LEGO Education, oppure un’alternativa come EV3 Classroom.

### Scratch è davvero gratuito? E mBlock?

Sì, entrambi sono del tutto gratuiti. Scratch è un progetto del MIT, educativo e senza pubblicità. mBlock è gratuito per un uso personale ed educativo: Makeblock si remunera vendendo robot, non il software.

### Si può usare mBlock offline?

Sì. Una volta installata, l’app funziona senza connessione. Si può programmare e caricare sul robot anche senza Wi-Fi.

### mBlock sostituisce Arduino IDE?

No, lo completa. mBlock produce codice Arduino C che si può esportare e poi modificare nell’IDE Arduino. È un ponte, non un sostituto.

## Tabella riepilogativa finale

| Criterio | Scratch | mBlock |
|---------|---------|--------|
| **Facilità** | Imbattibile | Facile con un po’ di aiuto |
| **Creatività** | Giochi e animazioni | Progetti robotici |
| **Community** | Molto ampia, progetti pubblici su scratch.mit.edu | Media |
| **Hardware** | Niente da comprare | mBot 89,99 € (Amazon.it, 6 novembre 2026). Arduino e micro:bit: controlla il prezzo |
| **Evolvibilità** | Solo blocchi | Export Arduino C e Python |
| **Età** | 6–14 anni | 8–16 anni |
| **Contesto** | Scuola, casa, creatività | Robotica, tecnologia alle medie, IoT |

Dai 6 ai 10 anni, per un primo contatto, parti da Scratch. Dagli 8 ai 14 anni, con un robot o un progetto di robotica, prendi mBlock, anche tra i 10 e i 14 anni se il seguito previsto è Arduino. Una classe senza hardware resta su Scratch. Un club di robotica passa a mBlock.

Scratch e mBlock sono complementari. Scratch insegna a pensare un programma. mBlock applica quel pensiero a oggetti reali. A seconda che lo scopo sia creativo o tecnico, uno dei due porta più lontano. Si può cominciare da Scratch e passare a mBlock quando la robotica diventa il tema.
