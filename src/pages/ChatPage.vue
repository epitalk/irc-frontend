<template>
  <section class="vh-100 w-full">
    <div id="messaging">
      <header class="bg-dark px-2 py-1 d-flex between bb-1">
        <div class="d-flex center-y gap-2">
          <h6>{{ channelStore.currentChannel }}</h6>
        </div>
        <Icon name="more-vertical" />
      </header>

      <Messages :messages="messages[channelStore.currentChannel]" />
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
import { ref, watch } from "vue";
import { API_URL, MERCURE_URL } from "@/utils/env";
import axios from "axios";
import type { Message as MessageType } from "@/api/message/messages";
import { useUserStore } from "@/stores/user.store";
import { useChannelStore } from "@/stores/channel.store";

/*STORE*/
const userStore = useUserStore();
const channelStore = useChannelStore()

/*REFS*/
const eventSource = ref(undefined as EventSource | undefined)

/*MERCURE SSE*/
const messages = ref({} as { [key: string]: MessageType[] });

/*Messages list*/
const getChannelMessages = () => {
  if (eventSource.value){
    eventSource.value.close()
  }
  const url = new URL(MERCURE_URL);
  url.searchParams.append("topic", channelStore.currentChannel);
  eventSource.value = new EventSource(url, { withCredentials: true });

  eventSource.value.onmessage = (e: {data: string}) => {
    if (!messages.value[channelStore.currentChannel]){
      messages.value[channelStore.currentChannel] = []
    }
    messages.value[channelStore.currentChannel].push(JSON.parse(e.data).message)
  }
}

getChannelMessages()

/*METHODS*/
const addNewMessage = (message: string) => {
  axios.post(API_URL + "/chat/channel/" + channelStore.currentChannel, {
    message: {
      username: userStore.user?.username,
      content: message
    }
  });
};

/*WATCHERS*/
watch(() => messages.value, (value) => {
  console.log(value);
}, { deep: true });

watch(() => channelStore.currentChannel, () => {
  getChannelMessages()
});




</script>
