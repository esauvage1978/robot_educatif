---
title: "Apprendre Python débutant (1/10) : installer Python, environnement et premier programme"
headline: "Apprendre Python (1/10) : Installer et Créer ton Premier Programme"
description: "Python débutant : installer Python gratuitement, choisir un environnement simple (IDLE) ou moderne (VS Code), premier programme en 10 minutes. Série pour apprendre Python pas à pas."
pubDate: "2026-03-28"
updatedDate: "2026-04-18"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
series: Python
seriesOrder: 1
tags: ["Python", "Programmation"]
relatedLinks:
  - title: "Vue d’ensemble du parcours Python (10 leçons)"
    href: "/programmation/python"
  - title: "Leçon 2 — variables et affichage (print)"
    href: "/python-variables-affichage/"
categories:
  - "Python"
  - "Programmation"
  - "Tutoriel"
  - "Débutant"
faqSchema:
  - question: "Comment installer Python sur Windows ?"
    answer: "Télécharge l’installateur sur python.org (rubrique Windows), lance-le et coche « Add python.exe to PATH » avant d’installer. Vérifie ensuite avec py --version ou python --version dans un terminal."
  - question: "C’est quoi un environnement Python ?"
    answer: "C’est l’ensemble formé par l’interpréteur Python (qui exécute ton code) et l’outil où tu écris les fichiers : éditeur simple comme IDLE, ou VS Code avec l’extension Python pour un confort moderne."
  - question: "Python débutant : par où commencer ?"
    answer: "Installer Python 3, ouvrir un fichier .py, écrire une ligne avec print(), l’enregistrer et le lancer. Ensuite enchaîner avec variables et affichage dans la leçon 2 de la série."
  - question: "IDLE ou Visual Studio Code pour Python ?"
    answer: "IDLE est inclus avec Python, minimal et parfait pour démarrer. VS Code est plus riche (coloration, terminal intégré, extensions) et très utilisé en formation — choisis selon ton confort."
---

Imagine : **tu apprends à parler à un ordinateur** — pas avec des boutons magiques, avec des **phrases** qu’il comprend. Ces phrases, en programmation, on les écrit dans un **langage**. Ici, ce langage s’appelle **Python**.

**Promesse de cette première leçon (environ 10 minutes une fois l’installation lancée) :**  
tu installes ton **atelier**, tu écris **trois lignes**, et tu vois **ton premier message** s’afficher. Sans théorie lourde : on **fait**, puis on **nomme** ce qu’on a fait.

👉 Tu veux **apprendre Python** en **débutant** du bon pied : il te faut un **environnement Python** clair (interpréteur + endroit pour taper le code). Cet article est la **partie 1/10** du parcours — la suite t’attend sur la [page Python](/programmation/python/).

![Schéma Windows, macOS, Android](../../assets/programmation/python-outils.svg)

---

## 🎮 Partie 1 — Mission 1 : installer ton atelier

### 🎯 Objectif

Installer **Python 3** comme un **atelier de création** : une fois en place, tu pourras lancer autant de **petits programmes** que tu veux.

### 🧠 Explication simple

**Python**, c’est un **langage** pour **donner des instructions** à la machine : afficher du texte, calculer, plus tard lire des fichiers ou construire des jeux.  
L’**installation** ajoute sur ton ordinateur un **interpréteur** : le programme qui **lit** ton fichier `.py` et **exécute** les instructions.

### 🛠️ Étapes simples (Windows — le plus courant)

1. Va sur la page officielle **[python.org/downloads/windows](https://www.python.org/downloads/windows/)** (gratuit).  
2. Lance l’installateur. **Coche** « **Add python.exe to PATH** » (sinon la commande `python` ne sera pas trouvée partout).  
3. Clique sur Installer et attends la fin.

Vérifie dans **PowerShell** ou l’invite de commandes :

```text
py --version
```

ou

```text
python --version
```

Tu dois voir une ligne du type `Python 3.12.x` (le numéro exact peut varier).

### ⚡ Deux façons de travailler : version rapide

Tu veux un **environnement Python** sans te perdre ? Deux chemins honnêtes :

| Option | Outil | Pour qui ? |
| --- | --- | --- |
| **Simple** | **IDLE** (livré avec Python) | Tu veux **une fenêtre**, lancer du code **tout de suite**, zéro plugin. |
| **Moderne** | **Visual Studio Code** + extension **Python** | Tu veux **coloration**, **dossiers**, **terminal** intégré — comme en cours pro. |

- **IDLE** : après l’installation de Python, cherche « IDLE » dans le menu Démarrer → tu peux taper du code dans l’interpréteur ou ouvrir un fichier **Fichier → Nouveau**.  
- **VS Code** : télécharge **[Visual Studio Code](https://code.visualstudio.com/)**, installe l’extension **Python** (Microsoft), ouvre un dossier, crée un fichier `bonjour.py`.

**Bonus pédagogique :** **[Thonny](https://thonny.org/)** — interface **tout-en-un** pensée pour l’enseignement (débogueur simple). Parfait si tu préfères **un seul logiciel** sans multiplier les fenêtres.

### macOS et Android (très court)

- **macOS** : installe Python 3 depuis **[python.org/downloads/macos](https://www.python.org/downloads/macos/)** ou via Homebrew si tu es à l’aise. En terminal, la commande est souvent `python3` plutôt que `python`.  
- **Android** : pour **s’entraîner** sur tablette, **[Pydroid 3](https://play.google.com/store/apps/details?id=ru.iiec.pydroid3)** est une option stable ; pour **la série complète**, un **PC** reste plus confortable (fichiers, copier-coller).

---

## 🎮 Partie 2 — Mission 2 : ton premier programme

### 🎯 Objectif

**Afficher un message** à l’écran. C’est la tradition en programmation : prouver que la chaîne « toi → fichier → Python » fonctionne.

### 💻 Code à taper (copie-colle ou tape au clavier)

Crée un fichier nommé par exemple `bonjour.py` et mets **exactement** :

```python
print("Bonjour, je programme en Python !")
```

Enregistre le fichier.

### ▶️ Comment l’exécuter ?

- **Dans VS Code** : ouvre le fichier, puis lance avec le bouton ▶ ou le menu d’exécution (selon ta config).  
- **En terminal** (dans le dossier du fichier) :

```text
python bonjour.py
```

ou `py bonjour.py` sous Windows, ou `python3 bonjour.py` sur Mac.

Tu dois voir la phrase s’afficher. **Bravo :** c’est ton **premier programme Python** — tu as franchi la porte des **python débutant** qui cherchent **comment installer python** et **tester tout de suite**.

![Illustration console Python](../../assets/programmation/python-terminal.svg)

### 🧠 Ce qui se passe (sans jargon inutile)

- `print(...)` = instruction « **affiche** ce qui est entre parenthèses ».  
- Le texte entre guillemets est une **chaîne de caractères** — on y reviendra avec les **variables** à la [leçon 2](/python-variables-affichage/).

---

## 🎯 Mini-missions (facultatif mais motivant)

1. Affiche **deux** lignes en ajoutant une deuxième instruction `print(...)`.  
2. Change le message pour mettre **ton prénom**.  
3. Dans le terminal, relance `py --version` et note le numéro de version dans un carnet — utile si un jour tu demandes de l’aide en ligne.

---

## 🤖 Résumé rapide (pour moteurs de réponse / révision)

- **Installer Python** = poser l’**interpréteur** + (souvent) **IDLE** sur ta machine.  
- **Environnement Python** = Python + **éditeur** (IDLE, VS Code, Thonny…).  
- **Premier programme** = un fichier `.py` avec `print("...")` **exécuté** sans erreur.  
- **Suite** : [leçon 2 — variables et affichage](/python-variables-affichage/).

---

## ❓ Questions fréquentes

Les réponses courtes sont aussi disponibles dans les **données structurées FAQ** de cette page pour aider les moteurs (y compris les expériences de type **réponses assistées**).

---

## Ressources sur Amazon (partenaire)

Ces liens sont des **recherches** sur Amazon.fr ; vérifie fiche, avis et prix au moment de l’achat.

- [Livres « apprendre Python 3 »](https://www.amazon.fr/s?k=apprendre+python+3+livre&tag=manuso06-21)
- [Python pour débutants / enfants](https://www.amazon.fr/s?k=python+d%C3%A9butant+enfant+livre&tag=manuso06-21)
- [Programmation et algorithmique (grand public)](https://www.amazon.fr/s?k=programmation+algorithmique+livre+d%C3%A9butant&tag=manuso06-21)

---

## Suite du parcours (10 leçons)

Tu viens de terminer la **leçon 1/10**. Prochaine étape : **variables et affichage** — tout est listé sur le **[hub Python](/programmation/python/)** avec les liens vers les leçons suivantes (types, conditions, boucles, fonctions… jusqu’aux projets guidés).

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/python-variables-affichage/">Leçon 2 — Variables et print</a>
<a class="article-cta article-cta--secondary" href="/programmation/python/">Toute la série Python</a>
</div>
