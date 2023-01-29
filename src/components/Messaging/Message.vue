<template>
  <div v-if="props.message && props.message.username !== SITE_NAME" class="d-grid gap-2 col-auto col-2 row-fit message"
       :class="`message-${props.message.username === username ? 'send' : 'receive'}`">
    <Avatar :title="props.message.username" online>{{ firstLetter }}</Avatar>
    <div class="px-2 py-1 d-flex center-y message-content">
      {{ props.message.content }}
    </div>
  </div>

  <div class="d-flex end-x" v-if="props.message && props.message.username === SITE_NAME">
    <BotMessage v-if="props.message.content === 'list'">
      <span class="text-medium">Voici tout les channels disponible sur le serveur:</span>

      <ul class="bullet-list">
        <li v-for="channel in channelStore.channels" :key="channel">{{ channel.name }}</li>
      </ul>

    </BotMessage>
    <BotMessage v-if="props.message.content === 'channel_users'">
      <span class="text-medium" v-if="fullCurrentChannel &&
      fullCurrentChannel.users.length">Voici tout les utilisateurs sur le channel {{ channelStore.currentChannel }}:</span>

      <span class="text-medium" v-else>Aucun utilisateur sur le channel {{ channelStore.currentChannel }}</span>

      <ul class="bullet-list" v-if="fullCurrentChannel">
        <li v-for="user in fullCurrentChannel.users" :key="user.id">{{ user.username }}</li>
      </ul>

    </BotMessage>
    <BotMessage v-else>
      {{ props.message.content }}
    </BotMessage>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { MessageCommand } from "@/api/message/messages";
import Avatar from "@/components/Common/Avatar.vue";
import BotMessage from "@/components/Messaging/BotMessage.vue";
import { useUserStore } from "@/stores/user.store";
import { onMounted, ref } from "vue";
import { SITE_NAME } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";
import { ChannelService } from "@/services/ChannelService";

/*PROPS*/
const props = defineProps({
  message: { type: Object as PropType<MessageCommand>, default: null, required: true }
});

/*STORE*/
const userStore = useUserStore();
const channelStore = useChannelStore();
const username = ref(userStore.user?.username);

/*COMPUTED*/
const fullCurrentChannel = ChannelService.findChannelByName(channelStore.currentChannel);

/*REFS*/
const firstLetter = ref(props.message?.username ? props.message?.username[0] : "U");


onMounted(() => {
  const messageContainer = document.querySelector(".messages");
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
});

</script>
