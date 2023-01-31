<template>
    <div class="max-w-[610px] flex flex-col mx-auto">
        <PageHeader @show-form="showToDoForm"/>
            <div v-if="showForm">
                <TodoForm @add-to-do="addItem"
                    @hide-form="showToDoForm"/>
            </div>
        <div v-if="listItems.length !== 0">
            <TodoList @remove-item="removeTodo"
                :list-items="listItems"
            />
        </div>       
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ToDoItem } from '../models/todoitem-model';
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
import PageHeader from './PageHeader.vue';

const storage = localStorage.getItem('listOfItems');

const listItems = ref<Array<ToDoItem>>(storage ? JSON.parse(storage) : []);

const showForm = ref(false);    

const removeTodo = (ind: number) => {
    listItems.value.splice(ind, 1);
}

const showToDoForm = () => {
    showForm.value = !showForm.value;
}

const addItem = (newToDo: ToDoItem) => {
    listItems.value.push(newToDo); 
}

watch(listItems.value, (newListItems) => {
    localStorage.setItem('listOfItems', JSON.stringify(newListItems));
});

</script>