// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'ROBOT éducatif';
export const SITE_DESCRIPTION = "Apprendre la robotique en s'amusant";

/** Identifiant affilié Amazon (Programme Partenaires EU) — liens de recherche sur le domaine .fr */
export const AMAZON_AFFILIATE_TAG = 'manuso06-21';

/** Google Analytics 4 — Measurement ID (gtag.js) */
export const GA_MEASUREMENT_ID = 'G-PST9T1NFNX';

/**
 * Webhook formulaire contact (POST `application/x-www-form-urlencoded`).
 * Développement local : défaut ci-dessous. Production : définir `PUBLIC_CONTACT_FORM_WEBHOOK_URL` (build / hébergeur).
 */
const DEFAULT_CONTACT_FORM_WEBHOOK_URL =
	'https://webhooky.builders/webhook/form/d0a7b357-6d27-4652-95f5-3aa3e74da565';

const fromEnv = import.meta.env.PUBLIC_CONTACT_FORM_WEBHOOK_URL;
export const CONTACT_FORM_WEBHOOK_URL =
	typeof fromEnv === 'string' && fromEnv.trim() !== '' ? fromEnv.trim() : DEFAULT_CONTACT_FORM_WEBHOOK_URL;

/** Adresse e-mail affichée sur le site */
export const CONTACT_EMAIL = 'contact@robot-educatif.info';

/** Auteur affiché sur les articles du blog */
export const ARTICLE_AUTHOR = 'Emmanuel SAUVAGE';

/*
  Vues / notation des articles (optionnel) : définir dans `.env`
  PUBLIC_SUPABASE_URL et PUBLIC_SUPABASE_ANON_KEY, puis exécuter
  scripts/supabase-article-engagement.sql dans le projet Supabase.
*/
