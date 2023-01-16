<template>
  <section class="mx-4">
    <h1 class="mb-2 h2">Bienvenue sur Epitalk</h1>

    <form @submit="handleSubmit">
      <label>Nom d'utilisateur</label>
      <input class="input w-full" ref="input" v-model="content" type="text" placeholder="John Doe" @input="onComplete">
      <button class="btn" data-variant="primary">Confirmer</button>
    </form>
  </section>
</template>


<script lang="ts" setup>
import { ref } from "vue";

/*REFS*/
const content = ref('')

/*METHODS*/
const onComplete = () => {
  console.log("onComplete")
}

const handleSubmit = () => {
  console.log("handleSubmit")
}
</script>
