<template>
  <div class="max-w-[610px] flex flex-col mx-auto">
    <PageHeader @show-form="showToDoForm" />
    <div v-if="showForm">
      <TodoForm @add-to-do="addItem" @hide-form="showToDoForm" />
    </div>
    <ToDoPlaceHolder v-if="showPlaceHolder" />
    <div v-else>
      <TodoList :list-items="listItems" @remove-item="removeTodo" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { ToDoItem } from '../models/todoitem-model';
  import TodoForm from './TodoForm.vue';
  import TodoList from './TodoList.vue';
  import PageHeader from './PageHeader.vue';
  import ToDoPlaceHolder from './ToDoListPlaceHolder.vue';

  const storage = localStorage.getItem('listOfItems');

  const listItems = ref<Array<ToDoItem>>(storage ? JSON.parse(storage) : []);

  const showForm = ref(false);

  const showPlaceHolder = computed(() => {
    if (showForm.value) {
      return false;
    }
    if (listItems.value.length === 0) {
      return true;
    }
  });

  function removeTodo(ind: number) {
    listItems.value.splice(ind, 1);
  }

  function showToDoForm() {
    showForm.value = !showForm.value;
  }

  function addItem(newToDo: ToDoItem) {
    listItems.value.push(newToDo);
  }

  watchEffect(() => { localStorage.setItem('listOfItems', JSON.stringify(listItems.value)); });
</script>
