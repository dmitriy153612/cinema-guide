<template>
  <main class="movie-detail-page">
    <section-movie
      class="main-page__section main-page__section--movie"
      :id="movie.id"
      :title="movie.title"
      :rating="movie.tmdbRating"
      :year="movie.releaseYear"
      :genres="movie.genres"
      :duration="movie.runtime"
      :text="movie.plot"
      :trailerYouTubeId="movie.trailerYouTubeId"
      :trailerUrl="movie.trailerUrl"
      :backgroundUrl="movie.backdropUrl"
      :isMovieLoading="moviesStore.isMoviesLoading"
      :showBtnAbout="false"
      v-if="movie"
    />
    <section-movie-descr
      :originalLanguage="movie.language"
      :budget="movie.budget"
      :revenue="movie.revenue"
      :director="movie.director"
      :production="movie.production"
      :awardsSummary="movie.awardsSummary"
      v-if="movie"
    />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MovieData } from '@/types/movies'
import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'
import SectionMovie from '@/components/sections/SectionMovie.vue'
import SectionMovieDescr from '@/components/sections/SectionMovieDescr.vue'
import { onBeforeRouteUpdate } from 'vue-router'

const globalStore = useGlobalStore()
const moviesStore = useMoviesStore()

const movie = computed<MovieData | null>(() => moviesStore.movie)

onBeforeRouteUpdate(async (to) => {
  const movieId = to.params?.id
  if ('id' in to.params && !Array.isArray(movieId)) {
    globalStore.toggleScreenSpinner(true)
    await moviesStore.fetchGetMovie(Number(movieId))
    globalStore.toggleScreenSpinner(false)
  }
})
</script>

<style scoped lang="scss">
.movie-detail-page {
  padding-bottom: 32px;
  @media #{$screen-md} {
    padding-bottom: 120px;
  }
}
</style>
