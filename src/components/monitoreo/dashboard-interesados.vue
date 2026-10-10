<script setup lang="ts">
import { computed } from 'vue';
import { formatearFecha } from '../../data/fechas';
import { FECHA_CORTE } from '../../data/monitoreo-interesados';
import { proximoGate, reiniciar, temporadaAlta } from '../../stores/monitoreo';
import './monitoreo.css';
import Gates from './gates.vue';
import Historial from './historial.vue';
import Kpis from './kpis.vue';
import MatrizParticipacion from './matriz-participacion.vue';
import ObjecionesSocio from './objeciones-socio.vue';
import ResultadosRiesgos from './resultados-riesgos.vue';
import SeguimientoPlan from './seguimiento-plan.vue';

const fase = computed(() => proximoGate()?.fase ?? 'Cierre');
</script>

<template>
  <div class="monitoreo">
    <div class="barra">
      <div class="etiquetas">
        <span class="pill info">Fase {{ fase }}</span>
        <span v-if="temporadaAlta()" class="pill warn">Temporada alta (sep–ene)</span>
        <span class="muted">Corte: {{ formatearFecha(FECHA_CORTE) }} · datos de ejemplo</span>
      </div>
      <button type="button" class="btn sec" @click="reiniciar">Restablecer datos</button>
    </div>
    <p class="aviso">
      Los cambios que hagas (acciones, niveles, objeciones, validaciones) se mantienen solo mientras la página esté
      abierta; al recargar se vuelve al estado inicial.
    </p>

    <Kpis />
    <MatrizParticipacion />
    <Historial />
    <SeguimientoPlan />
    <Gates />
    <ObjecionesSocio />
    <ResultadosRiesgos />
  </div>
</template>

<style scoped>
.barra {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.etiquetas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.aviso {
  margin: -6px 0 0;
  font-size: 13px;
  color: var(--muted);
}
</style>
