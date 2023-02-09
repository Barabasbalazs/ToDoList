<template>
  <div
    class="border-2 border-black mx-3.5 rounded-lg flex py-2 justify-between px-2"
  >
    <div class="flex mr-2 w-full">
      <img src="../assets/icons/search.svg" class="pr-2" />
      <input
        v-model="searchString"
        type="text"
        placeholder="Search todos"
        class="w-full"
      />
    </div>
    <div class="flex space-x-2 font-semibold items-center">
      <PrimaryButton
        v-if="isClearBtnShown"
        class="w-4 h-4 bg-red rounded-full py-2 content-center text-xs flex items-center"
        @click="clearTextField"
      >
        <p class="pl-1">X</p>
      </PrimaryButton>
      <PrimaryButton class="bg-black rounded-xl p-2" 
        :disabled="isSearchButtonDisabled"
        @click="search">
        <p>Search</p>
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watchEffect } from 'vue';
  import PrimaryButton from './PrimaryButton.vue';

  const emit = defineEmits<{
    (e: 'searchAccordingTo', searchString: string): void;
  }>();

  const isSearchButtonDisabled = ref(false);

  const searchString = ref('');

  const isClearBtnShown = computed(() => !!searchString.value.length);

  function search() {
    emit('searchAccordingTo', searchString.value);
  }

  function clearTextField() {
    searchString.value = '';
  }

  watchEffect(() => {
    if (searchString.value === '') {
      emit('searchAccordingTo', searchString.value);
    }
  });
</script>
