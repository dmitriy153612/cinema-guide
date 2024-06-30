<template>
  <section class="movies-top-sec">
    <app-container>
      <app-title class="movies-top-sec__title" size="m" component="h2">{{ title }} </app-title>
    </app-container>
    <adapted-card-list :movies="movies" card-appearance="numbered" />
  </section>
</template>

<script setup lang="ts">
import AppContainer from '@/components/layouts/AppContainer.vue'
import AppTitle from '@/components/AppTitle.vue'
import type { MovieData } from '@/types/movies'
import AdaptedCardList from '@/components/AdaptedCardList.vue'

defineProps<{
  title: string
  movies: MovieData[]
}>()
</script>

<style scoped lang="scss">
.movies-top-sec {
  &__title {
    margin-bottom: 20px;
  }
}
</style>
