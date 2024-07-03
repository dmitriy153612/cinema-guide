<template>
  <header ref="header" class="header">
    <app-container class="header__container">
      <app-logo class="header__logo" />
      <header-nav class="header__nav" />
    </app-container>
  </header>
</template>

<script setup lang="ts">
import AppContainer from '@/components/layouts/AppContainer.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import HeaderNav from '@/components/header/HeaderNav.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const header = ref<HTMLElement | null>(null)

function setHeaderPosition(header: HTMLElement): () => void {
  let lastScroll = window.scrollY
  let currentTopHeaderPosition = 0
  const headerHeight = header.offsetHeight

  return () => {
    const currentScroll = window.scrollY
    const scrollDifference = Math.abs(currentScroll - lastScroll)
    if (currentScroll > lastScroll && currentTopHeaderPosition > -headerHeight) {
      currentTopHeaderPosition = Math.max(currentTopHeaderPosition - scrollDifference, -headerHeight)
    } else if (currentScroll < lastScroll && currentTopHeaderPosition < 0) {
      currentTopHeaderPosition = Math.min(currentTopHeaderPosition + scrollDifference, 0)
    }
    header.style.top = currentTopHeaderPosition + 'px'
    lastScroll = currentScroll
  }
}

onMounted(() => { 
  if (!header.value) return

  const updateHeaderPosition = setHeaderPosition(header.value)
  addEventListener('scroll', updateHeaderPosition)

  onUnmounted(() => {
    removeEventListener('scroll', updateHeaderPosition)
  })
})

</script>

<style scoped lang="scss">
.header {
  position: relative;
  display: flex;
  align-items: center;
  height: $header-height-mobile;
  background-color: $page-color;
  @media #{$screen-md} {
    column-gap: 40px;
    height: $header-height-medium;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    @media #{$screen-md} {
      column-gap: 40px;
    }
  }

  &__logo {
    flex-shrink: 0;
    width: 136px;
    height: 18px;

    @media #{$screen-md} {
      width: 240px;
      height: 32px;
    }
  }

  &__nav {
    @media #{$screen-md} {
      flex-grow: 1;
      max-width: 968px;
    }
  }
}
</style>
