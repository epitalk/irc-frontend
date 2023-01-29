<template>
  <div class="input d-flex center-y w-full gap-2 relative">
    <AutoComplete @addNewMessage="addNewMessage" :placeholder="`Envoyer un message ${appStore.isInPrivateMessage ? `à @${channelStore.currentChannel}` : `dans #${channelStore.currentChannel}`}`" />
  </div>
</template>

<script lang="ts" setup>
import AutoComplete from "@/components/Emojis/AutoComplete.vue"
import { useChannelStore } from "@/stores/channel.store";
import { ref } from "vue";
import { useAppStore } from "@/stores/app.store";
/*STORE*/
const channelStore = useChannelStore()
const appStore = useAppStore()

/*EMIT*/
const emit = defineEmits(['addNewMessage'])



/*METHODS*/
const addNewMessage = (message: string) => emit('addNewMessage', message)
</script>
