<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { CLUSTERS, GRUPOS, MAPA, NODO, PANELES, TRAZOS, partir, vecinos } from '../data/mapa';
import {
  DOMINIOS, ESTADOS, NOMBRE_AREA, NOMBRE_DOMINIO, PROCESOS, procesoPorId,
} from '../data/procesos';
import { hayFiltro, hidratar, ui, visible } from '../stores/ui';
import StatusIcon from './status-icon.vue';

const zooms = [
  { valor: 'fit', texto: 'Ajustar' },
  { valor: 1, texto: '100 %' },
  { valor: 1.3, texto: '130 %' },
] as const;

const zoom = ref<'fit' | number>('fit');
const enfocado = ref<string | null>(null);
// Proceso indicado en la URL (/mapa#1.4); se mantiene resaltado al quitar el cursor
const fijado = ref<string | null>(null);
const nodos = ref<Record<string, SVGGElement>>({});

const filtrando = computed(() => hayFiltro());
const cercanos = computed(() => (enfocado.value ? vecinos(enfocado.value) : new Set<string>()));
const seleccionado = computed(() => (enfocado.value ? procesoPorId(enfocado.value) : undefined));

const lineasNodo = (nombre: string) => partir(nombre, Math.floor((NODO.w - 14) / 6.6));
const interlineado = (n: number) => (n > 2 ? 11.5 : 13);
const y0 = (n: number) => 18 + (NODO.h - 18) / 2 - ((n - 1) * interlineado(n)) / 2 + 4;
const camino = (puntos: number[][]) => 'M' + puntos.map((p) => p.join(',')).join(' L');
const anchoPestana = (area: keyof typeof NOMBRE_AREA) => NOMBRE_AREA[area].length * 9.6 + 36;

onMounted(() => {
  hidratar();
  const id = decodeURIComponent(location.hash.slice(1));
  if (procesoPorId(id)) {
    fijado.value = enfocado.value = id;
    nodos.value[id]?.scrollIntoView({ block: 'center', inline: 'center' });
  }
});
</script>

<template>
  <div>
    <div class="maptools">
      <span class="small">
        {{ ui.filtro.length ? `Filtrando: ${ui.filtro.map((d) => NOMBRE_DOMINIO[d]).join(', ')}` : 'Mostrando todos los dominios' }}
      </span>
      <span class="sp"></span>
      <span class="seg" role="group" aria-label="Zoom">
        <button
          v-for="z in zooms"
          :key="z.valor"
          type="button"
          :class="{ on: zoom === z.valor }"
          @click="zoom = z.valor"
        >
          {{ z.texto }}
        </button>
      </span>
      <button type="button" class="btn-ghost" @click="ui.indiceOculto = !ui.indiceOculto">
        {{ ui.indiceOculto ? 'Mostrar índice' : 'Ocultar índice' }}
      </button>
    </div>

    <div class="info">
      <template v-if="seleccionado">
        <span class="num-chip" :style="{ '--c': `var(--d-${seleccionado.dominio})`, '--o': `var(--o-${seleccionado.dominio})` }">
          {{ seleccionado.id }}
        </span>
        <b>{{ seleccionado.nombre }}</b>
        <span class="tag">{{ NOMBRE_AREA[seleccionado.area] }}</span>
        <span class="badge"><StatusIcon :estado="seleccionado.estado" :size="11" />{{ ESTADOS[seleccionado.estado] }}</span>
        <a class="btn-sm" :href="`/proceso/${seleccionado.id}`">Abrir página →</a>
      </template>
      <span v-else class="muted">Pasa el cursor sobre un proceso para resaltar sus conexiones. Haz clic para abrir su página.</span>
    </div>

    <div class="mapwrap">
      <svg
        :viewBox="`0 0 ${MAPA.w} ${MAPA.h}`"
        :width="zoom === 'fit' ? '100%' : MAPA.w * zoom"
        :style="zoom === 'fit' ? { maxWidth: '1400px' } : undefined"
        :class="{ focus: enfocado, filtering: filtrando }"
        role="img"
        aria-label="Flujo de procesos de Ejecución, Monitoreo y Control, y Cierre"
      >
        <defs>
          <marker
            v-for="d in DOMINIOS"
            :id="`m-${d.id}`"
            :key="d.id"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerUnits="userSpaceOnUse"
            markerWidth="9"
            markerHeight="9"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" :fill="`var(--d-${d.id})`" />
          </marker>
        </defs>

        <g v-for="pn in PANELES" :key="pn.area">
          <rect class="panel" :x="pn.x" :y="pn.y" :width="pn.w" :height="pn.h" rx="8" />
          <path
            class="tabr"
            :d="`M${pn.x + pn.w / 2 - anchoPestana(pn.area) / 2},${pn.y} H${pn.x + pn.w / 2 + anchoPestana(pn.area) / 2} l-8,22 H${pn.x + pn.w / 2 - anchoPestana(pn.area) / 2 + 8} Z`"
          />
          <text class="tabt" :x="pn.x + pn.w / 2" :y="pn.y + 15.5" text-anchor="middle">
            {{ NOMBRE_AREA[pn.area].toUpperCase() }}
          </text>
        </g>

        <rect
          v-for="(c, i) in CLUSTERS"
          :key="`c${i}`"
          class="clu"
          :style="{ '--c': `var(--d-${c[0]})` }"
          :x="c[1]" :y="c[2]" :width="c[3]" :height="c[4]"
          rx="6"
        />
        <rect v-for="(g, i) in GRUPOS" :key="`g${i}`" class="grp" :x="g[0]" :y="g[1]" :width="g[2]" :height="g[3]" rx="6" />

        <polygon class="chev" points="546,288 564,302 546,316" />
        <polygon class="chev" points="564,630 546,644 564,658" />

        <path
          v-for="(t, i) in TRAZOS"
          :key="`t${i}`"
          class="edge"
          :class="{ hl: enfocado && t.procesos.includes(enfocado) }"
          :style="{ '--c': `var(--d-${t.dominio})` }"
          :marker-start="`url(#m-${t.dominio})`"
          :marker-end="`url(#m-${t.dominio})`"
          :d="camino(t.puntos)"
        />

        <a v-for="p in PROCESOS" :key="p.id" :href="`/proceso/${p.id}`" :aria-label="`${p.id} ${p.nombre}`">
          <g
            class="node"
            :class="[
              p.estado,
              {
                off: !visible(p),
                hl: enfocado === p.id,
                sel: enfocado === p.id,
                nbr: cercanos.has(p.id),
              },
            ]"
            :style="{ '--c': `var(--d-${p.dominio})`, '--o': `var(--o-${p.dominio})` }"
            :transform="`translate(${p.x},${p.y})`"
            :ref="(el) => { if (el) nodos[p.id] = el as SVGGElement }"
            @mouseenter="enfocado = p.id"
            @mouseleave="enfocado = fijado"
            @focusin="enfocado = p.id"
            @focusout="enfocado = fijado"
          >
            <title>{{ p.id }} {{ p.nombre }} · {{ NOMBRE_DOMINIO[p.dominio] }} · {{ ESTADOS[p.estado] }}</title>
            <rect class="nb" :width="NODO.w" :height="NODO.h" rx="4" />
            <path class="hd" :d="`M0,18 V4 a4,4 0 0 1 4,-4 H${NODO.w - 4} a4,4 0 0 1 4,4 V18 Z`" />
            <path class="nc" d="M0,18 V4 a4,4 0 0 1 4,-4 H32 V18 Z" />
            <text class="nn" x="16" y="12.8" text-anchor="middle">{{ p.id }}</text>
            <text class="lb" :x="(32 + NODO.w) / 2" y="12.8" text-anchor="middle">{{ NOMBRE_DOMINIO[p.dominio].toUpperCase() }}</text>
            <text class="nm" text-anchor="middle">
              <tspan
                v-for="(l, i) in lineasNodo(p.nombre)"
                :key="i"
                :x="NODO.w / 2"
                :y="y0(lineasNodo(p.nombre).length) + i * interlineado(lineasNodo(p.nombre).length)"
              >{{ l }}</tspan>
            </text>
            <StatusIcon :estado="p.estado" :size="10" :x="NODO.w - 14" :y="NODO.h - 14" :style="{ color: `var(--d-${p.dominio})` }" />
          </g>
        </a>
      </svg>
    </div>

    <div class="legend">
      <span v-for="d in DOMINIOS" :key="d.id"><i :style="{ '--c': `var(--d-${d.id})` }"></i>{{ d.nombre }}</span>
      <span v-for="(texto, estado, i) in ESTADOS" :key="estado" :style="i === 0 ? { marginLeft: 'auto' } : undefined">
        <StatusIcon :estado="estado" style="color: var(--text)" />{{ texto }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.small {
  font-size: 13px;
  color: var(--muted);
}

.muted {
  color: var(--muted);
}

.maptools {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin: 12px 0;
}

.sp {
  flex: 1;
}

.seg {
  display: inline-flex;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
}

.seg button {
  border: 0;
  background: none;
  padding: 5px 11px;
  font-size: 13px;
  border-right: 1px solid var(--line);
}

.seg button:last-child {
  border-right: 0;
}

.seg button.on {
  background: var(--text);
  color: var(--bg);
}

.btn-ghost,
.btn-sm {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
}

.btn-sm {
  margin-left: auto;
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.btn-sm:hover {
  text-decoration: none;
  opacity: .88;
}

.info {
  min-height: 48px;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--line);
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.num-chip {
  font-size: 12px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--c);
  color: var(--o);
  font-variant-numeric: tabular-nums;
}

.tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--muted);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: .03em;
  white-space: nowrap;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
}

.mapwrap {
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}

.mapwrap svg {
  margin: 0 auto;
  max-width: none;
}

.legend {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--muted);
  margin-top: 10px;
  align-items: center;
}

.legend span {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}

.legend i {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: var(--c);
}

.panel {
  fill: var(--surface2);
  stroke: var(--line);
  stroke-width: 1.2;
}

.tabr {
  fill: var(--tab);
}

.tabt {
  fill: var(--tabtext);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .08em;
}

.clu {
  fill: none;
  stroke: var(--c);
  stroke-dasharray: 3 3;
  stroke-width: 1.2;
  opacity: .8;
}

.grp {
  fill: none;
  stroke: var(--d-gob);
  stroke-dasharray: 3 3;
  stroke-width: 1.2;
}

.edge {
  fill: none;
  stroke: var(--c);
  stroke-width: 1.8;
  transition: opacity .15s;
}

.edge.hl {
  stroke-width: 3;
}

.chev {
  fill: var(--tab);
  opacity: .7;
}

.node {
  cursor: pointer;
  transition: opacity .15s;
}

.node .nb {
  fill: color-mix(in srgb, var(--c) 7%, var(--surface));
  stroke: var(--c);
  stroke-width: 1.3;
}

.node .hd {
  fill: var(--c);
}

.node .nc {
  fill: #000;
  opacity: .22;
}

.node .lb {
  fill: var(--o);
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: .08em;
}

.node .nn {
  fill: var(--o);
  font-size: 10px;
  font-weight: 800;
}

.node .nm {
  fill: var(--text);
  font-size: 11px;
  font-weight: 700;
}

.node.pen .nm {
  fill: var(--muted);
  font-weight: 600;
}

.node:hover .nb,
.node.sel .nb {
  stroke-width: 3;
}

a:focus-visible {
  outline: none;
}

a:focus-visible .nb {
  stroke-width: 3;
}

svg.focus .node:not(.hl):not(.nbr) {
  opacity: .22;
}

svg.focus .edge:not(.hl) {
  opacity: .15;
}

svg .node.off {
  opacity: .15;
}

svg.filtering .edge {
  opacity: .35;
}

svg.focus .node.hl {
  opacity: 1;
}
</style>
