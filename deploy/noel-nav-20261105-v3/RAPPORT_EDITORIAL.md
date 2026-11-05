# Rapport éditorial — passe 3 (réécriture humaine)

Date : 2026-11-05 (UTC)  
Méthode : sections rédigées à la main (`sections/*.html`), assemblage `apply_v3.py` **sans** conversion automatique `ul` → `p`.  
Sticky / nav : identiques à la passe 2 technique (CSS `data-noel-nav-fix="1"` + JS `--guide-sticky-top`).

## Contrôles globaux

| Contrôle | Résultat |
|----------|----------|
| `/go/` | 23 URLs, **92** occurrences — multiset identique à live v1 |
| Header `data-astro-cid` | `lv5sydnc` |
| TOC | 8 H2, FAQ ×1 |
| Patterns rejetés audit | plus de `Symptôme :` / `Critères essentiels :` / `Top choix 50-100 €` en prose (seul « Top choix » reste dans une cellule de tableau conservée) |
| Tests viewport | `viewport-test-results.json` — OK |

SHA256 : `5341b50ac99475065afe43cfff6d2a165347f17b87dee3760689f008bffd8d72`

---

## H2 — Pourquoi offrir un robot à Noël ?

**Statut :** inchangé (passe 1, déjà validé comme prose fluide).

**Relecture :** relu, aucune modification dans v3.

---

## H2 — Nos recommandations par âge

**Avant (passe 2 rejetée — concaténation) :**  
« Critères essentiels : Pas d'écran : boutons physiques sur le robot. Feedback immédiat : le robot réagit tout de suite. Solide : … Autonomie : … »

**Après (extrait v3) :**  
« À cet âge, privilégiez la manipulation physique et les sessions courtes (15-20 min max). Le bon robot n'a pas d'écran : tout se passe avec des boutons physiques sur le robot, qui réagit tout de suite quand l'enfant appuie. Il doit aussi être assez solide… »

**Relecture :** section relue en entier ; cartes produits et tableau mBot/mBot2 conservés ; liens `/go/` intégrés dans des phrases.

---

## H2 — Par budget

**Avant :**  
« Top choix 50-100 € : … Pourquoi ce budget est optimal : Qualité suffisante : … Évolutivité réelle : … »

**Après (extrait v3) :**  
« C'est la zone où l'on trouve le meilleur rapport qualité / évolutivité. Trois robots se détachent. Le Makeblock mBot est une valeur sûre pour les 8-12 ans… Ce budget est le bon compromis parce qu'il offre une qualité suffisante… »

**Relecture :** paliers h3 conservés ; listes `<ol>` « Top choix » supprimées au profit de prose ; tableaux comparatifs inchangés.

---

## H2 — FAQ : questions fréquentes

**Avant :** réponses en cascades « Ça dépend du robot : Sans écran : … Scratch : … » + listes PC/tablette.

**Après (extrait v3 — ordinateur/tablette) :** prose par question ; les faits (4 ans Bee-Bot, 8 ans Scratch, PC pour Python) restent dans des paragraphes continus.

**Relecture :** 11 h3 FAQ relus ; checklist dépannage robot en prose (plus de `<ol>` numérotée).

---

## H2 — Erreurs à éviter

**Avant :** 8 × mini-fiche « Symptôme / Exemple / Pourquoi ça rate / Solution ».

**Après (extrait v3 — 1ère erreur) :**  
« C'est l'erreur la plus courante : le robot finit au placard après deux jours. Offrir un Raspberry Pi à un enfant de 8 ans qui n'a jamais codé le plonge dans une frustration immédiate… »

**Relecture :** 8 h3 sans numéro « Erreur N » ; un paragraphe (parfois deux) par piège ; mêmes conseils factuels.

---

## H2 — Conseils pour commander

**Avant :** listes Amazon + `<ol>` plan B découpé.

**Après :** paragraphes sur la date de livraison et trois idées de plan B (carte cadeau, bon imprimé, livre + robot en route) en prose.

**Relecture :** relu ; ton direct, pas de labels « Plan B : » en tête de liste.

---

## H2 — Conseils d'achat essentiels

**Avant :** listes piles, logiciels, comparatif tablette/PC en puces.

**Après :** paragraphes sur piles rechargeables (lien `/go/` conservé), logiciels à installer avant le 25, tableau comparatif tablette/PC **conservé**, transition Scratch→Python en prose.

**Relecture :** relu ; tableaux utiles laissés ; cascades « Semaine 1 / Semaine 2 » converties en phrases pour l'engagement long terme.

---

## H2 — Récapitulatif : nos recommandations par profil

**Avant :** six lignes « Profil → produit » + `<ol>` check-list avec ✅.

**Après :**  
« Pour un enfant de 8 ans qui découvre la robotique, nous conseillons un mBot avec des piles rechargeables… » puis un paragraphe unique pour les rappels avant commande.

**Relecture :** relu ; liste « Guides complémentaires » conservée (navigation interne).

---

## Non-objectifs respectés

- Aucun script de fusion mécanique de listes dans la chaîne v3 (`apply_v3.py` = nav + collage sections).
- Pas de déploiement.
