import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Read the images synchronously
const img1 = PNG.sync.read(fs.readFileSync('transportnsw.png'));
const img2 = PNG.sync.read(fs.readFileSync('transportnsw.png'));

const { width, height } = img1;
const diff = new PNG({ width, height });

// Compare images
const numDiffPixels = pixelmatch(
  img1.data,
  img2.data,
  diff.data,
  width,
  height,
  { threshold: 0.1 }
);

// Save the diff image
fs.writeFileSync('diff.png', PNG.sync.write(diff));
console.log(`✅ Found ${numDiffPixels} pixel differences. Output saved as diff.png`);
