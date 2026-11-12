---
layout: ../../layouts/DePost.astro
title: "Raspberry Pi 3 Kit: Inbetriebnahme und Betriebssystem installieren"
description: "Raspberry Pi 3 Model B: Hardware mit Micro-USB, Imager, Raspberry Pi OS 32 Bit, Wi‑Fi, SSH und Fehlerbehebung. Tutorial für Einsteiger."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Bei einem Kauf können wir eine Provision erhalten — ohne Mehrkosten für Sie. Preise bitte auf der Shop-Seite prüfen.

Der **Raspberry Pi 3 Model B** (2016) bleibt ein günstiger Einstieg in **eingebettetes Linux**, **Programmierung** (Python, C…) und **GPIO** (General Purpose Input/Output — Pins für Sensoren)-Projekte (LEDs, Sensoren, kleine Schreibtischroboter). Es ist nicht mehr das neueste Board, aber der **Inbetriebnahme-Ablauf** ist für viele Pi-Boards gleich: **microSD-Karte**, **Raspberry Pi OS**, **Netzwerk**, **Updates**, dann **Fernzugriff** (**SSH** = Secure Shell / Remote-Terminal; **VNC** = Remote-Desktop).

Dieses Tutorial führt Sie **Schritt für Schritt**. Es aktualisiert den alten Namen **Raspbian** (heute **Raspberry Pi OS**) und nutzt moderne **Imager**-Optionen (Wi‑Fi, SSH, Benutzer), damit Sie beim ersten Boot oft ohne Bildschirm auskommen.

Vergleich: [Pi 3 vs 4 vs 5](/de/raspberry-pi-3-vs-4-vs-5/). RAM: [Pi 4 welcher RAM](/de/raspberry-pi-4-welcher-ram/), [Pi 5 welcher RAM](/de/raspberry-pi-5-welcher-ram/).

## 1. Erinnerung: Was ist ein Raspberry Pi 3 Model B?

| Element | Nützliches Detail |
|------|----------------|
| **Prozessor** | Broadcom BCM2837, Vierkerner **~1,2 GHz** (ARMv8, oft 32-Bit-Modus) |
| **Speicher** | **1 GB** LPDDR2-RAM |
| **Netzwerk** | Ethernet **100 Mbit/s**, Wi‑Fi **802.11n**, **Bluetooth 4.1** |
| **USB** | 4× USB-2.0-Anschlüsse |
| **Video** | **HDMI** in voller Größe (kein Micro-HDMI wie bei Pi 4/5) |
| **Speicher** | **microSD-Karte** (Betriebssystem) |
| **GPIO** | 40 Pins (kompatibel mit vielen Gehäusen und **HATs** = Hardware-Attached-on-Top-Erweiterungsplatinen) |

*Praxis*: Für **4K-Multimedia**, sehr flüssigen **Desktop** oder **USB 3** ist ein **Pi 4** oder **Pi 5** komfortabler; zum **Lernen**, für **leichte Smart-Home**-Aufgaben, einen bescheidenen **Server** oder kleine **Robotik** kann ein Pi 3 noch reichen — besonders wenn Sie ihn schon haben.

**Abbildung (echtes Board)** — Raspberry Pi 3 Model B:

![Raspberry Pi 3 Model B, Draufsicht — USB, Ethernet, GPIO](/images/blog/raspberry-pi3-mise-en-route/raspberry-pi-3-model-b-sven-petersen-cc-by-sa-4.webp)

*Foto: [Sven.petersen](https://commons.wikimedia.org/wiki/File:9815_-_Raspberry_Pi_3.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons.*

## 2. Benötigte Hardware

- Die **Raspberry Pi 3 Model B**-Platine.
- **microSD-Karte**: 16 GB oder mehr, **Klasse A1/A2** oder verlässliche Marke; 32 GB bleibt ein guter Kompromiss.
- **Netzteil**: **5 V** über **Micro-USB**, Strom **≥ 2,5 A** empfohlen (Unterspannung = seltsame Bildschirme oder Neustarts).
- **Bildschirm + Tastatur + Maus** (optional, wenn Sie alles mit **Imager** im Headless-Modus vorbereiten).
- **Netzwerkkabel** oder Wi‑Fi; beim ersten Start vermeidet **Kabel** einen Troubleshooting-Schritt.

Schema der üblichen Anschlüsse (Strom, HDMI, SD-Bereich):

![Übliche Anschlüsse Raspberry Pi 3 Model B](/images/blog/raspberry-pi3-mise-en-route/connexions-pi3.svg)

## 3. SD-Karte mit Raspberry Pi Imager vorbereiten

Das offizielle Tool **Raspberry Pi Imager** schreibt **Raspberry Pi OS** (oder ein anderes Image) auf die microSD von einem Windows-, macOS- oder Linux-PC.

1. **Imager** von der offiziellen Seite laden: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
2. Installieren, **microSD** einlegen (USB-Adapter falls nötig).
3. Imager starten; Menü oft auf Englisch: **CHOOSE OS → CHOOSE STORAGE → WRITE** (OS wählen → Speicher wählen → Schreiben).

![Logischer Ablauf: OS, Speicher, Schreiben, dann in den Pi stecken](/images/blog/raspberry-pi3-mise-en-route/imager-etapes.svg)

### 3.1 Welches OS für einen Pi 3?

- **Raspberry Pi OS (32-Bit)**: die am besten **dokumentierte** und **leichteste** Wahl für dieses Board.
- **Raspberry Pi OS (64-Bit)**: auf Pi 3 möglich, manchmal etwas **RAM-hungriger**; je nach Nutzung testen.

Vermeiden Sie einen zu schweren Desktop, wenn Sie vor allem **Server** oder **Robotik** wollen: das **Lite**-Image (ohne GUI) ist ideal für reines SSH.

### 3.2 Erweiterte Optionen (sehr empfohlen)

Vor dem Schreiben das **Zahnrad** (*Advanced options*) in Imager öffnen. Oft können Sie:

- den **Hostnamen** setzen (z. B. `raspberrypi.local`);
- **SSH** und Authentifizierung per **Passwort** oder **Schlüssel** aktivieren;
- **Wi‑Fi** konfigurieren (SSID, der Name Ihres Wi‑Fi-Netzes, + Passwort);
- ein **Benutzerkonto** und **Passwort** anlegen (bei neueren Images ist das historische Paar `pi` / `raspberry` **nicht mehr** der erzwungene Standard — alles wird hier oder beim ersten Boot gesetzt).

So gelingt ein erster Boot **ohne Bildschirm**: das Board geht ins Netz, SSH ist bereit, Sie verbinden sich von einem anderen PC.

### 3.3 Schreiben und abschließen

- Sicherstellen, dass die **gewählte Festplatte** wirklich Ihre **microSD** ist (Inhalt wird gelöscht).
- Schreiben und ggf. **Verifikation** abwarten.
- Karte sauber entfernen, **in den Pi** stecken (Kontakte nach oben, kurze Seite je nach Gehäuse).

## 4. Erster Boot und Assistent

1. Zuerst **Bildschirm und Tastatur** anschließen (falls genutzt), dann die Micro-USB-**Stromversorgung**.
2. Beim ersten Start kann ein **Assistent** (je nach Version) fragen nach: **Land**, **Sprache**, **Zeitzone**, Konto-**Passwort**, HDMI-**Vollbild**, **Wi‑Fi**, Software-**Updates**.

**Tipp**: die am Ende angebotenen **Updates** annehmen oder manuell ausführen (nächster Abschnitt).

Wenn Sie alles in Imager vorkonfiguriert haben und nur **SSH** nutzen, kann dieser Assistent minimal sein oder entfallen — je nach Image.

## 5. System aktualisieren (unverzichtbar)

Terminal auf dem Pi öffnen (oder SSH-Sitzung):

```bash
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

Damit sind **Raspberry Pi OS** und Pakete auf dem Stand der Sicherheitspatches. Auf einer netzwerkexponierten Maschine regelmäßig wiederholen.

## 6. SSH und VNC nachträglich aktivieren

Falls SSH nicht in Imager aktiviert wurde:

- Menü **Einstellungen** → **Raspberry Pi Configuration** (oder `sudo raspi-config`) → Reiter **Interfaces**:
  - **SSH**: **Enabled** für Remote-Konsole;
  - **VNC**: **Enabled** für Remote-Desktop (**RealVNC**-Server in Raspberry Pi OS mit Desktop).

Bei Bedarf neu starten. Für VNC von einem anderen PC: **VNC Viewer** (offizieller Client) mit der **IP-Adresse** des Pi oder `raspberrypi.local` (mDNS).

## 7. Per SSH von Windows verbinden

1. Auf dem Pi: **IP-Adresse** notieren (`hostname -I` oder Netzwerkmenü).
2. Unter Windows 11 ist **OpenSSH** oft verfügbar: **PowerShell** oder **Terminal** öffnen und `ssh benutzer@ip_adresse` tippen.
3. Sonst bleibt **PuTTY** ein gängiger grafischer SSH-Client.

**Sicherheit**: Standardpasswort ändern und langfristig einen **SSH-Schlüssel** statt Passwort bevorzugen, wenn der Pi im Internet erreichbar ist.

## 8. Dateien übertragen: eher SFTP als „klassisches FTP“

Mit aktiviertem **SSH** haben Sie bereits **SFTP** (SSH File Transfer Protocol): gleicher **Port 22**, Verschlüsselung inklusive.

- **FileZilla**: Protokoll **SFTP**, Host = IP des Pi, Benutzer / Passwort (oder Schlüssel), Port **22**.
- Für Familie oder Unterricht braucht man kein **vsftpd**; unverschlüsseltes **FTP** (Port 21) ist in unkontrollierten Netzen **nicht empfohlen**.

*(Eine ältere Version dieses Artikels beschrieb **vsftpd**: für Spezialfälle möglich, aber SFTP deckt fast alle „Datei zum Pi senden“-Fälle ab.)*

## 9. Schnelle Fehlerbehebung

| Symptom | Hinweis |
|---------|------|
| **Gelber Blitz** in einer Bildschirmecke | Oft **Unterspannung** oder zu dünnes Micro-USB-Kabel — gutes **5 V / 2,5 A**-Netzteil testen. |
| Schwarzer Bildschirm beim Boot | **HDMI** prüfen, ggf. **nach** dem Einschalten stecken; andere Auflösung in `raspi-config`. |
| Keine IP / kein Wi‑Fi | Ethernet zum Test; SSID / Passwort in **Imager** prüfen; Router, der den Pi akzeptiert. |
| SSH „connection refused“ | SSH nicht aktiv: einmal Bildschirm anschließen oder Karte mit Imager neu schreiben (erweiterte Optionen). |

## 10. Pi 3 und nächste Schritte

Sobald die **Systembasis** stabil ist, können Sie zu **Code-Projekten** (Python, GPIO), **Servern** (Web, kleines NAS, Home-VPN) übergehen oder mit einem **Lernroboter** vergleichen — siehe den Vergleich mit Lernrobotern: [bester Lernroboter 2026](/de/bester-lernroboter-2026/).

## Passende Hardware für den Raspberry Pi 3 (Affiliate)

Dieses Tutorial betrifft den **Pi 3**: Die Stromversorgung läuft über **Micro-USB** (nicht über USB-C wie beim Pi 4 und Pi 5), und zum Start wird ein **32-Bit-System** empfohlen. Die Links unten zielen auf diese Hardware. **Prüfen** Sie vor dem Kauf auf jeder Produktseite Anschluss, Stromstärke und Kompatibilität, denn Preise ändern sich. Kit-, microSD- und Buch-Links sind Suchen, damit Sie aktuelle Angebote vergleichen können. Der Netzteil-Link zeigt auf die offizielle Micro-USB-Referenz 5 V / 2,5 A für den Pi 3; prüfen Sie den Anschluss trotzdem auf der Angebotsseite.

- [Raspberry Pi 3 Model B Kit](https://www.amazon.de/s?k=Raspberry+Pi+3+Model+B+Kit&tag=roboteducat00-21)
- [microSD-Karte 32 GB, Klasse A1](https://www.amazon.de/s?k=microSD+32GB+A1+Raspberry+Pi&tag=roboteducat00-21)
- [Offizielles Netzteil 5 V / 2,5 A Micro-USB für den Pi 3](https://www.amazon.de/dp/B01CO1HZJ6?tag=roboteducat00-21)
- [Raspberry-Pi-Einsteigerbuch (Deutsch)](https://www.amazon.de/s?k=Raspberry+Pi+Einsteiger+Buch&tag=roboteducat00-21)

Für ein neueres Board (USB-C) lesen Sie den [Vergleich Pi 3 vs 4 vs 5](/de/raspberry-pi-3-vs-4-vs-5/). Verwechseln Sie nie das Netzteil eines Pi 5 mit dem eines Pi 3.

*Amazon-Partner — Provision bei berechtigten Käufen möglich.*

---

**Kurz gesagt**: **Raspberry Pi Imager** + **Raspberry Pi OS**, **erweiterte Optionen** für SSH/Wi‑Fi, `apt`-**Updates**, dann **SSH** und **VNC** nach Bedarf — eine solide Basis für alles Weitere auf einem **Raspberry Pi 3 Model B**.

*Autor: Emmanuel Sauvage.*
