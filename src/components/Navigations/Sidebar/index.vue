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
            :class="{ active: channelStore.currentChannel === channel.name }"
            v-for="channel in channels"
            :key="channel"
            :item="channel.name"
            large
        />
      </ul>
      <div class="d-flex gap-1 bt-1 center-y" style="padding: 18px 8px;">
        <Avatar src="/images/anonyme-user.jpg" alt="username"/>
        <span>{{ userStore.user?.username || 'unknown' }}</span>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import Logo from "@/components/Brands/Logo.vue"
import Avatar from "@/components/Common/Avatar.vue"
import { useUserStore } from "@/stores/user.store";
import { ref } from "vue";
import { useChannelStore } from "@/stores/channel.store";
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink.vue"

/*STORE*/
const userStore = useUserStore()
const channelStore = useChannelStore()


/*REFS*/
const channels = ref(channelStore.channels)
</script>
