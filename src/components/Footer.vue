<script setup lang="ts">
import { computed } from 'vue'

const getYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<template>
  <div class="card-footer container-fluid border-top text-body-secondary">
    <span class="small text-secondary">
      {{ getYear }} - António Salgado |
      <a
        class="text-decoration-none"
        target="_blank"
        href="https://pixabay.com/"
      >
        Pixabay images
      </a>
    </span>
  </div>
</template>
