<template>
  <div :class="typeClass" class="spinner-overlay">
    <div class="spinner-overlay__spinner-wrapper">
      <div class="spinner-overlay__spinner" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'screen'
  }>(),
  {
    type: 'button'
  }
)

const typeClass = ref({
  'spinner-overlay--button-spinner': props.type === 'button',
  'spinner-overlay--screen-spinner': props.type === 'screen'
})
</script>

<style lang="scss" scoped>
.spinner-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $overlay-color-light;

  &--button-spinner {
    border-radius: 5px;
    background-color: $blue-marguerite;
  }

  &--button-spinner & {
    &__spinner {
      border-width: 4px;
      width: 1.5em;
      height: 1.5em;
    }
  }

  &--screen-spinner {
    position: fixed;
    z-index: $screen-speaner-z-index;
  }

  &--screen-spinner & {
    &__spinner {
      border-width: 8px;
      width: 80px;
      height: 80px;
    }
  }

  &__spinner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__spinner {
    border-style: solid;
    border-color: $white;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
