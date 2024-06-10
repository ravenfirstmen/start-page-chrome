<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Bookmarks from './components/Bookmarks.vue'
import Footer from './components/Footer.vue'
import { backgroundImagesService } from './services'

onMounted(() => {
  const url = backgroundImagesService.getLocalBackgroundImage()
  document.body.style.backgroundImage = `url('${url}')`
})
</script>

<template>
  <div
    class="card d-flex aligns-items-center justify-content-center card w-90 position-absolute top-50 start-50 translate-middle"
  >
    <Header></Header>
    <Bookmarks></Bookmarks>
    <Footer></Footer>
  </div>
</template>
