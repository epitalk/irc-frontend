<template>
  <Form @submit="handleSubmit" class="d-flex column" v-slot="{meta}">
    <Input rules="required" label="Nom d'utilisateur" id="username" type="text" placeholder="John Doe"/>
    <div class="d-flex end-x mt-3">
      <button type="submit" :disabled="!meta.valid" class="btn" data-variant="primary">Commencer à discuter</button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Input from "@/components/Fields/Input.vue"
import { Form } from "vee-validate";

const handleSubmit = () => {
  console.log("handleSubmit")
}
</script>
