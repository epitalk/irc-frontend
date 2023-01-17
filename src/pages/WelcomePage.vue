<template>
  <section class="mx-4 vh-100 d-flex center-y center-x">
    <div class="welcome-container w-full">
      <h1 class="mb-2 h2">Bienvenue sur {{ SITE_NAME }}</h1>

      <span class="divider"/>

      <UsernameForm/>
    </div>
  </section>
</template>


<script lang="ts" setup>
import { SITE_NAME } from "@/env"
import { ref } from "vue";
import UsernameForm from "@/components/Forms/UsernameForm.vue"
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
