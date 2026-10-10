<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { LINEAS_BASE } from '../data/lineas-base';
import { PLANES_DIRECCION } from '../data/plan-direccion';
import {
  AREAS, DOMINIOS, PROCESOS, procesoPorId,
  type AreaId,
} from '../data/procesos';
import { abrirGrupo, alternarDominio, hayFiltro, hidratar, limpiarFiltros, ocultarPendientes, ui, visible } from '../stores/ui';
import StatusIcon from './status-icon.vue';

const props = defineProps<{ actual: string }>();

const ruta = computed(() => props.actual.replace(/\/$/, '') || '/');
const procesoActual = computed(() => procesoPorId(ruta.value.replace(/^\/proceso\//, '')));

const enlaces = [
  { href: '/', texto: 'Inicio' },
  { href: '/mapa', texto: 'Mapa de procesos' },
];

const enLineasBase = computed(() => ruta.value.startsWith('/lineas-base'));
const lineasBaseAbiertas = computed(() => enLineasBase.value || ui.abiertos.includes('lineas-base'));

const enPlanDireccion = computed(() => ruta.value.startsWith('/plan-direccion'));
const planDireccionAbierto = computed(() => enPlanDireccion.value || ui.abiertos.includes('plan-direccion'));

const filtrando = computed(() => hayFiltro());

const contar = (dominio: string) =>
  PROCESOS.filter((p) => p.dominio === dominio && (!ui.ocultarPendientes || p.estado !== 'pen')).length;

const areas = computed(() =>
  AREAS.map((a) => {
    const todos = PROCESOS.filter((p) => p.area === a.id);
    const visibles = todos.filter(visible);
    const completados = visibles.filter((p) => p.estado === 'ok').length;
    return {
      ...a,
      todos,
      visibles,
      resumen: filtrando.value ? `${visibles.length} de ${todos.length}` : `${completados}/${todos.length}`,
      abierta:
        visibles.length > 0 &&
        (filtrando.value || ui.abiertos.includes(a.id) || procesoActual.value?.area === a.id),
    };
  }),
);

function alAlternar(id: AreaId, e: Event) {
  // Al filtrar las áreas se fuerzan abiertas; eso no debe quedar como preferencia
  if (!filtrando.value) abrirGrupo(id, (e.target as HTMLDetailsElement).open);
}

onMounted(hidratar);
</script>

<template>
  <aside :class="{ filtrando: ui.filtro.length > 0, abierto: ui.menuAbierto, oculto: ui.indiceOculto }">
    <nav class="snav">
      <a v-for="e in enlaces" :key="e.href" :href="e.href" :class="{ on: ruta === e.href }">{{ e.texto }}</a>
      <details
        class="area"
        :open="lineasBaseAbiertas"
        @toggle="abrirGrupo('lineas-base', ($event.target as HTMLDetailsElement).open)"
      >
        <summary :class="{ on: ruta === '/lineas-base' }">
          <a href="/lineas-base">Líneas base</a>
          <span class="badge-lock">Congeladas</span>
        </summary>
        <a
          v-for="l in LINEAS_BASE"
          :key="l.id"
          class="ti"
          :class="{ on: ruta === `/lineas-base/${l.id}` }"
          :style="{ '--c': `var(--d-${l.dominio})` }"
          :href="`/lineas-base/${l.id}`"
        >
          <i class="bar"></i>
          <span class="nm">{{ l.nombre }}</span>
        </a>
      </details>
      <details
        class="area"
        :open="planDireccionAbierto"
        @toggle="abrirGrupo('plan-direccion', ($event.target as HTMLDetailsElement).open)"
      >
        <summary>Plan de dirección</summary>
        <a
          v-for="p in PLANES_DIRECCION"
          :key="p.id"
          class="ti"
          :class="{ on: ruta === `/plan-direccion/${p.id}` }"
          :style="{ '--c': `var(--d-${p.dominio})` }"
          :href="`/plan-direccion/${p.id}`"
        >
          <i class="bar"></i>
          <span class="nm">{{ p.nombre }}</span>
        </a>
      </details>
    </nav>

    <div class="sec">
      <div class="sec-h">
        Filtrar por dominio
        <button v-if="filtrando" type="button" class="link" @click="limpiarFiltros">Limpiar</button>
      </div>
      <div class="dchips">
        <button
          v-for="d in DOMINIOS"
          :key="d.id"
          type="button"
          class="dchip"
          :class="{ on: ui.filtro.includes(d.id) }"
          :style="{ '--c': `var(--d-${d.id})` }"
          :aria-pressed="ui.filtro.includes(d.id)"
          @click="alternarDominio(d.id)"
        >
          <i></i>{{ d.nombre }}<span>{{ contar(d.id) }}</span>
        </button>
      </div>
      <label class="tog">
        <input type="checkbox" :checked="ui.ocultarPendientes" @change="ocultarPendientes(($event.target as HTMLInputElement).checked)" />
        Ocultar procesos pendientes
      </label>
    </div>

    <div class="sec">
      <div class="sec-h">Procesos por área de foco</div>
      <details
        v-for="a in areas"
        :key="a.id"
        class="area"
        :class="{ empty: !a.visibles.length }"
        :open="a.abierta"
        @toggle="alAlternar(a.id, $event)"
      >
        <summary>{{ a.nombre }}<small>{{ a.resumen }}</small></summary>
        <a
          v-for="p in a.visibles"
          :key="p.id"
          class="ti"
          :class="[p.estado, { on: procesoActual?.id === p.id }]"
          :style="{ '--c': `var(--d-${p.dominio})` }"
          :href="`/proceso/${p.id}`"
        >
          <i class="bar"></i>
          <span class="num">{{ p.id }}</span>
          <span class="nm">{{ p.nombre }}</span>
          <StatusIcon :estado="p.estado" :style="{ color: `var(--d-${p.dominio})` }" />
        </a>
      </details>
    </div>
  </aside>
</template>

<style scoped>
aside {
  flex: 0 0 300px;
  align-self: flex-start;
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  overflow: auto;
  background: var(--surface);
  border-right: 1px solid var(--line);
  padding: 14px 12px 30px;
  font-size: 14px;
}

aside.oculto {
  display: none;
}

.snav > a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 8px;
  color: var(--text);
  font-weight: 600;
}

.snav > a:hover {
  background: var(--bg);
  text-decoration: none;
}

.snav > a.on,
.snav summary.on {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.snav .area summary {
  padding-left: 10px;
  font-weight: 600;
}

.snav summary a {
  flex: 1;
  color: var(--text);
  font-weight: 600;
}

.badge-lock {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: .03em;
  background: color-mix(in srgb, var(--accent) 13%, transparent);
  color: var(--accent);
}

.sec {
  margin: 14px 0 6px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.sec-h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted);
  margin: 0 4px 8px;
}

.link {
  border: 0;
  background: none;
  color: var(--accent);
  font-size: 12px;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 600;
  padding: 0;
}

.dchips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.dchip {
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 8px;
  padding: 5px 8px;
  font-size: 13px;
  text-align: left;
}

.dchip i {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--c);
  flex: none;
}

.dchip span {
  margin-left: auto;
  font-size: 11px;
  color: var(--muted);
}

.dchip:hover {
  border-color: var(--c);
}

.dchip.on {
  background: color-mix(in srgb, var(--c) 15%, var(--surface));
  border-color: var(--c);
  font-weight: 600;
}

.filtrando .dchip:not(.on) {
  opacity: .6;
}

.tog {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 4px 0;
  font-size: 13px;
  color: var(--muted);
  cursor: pointer;
}

.area {
  margin-bottom: 2px;
}

.area summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 8px;
  font-weight: 700;
}

.area summary::-webkit-details-marker {
  display: none;
}

.area summary::before {
  content: "›";
  display: inline-block;
  width: 10px;
  color: var(--muted);
  transition: transform .15s;
}

.area[open] summary::before {
  transform: rotate(90deg);
}

.area summary:hover {
  background: var(--bg);
}

.area summary small {
  margin-left: auto;
  color: var(--muted);
  font-weight: 500;
  font-size: 12px;
}

.area.empty summary {
  color: var(--muted);
  font-weight: 500;
}

.ti {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 5px 8px 5px 22px;
  border-radius: 7px;
  color: var(--text);
  line-height: 1.35;
  position: relative;
}

.ti:hover {
  background: var(--bg);
  text-decoration: none;
}

.ti.on {
  background: color-mix(in srgb, var(--c) 14%, transparent);
}

.ti .bar {
  position: absolute;
  left: 12px;
  top: 6px;
  bottom: 6px;
  width: 3px;
  border-radius: 2px;
  background: var(--c);
}

.ti .num {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  min-width: 24px;
  padding-top: 1px;
  font-variant-numeric: tabular-nums;
}

.ti .nm {
  flex: 1;
}

.ti.pen .nm {
  color: var(--muted);
}

.ti svg {
  flex: none;
  margin-top: 3px;
}

@media (max-width: 860px) {
  aside {
    display: none;
    position: fixed;
    inset: 56px 0 0 0;
    height: auto;
    z-index: 15;
    border-right: 0;
  }

  aside.abierto {
    display: block;
  }
}
</style>
