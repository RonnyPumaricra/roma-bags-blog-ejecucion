import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Informes del proceso 5.7 (Monitorear las comunicaciones). El frontmatter de cada .md alimenta los indicadores
// del dashboard; los archivos que empiezan con "_" (plantillas) no se publican.

/** YAML convierte 2026-10-12 en Date; se normaliza a texto ISO (AAAA-MM-DD) */
const fecha = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Usa el formato AAAA-MM-DD')])
  .transform((f) => (f instanceof Date ? f.toISOString().slice(0, 10) : f));

/** Fecha y hora; se normaliza a AAAA-MM-DD HH:mm */
const fechaHora = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}$/, "Usa el formato 'AAAA-MM-DD HH:mm'")])
  .transform((f) => (f instanceof Date ? f.toISOString().slice(0, 16) : f).replace('T', ' '));

const evidencia = z.string().optional();

/** Comunicaciones registradas junto con cada informe: K3, K4 y K5 */
const registros = {
  actas: z
    .array(z.object({ reunion: z.string(), fecha, enviada: fecha.optional(), evidencia }))
    .default([]),
  consultas: z
    .array(z.object({ tema: z.string(), recibida: fecha, respondida: fecha.optional(), evidencia }))
    .default([]),
  incidentes: z
    .array(z.object({ descripcion: z.string(), detectado: fechaHora, escalado: fechaHora.optional(), evidencia }))
    .default([]),
};

const informes = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/comunicaciones/informes' }),
  schema: z.object({
    semana: z.number().int().min(1).max(30),
    fecha_envio: fecha,
    elaborado_por: z.string(),
    evidencia,
    ...registros,
  }),
});

const nota = z.number().int().min(1).max(5);

const gates = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/comunicaciones/gates' }),
  schema: z.object({
    gate: z.number().int().min(1).max(3),
    fecha,
    decision: z.enum(['aprobado', 'aprobado-con-pendientes', 'observado']),
    asistencia: z.object({ requeridos: z.array(z.string()).min(1), presentes: z.array(z.string()) }),
    encuesta: z.array(z.object({ claridad: nota, utilidad: nota, oportunidad: nota })).default([]),
    evidencia,
    ...registros,
  }),
});

export const collections = { informes, gates };
