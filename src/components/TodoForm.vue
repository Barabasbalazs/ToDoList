<template>
    <div>
        <h1>This is the TodoList</h1>
            <div>
                <p>Add To Do item</p>
                <br />
                <input v-model="text" @keyup.enter="addTodo">
                <br/>
                <button @click="addTodo">Add item</button>
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

const fireThis = () => {
    console.log('Hey im fired');
}

</script>