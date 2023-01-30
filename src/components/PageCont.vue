<template>
    <div>
        <TodoForm @add-to-do="addItem"
        />
        <TodoList @remove-item="removeTodo"
            :list-items="listItems"
        />   
    </div>
</template>

<script setup lang="ts">
import TodoForm from './TodoForm.vue';
import { ref } from 'vue';
import TodoList from './TodoList.vue';

const listItems = ref<Array<string>>([]);

const removeTodo = (ind: number) => {
    listItems.value.splice(ind, 1);
}

const addItem = (text: string) => {
    listItems.value.push(text);
}

</script>