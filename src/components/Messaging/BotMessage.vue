<template>
  <div class="d-grid gap-2 col-auto col-2 row-fit message-receive">
    <Avatar :title="SITE_NAME" online>
      <Logo :size="28"/>
    </Avatar>
    <div class="px-2 py-1 d-flex center-y message-content column">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from "@/components/Common/Avatar.vue"
import Logo from "@/components/Brands/Logo.vue"
import { SITE_NAME } from "@/utils/env";

</script>
