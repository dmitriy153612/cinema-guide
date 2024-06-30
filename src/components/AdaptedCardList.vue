<template>
  <div class="card-list-box">
    <app-slider
      class="card-list-box__slider"
      :movies="movies"
      :card-type="cardAppearance"
      v-if="movies.length"
    >
      <template v-slot="{ movie, index }">
        <movie-card :appearance="cardAppearance" :index="index" :movie="movie" />
      </template>
    </app-slider>
    <app-container>
      <movie-card-list
        class="card-list-box__card-list"
        :movies="movies"
        :card-appearance="cardAppearance"
        v-if="movies.length"
      >
        <template v-slot="{ movie, cardAppearance, index }">
          <movie-card :appearance="cardAppearance" :index="index" :movie="movie" />
        </template>
      </movie-card-list>
      <p class="card-list-box__message" v-if="!movies.length">{{ messageIfEmptyList }}</p>
    </app-container>
  </div>
</template>

<script setup lang="ts">
import AppContainer from '@/components/layouts/AppContainer.vue'
import MovieCardList from '@/components/MovieCardList.vue'
import AppSlider from '@/components/AppSlider.vue'
import MovieCard from '@/components/MovieCard.vue'
import type { MovieData } from '@/types/movies'
import type { CardAppearance } from '@/types/movieCard'
import 'swiper/css'

withDefaults(
  defineProps<{
    movies: MovieData[]
    cardAppearance: CardAppearance
    messageIfEmptyList?: string
  }>(),
  {
    messageIfEmptyList: 'The list is empty'
  }
)
</script>

<style scoped lang="scss">
.card-list-box {
  padding: 0;
  max-width: 100%;
  box-sizing: border-box;

  @media #{$screen-xxl} {
    margin: 0 auto;
    max-width: $maxContainerWidth;
  }

  &__slider {
    @media #{$screen-xxl} {
      display: none;
    }
  }

  &__card-list {
    display: none;

    @media #{$screen-xxl} {
      display: grid;
      padding-top: 64px;
      padding-bottom: 120px;
    }
  }

  &__message {
    padding-top: 40px;
    font-size: 24px;
    color: rgba($white, 50%);
  }
}
</style>
