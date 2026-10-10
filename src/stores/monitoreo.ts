import { reactive } from 'vue';
import {
  ESTADO_INICIAL, ESTADOS_VALIDACION, FECHA_CORTE, NIVELES,
  type AccionPlan, type Interesado, type Nivel, type Prioridad, type RegistroAccion,
} from '../data/monitoreo-interesados';

// Estado del dashboard de monitoreo del involucramiento.
// Vive solo en memoria: no se guarda en localStorage y vuelve al estado inicial al recargar.
export const datos = reactive(structuredClone(ESTADO_INICIAL));

export const vista = reactive({
  seleccionado: 'SH-02',
  prioridad: null as Prioridad | null,
});

const DIA = 86_400_000;

/** Días desde `desde` hasta `hasta` (fechas ISO, sin hora) */
export const diasEntre = (desde: string, hasta: string) => Math.round((Date.parse(hasta) - Date.parse(desde)) / DIA);

export const sumarDias = (fecha: string, dias: number) => new Date(Date.parse(fecha) + dias * DIA).toISOString().slice(0, 10);

export const interesadoPorId = (id: string) => datos.interesados.find((i) => i.id === id);

export const brecha = (i: Interesado) => NIVELES.indexOf(i.nivelDeseado) - NIVELES.indexOf(i.nivelActual);

export const tendencia = (i: Interesado) => Math.sign(NIVELES.indexOf(i.nivelActual) - NIVELES.indexOf(i.nivelAnterior));

export const evaluacionDesactualizada = (i: Interesado) => diasEntre(i.ultimaEvaluacion, FECHA_CORTE) > 30;

export const historialDe = (id: string) =>
  datos.historial.filter((h) => h.interesado === id).sort((a, b) => b.fecha.localeCompare(a.fecha));

/** Última acción en la que el interesado efectivamente participó */
export const ultimaRealizada = (id: string) => historialDe(id).find((h) => h.asistio)?.fecha ?? null;

/** Porcentaje de acciones registradas a las que asistió el interesado */
export function asistencia(id: string) {
  const registros = datos.historial.filter((h) => h.interesado === id);
  if (!registros.length) return null;
  return Math.round((registros.filter((h) => h.asistio).length / registros.length) * 100);
}

export type EstadoAccion =
  | { tipo: 'al-dia' | 'por-vencer' | 'vencida'; texto: string; proxima: string }
  | { tipo: 'evento'; texto: string }
  | { tipo: 'sin-definir'; texto: string };

export function estadoAccion(a: AccionPlan): EstadoAccion {
  if (!a.frecuencia) return { tipo: 'sin-definir', texto: 'Frecuencia sin definir' };
  if (a.frecuencia.tipo === 'evento') return { tipo: 'evento', texto: `Próximo: ${a.frecuencia.disparador}` };

  const ultima = ultimaRealizada(a.interesado);
  const proxima = ultima ? sumarDias(ultima, a.frecuencia.dias) : FECHA_CORTE;
  const faltan = diasEntre(FECHA_CORTE, proxima);
  if (faltan < 0) return { tipo: 'vencida', texto: `Vencida · ${-faltan} ${-faltan === 1 ? 'día' : 'días'}`, proxima };
  if (faltan <= 3) return { tipo: 'por-vencer', texto: faltan === 0 ? 'Vence hoy' : `Por vencer · ${faltan} ${faltan === 1 ? 'día' : 'días'}`, proxima };
  return { tipo: 'al-dia', texto: 'Al día', proxima };
}

export const accionDe = (id: string) => datos.plan.find((a) => a.interesado === id);

export const proximoGate = () =>
  datos.gates.find((g) => g.fecha >= FECHA_CORTE && g.validaciones.some((v) => v.estado !== 'aprobada'));

export const temporadaAlta = () => {
  const mes = Number(FECHA_CORTE.slice(5, 7));
  return mes >= 9 || mes === 1;
};

// Acciones

export function seleccionar(id: string) {
  vista.seleccionado = id;
}

export function filtrarPrioridad(p: Prioridad | null) {
  vista.prioridad = vista.prioridad === p ? null : p;
}

export function actualizarNivel(id: string, nivel: Nivel, fecha = FECHA_CORTE) {
  const i = interesadoPorId(id);
  if (!i) return;
  i.nivelAnterior = i.nivelActual;
  i.nivelActual = nivel;
  i.ultimaEvaluacion = fecha;
}

export function registrarAccion(registro: Omit<RegistroAccion, 'id'>) {
  datos.historial.push({ ...registro, id: `H-${Date.now()}` });
  if (registro.asistio && registro.nivelObservado) actualizarNivel(registro.interesado, registro.nivelObservado, registro.fecha);
}

export function agregarObjecion(demostracion: string, descripcion: string, fecha = FECHA_CORTE) {
  datos.objeciones.push({ id: `O-${Date.now()}`, fecha, demostracion, descripcion, respuesta: '', resuelta: false });
}

export function resolverObjecion(id: string, respuesta: string) {
  const o = datos.objeciones.find((x) => x.id === id);
  if (!o) return;
  o.respuesta = respuesta;
  o.resuelta = true;
}

/** Alterna la validación entre pendiente → aprobada → observada */
export function cambiarValidacion(gate: string, interesado: string) {
  const v = datos.gates.find((g) => g.id === gate)?.validaciones.find((x) => x.interesado === interesado);
  if (!v) return;
  v.estado = ESTADOS_VALIDACION[(ESTADOS_VALIDACION.indexOf(v.estado) + 1) % ESTADOS_VALIDACION.length];
}

export function reiniciar() {
  Object.assign(datos, structuredClone(ESTADO_INICIAL));
  vista.seleccionado = 'SH-02';
  vista.prioridad = null;
}
