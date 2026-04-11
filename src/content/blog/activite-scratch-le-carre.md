---
title: "Activité facile avec scratch : le carré"
headline: "Scratch / mBlock : faire dessiner un carré au lutin"
description: "Première activité Scratch ou mBlock : repère orthonormé sur la scène, déplacer le lutin sur un carré de 200 pas, projet carre.mblock à télécharger."
pubDate: "2020-04-10"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
updatedDate: "2026-04-02"
amazonPreset: scratch
categories:
  - "Activité"
  - "Scratch"
  - "À partir de 8 ans"
  - "mBlock"
relatedLinks:
  - title: "Premiers pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Installer mBlock 5 (Windows)"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Scratch école / maison"
    href: "/scratch-ecole-maison-par-ou-commencer/"
  - title: "Créer un jeu vidéo avec Scratch (série)"
    href: "/scratch-creer-un-jeu-video-premiere-partie/"
faqSchema:
  - question: "Comment faire déplacer un lutin sur un carré dans Scratch ou mBlock ?"
    answer: "Placer le lutin au premier coin, puis enchaîner quatre segments égaux en tournant de 90° à chaque angle (ou utiliser des coordonnées (x,y) pour les quatre sommets). Le projet carre.mblock fourni donne un décor et un exemple de script."
  - question: "Quelles sont les coordonnées des sommets d’un carré de 200 pas depuis (−100, 100) ?"
    answer: "(−100, 100) puis (100, 100), (100, −100), (−100, −100) pour un carré centré sur l’origine avec des côtés parallèles aux axes — sous réserve d’orientation du déplacement."
  - question: "Scratch en ligne ou mBlock : pour cette activité ?"
    answer: "Les deux conviennent pour le repère et le lutin : mBlock reprend la même logique que Scratch et permet de prolonger vers les robots Makeblock."
---

<p><strong>Faire parcourir un carré au lutin :</strong><br>
Placer le lutin au premier sommet, puis enchaîner les <strong>segments</strong> (ou les coordonnées) pour un carré de <strong>200 pas</strong> de côté ; déclencher le script avec la <strong>barre espace</strong> ou le <strong>drapeau vert</strong> selon le projet.</p>

<p>Activité courte testée en atelier avec Scratch et mBlock ; les champs d’interface peuvent varier légèrement selon la version.</p>

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#prerequis">1. Prérequis</a></li>
<li><a href="#scene-repere">2. La scène et le repère</a></li>
<li><a href="#placement-lutin">3. Placement du lutin</a></li>
<li><a href="#carre-coordonnees">4. Le carré et les coordonnées</a></li>
<li><a href="#programme">5. Le programme</a></li>
<li><a href="#aller-plus-loin">6. Aller plus loin</a></li>
<li><a href="#faq">7. FAQ</a></li>
</ul>
</div>

<p>En prolongement : <a href="/premier-pas-avec-mblock-5/">interface mBlock</a>, <a href="/activite-mbot-faire-clignoter-les-leds/">autres activités</a>, <a href="/categorie/scratch/">catégorie Scratch</a>.</p>

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/premier-pas-avec-mblock-5/">Interface mBlock 5</a>
<a class="article-cta article-cta--secondary" href="/capture/carre/carre.mblock">Projet carre.mblock</a>
</div>

Dans cet article, vous faites une première activité pour découvrir [Scratch](https://scratch.mit.edu/) ou **mBlock** : déplacer le lutin autour d’un **carré de 200 pas** de côté.

<h2 id="prerequis">1. Prérequis</h2>

- [Installer mBlock 5](/installer-mblock-5-sous-windows-10/) **ou** utiliser Scratch en ligne.
- Avoir parcouru l’[interface mBlock 5](/premier-pas-avec-mblock-5/) (utile si vous utilisez mBlock).

<h2 id="scene-repere">2. La scène en détail</h2>

Pour cette activité, on regarde la scène : la position de chaque lutin est définie sur un **plan à deux dimensions** — un **repère orthonormé** avec **X** (horizontal) et **Y** (vertical).

Les coordonnées d’un point s’écrivent **(x, y)** : d’abord l’abscisse **x**, puis l’ordonnée **y**.

Le croisement des deux axes est l’**origine**, de coordonnées **(0, 0)** — au **centre** de la scène dans Scratch / mBlock.

![Repère orthonormé Scratch mBlock : origine au centre, axes x et y](/images/blog/activite-scratch-carre/repere-orthonorme-mblock.svg)

> **Limites de la scène :** pour que le lutin reste **à l’écran**, en pratique **x** doit rester entre **−240** et **+240**, et **y** entre **−180** et **+180** (scène classique 480 × 360 pixels, comme sur le schéma ci-dessus).

<h2 id="placement-lutin">3. Placement du lutin</h2>

Placez le lutin aux coordonnées **(−100, 100)**.

![Scratch mBlock : lutin placé aux coordonnées (−100, 100)](/capture/carre/01-placement-lutin-moins100-100.png)

Vous pouvez **déplacer le lutin à la souris** sur la scène ou **saisir x et y** dans les champs prévus (panneau du lutin ou zone d’information selon la version).

![Saisie des coordonnées du lutin sur la scène](/capture/carre/02-saisie-coordonnees-lutin.png)

<h2 id="carre-coordonnees">4. Le carré</h2>

Un carré a tous ses côtés égaux ; ici la longueur est de **200 pas**.

Sachant que le lutin est placé aux coordonnées **(−100, 100)**, quelles sont les coordonnées des quatre sommets ? La réponse suit ci-dessous.

Pour aider à la visualisation, ouvrez le projet mBlock préparé (fond en forme de carré) : **[télécharger `carre.mblock`](/capture/carre/carre.mblock)** — Fichier → Ouvrir dans **mBlock 5**.

![Scène mBlock avec fond carré pour l’activité](/capture/carre/03-scene-preparee-carre.png)

**Solution :** les coordonnées des quatre coins :

- Point de départ : **(−100, 100)**
- Coin haut à droite : **(100, 100)**
- Coin bas à droite : **(100, −100)**
- Coin bas à gauche : **(−100, −100)**

Le lutin doit se déplacer le long de ces segments — à vous de programmer le parcours.

<h2 id="programme">5. Le programme</h2>

**Comportement attendu :** lorsque l’on appuie sur la **barre espace**, le lutin **glisse** le long du carré dans le **sens horaire**, fait le tour et revient au départ.

Le script est dans **[`carre.mblock`](/capture/carre/carre.mblock)** : ouvrez-le dans mBlock 5 pour voir la **zone de script** ; vous pouvez modifier ou recopier les blocs.

**Pour lancer :** **drapeau vert**, puis **barre espace** pour déclencher le déplacement (selon le script du fichier).

<h2 id="aller-plus-loin">6. Apprendre Scratch</h2>

Sélection de recherches **Amazon.fr** (affiliation) ; vérifiez fiche, avis et prix au moment de l’achat :

- [Recherche : J’apprends à coder avec Scratch 3](https://www.amazon.fr/s?k=j%27apprends+%C3%A0+coder+avec+scratch+3&tag=manuso06-21)
- [Recherche : Scratch pour les kids](https://www.amazon.fr/s?k=scratch+pour+les+kids&tag=manuso06-21)
- [Recherche : programmer des jeux avec Scratch](https://www.amazon.fr/s?k=programmer+jeu+scratch&tag=manuso06-21)
- [Recherche : Scratch 3 activités enfants](https://www.amazon.fr/s?k=scratch+3+activit%C3%A9s+enfants&tag=manuso06-21)
- [Recherche : algorithmique enfants débutant](https://www.amazon.fr/s?k=algorithmique+enfants+d%C3%A9butant&tag=manuso06-21)

<h2 id="faq">7. FAQ</h2>

<h3 id="faq-carre">7.1. Comment faire déplacer un lutin sur un carré dans Scratch ou mBlock ?</h3>

<p>Enchaîner <strong>quatre mouvements</strong> égaux avec rotation de <strong>90°</strong>, ou suivre les quatre sommets en coordonnées. Le fichier <code>carre.mblock</code> fournit un exemple.</p>

<h3 id="faq-coords">7.2. Quelles sont les coordonnées des sommets d’un carré de 200 pas depuis (−100, 100) ?</h3>

<p><strong>(−100, 100)</strong>, <strong>(100, 100)</strong>, <strong>(100, −100)</strong>, <strong>(−100, −100)</strong> pour ce repère axes-aligned.</p>

<h3 id="faq-scratch-mblock">7.3. Scratch en ligne ou mBlock : pour cette activité ?</h3>

<p>Les deux conviennent pour le <strong>repère</strong> ; <strong>mBlock</strong> prolonge ensuite vers les <strong>robots Makeblock</strong>.</p>
