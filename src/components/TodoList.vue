<template>
  <div class="flex flex-col space-y-8">
    <div v-for="(item, index) in listItems" class="space-y-8">
      <ToDoCard :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ToDoItem } from '../models/todoitem-model';
  import ToDoCard from './ToDoCard.vue';

  const props = defineProps<{
    listItems: ToDoItem[];
  }>();

  const emit = defineEmits<{
    (e: 'removeItem', ind: number): void;
  }>();

  function removeTodo(ind: number) {
    emit('removeItem', ind);
  }
</script>
