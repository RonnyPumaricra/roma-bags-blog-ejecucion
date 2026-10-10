<script setup lang="ts">
import { computed } from 'vue';
import { formatearFecha } from '../../data/fechas';
import { FECHA_CORTE, NIVELES, PRIORIDADES, type Nivel, type Prioridad } from '../../data/monitoreo-interesados';
import {
  actualizarNivel, brecha, datos, diasEntre, evaluacionDesactualizada, filtrarPrioridad, seleccionar, tendencia, vista,
} from '../../stores/monitoreo';

const filas = computed(() =>
  datos.interesados
    .filter((i) => !vista.prioridad || i.prioridad === vista.prioridad)
    .sort((a, b) => a.prioridad - b.prioridad),
);

const prioridades = Object.entries(PRIORIDADES).map(([p, texto]) => ({ p: Number(p) as Prioridad, texto }));

const flechas = { 1: '↑', 0: '=', '-1': '↓' } as Record<number, string>;
const textoTendencia = { 1: 'Mejora', 0: 'Sin cambio', '-1': 'Retrocede' } as Record<number, string>;
</script>

<template>
  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Matriz de evaluación de la participación</h2>
        <p>Nivel actual frente al deseado. Elige un interesado para ver su historial o cambia su nivel actual.</p>
      </div>
      <div class="filtros" role="group" aria-label="Filtrar por prioridad">
        <button
          v-for="{ p, texto } in prioridades"
          :key="p"
          type="button"
          class="chip"
          :aria-pressed="vista.prioridad === p"
          :title="texto"
          @click="filtrarPrioridad(p)"
        >
          P{{ p }} · {{ texto }}
        </button>
      </div>
    </div>

    <div class="table-wrap">
      <table class="matriz">
        <thead>
          <tr>
            <th>Interesado</th>
            <th>Prioridad</th>
            <th>Nivel actual</th>
            <th>Nivel deseado</th>
            <th>Brecha</th>
            <th>Última evaluación</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="i in filas"
            :key="i.id"
            :class="{ sel: vista.seleccionado === i.id }"
            :aria-selected="vista.seleccionado === i.id"
          >
            <td>
              <button type="button" class="nombre" @click="seleccionar(i.id)">
                <span class="codigo num">{{ i.id }}</span>
                <span>
                  <strong>{{ i.nombre }}</strong>
                  <span class="muted d">{{ i.detalle }}</span>
                </span>
              </button>
            </td>
            <td><span class="prio" :class="`p${i.prioridad}`">P{{ i.prioridad }}</span> <span class="muted">{{ i.estrategia }}</span></td>
            <td class="nivel">
              <select
                :value="i.nivelActual"
                :aria-label="`Nivel actual de ${i.nombre}`"
                @change="actualizarNivel(i.id, ($event.target as HTMLSelectElement).value as Nivel)"
              >
                <option v-for="n in NIVELES" :key="n" :value="n">{{ n }}</option>
              </select>
              <span v-if="tendencia(i)" class="tend" :class="`t${tendencia(i)}`" :title="textoTendencia[tendencia(i)]">
                {{ flechas[tendencia(i)] }}
              </span>
            </td>
            <td>{{ i.nivelDeseado }}</td>
            <td>
              <div class="escala" :aria-label="brecha(i) > 0 ? `Faltan ${brecha(i)} niveles` : 'En el nivel deseado'">
                <i
                  v-for="(n, k) in NIVELES"
                  :key="n"
                  :class="{
                    actual: k === NIVELES.indexOf(i.nivelActual),
                    deseado: k === NIVELES.indexOf(i.nivelDeseado),
                    tramo: k > NIVELES.indexOf(i.nivelActual) && k <= NIVELES.indexOf(i.nivelDeseado),
                  }"
                ></i>
              </div>
              <span class="muted">{{ brecha(i) > 0 ? `Faltan ${brecha(i)}` : brecha(i) < 0 ? 'Supera lo deseado' : 'En nivel' }}</span>
            </td>
            <td>
              <div class="num">{{ formatearFecha(i.ultimaEvaluacion) }}</div>
              <span v-if="evaluacionDesactualizada(i)" class="pill warn">
                Hace {{ diasEntre(i.ultimaEvaluacion, FECHA_CORTE) }} días
              </span>
              <span v-else class="muted">Hace {{ diasEntre(i.ultimaEvaluacion, FECHA_CORTE) }} días</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--d-int) 14%, var(--surface));
  border-color: var(--d-int);
  color: var(--text);
}

.matriz {
  min-width: 720px;
}

tr.sel td {
  background: color-mix(in srgb, var(--d-int) 8%, var(--surface));
}

.nombre {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-height: 40px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.nombre:hover strong {
  color: var(--d-int);
  text-decoration: underline;
}

.codigo {
  flex: none;
  min-width: 46px;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  background: color-mix(in srgb, var(--d-int) 14%, var(--surface));
  color: var(--d-int);
}

.d {
  display: block;
}

.prio {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 800;
  border: 1px solid var(--line);
}

.prio.p1 {
  background: var(--d-int);
  border-color: var(--d-int);
  color: var(--o-int);
}

.nivel {
  white-space: nowrap;
}

.tend {
  margin-left: 6px;
  font-weight: 800;
  color: var(--muted);
}

.tend.t1 { color: var(--ok); }
.tend.t-1 { color: var(--bad); }

.escala {
  display: flex;
  gap: 3px;
  margin-bottom: 2px;
}

.escala i {
  width: 16px;
  height: 8px;
  border-radius: 2px;
  background: var(--line);
}

.escala i.tramo {
  background: color-mix(in srgb, var(--warn) 45%, var(--surface));
}

.escala i.deseado {
  outline: 2px solid var(--d-int);
  outline-offset: 1px;
}

.escala i.actual {
  background: var(--d-int);
}
</style>
