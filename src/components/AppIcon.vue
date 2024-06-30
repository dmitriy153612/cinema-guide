<template>
  <component :is="icon"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps<{
  iconName: string
}>()

const icon = defineAsyncComponent(() => import(`@/components/icons/${props.iconName}.vue`))
</script>
