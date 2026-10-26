#!/usr/bin/env python3
"""
Script pour corriger les titres et descriptions des pages prioritaires
"""

import re
from pathlib import Path

UPDATES = {
    # Priority pages from user requirements
    "meilleur-robot-programmable-enfant-2026.mdx": {
        "title": "Robot programmable enfant 2026 : top 10 par âge et prix",
        "description": "Top 10 robots programmables enfants par âge et budget : mBot, LEGO, Arduino. Comparatif 2026, critères de choix et FAQ."
    },
    "quel-robot-acheter-enfant-10-ans-guide-achat.mdx": {
        "title": "Robot enfant 10 ans : 7 kits à construire et programmer",
        "description": "7 meilleurs robots pour enfant de 10 ans : mBot2, Arduino, kits à construire. Scratch avancé, Python, capteurs."
    },
    "mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants.md": {
        "title": "mBot vs mBot2 : différences, prix et lequel choisir ?",
        "description": "mBot vs mBot2 : tableau comparatif, différences prix, CyberPi, Python. Lequel choisir en 2026 selon l'âge et budget ?"
    },
    "mbot-avis-faut-il-acheter-pour-un-enfant.mdx": {
        "title": "mBot avis et prix 2026 : faut-il l'acheter pour un enfant ?",
        "description": "mBot avis complet 2026 : prix, avantages, inconvénients. Faut-il acheter le mBot pour un enfant ? Notre verdict."
    },
    "accessoires-mbot-par-ou-commencer.md": {
        "title": "Accessoires mBot : capteurs, packs et pièces à acheter",
        "description": "Quels accessoires mBot acheter ? Capteurs, extensions, packs mBuild, pièces détachées. Guide des composants 2026."
    },
    "premier-pas-avec-mblock-5.mdx": {
        "title": "mBlock 5 en ligne : premiers pas et interface (débutant)",
        "description": "Premiers pas mBlock 5 pour débutants : interface, blocs, sprites, scène. Tutoriel complet pour programmer un robot."
    },
    "idees-projets-mbot-rapides-une-heure.mdx": {
        "title": "Programme mBot : 8 idées de projets en une heure",
        "description": "8 projets mBot rapides en une heure : évitement obstacles, suivi ligne, LEDs, sons. Activités clés en main avec code."
    },
    "quel-robot-educatif-choisir-2026.md": {
        "title": "Quel robot éducatif choisir en 2026 ? Comparatif par âge",
        "description": "Comment choisir un robot éducatif en 2026 ? Critères essentiels, comparatif par âge, budget et objectifs."
    },
    "mblock-bluetooth-erreurs-frequentes-depannage.md": {
        "title": "mBlock Bluetooth : mBot ne se connecte pas ? Solutions",
        "description": "mBlock Bluetooth ne fonctionne pas ? Erreurs fréquentes et solutions pour connecter mBot et mBot2. Dépannage complet."
    },
    "activite-mbot-mesurer-des-distances.md": {
        "title": "Capteur ultrason mBot : activité mesurer une distance",
        "description": "Activité mBot : mesurer des distances avec le capteur ultrason. Programme mBlock complet, explications et variantes."
    },
    "python-mini-jeu-terminal.md": {
        "title": "Jeu en Python pour débutant : « plus ou moins » (code)",
        "description": "Créer un jeu en Python pour débutant : jeu « plus ou moins » complet. Code expliqué, boucles, conditions, input()."
    },
    "activite-scratch-le-carre.md": {
        "title": "Comment faire un carré sur Scratch ? Activité facile",
        "description": "Faire un carré sur Scratch : activité facile pour débutants. Programme complet, blocs expliqués, variantes et défis."
    },
    "activite-mbot-faire-clignoter-les-leds.md": {
        "title": "Programme mBot : faire clignoter les LED (mBlock)",
        "description": "Faire clignoter les LEDs du mBot : premier programme simple. Code mBlock expliqué, variantes couleurs et rythmes."
    },
    "c-arduino-fonctions-modularite-bonnes-pratiques.md": {
        "title": "Fonction Arduino : créer et appeler des fonctions en C",
        "description": "Créer des fonctions en Arduino C : syntaxe, paramètres, return. Tutoriel avec exemples pour modulariser votre code."
    },
    "decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente.md": {
        "title": "CyberPi Makeblock : avis, prix et programmation Python",
        "description": "CyberPi Makeblock : carte programmable Python/Scratch. Avis, prix, projets IoT. Alternative mBot2 pour ados."
    },
    "python-types-et-saisie.md": {
        "title": "input() en Python : saisir un int, float ou texte",
        "description": "Utiliser input() en Python : saisir int, float ou texte. Conversion avec int(), float(), gestion erreurs."
    },
    "installer-les-blocs-du-mbot.md": {
        "title": "Ajouter l'extension mBot dans mBlock 5 (blocs)",
        "description": "Comment ajouter l'extension mBot dans mBlock 5 ? Installation des blocs mBot, dépannage et première connexion."
    },
    "mise-en-route-raspberry-pi-3-modele-b.md": {
        "title": "Raspberry Pi 3 : installer l'OS et démarrer (guide)",
        "description": "Mise en route Raspberry Pi 3 : installer Raspberry Pi OS, premier démarrage, configuration. Guide complet débutant."
    },
    "mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique.md": {
        "title": "mBot2 Makeblock : avis, prix et ce qu'il apprend (2026)",
        "description": "mBot2 Makeblock : avis complet, prix, Python, CyberPi. Que peut-on apprendre avec le mBot2 ? Guide 2026."
    },
    "python-av-packaging-pyproject.md": {
        "title": "pyproject.toml : packager un projet Python (pip install)",
        "description": "Créer un package Python avec pyproject.toml : structure, setuptools, pip install. Tutoriel complet packaging."
    },
    "quel-robot-educatif-entre-200-et-500-euros-guide-2026.mdx": {
        "title": "Robot éducatif 200-500 € : lesquels valent le prix ?",
        "description": "Robots éducatifs 200-500 € : LEGO SPIKE, mBot2, Arduino avancés. Comparatif 2026, rapport qualité-prix et choix."
    },
    "scratch-creer-un-jeu-video-premiere-partie.md": {
        "title": "Comment créer un jeu sur Scratch ? Tuto (partie 1)",
        "description": "Créer un jeu vidéo sur Scratch : tutoriel complet partie 1. Sprites, arrière-plans, déplacements, collisions."
    },
    # Long titles to fix
    "serie-capteur-ultrason-mbot-1-mesurer-distance.md": {
        "title": "Capteur ultrason mBot (1/4) : mesurer distance en cm",
        "description": "Série capteur ultrason mBot : mesurer une distance en cm avec mBlock. Programme complet et explications."
    },
    "serie-capteur-ultrason-mbot-2-radar-recul-paliers.md": {
        "title": "Capteur ultrason mBot (2/4) : radar recul par paliers",
        "description": "Capteur ultrason mBot : créer un radar de recul avec bips par paliers. Programme mBlock et explications."
    },
    "python-bataille-navale-4-tirs-et-marques.md": {
        "title": "Bataille navale Python (4/6) : tirs et marques grilles",
        "description": "Bataille navale Python partie 4 : gérer les tirs, marquer les coups sur les grilles. Code complet et tests."
    },
    "idees-cadeaux-robotique-noel-rentree-anniversaire.md": {
        "title": "Cadeaux robots : Noël, rentrée, anniversaire par âge",
        "description": "Idées cadeaux robots éducatifs : Noël, rentrée, anniversaire. Sélection par âge et budget 2026."
    },
    "python-inter-poo-classes.md": {
        "title": "Python POO : classes et programmation orientée objet",
        "description": "Programmation orientée objet en Python : classes, attributs, méthodes, héritage. Tutoriel complet POO."
    },
    "le-robot-tale-bot-de-chez-matatalab-questions-reponses.md": {
        "title": "Tale-Bot Pro Matatalab : questions/réponses (FAQ)",
        "description": "Tale-Bot Pro FAQ : prix, âge, activités, différences Tale-Bot vs Pro. Toutes les réponses sur le robot."
    },
    "c-arduino-boucles-timing.md": {
        "title": "Arduino C : boucles et timing (delay vs millis)",
        "description": "Boucles et timing en Arduino C : while, for, delay(), millis(). 20 exercices pour maîtriser le timing."
    },
    "projet-inter-agenda-5-cli-argparse.md": {
        "title": "Agenda CLI Python (5/6) : argparse et interface CLI",
        "description": "Projet Agenda Python : créer interface CLI avec argparse. Commandes, arguments, sous-commandes."
    },
    "deballage-et-premier-pas-du-robot-tale-bot-de-chez-matatalab.md": {
        "title": "Tale-Bot Pro : déballage et premiers pas (guide)",
        "description": "Déballage Tale-Bot Pro Matatalab : contenu du pack, montage, première utilisation. Guide complet débutant."
    },
    "scratch-ecole-maison-par-ou-commencer.md": {
        "title": "Scratch à l'école ou maison : par où commencer ?",
        "description": "Débuter avec Scratch à l'école ou à la maison : premiers projets, ressources, progression. Guide 2026."
    },
    "equiper-classe-robots-budget-packs-2026.mdx": {
        "title": "Équiper une classe en robots : budget et packs 2026",
        "description": "Équiper une classe en robots éducatifs : budget par élève, packs recommandés, subventions. Guide 2026."
    },
    "robot-educatif-eilik-compagnon.md": {
        "title": "Eilik : robot bureau interactif pour découvrir tech",
        "description": "Eilik : petit robot de bureau interactif. Avis, prix, ce qu'il apprend. Compagnon tech pour découvrir IA."
    },
    "quel-robot-educatif-autour-de-200-euros-guide-2026.mdx": {
        "title": "Robot éducatif autour de 200 € : comparatif 2026",
        "description": "Quels robots éducatifs autour de 200 € ? mBot2, LEGO, Arduino. Comparatif détaillé et conseils d'achat."
    },
    "robot-educatif-sans-ecran-guide.md": {
        "title": "Robot sans écran : lesquels choisir par âge ?",
        "description": "Robots éducatifs sans écran pour 4-8 ans : lesquels choisir ? Comparatif, prix, activités tangibles 2026."
    },
    "quel-robot-educatif-plus-de-1000-euros-guide-expert-2026.mdx": {
        "title": "Robot éducatif +1000 € : guide expert 2026",
        "description": "Robots éducatifs plus de 1000 € : NAO, rovers avancés, kits pro. Pour qui ? Rapport qualité-prix expert."
    },
    "python-carnet-todo-3-modele-donnees.md": {
        "title": "Carnet Todo Python (3/6) : modèle de données",
        "description": "Carnet Todo Python partie 3 : modèle de données et opérations CRUD. Classes, listes, sauvegarde JSON."
    },
    "python-bataille-navale-1-cahier-des-charges.md": {
        "title": "Bataille navale Python (1/6) : cahier des charges",
        "description": "Bataille navale Python partie 1 : cahier des charges, structures de données, architecture du jeu."
    }
}

def update_frontmatter(filepath, new_title, new_desc):
    """Update title and description in frontmatter"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update title
    content = re.sub(
        r'^title:\s*["\'].*?["\']',
        f'title: "{new_title}"',
        content,
        flags=re.MULTILINE
    )
    
    # Update description
    content = re.sub(
        r'^description:\s*["\'].*?["\']',
        f'description: "{new_desc}"',
        content,
        flags=re.MULTILINE
    )
    
    # Update updatedDate
    content = re.sub(
        r'^updatedDate:\s*"[^"]*"',
        'updatedDate: "2026-10-13"',
        content,
        flags=re.MULTILINE
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated: {filepath.name[:50]:<50} | Title: {len(new_title):2d} chars")

blog_dir = Path("/workspace/src/content/blog")

for filename, updates in UPDATES.items():
    filepath = blog_dir / filename
    if filepath.exists():
        update_frontmatter(filepath, updates["title"], updates["description"])
    else:
        print(f"✗ Not found: {filename}")

print(f"\nUpdated {len([f for f in UPDATES.keys() if (blog_dir / f).exists()])} files")
