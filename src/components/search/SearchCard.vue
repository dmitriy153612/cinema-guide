<template>
  <div class="search-card" :class="cardClass">
    <div class="search-card__img-wrapper">
      <picture v-if="movie.posterUrl">
        <img class="search-card__img" :src="movie.posterUrl" :alt="movie.title || ''" />
      </picture>
    </div>
    <movie-detail
      class="search-card__detail"
      :rating="movie.tmdbRating"
      :year="movie.releaseYear"
      :genres="movie.genres"
      :duration="movie.runtime"
      :small-size="true"
    />
    <h2 class="search-card__title">{{ movie.title }}</h2>
    <router-link
      class="search-card__link"
      :to="{ name: 'MovieDetailPage', params: { id: movie.id } }"
      @click="emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import MovieDetail from '@/components/MovieDetail.vue'
import type { MovieData } from '@/types/movies'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    movie: MovieData
    appearance?: 'card' | 'slider-card'
  }>(),
  {
    appearance: 'slider-card'
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cardClass = computed(() => ({
  'search-card--card': props.appearance === 'card',
  'search-card--slider-card': props.appearance === 'slider-card'
}))
</script>

<style scoped lang="scss">
.search-card {
  position: relative;
  display: grid;
  align-items: flex-start;
  height: 100%;

  &--slider-card {
    grid-template-areas:
      'img'
      'detail'
      'title';
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }

  &--slider-card & {
    &__img-wrapper {
      margin-bottom: 16px;
      height: 206px;
      width: 158px;
    }
    &__detail {
      margin-bottom: 8px;
    }
  }

  &--card {
    grid-template-areas:
      'img detail'
      'img title';
    grid-template-columns: auto 1fr;
    column-gap: 16px;
    row-gap: 8px;
    padding: 20px 8px;
  }

  &--card & {
    &__img-wrapper {
      grid-area: img;
      height: 52px;
      width: 40px;
    }
    &__link {
      position: absolute;
      inset: 0;
      border: 1px solid transparent;
      border-radius: $border-radius-s;
      @include transition(border-color);
      &:focus,
      &:hover {
        border-color: rgba($white, 50%);
      }
    }
  }

  &__img-wrapper {
    grid-area: img;
  }
  &__img {
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
  }
  &__detail {
    grid-area: detail;
  }
  &__title {
    grid-area: title;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: $white;
  }
  &__link {
    position: absolute;
    inset: 0;
  }
}

// .search-card {
//   position: relative;
//   display: grid;
//   grid-template-areas:
//     'img detail'
//     'img title';
//   grid-template-columns: auto 1fr;
//   column-gap: 16px;
//   row-gap: 8px;
//   padding: 20px 8px;
//   &__img-wrapper {
//     grid-area: img;
//     height: 52px;
//     width: 40px;
//   }
//   &__img {
//     object-fit: cover;
//     max-width: 100%;
//     max-height: 100%;
//   }
//   &__detail {
//     grid-area: detail;
//   }
//   &__title {
//     grid-area: title;
//     font-size: 18px;
//     line-height: 24px;
//     font-weight: 700;
//     color: $white;
//   }
//   &__link {
//     position: absolute;
//     inset: 0;
//     border: 1px solid transparent;
//     border-radius: $border-radius-s;
//     @include transition(border-color);
//     &:focus,
//     &:hover {
//       border-color: rgba($white, 50%);
//     }
//   }
// }
</style>
