<template>
    <div>
        <h1 class="text-center text-2xl py-6">This is the TodoList</h1>
            <div class="grid grid-rows-3 text-xl place-items-center gap-4">
                <p>Add To Do item</p>
                <input v-model="text" @keyup.enter="addTodo" class="border-4 border-black rounded-full">
                <button @click="addTodo" class="border-4 border-black">Add item</button>
            </div>
    </div>
</template>

<script setup lang = 'ts'>
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'addToDo', text: string): void
}>();

const text = ref('');

const addTodo = () => {
    emit('addToDo', text.value);
    text.value = '';
}    

</script>