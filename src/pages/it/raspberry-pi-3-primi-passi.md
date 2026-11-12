---
layout: ../../layouts/ItPost.astro
title: "Raspberry Pi 3 kit: messa in funzione e installazione del sistema"
description: "Raspberry Pi 3 Model B: hardware con micro-USB, Imager, Raspberry Pi OS a 32 bit, Wi‑Fi, SSH e risoluzione dei problemi. Tutorial per principianti."
updated: "31 ottobre 2026"
---

Alcuni link in questa pagina sono di affiliazione. Se acquisti tramite questi link, possiamo ricevere una commissione senza costi aggiuntivi. Controlla il prezzo del giorno sulla scheda del negozio.

Il **Raspberry Pi 3 Model B** (2016) resta un ingresso accessibile nell’ecosistema **Linux** e dei **sistemi embedded** (schede a basso consumo), nella **programmazione** (Python, C…) e nei progetti **GPIO (General Purpose Input/Output — pin per sensori/attuatori)** (LED, sensori, piccoli robot da tavolo). Non è più il modello più recente, ma la **procedura di avvio** è la stessa per molte schede Pi: **scheda microSD**, **Raspberry Pi OS**, **rete**, **aggiornamenti**, poi **accesso remoto** (**SSH**, Secure Shell: un terminale a distanza; **VNC**, Virtual Network Computing: un desktop a distanza).

Questo tutorial ti guida **passo dopo passo**. Aggiorna il vecchio nome **Raspbian** (oggi **Raspberry Pi OS**) e integra le **opzioni moderne** di Imager (Wi‑Fi, SSH, utente) per evitare spesso uno schermo al primo avvio.

Confronto: [Pi 3 vs 4 vs 5](/it/raspberry-pi-3-vs-4-vs-5/). RAM: [Pi 4 quale RAM](/it/raspberry-pi-4-quale-ram/), [Pi 5 quale RAM](/it/raspberry-pi-5-quale-ram/).

## 1. Promemoria: cos’è un Raspberry Pi 3 Model B

| Elemento | Dettaglio utile |
|------|----------------|
| **Processore** | Broadcom BCM2837, quad-core **~1,2 GHz** (ARMv8, spesso modalità 32 bit) |
| **Memoria** | **1 GB** di RAM LPDDR2 |
| **Rete** | Ethernet **100 Mbit/s**, Wi‑Fi **802.11n**, **Bluetooth 4.1** |
| **USB** | 4 porte USB 2.0 |
| **Video** | HDMI **a dimensione piena** (non micro-HDMI come su Pi 4/5) |
| **Archiviazione** | **Scheda microSD** (sistema operativo) |
| **GPIO** | 40 pin (compatibile con molti case e **HAT** = scheda di espansione sui pin GPIO) |

*In pratica*: per **multimedia 4K**, un **desktop** molto fluido o **USB 3**, un **Pi 4** o **Pi 5** è più comodo; per **imparare**, **domotica leggera**, un **server** modesto o **robotica** su piccola scala, un Pi 3 può ancora bastare — soprattutto se lo hai già.

**Illustrazione (scheda reale)** — Raspberry Pi 3 Model B:

![Raspberry Pi 3 Model B, vista dall’alto — connettori USB, Ethernet, GPIO](/images/blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.webp)

*Foto: [Sven.petersen](https://commons.wikimedia.org/wiki/File:9815_-_Raspberry_Pi_3.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.*

## 2. Materiale necessario

- La **scheda** Raspberry Pi 3 Model B.
- **Scheda microSD**: 16 GB o più, **classe A1/A2** o marca affidabile; 32 GB resta un buon compromesso.
- **Alimentazione**: **5 V** in **micro-USB**, corrente **≥ 2,5 A** consigliata (sottoalimentazione = schermi strani o riavvii).
- **Schermo + tastiera + mouse** (facoltativi se prepari tutto con **Imager** in modalità senza schermo).
- **Cavo di rete** o Wi‑Fi; per il primo avvio, il **cablato** evita un passo di risoluzione problemi.

Schema dei **collegamenti comuni** (alimentazione, HDMI, zona SD):

![Schema dei collegamenti abituali Raspberry Pi 3 Model B](/images/blog/raspberry-pi3-mise-en-route/connexions-pi3.svg)

## 3. Preparare la scheda SD con Raspberry Pi Imager

Lo strumento ufficiale **Raspberry Pi Imager** scrive **Raspberry Pi OS** (o un’altra immagine) sulla microSD da un PC Windows, macOS o Linux.

1. Scarica **Imager** dalla pagina ufficiale: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
2. Installalo, inserisci la **microSD** (adattatore USB se serve).
3. Avvia Imager; segui **CHOOSE OS → CHOOSE STORAGE → WRITE**.

![Flusso logico: OS, archiviazione, scrittura, poi inserimento nel Pi](/images/blog/raspberry-pi3-mise-en-route/imager-etapes.svg)

### 3.1 Quale OS scegliere per un Pi 3?

- **Raspberry Pi OS (32-bit)**: il più **documentato** e **leggero** per questa scheda.
- **Raspberry Pi OS (64-bit)**: possibile su Pi 3, a volte un po’ più **esigente** in RAM; da testare secondo l’uso.

Evita un desktop troppo pesante se punti soprattutto a **server** o **robotica**: l’immagine **Lite** (senza interfaccia grafica) è ideale per solo SSH.

### 3.2 Opzioni avanzate (molto consigliate)

Prima di scrivere sulla scheda, apri l’**icona a forma di ingranaggio** (*Advanced options*) in Imager. Spesso puoi:

- definire il **nome host** (es. `raspberrypi.local`);
- attivare **SSH** e autenticazione per **password** o **chiave**;
- configurare il **Wi‑Fi** (SSID, il nome della tua rete Wi‑Fi, + password);
- creare un **account utente** e una **password** (sulle immagini recenti, la coppia storica `pi` / `raspberry` **non è più** il default imposto — tutto si imposta qui o al primo avvio).

È ciò che consente un primo boot **senza schermo**: la scheda entra in rete, SSH è pronto, ti colleghi da un altro PC.

### 3.3 Scrivere e finalizzare

- Conferma che il **disco selezionato** sia davvero la tua **microSD** (tutto il contenuto sarà cancellato).
- Attendi la fine della scrittura e della **verifica** se proposta.
- Estrai la scheda correttamente, inseriscila **nel Pi** (contatti verso l’alto, lato «corto» secondo il case).

## 4. Primo avvio e assistente

1. Collega **prima** schermo e tastiera se li usi, poi l’**alimentazione** micro-USB.
2. Al primo avvio, un **assistente** (secondo la versione) può chiedere: **paese**, **lingua**, **fuso orario**, **password** dell’account, **schermo intero** HDMI, **Wi‑Fi**, **aggiornamenti** software.

**Consiglio**: accetta gli **aggiornamenti** proposti alla fine dell’assistente, oppure falli manualmente (sezione successiva).

Se avevi tutto preimpostato in Imager e sei solo in **SSH**, questo assistente può essere minimo o già aggirato — secondo l’immagine esatta.

## 5. Aggiornare il sistema (indispensabile)

Apri un terminale sul Pi (o una sessione SSH):

```bash
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

Questo allinea **Raspberry Pi OS** e i pacchetti alle patch di sicurezza. Ripeti regolarmente su una macchina esposta in rete.

## 6. Attivare SSH e VNC in seguito

Se non hai attivato SSH in Imager:

- Menu **Preferenze** → **Raspberry Pi Configuration** (o `sudo raspi-config`) → scheda **Interfaces**:
  - **SSH**: **Enabled** per la console remota;
  - **VNC**: **Enabled** per il desktop grafico remoto (server **RealVNC** integrato in Raspberry Pi OS con desktop).

Riavvia se richiesto. Per collegarti in VNC da un altro PC, usa **VNC Viewer** (client ufficiale) con l’**indirizzo IP** del Pi o `raspberrypi.local` (mDNS).

## 7. Collegarsi in SSH da Windows

1. Sul Pi: annota l’**indirizzo IP** (`hostname -I` o menu rete).
2. Su Windows 11, **OpenSSH** è spesso disponibile: apri **PowerShell** o **Terminal** e digita `ssh utente@indirizzo_ip`.
3. Altrimenti, **PuTTY** resta un client grafico comune per SSH.

**Sicurezza**: cambia la password di default e preferisci a lungo termine una **chiave SSH** piuttosto che una password su Internet.

## 8. Trasferire file: meglio SFTP che il «FTP classico»

Con **SSH** attivo hai già **SFTP** (SSH File Transfer Protocol): stessa **porta 22**, cifratura inclusa.

- **FileZilla**: protocollo **SFTP**, host = IP del Pi, utente / password (o chiave), porta **22**.
- Non serve installare **vsftpd** per un uso familiare o didattico; il **FTP** non cifrato (porta 21) è oggi **sconsigliato** su una rete non controllata.

*(Una versione precedente di questo articolo dettagliava **vsftpd**: resta possibile per esigenze molto specifiche, ma SFTP copre quasi tutti i casi «inviare un file al Pi».)*

## 9. Risoluzione problemi rapida

| Sintomo | Cosa provare |
|---------|------|
| **Fulmine giallo** in un angolo dello schermo | Spesso **sottoalimentazione** o cavo micro-USB troppo sottile — prova un’alimentazione **5 V / 2,5 A** di qualità. |
| Schermo nero all’avvio | Verifica **HDMI**, a volte collegare **dopo** l’accensione; prova un’altra risoluzione in `raspi-config`. |
| Niente IP / niente Wi‑Fi | Cavo Ethernet per il test; verifica SSID / password inseriti in **Imager**; router che accetta il Pi. |
| SSH «connection refused» | SSH non attivo: collega uno schermo una volta o riscrivi la scheda con Imager (opzioni avanzate). |

## 10. Pi 3 e seguito del progetto

Una volta stabile la **base di sistema**, puoi passare a **progetti di codice** (Python, GPIO), **server** (web, piccolo NAS, VPN di casa), o confrontare con un **robot educativo** tutto-in-uno — vedi [robot 14 anni](/it/robot-programmabile-14-anni/) e [miglior robot educativo 2026](/it/miglior-robot-educativo-2026/).

## Hardware compatibile con Raspberry Pi 3 (affiliazione)

Questo tutorial riguarda il **Pi 3**: l’alimentazione avviene tramite **micro-USB** (non USB-C come sul Pi 4 e sul Pi 5) e per iniziare si consiglia un sistema a **32 bit**. I link qui sotto puntano a questo hardware. **Verifica** connettore, corrente e compatibilità su ogni scheda prodotto prima di acquistare, perché i prezzi cambiano. I link kit, microSD e libro sono ricerche per confrontare le offerte. Il link dell’alimentatore punta al riferimento ufficiale micro-USB 5 V / 2,5 A per il Pi 3; verifica comunque il connettore sulla scheda.

- [Kit Raspberry Pi 3 Model B](https://www.amazon.it/s?k=Raspberry+Pi+3+Model+B+kit&tag=roboteducat0f-21)
- [Scheda microSD 32 GB classe A1](https://www.amazon.it/s?k=microSD+32GB+A1+Raspberry+Pi&tag=roboteducat0f-21)
- [Alimentatore 5 V / 2,5 A micro-USB per Pi 3](https://www.amazon.it/dp/B01CO1HZJ6?tag=roboteducat0f-21)
- [Libro Raspberry Pi per principianti](https://www.amazon.it/s?k=Raspberry+Pi+libro+principianti&tag=roboteducat0f-21)

Per una scheda più recente (USB-C), consulta il [confronto Pi 3 vs 4 vs 5](/it/raspberry-pi-3-vs-4-vs-5/). Non confondere mai l’alimentatore di un Pi 5 con quello di un Pi 3.

*Partner Amazon — commissione possibile sugli acquisti idonei.*

---

**In sintesi**: **Raspberry Pi Imager** + **Raspberry Pi OS**, **opzioni avanzate** per SSH/Wi‑Fi, **aggiornamenti** `apt`, poi **SSH** e **VNC** secondo le esigenze — hai una base sana per tutto ciò che segue su un **Raspberry Pi 3 Model B**.

*Autore: Emmanuel Sauvage.*
