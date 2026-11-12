<?php
/**
 * Cron quotidien o2switch. Ne répond pas en HTTP.
 * Exemple (6 h 15, heure du serveur) :
 * 15 6 * * * /usr/local/bin/php /chemin/scan3dlab.com/cron/releve-prix.php
 * Clé du flux produit Awin, une ligne, hors du site :
 *   dossier parent de la racine web + /prive/awin-product-feed.key
 * En local, depuis ce fichier : ../../prive/awin-product-feed.key
 * ou la variable AWIN_FEED_API_KEY.
 * Amazon n'est pas interrogé.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
$script = __DIR__ . '/routine.mjs';
$candidats = array_filter([
    getenv('NODE_BINARY') ?: '',
    '/opt/alt/alt-nodejs22/root/usr/bin/node',
    '/opt/alt/alt-nodejs20/root/usr/bin/node',
    '/opt/alt/alt-nodejs18/root/usr/bin/node',
    '/usr/bin/node',
    '/usr/local/bin/node',
]);
$node = null;
foreach ($candidats as $binaire) {
    if (is_file($binaire)) {
        $node = $binaire;
        break;
    }
}
if ($node === null) {
    $node = 'node';
}
$cmd = escapeshellarg($node) . ' ' . escapeshellarg($script);
passthru($cmd, $code);
exit($code === null ? 1 : $code);
