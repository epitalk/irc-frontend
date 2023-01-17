<template>
  <section class="mx-4 vh-100 d-flex center-y center-x">
    <div class="welcome-container w-full">
      <h1 class="mb-2 h2">Bienvenue sur {{ SITE_NAME }}</h1>

      <span class="divider"/>

      <UsernameForm @submit="handleSubmit"/>
    </div>
  </section>
</template>


<script lang="ts" setup>
import { MERCURE_URL, SITE_NAME } from "@/env";
import UsernameForm from "@/components/Forms/UsernameForm.vue"
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import axios from "axios";
/*META*/
document.title = `Bienvenue | ${SITE_NAME}`

/*HOOKS*/
const router = useRouter()

/*STORE*/
const userStore = useUserStore()

/*METHODS*/
const handleSubmit = async (username: string) => {
  userStore.setUsername(username)
  // await axios.post(MERCURE_URL, {machin: "biudle"}).then(e => {
  //   console.log(e);
  // })
  await router.push('/')
}
</script>

<style lang="scss" scoped>
.welcome-container {
  max-width: 550px;
}
</style>
