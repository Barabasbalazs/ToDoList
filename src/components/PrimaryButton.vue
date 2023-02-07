<template>
  <button
    class="rounded-xl py-2 px-5 text-white"
    :class="additionalClasses"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
    additionalClasses: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dropdopwn: {
      type: Boolean,
      default: false,
    },
  });
</script>
