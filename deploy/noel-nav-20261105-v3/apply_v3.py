#!/usr/bin/env python3
"""Assemble v3 HTML: sticky nav (v2) + hand-written section prose."""
from __future__ import annotations

import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BASE = ROOT / "index.base.html"
OUT = ROOT / "index.html"

# Reuse nav patch from v2 (no list merge)
sys.path.insert(0, str(ROOT))
from patch_nav_only import patch_nav, count_go_links  # noqa: E402

SECTION_FILES = [
    "age.html",
    "budget.html",
    "faq.html",
    "erreurs.html",
    "commander.html",
    "achat.html",
    "recap.html",
]

MARKER_AGE = '<h2 id="nos-recommandations-par-âge">'
MARKER_TAIL = '<div class="share-buttons"'


def main() -> None:
    html = BASE.read_text(encoding="utf-8")
    go_before = count_go_links(html)

    start = html.index(MARKER_AGE)
    tail = html.index(MARKER_TAIL, start)
    head = html[:start]
    tail_html = html[tail:]

    body = "".join((ROOT / "sections" / name).read_text(encoding="utf-8") for name in SECTION_FILES)
    html = head + body + tail_html
    html = patch_nav(html)

    go_after = count_go_links(html)
    if go_before != go_after:
        raise SystemExit(f"/go/ multiset mismatch:\n  before {go_before}\n  after  {go_after}")

    OUT.write_text(html, encoding="utf-8")
    sha = hashlib.sha256(html.encode()).hexdigest()
    meta = {
        "sha256": sha,
        "go_unique": len(go_after),
        "go_total": sum(go_after.values()),
    }
    (ROOT / "build_meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
