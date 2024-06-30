<template>
  <component
    :is="component"
    class="nav-btn"
    :class="{
      'nav-btn--nav': appearance === 'nav',
      'nav-btn--tab': appearance === 'tab',
      'nav-btn--tab-checked': checked
    }"
  >
    <span class="nav-btn__icon-wrapper">
      <slot />
    </span>
    <span class="nav-btn__name" v-if="btnName">
      {{ btnName }}
    </span>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    btnName?: string
    component?: 'button' | 'router-link'
    appearance?: 'nav' | 'tab'
    checked?: boolean
  }>(),
  {
    component: 'button',
    appearance: 'nav',
    checked: false
  }
)
</script>
<style scoped lang="scss">
.nav-btn {
  position: relative;
  display: flex;
  align-items: center;
  color: $white;
  font-size: 24px;
  line-height: 32px;

  :slotted(svg) {
    @include transition(color);
  }

  &::before {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid transparent;
    @include transition(border-color);
  }

  &--nav {
    &:focus,
    &:hover {
      :slotted(svg) {
        color: $heliotrope;
      }
    }

    &:focus::before,
    &:hover::before {
      @media #{$screen-md} {
        border-bottom-color: $heliotrope;
      }
    }
  }

  &--nav & {
    &__icon-wrapper {
      @media #{$screen-md} {
        display: none;
      }
    }

    &__name {
      display: none;

      @media #{$screen-md} {
        display: flex;
      }
    }
  }

  &--tab {
    column-gap: 8px;

    &::before {
      bottom: -8px;
    }

    &-checked::before {
      border-bottom-color: $heliotrope;
    }
  }

  &__icon-wrapper {
    height: 24px;
    width: 24px;

    :slotted(svg) {
      color: $white;
    }
  }
}
</style>
