<template>
  <nav class="second-sidebar expand">
    <div class="d-flex column between h-full">
      <div class="d-flex column center-y h-full overflow-y-auto">
        <ChatPreview
          v-for="user in userStore.usersWithMessage"
          :author="user.username"
          message="What's the progress on that task?"
          timestamp="10 may"/>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import ChatPreview from "@/components/Messaging/ChatPreview.vue"
import { useUserStore } from "@/stores/user.store";

/*STORE*/
const userStore = useUserStore();
</script>
