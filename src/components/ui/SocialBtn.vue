<template>
  <component class="social-btn" :is="component">
    <span class="social-btn__icon-wrapper">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    component?: 'a' | 'button' | 'router-link'
  }>(),
  {
    component: 'a'
  }
)
</script>

<style scoped lang="scss">
.social-btn {
  display: flex;

  &__icon-wrapper {
    height: 24px;
    width: 24px;

    :slotted(svg) {
      color: rgba($white, 80%);
      @include transition(color);
    }

    &:focus,
    &:hover {
      :slotted(svg) {
        color: $melrose;
      }
    }

    @media #{$screen-md} {
      height: 36px;
      width: 36px;
    }
  }
}
</style>
