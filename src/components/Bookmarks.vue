<script setup>
import { onMounted, ref, watch } from 'vue'
import BookmarkItem from './BookmarkItem.vue'
import { searchService } from '../services'

const bookmarks = ref([])

const term = ref('')

onMounted(() => {
  reset()
})

function reset() {
  term.value = null
}

watch(term, async (val) => {
  bookmarks.value = await searchService.search(val)
})
</script>

<template>
  <div class="card-body container-fluid">
    <div class="row">
      <div class="col input-group mb-3 pb-3">
        <span
          class="input-group-text border-0 border-bottom bg-transparent ps-0"
        >
          <i class="bi bi-search"></i>
        </span>
        <input
          v-model="term"
          v-focus
          type="text"
          class="form-control border-0 bg-transparent border-bottom"
          @keyup.esc="reset"
        />
        <button
          class="btn shadow-none border-bottom"
          type="button"
          @click="reset"
        >
          <i class="bi bi-x-lg"></i>
        </button>
        <!-- <span class="input-group-text border-0 border-bottom bg-transparent pe-0">
          <i v-tooltip class="bi bi-info-circle" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip"
            data-bs-placement="top" data-bs-title="Descreve os providers..."></i>
        </span> -->
      </div>
    </div>
    <div class="row align-items-start">
      <div
        v-for="item in bookmarks"
        :key="item.id"
        class="col text-truncate mih-65 mxh-65 scrollbar"
      >
        <h4 class="mb-3 text-primary">{{ item.title }}</h4>
        <ul
          role="list"
          class="list-unstyled"
        >
          <BookmarkItem
            v-for="child in item.children"
            :key="child.id"
            :model="child"
          ></BookmarkItem>
        </ul>
      </div>
    </div>
  </div>
</template>
