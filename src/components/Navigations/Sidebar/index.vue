<template>
  <nav class="sidebar expand" @click="$emit('click')">
    <div class="d-flex column between h-full">
      <div class="p-2 bb-1 w-full">
        <router-link to="/" @click="$emit('close')">
          <Logo :size="28" large/>
        </router-link>

      </div>
      <ul class="d-flex column center-y px-1 py-2 h-full gap-2 overflow-y-auto">
        <side-bar-link
            @click="$emit('clickPrivateMessage')"
            :class="{active: appStore.isInPrivateMessage}"
            item="@me"
            large/>
        <side-bar-link
            @click="$emit('close')"
            :class="{ active: channelStore.currentChannel === channel.name  && !appStore.isInPrivateMessage}"
            v-for="channel in channelStore.channels"
            :key="channel.id"
            :item="channel.name"
            large/>
      </ul>
      <UserMenu/>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import Logo from "@/components/Brands/Logo.vue";
import { useChannelStore } from "@/stores/channel.store";
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink.vue";
import UserMenu from "@/components/Menus/UserMenu.vue";
import { useAppStore } from "@/stores/app.store";

/*STORE*/
const channelStore = useChannelStore();
const appStore = useAppStore();
</script>


<style lang="scss" scoped>
@import "@/assets/styles/core/mixins";

.sidebar.expand {
  @include down(1000px) {
    position: absolute;
    z-index: 10;
    width: 100vw;

    & .logo {
      justify-content: center;
    }
  }
}
</style>
