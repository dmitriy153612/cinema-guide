<template>
  <ul class="social-list">
    <li class="social-list__item" v-for="(social, index) in socialConfig" :key="index">
      <social-btn target="_blank" :aria-label="`go to ${social.name}`" :href="social.url">
        <app-icon :icon-name="social.iconName" />
      </social-btn>
    </li>
  </ul>
</template>

<script setup lang="ts">
import SocialBtn from '@/components/ui/SocialBtn.vue'
import AppIcon from '@/components/AppIcon.vue'
import type { SocialConfig } from '@/types/social'

defineProps<{
  socialConfig: SocialConfig[]
}>()
</script>

<style scoped lang="scss">
.social-list {
  display: flex;
  column-gap: 24px;
}
</style>
