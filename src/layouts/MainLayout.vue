<template>
  <main class="w-full d-flex stretch">
    <Sidebar/>
    <slot />
  </main>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/Navigations/Sidebar/index.vue"
</script>
