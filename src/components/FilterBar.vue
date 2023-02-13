<template>
  <div
    class="flex flex-col lg:flex-row font-semibold text-sm mx-3.5 space-y-5 lg:space-y-0 mb-11 lg:justify-between lg:h-8 items-center"
  >
    <div class="flex justify-between w-full lg:w-auto lg:space-x-5 lg:h-full">
      <PrimaryButton v-for="currentFilter in filterList"
        class="rounded-md lg:rounded-lg py-1 px-3"
        :class="getColorOfFilterButton(currentFilter)"
        @click="doFilter(currentFilter)"
      >
        <p>{{ getFilterButtonText(currentFilter) }}</p>
      </PrimaryButton>
    </div>
    <div class="flex space-x-2 self-start">
      <PrimaryButton
        class="px-3 py-2.5 rounded-md"
        :class="getColorOfOrderButton(1)"
        @click="changeFilterOrder(1)"
      >
        <img src="../assets/icons/Vectorup.svg" />
      </PrimaryButton>
      <PrimaryButton
        class="px-3 py-2.5 rounded-md"
        :class="getColorOfOrderButton(-1)"
        @click="changeFilterOrder(-1)"
      >
        <img src="../assets/icons/Vectordown.svg" />
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import PrimaryButton from './PrimaryButton.vue';
  import { FilterType } from '../types/filter-type';
  import { capitalizeText } from '../utils/text-formating';
  
  const filterList = ['title' as const, 'text' as const, 'priority' as const, 'createdAt' as const];

  const currentFilter = ref();

  const emit = defineEmits<{
    (e: 'filterBy', filter: FilterType, order: number): void;
  }>();

  const orderOfFiltering = ref(1);

  function getFilterButtonText(filter: FilterType) {
    if (filter === 'createdAt') {
      return 'Date';
    }
    if (filter === 'text') {
      return 'Description';
    }
    return capitalizeText(filter);
  }

  function getColorOfFilterButton(valueOfButton: FilterType) {
    return valueOfButton === currentFilter.value
      ? ('bg-green' as const)
      : ('text-black border-2 lg:border border-black' as const);
  }

  function getColorOfOrderButton(order: number) {
    return order === orderOfFiltering.value
      ? ('bg-green' as const)
      : ('bg-black' as const);
  }

  function doFilter(filter: FilterType) {
    currentFilter.value = filter;
    emit('filterBy', currentFilter.value, orderOfFiltering.value);
  }

  function changeFilterOrder(order: number) {
    orderOfFiltering.value = order;
    emit('filterBy', currentFilter.value, orderOfFiltering.value);
  }
</script>
