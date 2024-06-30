<template>
  <section class="movie-descr-sec">
    <app-container class="movie-descr-sec__container">
      <app-title component="h1" size="m"> Obout movie </app-title>
      <ul class="movie-descr-sec__list">
        <li class="movie-descr-sec__item">
          <movie-descr name="Original language" :value="originalLanguage" />
        </li>
        <li class="movie-descr-sec__item">
          <movie-descr name="Budget" :value="budget" :currency="true" />
        </li>
        <li class="movie-descr-sec__item">
          <movie-descr name="Revenue" :value="revenue" :currency="true" />
        </li>
        <li class="movie-descr-sec__item">
          <movie-descr name="Director" :value="director" />
        </li>
        <li class="movie-descr-sec__item">
          <movie-descr name="Production" :value="production" />
        </li>
        <li class="movie-descr-sec__item">
          <movie-descr name="AwardsSummary" :value="awardsSummary" />
        </li>
      </ul>
    </app-container>
  </section>
</template>

<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue'
import AppContainer from '@/components/layouts/AppContainer.vue'
import MovieDescr from '@/components/MovieDescr.vue'

defineProps<{
  originalLanguage: string | null
  budget: string | null
  revenue: string | null
  director: string | null
  production: string | null
  awardsSummary: string | string[] | null
}>()
</script>

<style scoped lang="scss">
.movie-descr-sec {
  padding-top: 32px;

  @media #{$screen-md} {
    padding-top: 40px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding-top: 40px;
  }
}
</style>
