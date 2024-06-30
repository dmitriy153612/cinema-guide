<template>
  <section class="genre-sec">
    <app-container class="genre-sec__container">
      <div class="genre-sec__title-box">
        <router-link class="genre-sec__link" :to="{ name: 'GenresPage' }">
          <div class="genre-sec__link-icon-wrapper">
            <app-icon class="genre-sec__link-icon" icon-name="IconArrow" />
          </div>
          <app-title class="genre-sec__link-title" size="l" component="h1">{{ title }} </app-title>
        </router-link>
      </div>
      <movie-card-list class="genre-sec__card-list" :movies="movies">
        <template v-slot="{ movie }">
          <movie-card :movie="movie" />
        </template>
      </movie-card-list>
      <primary-btn
        class="genre-sec__btn"
        btn-name="Show more"
        bg-color="light"
        :show-spinner="moviesStore.isMoviesLoading"
        @click="fetchAddMovies"
      />
    </app-container>
  </section>
</template>

<script setup lang="ts">
import AppContainer from '@/components/layouts/AppContainer.vue'
import AppTitle from '@/components/AppTitle.vue'
import MovieCardList from '@/components/MovieCardList.vue'
import MovieCard from '@/components/MovieCard.vue'
import AppIcon from '@/components/AppIcon.vue'
import PrimaryBtn from '@/components/ui/PrimaryBtn.vue'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import type { MovieData } from '@/types/movies'
import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'
import { computed } from 'vue'

const props = defineProps<{
  genre: string
  movies: MovieData[]
}>()

const moviesStore = useMoviesStore()
const globalStore = useGlobalStore()

let currentPage: number = 0
let cardCount = (): number => (globalStore.isMobileScreenWidth ? 5 : 15)

const title = computed(() => capitalizeFirstLetter(props.genre))

function fetchAddMovies() {
  moviesStore.fetchGetMovies(
    { genre: props.genre, page: (currentPage += 1), count: cardCount() },
    true
  )
}
</script>

<style scoped lang="scss">
.genre-sec {
  &__container {
    display: grid;
    align-items: center;
  }
  &__title-box {
    @include section-title-indents;
  }
  &__link {
    display: flex;
    align-items: center;
    column-gap: 8px;
    :deep(svg) {
      @include transition(color);
    }
    @media #{$screen-md} {
      column-gap: 16px;
    }
    :focus &-icon-wrapper,
    &:hover &-icon-wrapper {
      transform: translateX(-10%);
      color: $blue-marguerite;
    }
    &-icon-wrapper {
      height: 32px;
      width: 32px;
      color: $white;
      @include transition(transform);
      @media #{$screen-md} {
        height: 40px;
        width: 40px;
      }
    }
  }
  &__card-list {
    padding-bottom: 40px;
    @media #{$screen-md} {
      padding-bottom: 64px;
    }
  }
  &__btn {
    justify-self: center;
  }
}
</style>
