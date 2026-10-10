<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { formatearFecha } from '../../data/fechas';
import { FECHA_CORTE } from '../../data/monitoreo-interesados';
import { agregarObjecion, datos, resolverObjecion } from '../../stores/monitoreo';

const ordenadas = computed(() => [...datos.objeciones].sort((a, b) => b.fecha.localeCompare(a.fecha)));

/** Objeciones por demostración, en orden cronológico, para ver si se reducen */
const porDemo = computed(() => {
  const grupos = new Map<string, { demo: string; fecha: string; total: number; abiertas: number }>();
  for (const o of datos.objeciones) {
    const g = grupos.get(o.demostracion) ?? { demo: o.demostracion, fecha: o.fecha, total: 0, abiertas: 0 };
    g.total++;
    if (!o.resuelta) g.abiertas++;
    if (o.fecha < g.fecha) g.fecha = o.fecha;
    grupos.set(o.demostracion, g);
  }
  return [...grupos.values()].sort((a, b) => a.fecha.localeCompare(b.fecha));
});

const maximo = computed(() => Math.max(1, ...porDemo.value.map((g) => g.total)));
const demos = computed(() => porDemo.value.map((g) => g.demo));

const dialogoNueva = ref<HTMLDialogElement>();
const nueva = reactive({ fecha: FECHA_CORTE, demostracion: '', descripcion: '' });

function abrirNueva() {
  Object.assign(nueva, { fecha: FECHA_CORTE, demostracion: demos.value.at(-1) ?? '', descripcion: '' });
  dialogoNueva.value?.showModal();
}

function guardarNueva() {
  agregarObjecion(nueva.demostracion.trim(), nueva.descripcion.trim(), nueva.fecha);
  dialogoNueva.value?.close();
}

const dialogoResolver = ref<HTMLDialogElement>();
const resolviendo = reactive({ id: '', descripcion: '', respuesta: '' });

function abrirResolver(id: string) {
  const o = datos.objeciones.find((x) => x.id === id)!;
  Object.assign(resolviendo, { id, descripcion: o.descripcion, respuesta: o.respuesta });
  dialogoResolver.value?.showModal();
}

function guardarResolucion() {
  resolverObjecion(resolviendo.id, resolviendo.respuesta.trim());
  dialogoResolver.value?.close();
}
</script>

<template>
  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Objeciones del Socio de Producción (R-01)</h2>
        <p>El plan espera una reducción progresiva de objeciones entre demostraciones.</p>
      </div>
      <button type="button" class="btn" @click="abrirNueva">Registrar objeción</button>
    </div>

    <figure class="grafico" aria-label="Objeciones por demostración">
      <div v-for="g in porDemo" :key="g.demo" class="col">
        <div class="num valor">{{ g.total }}</div>
        <div class="pista">
          <div class="barra" :style="{ height: `${(g.total / maximo) * 100}%` }" :title="`${g.total} objeciones, ${g.abiertas} abiertas`">
            <span class="abiertas" :style="{ height: `${(g.abiertas / g.total) * 100}%` }"></span>
          </div>
        </div>
        <figcaption>{{ g.demo }}<span class="muted num"> · {{ formatearFecha(g.fecha) }}</span></figcaption>
      </div>
    </figure>
    <div class="leyenda muted">
      <span><i class="res"></i>Resueltas</span>
      <span><i class="abi"></i>Abiertas</span>
    </div>

    <div class="table-wrap">
      <table class="objeciones">
        <thead>
          <tr><th>Fecha</th><th>Demostración</th><th>Objeción</th><th>Respuesta del equipo</th><th>Estado</th></tr>
        </thead>
        <tbody>
          <tr v-for="o in ordenadas" :key="o.id">
            <td class="num">{{ formatearFecha(o.fecha) }}</td>
            <td>{{ o.demostracion }}</td>
            <td>{{ o.descripcion }}</td>
            <td :class="{ muted: !o.respuesta }">{{ o.respuesta || 'Sin respuesta' }}</td>
            <td>
              <span v-if="o.resuelta" class="pill ok">Resuelta</span>
              <button v-else type="button" class="btn sec mini" @click="abrirResolver(o.id)">Resolver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <dialog ref="dialogoNueva" aria-label="Registrar objeción">
      <form method="dialog" @submit.prevent="guardarNueva">
        <h3>Registrar objeción del Socio</h3>
        <div class="campos">
          <label>Fecha <input v-model="nueva.fecha" type="date" required /></label>
          <label>
            Demostración o prueba
            <input v-model="nueva.demostracion" list="demos-socio" required />
            <datalist id="demos-socio"><option v-for="d in demos" :key="d" :value="d" /></datalist>
          </label>
          <label>Objeción <textarea v-model="nueva.descripcion" rows="3" required></textarea></label>
        </div>
        <div class="acciones-dialog">
          <button type="button" class="btn sec" @click="dialogoNueva?.close()">Cancelar</button>
          <button type="submit" class="btn">Guardar</button>
        </div>
      </form>
    </dialog>

    <dialog ref="dialogoResolver" aria-label="Resolver objeción">
      <form method="dialog" @submit.prevent="guardarResolucion">
        <h3>Resolver objeción</h3>
        <p class="muted">{{ resolviendo.descripcion }}</p>
        <div class="campos">
          <label>Respuesta del equipo <textarea v-model="resolviendo.respuesta" rows="3" required></textarea></label>
        </div>
        <div class="acciones-dialog">
          <button type="button" class="btn sec" @click="dialogoResolver?.close()">Cancelar</button>
          <button type="submit" class="btn">Marcar resuelta</button>
        </div>
      </form>
    </dialog>
  </section>
</template>

<style scoped>
.grafico {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: 0 0 8px;
  padding: 0 4px 4px;
  overflow-x: auto;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 0 0 120px;
}

.pista {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid var(--line);
}

.barra {
  display: flex;
  flex-direction: column;
  width: 36px;
  border-radius: 4px 4px 0 0;
  background: var(--d-int);
  overflow: hidden;
}

.abiertas {
  display: block;
  background: var(--bad);
}

.valor {
  font-size: 13px;
  font-weight: 700;
}

figcaption {
  font-size: 12px;
  line-height: 1.25;
  text-align: center;
}

.leyenda {
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
}

.leyenda span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.leyenda i {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.leyenda .res { background: var(--d-int); }
.leyenda .abi { background: var(--bad); }

.objeciones {
  min-width: 720px;
}

.btn.mini {
  min-height: 32px;
  font-size: 13px;
}
</style>
