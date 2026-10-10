<script setup lang="ts">
import { formatearFecha } from '../../data/fechas';
import { FECHA_CORTE } from '../../data/monitoreo-interesados';
import { cambiarValidacion, datos, diasEntre, interesadoPorId } from '../../stores/monitoreo';

const TONO = { pendiente: '', aprobada: 'ok', observada: 'bad' };
const TEXTO = { pendiente: 'Pendiente', aprobada: 'Aprobada', observada: 'Observada' };
</script>

<template>
  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Validaciones por gate</h2>
        <p>Pulsa una validación para alternar entre pendiente, aprobada y observada.</p>
      </div>
    </div>

    <div class="gates">
      <article v-for="g in datos.gates" :key="g.id" class="gate">
        <div class="cab">
          <strong>{{ g.id }} · {{ g.fase }}</strong>
          <span class="muted num">
            {{ formatearFecha(g.fecha) }}
            <template v-if="g.fecha >= FECHA_CORTE"> · en {{ diasEntre(FECHA_CORTE, g.fecha) }} días</template>
          </span>
        </div>
        <p class="criterio">{{ g.criterio }}</p>
        <ul>
          <li v-for="v in g.validaciones" :key="v.interesado">
            <button type="button" class="val" @click="cambiarValidacion(g.id, v.interesado)">
              <span>{{ interesadoPorId(v.interesado)?.nombre }}</span>
              <span class="pill" :class="TONO[v.estado]">{{ TEXTO[v.estado] }}</span>
            </button>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.gates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.gate {
  padding: 12px;
  border: 1px solid var(--line);
  border-top: 3px solid var(--d-int);
  border-radius: 10px;
  background: var(--surface2);
}

.cab {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.criterio {
  margin: 6px 0 8px;
  font-size: 13px;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.val {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 40px;
  padding: 4px 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: none;
  color: var(--text);
  font: inherit;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.val:hover {
  border-color: var(--line);
  background: var(--surface);
}
</style>
