<template>
  <div class="account-data">
    <div class="account-data__cyrcle">
      <div class="account-data__icon-container" v-if="iconName">
        <app-icon :icon-name="iconName" />
      </div>
      <div class="account-data__symbols" v-if="symbols">
        {{ symbols }}
      </div>
    </div>
    <div class="account-data__title">
      {{ config.title }}
    </div>
    <div class="account-data__value">
      {{ config.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AccountDataType } from '@/types/accountData'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps<{
  config: AccountDataType
}>()

const iconName = computed<string | null>(() => props.config?.iconName || null)
const symbols = computed(() => props.config?.twoSymbols || null)
</script>

<style scoped lang="scss">
.account-data {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-areas:
    'cyrcle title'
    'cyrcle value';
  column-gap: 16px;
  row-gap: 4px;
  color: $white;

  &__cyrcle {
    grid-area: cyrcle;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
    background-color: rgba($white, 50%);
    border-radius: 50%;

    @media #{$screen-md} {
      height: 60px;
      width: 60px;
    }
  }

  &__icon-container {
    height: 24px;
    width: 24px;
  }

  &__symbols {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
  }

  &__title {
    grid-area: title;
    font-size: 14px;
    line-height: 20px;
    color: rgba($white, 50%);

    @media #{$screen-md} {
      font-size: 18px;
      line-height: 24px;
      color: $white;
    }
  }

  &__value {
    grid-area: value;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;

    @media #{$screen-md} {
      font-size: 24px;
      line-height: 32px;
    }
  }
}
</style>
