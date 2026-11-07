// Dashboards de alcance (procesos 2.5 Monitorear y Controlar el Alcance, y 2.6 Validar el Alcance).
// No hay registro aparte: todo sale del frontmatter acumulado de src/content/alcance. Los cálculos se
// hacen al compilar el sitio, igual que en monitoreo-comunicaciones.ts.
import type { CollectionEntry } from 'astro:content';
import { TOTAL_ACTIVIDADES } from './edt';
import { FECHA_CORTE, SEMANAS } from './monitoreo-comunicaciones';

export type Snapshot = CollectionEntry<'alcance'>['data'];

/** Línea base de alcance: 92 actividades, 10 requisitos (REQ-01 a REQ-10), 7 hitos del cronograma */
export const EDT_TOTAL = TOTAL_ACTIVIDADES;
export const REQ_TOTAL = 10;
export const HITOS_TOTAL = 7;

export type KpiId =
  | 'cumplimientoFisico' | 'scopeCreep' | 'volatilidadRequisitos' | 'solicitudesCambio' | 'hitosAlcanzados'
  | 'adherenciaEdt' | 'costoCambios' | 'coberturaTrazabilidad' | 'entregablesValidados' | 'verificacionQA'
  | 'aceptacionPrimeraInspeccion' | 'noConformidades';

export interface Kpi {
  id: KpiId;
  proceso: '2.5' | '2.6';
  nombre: string;
  formato: 'tasa' | 'pct' | 'moneda' | 'conteo';
  meta: number;
  metaTexto: string;
  /** true: un valor más bajo es mejor (scope creep, volatilidad, no conformidades, costo) */
  menorEsMejor?: boolean;
  formula: string;
  fuente: string;
}

export const KPIS: Kpi[] = [
  {
    id: 'cumplimientoFisico', proceso: '2.5', nombre: 'Cumplimiento físico (EDT)', formato: 'pct', meta: 90, metaTexto: '≥ línea base',
    formula: 'Actividades del EDT completadas ÷ 92 actividades totales', fuente: 'EDT y Act.md',
  },
  {
    id: 'scopeCreep', proceso: '2.5', nombre: 'Scope Creep Rate (desvío)', formato: 'pct', meta: 5, metaTexto: '≤ 5 %', menorEsMejor: true,
    formula: 'Actividades agregadas fuera de la línea base ÷ 92 actividades originales', fuente: 'Registro de cambios',
  },
  {
    id: 'volatilidadRequisitos', proceso: '2.5', nombre: 'Índice de volatilidad de requisitos', formato: 'pct', meta: 10, metaTexto: '≤ 10 %', menorEsMejor: true,
    formula: 'Requisitos modificados tras su firma ÷ 10 requisitos (REQ-01 a REQ-10)', fuente: 'Registro de cambios',
  },
  {
    id: 'solicitudesCambio', proceso: '2.5', nombre: 'Solicitudes de cambio (CCB)', formato: 'tasa', meta: 90, metaTexto: '≥ 90 % resueltas',
    formula: 'Solicitudes resueltas (aprobadas o rechazadas) ÷ solicitudes recibidas', fuente: 'Registro de cambios',
  },
  {
    id: 'hitosAlcanzados', proceso: '2.5', nombre: 'Hitos de alcance alcanzados', formato: 'pct', meta: 100, metaTexto: 'según cronograma',
    formula: 'Hitos alcanzados ÷ 7 hitos de la línea base', fuente: 'Cronograma e hitos del EDT',
  },
  {
    id: 'adherenciaEdt', proceso: '2.5', nombre: 'Adherencia a la EDT (WBS)', formato: 'pct', meta: 95, metaTexto: '≥ 95 %',
    formula: '1 − (actividades agregadas ÷ 92 actividades originales)', fuente: 'EDT y registro de cambios',
  },
  {
    id: 'costoCambios', proceso: '2.5', nombre: 'Costo de cambios de alcance', formato: 'moneda', meta: 500, metaTexto: '≤ S/ 500', menorEsMejor: true,
    formula: 'Suma del costo de los cambios de alcance aprobados', fuente: 'Registro de cambios y matriz de costos',
  },
  {
    id: 'coberturaTrazabilidad', proceso: '2.6', nombre: 'Cobertura de trazabilidad', formato: 'pct', meta: 80, metaTexto: '≥ 80 %',
    formula: 'Requisitos con trazabilidad completa a un entregable validado ÷ 10 requisitos', fuente: 'Matriz de trazabilidad (EDT 1.2.9)',
  },
  {
    id: 'entregablesValidados', proceso: '2.6', nombre: 'Entregables validados (cliente)', formato: 'pct', meta: 80, metaTexto: '≥ 80 %',
    formula: 'Entregables validados por Gerencia o el interesado correspondiente ÷ entregables inspeccionados', fuente: 'Actas de revisión y aprobación',
  },
  {
    id: 'verificacionQA', proceso: '2.6', nombre: 'Verificación técnica (QA)', formato: 'pct', meta: 95, metaTexto: '≥ 95 %',
    formula: 'Entregables que aprobaron la verificación técnica ÷ entregables inspeccionados', fuente: 'Informes técnicos de cada entregable',
  },
  {
    id: 'aceptacionPrimeraInspeccion', proceso: '2.6', nombre: 'Aceptación a primera inspección', formato: 'pct', meta: 80, metaTexto: '≥ 80 %',
    formula: 'Entregables aceptados sin necesidad de rehacerlos ÷ entregables inspeccionados', fuente: 'Actas de revisión y aprobación',
  },
  {
    id: 'noConformidades', proceso: '2.6', nombre: 'No conformidades de alcance', formato: 'tasa', meta: 15, metaTexto: '≤ 15 %', menorEsMejor: true,
    formula: 'No conformidades levantadas ÷ entregables inspeccionados', fuente: 'Actas de revisión y aprobación',
  },
];

const pct = (n: number, d: number) => (d > 0 ? (n / d) * 100 : 0);

export function valoresKpi(s: Snapshot): Record<KpiId, number> {
  return {
    cumplimientoFisico: pct(s.edtCompletadas, EDT_TOTAL),
    scopeCreep: pct(s.edtAgregadas, EDT_TOTAL),
    volatilidadRequisitos: pct(s.requisitosModificados, REQ_TOTAL),
    solicitudesCambio: pct(s.cambiosResueltos, Math.max(s.cambiosSolicitados, s.cambiosResueltos || 1)),
    hitosAlcanzados: pct(s.hitosAlcanzados, HITOS_TOTAL),
    adherenciaEdt: 100 - pct(s.edtAgregadas, EDT_TOTAL),
    costoCambios: s.costoCambiosAprobados,
    coberturaTrazabilidad: pct(s.trazabilidadCubierta, REQ_TOTAL),
    entregablesValidados: pct(s.entregablesValidados, Math.max(s.entregablesInspeccionados, 1)),
    verificacionQA: pct(s.verificacionesQAaprobadas, Math.max(s.entregablesInspeccionados, 1)),
    aceptacionPrimeraInspeccion: pct(s.aceptacionesPrimeraInspeccion, Math.max(s.entregablesInspeccionados, 1)),
    noConformidades: pct(s.noConformidades, Math.max(s.entregablesInspeccionados, 1)),
  };
}

export type EstadoKpi = 'cumple' | 'no_cumple' | 'sin_datos';

export const estadoKpi = (kpi: Kpi, valor: number | null): EstadoKpi =>
  valor === null ? 'sin_datos' : (kpi.menorEsMejor ? valor <= kpi.meta : valor >= kpi.meta) ? 'cumple' : 'no_cumple';

export function formatoValor(kpi: Kpi, valor: number) {
  if (kpi.formato === 'moneda') return `S/ ${valor.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  return `${Math.round(valor * 10) / 10}`.replace('.', ',') + (kpi.formato === 'conteo' ? '' : ' %');
}

/** Última semana con snapshot publicado, a lo sumo hasta la fecha de corte */
export function ultimoSnapshot(snapshots: CollectionEntry<'alcance'>[]) {
  const vigentes = snapshots.filter((s) => SEMANAS[s.data.semana - 1].fecha <= FECHA_CORTE);
  return vigentes.sort((a, b) => b.data.semana - a.data.semana)[0];
}

export interface PuntoBurnup {
  semana: number;
  fecha: string;
  planificado: number;
  real: number | null;
}

/** Serie del Scope Burnup Chart: línea base lineal (92 actividades repartidas en 30 semanas) vs avance real */
export function serieBurnup(snapshots: CollectionEntry<'alcance'>[]): PuntoBurnup[] {
  const porSemana = new Map(snapshots.map((s) => [s.data.semana, s.data]));
  const ultimaSemanaConDatos = Math.max(0, ...snapshots.map((s) => s.data.semana));
  return SEMANAS.filter((s) => s.semana <= Math.max(ultimaSemanaConDatos, 1)).map((s) => ({
    semana: s.semana,
    fecha: s.fecha,
    planificado: Math.round((EDT_TOTAL * s.semana) / SEMANAS.length),
    real: porSemana.get(s.semana)?.edtCompletadas ?? null,
  }));
}

export interface EjePentagono {
  eje: string;
  valor: number;
  kpi: KpiId;
}

/** Los 5 ejes del pentágono de 2.6: No conformidades se invierte (100 − tasa) para que "más alto = mejor" en los cinco ejes */
export function ejesPentagono(s: Snapshot): EjePentagono[] {
  const v = valoresKpi(s);
  return [
    { eje: 'Cobertura de trazabilidad', valor: v.coberturaTrazabilidad, kpi: 'coberturaTrazabilidad' },
    { eje: 'Entregables validados', valor: v.entregablesValidados, kpi: 'entregablesValidados' },
    { eje: 'Verificación técnica (QA)', valor: v.verificacionQA, kpi: 'verificacionQA' },
    { eje: 'Aceptación 1.ª inspección', valor: v.aceptacionPrimeraInspeccion, kpi: 'aceptacionPrimeraInspeccion' },
    { eje: 'Sin no conformidades', valor: 100 - v.noConformidades, kpi: 'noConformidades' },
  ];
}
