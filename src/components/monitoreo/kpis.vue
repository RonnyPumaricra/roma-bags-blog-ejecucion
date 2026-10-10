<script setup lang="ts">
import { computed } from 'vue';
import { FECHA_CORTE } from '../../data/monitoreo-interesados';
import { asistencia, brecha, datos, diasEntre, proximoGate } from '../../stores/monitoreo';

const META_ASISTENCIA = 80;

const tarjetas = computed(() => {
  const gerencia = asistencia('SH-01');
  const socio = asistencia('SH-02');
  const abiertas = datos.objeciones.filter((o) => !o.resuelta).length;
  const enNivel = datos.interesados.filter((i) => brecha(i) <= 0).length;
  const gate = proximoGate();
  const aprobadas = gate?.validaciones.filter((v) => v.estado === 'aprobada').length ?? 0;
  const pedidos = datos.resultados[0];
  const ultimoMes = pedidos.valores.filter((v) => !v.parcial).at(-1);

  const asis = (valor: number | null) => ({
    valor: valor === null ? '—' : `${valor} %`,
    nota: `Meta ${META_ASISTENCIA} %`,
    tono: valor === null ? '' : valor >= META_ASISTENCIA ? 'ok' : 'bad',
  });

  return [
    { titulo: 'Asistencia de la Gerencia', ...asis(gerencia) },
    { titulo: 'Asistencia del Socio', ...asis(socio) },
    {
      titulo: 'Objeciones abiertas del Socio',
      valor: String(abiertas),
      nota: `${datos.objeciones.length} registradas`,
      tono: abiertas === 0 ? 'ok' : abiertas > 2 ? 'bad' : 'warn',
    },
    {
      titulo: 'Interesados en el nivel deseado',
      valor: `${enNivel} de ${datos.interesados.length}`,
      nota: 'Matriz de participación',
      tono: enNivel === datos.interesados.length ? 'ok' : '',
    },
    {
      titulo: gate ? `${gate.id} · ${gate.fase}` : 'Gates',
      valor: gate ? `${diasEntre(FECHA_CORTE, gate.fecha)} días` : 'Completados',
      nota: gate ? `${aprobadas} de ${gate.validaciones.length} validaciones` : '',
      tono: gate && aprobadas < gate.validaciones.length && diasEntre(FECHA_CORTE, gate.fecha) <= 14 ? 'warn' : '',
    },
    {
      titulo: 'Pedidos incompletos',
      valor: ultimoMes ? `${ultimoMes.valor} / mes` : '—',
      nota: `Línea base ${pedidos.lineaBase} / mes${ultimoMes ? ` · ${ultimoMes.mes}` : ''}`,
      tono: ultimoMes && ultimoMes.valor < pedidos.lineaBase ? 'ok' : 'warn',
    },
  ];
});
</script>

<template>
  <section class="kpis" aria-label="Indicadores principales">
    <div v-for="t in tarjetas" :key="t.titulo" class="kpi" :class="t.tono">
      <div class="titulo">{{ t.titulo }}</div>
      <div class="valor num">{{ t.valor }}</div>
      <div class="nota">{{ t.nota }}</div>
    </div>
  </section>
</template>
