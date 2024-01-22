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
      <span class="text-medium" v-if="channels && channels.length">
        {{ search
        ? `Voici la liste des channels avec votre recherche ${search}:`
        : "Voici tout les channels disponible sur le serveur:" }}
      </span>

      <span v-else class="text-medium">Aucun channel trouvé{{ search ? ` avec votre recherche ${search}` : null }}</span>

      <ul class="bullet-list" v-if="channels && channels.length">
        <li v-for="channel in channels" :key="channel.id">{{ channel.name }}</li>
      </ul>

    </BotMessage>
    <BotMessage v-else-if="props.message.content === 'channel_users'">
      <span class="text-medium" v-if="fullCurrentChannel &&
      fullCurrentChannel.users.length">Voici tout les utilisateurs sur le channel {{ channelStore.currentChannel
        }}:</span>

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
import type { ChannelModel } from "@/api/channel/channel.model";
import type { ComputedRef, PropType, Ref } from "vue";
import type { MessageCommand } from "@/api/message/message.model";
import Avatar from "@/components/Common/Avatar.vue";
import BotMessage from "@/components/Messaging/BotMessage.vue";
import { useUserStore } from "@/stores/user.store";
import { computed, onMounted, ref } from "vue";
import { SITE_NAME } from "@/utils/env";
import { useChannelStore } from "@/stores/channel.store";
import { ChannelService } from "@/services/ChannelService";

/*PROPS*/
const props = defineProps({
  message: { type: Object as PropType<MessageCommand>, required: true }
});

/*STORE*/
const userStore = useUserStore();
const channelStore = useChannelStore();
const username = ref(userStore.user?.username);

const fullCurrentChannel = ChannelService.findChannelByName(channelStore.currentChannel);



/*REFS*/
const search: Ref<string | null> = ref(null);
const firstLetter = ref(props.message?.username ? props.message?.username[0] : "U");


/*COMPUTED*/
const channels: ComputedRef<ChannelModel[]> = computed(() => {
  const _search = search.value;
  return _search ? channelStore.channels.filter(c => c.name.includes(_search)) : channelStore.channels;
});

onMounted(() => {
  const messageContainer = document.querySelector(".messages");
  if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
});

</script>
