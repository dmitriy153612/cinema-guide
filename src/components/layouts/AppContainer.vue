<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  padding-inline: $containerInlinePadding;
  max-width: $maxContainerWidth;
  min-width: $minContainerWidth;
  margin: 0 auto;
}
</style>
