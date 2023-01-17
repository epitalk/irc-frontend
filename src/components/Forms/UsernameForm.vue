<template>
  <Form @submit="handleSubmit" class="d-flex column" v-slot="{meta}">
    <Input ref="usernameInput" rules="required" label="Nom d'utilisateur" id="username" type="text" placeholder="John Doe"/>
    <div class="d-flex end-x mt-3">
      <button type="submit" :disabled="!meta.valid" class="btn" data-variant="primary">Commencer à discuter</button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Input from "@/components/Fields/Input.vue"
import { Form } from "vee-validate";

/*EMIT*/
const emit = defineEmits(['submit'])
/*METHODS*/
const handleSubmit = ({username}: { username: string }) => {
  emit('submit', username)
}
</script>
