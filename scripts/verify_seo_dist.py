#!/usr/bin/env python3
"""Audit SEO technique sur dist/*.html (canonical, hreflang, trackers)."""
from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

DIST = Path("/workspace/robot-educatif/dist")
OUT = Path("/workspace/robot-educatif/audit/seo-dist-scan.json")

CANONICAL_RE = re.compile(r'<link[^>]+rel=["\']canonical["\'][^>]*>', re.I)
HREFLANG_RE = re.compile(r'<link[^>]+rel=["\']alternate["\'][^>]+hreflang=', re.I)
AFFILIATE_CLICK_RE = re.compile(r"affiliate_click", re.I)
MNZ_RE = re.compile(r"mnz-click-v1")
PR_WIDGET_RE = re.compile(r'id=["\']pr-widget["\']')


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.canonicals: list[str] = []
        self.hreflangs: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "link":
            return
        d = {k.lower(): (v or "") for k, v in attrs}
        rel = d.get("rel", "")
        if rel == "canonical":
            href = d.get("href", "")
            if "#" in href:
                self.canonicals.append(href)
            else:
                self.canonicals.append(href)
        if rel == "alternate" and d.get("hreflang"):
            self.hreflangs.append((d.get("hreflang", ""), d.get("href", "")))


def scan_file(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="replace")
    parser = LinkCollector()
    try:
        parser.feed(text)
    except Exception:
        pass
    canon = parser.canonicals
    issues: list[str] = []
    if len(canon) == 0:
        issues.append("canonical_missing")
    elif len(canon) > 1:
        issues.append("canonical_duplicate")
    for c in canon:
        if "#" in c:
            issues.append("canonical_has_fragment")
    ac = len(AFFILIATE_CLICK_RE.findall(text))
    mnz = len(MNZ_RE.findall(text))
    prw = len(PR_WIDGET_RE.findall(text))
    if ac > 1:
        issues.append(f"affiliate_click_script_x{ac}")
    if mnz > 1:
        issues.append(f"mnz_click_v1_x{mnz}")
    if prw > 1:
        issues.append(f"pr_widget_x{prw}")
    aff_amz = len(re.findall(r'rel=["\'][^"\']*sponsored[^"\']*["\']', text, re.I))
    aff_amz_links = len(re.findall(r'href=["\']https://www\.amazon\.[^"\']+["\']', text, re.I))
    return {
        "path": str(path.relative_to(DIST)),
        "canonical_count": len(canon),
        "hreflang_count": len(parser.hreflangs),
        "issues": issues,
        "affiliate_amazon_links": aff_amz_links,
    }


def main() -> int:
    if not DIST.is_dir():
        print(f"Missing {DIST}", file=sys.stderr)
        return 1
    html_files = list(DIST.rglob("index.html"))
    rows = [scan_file(p) for p in html_files]
    bad = [r for r in rows if r["issues"]]
    summary = {
        "html_pages": len(rows),
        "pages_with_issues": len(bad),
        "canonical_ok": sum(1 for r in rows if r["canonical_count"] == 1 and "canonical_has_fragment" not in r["issues"]),
        "issue_samples": bad[:40],
    }
    OUT.write_text(json.dumps({"summary": summary, "rows": rows}, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))
    return 0 if not any(
        i.startswith(("canonical_duplicate", "affiliate_click_script", "mnz_click_v1_x", "pr_widget_x"))
        for r in bad
        for i in r["issues"]
    ) else 1


if __name__ == "__main__":
    sys.exit(main())
