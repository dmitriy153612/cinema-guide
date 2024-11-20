<template>
  <div class="layout">
    <div class="layout__container layout__container--header">
      <slot name="header" />
    </div>
    <div class="layout__container layout__container--content">
      <slot name="main" />
    </div>
    <div class="layout__container layout__container--footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $page-color;

  &__container--header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $header-z-index;
  }

  &__container--content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-top: $header-height-mobile;

    @media #{$screen-md} {
      padding-top: $header-height-medium;
    }
  }
}
</style>
