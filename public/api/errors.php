<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=120');

const SITE_ID = 'robot-educatif.info';
const WEBHOOK_URL = 'https://webhooky.builders/webhook/form/0b40160efaa3d0a7b357-6d27-4652-95f5-3aa3e74da565';

$allowedLangs = ['fr', 'en', 'de', 'it', 'es'];
$lang = isset($_GET['lang']) && in_array($_GET['lang'], $allowedLangs, true) ? $_GET['lang'] : 'fr';
$action = $_GET['action'] ?? 'catalog';

$fallbackFile = __DIR__ . '/errors-fallback.json';

function respond(int $code, array $payload): void
{
	http_response_code($code);
	echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	exit;
}

function loadFallback(string $lang): ?array
{
	global $fallbackFile, $allowedLangs;
	if (!is_readable($fallbackFile)) {
		return null;
	}
	$raw = file_get_contents($fallbackFile);
	if ($raw === false) {
		return null;
	}
	$data = json_decode($raw, true);
	if (!is_array($data)) {
		return null;
	}
	if (isset($data[$lang]) && is_array($data[$lang])) {
		return $data[$lang];
	}
	if (isset($data['fr']) && is_array($data['fr'])) {
		return $data['fr'];
	}
	return null;
}

function dbConfig(): ?array
{
	foreach (['/home/saem3552/.db_re.php', '/home/emmanuelsauvage/.db_re.php'] as $configFile) {
		if (is_readable($configFile)) {
			$cfg = include $configFile;
			if (is_array($cfg)) {
				return $cfg;
			}
		}
	}
	$host = getenv('DB_HOST') ?: 'localhost';
	$name = getenv('DB_NAME') ?: 'emmanuelsauvage_re';
	$user = getenv('DB_USER') ?: null;
	$pass = getenv('DB_PASS') ?: '';
	if ($user === null || $user === '') {
		return null;
	}
	return ['host' => $host, 'dbname' => $name, 'user' => $user, 'pass' => $pass];
}

function pdoConnect(): ?PDO
{
	$cfg = dbConfig();
	if ($cfg === null) {
		return null;
	}
	$host = $cfg['host'] ?? 'localhost';
	$db = $cfg['dbname'] ?? 'emmanuelsauvage_re';
	$user = $cfg['user'] ?? '';
	$pass = $cfg['pass'] ?? '';
	$dsn = "mysql:host={$host};dbname={$db};charset=utf8mb4";
	try {
		$pdo = new PDO($dsn, $user, $pass, [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		]);
		return $pdo;
	} catch (Throwable $e) {
		return null;
	}
}

function sqlRoot(): string
{
	$candidates = [
		dirname(__DIR__) . '/sql',
		dirname(__DIR__, 2) . '/sql',
		dirname(__DIR__) . '/../sql',
		__DIR__ . '/../../sql',
	];
	foreach ($candidates as $path) {
		if (is_dir($path)) {
			return $path;
		}
	}
	return dirname(__DIR__, 2) . '/sql';
}

function maybeInitDatabase(PDO $pdo): void
{
	$root = sqlRoot();
	$schema = $root . '/schema_unified_errors.sql';
	$seed = $root . '/seed_re.sql';
	if (is_readable($schema)) {
		$pdo->exec(file_get_contents($schema));
	}
	if (is_readable($seed)) {
		$pdo->exec(file_get_contents($seed));
	}
}

function tableExists(PDO $pdo, string $table): bool
{
	if (!preg_match('/^[a-z0-9_]+$/', $table)) {
		return false;
	}
	$stmt = $pdo->query('SHOW TABLES LIKE ' . $pdo->quote($table));
	return (bool) $stmt->fetchColumn();
}

function localized(array $row, string $lang, string $prefix): string
{
	$key = $prefix . '_' . $lang;
	if (isset($row[$key]) && $row[$key] !== '') {
		return (string) $row[$key];
	}
	return (string) ($row[$prefix . '_fr'] ?? '');
}

function fetchCatalog(PDO $pdo, string $lang): array
{
	$categories = $pdo->query('SELECT id, slug, name_fr, name_en, name_de, name_it, name_es, sort_order FROM device_categories ORDER BY sort_order ASC, id ASC')->fetchAll();
	$brands = $pdo->query('SELECT id, slug, name, is_affiliate_partner, priority_rank, official_site_url, support_url, support_email, support_phone, affiliate_default_url FROM brands ORDER BY is_affiliate_partner DESC, priority_rank ASC, name ASC')->fetchAll();
	$products = $pdo->query('SELECT p.id, p.slug, p.brand_id, b.slug AS brand_slug, p.category_id, c.slug AS category_slug, p.name, p.protocol, p.image_url FROM products p INNER JOIN brands b ON b.id = p.brand_id INNER JOIN device_categories c ON c.id = p.category_id ORDER BY p.name ASC')->fetchAll();
	$errors = $pdo->query('SELECT e.*, b.slug AS brand_slug, b.support_url, b.support_email, b.support_phone, b.official_site_url AS brand_site_url, c.slug AS category_slug, p.slug AS product_slug FROM error_codes e INNER JOIN brands b ON b.id = e.brand_id INNER JOIN device_categories c ON c.id = e.category_id LEFT JOIN products p ON p.id = e.product_id ORDER BY e.id ASC')->fetchAll();

	$applicableByErrorId = [];
	if (tableExists($pdo, 'error_code_applicable_products')) {
		$apRows = $pdo->query(
			'SELECT e.slug AS error_slug, p.slug AS product_slug FROM error_code_applicable_products ecap INNER JOIN error_codes e ON e.id = ecap.error_code_id INNER JOIN products p ON p.id = ecap.product_id'
		)->fetchAll();
		foreach ($apRows as $ap) {
			$slug = $ap['error_slug'];
			if (!isset($applicableByErrorId[$slug])) {
				$applicableByErrorId[$slug] = [];
			}
			$applicableByErrorId[$slug][] = $ap['product_slug'];
		}
	}

	$catOut = array_map(static function ($row) use ($lang) {
		return [
			'id' => (int) $row['id'],
			'slug' => $row['slug'],
			'name' => localized($row, $lang, 'name'),
			'sort_order' => (int) $row['sort_order'],
		];
	}, $categories);

	$brandOut = array_map(static function ($row) {
		return [
			'id' => (int) $row['id'],
			'slug' => $row['slug'],
			'name' => $row['name'],
			'is_affiliate_partner' => (int) $row['is_affiliate_partner'],
			'priority_rank' => (int) $row['priority_rank'],
			'official_site_url' => $row['official_site_url'],
			'support_url' => $row['support_url'],
			'support_email' => $row['support_email'],
			'support_phone' => $row['support_phone'],
			'affiliate_default_url' => $row['affiliate_default_url'],
		];
	}, $brands);

	$prodOut = array_map(static function ($row) {
		return [
			'id' => (int) $row['id'],
			'slug' => $row['slug'],
			'brand_id' => (int) $row['brand_id'],
			'brand_slug' => $row['brand_slug'],
			'category_id' => (int) $row['category_id'],
			'category_slug' => $row['category_slug'],
			'name' => $row['name'],
			'protocol' => $row['protocol'],
			'image_url' => $row['image_url'] ?? null,
		];
	}, $products);

	$errOut = array_map(static function ($row) use ($lang, $applicableByErrorId) {
		return [
			'id' => (int) $row['id'],
			'slug' => $row['slug'],
			'category_id' => (int) $row['category_id'],
			'category_slug' => $row['category_slug'],
			'brand_id' => (int) $row['brand_id'],
			'brand_slug' => $row['brand_slug'],
			'product_id' => $row['product_id'] !== null ? (int) $row['product_id'] : null,
			'product_slug' => $row['product_slug'],
			'applicable_products' => $applicableByErrorId[$row['slug']] ?? [],
			'error_code' => $row['error_code'],
			'difficulty' => (int) $row['difficulty'],
			'estimated_time' => $row['estimated_time'],
			'estimated_cost' => $row['estimated_cost'],
			'requires_official_sav' => (bool) $row['requires_official_sav'],
			'title' => localized($row, $lang, 'title'),
			'symptom' => localized($row, $lang, 'symptom'),
			'solution' => localized($row, $lang, 'solution'),
			'tools' => localized($row, $lang, 'tools'),
			'safety_warning' => localized($row, $lang, 'safety_warning') ?: null,
			'brand_support_url' => $row['support_url'] ?? null,
		];
	}, $errors);

	return [
		'ok' => true,
		'source' => 'mysql',
		'lang' => $lang,
		'categories' => $catOut,
		'brands' => $brandOut,
		'products' => $prodOut,
		'errors' => $errOut,
	];
}

function getCatalog(string $lang): array
{
	$init = isset($_GET['init']) && ($_GET['init'] === '1' || $_GET['init'] === 'true');
	$pdo = pdoConnect();
	if ($pdo !== null) {
		try {
			if ($init) {
				maybeInitDatabase($pdo);
			}
			if (tableExists($pdo, 'error_codes')) {
				return fetchCatalog($pdo, $lang);
			}
			if ($init) {
				return fetchCatalog($pdo, $lang);
			}
		} catch (Throwable $e) {
			// fallback below
		}
	}
	$fb = loadFallback($lang);
	if ($fb !== null) {
		$fb['ok'] = true;
		$fb['source'] = 'fallback';
		return $fb;
	}
	return [
		'source' => 'fallback',
		'lang' => $lang,
		'categories' => [],
		'brands' => [],
		'products' => [],
		'errors' => [],
		'error' => 'catalog_unavailable',
	];
}

function searchErrors(string $lang): array
{
	$catalog = getCatalog($lang);
	$category = trim((string) ($_GET['category'] ?? ''));
	$brand = trim((string) ($_GET['brand'] ?? ''));
	$product = trim((string) ($_GET['product'] ?? ''));
	$code = trim((string) ($_GET['code'] ?? ''));
	$q = mb_strtolower(trim((string) ($_GET['q'] ?? '')));

	$errors = $catalog['errors'] ?? [];
	$filtered = array_values(array_filter($errors, static function ($e) use ($category, $brand, $product, $code, $q) {
		if ($category !== '' && ($e['category_slug'] ?? '') !== $category) {
			return false;
		}
		if ($brand !== '' && ($e['brand_slug'] ?? '') !== $brand) {
			return false;
		}
		if ($product !== '') {
			$primary = $e['product_slug'] ?? '';
			$extra = $e['applicable_products'] ?? [];
			if ($primary !== $product && !in_array($product, $extra, true)) {
				return false;
			}
		}
		if ($code !== '' && ($e['slug'] ?? '') !== $code && ($e['error_code'] ?? '') !== $code) {
			return false;
		}
		if ($q !== '') {
			$hay = mb_strtolower(
				($e['title'] ?? '') . ' ' .
				($e['symptom'] ?? '') . ' ' .
				($e['solution'] ?? '') . ' ' .
				($e['error_code'] ?? '')
			);
			if (!str_contains($hay, $q)) {
				return false;
			}
		}
		return true;
	}));

	$brandMap = [];
	foreach ($catalog['brands'] ?? [] as $b) {
		$brandMap[$b['slug']] = $b;
	}
	foreach ($filtered as &$row) {
		$bs = $row['brand_slug'] ?? '';
		if ($bs !== '' && isset($brandMap[$bs])) {
			$row['brand_support'] = [
				'name' => $brandMap[$bs]['name'],
				'support_url' => $brandMap[$bs]['support_url'],
				'support_email' => $brandMap[$bs]['support_email'],
				'support_phone' => $brandMap[$bs]['support_phone'],
				'official_site_url' => $brandMap[$bs]['official_site_url'],
			];
		}
	}
	unset($row);

	$productImageUrl = null;
	if ($product !== '') {
		foreach ($catalog['products'] ?? [] as $p) {
			if (($p['slug'] ?? '') === $product) {
				$productImageUrl = $p['image_url'] ?? null;
				break;
			}
		}
	}

	return [
		'ok' => true,
		'source' => $catalog['source'] ?? 'fallback',
		'lang' => $lang,
		'count' => count($filtered),
		'product_image_url' => $productImageUrl,
		'errors' => $filtered,
	];
}

function readJsonBody(): array
{
	$raw = file_get_contents('php://input');
	if ($raw === false || $raw === '') {
		return $_POST;
	}
	$decoded = json_decode($raw, true);
	return is_array($decoded) ? $decoded : $_POST;
}

function notifyWebhook(array $payload): void
{
	$now = gmdate('c');
	$body = http_build_query([
		'name' => $payload['name'] ?? 'Visiteur catalogue erreurs',
		'email' => $payload['email'] ?? 'noreply@robot-educatif.info',
		'message' => $payload['message'] ?? '',
		'objet' => $payload['objet'] ?? 'Proposition code erreur / produit',
		'page' => $payload['page_url'] ?? '',
		'source' => SITE_ID,
		'rgpd' => 'true',
		'privacy_policy_accepted' => 'true',
		'privacy_policy_accepted_at' => $now,
		'submitted_at' => $now,
		'lang' => $payload['lang'] ?? 'fr',
	]);
	$ctx = stream_context_create([
		'http' => [
			'method' => 'POST',
			'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
			'content' => $body,
			'timeout' => 8,
			'ignore_errors' => true,
		],
	]);
	@file_get_contents(WEBHOOK_URL, false, $ctx);
}

function handlePropose(): void
{
	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
	}
	$data = readJsonBody();
	if (!empty($data['website']) || !empty($data['url'])) {
		respond(200, ['ok' => true, 'spam_filtered' => true]);
	}

	$category = trim((string) ($data['category'] ?? ''));
	$brand = trim((string) ($data['brand'] ?? ''));
	$product = trim((string) ($data['product'] ?? ''));
	$errorCode = trim((string) ($data['error_code'] ?? ''));
	$description = trim((string) ($data['description'] ?? ''));
	$email = trim((string) ($data['email'] ?? ''));
	$pageUrl = trim((string) ($data['page_url'] ?? ''));
	$lang = in_array($data['lang'] ?? 'fr', ['fr', 'en', 'de', 'it', 'es'], true) ? $data['lang'] : 'fr';

	if ($description === '' || ($category === '' && $brand === '' && $product === '' && $errorCode === '')) {
		respond(400, ['ok' => false, 'error' => 'missing_fields']);
	}

	$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|' . date('Y-m-d'));
	$stored = false;

	$pdo = pdoConnect();
	if ($pdo !== null) {
		try {
			if (tableExists($pdo, 'product_submissions')) {
				$stmt = $pdo->prepare(
					'INSERT INTO product_submissions (site, lang, page_url, category_name, brand_name, product_name, error_code, description, visitor_email, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
				);
				$stmt->execute([SITE_ID, $lang, $pageUrl, $category, $brand, $product, $errorCode, $description, $email !== '' ? $email : null, $ipHash]);
				$stored = true;
			}
		} catch (Throwable $e) {
			$stored = false;
		}
	}

	$message = "Catégorie: {$category}\nMarque: {$brand}\nProduit: {$product}\nCode erreur: {$errorCode}\n\n{$description}";
	if ($email !== '') {
		$message .= "\n\nE-mail visiteur: {$email}";
	}

	notifyWebhook([
		'name' => 'Proposition catalogue erreurs',
		'email' => $email !== '' ? $email : 'contact@robot-educatif.info',
		'message' => $message,
		'objet' => 'Proposition produit / code erreur — catalogue',
		'page_url' => $pageUrl,
		'lang' => $lang,
	]);

	respond(200, ['ok' => true, 'stored' => $stored]);
}

if ($action === 'search') {
	respond(200, searchErrors($lang));
}

if ($action === 'propose') {
	handlePropose();
}

respond(200, getCatalog($lang));
