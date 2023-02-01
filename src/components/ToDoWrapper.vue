<template>
  <div class="max-w-[610px] flex flex-col mx-auto">
    <PageHeader @show-form="showToDoForm" />
    <div v-if="showForm">
      <TodoForm @add-to-do="addItem" @hide-form="showToDoForm" />
    </div>
    <PlaceHolder v-if="showPlaceHolder" />
    <div v-else>
      <TodoList :list-items="listItems" @remove-item="removeTodo" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { ToDoItem } from '../models/todoitem-model';
  import TodoForm from './TodoForm.vue';
  import TodoList from './TodoList.vue';
  import PageHeader from './PageHeader.vue';
  import PlaceHolder from './PlaceHolder.vue';

  const storage = localStorage.getItem('listOfItems');

  const listItems = ref<Array<ToDoItem>>(storage ? JSON.parse(storage) : []);

  const showForm = ref(false);

  const showPlaceHolder = ref(listItems.value.length === 0);

  function removeTodo(ind: number) {
    listItems.value.splice(ind, 1);
  }

  function showToDoForm() {
    showForm.value = !showForm.value;
  }

  function addItem(newToDo: ToDoItem) {
    listItems.value.push(newToDo);
  }

  watch(listItems.value, (newListItems) => {
    localStorage.setItem('listOfItems', JSON.stringify(newListItems));
  });

  watch(showForm, (newShowForm) => {
    showPlaceHolder.value =
      !newShowForm && listItems.value.length === 0 ? true : false;
  });
</script>
