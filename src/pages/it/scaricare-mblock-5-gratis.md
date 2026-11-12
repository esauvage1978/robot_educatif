---
layout: ../../layouts/ItPost.astro
title: "Scaricare mBlock 5 gratis: link ufficiale e IDE online"
description: "Scarica mBlock 5 gratis dal sito ufficiale Makeblock (Windows, Mac) o usa ide.mblock.cc online senza installazione. Driver CH340 mBot, UAC e risoluzione problemi — guida ott. 2026."
updated: "31 ottobre 2026"
schemaUpdated: "2026-10-31"
faqSchema:
  - question: "Dove scaricare mBlock 5 gratuitamente?"
    answer: "Usa solo mblock.cc/en-us/download, scarica l’installer Windows 64 bit (circa 380 MB) o macOS .dmg ed eseguilo. Cambia lingua con l’icona globo in alto a sinistra."
  - question: "Serve creare un account per usare mBlock 5?"
    answer: "No. Uso offline, salvataggio sul PC e upload USB verso mBot o mBot2 funzionano senza registrazione. L’account Makeblock serve solo al backup cloud."
  - question: "Come installare il driver USB CH340 del mBot in 3 minuti?"
    answer: "Alla fine dell’installazione di mBlock 5 conferma la finestra Setup_Driver_CH341 e clicca Install. Il robot sarà riconosciuto su una porta COM al primo collegamento USB."
  - question: "Cosa fare se non posso installare nulla sul computer?"
    answer: "Apri ide.mblock.cc in Chrome o Edge oppure segui la guida mBlock online senza installazione. Non serve scaricare 380 MB."
  - question: "Qual è la differenza tra mblock.cc e ide.mblock.cc?"
    answer: "mblock.cc/download serve a scaricare l’app desktop mBlock 5 (Windows/Mac). ide.mblock.cc è l’IDE online: programmi nel browser senza installare l’app desktop."
  - question: "mBlock 5 è davvero gratis?"
    answer: "Sì. L’installer ufficiale Makeblock e la versione browser sono gratuiti. Evita siti mirror e link crack."
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite essi, potremmo ricevere una commissione senza costi aggiuntivi. Controlla il prezzo del giorno su Amazon.it; non inventiamo prezzi locali.

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#f0fdfa;color:#134e4a;font-size:1.03rem;">
<strong>Non vuoi installare nulla?</strong> Apri l’<strong>IDE</strong> (ambiente di sviluppo integrato: la finestra in cui si montano i blocchi) ufficiale <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#0f766e;text-decoration:underline;">ide.mblock.cc</a> (mBlock online), poi segui la nostra guida <a href="/it/mblock-online-senza-installazione/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock online senza installazione</a>. Questa pagina serve solo a <strong>scaricare</strong> l’app desktop Windows/Mac.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:0 0 1.25rem;background:#f2f7ff;color:#1f2430;">
<strong>Risposta diretta (ottobre 2026)</strong> — Per <strong>scaricare mBlock 5 gratis</strong>, apri la pagina ufficiale <a href="https://www.mblock.cc/en-us/download/">Makeblock Download</a>, scarica l’installer <strong>Windows 10/11 (64 bit)</strong> o <strong>Mac</strong> (~380&nbsp;MB), conferma il controllo <strong>UAC</strong> di Windows (<strong>User Account Control</strong>) con <strong>Sì</strong>, completa l’installazione, poi installa il <strong>driver CH340</strong> per collegare un <a href="/it/mbot-il-mio-primo-robot-educativo/">mBot</a> in USB. Senza diritti amministratore: <a href="/it/mblock-online-senza-installazione/">mBlock online</a>.
</div>

<p><strong>Scaricare mBlock 5 gratuitamente</strong> richiede in genere **meno di 3 minuti** per download, UAC e driver USB — la copia dei file dipende dal disco. Che tu equipaggi un PC con <strong>Windows 10 o 11</strong>, un <strong>Mac (Intel o Apple Silicon M1/M2/M3)</strong> o un’aula, trovi qui i <strong>link ufficiali verificati</strong>, <strong>screenshot reali</strong>, la procedura per il <strong>driver USB CH340 per mBot</strong> (chip seriale sulla porta <code>COM</code>) e il passaggio dell’interfaccia nella tua lingua <strong>senza iscrizione obbligatoria</strong>.</p>

<h2 id="download-ufficiale">1. Link ufficiali verificati (Windows 10/11, Mac, Linux, tablet)</h2>

Non scaricare mai mBlock da siti mirror di terzi: recupera sempre l’installer firmato da **Makeblock Co., Ltd.** così da includere automaticamente le librerie mBot, mBot2 (**CyberPi**: scheda Wi-Fi Makeblock per mBot2) e il driver seriale USB.

| Sistema operativo | Versione ufficiale consigliata (2026) | Dimensione indicativa | Driver USB CH340 incluso |
|---|---|---|---|
| **PC Windows 10 / Windows 11 (64 bit)** | `mBlock 5 PC Version (.exe)` su [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~380 MB (≈ 1,05 GB installato) | Sì (automatico) |
| **Mac (macOS Intel & Apple M1/M2/M3)** | `mBlock 5 Mac Version (.dmg/.pkg)` su [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ~390 MB | Sì |
| **Chromebook / PC scuola bloccato** | Guida: <a href="/it/mblock-online-senza-installazione/">programmare con mBlock online senza installare</a> | 0 MB (browser) | Via **WebUSB** (USB dal browser) e **mLink** (ponte seriale Makeblock) |
| **Tablet iPad (iOS) / Android** | App *mBlock* su App Store / Google Play | ~180 MB | Connessione Bluetooth |

![Screenshot: pagina ufficiale Makeblock Download per mBlock 5 su Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Screenshot: pagina Makeblock Download (mblock.cc), sezione Windows. Crediti: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

<div class="article-cta-row" style="display:flex;flex-wrap:wrap;gap:0.75rem;margin:1.25rem 0;">
<a class="article-cta article-cta--primary" href="https://www.mblock.cc/en-us/download/" rel="noopener noreferrer" target="_blank" style="background:#1d4ed8;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Apri la pagina ufficiale Makeblock Download</a>
<a class="article-cta article-cta--secondary" href="/it/mblock-online-senza-installazione/" style="background:#0f766e;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Programmare con mBlock online (senza installare)</a>
</div>

<h2 id="windows">2. Installare mBlock 5 su PC Windows 10 e Windows 11</h2>

**Prerequisiti rapidi:** Internet (~380 MB), account **amministratore** Windows (o adulto per **Sì** all’UAC), almeno **1,5–2 GB** liberi.

1. **Scarica l’eseguibile ufficiale** (`V5.6.x.exe` circa 380 MB) in **mBlock PC version → Download for Windows**.
2. **Avvia il file `.exe`** dalla cartella *Download* (`Ctrl + J`).

![Screenshot: Esplora file Windows — installer mBlock in Download](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Doppio clic sull’`.exe` scaricato. Crediti: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

3. **Conferma l’UAC** — **User Account Control** — clic **Sì**. Senza diritti admin: <a href="/it/mblock-online-senza-installazione/">mBlock online</a>.
4. **SmartScreen**: se compare *«Windows ha protetto il PC»* → **Ulteriori informazioni** → **Esegui comunque** solo se l’editore è **Makeblock** e la fonte è [mblock.cc](https://www.mblock.cc/en-us/download/).
5. **Progressione**: copia in `Program Files` senza domande intermedie.

![Screenshot: progresso installazione mBlock 5 su Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Barra di avanzamento (Windows 10/11). Crediti: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

6. **Fine**: clic **Fine** / **Finish**.

![Screenshot: fine dell’installer mBlock 5](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

*Fine della procedura guidata. Crediti: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

Approfondimento: [Installare mBlock 5 su Windows 10 e 11](/it/installare-mblock-5-windows/) · [Problemi Bluetooth/USB mBlock](/it/mblock-bluetooth-problemi/).

<h2 id="driver-ch340">3. Driver USB mBot (CH340): il passaggio da non chiudere</h2>

Alla fine dell’installazione si apre **Driver Setup (CH340 / CH341SER)**:

- Clic **Install**, attendi *Driver install success*.
- Il **CH340** è il chip USB-seriale sulla **mCore del mBot**; necessario per **Arduino UNO / Nano** su `COM3`, `COM4`, ecc.
- **Nessuna iscrizione obbligatoria** per programmare e salvare `.mblock`.

![Screenshot: installazione mBlock 5 completata su Windows](/images/blog/installer-mblock/ecran-10-termine.png)

*Fine installazione desktop. Crediti: Emmanuel Sauvage, Robot Éducatif — ottobre 2026.*

<h2 id="macos">4. Installazione su Mac (macOS), Linux e Chromebook</h2>

- **Mac**: `.dmg`/`.pkg` → trascina **mBlock** in **Applicazioni**; se bloccato: **Impostazioni di Sistema → Privacy e sicurezza → Apri comunque**.
- **Linux**: browser con **mLink** ([mBlock online](/it/mblock-online-senza-installazione/)).
- **Chromebook**: [mBlock online](/it/mblock-online-senza-installazione/) + **mLink** in Chrome.

<h2 id="senza-installazione">5. Alternativa nel browser (PC bloccato o Chromebook)</h2>

<div class="callout-web-link" style="border-left:4px solid #2563eb;background:#eff6ff;padding:0.9rem 1.15rem;border-radius:8px;margin:1rem 0;">
<strong>Accesso dal browser:</strong> <a href="/it/mblock-online-senza-installazione/">programmare con mBlock online senza installare</a> (lingua, USB/Bluetooth con mLink, salvataggio locale).
</div>

Confronto: [Quale software mBlock scegliere?](/it/software-mblock-quale-scegliere/).

<h2 id="dopo-download">6. Impostare la lingua e collegare il mBot</h2>

1. **Globo** → Italiano o English.
2. **Dispositivi** → **+ Aggiungi** → **mBot** (o **CyberPi / mBot2**) → **OK**.
3. USB → **Connetti** → porta `COM`.
4. [Primi passi con mBlock 5](/it/primi-passi-mblock-5/) · [Installare i blocchi del mBot](/it/installare-blocchi-mbot/).

<h2 id="quale-robot">7. Con quale robot usare mBlock 5?</h2>

L’encart prodotti a fine pagina riassume i link mBot/mBot2. **Le schede sotto** dettagliano i modelli più richiesti con **fascia di prezzo indicativa** su Amazon.it.

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot (v1.1 Bluetooth)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideale dai 8 anni · Montaggio ~15 min</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Prezzo indicativo: ~85–109 € (verificare il prezzo del giorno)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.it/dp/B07XR98YYQ?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Vedi su Amazon.it</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2 (con CyberPi Wi-Fi)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Ideale 10–14 anni · Batteria ~5 h</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">Prezzo indicativo: ~159–179 € (verificare il prezzo del giorno)</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.it/dp/B0919F9CKS?tag=roboteducat0f-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Vedi su Amazon.it</a>
    </div>
  </div>
</div>

<h2 id="risoluzione-problemi">8. Risoluzione problemi download e installazione</h2>

| Sintomo | Causa probabile | Cosa fare |
|---|---|---|
| Download bloccato | Antivirus, rete scolastica | Solo [mblock.cc](https://www.mblock.cc/en-us/download/); eccezione dopo verifica; [mBlock online](/it/mblock-online-senza-installazione/) |
| **No** all’UAC | Nessun admin | Account amministratore o [ide.mblock.cc](https://ide.mblock.cc/) |
| SmartScreen blocca | File poco noto | **Ulteriori informazioni → Esegui comunque** se **Makeblock** |
| Nessuna porta **COM** | Driver CH340 saltato | **Setup_Driver_CH341** · [Bluetooth mBlock](/it/mblock-bluetooth-problemi/) |
| Interfaccia in inglese | Lingua predefinita | **Globo → Italiano** · [Primi passi](/it/primi-passi-mblock-5/) |
| Blocchi mBot assenti | Estensioni mancanti | [Installare blocchi mBot](/it/installare-blocchi-mbot/) |

<h2 id="faq">9. FAQ — Scaricare mBlock 5</h2>

### Dove scaricare mBlock 5 gratuitamente?

**mblock.cc/en-us/download**, **mBlock PC version**, avvia l’installer. Lingua tramite icona globo.

### Serve un account?

**No.** Offline, salvataggio locale e upload USB senza registrazione.

### Driver CH340 in 3 minuti?

Conferma **Setup_Driver_CH341**, clic **Install**.

### Non posso installare nulla?

**[ide.mblock.cc](https://ide.mblock.cc/)** o <a href="/it/mblock-online-senza-installazione/">mBlock online senza installazione</a>.

### mblock.cc vs ide.mblock.cc?

**mblock.cc/download** = download desktop. **ide.mblock.cc** = **IDE** online nel browser.

### Davvero gratis?

Sì — [Makeblock Download](https://www.mblock.cc/en-us/download/) o [ide.mblock.cc](https://ide.mblock.cc/).

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Guida aggiornata il 31 ottobre 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
