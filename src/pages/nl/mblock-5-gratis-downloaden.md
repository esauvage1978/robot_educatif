---
layout: ../../layouts/EnPost.astro
lang: nl
title: "mBlock 5 gratis downloaden: officiële link en online IDE"
description: "mBlock 5 gratis downloaden bij Makeblock (Windows, Mac) of programmeren op ide.mblock.cc. CH340-stuurprogramma, UAC en oplossingen, zonder verzonnen prijs."
updated: "31 oktober 2026"
faqSchema:
  - question: "Waar download ik mBlock 5 gratis?"
    answer: "Alleen op de officiële pagina van Makeblock, mblock.cc/en-us/download. Download het Windows-installatieprogramma van 64 bit (ongeveer 380 MB) of het macOS-bestand .dmg, en start het. De taal wijzig je met het wereldbol-pictogram linksboven."
  - question: "Heb ik een account nodig voor mBlock 5?"
    answer: "Nee. Offline werken, projecten op je computer bewaren en via usb naar een mBot of mBot2 sturen kan zonder registratie. Een Makeblock-account dient alleen voor een back-up in de cloud."
  - question: "Hoe installeer ik het usb-stuurprogramma CH340 van de mBot in 3 minuten?"
    answer: "Aan het eind van de installatie van mBlock 5 bevestig je het venster Setup_Driver_CH341 en klik je op Install. De robot verschijnt op een COM-poort zodra je de usb-kabel aansluit."
  - question: "Wat als ik niets op de computer mag installeren?"
    answer: "Open ide.mblock.cc in Chrome of Edge, of volg de Franstalige gids over mBlock online. Je hoeft dan geen 380 MB te downloaden."
  - question: "Wat is het verschil tussen mblock.cc en ide.mblock.cc?"
    answer: "mblock.cc/download is om de desktopapp mBlock 5 te downloaden (Windows of Mac). ide.mblock.cc is de online IDE: je programmeert in de browser, zonder de desktopapp te installeren."
  - question: "Is mBlock 5 echt gratis?"
    answer: "Ja. Het officiële installatieprogramma van Makeblock en de browserversie zijn gratis. Vermijd spiegel-sites en crack-links."
---

Sommige links op deze pagina zijn partnerlinks. Koop je via zo’n link, dan kunnen we een commissie krijgen, zonder extra kosten voor jou. De knop opent Amazon.nl. **Een Nederlandse schapprijs verzinnen we niet.**

<div class="callout-no-install" style="border:2px solid #0f766e;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#f0fdfa;color:#134e4a;font-size:1.03rem;">
<strong>Liever niets installeren?</strong> Open de officiële <strong>IDE</strong> (de geïntegreerde ontwikkelomgeving: het venster waarin je blokken aan elkaar klikt) op <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#0f766e;text-decoration:underline;">ide.mblock.cc</a> (mBlock online), en volg daarna de gids <a href="/mblock-en-ligne-programmer-sans-installer/" style="font-weight:700;color:#0f766e;text-decoration:underline;">mBlock online, zonder installatie</a>. Deze pagina gaat alleen over het <strong>downloaden</strong> van de desktopapp voor Windows of Mac.
</div>

<div class="callout-quick" style="border:2px solid #2b7de9;border-radius:12px;padding:1rem 1.2rem;margin:0 0 1.25rem;background:#f2f7ff;color:#1f2430;">
<strong>Kort antwoord (oktober 2026)</strong> — Om <strong>mBlock 5 gratis te downloaden</strong> open je de officiële pagina <a href="https://www.mblock.cc/en-us/download/">Makeblock Download</a>, haal je het installatieprogramma voor <strong>Windows 10/11 (64 bit)</strong> of <strong>Mac</strong> op (ongeveer 380&nbsp;MB), klik je op <strong>Ja</strong> bij de Windows-vraag <strong>UAC</strong> (<strong>User Account Control</strong>, gebruikersaccountbeheer), laat je de installatie aflopen en installeer je het <strong>CH340-stuurprogramma</strong> om een <a href="/mbot-mon-premier-robot-educatif/">mBot</a> via usb te verbinden. Geen beheerdersrechten: gebruik <a href="/mblock-en-ligne-programmer-sans-installer/">mBlock online</a>.
</div>

<p><strong>mBlock 5 gratis downloaden</strong> duurt meestal **minder dan 3 minuten** voor de download, de UAC-bevestiging en het usb-stuurprogramma. Hoe snel de bestanden gekopieerd worden, hangt van je schijf af. Of je nu een gezins-pc met <strong>Windows 10 of Windows 11</strong> inricht, een <strong>Mac (Intel of Apple Silicon M1/M2/M3)</strong> of een klaslokaal: hieronder staan de <strong>gecontroleerde officiële links</strong>, <strong>echte schermafbeeldingen</strong>, de stappen voor het <strong>usb-stuurprogramma CH340 van de mBot</strong> (de seriële chip waardoor Windows of macOS de robot op een <code>COM</code>-poort ziet) en hoe je de interface in je eigen taal zet <strong>zonder verplicht account</strong>.</p>

<h2 id="officiele-download">1. Gecontroleerde officiële links (Windows 10/11, Mac, Linux, tablet)</h2>

Download mBlock nooit van een spiegel-site van een derde. Haal altijd het installatieprogramma op dat door **Makeblock Co., Ltd.** is ondertekend, zodat de bibliotheken voor de mBot en de mBot2 (**CyberPi**: het wifi-bord van Makeblock voor de mBot2) en het seriële usb-stuurprogramma automatisch mee komen.

| Besturingssysteem | Aanbevolen officiële versie (2026) | Indicatieve grootte | Usb-stuurprogramma CH340 inbegrepen |
|---|---|---|---|
| **Pc met Windows 10 / Windows 11 (64 bit)** | `mBlock 5 PC Version (.exe)` op [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ongeveer 380 MB (ongeveer 1,05 GB geïnstalleerd) | Ja (automatisch) |
| **Mac (macOS Intel en Apple M1/M2/M3)** | `mBlock 5 Mac Version (.dmg/.pkg)` op [mblock.cc/download](https://www.mblock.cc/en-us/download/) | ongeveer 390 MB | Ja |
| **Chromebook / afgeschermde school-pc** | Aparte gids: <a href="/mblock-en-ligne-programmer-sans-installer/">programmeren met mBlock online, zonder installatie</a> | 0 MB (browser) | Via **WebUSB** (usb vanuit de browser) en **mLink** (de brug van Makeblock voor de seriële poort) |
| **iPad (iOS) / Android-tablet** | de app *mBlock* in de App Store of Google Play | ongeveer 180 MB | Verbinding via Bluetooth |

![Schermafbeelding: de officiële downloadpagina van Makeblock voor mBlock 5 op Windows](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

*Schermafbeelding: de downloadpagina van Makeblock (mblock.cc), gedeelte Windows. Bron: Emmanuel Sauvage, Robot Éducatif — oktober 2026.*

<div class="article-cta-row" style="display:flex;flex-wrap:wrap;gap:0.75rem;margin:1.25rem 0;">
<a class="article-cta article-cta--primary" href="https://www.mblock.cc/en-us/download/" rel="noopener noreferrer" target="_blank" style="background:#1d4ed8;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Open de officiële downloadpagina van Makeblock</a>
<a class="article-cta article-cta--secondary" href="/mblock-en-ligne-programmer-sans-installer/" style="background:#0f766e;color:#fff;padding:0.7rem 1.2rem;border-radius:8px;font-weight:700;text-decoration:none;">Programmeren met mBlock online (zonder installatie)</a>
</div>

<h2 id="windows">2. mBlock 5 installeren op Windows 10 en Windows 11</h2>

**Wat je nodig hebt:** internet voor de download van ongeveer 380 MB, een Windows-account met **beheerdersrechten** (of een volwassene die op **Ja** kan klikken bij UAC), en ongeveer **1,5–2 GB** vrij op de systeemschijf.

1. **Download het officiële programmabestand** (`V5.6.x.exe`, ongeveer 380 MB) via **mBlock PC version → Download for Windows** op de officiële pagina van Makeblock.
2. **Start het `.exe`-bestand** vanuit je map *Downloads* (`Ctrl + J` in Chrome, Edge of Firefox).

![Schermafbeelding: Verkenner — het installatieprogramma van mBlock in Downloads](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

*Dubbelklik op het `.exe`-bestand dat je net hebt gedownload. Bron: Emmanuel Sauvage, Robot Éducatif — oktober 2026.*

3. **Bevestig de UAC-vraag van Windows.** Gebruikersaccountbeheer vraagt of je wijzigingen toestaat. Klik op **Ja**. Zonder beheerdersrechten vraag je hulp, of je gebruikt <a href="/mblock-en-ligne-programmer-sans-installer/">mBlock online</a>.
4. **SmartScreen:** als Windows *„Windows heeft uw pc beveiligd”* toont, klik je op **Meer informatie** en daarna op **Toch uitvoeren**, alleen als de uitgever **Makeblock** is en het bestand van [mblock.cc](https://www.mblock.cc/en-us/download/) komt.
5. **Voortgang:** recente installatieprogramma’s kopiëren de bestanden naar `Program Files` zonder extra vragen en zonder adware.

![Schermafbeelding: de voortgang van de installatie van mBlock 5 op Windows](/images/blog/installer-mblock/ecran-09-progression.png)

*Voortgangsbalk terwijl de bestanden worden gekopieerd (Windows 10/11). Bron: Emmanuel Sauvage, Robot Éducatif — oktober 2026.*

6. **Eindscherm:** klik op **Voltooien** wanneer de wizard dat voorstelt.

![Schermafbeelding: het einde van het desktop-installatieprogramma van mBlock 5](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

*Einde van de installatiewizard. Bron: Emmanuel Sauvage, Robot Éducatif — oktober 2026.*

Voor extra stappen bij SmartScreen en een controle van de schijfruimte: [mBlock 5 installeren op Windows 10 en 11, stap voor stap](/nl/mblock-5-installeren-windows/). Verschijnt de robot later niet, zie [mBlock, Bluetooth en usb: veelvoorkomende fouten](/mblock-bluetooth-erreurs-frequentes-depannage/).

<h2 id="ch340-stuurprogramma">3. Usb-stuurprogramma van de mBot (CH340): het venster dat je niet wegklikt</h2>

Aan het eind van de installatie van mBlock 5 opent zich boven op het installatieprogramma een klein venster met de titel **Driver Setup (CH340 / CH341SER)**:

- Klik op **Install** en wacht op de melding *Driver install success*.
- De **CH340** is een veelgebruikte usb-naar-serieel-chip op het **mBot mCore-bord**. Dit stuurprogramma is nodig zodat Windows of macOS de robot, of een **Arduino UNO / Nano**, herkent op een seriële poort (`COM3`, `COM4`, enzovoort).
- **Geen verplichte registratie:** als mBlock 5 opent, hoef je geen account aan te maken om te programmeren, `.mblock`-bestanden op je schijf te bewaren of het programma naar de robot te sturen.

![Schermafbeelding: de installatie van mBlock 5 is afgerond op Windows](/images/blog/installer-mblock/ecran-10-termine.png)

*Schermafbeelding: het einde van de desktopinstallatie van mBlock 5 op Windows. Bron: Emmanuel Sauvage, Robot Éducatif — oktober 2026.*

<h2 id="macos">4. Installatie op een Mac (macOS), Linux en een Chromebook</h2>

- **Op een Mac:** open het gedownloade bestand `.dmg` of `.pkg` en sleep het pictogram **mBlock** naar de map **Programma’s**. Blokkeert macOS het openen de eerste keer, ga dan naar **Systeeminstellingen → Privacy en beveiliging → Toch openen**.
- **Op Linux (Ubuntu, Debian, Raspberry Pi OS):** de browserversie met de seriële brug **mLink** voor Linux heeft de voorkeur (zie [mBlock online](/mblock-en-ligne-programmer-sans-installer/)).
- **Op een Chromebook:** er is geen `.exe`-installatieprogramma. Gebruik [mBlock online](/mblock-en-ligne-programmer-sans-installer/) met **mLink** in Chrome.

<h2 id="zonder-installatie">5. Alternatief in de browser (afgeschermde pc of Chromebook)</h2>

Zit je op een schoolcomputer zonder beheerderswachtwoord, of op een Chromebook, dan hoef je het installatieprogramma van 380 MB niet te downloaden:

<div class="callout-web-link" style="border-left:4px solid #2563eb;background:#eff6ff;padding:0.9rem 1.15rem;border-radius:8px;margin:1rem 0;">
<strong>Rechtstreeks in de browser:</strong> volg de gids om te <a href="/mblock-en-ligne-programmer-sans-installer/">programmeren met mBlock online, zonder installatie</a> (taal, usb- of Bluetooth-verbinding met mLink in Chrome of Edge, en projecten lokaal bewaren).
</div>

Twijfel je nog tussen de desktopversie voor pc of Mac, de Blockly-app voor mobiel of tablet en de Python-editor, lees dan de vergelijking [Welke mBlock-software kies je voor de mBot?](/logiciel-mblock-makeblock-mbot-quel-choisir/).

<h2 id="na-de-download">6. De taal instellen en de mBot verbinden</h2>

1. **Taal van mBlock 5 wijzigen:** klik op het pictogram van de **wereldbol** linksboven in de menubalk en kies je taal (bijvoorbeeld Nederlands of Engels, als die in de lijst staat).
2. **Je robot kiezen:** op het tabblad **Apparaten** (linksonder) klik je op **+ Toevoegen**, kies je **mBot** (of **CyberPi / mBot2**) en daarna op **OK**.
3. **Verbinden via usb:** zet de robot aan, sluit de usb-kabel aan, klik op **Verbinden** en bevestig de gevonden `COM`-poort.
4. **Een eerste script proberen:** volg de gidsen [Eerste stappen met mBlock 5](/premier-pas-avec-mblock-5/) en [De blokken van de mBot installeren](/installer-les-blocs-du-mbot/).

<h2 id="welke-robot">7. Welke robot gebruik je met mBlock 5?</h2>

Het productblok onderaan deze pagina vat de links voor mBot en mBot2 samen. **De kaarten hieronder** noemen twee veelgebruikte modellen. Een Nederlandse schapprijs verzinnen we niet: de knop opent de aanbieding van vandaag.

mBlock 5 downloaden voor een cadeau of een workshop? Dit zijn robots van Makeblock die officieel ondersteund worden:

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;">Makeblock mBot (v1.1 Bluetooth)</h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Past vanaf een jaar of 8 (blokken in mBlock) · bouwen duurt ongeveer 15 minuten</p>
    <p style="margin:0 0 0.75rem;font-weight:700;">Een Nederlandse schapprijs verzinnen we niet.</p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.nl/dp/B07XR98YYQ?tag=manuso0607-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Bekijk de prijs van vandaag op Amazon</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;">Makeblock mBot2 (met CyberPi en wifi)</h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Past bij 10–14 jaar (blokken in mBlock en Python) · ingebouwde accu, ongeveer 5 uur</p>
    <p style="margin:0 0 0.75rem;font-weight:700;">Een Nederlandse schapprijs verzinnen we niet.</p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.nl/dp/B0919F9CKS?tag=manuso0607-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Bekijk de prijs van vandaag op Amazon</a>
    </div>
  </div>
</div>

<h2 id="problemen">8. Problemen bij downloaden en installeren</h2>

| Verschijnsel | Waarschijnlijke oorzaak | Wat je doet |
|---|---|---|
| Download geblokkeerd of een „verdacht” bestand | Antivirus, schoolfilter | Download alleen van [mblock.cc](https://www.mblock.cc/en-us/download/). Maak een uitzondering nadat je de bron hebt gecontroleerd, of gebruik [mBlock online](/mblock-en-ligne-programmer-sans-installer/) |
| Op **Nee** geklikt bij UAC | Geen beheerdersrechten | Probeer het opnieuw met een beheerdersaccount, of open [ide.mblock.cc](https://ide.mblock.cc/) |
| SmartScreen blokkeert het installatieprogramma | Het bestand heeft nog weinig reputatie | **Meer informatie → Toch uitvoeren**, als de uitgever **Makeblock** is |
| mBot aangesloten, geen **COM**-poort | Het CH340-stuurprogramma is overgeslagen | Start **Setup_Driver_CH341** opnieuw, of lees [Bluetooth en usb: problemen oplossen](/mblock-bluetooth-erreurs-frequentes-depannage/) |
| De interface blijft in het Engels | Standaardtaal van het installatieprogramma | **Wereldbol** → je taal. Zie [Eerste stappen met mBlock 5](/premier-pas-avec-mblock-5/) |
| mBot-blokken ontbreken in het palet | Extensies niet geladen | [De blokken van de mBot installeren](/installer-les-blocs-du-mbot/) |

<h2 id="faq">9. Veelgestelde vragen — mBlock 5 downloaden</h2>

### Waar download ik mBlock 5 gratis?

Ga naar de officiële pagina **mblock.cc/en-us/download**, kies **mBlock PC version** (Windows of Mac) en start het installatieprogramma. De taal van de interface wijzig je via het wereldbol-pictogram linksboven.

### Moet ik een account aanmaken om mBlock 5 te gebruiken?

**Nee.** Offline werken, projecten op de computer bewaren en via usb naar een mBot of mBot2 sturen kan zonder account of registratie. Een Makeblock-account dient alleen voor een back-up in de cloud.

### Hoe installeer ik het usb-stuurprogramma CH340 van de mBot in 3 minuten?

Bevestig het venster **Setup_Driver_CH341** dat automatisch verschijnt aan het eind van de installatie van mBlock 5. Klik op **Install**: je robot wordt herkend op een COM-poort vanaf de eerste usb-verbinding.

### Wat als ik niets op de computer mag installeren?

Open **[ide.mblock.cc](https://ide.mblock.cc/)** (mBlock 5 online), of volg de gids om te <a href="/mblock-en-ligne-programmer-sans-installer/">programmeren met mBlock online, zonder installatie</a>, vanuit Chrome of Edge.

### Wat is het verschil tussen mblock.cc en ide.mblock.cc?

**mblock.cc/download** is om de desktopapp mBlock 5 te **downloaden** (Windows of Mac). **ide.mblock.cc** is de **online IDE** (geïntegreerde ontwikkelomgeving): je programmeert in de browser, zonder een installatie van ongeveer 380 MB.

### Is mBlock 5 echt gratis?

Ja. Het officiële installatieprogramma van Makeblock en de browserversie zijn gratis. Vermijd spiegel-sites en „crack”-links. Gebruik alleen [Makeblock Download](https://www.mblock.cc/en-us/download/) of [ide.mblock.cc](https://ide.mblock.cc/).

<p style="margin-top:1.5rem;font-size:0.92rem;color:#64748b;">Gids bijgewerkt op 31 oktober 2026 — <strong>Emmanuel Sauvage</strong>, Robot Éducatif.</p>
