<template>
  <div class="toggle" :class="{'active': props.open}" @click="emit('update:open', !props.open)">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script setup lang="ts">
/* PROPS */
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

/* EMIT */
const emit = defineEmits(['update:open'])
</script>


<style lang="scss" scoped>
@import "@/assets/styles/core/mixins";
  .toggle {
    cursor: pointer;
    flex-flow: column;
    justify-content: center;
    outline: none;
    width: 24px;
    height: 24px;
    position: absolute;
    display: none;
    left: 12px;
    top: 10px;
    z-index: 20;
    transition: .2s;

    &:active {
      transform: scale(0.95);
    }

    span {
      background: #ffffff;
      border-radius: 1rem;
      height: 2px;
      position: absolute;
      transform-origin: left center;
      transition: .2s;
      width: 100%;

      &:first-child {
        transform: translateY(-400%);
      }
      &:last-child {
        transform: translateY(400%);
      }
    }

    &.active {
      span {
        &:last-child, &:first-child {
          transform: translateY(0);
        }
      }
    }

    @include down(1000px){
      display: flex;
    }
  }
</style>
