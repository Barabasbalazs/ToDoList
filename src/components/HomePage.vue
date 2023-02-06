<template>
  <div class="max-w-[610px] flex flex-col mx-auto">
    <PageHeader @show-form="showToDoForm" />
    <div v-if="isFormShown">
      <EditableToDo
        class="mb-8"
        @add-to-do="addToDo"
        @hide-form="hideToDoForm"
      />
    </div>
    <ToDoPlaceHolder v-if="isPlaceholderShown" />
    <div v-else class="flex flex-col space-y-8">
      <div v-for="(item, index) in listItems" class="space-y-8">
        <EditableToDo
          v-if="shownItemIndex === index"
          :item="item"
          :index="index"
          @update-to-do="updateToDo"
          @remove-item="removeTodo"
          @hide-form="hideToDoForm"
        />
        <ToDoCard v-else :item="item" @click="changeSelectedCard(index)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { ToDoItem } from '../models/todoitem-model';
  import ToDoCard from './ToDoCard.vue';
  import PageHeader from './PageHeader.vue';
  import ToDoPlaceHolder from './ToDoListPlaceHolder.vue';
  import EditableToDo from './EditableToDo.vue';

  const storageItems = localStorage.getItem('listOfItems');
  const listItems = ref<Array<ToDoItem>>(
    storageItems ? JSON.parse(storageItems) : []
  );
  const isFormShown = ref(false);
  const shownItemIndex = ref(-1);
  const isPlaceholderShown = computed(() => {
    if (isFormShown.value) {
      return false;
    }
    if (listItems.value.length === 0) {
      return true;
    }
    return false;
  });

  function changeSelectedCard(ind: number) {
    shownItemIndex.value = ind;
  }
  function removeTodo(ind: Number) {
    listItems.value.splice(ind.valueOf(), 1);
    shownItemIndex.value = -1;
  }
  function showToDoForm() {
    isFormShown.value = true;
    shownItemIndex.value = -1;
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
    shownItemIndex.value = -1;
  }
  watchEffect(() => {
    localStorage.setItem('listOfItems', JSON.stringify(listItems.value));
  });
</script>
