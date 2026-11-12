---
layout: ../../layouts/ItPost.astro
title: "Primi passi con mBlock 5: capire l’ambiente"
description: "mBlock 5 per iniziare: scena, sprite, palette di blocchi e connessione del robot. Guida passo passo per bambini e genitori che aprono il primo programma."
updated: "31 ottobre 2026"
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite essi, potremmo ricevere una commissione senza costi aggiuntivi. Controlla il prezzo del giorno su Amazon.it prima di acquistare.

> **Risposta diretta (ottobre 2026)** — **mBlock 5** è un ambiente simile a **Scratch** (programmazione con blocchi colorati) più i blocchi per i robot Makeblock. Dopo l’[installazione](/it/installare-mblock-5-windows/), aggiungi il tuo dispositivo (per esempio un **mBot**), collegalo via **USB** o **Bluetooth** (collegamento senza fili), poi scegli la **modalità Live** (prova immediata finché il cavo o il Bluetooth è attivo) oppure **Carica** (il programma viene salvato nel robot). Problemi frequenti: modalità sbagliata o **porta COM** sbagliata (il nome che Windows dà al cavo USB seriale); vedi la [risoluzione dei problemi Bluetooth](/it/mblock-bluetooth-problemi/).

Hai appena aperto **mBlock 5** e la finestra sembra piena di zone misteriose? Questa guida ti mostra, con **screenshot reali** dell’interfaccia, dove si trovano la **scena**, gli **sprite**, le **palette di blocchi** e la **connessione** del robot, prima di comprare qualsiasi cosa e prima di scrivere un lungo programma.

**mBlock 5** è l’applicazione di programmazione a blocchi di Makeblock, simile a Scratch ma pensata per collegare robot (**mBot**, **mBot2**, Codey Rocky, **CyberPi**, ecc.) oltre ad animare sprite sullo schermo. Una volta [installato mBlock](/it/installare-mblock-5-windows/), orientati qui e poi passa al [primo programma mBot](/it/primo-programma-mbot/).

## 1. Uno schermo «in stile Scratch» e un robot: cosa permette mBlock

mBlock **non** è diviso in due strisce nella finestra: è **un unico** software, con **zone** (scena, script, palette di blocchi) che assomigliano a Scratch.

**Sul lato schermo** usi la **scena**, gli **sprite** (i personaggi e gli oggetti che animi) e gli sfondi come su Scratch: animare personaggi, scenari, piccoli giochi. Tutto resta **dentro** la finestra di mBlock.

**Sul lato robot** non c’è «un’altra metà» dell’interfaccia: una volta aggiunto un **dispositivo Makeblock** (mBot, ecc.) e **collegato** via USB o Bluetooth, compaiono **blocchi in più** per l’hardware reale: motori, LED, sensori, cicalino, ecc. Finché non hai aggiunto un dispositivo, vedi solo la parte **sprite / scena**; dopo l’aggiunta programmi con i blocchi **dedicati al robot**, da soli o **insieme** agli sprite se il progetto mescola le due cose (per esempio un punteggio sullo schermo mentre il robot avanza).

In pratica: **senza robot**, resti sull’animazione a schermo come su Scratch. **Con un robot**, ti concentri spesso sui blocchi del **dispositivo**, la scena può aspettare. **Entrambi** si possono anche combinare nello stesso progetto.

## 2. Vista d’insieme della finestra

![Vista d’insieme della finestra di mBlock 5: barra del titolo, scena, palette, area script](/images/blog/premier-pas-mblock/mblock-vue-globale.png)

Scorrendo l’interfaccia da sinistra a destra e dall’alto in basso, si trovano in genere:

1. **Barra dei menu**: file, modifica, impostazioni, lingua, aiuto, a volte l’account Makeblock.
2. **Scena**: anteprima del progetto visivo (sprite, sfondo).
3. **Controlli sotto la scena**: la **bandiera verde** (avvio), **stop**, a volte **schermo intero** e **dimensione dei blocchi**.
4. **Area sprite / dispositivi**: schede per scegliere **chi** viene programmato (uno sprite, il robot…).
5. **Categorie di blocchi**: colonne colorate (Movimento, Aspetto, ecc., più le categorie **mBot** o di un altro dispositivo una volta aggiunto).
6. **Area script**: il grande spazio centrale in cui **incastri** i blocchi per formare il programma.

Le etichette esatte possono variare in base alla **lingua** e alla **versione** di mBlock; la **logica** delle zone resta la stessa.

## 3. Il menu principale

![Barra dei menu: Nuovo, Apri, Salva, lingua, tutorial](/images/blog/premier-pas-mblock/mblock-menu-principal.png)

Da sapere fin dall’inizio:

- **Nuovo / Apri / Salva**: i tuoi progetti sono spesso file **.mblock** (ricorda di salvare spesso).
- **Lingua**: porta l’interfaccia in **italiano** se serve, spesso nelle preferenze o nel menu.
- **Tutorial o aiuto online**: una scorciatoia utile la prima settimana.
- **Accesso / account**: facoltativo a seconda dell’uso; per pilotare un robot conta la **connessione al dispositivo** (vedi più avanti), non necessariamente un account cloud.

## 4. La scena e i controlli di riproduzione

![Scena con sprite, bandiera verde, stop e impostazione della dimensione dei blocchi](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

- **Scena**: il «teatro» degli sprite. Coordinate, dimensione, ordine dei livelli: la stessa idea di [scratch.mit.edu](https://scratch.mit.edu/).
- **Bandiera verde**: avvia gli script che iniziano con il blocco «quando si clicca sulla bandiera verde».
- **Pulsante stop**: ferma tutto, indispensabile se un ciclo non finisce mai.
- **Dimensione dei blocchi**: ingrandisci o riduci i blocchi per i più piccoli o per le dimostrazioni con il proiettore.

## 5. Sprite, dispositivi e le tre schede

![Schede Dispositivo, Oggetto (sprite) e Sfondo](/images/blog/premier-pas-mblock/mblock-onglets-lutins-appareil.png)

Sotto o accanto alla scena, la zona che gestisce **chi** è selezionato ha spesso tre schede:

| Scheda | Uso |
|--------|--------|
| **Dispositivo** | Aggiungere un robot Makeblock (mBot, ecc.), **collegarlo** (USB / Bluetooth), poi usare i suoi **blocchi** dedicati. |
| **Oggetto** (sprite) | Scegliere lo sprite attivo, crearne o importarne uno; la sua posizione sulla scena. |
| **Sfondo** | Scegliere o importare lo sfondo della scena. |

Per il [mBot](/it/mbot-il-mio-primo-robot-educativo/), comincia **aggiungendo il dispositivo**, poi [installa i blocchi mBot](/it/installare-blocchi-mbot/) se la palette non compare. Il collegamento **USB** è il più semplice per risolvere i problemi; il **Bluetooth** è comodo perché senza fili, ma più sensibile alle interferenze: vedi la [risoluzione dei problemi Bluetooth](/it/mblock-bluetooth-problemi/).

## 6. Categorie di blocchi e colore

![Colonna delle categorie e palette di blocchi per lo sprite o il dispositivo selezionato](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

- Le **categorie** raggruppano i blocchi per tema: movimento, aspetto, suono, controllo, sensori, ecc.
- I blocchi **del robot** compaiono solo quando il **dispositivo** corrispondente è **aggiunto** e **selezionato**.
- La categoria **«Blocchi personalizzati»** (o equivalente) serve a creare **propri** blocchi a partire da script riutilizzabili, utile più avanti per organizzare grandi progetti.

I **colori** aiutano a ritrovare in fretta una famiglia di comandi. Non sono solo decorativi: sono un **punto di riferimento visivo** in classe.

## 7. L’area script

![Area script con blocchi incastrati](/images/blog/premier-pas-mblock/mblock-zone-script.png)

È qui che **costruisci** il programma:

- I blocchi si **incastrano** come i pezzi di un puzzle; solo alcuni assemblaggi sono validi (forme compatibili).
- L’esecuzione segue in genere il **flusso dall’alto verso il basso** per una pila di blocchi (a meno che tu usi strutture di controllo più avanzate).
- Puoi avere **più script** in parallelo (più pile che partono con eventi diversi).

**Consiglio:** inizia sempre con un blocco **di avvio** (bandiera verde, tasto, messaggio, evento del robot…) per sapere **quando** parte il programma.

## 8. Modalità Python (panoramica)

Su alcune versioni e dispositivi, mBlock propone un passaggio a **Python** (un linguaggio di programmazione testuale). Non serve per i primi passi con i blocchi; è il seguito logico quando la sintassi testuale diventa un obiettivo, come con [mBot2](/it/mbot-vs-mbot2/) o [CyberPi](/it/makeblock-cyberpi-panoramica/). Per sapere quando aprire l’editor Python, leggi [quale software mBlock scegliere](/it/software-mblock-quale-scegliere/).

## Hardware compatibile (dopo aver capito l’interfaccia)

Quando l’ambiente è chiaro, ecco due robot spesso usati con mBlock 5. Le fasce di prezzo cambiano: consulta la scheda del giorno. **IoT** qui significa «oggetti connessi» (progetti che passano per la rete Wi‑Fi, per esempio).

- **Makeblock mBot2** — 10–14 anni · Scratch e Python · scheda CyberPi con schermo a colori · Wi‑Fi e progetti connessi · adatto a imparare mBlock 5. [Amazon.it](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21)
- **Makeblock CyberPi** — da 10 anni · Scratch e Python · scheda programmabile versatile con schermo integrato, Wi‑Fi e vari sensori · solo la scheda, utile per progetti connessi con mBlock. [Amazon.it](https://www.amazon.it/dp/B0BBZY9L59?tag=roboteducat0f-21)

## 9. Collegare il robot: cosa verificare

Prima di cliccare su «connetti»:

1. Il **robot è acceso** e la **batteria** o le pile sono sufficienti.
2. Il **cavo USB** è ben inserito *oppure* il **Bluetooth** è associato in Windows (vedi [software: app o Web](/it/software-mblock-quale-scegliere/)).
3. In mBlock è selezionato nell’elenco il **dispositivo giusto** (evita di confondere due robot identici in classe).

Poi, a seconda della modalità:

- **Esecuzione dal vivo**: il programma gira **finché** il collegamento con il PC è attivo (utile per provare).
- **Caricamento**: il programma viene **salvato nel robot** perché funzioni **senza** il cavo, come spiegato nel [primo programma mBot](/it/primo-programma-mbot/).

## 10. Mini-FAQ

### mBlock 5 e Scratch online sono la stessa cosa?

**Quasi**, per la parte sprite / scena. La differenza principale è l’**hardware Makeblock**: driver, blocchi per i robot, aggiornamento del **firmware** (il software interno del robot). Per Scratch puro senza robot basta il sito ufficiale; per un **mBot**, mBlock è lo strumento adatto.

### Non vedo i blocchi del mio robot

Aggiungi prima il **dispositivo** nella scheda apposita, poi controlla la [procedura per l’estensione mBot](/it/installare-blocchi-mbot/). Senza un dispositivo riconosciuto, i blocchi specifici non compaiono.

### L’interfaccia è in un’altra lingua

Cerca **Language** / **Preferenze** / **Impostazioni** nel menu (la posizione varia a seconda della versione) e scegli **Italiano**.

### mBlock si blocca al primo avvio

Aggiorna **Windows**, **mBlock** e i **driver**; prova una volta come **amministratore**; se un antivirus lo blocca, consulta la FAQ dell’[articolo di installazione](/it/installare-mblock-5-windows/).

### Cos’è un «programma mblock»?

In mBlock un **programma** è lo **script a blocchi** (una o più pile) che assembli nell’**area script**, spesso salvato in un file di progetto **`.mblock`**. Per vederne un esempio su un **robot mBot**, segui il [primo programma mBot](/it/primo-programma-mbot/).

### «mBlock 5 web» e l’applicazione installata fanno la stessa cosa?

L’**interfaccia** (scena, blocchi, area script) è simile tra **[mBlock online](https://ide.mblock.cc/)** e l’**app desktop**. Invece il **collegamento del robot**, il **Bluetooth** e il **caricamento** sono spesso **più affidabili** nell’applicazione: dettagli in [Quale software mBlock](/it/software-mblock-quale-scegliere/).

---

## Link Amazon (affiliazione)

- [Makeblock mBot](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)

*Partner Amazon — commissione possibile sugli acquisti idonei.*

---

**Passo successivo:** prosegui con l’[installazione dei blocchi mBot](/it/installare-blocchi-mbot/) se serve, poi con il [primo programma mBot](/it/primo-programma-mbot/) per collegare **interfaccia**, **connessione** e **caricamento**.

**Da leggere anche**: [mBlock o Scratch?](/it/mblock-vs-scratch/)

*Autore: Emmanuel Sauvage.*
