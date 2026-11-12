---
layout: ../../layouts/ItPost.astro
title: "mBlock 5, app o Python: quale software per mBot?"
description: "PC, tablet o browser: quale software Makeblock scegliere per mBot e mBot2 in base all’età e al livello? Un confronto chiaro."
updated: "31 ottobre 2026"
---

Alcuni link in questa pagina sono link di affiliazione. Se acquisti tramite essi, potremmo ricevere una commissione senza costi aggiuntivi per te. Controlla il prezzo del giorno su Amazon.it prima di acquistare.

Apri **mBlock** per la prima volta e non sai se **installarlo**, aprirlo **nel browser** o passare subito a **Python**? Questa pagina confronta le tre porte d’ingresso con parole semplici, così potrai scegliere in base al tuo computer, ai tuoi diritti di amministratore e al tuo robot (**mBot**, **mBot2**, ecc.).

> **Risposta diretta (ottobre 2026)** — Per aprire l’**IDE** (ambiente di sviluppo integrato: la finestra in cui si assemblano i blocchi) **senza installare nulla**, vai su [ide.mblock.cc](https://ide.mblock.cc/) e segui la guida [mBlock online](/it/mblock-online-senza-installazione/). Per l’app desktop: [installare mBlock 5](/it/installare-mblock-5-windows/) o [scaricare mBlock 5](/it/scaricare-mblock-5-gratis/). Per Scratch da solo (senza robot Makeblock): [mBlock vs Scratch](/it/mblock-vs-scratch/). Contenuto verificato su mBlock 5.x (interfaccia in stile Scratch 3).

![L’interfaccia di mBlock online: scena, sprite, blocchi e area script.](/images/blog/guides-2026/mblock-online-wikimedia.png)

*Screenshot reale dell’IDE mBlock online ([ide.mblock.cc](https://ide.mblock.cc/)) — Matteo Ruffoni, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:MblockOnline.png), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.it).*

**mBlock** serve a programmare i robot **Makeblock** a **blocchi** (nello stesso spirito di **Scratch**) e talvolta, in seguito, in **Python** (un linguaggio testuale). L’applicazione installata, la versione web e la modalità Python **non sono equivalenti**: tutto dipende dal robot collegato, dai diritti di amministratore e dal Bluetooth (il collegamento senza fili).

**Accesso rapido**

- **Online:** [ide.mblock.cc](https://ide.mblock.cc/) in Chrome o Edge.
- **Su PC:** [download ufficiale](https://www.mblock.cc/en-us/download/) + [guida Windows](/it/installare-mblock-5-windows/).
- **Prima prova in 2 minuti:** lo sprite Panda, i blocchi «quando si clicca sulla bandiera verde» e poi «dire Ciao!», poi clicca sulla bandiera verde.

## Panoramica: tre «porte» verso lo stesso universo

| | **Applicazione (desktop)** | **mBlock Web (browser)** | **Python in mBlock** |
| --- | --- | --- | --- |
| **Ideale se…** | **colleghi** un robot (USB / Bluetooth), aggiorni il **firmware** (il software interno del robot), vuoi la **massima affidabilità**. | la scuola **vieta** le installazioni, laboratorio **occasionale**, dimostrazione rapida. | gli studenti **padroneggiano** già i blocchi e passano alla **sintassi** (scuola media / superiore). |
| **Limiti** | richiede un **download** e a volte i diritti di **admin** (Windows). | il **Bluetooth** è a volte **instabile** a seconda del browser e del computer; non sempre comodo come l’app. | dipende dal **modello** (mBot2, CyberPi, ecc.) e dalla **versione**; da riservare a quando la **logica** dei blocchi è capita. |

Non è una scelta **per la vita**: molti usano l’**app** a casa o in laboratorio e la versione **Web** sui computer bloccati.

Se poi ti serve un robot compatibile: [mBot classico](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21) o [mBot2](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21) (link di affiliazione: verifica il modello sulla scheda). Per il percorso del mBot2: [mBot2 di Makeblock (in francese)](/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/). Guide per età: [robot per 8 anni](/it/robot-programmabile-8-anni/), [robot per 10 anni](/it/robot-programmabile-10-anni/).

## 1. L’applicazione mBlock (Windows / macOS / Chromebook / mobile a seconda della versione)

**Da preferire** per tutto ciò che riguarda l’**hardware reale**:

- **collegare** il robot via **USB** o **Bluetooth**;
- **caricare** il programma sulla scheda del robot;
- **aggiornare il firmware** (spesso **impossibile** o sconsigliato senza USB: vedi l’aiuto ufficiale per il tuo modello su [Makeblock Support](https://support.makeblock.com/));
- **driver** e **stabilità**: meno sorprese rispetto a un browser che cambia spesso.

**Su questo sito**, segui le guide [installare mBlock 5 su Windows](/it/installare-mblock-5-windows/) e poi [primi passi con mBlock 5](/it/primi-passi-mblock-5/) per riconoscere **Dispositivi**, **blocchi**, **area script** e **connessione**.

## 2. Versione browser senza installazione (Chromebook e PC bloccati)

La versione **web** ([mBlock online](https://ide.mblock.cc/) e equivalenti a seconda del periodo) è **molto utile** quando:

- il computer della classe **vieta** l’installazione di software;
- fai un **laboratorio occasionale** senza diritti di amministratore;
- vuoi mostrare i **blocchi** senza tirare fuori il robot (scena sullo schermo).

**Punti di attenzione:** il **Bluetooth** può essere **più capriccioso** che nell’applicazione (permessi del browser, batteria, driver). Per collegare un robot fisico dal browser serve di solito **mLink**, un piccolo programma di supporto di Makeblock che collega il browser alla connessione USB o Bluetooth. In caso di disconnessioni o di dispositivo non trovato, segui la [risoluzione dei problemi Bluetooth / mBlock](/it/mblock-bluetooth-problemi/).

## 3. Python in mBlock

Il passaggio a **Python** arriva spesso **dopo** una fase a **blocchi**: ha un valore **didattico** (sintassi, rientri, variabili) e dà **continuità** con l’insegnamento delle scuole superiori. Non è lo stesso pubblico né lo stesso ritmo dell’incastro di blocchi all’inizio.

A seconda del **modello** (**mBot2**, **CyberPi**, **Codey Rocky**, ecc.) e della **versione** del software, l’accesso alla modalità testo e le **API** disponibili (interfacce di programmazione: le funzioni che si richiamano per controllare l’hardware) cambiano. Leggi la documentazione del prodotto e prova su **un** robot prima di estenderlo alla classe. Per il contesto hardware: [mBot vs mBot2](/it/mbot-vs-mbot2/), [CyberPi](/it/makeblock-cyberpi-panoramica/).

## 4. Estensioni e blocchi mBot (motori, sensori)

Senza una **buona configurazione**, i blocchi **motori** o **sensori** del **mBot** non compaiono: bisogna **aggiungere il dispositivo** o l’**estensione** corrispondente in mBlock. Procedura passo passo: [installare i blocchi del mBot](/it/installare-blocchi-mbot/).

## 5. Scratch ufficiale e mBlock: non mescolare tutto

- **Scratch** ([sito ufficiale](https://scratch.mit.edu/)): progetti **a schermo**, condivisione online, ecosistema **generalista**.
- **mBlock**: pensato per l’**ecosistema Makeblock** (robot, schede, sensori) con **blocchi dedicati** e la **connessione** all’hardware.

Per un laboratorio con un **robot Makeblock**, si parte quasi sempre da **mBlock**, non da Scratch da solo.

## 6. Mini-FAQ

**Devo sceglierne uno solo?**  
No. Usa l’**applicazione** non appena un **robot reale** è sul tavolo; tieni la versione **Web** per i computer su cui non puoi installare nulla; apri **Python** solo quando i **blocchi** sono **capiti**, non solo copiati.

**Che cos’è «Live» rispetto al caricamento?**  
In modalità **Live** (collegato), spesso **provi** in tempo reale. Il **caricamento** invia il programma **dentro** il robot perché giri **senza** il cavo: è utile quando lo script è stato validato.

**mBlock 5 e mBlock 3 sono la stessa cosa?**  
Nei tutorial recenti di questo sito partiamo da **mBlock 5** (l’interfaccia attuale in stile Scratch 3). Se apri un tutorial molto vecchio, le etichette possono differire leggermente.

**«Minecraft mblock» o Minecraft e mBlock: sono la stessa cosa?**  
**No.** **Minecraft** è un **gioco** di costruzione con blocchi 3D. **mBlock** è il **software di programmazione** di Makeblock (blocchi di codice, robot **mBot**, ecc.). Se una ricerca non restituisce lo strumento giusto, aggiungi **Makeblock** o **mBot** alla query.

## Link Amazon (affiliazione)

- [Robot Makeblock mBot](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)
- [mBot2 Makeblock](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21)
- [Libro Scratch programmazione per bambini](https://www.amazon.it/s?k=libro+Scratch+programmazione+bambini&tag=roboteducat0f-21)

<p style="margin:1rem 0;"><a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" class="affiliate-link" data-product-id="mbot2" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#ff9900;color:#111;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;">Vedi il prezzo del giorno su Amazon (mBot2)</a> · <a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" class="affiliate-link" data-product-id="mbot" data-placement="content" rel="sponsored nofollow noopener" target="_blank" style="display:inline-block;background:#f1f5f9;color:#0f172a;font-weight:700;padding:0.55rem 1rem;border-radius:8px;text-decoration:none;border:1px solid #cbd5e1;">Prezzo del giorno (mBot v1)</a></p>

*Partner Amazon — commissione possibile sugli acquisti idonei.*

---

**Da ricordare**: installa l’**applicazione** sul computer principale del progetto robot; tieni la versione **Web** per i computer bloccati o le dimostrazioni rapide; apri **Python** solo quando la **logica dei blocchi** è solida. Il software è solo uno strumento: il **progetto** e la **comprensione** restano al centro.

**Da leggere anche**: [mBlock o Scratch?](/it/mblock-vs-scratch/)

*Autore: Emmanuel Sauvage.*
