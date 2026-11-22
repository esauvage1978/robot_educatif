#!/usr/bin/env node
/**
 * UK/CA price-drops : aucun montant USD ($ US) visible.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  appliquerPartenaires,
  dateParis,
  produitsVisibles,
  texteVisibleCartes,
} from '../public/cron/regles.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURE = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/data/promos-publication-fixture-mixed.json'), 'utf8'),
);

appliquerPartenaires(
  JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/promos/partenaires-actifs.json'), 'utf8')).prix,
  '3126073',
);

const US_DOLLAR_VISIBLE = /(?<!CA)\$[\d]/;
const today = '2099-01-15';

test('fixture : UK ne garde que GBP', () => {
  const uk = produitsVisibles(FIXTURE, 'en', today, 'uk');
  assert.equal(uk.length, 1);
  assert.equal(uk[0].devise, 'GBP');
  assert.equal(produitsVisibles(FIXTURE, 'en', today, 'uk').some((p) => p.devise === 'USD'), false);
});

test('fixture : CA ne garde que CAD', () => {
  const ca = produitsVisibles(FIXTURE, 'en', today, 'ca');
  assert.equal(ca.length, 1);
  assert.equal(ca[0].devise, 'CAD');
});

test('fixture : EN accepte USD (+ EUR optionnel)', () => {
  const en = produitsVisibles(FIXTURE, 'en', today, 'en');
  assert.ok(en.some((p) => p.devise === 'USD'));
});

test('texte visible UK/CA sans dollar US (regex verify-amazon-anglo)', () => {
  for (const geo of ['uk', 'ca']) {
    const cartes = produitsVisibles(FIXTURE, 'en', today, geo);
    const visible = texteVisibleCartes(cartes, 'en', geo);
    assert.ok(!US_DOLLAR_VISIBLE.test(visible), `geo=${geo} texte=${visible}`);
  }
});

test('FR : devise EUR uniquement (pas USD)', () => {
  const fr = produitsVisibles(FIXTURE, 'fr', today, 'fr');
  assert.ok(fr.every((p) => p.devise === 'EUR'));
  assert.equal(fr.some((p) => p.devise === 'USD'), false);
});