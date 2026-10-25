/* Títulos y descripciones de todas las páginas, en un único sitio.
   Formato del título: "[Página] - [palabra clave] en [lugar] | [nombre de la Corporación]".
   TODO(revisar): todas las descripciones son texto nuevo, redactado sólo con datos que ya
   figuran en el sitio; están pendientes de aprobación (las catalanas, además, de revisión lingüística). */
import sitio from '../data/sitio.json';
import historia from '../data/historia.json';
import { actividades, type Actividad, type Tipo } from './sitio';
import { RUTAS, OBRAS, EDICIONES, rutaEdicion, rutaActividad, type Obra, type Edicion, type Lang } from './rutas';

export interface Meta { title: string; description: string; lang: Lang }

const NOMBRE = sitio.nombre; // Real Estamento Militar del Principado de Gerona
const NOMBRE_CA = 'Reial Estament Militar del Principat de Girona';
const titulo = (pagina: string, clave?: string, nombre = NOMBRE) => (clave ? `${pagina} - ${clave} | ${nombre}` : `${pagina} | ${nombre}`);

const anios = actividades.map((a) => a.anio);

/* Páginas fijas */
export const META = {
  [RUTAS.inicio]: {
    title: titulo('Cofradía de San Jorge en Gerona desde 1386'),
    description: 'Fundada en 1386 por el Infante Don Juan, Duque de Gerona, como Cofradía de San Jorge. Historia, actividades y consejo de la Corporación en Gerona.',
  },
  [RUTAS.actividades]: {
    title: titulo('Actividades', 'Conciertos, conferencias y publicaciones en Gerona'),
    description: `Anales de ${Math.min(...anios)} a ${Math.max(...anios)}: recitales de piano, conferencias, exposiciones, publicaciones patrocinadas y felicitaciones de Navidad del Real Estamento en Gerona.`,
  },
  [RUTAS.corporacion]: {
    title: titulo('La Corporación', 'Historia, sede y distintivos en Gerona'),
    description: 'Cronología del Real Estamento Militar del Principado de Gerona desde 1386, su sede, lo que hace la Corporación y sus distintivos y uniformidad.',
  },
  [RUTAS.cofradia]: {
    title: titulo('La Cofradía de San Jorge', 'Historia desde 1386 en Gerona'),
    description: 'Libros de actas, torneos, procesión y ordinaciones, el paso del Santo Sepulcro de 1643, los cofrades y los privilegios de generosidad de la Cofradía de San Jorge.',
  },
  [RUTAS.enlaces]: {
    title: titulo('Enlaces', 'Casa Real, corporaciones nobiliarias y archivos'),
    description: 'Enlaces de interés del Real Estamento Militar del Principado de Gerona: Obispado de Gerona, Casa Real, corporaciones nobiliarias españolas y archivos.',
  },
  [RUTAS.contacto]: {
    title: titulo('Contacto', 'Correo electrónico de la Corporación en Gerona'),
    description: 'Póngase en contacto con el Real Estamento Militar del Principado de Gerona, Cofradía de San Jorge, a través de su dirección de correo electrónico.',
  },
  [RUTAS.avisoLegal]: {
    title: titulo('Aviso legal', 'Condiciones generales de uso del sitio web'),
    description: 'Aviso legal y condiciones generales de uso del sitio web del Real Estamento Militar del Principado de Gerona, Cofradía de San Jorge.',
  },
  [RUTAS.privacidad]: {
    title: titulo('Política de privacidad', 'Protección de datos personales'),
    description: 'Política de privacidad y protección de datos personales del sitio web del Real Estamento Militar del Principado de Gerona, Cofradía de San Jorge.',
  },
  '404': {
    title: titulo('Página no encontrada'),
    description: 'La página que busca no existe en el sitio del Real Estamento Militar del Principado de Gerona. Vuelva a la portada o consulte las actividades.',
  },
} satisfies Record<string, Omit<Meta, 'lang'>>;

export const metaPagina = (clave: keyof typeof META): Meta => ({ ...META[clave], lang: 'es' });

/* Texto íntegro de la historia (ES / CA) */
const TEXTO_INTEGRO: Record<Obra, Record<Edicion, Omit<Meta, 'lang'>>> = {
  'la-corporacion': {
    'texto-integro': {
      title: titulo(historia.corporacion.es.title, 'Texto íntegro de su historia en Gerona'),
      description: 'Texto íntegro de la historia del Real Estamento Militar del Principado de Gerona, desde su fundación en 1386, en una sola página de lectura.',
    },
    'text-integre': {
      title: titulo(historia.corporacion.ca.title, 'Text íntegre de la seva història a Girona', NOMBRE_CA),
      description: 'Text íntegre de la història del Reial Estament Militar del Principat de Girona, des de la seva fundació el 1386, en una sola pàgina de lectura.',
    },
  },
  'la-cofradia': {
    'texto-integro': {
      title: titulo('La Cofradía de San Jorge', 'Texto íntegro de su historia en Gerona'),
      description: 'Texto íntegro de la historia de la Cofradía de San Jorge de Gerona, fundada en 1386 por el Infante Don Juan, en una sola página de lectura.',
    },
    'text-integre': {
      title: titulo(historia.cofradia.ca.title, 'Text íntegre de la seva història a Girona', NOMBRE_CA),
      description: "Text íntegre de la història de la Confraria de Sant Jordi de Girona, fundada el 1386 per l'Infant Joan, en una sola pàgina de lectura.",
    },
  },
};

export const metaTextoIntegro = (obra: Obra, edicion: Edicion): Meta => ({ ...TEXTO_INTEGRO[obra][edicion], lang: EDICIONES[edicion] });

/* Actividades: título y descripción a partir de los datos de cada una */
const CLAVE_TIPO: Record<Tipo, string> = {
  musica: 'Concierto',
  conferencia: 'Conferencia',
  exposicion: 'Exposición',
  publicacion: 'Publicación patrocinada',
  navidad: 'Felicitación de Navidad',
};

/* Nombres que se repiten entre actividades: se distinguen por el volumen que ya indica su resumen */
const NOMBRE_ACTIVIDAD: Record<string, string> = {
  '2023-nobleza-volumenes-1-2': 'La nobleza gerundense de privilegio de generosidad, volúmenes 1 y 2',
  '2024-nobleza-volumen-3': 'La nobleza gerundense de privilegio de generosidad, volumen 3',
  '2024-nobleza-volumen-4': 'La nobleza gerundense de privilegio de generosidad, volumen 4',
};

const recortar = (s: string, max = 158) => {
  if (s.length <= max) return s;
  const corte = s.slice(0, max - 1);
  return corte.slice(0, corte.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
};

export function metaActividad(a: Actividad): Meta {
  const limpio = (NOMBRE_ACTIVIDAD[a.id] ?? a.titulo).replace(/^"(.*)"$/, '$1').replace(/\.$/, '');
  const nombre = limpio.includes(String(a.anio)) ? limpio : `${limpio} (${a.anio})`;
  const title = a.tipo === 'navidad' ? titulo(`Felicitación de Navidad ${a.anio}`) : titulo(nombre, CLAVE_TIPO[a.tipo]);

  const texto = [...a.resumen, ...(a.cuerpo ?? [])].join(' ').replace(/\s+/g, ' ').trim();
  // El año abre la descripción: hay actividades de años distintos con el mismo texto.
  const cola = a.tipo === 'navidad'
    ? `${CLAVE_TIPO[a.tipo]} del ${NOMBRE}, Cofradía de San Jorge, en los anales de actividades de la Corporación.`
    : `${CLAVE_TIPO[a.tipo]} del ${NOMBRE}.`;
  const description = recortar(`${a.anio}. ${texto.length >= 110 ? texto : `${texto} ${cola}`.trim()}`);
  return { title, description, lang: 'es' };
}

/* Todas las metas del sitio, por URL; el build falla si algún título o descripción se repite */
export const TODAS: Record<string, Meta> = {
  ...Object.fromEntries(Object.keys(META).map((k) => [k === '404' ? '/404' : k, metaPagina(k as keyof typeof META)])),
  ...Object.fromEntries(OBRAS.flatMap((o) => (Object.keys(EDICIONES) as Edicion[]).map((e) => [rutaEdicion(o, e), metaTextoIntegro(o, e)]))),
  ...Object.fromEntries(actividades.map((a) => [rutaActividad(a.id), metaActividad(a)])),
};

for (const campo of ['title', 'description'] as const) {
  const vistos = new Map<string, string>();
  for (const [url, m] of Object.entries(TODAS)) {
    if (vistos.has(m[campo])) throw new Error(`pageMeta: ${campo} repetido en ${vistos.get(m[campo])} y ${url}: "${m[campo]}"`);
    vistos.set(m[campo], url);
  }
}
