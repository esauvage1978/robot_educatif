#!/usr/bin/env python3
"""Vérifie que le correctif contraste cartes sombres est injecté dans tous les HTML dist."""
from __future__ import annotations

import re
import sys
from pathlib import Path

STYLE_ID = "dark-mobile-surfaces-fix-2026-10-28"
REQUIRED_MARKERS = (
    "main .card:not(.card-light) p",
    "#cbd5e1 !important",
)

DIST_DIRS = [
    Path("/workspace/robot-educatif/dist-v16"),
    Path("/workspace/robot-educatif/dist"),
    Path("/workspace/robot-educatif/dist61"),
    Path("/workspace/robot-educatif/dist62"),
    Path("/workspace/robot-educatif/dist16"),
    Path("/workspace/robot-educatif/dist17"),
    Path("/workspace/robot-educatif/dist-v17"),
]

# Règles legacy dangereuses (texte sombre forcé sur toutes les cartes, sans scope clair)
BAD_PATTERNS = (
    re.compile(r"main\s+\.card:not\(\[class\*=\"dark\"\]\)\s*\{[^}]*color:\s*#0f172a", re.I),
    re.compile(
        r"html\[data-theme=\"dark\"\]\s+\.tableau\.empile[^}]*color:\s*#0f172a\s*!important",
        re.I,
    ),
)

DOMOTIQUE = Path("/workspace/robot-educatif/dist-v16/domotique/index.html")


def extract_style_blocks(html: str) -> str:
    return "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", html, re.I | re.S))


def check_html(path: Path) -> list[str]:
    issues: list[str] = []
    text = path.read_text(encoding="utf-8", errors="replace")
    if not re.search(r"</head>", text, re.I):
        return []  # redirects / stubs sans head
    if STYLE_ID not in text:
        issues.append(f"missing style id {STYLE_ID}")
        return issues
    block_match = re.search(
        rf'<style\s+id="{re.escape(STYLE_ID)}"[^>]*>(.*?)</style>',
        text,
        re.I | re.S,
    )
    if not block_match:
        issues.append("style tag with id not found")
        return issues
    block = block_match.group(1)
    for marker in REQUIRED_MARKERS:
        if marker not in block:
            issues.append(f"fix block missing marker: {marker!r}")
    styles = extract_style_blocks(text)
    for pat in BAD_PATTERNS:
        if pat.search(styles) and "html[data-theme='light'] main .card" not in styles:
            # dist peut encore contenir l'ancienne règle globale ; le fix injecté doit compenser
            if "main .card:not(.card-light) p" not in block:
                issues.append(f"legacy bad rule still uncompensated: {pat.pattern[:60]}")
    return issues


def main() -> int:
    total = 0
    failures: list[tuple[str, list[str]]] = []

    for dist in DIST_DIRS:
        if not dist.is_dir():
            print(f"SKIP missing {dist}")
            continue
        for html_path in sorted(dist.rglob("*.html")):
            total += 1
            issues = check_html(html_path)
            if issues:
                failures.append((str(html_path), issues))

    if DOMOTIQUE.is_file():
        domo_issues = check_html(DOMOTIQUE)
        print(f"domotique/index.html: {'OK' if not domo_issues else domo_issues}")
    else:
        print(f"WARN domotique sample missing: {DOMOTIQUE}")

    print(f"Scanned {total} HTML files across dist dirs")
    if failures:
        print(f"FAILURES: {len(failures)}")
        for path, iss in failures[:30]:
            print(f"  {path}: {', '.join(iss)}")
        if len(failures) > 30:
            print(f"  ... and {len(failures) - 30} more")
        return 1
    print("OK — correctif contraste cartes sombres présent partout")
    return 0


if __name__ == "__main__":
    sys.exit(main())
