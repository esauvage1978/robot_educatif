---
layout: ../../layouts/ItPost.astro
title: "Accessori mBot: sensori mBuild, pack ed estensioni (guida 2026)"
description: "Accessori mBot (RJ25) e mBot2 (mBuild): sensori a ultrasuoni, LED, pack ed estensioni Makeblock. Con cosa completare il kit base."
updated: "31 ottobre 2026"
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite essi, potremmo ricevere una commissione senza costi aggiuntivi. Controlla il prezzo del giorno su Amazon.it prima di acquistare.

Quando il tuo **mBot** è in funzione, gli **accessori** prolungano la vita del kit: nuove sfide, riparazioni o varianti meccaniche. L’errore classico è accumulare acquisti senza un obiettivo chiaro. Meglio **un sensore e un progetto** che un armadio pieno di scatole incompatibili.

Sul **mBot classico** (spesso chiamato mBot v1), la scheda **mCore** (il «cervello» del robot) ha porte **RJ25**: sono piccoli connettori rettangolari, simili a una presa telefonica, numerati da **1 a 4**. Ogni sensore Makeblock RJ25 si collega alla porta indicata dal **proprio** foglietto illustrativo.

![Schema delle porte RJ25 numerate da 1 a 4 sulla scheda mCore del mBot classico](/images/blog/guides-2026/mbot-rj25-ports.svg)

*Schema didattico delle porte da 1 a 4 sulla mCore. Su **mBot2** e sul suo controller **CyberPi**, il bus si chiama **mBuild** (connettori magnetici): i moduli RJ25 del v1 non sono intercambiabili senza un adattatore adatto.*

Prima di acquistare, leggi il titolo del prodotto e il tipo di connettore sulla scheda: **RJ25** per il mBot classico, **mBuild** per il mBot2. Le due generazioni non sono intercambiabili senza un adattatore adatto.

> **Risposta diretta (ottobre 2026)** — Sul **mBot classico**, collega i sensori ufficiali **RJ25** alle porte **da 1 a 4** della **mCore**. Un ordine d’acquisto ragionevole: **pile ricaricabili** → **contenitore** → **un sensore legato a un progetto** (spesso a ultrasuoni) → pezzi di ricambio → estensioni meccaniche. Sul **mBot2**, scegli il bus **mBuild**, non i moduli RJ25 del v1.

| Generazione | Connettore / bus | Dove si collega |
|---|---|---|
| **mBot v1** | **RJ25** (cavo Makeblock a 4 pin) | porte **1–4** della mCore |
| **mBot2** | **mBuild** (modulare, connettori magnetici) | catena mBuild di CyberPi / mBot2; non i sensori RJ25 classici del v1 |

Non comprare un modulo **solo mBuild** aspettandoti che si colleghi a una porta RJ25 del mBot v1 classico. Di solito vale anche il contrario.

### Primo acquisto consigliato dopo il kit

Quando il robot funziona già, la coppia più utile è spesso **pile ricaricabili** più un **telemetro a ultrasuoni** (un sensore che misura la distanza con le onde sonore), per [misurare le distanze](/it/attivita-mbot-misurare-distanze/). Il kit mBot classico include già ultrasuoni, seguilinea e telecomando a infrarossi. Un secondo sensore serve solo a un altro robot o a un ricambio, e solo se la scheda indica **RJ25**. [mBot su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21), 89,99 € il 9 novembre 2026.

## 1. Un ordine di priorità ragionevole

| Priorità | Tipo | Perché |
|---|---|---|
| 1 | **Pile ricaricabili** + caricabatterie adatto | Senza un’alimentazione affidabile, tutto il resto è frustrante. |
| 2 | **Contenitore** (scatola a scomparti) | Meno pezzi persi = meno abbandoni. |
| 3 | **Sensore** legato a un progetto (es. ultrasuoni) | Un obiettivo chiaro: vedi le nostre attività qui sotto. |
| 4 | **Pezzi di ricambio** (ruote, viti) | Se il robot esce spesso da scuola o dal club. |
| 5 | **Estensioni «divertenti»** (braccio, cingoli) | Quando gli script di base sono **assimilati**, non prima. |

## 2. Materiali di consumo e comodità

- **Pile**: verifica il **formato** e la **corrente** consigliati da Makeblock per la **tua** revisione di mBot.
- **Scatola di contenimento**: poco «glamour», ma evita la perdita di viti e lo scoraggiamento del «non troviamo più il pezzo».

## 3. Sensori che cambiano davvero i progetti

- **Telemetro a ultrasuoni**: la base per [misurare le distanze](/it/attivita-mbot-misurare-distanze/) e per il [rilevatore di intrusione](/it/attivita-mbot-rilevatore-intrusione/).
- Sensori di **linea** o di **luce**: utili per i percorsi a terra. Verifica la compatibilità con il tuo telaio e la tua scheda (RJ25 o mBuild). Il [progetto del segui-linea](/it/10-progetti-mbot-gratis-classe/) tra i progetti per la classe si abbina bene a un sensore di linea.

## 4. Estensioni «meccaniche»

Bracci, **cingoli** e altre strutture sono interessanti quando il bambino ha **esaurito** le idee sul modello originale e vuole **ricostruirlo** meccanicamente prima di tornare al codice. Non sono un primo acquisto se il programma di base non è ancora chiaro.

## 5. Errori frequenti

- Comprare un modulo **senza** una procedura chiara di **aggiornamento del firmware** o **senza** un foglietto utilizzabile.
- Trascurare l’**assistenza**: pezzi **ufficiali** o rivenditori riconosciuti limitano le incompatibilità.
- Ordinare un accessorio **per un’altra generazione** di mBot (controlla la tabella di compatibilità Makeblock).

## 6. Mini-FAQ

**Un pack «tutto-in-uno» conviene?**  
Sì, se comprare i pezzi separatamente ti costerebbe di più **e** userai **ogni** elemento. Altrimenti compra **man mano**.

**Devo prendere una seconda batteria?**  
È utile in un **club** o in una **giornata di progetto**; a casa spesso bastano buone pile ricaricabili.

## Link Amazon (affiliazione)

- [Makeblock mBot su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21) — 89,99 € il 9 novembre 2026. Gli ultrasuoni sono già nel kit.

*Partner Amazon — commissione possibile sugli acquisti idonei.*

---

**In pratica**: un **nuovo sensore** più un **nuovo obiettivo** (percorso, allarme, contatore) rilanciano l’entusiasmo senza moltiplicare gli acquisti. Per idee di sessioni brevi, vedi [progetti mBot in un’ora](/it/progetti-mbot-un-ora/).

*Autore: Emmanuel Sauvage.*
