<template>
    <div>
        <h1>This is the TodoList</h1>
            <div>
                <p>Add To Do item</p>
                <br />
                <input v-model="text">
                <br/>
                <button @click="addTodo">Add item</button>
            </div>
    </div>
</template>

<script setup lang = 'ts'>
import { ref } from 'vue';

const props = defineProps<{
    inputText: string
}>();

const emit = defineEmits<{
    (e: 'addToDo', text: string): void
}>();

const text = ref(props.inputText);

const addTodo = () => {
    emit('addToDo', text.value);}    

</script>