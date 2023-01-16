<script setup lang="ts">
import BlankLayout from './BlankLayout.vue'
import { markRaw, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const layout = ref()
const route = useRoute()

watch(
    () => route.meta?.layout as string | undefined,
    async (metaLayout) => {
      try {
        const component = metaLayout && await import(/* @vite-ignore */ `./${metaLayout}.vue`)
        layout.value = markRaw(component?.default || BlankLayout)
      } catch (e) {
        layout.value = markRaw(BlankLayout)
      }
    },
    { immediate: false }
)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
