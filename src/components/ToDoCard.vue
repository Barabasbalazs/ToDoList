<template>
  <div
    class="text-center border-2 border-black mx-3.5 rounded-2xl h-[82px] lg:h-full bg-white"
  >
    <div
      class="flex flex-row lg:flex-col m-[18px] items-center lg:items-stretch justify-between"
    >
      <div class="flex flex-row lg:justify-between items-center">
        <p class="text-4xl hidden font-semibold lg:block">{{ item.title }}</p>
        <div
          class="lg:block hidden text-lg font-semibold text-white rounded-full"
          :class="priorityClass"
        >
          <p class="mx-5">{{ item.priority }}</p>
        </div>
        <div
          class="flex justify-center items-center p-2 rounded-full h-fit border-2 border-black lg:hidden mr-5 relative"
          :class="colorOfCheckCircle"
          @click.stop="toggleResolvedStatus"
        >
          <svg
            v-if="isResolved"
            class="animated-check absolute z-10 w-8 h-8 pb-1 pl-1"
            viewBox="0 0 24 24"
          >
            <path d="M4.1 12.7L9 17.6 20.4 4.1" fill="none" />
          </svg>
        </div>
        <div class="flex flex-col text-start lg:hidden">
          <p class="text-lg font-medium">{{ item.title }}</p>
          <p class="text-xs text-grey opacity-30">
            {{ formatShortDate(date) }}
          </p>
        </div>
      </div>
      <div class="hidden lg:flex items-center gap-x-1">
        <img
          src="../assets/icons/Vectorcalendar.svg"
          class="w-[10.8px] h-[12px]"
        />
        <p class="text-xs">{{ formatShortDate(date) }}</p>
      </div>
      <div
        class="hidden lg:flex flex-row justify-between items-center font-semibold mt-5 relative"
      >
        <p class="text-2xl text-midgrey">{{ item.text }}</p>
        <div
          class="p-3 rounded-full h-fit border-4 flex justify-center items-center"
          :class="colorOfCheckCircle"
          @click.stop="toggleResolvedStatus"
        >
          <svg
            v-if="isResolved"
            class="animated-check absolute z-10 w-16 h-16 pl-2 pb-4"
            viewBox="0 0 24 24"
          >
            <path d="M4.1 12.7L9 17.6 20.4 4.1" fill="none" />
          </svg>
        </div>
      </div>
      <div class="lg:hidden">
        <div class="p-1 rounded-full h-fit" :class="priorityClass"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { Priority, ToDoItem } from '../models/todoitem-model';
  import { formatShortDate } from '../utils/date-formatting';
  import { getItemPriority } from '../utils/item-priority';

  const props = defineProps<{
    item: ToDoItem;
  }>();

  const emit = defineEmits<{
    (e: 'toggleResolvedStatus'): void;
  }>();

  const isResolved = computed(() => props.item.isResolved);

  const date = new Date(props.item.createdAt);

  const priorityClass = computed(() =>
    getItemPriority(props.item.priority as Priority)
  );

  const colorOfCheckCircle = computed(() => {
    return isResolved.value
      ? ('border-green' as const)
      : ('border-black' as const);
  });

  function toggleResolvedStatus() {
    emit('toggleResolvedStatus');
  }
</script>

<style>
  .animated-check path {
    fill: none;
    stroke: #4fda9b;
    stroke-width: 3;
    stroke-dasharray: 23;
    stroke-dashoffset: 20;
    animation: draw 0.25s linear forwards;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  @keyframes draw {
    to {
      stroke-dashoffset: 2;
    }
  }
</style>
