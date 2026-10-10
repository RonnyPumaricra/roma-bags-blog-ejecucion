<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { formatearFecha } from '../../data/fechas';
import { CANALES, FECHA_CORTE, NIVELES, TIPOS_ACCION, type Nivel, type TipoAccion } from '../../data/monitoreo-interesados';
import {
  accionDe, asistencia, estadoAccion, historialDe, interesadoPorId, registrarAccion, ultimaRealizada, vista,
} from '../../stores/monitoreo';

const interesado = computed(() => interesadoPorId(vista.seleccionado));
const accion = computed(() => accionDe(vista.seleccionado));
const estado = computed(() => accion.value && estadoAccion(accion.value));
const registros = computed(() => historialDe(vista.seleccionado));

const TONO = { 'al-dia': 'ok', 'por-vencer': 'warn', vencida: 'bad', evento: 'info', 'sin-definir': '' };

const dialogo = ref<HTMLDialogElement>();
const nuevo = reactive({
  fecha: FECHA_CORTE,
  tipo: 'Reunión' as TipoAccion,
  canal: CANALES[0] as string,
  asistio: true,
  nivelObservado: '' as Nivel | '',
  acuerdos: '',
});

function abrir() {
  Object.assign(nuevo, { fecha: FECHA_CORTE, tipo: 'Reunión', canal: CANALES[0], asistio: true, nivelObservado: '', acuerdos: '' });
  dialogo.value?.showModal();
}

function guardar() {
  registrarAccion({
    ...nuevo,
    interesado: vista.seleccionado,
    nivelObservado: nuevo.nivelObservado || null,
    acuerdos: nuevo.acuerdos.trim(),
  });
  dialogo.value?.close();
}
</script>

<template>
  <section v-if="interesado" class="panel">
    <div class="panel-h">
      <div>
        <h2>Historial de acciones</h2>
        <p>{{ interesado.id }} · {{ interesado.nombre }} · asistencia {{ asistencia(interesado.id) ?? '—' }}{{ asistencia(interesado.id) === null ? '' : ' %' }}</p>
      </div>
      <button type="button" class="btn" @click="abrir">Registrar acción</button>
    </div>

    <div v-if="accion" class="plan">
      <span><strong>Plan:</strong> {{ accion.accion }} · {{ accion.frecuencia?.texto ?? 'Frecuencia sin definir' }}</span>
      <span v-if="estado && 'proxima' in estado" class="num">Próxima: {{ formatearFecha(estado.proxima) }}</span>
      <span v-if="estado" class="pill" :class="TONO[estado.tipo]">{{ estado.texto }}</span>
    </div>

    <ol v-if="registros.length" class="lista">
      <li v-for="r in registros" :key="r.id">
        <div class="fecha num">{{ formatearFecha(r.fecha) }}</div>
        <div>
          <div class="tit">
            {{ r.tipo }} <span class="muted">· {{ r.canal }}</span>
            <span v-if="!r.asistio" class="pill bad">No asistió</span>
            <span v-else-if="r.nivelObservado" class="pill info">{{ r.nivelObservado }}</span>
          </div>
          <div class="muted">{{ r.acuerdos || 'Sin acuerdos registrados.' }}</div>
        </div>
      </li>
    </ol>
    <p v-else class="muted">Sin acciones registradas para este interesado.</p>
    <p v-if="registros.length && !ultimaRealizada(interesado.id)" class="muted">Aún no participa en ninguna acción.</p>

    <dialog ref="dialogo" :aria-label="`Registrar acción con ${interesado.nombre}`">
      <form method="dialog" @submit.prevent="guardar">
        <h3>Registrar acción · {{ interesado.nombre }}</h3>
        <div class="campos">
          <label>Fecha <input v-model="nuevo.fecha" type="date" required /></label>
          <label>
            Tipo
            <select v-model="nuevo.tipo"><option v-for="t in TIPOS_ACCION" :key="t">{{ t }}</option></select>
          </label>
          <label>
            Canal
            <select v-model="nuevo.canal"><option v-for="c in CANALES" :key="c">{{ c }}</option></select>
          </label>
          <label class="check"><input v-model="nuevo.asistio" type="checkbox" /> El interesado participó</label>
          <label>
            Nivel observado
            <select v-model="nuevo.nivelObservado" :disabled="!nuevo.asistio">
              <option value="">Sin evaluar</option>
              <option v-for="n in NIVELES" :key="n" :value="n">{{ n }}</option>
            </select>
          </label>
          <label>Acuerdos u observaciones <textarea v-model="nuevo.acuerdos" rows="3"></textarea></label>
        </div>
        <div class="acciones-dialog">
          <button type="button" class="btn sec" @click="dialogo?.close()">Cancelar</button>
          <button type="submit" class="btn">Guardar</button>
        </div>
      </form>
    </dialog>
  </section>
</template>

<style scoped>
.plan {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--surface2);
  border: 1px solid var(--line);
  font-size: 13px;
  color: var(--muted);
}

.plan strong {
  color: var(--text);
}

.lista {
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.lista li {
  display: flex;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
}

.lista li:last-child {
  border-bottom: 0;
}

.fecha {
  flex: 0 0 92px;
  font-size: 13px;
  color: var(--muted);
}

.tit {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  font-weight: 600;
}

.tit .muted {
  font-weight: 400;
}
</style>
