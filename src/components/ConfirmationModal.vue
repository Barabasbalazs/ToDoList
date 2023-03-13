<template>
  <div class="z-20 fixed inset-0 items-center justify-center bg-black/75 flex">
    <div
      class="bg-white border-black border-2 rounded-xl flex flex-col items-center lg:w-2/5 w-4/5 fade"
    >
      <div
        class="text-lg text-white font-semibold rounded-full mt-2"
        :class="colorOfTitle"
      >
        <p class="mx-5">{{ title }}</p>
      </div>
      <p class="m-2">
        {{ text }}
      </p>
      <div
        v-if="!isOptionalModal"
        class="flex flex-row space-x-6 mb-2 font-semibold"
      >
        <PrimaryButton
          class="bg-green px-5 py-2"
          modalButton
          @click="hidePopUp"
        >
          Ok
        </PrimaryButton>
      </div>
      <div v-else class="flex flex-row space-x-6 mb-2 font-semibold">
        <PrimaryButton
          class="bg-green px-5 py-2"
          modalButton
          @click="removeToDo"
          >Yes
        </PrimaryButton>
        <PrimaryButton
          class="bg-red px-5 py-2"
          modalButton
          @click="hidePopUp"
          >No</PrimaryButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import PrimaryButton from './PrimaryButton.vue';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    isFailureModal: {
      type: Boolean,
      default: false,
    },
    isOptionalModal: {
      type: Boolean,
      default: false,
    },
  });

  const colorOfTitle = computed(() =>
    props.isFailureModal ? ('bg-red' as const) : ('bg-green' as const)
  );

  const emit = defineEmits<{
    (e: 'removeToDo'): void;
    (e: 'hidePopUp'): void;
  }>();

  function removeToDo() {
    emit('removeToDo');
  }

  function hidePopUp() {
    emit('hidePopUp');
  }
</script>
