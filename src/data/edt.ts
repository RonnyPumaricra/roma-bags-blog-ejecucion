// EDT del proyecto: fases y actividades del Project (public/documentos/lineas-base/cronograma.mpp),
// agrupadas en los paquetes de trabajo de la línea base de alcance.

export interface Actividad {
  codigo: string;
  nombre: string;
  hito: boolean;
}

export interface Paquete {
  id: string;
  nombre: string;
  entregable: string;
  responsable: string;
  actividades: Actividad[];
}

export interface Fase {
  id: string;
  nombre: string;
  /** Subtítulo de la fase en el Project */
  detalle: string;
  paquetes: Paquete[];
}

export const PROYECTO = "Transformación digital Roma Bag's";
export const PROYECTO_DETALLE = 'Odoo y gobernanza de datos';

// [código, nombre, hito]
const ACTIVIDADES: [string, string, boolean?][] = [
['1.1.1', 'Redactar el acta de constitución y objetivos medibles'],
  ['1.1.2', 'Aprobar y firmar el acta de constitución', true],
  ['1.1.3', 'Identificar interesados y responsables del proyecto'],
  ['1.1.4', 'Plan de alcance, cronograma, presupuesto y riesgos'],
  ['1.1.5', 'Informes de avance y comité de seguimiento semanal'],
  ['1.1.6', 'Registro de cambios, incidentes y decisiones'],
  ['1.1.7', 'Control de alcance, riesgos, costo y calidad'],
  ['1.2.1', 'Observación directa del flujo venta–stock–despacho'],
  ['1.2.2', 'Entrevistas a Gerencia, Ventas, Producción y Almacén'],
  ['1.2.3', 'Auditoría de infraestructura, conectividad y dispositivos'],
  ['1.2.4', 'Inventario de fuentes Excel, catálogos y calidad de datos'],
  ['1.2.5', 'Documentar proceso AS-IS y validarlo con Gerencia'],
  ['1.2.6', 'Diseñar flujo TO-BE y criterios del piloto frente a Odoo'],
  ['1.2.7', 'Fichas de requisitos REQ-01 a REQ-10 y reglas de datos'],
  ['1.2.8', 'Validación y firma de requisitos por responsables'],
  ['1.2.9', 'Matriz de trazabilidad y prioridades de implementación'],
  ['1.3.1', 'Mapear zonas muertas de Wi-Fi del taller'],
  ['1.3.2', 'Evaluar y seleccionar solución de red'],
  ['1.3.3', 'Implementar solución de red seleccionada'],
  ['1.3.4', 'Verificar conectividad y respaldo 4G/5G'],
  ['1.3.5', 'Constituir comité y nombrar Data Owners / Stewards'],
  ['1.3.6', 'Definir inventario, clasificación y acceso a datos'],
  ['1.3.7', 'Diccionario de datos y reglas de calidad por campo'],
  ['1.3.8', 'Diseñar modelo de datos del piloto y mapeo a Odoo'],
  ['1.3.9', 'Validar compatibilidad del modelo con Odoo'],
  ['1.3.10', 'Redactar SOP del flujo venta–stock–despacho'],
  ['1.3.11', 'Revisar y aprobar SOP con Gerencia y Producción'],
  ['1.3.12', 'Definir política de respaldo, retención y seguridad'],
  ['1.3.13', 'Aprobar política de respaldo y seguridad'],
  ['1.3.14', 'Limpiar, deduplicar y estandarizar Excel históricos'],
  ['1.3.15', 'Validar catálogo depurado con Data Owners'],
  ['1.3.16', 'Desplegar base central del piloto con respaldo'],
  ['1.3.17', 'Configurar reglas de validación de captura del piloto'],
  ['1.3.18', 'Configurar consulta de stock desde celular'],
  ['1.3.19', 'Prueba cronometrada de consulta de stock'],
  ['1.3.20', 'Protocolo de coexistencia con Excel y corte a Odoo'],
  ['1.3.21', 'Piloto de captura real limitada en base central'],
  ['1.3.22', 'Verificar consistencia de registros del piloto'],
  ['1.3.23', 'Evaluar adopción y documentar incidencias del piloto'],
  ['1.3.24', 'GATE 1 · Aprobación Cimentar', true],
  ['1.4.1', 'Seleccionar y contratar servidor de despliegue'],
  ['1.4.2', 'Instalar SO y dependencias en servidor'],
  ['1.4.3', 'Instalar y verificar Odoo Community'],
  ['1.4.4', 'Configuración inicial de Odoo, compañía y almacenes'],
  ['1.4.5', 'Crear usuarios y perfiles de acceso por rol'],
  ['1.4.6', 'Verificar restricciones y acceso cruzado'],
  ['1.4.7', 'Solicitar y recibir catálogo completo de productos'],
  ['1.4.8', 'Conciliar catálogo nuevo con los datos limpios'],
  ['1.4.9', 'Cargar catálogo y variantes en entorno de pruebas'],
  ['1.4.10', 'Migrar registros del piloto a Odoo de pruebas'],
  ['1.4.11', 'Verificar integridad y conciliación posmigración'],
  ['1.4.12', 'Configurar rebaja automática de stock'],
  ['1.4.13', 'Prueba interna de rebaja y casos de devolución'],
  ['1.4.14', 'Configurar talleres principal y alterno'],
  ['1.4.15', 'Verificar consolidación de registros de talleres'],
  ['1.4.16', 'Configurar formulario de ventas y validaciones'],
  ['1.4.17', 'Configurar flujo obligatorio Venta–Stock–Despacho'],
  ['1.4.18', 'Verificar bloqueo de despacho sin venta válida'],
  ['1.4.19', 'Configurar vista de despacho para motorizado'],
  ['1.4.20', 'Redactar casos UAT CP-01 a CP-06 y pruebas de datos'],
  ['1.4.21', 'Prueba técnica de conectividad y dispositivos'],
  ['1.4.22', 'Preprueba con socio de Producción'],
  ['1.4.23', 'UAT con personal de Ventas'],
  ['1.4.24', 'UAT con socio de Producción y operarios'],
  ['1.4.25', 'UAT con Gerencia Natalie'],
  ['1.4.26', 'Registrar, corregir y repetir pruebas críticas UAT'],
  ['1.4.27', 'Conciliar lote final y plan de migración a producción'],
  ['1.4.28', 'Certificado de cero defectos críticos abiertos', true],
  ['1.4.29', 'GATE 2 · Aprobación Integrar', true],
  ['1.5.1', 'Configurar panel de rentabilidad y KPIs operativos'],
  ['1.5.2', 'Configurar reporte automatizado de ganancia neta'],
  ['1.5.3', 'Panel de calidad de datos y alertas de excepción'],
  ['1.5.4', 'Verificar restricción de reportes por rol'],
  ['1.5.5', 'Manuales de usuario de Odoo por rol'],
  ['1.5.6', 'Guía de auto recuperación y contingencia'],
  ['1.5.7', 'Capacitación a personal de Ventas y datos'],
  ['1.5.8', 'Capacitación a Producción y operarios'],
  ['1.5.9', 'Capacitación a Gerencia Natalie'],
  ['1.5.10', 'Ensayo de corte y respaldo de producción'],
  ['1.5.11', 'Migración final conciliada y aprobación de saldos'],
  ['1.5.12', 'Despliegue final y salida en vivo Odoo', true],
  ['1.5.13', 'Retirar captura de piloto y fijar Odoo como fuente oficial'],
  ['1.5.14', 'Monitoreo de operaciones reales y soporte intensivo'],
  ['1.5.15', 'Auditoría de calidad de datos por Data Stewards'],
  ['1.5.16', 'Verificar reportes gerenciales en uso real'],
  ['1.5.17', 'Verificar criterios de aceptación y KPIs'],
  ['1.5.18', 'Transferir SOP, diccionario y control a Comité de Datos'],
  ['1.5.19', 'Lecciones aprendidas de TI y adopción'],
  ['1.5.20', 'Informe final y expediente de aceptación'],
  ['1.5.21', 'GATE 3 · Acta de conformidad y cierre', true],
  ['1.5.22', 'Entrega final documental y transferencia de soporte'],
  ['1.5.23', 'Archivo administrativo y fin del proyecto', true],
];

// [id, nombre, entregable y aceptación, responsable, rangos de actividades "desde-hasta"]
type FilaPaquete = [string, string, string, string, string[]];

const FASES_BASE: [string, string, string, FilaPaquete[]][] = [
  ['1.1', 'Dirección y planificación', 'Acta, planes, seguimiento y control', [
    ['EDT-1.1.01', 'Dirección y líneas base', 'Acta firmada, responsables y planes aprobados', 'Patrocinador / líder', ['1.1.1-1.1.4']],
    ['EDT-1.1.02', 'Seguimiento y control', 'Informes, registro de cambios y seguimiento documentado', 'Líder', ['1.1.5-1.1.7']],
  ]],
  ['1.2', 'Diagnóstico AS-IS/TO-BE', 'Diagnóstico y diseño AS-IS / TO-BE', [
    ['EDT-1.2.01', 'Diagnóstico AS-IS', 'Flujo actual y fuentes auditadas', 'Analista / Gerencia', ['1.2.1-1.2.5']],
    ['EDT-1.2.02', 'Diseño TO-BE y requisitos', 'Requisitos REQ-01–10 y trazabilidad firmada', 'Analista / responsables', ['1.2.6-1.2.9']],
  ]],
  ['1.3', 'Cimentar', 'Conectividad, piloto y gobierno base', [
    ['EDT-1.3.01', 'Conectividad operativa', 'Red y respaldo móvil probados en talleres', 'Infraestructura', ['1.3.1-1.3.4']],
    ['EDT-1.3.02', 'Gobierno inicial y calidad', 'Comité, dueños, diccionario, SOP, respaldo y catálogo depurado', 'Gerencia / dueños de datos', ['1.3.5-1.3.7', '1.3.10-1.3.15']],
    ['EDT-1.3.03', 'Piloto centralizado controlado', 'Modelo mapeado, captura, stock móvil y coexistencia trazable', 'Analista / usuarios', ['1.3.8-1.3.9', '1.3.16-1.3.23']],
    ['EDT-1.3.04', 'Aprobación Cimentar', 'Gate 1 firmado el 17/11/2026', 'Gerencia', ['1.3.24-1.3.24']],
  ]],
  ['1.4', 'Integrar', 'Odoo, migración y aceptación', [
    ['EDT-1.4.01', 'Servidor y Odoo de prueba', 'Entorno instalado y configuración inicial verificada', 'Infraestructura', ['1.4.1-1.4.4']],
    ['EDT-1.4.02', 'Roles y permisos', 'Perfiles por rol y pruebas de restricción', 'Analista / dueños', ['1.4.5-1.4.6']],
    ['EDT-1.4.03', 'Catálogo y migración conciliados', 'Catálogo homologado, datos de prueba conciliados y plan de corte', 'Dueños de datos / analista', ['1.4.7-1.4.11', '1.4.27-1.4.27']],
    ['EDT-1.4.04', 'Flujo operativo Odoo', 'Venta–stock–despacho, talleres y bloqueos probados', 'Analista / usuarios', ['1.4.12-1.4.19']],
    ['EDT-1.4.05', 'Pruebas y aceptación Integrar', 'UAT firmada, cero defectos críticos abiertos y Gate 2 del 08/03/2027', 'Usuarios / Gerencia', ['1.4.20-1.4.26', '1.4.28-1.4.29']],
  ]],
  ['1.5', 'Optimizar y cerrar', 'Reportes, salida en vivo y cierre', [
    ['EDT-1.5.01', 'Reportes y controles de calidad', 'KPIs y rentabilidad verificados en uso real', 'Gerencia / analista', ['1.5.1-1.5.4', '1.5.15-1.5.16']],
    ['EDT-1.5.02', 'Manuales y capacitación', 'Guías y formación por rol', 'Usuarios / líder', ['1.5.5-1.5.9']],
    ['EDT-1.5.03', 'Salida a producción', 'Corte conciliado, salida en vivo, piloto retirado y operación observada', 'Dueños / analista', ['1.5.10-1.5.14']],
    ['EDT-1.5.04', 'Conformidad y cierre', 'Comité recibe control, expediente, Gate 3 el 21/04 y archivo el 26/04', 'Gerencia / líder', ['1.5.17-1.5.23']],
  ]],
];

const ultimo = (codigo: string) => Number(codigo.split('.').at(-1));

/** Actividades de un rango "1.4.7-1.4.11" dentro de la misma fase */
function rango(r: string): Actividad[] {
  const [desde, hasta] = r.split('-');
  const fase = desde.split('.').slice(0, 2).join('.');
  return ACTIVIDADES.filter(([c]) => c.startsWith(`${fase}.`) && ultimo(c) >= ultimo(desde) && ultimo(c) <= ultimo(hasta)).map(
    ([codigo, nombre, hito]) => ({ codigo, nombre, hito: hito ?? false }),
  );
}

export const FASES: Fase[] = FASES_BASE.map(([id, nombre, detalle, paquetes]) => ({
  id,
  nombre,
  detalle,
  paquetes: paquetes.map(([pid, pnombre, entregable, responsable, rangos]) => ({
    id: pid,
    nombre: pnombre,
    entregable,
    responsable,
    actividades: rangos.flatMap(rango).sort((a, b) => ultimo(a.codigo) - ultimo(b.codigo)),
  })),
}));

export const TOTAL_PAQUETES = FASES.reduce((n, f) => n + f.paquetes.length, 0);
export const TOTAL_ACTIVIDADES = ACTIVIDADES.length;

// Cada actividad del Project debe pertenecer a un único paquete
const asignadas = FASES.flatMap((f) => f.paquetes.flatMap((p) => p.actividades.map((a) => a.codigo)));
const faltantes = ACTIVIDADES.map(([c]) => c).filter((c) => !asignadas.includes(c));
const repetidas = asignadas.filter((c, i) => asignadas.indexOf(c) !== i);
if (faltantes.length || repetidas.length) {
  throw new Error(`EDT inconsistente. Sin paquete: ${faltantes.join(', ') || '—'}. Repetidas: ${repetidas.join(', ') || '—'}`);
}
