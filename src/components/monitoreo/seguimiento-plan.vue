<script setup lang="ts">
import { computed } from 'vue';
import { formatearFecha } from '../../data/fechas';
import { datos, estadoAccion, interesadoPorId, seleccionar, ultimaRealizada, vista } from '../../stores/monitoreo';

const TONO = { 'al-dia': 'ok', 'por-vencer': 'warn', vencida: 'bad', evento: 'info', 'sin-definir': '' };

const filas = computed(() =>
  datos.plan.map((a) => ({
    ...a,
    nombre: interesadoPorId(a.interesado)?.nombre ?? a.interesado,
    ultima: ultimaRealizada(a.interesado),
    estado: estadoAccion(a),
  })),
);

const vencidas = computed(() => filas.value.filter((f) => f.estado.tipo === 'vencida').length);
</script>

<template>
  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Seguimiento del plan de acción</h2>
        <p>
          Acciones del plan 3.2. Las de frecuencia por evento muestran su próximo disparador.
          <strong v-if="vencidas" class="alerta">{{ vencidas }} vencida{{ vencidas > 1 ? 's' : '' }}.</strong>
        </p>
      </div>
    </div>

    <div class="table-wrap">
      <table class="seguimiento">
        <thead>
          <tr>
            <th>Interesado</th>
            <th>Acción y canal</th>
            <th>Frecuencia</th>
            <th>Responsable</th>
            <th>Última realizada</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in filas" :key="f.interesado" :class="{ sel: vista.seleccionado === f.interesado }">
            <td>
              <button type="button" class="link" @click="seleccionar(f.interesado)">{{ f.nombre }}</button>
            </td>
            <td>
              {{ f.accion }}
              <div class="muted">{{ f.canal }}</div>
              <div class="muted ev">Evidencia: {{ f.evidencia }}</div>
            </td>
            <td>
              <span v-if="f.frecuencia">{{ f.frecuencia.texto }}</span>
              <span v-else class="pill">Sin definir</span>
            </td>
            <td>
              <span v-if="f.responsable">{{ f.responsable }}</span>
              <span v-else class="pill">Sin definir</span>
            </td>
            <td class="num">{{ f.ultima ? formatearFecha(f.ultima) : '—' }}</td>
            <td>
              <span class="pill" :class="TONO[f.estado.tipo]">{{ f.estado.texto }}</span>
              <div v-if="'proxima' in f.estado" class="muted num">Próxima: {{ formatearFecha(f.estado.proxima) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.seguimiento {
  min-width: 760px;
}

.seguimiento td:nth-child(2) {
  min-width: 240px;
}

.seguimiento td:last-child {
  min-width: 150px;
}

.seguimiento td:last-child .pill {
  white-space: normal;
}

.ev {
  margin-top: 4px;
  font-style: italic;
}

.alerta {
  color: color-mix(in srgb, var(--bad) 75%, var(--text));
}

tr.sel td {
  background: color-mix(in srgb, var(--d-int) 8%, var(--surface));
}

.link {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-weight: 700;
  color: var(--text);
  text-align: left;
  cursor: pointer;
}

.link:hover {
  color: var(--d-int);
  text-decoration: underline;
}
</style>
