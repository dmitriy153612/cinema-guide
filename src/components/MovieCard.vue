<template>
  <div class="card" :class="cardClass">
    <div
      class="card__number"
      v-if="appearance === 'numbered' && index !== undefined && index !== null"
    >
      {{ index + 1 }}
    </div>
    <div class="card__img-wrapper">
      <picture v-if="movie.posterUrl">
        <img class="card__img" :src="movie.posterUrl" :alt="movie.title || 'no name'" />
      </picture>
    </div>
    <router-link class="card__link" :to="routerLinkObj">
      <span class="card__link-text" :class="{ 'card__link-text--transparent': movie.posterUrl }">
        {{ movie.title }}
      </span>
    </router-link>
    <circle-btn
      class="card__btn-close"
      appearance="card"
      v-if="appearance === 'buttoned'"
      @click.prevent="delMovieFromFavorites"
    >
      <app-icon icon-name="IconClose" />
    </circle-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
const CircleBtn = defineAsyncComponent(() => import('@/components/ui/CircleBtn.vue'))
import AppIcon from '@/components/AppIcon.vue'
import type { MovieData } from '@/types/movies'
import { useFavoritesStore } from '@/stores/favoritesStore'

const props = withDefaults(
  defineProps<{
    movie: MovieData
    appearance?: 'numbered' | 'buttoned' | 'only-foto'
    index?: number
  }>(),
  {
    appearance: 'only-foto'
  }
)

const favoriteStore = useFavoritesStore()

const cardClass = ref({
  'card--numbered': props.appearance === 'numbered',
  'card--buttoned': props.appearance === 'buttoned'
})

const routerLinkObj = computed(() => ({ name: 'MovieDetailPage', params: { id: props.movie.id } }))

function delMovieFromFavorites() {
  const movieId = props.movie.id.toString()
  favoriteStore.delMovieFromFavorites(movieId)
  favoriteStore.fetchDelMovieFromFavorites(movieId)
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  aspect-ratio: 224 / 375;
  cursor: pointer;
  border-radius: $border-radius-l;
  @include transition(box-shadow);

  &:focus-within {
    box-shadow: $card-box-shadow;
  }
  &:focus &__img-wrapper {
    border-color: $white;
  }

  &:hover {
    box-shadow: $card-box-shadow;
  }
  &:hover &__img-wrapper {
    border-color: $white;
  }

  &--numbered & {
    &__number {
      position: absolute;
      top: -10px;
      left: -10px;
      z-index: 1;
      display: flex;
      border-radius: $border-radius-xl;
      padding: 8px 24px;
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      color: $blue-marguerite;
      background-color: $white;
    }
  }

  &--buttoned & {
    &__btn-close {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      opacity: 0.6;
      transform: translate(70%, -70%);
    }
  }

  &__img-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: $border-radius-l;
    overflow: hidden;
    border: 1px solid rgba($white, 0.25);
    @include transition(border-color);
  }

  &__img {
    display: block;
    height: 100%;
    object-fit: cover;
  }

  &__link {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__link-text {
    padding-inline: 20px;
    color: $white;
    &--transparent {
      color: transparent;
    }
  }
}
</style>
