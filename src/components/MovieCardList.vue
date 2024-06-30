<template>
  <ul class="card-list" :class="listCalss">
    <li class="card-list__item" v-for="(movie, index) in movies" :key="index">
      <slot :movie="movie" :card-appearance="cardAppearance" :index="index" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MovieData } from '@/types/movies'
import type { CardAppearance } from '@/types/movieCard'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    movies: MovieData[]
    cardAppearance?: CardAppearance
    appearance?: 'cards' | 'search-cards'
  }>(),
  {
    appearance: 'cards'
  }
)

const listCalss = computed(() => ({
  'card-list--cards': props.appearance === 'cards',
  'card-list--search-cards': props.appearance === 'search-cards'
}))
</script>

<style scoped lang="scss">
.card-list {
  display: grid;

  &--cards {
    grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
    gap: 40px;
  }
  &--search-cards {
    padding: 8px;
    background-color: $cape-cod;
    border-bottom-right-radius: $border-radius-xs;
    border-bottom-left-radius: $border-radius-xs;
  }
}
</style>
