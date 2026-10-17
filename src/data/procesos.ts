export type AreaId = 'eje' | 'mon' | 'cie';
export type DominioId = 'gob' | 'alc' | 'cro' | 'fin' | 'int' | 'rec' | 'rie';
export type Estado = 'ok' | 'cur' | 'pen';

export interface Proceso {
  id: string;
  nombre: string;
  area: AreaId;
  dominio: DominioId;
  estado: Estado;
  /** Posición en el mapa de procesos */
  x: number;
  y: number;
}

export const AREAS: { id: AreaId; nombre: string }[] = [
  { id: 'eje', nombre: 'Ejecución' },
  { id: 'mon', nombre: 'Monitoreo y Control' },
  { id: 'cie', nombre: 'Cierre' },
];

export const DOMINIOS: { id: DominioId; nombre: string }[] = [
  { id: 'gob', nombre: 'Gobernanza' },
  { id: 'alc', nombre: 'Alcance' },
  { id: 'cro', nombre: 'Cronograma' },
  { id: 'fin', nombre: 'Finanzas' },
  { id: 'int', nombre: 'Interesados/as' },
  { id: 'rec', nombre: 'Recursos' },
  { id: 'rie', nombre: 'Riesgo' },
];

export const ESTADOS: Record<Estado, string> = {
  ok: 'Completado',
  cur: 'En curso',
  pen: 'Pendiente',
};

export const NOMBRE_AREA = Object.fromEntries(AREAS.map((a) => [a.id, a.nombre])) as Record<AreaId, string>;
export const NOMBRE_DOMINIO = Object.fromEntries(DOMINIOS.map((d) => [d.id, d.nombre])) as Record<DominioId, string>;

// [número, nombre, área de foco, dominio, estado, x, y]
type Fila = [string, string, AreaId, DominioId, Estado, number, number];

const FILAS: Fila[] = [
  ['1.4', 'Gestionar la Ejecución del Proyecto', 'eje', 'gob', 'ok', 170, 70],
  ['1.5', 'Gestionar el Aseguramiento de la Calidad', 'eje', 'gob', 'pen', 50, 170],
  ['1.6', 'Gestionar el Conocimiento del Proyecto', 'eje', 'gob', 'pen', 290, 170],
  ['7.5', 'Implementar la Respuesta a los Riesgos', 'eje', 'rie', 'pen', 170, 280],
  ['5.4', 'Gestionar el Involucramiento de los/las Interesados/as', 'eje', 'int', 'pen', 50, 384],
  ['5.5', 'Gestionar las Comunicaciones', 'eje', 'int', 'pen', 50, 464],
  ['6.3', 'Adquirir Recursos', 'eje', 'rec', 'pen', 290, 384],
  ['6.4', 'Liderar al Equipo', 'eje', 'rec', 'pen', 290, 464],

  ['1.7', 'Monitorear y Controlar el Desempeño del Proyecto', 'mon', 'gob', 'pen', 730, 282],
  ['1.8', 'Evaluar e Implementar Cambios', 'mon', 'gob', 'pen', 730, 362],
  ['2.5', 'Monitorear y Controlar el Alcance', 'mon', 'alc', 'pen', 600, 70],
  ['2.6', 'Validar el Alcance', 'mon', 'alc', 'pen', 600, 150],
  ['3.3', 'Monitorear y Controlar el Cronograma', 'mon', 'cro', 'pen', 860, 70],
  ['4.4', 'Monitorear y Controlar las Finanzas', 'mon', 'fin', 'pen', 860, 166],
  ['5.6', 'Monitorear el Involucramiento de los/las Interesados/as', 'mon', 'int', 'cur', 600, 494],
  ['5.7', 'Monitorear las Comunicaciones', 'mon', 'int', 'cur', 600, 574],
  ['6.5', 'Monitorear y Controlar los Recursos', 'mon', 'rec', 'pen', 860, 494],
  ['7.6', 'Monitorear los Riesgos', 'mon', 'rie', 'pen', 860, 590],

  ['1.9', 'Cerrar el Proyecto o Fase', 'cie', 'gob', 'pen', 170, 626],
];

export const PROCESOS: Proceso[] = FILAS.map(([id, nombre, area, dominio, estado, x, y]) => ({
  id, nombre, area, dominio, estado, x, y,
}));

export const procesoPorId = (id: string) => PROCESOS.find((p) => p.id === id);
