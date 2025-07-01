import express from 'express';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/compare', upload.fields([{ name: 'img1' }, { name: 'img2' }]), (req, res) => {
  const img1 = PNG.sync.read(fs.readFileSync(req.files.img1[0].path));
  const img2 = PNG.sync.read(fs.readFileSync(req.files.img2[0].path));

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  fs.writeFileSync('diff.png', PNG.sync.write(diff));

  res.download('diff.png', () => {
    fs.unlinkSync(req.files.img1[0].path);
    fs.unlinkSync(req.files.img2[0].path);
    fs.unlinkSync('diff.png');
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
