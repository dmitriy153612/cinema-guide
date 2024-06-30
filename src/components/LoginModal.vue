<template>
  <app-overlay color="light" @close="closeModal">
    <focus-trap>
      <div class="modal-box" :class="{ 'modal-box--success': true }">
        <circle-btn class="modal-box__btn-close" aria-label="close" appearance="modal" @click="closeModal">
          <app-icon icon-name="IconClose" />
        </circle-btn>
        <app-icon class="modal-box__logo" icon-name="IconLogo" />
        <h2 class="modal-box__title">{{ title }}</h2>
        <transition name="flip" mode="out-in">
          <p class="modal-box__message" v-if="currentForm === 'success'">
            Registration successful! Please use your email to log in.
          </p>
          <app-form
            class="modal-box__form"
            btn-name="Sign in"
            :inputs="loginInputConfig"
            :rules="loginInputRules"
            :server-errors="loginServerErrors"
            :show-spinner="authStore.isLoginLoading"
            form-name="signIn"
            @submit-form="submitForm"
            v-else-if="currentForm === 'authorization'"
          />
          <app-form
            class="modal-box__form"
            btn-name="Sign up"
            :inputs="RegistrationInputConfig"
            :rules="RegistrationInputRules"
            :server-errors="RegistrationServerErrors"
            :show-spinner="authStore.isRegistrationLoading"
            form-name="signUp"
            @submit-form="submitForm"
            v-else-if="currentForm === 'registration'"
          />
        </transition>
        <primary-btn
          :btn-name="btnName"
          bg-color="light"
          @click="toggleForm"
          v-if="currentForm === 'success'"
        />
        <button class="modal-box__text-btn" @click="toggleForm" v-else>
          {{ btnName }}
        </button>
      </div>
    </focus-trap>
  </app-overlay>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppOverlay from '@/components/layouts/AppOverlay.vue'
import AppIcon from '@/components/AppIcon.vue'
import PrimaryBtn from '@/components/ui/PrimaryBtn.vue'
import CircleBtn from '@/components/ui/CircleBtn.vue'
import AppForm from '@/components/AppForm.vue'
import FocusTrap from 'vue-focus-lock'
import type { InputConfig, NamedValidatorFunction, SubmitForm } from '@/types/form'
import {
  isUserLogin,
  isUserRegistration,
  type UserLogin,
  type UserRegistration
} from '@/types/user'
import { validator } from '@/utils/validator'
import { useGlobalStore } from '@/stores/globalStore'
import { useAuthStore } from '@/stores/authStore'

const globalStore = useGlobalStore()
const authStore = useAuthStore()
const { email, minLength, required, sameAs } = validator
const currentForm = ref('authorization')

const title = computed(() => {
  return currentForm.value === 'authorization' ? 'Authorization' : 'Registration'
})

const btnName = computed<string>(() => {
  return currentForm.value === 'authorization' ? 'Registration' : 'Authorization'
})

const loginServerErrors = ref<Record<string, string[]> | null>(null)
const RegistrationServerErrors = ref<Record<string, string[]> | null>(null)

const loginInputConfig: InputConfig[] = [
  {
    name: 'email',
    iconName: 'IconEmail',
    placeholder: 'E-mail',
    focus: true,
    // value: 'email@email.com'
  },
  {
    name: 'password',
    iconName: 'IconKey',
    placeholder: 'Password',
    type: 'password',
    // value: '111111'
  }
]

const RegistrationInputConfig: InputConfig[] = [
  {
    name: 'email',
    iconName: 'IconEmail',
    placeholder: 'E-mail',
    focus: true
  },
  {
    name: 'name',
    iconName: 'IconUser',
    placeholder: 'Name'
  },
  {
    name: 'surname',
    iconName: 'IconUser',
    placeholder: 'Surname'
  },
  {
    name: 'password',
    iconName: 'IconKey',
    placeholder: 'Password',
    type: 'password'
  },
  {
    name: 'confirmPassword',
    iconName: 'IconKey',
    placeholder: 'Confirm password',
    type: 'password'
  }
]

const loginInputRules: NamedValidatorFunction[] = [
  { validate: email('email') },
  { validate: required('password') }
]

const RegistrationInputRules: NamedValidatorFunction[] = [
  { validate: email('email') },
  { validate: minLength('name', 2) },
  { validate: minLength('surname', 2) },
  { validate: minLength('password', 6) },
  { validate: required('confirmPassword') },
  { validate: sameAs('confirmPassword', 'password') }
]

async function closeModal() {
  globalStore.toggleLoginModal(false)
}

function toggleForm() {
  if (currentForm.value === 'authorization') {
    currentForm.value = 'registration'
  } else if (currentForm.value === 'registration' || currentForm.value === 'success') {
    currentForm.value = 'authorization'
  }
}

async function submitLoginForm(formData: UserLogin) {
  await authStore.fetchLogin(formData)
  if (authStore.isLogin) {
    globalStore.toggleLoginModal(false)
  } else {
    loginServerErrors.value = {
      email: ['Incorrect E-mail or password'],
      password: ['Incorrect E-mail or password']
    }
  }
}

async function submitRegistrationForm(formData: UserRegistration) {
  await authStore.fetchRegistration(formData)
  if (authStore.isRegistrationSuccess) {
    currentForm.value = 'success'
  } else {
    RegistrationServerErrors.value = {
      email: ['This email address is already registered']
    }
  }
}

function submitForm(data: SubmitForm) {
  if (data.formName === 'signIn' && isUserLogin(data.formData)) {
    submitLoginForm(data.formData)
  } else if (data.formName === 'signUp' && isUserRegistration(data.formData)) {
    submitRegistrationForm(data.formData)
  }
}
</script>

<style scoped lang="scss">
.flip-enter-active,
.flip-leave-active {
  @include transition(opacity, transform);
}

.flip-enter-from,
.flip-leave-to {
  opacity: 0;
  transform: rotateX(90deg);
}

.modal-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 20px 32px;
  width: 335px;
  background-color: $white;
  border-radius: $border-radius-m;

  @media #{$screen-md} {
    padding: 64px 40px;
    width: 420px;
  }

  &__btn-close {
    position: absolute;
    top: 8px;
    right: 8px;

    @media #{$screen-md} {
      top: 0;
      right: -72px;
    }
  }

  &__logo {
    margin-bottom: 40px;
    width: 180px;
    height: 24px;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: $black;
  }

  &__form {
    margin-bottom: 24px;
  }

  &__message {
    padding-bottom: 24px;
    font-size: 18px;
    line-height: 24px;
    color: $black;
  }

  &__text-btn {
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    color: $black;
    @include transition(color);

    &:focus,
    &:hover {
      color: $blue-marguerite;
    }
  }
}
</style>
