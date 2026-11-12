#!/usr/bin/env python3
"""
Garantit un CTA affilié au-dessus de la ligne de flottaison (6 000 premiers caractères de <main>)
et le suivi mnz-click-v1 sur les pages éditoriales du dist.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import quote

FOLD_LIMIT = 6000

DIST_DIRS = [
    Path("/workspace/re-repo/dist"),
    Path("/workspace/robot-educatif/dist"),
    Path("/workspace/robot-educatif/dist-v16"),
    Path("/workspace/robot-educatif/dist16"),
    Path("/workspace/re-repo/dist61"),
    Path("/workspace/re-repo/dist62"),
]

SKIP_PATH_PARTS = (
    "/mentions-legales/",
    "/politique-de-confidentialite/",
    "/gestion-des-cookies/",
    "/contact/",
    "/recherche/",
)

AFF_HREF_RE = re.compile(
    r'href=["\'](https?://[^"\']*(?:'
    r'amazon\.[^"\']*(?:[?&]|&#38;)tag=[^"\']*'
    r'|awin1\.com[^"\']*'
    r'|awin\.com[^"\']*'
    r'))["\']',
    re.I,
)

MAIN_RE = re.compile(r"<main\b[^>]*>(.*)</main>", re.I | re.S)
TITLE_RE = re.compile(r"<title[^>]*>([^<]+)</title>", re.I)
H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.I | re.S)
REFRESH_RE = re.compile(r'http-equiv=["\']refresh["\']', re.I)
RE_TOP_BLOCK_RE = re.compile(
    r'<style id="re-top-aff-cta-css">.*?</style>\s*<aside id="re-top-aff-cta".*?</aside>',
    re.I | re.S,
)


def strip_existing_top_cta(main_html: str) -> str:
    return RE_TOP_BLOCK_RE.sub("", main_html, count=1)
MNZ_RE = re.compile(r"mnz-click-v1")
RE_TOP_CTA_RE = re.compile(r'id=["\']re-top-aff-cta["\']', re.I)

MARKETS = {
    "fr": {
        "host": "www.amazon.fr",
        "tag": "manuso06-21",
        "currency": "€",
        "disclaimer": "Liens partenaires Amazon / Shelly — prix indicatifs.",
        "heading": "Matériel recommandé pour cette page",
        "cta_amz": "Voir sur Amazon →",
        "cta_shelly": "Voir sur Shelly →",
    },
    "de": {
        "host": "www.amazon.de",
        "tag": "roboteducat00-21",
        "currency": "€",
        "disclaimer": "Partnerlinks (Amazon) — unverbindliche Preise.",
        "heading": "Empfohlene Produkte zu diesem Thema",
        "cta_amz": "Bei Amazon ansehen →",
        "cta_shelly": "Shelly Shop →",
    },
    "it": {
        "host": "www.amazon.it",
        "tag": "roboteducat0f-21",
        "currency": "€",
        "disclaimer": "Link affiliati Amazon — prezzi indicativi.",
        "heading": "Prodotti consigliati per questa pagina",
        "cta_amz": "Vedi su Amazon →",
        "cta_shelly": "Shelly →",
    },
    "es": {
        "host": "www.amazon.es",
        "tag": "roboteducat07-21",
        "currency": "€",
        "disclaimer": "Enlaces de afiliado Amazon — precios orientativos.",
        "heading": "Material recomendado para esta página",
        "cta_amz": "Ver en Amazon →",
        "cta_shelly": "Shelly →",
    },
    "uk": {
        "host": "www.amazon.co.uk",
        "tag": "roboteducatif-21",
        "currency": "£",
        "disclaimer": "Affiliate links (Amazon UK) — indicative prices.",
        "heading": "Recommended kit for this page",
        "cta_amz": "View on Amazon →",
        "cta_shelly": "Shelly →",
    },
    "en": {
        "host": "www.amazon.com",
        "tag": "roboteducatif-20",
        "currency": "$",
        "disclaimer": "Affiliate links (Amazon US) — indicative prices.",
        "heading": "Recommended products for this topic",
        "cta_amz": "View on Amazon →",
        "cta_shelly": "Shelly →",
    },
    "ca": {
        "host": "www.amazon.ca",
        "tag": "roboteducatif-20",
        "currency": "CA$",
        "disclaimer": "Affiliate links (Amazon CA) — indicative prices.",
        "heading": "Recommended products for this topic",
        "cta_amz": "View on Amazon →",
        "cta_shelly": "Shelly →",
    },
}

SHELLY_AWIN_FR = (
    "https://www.awin1.com/cread.php?awinmid=114660&awinaffid=2818852&ued="
    + quote("https://www.shelly.com/fr", safe="")
)

TOPIC_RULES: list[tuple[re.Pattern[str], list[dict]]] = [
    (
        re.compile(
            r"zigbee|zha|zigbee2mqtt|dongle|coordinateur|aqara|sonoff(?!\s*app)",
            re.I,
        ),
        [
            {"q": "SONOFF ZBDongle-E Zigbee 3.0", "p": "≈ 28–35"},
            {"q": "SMLIGHT SLZB-06 Zigbee Ethernet", "p": "≈ 45–55"},
            {"q": "capteur zigbee aqara sonoff home assistant", "p": "≈ 15–40"},
        ],
    ),
    (
        re.compile(r"roborock|aspirateur|robot.?vac|lidar|lavage|dreame|serpill", re.I),
        [
            {"q": "Roborock Qrevo S8 robot aspirateur", "p": "≈ 400–900"},
            {"q": "Dreame L10s X40 robot aspirateur", "p": "≈ 350–800"},
            {"q": "kit accessoires entretien robot aspirateur", "p": "≈ 20–45"},
        ],
    ),
    (
        re.compile(r"shelly|fil.?pilote|chauffage|prise.?connect|énergie|energie|conso", re.I),
        [
            {"shelly": True, "label": "Shelly Plus 1PM / 2PM", "p": "≈ 18–42"},
            {"q": "prise connectée zigbee mesure consommation", "p": "≈ 25–55"},
            {"q": "thermostat connecté fil pilote", "p": "≈ 60–120"},
        ],
    ),
    (
        re.compile(r"home.?assistant|jeedom|homey|mini.?pc|box domotique|domotique", re.I),
        [
            {"q": "Home Assistant Green", "p": "≈ 110–125"},
            {"q": "Mini PC Intel N100 SSD home assistant", "p": "≈ 150–220"},
            {"q": "SONOFF ZBDongle-E", "p": "≈ 28–35"},
        ],
    ),
    (
        re.compile(r"esp32|esphome|esp-home|diy capteur", re.I),
        [
            {"q": "ESP32 DevKit WiFi BLE pack", "p": "≈ 8–15"},
            {"q": "DHT22 LD2410 BME280 capteur", "p": "≈ 12–35"},
            {"q": "alimentation USB-C 5V 3A", "p": "≈ 10–18"},
        ],
    ),
    (
        re.compile(r"caméra|camera|alarme|sécurit|securit|portail|garage|reolink|imou", re.I),
        [
            {"q": "Reolink Imou caméra RTSP ONVIF locale", "p": "≈ 35–90"},
            {"q": "capteur ouverture zigbee porte", "p": "≈ 12–25"},
            {"q": "Shelly module relais garage", "p": "≈ 18–35"},
        ],
    ),
    (
        re.compile(r"raspberry|raspi|\bpi 5\b|\bpi 4\b", re.I),
        [
            {"q": "Raspberry Pi 5 kit 4 Go 8 Go", "p": "≈ 80–120"},
            {"q": "alimentation officielle Raspberry Pi 27W USB-C", "p": "≈ 12–18"},
            {"q": "boitier refroidissement actif microSD A2 Raspberry Pi", "p": "≈ 15–35"},
        ],
    ),
    (
        re.compile(r"arduino|électronique|electronique|breadboard|dupont|multimètre", re.I),
        [
            {"q": "kit démarrage Arduino Uno R3 capteurs servomoteur", "p": "≈ 35–65"},
            {"q": "carte compatible Arduino Uno", "p": "≈ 8–25"},
            {"q": "multimètre câbles Dupont breadboard", "p": "≈ 15–30"},
        ],
    ),
    (
        re.compile(r"python|scratch|programmation|micro:bit|codage", re.I),
        [
            {"q": "Makeblock mBot2 Scratch Python", "p": "≈ 120–150"},
            {"q": "micro:bit V2 Go kit", "p": "≈ 25–45"},
            {"q": "livre programmation enfant débutant", "p": "≈ 15–30"},
        ],
    ),
    (
        re.compile(r"mbot|mblock|makeblock|cyberpi|matatalab|robot enfant|botley", re.I),
        [
            {"q": "Makeblock mBot2 robot éducatif", "p": "≈ 120–150"},
            {"q": "Learning Resources Botley 2.0 robot", "p": "≈ 70–90"},
            {"q": "pack capteurs accessoires Makeblock mBot", "p": "≈ 25–55"},
        ],
    ),
]

DEFAULT_PRODUCTS = [
    {"q": "robot éducatif programmable enfant", "p": "≈ 80–150"},
    {"q": "Makeblock mBot2", "p": "≈ 120–150"},
    {"q": "kit électronique débutant", "p": "≈ 35–60"},
]

CTA_CSS = """
<style id="re-top-aff-cta-css">
#re-top-aff-cta{margin:1.25rem 0 1.5rem;padding:1rem 1.05rem;border-radius:12px;border:1px solid rgba(194,65,12,.35);
background:linear-gradient(135deg,rgba(194,65,12,.07),rgba(15,118,110,.05))}
#re-top-aff-cta h2{margin:0 0 .45rem;font-size:clamp(1rem,2.4vw,1.25rem);line-height:1.3}
#re-top-aff-cta .re-aff-lead{margin:0 0 .75rem;font-size:.9rem;color:rgb(71,85,105)}
#re-top-aff-cta .re-aff-btns{display:flex;flex-wrap:wrap;gap:.45rem;margin:.5rem 0}
#re-top-aff-cta .re-aff-btn{display:inline-flex;align-items:center;padding:.5rem .85rem;border-radius:8px;
font-size:.84rem;font-weight:700;text-decoration:none;background:#c2410c;color:#fff!important}
#re-top-aff-cta .re-aff-btn--ghost{background:transparent;color:#0f766e!important;border:1.5px solid #0f766e}
#re-top-aff-cta .re-aff-disclaimer{margin:.65rem 0 0;font-size:.75rem;opacity:.85}
</style>
"""

MNZ_SNIPPET = """<script>(function(){var scripts=document.scripts;for(var si=0;si<scripts.length;si++){var sc=scripts[si];if(sc===document.currentScript)break;var txt=sc.textContent||"";if(txt.indexOf("mnz-click-v1")!==-1&&txt.indexOf("track_click=1")!==-1)return;}/*mnz-click-v1*/var B="https://manuso.fr/realtime_api.php";var site=location.hostname.replace(/^www\\./,""),path=location.pathname||"/";if(!/\\/$/.test(path))path+="/";var lc=0;function tc(ev){if(ev.type==="auxclick"&&ev.button!==1)return;var a=ev.target&&ev.target.closest?ev.target.closest("a"):null;if(!a)return;var h=a.href||"";if(!/^https?:\\/\\//i.test(h))return;var hn="";try{hn=new URL(h).hostname.replace(/^www\\./,"")}catch(e){return;}if((hn===site||hn==="manuso.fr")&&!/\\/go\\/|\\/r\\.php/i.test(h))return;if(Date.now()-lc<400)return;lc=Date.now();var lb=(a.innerText||a.getAttribute("aria-label")||a.title||"").replace(/\\s+/g," ").trim().slice(0,80);var u=B+"?track_click=1&site="+encodeURIComponent(site)+"&page="+encodeURIComponent(path)+"&label="+encodeURIComponent(lb)+"&url="+encodeURIComponent(h);var ok=0;try{if(navigator.sendBeacon)ok=navigator.sendBeacon(u)?1:0}catch(e){}if(!ok){try{fetch(u,{mode:"no-cors",keepalive:1})}catch(e){}try{(new Image()).src=u}catch(e){}}}document.addEventListener("click",tc,1);document.addEventListener("auxclick",tc,1);})();</script>"""


def strip_tags(s: str) -> str:
    return re.sub(r"<[^>]+>", " ", s)


def market_for_path(rel: str) -> str:
    p = rel.strip("/")
    if p.startswith("uk/"):
        return "uk"
    if p.startswith("ca/"):
        return "ca"
    if p.startswith("de/"):
        return "de"
    if p.startswith("it/"):
        return "it"
    if p.startswith("es/"):
        return "es"
    if p.startswith("en/"):
        return "en"
    return "fr"


def is_skipped(rel: str, html: str) -> bool:
    norm = "/" + rel.lstrip("/")
    if norm.endswith("/404.html") or norm == "/404.html":
        return True
    for part in SKIP_PATH_PARTS:
        if part in norm:
            return True
    if html and REFRESH_RE.search(html[:2000]):
        return True
    return False


def is_content_page(rel: str) -> bool:
    if is_skipped(rel, ""):
        return False
    if not rel.endswith(".html"):
        return False
    if rel.endswith("/index.html"):
        return True
    return rel.endswith(".html") and rel.count("/") >= 1


def amazon_search(market: str, query: str) -> str:
    m = MARKETS[market]
    return f"https://{m['host']}/s?k={quote(query)}&tag={m['tag']}"


def pick_products(text: str) -> list[dict]:
    for pattern, products in TOPIC_RULES:
        if pattern.search(text):
            return products[:3]
    return DEFAULT_PRODUCTS[:3]


def build_cta_html(market: str, context: str) -> str:
    m = MARKETS[market]
    products = pick_products(context)
    btns: list[str] = []
    for item in products:
        price = item.get("p", "≈ —")
        if item.get("shelly"):
            url = SHELLY_AWIN_FR if market == "fr" else amazon_search(market, "Shelly Plus 1PM 2PM")
            label = item.get("label", "Shelly")
            btns.append(
                f'<a class="re-aff-btn re-aff-btn--ghost" href="{url}" rel="sponsored nofollow noopener" '
                f'target="_blank">{label} {price} {m["currency"]} · {m["cta_shelly"]}</a>'
            )
        else:
            q = item["q"]
            url = amazon_search(market, q)
            btns.append(
                f'<a class="re-aff-btn" href="{url}" rel="sponsored nofollow noopener" target="_blank">'
                f'{q[:48]}… {price} {m["currency"]} · {m["cta_amz"]}</a>'
            )
    btn_html = "\n".join(btns)
    return (
        CTA_CSS
        + f'<aside id="re-top-aff-cta" class="re-top-aff-cta" aria-label="{m["heading"]}">'
        f"<h2>{m['heading']}</h2>"
        f'<p class="re-aff-lead">{m["disclaimer"]}</p>'
        f'<div class="re-aff-btns">{btn_html}</div>'
        f'<p class="re-aff-disclaimer">{m["disclaimer"]}</p>'
        "</aside>"
    )


def extract_main(html: str) -> tuple[str, int, int] | None:
    m = MAIN_RE.search(html)
    if not m:
        return None
    start = m.start(1)
    end = m.end(1)
    return html[start:end], start, end


def first_affiliate_offset(main_slice: str) -> int | None:
    best: int | None = None
    for match in AFF_HREF_RE.finditer(main_slice):
        pos = match.start()
        if best is None or pos < best:
            best = pos
    return best


def find_injection_point(main_html: str) -> int:
    """Point d'insertion le plus haut possible dans <main> (above the fold)."""
    window = main_html[:8000]
    candidates: list[int] = []

    h1 = re.search(r"<h1\b[^>]*>.*?</h1>", window, re.I | re.S)
    if h1:
        candidates.append(h1.end())

    geo = re.search(
        r'<(?:p|div)[^>]*class=["\'][^"\']*geo-direct-answer[^"\']*["\'][^>]*>.*?</(?:p|div)>',
        window,
        re.I | re.S,
    )
    if geo:
        candidates.append(geo.end())

    first_p = re.search(r"<p\b[^>]*>.*?</p>", window, re.I | re.S)
    if first_p:
        candidates.append(first_p.end())

    if candidates:
        return min(candidates)
    return 0


def ensure_mnz_click(html: str) -> tuple[str, bool]:
    if MNZ_RE.search(html):
        return html, False
    low = html.lower()
    idx = low.rfind("</body>")
    if idx != -1:
        return html[:idx] + MNZ_SNIPPET + html[idx:], True
    return html + MNZ_SNIPPET, True


def process_html(html: str, rel: str) -> tuple[str, bool, bool]:
    """Returns (new_html, cta_changed, mnz_changed)."""
    if is_skipped(rel, html):
        return html, False, False

    mnz_changed = False
    html, mnz_changed = ensure_mnz_click(html)

    main = extract_main(html)
    if not main:
        return html, False, mnz_changed

    main_body, main_start, main_end = main
    fold = main_body[:FOLD_LIMIT]

    if first_affiliate_offset(fold) is not None:
        return html, False, mnz_changed

    main_body = strip_existing_top_cta(main_body)
    fold = main_body[:FOLD_LIMIT]

    if first_affiliate_offset(fold) is not None:
        new_html = html[:main_start] + main_body + html[main_end:]
        return new_html, new_html != html, mnz_changed

    if RE_TOP_CTA_RE.search(fold):
        return html, False, mnz_changed

    title_m = TITLE_RE.search(html)
    h1_m = H1_RE.search(html)
    context = " ".join(
        filter(
            None,
            [
                strip_tags(title_m.group(1)) if title_m else "",
                strip_tags(h1_m.group(1)) if h1_m else "",
                rel,
                strip_tags(main_body[:4000]),
            ],
        )
    )
    market = market_for_path(rel)
    block = build_cta_html(market, context)
    inject_at = find_injection_point(main_body)
    new_main = main_body[:inject_at] + block + main_body[inject_at:]
    new_html = html[:main_start] + new_main + html[main_end:]
    return new_html, True, mnz_changed


def iter_content_html(dist: Path) -> list[Path]:
    out: list[Path] = []
    for p in dist.rglob("*.html"):
        rel = str(p.relative_to(dist)).replace("\\", "/")
        if rel.endswith("/index.html") or (rel.count("/") >= 1 and rel.endswith(".html")):
            if is_skipped(rel, p.read_text(encoding="utf-8", errors="replace")[:500]):
                continue
            out.append(p)
    return out


def verify_dist(dist: Path) -> dict:
    missing_any: list[str] = []
    missing_fold: list[str] = []
    missing_mnz: list[str] = []
    total = 0
    for p in dist.rglob("*.html"):
        rel = str(p.relative_to(dist)).replace("\\", "/")
        html = p.read_text(encoding="utf-8", errors="replace")
        if is_skipped(rel, html):
            continue
        if not (rel.endswith("/index.html") or rel.endswith(".html")):
            continue
        total += 1
        main = extract_main(html)
        if not main:
            continue
        main_body, _, _ = main
        if not AFF_HREF_RE.search(main_body):
            missing_any.append(rel)
        fold = main_body[:FOLD_LIMIT]
        if first_affiliate_offset(fold) is None:
            missing_fold.append(rel)
        if not MNZ_RE.search(html):
            missing_mnz.append(rel)
    return {
        "dist": str(dist),
        "content_pages": total,
        "missing_any_affiliate": len(missing_any),
        "missing_fold_affiliate": len(missing_fold),
        "missing_mnz": len(missing_mnz),
        "samples_fold": missing_fold[:15],
    }


def main() -> int:
    verify_only = "--verify" in sys.argv
    dirs = [Path(a) for a in sys.argv[1:] if not a.startswith("-")] or DIST_DIRS

    if verify_only:
        ok = True
        for dist in dirs:
            if not dist.is_dir():
                print(f"SKIP {dist}")
                continue
            r = verify_dist(dist)
            print(r)
            if r["missing_any_affiliate"] or r["missing_fold_affiliate"] or r["missing_mnz"]:
                ok = False
        return 0 if ok else 1

    cta_patched = mnz_patched = files = 0
    for dist in dirs:
        if not dist.is_dir():
            print(f"SKIP {dist}")
            continue
        for path in dist.rglob("*.html"):
            rel = str(path.relative_to(dist)).replace("\\", "/")
            raw = path.read_text(encoding="utf-8", errors="replace")
            if is_skipped(rel, raw):
                continue
            new, cta_ok, mnz_ok = process_html(raw, rel)
            if cta_ok or mnz_ok:
                path.write_text(new, encoding="utf-8")
                files += 1
                if cta_ok:
                    cta_patched += 1
                if mnz_ok:
                    mnz_patched += 1
    print(f"Patched CTA: {cta_patched}, mnz-click: {mnz_patched}, files touched: {files}")

    primary = Path("/workspace/re-repo/dist")
    if primary.is_dir():
        r = verify_dist(primary)
        print("VERIFY", r)
        if r["missing_any_affiliate"] or r["missing_fold_affiliate"]:
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
