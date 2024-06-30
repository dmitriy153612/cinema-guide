<template>
  <section class="account-sec">
    <app-container>
      <app-title class="account-sec__title" component="h1" size="m"> My account </app-title>
    </app-container>
    <app-tabs :tabs="tabsConfig" :checked-tab="checkedTab">
      <template #favorite>
        <adapted-card-list :movies="favoriteStore.favoritesMovies" card-appearance="buttoned" />
      </template>
      <template #settings>
        <app-container>
          <account-settings
            :config-list="userSettingsConfig"
            :btn-spinner="authStore.isLogoutLoading"
            @logout="logout"
          />
        </app-container>
      </template>
    </app-tabs>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import AppContainer from '@/components/layouts/AppContainer.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppTabs from '@/components/AppTabs.vue'
import AccountSettings from '@/components/account/AccountSettings.vue'
import AdaptedCardList from '@/components/AdaptedCardList.vue'
import type { AccountDataType } from '@/types/accountData'
import type { Tabs } from '@/types/tabs'
import { useAuthStore } from '@/stores/authStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const favoriteStore = useFavoritesStore()

const userName = computed(() => {
  const name: string | undefined = authStore.userData?.name
  const surname: string | undefined = authStore.userData?.surname
  if (name && surname) {
    return {
      fullName: `${capitalizeFirstLetter(name)} ${capitalizeFirstLetter(surname)}`,
      firsLetters: `${capitalizeFirstLetter(name.charAt(0))}${capitalizeFirstLetter(surname.charAt(0))}`
    }
  }
  return {
    fullName: '',
    firsLetters: ''
  }
})

const email = computed(() => authStore.userData?.email || '')

const tabsConfig = ref<Tabs[]>([
  { tabName: 'favorite', btnName: 'Favorite', iconName: 'IconHeart' },
  { tabName: 'settings', btnName: 'Settings', iconName: 'IconUser' }
])
const checkedTab = ref('favorite')

const userSettingsConfig = computed<AccountDataType[]>(() => [
  { title: 'Full name', value: userName.value.fullName, twoSymbols: userName.value.firsLetters },
  { title: 'E-mail', value: email.value, iconName: 'IconEmail' }
])

async function logout() {
  await authStore.fetchLogout()
  router.replace({ name: 'MainPage' })
}
</script>

<style scoped lang="scss">
.account-sec {
  &__title {
    @include section-title-indents;
  }
}
</style>
