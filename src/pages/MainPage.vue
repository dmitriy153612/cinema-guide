<template>
  <main class="main-page">
    <section-movie
      class="main-page__section main-page__section--movie"
      :id="randomMovie.id"
      :title="randomMovie.title"
      :rating="randomMovie.tmdbRating"
      :year="randomMovie.releaseYear"
      :genres="randomMovie.genres"
      :duration="randomMovie.runtime"
      :text="randomMovie.plot"
      :trailerYouTubeId="randomMovie.trailerYouTubeId"
      :backgroundUrl="randomMovie.backdropUrl"
      :isMovieLoading="moviesStore.isMovieRandomLoading"
      :showBtnReload="true"
      :showBtnAbout="true"
      @reload="moviesStore.fetchGetMovieRandom"
      v-if="randomMovie"
    />
    <section-top-rating-movies
      class="main-page__section main-page__section--top-movie"
      title="Top 10 Movies"
      :movies="topMovies"
      v-if="topMovies.length"
    />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MovieData } from '@/types/movies'
import { useMoviesStore } from '@/stores/moviesStore'
import SectionMovie from '@/components/sections/SectionMovie.vue'
import SectionTopRatingMovies from '@/components/sections/SectionTopRatingMovies.vue'

const moviesStore = useMoviesStore()

const randomMovie = computed<MovieData | null>(() => moviesStore.movieRandom)
const topMovies = computed<MovieData[]>(() => moviesStore.moviesTopRaiting)
</script>

<style scoped lang="scss">
.main-page {
  &__section {
    &--top-movie {
      padding-top: 43px;
    }
  }
}
</style>
