import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertImages() {
  const publicDir = join(__dirname, '..', 'public');

  // Convert CFB Church Image.png to WebP
  const largeImage = join(publicDir, 'CFB Church Image.png');
  const largeImageOutput = join(publicDir, 'cfb-church-image.webp');

  try {
    await sharp(largeImage)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(largeImageOutput);

    console.log('✓ CFB Church Image converted to WebP successfully!');
    console.log(`  Saved: ${largeImageOutput}`);
  } catch (error) {
    console.error('Error converting CFB Church Image:', error);
  }
}

convertImages();
