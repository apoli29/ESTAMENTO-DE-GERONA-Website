// Gradación de color para integrar fotos en la paleta del sitio (pergamino / castaño / rojo):
// menos saturación, viraje cálido tipo sepia suave y negros elevados hacia el castaño #2B1F18.
import sharp from 'sharp';
import path from 'node:path';
const dir = path.resolve('src/assets/fotos');
const jobs = [
  ['catedral-interior.jpg', 'catedral-interior-tono.jpg'],
  ['capilla-san-jorge.jpg', 'capilla-san-jorge-tono.jpg'],
];
const S = [[.393, .769, .189], [.349, .686, .168], [.272, .534, .131]];
const k = 0.32; // intensidad del viraje
const M = S.map((fila, i) => fila.map((v, j) => (1 - k) * (i === j ? 1 : 0) + k * v));
for (const [i, o] of jobs) {
  const info = await sharp(path.join(dir, i))
    .modulate({ saturation: 0.68 })
    .recomb(M)
    .linear([0.93, 0.93, 0.93], [16, 11, 8])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(dir, o));
  console.log(o, info.width + 'x' + info.height);
}
