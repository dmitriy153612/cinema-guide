<template>
  <div class="detail" :class="{ 'detail--small': smallSize, 'detail--normal': !smallSize }">
    <app-rating :rating="rating" class="detail__rating" v-if="rating" :smallSize="smallSize" />
    <div class="detail__span-wrapper">
      <span class="detail__span" v-if="getHoursAndMinutes">
        {{ getHoursAndMinutes }}
      </span>
      <span class="detail__span" v-if="year">
        {{ year }}
      </span>
      <span class="detail__span" v-if="genres">
        <ul class="detail__genres-list">
          <li class="detail__genres-item" v-for="(genre, index) in genres" :key="index">
            {{ genre }}
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppRating from '@/components/AppRating.vue'

const props = withDefaults(
  defineProps<{
    rating: number | null
    year: number | null
    genres: string[] | null
    duration: number | null
    smallSize?: boolean
  }>(),
  {
    smallSize: false
  }
)

const getHoursAndMinutes = computed(() => {
  if (!props.duration) return null
  const allMinutes = props.duration
  const hours = Math.trunc(allMinutes / 60)
  const minutes = allMinutes % 60
  return `${hours} hr ${minutes} min`
})
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  align-items: center;

  &--normal {
    column-gap: 16px;
  }

  &--normal & {
    &__span-wrapper {
      column-gap: 16px;
    }

    &__span {
      @media #{$screen-md} {
        font-size: 18px;
        line-height: 24px;
      }
    }
  }

  &--small {
    column-gap: 12px;
  }

  &--small & {
    &__span-wrapper {
      column-gap: 16px;
    }

    &__genres-list {
      flex-wrap: wrap;
    }

    &__rating {
      align-self: flex-start;
    }
  }

  &__span-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  &__span {
    font-size: 14px;
    line-height: 20px;
    color: $silver-sand;
    white-space: nowrap;
  }

  &__genres-list {
    display: flex;
    column-gap: 6px;
  }
}
</style>
