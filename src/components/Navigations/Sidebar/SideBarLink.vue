<template>
  <li class="sidebar-link w-full">
    <router-link class="p-1 d-flex center-y gap-1" :to="to" :class="{ 'center-x': !props.large }">
      <span v-if="props.large">{{ props.item }}</span>
    </router-link>
  </li>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  large: { type: Boolean, default: false },
  item: { type: String, required: true }
})

const to = ref((props.item && props.item === 'general') ? '/' : `/channel/${props.item}`)
</script>
