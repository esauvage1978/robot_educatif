#!/usr/bin/env python3
"""Injecte dark-mobile-surfaces-fix dans tous les HTML dist robot-educatif."""
from __future__ import annotations

import re
from pathlib import Path

STYLE_ID = "dark-mobile-surfaces-fix-2026-10-28"
CSS_PATH = Path(__file__).resolve().parents[1] / "src/styles/dark-mobile-surfaces-fix.css"
DIST_DIRS = [
    Path("/workspace/re-repo/dist"),
    Path("/workspace/robot-educatif/dist-v16"),
    Path("/workspace/robot-educatif/dist"),
    Path("/workspace/robot-educatif/dist61"),
    Path("/workspace/robot-educatif/dist62"),
    Path("/workspace/robot-educatif/dist16"),
    Path("/workspace/robot-educatif/dist17"),
    Path("/workspace/robot-educatif/dist-v17"),
]

_STYLE_RE = re.compile(
    rf'<style\s+id="{re.escape(STYLE_ID)}"[^>]*>.*?</style>',
    re.I | re.S,
)


def inject(html: str, css: str) -> tuple[str, bool]:
    tag = f'<style id="{STYLE_ID}">{css.strip()}</style>'
    if _STYLE_RE.search(html):
        new = _STYLE_RE.sub(tag, html, count=1)
        return new, new != html
    if re.search(r"</head>", html, re.I):
        new = re.sub(r"</head>", tag + "</head>", html, count=1, flags=re.I)
        return new, True
    return html, False


def main() -> None:
    css = CSS_PATH.read_text(encoding="utf-8")
    total = 0
    changed = 0
    for dist in DIST_DIRS:
        if not dist.is_dir():
            print(f"SKIP missing {dist}")
            continue
        site_changed = 0
        for p in dist.rglob("*.html"):
            if not p.is_file():
                continue
            total += 1
            orig = p.read_text(encoding="utf-8", errors="replace")
            new, did = inject(orig, css)
            if did:
                p.write_text(new, encoding="utf-8")
                site_changed += 1
                changed += 1
        print(f"{dist}: {site_changed} pages mises à jour")
    print(f"TOTAL html={total} patched={changed}")


if __name__ == "__main__":
    main()
