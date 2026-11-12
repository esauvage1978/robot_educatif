---
layout: ../../layouts/DePost.astro
title: "mBot-Zubehör: mBuild-Sensoren, Packs und Erweiterungen (Ratgeber 2026)"
description: "Zubehör für mBot (RJ25) und mBot2 (mBuild): Ultraschallsensoren, LEDs, Packs und Makeblock-Erweiterungen. Womit Sie das Basis-Kit ergänzen."
updated: "31. Oktober 2026"
---

Einige Links auf dieser Seite sind Affiliate-Links. Wenn Sie darüber kaufen, erhalten wir möglicherweise eine Provision — ohne Mehrkosten für Sie. Prüfen Sie den aktuellen Preis auf Amazon.de vor dem Kauf.

Sobald Ihr **mBot** läuft, verlängert **Zubehör** die Lebensdauer des Kits: neue Aufgaben, Reparaturen oder mechanische Varianten. Der klassische Fehler ist, Käufe ohne klares Ziel anzuhäufen. Besser ist **ein Sensor mit einem Projekt** als ein Schrank voller inkompatibler Kartons.

Auf dem **klassischen mBot** (oft mBot v1 genannt) hat die Platine **mCore** (das „Gehirn“ des Roboters) **RJ25**-Anschlüsse. Das sind kleine rechteckige Stecker, ähnlich einer Telefonbuchse, nummeriert von **1 bis 4**. Jeder Makeblock-RJ25-Sensor wird an den Anschluss gesteckt, den **seine eigene** Anleitung nennt.

![Schema der RJ25-Anschlüsse 1 bis 4 auf der mCore-Platine des klassischen mBot](/images/blog/guides-2026/mbot-rj25-ports.svg)

*Lehrschema der Anschlüsse 1 bis 4 auf der mCore. Beim **mBot2** mit dem Steuergerät **CyberPi** heißt der Bus **mBuild** (Magnetstecker): Die RJ25-Module des v1 sind damit ohne passenden Adapter nicht austauschbar.*

Lesen Sie vor dem Kauf den Produkttitel und den Anschlusstyp auf der Angebotsseite: **RJ25** für den klassischen mBot, **mBuild** für den mBot2. Die beiden Generationen sind ohne passenden Adapter nicht austauschbar.

> **Direkte Antwort (Oktober 2026)** — Am **klassischen mBot** stecken Sie die offiziellen **RJ25**-Sensoren in die Anschlüsse **1 bis 4** der **mCore**. Eine vernünftige Kaufreihenfolge: **Akkus** → **Aufbewahrung** → **ein Sensor passend zu einem Projekt** (oft Ultraschall) → Ersatzteile → mechanische Erweiterungen. Am **mBot2** setzen Sie auf den **mBuild**-Bus, nicht auf die RJ25-Module des v1.

| Generation | Anschluss / Bus | Wo er steckt |
|---|---|---|
| **mBot v1** | **RJ25** (4-poliges Makeblock-Kabel) | mCore-Anschlüsse **1 bis 4** |
| **mBot2** | **mBuild** (modular, Magnetstecker) | CyberPi / mBuild-Kette des mBot2; nicht die klassischen RJ25-Sensoren des v1 |

Kaufen Sie kein reines **mBuild**-Modul in der Erwartung, es passe an einen RJ25-Anschluss des klassischen mBot v1. Umgekehrt stimmt es meistens auch nicht.

### Empfohlener erster Kauf nach dem Kit

Läuft der Roboter schon, ist das nützlichste Duo oft **Akkus** plus ein **Ultraschall-Entfernungsmesser** (ein Sensor, der Abstände mit Schallwellen misst), um [Entfernungen zu messen](/de/mbot-aktivitaet-entfernung-messen/). Das klassische mBot-Set enthält bereits Ultraschall, Linienfolger und Infrarot-Fernbedienung. Ein zweiter Sensor lohnt nur für einen weiteren Roboter oder als Ersatz, und nur mit dem Hinweis **RJ25**. [mBot auf Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21), 89,99 € am 9. November 2026.

## 1. Eine sinnvolle Prioritätenreihenfolge

| Priorität | Typ | Warum |
|---|---|---|
| 1 | **Akkus** + passendes Ladegerät | Ohne zuverlässige Stromversorgung frustriert alles andere. |
| 2 | **Aufbewahrung** (Box mit Fächern) | Weniger verlorene Teile = weniger Frust und Aufgeben. |
| 3 | **Sensor** passend zu einem Projekt (z. B. Ultraschall) | Ein klares Ziel — siehe unsere Aktivitäten unten. |
| 4 | **Ersatzteile** (Räder, Schrauben) | Wenn der Roboter oft Schule oder Club verlässt. |
| 5 | **„Spaß“-Erweiterungen** (Arm, Ketten) | Wenn die Basisskripte **sitzen**, nicht vorher. |

## 2. Verbrauchsmaterial und Komfort

- **Batterien/Akkus**: Prüfen Sie **Format** und **Stromstärke**, die Makeblock für **Ihre** mBot-Revision empfiehlt.
- **Aufbewahrungsbox**: wenig „glamourös“, verhindert aber verlorene Schrauben und die Entmutigung „wir finden das Teil nicht mehr“.

## 3. Sensoren, die Projekte wirklich verändern

- **Ultraschall-Entfernungsmesser**: Grundlage für [Abstände messen](/de/mbot-aktivitaet-entfernung-messen/) und den [Einbruchmelder](/de/mbot-aktivitaet-einbruchmelder/).
- **Linien**- oder **Licht**-Sensoren: nützlich für Parcours am Boden — prüfen Sie die Kompatibilität mit Ihrem Fahrgestell und Ihrer Platine (RJ25 oder mBuild). Das [Linienfolger-Projekt](/de/10-kostenlose-mbot-klassenprojekte/) aus den Klassenprojekten passt gut zu einem Liniensensor.

## 4. „Mechanische“ Erweiterungen

Arme, **Ketten** und andere Strukturen sind interessant, wenn das Kind seine Ideen am Originalmodell **ausgeschöpft** hat und es mechanisch **umbauen** möchte, bevor es zum Code zurückkehrt. Als Ersteinkauf taugen sie nicht, solange das Basisprogramm noch unklar ist.

## 5. Häufige Fehler

- Ein Modul kaufen **ohne** klare **Firmware-Update**-Prozedur oder **ohne** brauchbare Anleitung. Offizielle Hinweise: [Makeblock Support](https://support.makeblock.com).
- Den **Kundendienst** vernachlässigen: **offizielle** Teile oder anerkannte Händler begrenzen Inkompatibilitäten.
- Zubehör **für eine andere mBot-Generation** bestellen (Makeblock-Kompatibilitätstabelle prüfen).

## 6. Mini-FAQ

**Lohnt sich ein „Alles-in-einem“-Pack?**  
Ja, wenn der Einzelkauf der Teile teurer wäre **und** Sie **jedes** Element nutzen. Sonst kaufen Sie **nach und nach**.

**Soll ich einen zweiten Akku nehmen?**  
Das ist nützlich im **Club** oder an einem **Projekttag**; zu Hause reichen oft gute Akkus.

## Amazon-Links (Affiliate)

Suchen Sie getrennt nach Generation, damit RJ25- und mBuild-Teile nicht vermischt werden:

- [Makeblock mBot auf Amazon.de](https://www.amazon.de/dp/B07XR98YYQ?tag=roboteducat00-21) — 89,99 € am 9. November 2026. Ultraschall ist im Set enthalten.

*Amazon-Partner — Provision bei berechtigten Käufen möglich.*

---

**In der Praxis**: Ein **neuer Sensor** plus ein **neues Ziel** (Parcours, Alarm, Zähler) wecken die Begeisterung neu, ohne die Käufe zu vervielfachen. Ideen für kurze Sitzungen finden Sie unter [mBot-Projekte in einer Stunde](/de/mbot-ein-stunden-projekte/).

*Autor: Emmanuel Sauvage.*
