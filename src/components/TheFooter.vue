<template>
  <footer class="footer">
    <app-container class="footer__inner">
      <p class="footer__sign">Multimedia Vision LLC</p>
      <div class="footer__copyright">
        <app-icon class="footer__copyright-icon" icon-name="IconCopyright" />
        <span class="footer__copyright-text">All rights reserved.</span>
      </div>
      <social-list :social-config="socialConfig" />
    </app-container>
  </footer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/layouts/AppContainer.vue'
import AppIcon from '@/components/AppIcon.vue'
import SocialList from '@/components/ui/SocialList.vue'
import type { SocialConfig } from '@/types/social'

const socialConfig: SocialConfig[] = [
  {
    name: 'vk',
    url: '#',
    iconName: 'IconVk'
  },
  {
    name: 'youtube',
    url: '#',
    iconName: 'IconYoutube'
  },
  {
    name: 'classmates',
    url: '#',
    iconName: 'IconClassmates'
  },
  {
    name: 'telegram',
    url: '#',
    iconName: 'IconTelegram'
  }
]
</script>

<style scoped lang="scss">
.footer {
  &__inner {
    display: flex;
    flex-direction: column;
    padding-block: 24px;

    @media #{$screen-md} {
      flex-direction: row;
      align-items: center;
    }
  }

  &__sign {
    margin-bottom: 8px;
    color: $white;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;

    @media #{$screen-md} {
      margin: 0 12px 0 0;
    }
  }

  &__copyright {
    display: flex;
    align-items: center;
    column-gap: 12px;
    margin-bottom: 32px;
    color: $gunsmoke;

    @media #{$screen-md} {
      margin: 0 auto 0 0;
    }

    &-icon {
      height: 20px;
      width: 20px;
    }

    &-text {
      font-size: 14px;
      line-height: 20px;

      @media #{$screen-md} {
        font-size: 18px;
        line-height: 24px;
      }
    }
  }
}
</style>
