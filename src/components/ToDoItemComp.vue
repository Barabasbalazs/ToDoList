<template>
  <div class="text-center border-2 border-black mx-3.5 rounded-2xl">
    <div class="flex flex-col m-[18px]">
      <div class="flex flex-row justify-between">
        <input
          v-model="currentTitle"
          type="text"
          placeholder="Title"
          class="w-[197px] font-semibold text-lg lg:text-4xl"
        />
        <div class="flex flex-row space-x-[5px] items-center lg:hidden">
          <div
            class="p-1 bg-blue rounded-full h-fit"
            :class="
              currentPriority === Priority.low ? 'border border-black' : ''
            "
          ></div>
          <div
            class="p-1 bg-yellow rounded-full h-fit"
            :class="
              currentPriority === Priority.medium ? 'border border-black' : ''
            "
          ></div>
          <div
            class="p-1 bg-red rounded-full h-fit"
            :class="
              currentPriority === Priority.high ? 'border border-black' : ''
            "
          ></div>
        </div>
        <div class="hidden lg:flex flex-col">
          <div
            class="text-lg text-white font-semibold rounded-full"
            :class="priorityClass"
          >
            <select
              v-model="currentPriority"
              class="ml-5 mr-2 text-center"
              :class="priorityClass"
            >
              <option v-for="value in priorityList" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-row space-x-1 lg:hidden">
        <img src="../assets/icons/Vectorcalendar.svg" />
        <p class="text-xs">{{ formatShortDate(date) }}</p>
      </div>
      <div class="self-start mt-4 mb-4">
        <textarea
          v-model="currentText"
          placeholder="Lorem ipsum"
          class="border-none h-[70.27px] w-[224.45px] lg:h-[103px] lg:w-[455.1px] text-start text-sm lg:text-lg text-grey"
        ></textarea>
      </div>
      <div class="text-sm flex flex-row font-semibold space-x-2">
        <button
          class="text-white w-[61px] h-[27px] rounded-lg bg-green"
          @click="saveToDo"
        >
          Save
        </button>
        <button
          class="rounded-lg h-[27px] w-[70px] bg-buttonGray"
          @click="removeTodo"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { Priority, ToDoItem, Status } from '../models/todoitem-model';
  import { formatShortDate } from '../utils/date-formatting';
  import { getItemPriority } from '../utils/item-priority';

  const props = defineProps<{
    item?: ToDoItem;
    index?: number;
  }>();

  const emit = defineEmits<{
    (e: 'removeItem', ind: number): void;
    (e: 'addToDo', newToDo: ToDoItem): void;
    (e: 'hideForm'): void;
    (e: 'updateToDo', ind: number, newToDo: ToDoItem): void;
  }>();

  const currentTitle = ref(props.item ? props.item.title : '');

  const currentText = ref(props.item ? props.item.text : '');

  const indexOfThisItem = ref(
    props.index || props.index === 0 ? props.index : -1
  );

  const currentPriority = ref(props.item ? props.item.priority : Priority.low);

  const priorityClass = computed(() => getItemPriority(currentPriority.value));

  const date = new Date();

  const priorityList = [Priority.low, Priority.medium, Priority.high];

  function saveToDo() {
    const newToDo = {
        title: currentTitle.value,
        text: currentText.value,
        createdAt: new Date(),
        priority: currentPriority.value,
        status: Status.notresolved,
      };
    if (indexOfThisItem.value === -1) {
      emit('addToDo', newToDo);
    } else {
      emit('updateToDo', indexOfThisItem.value, newToDo);
    }
  }

  function removeTodo() {
    if (props.item) {
      emit('removeItem', indexOfThisItem.value);
    } else {
      emit('hideForm');
    }
  }
</script>
