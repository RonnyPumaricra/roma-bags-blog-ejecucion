import type { DominioId } from './procesos';

export type LineaBaseId = 'alcance' | 'cronograma' | 'costos';

export interface LineaBase {
  id: LineaBaseId;
  nombre: string;
  dominio: DominioId;
  /** Proceso que la controla */
  control: string;
}

export const VERSION_LINEAS_BASE = 'v1.0';

export const LINEAS_BASE: LineaBase[] = [
  { id: 'alcance', nombre: 'Alcance', dominio: 'alc', control: '2.5' },
  { id: 'cronograma', nombre: 'Cronograma', dominio: 'cro', control: '3.3' },
  { id: 'costos', nombre: 'Costos', dominio: 'fin', control: '4.4' },
];

export const lineaBasePorId = (id: string) => LINEAS_BASE.find((l) => l.id === id);
