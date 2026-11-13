import fs from 'node:fs';
import path from 'node:path';
import { racineProjet } from '../../lib/racine-projet.mjs';
import { lireRegistre, partenairesPublies } from '../../../public/cron/partenaires-md.mjs';
import { LANGS, PREFIX } from './site.mjs';

export { LANGS, PREFIX };

const root = racineProjet();
const markdown = fs.readFileSync(path.join(root, 'PARTENAIRES.md'), 'utf8');
export const PUBLIES = partenairesPublies(lireRegistre(markdown));
export const SLUGS = PUBLIES.map((p) => p.slug);

export const PAIRES_PARTENAIRES = [
  Object.fromEntries(LANGS.map((l) => [l, PREFIX[l]])),
  ...PUBLIES.map((p) => Object.fromEntries(LANGS.map((l) => [l, `${PREFIX[l]}${p.slug}/`]))),
];

export function paireDe(pathname) {
  const n = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return PAIRES_PARTENAIRES.find((r) => Object.values(r).includes(n)) || null;
}

export function defautMarche(lang) {
  return lang === 'en' ? '' : lang;
}

const PAYS = {
  fr: { fr: 'France', de: 'Allemagne', it: 'Italie', es: 'Espagne', uk: 'Royaume-Uni', us: 'États-Unis', ca: 'Canada', nl: 'Pays-Bas', eu: 'Europe', international: 'international' },
  en: { fr: 'France', de: 'Germany', it: 'Italy', es: 'Spain', uk: 'United Kingdom', us: 'United States', ca: 'Canada', nl: 'Netherlands', eu: 'Europe', international: 'international' },
  de: { fr: 'Frankreich', de: 'Deutschland', it: 'Italien', es: 'Spanien', uk: 'Vereinigtes Königreich', us: 'USA', ca: 'Kanada', nl: 'Niederlande', eu: 'Europa', international: 'international' },
  it: { fr: 'Francia', de: 'Germania', it: 'Italia', es: 'Spagna', uk: 'Regno Unito', us: 'Stati Uniti', ca: 'Canada', nl: 'Paesi Bassi', eu: 'Europa', international: 'internazionale' },
  es: { fr: 'Francia', de: 'Alemania', it: 'Italia', es: 'España', uk: 'Reino Unido', us: 'Estados Unidos', ca: 'Canadá', nl: 'Países Bajos', eu: 'Europa', international: 'internacional' },
  nl: { fr: 'Frankrijk', de: 'Duitsland', it: 'Italië', es: 'Spanje', uk: 'Verenigd Koninkrijk', us: 'Verenigde Staten', ca: 'Canada', nl: 'Nederland', eu: 'Europa', international: 'internationaal' },
};

export function paysDe(lang, marche) {
  return (PAYS[lang] || PAYS.fr)[marche] || (PAYS.fr[marche] || marche);
}

export function textes(lang) {
  const L = {
    fr: {
      titreIndex: 'Partenaires',
      descriptionIndex: 'Les enseignes et les marques dont le partenariat est accepté, avec leur site lorsqu’il est connu et les articles du site qui les citent.',
      titreFiche: (nom) => `${nom}, partenaire`,
      descriptionFiche: (nom, marche) => `${nom} figure parmi les partenaires du site pour le marché ${paysDe('fr', marche)}.`,
      chapo: (nom, marche) => `${nom} figure parmi les partenaires du site pour le marché ${paysDe('fr', marche)}.`,
      intro: 'Chaque fiche correspond à un partenariat accepté. Le filtre retient le pays de la page, les programmes européens et les programmes internationaux.',
      tous: 'Tous',
      marcheLabel: 'Pays',
      familleLabel: 'Type',
      marques: 'Marques',
      revendeurs: 'Revendeurs',
      accueil: 'Accueil',
      marche: 'Marché',
      depuis: 'Partenariat accepté le',
      site: 'Site officiel',
      voir: (nom) => `Voir chez ${nom}`,
      prix: 'Consulter le prix',
      articles: 'Articles du site qui en parlent',
      autres: 'Le même partenaire sur d’autres marchés',
      affiliation: 'Comment le site parle de ses liens commerciaux',
      vide: 'Aucun partenaire accepté n’est encore publié.',
    },
    en: {
      titreIndex: 'Partners',
      descriptionIndex: 'Brands and shops with an accepted partnership, their official site when it is known, and the articles on this site that mention them.',
      titreFiche: (nom) => `${nom}, partner`,
      descriptionFiche: (nom, marche) => `${nom} is one of the site’s partners for the ${paysDe('en', marche)} market.`,
      chapo: (nom, marche) => `${nom} is one of the site’s partners for the ${paysDe('en', marche)} market.`,
      intro: 'Each page is one accepted partnership. The filter keeps this page’s country, European programmes and international programmes.',
      tous: 'All',
      marcheLabel: 'Country',
      familleLabel: 'Type',
      marques: 'Brands',
      revendeurs: 'Retailers',
      accueil: 'Home',
      marche: 'Market',
      depuis: 'Partnership accepted on',
      site: 'Official site',
      voir: (nom) => `View at ${nom}`,
      prix: 'See the price',
      articles: 'Articles on this site that mention it',
      autres: 'The same partner on other markets',
      affiliation: 'How this site uses commercial links',
      vide: 'No accepted partner is published yet.',
    },
    de: {
      titreIndex: 'Partner',
      descriptionIndex: 'Marken und Händler mit angenommenem Partnerprogramm, ihre Website wenn sie bekannt ist, und die Artikel dieser Website, die sie nennen.',
      titreFiche: (nom) => `${nom}, Partner`,
      descriptionFiche: (nom, marche) => `${nom} gehört zu den Partnern der Website für den Markt ${paysDe('de', marche)}.`,
      chapo: (nom, marche) => `${nom} gehört zu den Partnern der Website für den Markt ${paysDe('de', marche)}.`,
      intro: 'Jede Seite ist ein angenommenes Partnerprogramm. Der Filter zeigt das Land dieser Seite, europäische Programme und internationale Programme.',
      tous: 'Alle',
      marcheLabel: 'Land',
      familleLabel: 'Art',
      marques: 'Marken',
      revendeurs: 'Händler',
      accueil: 'Start',
      marche: 'Markt',
      depuis: 'Partnerschaft angenommen am',
      site: 'Offizielle Website',
      voir: (nom) => `Bei ${nom} ansehen`,
      prix: 'Preis ansehen',
      articles: 'Artikel dieser Website, die davon sprechen',
      autres: 'Derselbe Partner auf anderen Märkten',
      affiliation: 'Wie die Website mit Werbelinks umgeht',
      vide: 'Noch kein angenommener Partner ist veröffentlicht.',
    },
    it: {
      titreIndex: 'Partner',
      descriptionIndex: 'Marchi e negozi con una partnership accettata, il sito ufficiale quando è noto, e gli articoli di questo sito che li citano.',
      titreFiche: (nom) => `${nom}, partner`,
      descriptionFiche: (nom, marche) => `${nom} è tra i partner del sito per il mercato ${paysDe('it', marche)}.`,
      chapo: (nom, marche) => `${nom} è tra i partner del sito per il mercato ${paysDe('it', marche)}.`,
      intro: 'Ogni scheda è una partnership accettata. Il filtro tiene il paese di questa pagina, i programmi europei e quelli internazionali.',
      tous: 'Tutti',
      marcheLabel: 'Paese',
      familleLabel: 'Tipo',
      marques: 'Marchi',
      revendeurs: 'Negozi',
      accueil: 'Home',
      marche: 'Mercato',
      depuis: 'Partnership accettata il',
      site: 'Sito ufficiale',
      voir: (nom) => `Vedi su ${nom}`,
      prix: 'Vedi il prezzo',
      articles: 'Articoli del sito che ne parlano',
      autres: 'Lo stesso partner su altri mercati',
      affiliation: 'Come il sito usa i link commerciali',
      vide: 'Nessun partner accettato è ancora pubblicato.',
    },
    es: {
      titreIndex: 'Socios',
      descriptionIndex: 'Marcas y tiendas con una colaboración aceptada, su sitio oficial cuando se conoce, y los artículos de este sitio que las citan.',
      titreFiche: (nom) => `${nom}, socio`,
      descriptionFiche: (nom, marche) => `${nom} figura entre los socios del sitio para el mercado ${paysDe('es', marche)}.`,
      chapo: (nom, marche) => `${nom} figura entre los socios del sitio para el mercado ${paysDe('es', marche)}.`,
      intro: 'Cada ficha es una colaboración aceptada. El filtro deja el país de esta página, los programas europeos y los internacionales.',
      tous: 'Todos',
      marcheLabel: 'País',
      familleLabel: 'Tipo',
      marques: 'Marcas',
      revendeurs: 'Tiendas',
      accueil: 'Inicio',
      marche: 'Mercado',
      depuis: 'Colaboración aceptada el',
      site: 'Sitio oficial',
      voir: (nom) => `Ver en ${nom}`,
      prix: 'Consultar el precio',
      articles: 'Artículos del sitio que lo mencionan',
      autres: 'El mismo socio en otros mercados',
      affiliation: 'Cómo el sitio usa los enlaces comerciales',
      vide: 'Todavía no hay un socio aceptado publicado.',
    },
    nl: {
      titreIndex: 'Partners',
      descriptionIndex: 'Merken en winkels met een aanvaarde samenwerking, hun officiële site wanneer die bekend is, en de artikelen op deze site die hen noemen.',
      titreFiche: (nom) => `${nom}, partner`,
      descriptionFiche: (nom, marche) => `${nom} hoort bij de partners van de site voor de markt ${paysDe('nl', marche)}.`,
      chapo: (nom, marche) => `${nom} hoort bij de partners van de site voor de markt ${paysDe('nl', marche)}.`,
      intro: 'Elke fiche is een aanvaarde samenwerking. De filter houdt het land van deze pagina, Europese programma’s en internationale programma’s.',
      tous: 'Alles',
      marcheLabel: 'Land',
      familleLabel: 'Type',
      marques: 'Merken',
      revendeurs: 'Winkels',
      accueil: 'Home',
      marche: 'Markt',
      depuis: 'Samenwerking aanvaard op',
      site: 'Officiële site',
      voir: (nom) => `Bekijk bij ${nom}`,
      prix: 'Prijs bekijken',
      articles: 'Artikelen op deze site die het noemen',
      autres: 'Dezelfde partner op andere markten',
      affiliation: 'Hoe de site commerciële links gebruikt',
      vide: 'Er is nog geen aanvaarde partner gepubliceerd.',
    },
  };
  return L[lang] || L.fr;
}

export function dateAffichee(valeur, lang) {
  const m = String(valeur || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  if (lang === 'de') return `${m[3]}.${m[2]}.${m[1]}`;
  if (lang === 'en') {
    const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
  }
  return `${m[3]}/${m[2]}/${m[1]}`;
}

export function logoDe(slug) {
  const dir = path.join(root, 'public', 'images', 'partenaires');
  for (const ext of ['svg', 'png', 'webp']) {
    if (fs.existsSync(path.join(dir, `${slug}.${ext}`))) return `/images/partenaires/${slug}.${ext}`;
  }
  return '';
}

export function metaPage(lang, slug) {
  const t = textes(lang);
  if (!slug) return { titre: t.titreIndex, description: t.descriptionIndex };
  const p = PUBLIES.find((x) => x.slug === slug);
  const nom = p ? p.nom : slug;
  return { titre: t.titreFiche(nom), description: t.descriptionFiche(nom, p ? p.marche : 'international') };
}

let indexPages;

function langDu(url) {
  const m = url.match(/^\/(en|de|it|es|nl|uk|ca|us)\//);
  if (!m) return 'fr';
  if (m[1] === 'uk' || m[1] === 'ca' || m[1] === 'us') return 'en';
  return m[1];
}

function urlDe(rel) {
  let u = rel.replace(/\\/g, '/').replace(/\.(astro|md|mdx)$/i, '');
  if (u.endsWith('/index')) u = u.slice(0, -'/index'.length);
  if (u === 'index' || u === '') return '/';
  return `/${u}/`;
}

function titrePropre(s) {
  const t = String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (t.length < 3 || t.length > 140 || /[{}<>]/.test(t)) return '';
  return t;
}

function titreDe(brut, url) {
  const h1 = brut.match(/<h1[^>]*>([\s\S]{0,240}?)<\/h1>/i);
  const inner = h1 ? h1[1].replace(/<[^>]+>/g, '').trim() : '';
  const expr = inner.match(/^\{([A-Za-z_][\w]*)\}$/);
  if (expr) {
    const lu = brut.match(new RegExp(`(?:const|let)\\s+${expr[1]}\\s*=\\s*['"\`]([^'"\`]{3,160})['"\`]`));
    const ok = lu && titrePropre(lu[1]);
    if (ok) return ok;
  }
  const candidats = [
    inner,
    (brut.match(/^#\s+(.{3,160})$/m) || [])[1],
    (brut.match(/title:\s*["']([^"']{3,160})["']/) || [])[1],
    (brut.match(/(?:const|let)\s+(?:titreSeo|titrePage|titre|title)\s*=\s*['"`]([^'"`]{3,160})['"`]/) || [])[1],
  ];
  for (const c of candidats) {
    const ok = titrePropre(c);
    if (ok) return ok;
  }
  const seg = url.split('/').filter(Boolean).pop() || 'Article';
  const mots = seg.replace(/-/g, ' ');
  return mots.charAt(0).toUpperCase() + mots.slice(1);
}

function indexer() {
  if (indexPages) return indexPages;
  const pages = path.join(root, 'src', 'pages');
  const hors = new Set(['partenaires', 'partners', 'partner', 'socios', 'node_modules', 'dist', 'dist-v19']);
  const liste = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('.') || name.startsWith('[')) continue;
      const abs = path.join(dir, name);
      const st = fs.statSync(abs);
      if (st.isDirectory()) {
        if (!hors.has(name)) walk(abs);
        continue;
      }
      if (!/\.(astro|md|mdx)$/i.test(name) || st.size > 1_500_000) continue;
      const rel = path.relative(pages, abs);
      if (rel.includes('[')) continue;
      const url = urlDe(rel);
      const brut = fs.readFileSync(abs, 'utf8').slice(0, 120_000);
      liste.push({ url, lang: langDu(url), titre: titreDe(brut, url), bas: brut.toLowerCase() });
    }
  }
  walk(pages);
  indexPages = liste;
  return liste;
}

function echapper(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HORS_ARTICLE = /\/(affiliation|affiliate|affiliazione|afiliacion|transpar|werbehinweis|mentions|impressum|privacy|confidential|cookies|contact|kontakt|contatti|contacto|a-propos|about|ueber-uns|chi-siamo|partenariat|partnership|404)(\/|$)/;

export function articlesPour(partenaire, lang) {
  const pages = indexer();
  let motif = '';
  if (partenaire.amazon) {
    const domaine = {
      fr: 'amazon.fr', de: 'amazon.de', it: 'amazon.it', es: 'amazon.es',
      uk: 'amazon.co.uk', us: 'amazon.com', ca: 'amazon.ca', nl: 'amazon.nl',
    }[partenaire.marche];
    if (!domaine) return [];
    motif = domaine === 'amazon.com' ? 'amazon\\.com(?!\\.be)' : echapper(domaine);
  } else {
    const nom = String(partenaire.nom || '').replace(/\s*\([^)]*\)/g, '').trim();
    if (nom.length < 3) return [];
    motif = `\\b${echapper(nom.toLowerCase())}\\b`;
  }
  const re = new RegExp(motif, 'i');
  const langue = lang === 'uk' || lang === 'ca' || lang === 'us' ? 'en' : lang;
  return pages
    .filter((p) => p.lang === langue && (langue !== 'en' || p.url.startsWith('/en/')) && !HORS_ARTICLE.test(p.url) && re.test(p.bas))
    .slice(0, 6)
    .map((p) => ({ href: p.url, titre: p.titre }));
}

export function liensUtiles(lang) {
  const pages = indexer();
  const langue = lang === 'uk' || lang === 'ca' ? 'en' : lang;
  const meme = pages.filter((p) => p.lang === langue && (langue !== 'en' || p.url.startsWith('/en/')));
  const aff = meme.find((p) => /\/(affiliation|affiliate-disclosure|affiliate-hinweis|affiliazione|afiliacion|werbehinweis|transparenz|transparantie|trasparenza|transparencia|affiliatebeleid)\//.test(p.url))
    || meme.find((p) => /\/(partenariat|partnership|partnerschaft|colaboracion)\//.test(p.url));
  const contact = meme.find((p) => /\/(contact|kontakt|contatti|contacto|contatto)\/$/.test(p.url));
  const about = meme.find((p) => /\/(a-propos|about|ueber-uns|chi-siamo|sobre-nosotros|over-ons)\/$/.test(p.url));
  const t = textes(lang);
  const out = [];
  if (aff) out.push({ href: aff.url, titre: t.affiliation });
  if (contact) out.push({ href: contact.url, titre: contact.titre });
  else if (about) out.push({ href: about.url, titre: about.titre });
  return out;
}
