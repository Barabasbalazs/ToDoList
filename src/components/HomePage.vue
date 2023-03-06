<template>
  <div class="max-w-[610px] flex flex-col mx-auto">
    <PageHeader @show-form="showToDoForm" />
    <Transition>
      <EditableToDo
        v-if="isFormShown"
        class="mb-8"
        @add-to-do="addToDo"
        @hide-form="hideToDoForm"
      />
    </Transition>
    <Transition>
        <ConfirmationModal
          v-if="isErrorShown"
          title="Warning"
          text="There has been an error"
          @hide-pop-up="hideError"
        />
      </Transition>
    <div v-if="isSearchbarShown">
      <SearchBar class="mb-8" @search-according-to="searchToDo" />
      <FilterBar @filter-by="filterToDos" />
    </div>
    <ToDoPlaceHolder v-if="isPlaceholderShown" />
    <TransitionGroup
      v-else
      name="list"
      tag="div"
      class="flex flex-col space-y-8"
    >
      <div v-for="(item, index) in listItems" :key="item._id" class="space-y-8">
        <EditableToDo
          v-if="shownItemID === item._id"
          v-click-away="toggleToDoEditState"
          :item="item"
          :index="index"
          @update-to-do="updateToDo"
          @remove-item="removeTodo"
          @hide-form="hideToDoForm"
        />
        <ToDoCard
          v-else
          :item="item"
          @click="changeSelectedCard(item._id)"
          @toggle-resolved-status="toggleResolvedStatus(index, item._id, item.isResolved)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { ToDoItem } from '../models/todoitem-model';
  import ToDoCard from './ToDoCard.vue';
  import PageHeader from './PageHeader.vue';
  import ToDoPlaceHolder from './ToDoListPlaceHolder.vue';
  import EditableToDo from './EditableToDo.vue';
  import SearchBar from './SearchBar.vue';
  import FilterBar from './FilterBar.vue';
  import { FilterType } from '../types/filter-type';
  import { useTodoStore } from '../stores/todo';
  import ConfirmationModal from './ConfirmationModal.vue';

  const order = ref('asc');
  const sort = ref('isResolved');
  const search = ref('');

  const isErrorShown = ref(false);

  const todoStore = useTodoStore();

  const listItems = computed(() => todoStore.todos);

  const isFormShown = ref(false);

  const shownItemID = ref('');

  const isSearchbarShown = computed(() => {
    return !isPlaceholderShown.value;
  });

  const isPlaceholderShown = computed(() => {
    if (isFormShown.value) {
      return false;
    }
    return listItems.value.length === 0;
  });

  onMounted(async () => {
    try {
      await todoStore.getToDos(sort.value, order.value);
    } catch (e) {
      isErrorShown.value = true;
    }
  });

  async function searchToDo(searchString: string) {
    search.value = searchString;
    try {
      await todoStore.getToDos(sort.value, order.value, search.value);
    } catch (e) {
      isErrorShown.value = true;
    }
  }

  async function toggleResolvedStatus(ind: number, _id: string, isResolvedStatus: boolean) {
    try {
      const orderOfItems = (isResolvedStatus) ? 1 : -1;
      await todoStore.updateToDo(ind, {_id, isResolved: !isResolvedStatus} , orderOfItems);
      toggleToDoEditState();
    } catch (e) {
      isErrorShown.value = true;
    }
  }

  function toggleToDoEditState() {
    shownItemID.value = '';
  }

  function changeSelectedCard(id: string) {
    shownItemID.value = id;
  }

  async function removeTodo(ind: number) {
    try {
      todoStore.removeToDo(ind, listItems.value[ind]);
      toggleToDoEditState();
    } catch (e) {
      isErrorShown.value = true;
    }
  }

  function showToDoForm() {
    isFormShown.value = true;
    toggleToDoEditState();
  }

  function hideToDoForm() {
    isFormShown.value = false;
  }

  function hideError() {
    isErrorShown.value = false;
  }

  async function addToDo(newToDo: Partial<ToDoItem>) {
    try {
      await todoStore.addToDo(newToDo);
      isFormShown.value = false;
    } catch (e) {
      isErrorShown.value = true;
    }
  }

  async function updateToDo(ind: number, newToDo: Partial<ToDoItem>) {
    try {
      await todoStore.updateToDo(ind, newToDo);
      toggleToDoEditState();
    } catch (e) {
      isErrorShown.value = true;
    }
  }

  async function filterToDos(filter: FilterType, orderBy: number) {
    sort.value = filter;
    order.value = orderBy === 1 ? 'asc' : 'desc';
    try {
      await todoStore.getToDos(sort.value, order.value, search.value);
    } catch (e) {
      isErrorShown.value = true;
    }
  }
</script>

<style>
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .list-leave-active {
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
