<template>
  <div class="overlay" :class="overlayClass" @mousedown.self="emitClose">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, computed, nextTick, watch } from 'vue'
import { useGlobalStore } from '@/stores/globalStore'

const globalStore = useGlobalStore()

const props = withDefaults(
  defineProps<{
    color?: 'light' | 'dark'
    disabled?: boolean
    type?: 'defoult' | 'search' | 'video'
    isHeaderVisible?: boolean
  }>(),
  {
    color: 'light',
    disabled: false,
    isHeaderVisible: false,
    type: 'defoult'
  }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const overlayClass = computed(() => {
  if (props.disabled) {
    return {}
  }
  return {
    'overlay--active': !props.disabled,
    'overlay--dark': props.color === 'dark',
    'overlay--light': props.color === 'light',
    'overlay--mobile-search': props.type === 'search',
    'overlay--video': props.type === 'video',
    'overlay--header': props.isHeaderVisible
  }
})

function emitClose() {
  emit('close')
}

function emitCloseModalByEsc(event: KeyboardEvent) {
  event.key === 'Escape' && emitClose()
}

function focusBtnOpenModal() {
  const btnOpenModal: HTMLElement | null = globalStore.buttonOpenModal
  if (btnOpenModal) {
    nextTick(() => {
      btnOpenModal.focus()
      globalStore.clearBtnOpenModal()
    })
  }
}

watch(
  () => props.disabled,
  (newValue) => {
    if (newValue) {
      document.removeEventListener('keydown', emitCloseModalByEsc)
    } else {
      document.addEventListener('keydown', emitCloseModalByEsc)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  document.body.style.overflowY = 'auto'
  document.removeEventListener('keydown', emitCloseModalByEsc)
  focusBtnOpenModal()
})
</script>

<style scoped lang="scss">
.overlay {
  &--active {
    position: fixed;
    inset: 0;
    z-index: $modal-z-index;
    display: grid;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }

  &--video {
    justify-content: stretch;
  }

  &--mobile-search {
    display: block;
    padding-top: 16px;
    padding-inline: $containerInlinePadding;
    padding-bottom: $containerInlinePadding;
  }

  &--dark {
    background-color: $overlay-color-dark;
  }

  &--light {
    background-color: $overlay-color-light;
  }

  &--header {
    z-index: $search-overlay-z-index;
  }
}
</style>
