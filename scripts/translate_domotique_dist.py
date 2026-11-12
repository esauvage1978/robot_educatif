#!/usr/bin/env python3
"""
Génère les versions EN/DE/IT/ES sous /{lang}/domotique/ à partir de dist61,
met à jour les hreflang sur les pages FR et ajoute les URLs au sitemap.
"""
from __future__ import annotations

import html
import json
import re
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist61"
SITE = "https://robot-educatif.info"
LANGS = ("en", "de", "it", "es")

AMAZON = {
    "fr": ("www.amazon.fr", "manuso06-21"),
    "en": ("www.amazon.co.uk", "roboteducatif-21"),
    "de": ("www.amazon.de", "roboteducat00-21"),
    "it": ("www.amazon.it", "roboteducat0f-21"),
    "es": ("www.amazon.es", "roboteducat07-21"),
}

LEGACY_HUB = {
    "en": "/en/smart-home/",
    "de": "/de/smart-home/",
    "it": "/it/domotica/",
    "es": "/es/domotica/",
}

RUB_SLUGS = {
    "debuter": ("getting-started-guides", "einstieg-ratgeber", "iniziare", "empezar"),
    "home-assistant": ("home-assistant", "home-assistant", "home-assistant", "home-assistant"),
    "esp32": ("esp32-projects", "esp32-projekte", "progetti-esp32", "proyectos-esp32"),
    "guides-achat": ("buying-guides", "kaufberatung", "guide-acquisto", "guias-de-compra"),
    "robots-aspirateurs": ("robot-vacuums", "saugroboter", "robot-aspirapolvere", "robots-aspiradores"),
}

TOOL_LEGACY = {
    "codes-erreurs-depannage-zigbee-home-assistant-shelly": {
        "en": "/en/smart-home/error-codes-troubleshooting-zigbee-home-assistant-shelly/",
        "de": "/de/smart-home/fehlercodes-stoerungen-zigbee-home-assistant-shelly/",
        "it": "/it/domotica/codici-errore-risoluzione-zigbee-home-assistant-shelly/",
        "es": "/es/domotica/codigos-error-solucion-zigbee-home-assistant-shelly/",
    },
    "pieces-detachees-capteurs-compatibles-moins-cher": {
        "en": "/en/smart-home/spare-parts-sensors-compatible-budget/",
        "de": "/de/smart-home/ersatzteile-sensoren-kompatible-guenstiger/",
        "it": "/it/domotica/ricambi-sensori-compatibili-economici/",
        "es": "/es/domotica/repuestos-sensores-compatibles-baratos/",
    },
    "matrice-compatibilite-home-assistant-homey-zigbee-matter": {
        "en": "/en/smart-home/compatibility-matrix-home-assistant-homey-zigbee-matter/",
        "de": "/de/smart-home/kompatibilitaetsmatrix-home-assistant-homey-zigbee-matter/",
        "it": "/it/domotica/matrice-compatibilita-home-assistant-homey-zigbee-matter/",
        "es": "/es/domotica/matriz-compatibilidad-home-assistant-homey-zigbee-matter/",
    },
}

# Pages outil / hub : même segment d’URL FR dans toutes les langues
STATIC_FR_SLUGS = (
    "configurateur-projet-domotique",
    "diagnostic-par-symptome",
    "tableau-raspberry-hat",
    "pieces-detachees-sav-domotique",
    "codes-erreurs-domotique",
)


def load_article_slugs() -> dict[str, dict[str, str]]:
    text = (ROOT / "src/lib/domotiqueI18n.mjs").read_text(encoding="utf-8")
    out: dict[str, dict[str, str]] = {}
    for m in re.finditer(r"'([^']+)':\s*\{([^}]+)\}", text):
        fr = m.group(1)
        block = m.group(2)
        loc = {}
        for lang in LANGS:
            mm = re.search(rf"{lang}:\s*'([^']+)'", block)
            if mm:
                loc[lang] = mm.group(1)
        if loc:
            out[fr] = loc
    return out


ARTICLE_SLUGS = load_article_slugs()


@dataclass(frozen=True)
class Page:
    key: str
    fr_path: str  # e.g. domotique/foo/index.html

    def fr_url(self) -> str:
        return path_to_url(self.fr_path)

    def lang_path(self, lang: str) -> str:
        if self.key == "hub":
            return f"{lang}/domotique/index.html"
        if self.key.startswith("rub:"):
            rub = self.key[4:]
            seg = RUB_SLUGS[rub][LANGS.index(lang)]
            return f"{lang}/domotique/rubrique/{seg}/index.html"
        fr_slug = self.fr_slug()
        if fr_slug in ARTICLE_SLUGS:
            seg = ARTICLE_SLUGS[fr_slug][lang]
            return f"{lang}/domotique/{seg}/index.html"
        return f"{lang}/domotique/{fr_slug}/index.html"

    def lang_url(self, lang: str) -> str:
        return f"{SITE}/{self.lang_path(lang).replace('/index.html', '/')}"

    def fr_slug(self) -> str:
        rel = self.fr_path.replace("domotique/", "").replace("/index.html", "")
        if rel.startswith("rubrique/"):
            return rel.split("/", 1)[1]
        return rel

def path_to_url(path: str) -> str:
    return f"{SITE}/{path.replace('/index.html', '/')}"


def build_pages() -> list[Page]:
    pages: list[Page] = [Page("hub", "domotique/index.html")]
    for fr_slug in ARTICLE_SLUGS:
        pages.append(Page(f"art:{fr_slug}", f"domotique/{fr_slug}/index.html"))
    for rub in RUB_SLUGS:
        pages.append(Page(f"rub:{rub}", f"domotique/rubrique/{rub}/index.html"))
    for slug in STATIC_FR_SLUGS:
        pages.append(Page(f"tool:{slug}", f"domotique/{slug}/index.html"))
    for slug in TOOL_LEGACY:
        if not any(p.fr_slug() == slug for p in pages):
            pages.append(Page(f"tool:{slug}", f"domotique/{slug}/index.html"))
    return pages


PAGES = build_pages()


def legacy_rel_path(url_path: str) -> str:
    """Convert URL path /en/smart-home/foo/ to dist relative path."""
    return url_path.strip("/") + "index.html"


def legacy_source(page: Page, lang: str) -> Path | None:
    fr_slug = page.fr_slug()
    if page.key == "hub":
        rel = f"{lang}/{'smart-home' if lang in ('en', 'de') else 'domotica'}/index.html"
        p = DIST / rel
        return p if p.is_file() else None
    if fr_slug in ARTICLE_SLUGS:
        seg = ARTICLE_SLUGS[fr_slug][lang]
        folder = "smart-home" if lang in ("en", "de") else "domotica"
        p = DIST / lang / folder / seg / "index.html"
        return p if p.is_file() else None
    if fr_slug in TOOL_LEGACY:
        p = DIST / legacy_rel_path(TOOL_LEGACY[fr_slug][lang])
        return p if p.is_file() else None
    return None


def hreflang_block(page: Page) -> str:
    links = [
        f'<link rel="alternate" hreflang="fr" href="{page.fr_url()}">',
    ]
    for lang in LANGS:
        links.append(f'<link rel="alternate" hreflang="{lang}" href="{page.lang_url(lang)}">')
    links.append(f'<link rel="alternate" hreflang="x-default" href="{page.fr_url()}">')
    return "".join(links)


def replace_hreflang(html: str, block: str) -> str:
    pat = re.compile(
        r'<link rel="alternate" hreflang="[^"]+" href="[^"]+">(?:\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">)*'
    )
    if pat.search(html):
        return pat.sub(block, html, count=1)
    return html.replace("</head>", block + "</head>", 1)


def set_canonical(html: str, url: str) -> str:
    html = re.sub(
        r'<link rel="canonical" href="[^"]+">',
        f'<link rel="canonical" href="{url}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:url" content="[^"]+">',
        f'<meta property="og:url" content="{url}">',
        html,
        count=1,
    )
    return html


def set_lang_attr(html: str, lang: str) -> str:
    return re.sub(r"<html lang=\"[^\"]+\"", f'<html lang="{lang}"', html, count=1)


def build_url_replacements() -> list[tuple[str, str]]:
    pairs: list[tuple[str, str]] = []
    for page in PAGES:
        fr = page.fr_url()
        pairs.append((fr, fr))
        for lang in LANGS:
            pairs.append((page.lang_url(lang), page.lang_url(lang)))
        for lang in LANGS:
            leg = legacy_source(page, lang)
            if leg:
                old = path_to_url(str(leg.relative_to(DIST)))
                pairs.append((old, page.lang_url(lang)))
    # Anciens hubs
    for lang, old_hub in LEGACY_HUB.items():
        pairs.append((f"{SITE}{old_hub}", f"{SITE}/{lang}/domotique/"))
    # Liens internes domotique FR -> localisés (articles)
    for fr_slug, loc in ARTICLE_SLUGS.items():
        fr_p = f"/domotique/{fr_slug}/"
        for lang in LANGS:
            pairs.append((fr_p, f"/{lang}/domotique/{loc[lang]}/"))
    for rub, loc in RUB_SLUGS.items():
        fr_p = f"/domotique/rubrique/{rub}/"
        for i, lang in enumerate(LANGS):
            pairs.append((fr_p, f"/{lang}/domotique/rubrique/{loc[i]}/"))
    for slug in STATIC_FR_SLUGS + tuple(TOOL_LEGACY.keys()):
        fr_p = f"/domotique/{slug}/"
        for lang in LANGS:
            pairs.append((fr_p, f"/{lang}/domotique/{slug}/"))
    pairs.append(("/domotique/", "/domotique/"))  # no-op anchor
    # Dédupliquer, plus long d'abord
    seen = set()
    out: list[tuple[str, str]] = []
    for a, b in sorted(pairs, key=lambda x: -len(x[0])):
        if a in seen or a == b:
            continue
        seen.add(a)
        out.append((a, b))
    return out


URL_REPLACEMENTS = build_url_replacements()


def apply_url_map(text: str, lang: str) -> str:
    for old, new in URL_REPLACEMENTS:
        text = text.replace(old, new)
    text = text.replace(LEGACY_HUB[lang], f"/{lang}/domotique/")
    folder = "smart-home" if lang in ("en", "de") else "domotica"
    text = text.replace(f"/{lang}/{folder}/", f"/{lang}/domotique/")
    return text


def localize_amazon(html: str, lang: str) -> str:
    host, tag = AMAZON[lang]

    def repl(m: re.Match[str]) -> str:
        url = m.group(0)
        url = re.sub(r"https?://www\.amazon\.[a-z.]+", f"https://{host}", url)
        if "tag=" in url:
            url = re.sub(r"tag=[^&\"']+", f"tag={tag}", url)
        elif "/dp/" in url or "/gp/" in url:
            url += ("&" if "?" in url else "?") + f"tag={tag}"
        return url

    return re.sub(r"https?://www\.amazon\.[a-z.]+[^\"'\s<>]*", repl, html)


_mt = None
_cache: dict[str, str] = {}


def _load_mt():
    global _mt
    if _mt is None:
        sys.path.insert(0, "/workspace/dom-i18n")
        import mt as mt_mod  # noqa: WPS433

        _mt = mt_mod
    return _mt


def translate_batch(texts: list[str], lang: str) -> list[str]:
    need = [t for t in texts if t and t not in _cache and f"{lang}|{t}" not in _cache]
    if need:
        mt = _load_mt()
        if lang == "it":
            en_parts = translate_batch(need, "en")
            it = mt.tr(en_parts, mt.NAMES["it"])
            for t, x in zip(need, it):
                _cache[f"it|{t}"] = x
        else:
            out = mt.tr(need, mt.NAMES[lang])
            for t, x in zip(need, out):
                _cache[f"{lang}|{t}"] = x
    return [_cache.get(f"{lang}|{t}", _cache.get(t, t)) for t in texts]


FRENCH_RE = re.compile(
    r"[àâäéèêëïîôùûüçœæÀÂÄÉÈÊËÏÎÔÙÛÜÇŒÆ]"
    r"|(?:\b(le|la|les|des|une|pour|avec|dans|votre|nous|vous|est|sont|pas|plus)\b)"
)


def looks_french(s: str) -> bool:
    if len(s.strip()) < 2:
        return False
    if not re.search(r"[A-Za-zÀ-ÿ]", s):
        return False
    return bool(FRENCH_RE.search(s))


def translate_json_values(obj: Any, lang: str) -> Any:
    if isinstance(obj, dict):
        return {k: translate_json_values(v, lang) for k, v in obj.items()}
    if isinstance(obj, list):
        return [translate_json_values(v, lang) for v in obj]
    if isinstance(obj, str) and looks_french(obj):
        return translate_batch([obj], lang)[0]
    return obj


def translate_fr_html(html_in: str, lang: str) -> str:
    """Traduction ciblée pour pages sans source i18n (outils, rubriques)."""
    strings: list[str] = []
    index: list[int] = []

    def collect(s: str) -> str:
        if looks_french(s):
            strings.append(s)
            index.append(len(strings) - 1)
            return f"\0TR{len(strings)-1}\0"
        return s

    # data-use-cases JSON (configurateur)
    def repl_use_cases(m: re.Match[str]) -> str:
        raw = html.unescape(m.group(1))
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return m.group(0)
        data = translate_json_values(data, lang)
        enc = html.escape(json.dumps(data, ensure_ascii=False), quote=True)
        return f'data-use-cases="{enc}"'

    html_in = re.sub(r'data-use-cases="([^"]+)"', repl_use_cases, html_in)

    # Attributs data-* / title / placeholder / aria-label
    def repl_attr(m: re.Match[str]) -> str:
        val = m.group(2)
        if not looks_french(val):
            return m.group(0)
        tr = translate_batch([val], lang)[0]
        return f'{m.group(1)}="{html.escape(tr, quote=True)}"'

    for attr in (
        "data-title",
        "data-ok",
        "data-err",
        "data-req",
        "data-sending",
        "data-send",
        "data-objet",
        "placeholder",
        "aria-label",
        "title",
        "alt",
    ):
        html_in = re.sub(rf'({attr})="([^"]*)"', repl_attr, html_in)

    # title / meta description
    def repl_title(m: re.Match[str]) -> str:
        t = translate_batch([m.group(1)], lang)[0]
        return f"<title>{html.escape(t)}</title>"

    html_in = re.sub(r"<title>([^<]+)</title>", repl_title, html_in, count=1)

    def repl_meta(m: re.Match[str]) -> str:
        t = translate_batch([m.group(1)], lang)[0]
        return f'<meta name="description" content="{html.escape(t, quote=True)}">'

    html_in = re.sub(
        r'<meta name="description" content="([^"]*)">', repl_meta, html_in, count=1
    )

    # Balises texte courtes
    for tag in ("h1", "h2", "h3", "th", "td", "button", "label", "option", "p", "li", "span"):
        pat = re.compile(rf"<{tag}([^>]*)>([^<]{{2,500}})</{tag}>")

        def repl_tag(m: re.Match[str], tag=tag) -> str:
            inner = m.group(2)
            if not looks_french(inner) or "<" in inner:
                return m.group(0)
            tr = translate_batch([inner], lang)[0]
            return f"<{tag}{m.group(1)}>{tr}</{tag}>"

        html_in = pat.sub(repl_tag, html_in)

    return html_in


def transform_page(html: str, page: Page, lang: str, from_fr: bool) -> str:
    url = page.lang_url(lang)
    html = set_lang_attr(html, lang)
    html = set_canonical(html, url)
    html = replace_hreflang(html, hreflang_block(page))
    html = apply_url_map(html, lang)
    html = localize_amazon(html, lang)
    if from_fr:
        html = translate_fr_html(html, lang)
    return html


def write_outputs() -> None:
    for page in PAGES:
        fr_file = DIST / page.fr_path
        if not fr_file.is_file():
            print("skip missing FR", page.fr_path)
            continue
        fr_html = fr_file.read_text(encoding="utf-8")
        # FR : hreflang seulement
        fr_out = replace_hreflang(fr_html, hreflang_block(page))
        fr_file.write_text(fr_out, encoding="utf-8")

        for lang in LANGS:
            src = legacy_source(page, lang)
            from_fr = src is None
            base = src.read_text(encoding="utf-8") if src else fr_html
            out = transform_page(base, page, lang, from_fr)
            dest = DIST / page.lang_path(lang)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(out, encoding="utf-8")
        print("ok", page.key)


def update_sitemap() -> None:
    sm = DIST / "sitemap-0.xml"
    xml = sm.read_text(encoding="utf-8")
    root = ET.fromstring(xml)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    existing = {el.find("sm:loc", ns).text for el in root.findall("sm:url", ns)}
    for page in PAGES:
        for lang in LANGS:
            loc = page.lang_url(lang)
            if loc in existing:
                continue
            u = ET.SubElement(root, "url")
            ET.SubElement(u, "loc").text = loc
            existing.add(loc)
    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    ET.register_namespace("xhtml", "http://www.w3.org/1999/xhtml")
    sm.write_text(
        '<?xml version="1.0" encoding="UTF-8"?>' + ET.tostring(root, encoding="unicode"),
        encoding="utf-8",
    )


def main() -> None:
    write_outputs()
    update_sitemap()
    print("Done.", len(PAGES), "pages × 4 langues + FR hreflang")


if __name__ == "__main__":
    main()
