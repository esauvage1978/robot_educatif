#!/usr/bin/env python3
"""Enrichit les meta descriptions trop courtes dans dist/ (HTML statique, ex. /uk/, /ca/)."""
from __future__ import annotations

import os
import re
from html import escape, unescape

DIST_ROOTS = [
    "/workspace/re-repo/dist",
    "/workspace/robot-educatif/dist",
    "/workspace/robot-educatif/dist16",
    "/workspace/re-repo/dist61",
    "/workspace/re-repo/dist62",
]

MIN_LEN = 140
TARGET_MIN = 148
MAX_LEN = 160
HARD_MAX = 165

META_DESC_RE = re.compile(
    r'(<meta name="description" content=")([^"]*)(")',
    re.I,
)
OG_DESC_RE = re.compile(
    r'(<meta property="og:description" content=")([^"]*)(")',
    re.I,
)
TW_DESC_RE = re.compile(
    r'(<meta name="twitter:description" content=")([^"]*)(")',
    re.I,
)
TITLE_RE = re.compile(r"<title>([^<]+)</title>", re.I)


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "")).strip()


def truncate_words(text: str, max_len: int) -> str:
    if len(text) <= max_len:
        return text
    cut = text[:max_len]
    sp = cut.rfind(" ")
    if sp > max_len - 24:
        cut = cut[:sp]
    return cut.rstrip(" ,.;:!—–-").strip()


def enrich(desc: str, title: str, path: str) -> str:
    d = normalize(desc)
    if MIN_LEN <= len(d) <= HARD_MAX:
        return d
    is_en = path.startswith(("uk/", "ca/", "en/")) or "/uk/" in path or "/ca/" in path
    if len(d) < MIN_LEN:
        if not d and title:
            d = normalize(title.replace(" — ROBOT éducatif", "").replace(" | ROBOT éducatif", ""))
        if is_en:
            suffixes = [
                " Practical guides, comparisons and tutorials on robot-educatif.info.",
                " Step-by-step tips for teachers and parents on robot-educatif.info.",
            ]
        else:
            suffixes = [
                " Tutoriels, comparatifs et guides pratiques sur robot-educatif.info.",
                " Conseils robotique et programmation pour la maison et la classe.",
            ]
        for suf in suffixes:
            if len(d) >= TARGET_MIN:
                break
            cand = normalize(d + suf)
            d = truncate_words(cand, MAX_LEN) if len(cand) > MAX_LEN else cand
    if len(d) > HARD_MAX:
        d = truncate_words(d, MAX_LEN)
    while len(d) < MIN_LEN and title:
        extra = " robot-educatif.info." if is_en else " — robot-educatif.info."
        d = truncate_words(normalize(d + extra), MAX_LEN)
        break
    return d


def patch_file(path: str) -> bool:
    html = open(path, encoding="utf-8", errors="ignore").read()
    if "Redirecting to:" in html[:800]:
        return False
    m_desc = META_DESC_RE.search(html)
    if not m_desc:
        return False
    raw_desc = unescape(m_desc.group(2))
    rel = path
    for root in DIST_ROOTS:
        if path.startswith(root):
            rel = os.path.relpath(path, root)
            break
    title_m = TITLE_RE.search(html)
    title = unescape(title_m.group(1)) if title_m else ""
    new_desc = enrich(raw_desc, title, rel.replace("\\", "/"))
    if new_desc == raw_desc:
        return False
    esc = escape(new_desc, quote=True)
    out = META_DESC_RE.sub(rf"\1{esc}\3", html, count=1)
    if OG_DESC_RE.search(out):
        out = OG_DESC_RE.sub(rf"\1{esc}\3", out, count=1)
    if TW_DESC_RE.search(out):
        out = TW_DESC_RE.sub(rf"\1{esc}\3", out, count=1)
    open(path, "w", encoding="utf-8").write(out)
    return True


def main() -> None:
    for root in DIST_ROOTS:
        if not os.path.isdir(root):
            continue
        patched = 0
        for dirpath, _, files in os.walk(root):
            if "index.html" not in files:
                continue
            p = os.path.join(dirpath, "index.html")
            if patch_file(p):
                patched += 1
        print(f"{root}: {patched} fichiers enrichis")


if __name__ == "__main__":
    main()
