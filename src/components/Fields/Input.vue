<template>
  <div class="d-flex column gap-1" style="position: relative">
    <label class="mt-3 mb-1" v-if="label" :for="props.id">{{ label }}</label>

    <Field
        :as="rows ? 'textarea' : null"
        :rows="rows"
        :rules="rules"
        class="h-full"
        v-model="valueRef"
        :validateOnInput="true"
        v-slot="{meta, field}"
        :name="props.id"
        :placeholder="props.placeholder">
      <input class="input" :style="hasIcon ? 'padding-left: 40px' : null" v-bind="field" :type="typeRef" :id="props.id"
             :placeholder="props.placeholder"
             :class="{error: meta.validated && !meta.valid}">
    </Field>

    <div class="toggle-password" v-if="type === 'password'" @click.prevent="handleTogglePassword">
      <Icon v-if="!togglePassword" title="Afficher le mot de passe" name="eye" fill="var(--grey-20)"/>
      <Icon v-if="togglePassword" title="Masquer le mot de passe" name="eye-off" fill="var(--grey-20)"/>
    </div>

    <ErrorMessage class="invalid-feedback" :name="props.id"/>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import Icon from "@/components/Common/Icon.vue"
const props = defineProps({
  type: { type: String, default: 'text' },
  id: { type: String, default: 'field' },
  value: { type: String, default: '' },
  label: { type: String, default: null },
  rows: { type: Number, default: null },
  rules: { type: String, default: null },
  placeholder: { type: String, default: null }
})
const valueRef = ref(props.value)
const togglePassword = ref(false)
const typeRef = ref(props.type)
const handleTogglePassword = () => {
  togglePassword.value = !togglePassword.value
  typeRef.value = togglePassword.value ? 'text' : 'password'
}
const emit = defineEmits(['update:value'])
watch(() => valueRef.value, (val) => {
  emit('update:value', val)
});
watch(() => props.value, (val) => {
  valueRef.value = val
});
const slot = useSlots()
const hasIcon = !!slot['default']
</script>

<style>
.toggle-password {
  cursor: pointer;
  position: absolute;
  top: 38px;
  right: 12px;
}
.toggle-password svg:hover path {
  fill: var(--grey-300);
}
.invalid-feedback {
  color: var(--red);
}
</style>
