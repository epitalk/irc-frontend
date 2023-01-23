<template>
  <div class="input d-flex center-y w-full gap-2 relative">
    <AutoComplete @addNewMessage="addNewMessage" :placeholder="`Envoyer un message dans #${channelStore.currentChannel}`" :opened-picker="opened" :emojis="emojis.list" />
<!--    <EmojiButton @click="open"/>-->
  </div>
</template>

<script lang="ts" setup>
import AutoComplete from "@/components/Emojis/AutoComplete.vue"
import emojis from "@/data/emojis.json"
import { ref } from "vue";
import { useChannelStore } from "@/stores/channel.store";
/*STORE*/
const channelStore = useChannelStore()


/*REFS*/
const opened = ref(false)

/*EMIT*/
const emit = defineEmits(['addNewMessage'])


/*METHODS*/
const open = () => opened.value = !opened.value

const addNewMessage = (message: string) => emit('addNewMessage', message)
</script>
