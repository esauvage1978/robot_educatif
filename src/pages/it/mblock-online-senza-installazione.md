---
layout: ../../layouts/ItPost.astro
title: "mBlock online (ide.mblock.cc): programmare senza installare"
description: "Programmare mBot online su ide.mblock.cc senza installazione: connessione, mLink, salvataggio .mblock locale. Guida gratuita 2026 per Chrome ed Edge."
updated: "30 ottobre 2026"
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite questi link, possiamo ricevere una commissione senza costi aggiuntivi. Controlla il prezzo del giorno sulla scheda del negozio.

<div class="callout-quick" style="border:2px solid #2563eb;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#eff6ff;color:#1e293b;">
<p style="margin:0 0 0.5rem;font-weight:700;font-size:1.05rem;">Accesso diretto a mBlock online (gratuito, senza account obbligatorio)</p>
<ul style="margin:0 0 0.75rem;padding-left:1.2rem;">
  <li><strong>Editor web ufficiale:</strong> <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#1d4ed8;">Apri ide.mblock.cc nel browser</a> (preferisci <strong>Google Chrome</strong> o <strong>Microsoft Edge</strong>).</li>
  <li><strong>Lingua:</strong> clicca l’icona <strong>globo</strong> in alto a sinistra → scegli la lingua.</li>
  <li><strong>Salvataggio senza iscrizione:</strong> menu <strong>File → Salva sul computer</strong> (file locale <code>.mblock</code>).</li>
  <li><strong>Preferisci l’app completa offline?</strong> Vedi <a href="/it/scaricare-mblock-5-gratis/">Scaricare mBlock 5 gratis</a>.</li>
</ul>
</div>

**mBlock online** (gratuito su **[ide.mblock.cc](https://ide.mblock.cc/)**) permette di programmare con **blocchi in stile Scratch 3** e **Python** (sui dispositivi supportati) **direttamente nel browser**, senza installare il software desktop completo (~1 GB). È la soluzione ideale su un **Chromebook**, su un **PC scolastico senza diritti amministratore**, o per avviare un laboratorio in meno di 30 secondi.

![Interfaccia di mBlock online (ide.mblock.cc): scena Panda, blocchi Scratch e area script](/images/blog/guides-2026/mblock-online-wikimedia.png)

<h2 id="passo-passo">1. Guida passo passo: aprire ide.mblock.cc in Chrome o Edge</h2>

Ecco come avviare una sessione su **mBlock online** in meno di un minuto:

1. **Apri Chrome o Edge (versione recente)** — Firefox e Safari spesso limitano l’accesso USB seriale (**WebSerial** / **WebUSB**). **Google Chrome**, **Microsoft Edge** e **Chromium** gestiscono nativamente la comunicazione con le schede robotiche.
2. **Vai su `https://ide.mblock.cc/`** — l’area di lavoro carica con la mascotte Panda.
3. **Imposta la lingua dell’interfaccia** — clicca l’icona **globo** in alto a sinistra della barra blu, poi scegli **Italiano** (o un’altra lingua). Le categorie (*Movimento, Aspetto, Eventi, Controllo, Sensori*) si aggiornano subito.
4. **Scegli il bersaglio (Sprite o Dispositivi)**:
   - Scheda **Sprite (Oggetti)**: crea un gioco o un’animazione a schermo come in Scratch, senza robot collegato.
   - Scheda **Dispositivi (Devices)**: programma un **mBot**, **mBot2 (CyberPi)**, **mBot Ranger**, **Codey Rocky**, **Halocode** o una scheda **Arduino UNO / Mega**.

<h2 id="collegare-mbot">2. Collegare un mBot o mBot2 in USB con mLink / WebUSB</h2>

Di default un browser è isolato dall’hardware del computer per sicurezza. Perché **mBlock online (`ide.mblock.cc`)** possa inviare il programma sul cavo USB del robot, coesistono due modalità:

### Passo A — Aggiungere il robot nella scheda Dispositivi

1. In basso a sinistra sotto la scena, apri la scheda **Dispositivi**.
2. Se *CyberPi* è mostrato per impostazione predefinita e usi un **mBot classico (v1.1)**, clicca **+ Aggiungi**, seleziona **mBot** nella libreria dispositivi e conferma con **OK**.
3. Per attivare le estensioni (matrice LED, servo, sensore ultrasonico…), clicca **+ Estensione** in fondo alla colonna dei blocchi (vedi [Installare i blocchi mBot](/it/installare-blocchi-mbot/)).

### Passo B — Stabilire il collegamento USB (mLink 2 o connessione Web diretta)

1. Collega il **mBot** in USB al computer e metti l’interruttore del robot su **ON**.
2. Clicca il pulsante blu **Connetti** in basso a sinistra di `ide.mblock.cc`.
3. Se il servizio **mLink** non è ancora attivo, mBlock online propone di avviare o scaricare **mLink** (ponte leggero di circa 60 MB per Windows, Mac, Linux o estensione Chromebook):
   - Su **Chromebook**, installa l’estensione ufficiale *mLink* dal Chrome Web Store.
   - Su **Windows / Mac**, se mLink è già presente, seleziona **Mostra tutti i dispositivi collegabili**, scegli la porta seriale (`COM3`, `COM4` o `/dev/tty.wchusbserial…`) e clicca **Connetti**.
4. Scegli infine la modalità in basso a sinistra:
   - **Modalità Live**: il programma gira in tempo reale con il cavo collegato (ideale per testare con la bandiera verde).
   - **Modalità Carica (Upload)**: il codice viene compilato e flashato nella memoria del mBot così funziona in autonomia una volta scollegato il cavo.

<h2 id="salvare-senza-account">3. Salvare e riaprire un file .mblock senza creare un account</h2>

In classe o a casa **non è obbligatorio creare un account Makeblock** (evita anche la raccolta di e-mail degli alunni):

- **Per salvare il lavoro**: clicca **File** (in alto a sinistra) → **Salva sul computer**. Il browser scarica un file `.mblock` in *Download* o su una chiavetta USB.
- **Per riprendere un progetto**: su `ide.mblock.cc`, clicca **File → Apri dal computer** e seleziona il file `.mblock`.
- **Compatibilità totale**: un file `.mblock` creato su `ide.mblock.cc` si apre allo stesso modo nell’app desktop [mBlock 5](/it/scaricare-mblock-5-gratis/), e viceversa.

<h2 id="confronto">4. Confronto: mBlock online vs mBlock 5 desktop</h2>

| Criterio | **mBlock online (`ide.mblock.cc`)** | **mBlock 5 desktop (Windows / Mac)** |
|---|---|---|
| **Installazione richiesta** | **Nessuna** (o piccolo ponte mLink ~60 MB per USB) | Installer completo (~380 MB di download, ~1 GB su disco) |
| **Chromebook e PC bloccati** | **Perfettamente adatto** | Non installabile su Chromebook |
| **Funzionamento offline** | No (serve caricare `ide.mblock.cc`) | **100 % offline** una volta installato |
| **Programmazione a schermo (Scratch)** | Immediata, zero configurazione | Immediata dopo l’installazione |
| **Caricamento USB mBot / mBot2** | Sì via Chrome/Edge + mLink | **Molto stabile** (driver CH340 incluso) |
| **Aggiornamento firmware e Bluetooth** | Più sensibile alle impostazioni del browser | **Consigliato** per ripristinare il programma predefinito |

Per confrontare anche l’app tablet **mBlock Blockly** e l’editor **Python**, consulta [Quale software mBlock scegliere](/it/software-mblock-quale-scegliere/).

<h2 id="problemi">5. Risoluzione problemi: perché il mBot non viene rilevato online?</h2>

1. **Nessuna porta COM nella finestra Connetti**:
   - Verifica che l’interruttore del mBot sia su **ON** e che usi un cavo USB con dati (alcuni cavi di ricarica telefono non hanno i fili dati).
   - Spunta **Mostra tutti i dispositivi collegabili**.
   - Se manca il driver seriale su Windows, installa il driver **CH340** via mLink o segui [Installare mBlock 5 su Windows](/it/installare-mblock-5-windows/).
2. **Usi Firefox o Safari**:
   - Apri `https://ide.mblock.cc/` in **Google Chrome** o **Microsoft Edge**.
3. **Il Bluetooth si interrompe o rifiuta l’associazione**:
   - Non associare mai il mBot prima nelle impostazioni Bluetooth di Windows: passa dal pulsante **Connetti** di mBlock. Dettagli: [Problemi Bluetooth mBlock](/it/mblock-bluetooth-problemi/).

<h2 id="robot-compatibili">6. Robot compatibili</h2>

I robot educativi Makeblock si programmano da `ide.mblock.cc`. Verifica nome della scheda e prezzo del giorno prima dell’acquisto:

- **[Makeblock mBot (circa 8–12 anni)](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)** — classico delle scuole · blocchi Scratch e Arduino · [vedi prezzo su Amazon.it](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)
- **[Makeblock mBot2 CyberPi (circa 10–14 anni)](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21)** — schermo a colori, Wi‑Fi, batteria · blocchi e Python
- **[Makeblock Codey Rocky (circa 6–12 anni)](https://www.amazon.it/dp/B07CGH8NZ7?tag=roboteducat0f-21)** — pronto all’uso, matrice LED · Scratch e Python

<h2 id="faq">7. FAQ — mBlock online</h2>

### Come aprire mBlock online gratis?

Apri **https://ide.mblock.cc** in Chrome o Edge, poi clicca l’icona **globo** in alto a sinistra e scegli la lingua.

### Si può programmare un mBot reale con mBlock online?

Sì: collega il mBot in USB, clicca **Connetti** in basso a sinistra di `ide.mblock.cc` e usa il ponte **mLink** (o l’estensione Chromebook) per caricare il codice.

### Come salvare un progetto senza account?

Usa **File → Salva sul computer** per ottenere il file `.mblock` in locale.

### Quando preferire la versione PC/Mac da scaricare?

Quando lavori offline o devi aggiornare il firmware USB del mBot: segui [Scaricare mBlock 5 gratis](/it/scaricare-mblock-5-gratis/).

## Consigli per la classe con ide.mblock.cc

Su PC scolastici bloccati: segnalibro **https://ide.mblock.cc/** e installa solo l’estensione **mLink** Chromebook o il bridge leggero Windows/Mac quando serve l’USB. Chiedi agli alunni di salvare una copia .mblock su chiavetta o cloud a fine sessione — la cache del browser non è un backup.

Se più robot condividono l’aula, etichetta cavi USB e porte COM. In modalità Live, una sola scheda del browser dovrebbe possedere la porta seriale; chiudere o aggiornare spesso la libera.

Quando poi serve ripristino firmware offline o Upload frequenti senza Wi‑Fi, passa alla [guida di download desktop](/it/scaricare-mblock-5-gratis/) e tieni gli stessi file .mblock.

## Modalità Live vs Carica — quando usare quale

| Situazione | Preferisci |
|---|---|
| Debug dei blocchi con bandiera verde osservando i sensori | **Live** (cavo collegato) |
| Il robot deve muoversi da solo senza PC | **Carica (Upload)** |
| Aggiornare o ripristinare il firmware predefinito | meglio **mBlock 5 desktop** |
| Gioco Scratch rapido senza hardware | scheda Sprite — nessuna connessione |

Live è ideale per la prima lezione. Upload è l’obiettivo quando il programma è stabile.

## Schede prodotto (verifica il prezzo del giorno)

### Makeblock mBot (circa 8–12 anni)

Classico delle scuole · blocchi Scratch e poi Arduino. Controlla che l’annuncio sia il kit educativo Bluetooth/USB, non solo una scheda di ricambio.

- [Amazon.it — verifica prezzo](https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21)

### Makeblock mBot2 CyberPi (circa 10–14 anni)

Schermo a colori, Wi‑Fi, batteria · blocchi e Python. Ideale quando un solo robot deve crescere con lo studente.

- [Amazon.it — verifica prezzo](https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21)

### Makeblock Codey Rocky (circa 6–12 anni)

Pronto all’uso · matrice LED espressiva · Scratch e Python.

- [Codey Rocky su Amazon.it — 147,90 € il 9 novembre 2026](https://www.amazon.it/dp/B07CGH8NZ7?tag=roboteducat0f-21)

Guide correlate: [Quale software mBlock](/it/software-mblock-quale-scegliere/), [Primi passi mBlock 5](/it/primi-passi-mblock-5/), [Problemi Bluetooth](/it/mblock-bluetooth-problemi/).

## Nota privacy per le scuole

mBlock online si può usare **senza creare un account Makeblock**. Preferisci **File → Salva sul computer** così i lavori restano sullo storage scolastico o su una chiavetta. Se la scuola impone gli account, segui la policy IT ed evita e-mail personali per gli alunni più piccoli.

Le richieste WebSerial / WebUSB sono dialoghi di sicurezza del browser: gli alunni devono accettarle solo per un robot collegato fisicamente.

## Flusso Chromebook (sintesi)

1. Apri Chrome → ide.mblock.cc  
2. Se serve USB, installa **mLink** dal Chrome Web Store  
3. Dispositivi → aggiungi mBot o mBot2 → Connetti  
4. Salva .mblock prima di chiudere la sessione Chromebook  

Così eviti l’app desktop da ~1 GB sui dispositivi gestiti.

## Prossimi passi dopo la connessione

Quando Live funziona, prova un test a un blocco: entrambi i LED RGB rossi per un secondo. Poi [Primi passi in mBlock 5](/it/primi-passi-mblock-5/) o [Installare blocchi mBot](/it/installare-blocchi-mbot/) se mancano estensioni. Per solo Bluetooth, leggi [Problemi Bluetooth](/it/mblock-bluetooth-problemi/) prima di cambiare l’associazione Windows.

*Autore: Emmanuel Sauvage.*
