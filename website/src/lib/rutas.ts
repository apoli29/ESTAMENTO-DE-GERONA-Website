/* Única fuente de verdad de las rutas del sitio y de su idioma.
   El idioma de cada página lo fija su URL (nunca el navegador). El sitio está en castellano,
   en la raíz; la única excepción son las ediciones en catalán de los textos íntegros. */

export type Lang = 'es' | 'ca';
export type Obra = 'la-corporacion' | 'la-cofradia';
export type Edicion = 'texto-integro' | 'text-integre';

export const RUTAS = {
  inicio: '/',
  actividades: '/actividades/',
  corporacion: '/historia/la-corporacion/',
  cofradia: '/historia/la-cofradia/',
  enlaces: '/enlaces/',
  contacto: '/contacto/',
  avisoLegal: '/aviso-legal/',
  privacidad: '/privacidad/',
} as const;

export const OBRAS: Obra[] = ['la-corporacion', 'la-cofradia'];

/* Ediciones del texto íntegro: el segmento del URL determina el idioma */
export const EDICIONES: Record<Edicion, Lang> = {
  'texto-integro': 'es',
  'text-integre': 'ca',
};

export const rutaObra = (obra: Obra) => `/historia/${obra}/`;
export const rutaEdicion = (obra: Obra, edicion: Edicion) => `/historia/${obra}/${edicion}/`;
export const rutaActividad = (id: string) => `/actividades/${id}/`;
