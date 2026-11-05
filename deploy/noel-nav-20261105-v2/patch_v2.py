#!/usr/bin/env python3
"""Passe 2 : sticky sommaire v2 + prose naturelle (sections listes IA)."""
from __future__ import annotations

import hashlib
import json
import re
from collections import Counter
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = Path(__file__).resolve().parent
PATH = ROOT / "index.html"
BEFORE = ROOT / "index.html.before"

NEW_NAV_CSS = r'''<style data-noel-nav-fix="1">:root{--guide-sticky-top:5.5rem;--guide-sticky-gap:0.75rem;--guide-scroll-offset:6.5rem}.page-layout--with-sidebar,.page-layout.page-layout--with-sidebar{grid-template-columns:minmax(0,1fr) minmax(240px,300px)}.page-layout--with-sidebar>.guide-sidebar,.page-layout--with-sidebar>[data-guide-sidebar],aside.guide-sidebar,.guide-sidebar.guide-sidebar{position:static!important;top:auto!important;max-height:none!important;overflow:visible!important;align-self:start}.guide-sidebar{display:grid;gap:1rem;min-width:0}.guide-sidebar__box{background:var(--surface-2);border:1px solid var(--surface-border);border-radius:12px;padding:1rem 1.05rem;box-sizing:border-box;min-width:0}.guide-sidebar__title{margin:0 0 .65rem;font-size:1rem;line-height:1.3;font-family:var(--font-heading,system-ui,sans-serif)}.guide-sidebar__title--plain{margin-bottom:.75rem}.guide-sidebar__toc-toggle{display:flex;align-items:center;justify-content:space-between;gap:.5rem;width:100%;margin:0;padding:0;border:0;background:transparent;font:inherit;font-weight:700;color:rgb(var(--black));cursor:pointer;text-align:left}.guide-sidebar__toc-toggle:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}.guide-sidebar__toc-toggle-icon{flex-shrink:0;font-size:.85rem;opacity:.75;transition:transform .15s ease}.guide-sidebar__box--quick:not(.is-toc-collapsed) .guide-sidebar__toc-toggle-icon{transform:rotate(180deg)}.guide-sidebar__toc-list{list-style:none;margin:0;padding:0;display:grid;gap:.12rem}.guide-sidebar__toc-list a{display:block;padding:.28rem 0 .28rem .55rem;border-left:3px solid transparent;color:var(--accent-dark);font-weight:600;font-size:.88rem;line-height:1.35;text-decoration:none;overflow-wrap:anywhere}.guide-sidebar__toc-list a:hover{color:var(--accent-warm)}.guide-sidebar__toc-list a.is-active{border-left-color:var(--accent);background:color-mix(in oklab,var(--accent) 10%,transparent);font-weight:800;color:rgb(var(--black))}.guide-sidebar__read-also{display:grid;gap:.65rem}.guide-sidebar__read-also a{display:flex;gap:.65rem;align-items:center;text-decoration:none;color:rgb(var(--gray-dark));font-weight:600;font-size:.88rem;line-height:1.35}.guide-sidebar__read-also img{flex-shrink:0;border-radius:8px;border:1px solid var(--surface-border)}@media(max-width:1023px){.guide-sidebar__box--quick{position:static!important;max-height:none!important;padding:.75rem .85rem}.guide-sidebar__box--quick.is-toc-collapsed .guide-sidebar__toc{display:none}.guide-sidebar__toc-toggle{cursor:pointer}}@media(min-width:1024px){.guide-sidebar__box--quick{position:sticky;top:var(--guide-sticky-top);z-index:40;max-height:calc(100vh - var(--guide-sticky-top) - var(--guide-sticky-gap));display:flex;flex-direction:column;min-height:0;overflow:hidden}.guide-sidebar__box--quick .guide-sidebar__title{flex:0 0 auto}.guide-sidebar__box--quick .guide-sidebar__toc{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.guide-sidebar__toc-toggle{cursor:default}.guide-sidebar__toc-toggle-icon{display:none}.guide-sidebar__box--quick.is-toc-collapsed .guide-sidebar__toc{display:block}}.prose h2[id],article h2[id]{scroll-margin-top:var(--guide-scroll-offset,6.5rem)}</style>'''

NEW_TOC_JS = r'''<script type="module">(()=>{const root=document.documentElement;const syncLayoutMetrics=()=>{const hdr=document.querySelector(".site-header");const top=hdr?Math.ceil(hdr.getBoundingClientRect().height)+12:88;root.style.setProperty("--guide-sticky-top",top+"px");root.style.setProperty("--guide-scroll-offset",top+16+"px")};syncLayoutMetrics();window.addEventListener("resize",syncLayoutMetrics,{passive:!0});const SKIP=/^(aqf-t|navigation-rapide|quick-navigation|schnelle-navigation|navigazione-rapida|navegación-rápida|pr-title|pr-widget)$/i,navRoot=document.querySelector("[data-guide-toc]");if(!navRoot)return;const list=navRoot.querySelector("[data-guide-toc-list]"),empty=navRoot.querySelector("[data-guide-toc-empty]"),quickBox=navRoot.closest(".guide-sidebar__box--quick")||navRoot.closest(".guide-sidebar__box"),toggle=quickBox&&quickBox.querySelector("[data-guide-toc-toggle]");if(!list)return;const prose=document.querySelector(".page-layout--with-sidebar article .prose")||document.querySelector("article .prose")||document.querySelector("article");if(!prose)return;const heads=Array.from(prose.querySelectorAll("h2[id]")).filter(h=>{const id=h.id||"";return id&&!SKIP.test(id)&&!h.closest(".guide-sidebar")});if(!heads.length){empty&&(empty.hidden=!1);return}empty&&(empty.hidden=!0);const links=[];for(const h of heads){const li=document.createElement("li"),a=document.createElement("a");a.href="#"+h.id,a.textContent=(h.textContent||"").replace(/\s+/g," ").trim(),li.appendChild(a),list.appendChild(li),links.push(a)}links.forEach(a=>{a.textContent=(a.textContent||"").replace(/^\d+[\.)]\s*/,"").trim()});const mq=window.matchMedia("(max-width: 1023px)");const setCollapsed=c=>{if(!quickBox)return;quickBox.classList.toggle("is-toc-collapsed",c);toggle&&toggle.setAttribute("aria-expanded",c?"false":"true")};const syncCollapse=()=>{if(!toggle)return;mq.matches?setCollapsed(!0):setCollapsed(!1)};if(toggle){toggle.addEventListener("click",()=>{if(!mq.matches)return;setCollapsed(!quickBox.classList.contains("is-toc-collapsed"))});toggle.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle.click()}});syncCollapse();mq.addEventListener("change",syncCollapse)}const scrollLine=()=>{const v=getComputedStyle(root).getPropertyValue("--guide-scroll-offset").trim();const n=parseFloat(v);return Number.isFinite(n)?n:110};const setActive=id=>{links.forEach(a=>{a.classList.toggle("is-active",id!==null&&a.getAttribute("href")==="#"+id)})},positions=()=>heads.map(h=>({id:h.id,top:h.getBoundingClientRect().top+window.scrollY}));let ticking=!1;const onScroll=()=>{ticking||(ticking=!0,requestAnimationFrame(()=>{ticking=!1;const y=window.scrollY+scrollLine(),pos=positions();let cur=pos[0]?.id??null;for(const p of pos)if(p.top<=y+2)cur=p.id;else break;setActive(cur)}))};window.addEventListener("scroll",onScroll,{passive:!0});onScroll()})();</script>'''

PROSE_H2_START = "nos-recommandations-par-âge"
PROSE_H2_END = "récapitulatif--nos-recommandations-par-profil"

SKIP_LIST_ANCESTORS = {"product-box", "pros-cons", "pros", "cons", "tableau", "follow-links"}


def count_go_links(html: str) -> Counter:
    return Counter(re.findall(r'href="(/go/[^"]+)"', html))


def count_lists_in_prose(html: str) -> tuple[int, int]:
    soup = BeautifulSoup(html, "html.parser")
    prose = soup.select_one("article .prose") or soup.select_one("article")
    if not prose:
        return 0, 0
    ul = ol = 0
    for tag in prose.find_all(["ul", "ol"]):
        ul += tag.name == "ul"
        ol += tag.name == "ol"
    return ul, ol


def inner_html(el: Tag) -> str:
    return "".join(str(c) for c in el.contents)


def li_plain(li: Tag) -> str:
    text = li.get_text(" ", strip=True)
    text = re.sub(r"\s+", " ", text)
    return text


def merge_list_to_paragraph(list_tag: Tag) -> Tag | None:
    lis = list_tag.find_all("li", recursive=False)
    if not lis:
        return None
    for li in lis:
        if li.find(["ul", "ol"]):
            return None
    items_html: list[str] = []
    for li in lis:
        raw = inner_html(li).strip()
        if not raw:
            continue
        if not re.search(r"[.!?…]$", raw):
            raw += "."
        items_html.append(raw)
    if not items_html:
        return None
    intro, intro_p = prev_intro_paragraph(list_tag)
    p = list_tag.parent.new_tag("p")
    if intro and intro_p:
        intro_p.decompose()
        intro_clean = intro.strip()
        if not intro_clean.endswith(":"):
            intro_clean += " :"
        chunk = BeautifulSoup(intro_clean + " " + " ".join(items_html), "html.parser")
    else:
        chunk = BeautifulSoup(" ".join(items_html), "html.parser")
    for node in list(chunk.contents):
        p.append(node.extract())
    return p


def prev_intro_paragraph(list_tag: Tag) -> tuple[str | None, Tag | None]:
    prev = list_tag.find_previous_sibling()
    while prev and isinstance(prev, NavigableString) and not str(prev).strip():
        prev = prev.previous_sibling
    if not isinstance(prev, Tag) or prev.name != "p":
        return None, None
    strong = prev.find("strong")
    if not strong:
        return None, None
    label = strong.get_text(strip=True).rstrip(":")
    rest = prev.get_text(" ", strip=True)
    if label and label in rest:
        intro = rest.replace(label, label.rstrip(":"), 1).strip()
        if intro.endswith(":"):
            intro = intro[:-1].strip() + " :"
        elif not intro.endswith(":"):
            intro = label + " :"
        return intro, prev
    return None, None


def in_skip_container(tag: Tag) -> bool:
    for parent in tag.parents:
        if not isinstance(parent, Tag):
            continue
        classes = parent.get("class") or []
        if SKIP_LIST_ANCESTORS.intersection(classes):
            return True
        if parent.name in ("nav", "aside"):
            return True
    return False


def rewrite_prose_lists(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    prose = soup.select_one("article .prose") or soup.select_one("article")
    if not prose:
        return html
    start_h2 = prose.find("h2", id=PROSE_H2_START)
    follow = prose.find(class_="follow-links")
    if not start_h2:
        return str(soup)

    in_section = False
    to_process: list[Tag] = []
    for node in prose.descendants:
        if node is start_h2:
            in_section = True
            continue
        if not in_section or not isinstance(node, Tag):
            continue
        if follow is not None and (node is follow or follow in node.parents):
            break
        if node.name not in ("ul", "ol"):
            continue
        if in_skip_container(node):
            continue
        if node.find_parent(["ul", "ol"]) is not None:
            continue
        to_process.append(node)

    for list_tag in to_process:
        if list_tag.name == "ol":
            continue
        p = merge_list_to_paragraph(list_tag)
        if p is not None:
            list_tag.replace_with(p)

    # FAQ ordered troubleshooting: convert ol to prose paragraph
    for ol in prose.find_all("ol"):
        if in_skip_container(ol) or ol.find_parent(class_="pros-cons"):
            continue
        prev = ol.find_previous("h3")
        if prev and "dépannage" in (prev.get_text() or "").lower():
            items = [li_plain(li) for li in ol.find_all("li", recursive=False)]
            if items:
                text = "Commencez par vérifier, dans l'ordre : " + " ; ".join(
                    i.rstrip(".") for i in items
                ) + "."
                new_p = soup.new_tag("p")
                new_p.string = text
                ol.replace_with(new_p)

    # Recap final checklist ol -> paragraph
    recap_h2 = prose.find("h2", id=PROSE_H2_END)
    if recap_h2:
        ol = recap_h2.find_next("ol")
        if ol and not in_skip_container(ol):
            items = [li_plain(li) for li in ol.find_all("li", recursive=False)]
            if items:
                p = soup.new_tag("p")
                p.append(
                    NavigableString(
                        "Avant de valider le panier, repassez ces points : "
                        + " ".join(items)
                    )
                )
                ol.replace_with(p)

    return str(soup)


def patch_nav(html: str) -> str:
    if 'data-noel-nav-fix="1"' in html:
        html = re.sub(
            r'<style data-noel-nav-fix="1">.*?</style>',
            lambda _m: NEW_NAV_CSS,
            html,
            count=1,
            flags=re.S,
        )
    else:
        html = html.replace("</head>", NEW_NAV_CSS + "\n</head>", 1)
    html = re.sub(
        r'<script type="module">\(\(\)=>\{const SKIP=.*?\}\)\(\);</script>',
        lambda _m: NEW_TOC_JS,
        html,
        count=1,
        flags=re.S,
    )
    return html


def main() -> None:
    before_html = BEFORE.read_text(encoding="utf-8")
    html = PATH.read_text(encoding="utf-8")
    go_before = count_go_links(before_html)
    ul_b, ol_b = count_lists_in_prose(before_html)

    html = patch_nav(html)
    html = rewrite_prose_lists(html)

    go_after = count_go_links(html)
    ul_a, ol_a = count_lists_in_prose(html)

    if go_before != go_after:
        raise SystemExit(f"/go/ mismatch: before {go_before} after {go_after}")

    PATH.write_text(html, encoding="utf-8")
    sha = hashlib.sha256(html.encode()).hexdigest()

    revue = ROOT / "REVUE_PROSE.md"
    revue.write_text(
        f"""# Revue prose — passe 2

## Listes dans le corps article (hors cartes produits / tableaux / pros-cons)

| Métrique | Avant (`index.html.before`) | Après |
|----------|----------------------------|-------|
| `<ul>` | {ul_b} | {ul_a} |
| `<ol>` | {ol_b} | {ol_a} |

## Liens `/go/`

Multiset identique : **{sum(go_before.values())}** liens ({len(go_before)} URLs uniques).

## Sticky sommaire

- Sidebar colonne : `position: static` (override live `top: 20px`).
- Boîte « Navigation rapide » seule : sticky avec `--guide-sticky-top` mesuré sur `.site-header`.
- `max-height: calc(100vh - top - gap)` + scroll interne sur `.guide-sidebar__toc`.
- Mobile : repliable (`is-toc-collapsed`), pas de sticky.

## SHA256 `index.html`

`{sha}`
""",
        encoding="utf-8",
    )

    meta = {
        "sha256": sha,
        "go_count": sum(go_after.values()),
        "lists": {"ul_before": ul_b, "ol_before": ol_b, "ul_after": ul_a, "ol_after": ol_a},
    }
    (ROOT / "patch_meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
