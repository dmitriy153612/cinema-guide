<template>
  <main class="genres-page">
    <section-genres :genres="genres" v-if="genres" />
  </main>
</template>

<script setup lang="ts">
import SectionGenres from '@/components/sections/SectionGenres.vue'
import type { Genre } from '@/types/movies'
import { useMoviesStore } from '@/stores/moviesStore'
import { computed } from 'vue'

const moviesStore = useMoviesStore()

const genres = computed<Genre[] | null>(() => moviesStore.genres)
</script>

<style scoped lang="scss"></style>
