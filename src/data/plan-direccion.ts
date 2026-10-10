import type { DominioId } from './procesos';

export interface PlanDireccion {
  id: string;
  nombre: string;
  dominio: DominioId;
}

export const PLANES_DIRECCION: PlanDireccion[] = [
  { id: 'involucramiento-interesados', nombre: 'Plan de involucramiento de los interesados', dominio: 'int' },
];
