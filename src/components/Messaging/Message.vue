<template>
  <div v-if="props.message && props.message.username !== SITE_NAME" class="d-grid gap-2 col-auto col-2 row-fit message"
       :class="`message-${props.message.username === username ? 'send' : 'receive'}`">
    <Avatar online>{{ firstLetter }}</Avatar>
    <div class="px-2 py-1 d-flex center-y message-content">
      {{ props.message.content }}
    </div>
  </div>

  <div class="d-flex end-x" v-if="props.message && props.message.username === SITE_NAME">
    <BotMessage v-if="props.message.content === 'list'">
      <span class="text-medium">Voici tout les channels disponible sur le serveur:</span>

      <ul class="bullet-list">
        <li v-for="channel in channelStore.channels" :key="channel">{{ channel }}</li>
      </ul>

    </BotMessage>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { Message as MessageType } from "@/api/message/messages";
import Avatar from "@/components/Common/Avatar.vue";
import BotMessage from "@/components/Messaging/BotMessage.vue";
import { useUserStore } from "@/stores/user.store";
import { onMounted, ref } from "vue";
import { SITE_NAME } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";

/*PROPS*/
const props = defineProps({
  message: { type: Object as PropType<MessageType>, default: null, required: true }
});

/*STORE*/
const userStore = useUserStore();
const channelStore = useChannelStore();
const username = ref(userStore.user?.username);

/*REFS*/
const firstLetter = ref(props.message?.username ? props.message?.username[0] : "U");


onMounted(() => {
  const messageContainer = document.querySelector('.messages')
  if(messageContainer){
    messageContainer.scrollTop = messageContainer.scrollHeight
  }
})

</script>
