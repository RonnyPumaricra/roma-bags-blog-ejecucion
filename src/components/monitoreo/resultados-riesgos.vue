<script setup lang="ts">
import { computed } from 'vue';
import { formatearFecha } from '../../data/fechas';
import { FECHA_CORTE } from '../../data/monitoreo-interesados';
import { datos, diasEntre } from '../../stores/monitoreo';

const porcentaje = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

const adopcion = computed(() => {
  const a = datos.adopcion;
  const dias = diasEntre(a.ultimoRespaldo, FECHA_CORTE);
  return [
    {
      titulo: 'Ventas · pedidos registrados en celular',
      valor: `${porcentaje(a.ventasMovil.registrados, a.ventasMovil.total)} %`,
      nota: `${a.ventasMovil.registrados} de ${a.ventasMovil.total} pedidos del piloto · total del equipo`,
      avance: porcentaje(a.ventasMovil.registrados, a.ventasMovil.total),
    },
    {
      titulo: 'Empaque · asistentes a la inducción',
      valor: `${a.empaqueInduccion.asistentes} de ${a.empaqueInduccion.total}`,
      nota: a.empaqueInduccion.programada
        ? `Programada: ${formatearFecha(a.empaqueInduccion.programada)}`
        : 'Inducción aún no programada',
      avance: porcentaje(a.empaqueInduccion.asistentes, a.empaqueInduccion.total),
    },
    {
      titulo: 'Gerencia · último respaldo verificado',
      valor: formatearFecha(a.ultimoRespaldo),
      nota: `Hace ${dias} días`,
      avance: null,
    },
    {
      titulo: 'Coexistencia · registros conciliados Excel ↔ sistema',
      valor: `${porcentaje(a.conciliacionExcel.conciliados, a.conciliacionExcel.total)} %`,
      nota: `${a.conciliacionExcel.conciliados} de ${a.conciliacionExcel.total} registros`,
      avance: porcentaje(a.conciliacionExcel.conciliados, a.conciliacionExcel.total),
    },
  ];
});

const TONO_RIESGO = { activo: 'bad', vigilancia: 'warn', controlado: 'ok' };
const TEXTO_RIESGO = { activo: 'Activo', vigilancia: 'En vigilancia', controlado: 'Controlado' };

const revisionPendiente = computed(() => datos.disparadores.some((d) => d.activo));
</script>

<template>
  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Resultado operativo frente a la línea base</h2>
        <p>Efecto indirecto en Clientes Mayoristas y Motorizado. Sobrecosto de referencia: S/ 19 a S/ 24 por incidente.</p>
      </div>
    </div>
    <div class="indicadores">
      <figure v-for="r in datos.resultados" :key="r.nombre" class="indicador">
        <figcaption><strong>{{ r.nombre }}</strong> <span class="muted">{{ r.unidad }}</span></figcaption>
        <div class="barras">
          <div class="fila base">
            <span class="et">Línea base</span>
            <span class="pista"><i :style="{ width: '100%' }"></i></span>
            <span class="num">{{ r.lineaBase }}</span>
          </div>
          <div v-for="v in r.valores" :key="v.mes" class="fila" :class="{ mejor: v.valor < r.lineaBase, parcial: v.parcial }">
            <span class="et">{{ v.mes }}{{ v.parcial ? '*' : '' }}</span>
            <span class="pista"><i :style="{ width: `${Math.min(100, (v.valor / r.lineaBase) * 100)}%` }"></i></span>
            <span class="num">{{ v.valor }}</span>
          </div>
        </div>
      </figure>
    </div>
    <p class="muted">* Mes en curso, acumulado al corte.</p>
  </section>

  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Adopción y confianza</h2>
        <p>Los indicadores de Ventas se muestran por equipo, nunca por persona, para no generar percepción de vigilancia (R-03).</p>
      </div>
    </div>
    <div class="adopcion">
      <div v-for="a in adopcion" :key="a.titulo" class="mini">
        <div class="muted">{{ a.titulo }}</div>
        <div class="valor num">{{ a.valor }}</div>
        <div v-if="a.avance !== null" class="progreso"><i :style="{ width: `${a.avance}%` }"></i></div>
        <div class="muted">{{ a.nota }}</div>
      </div>
    </div>
  </section>

  <section class="panel">
    <div class="panel-h">
      <div>
        <h2>Riesgos, supuestos y revisión del plan</h2>
        <p>Marca los supuestos que dejan de cumplirse y las situaciones que obligan a revisar el plan.</p>
      </div>
    </div>

    <div class="riesgos">
      <article v-for="r in datos.riesgos" :key="r.id" class="riesgo" :class="TONO_RIESGO[r.estado]">
        <div class="cab">
          <strong>{{ r.id }} · {{ r.nombre }}</strong>
          <span class="pill" :class="TONO_RIESGO[r.estado]">{{ TEXTO_RIESGO[r.estado] }}</span>
        </div>
        <p>{{ r.ultimoEvento }}</p>
        <p class="muted">Respuesta: {{ r.respuesta }}</p>
      </article>
    </div>

    <div class="listas">
      <fieldset>
        <legend>Supuestos vigilados</legend>
        <label v-for="s in datos.supuestos" :key="s.texto" class="item" :class="{ falla: !s.cumple }">
          <input v-model="s.cumple" type="checkbox" />
          <span>{{ s.texto }}</span>
        </label>
      </fieldset>
      <fieldset>
        <legend>
          Situaciones que requieren revisión
          <span v-if="revisionPendiente" class="pill bad">Revisar el plan</span>
        </legend>
        <label v-for="d in datos.disparadores" :key="d.texto" class="item">
          <input v-model="d.activo" type="checkbox" />
          <span>{{ d.texto }}</span>
        </label>
      </fieldset>
    </div>
  </section>
</template>

<style scoped>
.adopcion {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 10px;
}

.indicadores,
.riesgos,
.listas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.indicador {
  margin: 0;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface2);
}

.barras {
  display: grid;
  gap: 6px;
  margin-top: 8px;
}

.fila {
  display: grid;
  grid-template-columns: 72px 1fr 32px;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.fila .num {
  text-align: right;
  font-weight: 700;
}

.pista {
  height: 10px;
  border-radius: 3px;
  background: var(--line);
  overflow: hidden;
}

.pista i {
  display: block;
  height: 100%;
  border-radius: 3px;
  background: var(--warn);
}

.fila.base .pista i {
  background: var(--muted);
}

.fila.mejor .pista i {
  background: var(--ok);
}

.fila.parcial .pista i {
  opacity: .55;
}

.mini {
  display: grid;
  gap: 4px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface2);
}

.valor {
  font-size: 20px;
  font-weight: 700;
}

.progreso {
  height: 6px;
  border-radius: 3px;
  background: var(--line);
  overflow: hidden;
}

.progreso i {
  display: block;
  height: 100%;
  background: var(--d-int);
}

.riesgo {
  padding: 12px;
  border: 1px solid var(--line);
  border-left: 4px solid var(--c);
  border-radius: 10px;
  background: color-mix(in srgb, var(--c) 6%, var(--surface));
  font-size: 14px;
}

.riesgo .cab {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
}

.riesgo p {
  margin: 6px 0 0;
}

.listas {
  margin-top: 12px;
}

fieldset {
  margin: 0;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
}

legend {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
  font-size: 13px;
  font-weight: 700;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
}

.item input {
  margin-top: 3px;
}

.item.falla span {
  color: color-mix(in srgb, var(--bad) 75%, var(--text));
}
</style>
