<template>
  <button class="close-btn" :class="btnClass">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    appearance: 'video' | 'modal' | 'card'
  }>(),
  {}
)

const btnClass = computed(() => ({
  'close-btn--video': props.appearance === 'video',
  'close-btn--modal': props.appearance === 'modal',
  'close-btn--card': props.appearance === 'card'
}))
</script>

<style scoped lang="scss">
.close-btn {
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  background-color: $white;

  &:focus,
  &:hover {
    :slotted(svg) {
      color: rgba($black, 40%);
    }
  }

  :slotted(svg) {
    @include transition(color);
    color: $black;
  }

  &--card {
    width: 40px;
    height: 40px;
    padding: 13px;
  }

  &--modal {
    width: 48px;
    height: 48px;
    padding: 15px;
  }

  &--video {
    width: 32px;
    height: 32px;
    padding: 9px;

    // @media #{$screen-md} {
    //   width: 48px;
    //   height: 48px;
    //   padding: 14px;
    // }
  }
}
</style>
