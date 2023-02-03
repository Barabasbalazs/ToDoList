<template>
  <div class="text-center border-2 border-black mx-3.5 rounded-2xl">
    <div
      v-if="showPopUp"
      class="fixed inset-0 items-center justify-center bg-black/75 flex"
    >
      <div
        class="bg-white z-20 border-black border-2 rounded-xl flex flex-col items-center lg:w-2/5 w-4/5"
      >
        <div class="text-lg text-white font-semibold rounded-full bg-red mt-2">
          <p class="mx-5">Warning</p>
        </div>
        <p class="m-2">
          Are you sure you want to delete this item? This operation is permanent
          and you will not be able to undo this action!
        </p>
        <div class="flex flex-row space-x-6 mb-2 font-semibold">
          <button
            class="rounded-full bg-green px-2 text-white"
            @click="removeTodo"
          >
            Yes
          </button>
          <button
            class="rounded-full bg-red px-2 text-white"
            @click="showPopUp = false"
          >
            No
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-[18px]">
      <div class="flex flex-row justify-between items-center">
        <input
          v-model="currentTitle"
          type="text"
          placeholder="Title"
          class="w-[197px] font-semibold text-lg lg:text-4xl"
          :class="showDropDown ? 'opacity-30' : ''"
          :disabled="showDropDown"
        />
        <div class="flex flex-row space-x-[5px] items-center lg:hidden">
          <div
            class="p-1 bg-blue rounded-full h-fit"
            :class="
              currentPriority === Priority.low ? 'border border-black' : ''
            "
            @click="changePriority(Priority.low)"
          ></div>
          <div
            class="p-1 bg-yellow rounded-full h-fit"
            :class="
              currentPriority === Priority.medium ? 'border border-black' : ''
            "
            @click="changePriority(Priority.medium)"
          ></div>
          <div
            class="p-1 bg-red rounded-full h-fit"
            :class="
              currentPriority === Priority.high ? 'border border-black' : ''
            "
            @click="changePriority(Priority.high)"
          ></div>
        </div>
        <div class="hidden lg:flex flex-col">
          <div
            class="text-lg text-white font-semibold rounded-full"
            :class="
              showDropDown
                ? 'text-black bg-white border-2 border-black'
                : priorityClass
            "
          >
            <button
              id="dropdownButton"
              class="ml-5 mr-3 text-center flex items-center"
              type="button"
              @click="showDropDown = !showDropDown"
            >
              {{ currentPriority }}
              <svg
                class="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Dropdown menu -->
          <div
            v-if="showDropDown"
            id="dropdown"
            class="cursor-pointer absolute z-10 top-12 text-lg font-semibold rounded-xl border-black border-2 text-start items-center"
          >
            <ul class="py-2 pl-4 pr-3" aria-labelledby="dropdownButton">
              <li v-for="priority in priorityList">
                <p class="opacity-100" @click="changePriority(priority)">
                  {{ priority }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row space-x-1"
        :class="showDropDown ? 'opacity-30' : ''"
      >
        <img src="../assets/icons/Vectorcalendar.svg" />
        <p class="text-xs">{{ formatShortDate(date) }}</p>
      </div>
      <div class="self-start mt-4 mb-4">
        <textarea
          v-model="currentText"
          placeholder="Lorem ipsum"
          class="border-none h-[70.27px] w-[224.45px] lg:h-[103px] lg:w-[455.1px] text-start text-sm lg:text-lg text-grey"
          :class="showDropDown ? 'opacity-30' : ''"
          :disabled="showDropDown"
        ></textarea>
      </div>
      <div class="text-sm flex flex-row font-semibold space-x-2">
        <button
          class="text-white w-[61px] h-[27px] rounded-lg bg-green"
          :class="showDropDown ? 'opacity-30' : ''"
          :disabled="showDropDown"
          @click="saveToDo"
        >
          Save
        </button>
        <button
          class="rounded-lg h-[27px] w-[70px] bg-buttonGray"
          :class="showDropDown ? 'opacity-30' : ''"
          :disabled="showDropDown"
          @click="deleteToDo"
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

  const showDropDown = ref(false);

  const currentTitle = ref(props.item ? props.item.title : '');

  const currentText = ref(props.item ? props.item.text : '');

  const indexOfThisItem = ref(
    props.index || props.index === 0 ? props.index : -1
  );

  const currentPriority = ref(props.item ? props.item.priority : Priority.low);

  const priorityClass = computed(() => getItemPriority(currentPriority.value));

  const date = new Date();

  const priorityList = [Priority.low, Priority.medium, Priority.high];

  const showPopUp = ref(false);

  function changePriority(priority: Priority) {
    currentPriority.value = priority;
    showDropDown.value = false;
  }

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

  function deleteToDo() {
    if (props.item) {
      showPopUp.value = true;
    } else {
      emit('hideForm');
    }
  }

  function removeTodo() {
    emit('removeItem', indexOfThisItem.value);
  }
</script>
} else { }
