import re
import glob

# Shortened titles and descriptions
fixes = {
    # Titles > 65 chars
    'quel-robot-acheter-enfant-12-ans-guide-achat.md': {
        'title': 'Robot éducatif pour un enfant de 12 ans : guide 2026',
    },
    'raspberry-pi-3-vs-4-vs-5-comparatif-2026.md': {
        'title': 'Raspberry Pi 3 vs 4 vs 5 : comparatif 2026',
        'desc': 'Comparatif Raspberry Pi 3/4/5 : CPU, RAM, USB, connectivité. Tableau des différences, performances, prix et conseils pour choisir le bon modèle.',
    },
    'c-arduino-fonctions-modularite-bonnes-pratiques.md': {
        'title': 'Arduino C : fonctions et bonnes pratiques (DRY, portée)',
    },
    'serie-capteur-ultrason-mbot-3-radar-recul-cadence-distance.md': {
        'title': 'Capteur ultrason mBot (3/4) : radar de recul amélioré',
        'desc': 'Radar de recul mBot amélioré : vitesse du bip proportionnelle à la distance. Variables, opérateurs, boucles et conditions avancées.',
    },
    'decouvrez-makeblock-cyberpi-une-carte-de-developpement-electronique-polyvalente.md': {
        'title': 'CyberPi Makeblock : carte de développement polyvalente',
    },
    'c-arduino-environnement-structure-sketch.md': {
        'title': 'Arduino C : structure sketch, setup/loop, Serial Monitor',
    },
    'c-arduino-conditions-capteurs-actionneurs.md': {
        'title': 'Arduino C : conditions (if/else) capteurs et actionneurs',
    },
    'serie-capteur-ultrason-mbot-4-ralentir-sarreter-obstacle.md': {
        'title': 'Capteur ultrason mBot (4/4) : avancer et s\'arrêter',
        'desc': 'mBot avance et s\'arrête devant un obstacle : capteur ultrason, conditions, variables d\'état, motorisation. Projet complet avec code Arduino.',
    },
    'quel-robot-acheter-enfant-8-ans-guide-achat.md': {
        'title': 'Robot éducatif pour un enfant de 7-8 ans : guide 2026',
        'desc': 'Choisir un robot éducatif 7-8 ans : Scratch, premiers capteurs, montage simple. Critères, repères d\'âge et sélection robots adaptés.',
    },
    'quel-robot-educatif-entre-500-et-1000-euros-guide-2026.md': {
        'title': 'Robots éducatifs 500-1000€ : comparatif 2026',
    },
    'quel-robot-educatif-entre-200-et-500-euros-guide-2026.md': {
        'title': 'Robots éducatifs 200-500€ : comparatif 2026',
        'desc': 'Budget 200-500€ : mBot Ranger, mBot Ultimate, fischertechnik STEM Robomission, Elegoo Smart Car V4. Comparatif fonctions, âge et projets.',
    },
    'projet-av-journal-3-decorateurs.md': {
        'title': 'Projet Journal CLI (3/6) : décorateurs et métriques',
    },
    'meilleur-robot-programmable-enfant-2026.md': {
        'title': 'Meilleur robot programmable enfant 2026 : guide complet',
        'desc': 'Choisir un robot programmable enfant : objectifs par âge, trois critères clés (budget, progression, écosystème) et sélection 2026.',
    },
    'projet-av-journal-4-asyncio-batch.md': {
        'title': 'Projet Journal CLI (4/6) : asyncio et batch',
    },
    'python-environnement-developpement.md': {
        'title': 'Python : environnement de développement (Win, Mac, Linux)',
    },
    'mise-en-route-raspberry-pi-3-modele-b.md': {
        'title': 'Mise en route Raspberry Pi 3 : installation complète',
    },
    'raspberry-pi-4-quelle-version-memoire-acheter.md': {
        'title': 'Raspberry Pi 4 : quelle version RAM choisir ?',
    },
    'quel-robot-acheter-enfant-10-ans-guide-achat.md': {
        'title': 'Robot éducatif pour un enfant de 10 ans : guide 2026',
        'desc': 'Choisir un robot éducatif 10 ans : Scratch avancé, Python, capteurs et actionneurs. Critères, repères d\'âge et sélection adaptée.',
    },
    'programmation-enfant-a-quel-age-commencer.md': {
        'title': 'Programmation enfant : à quel âge commencer ?',
    },
    'le-robot-tale-bot-de-chez-matatalab-un-outil-educatif-pour-enfants.md': {
        'title': 'Tale-Bot Matatalab : robot éducatif 3-9 ans',
    },
    
    # More descriptions
    'activite-mbot-detecteur-dintrusion.md': {
        'desc': 'Détecteur d\'intrusion avec mBot : capteur ultrason surveille un seuil, LED et buzzer alertent. Variables, conditions et projet complet.',
    },
    'serie-capteur-ultrason-mbot-1-mesurer-distance.md': {
        'desc': 'Capteur ultrason mBot : principe (émission, écho, durée), mesure de distance en mode Live puis LED autonome. Bases pour projets avancés.',
    },
    'quel-robot-acheter-enfant-5-ans-guide-achat.md': {
        'desc': 'Robot éducatif 5 ans : critères, repères d\'âge, kits STEM adaptés. Guide pour accompagner un enfant en maternelle/début primaire.',
    },
    'quel-robot-acheter-enfant-12-ans-guide-achat.md': {
        'desc': 'Robot éducatif 12 ans et + : Python, projets longs, capteurs avancés. Critères et sélection collège/lycée pour approfondir.',
    },
    'scratch-ecole-maison-par-ou-commencer.md': {
        'desc': 'Structurer l\'apprentissage Scratch classe/domicile : différences concrètes, progression par projets, ressources et validation autonome.',
    },
    'quel-robot-educatif-autour-de-200-euros-guide-2026.md': {
        'desc': 'Budget ~200€ : mBot Ranger, Ozobot Evo Entry, mBot Ultimate. Comparatif fonctions, âge recommandé et projets selon profil.',
    },
    'activite-mbot-faire-defiler-un-texte.md': {
        'desc': 'Faire défiler un message sur la matrice LED du mBot : position X, boucles, règle longueur×5+15. Schémas logique du programme.',
    },
    'logiciel-mblock-makeblock-mbot-quel-choisir.md': {
        'desc': 'mBlock 5 : appli bureau, web, mode Python. Quand utiliser quoi pour mBot, mBot2, Codey Rocky, CyberPi. Tableau et liens tutoriels.',
    },
    'mbot2-de-makeblock-le-robot-educatif-pour-apprendre-la-robotique.md': {
        'desc': 'MBot2 de Makeblock : robot éducatif avec fonctionnalités avancées, compatibilité multi-langage (Scratch, Python) et capteurs innovants.',
    },
    'quel-robot-educatif-choisir-2026.md': {
        'desc': 'Guide 2026 : familles de robots éducatifs (sans écran, Scratch, Python/C++, kits avancés). Tableau âge, budget et progression.',
    },
    'mon-premier-programme-mbot.md': {
        'desc': 'Premier programme mBlock 5 pour mBot : bouton capteur, LED RGB, boucle, connexion Bluetooth. Guide débutant avec captures d\'écran.',
    },
    'mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants.md': {
        'desc': 'mBot vs mBot 2 : comparatif prix, tableau fonctions, capteurs, CyberPi. Aide au choix selon âge, budget et objectifs pédagogiques.',
    },
    'robot-educatif-eilik-compagnon.md': {
        'desc': 'Eilik : robot compagnon de bureau, jeux, réactions tactiles et vocales. Différence avec robots éducatifs programmables.',
    },
}

# Apply fixes
for filename, changes in fixes.items():
    filepath = f'src/content/blog/{filename}'
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'title' in changes:
            content = re.sub(r'^title: "([^"]*)"', f'title: "{changes["title"]}"', content, flags=re.MULTILINE)
        
        if 'desc' in changes:
            content = re.sub(r'^description: "([^"]*)"', f'description: "{changes["desc"]}"', content, flags=re.MULTILINE)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'✓ {filename}')
    except FileNotFoundError:
        print(f'✗ {filename} not found')
    except Exception as e:
        print(f'✗ {filename}: {e}')

print('\nDone!')
