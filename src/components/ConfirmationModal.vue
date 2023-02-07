<template>
  <div class="fixed inset-0 items-center justify-center bg-black/75 flex">
    <div
      class="bg-white z-20 border-black border-2 rounded-xl flex flex-col items-center lg:w-2/5 w-4/5"
    >
      <div class="text-lg text-white font-semibold rounded-full bg-red mt-2">
        <p class="mx-5">{{ title }}</p>
      </div>
      <p class="m-2">
        {{ text }}
      </p>
      <div class="flex flex-row space-x-6 mb-2 font-semibold">
        <PrimaryButton
          additional-classes="bg-green"
          :modalButton="true"
          @click="removeToDo"
          >Yes
        </PrimaryButton>
        <PrimaryButton
          additional-classes="bg-red"
          :modalButton="true"
          @click="hidePopUp"
          >No</PrimaryButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PrimaryButton from './PrimaryButton.vue';

  defineProps({
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  });

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
