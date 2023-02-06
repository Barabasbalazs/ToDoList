<template>
  <div
    v-click-away="clickAway"
    class="text-center border-2 border-black mx-3.5 rounded-2xl"
  >
    <div
      v-if="isPopUpShown"
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
          <ModalButton
            value="Yes"
            additional-classes="bg-green"
            :modalButton="true"
            @click="removeTodo"
          />
          <ModalButton
            value="No"
            additional-classes="bg-red"
            :modalButton="true"
            @click="hidePopUp"
          />
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
          :class="isDropDownShown ? 'opacity-30' : ''"
          :disabled="isDropDownShown"
        />
        <div class="flex flex-row space-x-[5px] items- lg:hidden items-center">
          <div
            v-for="(priority, ind) in priorityList"
            class="p-1 rounded-full h-fit"
            :class="(getColorOfPriority(priority), styleOfPriorityButton(ind))"
            @click="changePriority(priority)"
          ></div>
        </div>
        <div class="hidden lg:flex flex-col" :class="positionOfDropDownButton">
          <div
            class="text-lg text-white font-semibold rounded-full"
            :class="dropDownStyle"
          >
            <button
              id="dropdownButton"
              class="ml-5 mr-3 text-center flex items-center"
              type="button"
              :disabled="isPopUpShown"
              @click="changeDropDownShown"
            >
              {{ currentPriority }}
              <img class="pl-2" src="../assets/icons/dropdown-vector.svg" />
            </button>
          </div>
          <!-- Dropdown menu -->
          <div
            v-if="isDropDownShown"
            id="dropdown"
            class="cursor-pointer absolute z-10 top-12 text-lg font-semibold rounded-xl border-black border-2 text-start items-center bg-white"
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
      <div class="flex flex-row space-x-1" :class="currentOpacity">
        <img src="../assets/icons/Vectorcalendar.svg" />
        <p class="text-xs">{{ formatShortDate(date) }}</p>
      </div>
      <div class="self-start mt-4 mb-4">
        <textarea
          v-model="currentText"
          placeholder="Lorem ipsum"
          class="border-none h-[70.27px] w-[224.45px] lg:h-[103px] lg:w-[455.1px] text-start text-sm lg:text-lg text-grey"
          :class="currentOpacity"
          :disabled="isDropDownShown"
        ></textarea>
      </div>
      <div class="text-sm flex flex-row font-semibold space-x-2">
        <button
          class="text-white w-[61px] h-[27px] rounded-lg bg-green"
          :class="currentOpacity"
          :disabled="isDropDownShown"
          @click="saveToDo"
        >
          Save
        </button>
        <button
          class="rounded-lg h-[27px] w-[70px] bg-buttonGray"
          :class="currentOpacity"
          :disabled="isDropDownShown"
          @click="deleteToDo"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, PropType } from 'vue';
  import { Priority, ToDoItem } from '../models/todoitem-model';
  import { formatShortDate } from '../utils/date-formatting';
  import { getItemPriority } from '../utils/item-priority';
  import ModalButton from './ModalButton.vue';

  const props = defineProps({
    item: Object as PropType<ToDoItem>,
    index: {
      type: Number,
      default: -1,
    },
  });

  const emit = defineEmits<{
    (e: 'removeItem', ind: Number): void;
    (e: 'addToDo', newToDo: ToDoItem): void;
    (e: 'hideForm'): void;
    (e: 'updateToDo', ind: Number, newToDo: ToDoItem): void;
  }>();

  const isDropDownShown = ref(false);

  const currentOpacity = computed(() => {
    if (isDropDownShown.value) {
      return 'opacity-30' as const;
    }
    return '' as const;
  });

  const currentTitle = ref(props.item?.title || '');

  const currentText = ref(props.item?.text || '');

  const currentPriority = ref(props.item?.priority || Priority.low);

  const priorityClass = computed(() => getItemPriority(currentPriority.value));

  const date = new Date();

  const priorityList = [Priority.low, Priority.medium, Priority.high];

  const isPopUpShown = ref(false);

  const positionOfDropDownButton = computed(() => {
    if (isPopUpShown.value) {
      return '' as const;
    }
    return 'relative';
  });

  const dropDownStyle = computed(() => {
    if (isDropDownShown.value === true) {
      return 'text-black bg-white border-2 border-black' as const;
    }
    return priorityClass.value;
  });

  function styleOfPriorityButton(ind: number) {
    if (currentPriority.value === priorityList[ind]) {
      return 'border border-black' as const;
    }
    return '';
  }

  function hidePopUp() {
    isPopUpShown.value = false;
  }

  function clickAway() {
    emit('hideForm');
  }

  function changeDropDownShown() {
    isDropDownShown.value = !isDropDownShown.value;
  }

  function changePriority(priority: Priority) {
    currentPriority.value = priority;
    console.log(currentPriority.value);
    isDropDownShown.value = false;
  }

  function saveToDo() {
    const newToDo = {
      title: currentTitle.value,
      text: currentText.value,
      createdAt: new Date(),
      priority: currentPriority.value,
      isResolved: false,
    };
    if (props.index === -1) {
      emit('addToDo', newToDo);
    } else {
      emit('updateToDo', props.index, newToDo);
    }
  }

  function getColorOfPriority(priority: Priority) {
    return getItemPriority(priority);
  }

  function deleteToDo() {
    if (props.item) {
      isPopUpShown.value = true;
    } else {
      emit('hideForm');
    }
  }

  function removeTodo() {
    emit('removeItem', props.index);
  }
</script>
