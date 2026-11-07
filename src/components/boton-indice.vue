<script setup lang="ts">
import { ui } from '../stores/ui';
</script>

<template>
  <button type="button" class="btn-ghost" @click="ui.indiceOculto = !ui.indiceOculto">
    {{ ui.indiceOculto ? 'Mostrar índice' : 'Ocultar índice' }}
  </button>
</template>

<style scoped>
.btn-ghost {
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
</style>
