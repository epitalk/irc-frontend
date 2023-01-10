<template>
  <li class="sidebar-link w-full">
    <router-link class="p-1 d-flex center-y gap-1" :to="props.item.to" :class="{ 'center-x': !large }">
      <Icon size="20" :name="props.icon"/>
      <span v-if="props.large">{{ props.item.text }}</span>
    </router-link>
  </li>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon.vue"
const props = defineProps({
  large: { type: Boolean, default: false },
  item: { type: Object, default: () => ({}) },
  icon: { type: String, default: 'link' }
})
</script>
