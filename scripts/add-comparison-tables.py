#!/usr/bin/env python3

import os
import re

files_to_convert = [
    'src/content/blog/quel-robot-educatif-entre-200-et-500-euros-guide-2026.md',
    'src/content/blog/quel-robot-educatif-autour-de-200-euros-guide-2026.md',
]

COMPARISON_TABLE_200_500 = """
import AffiliateDisclosure from '../../components/AffiliateDisclosure.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';

<AffiliateDisclosure variant="compact" />

<ComparisonTable
  products={[
    { id: 'mbot-ranger', badge: 'Tout-terrain' },
    { id: 'mbot2', badge: 'IoT & Python' },
    { id: 'codey-rocky', badge: 'IA & ludique' },
  ]}
  title="Sélection robots 200-500€"
/>
"""

COMPARISON_TABLE_AUTOUR_200 = """
import AffiliateDisclosure from '../../components/AffiliateDisclosure.astro';
import ComparisonTable from '../../components/ComparisonTable.astro';

<AffiliateDisclosure variant="compact" />

<ComparisonTable
  products={[
    { id: 'mbot-ranger', badge: 'Version avancée mBot' },
    { id: 'codey-rocky', badge: 'Design ludique' },
    { id: 'mbot2', badge: 'Meilleur Python' },
  ]}
  title="Robots autour de 200€"
/>
"""

os.chdir('/workspace')

for old_path in files_to_convert:
    if not os.path.exists(old_path):
        print(f"File not found: {old_path}")
        continue
        
    new_path = old_path.replace('.md', '.mdx')
    
    # Read file
    with open(old_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has ComparisonTable
    if 'ComparisonTable' in content:
        print(f"Already has ComparisonTable: {old_path}")
        continue
    
    # Find end of frontmatter
    match = re.search(r'^---\n.*?\n---\n', content, re.DOTALL | re.MULTILINE)
    if not match:
        print(f"No frontmatter found in {old_path}")
        continue
    
    # Choose appropriate comparison table
    if '200-500' in old_path:
        table = COMPARISON_TABLE_200_500
    else:
        table = COMPARISON_TABLE_AUTOUR_200
    
    # Insert after frontmatter
    end_pos = match.end()
    new_content = content[:end_pos] + '\n' + table + '\n' + content[end_pos:]
    
    # Write to new file
    with open(new_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # Remove old file if different
    if old_path != new_path:
        os.remove(old_path)
        print(f"Converted {old_path} to {new_path} with ComparisonTable")
    else:
        print(f"Updated {old_path} with ComparisonTable")

print("\n✅ Done!")
