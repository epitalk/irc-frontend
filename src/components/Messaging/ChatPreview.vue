<template>
  <router-link :to="`/channel/@me/${props.author}`" class="w-full chat-preview stretch d-flex gap-2 py-1 px-2" :class="{active: channelStore.currentChannel === props.author}">
    <Avatar borderRadius="12px"
            size="2.7rem"
            online
            :src="props.picture"
            :alt="props.author" v-if="props.picture"/>
    <Avatar :title="props.author" online>{{ firstLetter }}</Avatar>

    <div class="d-flex column between flex-1">
      <h6 class="text-medium ellipsis" style="max-width: 150px;">{{ props.author }}</h6>
      <div class="d-flex center-y gap-1">
        <Avatar size="16px" :src="props.picture" alt="userauthor"/>
        <p class="ellipsis text-contrast-70">{{ props.message }}</p>
      </div>
    </div>

    <div class="d-flex column between end-y">
      <p class="ellipsis text-contrast-70">{{ formattedDate }}</p>
<!--      <span class="notify-bubble d-flex center-y center-x">2</span>-->
    </div>

  </router-link>
</template>

<script lang="ts" setup>
import Avatar from "@/components/Common/Avatar.vue"
import { ref, watch } from "vue";
import { useChannelStore } from "@/stores/channel.store";



/*STORE*/
const channelStore = useChannelStore()

const props = defineProps({
  picture: {type: String, default: null},
  author: {type: String, default: null, required: true},
  timestamp: {type: String, default: null, required: true},
  message: {type: String, default: null, required: true}
})

const formattedDate = ref()
const firstLetter = ref(props.author ? props.author[0] : "U");

const formatDate = () => {
  const date = new Date(props.timestamp);
  const options = { year: "numeric", month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' } as const;
  formattedDate.value = date.toLocaleDateString('fr-FR', options)
}

formatDate()

/*WATCHERS*/
watch(() => props.timestamp, (value) => {
  formatDate()
});

watch(() => props.author, (value) => {
  firstLetter.value = props.author ? props.author[0] : "U"
});



</script>
