<template>
  <div
    class="text-center border-2 border-black mx-3.5 rounded-2xl h-[82px] lg:h-[163.32px]"
  >
    <div
      class="flex flex-row m-[18px] m-5 items-center justify-between lg:hidden"
    >
      <div class="flex flex-row items-center space-x-5">
        <div class="p-2 rounded-full h-fit border-2 border-black"></div>
        <div class="flex flex-col justify start">
          <p class="text-lg font-medium">{{ item.title }}</p>
          <p class="text-xs text-grey opacity-30">
            {{ formatShortDate(date) }}
          </p>
        </div>
      </div>
      <div>
        <div
          class="p-1 rounded-full h-fit"
          :class="priorityClass"
        ></div>
      </div>
    </div>
    <div
      class="hidden flex flex-col m-[18px] font-semibold lg:block justify-between"
    >
      <div class="flex flex-row justify-between items-center">
        <p class="text-4xl">{{ item.title }}</p>
        <div
          class="text-lg text-white rounded-full"
          :class="priorityClass"
        >
          <p class="mx-5">{{ item.priority }}</p>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <p>{{ props.item.text }}</p>
        <div>ho</div>
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
