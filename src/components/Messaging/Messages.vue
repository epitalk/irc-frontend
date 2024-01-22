<template>
  <div ref="messagesContainer" class="p-3 d-flex column gap-3 messages">
    <Message v-for="(message, index) in props.messages" :key="index" :message="message"/>
  </div>
</template>

<script lang="ts" setup>
import Message from "@/components/Messaging/Message.vue"
import type { MessageCommand }  from "@/api/message/message.model"
import type { PropType } from "vue";
import { ref } from "vue";

/*PROPS*/
const props = defineProps({
  messages: { type: Array as PropType<MessageCommand[]>, default: () => [] }
})

/*REFS*/
const messagesContainer = ref()
</script>
