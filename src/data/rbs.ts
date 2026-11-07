// Estructura de desglose de recursos (RBS) y diccionario de recursos.
// Horas, tarifas y materiales salen de public/documentos/lineas-base/matriz-costos.csv;
// los recursos existentes y las restricciones, del acta de constitución.

export type Origen = 'Equipo consultor' | 'Contraparte' | 'Existente' | 'Adquirido' | 'Gratuito' | 'Proyección';

export interface Recurso {
  codigo: string;
  nombre: string;
  descripcion: string;
  cantidad: string;
  /** Costo con cargo al BAC, en soles */
  costo: number;
  origen: Origen;
  /** Actividades o fases de la EDT donde se usa */
  uso: string;
  /** Recurso posterior al cierre: se documenta pero no suma en la línea base */
  proyeccion?: boolean;
}

export interface Grupo {
  codigo: string;
  nombre: string;
  recursos: Recurso[];
}

export interface Categoria {
  codigo: string;
  nombre: string;
  descripcion: string;
  grupos: Grupo[];
}

export const FASES_RBS = ['1.1', '1.2', '1.3', '1.4', '1.5'] as const;

interface Rol {
  nombre: string;
  tarifa: number;
  /** Horas por fase, en el orden de FASES_RBS */
  horas: [number, number, number, number, number];
  descripcion: string;
}

export const ROLES: Rol[] = [
  {
    nombre: 'Líder del Proyecto',
    tarifa: 30,
    horas: [314, 8, 38, 10, 128],
    descripcion: 'Dirige el proyecto, mantiene líneas base y registro de cambios, conduce comités, gates y capacitaciones.',
  },
  {
    nombre: 'Analista de Sistemas',
    tarifa: 25,
    horas: [0, 144, 184, 176, 128],
    descripcion: 'Diagnóstico AS-IS/TO-BE, requisitos, modelo de datos, limpieza de Excel, piloto, configuración y migración a Odoo.',
  },
  {
    nombre: 'Analista de Infraestructura',
    tarifa: 27,
    horas: [0, 16, 40, 48, 16],
    descripcion: 'Auditoría de red y dispositivos, solución Wi-Fi, respaldo 4G/5G, servidor y despliegue de Odoo.',
  },
  {
    nombre: 'Analista de Calidad',
    tarifa: 25,
    horas: [0, 0, 84, 116, 28],
    descripcion: 'Diccionario de datos y reglas de calidad, SOP, verificación del piloto, casos y ejecución de UAT.',
  },
];

export const horasRol = (r: Rol) => r.horas.reduce((a, b) => a + b, 0);

/** Formato del sitio: punto de miles y coma decimal (S/ 39.680,00) */
export const numero = (n: number) => n.toLocaleString('es-ES', { useGrouping: 'always' });
export const soles = (n: number) =>
  `S/ ${n.toLocaleString('es-ES', { minimumFractionDigits: 2, useGrouping: 'always' })}`;

export const CATEGORIAS: Categoria[] = [
  {
    codigo: 'R1',
    nombre: 'Recursos humanos',
    descripcion: 'Personas que ejecutan o validan el trabajo',
    grupos: [
      {
        codigo: 'R1.1',
        nombre: 'Equipo consultor UNTELS',
        recursos: ROLES.map((r, i) => ({
          codigo: `R1.1.${i + 1}`,
          nombre: r.nombre,
          descripcion: r.descripcion,
          cantidad: `1 persona · ${horasRol(r)} h × ${soles(r.tarifa)}/h`,
          costo: horasRol(r) * r.tarifa,
          origen: 'Equipo consultor',
          uso: `Fases ${FASES_RBS.filter((_, f) => r.horas[f] > 0).join(', ')}`,
        })),
      },
      {
        codigo: 'R1.2',
        nombre: "Contraparte de Roma Bag's",
        recursos: [
          {
            codigo: 'R1.2.1',
            nombre: 'Gerencia General (patrocinadora)',
            descripcion: 'Autoriza el proyecto, firma acta y gates, valida SOP y políticas, aprueba cambios y participa en la UAT.',
            cantidad: '1 persona',
            costo: 0,
            origen: 'Contraparte',
            uso: '1.1.2, 1.3.11, 1.3.13, 1.3.24, 1.4.25, 1.4.29, 1.5.9, 1.5.21',
          },
          {
            codigo: 'R1.2.2',
            nombre: 'Socio / Jefe de Producción',
            descripcion: 'Valida el flujo en el taller (veto operativo), participa en la preprueba y la UAT con los operarios.',
            cantidad: '1 persona + operarios',
            costo: 0,
            origen: 'Contraparte',
            uso: '1.3.11, 1.4.22, 1.4.24, 1.5.8',
          },
          {
            codigo: 'R1.2.3',
            nombre: 'Personal de Ventas',
            descripcion: 'Registra ventas en el piloto y en Odoo; ejecuta la UAT y recibe capacitación.',
            cantidad: 'Según turnos',
            costo: 0,
            origen: 'Contraparte',
            uso: '1.3.21, 1.4.23, 1.5.7',
          },
          {
            codigo: 'R1.2.4',
            nombre: 'Empaque y despacho',
            descripcion: 'Opera el despacho y la vista del motorizado dentro del flujo venta–stock–despacho.',
            cantidad: 'Según turnos',
            costo: 0,
            origen: 'Contraparte',
            uso: '1.4.19, 1.5.14',
          },
          {
            codigo: 'R1.2.5',
            nombre: 'Comité de Datos (Data Owners / Stewards)',
            descripcion: 'Responsables designados de cada dato: validan el catálogo, auditan la calidad y reciben los controles al cierre.',
            cantidad: 'Miembros designados en 1.3.5',
            costo: 0,
            origen: 'Contraparte',
            uso: '1.3.5, 1.3.15, 1.5.15, 1.5.18',
          },
        ],
      },
    ],
  },
  {
    codigo: 'R2',
    nombre: 'Materiales e insumos',
    descripcion: 'Consumibles y servicios de movilidad',
    grupos: [
      {
        codigo: 'R2.1',
        nombre: 'Impresiones y material de capacitación',
        recursos: [
          {
            codigo: 'R2.1.1',
            nombre: 'Impresión de SOP',
            descripcion: 'Copias físicas del SOP venta–stock–despacho para el taller.',
            cantidad: '2 juegos',
            costo: 30,
            origen: 'Adquirido',
            uso: '1.3.10',
          },
          {
            codigo: 'R2.1.2',
            nombre: 'Impresión de política de respaldo',
            descripcion: 'Política de respaldo, retención y seguridad para firma de Gerencia.',
            cantidad: '1 juego',
            costo: 15,
            origen: 'Adquirido',
            uso: '1.3.12',
          },
          {
            codigo: 'R2.1.3',
            nombre: 'Manuales de usuario impresos',
            descripcion: 'Manuales de Odoo por rol para consulta en el taller.',
            cantidad: '3 juegos',
            costo: 45,
            origen: 'Adquirido',
            uso: '1.5.5',
          },
          {
            codigo: 'R2.1.4',
            nombre: 'Materiales de capacitación · Ventas',
            descripcion: 'Guías y fichas prácticas para el personal de Ventas.',
            cantidad: '1 lote',
            costo: 40,
            origen: 'Adquirido',
            uso: '1.5.7',
          },
          {
            codigo: 'R2.1.5',
            nombre: 'Materiales de capacitación · Producción',
            descripcion: 'Guías y fichas prácticas para Producción y operarios.',
            cantidad: '1 lote',
            costo: 30,
            origen: 'Adquirido',
            uso: '1.5.8',
          },
          {
            codigo: 'R2.1.6',
            nombre: 'Materiales de capacitación · Gerencia',
            descripcion: 'Guía de reportes y paneles gerenciales.',
            cantidad: '1 lote',
            costo: 25,
            origen: 'Adquirido',
            uso: '1.5.9',
          },
        ],
      },
      {
        codigo: 'R2.2',
        nombre: 'Movilidad',
        recursos: [
          {
            codigo: 'R2.2.1',
            nombre: 'Pasajes de visita de campo',
            descripcion: 'Traslado de dos consultores al taller para observación, auditoría y mapeo Wi-Fi.',
            cantidad: '3 visitas × 2 personas',
            costo: 90,
            origen: 'Adquirido',
            uso: '1.2.1, 1.2.3, 1.3.1',
          },
          {
            codigo: 'R2.2.2',
            nombre: 'Pasajes para el despliegue',
            descripcion: 'Traslado de dos consultores para la salida en vivo de Odoo.',
            cantidad: '1 visita × 2 personas',
            costo: 30,
            origen: 'Adquirido',
            uso: '1.5.12',
          },
        ],
      },
    ],
  },
  {
    codigo: 'R3',
    nombre: 'Equipamiento',
    descripcion: 'Hardware de usuario y de red',
    grupos: [
      {
        codigo: 'R3.1',
        nombre: 'Dispositivos de usuario',
        recursos: [
          {
            codigo: 'R3.1.1',
            nombre: 'Computadoras portátiles',
            descripcion: 'Equipos actuales de Gerencia y Ventas; restricción del acta: sin hardware nuevo.',
            cantidad: '3 unidades',
            costo: 0,
            origen: 'Existente',
            uso: '1.3.21, 1.4.21, 1.5.12',
          },
          {
            codigo: 'R3.1.2',
            nombre: 'Celulares',
            descripcion: 'Teléfonos de ventas y producción; la solución debe operar desde el celular en todas las fases.',
            cantidad: '6 unidades',
            costo: 0,
            origen: 'Existente',
            uso: '1.3.18, 1.3.19, 1.4.21, 1.5.12',
          },
        ],
      },
      {
        codigo: 'R3.2',
        nombre: 'Red',
        recursos: [
          {
            codigo: 'R3.2.1',
            nombre: 'Repetidor Wi-Fi y cable de red',
            descripcion: 'Elimina las zonas muertas del taller sin obras civiles; único hardware que se compra.',
            cantidad: '1 kit',
            costo: 120,
            origen: 'Adquirido',
            uso: '1.3.3',
          },
          {
            codigo: 'R3.2.2',
            nombre: 'Router del proveedor de internet',
            descripcion: 'Router Movistar instalado; con datos móviles 4G/5G como respaldo de conectividad.',
            cantidad: '1 unidad',
            costo: 0,
            origen: 'Existente',
            uso: '1.3.1, 1.3.4',
          },
        ],
      },
    ],
  },
  {
    codigo: 'R4',
    nombre: 'Infraestructura y espacios',
    descripcion: 'Lugares de trabajo e infraestructura en la nube',
    grupos: [
      {
        codigo: 'R4.1',
        nombre: 'Espacios físicos',
        recursos: [
          {
            codigo: 'R4.1.1',
            nombre: 'Talleres principal y alterno',
            descripcion: 'Sede de las visitas, el piloto, la UAT y las capacitaciones presenciales.',
            cantidad: '2 locales',
            costo: 0,
            origen: 'Contraparte',
            uso: '1.2.1, 1.3.21, 1.4.14, 1.4.22–1.4.25, 1.5.7–1.5.9',
          },
        ],
      },
      {
        codigo: 'R4.2',
        nombre: 'Infraestructura tecnológica',
        recursos: [
          {
            codigo: 'R4.2.1',
            nombre: 'VPS / hosting de Odoo',
            descripcion: 'Servidor de pruebas y producción de Odoo Community durante el proyecto.',
            cantidad: '5 meses',
            costo: 200,
            origen: 'Adquirido',
            uso: '1.4.1–1.4.4, 1.5.10–1.5.12',
          },
          {
            codigo: 'R4.2.2',
            nombre: 'Base central del piloto',
            descripcion: 'Base temporal con respaldo para la captura piloto; se retira al fijar Odoo como fuente oficial.',
            cantidad: '1 instancia',
            costo: 0,
            origen: 'Gratuito',
            uso: '1.3.16, 1.3.21, 1.5.13',
          },
        ],
      },
    ],
  },
  {
    codigo: 'R5',
    nombre: 'Software y licencias',
    descripcion: 'Recursos digitales',
    grupos: [
      {
        codigo: 'R5.1',
        nombre: 'Sistema de gestión',
        recursos: [
          {
            codigo: 'R5.1.1',
            nombre: 'Odoo Community',
            descripcion: 'ERP de código abierto (LGPL) usado durante el proyecto: inventario, ventas y despachos.',
            cantidad: 'Usuarios ilimitados',
            costo: 0,
            origen: 'Gratuito',
            uso: '1.4.3–1.4.19, 1.5.1–1.5.14',
          },
          {
            codigo: 'R5.1.2',
            nombre: 'Dominio y certificado SSL',
            descripcion: 'Dirección web y conexión cifrada para acceder a Odoo desde los celulares.',
            cantidad: '1 dominio',
            costo: 60,
            origen: 'Adquirido',
            uso: '1.4.2',
          },
          {
            codigo: 'R5.1.3',
            nombre: 'Odoo Standard (Odoo Online)',
            descripcion:
              "Versión de pago prevista tras el cierre, a cargo de Roma Bag's. Se aloja en Odoo Online, por lo que reemplazaría al VPS.",
            cantidad: '≈ USD 8,95 por usuario al mes (pago anual) · usuarios por confirmar',
            costo: 0,
            origen: 'Proyección',
            uso: 'Operación posterior a 1.5.23',
            proyeccion: true,
          },
        ],
      },
      {
        codigo: 'R5.2',
        nombre: 'Herramientas de trabajo',
        recursos: [
          {
            codigo: 'R5.2.1',
            nombre: 'Microsoft Project',
            descripcion: 'Cronograma del proyecto (cronograma.mpp); licencia del equipo consultor.',
            cantidad: '1 licencia',
            costo: 0,
            origen: 'Equipo consultor',
            uso: '1.1.4–1.1.7',
          },
          {
            codigo: 'R5.2.2',
            nombre: 'Microsoft Excel',
            descripcion: 'Registros históricos que se limpian y migran; coexiste con el piloto hasta el corte.',
            cantidad: 'Archivos históricos',
            costo: 0,
            origen: 'Existente',
            uso: '1.2.4, 1.3.14, 1.3.20',
          },
          {
            codigo: 'R5.2.3',
            nombre: 'Google Drive',
            descripcion: 'Repositorio de informes, actas, plantillas y expediente, con historial de versiones.',
            cantidad: '1 cuenta',
            costo: 0,
            origen: 'Existente',
            uso: '1.1.5, 1.5.20, 1.5.22',
          },
          {
            codigo: 'R5.2.4',
            nombre: 'WhatsApp',
            descripcion: 'Canal diario con Gerencia y el personal para avisos e incidencias.',
            cantidad: '—',
            costo: 0,
            origen: 'Existente',
            uso: 'Todo el proyecto',
          },
        ],
      },
    ],
  },
];

export const recursosDe = (c: Categoria) => c.grupos.flatMap((g) => g.recursos);
export const costoCategoria = (c: Categoria) =>
  recursosDe(c).reduce((n, r) => n + (r.proyeccion ? 0 : r.costo), 0);

export const TOTAL_HORAS = ROLES.reduce((n, r) => n + horasRol(r), 0);
export const TOTAL_RECURSOS = CATEGORIAS.reduce((n, c) => n + recursosDe(c).filter((r) => !r.proyeccion).length, 0);
export const COSTO_DIRECTO = CATEGORIAS.reduce((n, c) => n + costoCategoria(c), 0);

// Debe cuadrar con los costos directos de la línea base de costos
if (COSTO_DIRECTO !== 40365) {
  throw new Error(`RBS descuadrada con la línea base de costos: ${COSTO_DIRECTO} ≠ 40365`);
}
