<template>
  <nav class="sidebar expand">
    <div class="d-flex column between h-full">
      <div class="p-2 bb-1 w-full">
        <Logo :size="28" large/>
      </div>
      <ul class="d-flex column center-y px-1 py-2 h-full gap-2 overflow-y-auto">
        <side-bar-link
            :class="{ active: route.path.includes(channel) || (route.path === '/' && channel === 'general') }"
            v-for="channel in channels"
            :key="channel"
            :item="channel"
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
import Avatar from "@/components/Common/Avatar.vue"
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { ref } from "vue";
import { useChannelStore } from "@/stores/channel.store";
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink.vue"


/*HOOKS*/
const route = useRoute()

/*STORE*/
const userStore = useUserStore()
const channelStore = useChannelStore()

const username = ref(userStore.user?.username || 'unknown')

/*REFS*/
const channels = ref(channelStore.channels)


// /*WATCHERS*/
// watch(() => channels.value, (channels) => {
//   content.value = value
// });
</script>
