<template>
  <Form @submit="handleSubmit" class="d-flex column" v-slot="{meta}">
    <Input
        rules="required"
        label="Nom d'utilisateur"
        id="username"
        type="text"
        placeholder="John Doe"
        :value="values.username"
        @update:value="values.username = $event"
    />
    <div class="d-flex end-x mt-3">
      <button type="submit" :disabled="!meta.valid" class="btn start-chat-button" data-variant="primary">Commencer à discuter</button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Input from "@/components/Fields/Input.vue"
import { Form } from "vee-validate";
import { ref } from "vue";

/*EMIT*/
const emit = defineEmits(['submit'])

/* REFS */
const values = ref({username: ''})

/*METHODS*/
const handleSubmit = () => {
  emit('submit', values.value.username)
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/core/mixins";
.start-chat-button {
  @include down(500px) {
    font-size: 16px;
    width: 100%;
  }
}
</style>
