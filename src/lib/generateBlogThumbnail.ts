/**
 * Génère une vignette 1200×630 unique par article
 * Utilisée pour les cartes blog et comme og:image
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ThumbnailOptions {
	title: string;
	category?: string;
	productId?: string;
}

const IDENTITY_COLORS = {
	darkBg: '#0B1F2A',
	tealPrimary: '#0F766E',
	orangeAccent: '#F97316',
	white: '#FFFFFF'
};

export async function generateBlogThumbnail(
	slug: string,
	options: ThumbnailOptions
): Promise<Buffer> {
	const { title, category, productId } = options;
	
	// Load fonts
	const fontPath = path.join(__dirname, '../../public/fonts/nunito-800-0.woff2');
	const fontBuffer = await fs.readFile(fontPath);
	
	// Truncate title if too long
	const displayTitle = title.length > 80 ? title.substring(0, 77) + '...' : title;
	
	// Generate SVG with Satori
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: IDENTITY_COLORS.darkBg,
					padding: '60px',
					justifyContent: 'space-between'
				},
				children: [
					// Category badge
					category && {
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								marginBottom: '20px'
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											backgroundColor: IDENTITY_COLORS.orangeAccent,
											color: IDENTITY_COLORS.white,
											padding: '12px 24px',
											borderRadius: '8px',
											fontSize: '28px',
											fontWeight: 700
										},
										children: category
									}
								}
							]
						}
					},
					// Title
					{
						type: 'div',
						props: {
							style: {
								fontSize: '56px',
								fontWeight: 800,
								color: IDENTITY_COLORS.white,
								lineHeight: 1.2,
								marginBottom: '30px'
							},
							children: displayTitle
						}
					},
					// Footer
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginTop: 'auto'
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '32px',
											fontWeight: 700,
											color: IDENTITY_COLORS.tealPrimary
										},
										children: 'robot-educatif'
									}
								},
								{
									type: 'div',
									props: {
										style: {
											width: '60px',
											height: '60px',
											borderRadius: '50%',
											backgroundColor: IDENTITY_COLORS.tealPrimary
										}
									}
								}
							]
						}
					}
				].filter(Boolean)
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Nunito',
					data: fontBuffer,
					weight: 800,
					style: 'normal'
				}
			]
		}
	);
	
	// Convert SVG to PNG
	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 1200
		}
	});
	
	const pngData = resvg.render();
	return pngData.asPng();
}

export async function saveBlogThumbnail(
	slug: string,
	options: ThumbnailOptions,
	outputDir: string
): Promise<string> {
	const pngBuffer = await generateBlogThumbnail(slug, options);
	const outputPath = path.join(outputDir, `${slug}.png`);
	
	await fs.mkdir(outputDir, { recursive: true });
	await fs.writeFile(outputPath, pngBuffer);
	
	return outputPath;
}
