<template>
  <button class="back-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
    Retour
  </button>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/core/mixins";
.back-button {
  display: none;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  background: transparent;
  gap: 4px;
  margin-left: 8px;
  margin-top: 8px;
  margin-bottom: 20px;
  border-radius: 8px;

  &:hover, &:active {
    background: var(--grey-400);
  }

  @include down(1000px) {
    display: flex;
  }
}
</style>
