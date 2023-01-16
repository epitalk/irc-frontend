<template>
  <main class="w-full d-flex stretch">
    <Sidebar/>
    <router-view></router-view>
  </main>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/Navigations/Sidebar/index.vue"
</script>
