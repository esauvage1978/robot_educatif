import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "src/content/blog");
const outputPath = path.join(root, "docs/audit-articles-regles-redaction.md");

const files = fs
  .readdirSync(blogDir)
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => path.join(blogDir, file));

const stripCodeBlocks = (value) =>
  value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<pre[\s\S]*?<\/pre>/gi, "");

const wordCount = (value) =>
  (
    value
      .replace(/<[^>]+>/g, " ")
      .match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []
  ).length;

const countMatches = (pattern, value) => (value.match(pattern) ?? []).length;

const includesAny = (value, needles) => {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle.toLowerCase()));
};

const escapeCell = (value) =>
  String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontmatterText = match ? match[1] : "";
  const body = match ? raw.slice(match[0].length) : raw;
  const data = {};
  let currentKey = null;

  for (const line of frontmatterText.split(/\r?\n/)) {
    const keyMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const rawValue = keyMatch[2].trim();
      data[currentKey] =
        rawValue === "" ? [] : rawValue.replace(/^['"]|['"]$/g, "");
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }

      data[currentKey].push(listMatch[1].trim());
    }
  }

  return { data, frontmatterText, body };
}

function estimateType(slug, data, body, frontmatterText, words) {
  if (/(^|\n)series\s*:/.test(frontmatterText)) {
    return "Simple";
  }

  const haystack = `${slug} ${data.title || ""} ${data.headline || ""} ${(
    data.categories || []
  ).join(" ")}`;

  if (
    includesAny(haystack, [
      "meilleur",
      "choisir",
      "comparatif",
      "guide achat",
      "guide d’achat",
      "acheter",
      "quel robot",
      "budget",
      "entre-200",
      "entre-500",
      "plus-de-1000",
      "autour-de-200",
      "vs",
      "cadeaux",
      "pas-cher",
      "sans-ecran",
    ]) ||
    /productItemListSchema\s*:/.test(frontmatterText) ||
    (words >= 2200 &&
      /amazon\.fr|tag=manuso06-21/.test(body) &&
      includesAny(haystack, [
        "telecharger",
        "installer",
        "mblock en ligne",
        "quel logiciel",
      ]))
  ) {
    return "Pilier";
  }

  return "Simple";
}

function scoreArticle(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, frontmatterText, body } = parseFrontmatter(raw);
  const bodyWithoutCode = stripCodeBlocks(body);
  const slug = path.basename(filePath).replace(/\.mdx?$/, "");
  const words = wordCount(body);
  const type = estimateType(slug, data, body, frontmatterText, words);
  const titleText = `${data.title || ""} ${data.headline || ""}`;
  const criteria = [];

  const add = (label, passed, weight) => {
    criteria.push({ label, passed: Boolean(passed), weight });
  };

  const h2Count = countMatches(/(^|\n)##\s+|<h2\b/gi, bodyWithoutCode);
  const faqCount = countMatches(
    /(^|\n)###\s+.*\?|<h3[^>]*>[^<]*\?/gi,
    bodyWithoutCode,
  );
  const amazonCount = countMatches(/amazon\.fr|tag=manuso06-21/gi, body);
  const ctaCount = countMatches(
    /article-cta|Voir le produit|Voir le prix|Disponible sur Amazon/gi,
    body,
  );
  const internalLinkCount = countMatches(
    /href="\/[^"]+"|\]\(\/[\w-]/g,
    body,
  );
  const hasComparison = includesAny(body, [
    "avantages",
    "inconvénients",
    "comparatif",
    "profil utilisateur",
    "voir le produit",
    "fonctionnalités : tableau comparatif",
  ]);
  const hasTitleIntent = includesAny(titleText, [
    "choisir",
    "meilleur",
    "comparatif",
    "guide",
    "installer",
    "comment",
    "apprendre",
    "télécharger",
    "tester",
    "tests",
  ]);

  add("title", data.title, 6);
  add(
    "headline / H1 unique",
    data.headline && !/(^|\n)#\s+/.test(bodyWithoutCode),
    8,
  );
  add("description", data.description, 7);
  add("dates", data.pubDate, 4);
  add(
    "4 catégories",
    Array.isArray(data.categories) && data.categories.length === 4,
    5,
  );
  add("relatedLinks", /relatedLinks\s*:/.test(frontmatterText), 6);
  add("intro claire", words > 0 && body.slice(0, 1200).trim().length > 250, 6);
  add("H2 structurés", h2Count >= (type === "Pilier" ? 5 : 2), 7);
  add(
    "mots-clés naturels",
    includesAny(`${titleText} ${body}`, [
      "robot éducatif",
      "kit arduino",
      "apprendre programmation",
      "mblock",
      "mbot",
      "programmation",
      "python",
      "matatalab",
      "tale-bot",
      "pytest",
      "cyberpi",
    ]),
    6,
  );
  add(
    "maillage interne visible",
    internalLinkCount >= (type === "Pilier" ? 6 : 2),
    8,
  );
  add(
    "FAQ visible + schema",
    !faqCount ? type === "Simple" : /faqSchema\s*:/.test(frontmatterText),
    type === "Pilier" ? 8 : 5,
  );

  if (type === "Pilier") {
    add("longueur 2000+ mots", words >= 2000, 8);
    add(
      "intention choisir/meilleur/comparatif",
      hasTitleIntent &&
        includesAny(titleText, [
          "choisir",
          "meilleur",
          "comparatif",
          "guide",
          "télécharger",
        ]),
      7,
    );
    add("sommaire", /article-toc/.test(body), 5);
    add("comparatif / produits", hasComparison, 8);
    add("CTA affiliation", ctaCount >= 2 || amazonCount >= 3, 8);
    add(
      "productItemListSchema",
      /productItemListSchema\s*:/.test(frontmatterText) || !hasComparison,
      5,
    );
    add(
      "comment choisir",
      includesAny(body, [
        "comment choisir",
        "quel robot choisir",
        "quelle version",
        "âge",
        "niveau",
        "budget",
        "objectif",
      ]),
      6,
    );
    add(
      "exemples projets",
      includesAny(body, ["exemple", "projet", "activité", "cas d’usage", "cas réel"]),
      5,
    );
    add(
      "recommandations profils",
      includesAny(body, [
        "pour un enfant",
        "débutant",
        "enseignant",
        "profil",
        "âge",
        "niveau",
      ]),
      5,
    );
  } else {
    add("longueur adaptée", words >= 700, 7);
    add(
      "intention ciblée",
      hasTitleIntent || includesAny(titleText, ["matatalab", "tale-bot", "pytest", "cyberpi"]),
      6,
    );
    add(
      "étapes / explications concrètes",
      includesAny(body, [
        "exemple",
        "projet",
        "activité",
        "problème",
        "erreur",
        "solution",
        "produit",
        "usages",
        "exercice",
      ]),
      8,
    );
    add(
      "affiliation contextuelle ou non nécessaire",
      amazonCount > 0 ||
        !includesAny(`${titleText} ${body}`, ["acheter", "produit", "matériel", "robot", "kit"]),
      4,
    );
  }

  const total = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
  const actual = criteria.reduce(
    (sum, criterion) => sum + (criterion.passed ? criterion.weight : 0),
    0,
  );

  return {
    slug,
    path: path.relative(root, filePath).replace(/\\/g, "/"),
    type,
    score: Math.round((actual / total) * 100),
    words,
    missing: criteria
      .filter((criterion) => !criterion.passed)
      .map((criterion) => criterion.label),
  };
}

const rows = files
  .map(scoreArticle)
  .sort((a, b) => a.slug.localeCompare(b.slug, "fr"));
const pillarCount = rows.filter((row) => row.type === "Pilier").length;
const averageScore = Math.round(
  rows.reduce((sum, row) => sum + row.score, 0) / rows.length,
);

const missingText = (row) =>
  row.missing.length
    ? `${row.missing.slice(0, 5).join(", ")}${row.missing.length > 5 ? "…" : ""}`
    : "Aucun manque majeur détecté";

let markdown = `# Audit des articles selon les règles rédactionnelles

Audit généré le ${new Date().toISOString().slice(0, 10)} à partir des règles de \`docs/regles-redaction-articles-blog.md\`.

> Note : score automatique indicatif. Il mesure la présence de signaux éditoriaux/SEO détectables dans les fichiers Markdown, pas la qualité humaine fine du texte. Une relecture éditoriale reste nécessaire pour les articles stratégiques.

---

## Synthèse

- Articles audités : **${rows.length}**
- Articles estimés simples : **${rows.length - pillarCount}**
- Articles estimés piliers : **${pillarCount}**
- Score moyen : **${averageScore}%**

### Lecture du score

- **90-100%** : article très aligné avec les règles détectables.
- **75-89%** : bon article, quelques optimisations possibles.
- **60-74%** : article correct mais incomplet sur SEO, maillage, FAQ ou structure.
- **0-59%** : article à retravailler en priorité.

---

## Tableau global

| Article | Type | Score | Mots | Manques principaux |
|---|---:|---:|---:|---|
`;

for (const row of rows) {
  markdown += `| [${escapeCell(row.slug)}](../${escapeCell(row.path)}) | ${row.type} | ${row.score}% | ${row.words} | ${escapeCell(missingText(row))} |\n`;
}

markdown += `
---

## Articles à traiter en priorité

| Priorité | Article | Type | Score | Actions suggérées |
|---:|---|---:|---:|---|
`;

[...rows]
  .sort((a, b) => a.score - b.score)
  .slice(0, 25)
  .forEach((row, index) => {
    markdown += `| ${index + 1} | [${escapeCell(row.slug)}](../${escapeCell(row.path)}) | ${row.type} | ${row.score}% | ${escapeCell(missingText(row))} |\n`;
  });

markdown += `
---

## Détail des critères utilisés

### Critères communs

- \`title\`, \`headline\`, \`description\`, \`pubDate\`, 4 catégories.
- H1 unique : pas de \`#\` dans le corps Markdown, H1 géré par \`headline\` / \`title\`.
- Les blocs de code fenced et HTML \`<pre>\` sont ignorés pour détecter les faux H1.
- Introduction présente.
- Structure H2 suffisante.
- Mots-clés naturels liés au sujet.
- Liens internes visibles.
- FAQ visible alignée avec \`faqSchema\` lorsque nécessaire.

### Critères articles simples

- Longueur adaptée, intention ciblée, étapes ou explications concrètes.
- Affiliation seulement si utile au lecteur.
- Les articles avec \`series\` sont classés simples, même s’ils contiennent une année ou des liens affiliés.

### Critères articles piliers

- 2 000 mots minimum.
- Intention transactionnelle ou comparative dans le titre.
- Sommaire.
- Comparatif produit ou guide de choix.
- CTA affiliation et liens Amazon si monétisable.
- \`productItemListSchema\` si comparatif produits.
- Sections choix, exemples, recommandations par profil.
- Maillage interne renforcé.

---

## Recalculer cet audit

\`\`\`powershell
node scripts/audit-blog-rules.mjs
\`\`\`
`;

fs.writeFileSync(outputPath, markdown, "utf8");
console.log(
  `Audit écrit : ${path.relative(root, outputPath)} (${rows.length} articles, score moyen ${averageScore}%)`,
);
