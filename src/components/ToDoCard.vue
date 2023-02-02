<template>
  <div
    class="text-center border-2 border-black mx-3.5 rounded-2xl h-[82px] lg:h-full"
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
          class="p-2 rounded-full h-fit border-2 border-black lg:hidden mr-5"
        ></div>
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
        class="hidden lg:flex flex-row justify-between items-center font-semibold mt-5"
      >
        <p class="text-2xl text-midgrey">{{ item.text }}</p>
        <div class="p-3 rounded-full h-fit border-4 border-black"></div>
      </div>
      <div class="lg:hidden">
        <div class="p-1 rounded-full h-fit" :class="priorityClass"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ToDoItem } from '../models/todoitem-model';
  import { formatShortDate } from '../utils/date-formatting';
  import { computed } from 'vue';
  import { getItemPriority } from '../utils/item-priority';

  const props = defineProps<{
    item: ToDoItem;
  }>();

  const date = new Date(props.item.createdAt);

  const priorityClass = computed(() => getItemPriority(props.item.priority));
</script>
