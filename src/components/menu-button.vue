<script setup lang="ts">
import { ui } from '../stores/ui';
</script>

<template>
  <button class="menu-btn" :aria-expanded="ui.menuAbierto" aria-label="Abrir índice" @click="ui.menuAbierto = !ui.menuAbierto">
    ☰ Índice
  </button>
</template>

<style scoped>
.menu-btn {
  display: none;
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 8px;
  padding: 4px 10px;
  white-space: nowrap;
}

@media (max-width: 860px) {
  .menu-btn {
    display: inline-block;
  }
}
</style>
