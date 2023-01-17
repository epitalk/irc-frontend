<template>
  <div v-if="props.message" class="d-grid gap-2 col-auto col-2 row-fit" :class="`message-${props.message.username === username ? 'send' : 'receive'}`">
    <Avatar online>N</Avatar>
    <div class="px-2 py-1 d-flex center-y message-content">
      {{props.message.content}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { Message as MessageType }  from "@/api/message/messages"
import Avatar from "@/components/Common/Avatar.vue"
import { useUserStore } from "@/stores/user.store";
import { ref } from "vue";

/*PROPS*/
const props = defineProps({
  message: { type: Object as PropType<MessageType>, default: null, required: true }
})

/*STORE*/
const userStore = useUserStore()
const username = ref(userStore.user?.username)
</script>
