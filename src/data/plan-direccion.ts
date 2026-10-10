import type { DominioId } from './procesos';

export interface PlanDireccion {
  id: string;
  nombre: string;
  dominio: DominioId;
}

export const PLANES_DIRECCION: PlanDireccion[] = [
  { id: 'involucramiento-interesados', nombre: 'Plan de involucramiento de los interesados', dominio: 'int' },
  { id: 'gestion-comunicaciones', nombre: 'Plan de gestión de las comunicaciones', dominio: 'int' },
];

export const planDireccionPorId = (id: string) => PLANES_DIRECCION.find((p) => p.id === id);
