<template>
  <div>
    <div class="grid grid-rows-2 gap-2 text-center border-2 border-black">
      <div class="grid grid-cols-2">
        <input type="text" v-model="title" />
        <select v-model="priority">
          <option v-for="value in priorities" :value="value">
            {{ value }}
          </option>
        </select>
      </div>
      <input type="text" v-model="text" />
      <div>
        <button @click="addTodo">Save</button>
        <button class="border-2" @click="hideForm">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Priority, Status, ToDoItem } from '../models/todoitem-model';

  const text = ref('');
  const title = ref('');
  const priority = ref(Priority.low);
  const priorities = [Priority.low, Priority.medium, Priority.high];

  const emit = defineEmits<{
    (e: 'addToDo', newToDo: ToDoItem): void;
    (e: 'hideForm'): void;
  }>();

  function addTodo() {
    const newToDoItem = {
      title: title.value,
      text: text.value,
      priority: priority.value,
      status: Status.notresolved,
      createdAt: new Date(),
    };

    emit('addToDo', newToDoItem);

    text.value = '';
    title.value = '';
    priority.value = Priority.low;
  }

  function hideForm() {
    emit('hideForm');
  }
</script>
