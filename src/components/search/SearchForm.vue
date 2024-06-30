<template>
  <focus-trap :disabled="!isMobileFormOpened">
    <app-overlay :disabled="!isMobileScreenWidth" type="search" @close="toggleSearchForm(false)">
      <div class="search-box">
        <form class="search-box__form" @submit.prevent="searchMovies">
          <input class="search-box__input" placeholder="search" v-model.trim="inputText" v-focus />
          <button
            class="search-box__btn search-box__btn--search"
            :class="{ 'search-box__btn--rotate': movieStore.isMoviesLoading }"
            type="submit"
            aria-label="search"
            tabindex="-1"
          >
            <app-icon icon-name="IconSearch" />
          </button>
          <button
            class="search-box__btn search-box__btn--close"
            type="button"
            aria-label="close form"
            @click="() => toggleSearchForm(false)"
          >
            <app-icon icon-name="IconClose" />
          </button>
        </form>
        <transition name="fade">
          <movie-card-list
            class="search-box__search-list"
            :movies="foundMovies"
            appearance="search-cards"
            v-if="isDesctopSearchListShown"
          >
            <template v-slot="{ movie }">
              <search-card appearance="card" :movie="movie" @close="toggleSearchForm(false)" />
            </template>
          </movie-card-list>

          <app-slider
            class="search-box__slider"
            appearance="search-card"
            :space-between="16"
            :movies="foundMovies"
            v-else-if="isMobileSearchSliderShown"
          >
            <template v-slot="{ movie }">
              <search-card :movie="movie" @close="emit('toggleForm', false)" />
            </template>
          </app-slider>

          <p
            class="search-box__no-result"
            :class="{
              'search-box__search-list': !isMobileScreenWidth,
              'search-box__slider': isMobileScreenWidth
            }"
            v-else-if="isNotFoundOpened"
          >
            No results found. Please try a different search term.
          </p>
        </transition>

        <teleport to="body">
          <transition name="fade">
            <app-overlay
              :is-header-visible="true"
              color="light"
              @close="toggleSearchForm(false)"
              v-if="isSearchListOpened && !isMobileScreenWidth"
            />
          </transition>
        </teleport>
      </div>
    </app-overlay>
  </focus-trap>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import MovieCardList from '@/components/MovieCardList.vue'
import SearchCard from '@/components/search/SearchCard.vue'
import AppOverlay from '@/components/layouts/AppOverlay.vue'
import AppSlider from '@/components/AppSlider.vue'
import FocusTrap from 'vue-focus-lock'
import { useMoviesStore } from '@/stores/moviesStore'
import { useGlobalStore } from '@/stores/globalStore'
import { MOVES_SEARCH_LIMIT } from '@/variables'
import type { MovieData } from '@/types/movies'

const props = defineProps<{
  isMobileFormOpened: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleForm', isOpen: boolean): void
}>()

const movieStore = useMoviesStore()
const globalStore = useGlobalStore()

const inputText = ref<string>('')
const isSearchListOpened = ref<boolean>(false)
const isSearchSliderOpened = ref<boolean>(false)
const isNotFoundOpened = ref<boolean>(false)

const isMobileScreenWidth = computed<boolean>(() => globalStore.isMobileScreenWidth)
const foundMovies = computed<MovieData[]>(() => movieStore.movies)
const isDesctopSearchListShown = computed<boolean>(() => {
  return isSearchListOpened.value && !isMobileScreenWidth.value
})
const isMobileSearchSliderShown = computed<boolean>(() => {
  return props.isMobileFormOpened && isSearchSliderOpened.value
})

async function searchMovies() {
  if (!inputText.value) {
    return
  }
  isSearchListOpened.value = false
  isSearchSliderOpened.value = false
  isNotFoundOpened.value = false

  await movieStore.fetchGetMovies({ title: inputText.value, count: MOVES_SEARCH_LIMIT })

  if (foundMovies.value.length) {
    toggleSearchForm(true)
  } else {
    isNotFoundOpened.value = true
  }
}

function toggleSearchForm(isOpen: boolean) {
  isSearchListOpened.value = isOpen
  isSearchSliderOpened.value = isOpen
  inputText.value = ''
  if (!isOpen) {
    isNotFoundOpened.value = false
    emit('toggleForm', false)
  } else {
    emit('toggleForm', true)
  }
}
</script>

<style scoped lang="scss">
@include transition-fade;

.search-box {
  position: relative;

  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  &__input {
    padding: 12px 56px 12px 52px;
    height: 100%;
    border: 1px solid transparent;
    border-radius: $border-radius-xs;
    background-color: $cape-cod;
    font-size: 18px;
    line-height: 24px;
    color: $white;
    @include transition(border-color);

    &::placeholder {
      color: rgba($white, 0.5);
    }

    &:focus,
    &:hover {
      border-color: $white;
    }
  }

  &__btn {
    position: absolute;
    height: 24px;
    width: 24px;
    color: rgba(white, 50%);
    @include transition(color);

    &:focus,
    &:hover {
      color: $white;
    }

    &--search {
      left: 16px;
    }

    &--close {
      right: 16px;
      padding: 5px;
    }

    &--rotate {
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }

        75% {
          transform: rotate(270deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      animation: rotate 1s linear infinite;
      transform-origin: center;
    }
  }

  &__search-list {
    @media #{$screen-md} {
      position: absolute;
      top: 64px;
      right: 0;
      left: 0;
      z-index: $search-list-z-index;
      max-height: calc(100vh - $header-height-medium);
      overflow-y: auto;
    }
  }
  &__slider {
    margin-top: 8px;
    width: 100%;
  }
  &__no-result {
    padding: 16px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    background-color: $cape-cod;
    color: $white;
    border-radius: $border-radius-xs;
  }
}
</style>
