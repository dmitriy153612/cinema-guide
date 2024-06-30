<template>
  <div class="descr">
    <div class="descr__name-box">
      <span class="descr__text descr__text--name">
        {{ name }}
      </span>
      <span class="descr__dots"></span>
    </div>
    <span class="descr__text descr__text--value">
      {{ descrValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    value: string | string[] | null
    currency?: boolean
  }>(),
  {
    currency: false
  }
)

const descrValue = computed(() => {
  const val = props.value
  if (Array.isArray(val) && val.length) {
    return val.join(', ')
  } else if (val) {
    if (props.currency) {
      return '$' + Number(val).toLocaleString()
    }
    return props.value
  }
  return 'unknown'
})
</script>

<style scoped lang="scss">
.descr {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;

  @media #{$screen-md} {
    flex-direction: row;
  }

  &__name-box {
    @media #{$screen-md} {
      display: flex;
      flex-grow: 1;
      max-width: 320px;
    }
  }

  &__text {
    &--name {
      font-size: 14px;
      line-height: 20px;
      color: rgba($white, 50%);

      @media #{$screen-md} {
        font-size: 18px;
        line-height: 24px;
        color: $white;
      }
    }

    &--value {
      font-size: 18px;
      line-height: 24px;
      color: $white;
    }
  }

  &__dots {
    display: none;

    @media #{$screen-md} {
      display: flex;
      flex-grow: 1;
      border-bottom: 1px dashed rgba($white, 50%);
      margin: 0 8px;
      margin-bottom: 5px;
    }
  }
}
</style>
