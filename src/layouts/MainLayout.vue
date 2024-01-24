<template>
  <main class="w-full d-flex stretch" v-if="!appStore.pending">
    <Sidebar
        v-if="sidebarIsOpen"
        @close="closeSidebar"
        @clickPrivateMessage="clickPrivateMessage"
    />
    <ToggleButton
        @update:open="sidebarIsOpen = $event"
        :open="sidebarIsOpen"
    />
    <SecondSidebar
        v-if="appStore.isInPrivateMessage && secondSidebarIsOpen"
        @back="onBack"
    />
    <router-view />

  </main>

  <main class="vh-100 centered" v-else>
    <Spinner/>
  </main>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/Navigations/Sidebar/index.vue"
import Spinner from "@/components/Common/Spinner.vue"
import { initApplication } from "@/utils/init";
import { useAppStore } from "@/stores/app.store";
import SecondSidebar from "@/components/Navigations/Sidebar/SecondSidebar.vue"
import { onMounted, ref } from "vue";
import ToggleButton from "@/components/Navigations/ToggleButton.vue";
/* REFS */
const sidebarIsOpen = ref(true)
const secondSidebarIsOpen = ref(true)

/*STORES*/
const appStore = useAppStore()

/*METHODS*/
initApplication()

// set sidebarIsOpen to false when the screen is smaller than 1000px
onMounted(() => {
  setSidebarIsOpen()
})

window.addEventListener('resize', () => {
  setSidebarIsOpen()
})

const onBack = () => {
  if(window.innerWidth < 1000){
    appStore.isInPrivateMessage = false
    secondSidebarIsOpen.value = false
    sidebarIsOpen.value = true
  }
}

const clickPrivateMessage = () => {
  if(window.innerWidth < 1000){
    sidebarIsOpen.value = false
    secondSidebarIsOpen.value = true
  }
}

const closeSidebar = () => {
  if(window.innerWidth < 1000){
    sidebarIsOpen.value = false
  }
}

const setSidebarIsOpen = () => {
  if (window.innerWidth < 1000){
    sidebarIsOpen.value = false
    secondSidebarIsOpen.value = false
  } else {
    sidebarIsOpen.value = true
    secondSidebarIsOpen.value = true
  }
}
</script>


<style lang="scss" scoped>
.sidebar-button {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 1.5rem;
  z-index: 100;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: rgba(0,0,0,0.2);
  }
  &:active {
    background: rgba(0,0,0,0.4);
  }
}
</style>
