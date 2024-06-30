<template>
  <div class="movie-content" :class="{ 'movie-content--section-descr': !showBtnAbout }">
    <movie-detail
      class="movie-content__detail"
      :rating="rating"
      :year="year"
      :genres="genres"
      :duration="duration"
    />
    <app-title class="movie-content__title" size="l" component="h1">
      {{ title }}
    </app-title>
    <p class="movie-content__text">
      {{ text }}
    </p>
    <div class="movie-content__buttons-box">
      <primary-btn
        class="movie-content__btn-trailer"
        component="button"
        btn-name="Trailer"
        bg-color="light"
        @click="openVideoModal"
      />
      <primary-btn
        class="movie-content__btn-about"
        btn-name="About"
        component="router-link"
        bg-color="dark"
        :to="{ name: 'MovieDetailPage', params: { id: props.id } }"
        v-if="showBtnAbout"
      />

      <primary-btn
        class="movie-content__btn-like"
        :checked="isFavoriteMovie"
        @click="emitToggleFavorite"
        v-if="showBtnLike"
      >
        <template #replacedIcon>
          <app-icon icon-name="IconHeartFilled" />
        </template>
        <app-icon icon-name="IconHeart" />
      </primary-btn>

      <primary-btn
        class="movie-content__btn-reload"
        :show-spinner="isMovieLoading"
        bg-color="dark"
        aria-label="show random movie"
        @click.prevent="emit('reload')"
        v-if="showBtnReload"
      >
        <app-icon icon-name="IconReload" />
      </primary-btn>
    </div>
    <teleport to="body">
      <transition name="fade">
        <video-modal
          :trailer-you-tube-id="trailerYouTubeId"
          @close="closeVideoModal"
          v-if="isVideoOpened"
        />
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import PrimaryBtn from '@/components/ui/PrimaryBtn.vue'
import AppIcon from '@/components/AppIcon.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import AppTitle from '@/components/AppTitle.vue'
import { useGlobalStore } from '@/stores/globalStore'
import { defineAsyncComponent, ref } from 'vue'
const VideoModal = defineAsyncComponent(() => import('@/components/VideoModal.vue'))

const props = withDefaults(
  defineProps<{
    id: number
    rating: number | null
    year: number | null
    genres: string[] | null
    duration: number | null
    title: string | null
    text: string | null
    trailerYouTubeId: string | null
    isMovieLoading?: boolean
    showBtnLike?: boolean
    showBtnReload?: boolean
    showBtnAbout?: boolean
    isFavoriteMovie: boolean
  }>(),
  {
    isMovieLoading: false,
    showBtnLike: false,
    showBtnReload: false,
    showBtnAbout: true
  }
)

const globalStore = useGlobalStore()

const emit = defineEmits<{
  (e: 'reload'): void
  (e: 'toggleFavorite', id: number): void
}>()

const isVideoOpened = ref<boolean>(false)

function emitToggleFavorite() {
  emit('toggleFavorite', props.id)
}

function openVideoModal(e: Event) {
  globalStore.setBtnOpenModal(e)
  isVideoOpened.value = true
}
function closeVideoModal() {
  isVideoOpened.value = false
}
</script>

<style scoped lang="scss">
@include transition-fade;

.movie-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 10px;
  height: 100%;

  @media #{$screen-md} {
    max-width: 600px;
  }

  &--section-descr & {
    &__buttons-box {
      flex-wrap: nowrap;
      width: 100%;
    }
  }

  &__detail {
    margin-bottom: 12px;

    @media #{$screen-md} {
      margin-bottom: 16px;
    }
  }

  &__text {
    margin-top: 12px;
    margin-bottom: 32px;
    font-size: 18px;
    line-height: 24px;
    color: $silver-sand;

    @media #{$screen-md} {
      font-size: 24px;
      line-height: 32px;
      margin-top: 16px;
      margin-bottom: 60px;
    }
  }

  &__buttons-box {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 0 auto;
    max-width: 500px;

    @media #{$screen-md} {
      flex-wrap: nowrap;
      margin: 0;
      max-width: none;
    }
  }

  &__btn-trailer {
    flex-basis: 100%;
    flex-grow: 1;

    @media #{$screen-md} {
      flex-basis: auto;
    }
  }

  &__btn-about {
    flex-grow: 1;
  }
}
</style>
