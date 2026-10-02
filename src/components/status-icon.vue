<script setup lang="ts">
import { ESTADOS, type Estado } from '../data/procesos';
import { iconosEstado } from '../icons';

withDefaults(defineProps<{ estado: Estado; size?: number }>(), { size: 12 });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="-6 -6 12 12"
    role="img"
    :aria-label="ESTADOS[estado]"
    v-html="iconosEstado[estado]"
  />
</template>
