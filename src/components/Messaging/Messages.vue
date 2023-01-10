<template>
  <div class="p-3 d-flex column gap-3 messages">
    <Message
        v-for="message in props.messages"
        :key="message.id" :message="message"/>
  </div>
</template>
<script lang="ts" setup>
import Message from "@/components/Messaging/Message.vue"
import type { Message as MessageType }  from "@/api/message/messages"
import type { PropType } from "vue";

const props = defineProps({
  messages: { type: Array as PropType<MessageType[]>, default: () => [] }
})

</script>
