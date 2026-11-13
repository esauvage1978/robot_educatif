<?php
/**
 * Cron quotidien o2switch (cPanel → Tâches cron). Ne répond pas en HTTP.
 * Exemple Paris, 6 h 15 : 15 6 * * *
 * Commande : /usr/local/bin/php /home/VOTRE_COMPTE/DOMAINE/cron/releve-prix.php
 * (DOMAINE = racine web du site, ex. robot-educatif.info — le dossier cron/ est dans public/).
 * Clé flux Awin : un cran au-dessus de la racine web, fichier prive/awin-product-feed.key
 * ou variable d’environnement AWIN_FEED_API_KEY sur le compte.
 * Les publications FTP ne doivent pas écraser prix-du-jour.json ni cron/historique.json (PUBLISH).
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
