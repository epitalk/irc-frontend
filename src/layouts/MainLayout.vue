<template>
  <main class="w-full d-flex stretch" v-if="!appStore.pending">
    <Sidebar/>
    <slot />
  </main>

  <main class="vh-100 centered" v-else>
    <Spinner/>
  </main>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/Navigations/Sidebar/index.vue"
import Spinner from "@/components/Common/Spinner.vue"
import { initApplication } from "@/utils/init";
import { useAppStore } from "@/stores/app.store";
/*STORES*/
const appStore = useAppStore()

/*METHODS*/
initApplication()
</script>
