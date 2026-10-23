import actividadesData from '../data/actividades.json';
import transcripciones from '../data/transcripciones.json';
import type { ImageMetadata } from 'astro';

export type Tipo = 'musica' | 'conferencia' | 'exposicion' | 'publicacion' | 'navidad';

export interface Actividad {
  id: string;
  tipo: Tipo;
  anio: number;
  fecha: string | null;
  titulo: string;
  resumen: string[];
  cuerpo: string[] | null;
  panfleto: { archivo: string; origen: string } | null;
  imagen: { archivo: string; origen: string } | null;
  transcripcion: string | null;
  url_antigua: string | null;
}

export const actividades = actividadesData as Actividad[];

/* Rótulos de tipo (texto nuevo — ver REVISAO.md, sección D) */
export const TIPOS: Record<Tipo, { singular: string; filtro: string }> = {
  musica: { singular: 'Música', filtro: 'musica' },
  conferencia: { singular: 'Conferencia', filtro: 'conferencias' },
  exposicion: { singular: 'Exposición', filtro: 'conferencias' },
  publicacion: { singular: 'Publicación', filtro: 'publicaciones' },
  navidad: { singular: 'Navidad', filtro: 'navidad' },
};

export const FILTROS = [
  { id: 'todas', nombre: 'Todas' },
  { id: 'musica', nombre: 'Música' },
  { id: 'conferencias', nombre: 'Conferencias y exposiciones' },
  { id: 'publicaciones', nombre: 'Publicaciones' },
  { id: 'navidad', nombre: 'Navidad' },
];

export function transcripcionDe(a: Actividad) {
  if (!a.transcripcion) return null;
  return (transcripciones as Record<string, any>)[a.transcripcion] ?? null;
}

export const ruta = (a: Actividad) => `/actividades/${a.id}/`;

/* Imágenes (optimizadas por Astro) */
const imgsActividades = import.meta.glob<{ default: ImageMetadata }>('../assets/actividades/*', { eager: true });
const imgsFotos = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*', { eager: true });
export function imagenActividad(archivo: string): ImageMetadata {
  const m = imgsActividades[`../assets/actividades/${archivo}`];
  if (!m) throw new Error(`Falta la imagen de actividad: ${archivo}`);
  return m.default;
}
export function foto(nombre: string): ImageMetadata {
  const m = imgsFotos[`../assets/fotos/${nombre}`];
  if (!m) throw new Error(`Falta la foto: ${nombre}`);
  return m.default;
}

/* Fichero descargable (panfleto) */
export const urlPanfleto = (archivo: string) => `/descargas/panfletos/${archivo}`;
export const formatoPanfleto = (archivo: string) => archivo.split('.').pop()!.toUpperCase();

export function romano(n: number): string {
  const t: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let r = '';
  for (const [v, s] of t) while (n >= v) { r += s; n -= v; }
  return r;
}

/* Agrupa por año, manteniendo el orden del sitio original (más reciente primero) */
export function porAnio(lista: Actividad[]) {
  const mapa = new Map<number, Actividad[]>();
  for (const a of lista) {
    if (!mapa.has(a.anio)) mapa.set(a.anio, []);
    mapa.get(a.anio)!.push(a);
  }
  return [...mapa.entries()];
}
