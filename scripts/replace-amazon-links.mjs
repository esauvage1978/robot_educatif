#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const AMAZON_TAG = 'manuso06-21';

const PRODUCT_MAPPINGS = {
  'mBot': { asin: 'B07XR98YYQ', price: '89.99€', keywords: ['mBot', 'Makeblock', 'robot', 'éducatif'] },
  'CyberPi': { asin: 'B0BBZY9L59', price: '59.99€', keywords: ['CyberPi', 'Makeblock', 'carte'] },
  'ELEGOO Car': { asin: 'B078Y9RYM2', price: '79.99€', keywords: ['ELEGOO', 'Voiture', 'Robot', 'Car', 'UNO', 'V4'] },
  'Penguin Bot': { asin: 'B07GVD6GQH', price: '39.99€', keywords: ['ELEGOO', 'Penguin', 'Bot', 'bipède'] },
  'Raspberry Pi 5 4GB': { asin: 'B0CK3L9WD3', price: 'voir le prix', keywords: ['Raspberry', 'Pi', '5', '4GB', '4 Go'], thirdParty: true },
  'Raspberry Pi 5 8GB': { asin: 'B0CK2FCG1K', price: 'voir le prix', keywords: ['Raspberry', 'Pi', '5', '8GB', '8 Go'], thirdParty: true },
  'mBot Ranger': { asin: 'B07KG4JHBH', price: '189.99€', keywords: ['mBot', 'Ranger', 'Makeblock'] },
  'mBot2': { asin: 'B0919F9CKS', price: '167.95€', keywords: ['mBot2', 'Makeblock'] },
  'Codey Rocky': { asin: 'B07CGH8NZ7', price: '149.99€', keywords: ['Codey', 'Rocky', 'Makeblock'] },
};

const GENERIC_SEARCHES = [
  'piles rechargeables',
  'livre',
  'kit',
  'accessoires',
  'câble',
  'alimentation',
  'dissipateur',
  'chargeur',
  'robot programmable scratch capteur',
  'kit robotique',
  'kit initiation',
];

function matchProduct(searchQuery) {
  const lowerQuery = searchQuery.toLowerCase();
  
  for (const genericTerm of GENERIC_SEARCHES) {
    if (lowerQuery.includes(genericTerm.toLowerCase())) {
      if (!lowerQuery.includes('mbot') && !lowerQuery.includes('cyberpi') && !lowerQuery.includes('elegoo') && !lowerQuery.includes('raspberry')) {
        return null;
      }
    }
  }
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [productName, productData] of Object.entries(PRODUCT_MAPPINGS)) {
    let score = 0;
    for (const keyword of productData.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        score++;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = { ...productData, name: productName };
    }
  }
  
  if (bestScore >= 2 || (bestScore >= 1 && bestMatch?.keywords.some(k => lowerQuery === k.toLowerCase()))) {
    return bestMatch;
  }
  
  return null;
}

function replaceAmazonLinks(content, filePath) {
  const amazonLinkRegex = /\[([^\]]+)\]\((https?:\/\/www\.amazon\.fr\/s\?k=([^)&]+)(?:&tag=[^)]+)?)\)/g;
  
  let replacements = [];
  let newContent = content;
  
  const matches = [...content.matchAll(amazonLinkRegex)];
  
  for (const match of matches) {
    const [fullMatch, linkText, fullUrl, searchQuery] = match;
    const decodedQuery = decodeURIComponent(searchQuery.replace(/\+/g, ' '));
    
    const product = matchProduct(decodedQuery);
    
    if (product) {
      const newUrl = `https://www.amazon.fr/dp/${product.asin}?tag=${AMAZON_TAG}`;
      const newLink = `[${linkText}](${newUrl})`;
      
      replacements.push({
        file: path.basename(filePath),
        old: decodedQuery,
        new: `ASIN ${product.asin} (${product.name})`,
        linkText
      });
      
      newContent = newContent.replace(fullMatch, newLink);
    }
  }
  
  return { newContent, replacements };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { newContent, replacements } = replaceAmazonLinks(content, filePath);
  
  if (replacements.length > 0) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }
  
  return replacements;
}

function processDirectory(dirPath) {
  const allReplacements = [];
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      allReplacements.push(...processDirectory(filePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const replacements = processFile(filePath);
      allReplacements.push(...replacements);
    }
  }
  
  return allReplacements;
}

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
console.log(`Traitement du répertoire: ${blogDir}\n`);

const allReplacements = processDirectory(blogDir);

console.log(`\n=== RÉSUMÉ DES REMPLACEMENTS ===`);
console.log(`Total de liens remplacés: ${allReplacements.length}\n`);

const byProduct = {};
for (const replacement of allReplacements) {
  if (!byProduct[replacement.new]) {
    byProduct[replacement.new] = 0;
  }
  byProduct[replacement.new]++;
}

console.log('Par produit:');
for (const [product, count] of Object.entries(byProduct).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${product}: ${count} remplacements`);
}

console.log('\n✅ Terminé!');
