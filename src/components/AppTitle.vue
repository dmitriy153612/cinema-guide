<template>
  <component class="title" :class="className" :is="component">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    size: 'm' | 'l'
  }>(),
  {
    component: 'h1',
    size: 'm'
  }
)

const className = ref({
  'title--m': props.size === 'm',
  'title--l': props.size === 'l'
})
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: $white;

  &--m {
    @media #{$screen-md} {
      font-size: 40px;
      line-height: 48px;
    }
  }
  &--l {
    @media #{$screen-md} {
      font-size: 48px;
      line-height: 56px;
    }
  }
}
</style>
