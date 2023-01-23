<template>
  <Form @submit="emitMessage" style="flex: 1">
    <div :class="{ 'opacity-0 pointer-events-none': !autocomplete.show }" class="emoji__autocomplete">
      <p class="emoji__autocomplete-result">{{ autocomplete.results.length }} résultats</p>
      <ul class="emoji__autocomplete-list">

        <li v-for="(result, r) in autocomplete.results.slice(0, 8)" :key="r" class="emoji__autocomplete-item"
            @click="onClick(result)">
          <p class="emoji__autocomplete-emoji">{{ result.emoji }}</p>
          <p class="emoji__autocomplete-command">
            {{ `:${result.name.replace(/\s/g, '')}:` }}
          </p>
        </li>
      </ul>
    </div>

    <div class="command__suggestions" @keydown="nextItem" v-if="openCommandMenu && commands.length">
      <CommandMenu v-model:content="content" :commands="commands" :current-command="currentCommand" @handleSelect="handleSelect"/>
    </div>

    <input class="no-style w-full" ref="input" v-model="content" @keyup="searchInCommands" type="text" :placeholder="props.placeholder"
           @input="onComplete">
  </Form>






</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import emojisJson from "@/data/emojis.json"
import commandsJson from "@/data/commands.json"
import type { Emojis } from "@/types/emojis";
import { Form } from "vee-validate";
import CommandMenu from "@/components/Menus/CommandMenu.vue"

/*PROPS*/
const props = defineProps({
  value: { type: String, default: null },
  placeholder: { type: String },
  openedPicker: { type: Boolean, required: true }
})

/*REFS*/
const autocomplete = ref({
  show: false,
  results: [] as Emojis[] | never[]
})

const currentCommand = ref(1)
const openCommandMenu = ref(false)
const commands = ref(commandsJson)
const emojis = ref(emojisJson)
const content = ref(props.value)

/*WATCHERS*/
watch(() => props.value, (value) => {
  content.value = value
});

watch(() => props.openedPicker, (value) => {
  if (value) {
    autocomplete.value.show = false
  }
});

/*EMIT*/
const emit = defineEmits(['close', 'change', 'addNewMessage'])

/*METHODS*/
const handleSelect = (e: Event, val: string) => {
  if (e) {
    e.preventDefault();
  }

  content.value = (commandsJson.find(command => command.command === val)?.command || "");
  openCommandMenu.value = false
};

const nextItem = (e: KeyboardEvent) => {
  if (e.code === "ArrowUp") {
    e.preventDefault();
    if (currentCommand.value <= 1) {
      currentCommand.value = commands.value.length;
    } else {
      currentCommand.value--;
    }
  } else if (e.code === "ArrowDown") {
    if (currentCommand.value >= commands.value.length) {
      currentCommand.value = 1;
    } else {
      currentCommand.value++;
    }
  }
};

const searchInCommands = (e: KeyboardEvent) => {

  if(e.key === "/"){
    openCommandMenu.value = true
  }

  if(e.code == "ArrowDown" || e.code === "ArrowUp"){
    return nextItem(e)
  }

  if(e.code === "Enter" && commands.value.length && openCommandMenu.value){
    return handleSelect(e, commands.value[currentCommand.value - 1]?.command)
  }
  currentCommand.value = 0;

  commands.value = commandsJson.filter(e => e.command.includes(content.value));
};

const emitMessage = () => {
  if(openCommandMenu.value) return
  emit("addNewMessage", content.value)
  content.value = ""
}
const onComplete = (event: { target: { value: string } }) => {
  const { value } = event.target
  const lastWord = event.target.value.split(' ').pop()?.toLowerCase()

  if (lastWord && lastWord.startsWith(':') && lastWord.length > 3) {
    autocomplete.value = {
      results: emojis.value.list.filter(({ name }) => name.replace(/\s/g, '').toLowerCase().includes(lastWord.replace(/:/g, ''))),
      show: true
    }
    emit('close')
  } else {
    autocomplete.value = {
      results: [],
      show: false
    }
  }
  emit('change', value)
}

const onClick = (emoji: Emojis) => {
  // const value = content.value.toString().split(' ').pop()?.join(' ')
  const value = content.value.toString().split(' ').pop()
  // emit('change', `${value} ${emoji.emoji}`)
  // emit('send', emoji)
  // autocomplete.value.show = false
  // this.$refs.input.focus()
}
</script>

<style lang="scss" scoped>
.command__suggestions {
  background: var(--dark);
  margin-top: 8px;
  bottom: 52px;
  left: -4px;
  position: absolute;
  width: 100%;
  border: 1px solid var(--grey-200);
  z-index: 10;

}
</style>
