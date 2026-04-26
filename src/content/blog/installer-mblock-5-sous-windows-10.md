---
title: "mBlock 5 sur Windows 10/11 : télécharger et installer (guide 2026)"
headline: "Installer mBlock 5 sur Windows 10 (guide facile 2026)"
description: "Télécharger mBlock 5 gratuitement et l’installer sur Windows 10 ou 11 : lien officiel, UAC, SmartScreen, antivirus. Pour programmer le mBot avec mBlock."
pubDate: "2020-04-07"
updatedDate: "2026-04-18"
heroImage: "../../assets/blog-heroes/hero-scratch-mblock.png"
amazonPreset: mbot
categories:
  - "mBlock"
  - "Guide"
  - "Installation"
  - "Windows"
relatedLinks:
  - title: "Télécharger mBlock 5 — guide complet (Windows, Mac, web)"
    href: "/telecharger-mblock-5-gratuit-guide-2026/"
  - title: "Premier pas avec mBlock 5"
    href: "/premier-pas-avec-mblock-5/"
  - title: "Quel logiciel mBlock choisir (app, Web, Python)"
    href: "/logiciel-mblock-makeblock-mbot-quel-choisir/"
  - title: "S’inscrire sur mBlock 5"
    href: "/sinscrire-sur-mblock/"
  - title: "mBot — présentation du robot éducatif"
    href: "/mbot-mon-premier-robot-educatif/"
  - title: "Installer les blocs du mBot"
    href: "/installer-les-blocs-du-mbot/"
  - title: "Mon premier programme mBot"
    href: "/mon-premier-programme-mbot/"
  - title: "Accessoires mBot : par où commencer"
    href: "/accessoires-mbot-par-ou-commencer/"
faqSchema:
  - question: "Comment installer mBlock 5 sur Windows 10 ou 11 ?"
    answer: "Téléchargez l’installateur sur la page officielle mblock.cc (section Windows, 64 bits en général), ouvrez le fichier .exe dans Téléchargements, validez le Contrôle de compte d’utilisateur (Oui) : sur les installateurs récents la copie des fichiers démarre tout de suite, sans assistant langue/chemin. À la fin, Terminer puis lancez mBlock depuis le bureau ou le menu Démarrer."
  - question: "Où télécharger mBlock 5 gratuitement ?"
    answer: "Sur la page officielle Makeblock : mblock.cc (rubrique Download), en choisissant Windows. Ne téléchargez pas depuis des sites miroirs. En secours si le site est indisponible, un installateur du même type peut être proposé sur ce blog — retournez sur mblock.cc dès que possible pour la dernière version."
  - question: "mBlock 5 est-il gratuit et disponible en français ?"
    answer: "Oui, le téléchargement standard est gratuit. L’installateur récent ne demande plus la langue en début d’installation : l’interface de mBlock peut suivre Windows ou se régler dans les paramètres du logiciel après ouverture."
  - question: "mBlock fonctionne-t-il sur Windows 11 ?"
    answer: "Oui, mBlock est compatible avec Windows récents ; la procédure d’installation est la même que sous Windows 10 (UAC, copie directe, Program Files)."
  - question: "Faut-il Internet pour utiliser mBlock ?"
    answer: "Non pour l’essentiel : une installation locale permet de travailler hors ligne pour beaucoup d’usages. Le téléchargement de l’installateur et certaines fonctions en ligne nécessitent Internet."
  - question: "Peut-on programmer mBot sans installer mBlock ?"
    answer: "Oui, via mBlock en ligne dans le navigateur, avec mLink si nécessaire pour la connexion au robot — voir la documentation Makeblock."
  - question: "Dois-je installer exactement la version 5.6 de mBlock ?"
    answer: "Non : installez la dernière version stable proposée sur mblock.cc (souvent 5.6.x ou plus récent). Les installateurs récents vont droit à la copie après l’UAC, sans les anciens écrans Suivant intermédiaires."
  - question: "Windows affiche « Windows a protégé votre PC » (SmartScreen) : que faire ?"
    answer: "Vérifiez que le .exe vient bien de mblock.cc ou du lien de secours de cet article. Cliquez sur Informations complémentaires puis Exécuter quand même. Sinon : clic droit sur le fichier → Propriétés → cocher Débloquer si la case existe, puis relancer."
  - question: "L’antivirus ou le pare-feu bloque mBlock : que faire ?"
    answer: "Consultez la quarantaine de l’antivirus et restaurez le fichier seulement s’il vient de la source officielle ; ajoutez une exclusion pour l’installateur ou le dossier sous Program Files. Certaines suites bloquent l’installation : une désactivation temporaire le temps de l’installation peut être nécessaire, puis réactivez la protection."
  - question: "Rien ne se passe quand je double-clique sur le fichier .exe : que faire ?"
    answer: "Clic droit → Exécuter en tant qu’administrateur ; Propriétés → Débloquer si présent ; retéléchargez l’installateur (fichier incomplet). Sur un PC d’école ou d’entreprise sans droits admin, contactez le service informatique."
  - question: "mBlock en ligne ou application Windows : que choisir ?"
    answer: "mBlock Web (navigateur) convient si vous ne pouvez pas installer de logiciel. Pour firmware, USB stable et téléversement vers un robot comme le mBot, l’application bureau est en général préférable — voir aussi notre comparatif app / Web / Python."
  - question: "Qu’est-ce que mBlock 5 ?"
    answer: "mBlock 5 (souvent noté mblock 5) est l’environnement de programmation par blocs de Makeblock, proche de Scratch, utilisé notamment pour les robots mBot et l’écosystème Makeblock."
  - question: "« Télécharger mblock » et « télécharger mblock 5 », c’est la même chose ?"
    answer: "Dans la plupart des cas oui : il s’agit de mBlock 5 pour PC. Vérifiez que la source est Makeblock / mblock.cc."
  - question: "Quelle différence entre mBlock et mLink ?"
    answer: "mBlock est l’application de programmation par blocs. mLink est un outil séparé pour certaines connexions, notamment avec le Web. Pour ce guide, concentrez-vous sur l’installateur mBlock 5 Windows ; voir la documentation Makeblock pour mLink et .NET si besoin."
---

<p><strong>Comment installer mBlock 5 sur Windows 10 ?</strong><br>
Pour installer mBlock 5, il suffit de télécharger le logiciel depuis le site officiel, lancer l’exécutable et suivre les étapes d’installation. L’installation prend moins de 5 minutes. <em>En pratique sous Windows 10 ou 11 :</em> téléchargez sur <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc</a></strong> (section <strong>Windows</strong>, <strong>64 bits</strong> en général), ouvrez le <code>.exe</code>, cliquez <strong>Oui</strong> à l’<strong>UAC</strong> — la copie des fichiers démarre tout de suite sur les installateurs récents. À la fin : <strong>Terminer</strong>, puis lancez <strong>mBlock</strong> depuis le bureau ou le menu Démarrer. <strong>Vue d’ensemble</strong> (Mac, Linux, version web) : <a href="/telecharger-mblock-5-gratuit-guide-2026/">télécharger mBlock 5 — guide complet</a> · <strong>Windows 11</strong> : <a href="/installer-mblock-windows-11-guide-facile/">raccourci dédié</a>.</p>

<p><strong>Temps nécessaire :</strong> 5 minutes<br>
<strong>Niveau :</strong> débutant</p>

<p><strong>En bref :</strong> environ <strong>380 Mo</strong> à télécharger, <strong>~1,05 Go</strong> une fois installé sous <code>Program Files</code> — prévoyez <strong>1,5 à 2 Go</strong> libres sur le disque système.</p>

<p><strong>Poursuivre après l’installation :</strong> <a href="/premier-pas-avec-mblock-5/">premiers pas avec mBlock</a>, <a href="/installer-les-blocs-du-mbot/">installer les blocs mBot</a>, <a href="/mon-premier-programme-mbot/">premier programme mBot</a>.</p>

<p>Ce tutoriel s’appuie sur des <strong>installations réelles</strong> sous Windows 10 et 11, la <strong>documentation Makeblock</strong> et les <strong>blocages fréquents</strong> (SmartScreen, antivirus, droits administrateur) que rencontrent enfants, parents et enseignants. Dernière mise à jour des repères : <strong>avril 2026</strong>.</p>

<p>mBlock existe aussi pour <strong>macOS</strong>, <strong>Linux</strong>, <strong>mobile</strong> et <strong>Chromebook</strong> — ici nous ne traitons que <strong>Windows</strong>. Une fois l’installation faite, vous pourrez programmer un robot comme le <a href="/mbot-mon-premier-robot-educatif/">mBot</a>.</p>

<p><strong>Illustrations :</strong> captures de la page de téléchargement, du fichier dans Téléchargements, de l’écran de fin et de la taille du dossier ; l’UAC reste schématisée. Les libellés peuvent varier selon la langue de Windows : suivez la logique (Oui, Terminer, etc.).</p>

<div class="article-toc" role="navigation" aria-label="Sommaire de l’article">
<p class="article-toc-title">Sommaire</p>
<ul>
<li><a href="#prerequis">1. Avant de commencer (prérequis)</a></li>
<li><a href="#choix-rapide">2. Quelle méthode pour votre cas ?</a></li>
<li><a href="#etape-telecharger">3. Étape 1 — Télécharger l’installateur Windows</a></li>
<li><a href="#etape-installer">4. Étape 2 — Lancer l’installateur</a></li>
<li><a href="#problemes-frequents-installation">Problèmes fréquents lors de l’installation</a></li>
<li><a href="#mblock-sans-installation">Utiliser mBlock sans installation</a></li>
<li><a href="#depannage-rapide">5. Dépannage express</a></li>
<li><a href="#notre-recommandation">6. Notre recommandation</a></li>
<li><a href="#faq">7. FAQ</a></li>
<li><a href="#depannage-detaille">8. Dépannage approfondi</a></li>
</ul>
</div>

<h2 id="prerequis">1. Avant de commencer (prérequis)</h2>

<ul>
<li><strong>Compte administrateur</strong> (ou mot de passe administrateur) : Windows affichera souvent le <strong>Contrôle de compte d’utilisateur</strong> ; il faut pouvoir cliquer sur <strong>Oui</strong>.</li>
<li><strong>Connexion Internet</strong> uniquement pour <strong>télécharger</strong> l’installateur ; l’usage de mBlock en local peut ensuite se faire sans réseau selon votre usage.</li>
<li><strong>Espace disque</strong> : fichier d’installation <strong>~380 Mo</strong> ; une fois installé, <strong>~1,05 Go</strong> (dossier sous <code>Program Files</code>, valeur pouvant varier). Prévoyez <strong>au moins 1,5 à 2 Go</strong> libres (marge pour mises à jour).</li>
<li><strong>Antivirus / pare-feu</strong> : en cas de blocage rare du <code>.exe</code>, vérifiez que la source est bien <strong>mblock.cc</strong> avant d’autoriser une exception.</li>
</ul>

<h2 id="choix-rapide">2. Quelle méthode pour votre cas ?</h2>

<table>
<thead>
<tr>
<th scope="col">Votre situation</th>
<th scope="col">Piste conseillée</th>
</tr>
</thead>
<tbody>
<tr>
<td>Vous programmez un <strong>mBot</strong> en USB / téléversement régulier</td>
<td><strong>Application bureau</strong> depuis <a href="https://www.mblock.cc/en-us/download/">mblock.cc</a> (ce guide)</td>
</tr>
<tr>
<td>Pas de droits <strong>administrateur</strong> (PC école / entreprise)</td>
<td><a href="https://ide.mblock.cc/">mBlock en ligne</a> ou demande au service IT ; voir <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">app vs Web</a></td>
</tr>
<tr>
<td>SmartScreen ou antivirus bloque le <code>.exe</code></td>
<td>Vérifier la source officielle, puis section <a href="#depannage-detaille">Dépannage approfondi</a> (SmartScreen / antivirus)</td>
</tr>
<tr>
<td>Après l’installation : se repérer dans l’interface</td>
<td><a href="/premier-pas-avec-mblock-5/">Premier pas avec mBlock 5</a></td>
</tr>
</tbody>
</table>

<div class="article-cta-row">
<a class="article-cta article-cta--primary" href="/premier-pas-avec-mblock-5/">Premier pas avec mBlock 5</a>
<a class="article-cta article-cta--secondary" href="/logiciel-mblock-makeblock-mbot-quel-choisir/">App, Web ou Python ?</a>
<a class="article-cta article-cta--secondary" href="/sinscrire-sur-mblock/">Créer un compte mBlock</a>
</div>

<p>En prolongement : <a href="/mbot-mon-premier-robot-educatif/">le robot mBot</a>, <a href="/installer-les-blocs-du-mbot/">installer les blocs du mBot dans mBlock</a>, <a href="/accessoires-mbot-par-ou-commencer/">accessoires mBot</a> et <a href="/scratch-ecole-maison-par-ou-commencer/">Scratch école / maison</a> si vous cadrez l’atelier.</p>

<h2 id="etape-telecharger">3. Étape 1 — Télécharger l’installateur Windows</h2>

<h3 id="telecharger-officiel">3.1 Ouvrir la page officielle</h3>

<p>Rendez-vous sur la page de téléchargement Makeblock :</p>

<p><strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc — Download (Windows)</a></strong></p>

<p>Utilisez de préférence <strong>Chrome</strong>, <strong>Edge</strong> ou <strong>Firefox</strong> à jour. Évitez les liens « miroir » ou sites tiers : téléchargez <strong>uniquement</strong> depuis le domaine officiel.</p>

<h3 id="telecharger-variante">3.2 Choisir Windows et la bonne variante</h3>

<p>Sur la page :</p>

<ul>
<li>Sélectionnez la section <strong>Windows</strong>.</li>
<li>Privilégiez la version <strong>64 bits</strong> si votre PC est récent (cas le plus courant). Si vous ne savez pas : <strong>Paramètres → Système → À propos</strong> indique le type (<strong>64 bits</strong> ou <strong>32 bits</strong>).</li>
</ul>

<p>Le fichier téléchargé ressemble en général à <strong><code>mblock5-win32-….exe</code></strong>, <strong><code>mblock5-win64-….exe</code></strong> ou <strong><code>V5.6.0.exe</code></strong> — le nom exact peut varier.</p>

<p><strong>Si le site officiel est indisponible</strong>, vous pouvez utiliser à titre de secours une <strong>copie de l’installateur</strong> hébergée sur ce site (même famille de version) : <strong><a href="/capture/installer-mblock-5-sous-windows-10/V5.6.0.exe">Télécharger l’installateur mBlock 5 (Windows, secours)</a></strong>. Préférez toujours <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc</a></strong> dès qu’il est à nouveau accessible.</p>

![Page de téléchargement Makeblock : mBlock 5 pour Windows, installer mBlock sur PC](/images/blog/installer-mblock/ecran-01-page-makeblock.png)

<p><em>Repérez la section <strong>mBlock 5</strong> et le bouton <strong>Download</strong> pour <strong>Windows</strong>.</em></p>

<h3 id="telecharger-dossier">3.3 Où est enregistré le fichier ?</h3>

<p>Après le clic sur <strong>Download</strong> :</p>

<ul>
<li>Le fichier arrive souvent dans <strong><code>Ce PC → Téléchargements</code></strong>.</li>
<li>Sous Edge ou Chrome, une barre en bas peut afficher le téléchargement : <strong>Ouvrir le fichier</strong> ou <strong>Afficher dans le dossier</strong>.</li>
<li>Raccourci : <strong><code>Ctrl + J</code></strong> ouvre la liste des téléchargements dans plusieurs navigateurs.</li>
</ul>

<p><strong>À propos de mLink :</strong> mLink sert surtout à la connexion matérielle / certains usages Web. Pour l’application installée comme ici, concentrez-vous sur <strong>mBlock 5</strong> Windows. Vous pouvez aussi utiliser <strong><a href="https://ide.mblock.cc/">mBlock en ligne</a></strong> si vous préférez ne rien installer.</p>

<h2 id="etape-installer">4. Étape 2 — Lancer l’installateur</h2>

<h3 id="installer-lancer-exe">4.1 Ouvrir le fichier <code>.exe</code></h3>

<ol>
<li>Ouvrez l’<strong>Explorateur de fichiers</strong> (<code>Windows + E</code>).</li>
<li>Allez dans <strong>Téléchargements</strong>.</li>
<li>Repérez le fichier <strong><code>.exe</code></strong> téléchargé.</li>
<li><strong>Double-cliquez</strong> pour lancer l’installation.</li>
</ol>

![Explorateur Windows : fichier installateur mBlock dans Téléchargements (mblock download Windows)](/capture/installer-mblock-5-sous-windows-10/explorateur_telechargement.png)

<p><em>Le nom exact du fichier dépend de la version ; lancez le bon <code>.exe</code> que vous venez de télécharger.</em></p>

<h3 id="installer-uac">4.2 Contrôle de compte d’utilisateur (UAC)</h3>

<p>Windows peut afficher <strong>« Voulez-vous autoriser cette application… »</strong> avec <strong>Non</strong> et <strong>Oui</strong>.</p>

<ul>
<li>Cliquez sur <strong>Oui</strong> (comportement normal pour une installation dans <code>Program Files</code>).</li>
</ul>

![Fenêtre UAC Windows : autoriser l’installateur mBlock 5](/images/blog/installer-mblock/ecran-03-uac.svg)

<p><em>Si vous n’êtes pas administrateur, demandez une personne avec les droits sur la machine.</em></p>

<h3 id="installer-sans-assistant">4.3 Installation automatique (sans assistant « étape par étape »)</h3>

<p>Après <strong>Oui</strong> sur l’UAC, l’installateur <strong>récent</strong> ne propose en général <strong>plus</strong> : langue, dossier de destination manuel, options menu Démarrer / raccourci bureau, écran <strong>Résumé</strong> avec bouton <strong>Installer</strong> séparé. La <strong>copie des fichiers</strong> commence <strong>directement</strong> (souvent sous <strong><code>Program Files</code></strong>). Patientez jusqu’à l’écran de fin.</p>

<h3 id="installer-progression">4.4 Barre de progression</h3>

<p>Pendant la copie, une <strong>barre de progression</strong> peut s’afficher. <strong>Ne fermez pas</strong> la fenêtre tant que l’installateur ne l’indique pas.</p>

<h3 id="installer-fin">4.5 Fin de l’installation</h3>

<p>À la fin : écran du type <strong>« Install Finished »</strong> / installation terminée. Il n’y a en général <strong>plus de case</strong> « Lancer mBlock » : cliquez sur <strong>Finish</strong> / <strong>Terminer</strong>.</p>

![Fin d’installation mBlock 5 sous Windows : bouton Terminer / Finish](/capture/installer-mblock-5-sous-windows-10/installation_fin.png)

<h3 id="installer-taille">4.6 Taille sur le disque après installation</h3>

<p>Le dossier mBlock (souvent <strong><code>Program Files\mBlock5</code></strong>) affiche environ <strong>1,05 Go</strong> dans les propriétés Windows — le chiffre peut varier selon la version.</p>

![Propriétés du dossier mBlock : taille sur disque après installation (~1,05 Go)](/capture/installer-mblock-5-sous-windows-10/taille-dossier-mblock-apres-install.png)

<h3 id="installer-ouvrir">4.7 Ouvrir mBlock après l’installation</h3>

<p>Ouvrez mBlock via le <strong>raccourci bureau</strong> ou le <strong>menu Démarrer</strong> (recherche <strong>mBlock</strong>). Poursuivez avec <strong><a href="/premier-pas-avec-mblock-5/">Premier pas avec mBlock 5</a></strong> pour l’interface.</p>

<h2 id="problemes-frequents-installation">Problèmes fréquents lors de l’installation</h2>

<h3>Le logiciel ne s’installe pas</h3>

<p>Vérifiez que vous avez les <strong>droits administrateur</strong> (compte admin ou mot de passe autorisant l’UAC à <strong>Oui</strong>). Sur un PC d’école ou d’entreprise, sollicitez le service informatique. Voir aussi le <a href="#depannage-rapide">dépannage express</a> et le <a href="#depannage-detaille">dépannage approfondi</a> pour SmartScreen et antivirus.</p>

<h3>mBlock ne détecte pas le mBot</h3>

<p>Le souci apparaît surtout <em>après</em> l’installation : essayez un <strong>autre câble ou port USB</strong>, évitez les hubs peu fiables, et vérifiez les <strong>pilotes</strong> dans le <strong>Gestionnaire de périphériques</strong> Windows si le robot n’apparaît pas. Pour le Web, <strong>mLink</strong> peut être nécessaire — voir la <a href="https://support.makeblock.com/">documentation Makeblock</a>.</p>

<h3>Version incompatible</h3>

<p>Utilisez une version <strong>64 bits</strong> de Windows et l’installateur <strong>Windows 64 bits</strong> sur <a href="https://www.mblock.cc/en-us/download/">mblock.cc</a> pour un PC récent (cas le plus courant). Vérifiez le type de système dans <strong>Paramètres → Système → À propos</strong>.</p>

<h2 id="mblock-sans-installation">Utiliser mBlock sans installation</h2>

<p>Vous pouvez utiliser <strong><a href="https://ide.mblock.cc/">mBlock en ligne</a></strong> directement dans le navigateur, sans installer de logiciel sur le PC — pratique sur une machine verrouillée ou pour un premier essai. La connexion au robot (USB) repose souvent sur <strong>mLink</strong> ; pour un usage intensif mBot en USB, l’<strong>application bureau</strong> reste en général la plus stable : <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">app, Web ou Python ?</a></p>

<h2 id="depannage-rapide">5. Dépannage express</h2>

<table>
<thead>
<tr>
<th scope="col">Problème</th>
<th scope="col">Piste</th>
</tr>
</thead>
<tbody>
<tr>
<td>Le <code>.exe</code> ne se lance pas</td>
<td><strong>Propriétés → Débloquer</strong> ; <strong>Exécuter en tant qu’administrateur</strong> ; retélécharger ; <a href="#faq">FAQ</a> ci-dessous.</td>
</tr>
<tr>
<td><strong>Windows a protégé votre PC</strong> (SmartScreen)</td>
<td><strong>Informations complémentaires → Exécuter quand même</strong> si la source est <strong>mblock.cc</strong> ou le <strong>lien de secours</strong> de cet article.</td>
</tr>
<tr>
<td>Installation interrompue / erreur</td>
<td>Antivirus / pare-feu : autoriser temporairement ou exception, puis réactiver.</td>
</tr>
<tr>
<td>UAC bloqué / pas admin</td>
<td>Compte administrateur ou aide adulte / service informatique.</td>
</tr>
<tr>
<td>Écrans en anglais</td>
<td><strong>Finish</strong> / <strong>Install Finished</strong> est courant ; la langue de mBlock se règle <strong>dans l’application</strong>.</td>
</tr>
</tbody>
</table>

<h2 id="notre-recommandation">6. Notre recommandation</h2>

<p><strong>Pour la plupart des usages mBot / Makeblock sous Windows :</strong> installez l’<strong>application bureau</strong> depuis <strong>mblock.cc</strong> (section Windows 64 bits).</p>

<p><strong>Si vous ne pouvez pas installer de logiciel :</strong> utilisez <strong><a href="https://ide.mblock.cc/">mBlock Web</a></strong> en complément ou à la place, en acceptant les limites selon le matériel — voir <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">quel logiciel mBlock choisir</a>.</p>

<p><strong>Une fois installé :</strong> enchaînez avec <a href="/premier-pas-avec-mblock-5/">Premier pas avec mBlock 5</a>, puis <a href="/sinscrire-sur-mblock/">la création de compte</a> si vous utilisez les fonctions en ligne.</p>

<h2 id="faq">7. FAQ</h2>

<h3 id="faq-installer-windows">7.1. Comment installer mBlock 5 sur Windows 10 ou 11 ?</h3>

<p>Téléchargez l’installateur sur <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc</a></strong> (Windows, 64 bits en général), ouvrez le <code>.exe</code>, validez l’UAC par <strong>Oui</strong> : la copie démarre tout de suite sur les installateurs récents. À la fin, <strong>Terminer</strong>, puis lancez mBlock depuis le bureau ou le menu Démarrer.</p>

<h3 id="faq-ou-telecharger">7.2. Où télécharger mBlock 5 gratuitement ?</h3>

<p>Page officielle <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc — Download</a></strong>, section <strong>Windows</strong>. Évitez les sites non officiels. Secours possible : <a href="/capture/installer-mblock-5-sous-windows-10/V5.6.0.exe">installateur hébergé ici</a> si mblock.cc est indisponible — repassez sur le site officiel dès que possible.</p>

<h3 id="faq-gratuit-fr">7.3. mBlock 5 est-il gratuit et disponible en français ?</h3>

<p>Oui : le téléchargement standard est <strong>gratuit</strong>. L’installateur récent ne demande plus la langue au début ; l’interface suit souvent Windows ou se règle dans les paramètres de mBlock après installation.</p>

<h3 id="faq-win11">7.4. mBlock fonctionne-t-il sur Windows 11 ?</h3>

<p>Oui, mBlock est compatible avec Windows récents : mêmes étapes que sous Windows 10 (UAC, copie directe, <code>Program Files</code>).</p>

<h3 id="faq-internet">7.5. Faut-il Internet pour utiliser mBlock ?</h3>

<p>Non pour l’essentiel : une <strong>installation locale</strong> permet de travailler <strong>hors ligne</strong> pour beaucoup d’usages. En revanche, le <strong>téléchargement</strong> de l’installateur et certaines fonctions en ligne (compte, synchronisation) nécessitent Internet.</p>

<h3 id="faq-sans-installer">7.6. Peut-on programmer mBot sans installer mBlock ?</h3>

<p>Oui, via la <a href="https://ide.mblock.cc/">version Web</a> avec <strong>mLink</strong> selon la configuration — détails dans <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">quel logiciel mBlock choisir</a>.</p>

<h3 id="faq-version-56">7.7. Dois-je installer exactement la version 5.6 de mBlock ?</h3>

<p>Installez la <strong>dernière version stable</strong> affichée sur mblock.cc (souvent 5.6.x ou plus récent), pas une vieille référence de tutoriel sauf cas précis signalé par le fabricant.</p>

<h3 id="faq-smartscreen">7.8. Windows affiche « Windows a protégé votre PC » (SmartScreen) : que faire ?</h3>

<p>Vérifiez la source (<strong>mblock.cc</strong> ou lien de secours de cet article). <strong>Informations complémentaires</strong> → <strong>Exécuter quand même</strong>. Sinon <strong>Propriétés → Débloquer</strong> sur le fichier, puis relancez.</p>

<h3 id="faq-antivirus">7.9. L’antivirus ou le pare-feu bloque mBlock : que faire ?</h3>

<p>Consultez quarantaine / historique ; restaurez seulement si la source est officielle ; ajoutez une exclusion. Si besoin, désactivez temporairement la protection le temps de l’installation puis réactivez-la.</p>

<h3 id="faq-exe-ne-demarre-pas">7.10. Rien ne se passe quand je double-clique sur le fichier .exe : que faire ?</h3>

<p><strong>Exécuter en tant qu’administrateur</strong>, <strong>Débloquer</strong> dans les propriétés, <strong>retélécharger</strong> le fichier. Sur PC géré par une organisation, sollicitez le service informatique.</p>

<h3 id="faq-web-vs-bureau">7.11. mBlock en ligne ou application Windows : que choisir ?</h3>

<p><strong><a href="https://ide.mblock.cc/">mBlock en ligne</a></strong> si vous ne pouvez pas installer. Pour USB, firmware et téléversement vers le robot, l’<strong>application bureau</strong> est en général préférable — détails dans <a href="/logiciel-mblock-makeblock-mbot-quel-choisir/">quel logiciel mBlock choisir</a>.</p>

<h3 id="faq-qu-est-ce-que-mblock">7.12. Qu’est-ce que mBlock 5 ?</h3>

<p>Environnement de <strong>programmation par blocs</strong> Makeblock, proche de <strong>Scratch</strong>, pour les robots <strong>mBot</strong> et l’écosystème Makeblock.</p>

<h3 id="faq-mblock-vs-mblock5">7.13. « Télécharger mblock » et « télécharger mblock 5 », c’est la même chose ?</h3>

<p>En général oui : <strong>mBlock 5</strong> pour PC. Vérifiez la source <strong>Makeblock / mblock.cc</strong>.</p>

<h3 id="faq-mblock-vs-mlink">7.14. Quelle différence entre mBlock et mLink ?</h3>

<p><strong>mBlock</strong> programme en blocs. <strong>mLink</strong> est un outil séparé pour certaines connexions (dont usages Web). Pour l’installation décrite ici, priorité à <strong>mBlock 5</strong> Windows.</p>

<h3 id="faq-varia-recherches">7.15. Recherches du type « mblock 5 télécharger », « mblock download », « mblock5 download »</h3>

<p>Toutes pointent vers le <strong>même logiciel</strong> (mBlock 5 pour Windows). La référence reste <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc</a></strong>, variante <strong>64 bits</strong> en priorité pour un PC récent.</p>

<h3 id="faq-typos">7.16. « mblock5 », « mblock v5 », « mbloc 5 », « mblcok » : c’est bien mBlock ?</h3>

<p>Oui : en pratique <strong>mBlock 5</strong>. En cas de recherche infructueuse, tapez <strong>mBlock 5 Makeblock</strong> ou ouvrez directement <strong>mblock.cc</strong>.</p>

<h3 id="faq-anciennes-versions">7.17. Anciennes versions (5.3, 5.4.3) : faut-il les installer ?</h3>

<p>Les tutos peuvent citer d’anciennes versions. Pour un nouveau PC : <strong>dernière stable</strong> sur le site officiel, sauf consigne de compatibilité précise.</p>

<h3 id="faq-pc-windows">7.18. « mblock PC », « télécharger mblock pour windows »</h3>

<p>La section <strong>Windows</strong> sur mblock.cc fournit l’installateur PC. Ce guide couvre <strong>Windows 10</strong> et <strong>Windows 11</strong>.</p>

<h3 id="faq-apres-telecharger">7.19. « Installer mblock » après le téléchargement : quoi faire ?</h3>

<p>Lancez le <code>.exe</code> (voir <a href="#etape-installer">étape 2</a>). Pas d’assistant « Suivant » multiple sur les installateurs récents : la copie suit l’UAC.</p>

<h3 id="faq-planet">7.20. C’est quoi « mblock planet » ?</h3>

<p>Souvent l’<strong>espace compte / cloud</strong> (ex. planet.mblock.cc). Pour créer un compte : <a href="/sinscrire-sur-mblock/">S’inscrire sur mBlock 5</a>.</p>

<h3 id="faq-logo">7.21. Logo mBlock, « image mblock » : illustration officielle ?</h3>

<p>Logos et visuels de marque : site Makeblock et conditions d’usage. Les captures d’écran des tutoriels montrent l’app telle qu’elle apparaît sur le bureau.</p>

<h3 id="faq-minecraft">7.22. mBlock et Minecraft : confusion ?</h3>

<p><strong>Non</strong> : mBlock (Makeblock, mBot) n’est pas le jeu Minecraft. Précisez <strong>Makeblock</strong> ou <strong>mBot</strong> dans la recherche.</p>

<h2 id="depannage-detaille">8. Dépannage approfondi</h2>

<p>Les causes fréquentes : <strong>Windows Defender / SmartScreen</strong>, <strong>antivirus tiers</strong>, <strong>droits insuffisants</strong>, <strong>fichier incomplet</strong>. La documentation Makeblock signale que certains logiciels de sécurité peuvent bloquer l’installation : autoriser ou exclure après vérification de la source officielle.</p>

<h3 id="depann-smartscreen-detail">8.1. Windows affiche « Windows a protégé votre PC » ou SmartScreen bloque l’installateur</h3>

<p>Courant pour des fichiers récemment téléchargés.</p>

<ol>
<li>Vérifiez que le <code>.exe</code> vient de <strong><a href="https://www.mblock.cc/en-us/download/">mblock.cc</a></strong> ou du <strong>lien de secours</strong> de cet article.</li>
<li>Cliquez sur <strong>Informations complémentaires</strong> (<strong>More info</strong>), puis <strong>Exécuter quand même</strong> / <strong>Run anyway</strong>.</li>
<li>Si besoin : clic droit → <strong>Propriétés</strong> → <strong>Débloquer</strong> → <strong>OK</strong>, puis relancer.</li>
</ol>

<h3 id="depann-antivirus-detail">8.2. L’antivirus ou le pare-feu bloque l’installation</h3>

<p>Plusieurs suites interceptent les installateurs. La doc Makeblock recommande parfois de <strong>fermer temporairement</strong> la protection le temps de l’installation ou d’<strong>ajouter une exception</strong>.</p>

<ul>
<li>Ouvrez l’antivirus : <strong>Quarantaine</strong>, <strong>Menaces bloquées</strong>, <strong>Historique</strong>.</li>
<li>Si mblock y figure : restaurez <strong>uniquement</strong> si la source est officielle, puis exclusion pour le dossier d’installation ou l’exécutable.</li>
<li><strong>Pare-feu Windows</strong> : si mBlock est bloqué au lancement, autorisez l’application ou créez une règle (Paramètres → Pare-feu).</li>
</ul>

<h3 id="depann-double-clic-detail">8.3. Rien ne se passe quand je double-clique sur le <code>.exe</code></h3>

<ol>
<li>Clic droit → <strong>Exécuter en tant qu’administrateur</strong>.</li>
<li><strong>Propriétés → Général → Débloquer</strong> si présent.</li>
<li><strong>Retéléchargez</strong> l’installateur ; supprimez l’ancienne copie ; comparez la taille du fichier si le site l’indique.</li>
<li>Vérifiez les droits sur un PC d’école / entreprise et contactez le <strong>service informatique</strong> si nécessaire.</li>
</ol>

<h3 id="depann-acces-refuse">8.4. « Accès refusé » ou erreur d’écriture dans un dossier</h3>

<ul>
<li>L’installateur récent installe sous <strong><code>Program Files\…</code></strong> ; vérifiez les droits sur le disque <strong>C:</strong>.</li>
<li>Évitez les chemins avec caractères spéciaux ou redirections tierces.</li>
<li>Confirmez <strong>Oui</strong> à l’UAC.</li>
</ul>

<h3 id="depann-32-64">8.5. Mauvaise architecture (32 / 64 bits)</h3>

<p>Si le PC est en <strong>64 bits</strong>, prenez la version <strong>64 bits</strong> sur mblock.cc. Vérifiez dans <strong>Paramètres → Système → À propos</strong>.</p>

<h3 id="depann-ancienne-install">8.6. Une ancienne version de mBlock est déjà installée</h3>

<ol>
<li><strong>Paramètres → Applications → Applications et fonctionnalités</strong> (ou Panneau de configuration → Programmes).</li>
<li>Désinstallez <strong>mBlock</strong> / <strong>Makeblock mBlock</strong>.</li>
<li>Redémarrez si demandé, puis retéléchargez la <strong>dernière version</strong> depuis mblock.cc.</li>
</ol>

<h3 id="depann-mlink-net">8.7. Confusion mBlock / mLink et .NET</h3>

<p><strong>mLink</strong> peut afficher des erreurs liées au <strong>.NET Framework</strong> : suivre les messages ou la <strong><a href="https://support.makeblock.com/">documentation Makeblock / mLink</a></strong> ; mettre à jour Windows et les <strong>fonctionnalités facultatives .NET</strong> selon la version.</p>

<h3 id="depann-ne-demarre-pas">8.8. Installation réussie mais mBlock ne démarre pas</h3>

<ul>
<li>Antivirus qui bloque l’exécutable au premier lancement → exception pour <code>mblock.exe</code> (ou nom affiché).</li>
<li>Test : lancer mBlock <strong>en administrateur</strong> une fois (clic droit sur le raccourci).</li>
<li>Réinstaller par-dessus ou après désinstallation propre.</li>
</ul>

<h3 id="depann-espace">8.9. Espace disque insuffisant</h3>

<p>Libérez de la place sur <strong>C:</strong> (corbeille, Stockage dans Paramètres). Prévoyez <strong>~1,5 à 2 Go</strong> libres (installateur + installé + mises à jour).</p>

<h3 id="depann-aide-makeblock">8.10. Où demander de l’aide si rien ne fonctionne ?</h3>

<ul>
<li><strong><a href="https://support.makeblock.com/">Centre d’aide Makeblock</a></strong>.</li>
<li><strong>service@makeblock.com</strong> — joignez la version de Windows, le message d’erreur exact (capture) et la version du fichier téléchargé.</li>
</ul>

<p><em>Les libellés peuvent varier selon mBlock et Windows ; ces pistes correspondent aux cas les plus fréquents et aux recommandations habituelles sur Windows.</em></p>

<p><strong>À retenir :</strong> L’installation de mBlock 5 est rapide et permet de programmer facilement le robot mBot. Enchaînez avec les <a href="/premier-pas-avec-mblock-5/">premiers pas avec mBlock</a>, <a href="/installer-les-blocs-du-mbot/">blocs mBot</a> et un <a href="/mon-premier-programme-mbot/">premier programme mBot</a>.</p>

## Liens Amazon (recherche — affiliation)

- [mBot2 Makeblock](https://www.amazon.fr/s?k=mBot2+Makeblock&tag=manuso06-21)
- [mBot Makeblock](https://www.amazon.fr/s?k=mBot+Makeblock&tag=manuso06-21)

*Partenaire Amazon — commission possible sur achats éligibles, sans surcoût pour vous.*
