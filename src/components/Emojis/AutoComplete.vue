<template>
  <Form @submit="emitMessage" style="flex: 1">
    <div class="command__suggestions" v-if="openCommandMenu && commands.length">
      <CommandMenu :commands="commands" :current-command="commandIndex" @handleSelect="handleSelect" />
    </div>
    {{ openCommandMenu }}
    <input class="no-style w-full" ref="input" v-model="content" @keyup="searchInCommands" type="text"
           :placeholder="props.placeholder">
  </Form>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Form } from "vee-validate";
import CommandMenu from "@/components/Menus/CommandMenu.vue";
import { CommandService } from "@/services/CommandService";


/*PROPS*/
const props = defineProps({
  value: { type: String, default: null },
  placeholder: { type: String }
});

/*REFS*/
const commandIndex = ref(0);
const openCommandMenu = ref(false);
const commands = ref(CommandService.commands);
const content = ref(props.value);

/*WATCHERS*/
watch(() => props.value, (value) => {
  content.value = value;
});

/*EMIT*/
const emit = defineEmits(["close", "change", "addNewMessage"]);


/*Focus input*/
const input = ref(null as HTMLInputElement | null);
onMounted(() => {
  if (input.value) {
    input.value.focus();
  }
});

/*METHODS*/
const handleSelect = (e: Event, val: string) => {
  if (e) {
    e.preventDefault();
  }
  const command = CommandService.commands.find(command => command.command === val);
  content.value = (command?.command || "");
  openCommandMenu.value = false;
};

const nextItem = (e: KeyboardEvent) => {
  if (e.code === "ArrowUp") {
    e.preventDefault();
    if (commandIndex.value <= 0) {
      commandIndex.value = commands.value.length - 1;
    } else {
      commandIndex.value--;
    }
  } else if (e.code === "ArrowDown") {
    if (commandIndex.value >= commands.value.length - 1) {
      commandIndex.value = 0;
    } else {
      commandIndex.value++;
    }
  }
};

const searchInCommands = (e: KeyboardEvent) => {
  const commandsFinds = CommandService.commands.filter(e => e.command.includes(content.value));

  openCommandMenu.value = !!(content.value && content.value[0] === "/" && commandsFinds.length);

  if (e.code == "ArrowDown" || e.code === "ArrowUp") {
    return nextItem(e);
  }

  if (e.code === "Enter" && commands.value.length && openCommandMenu.value) {
    return handleSelect(e, commands.value[commandIndex.value]?.command);
  }

  if (content.value && content.value[0] !== "/") {
    commandIndex.value = 0;
  }


  commands.value = commandsFinds;
};

const emitMessage = () => {
  if (content.value.trim()[0] === "/" && !openCommandMenu.value) {
    const args = content.value.split(" ");
    const command = args.shift()
    const index = CommandService.commands.findIndex(e => e.command === command)
    CommandService.executeCommand(index, ...args);
    content.value = "";
  }
  if (content.value.trim()[0] === "/" || openCommandMenu.value || content.value.trim() === "") return;

  emit("addNewMessage", content.value.trim());
  content.value = "";
};
</script>

<style lang="scss" scoped>
.command__suggestions {
  background: var(--dark);
  margin-top: 8px;
  bottom: 74px;
  left: -4px;
  position: absolute;
  width: 100%;
  border: 1px solid var(--grey-200);
  z-index: 10;
}
</style>
