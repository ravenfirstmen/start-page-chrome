///
<reference types="chrome-types" />

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  model: chrome.bookmarks.BookmarkTreeNode
}>()

const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

const tooltipTitle = computed(() => {
  return props.model.children && props.model.children.length
    ? `Folder - ${props.model.title}`
    : props.model.title
})
</script>

<template>
  <li>
    <div class="d-block text-truncate mb-2">
      <i
        v-if="isFolder"
        class="bi bi-folder-fill text-primary fw-bold pe-2"
      ></i>
      <i
        v-if="!isFolder"
        class="bi bi-box-arrow-up-right text-secondary pe-2"
      ></i>
      <a
        v-tooltip
        :href="model.url"
        :data-bs-title="tooltipTitle"
        class="link-light text-nowrap text-decoration-none"
        data-bs-placement="left"
      >
        {{ model.title }}
      </a>
      <span
        v-if="model.url"
        class="d-block small text-secondary text-truncate text-nowrap ps-4"
      >
        {{ model.url }}
      </span>
    </div>
    <ul
      v-if="isFolder"
      role="list"
      class="list-unstyled ps-4"
    >
      <BookmarkItem
        v-for="item in model.children"
        :key="item.id"
        :model="item"
      ></BookmarkItem>
    </ul>
  </li>
</template>
