<template>
  <div class="genre-card">
    <div class="genre-card__inner">
      <div class="genre-card__img-wrapper" :class="{ 'genre-card__img-wrapper--no-img': !imgUrl }">
        <img class="genre-card__img" :src="getImgUrl" :alt="genre" />
      </div>
      <div class="genre-card__title-wrapper">
        <h2 class="genre-card__title">
          {{ genre }}
        </h2>
      </div>
      <router-link class="genre-card__link" :to="toParams" :aria-label="`go to ${genre} movies`"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  genre: string
  imgUrl: string | null
  toParams: {
    [key: string]: string | { [key: string]: string }
  }
}>()

const getImgUrl = computed<string>(() => {
  if (props.imgUrl) {
    return props.imgUrl
  }
  return '/img/logo.svg'
})
</script>

<style scoped lang="scss">
.genre-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__inner {
    border: 1px solid rgba($white, 25%);
    border-radius: $border-radius-m;
    overflow: hidden;
    cursor: pointer;
    @include transition(box-shadow, border-color);
    &:focus-within,
    &:hover {
      box-shadow: $card-box-shadow;
      border-color: $white;
    }
  }
  &__img-wrapper {
    aspect-ratio: 335 / 220;
  }
  &__img-wrapper--no-img {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 22px;
    transform: rotate(-5deg);
  }
  &__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 22px 22px 30px;
  }
  &__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: $white;
  }
  &__link {
    position: absolute;
    inset: 0;
  }
}
</style>
