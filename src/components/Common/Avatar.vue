<template>
  <div class="avatar" :style="styles" :class="{ clickable }">
    <span class="status-online" v-if="online"/>
    <slot></slot>
    <img v-if="src" :style="{ borderRadius }" :src="src" :alt="alt">
    <img v-if="!src && !slotHasContent" :style="{ borderRadius }" src="/images/anonyme-user.jpg" :alt="alt">
  </div>
</template>


<script lang="ts" setup>
import { ref, useSlots } from "vue";

const slot = useSlots()
const slotHasContent = ref(slot.default !== undefined)

console.log(slot.default)
const props = defineProps({
  size: {type: String, default: '40px'},
  borderRadius: {type: String, default: '8px'},
  src: {type: String, default: null},
  alt: {type: String, default: null},
  online: {type: Boolean, default: false},
  clickable: {type: Boolean, default: false}
})


const styles = {
  width: props.size,
  height: props.size,
  fontSize: `calc(${props.size} / 2.5)`,
  borderRadius: props.borderRadius
}
</script>
