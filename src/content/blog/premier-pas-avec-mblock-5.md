---
title: "mBlock 5 : interface et premiers pas (guide débutant 2026)"
headline: "MBlock 5 : se repérer dans l’interface (débutants)"
description: "Tour d’horizon de mBlock 5 : scène, lutins, onglet Appareil, palettes de blocs, zone de script, connexion au robot et exécution du programme. Guide pour débutants après l’installation."
pubDate: "2020-04-07"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-04-18"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Guide"
  - "Scratch"
  - "Débutant"
relatedLinks:
  - title: "Télécharger mBlock 5 (officiel, gratuit)"
    href: "/telecharger-mblock-5-gratuit-guide-2026/"
  - title: "Installer mBlock 5 sous Windows 10"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Quel logiciel mBlock pour votre robot"
    href: "/logiciel-mblock-makeblock-mbot-quel-choisir/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Dépannage Bluetooth mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
  - title: "Scratch école / maison"
    href: "/scratch-ecole-maison-par-ou-commencer/"
faqSchema:
  - question: "mBlock 5 et Scratch en ligne, c’est pareil ?"
    answer: "Presque pour la partie lutins et scène. La différence majeure est le matériel Makeblock : pilotes, blocs robots, mise à jour du firmware. Pour un mBot, mBlock est adapté ; pour du pur Scratch sans robot, le site officiel suffit."
  - question: "Je ne vois pas les blocs de mon robot"
    answer: "Ajoutez d’abord l’appareil dans l’onglet prévu, puis suivez la procédure d’extension mBot. Sans appareil reconnu, les blocs spécifiques n’apparaissent pas."
  - question: "L’interface est en anglais"
    answer: "Ouvrez Language, Préférences ou Paramètres dans le menu (emplacement variable selon la version) et choisissez Français."
  - question: "mBlock plante au premier lancement"
    answer: "Mettez à jour Windows, mBlock et les pilotes ; testez en administrateur une fois ; en cas de blocage antivirus, voir la FAQ de l’article d’installation mBlock sous Windows."
  - question: "C’est quoi un « programme mblock » ?"
    answer: "C’est le script en blocs (une ou plusieurs piles) dans la zone de script, souvent sauvegardé en fichier .mblock. Pour un exemple sur mBot : Mon premier programme mBot."
  - question: "« mBlock 5 web » et l’application installée, même fonction ?"
    answer: "L’interface se ressemble entre mBlock en ligne et l’appli bureau. Le branchement robot, le Bluetooth et le téléversement sont souvent plus fiables dans l’application — voir l’article Quel logiciel mBlock."
---

<p><strong>Se repérer dans mBlock 5 :</strong><br>
Après <a href="/installer-mblock-5-sous-windows-10/">l’installation</a>, repérez la <strong>scène</strong>, les <strong>lutins</strong>, l’onglet <strong>Appareil</strong> (pour ajouter un robot), les <strong>catégories de blocs</strong> et la <strong>zone de script</strong> où l’on emboîte les commandes. Connectez l’appareil (USB ou Bluetooth) avant de téléverser un programme.</p>

<p>Guide rédigé pour une prise en main en classe ou à la maison, croisée avec les versions récentes de mBlock et les usages courants sur Windows.</p>

## Télécharger mBlock 5 (guide rapide)

- **Lien officiel** : téléchargez **gratuitement** sur la page Makeblock — voir le **hub** <a href="/telecharger-mblock-5-gratuit-guide-2026/">Télécharger mBlock 5 gratuitement (Windows, Mac, en ligne)</a> (FAQ, liens directs).
- **Windows** : pas à pas détaillé dans <a href="/installer-mblock-5-sous-windows-10/">Installer mBlock sous Windows 10/11</a> ; variante courte **Windows 11** : <a href="/installer-mblock-windows-11-guide-facile/">guide facile</a>.
- **Sans installer** : <a href="/mblock-en-ligne-programmer-sans-installer/">mBlock en ligne</a> dans le navigateur.

## mBlock expliqué (logiciel de programmation)

**mBlock** est le **logiciel de programmation** Makeblock : **blocs** proches de **Scratch**, plus des **extensions** pour **robots** et cartes (**mBot**, **Arduino** / matériel compatible selon modèle). Vous assemblez des scripts, vous **connectez** le matériel en **USB** ou **Bluetooth**, puis vous **téléversez** le programme dans la carte. Pour comparer avec le Scratch « classique » : <a href="/mblock-vs-scratch-lequel-choisir/">mBlock vs Scratch</a>.

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#ecran-scratch-robot">1. Écran type Scratch et robot</a></li>
<li><a href="#vue-globale">2. Vue globale</a></li>
<li><a href="#menu-principal">3. Menu principal</a></li>
<li><a href="#scene-controles">4. Scène et contrôles</a></li>
<li><a href="#lutins-appareil">5. Lutins et appareils</a></li>
<li><a href="#categories-blocs">6. Catégories de blocs</a></li>
<li><a href="#zone-script">7. Zone de script</a></li>
<li><a href="#python-apercu">8. Mode Python (aperçu)</a></li>
<li><a href="#connexion-robot">9. Connexion au robot</a></li>
<li><a href="#faq">10. FAQ</a></li>
</ul>
</div>

<p>En prolongement : <a href="/mon-premier-programme-mbot/">premier téléversement mBot</a>, <a href="/scratch-creer-un-jeu-video-premiere-partie/">Scratch avec mBlock</a>.</p>

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/mon-premier-programme-mbot/">Premier programme mBot</a>
<a class="article-cta article-cta--secondary" href="/installer-les-blocs-du-mbot/">Installer les blocs mBot</a>
</div>

**mBlock 5** est l’application de **programmation par blocs** de Makeblock, proche de **Scratch**, mais pensée pour **brancher** des robots (mBot, mBot2, Codey Rocky, CyberPi, etc.) en plus d’animer des **lutins** à l’écran. Ce guide vous aide à **vous repérer** dans la fenêtre : menus, zones, vocabulaire.

<h2 id="ecran-scratch-robot">1. Écran « type Scratch » et robot : ce que mBlock permet</h2>

mBlock n’est **pas** coupé en deux bandes dans la fenêtre : c’est **un seul** logiciel, avec des **zones** (scène, scripts, palettes de blocs) qui se ressemblent à Scratch.

**Côté écran**, vous utilisez la **scène**, les **lutins** et les arrière-plans comme sur Scratch : animer des personnages, des décors, de petits jeux — tout reste **dans la fenêtre** de mBlock.

**Côté robot**, ce n’est pas une « autre moitié » de l’interface : une fois un **appareil Makeblock** ajouté (mBot, etc.) et **connecté** en USB ou Bluetooth, des **blocs supplémentaires** apparaissent pour le matériel réel — moteurs, LED, capteurs, buzzer, etc. Tant que vous n’avez pas ajouté d’appareil, vous ne voyez que la partie **lutins / scène** ; après ajout, vous programmez avec les blocs **dédiés au robot**, seuls ou **en plus** des lutins si le projet mélange les deux (par exemple un score à l’écran pendant que le robot avance).

En pratique : **sans robot**, vous restez sur l’animation à l’écran comme sur Scratch. **Avec robot**, vous vous concentrez souvent sur les blocs **appareil** — la scène peut attendre. **Les deux** peuvent aussi être combinés dans un même projet.

<h2 id="vue-globale">2. Vue globale de la fenêtre</h2>

![Interface mBlock 5 : scène, palettes de blocs, zone de script, guide débutant](/images/blog/premier-pas-mblock/mblock-vue-globale.png)

En parcourant l’interface de gauche à droite et de haut en bas, on retrouve en général :

1. **Barre de menus** : fichier, édition, réglages, langue, aide, parfois compte Makeblock.
2. **Scène** : aperçu du projet visuel (lutins, décor).
3. **Contrôles sous la scène** : **drapeau vert** (démarrer), **stop**, parfois **plein écran**, **taille des blocs**.
4. **Zone des lutins / appareils** : onglets pour choisir **qui** est programmé (lutin, robot…).
5. **Catégories de blocs** : colonnes colorées (Mouvement, Apparence, etc., + catégories **mBot** ou autre appareil une fois ajouté).
6. **Zone de script** : grand espace central où l’on **emboîte** les blocs pour former le programme.

Les libellés exacts peuvent varier selon la **langue** (français / anglais) et la **version** de mBlock ; la **logique** des zones reste la même.

<h2 id="menu-principal">3. Le menu principal</h2>

![Menu mBlock 5 : Nouveau, Ouvrir, Enregistrer, langue](/images/blog/premier-pas-mblock/mblock-menu-principal.png)

À connaître dès le début :

- **Nouveau / Ouvrir / Enregistrer** : vos projets sont souvent des fichiers **.mblock** (pensez à sauvegarder souvent).
- **Langue** : basculer l’interface en **français** si besoin (souvent dans les préférences ou le menu).
- **Tutoriel ou aide en ligne** : raccourci utile la première semaine.
- **Connexion / compte** : optionnel selon l’usage ; pour piloter un robot, l’essentiel est la **connexion à l’appareil** (voir plus bas), pas forcément un compte cloud.

<h2 id="scene-controles">4. La scène et les contrôles de lecture</h2>

![Scène mBlock : lutin, drapeau vert, stop, taille des blocs](/images/blog/premier-pas-mblock/mblock-scene-controles.png)

- **Scène** : c’est le « théâtre » des lutins. Coordonnées, taille, ordre des calques : même idée que sur [scratch.mit.edu](https://scratch.mit.edu/).
- **Drapeau vert** : démarre les scripts qui commencent par le bloc « quand le drapeau vert est cliqué ».
- **Bouton stop** : arrête tout — indispensable si une boucle ne se termine pas.
- **Taille des blocs** : agrandir ou réduire pour les jeunes ou les démonstrations sur vidéoprojecteur.

<h2 id="lutins-appareil">5. Lutins, appareils et les trois onglets</h2>

![mBlock : onglets Appareil, Objet, Arrière-plan](/images/blog/premier-pas-mblock/mblock-onglets-lutins-appareil.png)

Sous ou à côté de la scène, la zone qui gère **qui** est sélectionné comporte souvent trois onglets :

| Onglet | Usage |
|--------|--------|
| **Appareil** | Ajouter un robot Makeblock (mBot, etc.), le **connecter** (USB / Bluetooth), puis utiliser ses **blocs** dédiés. |
| **Objet** (lutins) | Choisir le lutin actif, en créer ou en importer ; position sur la scène. |
| **Arrière-plan** | Choisir ou importer le décor de la scène. |

Pour le [mBot](/mbot-mon-premier-robot-educatif/), commencez par **ajouter l’appareil** puis [installer les blocs mBot](/installer-les-blocs-du-mbot/) si la palette n’apparaît pas. La connexion **USB** est la plus simple pour dépanner ; le **Bluetooth** est pratique sans fil mais plus sensible aux interférences — voir [dépannage Bluetooth](/mblock-bluetooth-erreurs-frequentes-depannage/).

<h2 id="categories-blocs">6. Catégories de blocs et couleur</h2>

![mBlock 5 : colonnes de catégories de blocs Scratch / robot](/images/blog/premier-pas-mblock/mblock-categories-blocs.png)

- Les **catégories** regroupent les blocs par thème : mouvement, apparence, son, contrôle, capteurs, etc.
- Les blocs **du robot** n’apparaissent que lorsque l’**appareil** correspondant est **ajouté** et **sélectionné**.
- La catégorie **« Mes blocs »** (ou équivalent) sert à créer vos **propres** blocs à partir de scripts réutilisables — utile plus tard pour structurer de gros projets.

Les **couleurs** aident à retrouver rapidement une famille de commandes ; ce n’est pas décoratif seulement, c’est un **repère visuel** en classe.

<h2 id="zone-script">7. La zone de script</h2>

![Zone de script mBlock avec blocs emboîtés](/images/blog/premier-pas-mblock/mblock-zone-script.png)

C’est ici que vous **construisez** le programme :

- Les blocs s’**emboîtent** comme des pièces de puzzle ; seuls certains assemblages sont valides (formes compatibles).
- L’exécution suit en général le **flux de haut en bas** pour une pile de blocs (sauf si vous utilisez des structures de contrôle plus avancées).
- Vous pouvez avoir **plusieurs scripts** en parallèle (plusieurs piles qui démarrent sur des événements différents).

**Astuce :** commencez toujours par un bloc **déclencheur** (drapeau vert, touche, message, événement robot…) pour savoir **quand** le programme démarre.

<h2 id="python-apercu">8. Mode Python (aperçu)</h2>

Sur certaines versions et appareils, mBlock propose un passage vers **Python** (onglet ou bascule « code »). Ce n’est pas nécessaire pour les premiers pas en blocs ; retenez simplement que c’est la **suite logique** quand la syntaxe texte devient un objectif pédagogique — comme sur [mBot2](/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/) ou [CyberPi](/decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente/).

<h2 id="connexion-robot">9. Connexion au robot : ce qu’il faut vérifier</h2>

Avant de cliquer sur « connecter » :

1. **Robot allumé** et **batterie** ou piles suffisantes.
2. **Câble USB** bien branché *ou* **Bluetooth** appairé côté Windows (voir [logiciel : app vs Web](/logiciel-mblock-makeblock-mbot-quel-choisir/)).
3. Dans mBlock, **bon appareil** sélectionné dans la liste (éviter de confondre deux robots identiques en classe).

Ensuite, selon le mode :

- **Exécution en direct** : le programme tourne **tant que** le lien avec le PC est actif (utile pour tester).
- **Téléversement** : le programme est **enregistré dans le robot** pour qu’il fonctionne **sans** le câble — détaillé dans [mon premier programme mBot](/mon-premier-programme-mbot/).

<h2 id="faq">10. FAQ</h2>

<h3 id="faq-scratch">10.1. mBlock 5 et Scratch en ligne, c’est pareil ?</h3>

<p><strong>Presque</strong> pour la partie lutins / scène. La différence majeure est le <strong>matériel Makeblock</strong> : pilotes, blocs robots, mise à jour du <strong>firmware</strong>. Pour du pur Scratch sans robot, le site officiel suffit ; pour un <strong>mBot</strong>, mBlock est adapté.</p>

<h3 id="faq-pas-blocs">10.2. Je ne vois pas les blocs de mon robot</h3>

<p>Ajoutez d’abord l’<strong>appareil</strong> dans l’onglet prévu, puis vérifiez la <a href="/installer-les-blocs-du-mbot/">procédure d’extension mBot</a>. Sans appareil reconnu, les blocs spécifiques n’apparaissent pas.</p>

<h3 id="faq-anglais">10.3. L’interface est en anglais</h3>

<p>Cherchez <strong>Language</strong> / <strong>Préférences</strong> / <strong>Paramètres</strong> dans le menu (emplacement variable selon la version) et choisissez <strong>Français</strong>.</p>

<h3 id="faq-plante">10.4. mBlock plante au premier lancement</h3>

<p>Mettez à jour <strong>Windows</strong>, <strong>mBlock</strong> et les <strong>pilotes</strong> ; testez en <strong>administrateur</strong> une fois ; en cas de blocage antivirus, voir la FAQ de <a href="/installer-mblock-5-sous-windows-10/">l’article d’installation</a>.</p>

<h3 id="faq-programme-mblock">10.5. C’est quoi un « programme mblock » ?</h3>

<p>Dans mBlock, un <strong>programme</strong> est le <strong>script en blocs</strong> (une ou plusieurs piles) que vous assemblez dans la <strong>zone de script</strong>, souvent sauvegardé dans un fichier projet <strong><code>.mblock</code></strong>. Pour en voir un exemple sur <strong>robot mBot</strong>, suivez <a href="/mon-premier-programme-mbot/">Mon premier programme mBot</a>.</p>

<h3 id="faq-web-vs-app">10.6. « mBlock 5 web » et l’application installée, même fonction ?</h3>

<p>L’<strong>interface</strong> (scène, blocs, zone de script) se ressemble entre <strong><a href="https://ide.mblock.cc/">mBlock en ligne</a></strong> et l’<strong>appli bureau</strong>. En revanche, le <strong>branchement robot</strong>, le <strong>Bluetooth</strong> et le <strong>téléversement</strong> sont souvent <strong>plus fiables</strong> dans l’application — détail dans <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">Quel logiciel mBlock</a>.</p>

---

## Liens Amazon (affiliation)

- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)
- [Robot éducatif programmable enfant](https://www.amazon.fr/s?k=robot+%C3%A9ducatif+programmable+enfant&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles.*

---

**Étape suivante :** enchaînez avec [l’installation des blocs mBot](/installer-les-blocs-du-mbot/) si nécessaire, puis [mon premier programme mBot](/mon-premier-programme-mbot/) pour relier **interface**, **connexion** et **téléversement**.
