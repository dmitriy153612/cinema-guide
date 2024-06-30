<template>
  <main class="not-found-page">
    <app-title class="not-found-page__title" component="h1" size="m"> Page Not Found </app-title>
  </main>
</template>

<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue'
</script>

<style scoped lang="scss">
.not-found-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
</style>
