---
layout: ../../layouts/ItPost.astro
title: "Installare mBlock 5 su Windows 10/11 (driver CH340)"
description: "Installazione di mBlock 5 passo passo con catture: download, driver CH340 per mBot, blocco SmartScreen risolto."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
---

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.2rem;margin:1rem 0 1.25rem;background:#f0fdfa;color:#134e4a;">
<strong>Non vuoi installare nulla?</strong> Usa <a href="/it/mblock-online-senza-installazione/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock online nel browser (senza installazione)</a>.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:1rem 0 1.5rem;background:#f2f7ff;color:#1f2430;">

**Risposta diretta (ottobre 2026)** — Su **Windows 10/11**: scarica **mBlock 5 PC** da [mblock.cc](https://www.mblock.cc/en-us/download/) (vedi [scaricare mBlock 5 gratis](/it/scaricare-mblock-5-gratis/)), avvia l’installer, clicca **Sì** sul **UAC** (**Controllo account utente**), attendi la copia, poi conferma **Setup_Driver_CH341** per il driver **CH340**. Sblocca **SmartScreen** solo per **Makeblock**. Poi: [primi passi mBlock](/it/primi-passi-mblock-5/) e [blocchi mBot](/it/installare-blocchi-mbot/). Guida software: [quale mBlock scegliere](/it/software-mblock-quale-scegliere/).

> **Registro**: questa guida usa il **tu** (come le altre guide mBlock in italiano).

### Quando installare mLink?

| Situazione | Cosa installare |
|------------|-----------------|
| Robot via **USB** + app desktop | **mBlock 5** basta per iniziare |
| Uso **web** / certi bridge Makeblock | **mLink** in più (vedi FAQ sotto) |
| Solo prova senza robot | [mBlock online](https://ide.mblock.cc/) senza installer |

**Accesso rapido a mBlock 5**

- **Online, senza installazione:** apri [ide.mblock.cc](https://ide.mblock.cc/) in Chrome o Edge e iniziate subito a programmare.
- **Su PC:** scarica gratis l’applicazione su [mblock.cc](https://www.mblock.cc/en-us/download/), poi segui questa guida per Windows 10 o 11.
- **Primo progetto in 2 minuti:** scegliete il Panda, trascinate «quando si clicca la bandiera verde» poi «dire Ciao!», e cliccate la bandiera verde.

**Il robot più semplice da pilotare con mBlock:** il [Makeblock mBot2 con scheda CyberPi](https://www.amazon.it/s?k=Makeblock+mBot2&tag=roboteducat0f-21) (link affiliato Amazon.it), programmabile a blocchi e poi in Python. Per scegliere secondo l’età: [robot per 8 anni](/it/robot-programmabile-8-anni/), [robot per 10 anni](/it/robot-programmabile-10-anni/), [kit robot Arduino](/it/kit-robot-arduino-per-bambini/).

</div>

<figure class="article-figure">
  <img src="/images/blog/installer-mblock/ecran-01-page-makeblock.png" alt="Screenshot: pagina ufficiale Makeblock Download, sezione Windows per mBlock 5." width="960" height="540" loading="eager" decoding="async" />
  <figcaption>Pagina di download ufficiale Makeblock (mblock.cc). Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.</figcaption>
</figure>

**mBlock 5 si scarica gratuitamente** dal sito ufficiale **[mblock.cc](https://www.mblock.cc/en-us/download/)** (installer Windows di circa 380 MB). Questa guida ti accompagna **dalla A alla Z** per **installare mBlock 5.6** (programmazione a blocchi Makeblock) su **Windows 10** o **Windows 11**. Il numero esatto di versione può evolvere (**5.6.x**) secondo il sito ufficiale. Nelle versioni recenti dell’installer, **dopo l’accettazione del Controllo account utente (UAC)**, l’installazione **parte subito**: non c’è **più una schermata** per la lingua predefinita, la cartella di installazione, il menu Start, il collegamento sul desktop o un riepilogo prima della copia dei file.

**Illustrazioni:** catture reali dell’installazione; le etichette possono variare secondo Windows o la versione di mBlock.

mBlock esiste anche per **macOS**, **iOS**, **Android**, **Linux** e **Chromebook** — qui trattiamo solo **Windows**. Impossibile installare software sulla macchina? **mBlock online** funziona nel browser: vedi la guida per [programmare con mBlock online senza installare nulla](/it/mblock-online-senza-installazione/).

Una volta fatta l’installazione, potrai programmare un robot come l’**[mBot](https://www.amazon.it/s?k=Makeblock+mBot&tag=roboteducat0f-21)** (link Amazon affiliato).

## Prima di iniziare (prerequisiti)

- **Account amministratore** (o password amministratore): Windows mostrerà spesso una finestra **Controllo account utente**; occorre poter cliccare su **Sì**.
- **Connessione Internet** solo per **scaricare** l’installer; l’uso di mBlock in locale può poi avvenire senza rete secondo l’uso.
- **Spazio su disco**: il file di installazione pesa **circa 380 MB**; **una volta installato**, il programma occupa **circa 1,05 GB** sul disco (cartella sotto `Program Files`, valore che può variare leggermente secondo la versione). Prevedi **almeno 1,5–2 GB** liberi sul disco di sistema per l’installazione, i file distribuiti e gli aggiornamenti (margine confortevole).
- **Antivirus / firewall**: in caso di blocco raro del file `.exe`, verifica che la fonte sia davvero **mblock.cc** (sito ufficiale) prima di autorizzare l’eccezione.

---

## Passo 1 — Scaricare l’installer Windows

### 1.1 Aprire la pagina ufficiale

Vai alla pagina di download Makeblock:

**[mblock.cc — Download (Windows)](https://www.mblock.cc/en-us/download/)**

Usa di preferenza **Chrome**, **Edge** o **Firefox** aggiornati. Evita link «mirror» o siti terzi: scarica **solo** dal dominio ufficiale.

### 1.2 Scegliere Windows e la variante giusta

Sulla pagina:

- Seleziona la sezione **Windows**.
- Privilegia la versione **64 bit** se il PC è recente (caso più frequente). Se non sapete: in Windows, **Impostazioni → Sistema → Informazioni** indica il tipo di sistema (**64 bit** o **32 bit**).

Il file scaricato assomiglia in genere a un nome del tipo **`mblock5-win32-….exe`**, **`mblock5-win64-….exe`** o **`V5.6.0.exe`** — il nome esatto può variare secondo la versione pubblicata.

Preferisci sempre **[mblock.cc](https://www.mblock.cc/en-us/download/)** quando è di nuovo accessibile, per avere l’**ultima** versione e le **impronte** attese.

![Cattura schermo: pagina di download Makeblock — mBlock 5 per Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Individuate la sezione **mBlock 5** e il pulsante **Download** per **Windows** (etichette che possono variare secondo la versione del sito).*

### 1.3 Dove viene salvato il file?

Dopo il clic su **Download**:

- Il file arriva spesso in **`Questo PC → Download`**.
- In **Edge** o **Chrome**, una barra in basso nella finestra può mostrare il download: puoi cliccare su **Apri file** o **Mostra nella cartella**.
- Scorciatoia utile: **`Ctrl + J`** apre l’elenco dei download in diversi browser.

**A proposito di mLink:** lo strumento **mLink** serve soprattutto alla connessione hardware / alcuni usi. Per lavorare **con l’applicazione installata** come in questa guida, concentrati su **mBlock 5** per Windows. Puoi anche usare **[mBlock online](https://ide.mblock.cc/)** se preferisci non installare nulla.

---

## Passo 2 — Avviare l’installer

### 2.1 Aprire il file `.exe`

1. Apri **Esplora file** (`Windows + E`).
2. Andate in **Download**.
3. Individuate il file **`.exe`** scaricato (icona di applicazione o di installer).
4. **Doppio clic** su questo file per avviare l’installazione.

![Cattura schermo: Esplora risorse Windows — file installer mBlock in Download](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Il **nome esatto** del file dipende dalla versione; l’importante è avviare il **giusto** `.exe` che avete appena scaricato.*

### 2.2 Controllo account utente (UAC)

Windows può mostrare una finestra **«Consentire a questa app di apportare modifiche…»** con i pulsanti **No** e **Sì**.

- Clicca su **Sì** per autorizzare l’installer a modificare il computer (comportamento normale per un software installato in `Program Files`).

Finestra **UAC** (**Controllo account utente**): Windows chiede se l’app può apportare modifiche — serve **Sì** per installare in `Program Files`.

*Se non siete amministratori, chiedete a una persona che ha i diritti sulla macchina.*

### 2.3 Installazione automatica (senza assistente «passo per passo»)

Dopo **Sì** sull’**UAC**, l’installer **recente** non propone **più**:

- una **lingua** di installazione;
- una **cartella** di destinazione da scegliere manualmente;
- opzioni **menu Start** / **collegamento desktop**;
- una schermata **Riepilogo** con un pulsante **Installa** separato.

La **copia dei file** inizia **subito** (posizione abituale: sotto **`Program Files`**, gestita dall’installer). Attendi fino alla schermata finale.

### 2.4 Barra di avanzamento

Durante la **copia dei file**, può comparire una finestra con una **barra di avanzamento**. **Non chiudere** la finestra finché l’installer non lo indica.

![Screenshot: progresso installazione mBlock 5 su Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Barra di avanzamento dopo il UAC. Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

### 2.5 Fine dell’installazione

Alla fine, compare una schermata del tipo **«Install Finished»** / installazione **completata**. In genere **non c’è più una casella** tipo «Avvia mBlock»: clicca su **Finish** / **Fine** per chiudere l’assistente.

![Cattura schermo: fine dell’installazione mBlock — pulsante Fine / Finish](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

### 2.6 Dimensione sul disco dopo l’installazione

Dopo l’installazione, la cartella **mBlock** (spesso **`Program Files\mBlock5`**) mostra circa **1,05 GB** nelle **proprietà** Windows (**Dimensioni** / **Dimensioni su disco**) — la cifra esatta può variare un po’ secondo la **versione** di mBlock e il **file system**.

![Cattura schermo: proprietà della cartella mBlock — dimensione sul disco dopo l’installazione](/capture/installer-mblock-5-sous-windows-10/taille-dossier-mblock-apres-install.png)

### 2.7 Aprire mBlock dopo l’installazione

Poi apri mBlock tramite:

1. il **collegamento sul desktop**, oppure  
2. il **menu Start**: digita **mBlock** e apri l’applicazione.

Poi segui **[Primi passi con mBlock 5](/it/primi-passi-mblock-5/)** per orientarti nell’interfaccia.

---

## Passo 3 — Driver CH340 e porta COM

Molti mBot usano un chip USB-seriale **CH340/CH341**. Alla **fine** dell’installazione di mBlock compare spesso **Setup_Driver_CH341**: clicca **Install** e attendi *Driver install success*.

Se Windows non crea una porta **COM** quando colleghi il cavo:

1. Collega l’mBot in **USB**, accendi il robot (ON).
2. Apri **Gestione dispositivi** → **Porte (COM e LPT)** oppure **Altri dispositivi** (punto esclamativo).
3. Se manca il driver: scarica il **CH340** dal sito del produttore del chip o dalla doc Makeblock, installa, **riavvia** se richiesto.
4. In mBlock → **Connetti** → scegli la porta **COMx** elencata.

**Test riuscito**: mBlock mostra il robot connesso e puoi usare **Carica**. Se fallisce: [problemi Bluetooth/USB mBlock](/it/mblock-bluetooth-problemi/), [primo programma mBot](/it/primo-programma-mbot/), cavo **dati**.

![Screenshot: installazione mBlock 5 completata su Windows](/images/blog/installer-mblock/ecran-10-termine.png)

*Fine installazione desktop. Screenshot — Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

---

## Risoluzione rapida

| Problema | Pista |
|----------|--------|
| Il file `.exe` non si avvia | **Proprietà** → **Sblocca** se visibile; **Esegui come amministratore**; riscarica il file; vedi la FAQ sotto. |
| Messaggio **Windows ha protetto il PC** (SmartScreen) | **Ulteriori informazioni** → **Esegui comunque** — solo se il file proviene davvero da **mblock.cc** o dal **link di riserva** proposto più sopra su **questo sito**. |
| Installazione interrotta / schermata di errore | Antivirus o firewall: autorizza l’installer o disattiva **temporaneamente** la protezione per il tempo dell’installazione (poi riattivala). |
| UAC bloccato / niente diritti admin | Account amministratore o aiuto di un adulto / del servizio informatico. |
| Robot assente in **Connetti** | Driver **CH340** mancante o cavo solo ricarica — **Setup_Driver_CH341**, cavo dati, [Bluetooth/USB](/it/mblock-bluetooth-problemi/) |
| Schermate dell’installer in inglese | Le etichette **Finish**, **Install Finished**, ecc. sono comuni; la **lingua dell’interfaccia** di mBlock si regola nell’**applicazione** dopo l’apertura. |

---

## Domande frequenti (FAQ)

### Cos’è mBlock 5?

**mBlock 5** (a volte scritto **mblock 5**) è l’ambiente di programmazione a blocchi sviluppato da **Makeblock**, vicino a **Scratch**, usato soprattutto per i robot **mBot** e il resto dell’ecosistema Makeblock.

### Dove scaricare mBlock 5.6 gratis?

Pagina ufficiale: **[mblock.cc — download](https://www.mblock.cc/en-us/download/)**. Seleziona **Windows** e la variante adatta (**64 bit** in priorità). Evitate gli installer su siti terzi non ufficiali.

### mBlock 5 è gratis e disponibile in italiano?

Sì: il download standard è **gratuito**. L’installer **non chiede più** la lingua all’inizio: l’interfaccia di **mBlock** può seguire **Windows** o regolarsi nei **parametri / lingua** del software dopo l’installazione.

### Windows 11: stessa procedura?

Sì. I passi descritti per **Windows 10** si applicano in genere tali e quali sotto **Windows 11** (UAC, copia diretta dei file, cartella sotto `Program Files`).

### Devo installare esattamente la 5.6?

Installate l’**ultima versione stabile** proposta sul sito ufficiale (spesso **5.6.x** o più recente): l’installer può **andare diretto alla copia** dei file dopo l’**UAC**, senza le vecchie schermate «Avanti» intermedie.

### «Scaricare mblock» e «scaricare mblock 5» sono la stessa cosa?

Nella maggior parte dei casi, sì: si tratta di **mBlock 5** per PC. Verificate che la fonte sia **Makeblock** / **mblock.cc**.

### Ricerche tipo «mblock 5 download», «scaricare mblock», «mblock download», «mblock5 download»

Tutte rimandano allo **stesso software** (mBlock **5** per Windows). La **pagina ufficiale** resta **[mblock.cc — Download](https://www.mblock.cc/en-us/download/)**; per il **PC Windows**, scegliete la sezione **Windows** (spesso **64 bit**). Gli equivalenti in inglese (**mblock download**, **mblock 5 download**, **download mblock 5**) puntano alla stessa installazione.

### «mblock5», «mblock v5», «m block 5», «mbloc 5» (errore), «mblcok»: è proprio mBlock?

Sì: in pratica è lo **stesso programma** (**mBlock 5**, ambiente Makeblock vicino a Scratch). Se una ricerca non trova nulla, digitate **mBlock 5 Makeblock** o andate direttamente su **mblock.cc**.

### Vecchie versioni (5.3, 5.4.3, «scaricare mblock 5.4 3»): bisogna installarle?

I tutorial o i video possono citare **5.3** o **5.4.3**: sono **riferimenti antichi**. Per un PC **nuovo**, installa piuttosto l’**ultima versione stabile** mostrata sul sito ufficiale (spesso **5.6.x** o più recente). Una versione vecchia è utile solo in un caso **molto specifico** (compatibilità hardware segnalata dal produttore).

### «mblock PC», «mblock download pc», «scaricare mblock per windows»

Su **mblock.cc**, la sezione **Windows** fornisce l’installer **per PC** (fisso o portatile). La procedura di questa guida si applica a **Windows 10** e **Windows 11**.

### «Installare mblock» dopo il download: nient’altro da cercare?

Una volta recuperato il **.exe**, basta **avviare** il file (vedi la sezione **«Passo 2 — Avviare l’installer»** più sopra); in genere **non** c’è un assistente «Avanti» multiplo sugli installer recenti — la copia parte dopo l’**UAC**.

### mBlock online, «mblock 5 web», o installazione: cosa scegliere?

**[mBlock online](https://ide.mblock.cc/)** (browser) conviene quando **non si può** installare software. Per **firmware**, **USB** stabile e **caricamento** verso il robot, l’**applicazione desktop** è in generale preferibile — vedi [Quale software mBlock: app, Web, Python](/it/software-mblock-quale-scegliere/).

### Cos’è «mblock planet»?

Spesso si tratta dello **spazio account / cloud** storico intorno a mBlock (indirizzo tipo **planet.mblock.cc**). Per **creare un account** e la procedura nel software, vedi la guida [Iscriversi su mBlock 5](/sinscrire-sur-mblock/) (procedura identica nell’app).

### Logo mBlock, «immagine mblock»: dove trovare un’illustrazione ufficiale?

I **loghi** e i visual di marca spettano al **sito Makeblock** e alle loro **condizioni d’uso**. Per imparare il software, le **catture schermo** dell’interfaccia nei tutorial del sito mostrano l’app come appare sul desktop.

### mBlock e Minecraft: confusione?

**No**: **mBlock** (Makeblock, robot come l’**mBot**) **non è** il gioco **Minecraft**. Se la ricerca mescola i due, precisate **Makeblock** o **mBot**.

---

## FAQ — Quando l’installazione non funziona

Le cause più frequenti vengono da **Windows Defender / SmartScreen**, da un **antivirus di terzi**, da **diritti insufficienti** o da un **file scaricato incompleto**. La documentazione Makeblock indica in particolare che alcuni **software di sicurezza** (antivirus, suite «tutto-in-uno») possono **bloccare** l’installazione o l’esecuzione: occorre allora **autorizzare** l’applicazione o **aggiungerla alle eccezioni** dopo aver verificato che il file proviene dal **sito ufficiale**.

### Windows mostra «Windows ha protetto il PC» o SmartScreen blocca l’installer

È comune per file **scaricati di recente** o poco «conosciuti» da SmartScreen, anche per software legittimi.

1. Verificate che il `.exe` venga davvero da **[mblock.cc](https://www.mblock.cc/en-us/download/)** o, in riserva, dal **link dell’installer** fornito più sopra in questo articolo (non da un sito sconosciuto).
2. Nell’avviso, cliccate su **Ulteriori informazioni** (o **More info**), poi **Esegui comunque** / **Run anyway**.
3. Se l’opzione non compare: clic destro sul file → **Proprietà** → spuntate **Sblocca** in basso se la casella esiste → **OK**, poi rilanciate l’installer.

### L’antivirus o il firewall blocca l’installazione (fallimento, file eliminato, quarantena)

Diverse suite di sicurezza **intercettano** gli installer durante la copia dei file. La documentazione Makeblock raccomanda in particolare di **chiudere temporaneamente** alcuni software di protezione **per il tempo dell’installazione** (poi di riaprirli), o di **aggiungere un’eccezione** per l’installer / la cartella di installazione.

- Apri l’antivirus e guardate la sezione **Quarantena**, **Minacce bloccate** o **Cronologia**.
- Se **mblock** o l’**installer** ci figuri: ripristinate il file **solo** se proviene dal download ufficiale, poi aggiungete un’**esclusione** per la cartella di installazione (spesso sotto `Program Files`) o per l’eseguibile.
- Per il **firewall Windows**: in caso di blocco raro all’apertura di mBlock, autorizza l’applicazione quando Windows lo propone, o crea una regola che autorizzi **mBlock** (vedi *Firewall di Windows Defender* nelle impostazioni).

### Non succede nulla quando faccio doppio clic sul `.exe`

1. **Clic destro** sul file → **Esegui come amministratore**.
2. **Proprietà** → scheda **Generale** → spuntate **Sblocca** se presente.
3. **Riscarica** l’installer (file incompleto o corrotto: interruzione di rete, browser che ha interrotto il download). Confronta la **dimensione** del file con quanto indica il sito se una dimensione è mostrata; elimina la copia precedente prima di riscaricare.
4. Verificate di non essere su una sessione **senza diritti di amministrazione** su un PC scolastico o aziendale: in quel caso, contattate il **servizio informatico**.

### Messaggio tipo «Accesso negato» o errore di scrittura in una cartella

- L’installer **recente** posiziona in linea di principio mBlock sotto **`Program Files\…`** senza chiedere il percorso; in caso di fallimento, verificate i **diritti** sul disco **C:** e l’assenza di una **policy** che blocchi la scrittura.
- Evitate ogni scenario in cui un **software di terzi** reindirizzi l’installazione verso una cartella personale **ristretta** o percorsi con **caratteri speciali**.
- Assicurati di aver confermato **Sì** all’**UAC** quando Windows lo chiede.

### Ho scaricato l’architettura sbagliata (32 / 64 bit)

Se il PC è a **64 bit** (caso più frequente), prendete la versione **64 bit** sulla pagina di download. Una versione incompatibile può rifiutarsi di installarsi o funzionare male. Verificate in **Impostazioni → Sistema → Informazioni** il **Tipo di sistema operativo**.

### Una vecchia versione di mBlock è già installata e crea problemi

1. **Impostazioni → App → App e funzionalità** (o **Pannello di controllo → Programmi**).
2. Disinstalla **mBlock** (o **Makeblock mBlock** secondo l’etichetta).
3. Riavvia il PC se l’assistente lo propone, poi riscarica e reinstalla l’**ultima versione** da **mblock.cc**.

### Confusione tra mBlock e mLink

**mBlock** è l’applicazione di programmazione a blocchi. **mLink** è uno **strumento separato** (connessione / uso con certe configurazioni, soprattutto il web). Se installa **mLink** e vedi un errore legato al **.NET Framework**, segui i messaggi a schermo o la **[documentazione mLink](https://support.makeblock.com/)**: aggiornare **Windows** e i **componenti opzionali .NET** tramite *Impostazioni → App → Funzionalità facoltative* può aiutare secondo la versione di Windows.

### L’installazione sembra riuscita ma mBlock non si avvia

- Stessa logica di sopra: **antivirus** che blocca l’eseguibile al primo avvio → eccezione per `mblock.exe` (o nome mostrato nella cartella di installazione).
- Avviate mBlock come **amministratore** una volta per testare (clic destro sul collegamento). Se funziona, il problema veniva spesso dai **diritti** o dal **blocco in tempo reale** dell’antivirus.
- Reinstalla **sopra** o dopo una **disinstallazione pulita** se il programma è elencato ma danneggiato.

### Spazio su disco insufficiente

Liberate spazio sul disco **C:** (svuotamento del cestino, file temporanei, *Impostazioni → Archiviazione*). Prevedi **almeno ~1,5–2 GB** liberi: installer **~380 MB** + programma installato **~1,05 GB** + margine per gli aggiornamenti.

### Dove chiedere aiuto se nulla funziona?

- **[Centro assistenza Makeblock](https://support.makeblock.com/)** (articoli, ticket).
- **E-mail** spesso indicata sul sito ufficiale: **service@makeblock.com** — allegate la **versione di Windows**, il **messaggio di errore esatto** (cattura schermo) e la **versione** del file scaricato.

*Le etichette di errore e le schermate possono variare secondo la versione di mBlock e di Windows; i principi sopra corrispondono ai casi più segnalati dagli utenti e alle raccomandazioni degli editori di software su Windows.*

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Guida aggiornata il 31 ottobre 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
