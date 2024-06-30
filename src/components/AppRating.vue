<template>
  <div class="rating" :class="classList">
    <div class="rating__icon-wrapper">
      <app-icon icon-name="IconStar" />
    </div>
    <div class="rating__text">
      {{ formated }}
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    rating: number
    smallSize?: boolean
  }>(),
  {
    smallSize: false
  }
)

const formated = computed(() => {
  return props.rating.toFixed(1)
})

const classList = computed(() => ({
  'rating--low-rating': props.rating <= 4.2,
  'rating--medium-rating': props.rating <= 6.3,
  'rating--high-rating': props.rating <= 7.5,
  'rating--highest-rating': props.rating > 7.5,
  'rating--small-size': props.smallSize,
  'rating--normal-size': !props.smallSize
}))
</script>

<style scoped lang="scss">
.rating {
  display: flex;
  align-items: center;
  column-gap: 4px;
  padding: 4px 12px;
  width: max-content;
  border-radius: $border-radius-s;
  color: $white;

  &--normal-size & {
    &__text {
      font-size: 18px;
      line-height: 24px;
    }
    &__icon-wrapper {
      width: 18px;
      height: 18px;
    }
  }

  &--small-size & {
    &__text {
      font-size: 12px;
      line-height: 16px;
    }
    &__icon-wrapper {
      width: 10px;
      height: 10px;
    }
  }

  &--low-rating {
    background-color: $thunderbird;
  }

  &--medium-rating {
    background-color: $boulder;
  }

  &--high-rating {
    background-color: $forest-green;
  }

  &--highest-rating {
    background-color: $pirate-gold;
  }

  &__icon-wrapper {
    font-size: 0;
  }

  &__text {
    font-weight: 700;
  }
}
</style>
