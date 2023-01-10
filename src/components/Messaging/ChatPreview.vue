<template>
  <div class="chat-preview stretch d-flex gap-2 py-2 px-3">
    <Avatar borderRadius="12px"
            size="2.7rem"
            online
            :src="props.picture"
            :alt="props.author" v-if="props.picture"/>
    <Avatar borderRadius="12px" size="2.7rem" v-else>Na</Avatar>

    <div class="d-flex column between flex-1">
      <h6>{{ props.author }}</h6>
      <div class="d-flex center-y gap-1">
        <Avatar size="16px" :src="props.picture" alt="userauthor"/>
        <p class="ellipsis text-contrast-70">{{ props.message }}</p>
      </div>
    </div>

    <div class="d-flex column between end-y">
      <p class="ellipsis text-contrast-70">{{ props.timestamp }}</p>
      <span class="notify-bubble d-flex center-y center-x">2</span>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Avatar from "@/components/Common/Avatar.vue"

const props = defineProps({
  picture: {type: String, default: null},
  author: {type: String, default: null},
  timestamp: {type: String, default: null},
  message: {type: String, default: null}
})
</script>
