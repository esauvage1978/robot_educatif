---
layout: ../../layouts/ItPost.astro
title: "Robot mBot Makeblock: il mio primo robot educativo"
description: "L'mBot classico di Makeblock per iniziare: montaggio con un adulto, modalità precaricate, batterie e primi passi con mBlock (programmazione a blocchi in stile Scratch)."
updated: "31 ottobre 2026"
faqSchema:
  - question: "Come funziona il robot mBot?"
    answer: "L'mBot è una piccola piattaforma mobile. La scheda mCore esegue un programma (una modalità precaricata o uno script inviato da mBlock), comanda motori, LED e buzzer e legge i sensori (ultrasuoni per la distanza, sensore di linea sotto il telaio). Puoi provare in modalità diretta con il robot collegato al computer, oppure caricare il programma sulla scheda perché giri senza cavo."
  - question: "L'mBot è un robot educativo?"
    answer: "Sì. Un robot educativo (o pedagogico) serve a imparare la programmazione e la robotica manipolando un oggetto reale. L'mBot è molto diffuso in famiglia e a scuola proprio per questo."
  - question: "Qual è la differenza tra mBot e mBot2?"
    answer: "L'mBot classico usa soprattutto la scheda mCore e i connettori RJ25. L'mBot2 si basa sulla scheda CyberPi e sul bus mBuild, con un percorso più naturale verso Python."
  - question: "Il mio programma mBot non fa quello che voglio: da dove iniziare?"
    answer: "Verifica che in mBlock sia selezionato il dispositivo giusto, controlla la connessione (USB è la migliore per i test) e ricarica il programma dopo ogni modifica. Per i problemi senza fili, consulta la pagina sulla risoluzione dei problemi Bluetooth."
  - question: "Dove comprare l'mBot classico (non l'mBot2)?"
    answer: "Su Amazon cerca «mBot Makeblock», leggi con attenzione il titolo dell'annuncio (mBot o mBot2) e le foto prima di ordinare e confronta i venditori."
---

Cerchi un **robot mBot** per un primo contatto con la robotica? L’**mBot** di **Makeblock** (a volte scritto «m bot») è un piccolo robot da costruire e poi programmare, pensato per chi inizia a partire da circa **8–10 anni**, con un adulto che aiuta nel montaggio. Alla fine di questa pagina saprai cosa c’è nella scatola, come assemblarlo senza saldature, quali modalità funzionano senza scrivere codice e come passare a **mBlock**, il software di programmazione a blocchi di Makeblock (molto vicino a **Scratch**, il linguaggio a blocchi usato in molte scuole).

![Robot educativo mBot Makeblock assemblato, vista di tre quarti](/images/products/mbot.webp)

*Foto prodotto dell’mBot classico (kit Makeblock). Controlla sempre la scheda del venditore: modello e contenuto della scatola possono cambiare.*

> **Attenzione al modello** — Questo articolo parla dell’**mBot classico** (scheda **mCore**, connettori **RJ25**). L’**mBot2** è un’altra generazione (scheda **CyberPi**, bus **mBuild**). I link d’acquisto qui sotto portano alla ricerca dell’**mBot classico**. Per confrontare i due: [mBot vs mBot2](/it/mbot-vs-mbot2/).

Puoi vedere il prezzo del giorno sulla scheda [mBot Makeblock su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21) (link di affiliazione). I prezzi cambiano: verifica la scheda prima di acquistare.

Per inquadrare l’mBot nella robotica educativa e nel coding a scuola: la voce [Coding su Wikipedia](https://it.wikipedia.org/wiki/Coding).

## Per chi è l’mBot?

L’mBot è adatto soprattutto se vuoi:

- un **kit da montare** (viti, telaio, motori) invece di un robot già pronto;
- un ingresso nella **programmazione a blocchi** con lo stesso spirito di Scratch;
- **modalità pronte all’uso** (evitare gli ostacoli, seguire una linea) prima di scrivere un solo programma;
- un robot **evolutivo**: più avanti gli [accessori Makeblock](/it/accessori-mbot-da-dove-iniziare/) (sensori, braccio, cingoli) si collegano alle porte del kit.

Non è la scelta migliore se cerchi un robot **senza schermo** per un bambino molto piccolo (3–6 anni): guarda piuttosto soluzioni come il [Tale-Bot Pro di Matatalab](/it/matatalab-tale-bot-robot-educativo/).

## 1. Contenuto tipico della scatola

A seconda dei pacchetti e degli anni, la scatola dell’mBot classico contiene in generale:

| Elemento | Ruolo in parole semplici |
|--------|-------------|
| **Telaio** e parti meccaniche | La struttura del robot (ruote, supporti). |
| **Scheda mCore** | Il «cervello» elettronico del robot. |
| **Due motori** | Fanno girare le ruote. |
| **Sensore a ultrasuoni** | Misura la distanza davanti al robot (per evitare gli ostacoli). |
| **Sensore di linea** | Legge una linea nera sul pavimento. |
| **Telecomando a infrarossi** | Guida il robot a distanza (servono pile a bottone). |
| **Viti, cacciavite, istruzioni** | Montaggio senza saldature. |

Il manuale cartaceo resta il riferimento per la **tua** revisione esatta: seguilo passo dopo passo. Non serve alcuna saldatura.

## 2. Assemblaggio: con un adulto, senza stress

L’assemblaggio richiede **piccoli attrezzi** (spesso forniti) e **pazienza**. Un bambino di 10 anni può farcela, ma **con un adulto**: per tenere i pezzi, controllare il verso dei motori ed evitare di forzare una vite.

### Perché l’adulto è utile

- **Sicurezza**: piccole parti, attrezzi, pile — si raccomanda la supervisione.
- **Apprendimento**: leggere uno schema, contare le viti, verificare una polarità (il verso in cui va inserita una pila o un cavo) è già robotica.
- **Meno errori**: motori invertiti o cavi non agganciati bene fanno partire il robot al contrario; un secondo sguardo evita la frustrazione.

Prevedi un tavolo libero, una ciotola per le viti e **da 30 a 60 minuti** a seconda dell’abitudine. Se un passaggio del manuale non è chiaro, fermati e confronta la foto del manuale con il tuo montaggio, invece di forzare.

### Alimentazione (consumabili)

Per far funzionare il robot, prevedi:

- **pile ricaricabili** adatte al vano del kit (spesso formato AA — **controlla il manuale**) **oppure**
- una **batteria LiPo** compatibile Makeblock (litio-polimero, la stessa tecnologia di molti telefoni) con connettore adatto, spesso di tipo **JST** (una piccola presa bianca a due fili), **solo** se il tuo modello e il manuale lo prevedono;
- pile **CR2032** (a bottone) per il telecomando a infrarossi.

Senza energia affidabile anche il miglior programma non farà nulla: le pile sono il primo «accessorio» utile.

## 3. Primo utilizzo: modalità precaricate

Una volta assemblato e alimentato, l’mBot può già **muoversi senza computer**, grazie a **programmi già registrati** nella scheda (secondo il modello e la modalità scelta sul robot o sul telecomando):

- **evitare gli ostacoli** (il sensore a ultrasuoni rileva ciò che sta davanti);
- **seguire una linea nera** sul pavimento (sensore sotto il telaio);
- **guida manuale** con il telecomando.

È ideale per verificare che il montaggio sia corretto **prima** di installare un software. Se il robot non reagisce: pile, interruttore, cavi dei motori, poi il manuale.

## 4. Programmare con mBlock (non «l’app Scratch»)

Per creare i tuoi comportamenti usi **mBlock** (spesso **mBlock 5**): è il software di Makeblock, **ispirato a Scratch** (la stessa idea di blocchi colorati da incastrare). **Non** è semplicemente il sito scratch.mit.edu: mBlock aggiunge i **blocchi del robot** (motori, sensori, LED…).

Percorso consigliato su questo sito:

1. [Installare mBlock 5 su Windows](/it/installare-mblock-5-windows/) (o la versione adatta al tuo computer).
2. [Capire l’interfaccia di mBlock 5](/it/primi-passi-mblock-5/) (scena, palette, connessione).
3. [Installare i blocchi dell’mBot](/it/installare-blocchi-mbot/) se la palette del robot non compare.
4. [Il mio primo programma mBot](/it/primo-programma-mbot/) per uno script breve e subito verificabile.

In classe o a casa la connessione **USB** è spesso la più semplice per iniziare; il **Bluetooth** (collegamento senza fili) viene dopo — vedi i [problemi Bluetooth di mBlock](/it/mblock-bluetooth-problemi/).

## 5. Punti di forza e limiti (parere pratico)

**Punti di forza**

- Montaggio didattico (meccanica più elettronica leggera).
- Modalità precaricate per un successo rapido.
- Passaggio naturale verso Scratch / mBlock e, più avanti, verso altri robot Makeblock.
- Un ecosistema di accessori una volta assimilate le basi.

**Limiti**

- Serve un **computer** (o un tablet compatibile) per programmare davvero.
- L’**mBot2** è più recente (schermo, Python più in primo piano): se sei indeciso, leggi il [confronto mBot / mBot2](/it/mbot-vs-mbot2/).
- Gli accessori **RJ25** dell’mBot classico non si collegano così come sono al bus **mBuild** dell’mBot2.

Questa non è una prova di laboratorio con misurazioni: il parere si basa sulla documentazione Makeblock, sull’uso scolastico comune del kit e sulla coerenza con le altre guide mBot di questo sito. I prezzi indicati dai venditori cambiano; verifica la scheda il giorno dell’acquisto.

## Domande frequenti

### Come funziona il robot mBot?

L’**mBot** è una piccola piattaforma mobile: la scheda **mCore** esegue un programma (una modalità precaricata o uno script inviato da mBlock), comanda i **motori**, i **LED** e il **buzzer** (un piccolo altoparlante) e legge i **sensori** (ultrasuoni per la distanza, linea sotto il telaio). Puoi provare in **modalità diretta** (robot collegato al computer) oppure **caricare** il programma nella scheda perché giri senza cavo.

### Robot educativo, robot pedagogico: l’mBot lo è?

Sì. Un **robot educativo** (o pedagogico) serve a **imparare** la programmazione e la robotica manipolando un oggetto reale. L’mBot è molto diffuso in famiglia e nelle scuole per questo uso.

### Che differenza c’è tra mBot e mBot2?

L’**mBot** classico usa soprattutto la scheda **mCore** e i connettori **RJ25**. L’**mBot2** si basa sulla **CyberPi** e sul bus **mBuild**, con un percorso più naturale verso **Python**. Dettagli: [mBot vs mBot2](/it/mbot-vs-mbot2/).

### Il mio «programma mBot» non fa quello che voglio: da dove iniziare?

Verifica il **dispositivo giusto** in mBlock e la **connessione** (USB per provare), poi **ricarica** il programma dopo ogni modifica. Per il senza fili: [risoluzione dei problemi Bluetooth](/it/mblock-bluetooth-problemi/).

### Dove comprare l’mBot classico (non l’mBot2)?

Su Amazon il link prodotto seguito per l’**mBot classico** è questo: [mBot Makeblock su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21). Leggi il **titolo dell’annuncio** (mBot / mBot2) e le foto prima di ordinare, e confronta i venditori.

## Per andare oltre

- [Accessori mBot: da dove iniziare](/it/accessori-mbot-da-dove-iniziare/)
- [Progetti mBot da svolgere in circa un’ora](/it/progetti-mbot-un-ora/)
- [Robot programmabile per un bambino di 10 anni](/it/robot-programmabile-10-anni/)

*Partner Amazon — può essere versata una commissione sugli acquisti idonei, senza costi aggiuntivi per te.*
