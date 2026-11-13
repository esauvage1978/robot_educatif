---
layout: ../../layouts/EnPost.astro
lang: nl
title: "Makeblock mBot: mijn eerste educatieve robot"
description: "De klassieke Makeblock mBot voor beginners: bouwen met een volwassene, voorgeïnstalleerde modi, batterijen en de eerste stappen in mBlock, dicht bij Scratch."
updated: "31 oktober 2026"
faqSchema:
  - question: "Hoe werkt de mBot?"
    answer: "De mBot is een klein rijdend platform. Het mCore-bord voert een programma uit (een voorgeïnstalleerde modus of een script uit mBlock), stuurt de motoren, de leds en de zoemer, en leest de sensoren (ultrasoon voor afstand, een lijnsensor onder het chassis). Je test live met de robot aan de computer, of je uploadt het programma zodat het zonder kabel draait."
  - question: "Is de mBot een educatieve robot?"
    answer: "Ja. Een educatieve robot gebruik je om programmeren en robotica te leren door een echt voorwerp te hanteren. De mBot wordt in gezinnen en op scholen precies daarvoor veel gebruikt."
---

Zoek je een **mBot** voor een eerste kennismaking met robotica? De **mBot** van **Makeblock** (soms geschreven als “m bot”) is een kleine robot die je bouwt en daarna programmeert. Hij is bedoeld voor beginners van ongeveer **8 tot 10 jaar**, met een volwassene die helpt bij het bouwen. Aan het eind van deze pagina weet je wat er in de doos zit, hoe je hem in elkaar zet zonder te solderen, welke modi werken zonder zelf code te schrijven, en hoe je doorgaat naar **mBlock**, de bloksoftware van Makeblock (heel dicht bij **Scratch**, de blokkentaal die op veel scholen wordt gebruikt).

![In elkaar gezette educatieve robot Makeblock mBot, driekwart zicht](/images/products/mbot.webp)

*Productfoto van de klassieke mBot (set van Makeblock). Kijk altijd op de aanbieding van de verkoper: het exacte model en de inhoud van de doos kunnen in de loop van de tijd veranderen.*

> **Controleer het model** — Dit artikel gaat over de **klassieke mBot** (bord **mCore**, connectoren **RJ25**). De **mBot2** is een andere generatie (bord **CyberPi**, bus **mBuild**). De winkellinks hieronder leiden naar de **klassieke mBot**. Om de twee te vergelijken: [mBot versus mBot2](/nl/mbot-vs-mbot2/).

Je ziet de prijs van vandaag van de klassieke Makeblock mBot via de knop hieronder (ASIN B07XR98YYQ). Prijzen veranderen, dus kijk op de aanbieding voordat je koopt. We verzinnen geen Nederlandse schapprijs.

<a href="https://www.amazon.nl/dp/B07XR98YYQ?tag=manuso0607-21" rel="sponsored nofollow noopener">Bekijk de prijs van vandaag op Amazon</a> (klassieke mBot)

## Voor wie is de mBot?

De mBot past als je zoekt naar:

- een **set om te bouwen** (schroeven, chassis, motoren) in plaats van een kant-en-klare robot;
- een instap in **programmeren met blokken**, in dezelfde geest als Scratch;
- **kant-en-klare modi** (obstakels ontwijken, een lijn volgen) voordat je ook maar één programma schrijft;
- een robot die kan **meegroeien**: later klik je [accessoires van Makeblock](/accessoires-mbot-par-ou-commencer/) (sensoren, arm, rupsbanden) op de poorten van de set.

Hij is minder geschikt als je een robot **zonder scherm** wilt voor een heel jong kind (3 tot 6 jaar). Kijk dan naar oplossingen zoals de [Matatalab Tale-Bot Pro](/le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants/). Voor die leeftijd staan er ook gidsen voor [4 jaar](/nl/robot-voor-4-jaar/), [5 jaar](/nl/robot-voor-5-jaar/) en [6 jaar](/nl/robot-voor-6-jaar/).

## 1. Wat er doorgaans in de doos zit

Afhankelijk van de verpakking en het jaar bevat de doos van de klassieke mBot meestal:

| Onderdeel | Eenvoudige rol |
|-----------|----------------|
| **Chassis** en mechanische onderdelen | De structuur van de robot (wielen, steunen). |
| **mCore-bord** | Het elektronische “brein” van de robot. |
| **Twee motoren** | Draaien de wielen. |
| **Ultrasoonsensor** | Meet de afstand vóór de robot (om obstakels te ontwijken). |
| **Lijnvolgsensor** | Leest een zwarte lijn op de vloer. |
| **Infrarood-afstandsbediening** | Bestuurt de robot op afstand (heeft knoopcelbatterijen nodig). |
| **Schroeven, schroevendraaier, handleiding** | Bouwen zonder solderen. |

De papieren handleiding blijft de referentie voor **jouw** exacte revisie: volg haar stap voor stap. Solderen is niet nodig.

## 2. Bouwen: met een volwassene, zonder stress

Het bouwen vraagt **klein gereedschap** (vaak meegeleverd) en wat **geduld**. Een kind van 10 jaar redt het, maar **samen met een volwassene**: om onderdelen vast te houden, de richting van de motoren te controleren en een schroef niet te forceren.

### Waarom een volwassene helpt

- **Veiligheid**: kleine onderdelen, gereedschap en batterijen. Toezicht is verstandig.
- **Leren**: een schema lezen, schroeven tellen en de polariteit controleren (welke kant een batterij of draad op moet) is al robotica.
- **Minder fouten**: omgekeerde motoren of slecht vastgeklikte kabels laten de robot achteruit rijden. Een tweede paar ogen voorkomt frustratie.

Reken op een vrije tafel, een bakje voor de schroeven en **30 tot 60 minuten**, afhankelijk van de ervaring. Is een stap in de handleiding onduidelijk, stop dan en vergelijk de foto in de handleiding met jouw bouw, in plaats van iets te forceren.

### Voeding (verbruiksartikelen)

Om de robot te laten rijden, reken je op:

- **oplaadbare batterijen** die in het vak van de set passen (vaak formaat AA — **kijk in de handleiding**) **of**
- een **LiPo-batterij** die compatibel is met Makeblock (lithium-polymeer, dezelfde techniek als in veel telefoons) met een passende connector, vaak een **JST**-type (een klein wit stekkertje met twee draden), **alleen** als jouw model en de handleiding dat toelaten;
- **CR2032**-cellen (knoopcelbatterijen) voor de infrarood-afstandsbediening.

Zonder betrouwbare voeding doet zelfs het beste programma niets: batterijen zijn het eerste nuttige “accessoire”. Hun prijs staat niet in deze pagina. We verzinnen geen Nederlandse schapprijs.

## 3. Eerste gebruik: voorgeïnstalleerde modi

Eenmaal gebouwd en van stroom voorzien kan de mBot al **rijden zonder computer**, dankzij **programma’s die al op het bord staan** (afhankelijk van het model en de modus die je op de robot of de afstandsbediening kiest):

- **obstakels ontwijken** (de ultrasoonsensor ziet wat er vóór hem is);
- **een zwarte lijn volgen** op de vloer (sensor onder het chassis);
- **handmatig rijden** met de afstandsbediening.

Dat is ideaal om te controleren of de bouw klopt **voordat** je software installeert. Reageert de robot niet: controleer de batterijen, de schakelaar, de motorkabels en daarna de handleiding.

## 4. Programmeren met mBlock (niet “de Scratch-app”)

Voor je eigen gedrag gebruik je **mBlock** (meestal **mBlock 5**): de software van Makeblock, **geïnspireerd op Scratch** (hetzelfde idee van gekleurde blokken die in elkaar klikken). Het is **niet** alleen de website scratch.mit.edu: mBlock voegt de **robotblokken** toe (motoren, sensoren, leds…). Het verschil tussen de twee omgevingen staat in [mBlock versus Scratch](/nl/mblock-vs-scratch/).

Aanbevolen pad op deze site:

1. [mBlock 5 installeren op Windows](/nl/mblock-5-installeren-windows/) (of de versie die bij jouw computer past).
2. [De interface van mBlock 5 begrijpen](/premier-pas-avec-mblock-5/) (podium, paletten, verbinding).
3. [De mBot-blokken installeren](/installer-les-blocs-du-mbot/) als het robotpalet niet verschijnt.
4. [Mijn eerste mBot-programma](/nl/eerste-mbot-programma/) voor een kort script dat je meteen kunt testen.

Op school of thuis is de **USB**-verbinding vaak de eenvoudigste start. **Bluetooth** (een draadloze verbinding) komt later. Zie [Bluetooth-problemen in mBlock](/mblock-bluetooth-erreurs-frequentes-depannage/).

## 5. Sterke kanten en grenzen (praktisch oordeel)

**Sterke kanten**

- Een educatieve bouw (mechanica plus lichte elektronica).
- Voorgeïnstalleerde modi voor een snel succes.
- Een natuurlijke stap naar Scratch en mBlock, en later naar andere robots van Makeblock.
- Een ecosysteem van accessoires zodra de basis zit.

**Grenzen**

- Je hebt een **computer** nodig (of een compatibele tablet) om hem echt te programmeren.
- De **mBot2** is recenter (scherm, Python meer op de voorgrond). Twijfel je, lees dan de [vergelijking mBot en mBot2](/nl/mbot-vs-mbot2/).
- De **RJ25**-accessoires van de klassieke mBot kun je niet zomaar op de **mBuild**-bus van de mBot2 prikken.

Dit is geen genummerde labtest. Het oordeel steunt op de documentatie van Makeblock, op het gangbare gebruik van de set op scholen, en op de samenhang met de andere mBot-gidsen op deze site. Prijzen bij verkopers veranderen. Kijk op de aanbieding op de dag dat je koopt. We verzinnen geen Nederlandse schapprijs.

## Veelgestelde vragen

### Hoe werkt de mBot?

De **mBot** is een klein rijdend platform. Het **mCore**-bord voert een programma uit (een voorgeïnstalleerde modus of een script uit mBlock), stuurt de **motoren**, de **leds** en de **zoemer** (een kleine luidspreker), en leest de **sensoren** (ultrasoon voor afstand, een lijnsensor onder het chassis). Je test in de modus **live** (robot verbonden met de computer) of je **uploadt** het programma naar het bord, zodat het zonder kabel draait.

### Is de mBot een educatieve robot?

Ja. Een **educatieve robot** (ook wel een pedagogische robot) gebruik je om programmeren en robotica te **leren** door een echt voorwerp te hanteren. De mBot komt in gezinnen en op scholen veel voor met precies dat doel.

### Wat is het verschil tussen de mBot en de mBot2?

De klassieke **mBot** gebruikt vooral het bord **mCore** en connectoren **RJ25**. De **mBot2** is gebouwd rond de **CyberPi** en de bus **mBuild**, met een natuurlijkere weg naar **Python**. Meer detail: [mBot versus mBot2](/nl/mbot-vs-mbot2/).

### Mijn mBot-programma doet niet wat ik wil. Waar begin ik?

Controleer het **juiste apparaat** in mBlock en de **verbinding** (USB om te testen), en **upload** opnieuw na elke wijziging. Bij draadloze problemen: [Bluetooth-problemen](/mblock-bluetooth-erreurs-frequentes-depannage/).

### Waar koop ik de klassieke mBot (niet de mBot2)?

De gevolgde productlink voor de **klassieke mBot** is deze: <a href="https://www.amazon.nl/dp/B07XR98YYQ?tag=manuso0607-21" rel="sponsored nofollow noopener">Bekijk de prijs van vandaag op Amazon</a> (ASIN B07XR98YYQ). Lees de **titel van de aanbieding** (mBot of mBot2) en de foto’s voordat je bestelt, en vergelijk de verkopers. We verzinnen geen Nederlandse schapprijs.

## Verder

- [mBot-accessoires: waar je begint](/accessoires-mbot-par-ou-commencer/)
- [Ideeën voor een mBot-project van een uur](/idees-projets-mbot-rapides-une-heure/)
- [Robot voor een kind van 10 jaar](/nl/robot-voor-10-jaar/)
- [mBot-recensie](/nl/mbot-recensie/)

*Amazon-partner — bij een aankoop die aan de voorwaarden voldoet, is een commissie mogelijk, zonder extra kosten voor jou.*
