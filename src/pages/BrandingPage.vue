<template>
  <section class="mx-4">
    <h1 class="mb-2">Branding</h1>

    <h2 class="mb-2">Avatar</h2>
    <div class="d-flex gap-2">
      <Avatar>N</Avatar>
      <Avatar></Avatar>
      <Avatar size="44px" src="/images/women.png"/>
      <Avatar size="44px" src="/images/women.png" online/>
    </div>

    <h2 class="mb-2">Logo</h2>
    <Logo/>
    <Logo large/>

    <h2 class="mb-2">Icon</h2>
    <Icon name="arrow-right" stroke="white" title="droite"/>

    <h2 class="mb-2">Sidebar</h2>
    <Sidebar/>
  </section>
</template>


<script lang="ts" setup>
import Avatar from "@/components/Common/Avatar.vue"
import Logo from "@/components/Brands/Logo.vue"
import Sidebar from "@/components/Navigations/Sidebar/index.vue"
import Icon from "@/components/Common/Icon.vue"
</script>
