---
title: "mBlock en ligne (ide.mblock.cc) : programmer mBot sans rien installer [Guide 2026]"
headline: "mBlock en ligne (ide.mblock.cc) : programmer mBot sans rien installer"
description: "Utiliser mBlock en ligne gratuitement sur ide.mblock.cc (en français) : guide pas à pas sur Chrome et Edge, connexion USB/Bluetooth mBot avec mLink, blocs Scratch et Python sans installation."
pubDate: "2026-04-18"
updatedDate: "2026-11-05"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.webp"
amazonPreset: mbot
articleJsonLd: true
categories:
  - "mBlock"
  - "Guide"
  - "Programmation"
  - "Scratch"
relatedLinks:
  - title: "Télécharger mBlock 5 Gratuit (PC Windows 10/11, Mac)"
    href: "/telecharger-mblock-5-gratuit-guide-2026/"
  - title: "Quel logiciel mBlock choisir (mBlock 5, Blockly, Python) ?"
    href: "/logiciel-mblock-makeblock-mbot-quel-choisir/"
  - title: "Installer mBlock 5 sous Windows 10/11"
    href: "/installer-mblock-5-sous-windows-10/"
  - title: "Dépannage Bluetooth mBlock"
    href: "/mblock-bluetooth-erreurs-frequentes-depannage/"
  - title: "Premiers pas dans mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
faqSchema:
  - question: "Comment ouvrir mBlock en ligne en français gratuitement ?"
    answer: "Ouvrez directement https://ide.mblock.cc dans Google Chrome ou Microsoft Edge. Si l'interface s'affiche en anglais, cliquez sur l'icône en forme de globe en haut à gauche et sélectionnez Français. Aucun téléchargement ni compte n'est requis pour coder."
  - question: "Peut-on programmer un vrai robot mBot ou mBot2 avec mBlock en ligne ?"
    answer: "Oui : dans Chrome ou Edge, mBlock en ligne utilise WebSerial / WebUSB ou le petit utilitaire mLink pour dialoguer avec le port USB (CH340) ou le Bluetooth du mBot, mBot2 (CyberPi), Codey Rocky et Arduino."
  - question: "Comment sauvegarder son projet sur mBlock en ligne sans créer de compte ?"
    answer: "Cliquez sur Fichier → Enregistrer sur votre ordinateur. Votre navigateur télécharge immédiatement un fichier .mblock que vous pourrez rouvrir plus tard via Fichier → Ouvrir depuis votre ordinateur."
  - question: "Quand faut-il préférer mBlock 5 installé sur PC plutôt que mBlock en ligne ?"
    answer: "Si votre connexion Internet est coupée en classe, ou si vous téléversez fréquemment des programmes hors ligne et mettez à jour le firmware USB du mBot, l'application complète mBlock 5 sur PC/Mac reste plus confortable."
---

<div class="callout-quick" style="border:2px solid #2563eb;border-radius:12px;padding:1rem 1.25rem;margin:0.75rem 0 1.5rem;background:#eff6ff;color:#1e293b;">
<p style="margin:0 0 0.5rem;font-weight:700;font-size:1.05rem;">🚀 Accès direct à mBlock en ligne (gratuit, en français, sans compte obligatoire)</p>
<ul style="margin:0 0 0.75rem;padding-left:1.2rem;">
  <li><strong>Adresse officielle de l'éditeur Web :</strong> <a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank" style="font-weight:700;color:#1d4ed8;">Ouvrir ide.mblock.cc dans votre navigateur</a> (privilégiez <strong>Google Chrome</strong> ou <strong>Microsoft Edge</strong>).</li>
  <li><strong>Langue française :</strong> cliquez sur l'icône <strong>🌐 Globe</strong> en haut à gauche → <strong>Français</strong>.</li>
  <li><strong>Sauvegarde sans inscription :</strong> menu <strong>Fichier → Enregistrer sur votre ordinateur</strong> (fichier <code>.mblock</code> local).</li>
  <li><strong>Vous préférez l'application complète hors ligne ?</strong> Consultez notre guide <a href="/telecharger-mblock-5-gratuit-guide-2026/">Télécharger mBlock 5 Gratuit (PC Windows 10/11, Mac)</a>.</li>
</ul>
</div>

<p><strong>mBlock en ligne</strong> (accessible gratuitement sur <strong><a href="https://ide.mblock.cc/" rel="noopener noreferrer" target="_blank">ide.mblock.cc</a></strong>) permet de programmer en blocs (type Scratch 3) et en Python <strong>directement dans votre navigateur web</strong>, sans installer le logiciel complet de 1 Go. C'est la solution idéale sur un <strong>Chromebook</strong>, sur un <strong>PC d'école ou de collège sans droits administrateur</strong>, ou pour démarrer un atelier en moins de 30 secondes. Si vous <strong>pouvez installer</strong> mBlock sur le poste (firmware, USB stable, travail hors ligne), préférez plutôt [Télécharger mBlock 5 Gratuit](/telecharger-mblock-5-gratuit-guide-2026/) puis [Installer mBlock 5 sous Windows 10/11](/installer-mblock-5-sous-windows-10/) — ou consultez [quel logiciel mBlock choisir](/logiciel-mblock-makeblock-mbot-quel-choisir/) pour comparer les options.</p>

![Interface de mBlock en ligne (ide.mblock.cc) dans le navigateur : scène Panda, blocs Scratch et zone de script](/images/blog/guides-2026/mblock-online-wikimedia.png)

<h2 id="tutoriel-ide">1. Guide pas à pas : lancer ide.mblock.cc en français dans Chrome ou Edge</h2>

Voici comment démarrer une séance sur **mBlock en ligne** en moins d'une minute :

1. **Ouvrez Chrome ou Edge (version récente)** : contrairement à Firefox ou Safari qui brident l'accès aux ports USB série (API WebSerial / WebUSB), **Google Chrome**, **Microsoft Edge** et **Chromium** gèrent nativement la communication avec les cartes robotiques.
2. **Rendez-vous sur `https://ide.mblock.cc/`** : l'interface charge directement l'espace de travail avec la mascotte Panda.
3. **Passez l'interface en Français** : cliquez sur l'icône **🌐 (Globe)** tout en haut à gauche de la barre bleue, puis cliquez sur **Français**. Tous les blocs (*Mouvement, Apparence, Événements, Contrôle, Capteurs*) basculent immédiatement en français.
4. **Choisissez votre cible (Objets ou Appareils)** :
   - Onglet **Objets (Sprites)** : pour créer un jeu vidéo ou une animation à l'écran façon Scratch, sans aucun robot branché.
   - Onglet **Appareils (Devices)** : pour programmer un **mBot**, **mBot2 (CyberPi)**, **mBot Ranger**, **Codey Rocky**, **Halocode** ou une carte **Arduino UNO / Mega**.

<h2 id="connecter-mbot-mlink">2. Connecter un robot mBot ou mBot2 en USB avec mLink / WebUSB</h2>

Par défaut, un navigateur web est isolé du matériel de l'ordinateur par sécurité. Pour que **mBlock en ligne (`ide.mblock.cc`)** puisse envoyer votre programme vers le câble USB du robot, deux modes coexistent :

### Étape A — Ajouter le robot dans l'onglet Appareils
1. En bas à gauche sous la scène, cliquez sur l'onglet **Appareils**.
2. Si *CyberPi* est affiché par défaut et que vous utilisez un **mBot classique (v1.1)**, cliquez sur **+ Ajouter**, sélectionnez **mBot** dans la bibliothèque d'appareils, puis validez par **OK**.
3. Pour activer les extensions (ex. matrice LED, servo, capteur ultrason), cliquez sur **+ Extension** en bas de la colonne des blocs (voir notre tutoriel [Installer les blocs du mBot](/installer-les-blocs-du-mbot/)).

### Étape B — Établir la liaison USB (mLink 2 ou connexion Web directe)
1. Branchez votre **mBot** en USB à l'ordinateur et **mettez l'interrupteur du robot sur ON**.
2. Cliquez sur le bouton bleu **Connecter** en bas à gauche de `ide.mblock.cc`.
3. Si le service **mLink** n'est pas encore actif sur le poste, mBlock en ligne affiche une boîte de dialogue vous proposant de lancer ou télécharger **mLink** (petit pont léger de ~60 Mo pour Windows, Mac, Linux ou extension Chromebook) :
   - Sur **Chromebook**, installez simplement l'extension officielle *mLink* depuis le Chrome Web Store.
   - Sur **Windows / Mac**, si mLink est déjà présent, cochez **Afficher tous les appareils connectables**, sélectionnez le port série (`COM3`, `COM4` ou `/dev/tty.wchusbserial...`) et cliquez sur **Connecter**.
4. Choisissez enfin le mode en bas à gauche :
   - **Mode En direct (Live)** : le programme tourne en temps réel avec le câble branché (idéal pour tester avec le drapeau vert).
   - **Mode Téléverser (Upload)** : le code est compilé et flashé dans la mémoire du mBot pour qu'il roule de façon autonome une fois le câble débranché.

<h2 id="sauvegarder-sans-compte">3. Sauvegarder et rouvrir un fichier .mblock sans créer de compte</h2>

En classe ou à la maison, **il n'est pas obligatoire de créer un compte Makeblock** (ce qui évite toute collecte d'adresse e-mail d'élève RGPD) :

- **Pour sauvegarder votre travail** : cliquez sur **Fichier** (en haut à gauche) → **Enregistrer sur votre ordinateur**. Le navigateur enregistre un fichier `.mblock` dans votre dossier *Téléchargements* ou sur une clé USB.
- **Pour reprendre un projet** : sur `ide.mblock.cc`, cliquez sur **Fichier → Ouvrir depuis votre ordinateur** et sélectionnez votre fichier `.mblock`.
- **Compatibilité totale** : un fichier `.mblock` créé sur `ide.mblock.cc` s'ouvre à l'identique dans l'application bureau [mBlock 5 téléchargée sur PC/Mac](/telecharger-mblock-5-gratuit-guide-2026/), et inversement !

<h2 id="comparatif">4. Tableau comparatif : mBlock en ligne vs mBlock 5 PC/Mac</h2>

<div class="tableau empile">
<table>
<thead><tr>
<th scope="col">Critère</th>
<th scope="col"><strong>mBlock en ligne (<code>ide.mblock.cc</code>)</strong></th>
<th scope="col"><strong>mBlock 5 Bureau (Windows / Mac)</strong></th>
</tr></thead><tbody>
<tr>
<td data-label="Critère"><span class="td-val"><strong>Installation requise</strong></span></td>
<td data-label="**mBlock en ligne (`ide.mblock.cc`)**"><span class="td-val"><strong>Aucune</strong> (ou petit pont mLink de 60 Mo pour l'USB)</span></td>
<td data-label="**mBlock 5 Bureau (Windows / Mac)**"><span class="td-val">Installateur complet (~380 Mo, ~1 Go sur disque)</span></td>
</tr>
<tr>
<td data-label="Critère"><span class="td-val"><strong>Chromebook &amp; PC verrouillé</strong></span></td>
<td data-label="**mBlock en ligne (`ide.mblock.cc`)**"><span class="td-val"><strong>Parfaitement adapté</strong></span></td>
<td data-label="**mBlock 5 Bureau (Windows / Mac)**"><span class="td-val">Non installable sur Chromebook</span></td>
</tr>
<tr>
<td data-label="Critère"><span class="td-val"><strong>Fonctionnement sans Internet</strong></span></td>
<td data-label="**mBlock en ligne (`ide.mblock.cc`)**"><span class="td-val">Non (nécessite de charger <code>ide.mblock.cc</code>)</span></td>
<td data-label="**mBlock 5 Bureau (Windows / Mac)**"><span class="td-val"><strong>100 % hors ligne</strong> une fois installé</span></td>
</tr>
<tr>
<td data-label="Critère"><span class="td-val"><strong>Programmation à l'écran (Scratch)</strong></span></td>
<td data-label="**mBlock en ligne (`ide.mblock.cc`)**"><span class="td-val">Immédiate, 0 configuration</span></td>
<td data-label="**mBlock 5 Bureau (Windows / Mac)**"><span class="td-val">Immédiate après installation</span></td>
</tr>
<tr>
<td data-label="Critère"><span class="td-val"><strong>Téléversement USB mBot / mBot2</strong></span></td>
<td data-label="**mBlock en ligne (`ide.mblock.cc`)**"><span class="td-val">Oui via Chrome/Edge + mLink</span></td>
<td data-label="**mBlock 5 Bureau (Windows / Mac)**"><span class="td-val"><strong>Ultra-stable</strong> (pilote CH340 intégré)</span></td>
</tr>
<tr>
<td data-label="Critère"><span class="td-val"><strong>Mise à jour firmware &amp; Bluetooth</strong></span></td>
<td data-label="**mBlock en ligne (`ide.mblock.cc`)**"><span class="td-val">Plus sensible aux réglages du navigateur</span></td>
<td data-label="**mBlock 5 Bureau (Windows / Mac)**"><span class="td-val"><strong>Recommandé</strong> pour restaurer le programme par défaut</span></td>
</tr>
</tbody>
</table>
</div>

Pour comparer aussi avec l'application tablette **mBlock Blockly** et l'éditeur **Python**, consultez notre dossier [Quel logiciel mBlock choisir pour mBot en 2026 ?](/logiciel-mblock-makeblock-mbot-quel-choisir/).

<h2 id="depannage">5. Dépannage : pourquoi mon mBot n'est pas détecté sur mBlock en ligne ?</h2>

1. **Aucun port COM n'apparaît dans la fenêtre Connecter** :
   - Vérifiez que l'interrupteur du mBot est bien sur **ON** et que vous utilisez le câble USB d'origine (certains câbles de recharge téléphone n'ont pas de fils de données).
   - Cochez la case **« Afficher tous les appareils connectables »** dans la fenêtre de connexion.
   - Si le pilote série manque sur Windows, installez le pilote **CH340** via mLink ou suivez notre guide [Installer mBlock 5 sous Windows 10/11](/installer-mblock-5-sous-windows-10/).
2. **Vous utilisez Firefox ou Safari** :
   - Copiez l'adresse `https://ide.mblock.cc/` dans **Google Chrome** ou **Microsoft Edge**, seuls navigateurs compatibles avec toutes les fonctions matérielles Makeblock.
3. **Le Bluetooth coupe ou refuse de s'appairer** :
   - Ne jumellez jamais le mBot dans les paramètres Bluetooth de Windows : passez directement par le bouton **Connecter** de mBlock. Tous les détails sont dans notre guide [Dépannage Bluetooth mBlock](/mblock-bluetooth-erreurs-frequentes-depannage/).

<h2 id="materiel-compatible">6. Robots compatibles avec mBlock en ligne (Sélection Noël 2026)</h2>

Tous les robots de la gamme éducative Makeblock se programment directement depuis `ide.mblock.cc` :

<div class="merchant-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.25rem 0;">
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot (8–12 ans)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Le classique des écoles et collèges · Blocs Scratch &amp; Arduino</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">89,99 € sur Amazon.fr le 9 novembre 2026</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.fr/dp/B07XR98YYQ?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Voir le prix du jour sur Amazon</a>
      <a href="https://www.awin1.com/cread.php?awinmid=113876&awinaffid=3126073&ued=https%3A%2F%2Fwww.cultura.com%2Fsearch%2Fresults%3Fsearch_query%3Dmbot%2Bmakeblock" rel="sponsored nofollow noopener" target="_blank" style="background:#004b93;color:#fff;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Voir chez Cultura</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank">Makeblock mBot2 CyberPi (10–14 ans)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Écran couleur, Wi-Fi, batterie rechargeable 5 h · Blocs &amp; Python</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">167,95 € sur Amazon.fr le 9 novembre 2026</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.fr/dp/B0919F9CKS?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank" class="affiliate-link" data-product-id="mbot2" data-placement="content" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Voir le prix du jour sur Amazon</a>
      <a href="https://www.awin1.com/cread.php?awinmid=113876&awinaffid=3126073&ued=https%3A%2F%2Fwww.cultura.com%2Fsearch%2Fresults%3Fsearch_query%3Dmbot2%2Bmakeblock" rel="sponsored nofollow noopener" target="_blank" style="background:#004b93;color:#fff;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Voir chez Cultura</a>
    </div>
  </div>
  <div style="border:1px solid #dce3ee;border-radius:12px;padding:1rem;background:#fff;">
    <h3 style="margin:0 0 0.35rem;font-size:1.1rem;"><a href="https://www.amazon.fr/dp/B07CGH8NZ7?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank">Makeblock Codey Rocky (6–12 ans)</a></h3>
    <p style="margin:0 0 0.5rem;font-size:0.92rem;color:#475569;">Prêt à jouer sans montage, matrice LED expressive · Scratch &amp; Python</p>
    <p style="margin:0 0 0.75rem;font-weight:700;"><a href="https://www.amazon.fr/dp/B07CGH8NZ7?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank" style="color:#0f172a;text-decoration:underline;">149,99 € sur Amazon.fr le 9 novembre 2026</a></p>
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      <a href="https://www.amazon.fr/dp/B07CGH8NZ7?tag=manuso06-21" rel="sponsored nofollow noopener" target="_blank" style="background:#ff9900;color:#111;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Voir sur Amazon</a>
      <a href="https://www.awin1.com/cread.php?awinmid=113876&awinaffid=3126073&ued=https%3A%2F%2Fwww.cultura.com%2Fsearch%2Fresults%3Fsearch_query%3Dcodey%2Brocky%2Bmakeblock" rel="sponsored nofollow noopener" target="_blank" style="background:#004b93;color:#fff;font-weight:700;padding:0.45rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.88rem;">Voir chez Cultura</a>
    </div>
  </div>
</div>

<h2 id="faq">7. FAQ mBlock en ligne</h2>

### Comment ouvrir mBlock en ligne en français gratuitement ?
Ouvrez **https://ide.mblock.cc** dans Chrome ou Edge, puis cliquez sur l'icône **🌐 Globe** en haut à gauche et choisissez **Français**.

### Peut-on programmer un vrai robot mBot avec mBlock en ligne ?
Oui : connectez le mBot en USB, cliquez sur **Connecter** en bas à gauche de `ide.mblock.cc` et utilisez le pont **mLink** (ou l'extension Chromebook) pour téléverser votre code.

### Comment sauvegarder son projet sans compte ?
Utilisez le menu **Fichier → Enregistrer sur votre ordinateur** pour récupérer votre fichier `.mblock` en local.

### Quand préférer la version PC/Mac à télécharger ?
Dès que vous travaillez hors connexion ou que vous devez mettre à jour le firmware USB du mBot : suivez alors notre guide [Télécharger mBlock 5 Gratuit (PC Windows 10/11, Mac)](/telecharger-mblock-5-gratuit-guide-2026/).
