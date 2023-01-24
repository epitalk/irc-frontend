<template>
  <div class="input d-flex center-y w-full gap-2 relative">
    <AutoComplete @addNewMessage="addNewMessage" :placeholder="`Envoyer un message dans #${channelStore.currentChannel}`" />
<!--    <EmojiButton @click="open"/>-->
  </div>
</template>

<script lang="ts" setup>
import AutoComplete from "@/components/Emojis/AutoComplete.vue"
import { useChannelStore } from "@/stores/channel.store";
/*STORE*/
const channelStore = useChannelStore()

/*EMIT*/
const emit = defineEmits(['addNewMessage'])


/*METHODS*/
const addNewMessage = (message: string) => emit('addNewMessage', message)
</script>
