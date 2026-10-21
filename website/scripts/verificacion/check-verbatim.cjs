// Verifies that every content string in the website data files exists verbatim
// (whitespace-normalised) in the text extracted from the old website.
// usage: node check-verbatim.cjs <corpus.txt> <dataDir>
const fs = require('fs');
const path = require('path');
const [corpusFile, dataDir] = process.argv.slice(2);
const norm = s => s.replace(/\s+/g, ' ').trim();
const corpus = norm(fs.readFileSync(corpusFile, 'utf8'));
const META = new Set(['id', 'tipo', 'anio', 'archivo', 'origen', 'url_antigua', 'transcripcion', 'type', 'tag']);

let checked = 0;
const missing = [];
function walk(v, where) {
  if (typeof v === 'string') {
    checked++;
    if (!corpus.includes(norm(v))) missing.push(`${where}: ${v.slice(0, 120)}`);
  } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!META.has(k) && !k.startsWith('_')) walk(x, `${where}.${k}`);
}
for (const f of fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'transcripciones.json')) {
  walk(JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8')), f);
}
console.log(`checked ${checked} strings, ${missing.length} not found verbatim`);
missing.forEach(m => console.log('  ✗ ' + m));
process.exit(missing.length ? 1 : 0);
