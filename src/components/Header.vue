<script setup lang="ts">
import { computed, ref } from 'vue'

const time = ref(new Date())

setInterval(() => {
  time.value = new Date()
}, 1000)

// Computed functions to get units
const getDate = computed(() => {
  const year = time.value.getFullYear()
  const month = time.value.getMonth().toString().padStart(2, '0')
  const day = (time.value.getDate() + 1).toString().padStart(2, '0')
  return `${day}-${month}-${year}`
})

const getTime = computed(() => {
  const second = time.value.getSeconds().toString().padStart(2, '0')
  const minute = time.value.getMinutes().toString().padStart(2, '0')
  const hour = time.value.getHours().toString().padStart(2, '0')

  return `${hour}:${minute}:${second}`
})
</script>

<template>
  <div class="card-header container-fluid">
    <ul class="nav nav-tabs py-2">
      <li class="nav-item">
        <i class="bi bi-calendar text-primary pe-2"></i>
        <span class="text-light">{{ getDate }}</span>
      </li>
      <li class="nav-item ps-4">
        <i class="bi bi-clock text-primary pe-2"></i>
        <span class="text-light">{{ getTime }}</span>
      </li>
      <!-- <li class="nav-item ps-4">
          <i class="bi bi-search text-primary pe-2"></i><span class="text-primary">on </span><span class="text-light">bookmarks...</span>
        </li> -->
    </ul>
  </div>
</template>
