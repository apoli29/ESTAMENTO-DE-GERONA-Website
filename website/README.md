# Real Estamento Militar del Principado de Gerona — sitio web

Sitio estático (Astro). Contenido en `src/data/*.json`, copiado literalmente del sitio anterior.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

**Vercel:** importar el repositorio con *Root Directory* = `website` (Astro se detecta solo; salida `dist/`).

**Añadir una actividad:** nueva entrada al principio de `src/data/actividades.json`; panfleto en `public/descargas/panfletos/`, imagen mostrada en `src/assets/actividades/`; transcripción opcional en `src/data/transcripciones.json`.

**Verificación de textos:** `node scripts/verificacion/check-verbatim.cjs scripts/verificacion/corpus.txt src/data` comprueba que todo texto de contenido existe tal cual en el sitio original.
