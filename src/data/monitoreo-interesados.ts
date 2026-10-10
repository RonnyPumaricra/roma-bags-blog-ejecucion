// Estado inicial del dashboard de monitoreo del involucramiento (proceso 5.6).
// No hay backend: el dashboard trabaja sobre una copia en memoria y los cambios se pierden al recargar.
// Datos de ejemplo coherentes con el Plan de involucramiento de los interesados.

/** Fecha contra la que se calculan vencimientos y antigüedad de las evaluaciones */
export const FECHA_CORTE = '2026-10-10';

export const NIVELES = ['Desconocedor', 'Reacio', 'Neutral', 'Partidario', 'Líder'] as const;
export type Nivel = (typeof NIVELES)[number];

export type Prioridad = 1 | 2 | 3;

export const PRIORIDADES: Record<Prioridad, string> = {
  1: 'Gestionar de cerca',
  2: 'Mantener informado',
  3: 'Monitorear',
};

export interface Interesado {
  /** SH-01…SH-06; el Taller Alterno no tiene código SH en la documentación */
  id: string;
  nombre: string;
  detalle: string;
  prioridad: Prioridad;
  estrategia: string;
  nivelActual: Nivel;
  /** Nivel de la evaluación previa, para mostrar la tendencia */
  nivelAnterior: Nivel;
  nivelDeseado: Nivel;
  ultimaEvaluacion: string;
}

export type Frecuencia =
  | { tipo: 'periodica'; texto: string; dias: number }
  | { tipo: 'evento'; texto: string; disparador: string };

export interface AccionPlan {
  interesado: string;
  accion: string;
  canal: string;
  /** null: no definida en la documentación actual */
  frecuencia: Frecuencia | null;
  responsable: string | null;
  evidencia: string;
}

export const TIPOS_ACCION = ['Reunión', 'Demostración', 'Validación', 'Taller', 'Comunicado'] as const;
export type TipoAccion = (typeof TIPOS_ACCION)[number];

export const CANALES = ['WhatsApp', 'Google Meet', 'Presencial', 'Demostración móvil', 'Atención comercial'] as const;

export interface RegistroAccion {
  id: string;
  fecha: string;
  interesado: string;
  tipo: TipoAccion;
  canal: string;
  asistio: boolean;
  /** Nivel observado tras la acción; null si no se evaluó */
  nivelObservado: Nivel | null;
  acuerdos: string;
}

export interface Objecion {
  id: string;
  fecha: string;
  demostracion: string;
  descripcion: string;
  respuesta: string;
  resuelta: boolean;
}

export const ESTADOS_VALIDACION = ['pendiente', 'aprobada', 'observada'] as const;
export type EstadoValidacion = (typeof ESTADOS_VALIDACION)[number];

export interface Gate {
  id: string;
  fecha: string;
  fase: string;
  criterio: string;
  validaciones: { interesado: string; estado: EstadoValidacion }[];
}

export type EstadoRiesgo = 'activo' | 'vigilancia' | 'controlado';

export interface Riesgo {
  id: string;
  nombre: string;
  estado: EstadoRiesgo;
  ultimoEvento: string;
  respuesta: string;
}

export interface Supuesto {
  texto: string;
  cumple: boolean;
}

export interface Disparador {
  texto: string;
  activo: boolean;
}

export interface IndicadorOperativo {
  nombre: string;
  unidad: string;
  lineaBase: number;
  /** Valores por mes; el último puede ser parcial */
  valores: { mes: string; valor: number; parcial?: boolean }[];
}

export interface Adopcion {
  /** Agregado del equipo de Ventas, nunca por persona (R-03) */
  ventasMovil: { registrados: number; total: number };
  empaqueInduccion: { asistentes: number; total: number; programada: string | null };
  ultimoRespaldo: string;
  conciliacionExcel: { conciliados: number; total: number };
}

export interface EstadoMonitoreo {
  interesados: Interesado[];
  plan: AccionPlan[];
  historial: RegistroAccion[];
  objeciones: Objecion[];
  gates: Gate[];
  riesgos: Riesgo[];
  supuestos: Supuesto[];
  disparadores: Disparador[];
  resultados: IndicadorOperativo[];
  adopcion: Adopcion;
}

export const ESTADO_INICIAL: EstadoMonitoreo = {
  interesados: [
    {
      id: 'SH-01', nombre: 'Gerencia General', detalle: 'Natalie · patrocinadora', prioridad: 1,
      estrategia: 'Gestionar de cerca', nivelActual: 'Partidario', nivelAnterior: 'Partidario', nivelDeseado: 'Líder',
      ultimaEvaluacion: '2026-10-06',
    },
    {
      id: 'SH-02', nombre: 'Socio de Producción', detalle: 'Jefe de Producción', prioridad: 1,
      estrategia: 'Gestionar de cerca', nivelActual: 'Reacio', nivelAnterior: 'Reacio', nivelDeseado: 'Partidario',
      ultimaEvaluacion: '2026-09-25',
    },
    {
      id: 'SH-03', nombre: 'Personal de Ventas', detalle: 'Promotor digital', prioridad: 2,
      estrategia: 'Mantener y consolidar', nivelActual: 'Partidario', nivelAnterior: 'Partidario', nivelDeseado: 'Partidario',
      ultimaEvaluacion: '2026-09-30',
    },
    {
      id: 'SH-04', nombre: 'Personal de Empaque', detalle: 'Empaque / Habilitado', prioridad: 2,
      estrategia: 'Mantener informado', nivelActual: 'Desconocedor', nivelAnterior: 'Desconocedor', nivelDeseado: 'Partidario',
      ultimaEvaluacion: '2026-05-04',
    },
    {
      id: 'SH-05', nombre: 'Clientes Mayoristas', detalle: 'Externo', prioridad: 2,
      estrategia: 'Mantener informados', nivelActual: 'Neutral', nivelAnterior: 'Neutral', nivelDeseado: 'Partidario',
      ultimaEvaluacion: '2026-09-30',
    },
    {
      id: 'SH-06', nombre: 'Logística / Motorizado', detalle: 'Externo', prioridad: 3,
      estrategia: 'Monitorear', nivelActual: 'Neutral', nivelAnterior: 'Neutral', nivelDeseado: 'Partidario',
      ultimaEvaluacion: '2026-09-30',
    },
    {
      id: 'TA', nombre: 'Taller Alterno / Proveedores', detalle: 'Actor complementario', prioridad: 3,
      estrategia: 'Monitorear', nivelActual: 'Neutral', nivelAnterior: 'Neutral', nivelDeseado: 'Neutral',
      ultimaEvaluacion: '2026-09-15',
    },
  ],

  plan: [
    {
      interesado: 'SH-01', accion: 'Reunión de avance: ahorro de tiempo, respaldos y decisiones',
      canal: 'WhatsApp y reunión presencial o virtual', frecuencia: { tipo: 'periodica', texto: 'Semanal', dias: 7 },
      responsable: 'Equipo del proyecto', evidencia: 'Asistencia ≥ 80 % y validaciones de integridad',
    },
    {
      interesado: 'SH-02', accion: 'Conversación breve y prueba operativa con versión estable',
      canal: 'Presencial en el taller', frecuencia: { tipo: 'periodica', texto: 'Quincenal o por hito', dias: 14 },
      responsable: 'Líder del proyecto', evidencia: 'Reducción de objeciones y pruebas aprobadas',
    },
    {
      interesado: 'SH-03', accion: 'Demostración móvil de stock y metas',
      canal: 'Celular y demostración en sitio', frecuencia: { tipo: 'evento', texto: 'Por iteración', disparador: 'Demo de la iteración 2' },
      responsable: 'Equipo funcional', evidencia: 'Uso del sistema en celular desde el piloto',
    },
    {
      interesado: 'SH-04', accion: 'Inducción en lectura de órdenes',
      canal: 'Taller corto presencial', frecuencia: { tipo: 'evento', texto: 'Por necesidad', disparador: 'Antes de ampliar el piloto' },
      responsable: 'Equipo del proyecto', evidencia: 'Participación en la inducción',
    },
    {
      interesado: 'SH-05', accion: 'Comunicar mejoras y verificar pedidos completos',
      canal: 'Atención comercial habitual', frecuencia: { tipo: 'evento', texto: 'Según avance', disparador: 'Primer mes completo de piloto' },
      responsable: 'Gerencia', evidencia: 'Pedidos incompletos bajo la línea base de 9/mes',
    },
    {
      interesado: 'SH-06', accion: 'Revisar consistencia de pedidos y dobles viajes',
      canal: 'Comunicación operativa habitual', frecuencia: { tipo: 'evento', texto: 'Según operación', disparador: 'Cierre de mes' },
      responsable: 'Gerencia', evidencia: 'Menos viajes adicionales y sobrecostos',
    },
    {
      interesado: 'TA', accion: 'Incluir sus registros en la consolidación',
      canal: 'Canal habitual de coordinación', frecuencia: null,
      responsable: null, evidencia: 'Registros del taller alterno integrados',
    },
  ],

  historial: [
    { id: 'H-01', fecha: '2026-09-22', interesado: 'SH-01', tipo: 'Reunión', canal: 'Google Meet', asistio: true, nivelObservado: 'Partidario', acuerdos: 'Inicio del proyecto; se priorizó la consulta desde el celular.' },
    { id: 'H-02', fecha: '2026-09-22', interesado: 'SH-02', tipo: 'Reunión', canal: 'Presencial', asistio: true, nivelObservado: 'Reacio', acuerdos: 'Se presentó el piloto limitado; expresó tres objeciones.' },
    { id: 'H-03', fecha: '2026-09-25', interesado: 'SH-02', tipo: 'Demostración', canal: 'Presencial', asistio: true, nivelObservado: 'Reacio', acuerdos: 'Prueba del registro de producción al cierre del turno.' },
    { id: 'H-04', fecha: '2026-09-29', interesado: 'SH-01', tipo: 'Reunión', canal: 'WhatsApp', asistio: true, nivelObservado: null, acuerdos: 'Se aprobó el catálogo de productos para el piloto.' },
    { id: 'H-05', fecha: '2026-09-30', interesado: 'SH-03', tipo: 'Demostración', canal: 'Demostración móvil', asistio: true, nivelObservado: 'Partidario', acuerdos: 'Consulta de stock en celular; pidieron ver metas por equipo.' },
    { id: 'H-06', fecha: '2026-10-06', interesado: 'SH-01', tipo: 'Validación', canal: 'Presencial', asistio: true, nivelObservado: 'Partidario', acuerdos: 'Verificó el respaldo diario y la coexistencia con Excel.' },
    { id: 'H-07', fecha: '2026-10-07', interesado: 'SH-02', tipo: 'Demostración', canal: 'Presencial', asistio: false, nivelObservado: null, acuerdos: 'No asistió a la demo del piloto por carga de temporada alta.' },
  ],

  objeciones: [
    { id: 'O-01', fecha: '2026-09-22', demostracion: 'Conversación inicial', descripcion: 'Registrar en el celular retrasará la producción.', respuesta: 'El registro se hace solo al cierre del turno.', resuelta: true },
    { id: 'O-02', fecha: '2026-09-22', demostracion: 'Conversación inicial', descripcion: 'El sistema puede perder datos como en 2024.', respuesta: 'Respaldo diario visible y coexistencia con Excel.', resuelta: false },
    { id: 'O-03', fecha: '2026-09-22', demostracion: 'Conversación inicial', descripcion: 'El Wi-Fi del taller no alcanza todas las zonas.', respuesta: 'Registro sin conexión con sincronización posterior.', resuelta: true },
    { id: 'O-04', fecha: '2026-09-25', demostracion: 'Prueba de registro de producción', descripcion: 'Demasiados campos por orden.', respuesta: 'Se redujeron los campos obligatorios a cuatro.', resuelta: true },
    { id: 'O-05', fecha: '2026-09-25', demostracion: 'Prueba de registro de producción', descripcion: 'No queda claro quién corrige un error de registro.', respuesta: '', resuelta: false },
  ],

  gates: [
    {
      id: 'Gate 1', fecha: '2026-11-17', fase: 'Cimentar', criterio: 'Piloto estable en celular y respaldos verificados',
      validaciones: [
        { interesado: 'SH-01', estado: 'pendiente' },
        { interesado: 'SH-02', estado: 'pendiente' },
        { interesado: 'SH-03', estado: 'pendiente' },
      ],
    },
    {
      id: 'Gate 2', fecha: '2027-03-08', fase: 'Integrar', criterio: 'Odoo con datos del taller principal y alterno',
      validaciones: [
        { interesado: 'SH-01', estado: 'pendiente' },
        { interesado: 'SH-02', estado: 'pendiente' },
      ],
    },
    {
      id: 'Gate 3', fecha: '2027-04-21', fase: 'Conformidad', criterio: 'Conformidad final y capacitación completada',
      validaciones: [{ interesado: 'SH-01', estado: 'pendiente' }],
    },
  ],

  riesgos: [
    { id: 'R-01', nombre: 'Resistencia del Socio de Producción', estado: 'activo', ultimoEvento: '07/10: no asistió a la demo del piloto.', respuesta: 'Reprogramar la prueba en el taller con versión estable.' },
    { id: 'R-02', nombre: 'Pérdida de confianza de la Gerencia', estado: 'vigilancia', ultimoEvento: '06/10: verificó el respaldo diario.', respuesta: 'Mantener respaldos visibles y coexistencia con Excel.' },
    { id: 'R-03', nombre: 'Percepción de vigilancia', estado: 'controlado', ultimoEvento: 'Sin señales; las metas se muestran por equipo.', respuesta: 'Comunicar las metas como apoyo al trabajo colectivo.' },
  ],

  supuestos: [
    { texto: 'La Gerencia mantiene disponibilidad semanal para validaciones.', cumple: true },
    { texto: 'El Socio no veta la solución si las pruebas demuestran estabilidad.', cumple: true },
    { texto: 'Ventas conserva su predisposición hacia las herramientas móviles.', cumple: true },
    { texto: 'Los interesados clave participan en las validaciones de los gates.', cumple: false },
  ],

  disparadores: [
    { texto: 'Incorporación de un nuevo interesado', activo: false },
    { texto: 'Cambio en el poder, interés o actitud de un interesado', activo: false },
    { texto: 'Incidente relevante', activo: false },
    { texto: 'Cambio aprobado que afecta la operación', activo: false },
    { texto: 'Llegada a un gate del proyecto', activo: false },
  ],

  resultados: [
    {
      nombre: 'Pedidos incompletos', unidad: 'por mes', lineaBase: 9,
      valores: [{ mes: 'Sep', valor: 8 }, { mes: 'Oct', valor: 2, parcial: true }],
    },
    {
      nombre: 'Dobles envíos', unidad: '% de pedidos', lineaBase: 20,
      valores: [{ mes: 'Sep', valor: 18 }, { mes: 'Oct', valor: 15, parcial: true }],
    },
    {
      nombre: 'Conciliación', unidad: 'horas por semana', lineaBase: 8,
      valores: [{ mes: 'Sep', valor: 8 }, { mes: 'Oct', valor: 6, parcial: true }],
    },
  ],

  adopcion: {
    ventasMovil: { registrados: 31, total: 54 },
    empaqueInduccion: { asistentes: 0, total: 4, programada: null },
    ultimoRespaldo: '2026-10-06',
    conciliacionExcel: { conciliados: 412, total: 430 },
  },
};
