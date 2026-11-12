#!/usr/bin/env python3
"""Remplace les liens /dp/B07XR98YYQ utilisés pour un produit autre que le mBot v1."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TAG = "manuso06-21"
MBOT_ASIN = "B07XR98YYQ"

SCAN_DIRS = [
    ROOT / "src" / "content" / "blog",
    ROOT / "src" / "pages",
]

DP_PATTERN = re.compile(
    rf"https://www\.amazon\.fr/dp/{MBOT_ASIN}\?tag={re.escape(TAG)}"
)
MD_LINK = re.compile(
    rf"\[([^\]]+)\]\(https://www\.amazon\.fr/dp/{MBOT_ASIN}\?tag={re.escape(TAG)}\)"
)


def search_url(query: str) -> str:
    from urllib.parse import quote_plus

    return f"https://www.amazon.fr/s?k={quote_plus(query)}&tag={TAG}"


def dp_url(asin: str) -> str:
    return f"https://www.amazon.fr/dp/{asin}?tag={TAG}"


def replacement_for_label(label: str) -> str | None:
    low = label.lower()
    if "mbot2" in low or "m bot2" in low:
        if "accessoire" in low or "option" in low:
            return search_url("mBot2 Makeblock accessoires mBuild")
        return dp_url("B0919F9CKS")
    if "cyberpi" in low:
        return dp_url("B0BBZY9L59")
    if "codey" in low or "rocky" in low:
        return dp_url("B07CGH8NZ7")
    if "ultimate" in low:
        return search_url("Makeblock mBot Ultimate 2.0")
    if "ohbot" in low:
        return search_url("Ohbot robot éducatif")
    if "ultrason" in low or "capteur" in low:
        return search_url("mBot Makeblock capteur ultrason")
    if "accessoire" in low and "mbot" in low:
        return search_url("mBot Makeblock accessoires capteur")
    # Liens génériques — ne pas envoyer vers le mBot v1
    generic_markers = (
        "robot éducatif",
        "robots éducatif",
        "programmable enfant",
        "scratch programmable",
        "sans écran",
        "par âge",
        "pas cher",
    )
    if any(m in low for m in generic_markers) and "mbot" not in low:
        q = label.replace("Amazon.fr", "").strip()
        return search_url(q or "robot éducatif programmable enfant")
    if "scratch" in low and "mbot" not in low:
        return search_url("robot éducatif Scratch programmable")
    # mBot v1 explicite — conserver
    if re.search(r"\bmbot\b", low) and "mbot2" not in low and "ultimate" not in low:
        return None
    if "makeblock mbot" in low or "mbot makeblock" in low or "mbot classique" in low:
        return None
    if "makeblock mbot" in low.replace(" ", ""):
        return None
    return None


def fix_text(text: str) -> tuple[str, int]:
    changes = 0

    def repl_md(m: re.Match[str]) -> str:
        nonlocal changes
        label, url = m.group(1), m.group(0)
        new = replacement_for_label(label)
        if new is None:
            return m.group(0)
        changes += 1
        return f"[{label}]({new})"

    out = MD_LINK.sub(repl_md, text)

    # asin="B07XR98YYQ" sur lignes mentionnant mBot2 / CyberPi / etc.
    lines = out.splitlines(keepends=True)
    new_lines: list[str] = []
    for i, line in enumerate(lines):
        if f'asin="{MBOT_ASIN}"' in line or f"asin='{MBOT_ASIN}'" in line:
            ctx = " ".join(lines[max(0, i - 8) : i + 8]).lower()
            new_asin = None
            if "productid=\"mbot2\"" in ctx.replace(" ", "") or "product id=\"mbot2\"" in ctx:
                new_asin = "B0919F9CKS"
            elif "productid=\"cyberpi\"" in ctx.replace(" ", ""):
                new_asin = "B0BBZY9L59"
            elif "productid=\"codey-rocky\"" in ctx.replace(" ", ""):
                new_asin = "B07CGH8NZ7"
            elif "mbot2" in ctx and "mbot vs" not in ctx and "mbot-vs" not in ctx:
                if 'productid="mbot"' not in ctx and "makeblock mbot v1" not in ctx:
                    new_asin = "B0919F9CKS"
            if new_asin:
                line = line.replace(MBOT_ASIN, new_asin)
                changes += 1
        new_lines.append(line)
    return "".join(new_lines), changes


def main() -> int:
    total = 0
    for base in SCAN_DIRS:
        if not base.is_dir():
            continue
        for path in base.rglob("*"):
            if path.suffix not in {".md", ".mdx", ".astro"}:
                continue
            if path.name == "codes-promo.astro":
                continue
            before = path.read_text(encoding="utf-8")
            if MBOT_ASIN not in before:
                continue
            after, n = fix_text(before)
            if n:
                path.write_text(after, encoding="utf-8")
                print(f"{n:3d}  {path.relative_to(ROOT)}")
                total += n
    print(f"Total replacements: {total}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
