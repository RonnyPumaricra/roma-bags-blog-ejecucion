import ok from './estado-ok.svg?raw';
import cur from './estado-cur.svg?raw';
import pen from './estado-pen.svg?raw';

// Contenido interno de cada <svg>, para dibujarlo dentro de otro <svg> (ver status-icon.vue)
const interior = (svg: string) => svg.replace(/^[\s\S]*?<svg[^>]*>|<\/svg>\s*$/g, '');

export const iconosEstado = {
  ok: interior(ok),
  cur: interior(cur),
  pen: interior(pen),
};
