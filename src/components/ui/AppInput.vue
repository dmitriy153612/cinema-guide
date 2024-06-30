<template>
  <div class="input-box" :class="inputClass">
    <input
      class="input-box__input"
      :type="inputType"
      :placeholder="placeholder"
      @input="emit('input')"
      v-focus="focus || false"
      v-model.trim="model"
    />
    <div class="input-box__icon-container" v-if="inputIconName">
      <app-icon :icon-name="inputIconName" />
    </div>
    <ul class="input-box__error-list" v-if="errors && errors.length">
      <li class="input-box__error-item" v-for="(error, index) in errors" :key="index">
        <span class="input-box__error">{{ error }}</span>
      </li>
    </ul>
    <button
      class="input-box__btn-eye"
      :class="{ 'input-box__btn-eye--checked': isPasswordVisible }"
      aria-label="show password"
      type="button"
      v-if="type === 'password'"
      @click.prevent="toggleInputType"
    >
      <app-icon icon-name="IconEye" />
    </button>
    <button class="input-box__btn-close" v-if="appearance === 'search'">
      <app-icon icon-name="IconClose" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    appearance?: 'search' | 'form'
    inputIconName?: string
    type?: 'text' | 'password'
    focus?: boolean
    errors?: string[]
  }>(),
  {
    placeholder: '',
    appearance: 'form',
    type: 'text'
  }
)

const emit = defineEmits<{
  (input: 'input'): void
}>()

const model = defineModel()

const inputClass = computed(() => ({
  'input-box--search': props.appearance === 'search',
  'input-box--form': props.appearance === 'form',
  'input-box--error': props.errors,
  'input-box--password': props.type === 'password'
}))

const isPasswordVisible = ref<boolean>(false)

const inputType = computed(() => {
  if (props.type === 'password' && isPasswordVisible.value === true) {
    return 'text'
  }
  return props.type
})

function toggleInputType() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style scoped lang="scss">
.input-box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &--form & {
    &__input {
      padding: 16px 16px 16px 52px;
      border-color: rgba($black, 0.4);
      color: $black;

      &::placeholder {
        color: rgba($black, 0.4);
      }

      &:focus,
      &:hover {
        border-color: $blue-marguerite;
      }
    }

    &__input:hover + &__icon-container {
      display: none;
    }

    &__icon-container {
      top: 16px;
      color: rgba($black, 0.4);
    }
  }

  &--form &__input:focus,
  &--form &__input:hover + &__icon-container {
    color: $melrose;
  }

  &--search & {
    &__input {
      padding: 12px 56px 12px 52px;
      color: $white;
      background-color: $cape-cod;

      &::placeholder {
        color: rgba($white, 0.5);
      }

      &:focus,
      &:hover {
        border-color: $white;
      }
    }

    &__icon-container {
      width: 24px;
      height: 24px;
      color: rgba($white, 0.5);
    }

    &__btn-close {
      position: absolute;
      right: 16px;
      display: flex;
      width: 24px;
      height: 24px;
      font-size: 0;
      cursor: pointer;

      :deep(svg) {
        color: rgba($white, 0.5);
        @include transition(color);
      }

      &:focus,
      &:hover {
        :deep(svg) {
          color: $white;
        }
      }
    }
  }

  &--password & {
    &__btn-eye {
      position: absolute;
      top: 17px;
      right: 10px;
      border: 1px solid transparent;
      border-radius: 3px;
      height: 24px;
      width: 24px;
      color: rgba($black, 0.4);
      cursor: pointer;
      @include transition(color, border-color);
      &--checked {
        color: $melrose;
      }
      &:focus {
        border-color: $melrose;
      }
    }
    &__input {
      padding-right: 40px;
    }
  }

  &--error & {
    &__input {
      border-color: $bittersweet;
    }

    &__icon-container {
      color: $bittersweet;
    }
  }

  &__input {
    width: 100%;
    border: 1px solid transparent;
    border-radius: $border-radius-xs;
    @include transition(border-color);
    font-size: 18px;
    line-height: 24px;
  }

  &__icon-container {
    position: absolute;
    left: 16px;
    width: 24px;
    height: 24px;
    font-size: 0;

    :deep(svg) {
      @include transition(color);
    }
  }

  &__error {
    padding-left: calc($border-radius-xs / 2);
    font-size: 12px;
    line-height: 1;
    color: $bittersweet;
  }
}
</style>
