<template>
  <router-link class="logo" :to="{ name: 'MainPage' }" aria-label="go to main page">
    <app-icon icon-name="IconLogo" />
  </router-link>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
</script>

<style scoped lang="scss">
.logo {
  position: relative;
  display: flex;
}
</style>
