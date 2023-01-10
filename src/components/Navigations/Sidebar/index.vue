<template>
  <nav class="sidebar" :class="{ expand }">
    <button class="toggle" @click="onExpand">
      <Icon name="chevron-left" v-if="expand === true"/>
      <Icon name="chevron-right" v-else/>
    </button>

    <div class="d-flex column between h-full">
      <div class="p-1 bb-1 w-full">
        <Logo :large="expand"/>
      </div>
      <ul class="d-flex column center-y px-1 py-2 h-full gap-2">
        <side-bar-link
            :class="{ active: route.path === item.to }"
            v-for="item in items"
            :key="item.to"
            :item="item"
            :icon="item.icon"
            :large="expand"
        />
      </ul>
      <div class="d-flex gap-1 bt-1 p-1 center-y">
        <Avatar src="assets/images/avatar.png" alt="username"/>
        <span v-if="expand">username</span>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Icon from "@/components/Common/Icon.vue"
import Logo from "@/components/Brands/Logo.vue"
import SideBarLink from "@/components/Navigations/Sidebar/SideBarLink/index.vue"
import Avatar from "@/components/Common/Avatar.vue"
import items from "./items.json"
import { useRoute } from "vue-router";


const expand = ref(false)
const onExpand = () => expand.value = !expand.value

const route = useRoute()
</script>
