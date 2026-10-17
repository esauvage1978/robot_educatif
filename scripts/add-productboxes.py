#!/usr/bin/env python3

import os
import re

# Product boxes to add
PRODUCTBOX_MBOT2_CYBERPI = """
import ProductBox from '../../components/ProductBox.astro';

<ProductBox
  productId="mbot2"
  name="Makeblock mBot2"
  asin="B0919F9CKS"
  ages="10-14 ans"
  priceRange="150-180€"
  languages={['Scratch', 'Python']}
  pros={[
    'Carte CyberPi avec écran couleur',
    'Compatible Python et Scratch',
    'Wi-Fi et IoT intégrés',
    'Parfait pour apprendre mBlock 5'
  ]}
  badge="Recommandé pour mBlock"
  position={1}
/>

<ProductBox
  productId="cyberpi"
  name="Makeblock CyberPi"
  asin="B0BBZY9L59"
  ages="10+ ans"
  priceRange="60-80€"
  languages={['Scratch', 'Python']}
  pros={[
    'Carte programmable polyvalente',
    'Écran LED intégré',
    'Wi-Fi et capteurs multiples',
    'Idéale pour projets IoT avec mBlock'
  ]}
  badge="Option économique"
  position={2}
/>
"""

PRODUCTBOX_MBOT_ELEGOO = """
import ProductBox from '../../components/ProductBox.astro';

<ProductBox
  productId="mbot"
  name="Makeblock mBot"
  asin="B07XR98YYQ"
  ages="8-12 ans"
  priceRange="80-100€"
  languages={['Scratch', 'Arduino']}
  pros={[
    'Facile à assembler en 15 minutes',
    'Programmation par blocs intuitive',
    'Compatible Scratch et Arduino',
    'Nombreux capteurs inclus'
  ]}
  badge="Meilleur choix 8 ans"
  position={1}
/>

<ProductBox
  productId="elegoo-penguin"
  name="ELEGOO Penguin Bot"
  asin="B07GVD6GQH"
  ages="8-14 ans"
  priceRange="35-45€"
  languages={['Arduino C']}
  pros={[
    'Robot bipède original',
    'Musique et danse programmables',
    'Facile à personnaliser',
    'Prix très accessible'
  ]}
  badge="Petit budget"
  position={2}
/>
"""

PRODUCTBOX_RASPBERRY = """
import ProductBox from '../../components/ProductBox.astro';

<ProductBox
  productId="raspberry-pi-5-4gb"
  name="Raspberry Pi 5 (4GB)"
  asin="B0CK3L9WD3"
  ages="12+ ans"
  priceRange="voir le prix"
  languages={['Python', 'C++', 'JavaScript']}
  pros={[
    'Processeur ARM Cortex-A76 2.4GHz',
    'Performance 2-3× supérieure au Pi 4',
    'Double sortie 4K',
    'Idéal pour projets avancés'
  ]}
  badge="Recommandé"
  position={1}
/>
"""

def add_productbox_after_frontmatter(filepath, productbox_content):
    """Add product box after frontmatter in MDX file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find end of frontmatter
    match = re.search(r'^---\n.*?\n---\n', content, re.DOTALL | re.MULTILINE)
    if not match:
        print(f"No frontmatter found in {filepath}")
        return False
    
    # Check if ProductBox already exists
    if 'import ProductBox' in content:
        print(f"ProductBox already exists in {filepath}, skipping")
        return False
    
    # Insert after frontmatter
    end_pos = match.end()
    new_content = content[:end_pos] + '\n' + productbox_content + '\n' + content[end_pos:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Added ProductBox to {filepath}")
    return True

# Files to modify
files_to_modify = [
    ('src/content/blog/premier-pas-avec-mblock-5.mdx', PRODUCTBOX_MBOT2_CYBERPI),
    ('src/content/blog/idees-projets-mbot-rapides-une-heure.md', PRODUCTBOX_MBOT_ELEGOO),
    ('src/content/blog/raspberry-pi-5-quelle-version-memoire-acheter.md', PRODUCTBOX_RASPBERRY),
]

os.chdir('/workspace')

for filepath, productbox in files_to_modify:
    if filepath.endswith('.md') and not filepath.endswith('.mdx'):
        # Convert to MDX first
        new_path = filepath.replace('.md', '.mdx')
        if os.path.exists(filepath):
            os.rename(filepath, new_path)
            print(f"Converted {filepath} to {new_path}")
            filepath = new_path
    
    if os.path.exists(filepath):
        add_productbox_after_frontmatter(filepath, productbox)
    else:
        print(f"File not found: {filepath}")

print("\n✅ Done!")
