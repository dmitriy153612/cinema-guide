<template>
  <component class="primary-button" :class="btnClass" :is="component">
    <div class="primary-button__icon-box" v-if="isDefaultSlot || isReplecedIconSlot">
      <transition name="fade">
        <span class="primary-button__icon-wrapper" v-if="isDefaultSlot && !checked">
          <slot />
        </span>
        <span class="primary-button__icon-wrapper" v-else-if="isReplecedIconSlot && checked">
          <slot name="replacedIcon" />
        </span>
      </transition>
    </div>
    <span class="primary-primary-button__name" v-if="btnName">
      {{ btnName }}
    </span>
    <app-spinner v-if="showSpinner" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    component?: 'button' | 'router-link'
    btnName?: string
    showSpinner?: boolean
    bgColor?: 'light' | 'dark'
    checked?: boolean
  }>(),
  {
    component: 'button',
    showSpinner: false,
    bgColor: 'dark',
    checked: false
  }
)

const slots = useSlots()

const isDefaultSlot = computed<boolean>(() => Boolean(slots.default))
const isReplecedIconSlot = computed<boolean>(() => Boolean(slots.replacedIcon))

const btnClass = computed(() => ({
  'primary-button--text': props.btnName,
  'primary-button--icon': isDefaultSlot.value && !props.btnName,
  'primary-button--replaced-icon': isReplecedIconSlot.value,
  'primary-button--replaced-icon-checked': isReplecedIconSlot.value && props.checked,
  'primary-button--dark': props.bgColor === 'dark' || isReplecedIconSlot.value,
  'primary-button--light': props.bgColor === 'light' && !isReplecedIconSlot.value
}))
</script>

<style scoped lang="scss">
@include transition-fade;

.primary-button {
  position: relative;
  display: flex;
  justify-content: center;
  column-gap: 4px;
  padding-block: 16px;
  overflow: hidden;
  border-radius: $border-radius-l;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: $white;
  @include transition(background-color, box-shadow);

  &:active {
    box-shadow: 0px 0px 3px 3px rgba($white, 0.5);
  }

  &--icon {
    padding-inline: 22px;
    min-width: max-content;
  }
  &--text {
    padding-inline: 40px;
  }
  &--dark {
    background-color: $cape-cod;
  }
  &--dark:focus,
  &--dark:hover {
    background-color: $melrose;
  }

  &--light {
    background-color: $blue-marguerite;
  }
  &--light:focus,
  &--light:hover {
    background-color: $melrose;
  }
  &--replaced-icon {
    :slotted(svg) {
      @include transition(transform);
    }
  }
  &--replaced-icon:focus,
  &--replaced-icon:hover {
    background-color: $cape-cod;
    :slotted(svg) {
      transform: scale(1.1);
    }
  }

  &--replaced-icon-checked {
    :slotted(svg) {
      color: $melrose;
    }
  }
  &__icon-box {
    position: relative;
    display: block;
    height: 24px;
    width: 24px;
  }
  &__icon-wrapper {
    position: absolute;
    inset: 0;
  }
}
</style>
