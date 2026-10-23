// Compone la conclusión de la Cofradía (sección VI de la portada) en Pinyon Script y guarda el
// contorno de cada letra en src/data/escritura-hoja.json, para que la pluma las trace una a una.
// La fuente no se guarda en el repositorio: se descarga de Google Fonts si falta (licencia OFL;
// lo que se publica es el texto ya compuesto, no la fuente).
//
//   node scripts/escritura-hoja.mjs
//
// El lienzo tiene la proporción del dibujo de Lismann (1903 × 2600), igual que el reverso de la
// hoja, así que el SVG escala sin deformarse a cualquier ancho.
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';

const FUENTE = path.resolve('scripts/fuentes/PinyonScript-Regular.ttf');
const SALIDA = path.resolve('src/data/escritura-hoja.json');
const texto = JSON.parse(fs.readFileSync('src/data/historia-compacta.json', 'utf8')).cofradia.conclusion;

const ANCHO = 520;
const ALTO = Math.round((ANCHO * 2600) / 1903);
const MARGEN = 50;
const CUERPO = 40;
const INTERLINEA = CUERPO * 1.3;

if (!fs.existsSync(FUENTE)) {
  // Con un agente antiguo Google Fonts sirve TrueType, que es lo que lee opentype.js
  const css = await (await fetch('https://fonts.googleapis.com/css2?family=Pinyon+Script', { headers: { 'User-Agent': 'Mozilla/4.0' } })).text();
  const url = css.match(/https:\/\/fonts\.gstatic\.com[^)]+/)[0];
  fs.mkdirSync(path.dirname(FUENTE), { recursive: true });
  fs.writeFileSync(FUENTE, Buffer.from(await (await fetch(url)).arrayBuffer()));
}
const fuente = opentype.loadSync(FUENTE);
const escala = CUERPO / fuente.unitsPerEm;
const avance = (a, b) => (a.advanceWidth + (b ? fuente.getKerningValue(a, b) : 0)) * escala;
const anchoDe = (s) => {
  const g = [...s].map((c) => fuente.charToGlyph(c));
  return g.reduce((t, x, i) => t + avance(x, g[i + 1]), 0);
};

// Partición en líneas por palabras
const lineas = [];
let actual = '';
for (const palabra of texto.split(' ')) {
  const prueba = actual ? `${actual} ${palabra}` : palabra;
  if (actual && anchoDe(prueba) > ANCHO - 2 * MARGEN) { lineas.push(actual); actual = palabra; } else actual = prueba;
}
if (actual) lineas.push(actual);

// Cada forma se guarda una sola vez, en el origen y con coordenadas relativas a una décima;
// cada letra del texto es una posición que la reutiliza (<use>). Así pesa una fracción.
const num = (v) => { const r = Math.round(v * 10) / 10; return (r === 0 ? 0 : r).toString().replace(/^(-?)0\./, '$1.'); };
const unir = (ns) => ns.map(num).join(' ').replace(/ -/g, '-');
function relativo(comandos) {
  let x = 0, y = 0, x0 = 0, y0 = 0;
  const partes = [];
  for (const k of comandos) {
    if (k.type === 'M') { partes.push('m' + unir([k.x - x, k.y - y])); x0 = k.x; y0 = k.y; }
    else if (k.type === 'L') partes.push('l' + unir([k.x - x, k.y - y]));
    else if (k.type === 'Q') partes.push('q' + unir([k.x1 - x, k.y1 - y, k.x - x, k.y - y]));
    else if (k.type === 'C') partes.push('c' + unir([k.x1 - x, k.y1 - y, k.x2 - x, k.y2 - y, k.x - x, k.y - y]));
    else if (k.type === 'Z') { partes.push('z'); x = x0; y = y0; continue; }
    // Se avanza sobre el valor redondeado, para que el error no se acumule a lo largo del contorno
    x += Math.round((k.x - x) * 10) / 10; y += Math.round((k.y - y) * 10) / 10;
  }
  return partes.join('');
}
const formas = {};
for (const c of new Set(texto.replace(/ /g, ''))) formas[c] = relativo(fuente.charToGlyph(c).getPath(0, 0, CUERPO).commands);

// El bloque se centra en vertical por la altura de la x, no por la caja de la fuente
const xAltura = (fuente.tables.os2.sxHeight || fuente.unitsPerEm * 0.3) * escala;
let y = (ALTO - (lineas.length - 1) * INTERLINEA) / 2 + xAltura / 2;
const glifos = [];
for (const linea of lineas) {
  const chars = [...linea];
  const g = chars.map((c) => fuente.charToGlyph(c));
  let x = MARGEN;
  chars.forEach((c, i) => {
    const fin = i === chars.length - 1 || chars[i + 1] === ' ';
    if (c !== ' ' && formas[c]) glifos.push({ c, x: +num(x), y: +num(y), ...(fin ? { fin: true } : {}) });
    x += avance(g[i], g[i + 1]);
  });
  y += INTERLINEA;
}

fs.writeFileSync(SALIDA, JSON.stringify({ ancho: ANCHO, alto: ALTO, formas, glifos }) + '\n');
console.log(`${lineas.length} líneas, ${glifos.length} letras → ${path.relative(process.cwd(), SALIDA)} (${(fs.statSync(SALIDA).size / 1024).toFixed(0)} KB)`);
