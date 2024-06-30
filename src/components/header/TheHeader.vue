<template>
  <header class="header">
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
