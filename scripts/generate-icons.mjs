import { readFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const sizes = [192, 384, 512];
const svgBuffer = readFileSync(join(process.cwd(), 'public', 'icon.svg'));

async function generateIcons() {
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(process.cwd(), 'public', `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }
  
  // Generate apple-touch-icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(process.cwd(), 'public', 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
