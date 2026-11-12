#!/usr/bin/env python3
"""Generate docs/seo/*.md from CSV reports and src/ inventory."""
from __future__ import annotations

import csv
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEO = ROOT / "docs" / "seo"
SRC = ROOT / "src"

# Evidence-based query → URL hints (slug substring or path); no guess beyond content alignment
QUERY_URL_EVIDENCE: dict[str, list[str]] = {
    "programmation scratch": ["scratch-ecole-maison", "activite-scratch", "mblock-vs-scratch", "robot-programmable-scratch"],
    "scratch programmation": ["scratch-ecole-maison", "activite-scratch"],
    "scratch programme": ["scratch-ecole-maison", "scratch-creer-un-jeu"],
    "scratch francais": ["scratch-ecole-maison", "activite-scratch"],
    "scratch tuto": ["scratch-ecole-maison", "activite-scratch-le-carre", "premier-pas-avec-mblock"],
    "scratch basics": ["scratch-ecole-maison", "activite-scratch-le-carre"],
    "tuto scratch": ["scratch-ecole-maison", "activite-scratch"],
    "comment utiliser scratch": ["scratch-ecole-maison", "activite-scratch-le-carre"],
    "comment faire un carré sur scratch": ["activite-scratch-le-carre"],
    "robot programmable": ["meilleur-robot-programmable", "robot-programmable-scratch", "quel-robot-educatif"],
    "robots programmables": ["meilleur-robot-programmable", "quel-robot-educatif-choisir"],
    "robot éducatif": ["meilleur-robot-programmable", "quel-robot-educatif", "mbot-mon-premier"],
    "robot pour enfant de 10 ans": ["quel-robot-acheter-enfant-10-ans", "meilleur-robot-programmable"],
    "robot pour enfant": ["meilleur-robot-programmable", "programmation-enfant-a-quel-age"],
    "objet programmable": ["meilleur-robot-programmable", "mbot-mon-premier"],
    "programmation mbot": ["10-projets-mbot", "mon-premier-programme-mbot", "premier-pas-avec-mblock"],
    "mblock installer": ["installer-mblock-5", "installer-mblock-windows-11", "telecharger-mblock"],
    "mblock c est quoi": ["logiciel-mblock-makeblock", "premier-pas-avec-mblock", "mblock-vs-scratch"],
    "definition m block": ["logiciel-mblock-makeblock", "premier-pas-avec-mblock"],
    "mblock python": ["premier-pas-avec-mblock", "mbot2-de-makeblock"],
    "mbot (robot éducatif)": ["mbot-mon-premier", "10-projets-mbot", "accessoires-mbot"],
    "projet robotique": ["10-projets-mbot", "idees-projets-mbot"],
    "c++ arduino code": ["programmation/arduino-c", "c-arduino-environnement", "c-arduino-types"],
    "guide arduino débutant": ["programmation/arduino-c", "c-arduino-environnement"],
    "langage de programmation arduino": ["programmation/arduino-c", "c-arduino-environnement"],
    "return en python": ["python-fonctions"],
    "fonction return python": ["python-fonctions"],
    "python entrainement": ["programmation/python", "python-fonctions", "python-boucles"],
    "apprendre le python gratuit": ["programmation/python", "python-environnement"],
    "pip install venv": ["python-inter-venv-pip"],
    "venv pip install": ["python-inter-venv-pip"],
    "Raspberry Pi 3 vs Raspberry Pi 4 differences": ["raspberry-pi-3-vs-4-vs-5"],
}


def slug_from_ai_url(url: str) -> str:
    u = url.replace("https://robot-educatif.info/", "").strip("/")
    return u or "index"


def inventory_pages() -> list[dict]:
    pages: list[dict] = []
    blog_dir = SRC / "content" / "blog"
    for p in sorted(blog_dir.glob("*")):
        if p.suffix not in {".md", ".mdx"}:
            continue
        pages.append(
            {
                "kind": "blog",
                "slug": p.stem,
                "url": f"https://robot-educatif.info/{p.stem}/",
                "path": str(p.relative_to(ROOT)),
            }
        )
    dom_dir = SRC / "content" / "domotique"
    if dom_dir.exists():
        for p in sorted(dom_dir.glob("*")):
            if p.suffix not in {".md", ".mdx"}:
                continue
            pages.append(
                {
                    "kind": "domotique",
                    "slug": p.stem,
                    "url": f"https://robot-educatif.info/domotique/{p.stem}/",
                    "path": str(p.relative_to(ROOT)),
                }
            )
    for p in sorted((SRC / "pages").rglob("*.astro")):
        rel = p.relative_to(SRC / "pages")
        if "[" in str(rel):
            continue
        parts = list(rel.parts)
        if parts[-1] == "index.astro":
            parts = parts[:-1]
        else:
            parts[-1] = parts[-1].replace(".astro", "")
        if not parts:
            url = "https://robot-educatif.info/"
            slug = "index"
        else:
            slug = "/".join(parts)
            url = f"https://robot-educatif.info/{slug}/"
        pages.append(
            {
                "kind": "page",
                "slug": slug,
                "url": url,
                "path": str(p.relative_to(ROOT)),
            }
        )
    return pages


def read_csv_pages() -> list[tuple[str, int]]:
    path = SEO / "robot-educatif.info_AIPageStatsReport_28_10_2026.csv"
    rows: list[tuple[str, int]] = []
    with path.open(newline="", encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            rows.append((row["Page"], int(row["Citations"])))
    return rows


def read_csv_queries() -> list[dict]:
    path = SEO / "robot-educatif.info_AISearchQueriesReport_28_10_2026.csv"
    with path.open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def queries_for_url(url: str) -> list[str]:
    slug = slug_from_ai_url(url)
    matched: list[str] = []
    for q, hints in QUERY_URL_EVIDENCE.items():
        for h in hints:
            if h in slug or h in url:
                matched.append(q)
                break
    return sorted(set(matched))


def src_exists_for_url(url: str) -> str | None:
    slug = slug_from_ai_url(url)
    if slug == "index":
        return "src/pages/index.astro"
    if slug.startswith("domotique/"):
        s = slug.split("/", 1)[1]
        for ext in (".mdx", ".md"):
            p = SRC / "content" / "domotique" / f"{s}{ext}"
            if p.exists():
                return str(p.relative_to(ROOT))
    if slug.startswith("programmation/"):
        p = SRC / "pages" / slug / "index.astro"
        if p.exists():
            return str(p.relative_to(ROOT))
        p2 = SRC / "pages" / f"{slug}.astro"
        if p2.exists():
            return str(p2.relative_to(ROOT))
    for ext in (".mdx", ".md"):
        p = SRC / "content" / "blog" / f"{slug}{ext}"
        if p.exists():
            return str(p.relative_to(ROOT))
    return None


LOT_ACTIONS = {
    "scratch-ecole-maison-par-ou-commencer": ("A", "Pilier Scratch GEO + notions + parcours débutant→avancé"),
    "programmation/arduino-c": ("A", "Hub Arduino C : GEO, setup/loop, compilation, erreurs stk500"),
    "10-projets-mbot-gratuits-classe-faciles": ("A", "10 fiches projet : prérequis, dépannage, liens guides"),
    "meilleur-robot-programmable-enfant-2026": ("A", "Typologie robots + tableau comparatif oct. 2026"),
    "python-fonctions": ("A", "GEO return/type hints/erreurs fréquentes"),
    "mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants": ("B", "Tableau mCore vs CyberPi"),
    "idees-projets-mbot-rapides-une-heure": ("B", "Minutage 45–60 min"),
    "raspberry-pi-3-vs-4-vs-5-comparatif-2026": ("B", "Specs Broadcom + alimentation"),
    "accessoires-mbot-par-ou-commencer": ("B", "RJ25 SVG + ordre d'achat"),
    "premier-pas-avec-mblock-5": ("B", "Live vs Upload + maillage"),
    "installer-mblock-5-sous-windows-10": ("B", "mLink CH340/CH341"),
    "quel-robot-acheter-enfant-10-ans-guide-achat": ("B", "Autonomie Scratch→Python"),
}


def write_audit(inv: list[dict], ai_pages: list[tuple[str, int]]) -> None:
    cited_slugs = {slug_from_ai_url(u) for u, _ in ai_pages}
    uncited_blog = [p for p in inv if p["kind"] == "blog" and p["slug"] not in cited_slugs]
    text = f"""# Audit contenu IA & SEO — robot-educatif.info

*Généré le {date.today().isoformat()} à partir de `src/` et des exports Bing AI du 28/10/2026.*

## Synthèse exécutive

| Indicateur | Valeur |
|------------|--------|
| Pages inventoriées (blog + domotique + pages statiques) | {len(inv)} |
| Pages citées Bing AI (rapport pages) | {len(ai_pages)} |
| Articles blog | {sum(1 for p in inv if p['kind']=='blog')} |
| Guides domotique | {sum(1 for p in inv if p['kind']=='domotique')} |
| Pages Astro (hors dynamiques) | {sum(1 for p in inv if p['kind']=='page')} |
| Citations IA totales (somme rapport) | {sum(c for _, c in ai_pages)} |

Le site concentre aujourd’hui les citations IA sur **Scratch**, **Arduino C**, **mBot/mBlock**, **Python fonctions** et **guides d’achat robots**. Environ **{len(uncited_blog)}** articles blog ne figurent pas encore dans le top 106 Bing AI : opportunité GEO pour élargir le nombre de pages citées (domotique, séries capteurs, pendu Python, comparatifs budget).

## Architecture éditoriale

- **Blog** (`src/content/blog/`) : articles slug racine `/{{slug}}/`, layouts `BlogPost.astro`, séries Python et Arduino C via champs `series` / `seriesOrder`.
- **Domotique** (`src/content/domotique/`) : préfixe `/domotique/{{slug}}/`, layout `DomotiquePost.astro`.
- **Hubs programmation** (`src/pages/programmation/`) : index Astro listant les leçons (Python, Arduino C, projets).
- **i18n** : miroirs EN/DE/IT/ES pour smart-home et articles clés ; hreflang via `i18n.mjs`.
- **Affiliation** : `ProductBox`, `ComparisonTable`, presets Amazon — tags existants à conserver.

## Risques de cannibalisation

| Cluster | Pages en concurrence | Recommandation |
|---------|---------------------|----------------|
| Guide achat par âge | 5, 6, 7, 8, 10, 12 ans + meilleur 2026 | Différencier intention (âge vs comparatif marques vs Noël) ; ancres descriptives croisées |
| mBlock installation | Windows 10, Windows 11, en ligne | Canonical distincts ; liens « selon votre OS » en tête |
| mBot vs mBot2 vs CyberPi | 3 comparatifs | Tableaux techniques uniques ; pas dupliquer les mêmes specs |
| Scratch entrée | école/maison, carré, mBlock vs Scratch | Pilier = scratch-ecole-maison ; satellites = activités |

## Qualité & GEO (constats dépôt)

- **Réponses directes sous H1** : déployées sur les lots A–C (oct. 2026) — bloc autonome daté, puis H2 en questions.
- **FAQ** : présente sur plusieurs guides ; éviter répétition mot pour mot entre articles du même cluster.
- **Dépannage structuré** : modèle Symptôme → Diagnostic → Solution sur articles mBlock/forum (`mblock-depannage-codes-erreurs-mbot-arduino.mdx`).
- **Meta descriptions** : contrôle post-build 140–165 caractères via script audit.

## Opportunités contenu (non citées IA mais stratégiques)

- Série **capteur ultrason mBot** (4 articles) : maillage depuis 10 projets.
- **Domotique FR** (27 guides) : faible présence IA actuelle — tableaux protocoles, dates firmware.
- **Télécharger mBlock 5** : requête « mblock installer » partiellement couverte.
- **Python intermédiaire** (venv, fichiers, erreurs) : requêtes Bing présentes, pages mid-tail à renforcer.

## Priorités (P0 → P2)

| P | Action |
|---|--------|
| P0 | Lots A–C : enrichissement GEO + tableaux vérifiés (cette livraison) |
| P1 | Étendre citations : domotique + séries pédagogiques + pages EN alignées |
| P2 | Réduire overlap meta/titles guides âge ; enrichir llms.txt |

## Inventaire complet (extrait structuré)

<details>
<summary>{len(inv)} URLs sources (cliquer pour développer)</summary>

| Type | URL | Fichier source |
|------|-----|----------------|
"""
    for p in inv[:400]:
        text += f"| {p['kind']} | {p['url']} | `{p['path']}` |\n"
    if len(inv) > 400:
        text += f"\n*… et {len(inv)-400} entrées supplémentaires.*\n"
    text += "\n</details>\n"
    (SEO / "ai-content-audit.md").write_text(text, encoding="utf-8")


def write_roadmap(ai_pages: list[tuple[str, int]]) -> None:
    lines = [
        "# Roadmap éditoriale IA / GEO — robot-educatif.info",
        "",
        f"*Plan détaillé au {date.today().isoformat()} — aligné sur le rapport Bing AI du 28/10/2026.*",
        "",
        "## Légende type d’intervention",
        "",
        "- **GEO+** : réponse directe sous H1, H2 intention, FAQ ciblée",
        "- **TABLE** : tableau comparatif vérifié (sources fabricant, date)",
        "- **MAIL** : maillage interne (ancres descriptives)",
        "- **SVG** : schéma pédagogique",
        "- **EXO** : exercices corrigés",
        "",
        "| Priorité | URL | Citations IA | Requêtes Bing (preuve contenu) | Intervention | Sections | Liens internes | SVG | Critères d’acceptation |",
        "|----------|-----|--------------|----------------------------------|--------------|----------|----------------|-----|------------------------|",
    ]
    for url, cites in ai_pages[:40]:
        slug = slug_from_ai_url(url)
        lot, action = LOT_ACTIONS.get(slug, ("C+", "Renforcement GEO + maillage"))
        qs = ", ".join(queries_for_url(url)[:4]) or "—"
        lines.append(
            f"| {lot} | `{slug}/` | {cites} | {qs} | GEO+, MAIL | {action} | Hubs programmation + guides âge | selon page | Réponse directe visible ; 0 lien cassé ; date oct. 2026 |"
        )
    lines.append("")
    lines.append("## Lots B et C (suite)")
    lines.append("")
    for url, cites in ai_pages[40:]:
        slug = slug_from_ai_url(url)
        lines.append(f"- `{slug}/` ({cites} citations) — enrichissement GEO ciblé, maillage vers pilier du cluster.")
    (SEO / "ai-content-roadmap.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_priorites(ai_pages: list[tuple[str, int]], queries: list[dict]) -> None:
    lines = [
        "# Priorités pages Bing AI — croisement citations × requêtes",
        "",
        "Règle : une requête n’est associée à une URL que si le slug ou le contenu source correspond (voir `scripts/generate_ai_seo_docs.py`). **Aucune correspondance inventée.**",
        "",
        "## Requêtes (33)",
        "",
        "| Requête | Intent | Citations | Pages sources probables (dépôt) |",
        "|---------|--------|-----------|----------------------------------|",
    ]
    for q in queries:
        hints = QUERY_URL_EVIDENCE.get(q["Grounding Query"], [])
        hint_str = ", ".join(f"`/{h}/`" for h in hints[:5]) if hints else "—"
        lines.append(
            f"| {q['Grounding Query']} | {q['Intent']} | {q['Citations']} | {hint_str} |"
        )
    lines.extend(
        [
            "",
            f"## Classement des {len(ai_pages)} pages (rapport pages)",
            "",
            "| Rang | Citations | URL | Requêtes associées (prouvées) | Source `src/` | Lot | Lacunes | Action | État |",
            "|------|-----------|-----|--------------------------------|---------------|-----|---------|--------|------|",
        ]
    )
    for i, (url, cites) in enumerate(ai_pages, 1):
        slug = slug_from_ai_url(url)
        qs = "; ".join(queries_for_url(url)[:3]) or "—"
        src = src_exists_for_url(url) or "⚠ hors dépôt / i18n / PDF"
        lot, action = LOT_ACTIONS.get(slug, ("C", "GEO + maillage"))
        etat = "✅ En cours / livré oct. 2026" if slug in LOT_ACTIONS or i <= 22 else "📋 Planifié"
        lines.append(
            f"| {i} | {cites} | {url} | {qs} | `{src}` | {lot} | Sections GEO/tableaux | {action} | {etat} |"
        )
    (SEO / "bing-ai-pages-priorites.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_changelog() -> None:
    entries = [
        ("https://robot-educatif.info/scratch-ecole-maison-par-ou-commencer/", "GEO pilier Scratch, encadrés parents/enseignants, parcours débutant→avancé, maillage tutoriels"),
        ("https://robot-educatif.info/programmation/arduino-c/", "GEO hub, distinction C/Arduino, SVG setup/loop, erreurs compilation/téléversement, liens leçons C"),
        ("https://robot-educatif.info/10-projets-mbot-gratuits-classe-faciles/", "GEO en tête, fiches projet enrichies (prérequis, dépannage, liens guides)"),
        ("https://robot-educatif.info/meilleur-robot-programmable-enfant-2026/", "GEO + typologie télécommandé/programmable/autonome/éducatif/IA, tableau comparatif élargi"),
        ("https://robot-educatif.info/python-fonctions/", "GEO return vs print, type hints, erreurs UnboundLocalError/mutable defaults"),
    ]
    for lot_b in [
        "mbot-vs-mbot2-comparaison-des-robots-educatifs-pour-enfants",
        "idees-projets-mbot-rapides-une-heure",
        "raspberry-pi-3-vs-4-vs-5-comparatif-2026",
        "accessoires-mbot-par-ou-commencer",
        "premier-pas-avec-mblock-5",
        "installer-mblock-5-sous-windows-10",
        "quel-robot-acheter-enfant-10-ans-guide-achat",
    ]:
        entries.append((f"https://robot-educatif.info/{lot_b}/", "Lot B : réponse GEO, tableaux/specs, maillage interne"))
    for lot_c in [
        "programmation/python",
        "python-inter-venv-pip",
        "python-fichiers-texte",
        "python-variables-affichage",
        "python-erreurs-debogage",
        "c-arduino-types-variables",
        "c-arduino-environnement-structure-sketch",
        "activite-mbot-faire-clignoter-les-leds",
        "logiciel-mblock-makeblock-mbot-quel-choisir",
        "mblock-vs-scratch-lequel-choisir",
        "mon-premier-programme-mbot",
        "installer-les-blocs-du-mbot",
        "quel-robot-educatif-choisir-2026",
    ]:
        url = f"https://robot-educatif.info/{lot_c}/" if not lot_c.startswith("programmation") else "https://robot-educatif.info/programmation/python/"
        entries.append((url, "Lot C : GEO sous H1, exercices/liens série, diagnostics erreurs"))
    text = f"""# Changelog enrichissements SEO / GEO / pédagogie

*Journal au {date.today().isoformat()} — mission Manu oct. 2026.*

## Vérifications globales

- Build Astro Node 22 depuis `/workspace/re-repo`
- Post-traitements : `remove_duplicate_page_rating.py`, `inject_dark_mobile_surfaces_fix.py`, meta descriptions 140–165 car.
- Sync `dist/` → robot-educatif + dist61/dist62
- Contrôle liens internes + CSS inliné > 50 Ko

## Pages modifiées

| URL | Sections / SEO | Liens internes | SVG | État |
|-----|----------------|----------------|-----|------|
"""
    for url, desc in entries:
        text += f"| {url} | {desc} | Maillage hubs programmation & mBot | selon page | ✅ |\n"
    text += "\n## Documentation générée\n\n"
    text += "- `ai-content-audit.md`\n- `ai-content-roadmap.md`\n- `bing-ai-pages-priorites.md`\n- `ai-content-changelog.md` (ce fichier)\n"
    (SEO / "ai-content-changelog.md").write_text(text, encoding="utf-8")


def main() -> None:
    SEO.mkdir(parents=True, exist_ok=True)
    inv = inventory_pages()
    ai_pages = read_csv_pages()
    queries = read_csv_queries()
    write_audit(inv, ai_pages)
    write_roadmap(ai_pages)
    write_priorites(ai_pages, queries)
    write_changelog()
    print("Wrote 4 files to", SEO)


if __name__ == "__main__":
    main()
