<template>
  <form class="form" @submit.prevent="emitForm">
    <ul class="form__list">
      <li class="form__item" v-for="(input, index) in inputs" :key="index">
        <app-input
          :input-icon-name="input.iconName"
          :placeholder="input.placeholder"
          :type="input.type"
          :focus="input?.focus"
          :errors="errors[input.name]"
          @input="removeError(input.name)"
          v-model="formData[input.name]"
        />
      </li>
    </ul>
    <primary-btn
      class="form__btn-submit"
      type="sumbit"
      bg-color="light"
      :show-spinner="showSpinner"
      :btn-name="btnName"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import PrimaryBtn from '@/components/ui/PrimaryBtn.vue'
import type { InputConfig, NamedValidatorFunction, FormName, SubmitForm } from '@/types/form'

const props = defineProps<{
  inputs: InputConfig[]
  btnName: string
  rules?: NamedValidatorFunction[]
  formName: FormName
  showSpinner: boolean
  serverErrors?: Record<string, string[]> | null
}>()

const emit = defineEmits<{
  (e: 'submitForm', data: SubmitForm): void
}>()

const formData = ref<Record<string, string>>({})
const errors = ref<Record<string, string[]>>({})

props.inputs.forEach((input) => {
  formData.value[input.name] = input.value || ''
})

function validateForm(formData: Record<string, string>) {
  const errors: Record<string, string[]> = {}
  props.rules?.forEach((rule) => {
    const validateResult: Record<string, string> | null = rule.validate(formData)
    if (validateResult) {
      const [field, message] = Object.entries(validateResult)[0]
      if (field in errors) {
        errors[field].push(message)
      } else {
        errors[field] = [message]
      }
    }
  })
  return errors
}

function removeError(fieldName: string) {
  delete errors.value[fieldName]
}

function emitForm() {
  if (!props.serverErrors || (props.serverErrors && !Object.keys(props.serverErrors).length)) {
    errors.value = validateForm(formData.value)
  }

  if (!Object.keys(errors.value).length) {
    const data: SubmitForm = {
      formData: formData.value,
      formName: props.formName
    }

    emit('submitForm', data)
  }
}

watch(
  () => props.serverErrors,
  (serverErrors) => {
    if (serverErrors) {
      errors.value = serverErrors
    }
  }
)
</script>

<style scoped lang="scss">
.form {
  width: 100%;

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-bottom: 24px;
  }

  &__btn-submit {
    width: 100%;
  }
}
</style>
