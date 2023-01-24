<script setup lang="ts">
import BlankLayout from "./BlankLayout.vue";
import Spinner from "@/components/Common/Spinner.vue";
import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/app.store";

const layout = ref();
const route = useRoute();
const appStore = useAppStore();
watch(() => route.meta?.layout as string | undefined, async (metaLayout) => {
  appStore.setLayoutPending(true);
  try {
    const component = metaLayout && await import(/* @vite-ignore */ `./${metaLayout}.vue`);
    layout.value = markRaw(component?.default || BlankLayout);
  } catch (e) {
    layout.value = markRaw(BlankLayout);
  }
  appStore.setLayoutPending(false)
}, { immediate: false });
</script>

<template>
  <main class="vh-100 centered" v-if="appStore.layoutPending">
    <Spinner />
  </main>
  <component :is="layout" v-else>
    <router-view />
  </component>
</template>
