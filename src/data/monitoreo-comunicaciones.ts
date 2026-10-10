// Dashboard de monitoreo de las comunicaciones (proceso 5.7).
// No hay registro aparte: todo sale del frontmatter de los informes semanales y de gate
// (src/content/comunicaciones). Los cálculos se hacen al compilar el sitio.
import type { CollectionEntry } from 'astro:content';
import { ESTADO_INICIAL } from './monitoreo-interesados';

export type Informe = CollectionEntry<'informes'>['data'];
export type InformeGate = CollectionEntry<'gates'>['data'];

/** Fecha de compilación en Lima: contra ella se cuentan las semanas que ya debían tener informe */
export const FECHA_CORTE = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' });

export type KpiId = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';

export interface Kpi {
  id: KpiId;
  nombre: string;
  /** tasa: 0–1 · pct: 0–100 · escala: 1–5 */
  formato: 'tasa' | 'pct' | 'escala';
  meta: number;
  metaTexto: string;
  formula: string;
  fuente: string;
  frecuencia: string;
  responsable: string;
}

// Indicadores de la sección 3.10 del Plan de gestión de las comunicaciones
export const KPIS: Kpi[] = [
  {
    id: 'K1', nombre: 'Informes semanales entregados a tiempo', formato: 'tasa', meta: 0.9, metaTexto: '≥ 90 %',
    formula: 'Informes enviados hasta su fecha programada ÷ semanas cuya fecha ya pasó',
    fuente: 'Carpeta de informes en Drive', frecuencia: 'Mensual', responsable: 'Líder',
  },
  {
    id: 'K2', nombre: 'Asistencia de Gerencia y Socio a los gates', formato: 'pct', meta: 80, metaTexto: '≥ 80 %',
    formula: 'Promedio, por gate, de asistentes requeridos presentes ÷ asistentes requeridos',
    fuente: 'Actas y lista de asistencia', frecuencia: 'Por gate', responsable: 'Analista de Calidad',
  },
  {
    id: 'K3', nombre: 'Actas emitidas en un día hábil', formato: 'tasa', meta: 1, metaTexto: '100 %',
    formula: 'Actas enviadas hasta el día hábil siguiente a la reunión ÷ reuniones con acta',
    fuente: 'Registro de decisiones', frecuencia: 'Mensual', responsable: 'Analista de Calidad',
  },
  {
    id: 'K4', nombre: 'Consultas de la Gerencia respondidas en un día hábil', formato: 'tasa', meta: 0.9, metaTexto: '≥ 90 %',
    formula: 'Consultas respondidas hasta el día hábil siguiente ÷ consultas recibidas',
    fuente: 'Historial de WhatsApp', frecuencia: 'Mensual', responsable: 'Líder',
  },
  {
    id: 'K5', nombre: 'Incidentes críticos escalados en 2 horas', formato: 'tasa', meta: 1, metaTexto: '100 %',
    formula: 'Incidentes críticos escalados en ≤ 2 h ÷ incidentes críticos',
    fuente: 'Registro de incidentes', frecuencia: 'Por incidente', responsable: 'Líder',
  },
  {
    id: 'K6', nombre: 'Percepción de la comunicación (1 a 5)', formato: 'escala', meta: 4, metaTexto: '≥ 4 de 5',
    formula: 'Promedio de claridad, utilidad y oportunidad en la mini-encuesta de cada gate',
    fuente: 'Mini-encuesta por WhatsApp', frecuencia: 'Por gate', responsable: 'Analista de Calidad',
  },
];

const DIA = 86_400_000;

export const sumarDias = (fecha: string, dias: number) =>
  new Date(Date.parse(fecha) + dias * DIA).toISOString().slice(0, 10);

/** Días hábiles (lunes a viernes) transcurridos después de `desde` hasta `hasta`, inclusive */
export function diasHabilesEntre(desde: string, hasta: string) {
  let dias = 0;
  for (let f = sumarDias(desde, 1); f <= hasta; f = sumarDias(f, 1)) {
    const d = new Date(f).getUTCDay();
    if (d !== 0 && d !== 6) dias++;
  }
  return dias;
}

/** Minutos entre dos fechas con hora (AAAA-MM-DD HH:mm, misma zona horaria) */
const minutosEntre = (desde: string, hasta: string) =>
  (Date.parse(hasta.replace(' ', 'T') + 'Z') - Date.parse(desde.replace(' ', 'T') + 'Z')) / 60_000;

/** Calendario del informe semanal y el comité: 30 lunes, del 28/09/2026 al 19/04/2027 */
export const SEMANAS = Array.from({ length: 30 }, (_, i) => ({ semana: i + 1, fecha: sumarDias('2026-09-28', i * 7) }));

export const GATES = ESTADO_INICIAL.gates.map((g, i) => ({ gate: i + 1, id: g.id, fecha: g.fecha, fase: g.fase }));

export const faseActual = (corte = FECHA_CORTE) => GATES.find((g) => g.fecha >= corte)?.fase ?? 'Cierre';

export const slugSemana = (n: number) => `semana-${String(n).padStart(2, '0')}`;
export const slugGate = (n: number) => `gate-${n}`;

/** cumple / no_cumple con informe; pendiente sin él (vencida si la fecha ya pasó) */
export type EstadoCelda = 'cumple' | 'no_cumple' | 'pendiente' | 'vencida';

export const estadoSemana = (fecha: string, informe: Informe | undefined, corte = FECHA_CORTE): EstadoCelda =>
  informe ? (informe.fecha_envio <= fecha ? 'cumple' : 'no_cumple') : fecha < corte ? 'vencida' : 'pendiente';

export const asistenciaGate = (g: InformeGate) => {
  const { requeridos, presentes } = g.asistencia;
  return (requeridos.filter((r) => presentes.includes(r)).length / requeridos.length) * 100;
};

const promedio = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export const percepcionGate = (g: InformeGate) =>
  promedio(g.encuesta.flatMap((r) => [r.claridad, r.utilidad, r.oportunidad]));

export const estadoGate = (g: InformeGate | undefined, fecha: string, corte = FECHA_CORTE): EstadoCelda =>
  g ? (asistenciaGate(g) >= 80 ? 'cumple' : 'no_cumple') : fecha < corte ? 'vencida' : 'pendiente';

export const DECISIONES: Record<InformeGate['decision'], { texto: string; tono: string }> = {
  aprobado: { texto: 'Aprobado', tono: 'ok' },
  'aprobado-con-pendientes': { texto: 'Aprobado con pendientes', tono: 'warn' },
  observado: { texto: 'Observado', tono: 'bad' },
};

/** Fila del registro de comunicaciones; `cumple` null: aún dentro del plazo */
export interface Registro {
  fecha: string;
  kpi: KpiId;
  evento: string;
  detalle: string;
  cumple: boolean | null;
  evidencia?: string;
  /** Informe del que sale la fila (abre su popup) */
  origen: { slug: string; texto: string };
}

const diasTexto = (n: number) => `${n} ${n === 1 ? 'día hábil' : 'días hábiles'}`;

type Registros = Pick<Informe, 'actas' | 'consultas' | 'incidentes'>;

function registrosDe(r: Registros, origen: Registro['origen'], corte: string): Registro[] {
  const filas: Registro[] = [];
  for (const a of r.actas) {
    const dias = a.enviada ? diasHabilesEntre(a.fecha, a.enviada) : null;
    filas.push({
      fecha: a.fecha, kpi: 'K3', evento: `Acta: ${a.reunion}`, evidencia: a.evidencia, origen,
      detalle: a.enviada ? `Enviada ${dias === 0 ? 'el mismo día' : `a ${diasTexto(dias!)}`}` : 'Sin enviar',
      cumple: dias !== null ? dias <= 1 : diasHabilesEntre(a.fecha, corte) > 1 ? false : null,
    });
  }
  for (const c of r.consultas) {
    const dias = c.respondida ? diasHabilesEntre(c.recibida, c.respondida) : null;
    filas.push({
      fecha: c.recibida, kpi: 'K4', evento: `Consulta: ${c.tema}`, evidencia: c.evidencia, origen,
      detalle: c.respondida ? `Respondida ${dias === 0 ? 'el mismo día' : `a ${diasTexto(dias!)}`}` : 'Sin responder',
      cumple: dias !== null ? dias <= 1 : diasHabilesEntre(c.recibida, corte) > 1 ? false : null,
    });
  }
  for (const i of r.incidentes) {
    const min = i.escalado ? minutosEntre(i.detectado, i.escalado) : null;
    filas.push({
      fecha: i.detectado.slice(0, 10), kpi: 'K5', evento: `Incidente: ${i.descripcion}`, evidencia: i.evidencia, origen,
      detalle: min !== null ? `Escalado en ${min < 60 ? `${min} min` : `${Math.round((min / 60) * 10) / 10} h`.replace('.', ',')}` : 'Sin escalar',
      cumple: min !== null ? min <= 120 : false,
    });
  }
  return filas;
}

/** Registro completo, del más reciente al más antiguo */
export function registro(informes: Informe[], gates: InformeGate[], corte = FECHA_CORTE): Registro[] {
  const filas: Registro[] = [];
  for (const inf of informes) {
    const { fecha } = SEMANAS[inf.semana - 1];
    const origen = { slug: slugSemana(inf.semana), texto: `Informe semanal ${String(inf.semana).padStart(2, '0')}` };
    filas.push({
      fecha: inf.fecha_envio, kpi: 'K1', evento: `Envío (programado el ${fecha.split('-').reverse().join('/')})`,
      evidencia: inf.evidencia, origen,
      detalle: inf.fecha_envio <= fecha ? 'A tiempo' : `${diasTexto(diasHabilesEntre(fecha, inf.fecha_envio))} tarde`,
      cumple: inf.fecha_envio <= fecha,
    });
    filas.push(...registrosDe(inf, origen, corte));
  }
  for (const g of gates) {
    const origen = { slug: slugGate(g.gate), texto: `Informe del Gate ${g.gate}` };
    const asis = asistenciaGate(g);
    const perc = percepcionGate(g);
    filas.push({
      fecha: g.fecha, kpi: 'K2', evento: `Asistencia al Gate ${g.gate}`, evidencia: g.evidencia, origen,
      detalle: `${g.asistencia.presentes.length} de ${g.asistencia.requeridos.length} requeridos`, cumple: asis >= 80,
    });
    if (perc !== null) {
      filas.push({
        fecha: g.fecha, kpi: 'K6', evento: `Mini-encuesta del Gate ${g.gate}`, evidencia: g.evidencia, origen,
        detalle: `${g.encuesta.length} respuestas · promedio ${formatoNumero(perc)}`, cumple: perc >= 4,
      });
    }
    filas.push(...registrosDe(g, origen, corte));
  }
  return filas.sort((a, b) => b.fecha.localeCompare(a.fecha) || a.kpi.localeCompare(b.kpi));
}

const formatoNumero = (v: number) => String(Math.round(v * 10) / 10).replace('.', ',');

export function valorTexto(k: Kpi, valor: number) {
  if (k.formato === 'tasa') return `${formatoNumero(valor * 100)} %`;
  if (k.formato === 'pct') return `${formatoNumero(valor)} %`;
  return `${formatoNumero(valor)} / 5`;
}

export interface ResumenKpi {
  kpi: Kpi;
  valor: number | null;
  /** Texto bajo el valor: cuántas mediciones lo sostienen */
  base: string;
  estado: 'cumple' | 'no_cumple' | 'sin_datos';
}

export function resumenKpis(informes: Informe[], gates: InformeGate[], corte = FECHA_CORTE): ResumenKpi[] {
  const filas = registro(informes, gates, corte);
  const tasa = (kpi: KpiId) => {
    const medidas = filas.filter((f) => f.kpi === kpi && f.cumple !== null);
    return { valor: medidas.length ? medidas.filter((f) => f.cumple).length / medidas.length : null, n: medidas.length };
  };

  // K1 cuenta también las semanas vencidas sin informe
  const semanas = SEMANAS.filter((s) => s.fecha < corte || informes.some((i) => i.semana === s.semana));
  const aTiempo = semanas.filter((s) => estadoSemana(s.fecha, informes.find((i) => i.semana === s.semana), corte) === 'cumple');
  const k3 = tasa('K3');
  const k4 = tasa('K4');
  const k5 = tasa('K5');
  const k2 = promedio(gates.map(asistenciaGate));
  const respuestas = gates.flatMap((g) => g.encuesta.flatMap((r) => [r.claridad, r.utilidad, r.oportunidad]));
  const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

  const valores: Record<KpiId, { valor: number | null; base: string }> = {
    K1: { valor: semanas.length ? aTiempo.length / semanas.length : null, base: `${aTiempo.length} de ${plural(semanas.length, 'semana', 'semanas')} · ${SEMANAS.length} programadas` },
    K2: { valor: k2, base: `${plural(gates.length, 'gate', 'gates')} de ${GATES.length}` },
    K3: { valor: k3.valor, base: plural(k3.n, 'acta', 'actas') },
    K4: { valor: k4.valor, base: plural(k4.n, 'consulta', 'consultas') },
    K5: { valor: k5.valor, base: plural(k5.n, 'incidente', 'incidentes') },
    K6: { valor: promedio(respuestas), base: `${plural(respuestas.length / 3, 'respuesta', 'respuestas')} · ${plural(gates.length, 'gate', 'gates')}` },
  };

  return KPIS.map((kpi) => {
    const { valor, base } = valores[kpi.id];
    return { kpi, valor, base, estado: valor === null ? 'sin_datos' : valor >= kpi.meta ? 'cumple' : 'no_cumple' };
  });
}
