<template>
  <app-layout>
    <template #header>
      <the-header />
    </template>

    <template #main>
      <router-view />
    </template>

    <template #footer>
      <the-footer />
    </template>
  </app-layout>

  <teleport to="body">
    <transition name="fade">
      <component :is="screenComponent" v-bind="screenComponentAttrs" />
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { useGlobalStore } from './stores/globalStore'

const globalStore = useGlobalStore()

const isLoginModalOpen = computed(() => globalStore.isLoginModalOpen)
const showScreenSpinner = computed(() => globalStore.showScreenSpinner)

const screenComponent = computed(() => {
  if (isLoginModalOpen.value) {
    return defineAsyncComponent(() => import('@/components/LoginModal.vue'))
  } else if (showScreenSpinner.value) {
    return AppSpinner
  }
  return null
})

const screenComponentAttrs = computed(() => {
  if (showScreenSpinner.value) {
    return { type: 'screen' }
  }
  return null
})

function setScreenWidth() {
  globalStore.setScreenWidth(window.innerWidth)
}

onMounted(() => {
  setScreenWidth()
  window.addEventListener('resize', setScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', setScreenWidth)
})
</script>

<style lang="scss" scoped>
@include transition-fade;
</style>
