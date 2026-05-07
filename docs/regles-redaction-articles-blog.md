# Règles de rédaction des articles blog

Ce document synthétise les règles à appliquer selon le type d'article à produire sur le site : **article simple** ou **article pilier**. Il sert de checklist avant publication pour garder une cohérence SEO, pédagogique, affiliation et maillage interne.

---

## 1. Règles communes à tous les articles

### 1.1 Objectif éditorial

Chaque article doit répondre clairement à une intention utilisateur :

- **S'informer** : comprendre un outil, un robot, une notion de programmation.
- **Faire** : installer, configurer, dépanner, créer un projet.
- **Choisir / acheter** : comparer des robots, kits, accessoires ou logiciels.
- **Progresser** : apprendre la programmation, mBlock, mBot, Arduino, Python.

L'article doit toujours apporter une valeur réelle : consignes concrètes, exemples, limites, erreurs fréquentes, recommandations utiles. Éviter les textes génériques qui pourraient s'appliquer à n'importe quel site.

### 1.2 Frontmatter obligatoire ou recommandé

Chaque article Markdown doit respecter le schéma Astro du projet.

Champs essentiels :

- `title` : titre SEO, orienté clic, utilisé dans la balise `<title>`.
- `headline` : H1 affiché si différent du title. Un seul H1 par article.
- `description` : meta description claire, avec bénéfice lecteur.
- `pubDate` : date de publication.
- `updatedDate` : date de mise à jour si l'article est modifié.
- `heroImage` : image cohérente avec le sujet si disponible.
- `categories` : exactement 4 catégories.
- `relatedLinks` : liens internes utiles.
- `tags` : mots-clés internes si pertinent.
- `amazonPreset` : si l'article peut générer des clics affiliés.
- `faqSchema` : obligatoire dès qu'une FAQ visible est présente.
- `productItemListSchema` : recommandé pour comparatifs produits / guides achat.
- `articleJsonLd: true` : utile pour les articles pédagogiques structurés si le contexte s'y prête.

### 1.3 SEO de base

Chaque article doit contenir :

- Un H1 unique via `headline` ou `title`.
- Une introduction qui pose le problème et annonce la promesse.
- Des H2 explicites, optimisés naturellement, sans bourrage de mots-clés.
- Des liens internes vers des pages existantes.
- Une FAQ visible si le sujet génère des questions fréquentes.
- Un contenu suffisamment long pour répondre à l'intention, sans remplissage.
- Des mots-clés intégrés naturellement dans les phrases.

À éviter :

- Ajouter un `# H1` dans le corps Markdown.
- Mettre du JSON-LD manuel en `<script>` dans le Markdown.
- Inventer des URLs internes inexistantes.
- Utiliser des titres méta du type "maillage interne", "optimisation SEO", "conversion" dans le contenu visible lecteur.
- Répéter mécaniquement "À retenir" partout.

### 1.4 FAQ et JSON-LD

Si l'article contient une FAQ :

- Les questions doivent être visibles dans le corps de l'article.
- Le frontmatter `faqSchema` doit reprendre les mêmes questions.
- L'ordre du `faqSchema` doit suivre l'ordre de la FAQ visible.
- Les réponses doivent avoir le même sens que les réponses visibles.
- Minimum recommandé : 3 questions pour un article simple, 5 questions pour un article pilier.

### 1.5 Affiliation Amazon

Pour un article monétisable :

- Utiliser des liens Amazon avec `tag=manuso06-21`.
- Préférer des liens de recherche Amazon quand le produit a plusieurs versions ou vendeurs.
- Ajouter `rel="noopener noreferrer sponsored"` sur les CTA HTML externes.
- Ne pas promettre un prix fixe : indiquer que les prix varient selon vendeur, version et promotions.
- Toujours expliquer pourquoi le produit est recommandé.
- Ajouter une mention partenaire Amazon en fin de zone affiliée.

CTA recommandé :

```html
<a class="article-cta article-cta--primary cta" href="https://www.amazon.fr/s?k=produit&tag=manuso06-21" target="_blank" rel="noopener noreferrer sponsored">Voir le produit</a>
```

### 1.6 Maillage interne

Le maillage doit être naturel et utile :

- Lien vers les tutoriels du site pour passer à l'action.
- Lien vers les guides mBot si le sujet touche mBlock, mBot ou robot éducatif.
- Lien vers les parcours Arduino / Python si le sujet touche la programmation.
- Lien vers les guides d'achat si l'article a une intention transactionnelle.

Exemples de pages souvent utiles :

- `/premier-pas-avec-mblock-5/`
- `/installer-les-blocs-du-mbot/`
- `/mon-premier-programme-mbot/`
- `/10-projets-mbot-gratuits-classe-faciles/`
- `/programmation/arduino-c/`
- `/quel-robot-educatif-choisir-2026/`
- `/meilleur-robot-programmable-enfant-2026/`
- `/meilleur-robot-educatif-arduino-kit-choisir/`

---

## 2. Article simple

Un article simple répond à une intention précise : tutoriel, dépannage, fiche courte, activité, présentation d'outil, question fréquente.

### 2.1 Quand utiliser ce format

Utiliser un article simple pour :

- Installer un logiciel.
- Résoudre un problème précis.
- Présenter une activité mBot ou mBlock.
- Expliquer une notion de programmation.
- Répondre à une question ciblée.
- Ajouter un contenu de série.

### 2.2 Structure recommandée

Structure type :

1. Introduction courte : problème + promesse.
2. Réponse rapide ou résumé en haut si la requête est pratique.
3. Prérequis ou matériel nécessaire.
4. Étapes détaillées ou explication principale.
5. Problèmes fréquents / erreurs à éviter si pertinent.
6. Suite logique : liens internes vers tutoriels ou guides.
7. FAQ courte si le sujet s'y prête.

### 2.3 H1 et titres

Le H1 doit être direct :

- `Installer mBlock 5 sur Windows 11 : guide complet étape par étape (2026)`
- `Faire clignoter les LED du mBot : activité facile avec mBlock`
- `Arduino C : conditions, capteurs et actionneurs`

Les H2 doivent aider le lecteur à avancer :

- `Compatibilité Windows 11`
- `Télécharger mBlock 5`
- `Installation pas à pas`
- `Problèmes fréquents`
- `Premier programme`

### 2.4 Longueur cible

Repères :

- Article court ciblé : 800 à 1 200 mots.
- Tutoriel SEO important : 1 200 à 1 800 mots.
- Dépannage ou installation très recherchée : jusqu'à 2 000 mots si nécessaire.

Ne pas allonger artificiellement. L'article simple doit rester facile à suivre.

### 2.5 Éléments obligatoires selon le cas

Pour un tutoriel :

- Prérequis.
- Étapes numérotées.
- Captures ou descriptions d'écran si utiles.
- Erreurs fréquentes.
- Suite logique.

Pour un dépannage :

- Symptôme clair.
- Causes probables.
- Solutions dans l'ordre le plus simple.
- Cas où demander de l'aide ou changer de méthode.

Pour une activité pédagogique :

- Âge ou niveau.
- Durée.
- Matériel.
- Objectif d'apprentissage.
- Étapes.
- Variante ou défi.

### 2.6 Affiliation dans un article simple

L'affiliation doit rester secondaire et contextualisée :

- Matériel nécessaire.
- Accessoire utile.
- Robot ou kit compatible.
- Alternative si le lecteur n'a pas encore le matériel.

Exemples :

- mBot Makeblock pour un tutoriel mBlock.
- Câble USB de données pour un problème de connexion.
- Piles rechargeables pour une activité robotique.
- Kit Arduino pour un tutoriel capteurs.

### 2.7 Checklist article simple

Avant publication :

- [ ] H1 unique via `headline`.
- [ ] Introduction claire.
- [ ] Intention utilisateur traitée sans détour.
- [ ] Étapes ou explications concrètes.
- [ ] Liens internes vers au moins 2 à 4 pages utiles.
- [ ] FAQ + `faqSchema` si questions fréquentes.
- [ ] Liens Amazon seulement s'ils aident réellement.
- [ ] Pas de second H1 dans le Markdown.
- [ ] Build Astro validé.

---

## 3. Article pilier

Un article pilier est une page de référence destinée à ranker sur des mots-clés concurrentiels, capter du trafic long tail et soutenir le maillage interne du site.

### 3.1 Quand utiliser ce format

Utiliser un article pilier pour :

- Un guide d'achat.
- Un comparatif de robots éducatifs.
- Un guide budget.
- Un guide par âge.
- Une page de référence sur mBot, mBlock, Arduino ou robot éducatif.
- Une requête transactionnelle forte : "meilleur", "choisir", "comparatif", "quel robot acheter".

### 3.2 Objectifs d'un article pilier

Un article pilier doit :

- Ranker sur les mots-clés principaux et transactionnels.
- Couvrir les variantes long tail.
- Générer des clics affiliés.
- Donner une vraie aide à la décision.
- Créer une page de référence Google.
- Envoyer du trafic vers les tutoriels, projets et guides complémentaires.

### 3.3 H1 obligatoire

Le H1 doit inclure :

- Le sujet principal : `robot éducatif`, `Arduino`, `kit`, `mBot`, etc.
- Une intention transactionnelle : `meilleur`, `choisir`, `comparatif`, `guide d'achat`.
- Si pertinent : année, budget ou profil.

Exemples :

- `Meilleur robot éducatif Arduino : quel kit choisir pour apprendre la programmation ?`
- `Quel robot éducatif choisir en 2026 ?`
- `Meilleur robot programmable enfant 2026 : comparatif et guide d'achat`

### 3.4 Introduction SEO

L'introduction doit faire 150 à 200 mots environ.

Elle doit contenir :

- Le problème utilisateur.
- La promesse claire de l'article.
- Les mots-clés principaux.
- Le contexte : enfant, école, programmation, robotique, budget ou projet.
- Une phrase qui rassure : méthode, critères, comparaison, usages réels.

Pour un article pilier robotique / Arduino, intégrer naturellement :

- `robot éducatif`
- `kit Arduino`
- `apprendre programmation`
- `robot programmable`
- `mBot` ou `mBlock` si pertinent.

### 3.5 Structure obligatoire d'un pilier comparatif / affiliation

Structure minimale :

1. Introduction SEO.
2. Sommaire avec ancres.
3. Réponse rapide ou résumé décisionnel.
4. Comparatif des meilleurs produits.
5. Comment choisir.
6. Exemples d'utilisation.
7. Recommandations selon profil.
8. FAQ SEO.
9. Maillage interne.
10. Liens Amazon utiles ou CTA intégrés.

### 3.6 Section comparatif produits

Pour chaque produit, inclure :

- Description.
- Avantages.
- Inconvénients.
- Profil utilisateur.
- CTA `Voir le produit`.

Pour les guides d'achat, ajouter si possible :

- Prix indicatif ou fourchette.
- Âge recommandé.
- Niveau.
- Type de programmation.
- Type de projets possibles.
- Limites réelles du produit.

Ajouter `productItemListSchema` dans le frontmatter si plusieurs produits sont comparés.

### 3.7 Section "Comment choisir"

Cette section doit aider à décider sans pousser un seul produit artificiellement.

Critères obligatoires :

- Âge.
- Niveau.
- Budget.
- Objectif : école, loisir, projet personnel, cadeau, atelier.

Critères recommandés :

- Logiciel utilisé : mBlock, Scratch, Arduino IDE, Python.
- Complexité du montage.
- Évolutivité.
- Disponibilité des tutoriels.
- Communauté.
- Robustesse.
- Besoin d'un adulte accompagnant.

### 3.8 Section "Exemples d'utilisation"

Donner des cas concrets, pas seulement des promesses.

Exemples :

- Robot éviteur d'obstacles.
- Suiveur de ligne.
- Parking automatique miniature.
- Feu tricolore intelligent.
- Défi de classe.
- Atelier capteur ultrason.
- Projet mBot avec mBlock.
- Passage Arduino blocs vers code.

Chaque exemple doit montrer ce que l'utilisateur apprend : conditions, boucles, capteurs, moteurs, fonctions, logique de test.

### 3.9 Recommandations selon profil

Minimum :

- Enfant.
- Débutant.
- Enseignant.

Selon le sujet, ajouter :

- Parent.
- Collégien / lycéen.
- Club robotique.
- Ado maker.
- École primaire / collège.

La recommandation doit être directe :

- "Pour un enfant qui débute, choisir plutôt..."
- "Pour un débutant Arduino, choisir plutôt..."
- "Pour un enseignant, privilégier..."

### 3.10 FAQ SEO

Un article pilier doit avoir au minimum 5 questions.

Questions typiques :

- Quel est le meilleur robot éducatif pour débuter ?
- Quel kit Arduino choisir ?
- À quel âge commencer Arduino ?
- Robot éducatif ou kit Arduino ?
- Quel budget prévoir ?
- Peut-on apprendre la programmation avec un robot ?
- mBot ou Arduino ?

Règles :

- FAQ visible dans l'article.
- `faqSchema` aligné dans le frontmatter.
- Réponses courtes et utiles.
- Éviter les réponses vagues.

### 3.11 Maillage interne pilier

Le pilier doit redistribuer vers :

- Tutoriels pratiques.
- Projets Arduino.
- Guides mBot.
- Guides d'achat.
- Articles de dépannage ou installation.
- Hubs de programmation.

Exemples de liens selon sujet :

- Arduino : `/programmation/arduino-c/`, `/c-arduino-conditions-capteurs-actionneurs/`, `/c-arduino-boucles-timing/`, `/c-arduino-fonctions-modularite-bonnes-pratiques/`.
- mBot / mBlock : `/premier-pas-avec-mblock-5/`, `/installer-les-blocs-du-mbot/`, `/mon-premier-programme-mbot/`, `/10-projets-mbot-gratuits-classe-faciles/`.
- Achat robot : `/quel-robot-educatif-choisir-2026/`, `/meilleur-robot-programmable-enfant-2026/`, `/quel-robot-educatif-autour-de-200-euros-guide-2026/`, `/mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants/`.

Dans le contenu public, préférer un titre naturel :

- `Aller plus loin`
- `Continuer après l'achat`
- `Tutoriels et projets pour progresser`

Éviter si possible un titre visible du type `Maillage interne`, sauf si l'utilisateur le demande explicitement pour un brief SEO.

### 3.12 Longueur cible

Repères :

- Article pilier standard : 2 000 à 3 000 mots.
- Article pilier achat / comparatif : 3 000 à 4 500 mots si plusieurs produits.
- Article pilier très concurrentiel : 4 500 mots et plus seulement si la valeur reste réelle.

La longueur doit venir :

- Des fiches produit.
- Des critères de choix.
- Des cas d'usage.
- Des recommandations.
- De la FAQ.
- Du maillage utile.

### 3.13 Affiliation dans un article pilier

Un article pilier monétisable doit avoir plusieurs opportunités de clic :

- CTA par produit : `Voir le produit`.
- Liste de liens Amazon utiles.
- Liens contextuels dans les paragraphes si naturel.
- Mention partenaire Amazon.
- `productItemListSchema` si comparatif.

Règles de conversion :

- Placer un premier CTA tôt si l'intention est transactionnelle.
- Répéter les CTA après chaque fiche produit.
- Ne pas masquer les inconvénients : ils renforcent la confiance.
- Recommander par profil plutôt qu'un classement artificiel unique.
- Préférer des CTA clairs : `Voir le produit`, `Voir le prix`, `Comparer les versions`.

### 3.14 Checklist article pilier

Avant publication :

- [ ] H1 unique avec mot-clé principal + intention `choisir` ou `meilleur`.
- [ ] Intro SEO 150 à 200 mots.
- [ ] Sommaire avec ancres stables.
- [ ] Résumé ou réponse rapide en haut.
- [ ] Section comparatif complète.
- [ ] Chaque produit a description, avantages, inconvénients, profil, CTA.
- [ ] Section comment choisir : âge, niveau, budget, objectif.
- [ ] Section exemples d'utilisation.
- [ ] Section recommandations par profil.
- [ ] FAQ visible de 5 questions minimum.
- [ ] `faqSchema` aligné avec la FAQ visible.
- [ ] `productItemListSchema` si comparatif produits.
- [ ] Liens Amazon avec `tag=manuso06-21`.
- [ ] Mention partenaire Amazon.
- [ ] Maillage interne vers tutoriels, projets et guides.
- [ ] Mots-clés intégrés naturellement.
- [ ] Pas de second H1 dans le Markdown.
- [ ] Build Astro validé.

---

## 4. Validation technique avant livraison

Après création ou modification substantielle :

1. Vérifier les lints sur les fichiers modifiés.
2. Compter les mots si une longueur cible est demandée.
3. Lancer `npm run build`.
4. Vérifier que la route apparaît dans la sortie de build.
5. Vérifier `git status --short` pour connaître les fichiers modifiés.

Commandes utiles :

```powershell
(Get-Content "src/content/blog/slug.md" -Raw | Measure-Object -Word).Words
npm run build
git status --short
```

---

## 5. Résumé décisionnel

| Type d'article | Objectif | Longueur cible | FAQ | Affiliation | Maillage |
|---|---|---:|---|---|---|
| Article simple | Répondre vite à une intention précise | 800-1 800 mots | 0-5 questions | Contextuelle | 2-4 liens utiles |
| Tutoriel important | Guider étape par étape + capter long tail | 1 200-2 000 mots | 3-8 questions | Accessoires / matériel | 4-6 liens |
| Article pilier | Référence SEO + achat + trafic long tail | 2 000+ mots | 5+ questions | Forte, CTA par produit | 6+ liens structurants |

