<template>
  <div class="max-w-[610px] flex flex-col mx-auto">
    <PageHeader @show-form="showToDoForm" />
    <div v-if="showForm">
      <ToDoItemComp class="mb-8" @add-to-do="addItem" @hide-form="hideToDoForm"/>
    </div>
    <ToDoPlaceHolder v-if="showPlaceHolder" />
    <div v-else class="flex flex-col space-y-8">
      <div v-for="(item, index) in listItems" class="space-y-8">
        <ToDoItemComp v-if="itemShow === index" :item="item" :index="index" @update-to-do="updateToDo" @remove-item="removeTodo"/>
        <ToDoCard v-else :item="item" @click="changeStateOfCard(index)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect, watch } from 'vue';
  import { ToDoItem } from '../models/todoitem-model';
  import ToDoCard from './ToDoCard.vue';
  import PageHeader from './PageHeader.vue';
  import ToDoPlaceHolder from './ToDoListPlaceHolder.vue';
  import ToDoItemComp from './ToDoItemComp.vue';
  const storage = localStorage.getItem('listOfItems');
  const listItems = ref<Array<ToDoItem>>(storage ? JSON.parse(storage) : []);
  const showForm = ref(false);
  const itemShow = ref(-1);
  const showPlaceHolder = computed(() => {
    if (showForm.value) {
      return false;
    }
    if (listItems.value.length === 0) {
      return true;
    }
  });
  function changeStateOfCard (ind: number) {
    itemShow.value = ind;
  }
  function removeTodo(ind: number) {
    if (ind === 0) {
      listItems.value.shift();
    } else {
      listItems.value.splice(ind, 1);
    }
    itemShow.value = -1;
  }
  function showToDoForm() {
    showForm.value = true;
  }
  function hideToDoForm() {
    showForm.value = false;
  }
  function addItem(newToDo: ToDoItem) {
    listItems.value.unshift(newToDo);
    showForm.value = false;
  }
  function updateToDo(ind: number, newToDo: ToDoItem) {
    listItems.value[ind] = newToDo;
    itemShow.value = -1;
  }
  watchEffect(() => {
    localStorage.setItem('listOfItems', JSON.stringify(listItems.value));
  });
</script>
