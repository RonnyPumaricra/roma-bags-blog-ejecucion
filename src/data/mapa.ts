import { procesoPorId, type AreaId, type DominioId } from './procesos';

export const NODO = { w: 200, h: 60 };
export const MAPA = { w: 1110, h: 722 };

export const PANELES: { area: AreaId; x: number; y: number; w: number; h: number }[] = [
  { area: 'eje', x: 20, y: 20, w: 520, h: 536 },
  { area: 'cie', x: 20, y: 586, w: 520, h: 116 },
  { area: 'mon', x: 570, y: 20, w: 520, h: 682 },
];

// Recuadros punteados que agrupan procesos de un mismo dominio: [dominio, x, y, w, h]
export const CLUSTERS: [DominioId, number, number, number, number][] = [
  ['int', 38, 372, 224, 164],
  ['rec', 278, 372, 224, 164],
  ['alc', 588, 58, 224, 164],
  ['int', 588, 482, 224, 164],
];

// Recuadros punteados de los grupos de gobernanza: [x, y, w, h]
export const GRUPOS: [number, number, number, number][] = [
  [38, 58, 464, 186],
  [718, 270, 224, 164],
];

type Punto = [number, number];

const p = (id: string) => {
  const proceso = procesoPorId(id);
  if (!proceso) throw new Error(`Proceso desconocido: ${id}`);
  return proceso;
};
const abajo = (id: string): Punto => [p(id).x + NODO.w / 2, p(id).y + NODO.h];
const arriba = (id: string): Punto => [p(id).x + NODO.w / 2, p(id).y];
const derecha = (id: string): Punto => [p(id).x + NODO.w, p(id).y + NODO.h / 2];
const izquierda = (id: string): Punto => [p(id).x, p(id).y + NODO.h / 2];

const G1 = ['1.4', '1.5', '1.6'];
const G2 = ['1.7', '1.8'];

export interface Trazo {
  puntos: Punto[];
  /** Procesos conectados por el trazo */
  procesos: string[];
  dominio: DominioId;
}

// Trazos según el flujo de procesos de la Guía
export const TRAZOS: Trazo[] = [
  { puntos: [[205, 130], [175, 170]], procesos: ['1.4', '1.5'], dominio: 'gob' },
  { puntos: [[335, 130], [365, 170]], procesos: ['1.4', '1.6'], dominio: 'gob' },
  { puntos: [derecha('1.5'), izquierda('1.6')], procesos: ['1.5', '1.6'], dominio: 'gob' },
  { puntos: [[270, 244], arriba('7.5')], procesos: [...G1, '7.5'], dominio: 'rie' },
  { puntos: [[120, 244], [120, 372]], procesos: [...G1, '5.4', '5.5'], dominio: 'int' },
  { puntos: [[420, 244], [420, 372]], procesos: [...G1, '6.3', '6.4'], dominio: 'rec' },
  { puntos: [abajo('5.4'), arriba('5.5')], procesos: ['5.4', '5.5'], dominio: 'int' },
  { puntos: [abajo('6.3'), arriba('6.4')], procesos: ['6.3', '6.4'], dominio: 'rec' },
  { puntos: [abajo('2.5'), arriba('2.6')], procesos: ['2.5', '2.6'], dominio: 'alc' },
  { puntos: [[700, 222], [700, 322], [718, 322]], procesos: ['2.5', '2.6', ...G2], dominio: 'alc' },
  { puntos: [[836, 270], [836, 100], izquierda('3.3')], procesos: ['3.3', ...G2], dominio: 'cro' },
  { puntos: [[942, 300], [960, 300], abajo('4.4')], procesos: ['4.4', ...G2], dominio: 'fin' },
  { puntos: [[718, 400], [700, 400], [700, 482]], procesos: ['5.6', '5.7', ...G2], dominio: 'int' },
  { puntos: [[942, 400], [960, 400], arriba('6.5')], procesos: ['6.5', ...G2], dominio: 'rec' },
  { puntos: [[836, 434], [836, 620], izquierda('7.6')], procesos: ['7.6', ...G2], dominio: 'rie' },
  { puntos: [abajo('1.7'), arriba('1.8')], procesos: G2, dominio: 'gob' },
  { puntos: [abajo('5.6'), arriba('5.7')], procesos: ['5.6', '5.7'], dominio: 'int' },
];

/** Procesos conectados por algún trazo con `id` */
export function vecinos(id: string) {
  const s = new Set<string>();
  for (const t of TRAZOS) if (t.procesos.includes(id)) t.procesos.forEach((n) => s.add(n));
  s.delete(id);
  return s;
}

/** Divide `texto` en líneas de hasta `max` caracteres */
export function partir(texto: string, max: number) {
  const lineas: string[] = [];
  let actual = '';
  for (const palabra of texto.split(' ')) {
    if (actual && (actual + ' ' + palabra).length > max) {
      lineas.push(actual);
      actual = palabra;
    } else actual = actual ? actual + ' ' + palabra : palabra;
  }
  lineas.push(actual);
  return lineas;
}
