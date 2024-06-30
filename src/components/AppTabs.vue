<template>
  <div class="tabs">
    <app-container>
      <ul class="tabs__control">
        <li class="tabs__control-item" v-for="(tab, index) in tabs" :key="index">
          <nav-btn
            appearance="tab"
            :btn-name="tab.btnName"
            :checked="checkedTab === tab.tabName"
            @click.prevent="toggleTab(tab.tabName)"
          >
            <app-icon :icon-name="tab.iconName" />
          </nav-btn>
        </li>
      </ul>
    </app-container>
    <transition-group tag="ul" class="tabs__display-list">
      <li
        class="tabs__display"
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="checkedTab === tab.tabName"
      >
        <slot :name="tab.tabName" />
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AppContainer from '@/components/layouts/AppContainer.vue'
import NavBtn from '@/components/ui/NavBtn.vue'
import type { Tabs } from '@/types/tabs'

const props = defineProps<{
  tabs: Tabs[]
  checkedTab: string
}>()

const checkedTab = ref<string>(props.checkedTab)

function toggleTab(tabName: string) {
  checkedTab.value = tabName
}
</script>

<style scoped lang="scss">
.tabs {
  &__control {
    display: flex;
    column-gap: 24px;

    @media #{$screen-md} {
      column-gap: 64px;
    }
  }

  &__display-list {
    position: relative;
  }

  &__display {
    display: block;
  }
}

.v-enter-active,
.v-leave-active {
  @include transition(opacity);
  position: absolute;
  right: 0;
  left: 0;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
