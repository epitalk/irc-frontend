<template>
  <div v-if="props.message" class="d-grid gap-2 col-auto col-2 row-fit" :class="`message-${props.message.isUserMessage ? 'send' : 'receive'}`">
    <Avatar>N</Avatar>
    <div class="p-2 d-flex center-y message-content">
      {{props.message.content}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { Message as MessageType }  from "@/api/message/messages"

import Avatar from "@/components/Common/Avatar.vue"

const props = defineProps({
  message: { type: Object as PropType<MessageType>, default: null, required: true }
})

</script>
