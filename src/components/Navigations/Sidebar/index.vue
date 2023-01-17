<template>
  <nav class="sidebar expand">
    <div class="d-flex column between h-full">
      <div class="p-2 bb-1 w-full">
        <Logo :size="28" large/>
      </div>
      <ul class="d-flex column center-y px-1 py-2 h-full gap-2">
        <side-bar-link
            :class="{ active: route.path === item.to }"
            v-for="item in items"
            :key="item.to"
            :item="item"
            large
        />
      </ul>
      <div class="d-flex gap-1 bt-1 center-y" style="padding: 18px 8px;">
        <Avatar src="/images/anonyme-user.jpg" alt="username"/>
        <span>{{ username }}</span>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import Logo from "@/components/Brands/Logo.vue"
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink.vue"
import Avatar from "@/components/Common/Avatar.vue"
import items from "./items.json"
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { ref } from "vue";

/*HOOKS*/
const route = useRoute()

/*STORE*/
const userStore = useUserStore()
const username = ref(userStore.user?.username || 'unknown')
</script>
