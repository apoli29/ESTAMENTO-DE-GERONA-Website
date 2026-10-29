// Resizes source photos (fotos-descarregadas/) into src/assets/fotos/ (long edge <= max, JPEG q86).
import sharp from 'sharp';
import path from 'node:path';
const src = path.resolve('../fotos-descarregadas');
const dst = path.resolve('src/assets/fotos');
const jobs = [
  ['unsplash-catedral-desde-muralla.jpg', 'hero.jpg', 3200],
  ['unsplash-iglesia-interior-girona.jpg', 'catedral-interior.jpg', 2800],
  ['unsplash-catedral-jardin-angel-pi.jpg', 'catedral-jardin.jpg', 3200],
  ['commons-capilla-sant-jordi-catedral.jpg', 'capilla-san-jorge.jpg', 2048],
  ['commons-catedral-claustre-pou-1890-1910.jpg', 'claustro-catedral-1900.jpg', 1024],
  ['commons-sant-domenec-claustre-1922.jpg', 'claustro-sant-domenec-1922.jpg', 1556],
  ['lismann-girona-onyar-1928.jpg', 'lismann-girona-1928.jpg', 2600],
  ['commons-leopold-ernst-baptisterio-1838.jpg', 'baptisterio-ernst-1838.jpg', 2600],
  ['rawpixel-malbork-sala-generica.png', 'sala-gotica-malbork.jpg', 2800],
  ['unsplash-velas-generica-1.jpg', 'velas-1.jpg', 2400],
  ['unsplash-velas-generica-2.jpg', 'velas-2.jpg', 2400],
  ['commons-sant-narcis-mosques.jpg', 'sant-narcis.jpg', 2400],
];
for (const [i, o, max] of jobs) {
  const info = await sharp(path.join(src, i)).rotate().resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(dst, o));
  console.log(o, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}

