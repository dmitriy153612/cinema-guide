<template>
  <div class="slider-box" :class="sliderClass">
    <div class="slider-box__swiper">
      <swiper :space-between="spaceBetween" slides-per-view="auto" :centered-slides="false">
        <swiper-slide class="slider-box__slide" v-for="(movie, index) in movies" :key="index">
          <slot :movie="movie" :index />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { MovieData } from '@/types/movies'
import 'swiper/css'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    movies: MovieData[]
    spaceBetween?: number
    appearance?: 'card' | 'search-card'
  }>(),
  {
    spaceBetween: 40,
    appearance: 'card'
  }
)

const sliderClass = computed(() => ({
  'slider-box--card': props.appearance === 'card',
  'slider-box--search-card': props.appearance === 'search-card'
}))
</script>

<style scoped lang="scss">
.slider-box {
  padding: 0;
  max-width: 100%;

  &--card & {
    &__swiper {
      .swiper {
        padding: 50px 0 32px $containerInlinePadding;
      }
      .swiper-slide {
        width: 224px !important;
      }
    }
  }
  &--search-card {
    border-radius: $border-radius-xs;
    background-color: $cape-cod;
  }
  &--search-card & {
    &__swiper {
      .swiper {
        padding: 24px 0 24px $containerInlinePadding;
      }
      .swiper-slide {
        width: 220px !important;
        height: auto !important;
      }
    }
  }
  &__slide:last-child {
    margin-right: 40px;
  }
}
</style>
