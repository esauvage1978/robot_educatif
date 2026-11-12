---
layout: ../../layouts/ItPost.astro
title: "CyberPi Makeblock: recensione e tutorial Python per iniziare"
description: "Recensione della CyberPi di Makeblock, una scheda programmabile con schermo e sensori: punti di forza, limiti, sicurezza della batteria e primo programma Python con mBlock."
updated: "31 ottobre 2026"
---

Hai sentito parlare della **CyberPi** di [Makeblock](/it/marchio-makeblock/) e ti chiedi cosa si possa davvero fare con questa piccola scheda trasparente dotata di schermo? Interessa ai ragazzi curiosi delle medie, agli insegnanti di tecnologia e ai genitori che vogliono andare un po’ oltre il semplice videogioco. In questo articolo ti diciamo a chi è adatta, cosa fa bene, cosa non fa, e poi ti guidiamo passo dopo passo a scrivere il tuo primo programma in **Python**, un linguaggio di programmazione molto diffuso che si scrive con il testo, a differenza dei blocchi colorati che si assemblano con il mouse.

## Cos’è la CyberPi?

La CyberPi è una **scheda di sviluppo**: una piccola scheda elettronica che si programma perché reagisca a ciò che percepisce e a ciò che le si chiede. La si può vedere come il cervello di un progetto, a cui si aggiungono poi motori, luci o sensori. È il cervello che Makeblock inserisce anche nel robot [mBot2](/it/mbot-vs-mbot2/), ma la scheda esiste anche da sola, senza ruote, per progetti che restano sul tavolo.

![La CyberPi di Makeblock nel kit CyberPi Go: scheda con scocca traslucida, schermo a colori e joystick, estensione Pocket Shield, cavo USB-C e istruzioni](/images/products/cyberpi.webp)

*La CyberPi nel kit CyberPi Go di Makeblock: la scheda, l’estensione Pocket Shield, il cavo USB-C e le istruzioni. Immagine: Makeblock.*

Sulla scheda stessa c’è già tutto per interagire senza collegare nulla:

- uno **schermo a colori** da 1,44 pollici (circa 3,7 centimetri di diagonale), di 128 punti per 128;
- un **joystick** e dei pulsanti per giocare o navigare nei menu;
- un **altoparlante** e un **microfono**;
- un **sensore di luce** e un **giroscopio**, che misura le rotazioni e l’inclinazione della scheda, come in un telefono;
- **luci colorate** programmabili (LED).

Il cervello della scheda è un chip della famiglia **ESP32**, molto diffuso tra gli appassionati di elettronica e in grado di collegarsi senza fili. Il contenuto esatto del kit varia secondo l’offerta: alcuni negozi vendono la scheda da sola, altri kit con l’estensione Pocket Shield o altri accessori. Verifica l’elenco preciso prima di ordinare.

## Wi-Fi e Bluetooth: a cosa servono in concreto?

Il **Wi-Fi** collega la scheda alla tua rete domestica, quindi a Internet. Permette, per esempio, di recuperare un’informazione online o di inviare un messaggio da un progetto. Il **Bluetooth** è un collegamento senza fili a corto raggio, come quello di un altoparlante portatile: lo si usa per collegare la scheda a un computer o a un tablet senza cavo USB. Per iniziare, il cavo USB resta il mezzo più affidabile. Se il collegamento Bluetooth ti dà problemi, la nostra pagina sui [problemi frequenti del Bluetooth con mBlock](/it/mblock-bluetooth-problemi/) elenca le impostazioni da verificare.

Alcune presentazioni della scheda citano anche funzioni di intelligenza artificiale, come il riconoscimento vocale, che passano da Internet. Non le abbiamo verificate: dipendono dalla versione del software e da un servizio online, quindi non le conteggiamo nel nostro parere.

## Alimentazione, batteria e sicurezza

Usata da sola, fuori dal telaio dell’mBot2, la CyberPi si alimenta con il suo **cavo USB** o con una **batteria LiPo** (al litio-polimero, la stessa tecnologia di molti telefoni) compatibile Makeblock. **Non serve alcun collegamento alla rete a 230 volt**: nessun quadro elettrico da toccare, né per usare la scheda né per cambiare un sensore.

Le batterie al litio richiedono comunque alcune semplici precauzioni:

- usa il cavo e il caricabatterie forniti, oppure una normale presa USB di computer o di caricatore per telefono;
- non ricaricare la batteria senza sorveglianza, per esempio durante la notte;
- smetti di usare qualsiasi batteria gonfia, danneggiata o che si scalda in modo anomalo, e non forarla mai;
- non mettere in corto circuito i suoi fili, nemmeno per un attimo.

## mBuild o RJ25: non confondere i connettori

Le estensioni ufficiali della CyberPi si collegano al sistema **mBuild**, moduli uniti da connettori magnetici o da cavo. Non è il connettore **RJ25** del vecchio [mBot](/it/mbot-il-mio-primo-robot-educativo/), che assomiglia a una presa telefonica. Prima di acquistare un modulo, anche usato, verifica che sia indicato per la CyberPi o per mBuild sul [sito di supporto di Makeblock](https://support.makeblock.com).

## Il nostro parere sulla CyberPi

Questo parere si basa sulla documentazione di Makeblock, sulle specifiche pubblicate della scheda e sul modo in cui gli altri prodotti della gamma vengono usati in classe. Non abbiamo misurato l’autonomia della batteria e quindi non diamo cifre.

**Per chi?**

- Un ragazzo delle medie o un adolescente che vuole passare dai blocchi a Python su un oggetto che vede reagire (da circa 10 anni e autonomo, e già da 8 o 9 anni accompagnato per la parte a blocchi: è il nostro riferimento, non un’età fissata dal produttore).
- Un insegnante che vuole un materiale compatto, utilizzabile su una scrivania, senza spazio di gioco né robot da spostare.
- Un genitore o un maker che vuole esplorare l’elettronica senza saldare.

**Punti di forza**

- Schermo, suono, luce e joystick integrati permettono di riuscire in un primo progetto senza collegare altro.
- Si può iniziare a blocchi e passare a Python nello stesso software, mBlock, senza cambiare hardware.
- È compatta, leggera e può poi essere inserita in un robot mBot2.

**Limiti**

- Da sola non si muove: se vuoi un robot che si sposta e segue le linee, guarda piuttosto l’[mBot2 e il suo confronto](/it/mbot-vs-mbot2/).
- Richiede un computer o un tablet per essere programmata.
- Le estensioni sono specifiche di Makeblock: non tutti i sensori in commercio si collegano direttamente.
- Se invece vuoi imparare Linux e creare un piccolo server, una scheda tipo Raspberry Pi risponde meglio a questa esigenza. La nostra guida [Raspberry Pi: primi passi](/it/raspberry-pi-3-primi-passi/) aiuta a decidere.

Se sei indeciso per un bambino di 10 anni, la nostra guida al [robot programmabile per un bambino di 10 anni](/it/robot-programmabile-10-anni/) confronta le opzioni per profilo.

Il prezzo cambia secondo le offerte e i kit: consulta la tariffa attuale sulla scheda Amazon prima di ordinare.

[Vedi la CyberPi Makeblock su Amazon.it](https://www.amazon.it/dp/B0BBZY9L59?tag=roboteducat0f-21)

Preferisci un robot pronto da montare? La CyberPi è anche il “cervello” del mBot2: [kit mBot2 / CyberPi su Amazon.it](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21) · [tutte le offerte mBot2](https://www.amazon.it/s?k=Makeblock+mBot2&tag=roboteducat0f-21). Altri kit elettronici Makeblock: [ricerca su Amazon.it](https://www.amazon.it/s?k=kit+elettronico+Makeblock+programmabile&tag=roboteducat0f-21).

*Link di affiliazione: il sito riceve una piccola commissione se acquisti tramite questi link, senza costi aggiuntivi per te. Prima di ordinare, verifica se l’annuncio è la scheda CyberPi da sola oppure un kit che include già il robot mBot2.*

## Tutorial: mostrare un messaggio e reagire al pulsante A in Python

Questo piccolo programma mostra un testo sullo schermo, poi, ogni volta che premi il pulsante A, accende la luce in verde, riproduce un suono e mostra «Bravo!».

**Livello**: principiante. **Durata**: prevedi mezz’ora, esclusa l’installazione di mBlock (stima, non cronometrata).

### Prerequisiti

- Una CyberPi carica.
- Un cavo USB-C **che trasmetta i dati**. Alcuni cavi venduti solo per la ricarica non permettono al computer di vedere la scheda.
- **mBlock 5** installato sul computer: se non l’hai ancora fatto, segui la nostra [guida per scaricare mBlock 5](/it/scaricare-mblock-5-gratis/), poi scopri l’interfaccia con i [Primi passi con mBlock 5](/it/primi-passi-mblock-5/).

### Passo 1: collegare la scheda

Collega la CyberPi al computer e accendila. In mBlock 5 aggiungi il dispositivo **CyberPi** all’elenco dei dispositivi, poi richiedi la connessione. Le etichette esatte dipendono dalla versione di mBlock installata. Capirai che è andata a buon fine quando il software mostra la scheda come collegata.

### Passo 2: passare a Python

Nell’area di programmazione passa dalla modalità **Blocchi** alla modalità **Python**: l’editor mostra allora del testo al posto dei blocchi.

### Passo 3: scrivere il programma

Ricopia il codice seguente. I testi sullo schermo sono scritti senza accenti, per prudenza: non abbiamo verificato la visualizzazione dei caratteri accentati sullo schermo della scheda.

```python
import cyberpi
import time

# Cancella lo schermo, poi mostra due righe di testo
cyberpi.console.clear()
cyberpi.console.println("Ciao!")
cyberpi.console.println("Premi A")

# Ciclo infinito: il programma controlla il pulsante A
while True:
    if cyberpi.controller.is_press("a"):
        cyberpi.led.on(0, 255, 0)      # luce verde (rosso 0, verde 255, blu 0)
        cyberpi.audio.play("hello")    # suono preregistrato
        cyberpi.console.println("Bravo!")
        time.sleep(1)                  # attende un secondo
        cyberpi.led.off()              # spegne la luce
```

Per capire il codice:

- `import cyberpi` carica le funzioni che pilotano la scheda e `import time` quelle che gestiscono le pause.
- `cyberpi.console.println` scrive una riga sullo schermo.
- `while True` ripete all’infinito ciò che è rientrato sotto, e `if` esegue le righe seguenti solo se il pulsante A è premuto in quel momento.
- `cyberpi.led.on(0, 255, 0)` imposta il colore con tre numeri tra 0 e 255: rosso, verde, blu.

### Passo 4: avviare e verificare

Avvia il programma in modalità diretta, oppure invialo alla scheda se vuoi che continui senza computer. Sullo schermo devi vedere «Ciao!» poi «Premi A». Quando premi A, la luce diventa verde, si sente un suono e compare «Bravo!». Per giocare con il codice, cambia i tre numeri della luce (per esempio 255, 0, 0 per il rosso) o il testo mostrato.

*Non abbiamo eseguito questo esempio su una scheda per questo articolo: riprende i nomi delle funzioni della documentazione Makeblock per la CyberPi, ma questi nomi possono cambiare da una versione di mBlock all’altra. Se una riga provoca un errore, confrontala con gli esempi della sezione CyberPi della documentazione di Makeblock.*

### Se non funziona

- **La scheda non compare in mBlock**: prova un altro cavo USB, un’altra porta, poi riavvia la scheda e il software.
- **Non compare nulla o il programma non obbedisce più**: ferma il programma, riavvialo e verifica che sia selezionato il dispositivo giusto.
- **Nessun suono**: controlla il volume della scheda, perché l’altoparlante è piccolo e il suono discreto.
- **Messaggio di errore su una riga**: guarda gli spazi all’inizio delle righe, perché in Python l’allineamento conta, e le virgolette, che devono chiudersi.

E poi? Puoi aggiungere un secondo pulsante, mostrare il valore del sensore di luce oppure, se vuoi vedere il tuo codice far muovere un robot, scoprire l’[mBot2](/it/mbot-vs-mbot2/). Per scegliere il software adatto al tuo dispositivo, leggi la nostra guida [mBlock 5: app desktop, browser o Python per mBot?](/it/software-mblock-quale-scegliere/).

*Partner Amazon — può essere versata una commissione sugli acquisti idonei, senza costi aggiuntivi per te.*
