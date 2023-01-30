<template>
  <nav class="second-sidebar expand">
    <div class="d-flex column between h-full">
      <div class="d-flex column center-y h-full overflow-y-auto">
        <ChatPreview
          v-for="user in userStore.usersWithMessage"
          :key="user.id"
          :author="user.username"
          :message="computedMessage(user)"
          :timestamp="computedTimeStamp(user)"
          />
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import ChatPreview from "@/components/Messaging/ChatPreview.vue"
import { useUserStore } from "@/stores/user.store";
import type { usersWithMessage } from "@/stores/user.store";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

/*STORE*/
const userStore = useUserStore();
const route = useRoute()
const router = useRouter()

const goToFirst = () => {
  if(route.path === "/channel/@me"){
    const firstUserWithMessage = userStore.usersWithMessage[0]?.username

    if (firstUserWithMessage){
      router.push('/channel/@me/' + firstUserWithMessage)
    }
  }
}
goToFirst()

const computedMessage = (user: usersWithMessage) => {
  return user.messages[user.messages.length - 1] ? user.messages[user.messages.length - 1].content : null
}
const computedTimeStamp = (user: usersWithMessage) => {
  return user.messages[user.messages.length - 1] ? user.messages[user.messages.length - 1].created_at : null
}

/*WATCHERS*/
watch(() =>  userStore.usersWithMessage, (value) => {
    goToFirst()
}, {deep: true});

</script>
