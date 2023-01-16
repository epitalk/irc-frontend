<template>
  <div class="input d-flex center-y w-full gap-2">
    <Icon class="icon-event" name="plus-circle"/>
    <AutoComplete placeholder="Envoyer un message à Brooklyn Simmons" :opened-picker="opened" :emojis="emojis.list" />
    <Icon class="icon-event" name="mic"/>
<!--    <EmojiButton @click="open"/>-->
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/Common/Icon.vue"
import AutoComplete from "@/components/Emojis/AutoComplete.vue"
import emojis from "@/data/emojis.json"
import { ref } from "vue";

const opened = ref(false)

const open = () => opened.value = !opened.value
</script>
