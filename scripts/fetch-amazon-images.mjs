#!/usr/bin/env node

/**
 * Fetch Amazon product images via Product Advertising API 5.0
 * 
 * Environment variables required:
 * - PAAPI_ACCESS_KEY: AWS Access Key ID
 * - PAAPI_SECRET_KEY: AWS Secret Access Key
 * - PAAPI_PARTNER_TAG: Amazon Partner Tag (default: manuso06-21)
 * 
 * If variables are not set, script exits silently (build continues)
 * 
 * Output: src/data/amazon-images.json
 * Format: { "ASIN": "https://...", ... }
 */

import { createHash, createHmac } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = join(__dirname, '../src/data/products.json');
const OUTPUT_PATH = join(__dirname, '../src/data/amazon-images.json');

// Check for required environment variables
const ACCESS_KEY = process.env.PAAPI_ACCESS_KEY;
const SECRET_KEY = process.env.PAAPI_SECRET_KEY;
const PARTNER_TAG = process.env.PAAPI_PARTNER_TAG || 'manuso06-21';

if (!ACCESS_KEY || !SECRET_KEY) {
	console.log('[fetch-amazon-images] PA-API credentials not set, skipping image fetch');
	// Ensure empty JSON exists for build to succeed
	try {
		readFileSync(OUTPUT_PATH);
	} catch {
		writeFileSync(OUTPUT_PATH, '{}', 'utf8');
	}
	process.exit(0);
}

const MARKETPLACE = 'www.amazon.fr';
const REGION = 'eu-west-1';
const SERVICE = 'ProductAdvertisingAPI';
const HOST = 'webservices.amazon.fr';
const PATH = '/paapi5/getitems';

/**
 * AWS Signature Version 4 signing
 */
function sign(key, message) {
	return createHmac('sha256', key).update(message).digest();
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
	const kDate = sign('AWS4' + key, dateStamp);
	const kRegion = sign(kDate, regionName);
	const kService = sign(kRegion, serviceName);
	const kSigning = sign(kService, 'aws4_request');
	return kSigning;
}

/**
 * Call PA-API GetItems
 */
async function fetchProductImages(asins) {
	const now = new Date();
	const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
	const dateStamp = amzDate.slice(0, 8);
	
	const payload = JSON.stringify({
		ItemIds: asins,
		Resources: ['Images.Primary.Large'],
		PartnerTag: PARTNER_TAG,
		PartnerType: 'Associates',
		Marketplace: MARKETPLACE,
	});
	
	const payloadHash = createHash('sha256').update(payload).digest('hex');
	
	const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${HOST}\nx-amz-date:${amzDate}\n`;
	const signedHeaders = 'content-type;host;x-amz-date';
	const canonicalRequest = `POST\n${PATH}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
	
	const algorithm = 'AWS4-HMAC-SHA256';
	const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
	const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${createHash('sha256').update(canonicalRequest).digest('hex')}`;
	
	const signingKey = getSignatureKey(SECRET_KEY, dateStamp, REGION, SERVICE);
	const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');
	
	const authorizationHeader = `${algorithm} Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
	
	try {
		const response = await fetch(`https://${HOST}${PATH}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Host': HOST,
				'X-Amz-Date': amzDate,
				'Authorization': authorizationHeader,
			},
			body: payload,
		});
		
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`PA-API error ${response.status}: ${errorText}`);
		}
		
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('[fetch-amazon-images] PA-API request failed:', error.message);
		return null;
	}
}

/**
 * Main execution
 */
async function main() {
	console.log('[fetch-amazon-images] Starting image fetch via PA-API 5.0');
	
	// Read products.json
	let products;
	try {
		products = JSON.parse(readFileSync(PRODUCTS_PATH, 'utf8'));
	} catch (error) {
		console.error('[fetch-amazon-images] Failed to read products.json:', error.message);
		process.exit(1);
	}
	
	// Extract ASINs
	const asins = Object.values(products)
		.filter(p => p.asin)
		.map(p => p.asin);
	
	if (asins.length === 0) {
		console.log('[fetch-amazon-images] No ASINs found in products.json');
		writeFileSync(OUTPUT_PATH, '{}', 'utf8');
		process.exit(0);
	}
	
	console.log(`[fetch-amazon-images] Fetching images for ${asins.length} ASINs`);
	
	// Fetch from PA-API (batch of 10 max)
	const results = {};
	for (let i = 0; i < asins.length; i += 10) {
		const batch = asins.slice(i, i + 10);
		const data = await fetchProductImages(batch);
		
		if (data && data.ItemsResult && data.ItemsResult.Items) {
			for (const item of data.ItemsResult.Items) {
				if (item.Images && item.Images.Primary && item.Images.Primary.Large) {
					results[item.ASIN] = item.Images.Primary.Large.URL;
					console.log(`[fetch-amazon-images] ✓ ${item.ASIN}: ${item.Images.Primary.Large.URL}`);
				} else {
					console.log(`[fetch-amazon-images] ✗ ${item.ASIN}: No image available`);
				}
			}
		}
		
		// Respect rate limits (1 request/second)
		if (i + 10 < asins.length) {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}
	
	// Write results
	writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), 'utf8');
	console.log(`[fetch-amazon-images] Wrote ${Object.keys(results).length} images to ${OUTPUT_PATH}`);
}

main().catch(error => {
	console.error('[fetch-amazon-images] Fatal error:', error);
	process.exit(1);
});
