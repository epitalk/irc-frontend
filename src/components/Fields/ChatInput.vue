<template>
  <div class="input d-flex center-y w-full gap-2">
    <AutoComplete @addNewMessage="addNewMessage" placeholder="Envoyer un message à Brooklyn Simmons" :opened-picker="opened" :emojis="emojis.list" />
<!--    <EmojiButton @click="open"/>-->
  </div>
</template>

<script lang="ts" setup>
import AutoComplete from "@/components/Emojis/AutoComplete.vue"
import emojis from "@/data/emojis.json"
import { ref } from "vue";

/*REFS*/
const opened = ref(false)

/*EMIT*/
const emit = defineEmits(['addNewMessage'])


/*METHODS*/
const open = () => opened.value = !opened.value

const addNewMessage = (message: string) => emit('addNewMessage', message)
</script>
