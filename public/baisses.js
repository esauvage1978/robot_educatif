/* Affiche le relevé du jour s'il est plus récent que le HTML. Amazon est refusé. */
(function () {
  var MIDS = /* MIDS_REGISTRE */{'126615':1,'48247':1,'70050':1,'34819':1,'23364':1,'17132':1,'128141':1,'19517':1,'94395':1,'65454':1,'97777':1,'60241':1,'69050':1,'26009':1,'98667':1,'32623':1,'125144':1,'127129':1,'84037':1,'128145':1,'118701':1,'87809':1,'72861':1,'37618':1,'73121':1,'106471':1,'129295':1,'127825':1,'123172':1,'25962':1,'32269':1,'127059':1,'13433':1,'130101':1,'124978':1,'23030':1,'16001':1,'97013':1,'32419':1,'69964':1,'113876':1,'67878':1,'127057':1,'26955':1,'51799':1,'131716':1,'105805':1,'92427':1,'61127':1,'11650':1,'12513':1,'11447':1,'131482':1,'14433':1,'90211':1,'123940':1,'49085':1,'126875':1,'97677':1,'55941':1,'14854':1,'17430':1,'80509':1,'45751':1,'115128':1,'127701':1,'127705':1,'127707':1,'127703':1,'131018':1,'129263':1,'129265':1,'14698':1,'98001':1,'116377':1,'129593':1,'128847':1,'129595':1,'125816':1,'122426':1,'122428':1,'126973':1,'123234':1,'21287':1,'121708':1,'128871':1,'112796':1,'19485':1,'70837':1,'96189':1,'92657':1,'118735':1,'127141':1,'115963':1,'13737':1,'127267':1,'14040':1,'107077':1,'131533':1,'131611':1,'117721':1,'114094':1,'9450':1,'77658':1,'68962':1,'114674':1,'82873':1,'102989':1,'127821':1,'109918':1,'74942':1,'77138':1,'94797':1,'123182':1,'112024':1,'51891':1,'73435':1,'93543':1,'23309':1,'59085':1,'32299':1,'8059':1,'128973':1,'121790':1,'16937':1,'120289':1,'130419':1,'27417':1,'116843':1,'24882':1,'131150':1,'100407':1,'122030':1,'125678':1,'120988':1,'117937':1,'120836':1,'129591':1,'129597':1,'44051':1,'31806':1,'113160':1,'54951':1}/* MIDS_REGISTRE */;
  var AFFID = /* AFFID_REGISTRE */'3126073'/* AFFID_REGISTRE */;
  var el = document.getElementById('liste-baisses');
  var textes = document.getElementById('baisses-i18n');
  if (!el || !textes) return;
  var T = JSON.parse(textes.textContent);
  var lang = el.getAttribute('data-lang') || 'fr';

  function aujourdhui() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }
  function frais(iso, auj) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return false;
    var j = (Date.parse(auj + 'T00:00:00Z') - Date.parse(iso + 'T00:00:00Z')) / 86400000;
    return j >= 0 && j <= 2;
  }
  function visible(p) {
    if (p.langue && p.langue !== lang) return false;
    if (p.marche === 'de') return lang === 'de';
    if (p.marche === 'us') return lang === 'en';
    return p.marche === 'eu';
  }
  function imageOk(url) {
    try {
      var u = new URL(url);
      var h = u.hostname.toLowerCase();
      if (u.protocol !== 'https:') return false;
      if (h === 'amazon' || h.indexOf('amazon') !== -1 || h.indexOf('amzn.') !== -1) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
  function hrefOk(href) {
    try {
      var u = new URL(href);
      if (u.protocol !== 'https:' || u.hostname !== 'www.awin1.com') return false;
      if (u.searchParams.get('awinaffid') !== AFFID || !MIDS[u.searchParams.get('awinmid') || '']) return false;
      var dest = u.searchParams.get('ued');
      if (!dest) return false;
      var d = new URL(dest);
      var h = d.hostname.toLowerCase();
      if (d.protocol !== 'https:') return false;
      if (h === 'amazon' || h.indexOf('amazon.') !== -1 || h.indexOf('.amazon.') !== -1 || h.indexOf('amzn.') !== -1) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
  function locale() {
    return { fr: 'fr-FR', en: 'en-GB', de: 'de-DE', it: 'it-IT', es: 'es-ES', nl: 'nl-NL' }[lang] || 'fr-FR';
  }
  function montant(n, devise) {
    return new Intl.NumberFormat(locale(), { style: 'currency', currency: devise }).format(n);
  }
  function dateLongue(iso) {
    return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z'));
  }
  function pourcent(ratio) {
    var pct = Math.round(ratio * 1000) / 10;
    var s = Number.isInteger(pct) ? String(pct) : pct.toFixed(1);
    return lang === 'en' ? s : s.replace('.', ',');
  }
  function base(p) {
    if (p.signal === 'releve') return T.baseReleve.replace('{date}', dateLongue(p.dateReference));
    if (p.signal === 'sale_price') return T.baseSale;
    return T.baseOld;
  }
  function nomMarque(data, p) {
    var meta = (data.partenaires || []).filter(function (x) { return x.mid === p.mid; })[0];
    return meta ? meta.nom : p.marque;
  }
  function normaliser(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function appliquerFiltres() {
    var marque = document.getElementById('filtre-marque');
    var champ = document.getElementById('filtre-produit');
    var grille = document.getElementById('grille-baisses');
    var vide = document.getElementById('baisses-filtre-vide');
    if (!grille) return;
    var m = marque ? marque.value : '';
    var texte = normaliser(champ ? champ.value : '');
    var n = 0;
    grille.querySelectorAll('.carte-baisse').forEach(function (carte) {
      var ok = (!m || carte.getAttribute('data-marque') === m) && (!texte || normaliser(carte.getAttribute('data-produit')).indexOf(texte) !== -1);
      carte.hidden = !ok;
      if (ok) n += 1;
    });
    if (vide) vide.hidden = n !== 0 || !grille.querySelector('.carte-baisse');
  }
  function syncMarques() {
    var sel = document.getElementById('filtre-marque');
    var grille = document.getElementById('grille-baisses');
    if (!sel || !grille) return;
    var courant = sel.value;
    var vus = {};
    grille.querySelectorAll('.carte-baisse').forEach(function (carte) {
      var nom = carte.getAttribute('data-marque') || '';
      if (nom) vus[nom] = 1;
    });
    var noms = Object.keys(vus).sort(function (a, b) { return a.localeCompare(b, lang); });
    var toutes = sel.options[0] ? sel.options[0].textContent : '';
    sel.replaceChildren();
    var opt0 = document.createElement('option');
    opt0.value = '';
    opt0.textContent = toutes;
    sel.appendChild(opt0);
    noms.forEach(function (nom) {
      var opt = document.createElement('option');
      opt.value = nom;
      opt.textContent = nom;
      sel.appendChild(opt);
    });
    sel.value = noms.indexOf(courant) !== -1 ? courant : '';
  }
  function majFlux(data) {
    document.querySelectorAll('[data-flux-mid]').forEach(function (cell) {
      var mid = cell.getAttribute('data-flux-mid');
      var info = (data.partenaires || []).filter(function (x) { return x.mid === mid; })[0];
      if (!info) return;
      var lib = { 'non-interroge': T.fluxNon, absent: T.fluxAbsent, ok: T.fluxOk, erreur: T.fluxErr }[info.flux] || T.fluxErr;
      if (info.flux === 'ok') lib = lib.replace('{lus}', String(info.lus)).replace('{retenus}', String(info.retenus));
      cell.textContent = lib;
    });
  }
  function rendre(data, produits) {
    var etat = document.getElementById('baisses-etat');
    var grille = document.getElementById('grille-baisses');
    var form = document.getElementById('filtres-baisses');
    majFlux(data);
    if (!grille) return;
    produits = produits.slice().sort(function (a, b) { return b.ratio - a.ratio || b.ecart - a.ecart || String(a.nom).localeCompare(b.nom, lang); });
    grille.replaceChildren();
    if (form) form.hidden = produits.length === 0;
    if (!produits.length) {
      if (etat) etat.textContent = !data || !data.genereLe ? (T.majVide || T.vide) : !frais(data.genereLe, aujourdhui()) ? T.perime : T.vide;
      appliquerFiltres();
      return;
    }
    if (etat) etat.textContent = '';
    produits.forEach(function (p) {
      var nom = nomMarque(data, p);
      var li = document.createElement('li');
      li.className = 'carte-baisse';
      li.setAttribute('data-marque', nom);
      li.setAttribute('data-produit', p.nom);
      var pct = document.createElement('p');
      pct.className = 'baisse-pct';
      var badge = document.createElement('span');
      badge.textContent = '−' + pourcent(p.ratio) + ' %';
      pct.appendChild(badge);
      li.appendChild(pct);
      if (imageOk(p.image)) {
        var img = document.createElement('img');
        img.className = 'photo-baisse';
        img.src = p.image;
        img.alt = p.nom;
        img.width = 480;
        img.height = 360;
        img.loading = 'lazy';
        li.appendChild(img);
      }
      var marque = document.createElement('p');
      marque.className = 'baisse-marque';
      marque.textContent = nom;
      li.appendChild(marque);
      var h = document.createElement('p');
      h.className = 'baisse-nom';
      h.textContent = p.nom + (p.variantes > 1 ? ' · ' + T.coloris.replace('{n}', String(p.variantes)) : '');
      li.appendChild(h);
      var prix = document.createElement('p');
      prix.className = 'baisse-prix';
      prix.textContent = montant(p.prix, p.devise) + (p.stock === '1' ? ' · ' + T.stock : '');
      li.appendChild(prix);
      var compare = document.createElement('p');
      compare.className = 'baisse-comparaison';
      compare.textContent = montant(p.reference, p.devise) + ' — ' + base(p) + '. ' + T.ecart.replace('{montant}', montant(p.ecart, p.devise)).replace('{pct}', pourcent(p.ratio));
      li.appendChild(compare);
      if (p.marche === 'us') {
        var note = document.createElement('p');
        note.className = 'baisse-marche';
        note.textContent = T.us;
        li.appendChild(note);
      }
      var a = document.createElement('a');
      a.href = p.href;
      a.rel = 'sponsored noopener';
      a.target = '_blank';
      a.className = 'lien-baisse';
      a.setAttribute('data-affilie', 'oui');
      a.setAttribute('data-merchant', p.marque);
      a.setAttribute('data-product', p.id);
      a.setAttribute('data-product-category', 'baisse-prix');
      a.setAttribute('data-page-type', 'baisses');
      a.setAttribute('data-cta-placement', 'carte');
      a.textContent = T.voir.replace('{nom}', nom) + ' · ' + T.lienAff;
      li.appendChild(a);
      grille.appendChild(li);
    });
    syncMarques();
    appliquerFiltres();
  }

  var filtreMarque = document.getElementById('filtre-marque');
  var filtreProduit = document.getElementById('filtre-produit');
  if (filtreMarque) filtreMarque.addEventListener('change', appliquerFiltres);
  if (filtreProduit) filtreProduit.addEventListener('input', appliquerFiltres);

  var auj = aujourdhui();
  if (el.getAttribute('data-genere') && !frais(el.getAttribute('data-genere'), auj)) {
    var etat = document.getElementById('baisses-etat');
    var grille = document.getElementById('grille-baisses');
    var form = document.getElementById('filtres-baisses');
    if (etat) etat.textContent = T.perime;
    if (grille) grille.replaceChildren();
    if (form) form.hidden = true;
  }
  fetch('/prix-du-jour.json', { cache: 'no-store' })
    .then(function (res) { if (!res.ok) throw new Error('http'); return res.json(); })
    .then(function (data) {
      if (!data || data.version !== 1 || data.amazonExclu !== true) return;
      var produits = (data.produits || []).filter(function (p) { return frais(p.releve, auj) && visible(p) && hrefOk(p.href); });
      if ((data.genereLe || '') === (el.getAttribute('data-genere') || '') && el.getAttribute('data-genere')) {
        majFlux(data);
        return;
      }
      rendre(data, produits);
      if (data.genereLe) el.setAttribute('data-genere', data.genereLe);
    })
    .catch(function () {});
})();
