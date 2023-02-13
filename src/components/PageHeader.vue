<template>
  <header>
    <div class="flex flex-cols justify-between px-4 my-7 items-center w-full">
      <h1 class="text-2xl lg:text-7xl font-semibold">To do list</h1>
      <PrimaryButton
        class="lg:w-14 lg:h-14 w-8 h-8 bg-green px-0 py-0 text-xl text-white lg:text-4xl rounded-full col-end-auto"
        @click="showForm"
      >
        <p>+</p>
      </PrimaryButton>
    </div>
  </header>
</template>

<script setup lang="ts">
  import PrimaryButton from './PrimaryButton.vue';
  const emit = defineEmits<{
    (e: 'showForm'): void;
  }>();

  function showForm() {
    emit('showForm');
  }
</script>
