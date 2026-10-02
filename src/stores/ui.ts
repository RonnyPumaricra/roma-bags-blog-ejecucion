import { reactive } from 'vue';
import type { DominioId } from '../data/procesos';

const CLAVE = 'blog-roma-bags:ui';

// Estado compartido entre las islas de Vue de una misma página.
// El filtro y los grupos abiertos del índice se recuerdan entre páginas.
export const ui = reactive({
  filtro: [] as DominioId[],
  ocultarPendientes: false,
  /** Grupos desplegados en el índice: áreas de foco y líneas base */
  abiertos: ['eje', 'mon', 'cie'] as string[],
  menuAbierto: false,
  indiceOculto: false,
});

export function hidratar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
    if (guardado) {
      ui.filtro = guardado.filtro ?? [];
      ui.ocultarPendientes = !!guardado.ocultarPendientes;
      ui.abiertos = guardado.abiertos ?? ui.abiertos;
    }
  } catch {}
}

function guardar() {
  try {
    const { filtro, ocultarPendientes, abiertos } = ui;
    localStorage.setItem(CLAVE, JSON.stringify({ filtro, ocultarPendientes, abiertos }));
  } catch {}
}

export const hayFiltro = () => ui.filtro.length > 0 || ui.ocultarPendientes;

export function alternarDominio(id: DominioId) {
  const i = ui.filtro.indexOf(id);
  if (i < 0) ui.filtro.push(id);
  else ui.filtro.splice(i, 1);
  guardar();
}

export function limpiarFiltros() {
  ui.filtro = [];
  ui.ocultarPendientes = false;
  guardar();
}

export function ocultarPendientes(valor: boolean) {
  ui.ocultarPendientes = valor;
  guardar();
}

export function abrirGrupo(id: string, abierto: boolean) {
  const i = ui.abiertos.indexOf(id);
  if (abierto && i < 0) ui.abiertos.push(id);
  if (!abierto && i >= 0) ui.abiertos.splice(i, 1);
  guardar();
}

export function visible(p: { dominio: DominioId; estado: string }) {
  return (!ui.filtro.length || ui.filtro.includes(p.dominio)) && (!ui.ocultarPendientes || p.estado !== 'pen');
}
