<template>
  <div
    class="flex flex-col lg:flex-row font-semibold text-sm mx-3.5 space-y-5 lg:space-y-0 mb-11 lg:justify-between lg:h-8 items-center"
  >
    <div class="flex justify-between w-full lg:w-auto lg:space-x-5 lg:h-full">
      <PrimaryButton class="bg-green rounded-md lg:rounded-lg py-1 px-3"
        @click="filterByTitle"
      >
        <p>Title</p>
      </PrimaryButton>
      <PrimaryButton class="bg-black rounded-md lg:rounded-lg py-1 px-3"
        @click="filterByText"
      >
        <p>Description</p>
      </PrimaryButton>
      <PrimaryButton
        class="text-black border-2 lg:border border-black py-1 lg:rounded-lg rounded-md px-3"
        @click="filterByPriority"
      >
        <p>Priority</p>
      </PrimaryButton>
      <PrimaryButton
        class="text-black border-2 lg:border border-black py-1 lg:rounded-lg rounded-md px-3"
        @click="filterByDate"
      >
        <p>Date</p>
      </PrimaryButton>
    </div>
    <div class="flex space-x-2 self-start">
      <PrimaryButton class="bg-green px-3 py-2.5 rounded-md"
        @click="filterAsc"
      >
        <img src="../assets/icons/Vectorup.svg" />
      </PrimaryButton>
      <PrimaryButton class="bg-black px-3 py-2.5 rounded-md"
        @click="filterDesc"
      >
        <img src="../assets/icons/Vectordown.svg" />
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import PrimaryButton from './PrimaryButton.vue';

  const orderOfFiltering = ref(1);

  const currentFilter = ref('');

  const emit = defineEmits<{
    (e: 'filterBy', category: string, order: number): void
  }>();

  function filterByTitle() {
    currentFilter.value = 'Title';
  }

  function filterByText() {
    currentFilter.value = 'Text';
  }

  function filterByPriority() {
    currentFilter.value = 'Priority';
  }

  function filterByDate() {
    currentFilter.value = 'Date';
  }

  function filterAsc() {
    orderOfFiltering.value = 1;
  }

  function filterDesc() {
    orderOfFiltering.value = -1;
  }

  watchEffect(() => emit('filterBy', currentFilter.value, orderOfFiltering.value));

</script>
