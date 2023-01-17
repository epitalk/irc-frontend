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
    <input class="no-style w-full" ref="input" v-model="content" type="text" :placeholder="props.placeholder"
           @input="onComplete">
  </Form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import emojisJson from "@/data/emojis.json"
import type { Emojis } from "@/types/emojis";
import { Form } from "vee-validate";

/*PROPS*/
const props = defineProps({
  value: { type: [String, Number], default: null },
  placeholder: { type: String },
  openedPicker: { type: Boolean, required: true }
})

/*REFS*/
const autocomplete = ref({
  show: false,
  results: [] as Emojis[] | never[]
})

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
const emitMessage = () => {
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
  console.log(value)
  // emit('change', `${value} ${emoji.emoji}`)
  // emit('send', emoji)
  // autocomplete.value.show = false
  // this.$refs.input.focus()
}
</script>
