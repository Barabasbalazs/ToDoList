<template>
  <div class="text-center border-2 border-black mx-3.5 rounded-2xl">
    <Transition>
      <ConfirmationModal
        v-if="isPopUpShown"
        title="Warning"
        text="Are you sure you want to delete this item? This operation is permanent
          and you will not be able to undo this action!"
        @remove-to-do="removeTodo"
        @hide-pop-up="hidePopUp"
      />
    </Transition>
    <div class="flex flex-col m-[18px]">
      <div class="flex flex-row justify-between items-center">
        <input
          v-model="currentTitle"
          type="text"
          placeholder="Title"
          class="w-[197px] font-semibold text-lg lg:text-4xl"
          :class="currentOpacity"
          :disabled="isDropDownShown"
        />
        <div class="flex flex-row space-x-[5px] items- lg:hidden items-center">
          <div
            v-for="(priority, ind) in priorityList"
            class="p-1 rounded-full h-fit"
            :class="getColorOfPriority(priority), styleOfPriorityButton(ind)"
            @click="changePriority(priority)"
          ></div>
        </div>
        <div class="hidden lg:flex flex-col" :class="positionOfDropDownButton">
          <div
            class="text-lg text-white font-semibold rounded-full"
            :class="dropDownStyle"
          >
            <PrimaryButton
              class="ml-5 px-0 py-0 mr-3 flex items-center"
              :class="textColorOfDropDown"
              :disabled="isPopUpShown"
              @click="toggleDropDownVisibility"
            >
              {{ currentPriority }}
              <img class="pl-2" src="../assets/icons/dropdown-vector.svg" />
            </PrimaryButton>
          </div>
          <!-- Dropdown menu -->
          <div
            v-if="isDropDownShown"
            id="dropdown"
            class="cursor-pointer absolute z-10 top-12 text-lg font-semibold rounded-xl border-black border-2 text-start items-center bg-white"
          >
            <ul class="py-2 pl-4 pr-3" aria-labelledby="dropdownButton">
              <li v-for="priority in priorityList">
                <p class="opacity-100" @click.stop="changePriority(priority)">
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
      <div class="flex mt-4 mb-4">
        <textarea
          v-model="currentText"
          placeholder="Lorem ipsum"
          class="border-none h-18 w-56 lg:h-28 lg:w-96 text-start text-sm lg:text-lg text-grey"
          :class="currentOpacity"
          :disabled="isDropDownShown"
        ></textarea>
      </div>
      <div class="text-sm flex flex-row font-semibold space-x-2">
        <PrimaryButton
          class="bg-green px-5 py-2"
          :class="currentOpacity"
          :disabled="isDropDownShown"
          @click="saveToDo"
          >Save</PrimaryButton
        >
        <PrimaryButton
          class="bg-buttonGray text-black px-5 py-2 transition duration-150 ease-in-out"
          :class="currentOpacity"
          :disabled="isDropDownShown"
          @click="deleteToDo"
          >Delete</PrimaryButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, PropType } from 'vue';
  import { Priority, ToDoItem } from '../models/todoitem-model';
  import { formatShortDate } from '../utils/date-formatting';
  import { getItemPriority } from '../utils/item-priority';
  import ConfirmationModal from './ConfirmationModal.vue';
  import PrimaryButton from './PrimaryButton.vue';

  const props = defineProps({
    item: Object as PropType<ToDoItem>,
    index: {
      type: Number,
      default: -1,
    },
    isPopUpShown: {
      type: Boolean,
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
    return isDropDownShown.value ? ('opacity-30' as const) : ('' as const);
  });

  const currentTitle = ref(props.item?.title || '');

  const currentText = ref(props.item?.text || '');

  const currentPriority = ref(props.item?.priority || Priority.low);

  const date = new Date();

  const priorityList = [Priority.low, Priority.medium, Priority.high];

  const isPopUpShown = ref(false);

  const textColorOfDropDown = computed(() => {
    return isDropDownShown.value ? ('text-black' as const) : ('' as const);
  });

  const positionOfDropDownButton = computed(() => {
    return isPopUpShown.value ? ('' as const) : ('relative' as const);
  });

  const dropDownStyle = computed(() => {
    if (isDropDownShown.value) {
      return 'text-black bg-white border-2 border-black' as const;
    }
    return getItemPriority(currentPriority.value);
  });

  function styleOfPriorityButton(ind: number) {
    return currentPriority.value === priorityList[ind]
      ? ('border border-black' as const)
      : ('' as const);
  }

  function hidePopUp() {
    isPopUpShown.value = false;
  }

  function toggleDropDownVisibility() {
    isDropDownShown.value = !isDropDownShown.value;
  }

  function changePriority(priority: Priority) {
    currentPriority.value = priority;
    isDropDownShown.value = false;
  }

  function saveToDo() {
    const newToDo = {
      id: Math.random() * 1000,
      title: currentTitle.value,
      text: currentText.value,
      createdAt: new Date().toDateString(),
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

<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
