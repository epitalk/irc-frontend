<template>
  <nav class="sidebar expand">
    <div class="d-flex column between h-full">
      <div class="p-2 bb-1 w-full">
        <router-link to="/">
          <Logo :size="28" large/>
        </router-link>

      </div>
      <ul class="d-flex column center-y px-1 py-2 h-full gap-2 overflow-y-auto">
        <side-bar-link
          item="@me"
          large
        />
        <side-bar-link
            :class="{ active: channelStore.currentChannel === channel.name }"
            v-for="channel in channelStore.channels"
            :key="channel"
            :item="channel.name"
            large
        />
      </ul>
      <UserMenu/>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import Logo from "@/components/Brands/Logo.vue"
import { useChannelStore } from "@/stores/channel.store";
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink.vue"
import UserMenu from "@/components/Menus/UserMenu.vue"

/*STORE*/
const channelStore = useChannelStore()


</script>
