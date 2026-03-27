---
title: "Guide mBlock 5 intermédiaire : capteurs, variables et logique"
description: "Utilise les capteurs du mBot et du mBot2, les conditions, les boucles et les variables dans mBlock 5. Exemples de comportements, niveau intermédiaire."
pubDate: "2026-03-27"
updatedDate: "2026-03-27"
heroImage: "../../assets/mbot2/mbot2-hero.jpg"
amazonPreset: mbot
relatedLinks:
  - title: "Guide mBlock 5 pour débutants : interface, blocs et premier script"
    href: "/guide-mblock-5-debutant/"
  - title: "Guide mBlock 5 avancé : Upload, Arduino C et bonnes pratiques"
    href: "/guide-mblock-5-avance/"
  - title: "Mon premier programme sur mBot avec mBlock 5"
    href: "/mon-premier-programme-mbot/"
  - title: "Les modes de programmation dans mBlock 5 : blocs, Python et Arduino"
    href: "/mblock-5-programmation-blocs-python-arduino/"
---

Tu maîtrises l’interface et un premier script en **Live** (voir le [guide débutant](/guide-mblock-5-debutant/)). Ce guide **intermédiaire** te fait passer à des comportements **réactifs** : le robot **décide** en fonction des **capteurs** et de **valeurs mémorisées** (**variables**).

> Cet article contient des liens affiliés Amazon. En tant que Partenaire Amazon, je peux percevoir une commission sur les achats éligibles, sans coût supplémentaire pour vous.

## 1. Lire un capteur « pour de vrai »

Les robots Makeblock exposent des blocs du type **lecture ultrason**, **ligne**, **luminosité**, etc., selon le modèle (**mBot** classique vs **mBot2**).

**Idée clé** : un capteur renvoie une **valeur** (nombre ou état) que tu compares ou affiches.

Exemples de logique :

- **Si** la distance est **inférieure** à un seuil → **reculer** ou **tourner**.  
- **Tant que** la sonde voit la ligne → **corriger** légèrement la trajectoire.  
- **Répéter** un test en boucle pour un comportement continu (suivi de ligne simple, évitement basique).

Les noms de blocs varient selon les versions ; regroupe-les mentalement en **entré capteur** → **décision** → **action moteur / LED**.

## 2. Conditions et boucles

Deux structures incontournables :

- **`si … alors`** (éventuellement `sinon`) : une **décision ponctuelle**.  
- **`répéter indéfiniment`** ou **`répéter jusqu’à`** : pour un **comportement** qui dure dans le temps.

**Erreur classique** : oublier un petit **`attendre`** dans une boucle rapide — le programme « boucle » trop vite et le robot semble nerveux. Teste avec des pauses courtes, puis raccourcis-les quand le comportement est stable.

## 3. Variables : mémoriser et calculer

Une **variable** sert à **stocker** un nombre ou du texte : compteur de tours, **seuil** de distance ajusté, **vitesse max**, etc.

**Cas d’usage** :

- compter le nombre d’obstacles détectés ;  
- lisser une mesure (moyenne simple sur quelques lectures — approche manuelle en intermédiaire) ;  
- factoriser une **vitesse** utilisée à plusieurs endroits pour la modifier en un seul bloc « mettre vitesse à … ».

Les variables se retrouvent souvent dans la catégorie **Données** ou équivalent dans ta langue d’interface.

## 4. Structurer un programme un peu long

Quand le script grossit :

- **commente** mentalement par **sections** (déplacement / détection / signaux lumineux) ;  
- extrais des **sous-routines** si ton éditeur le permet (blocs personnalisés / fonctions — selon version et appareil) ;  
- teste **une brique à la fois** en Live avant de tout **Uploader**.

Le guide [modes de programmation](/mblock-5-programmation-blocs-python-arduino/) rappelle la différence **Live / Upload** et l’intérêt de **téléverser** une fois la logique validée.

## 5. Exemples de mini-projets (niveau intermédiaire)

1. **Évitement simple** : avancer tant que la distance reste grande ; sinon pivoter aléatoirement ou à angle fixe.  
2. **Feu tricolore factice** : enchaîner LED **vert / orange / rouge** avec temporisations.  
3. **Alarme de proximité** : si la distance passe **sous le seuil** → **buzzer** + clignotement LED.  
4. **Compteur** : à chaque détection, **incrémente** une variable et affiche une **variation lumineuse** selon la valeur.

Adapte les capteurs aux **capacités réelles** de ton kit (mBot vs mBot2).

## 6. Aller plus loin

- [Guide avancé mBlock 5](/guide-mblock-5-avance/) — Arduino C, firmware, optimisation.  
- [mBot2 : présentation](/mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique/) — capteurs et piste **Python**.  
- PDF Makeblock (débutant, illustrations) : toujours utile en parallèle — [mBlock Beginner’s Guide](https://res-us.makeblock.com/doc/course/mBlock/mBlock_Beginner_s_Guide.pdf).

## Liens Amazon (affiliation)

- <a href="https://www.amazon.fr/s?k=Makeblock+mBot+capteur&tag=manuso06-21" target="_blank" rel="noopener sponsored">Accessoires et capteurs mBot</a>  
- <a href="https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21" target="_blank" rel="noopener sponsored">mBot2 sur Amazon</a>

## Conclusion

Les **capteurs**, les **boucles** et les **variables** transforment un robot « scripté » en robot **réactif**. Une fois à l’aise ici, attaque le [guide avancé](/guide-mblock-5-avance/) pour comprendre ce que mBlock génère sous le capot et fiabiliser tes **uploads**.
