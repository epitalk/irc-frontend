<template>
  <section class="vh-100 w-full">
    <div id="messaging">
      <header class="bg-dark px-2 py-1 d-flex between bb-1">
        <div class="d-flex center-y gap-2">
          <Avatar borderRadius="12px"
                  size="40px"
                  online>NA</Avatar>
          <h6>conversion name</h6>
        </div>
        <Icon name="more-vertical"/>
      </header>
      <Messages :messages="messages"/>
      <div class="bg-grey-500 p-2 d-flex center-x bt-1">
        <ChatInput/>
      </div>
    </div>
  </section>
</template>


<script lang="ts" setup>
import Messages from "@/components/Messaging/Messages.vue"
import Avatar from "@/components/Common/Avatar.vue"
import Icon from "@/components/Common/Icon.vue"
import messages from "@/data/messages.json"
import ChatInput from "@/components/Forms/ChatInput.vue"
</script>
