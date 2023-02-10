<template>
  <div
    class="flex flex-col lg:flex-row font-semibold text-sm mx-3.5 space-y-5 lg:space-y-0 mb-11 lg:justify-between lg:h-8 items-center"
  >
    <div class="flex justify-between w-full lg:w-auto lg:space-x-5 lg:h-full">
      <PrimaryButton
        class="rounded-md lg:rounded-lg py-1 px-3"
        :class="getColorOfFilterButton('Title')"
        @click="filterByTitle"
      >
        <p>Title</p>
      </PrimaryButton>
      <PrimaryButton
        class="rounded-md lg:rounded-lg py-1 px-3"
        :class="getColorOfFilterButton('Text')"
        @click="filterByText"
      >
        <p>Description</p>
      </PrimaryButton>
      <PrimaryButton
        class="py-1 lg:rounded-lg rounded-md px-3"
        :class="getColorOfFilterButton('Priority')"
        @click="filterByPriority"
      >
        <p>Priority</p>
      </PrimaryButton>
      <PrimaryButton
        class="py-1 lg:rounded-lg rounded-md px-3"
        :class="getColorOfFilterButton('Date')"
        @click="filterByDate"
      >
        <p>Date</p>
      </PrimaryButton>
    </div>
    <div class="flex space-x-2 self-start">
      <PrimaryButton
        class="px-3 py-2.5 rounded-md"
        :class="getColorOfOrderButton(1)"
        @click="filterAsc"
      >
        <img src="../assets/icons/Vectorup.svg" />
      </PrimaryButton>
      <PrimaryButton
        class="px-3 py-2.5 rounded-md"
        :class="getColorOfOrderButton(-1)"
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

  const emit = defineEmits<{
    (e: 'filterBy', category: string, order: number): void;
  }>();

  const orderOfFiltering = ref(1);

  const currentFilter = ref('');

  function getColorOfFilterButton(valueOfButton: string) {
    return valueOfButton === currentFilter.value
      ? ('bg-green' as const)
      : ('text-black border-2 lg:border border-black' as const);
  }

  function getColorOfOrderButton(order: number) {
    return order === orderOfFiltering.value
      ? ('bg-green' as const)
      : ('bg-black' as const);
  }

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

  watchEffect(() =>
    emit('filterBy', currentFilter.value, orderOfFiltering.value)
  );
</script>
