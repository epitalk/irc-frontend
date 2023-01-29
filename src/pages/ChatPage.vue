<template>
  <section class="vh-100 w-full">
    <div id="messaging">
      <header class="bg-dark px-2 py-1 d-flex between bb-1">
        <div class="d-flex center-y gap-2">
          <h6>{{ channelStore.currentChannel }}</h6>
        </div>
        <Icon name="more-vertical" />
      </header>

      <Messages :messages="channelStore.messages[channelStore.currentChannel]" />
      <div class="bg-grey-500 p-2 d-flex center-x bt-1">
        <ChatInput @addNewMessage="addNewMessage" />
      </div>
    </div>
  </section>
</template>


<script lang="ts" setup>
import Messages from "@/components/Messaging/Messages.vue";
import Icon from "@/components/Common/Icon.vue";
import ChatInput from "@/components/Fields/ChatInput.vue";
import { watch } from "vue";
import { useChannelStore } from "@/stores/channel.store";
import { SseService } from "@/services/SseService";
import { useAppStore } from "@/stores/app.store";

/*STORE*/
const channelStore = useChannelStore()
const appStore = useAppStore()

const addNewMessage = (message: string) => {
  if (appStore.isInPrivateMessage){
    SseService.addChannelMessage(message)
  }else {
    SseService.addPrivateMessage(message)
  }
}

if (!appStore.isInPrivateMessage){
  /*Messages list*/
  SseService.getChannelMessages()
}


/*WATCHERS*/
watch(() => channelStore.messages.value, (value) => {
  console.log(value);
}, { deep: true });

watch(() => channelStore.currentChannel, () => {
  if (!appStore.isInPrivateMessage){
    SseService.getChannelMessages()
  }
});




</script>
