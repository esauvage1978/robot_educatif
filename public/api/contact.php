<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}
if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = [];
if (is_string($raw) && trim($raw) !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    } else {
        parse_str($raw, $parsed);
        if (is_array($parsed) && !empty($parsed)) {
            $data = $parsed;
        }
    }
}
if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}
if (!is_array($data) || empty($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid payload']);
    exit;
}

$honeypot = trim((string)($data['website'] ?? ''));
if ($honeypot !== '') {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

$cleanHeader = static function (string $v): string {
    return trim(str_replace(["\r", "\n", "\0"], ' ', $v));
};

$name    = $cleanHeader((string)($data['name'] ?? $data['nom'] ?? ''));
$email   = $cleanHeader((string)($data['email'] ?? ''));
$company = $cleanHeader((string)($data['company'] ?? $data['societe'] ?? ''));
$objet   = $cleanHeader((string)($data['objet'] ?? $data['subject'] ?? $data['sujet'] ?? 'Contact'));
$page    = $cleanHeader((string)($data['page'] ?? $data['url'] ?? ($_SERVER['HTTP_REFERER'] ?? '/')));
$message = trim(str_replace("\0", '', (string)($data['message'] ?? '')));

if ($objet === '') {
    $objet = 'Contact';
}

if (
    $name === '' || mb_strlen($name) > 200 ||
    $email === '' || mb_strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $message === '' || mb_strlen($message) > 10000 ||
    mb_strlen($objet) > 300
) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid fields']);
    exit;
}

$allowedDomains = [
    '1piece1ampoule.fr'   => 'contact@1piece1ampoule.fr',
    'wattbalcon.fr'       => 'contact@wattbalcon.fr',
    'saunajardin.fr'      => 'contact@saunajardin.fr',
    'happypetlab.com'     => 'contact@happypetlab.com',
    'piscinebot.fr'       => 'contact@piscinebot.fr',
    'scan3dlab.com'       => 'contact@scan3dlab.com',
    'iapourmonmetier.fr'  => 'contact@iapourmonmetier.fr',
    'kittableur.fr'       => 'boutique@kittableur.fr',
    'robot-educatif.info' => 'contact@robot-educatif.info',
];

$webhookUrls = [
    'wattbalcon.fr'       => 'https://webhooky.builders/webhook/form/0b40160efaa3f32b11d2-d787-4ad9-8e4f-8db62b25d54e',
    'piscinebot.fr'       => 'https://webhooky.builders/webhook/form/0b40160efaa370547bda-6fb9-4046-9a73-68f55ef93020',
    'saunajardin.fr'      => 'https://webhooky.builders/webhook/form/0b40160efaa30f1ac0ba-21b6-417d-b41d-d7993cde50f0',
    'happypetlab.com'     => 'https://webhooky.builders/webhook/form/0b40160efaa326cbfa79-3433-403a-8ece-093622271109',
    'scan3dlab.com'       => 'https://webhooky.builders/webhook/form/0b40160efaa3048e5b31-9329-407a-ba60-2b6f72885691',
    '1piece1ampoule.fr'   => 'https://webhooky.builders/webhook/form/0b40160efaa37f13f88d-31c8-43c4-90a5-41841114ed5e',
    'iapourmonmetier.fr'  => 'https://webhooky.builders/webhook/form/0b40160efaa350de3a00-f2e3-486c-bcc0-6a75c03e84a0',
    'kittableur.fr'       => 'https://webhooky.builders/webhook/form/0b40160efaa34f7db1ac-b86e-4310-ae0c-b2fc32839f72',
    'robot-educatif.info' => 'https://webhooky.builders/webhook/form/0b40160efaa3d0a7b357-6d27-4652-95f5-3aa3e74da565',
];

$host = strtolower((string)($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
$host = preg_replace('/:\d+$/', '', $host);
$host = preg_replace('/^www\./', '', $host);

if (!isset($allowedDomains[$host])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Unknown host']);
    exit;
}

$toEmail = $allowedDomains[$host];
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
$now = time();
$rlFile = rtrim(sys_get_temp_dir(), '/\\') . '/contact_rl_' . hash('sha256', $host . '|' . $ip) . '.json';

$hits = [];
if (is_file($rlFile)) {
    $rawRl = @file_get_contents($rlFile);
    $decRl = is_string($rawRl) ? json_decode($rawRl, true) : null;
    if (is_array($decRl)) {
        foreach ($decRl as $ts) {
            if (is_int($ts) && ($now - $ts) < 3600) {
                $hits[] = $ts;
            }
        }
    }
}
if (count($hits) >= 5) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests']);
    exit;
}
$hits[] = $now;
@file_put_contents($rlFile, json_encode($hits), LOCK_EX);

$submittedAt = $cleanHeader((string)($data['submitted_at'] ?? gmdate('Y-m-d\TH:i:s\Z')));
if ($submittedAt === '') {
    $submittedAt = gmdate('Y-m-d\TH:i:s\Z');
}
$privacyAt = $cleanHeader((string)($data['privacy_policy_accepted_at'] ?? $submittedAt));
if ($privacyAt === '') {
    $privacyAt = $submittedAt;
}

// 1. Relais Webhooky dédié au domaine (POST application/x-www-form-urlencoded, timeout 5 s)
$webhookUrl = $webhookUrls[$host] ?? 'https://webhooky.builders/webhook/form/0b40160efaa3d0a7b357-6d27-4652-95f5-3aa3e74da565';
$formPayload = http_build_query([
    'name'                       => $name,
    'email'                      => $email,
    'company'                    => $company,
    'objet'                      => $objet,
    'message'                    => $message,
    'privacy_policy_accepted'    => 'true',
    'privacy_policy_accepted_at' => $privacyAt,
    'submitted_at'               => $submittedAt,
    'source'                     => $host,
    'page'                       => $page,
], '', '&', PHP_QUERY_RFC3986);

$webhookOk = false;
if (function_exists('curl_init')) {
    $ch = curl_init($webhookUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $formPayload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded; charset=UTF-8'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_IPRESOLVE      => CURL_IPRESOLVE_V4,
    ]);
    $resp = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($resp !== false && $httpCode >= 200 && $httpCode < 400) {
        $webhookOk = true;
    }
} else {
    $ctx = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded; charset=UTF-8\r\n",
            'content' => $formPayload,
            'timeout' => 5,
        ],
    ]);
    $resp = @file_get_contents($webhookUrl, false, $ctx);
    if ($resp !== false) {
        $webhookOk = true;
    }
}

// 2. Envoi du mail local en UTF-8 vers la boîte du site (relevé IMAP 3h)
$subjectRaw = '[' . $host . '] ' . $objet . ' — ' . $name;
$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectRaw) . '?=';

$lines = [
    'Site : ' . $host,
    'Nom : ' . $name,
    'E-mail : ' . $email,
];
if ($company !== '') {
    $lines[] = 'Société : ' . $company;
}
$lines[] = 'Objet : ' . $objet;
$lines[] = 'Page : ' . $page;
$lines[] = 'Date (UTC) : ' . $submittedAt;
$lines[] = '';
$lines[] = 'Message :';
$lines[] = $message;
$mailBody = implode("\r\n", $lines) . "\r\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Contact <' . $toEmail . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
];
$headersStr = implode("\r\n", $headers);

$mailOk = @mail($toEmail, $encodedSubject, $mailBody, $headersStr, '-f ' . $toEmail);
if (!$mailOk) {
    $mailOk = @mail($toEmail, $encodedSubject, $mailBody, $headersStr);
}

http_response_code(200);
echo json_encode(['ok' => true]);
