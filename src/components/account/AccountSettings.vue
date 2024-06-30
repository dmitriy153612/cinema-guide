<template>
  <div class="account-settings">
    <ul class="account-settings__list">
      <li class="account-settings__item" v-for="(config, index) in configList" :key="index">
        <account-data :config="config" />
      </li>
    </ul>
    <primary-btn
      class="account-settings__btn"
      btn-name="Log out"
      bg-color="light"
      :show-spinner="btnSpinner"
      @click.prevent="emitLogout"
    />
  </div>
</template>

<script setup lang="ts">
import AccountData from '@/components/account/AccountData.vue'
import PrimaryBtn from '@/components/ui/PrimaryBtn.vue'
import type { AccountDataType } from '@/types/accountData'

withDefaults(
  defineProps<{
    configList: AccountDataType[]
    btnSpinner: boolean
  }>(),
  {
    btnSpinner: false
  }
)

const emit = defineEmits<{
  (e: 'logout'): void
}>()

function emitLogout() {
  emit('logout')
}
</script>

<style scoped lang="scss">
.account-settings {
  display: grid;
  width: max-content;
  padding-top: 40px;

  @media #{$screen-md} {
    padding-top: 64px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    margin-bottom: 40px;

    @media #{$screen-md} {
      margin-bottom: 64px;
    }
  }

  &__btn {
    align-self: center;
  }
}
</style>
