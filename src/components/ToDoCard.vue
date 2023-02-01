<template>
  <div
    class="text-center border-2 border-black mx-3.5 rounded-2xl h-[82px] lg:h-[163.32px]"
  >
    <div
      class="flex flex-row m-[18px] m-5 items-center justify-between lg:hidden"
    >
      <div class="flex flex-row items-center space-x-5">
        <div class="p-2 rounded-full h-fit border-2 border-black"></div>
        <div class="flex flex-col">
          <p class="self-start text-lg font-medium">{{ props.item.title }}</p>
          <p class="self-start text-xs text-grey opacity-30">
            {{ formatShortDate(date) }}
          </p>
        </div>
      </div>
      <div>
        <div
          class="p-1 rounded-full h-fit"
          :class="[
            priorityOfThisItem === Priority.low ? 'bg-blue' : '',
            priorityOfThisItem === Priority.medium ? 'bg-yellow' : '',
            priorityOfThisItem === Priority.high ? 'bg-red' : '',
          ]"
        ></div>
      </div>
    </div>
    <div
      class="flex flex-col m-[18px] font-semibold hidden lg:block justify-between"
    >
      <div class="flex flex-row justify-between items-center">
        <p class="text-4xl">{{ props.item.title }}</p>
        <div
          class="text-lg text-white rounded-full"
          :class="[
            priorityOfThisItem === Priority.low ? 'bg-blue' : '',
            priorityOfThisItem === Priority.medium ? 'bg-yellow' : '',
            priorityOfThisItem === Priority.high ? 'bg-red' : '',
          ]"
        >
          <p class="mx-5">{{ props.item.priority }}</p>
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
  import { formatShortDate } from '../utils/date-formating';
  import { Priority } from '../models/todoitem-model';
  import { ref } from 'vue';

  const props = defineProps<{
    item: ToDoItem;
  }>();

  const date = new Date(props.item.createdAt);

  const priorityOfThisItem = props.item.priority;
</script>
