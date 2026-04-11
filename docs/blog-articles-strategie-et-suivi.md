# Stratégie articles blog — playbook et suivi

Document de référence pour aligner **tous** les articles du blog sur la même stratégie éditoriale, SEO et UX que le guide budget **500–1000 €** (article pilote). **Mettre à jour ce fichier** : passer `[ ]` en `[x]` dans la section 5 lorsqu’un article est traité.

- **Article pilote** : `src/content/blog/quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md`
- **Schéma** : `src/content.config.ts` (`headline`, `faqSchema`, …)
- **Layout** : `src/layouts/BlogPost.astro` (H1 = `headline ?? title`, styles `.article-toc`, `.article-cta`, JSON-LD FAQ)

---

## 1. Règles à appliquer

### 1.1 Frontmatter

| Champ | Rôle |
|--------|------|
| `title` | Balise `<title>` et Open Graph — orienté **CTR** et mots-clés. |
| `headline` | **H1** du hero si différent du `title` (ton plus éditorial). Si omis, le H1 reprend `title`. |
| `description` | Meta : **une phrase claire**, bénéfice lecteur. |
| `faqSchema` | `{ question, answer }[]` pour JSON-LD **FAQPage**. Ne pas mettre de `<script>` dans le `.md`. Réponses alignées sur la FAQ visible. |
| `relatedLinks` | Liens vers hubs (budgets, Python, comparatifs). |

### 1.2 Guides longs / piliers (**P1**)

- Sommaire `div.article-toc` après l’intro, liens vers chaque **H2** (ids **stables**).
- Titres **numérotés** souhaités pour les gros guides (1., 2., 2.1., …), cohérents avec le sommaire.
- **Réponse immédiate (« réponse absolue »)** : dès le haut du corps, un court bloc `<p><strong>…</strong><br>…</p>` qui nomme **sans détour** le ou les meilleurs choix (ex. mBot Ranger / Thymio selon profil), lisible en extrait ou par une IA — sans promesse « un seul modèle miracle » si le guide assume le nuancé.
- **Ouverture / contexte** : enchaîner avec **résumé** de la problématique budget et **EEAT** explicite (ex. *« Ce guide est basé sur l’analyse de robots utilisés en milieu scolaire et des retours d’utilisateurs »*, croisé avec prix observés / période) — rédigé pour un **humain**, sans jargon « optimisé pour Google » dans le HTML public.
- **Synthèses** : **éviter** la répétition mécanique de **« À retenir : »** (ou tout gadget du même genre) — sonne **IA** et lasse. Intégrer les idées dans le **fil du texte**, ou une **seule** conclusion locale sans formule fixe si indispensable. **Interdit** dans le corps lecteur : « Maillage interne », « Pour prolonger la lecture », « levier SEO », etc. Les liens s’inscrivent dans des **phrases naturelles**.
- **Tableau « choix rapide »** (2 colonnes : profil × robot conseillé) **avant** le grand **comparatif technique** (robot, âge, langage, niveau, prix, points forts). Un second tableau décisionnel 3 colonnes (*pourquoi*) est **optionnel** si le choix rapide + le texte suffisent — **pas** de légendes du type « pour le SEO / la conversion » dans le HTML lisible.
- **H2 « Notre recommandation »** (ou équivalent) sur les gros comparatifs budget : trois lignes nettes du type *Meilleur robot global / pédagogique / avancé* (`<p><strong>…</strong> …</p>`).
- Bloc **critères express / expert** (liste courte : langages, capteurs, évolutivité, communauté).
- **FAQ complète** : inclure en **première** position visible (et dans `faqSchema` dans le même ordre) une question du type **« Quel est le meilleur robot éducatif ? »** avec réponse nuancée (profils / budget), puis les questions classiques (**Python**, **collège**, **STEM**, mBot vs Thymio, âge, robot vs kit, budget, utilité pour coder…) — **minimum 5** entrées, idéalement **9–10+** sur les piliers ; **chaque** entrée `faqSchema` doit avoir un **paragraphe visible** équivalent (même ordre et même sens).
- **Mots-clés sémantiques** naturels : *robot programmable*, *robot éducatif enfant*, *robot STEM*, *apprendre la programmation*.
- **Liens internes** : **URLs réelles** du site ; libellés naturels (ex. *robots éducatifs pas chers*, *robots avancés*, *apprendre Python avec un robot*) — **ne pas** inventer d’URL « slug idéal » si la page n’existe pas ; phrases du type « En prolongement : … » — **pas** de sous-titre « maillage » ni de commentaire méta sur l’indexation dans le corps public.
- **CTA** : `div.article-cta-row` + classes `article-cta`, `article-cta--primary` / `--secondary`.
- Enrichissement **sans** sur-optimisation.
- **Micro-contrôle SEO (piliers)** après rédaction : **un seul `<h1>`** (dans ce projet : `BlogPost.astro` utilise `headline ?? title` pour le H1 du hero — pas de second H1 dans le `.md`) ; **mots-clés utiles dans les `<h2>`** sans bourrage ; **attributs `alt`** des images descriptifs et cohérents avec la requête / le budget ; **URL canonique** gérée par `BaseHead.astro` (`link rel="canonical"`).

### 1.3 Articles **P2** (fiches, tutoriels mBlock, etc.)

- Meta optimisée ; sommaire si **plus de 5 sections** ou texte long.
- **Tutoriels très lus (ex. installation mBlock)** : comme pour les piliers — **réponse immédiate** en tête, court **tableau 2 colonnes** (situation × conseil), bloc **recommandation** (3 lignes nettes si pertinent), **EEAT** (installations réelles, doc éditeur, retours utilisateurs), **CTAs** + **liens internes** dans des phrases naturelles ; `faqSchema` aligné sur une **FAQ visible** (ordre et sens des 8–12 premières questions si le reste est « variantes / recherches »).
- `faqSchema` si Q/R présentes.
- **Ancres** : éviter les `##` avec **emoji seul en tête** (génère parfois des `id` invalides type `"-comment-…"`). Préférer `<h2 id="slug">` explicite ou titre sans emoji en tête.

### 1.4 Articles **P3** (Python, activités, séries)

- Meta pertinente ; pas de `**…**` dans du HTML brut (`<p>`, `<div>`).
- Sommaire optionnel si article très long ; liens de série cohérents.

---

## 2. Pièges techniques

1. Le Markdown **n’est pas** interprété **à l’intérieur** des balises HTML brutes : utiliser `<strong>`.
2. Le JSON-LD FAQ passe **uniquement** par `faqSchema` (voir `BlogPost.astro`).
3. Vérifier les **ids** générés sur les pages existantes (inspecter `dist/.../index.html`) après changement de titres.

---

## 3. Snippets

### Sommaire

Ordre type pour un **pilier comparatif** (voir `quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md`) : **réponse absolue** en tête + résumé + **EEAT** → sommaire → **tableau choix rapide (2 col.)** → **comparatif technique** → CTA + liens contextuels → **H2 Notre recommandation** (3 lignes nettes) → critères express → corps détaillé → **FAQ** (dont *Quel est le meilleur robot éducatif ?* en tête) alignée `faqSchema` — **sans** commentaires méta visibles (« pour le SEO », etc.).

```html
<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#section-1">1. Titre section</a></li>
<li><a href="#section-2">2. Autre section</a></li>
</ul>
</div>
```

### CTAs

```html
<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/chemin/">Libellé principal</a>
<a class="article-cta article-cta--secondary" href="/chemin/">Secondaire</a>
</div>
```

### faqSchema (YAML)

```yaml
faqSchema:
  - question: "Question telle qu’affichée ?"
    answer: "Réponse courte, identique au sens du paragraphe visible."
```

---

## 4. Priorités (rappel)

- **P1** : guides budget (`quel-robot-educatif-*`), hub 2026, achat par âge, Raspberry « achat », idées cadeaux, sans écran, pas cher.
- **P2** : comparatifs mBot, fiches produit, install mBlock, Scratch école, CyberPi, etc.
- **P3** : cours Python, séries jeux, activités mBot, Arduino C.

Les **P1/P2/P3** de la liste sont indicatifs : les ajuster ici si un article change de rôle.

---

## 5. Suivi — fichiers dans `src/content/blog/`

Légende : `[ ]` à faire · `[x]` traité (pilote P1 ou critères du niveau atteints).

Liste des fichiers à jour (stdout, à fusionner à la main pour ne pas perdre les `[x]`) : `node scripts/gen-blog-strategie-checklist.mjs`.

**Outil (avr. 2026)** : `npm run blog:add-headlines` ajoute un `headline` manquant à partir du `title` (voir `scripts/blog-add-missing-headlines.mjs`).

- [x] accessoires-mbot-par-ou-commencer.md — **P2** — §1.3 : réponse imm., TOC, `faqSchema`, FAQ visible, CTAs ; meta + maillage
- [x] activite-mbot-detecteur-dintrusion.md — **P3** — Réponse immédiate + TOC + CTAs + `relatedLinks` + `faqSchema` + alts + `headline`
- [x] activite-mbot-faire-clignoter-les-leds.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] activite-mbot-faire-defiler-un-texte.md — **P3** — Réponse immédiate + TOC + H2 `id` + maillage + CTAs + `headline` + alts
- [x] activite-mbot-mesurer-des-distances.md — **P3** — Réponse immédiate + TOC + tableau objectifs + `faqSchema` + FAQ visible + CTAs + `headline`
- [x] activite-scratch-le-carre.md — **P3** — Meta affinée + `headline` + `relatedLinks` + `amazonPreset` + TOC + `faqSchema` + CTAs
- [x] c-arduino-boucles-timing.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] c-arduino-conditions-capteurs-actionneurs.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] c-arduino-environnement-structure-sketch.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] c-arduino-fonctions-modularite-bonnes-pratiques.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] c-arduino-types-variables.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [ ] decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [x] idees-cadeaux-robotique-noel-rentree-anniversaire.md — **P1** — Aligner réf. §1.2 (headline, meta, sommaire num., tableau HTML si comparatif, résumés, FAQ+faqSchema, CTAs, maillage, h2 id explicites, pas emoji seul en tête de titre)
- [x] idees-projets-mbot-rapides-une-heure.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] installer-les-blocs-du-mbot.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage — §1.3 : réponse imm., TOC, faqSchema, CTA (avr. 2026)
- [x] installer-mblock-5-sous-windows-10.md — **P2** — Meta + description ; sommaire ; FAQ + `faqSchema` (12 Q alignées) ; réponse immédiate + tableau « cas → méthode » + recommandation ; CTAs ; maillage ; `headline` + `relatedLinks` + `amazonPreset` ; pas de `##` hors pied de page Amazon
- [ ] le-robot-tale-bot-de-chez-matatalab-questions-reponses.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] logiciel-mblock-makeblock-mbot-quel-choisir.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] matatalab-une-entreprise-innovante.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [x] mblock-bluetooth-erreurs-frequentes-depannage.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage — §1.3 : réponse imm., TOC, faqSchema, CTA (avr. 2026)
- [ ] mbot-avis-faut-il-acheter-pour-un-enfant.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] mbot-mon-premier-robot-educatif.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] mbot-vs-codey-rocky-comparatif.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] mbot-vs-lego-robot-lequel-est-le-meilleur.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] mbot2-vs-cyberpi-comparatif.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [x] meilleur-robot-programmable-enfant-2026.md — **P1** — Aligner réf. §1.2
- [ ] mise-en-route-raspberry-pi-3-modele-b.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [x] mon-premier-programme-mbot.md — **P3** — Réponse immédiate + TOC + `faqSchema` + FAQ + `relatedLinks` + `amazonPreset` + CTAs + `headline`
- [x] premier-pas-avec-mblock-5.md — **P2** — Réponse immédiate + TOC + H2 `id` + `faqSchema` + FAQ numérotée + `amazonPreset` + CTAs + `headline`
- [x] programmation-enfant-a-quel-age-commencer.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage — §1.3 : réponse imm., TOC, faqSchema, CTA (avr. 2026)
- [x] projet-av-journal-1-architecture.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-av-journal-2-parse-generateurs.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-av-journal-3-decorateurs.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-av-journal-4-asyncio-batch.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-av-journal-5-typing-mypy.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-av-journal-6-package-pyproject.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-inter-agenda-1-cahier-des-charges.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-inter-agenda-2-donnees-pathlib.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-inter-agenda-3-modele-poo.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-inter-agenda-4-tests-pytest.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-inter-agenda-5-cli-argparse.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] projet-inter-agenda-6-livraison-extensions.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-av-asyncio.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-av-context-managers.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-av-decorateurs-functools.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-av-generateurs-iterateurs.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-av-packaging-pyproject.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-av-typing-avance.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-bataille-navale-1-cahier-des-charges.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-bataille-navale-2-grille-et-affichage.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-bataille-navale-3-placement-bateaux.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-bataille-navale-4-tirs-et-marques.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-bataille-navale-5-coule-et-victoire.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-bataille-navale-6-jeu-complet.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-boucles-for-while.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-carnet-todo-1-cahier-json.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-carnet-todo-2-lire-ecrire-json.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-carnet-todo-3-modele-donnees.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-carnet-todo-4-menu-cli.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-carnet-todo-5-persistance.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-carnet-todo-6-projet-complet.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-conditions-if-else.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-environnement-developpement.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-erreurs-debogage.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-fichiers-texte.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-fonctions.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-inter-modules-imports.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-inter-pathlib.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-inter-poo-classes.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-inter-regex-re.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-inter-tests-qualite.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-inter-venv-pip.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-listes-et-chaines.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-mini-jeu-terminal.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-pendu-1-cahier-mot-masque.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-pendu-2-mots-depuis-fichier.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-pendu-3-affichage-lettres.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-pendu-4-boucle-partie.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-pendu-5-victoire-defaite.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-pendu-6-projet-complet.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-puissance-4-1-cahier-grille.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-puissance-4-2-affichage-gravite.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-puissance-4-3-coup-alternance.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-puissance-4-4-quatre-alignes.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-puissance-4-5-match-nul.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-puissance-4-6-jeu-complet.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-types-et-saisie.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] python-variables-affichage.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] quel-robot-acheter-enfant-10-ans-guide-achat.md — **P1** — Aligner réf. §1.2
- [x] quel-robot-acheter-enfant-12-ans-guide-achat.md — **P1** — Aligner réf. §1.2
- [x] quel-robot-acheter-enfant-5-ans-guide-achat.md — **P1** — Aligner réf. §1.2
- [x] quel-robot-acheter-enfant-8-ans-guide-achat.md — **P1** — Aligner réf. §1.2
- [x] quel-robot-educatif-autour-de-200-euros-guide-2026.md — **P1** — Aligner réf. §1.2 (bloc méta « performer » retiré)
- [x] quel-robot-educatif-choisir-2026.md — **P1** — Aligner réf. §1.2
- [x] quel-robot-educatif-entre-200-et-500-euros-guide-2026.md — **P1** — Aligner réf. §1.2
- [x] quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md — **P1** — Pilote : ouverture Q/R, 2 tableaux, H2 meilleur choix, EEAT, liens en phrases naturelles, FAQ (faqSchema 9 Q/R), **sans** rabâchage « À retenir » ni libellés méta type « maillage interne »
- [x] quel-robot-educatif-plus-de-1000-euros-guide-expert-2026.md — **P1** — Aligner réf. §1.2
- [x] raspberry-pi-3-vs-4-vs-5-comparatif-2026.md — **P1** — Aligner réf. §1.2
- [x] raspberry-pi-4-quelle-version-memoire-acheter.md — **P1** — Aligner réf. §1.2
- [x] raspberry-pi-5-quelle-version-memoire-acheter.md — **P1** — Aligner réf. §1.2
- [x] raspberry-pi-ou-kit-robot-ado-guide.md — **P1** — Aligner réf. §1.2
- [ ] robot-educatif-codey-rocky-makeblock.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [ ] robot-educatif-eilik-compagnon.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [x] robot-educatif-pas-cher-compromis.md — **P1** — Réponse immédiate + EEAT + TOC + tableau + recommandation + `faqSchema` + maillage budgets + `headline`
- [x] robot-educatif-sans-ecran-guide.md — **P1** — Aligner réf. §1.2
- [x] scratch-creer-un-jeu-video-premiere-partie.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [ ] scratch-ecole-maison-par-ou-commencer.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage
- [x] serie-capteur-ultrason-mbot-1-mesurer-distance.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] serie-capteur-ultrason-mbot-2-radar-recul-paliers.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle.md — **P3** — Meta ; pas de ** dans HTML ; liens hub/série cohérents ; sommaire optionnel si très long — `headline` (`npm run blog:add-headlines`, avr. 2026)
- [x] sinscrire-sur-mblock.md — **P2** — Meta + description ; sommaire si >5 sections ; FAQ+schema si Q/R ; CTAs/contextuels ; vérifier titres (id stables) ; maillage — §1.3 : réponse imm., TOC, faqSchema, CTA (avr. 2026)

---

## 6. Rédaction des prochains articles

Avant publication, ouvrir ce fichier et ajouter une ligne dans la section 5 (ou dupliquer le bloc checklist pour une nouvelle entrée). En alternative, lancer :

`node scripts/gen-blog-strategie-checklist.mjs`

pour réimprimer la liste brute des fichiers présents dans `src/content/blog/` (voir script : à utiliser comme **aide**, sans écraser ce document).
