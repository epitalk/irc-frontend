<template>
  <section class="mx-4 vh-100 d-flex center-y center-x">
    <div class="welcome-container w-full">
      <h1 class="mb-2 h2">Bienvenue sur {{ SITE_NAME }}</h1>

      <span class="divider" />

      <UsernameForm @submit="handleSubmit" />
    </div>
  </section>
</template>


<script lang="ts" setup>
import { SITE_NAME } from "@/utils/env";
import UsernameForm from "@/components/Forms/UsernameForm.vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import { UserApi } from "@/api/user/user";
import { Notyf } from "notyf";
/*META*/
document.title = `Bienvenue | ${SITE_NAME}`;

/*HOOKS*/
const router = useRouter();
const notyf = new Notyf({ position: { x: "right", y: "top" } });

/*STORE*/
const userStore = useUserStore();

/*METHODS*/
const handleSubmit = async (username: string) => {

  UserApi.create(username).then(async (res) => {
    userStore.setUser(res.data);
    await router.push("/");
    notyf.success(`Bienvenue sur ${SITE_NAME} 🥳`);
  }).catch(() => {
    notyf.error("Un utilisateur utilise déjà ce nom d'utilisateur.");
  });
};

</script>

<style lang="scss" scoped>
.welcome-container {
  max-width: 550px;
}
</style>
