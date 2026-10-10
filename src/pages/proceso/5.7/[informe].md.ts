import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { slugGate, slugSemana } from '../../../data/monitoreo-comunicaciones';

// Sirve el .md original (con frontmatter) para el botón «Descargar .md» del dashboard 5.7
export const getStaticPaths = (async () => {
  const informes = (await getCollection('informes')).map((e) => ({ slug: slugSemana(e.data.semana), archivo: e.filePath! }));
  const gates = (await getCollection('gates')).map((e) => ({ slug: slugGate(e.data.gate), archivo: e.filePath! }));
  return [...informes, ...gates].map(({ slug, archivo }) => ({ params: { informe: slug }, props: { archivo } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await readFile(props.archivo, 'utf8'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
