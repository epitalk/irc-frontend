<template>
  <nav class="second-sidebar expand">
    <div class="d-flex column between h-full">
      <ul class="d-flex column center-y px-1 py-2 h-full gap-2 overflow-y-auto">
        <side-bar-link
          v-for="user in userStore.users"
          :key="user"
          :item="user.username"
          large
        />
      </ul>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink.vue"
import { useUserStore } from "@/stores/user.store";

/*STORE*/
const userStore = useUserStore()
</script>
