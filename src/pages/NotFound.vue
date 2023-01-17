<template>
  <section class="vh-100 d-flex center-x center-y column gap-2 container" id="not-found">
    <h1>Page Introuvable</h1>
    <p class="mb-1" style="max-width: 500px">Il semblerait que cette page n'existe pas ou n'est pas disponible pour le
      moment.
      Vérifiez l'URL ou choisissez une option ci-dessous.</p>
    <router-link role="button" class="btn" data-variant="primary" to="/">Revenir à l'accueil</router-link>
  </section>
</template>

<script lang="ts" setup>
import { SITE_NAME } from "@/env";
document.title = `Page Introuvable | ${SITE_NAME}`
</script>
