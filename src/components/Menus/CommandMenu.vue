<template>
  <ul class="command__menu">
    <li v-for="(command, index) in commands"
        @mouseover="setCurrentCommand(index)"
        :class="{active: currentCommand === index}"
        :key="command.command" @click="(e) => handleSelect(e, command.command)">
      <span class="text-medium">{{ command.command }}</span>
      <span class="ml-1 text-contrast-70">{{ command.description }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
/*Refs*/
import { defineProps, ref } from "vue";
import type { PropType } from "vue";

/*EMITS*/
const emit = defineEmits(["handleSelect"]);

/*Props*/
const props = defineProps({
  currentCommand: { type: Number, default: 0, required: true },
  commands: {
    type: Array as PropType<{ command: string, description: string }[] | []>,
    default: () => ([]),
    required: true
  }
});

/*REFS*/
const currentCommandRef = ref(props.currentCommand);

/*METHODS*/
const handleSelect = (e: MouseEvent, command: string) => {
  emit("handleSelect", e, command);
};
const setCurrentCommand = (index: number) => {
  currentCommandRef.value = index;
};

</script>


<style lang="scss">

.command__menu {
  li {
    padding: 12px;
    cursor: pointer;

    &:hover {
      background: var(--grey-200);
    }

    &.active {
      background: var(--primary);
      color: var(--light);
    }
  }
}
</style>
