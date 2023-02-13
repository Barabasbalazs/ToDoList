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
      <div
        v-for="(item, index) in displayItems"
        :key="item.id"
        class="space-y-8"
      >
        <EditableToDo
          v-if="shownItemID === item.id"
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
          @click="changeSelectedCard(item.id)"
          @toggle-resolved-status="toggleResolvedStatus(index)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { ToDoItem } from '../models/todoitem-model';
  import ToDoCard from './ToDoCard.vue';
  import PageHeader from './PageHeader.vue';
  import ToDoPlaceHolder from './ToDoListPlaceHolder.vue';
  import EditableToDo from './EditableToDo.vue';
  import SearchBar from './SearchBar.vue';
  import FilterBar from './FilterBar.vue';
  import {
    sortBySpecificKey
  } from '../utils/sorting-functions';
  import { FilterType } from '../types/filter-type';

  const storageItems = localStorage.getItem('listOfItems');

  const listItems = ref<Array<ToDoItem>>(
    storageItems ? JSON.parse(storageItems) : []
  );

  const isContentFiltered = ref(false);

  const displayItems = ref(listItems.value);

  const isFormShown = ref(false);

  const shownItemID = ref(-1);

  const isSearchbarShown = computed(() => {
    return !isPlaceholderShown.value;
  });

  const isPlaceholderShown = computed(() => {
    if (isFormShown.value) {
      return false;
    }
    return listItems.value.length === 0;
  });

  function searchToDo(searchString: string) {
    if (searchString === '') {
      displayItems.value = listItems.value;
      isContentFiltered.value = false;
      return;
    }
    isContentFiltered.value = true;
    const matchingTitleArray = listItems.value.filter((el) => {
      if (el.title.includes(searchString) || el.text.includes(searchString)) {
        return el;
      }
    });
    displayItems.value = matchingTitleArray;
  }

  function toggleResolvedStatus(ind: number) {
    displayItems.value[ind].isResolved = !displayItems.value[ind].isResolved;
    if (displayItems.value[ind].isResolved) {
      displayItems.value.push(displayItems.value.splice(ind, 1)[0]);
    } else {
      displayItems.value.unshift(displayItems.value.splice(ind, 1)[0]);
    }
  }

  function toggleToDoEditState() {
    shownItemID.value = -1;
  }

  function changeSelectedCard(id: number) {
    shownItemID.value = id;
  }

  function removeTodo(ind: Number) {
    listItems.value.splice(ind.valueOf(), 1);
    toggleToDoEditState();
  }

  function showToDoForm() {
    isFormShown.value = true;
    toggleToDoEditState();
  }

  function hideToDoForm() {
    isFormShown.value = false;
  }

  function addToDo(newToDo: ToDoItem) {
    listItems.value.unshift(newToDo);
    isFormShown.value = false;
  }

  function updateToDo(ind: Number, newToDo: ToDoItem) {
    listItems.value[ind.valueOf()] = newToDo;
    toggleToDoEditState();
  }

  function filterToDos(filter: FilterType, order: number) {
    const currentToDosOnDisplay = displayItems.value.slice();
    displayItems.value = currentToDosOnDisplay.sort(sortBySpecificKey(filter, order));
  }

  watchEffect(() => {
    localStorage.setItem('listOfItems', JSON.stringify(listItems.value));
    if (isContentFiltered) {
      return;
    }
    displayItems.value = listItems.value;
  });
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
