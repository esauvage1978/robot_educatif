#!/usr/bin/env node
// Fetch Amazon product images via the Creators API (OAuth2, credential v3.2 / EU).
// Env: PAAPI_ACCESS_KEY = Credential ID (amzn1.application-oa2-client...), PAAPI_SECRET_KEY = Secret.
// Never commit credentials. Writes src/data/amazon-images.json { ASIN: {url,width,height,title} }.
import fs from 'node:fs'; import path from 'node:path';
const ROOT = process.cwd(), TAG = 'manuso06-21', MKT = 'www.amazon.fr';
const ID = process.env.PAAPI_ACCESS_KEY, SECRET = process.env.PAAPI_SECRET_KEY;
if (!ID || !SECRET) { 
  console.log('[fetch-amazon-images] PA-API credentials not set, skipping');
  const outPath = path.join(ROOT, 'src/data/amazon-images.json');
  if (!fs.existsSync(outPath)) fs.writeFileSync(outPath, '{}\n');
  process.exit(0);
}
const redact = s => String(s).replace(/amzn1\.[\w.\-]+/g, '[REDACTED]');
// Collect ASINs from products.json + content files
const asins = new Set();
const walk = d => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name);
  if (f.isDirectory()) { if (!['node_modules', 'dist', '.git'].includes(f.name) && !/^dist\d/.test(f.name)) walk(p); }
  else if (/\.(json|md|mdx|astro|ts|js)$/.test(f.name)) { const t = fs.readFileSync(p, 'utf8');
    for (const m of t.matchAll(/(?:\/dp\/|\/gp\/product\/|asin=|"asin"\s*:\s*"|asin:\s*["']?)([A-Z0-9]{10})/gi)) asins.add(m[1].toUpperCase()); } } };
walk(path.join(ROOT, 'src'));
const list = [...asins].sort(); console.log(`ASINs: ${list.length}`);
const tr = await fetch('https://api.amazon.co.uk/auth/o2/token', { method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ grant_type: 'client_credentials', client_id: ID, client_secret: SECRET, scope: 'creatorsapi::default' }) });
const tj = await tr.json().catch(() => ({}));
if (!tj.access_token) { 
  console.log('[fetch-amazon-images] OAuth token error', tr.status, redact(JSON.stringify(tj)));
  const outPath = path.join(ROOT, 'src/data/amazon-images.json');
  if (!fs.existsSync(outPath)) fs.writeFileSync(outPath, '{}\n');
  process.exit(0);
}
const out = {}, failed = {}; const sleep = ms => new Promise(r => setTimeout(r, ms));
for (let i = 0; i < list.length; i += 10) {
  const batch = list.slice(i, i + 10);
  const r = await fetch('https://creatorsapi.amazon/catalog/v1/getItems', { method: 'POST',
    headers: { Authorization: 'Bearer ' + tj.access_token, 'Content-Type': 'application/json', 'x-marketplace': MKT },
    body: JSON.stringify({ itemIds: batch, itemIdType: 'ASIN', marketplace: MKT, partnerTag: TAG,
      resources: ['images.primary.large', 'images.primary.medium', 'itemInfo.title'] }) });
  const j = await r.json().catch(() => ({}));
  if (r.status !== 200) { 
    console.log('[fetch-amazon-images] getItems', r.status, redact(JSON.stringify(j)));
    if (r.status === 403) {
      console.log('[fetch-amazon-images] 403 AssociateNotEligible - need 10 sales in 30 days, fallback to SVG');
      fs.writeFileSync(path.join(ROOT, 'src/data/amazon-images.json'), '{}\n');
      process.exit(0);
    }
    batch.forEach(a => failed[a] = `HTTP ${r.status}`); await sleep(2000); continue;
  }
  const items = j.itemsResult?.items || j.ItemsResult?.Items || [];
  for (const it of items) { const a = it.asin || it.ASIN; const im = it.images?.primary?.large || it.images?.primary?.medium;
    if (!im?.url) { failed[a] = 'no image'; continue; }
    const g = await fetch(im.url); const buf = Buffer.from(await g.arrayBuffer());
    if (g.status === 200 && /^image\//.test(g.headers.get('content-type') || '') && buf.length > 1024)
      out[a] = { url: im.url, width: im.width, height: im.height, title: it.itemInfo?.title?.displayValue || '' };
    else failed[a] = `image check failed ${g.status} ${buf.length}B`; }
  for (const e of (j.errors || [])) { const m = /([A-Z0-9]{10})/.exec(e.message || ''); if (m) failed[m[1]] = e.code + ': ' + e.message; }
  batch.forEach(a => { if (!out[a] && !failed[a]) failed[a] = 'not returned'; });
  await sleep(1100); // ~1 TPS
}
fs.writeFileSync(path.join(ROOT, 'src/data/amazon-images.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`OK ${Object.keys(out).length}/${list.length}`); if (Object.keys(failed).length) console.log('Failed:', failed);
