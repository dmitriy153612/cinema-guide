<template>
  <section class="genres-sec">
    <app-container>
      <app-title class="genres-sec__title" component="h1" size="l"> Movie genres </app-title>
      <ul class="genres-sec__card-list">
        <li class="genres-sec__item" v-for="(genre, index) in genres" :key="index">
          <genre-card
            :genre="genre.genre"
            :img-url="genre.imgUrl"
            :to-params="{ name: 'GenrePage', params: { genre: genre.genre } }"
          />
        </li>
      </ul>
    </app-container>
  </section>
</template>

<script setup lang="ts">
import AppContainer from '@/components/layouts/AppContainer.vue'
import AppTitle from '@/components/AppTitle.vue'
import GenreCard from '@/components/GenreCard.vue'
import type { Genre } from '@/types/movies'

defineProps<{
  genres: Genre[]
}>()
</script>

<style scoped lang="scss">
.genres-sec {
  padding-bottom: 40px;
  @media #{$screen-md} {
    padding-bottom: 160px;
  }
  &__title {
    @include section-title-indents;
  }

  &__card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
  }
}
</style>
