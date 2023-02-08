<template>
  <button
    class="rounded-xl py-2 px-5 text-white"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
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
