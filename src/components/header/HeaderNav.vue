<template>
  <nav class="nav" v-if="route.name">
    <ul class="nav__list">
      <li class="nav__item nav__item--unvisible-on-mobile" v-if="isBtnMainShown">
        <nav-btn
          class="nav__btn"
          btn-name="Main"
          component="router-link"
          aria-label="go to main page"
          :to="{ name: 'MainPage' }"
        />
      </li>
      <li class="nav__item">
        <nav-btn
          class="nav__btn"
          btn-name="Genres"
          component="router-link"
          aria-label="go to genres page"
          :to="{ name: 'GenresPage' }"
        >
          <app-icon icon-name="IconGenres" />
        </nav-btn>
      </li>
      <li class="nav__item nav__item--long">
        <transition name="fade">
          <search-form
            class="nav__search-form"
            :is-mobile-form-opened="isMobileSearchFormOpened"
            @toggle-form="toggleMobileSearchForm"
            v-if="!isMobileScreenWidth || isMobileSearchFormOpened"
          />
        </transition>
        <nav-btn
          class="nav__btn nav__btn--search"
          component="button"
          aria-label="open search"
          @click="toggleMobileSearchForm(true)"
        >
          <app-icon icon-name="IconSearch" />
        </nav-btn>
      </li>
      <li class="nav__item">
        <nav-btn
          class="nav__btn"
          :component="accountBtnOptions.component"
          :btn-name="accountBtnOptions.btnName"
          aria-label="open search"
          :to="accountBtnOptions.to"
          @click="handleAccountBtn"
        >
          <app-icon icon-name="IconUser" />
        </nav-btn>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import NavBtn from '@/components/ui/NavBtn.vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/globalStore'
import { useAuthStore } from '@/stores/authStore'
const SearchForm = defineAsyncComponent(() => import('@/components/search/SearchForm.vue'))

interface AccountBtn {
  component: 'button' | 'router-link'
  btnName: string
  to: { name: string } | null
}

const route = useRoute()
const globalStore = useGlobalStore()
const authStore = useAuthStore()

const isMobileSearchFormOpened = ref(false)

const isMobileScreenWidth = computed(() => globalStore.isMobileScreenWidth)
const isBtnMainShown = computed<boolean>(() => route.name !== 'MainPage')
const accountBtnOptions = computed<AccountBtn>(() => {
  if (!authStore.isLogin) {
    return {
      component: 'button',
      btnName: 'Sign in',
      to: null
    }
  }
  return {
    component: 'router-link',
    btnName: authStore.userData?.name || '',
    to: { name: 'AccountPage' }
  }
})

function toggleMobileSearchForm(isOpen: boolean) {
  isMobileSearchFormOpened.value = isOpen
}

function openLoginModal(e: Event) {
  globalStore.toggleLoginModal(true)
  globalStore.setBtnOpenModal(e)
}

function handleAccountBtn(e: Event) {
  if (!authStore.isLogin) {
    openLoginModal(e)
  }
}
</script>

<style scoped lang="scss">
@include transition-fade;

.nav {
  &__list {
    display: flex;
    column-gap: 20px;

    @media #{$screen-md} {
      column-gap: 40px;
    }
  }

  &__item {
    display: flex;
    &--long {
      @media #{$screen-md} {
        flex-grow: 1;
      }
    }
  }

  &__search-form-wrapper,
  &__search-form {
    width: 100%;
  }
}
</style>
