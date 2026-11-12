#!/usr/bin/env python3
"""Supprime le 2e bloc page-rating-v1 (doublon layout + ArticleQuestionForm) dans les HTML dist."""
from __future__ import annotations

import re
import sys
from pathlib import Path

BLOCK_RE = re.compile(
    r"<!-- page-rating-v1 -->.*?<!-- /page-rating-v1 -->",
    re.I | re.S,
)

DIST_DIRS = [
    Path("/workspace/re-repo/dist"),
    Path("/workspace/robot-educatif/dist"),
    Path("/workspace/robot-educatif/dist-v16"),
    Path("/workspace/robot-educatif/dist61"),
    Path("/workspace/robot-educatif/dist62"),
    Path("/workspace/robot-educatif/dist16"),
    Path("/workspace/robot-educatif/dist17"),
    Path("/workspace/robot-educatif/dist-v17"),
]


def dedupe_html(text: str) -> tuple[str, bool]:
    blocks = list(BLOCK_RE.finditer(text))
    if len(blocks) < 2:
        return text, False
    # Conserver le 1er bloc, retirer les suivants (ordre document)
    out = text
    for m in reversed(blocks[1:]):
        out = out[: m.start()] + out[m.end() :]
    return out, True


def main() -> int:
    changed_files = 0
    for dist in DIST_DIRS:
        if not dist.is_dir():
            print(f"SKIP {dist}")
            continue
        for path in dist.rglob("*.html"):
            raw = path.read_text(encoding="utf-8", errors="replace")
            if raw.count('id="pr-widget"') < 2:
                continue
            new, ok = dedupe_html(raw)
            if ok:
                path.write_text(new, encoding="utf-8")
                changed_files += 1
    print(f"Deduped page-rating in {changed_files} HTML files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
