import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertChurchImage() {
  const inputPath = join(__dirname, '..', 'public', 'church-artistic-sketch.jpg');
  const outputPath = join(__dirname, '..', 'public', 'church-artistic-sketch.webp');

  try {
    await sharp(inputPath)
      .resize(1200, null, { // Resize to 1200px width, maintain aspect ratio
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: 85, // High quality for main hero image
        effort: 6    // More compression effort
      })
      .toFile(outputPath);

    console.log('✓ Church artistic sketch converted to WebP successfully!');
    console.log(`  Output: ${outputPath}`);
  } catch (error) {
    console.error('Error converting image:', error);
    process.exit(1);
  }
}

convertChurchImage();
