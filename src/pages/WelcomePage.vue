<template>
  <section class="mx-4 vh-100 d-flex center-y center-x">
    <div class="welcome-container w-full">
      <h1 class="mb-2 h2">Bienvenue sur {{ SITE_NAME }}</h1>

      <span class="divider"/>

      <form @submit="handleSubmit" class="d-flex column">
        <label class="mt-3 mb-1">Nom d'utilisateur</label>
        <input class="input w-full" ref="input" v-model="content" type="text" placeholder="John Doe" @input="onComplete">
        <div class="d-flex end-x mt-3">
          <button class="btn" data-variant="primary">Commencer à discuter</button>
        </div>
      </form>
    </div>

  </section>
</template>


<script lang="ts" setup>
import {SITE_NAME} from "@/env"
import { ref } from "vue";

/*META*/
document.title = `Bienvenue | ${SITE_NAME}`

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

<style lang="scss" scoped>
.welcome-container {
  max-width: 550px;
}
</style>
