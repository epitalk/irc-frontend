<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       :viewBox="`0 0 24 24`"
       :aria-labelledby="name">
    <title :id="title ? title : name" lang="en">{{title ? title : name}}</title>
    <g :stroke="stroke ?? 'transparent'" :fill="fill ?? 'transparent'">
      <AsyncComp/>
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: null
  },
  width: {
    type: [Number, String],
    default: 24
  },
  height: {
    type: [Number, String],
    default: 24
  },
  stroke: {
    type: String,
    default: null
  },
  fill: {
    type: String,
    default: null
  }
})

const AsyncComp = defineAsyncComponent(() =>
    import(`../Icons/${props.name}.vue`)
)

</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
