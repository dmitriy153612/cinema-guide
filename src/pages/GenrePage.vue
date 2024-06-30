<template>
  <main class="genre-page">
    <section-genre :movies="movies" :genre="genre" />
  </main>
</template>

<script setup lang="ts">
import SectionGenre from '@/components/sections/SectionGenre.vue'

import { useMoviesStore } from '@/stores/moviesStore'
import { computed } from 'vue'

defineProps<{
  genre: string
}>()

const movieStore = useMoviesStore()
const movies = computed(() => movieStore.movies)
</script>

<style scoped lang="scss">
.genre-page {
  padding-bottom: 40px;
  @media #{$screen-md} {
    padding-bottom: 160px;
  }
}
</style>
