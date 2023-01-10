<template>
  <li class="sidebar-link w-full">
    <router-link class="p-1 d-flex center-y gap-1" :to="props.item.to" :class="{ 'center-x': !props.large }">
      <span v-if="props.large">{{ props.item.text }}</span>
    </router-link>
  </li>
</template>
<script lang="ts" setup>
const props = defineProps({
  large: { type: Boolean, default: false },
  item: { type: Object, default: () => ({}) }
})
</script>
