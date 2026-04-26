---
title: "Accessoires mBot : guide complet (par où commencer, capteurs, extensions)"
headline: "Accessoires mBot : par où commencer ? (Guide complet pour bien évoluer)"
description: "Accessoires mBot débutant ou avancé : capteurs, extensions, mécanique. Progression claire, tableau comparatif, erreurs à éviter et liens Amazon — pour progresser sans acheter au hasard."
pubDate: "2026-03-30"
updatedDate: "2026-04-11"
heroImage: "../../assets/mbot/mbot-hero.png"
amazonPreset: mbot
articleJsonLd: true
categories:
  - "mBot"
  - "Makeblock"
  - "Guide"
  - "Activité"
relatedLinks:
  - title: "mBot, premier robot éducatif"
    href: "/mbot-mon-premier-robot-educatif/"
  - title: "Premier programme mBot (mBlock)"
    href: "/mon-premier-programme-mbot/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Série capteur ultrason (mBot)"
    href: "/serie-capteur-ultrason-mbot-1-mesurer-distance/"
  - title: "Parcours programmation"
    href: "/programmation/"
  - title: "Arduino C (bases embarqué)"
    href: "/programmation/arduino-c/"
faqSchema:
  - question: "Quel accessoire mBot pour débuter ?"
    answer: "Avant tout : consommables fiables (piles rechargeables adaptées) et rangement. Ensuite, un seul nouveau capteur ou module lié à un projet précis — souvent autour de l’ultrason ou du suivi de ligne selon votre version et votre objectif."
  - question: "Quels sont les meilleurs accessoires mBot ?"
    answer: "Il n’y a pas de liste universelle : le meilleur accessoire est celui qui sert à un objectif pédagogique clair (mesure, parcours, interaction). Les packs officiels peuvent être intéressants si chaque pièce sera utilisée et si le prix est meilleur qu’au détail."
  - question: "Peut-on créer ses propres modules pour le mBot ?"
    answer: "Oui, dans une logique bricolage ou STI : capteurs analogiques, platines d’essai, câblage — en respectant tensions et brochage. Ce n’est pas la première étape : maîtrisez d’abord mBlock et les capteurs intégrés ou officiels."
  - question: "Faut-il acheter un pack d’accessoires mBot tout de suite ?"
    answer: "Seulement si vous avez déjà listé des projets concrets pour chaque pièce et vérifié la compatibilité avec votre génération de mBot. Sinon, achetez au fil de l’eau pour éviter l’empilement inutile."
  - question: "Extension mBot ou nouveau robot : que choisir ?"
    answer: "Si les bases de programmation et les capteurs intégrés ne sont pas encore exploités, un nouvel achat complète rarement le problème. Les extensions ciblées prolongent la durée de vie du mBot sans changer de plateforme."
  - question: "Les accessoires mBot sont-ils compatibles mBot2 ?"
    answer: "Pas toujours : vérifiez la fiche Makeblock et la génération (connectique, firmware, blocs mBlock). Un module pour une autre révision peut être inutilisable ou demander une procédure spécifique."
---

Le **robot mBot** est souvent vendu comme point d’entrée idéal en **robotique éducative** : il combine déplacement, capteurs et programmation par blocs. Pourtant, face au catalogue d’**accessoires mBot** (capteurs, **extensions**, packs, pièces), beaucoup d’utilisateurs achètent « au feeling » — puis se retrouvent avec du matériel peu utilisé.

**Problème** : trop de choix, peu de critères. **Réponse** : une **progression** simple (du déjà-là vers le nouveau), un **tableau décisionnel** et des **projets** qui justifient chaque achat. Ce guide s’adresse à celles et ceux qui veulent **progresser** sans gaspiller : parents, enseignants, clubs.

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=mBot+Makeblock+accessoires+capteur&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le prix sur Amazon — accessoires mBot</a>
<a class="article-cta article-cta--secondary" href="/mbot-mon-premier-robot-educatif/">Présentation du mBot</a>
</div>

![Schéma : prioriser consommables, capteurs ciblés, puis mécanique](/images/blog/guides-2026/accessoires-mbot-cible.svg)

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#comprendre-accessoires">1. Comprendre les accessoires mBot</a></li>
<li><a href="#par-ou-commencer">2. Par où commencer avec les accessoires mBot ?</a></li>
<li><a href="#tableau-comparatif">3. Tableau comparatif</a></li>
<li><a href="#produits-affiliation">4. Idées d’achats ciblés (Amazon)</a></li>
<li><a href="#exemples-projets">5. Exemples de projets avec accessoires mBot</a></li>
<li><a href="#erreurs">6. Les erreurs à éviter</a></li>
<li><a href="#aller-plus-loin">7. Aller plus loin sur le site</a></li>
<li><a href="#faq">8. FAQ</a></li>
</ul>
</div>

<h2 id="comprendre-accessoires">Comprendre les accessoires mBot</h2>

Avant d’acheter, il aide de classer ce que vous voyez en ligne. Les **accessoires mBot** et **extensions** se regroupent souvent en quatre familles :

- **Capteurs** — mesurent l’environnement : distance (ultrason), luminosité, ligne au sol, parfois son ou couleur. Ils enrichissent la **logique** du programme (« si… alors… »).
- **Actionneurs** — ce qui agit : moteurs (déjà présents), LED, buzzer, parfois servomoteur ou bras. Ils donnent des **effets visibles** immédiats.
- **Extensions** — cartes ou modules officiels qui s’ajoutent au bus / ports prévus : packs « inventor », boucliers, parfois connectique dédiée. À valider selon **votre modèle** (mBot / mBot2, révision).
- **Mécanique** — chenilles, roues, structures, vis : change le comportement physique du robot (adhérence, encombrement). Souvent **plus gratifiant visuellement**, mais **plus pertinent quand le code suit**.

> **Rappel** : selon votre kit, le **suiveur de ligne**, l’**ultrason** ou le **buzzer** sont déjà là. La première « extension » est souvent **pédagogique** : savoir les utiliser dans un vrai projet.

<h2 id="par-ou-commencer">Par où commencer avec les accessoires mBot ?</h2>

La logique est **évolutive** : chaque niveau prépare le suivant. Voici **pourquoi** cette ordre a du sens en pratique.

### Débutant : capitaliser sur l’existant

**Objectif** : fiabiliser les séances et **progresser en programmation** sans nouveau matériel.

- **Utiliser les capteurs déjà présents** : par exemple mesurer une distance ou réagir à une ligne, selon votre version ([atelier distances](/activite-mbot-mesurer-des-distances/), [série ultrason](/serie-capteur-ultrason-mbot-1-mesurer-distance/)).
- **Objectifs simples** : « s’arrêter à 10 cm », « suivre une ligne droite », « alarme quand quelqu’un passe » ([détecteur d’intrusion](/activite-mbot-detecteur-dintrusion/)).

**Pourquoi** : si le robot s’éteint au milieu d’un défi ou si les pièces se perdent, **aucun capteur ne sauvera la motivation**. Les bases (alimentation, organisation, premiers scripts) viennent avant les **extensions mBot**.

### Intermédiaire : ajouter un capteur ou un module « parlant »

**Objectif** : introduire **plusieurs entrées** (lumière, son, deuxième capteur) et des **interactions** plus riches.

- **Capteurs lumière ou son** (si compatibles) : comportements du type « plus il fait sombre, plus il va vite » ou réaction à un bruit.
- **Premières interactions** : combiner **condition** + **action** (LED, mouvement, son).

**Pourquoi** : à ce stade, l’enfant ou le groupe **comprend déjà** les blocs et les capteurs du kit ; un **nouveau capteur** devient un **levier créatif** et non une boîte inconnue.

### Avancé : mécanique et projets complexes

**Objectif** : projets longs, **robot éviteur** affiné, parcours élaboré, ou scénario multi-étapes.

- **Modules mécaniques** : [chenilles](https://www.amazon.fr/s?k=chenilles+mBot+Makeblock&tag=manuso06-21), bras, structures — le robot change d’encombrement et de contraintes (friction, vitesse).
- **Projets complexes** : plusieurs capteurs, états (modes), debug en atelier ([idées rapides](/idees-projets-mbot-rapides-une-heure/)).

**Pourquoi** : la mécanique **sans** logique solide mène à des robots « bancals » et à de la frustration ; quand la **programmation** tient la route, la mécanique **prolonge** l’engagement.

<h2 id="tableau-comparatif">Tableau comparatif</h2>

<table>
<thead>
<tr>
<th scope="col">Accessoire</th>
<th scope="col">Niveau</th>
<th scope="col">Utilité</th>
<th scope="col">Pourquoi l’acheter</th>
</tr>
</thead>
<tbody>
<tr>
<td>Piles rechargeables + chargeur adapté</td>
<td>Débutant</td>
<td>Autonomie, séances sans coupure</td>
<td>Sans alimentation fiable, tout le reste est frustrant.</td>
</tr>
<tr>
<td>Rangement (boîte à compartiments)</td>
<td>Débutant</td>
<td>Moins de pièces perdues</td>
<td>Réduit l’abandon « on ne retrouve plus la vis ».</td>
</tr>
<tr>
<td>Capteur / logique autour de l’ultrason (projet mesure, obstacle)</td>
<td>Débutant → intermédiaire</td>
<td>Distance, obstacle, sécurité</td>
<td>Un fil rouge pédagogique — déjà exploitable avec nos tutoriels.</td>
</tr>
<tr>
<td>Capteur lumière, son ou pack capteurs compatible</td>
<td>Intermédiaire</td>
<td>Nouvelles entrées, scénarios variés</td>
<td>Quand les bases de code et les capteurs intégrés sont maîtrisés.</td>
</tr>
<tr>
<td>Pièces de rechange (roues, vis)</td>
<td>Selon usage</td>
<td>Clubs, prêt, sol dur</td>
<td>Évite d’immobiliser le robot après une casse.</td>
</tr>
<tr>
<td>Chenilles, bras, kit mécanique</td>
<td>Avancé</td>
<td>Nouveaux défis physiques</td>
<td>Quand la programmation suit — pas comme premier achat.</td>
</tr>
</tbody>
</table>

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=mBot+Makeblock+accessoires+capteur&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Disponible sur Amazon — accessoires Makeblock mBot</a>
<a class="article-cta article-cta--secondary" href="https://www.amazon.fr/s?k=piles+rechargeables+AA+chargeur&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le prix — piles rechargeables</a>
</div>

<h2 id="produits-affiliation">Idées d’achats ciblés (Amazon)</h2>

Chaque bloc regroupe **niveau**, **cas d’usage** et **points forts**. Les liens ouvrent une **recherche Amazon** (affiliation) : comparez les fiches et la **compatibilité** avec votre mBot avant commande.

### Alimentation et confort de séance

**Niveau** : débutant. **Cas d’usage** : ateliers réguliers, club, maison sans coupure au milieu d’un défi. **Points forts** : coût modéré, impact immédiat sur la **progression robotique** (temps de pratique réel).

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=piles+rechargeables+AA+chargeur+robot&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le prix sur Amazon — piles rechargeables</a>
</div>

### Capteurs : ultrason et environnement

**Niveau** : débutant à intermédiaire. **Cas d’usage** : **capteurs mBot** pour mesure, obstacle, parcours. **Points forts** : ancrage sur des activités du site ([mesurer des distances](/activite-mbot-mesurer-des-distances/), [série ultrason](/serie-capteur-ultrason-mbot-1-mesurer-distance/)).

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=capteur+ultrason+robot+%C3%A9ducatif+Makeblock&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le prix sur Amazon — capteur ultrason / robot éducatif</a>
</div>

### Ligne, lumière, interaction

**Niveau** : intermédiaire. **Cas d’usage** : **extension mBot** vers des comportements plus riches (suivi, réaction à la lumière, jeux). **Points forts** : nouvelles idées sans changer de robot — si la **compatibilité** est bonne.

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=suiveur+ligne+robot+%C3%A9ducatif&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Disponible sur Amazon — suiveur de ligne</a>
<a class="article-cta article-cta--secondary cta" href="https://www.amazon.fr/s?k=capteur+lumi%C3%A8re+robot+Makeblock&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le prix — capteur lumière</a>
</div>

### Mécanique : chenilles, structures

**Niveau** : avancé. **Cas d’usage** : modifier la tenue de route, le look, les contraintes (vitesse, obstacles). **Points forts** : motivation forte **après** maîtrise des bases — pas comme premier achat.

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=chenilles+mBot+Makeblock+kit&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le prix sur Amazon — chenilles / kit mBot</a>
</div>

### Visserie et maintenance

**Niveau** : tous. **Cas d’usage** : resserrer, remplacer, compléter un kit prêté en classe. **Points forts** : coût faible, tranquillité d’esprit.

<div class="article-cta-row">
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=kit+vis+m%C3%A9canique+robot+petite+visserie&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Disponible sur Amazon — visserie / petites pièces</a>
</div>

*Partenaire Amazon — une commission peut être versée sur achats éligibles, sans surcoût pour vous. Les fiches produit et la compatibilité **mBot / mBot2** restent à vérifier côté fabricant.*

<h2 id="exemples-projets">Exemples de projets avec accessoires mBot</h2>

Relier **théorie** et **pratique** aide à décider si un **accessoire mBot débutant** ou une **extension** vaut le coup.

### Robot éviteur d’obstacles

**Capteurs** : distance (ultrason). **Logique** : tant que la distance est suffisante, avancer ; sinon reculer ou pivoter. C’est la base de nombreux défis « sécurité » ou « labyrinthe ».

### Robot suiveur de ligne

**Capteurs** : réflexion sur le sol (souvent déjà prévu sur le châssis). **Logique** : corriger gauche/droite selon ce que « voit » le capteur — excellent pour comprendre **régulation** et **seuils**.

### Robot interactif

**Capteurs** : lumière ou son + LED / buzzer. **Logique** : réagir à l’environnement ou à l’utilisateur — utile pour des **scénarios créatifs** et des présentations en groupe.

Exemple de structure de programme (illustratif — à adapter dans mBlock) :

<pre><code>// Pseudo-code : éviter un obstacle
répéter indéfiniment {
  si distance &lt; 15 cm alors {
    reculer un peu
    tourner à droite
  } sinon {
    avancer lentement
  }
}
</code></pre>

<h2 id="erreurs">Les erreurs à éviter</h2>

- **Acheter trop tôt** — un nouveau module ne remplace pas la **maîtrise** de [mBlock 5](/premier-pas-avec-mblock-5/) et des blocs mBot ([installer les blocs](/installer-les-blocs-du-mbot/)).
- **Ne pas maîtriser les bases** — variables, boucles, conditions : sans ça, chaque **capteur mBot** ajoute de la complexité sans clarté.
- **Empiler les accessoires** — plusieurs modules non intégrés à un **parcours** pédagogique mènent au placard. Préférez **un** objectif + **un** achat à la fois.
- **Ignorer la compatibilité** — mBot et **mBot2** ne partagent pas tout ; vérifiez la génération avant d’ajouter une **extension mBot**.
- **Négliger le firmware** — certains périphériques demandent mise à jour ou réglage : sans notice claire, l’atelier bloque.

<h2 id="aller-plus-loin">Aller plus loin sur le site</h2>

- **Page mBot** et usage en famille ou en classe : [mBot, premier robot éducatif](/mbot-mon-premier-robot-educatif/).
- **Programmation** : [premier programme](/mon-premier-programme-mbot/), [quel logiciel mBlock ?](/logiciel-mblock-makeblock-mbot-quel-choisir/), hub [programmation](/programmation/).
- **Arduino / embarqué** (culture utile même en blocs) : [parcours Arduino C](/programmation/arduino-c/).
- **Autres robots** : [mBot vs mBot2](/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants/), [Codey Rocky](/robot-educatif-codey-rocky-makeblock/), [synthèse robots 2026](/meilleur-robot-programmable-enfant-2026/).

<h2 id="faq">FAQ</h2>

### Quel accessoire mBot pour débuter ?

Priorité à **l’alimentation fiable** et au **rangement**, puis à **un** capteur ou thème lié à un projet (souvent **distance** / **obstacle**). Voir le [tableau comparatif](#tableau-comparatif) ci-dessus.

### Quels sont les meilleurs accessoires mBot ?

Ceux qui répondent à **votre** objectif : **accessoires mBot débutant** = confort + un capteur utile ; **intermédiaire** = diversifier les entrées ; **avancé** = mécanique quand le code suit.

### Peut-on créer ses propres modules ?

Oui, en montée en compétence (électronique, sécurité, brochage). Ce n’est généralement pas la première étape : exploitez d’abord le matériel **Makeblock** et les tutoriels du site.

### Faut-il acheter un pack d’accessoires mBot tout de suite ?

Uniquement si chaque pièce du pack a un **usage prévu** et si le **prix** est avantageux vs l’achat séparé — sinon, progressez **étape par étape**.

### Extension mBot ou nouveau robot : que choisir ?

Si le mBot n’est pas encore « épuisé » pédagogiquement, des **extensions** ciblées prolongent l’apprentissage. Un nouvel achat se justifie plutôt quand les **besoins** (capacités, âge, cursus) changent vraiment.

### Les accessoires sont-ils compatibles mBot2 ?

**Pas automatiquement.** Vérifiez la **compatibilité** sur la documentation Makeblock et la version de votre robot avant toute commande.
