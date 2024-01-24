<template>
  <div
      v-if="show"
      class="warn-alert">
    <div class="d-flex center-y gap-2">
      <svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="feather feather-info">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      <div class="flex-1">
        Taper <span class="font-semibold">"/"</span> pour voir la liste des commandes disponibles.
      </div>

      <button class="close-button" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

const commandHelpAlertClosed = localStorage.getItem('command-help-alert-closed')
/* REFS */
const show = ref(!commandHelpAlertClosed)

/* METHODS */
const close = () => {
  show.value = false
  // save in localstorage
  localStorage.setItem('command-help-alert-closed', 'true')
}
</script>


<style lang="scss" scoped>
@import "@/assets/styles/core/mixins";
.close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: var(--dark);
  width: 32px;
  height: 32px;
  background: var(--contrast-70);
  padding: 0;
  margin: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover, &:active {
    background: var(--contrast-30);
  }

  &:active {
    transform: scale(0.95);
  }
}

.warn-alert {
  position: absolute;
  bottom: 80px;
  background: var(--warn);
  color: var(--dark);
  padding: 8px 24px;
  width: 100%;
  left: 0;
  border-radius: 4px;
  font-weight: 400;

  @include down(500px) {
    padding: 8px 10px;
    .feather-info {
      display: none;
    }
  }
}

.font-semibold {
  font-weight: 600;
}
</style>
