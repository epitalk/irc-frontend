<template>
  <div class="relative" v-click-out-side="closeMenu">
    <div class="user-select-none cursor-pointer d-flex gap-1 bt-1 center-y" style="padding: 18px 8px;" @click="openMenu">
      <Avatar src="/images/anonyme-user.jpg" alt="username"/>
      <span>{{ userStore.user?.username || 'unknown' }}</span>
    </div>
    <div class="user-menu" :class="{open: isOpen}" v-if="isOpen">
      <ul>
        <li @click="userStore.logout" class="user__menu--link d-flex center-y">
          <Icon :width="20" :height="20" name="logout" stroke="var(--light)"/>
          <span>Déconnexion</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script lang="ts" setup>
import Icon from "@/components/Common/Icon.vue"
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import Avatar from "@/components/Common/Avatar.vue"

/*Hooks*/
const route = useRoute()
/*Refs*/
const isOpen = ref(false)
/*Store*/
const userStore = useUserStore()
/*Methods*/
const openMenu = () => isOpen.value = !isOpen.value
const closeMenu = () => isOpen.value = false
/*Watchers*/
watch(() => route.name, () => closeMenu());
</script>

<style lang="scss" scoped>
.user__menu--link {
  gap: 8px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: var(--light);
  svg {
    position: relative;
    top: -1px;
  }
  span {
    position: relative;
    top: 1px;
  }
  &:hover {
    background: var(--grey-400);
  }
}

.user-menu {
  border-radius: 6px;
  background: var(--grey-300);
  position: absolute;
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  padding: 8px;
  width: 100%;
  opacity: 0;
  left: 5px;
  border: 1px solid var(--grey-200);
  transition-property: opacity;
  transition-duration: 2s;
  transition-timing-function: ease-in-out;
  &.open {
    top: -40px;
    opacity: 1;
  }
}
</style>
