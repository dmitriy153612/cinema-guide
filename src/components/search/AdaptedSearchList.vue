<template>
  <div class="search-list-box">
    <movie-card-list
      class="search-list-box__list"
      :movies="movies"
      appearance="search-cards"
      v-if="!globalStore.isMobileScreenWidth"
    >
      <template v-slot="{ movie }">
        <search-card appearance="card" :movie="movie" />
      </template>
    </movie-card-list>
    <app-slider
      class="search-list-box__slider"
      appearance="search-card"
      :space-between="16"
      :movies="movies"
      v-else
    >
      <template v-slot="{ movie }">
        <search-card :movie="movie" />
      </template>
    </app-slider>
  </div>
</template>

<script setup lang="ts">
import AppSlider from '@/components/AppSlider.vue'
import SearchCard from '@/components/search/SearchCard.vue'
import MovieCardList from '@/components/MovieCardList.vue'
import type { MovieData } from '@/types/movies'
import { useGlobalStore } from '@/stores/globalStore'

defineProps<{
  movies: MovieData[]
}>()

const globalStore = useGlobalStore()
</script>

<style scoped></style>
