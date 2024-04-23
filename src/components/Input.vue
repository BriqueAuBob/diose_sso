<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const inputId = computed(() => {
  return `input-${props.label.toLowerCase().replace(/ /g, "-")}`;
});
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="block text-neutral-400 dark:text-neutral-200 text-sm font-medium"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="(e: any) => $emit('update:modelValue', e?.target?.value)"
      class="mt-1 px-3 py-3 block w-full dark:bg-neutral-700 text-neutral-800 rounded-lg border-neutral-300 shadow-sm focus:ring focus:ring-opacity-50 focus:ring-primary-500 focus:border-primary-300 focus:outline-primary-500"
      :class="{
        'border-red-600 dark:border': error,
        'opacity-50 cursor-not-allowed bg-neutral-200': disabled,
      }"
      :disabled="disabled"
    />
    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>
