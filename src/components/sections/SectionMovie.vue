<template>
  <section class="movie-sec">
    <div class="movie-sec__inner">
      <div class="movie-sec__background">
        <div class="movie-sec__background-inner">
          <span class="movie-sec__background-inner-text" v-if="!backgroundUrl"> No Poster </span>
        </div>
      </div>
      <div class="movie-sec__min-height"></div>
      <app-container class="movie-sec__container">
        <movie-content
          class="movie-sec__content"
          :id
          :rating
          :year
          :genres
          :duration
          :title
          :text
          :trailerYouTubeId
          :isMovieLoading
          :show-btn-like="authStore.userData !== null"
          :show-btn-reload="showBtnReload"
          :show-btn-about="showBtnAbout"
          :is-favorite-movie="isFavoriteMovie"
          @reload="emit('reload')"
          @toggle-favorite="toggleFavorite"
        />
        <div style="background-color: red"></div>
      </app-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from '@/components/layouts/AppContainer.vue'
import MovieContent from '@/components/MovieContent.vue'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useAuthStore } from '@/stores/authStore'

const favoriteStore = useFavoritesStore()
const authStore = useAuthStore()

const props = withDefaults(
  defineProps<{
    id: number
    title: string | null
    rating: number | null
    year: number | null
    genres: string[] | null
    duration: number | null
    text: string | null
    trailerYouTubeId: string | null
    backgroundUrl: string | null
    isMovieLoading?: boolean
    showBtnReload?: boolean
    showBtnAbout?: boolean
  }>(),
  {
    isMovieLoading: false
  }
)

const emit = defineEmits<{
  (e: 'reload'): void
}>()

const cssImgUrl = computed<string>(() => {
  return `url(${props.backgroundUrl})`
})

const isFavoriteMovie = computed<boolean>(() => authStore.isFavoriteMovie(props.id))

async function toggleFavorite(id: number) {
  if (isFavoriteMovie.value) {
    authStore.addOrDelFavorite(id.toString())
    await favoriteStore.fetchDelMovieFromFavorites(id.toString())
  } else {
    authStore.addOrDelFavorite(id.toString())
    await favoriteStore.fetchAddMovieToFavorite(id.toString())
  }
  authStore.fetchGetUserData()
}
</script>

<style scoped lang="scss">
$formatMobile: calc(260 / 375) * 100%;
$formatDesktop: calc(584 / 1440) * 100%;

.movie-sec {
  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    margin: 0 auto;
    max-width: 1440px;

    @media #{$screen-md} {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }

  &__background {
    display: grid;
    grid-template-columns: 1fr;

    @media #{$screen-md} {
      position: absolute;
      inset: 0;
      grid-template-columns: 37.5% 1fr;
    }

    @media #{$screen-lg} {
      grid-template-columns: 37.5% 1fr;
    }

    &-inner {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: $formatMobile;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      background-image: v-bind(cssImgUrl);

      @media #{$screen-md} {
        grid-column: 2 / 3;
        padding-top: 0;
        background-image: linear-gradient(to right, $page-color 0%, transparent 50%),
          v-bind(cssImgUrl);
      }

      &-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $cape-cod;
        font-size: 40px;
        text-shadow: 2px 2px 5px $silver-sand;

        @media #{$screen-md} {
          left: 60%;
        }
      }
    }
  }

  &__min-height {
    display: none;

    @media #{$screen-md} {
      width: 0;
      display: flex;
      padding-top: $formatDesktop;
    }
  }

  &__container {
    position: relative;
    z-index: 1;
    display: flex;
    height: 100%;
    width: 100%;

    @media #{$screen-md} {
      align-items: center;
    }
  }

  &__content {
    width: 100%;
  }
}
</style>
