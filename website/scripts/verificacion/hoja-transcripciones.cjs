// Generates verificacao-transcricoes.html (project root): each flyer next to its literal transcription.
// usage: node hoja-transcripciones.cjs
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../../..');
const t = JSON.parse(fs.readFileSync(path.join(root, 'website/src/data/transcripciones.json'), 'utf8'));
const acts = JSON.parse(fs.readFileSync(path.join(root, 'website/src/data/actividades.json'), 'utf8'));

const IMG = {
  '2026-recital-piano': 'Ficheiros do website/image.png',
  '2026-conferencia-besalu': 'Ficheiros do website/IMG-20260202-WA0010.jpg',
  '2025-recital-piano': 'Ficheiros do website/Captura de pantalla 2025-03-06 a las 10.44.38.png',
  '2024-recital-piano': 'Ficheiros do website/recital.png',
  '2023-recital-piano': 'Ficheiros do website/RECITAL DE PIANO - CAST.jpg',
  '2022-recital-piano': 'Ficheiros do website/0.png',
  '2019-recital-pianista-sorpresa': 'Ficheiros do website/Captura de pantalla 2020-03-10 a las 20.57.48.png',
  '2018-recital-alvaro-mur': 'website/public/descargas/panfletos/2018-recital-alvaro-mur.jpg',
  '2017-viernes-santo-exposicion': 'website/public/descargas/panfletos/2017-viernes-santo-exposicion.pdf',
  '2025-felicitacion-navidad': 'Ficheiros do website/felicitación_2025.jpg',
  '2024-felicitacion-navidad': 'Ficheiros do website/unnamed.jpg',
  '2023-felicitacion-navidad': 'Ficheiros do website/felicitación_2023.png',
};
for (let y = 2016; y <= 2022; y++) IMG[`${y}-felicitacion-navidad`] = `Ficheiros do website/Navidad_${y}.png`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const rows = Object.entries(t).filter(([k]) => !k.startsWith('_')).map(([id, x], i) => {
  const act = acts.find(a => a.id === id);
  const src = IMG[id].startsWith('http') ? IMG[id] : encodeURI(IMG[id]);
  const list = (arr) => arr.map(l => `<li>${esc(l)}</li>`).join('');
  return `<section class="row" id="${id}">
  <div class="img">${src.endsWith('.pdf') ? `<iframe src="${src}" style="width:100%;height:520px;border:1px solid rgba(26,23,20,.16)"></iframe>` : `<a href="${src}" target="_blank"><img src="${src}" alt=""></a>`}<p class="src">${esc(x.fuente)}</p></div>
  <div class="txt">
    <p class="n">${String(i + 1).padStart(2, '0')} · ${esc(act ? act.titulo : id)} · <span>${esc(act && act.fecha || '')}</span></p>
    <ol>${list(x.lineas)}</ol>
    ${x.datos ? `<dl>${x.datos.map(d => `<dt>${esc(d.etiqueta)}</dt><dd>${esc(d.valor)}</dd>`).join('')}</dl>` : ''}
    ${x.pie ? `<h4>Pie de la imagen</h4><ol>${list(x.pie)}</ol>` : ''}
    ${x.entidades ? `<h4>Entidades / logotipos</h4><ul>${x.entidades.map(e => `<li>${e.rol ? `<b>${esc(e.rol)}</b> ` : ''}${esc(e.nombre)}${e.logotipo ? ' <i>(logotipo)</i>' : ''}</li>`).join('')}</ul>` : ''}
    <label class="ok"><input type="checkbox"> Verificado</label>
  </div>
</section>`;
}).join('\n');

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Verificação das transcrições</title>
<style>
body{margin:0;background:#F3EDE2;color:#1A1714;font:16px/1.55 system-ui,sans-serif}
header{background:#1A1714;color:#F3EDE2;padding:32px 24px}header h1{margin:0 0 8px;font-weight:500}header p{margin:0;color:#C9C3B8;max-width:70ch}
.row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:32px;padding:32px 24px;border-bottom:1px solid rgba(26,23,20,.16);max-width:1400px;margin:0 auto}
.img img{width:100%;border:1px solid rgba(26,23,20,.16);background:#fff}.src{font:12px ui-monospace,monospace;color:#5C534A}
.n{font:13px ui-monospace,monospace;color:#A3201F;margin:0 0 12px}.n span{color:#5C534A}
ol,ul{padding-left:22px;margin:0 0 16px}li{margin-bottom:6px}h4{margin:16px 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5C534A}
dl{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;margin:0 0 16px}dt{color:#5C534A}dd{margin:0}
.ok{display:inline-flex;gap:8px;align-items:center;margin-top:8px;font-weight:500}
@media(max-width:800px){.row{grid-template-columns:1fr}}
</style></head><body>
<header><h1>Verificação das transcrições</h1><p>Cada panfleto/felicitação ao lado da transcrição literal (maiúsculas, pontuação e gralhas tal como impressas; quebras de linha da paginação unidas). Clica na imagem para a abrir em tamanho real. Marca "Verificado" à medida que confirmas (a marcação não fica guardada).</p></header>
${rows}
</body></html>`;
fs.writeFileSync(path.join(root, 'verificacao-transcricoes.html'), html, 'utf8');
console.log('ok', Object.keys(t).length - 1, 'transcripciones');
