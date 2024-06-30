<template>
  <focus-trap>
    <app-overlay color="dark" type="video" @close="closeModal">
      <div class="video-box" ref="modalEl">
        <circle-btn class="video-box__btn-close" appearance="video" @click="closeModal">
          <app-icon icon-name="IconClose" />
        </circle-btn>
        <iframe
          class="video-box__video"
          :src="url"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </app-overlay>
  </focus-trap>
</template>

<script setup lang="ts">
import AppOverlay from '@/components/layouts/AppOverlay.vue'
import CircleBtn from '@/components/ui/CircleBtn.vue'
import AppIcon from '@/components/AppIcon.vue'
import FocusTrap from 'vue-focus-lock'
import { computed } from 'vue'

const props = defineProps<{
  trailerYouTubeId: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const url = computed(
  () => `https://www.youtube.com/embed/${props.trailerYouTubeId}?&autoplay=1&rel=0`
)

function closeModal() {
  emit('close')
}
</script>

<style scoped lang="scss">
.video-box {
  position: relative;
  display: flex;
  max-width: min(100%, 960px);
  max-height: min(100%, 540px);
  aspect-ratio: 960 / 540;
  overflow: auto;
  margin: 0 auto;
  width: 100%;
  &--test {
    background-color: red;
  }
  &__btn-close {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &__video {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
