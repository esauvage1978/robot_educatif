/*! geo-amazon v1 (13/11/2026) : boutique Amazon selon le pays du visiteur.
 * Pays deduit du fuseau horaire (Intl) et de la langue du navigateur, sans appel reseau.
 * Pays inconnu ou ambigu : lien d'origine inchange.
 * - Liens /go/az-.../ : ajoute ?cc=XX, go.php choisit la boutique et le tag (liste blanche cote serveur).
 * - Liens Amazon directs : meme boutique -> tag de la boutique ; autre boutique -> seulement
 *   pour un lien ASIN (/dp/) ou une recherche (/s?k=), en recherche sur la boutique du visiteur.
 * Les attributs rel, target et data-go ne sont jamais modifies.
 * Test : ajouter ?amzcc=GB a l'URL de la page.
 */
(function () {
  'use strict';
  var STORES = {
    FR: ['www.amazon.fr', 'manuso06-21'],
    US: ['www.amazon.com', 'roboteducatif-20'],
    GB: ['www.amazon.co.uk', 'roboteducatif-21'],
    CA: ['www.amazon.ca', 'roboteducat03-20'],
    DE: ['www.amazon.de', 'roboteducat00-21'],
    IT: ['www.amazon.it', 'roboteducat0f-21'],
    ES: ['www.amazon.es', 'roboteducat07-21'],
    NL: ['www.amazon.nl', 'manuso0607-21']
  };
  var OUR_TAGS = {};
  for (var k in STORES) OUR_TAGS[STORES[k][1]] = 1;
  var HOST_CC = { 'amazon.fr': 'FR', 'amazon.com': 'US', 'amazon.co.uk': 'GB', 'amazon.ca': 'CA', 'amazon.de': 'DE', 'amazon.it': 'IT', 'amazon.es': 'ES', 'amazon.nl': 'NL' };
  // pays sans boutique dediee servis par une boutique voisine
  var ALIAS = { AT: 'DE', MC: 'FR', JE: 'GB', GG: 'GB', IM: 'GB' };
  // langues plausibles par pays (controle quand la langue n'indique pas de region)
  var LANGS = { FR: 'fr', US: 'en es', GB: 'en cy gd', CA: 'en fr', DE: 'de', AT: 'de', IT: 'it', ES: 'es ca eu gl', NL: 'nl fy', MC: 'fr', JE: 'en', GG: 'en', IM: 'en' };
  var TZ = {
    'Europe/Paris': 'FR', 'Europe/Monaco': 'MC',
    'Europe/London': 'GB', 'Europe/Belfast': 'GB', 'GB': 'GB', 'GB-Eire': 'GB', 'Europe/Jersey': 'JE', 'Europe/Guernsey': 'GG', 'Europe/Isle_of_Man': 'IM',
    'Europe/Berlin': 'DE', 'Europe/Busingen': 'DE', 'Europe/Vienna': 'AT',
    'Europe/Rome': 'IT', 'Europe/Madrid': 'ES', 'Atlantic/Canary': 'ES', 'Africa/Ceuta': 'ES', 'Europe/Amsterdam': 'NL'
  };
  var CA_TZ = 'Toronto Montreal Vancouver Edmonton Winnipeg Halifax St_Johns Regina Moncton Glace_Bay Goose_Bay Whitehorse Dawson Yellowknife Iqaluit Rankin_Inlet Resolute Cambridge_Bay Inuvik Swift_Current Creston Dawson_Creek Fort_Nelson Atikokan Blanc-Sablon Nipigon Thunder_Bay Rainy_River Pangnirtung'.split(' ');
  var US_TZ = 'New_York Chicago Denver Los_Angeles Phoenix Anchorage Juneau Sitka Metlakatla Yakutat Nome Adak Boise Detroit Menominee'.split(' ');
  for (var i = 0; i < CA_TZ.length; i++) TZ['America/' + CA_TZ[i]] = 'CA';
  for (var j = 0; j < US_TZ.length; j++) TZ['America/' + US_TZ[j]] = 'US';
  TZ['Pacific/Honolulu'] = 'US';

  function tzCountry(tz) {
    if (!tz) return '';
    if (TZ[tz]) return TZ[tz];
    if (/^America\/(Indiana|Kentucky|North_Dakota)\//.test(tz) || /^US\//.test(tz)) return 'US';
    if (/^Canada\//.test(tz)) return 'CA';
    return '';
  }
  function primaryLang() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return String(l);
  }
  function detect() {
    try {
      var q = /[?&]amzcc=([A-Za-z]{2})\b/.exec(location.search);
      if (q) { var f = q[1].toUpperCase(); return STORES[f] ? f : (ALIAS[f] || ''); }
    } catch (e) {}
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    var tzC = tzCountry(tz);
    var lang = primaryLang();
    var m = /^([a-z]{2,3})(?:[-_][A-Za-z]{4})?(?:[-_]([A-Za-z]{2}))?/i.exec(lang);
    var base = m ? m[1].toLowerCase() : '';
    var langC = m && m[2] ? m[2].toUpperCase() : '';
    var langOk = langC && (STORES[langC] || ALIAS[langC]);
    var c = '';
    if (tzC && langC) {
      if (tzC === langC) c = tzC;
      else if (langOk) c = tzC; // langue d'un pays gere, fuseau d'un autre : le fuseau donne le lieu
      else c = '';              // langue d'un pays non gere (ex. sv-SE) : ambigu
    } else if (tzC) {
      c = (LANGS[tzC] || '').split(' ').indexOf(base) >= 0 ? tzC : '';
    } else if (langOk) {
      c = langC;
    }
    if (!c) return '';
    return STORES[c] ? c : (ALIAS[c] || '');
  }

  var CC = detect();
  try { document.documentElement.setAttribute('data-amz-cc', CC || 'none'); } catch (e) {}
  window.__geoAmazon = { country: CC, version: 1 };
  if (!CC) return;
  var TARGET = STORES[CC];

  function asinOf(path) {
    var a = /\/(?:dp|gp\/product|gp\/aw\/d|exec\/obidos\/ASIN)\/([A-Z0-9]{10})(?:[\/?]|$)/i.exec(path);
    return a ? a[1].toUpperCase() : '';
  }
  function amazonUrl(u) {
    var host = u.hostname.toLowerCase().replace(/^www\./, '');
    var from = HOST_CC[host];
    if (!from) return null;
    var cur = u.searchParams.get('tag') || '';
    if (from === CC) {
      if (cur && !OUR_TAGS[cur]) return null; // tag volontaire different : on n'y touche pas
      if (cur === TARGET[1]) return null;
      u.searchParams.set('tag', TARGET[1]);
      return u.toString();
    }
    if (cur && !OUR_TAGS[cur]) return null;
    var kw = '';
    if (/^\/s\/?$/.test(u.pathname)) kw = u.searchParams.get('k') || u.searchParams.get('field-keywords') || '';
    else kw = asinOf(u.pathname);
    if (!kw) return null; // ni ASIN ni recherche : lien d'origine
    return 'https://' + TARGET[0] + '/s?k=' + encodeURIComponent(kw) + '&tag=' + TARGET[1];
  }
  function fix(a) {
    if (!a || a.getAttribute('data-amz-geo')) return;
    var href = a.getAttribute('href');
    if (!href) return;
    var u;
    try { u = new URL(href, location.href); } catch (e) { return; }
    var out = null;
    if (u.host === location.host && /\/go\/az-[a-z0-9-]+\/?$/i.test(u.pathname)) {
      if (u.searchParams.get('cc') === CC) return;
      u.searchParams.set('cc', CC);
      out = u.pathname + u.search + u.hash;
      if (!/^\//.test(href)) out = u.toString();
    } else if (/^https?:$/.test(u.protocol)) {
      out = amazonUrl(u);
    }
    if (out && out !== href) {
      a.setAttribute('href', out);
      a.setAttribute('data-amz-geo', CC);
    }
  }
  function all() {
    var list = document.querySelectorAll('a[href*="/go/az-"], a[href*="amazon."]');
    for (var n = 0; n < list.length; n++) fix(list[n]);
  }
  function onEvent(e) {
    var t = e.target;
    while (t && t.nodeName !== 'A') t = t.parentNode;
    if (t && t.getAttribute) fix(t);
  }
  document.addEventListener('click', onEvent, true);
  document.addEventListener('auxclick', onEvent, true);
  document.addEventListener('contextmenu', onEvent, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all);
  else all();
})();
