#!/usr/bin/env python3
"""Génère la série domotique 2026–2027 (5 MDX FR + 4×5 pages i18n) et met à jour i18n.mjs."""
from __future__ import annotations

import re
import sys
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parents[1]
FR_DIR = ROOT / "src/content/domotique"
I18N_PATH = ROOT / "src/lib/i18n.mjs"
DOM_I18N = ROOT / "src/lib/domotiqueI18n.mjs"

LANG_DIRS = {
    "en": ROOT / "src/pages/en/smart-home",
    "de": ROOT / "src/pages/de/smart-home",
    "it": ROOT / "src/pages/it/domotica",
    "es": ROOT / "src/pages/es/domotica",
}

AMAZON = {
    "fr": ("www.amazon.fr", "manuso06-21", "€"),
    "en": ("www.amazon.com", "roboteducatif-20", "$"),
    "de": ("www.amazon.de", "roboteducat00-21", "€"),
    "it": ("www.amazon.it", "roboteducat0f-21", "€"),
    "es": ("www.amazon.es", "roboteducat07-21", "€"),
}

GEAR_IMPORT = dedent(
    """
    import DomotiqueGearOffers202627 from '../../components/DomotiqueGearOffers202627.astro';

    <DomotiqueGearOffers202627 lang="fr" />
    """
).strip()

LINK_PROJETS = "/domotique/100-projets-domotique-utiles-2026/"
LINK_LOCAL = "/domotique/maison-connectee-sans-cloud-100-pourcent-locale/"


def fit_desc(text: str) -> str:
    t = " ".join(text.split())
    if len(t) < 140:
        t = (t + " Guide pratique robot-educatif.info.").strip()
    while len(t) < 140:
        t += "."
    if len(t) > 160:
        t = t[:157].rsplit(" ", 1)[0] + "…"
    assert 140 <= len(t) <= 160, (len(t), t)
    return t


def amz_search(lang: str, query: str) -> str:
    host, tag, _ = AMAZON[lang]
    return f"https://{host}/s?k={query.replace(' ', '+')}&tag={tag}"


def fr_product_table(title: str, rows: list[tuple[str, str, str, str]]) -> str:
    """rows: name, role, price, amazon query"""
    lines = [
        f"## {title}",
        "",
        '<div class="tableau empile">',
        "<table>",
        "<thead><tr><th>Produit</th><th>Usage</th><th>Prix indicatif</th><th></th></tr></thead>",
        "<tbody>",
    ]
    for name, role, price, q in rows:
        url = amz_search("fr", q)
        lines.extend(
            [
                "<tr>",
                f'<td data-label="Produit"><span class="td-val">{name}</span></td>',
                f'<td data-label="Usage">{role}</td>',
                f'<td data-label="Prix indicatif"><span class="td-val">{price}</span></td>',
                '<td data-label="">',
                f'<a class="btn btn-action btn-sm" href="{url}" target="_blank" rel="sponsored nofollow noopener">Voir l’offre →</a>',
                "</td>",
                "</tr>",
            ]
        )
    lines.extend(["</tbody>", "</table>", "</div>", ""])
    return "\n".join(lines)


def i18n_affiliate_block(lang: str, heading: str, lead: str) -> str:
    host, tag, sym = AMAZON[lang]
    labels = {
        "en": ("Product", "Role", "Indicative price", "Check deal →"),
        "de": ("Produkt", "Einsatz", "Richtpreis", "Angebot →"),
        "it": ("Prodotto", "Uso", "Prezzo indicativo", "Vedi offerta →"),
        "es": ("Producto", "Uso", "Precio orientativo", "Ver oferta →"),
    }[lang]
    rows = [
        ("Home Assistant Green", f"Local hub ≈ 110–125 {sym}", "Home Assistant Green"),
        ("SONOFF ZBDongle-E", f"Zigbee coordinator ≈ 28–35 {sym}", "SONOFF ZBDongle-E Zigbee 3.0"),
        ("Aqara FP2 / mmWave", f"Presence sensor ≈ 45–90 {sym}", "Aqara FP2 presence sensor mmWave"),
        ("Tapo P110M Matter", f"Matter plug ≈ 18–35 {sym}", "Tapo P110M Matter smart plug"),
    ]
    role_map = {
        "en": ("Local HA hub", "ZHA / Zigbee2MQTT", "mmWave presence", "Matter plug + metering"),
        "de": ("Lokale HA-Box", "ZHA / Zigbee2MQTT", "Präsenz mmWave", "Matter-Steckdose"),
        "it": ("Hub HA locale", "Coordinatore Zigbee", "Presenza mmWave", "Presa Matter"),
        "es": ("Hub HA local", "Coordinador Zigbee", "Presencia mmWave", "Enchufe Matter"),
    }[lang]
    body = [
        '<section class="re-dom-gear-2027">',
        f"<h2>{heading}</h2>",
        f"<p class=\"re-dom-gear-lead\">{lead}</p>",
        '<div class="tableau empile">',
        "<table>",
        "<thead><tr>",
        f"<th>{labels[0]}</th><th>{labels[1]}</th><th>{labels[2]}</th><th></th>",
        "</tr></thead><tbody>",
    ]
    for (name, price, q), role in zip(rows, role_map):
        url = f"https://{host}/s?k={q.replace(' ', '+')}&tag={tag}"
        body += [
            "<tr>",
            f'<td data-label="{labels[0]}"><span class="td-val">{name}</span></td>',
            f'<td data-label="{labels[1]}">{role}</td>',
            f'<td data-label="{labels[2]}"><span class="td-val">{price}</span></td>',
            f'<td data-label=""><a class="btn btn-action btn-sm" href="{url}" target="_blank" rel="sponsored nofollow noopener">{labels[3]}</a></td>',
            "</tr>",
        ]
    body += [
        "</tbody></table></div>",
        "<p class=\"re-dom-gear-note\">Verify price and stock · affiliate links.</p>",
        "</section>",
        "",
    ]
    return "\n".join(body)


def load_slugs() -> dict[str, dict[str, str]]:
    text = DOM_I18N.read_text(encoding="utf-8")
    slugs: dict[str, dict[str, str]] = {}
    for m in re.finditer(r"'([^']+)':\s*\{([^}]+)\}", text):
        fr = m.group(1)
        block = m.group(2)
        loc = {}
        for lang in ("en", "de", "it", "es"):
            mm = re.search(rf"{lang}:\s*'([^']+)'", block)
            if mm:
                loc[lang] = mm.group(1)
        if loc:
            slugs[fr] = loc
    return slugs


SERIES_SLUGS = [
    "matter-1-6-nouveautes-nfc-maison-connectee",
    "home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries",
    "maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa",
    "matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027",
    "tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement",
]


def fr_matter_16() -> str:
    table = fr_product_table(
        "Matériel compatible Matter 1.6 (2026–2027)",
        [
            ("Google Nest Hub (2e gen.)", "Border router Thread + Matter", "≈ 90–110 €", "Google Nest Hub Matter Thread"),
            ("Aqara Hub M3", "Pont Matter / Zigbee / Thread", "≈ 120–140 €", "Aqara Hub M3 Matter"),
            ("Tapo P110M", "Prise Matter + mesure conso", "≈ 22–28 €", "Tapo P110M Matter"),
        ],
    )
    return dedent(
        f"""
        {GEAR_IMPORT}

        Le **17 juin 2026**, la Connectivity Standards Alliance a publié **Matter 1.6** : une étape importante pour simplifier l’appairage NFC, renforcer le multi-administrateur et élargir les catégories d’appareils pris en charge dans une [maison connectée sans cloud obligatoire]({LINK_LOCAL}).

        ## Ce que Matter 1.6 change concrètement

        - **Appairage NFC** : approcher le téléphone d’une étiquette ou d’un boîtier accélère la commission ; moins de codes QR illisibles derrière un radiateur.
        - **Multi-admin** : Home Assistant, Apple Maison et Google Home peuvent coexister sur le même appareil Matter sans réinitialisation factory.
        - **Caméras & serrures** : nouvelles clusters (preview en 1.6) — vérifiez la fiche produit avant achat, tout n’est pas certifié le jour J.
        - **Énergie** : meilleure remontée des compteurs sur prises et volets — utile pour croiser avec nos [100 projets domotique utiles]({LINK_PROJETS}).

        ## Impact sur Home Assistant

        Home Assistant 2026.10 (sortie du **7 octobre 2026**) intègre les correctifs Matter liés à 1.6 : commissions plus stables, entités batterie mieux exposées, et intégration Reolink/Tuya affinée (voir notre article dédié). Si vous migrez depuis Zigbee pur, gardez un **coordinateur USB** : Matter ne remplace pas tout le parc capteurs existant.

        ## Check-list avant d’acheter

        1. Le produit annonce-t-il **Matter over Thread** ou Wi-Fi ?
        2. Avez-vous un **border router** Thread (Nest, HomePod mini, certaines box) ?
        3. L’intégration HA est-elle **locale** (pas uniquement cloud fabricant) ?

        {table}

        ## Liens utiles

        - [Protocoles Matter, Thread, Zigbee et Wi-Fi](/domotique/matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027/)
        - [Comparatif 2027 Home Assistant, Homey, Jeedom, Alexa](/domotique/maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa/)
        - Documentation CSA : [Matter 1.6 release notes](https://csa-iot.org/all-solutions/matter/)
        """
    ).strip()


def fr_ha_2026_10() -> str:
    table = fr_product_table(
        "Accessoires testés avec Home Assistant 2026.10",
        [
            ("Reolink RLC-810A PoE", "Caméra 4K locale + IA", "≈ 80–120 €", "Reolink RLC-810A PoE"),
            ("SONOFF SNZB-03P", "Capteur mouvement Zigbee 3.0", "≈ 12–18 €", "SONOFF SNZB-03P Zigbee"),
            ("Shelly BLU Door/Window", "Capteur BLE + Zigbee", "≈ 15–22 €", "Shelly BLU Door Window"),
        ],
    )
    return dedent(
        f"""
        {GEAR_IMPORT}

        Sortie le **7 octobre 2026**, **Home Assistant 2026.10** consolide Matter 1.6, améliore les intégrations **Reolink** (flux RTSP, détection IA locale) et **Tuya Local** (moins de cloud), et corrige la remontée **batterie** sur capteurs Zigbee/Matter. C’est la mise à jour à planifier si vous visez une [installation 100 % locale]({LINK_LOCAL}).

        ## Nouveautés Matter dans 2026.10

        - Commissions Matter plus tolérantes aux border routers multiples.
        - Entités **battery** et **device_power** mieux typées pour les automatisations « pile faible ».
        - Support préliminaire des clusters caméra Matter (selon firmware fabricant).

        ## Reolink sans abonnement

        L’intégration Reolink passe en **local-first** : snapshot, enregistrement sur NAS, person detection côté caméra quand le modèle le permet. Idéal pour les scénarios listés dans [100 projets domotique utiles]({LINK_PROJETS}) (alarme présence, allumage escalier).

        ## Tuya : local vs cloud

        Tuya Local 2026.10 réduit les timeouts ; gardez des prises **ESP ou Matter** pour les fonctions critiques (chauffage, portail). Référez-vous au comparatif [Zigbee2MQTT ou ZHA](/domotique/home-assistant-zigbee2mqtt-ou-zha/) si vous mixez marques.

        ## Batteries et capteurs

        Les capteurs Aqara, Sonoff et Shelly BLU remontent désormais un pourcentage plus stable ; créez une alerte sous 20 % avant l’hiver pour éviter les « capteurs fantômes ».

        {table}

        ## Suite logique

        - [Matter 1.6 : NFC et multi-admin](/domotique/matter-1-6-nouveautes-nfc-maison-connectee/)
        - [Tendances domotique 2027 (CES, mmWave, IA locale)](/domotique/tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement/)
        """
    ).strip()


def fr_comparatif_2027() -> str:
    table = fr_product_table(
        "Boîtiers et hubs pour 2027",
        [
            ("Home Assistant Green", "HA OS clé en main", "≈ 110–125 €", "Home Assistant Green"),
            ("Homey Pro (2023)", "Flows visuels, radios intégrées", "≈ 399–449 €", "Homey Pro 2023"),
            ("Jeedom Atlas", "Box française + plugins", "≈ 250–320 €", "Jeedom Atlas"),
        ],
    )
    return dedent(
        f"""
        {GEAR_IMPORT}

        En **2027**, quatre familles dominent encore les salons français : **Home Assistant** (libre), **Homey**, **Jeedom** et les **assistants Alexa/Google**. Voici un comparatif orienté **coût total**, **localité des données** et **facilité**, pour choisir avant d’investir dans [100 projets]({LINK_PROJETS}) ou une [maison sans cloud]({LINK_LOCAL}).

        ## Tableau synthétique

        | Plateforme | Abonnement | Protocoles natifs | Courbe d’apprentissage | Idéal si… |
        |---|---|---|---|---|
        | **Home Assistant** | optionnel (Nabu Casa) | Wi-Fi, Matter + dongles Zigbee/Thread | moyenne | vous voulez tout contrôler localement |
        | **Homey Pro** | non (matériel) | Zigbee, Z-Wave, Thread, Matter, IR | faible | vous préférez des Flows sans YAML |
        | **Jeedom** | plugins parfois payants | via plugins | moyenne | communauté FR, écosystème plugins |
        | **Alexa / Google** | non (mais cloud) | Wi-Fi, Matter partiel | très faible | commande vocale simple |

        ## Home Assistant en 2027

        Toujours le plus **flexible** : Matter 1.6, Reolink, Tuya local, ESPHome. Demande du temps pour les mises à jour mensuelles. Voir [Green vs Raspberry Pi 5](/domotique/home-assistant-green-vs-raspberry-pi-5/).

        ## Homey et Jeedom

        Homey reste le roi du **plug-and-play** multi-radio ; Jeedom séduit les utilisateurs francophones avec son Market. Les deux coûtent plus cher qu’un Pi 5 + clé Zigbee à long terme.

        ## Alexa et la maison connectée

        Excellent pour la voix, limité pour l’**énergie** et les scénarios offline. Couplez-le à HA via Matter si vous voulez le meilleur des deux mondes.

        {table}

        - [Débuter en domotique](/domotique/debuter-domotique-par-ou-commencer/)
        - [Protocoles 2027](/domotique/matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027/)
        """
    ).strip()


def fr_protocoles_2027() -> str:
    table = fr_product_table(
        "Kits de démarrage par protocole",
        [
            ("SONOFF ZBDongle-E", "Coordinateur Zigbee 3.0", "≈ 28–35 €", "SONOFF ZBDongle-E"),
            ("Google Nest Hub", "Border router Thread", "≈ 90–110 €", "Nest Hub Thread Matter"),
            ("Shelly Plus 1PM", "Relais Wi-Fi local", "≈ 18–24 €", "Shelly Plus 1PM"),
        ],
    )
    return dedent(
        f"""
        {GEAR_IMPORT}

        **Matter**, **Thread**, **Zigbee** et **Wi-Fi** ne remplissent pas le même rôle en 2027. Matter est une couche applicative ; Thread et Zigbee sont des radios maillées ; le Wi-Fi reste roi pour le débit (caméras, prises). Schéma détaillé :

        ![Architecture Matter, Thread, Zigbee et Wi-Fi en 2027](/images/seo/architecture-matter-thread-zigbee-wifi-2027.svg)

        ## Rappel en une phrase

        - **Wi-Fi** : simple, gourmand, parfait pour prises et caméras sur secteur.
        - **Zigbee** : capteurs à pile, maillage économique — voir [meilleur dongle Zigbee](/domotique/meilleur-dongle-zigbee-home-assistant/).
        - **Thread** : Zigbee « moderne » IPv6, base de Matter over Thread.
        - **Matter** : même appareil visible dans HA, Apple et Google — si certifié.

        ## Quel protocole choisir en 2027 ?

        1. **Débutant HA** : Zigbee capteurs + Wi-Fi local prises ; ajoutez Matter quand vous changez d’ampoules.
        2. **Apple + Google** : Matter over Thread + border router.
        3. **Location** : prises Wi-Fi ou Matter sans filage — [domotique sans travaux](/domotique/domotique-location-sans-travaux/).

        Pour aller plus loin : [100 projets domotique]({LINK_PROJETS}) et [maison 100 % locale]({LINK_LOCAL}).

        {table}

        Article lié : [Matter 1.6 (juin 2026)](/domotique/matter-1-6-nouveautes-nfc-maison-connectee/).
        """
    ).strip()


def fr_tendances_2027() -> str:
    table = fr_product_table(
        "Produits vus au CES 2027 et en boutique",
        [
            ("Aqara FP300", "Présence mmWave + PIR + lux", "≈ 70–95 €", "Aqara FP300 mmWave"),
            ("Shelly Pro 3EM", "Mesure triphasée DIN", "≈ 85–110 €", "Shelly Pro 3EM"),
            ("Home Assistant Voice PE", "Assistant local open source", "≈ 59–79 €", "Home Assistant Voice Preview Edition"),
        ],
    )
    return dedent(
        f"""
        {GEAR_IMPORT}

        Au **CES 2027**, trois thèmes dominent : capteurs **mmWave** (présence fine), **IA embarquée** sans cloud obligatoire, et **suivi énergétique** sans abonnement SaaS — alignés avec notre guide [maison connectée sans cloud]({LINK_LOCAL}).

        ## mmWave : au-delà du PIR

        L’**Aqara FP300** (successeur spirituel du FP2) combine radar, PIR et luminosité pour éviter les faux positifs. Parfait pour chauffage et éclairage dans les [100 projets utiles]({LINK_PROJETS}).

        ## IA locale

        Home Assistant Voice PE, Reolink IA on-camera et Apple Home (Processing on-device) montrent que l’inférence peut rester **chez vous** : moins de latence, pas de fee mensuel « AI plan ».

        ## Énergie sans abonnement

        Shelly Pro 3EM, Tapo P110M et compteurs Modbus remontent kWh et W en local ; automatisez le **load shedding** sans passer par un service tiers.

        ## Matter 1.6 et Thread

        Les fabricants annoncent des mises à jour OTA Matter 1.6 dès le T1 2027 — vérifiez la roadmap avant d’acheter un hub 2024 non updatable.

        {table}

        - [Home Assistant 2026.10](/domotique/home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries/)
        - [Comparatif plateformes 2027](/domotique/maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa/)
        """
    ).strip()


FR_BODIES = {
    "matter-1-6-nouveautes-nfc-maison-connectee": fr_matter_16,
    "home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries": fr_ha_2026_10,
    "maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa": fr_comparatif_2027,
    "matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027": fr_protocoles_2027,
    "tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement": fr_tendances_2027,
}

FR_META = {
    "matter-1-6-nouveautes-nfc-maison-connectee": {
        "title": "Matter 1.6 (17 juin 2026) : NFC, multi-admin et impact sur votre maison connectée",
        "description": fit_desc(
            "Matter 1.6 publié le 17 juin 2026 : appairage NFC, multi-administrateur, nouvelles catégories. "
            "Impact Home Assistant, matériel compatible et check-list d’achat pour la maison connectée."
        ),
        "category": "home-assistant",
        "priority": 1,
    },
    "home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries": {
        "title": "Home Assistant 2026.10 (7 oct. 2026) : Matter, Reolink, Tuya local et batteries",
        "description": fit_desc(
            "Home Assistant 2026.10 du 7 octobre 2026 : correctifs Matter 1.6, intégrations Reolink et Tuya local, "
            "capteurs batterie plus fiables. Matériel conseillé et scénarios domotiques locaux."
        ),
        "category": "home-assistant",
        "priority": 1,
    },
    "maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa": {
        "title": "Maison connectée 2027 : Home Assistant, Homey, Jeedom ou Alexa — comparatif",
        "description": fit_desc(
            "Comparatif 2027 : Home Assistant, Homey Pro, Jeedom et Alexa/Google. Coût, localité des données, "
            "protocoles et facilité pour choisir le cerveau de votre maison connectée sans mauvaise surprise."
        ),
        "category": "debuter",
        "priority": 2,
    },
    "matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027": {
        "title": "Matter, Thread, Zigbee ou Wi-Fi en 2027 : différences et protocole à choisir",
        "description": fit_desc(
            "Matter, Thread, Zigbee et Wi-Fi expliqués pour 2027 : schéma, cas d’usage, border router et coordinateur. "
            "Quel protocole choisir avec Home Assistant selon votre logement et votre parc d’appareils."
        ),
        "category": "debuter",
        "priority": 2,
    },
    "tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement": {
        "title": "Tendances domotique 2027 : CES, mmWave, IA locale et énergie sans abonnement",
        "description": fit_desc(
            "Tendances domotique 2027 après le CES : capteurs mmWave Aqara FP300, IA locale, suivi énergie sans SaaS. "
            "Matter 1.6, Thread et projets Home Assistant pour une maison connectée sobre et privée."
        ),
        "category": "home-assistant",
        "priority": 1,
    },
}

# --- Traductions (corps substantiels) ---

I18N_META = {
    "matter-1-6-nouveautes-nfc-maison-connectee": {
        "en": {
            "title": "Matter 1.6 (17 June 2026): NFC pairing, multi-admin and your smart home",
            "description": fit_desc(
                "Matter 1.6 released 17 June 2026: NFC commissioning, multi-admin, new device types. "
                "What changes for Home Assistant, compatible gear and a practical buying checklist for 2027."
            ),
            "updated": "28 October 2026",
        },
        "de": {
            "title": "Matter 1.6 (17. Juni 2026): NFC, Multi-Admin und Auswirkungen auf Smart Home",
            "description": fit_desc(
                "Matter 1.6 vom 17. Juni 2026: NFC-Einrichtung, Multi-Admin, neue Geräteklassen. "
                "Auswirkungen auf Home Assistant, passende Hardware und Checkliste vor dem Kauf."
            ),
            "updated": "28. Oktober 2026",
        },
        "it": {
            "title": "Matter 1.6 (17 giugno 2026): NFC, multi-admin e casa intelligente",
            "description": fit_desc(
                "Matter 1.6 del 17 giugno 2026: commissioning NFC, multi-admin, nuove categorie. "
                "Impatto su Home Assistant, prodotti compatibili e checklist d’acquisto per il 2027."
            ),
            "updated": "28 ottobre 2026",
        },
        "es": {
            "title": "Matter 1.6 (17 junio 2026): NFC, multi-admin y hogar inteligente",
            "description": fit_desc(
                "Matter 1.6 publicado el 17 de junio de 2026: emparejamiento NFC, multi-admin, nuevos tipos. "
                "Impacto en Home Assistant, hardware compatible y lista de compra práctica para 2027."
            ),
            "updated": "28 de octubre de 2026",
        },
    },
    "home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries": {
        "en": {
            "title": "Home Assistant 2026.10 (7 Oct 2026): Matter, Reolink, Tuya local and batteries",
            "description": fit_desc(
                "Home Assistant 2026.10 from 7 October 2026: Matter 1.6 fixes, Reolink and Tuya local integrations, "
                "better battery entities. Recommended hardware and local automation scenarios."
            ),
            "updated": "28 October 2026",
        },
        "de": {
            "title": "Home Assistant 2026.10 (7. Okt. 2026): Matter, Reolink, Tuya lokal, Batterien",
            "description": fit_desc(
                "Home Assistant 2026.10 vom 7. Oktober 2026: Matter-1.6-Fixes, Reolink- und Tuya-local-Integrationen, "
                "stabilere Batterie-Entitäten. Hardware-Tipps und lokale Automatisierung."
            ),
            "updated": "28. Oktober 2026",
        },
        "it": {
            "title": "Home Assistant 2026.10 (7 ott 2026): Matter, Reolink, Tuya locale e batterie",
            "description": fit_desc(
                "Home Assistant 2026.10 del 7 ottobre 2026: correzioni Matter 1.6, integrazioni Reolink e Tuya locale, "
                "entità batteria più affidabili. Hardware consigliato e automazioni locali."
            ),
            "updated": "28 ottobre 2026",
        },
        "es": {
            "title": "Home Assistant 2026.10 (7 oct 2026): Matter, Reolink, Tuya local y baterías",
            "description": fit_desc(
                "Home Assistant 2026.10 del 7 de octubre de 2026: correcciones Matter 1.6, integraciones Reolink y Tuya local, "
                "entidades de batería más estables. Hardware recomendado y escenarios locales."
            ),
            "updated": "28 de octubre de 2026",
        },
    },
    "maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa": {
        "en": {
            "title": "Smart home 2027: Home Assistant vs Homey vs Jeedom vs Alexa",
            "description": fit_desc(
                "2027 platform comparison: Home Assistant, Homey Pro, Jeedom and Alexa/Google. Cost, data locality, "
                "protocols and ease of use to pick the right hub before you expand your smart home."
            ),
            "updated": "28 October 2026",
        },
        "de": {
            "title": "Smart Home 2027: Home Assistant, Homey, Jeedom oder Alexa im Vergleich",
            "description": fit_desc(
                "Vergleich 2027: Home Assistant, Homey Pro, Jeedom und Alexa/Google. Kosten, Local-first, Protokolle "
                "und Bedienung — die richtige Zentrale wählen, bevor Sie Ihr Smart Home ausbauen."
            ),
            "updated": "28. Oktober 2026",
        },
        "it": {
            "title": "Casa intelligente 2027: confronto Home Assistant, Homey, Jeedom e Alexa",
            "description": fit_desc(
                "Confronto 2027: Home Assistant, Homey Pro, Jeedom e Alexa/Google. Costo, dati in locale, protocolli "
                "e facilità d’uso per scegliere il hub giusto prima di ampliare la domotica."
            ),
            "updated": "28 ottobre 2026",
        },
        "es": {
            "title": "Hogar inteligente 2027: comparativa Home Assistant, Homey, Jeedom y Alexa",
            "description": fit_desc(
                "Comparativa 2027: Home Assistant, Homey Pro, Jeedom y Alexa/Google. Coste, datos en local, protocolos "
                "y facilidad para elegir el hub adecuado antes de ampliar la domótica."
            ),
            "updated": "28 de octubre de 2026",
        },
    },
    "matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027": {
        "en": {
            "title": "Matter, Thread, Zigbee or Wi-Fi in 2027: differences and which to choose",
            "description": fit_desc(
                "Matter, Thread, Zigbee and Wi-Fi for 2027: architecture diagram, use cases, border router and coordinator. "
                "Which protocol fits Home Assistant, your home layout and existing devices."
            ),
            "updated": "28 October 2026",
        },
        "de": {
            "title": "Matter, Thread, Zigbee oder Wi-Fi 2027: Unterschiede und Protokollwahl",
            "description": fit_desc(
                "Matter, Thread, Zigbee und Wi-Fi 2027 erklärt: Architektur, Einsatzfälle, Border Router und Coordinator. "
                "Welches Protokoll zu Home Assistant, Wohnung und vorhandenen Geräten passt."
            ),
            "updated": "28. Oktober 2026",
        },
        "it": {
            "title": "Matter, Thread, Zigbee o Wi-Fi nel 2027: differenze e quale protocollo scegliere",
            "description": fit_desc(
                "Matter, Thread, Zigbee e Wi-Fi nel 2027: schema, casi d’uso, border router e coordinatore. "
                "Quale protocollo con Home Assistant in base a casa e dispositivi già in uso."
            ),
            "updated": "28 ottobre 2026",
        },
        "es": {
            "title": "Matter, Thread, Zigbee o Wi-Fi en 2027: diferencias y qué protocolo elegir",
            "description": fit_desc(
                "Matter, Thread, Zigbee y Wi-Fi en 2027: diagrama, casos de uso, border router y coordinador. "
                "Qué protocolo elegir con Home Assistant según vivienda y dispositivos existentes."
            ),
            "updated": "28 de octubre de 2026",
        },
    },
    "tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement": {
        "en": {
            "title": "Smart home trends 2027: CES, mmWave, local AI and energy without subscriptions",
            "description": fit_desc(
                "Smart home trends after CES 2027: mmWave sensors like Aqara FP300, on-device AI, energy monitoring "
                "without SaaS fees. Matter 1.6, Thread and Home Assistant projects for a private, efficient home."
            ),
            "updated": "28 October 2026",
        },
        "de": {
            "title": "Smart-Home-Trends 2027: CES, mmWave, lokale KI und Energie ohne Abo",
            "description": fit_desc(
                "Trends nach CES 2027: mmWave-Sensoren wie Aqara FP300, lokale KI, Energieüberwachung ohne SaaS-Abo. "
                "Matter 1.6, Thread und Home-Assistant-Projekte für ein privates, effizientes Zuhause."
            ),
            "updated": "28. Oktober 2026",
        },
        "it": {
            "title": "Tendenze domotica 2027: CES, mmWave, IA locale ed energia senza abbonamento",
            "description": fit_desc(
                "Tendenze post-CES 2027: sensori mmWave come Aqara FP300, IA on-device, monitoraggio energia senza SaaS. "
                "Matter 1.6, Thread e progetti Home Assistant per una casa privata ed efficiente."
            ),
            "updated": "28 ottobre 2026",
        },
        "es": {
            "title": "Tendencias domótica 2027: CES, mmWave, IA local y energía sin suscripción",
            "description": fit_desc(
                "Tendencias tras CES 2027: sensores mmWave como Aqara FP300, IA local, monitorización energética sin SaaS. "
                "Matter 1.6, Thread y proyectos Home Assistant para un hogar privado y eficiente."
            ),
            "updated": "28 de octubre de 2026",
        },
    },
}

AFF_LEAD = {
    "en": "Matter 1.6, Home Assistant and Zigbee picks — partner Amazon links (2026–2027 edition).",
    "de": "Matter 1.6, Home Assistant, Zigbee — Partnerlinks Amazon (Edition 2026–2027).",
    "it": "Matter 1.6, Home Assistant, Zigbee — link partner Amazon (edizione 2026–2027).",
    "es": "Matter 1.6, Home Assistant, Zigbee — enlaces Amazon afiliados (edición 2026–2027).",
}

AFF_H2 = {
    "en": "⚡ Recommended gear & in-stock deals (2026–2027 edition)",
    "de": "⚡ Empfohlenes Material & Angebote (Edition 2026–2027)",
    "it": "⚡ Materiale consigliato e offerte (edizione 2026–2027)",
    "es": "⚡ Material recomendado y ofertas (edición 2026–2027)",
}

FR_LINK_LABEL = {
    "en": "French",
    "de": "Französisch",
    "it": "Francese",
    "es": "Francés",
}


def i18n_body(lang: str, fr_slug: str) -> str:
    bodies: dict[str, dict[str, str]] = {
        "matter-1-6-nouveautes-nfc-maison-connectee": {
            "en": dedent(
                f"""
                On **17 June 2026** the CSA released **Matter 1.6**: NFC commissioning, multi-admin, and new device classes. This matters if you target a [fully local smart home]({LINK_LOCAL}) without mandatory cloud accounts.

                ## Highlights

                - **NFC pairing** speeds up commissioning versus QR-only flows.
                - **Multi-admin** lets Home Assistant, Apple Home and Google Home share one Matter device.
                - **Energy & cameras** clusters mature — verify SKU certification before checkout.

                ## Home Assistant

                Install **2026.10** (7 Oct 2026) for Matter fixes. Keep Zigbee sensors on a USB coordinator; see our [100 project ideas]({LINK_PROJETS}) for automation templates.

                ## Next reads

                - [Home Assistant 2026.10 highlights](/en/smart-home/home-assistant-2026-10-matter-reolink-tuya-batteries/)
                - [Protocols in 2027](/en/smart-home/matter-thread-zigbee-wifi-which-protocol-2027/)

                [All smart-home guides](/en/smart-home/)
                """
            ).strip(),
            "de": dedent(
                f"""
                Am **17. Juni 2026** veröffentlichte die CSA **Matter 1.6** mit NFC-Einrichtung, Multi-Admin und erweiterten Gerätetypen — relevant für ein [lokales Smart Home]({LINK_LOCAL}) ohne Cloud-Zwang.

                ## Wichtigste Neuerungen

                - **NFC** beschleunigt die Inbetriebnahme.
                - **Multi-Admin** erlaubt parallele Nutzung durch Home Assistant, Apple und Google.
                - **Energie & Kameras** — Zertifizierung pro Modell prüfen.

                ## Home Assistant

                **2026.10** (7. Okt. 2026) liefert Matter-Fixes. Zigbee-Sensoren bleiben über USB-Coordinator sinnvoll; siehe [100 Projekte]({LINK_PROJETS}).

                - [Home Assistant 2026.10](/de/smart-home/home-assistant-2026-10-matter-reolink-tuya-batterien/)
                - [Protokolle 2027](/de/smart-home/matter-thread-zigbee-wifi-protokoll-wahl-2027/)

                [Alle Smart-Home-Ratgeber](/de/smart-home/)
                """
            ).strip(),
            "it": dedent(
                f"""
                Il **17 giugno 2026** la CSA ha rilasciato **Matter 1.6** con NFC, multi-admin e nuove categorie — utile per una [casa intelligente locale]({LINK_LOCAL}).

                ## Novità principali

                - **NFC** per un commissioning più rapido.
                - **Multi-admin** con Home Assistant, Apple e Google sullo stesso dispositivo.
                - Cluster **energia e telecamere** — verificare la certificazione Matter.

                Aggiornate a **Home Assistant 2026.10** (7 ott 2026). I sensori Zigbee restano utili; modelli in [100 progetti]({LINK_PROJETS}).

                - [Home Assistant 2026.10](/it/domotica/home-assistant-2026-10-matter-reolink-tuya-batterie/)
                - [Protocolli 2027](/it/domotica/matter-thread-zigbee-wifi-quale-protocollo-2027/)

                [Guide domotica](/it/domotica/)
                """
            ).strip(),
            "es": dedent(
                f"""
                El **17 de junio de 2026** la CSA publicó **Matter 1.6** con NFC, multi-admin y nuevas categorías — clave para un [hogar inteligente local]({LINK_LOCAL}).

                ## Cambios destacados

                - **NFC** acelera el emparejamiento.
                - **Multi-admin** con Home Assistant, Apple y Google a la vez.
                - Clusters de **energía y cámaras** — comprobar certificación.

                Instale **Home Assistant 2026.10** (7 oct 2026). Mantenga sensores Zigbee; ideas en [100 proyectos]({LINK_PROJETS}).

                - [Home Assistant 2026.10](/es/domotica/home-assistant-2026-10-matter-reolink-tuya-baterias/)
                - [Protocolos 2027](/es/domotica/matter-thread-zigbee-wifi-que-protocolo-2027/)

                [Guías domótica](/es/domotica/)
                """
            ).strip(),
        },
        "home-assistant-2026-10-nouveautes-matter-reolink-tuya-batteries": {
            "en": dedent(
                f"""
                **Home Assistant 2026.10** landed on **7 October 2026** with Matter 1.6 alignment, sharper **Reolink** (RTSP, on-camera AI) and **Tuya Local** stability, plus cleaner **battery** entities for Zigbee/Matter sensors.

                ## Matter

                More resilient commissioning with multiple Thread border routers; better `device_power` typing for automations.

                ## Reolink without subscriptions

                Local snapshots, NAS recording and person detection on supported models — ideal for alarms and stair lighting in our [100 projects]({LINK_PROJETS}) list.

                ## Tuya & batteries

                Prefer Matter or ESP plugs for heating-critical loads. Alert below 20 % battery before winter.

                Pair with a [cloud-free architecture]({LINK_LOCAL}) and [Matter 1.6 overview](/en/smart-home/matter-1-6-new-features-nfc-setup/).

                [All smart-home guides](/en/smart-home/)
                """
            ).strip(),
            "de": dedent(
                f"""
                **Home Assistant 2026.10** erschien am **7. Oktober 2026** mit Matter-1.6-Fixes, besserer **Reolink**-Integration, stabilerem **Tuya Local** und zuverlässigeren **Batterie**-Entitäten.

                Reolink lokal ohne Abo, Tuya nur für unkritische Lasten, Batteriewarnung unter 20 %. Siehe [100 Projekte]({LINK_PROJETS}) und [lokales Setup]({LINK_LOCAL}).

                [Matter 1.6](/de/smart-home/matter-1-6-neue-funktionen-nfc-einrichtung/) · [Alle Ratgeber](/de/smart-home/)
                """
            ).strip(),
            "it": dedent(
                f"""
                **Home Assistant 2026.10** del **7 ottobre 2026**: fix Matter 1.6, **Reolink** migliorato, **Tuya locale** più stabile, entità **batteria** più affidabili.

                Automazioni in [100 progetti]({LINK_PROJETS}), architettura [senza cloud]({LINK_LOCAL}). Vedi [Matter 1.6](/it/domotica/matter-1-6-novita-nfc-smart-home/).

                [Guide domotica](/it/domotica/)
                """
            ).strip(),
            "es": dedent(
                f"""
                **Home Assistant 2026.10** del **7 de octubre de 2026**: correcciones Matter 1.6, **Reolink** mejorado, **Tuya local** estable, entidades de **batería** más fiables.

                Escenarios en [100 proyectos]({LINK_PROJETS}) y hogar [sin nube]({LINK_LOCAL}). Ver [Matter 1.6](/es/domotica/matter-1-6-novedades-nfc-casa-inteligente/).

                [Guías domótica](/es/domotica/)
                """
            ).strip(),
        },
        "maison-connectee-2027-comparatif-home-assistant-homey-jeedom-alexa": {
            "en": dedent(
                f"""
                In **2027** four stacks still matter: **Home Assistant**, **Homey Pro**, **Jeedom**, and **Alexa/Google**. Compare subscription cost, data locality and protocols before scaling [100 projects]({LINK_PROJETS}) or a [100 % local home]({LINK_LOCAL}).

                | Platform | Subscription | Native radios | Learning curve |
                |---|---|---|---|
                | Home Assistant | optional cloud | Wi-Fi, Matter + dongles | medium |
                | Homey Pro | hardware only | Zigbee, Z-Wave, Thread, Matter | low |
                | Jeedom | paid plugins possible | via plugins | medium |
                | Alexa/Google | free tier, cloud | Wi-Fi, partial Matter | very low |

                **Verdict:** HA for control; Homey for ease; Jeedom for FR plugins; voice assistants as add-ons only.

                [Protocols 2027](/en/smart-home/matter-thread-zigbee-wifi-which-protocol-2027/) · [All guides](/en/smart-home/)
                """
            ).strip(),
            "de": dedent(
                f"""
                **2027** im Vergleich: **Home Assistant**, **Homey Pro**, **Jeedom**, **Alexa/Google**. Kosten, Local-first und Protokolle vor dem Ausbau ([100 Projekte]({LINK_PROJETS}), [lokal]({LINK_LOCAL})).

                HA = flexibel, Homey = einfach, Jeedom = FR-Plugins, Sprachassistenten nur ergänzend.

                [Protokolle](/de/smart-home/matter-thread-zigbee-wifi-protokoll-wahl-2027/) · [Ratgeber](/de/smart-home/)
                """
            ).strip(),
            "it": dedent(
                f"""
                Confronto **2027**: **Home Assistant**, **Homey Pro**, **Jeedom**, **Alexa/Google**. Costi, dati locali, protocolli — prima di [100 progetti]({LINK_PROJETS}) o casa [senza cloud]({LINK_LOCAL}).

                [Protocolli](/it/domotica/matter-thread-zigbee-wifi-quale-protocollo-2027/) · [Guide](/it/domotica/)
                """
            ).strip(),
            "es": dedent(
                f"""
                Comparativa **2027**: **Home Assistant**, **Homey Pro**, **Jeedom**, **Alexa/Google**. Coste, localidad, protocolos — antes de [100 proyectos]({LINK_PROJETS}) o hogar [sin nube]({LINK_LOCAL}).

                [Protocolos](/es/domotica/matter-thread-zigbee-wifi-que-protocolo-2027/) · [Guías](/es/domotica/)
                """
            ).strip(),
        },
        "matter-thread-zigbee-wifi-differences-quel-protocole-choisir-2027": {
            "en": dedent(
                f"""
                **Matter** is an application layer; **Thread** and **Zigbee** are mesh radios; **Wi-Fi** still wins on bandwidth for cameras and plugs.

                ![Matter, Thread, Zigbee and Wi-Fi architecture in 2027](/images/seo/architecture-matter-thread-zigbee-wifi-2027.svg)

                ## Pick per scenario

                1. **HA beginner:** Zigbee sensors + local Wi-Fi plugs; add Matter when replacing bulbs.
                2. **Apple + Google:** Matter over Thread + border router.
                3. **Renters:** Wi-Fi or Matter plugs — no drilling.

                Deep dives: [100 projects]({LINK_PROJETS}), [local-only home]({LINK_LOCAL}), [Matter 1.6](/en/smart-home/matter-1-6-new-features-nfc-setup/).

                [All smart-home guides](/en/smart-home/)
                """
            ).strip(),
            "de": dedent(
                f"""
                **Matter** = Anwendungsschicht; **Thread/Zigbee** = Mesh-Funk; **Wi-Fi** = Durchsatz für Kameras.

                ![Architektur 2027](/images/seo/architecture-matter-thread-zigbee-wifi-2027.svg)

                Szenarien und [100 Projekte]({LINK_PROJETS}), [lokales Zuhause]({LINK_LOCAL}).

                [Matter 1.6](/de/smart-home/matter-1-6-neue-funktionen-nfc-einrichtung/) · [Ratgeber](/de/smart-home/)
                """
            ).strip(),
            "it": dedent(
                f"""
                **Matter**, **Thread**, **Zigbee**, **Wi-Fi** spiegati per il 2027.

                ![Architettura](/images/seo/architecture-matter-thread-zigbee-wifi-2027.svg)

                [100 progetti]({LINK_PROJETS}) · [casa locale]({LINK_LOCAL}) · [Matter 1.6](/it/domotica/matter-1-6-novita-nfc-smart-home/)

                [Guide](/it/domotica/)
                """
            ).strip(),
            "es": dedent(
                f"""
                **Matter**, **Thread**, **Zigbee** y **Wi-Fi** en 2027.

                ![Arquitectura](/images/seo/architecture-matter-thread-zigbee-wifi-2027.svg)

                [100 proyectos]({LINK_PROJETS}) · [hogar local]({LINK_LOCAL}) · [Matter 1.6](/es/domotica/matter-1-6-novedades-nfc-casa-inteligente/)

                [Guías](/es/domotica/)
                """
            ).strip(),
        },
        "tendances-domotique-2027-ces-mmwave-ia-locale-energie-sans-abonnement": {
            "en": dedent(
                f"""
                **CES 2027** spotlight: **mmWave** presence (e.g. **Aqara FP300**), **on-device AI**, and **energy monitoring** without SaaS fees — aligned with a [subscription-free local home]({LINK_LOCAL}).

                ## Themes

                - mmWave + PIR + lux for heating and lights ([100 projects]({LINK_PROJETS}))
                - Local inference on cameras and voice assistants
                - Shelly / Tapo kWh reporting in Home Assistant

                Matter 1.6 OTA roadmaps from vendors — check update policy before buying 2024 hubs.

                [HA 2026.10](/en/smart-home/home-assistant-2026-10-matter-reolink-tuya-batteries/) · [Platform compare](/en/smart-home/smart-home-2027-home-assistant-homey-jeedom-alexa/)

                [All smart-home guides](/en/smart-home/)
                """
            ).strip(),
            "de": dedent(
                f"""
                **CES 2027**: **mmWave** (z. B. **Aqara FP300**), **lokale KI**, **Energie** ohne Abo — passend zu [lokalem Smart Home]({LINK_LOCAL}) und [100 Projekten]({LINK_PROJETS}).

                [HA 2026.10](/de/smart-home/home-assistant-2026-10-matter-reolink-tuya-batterien/) · [Vergleich 2027](/de/smart-home/smart-home-2027-home-assistant-homey-jeedom-alexa/)
                """
            ).strip(),
            "it": dedent(
                f"""
                **CES 2027**: **mmWave** (**Aqara FP300**), **IA locale**, **energia** senza abbonamento — vedi [casa locale]({LINK_LOCAL}) e [100 progetti]({LINK_PROJETS}).

                [HA 2026.10](/it/domotica/home-assistant-2026-10-matter-reolink-tuya-batterie/) · [Confronto 2027](/it/domotica/casa-intelligente-2027-home-assistant-homey-jeedom-alexa/)
                """
            ).strip(),
            "es": dedent(
                f"""
                **CES 2027**: **mmWave** (**Aqara FP300**), **IA local**, **energía** sin suscripción — [hogar local]({LINK_LOCAL}), [100 proyectos]({LINK_PROJETS}).

                [HA 2026.10](/es/domotica/home-assistant-2026-10-matter-reolink-tuya-baterias/) · [Comparativa 2027](/es/domotica/hogar-inteligente-2027-home-assistant-homey-jeedom-alexa/)
                """
            ).strip(),
        },
    }
    return bodies[fr_slug][lang]


def normalize_body(text: str) -> str:
    return "\n".join(line.lstrip() for line in text.splitlines()).strip()


def write_fr_mdx(slug: str) -> Path:
    meta = FR_META[slug]
    body = normalize_body(FR_BODIES[slug]())
    content = (
        "---\n"
        f'title: "{meta["title"]}"\n'
        f'description: "{meta["description"]}"\n'
        "pubDate: 2026-10-28T00:00:00Z\n"
        f'category: "{meta["category"]}"\n'
        f"priority: {meta['priority']}\n"
        "---\n\n"
        f"{body}\n"
    )
    path = FR_DIR / f"{slug}.mdx"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return path


def write_i18n_md(lang: str, fr_slug: str) -> Path:
    slugs = load_slugs()[fr_slug]
    seg = slugs[lang]
    meta = I18N_META[fr_slug][lang]
    aff = i18n_affiliate_block(lang, AFF_H2[lang], AFF_LEAD[lang])
    fr_link = f"/domotique/{fr_slug}/"
    label = FR_LINK_LABEL[lang]
    body = normalize_body(i18n_body(lang, fr_slug))
    note = {
        "en": "Also available in",
        "de": "Auch auf",
        "it": "Disponibile anche in",
        "es": "También en",
    }[lang]
    content = (
        "---\n"
        "layout: ../../../layouts/EnPost.astro\n"
        f'title: "{meta["title"]}"\n'
        f'description: "{meta["description"]}"\n'
        f'updated: "{meta["updated"]}"\n'
        "---\n\n"
        f"{aff}\n"
        f"*{note} [{label}]({fr_link}).*\n\n"
        f"{body}\n"
    )
    path = LANG_DIRS[lang] / f"{seg}.md"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return path


def append_i18n_pages() -> list[str]:
    slugs = load_slugs()
    arrays = {
        "EN_PAGES": "en",
        "DE_PAGES": "de",
        "IT_PAGES": "it",
        "ES_PAGES": "es",
    }
    bases = {
        "en": "/en/smart-home/",
        "de": "/de/smart-home/",
        "it": "/it/domotica/",
        "es": "/es/domotica/",
    }
    text = I18N_PATH.read_text(encoding="utf-8")
    added: list[str] = []
    for fr_slug in SERIES_SLUGS:
        for arr_name, lang in arrays.items():
            href = f"{bases[lang]}{slugs[fr_slug][lang]}/"
            fr_href = f"/domotique/{fr_slug}/"
            title = I18N_META[fr_slug][lang]["title"].replace("'", "\\'")
            if href in text:
                continue
            line = f"\t{{ href: '{href}', fr: '{fr_href}', title: '{title}' }},\n"
            pattern = rf"(export const {arr_name} = \[)(.*?)(\n\];)"
            m = re.search(pattern, text, re.DOTALL)
            if not m:
                raise SystemExit(f"Cannot find {arr_name}")
            body_part = m.group(2)
            if not body_part.endswith("\n"):
                body_part += "\n"
            text = text[: m.start(2)] + body_part + line + text[m.start(3) :]
            added.append(f"{arr_name}: {href}")
    I18N_PATH.write_text(text, encoding="utf-8")
    return added


def main() -> int:
    created: list[str] = []
    for slug in SERIES_SLUGS:
        p = write_fr_mdx(slug)
        created.append(str(p.relative_to(ROOT)))
        for lang in ("en", "de", "it", "es"):
            p2 = write_i18n_md(lang, slug)
            created.append(str(p2.relative_to(ROOT)))
    added = append_i18n_pages()
    print(f"OK: wrote {len(created)} content files.")
    for f in created:
        print(f"  - {f}")
    if added:
        print(f"OK: appended {len(added)} i18n.mjs entries.")
        for a in added:
            print(f"  - {a}")
    else:
        print("i18n.mjs entries already present.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
