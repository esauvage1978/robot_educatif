/**
 * Génère dist/404-stats-tracker.js (même logique que PageNotFoundTracker.astro).
 * À coller dans une page d’erreur cPanel / o2switch (404.shtml) si celle-ci ne charge pas 404.html :
 *   <script src="/404-stats-tracker.js"></script>
 * Nécessite PUBLIC_SUPABASE_URL et PUBLIC_SUPABASE_ANON_KEY au moment du build.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const rootDir = join(__dirname, '..');

/** Même source que le build Astro (npm run build ne transmet pas .env au processus Node suivant). */
function loadDotEnv() {
	const p = join(rootDir, '.env');
	if (!existsSync(p)) return;
	const text = readFileSync(p, 'utf8');
	for (const line of text.split('\n')) {
		const t = line.trim();
		if (!t || t.startsWith('#')) continue;
		const i = t.indexOf('=');
		if (i === -1) continue;
		const k = t.slice(0, i).trim();
		let v = t.slice(i + 1).trim();
		if (
			(v.startsWith('"') && v.endsWith('"')) ||
			(v.startsWith("'") && v.endsWith("'"))
		) {
			v = v.slice(1, -1);
		}
		if (process.env[k] === undefined) process.env[k] = v;
	}
}

loadDotEnv();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY ?? '';
let baseUrl = process.env.ASTRO_BASE ?? '/';
if (!baseUrl.startsWith('/')) baseUrl = '/' + baseUrl;
if (baseUrl !== '/' && !baseUrl.endsWith('/')) baseUrl += '/';

if (!supabaseUrl || !supabaseKey) {
	console.warn(
		'[write-404-stats-tracker] PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY absents — 404-stats-tracker.js non généré.',
	);
	process.exit(0);
}

/* Même délai que PageNotFoundTracker.astro (voir commentaire STATS_RPC_DEFER_MS). */
const body = `(function(){var supabaseUrl=${JSON.stringify(supabaseUrl)};var supabaseKey=${JSON.stringify(supabaseKey)};var baseUrl=${JSON.stringify(baseUrl)};var z=function(s){return String(s==null?"":s).split(String.fromCharCode(0)).join("")};function normalizePath(pathname,base){var b=z(base||"/");if(!b.endsWith("/"))b+="/";var p=z(pathname);if(b!=="/"&&p.startsWith(b))p=p.slice(b.length);if(!p.startsWith("/"))p="/"+p;if(p===""||p==="/")return"/";if(p.length>1&&!p.endsWith("/"))p+="/";return p;}var path=normalizePath(window.location.pathname,baseUrl);var STATS_RPC_DEFER_MS=4500;function send(){fetch(supabaseUrl+"/rest/v1/rpc/increment_page_not_found",{method:"POST",headers:{apikey:supabaseKey,Authorization:"Bearer "+supabaseKey,"Content-Type":"application/json"},body:JSON.stringify({p_requested_path:path})}).then(function(res){return res.text().then(function(txt){if(!res.ok){console.warn("[404 stats] RPC HTTP "+res.status,txt||"");return;}if(typeof console!=="undefined"&&console.debug)console.debug("[404 stats] OK",path,txt||"(vide)");});}).catch(function(err){console.warn("[404 stats] réseau",err);});}window.setTimeout(send,STATS_RPC_DEFER_MS);})();`;

try {
	mkdirSync(distDir, { recursive: true });
	writeFileSync(join(distDir, '404-stats-tracker.js'), body, 'utf8');
	console.log('[write-404-stats-tracker] dist/404-stats-tracker.js écrit (base=' + baseUrl + ').');
} catch (e) {
	console.error('[write-404-stats-tracker]', e);
	process.exit(1);
}
