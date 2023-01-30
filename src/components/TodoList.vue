<template>
    <div>
        <h1>This is the TodoList</h1>
        <div>
            <p>Add To Do item</p>
            <br />
            <input v-model="inputText">
            <br/>
            <button @click="addTodo">Add item</button>
        </div>
        <div>
            <ul v-for="(item, index) in listItems">
                <li>
                    {{ item }}
                    <button @click="removeTodo(index)"> Remove</button>
                </li>    
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

const listItems = ref<Array<string>>([]);

const inputText = ref();

const addTodo = () => {
    if (inputText.value === '') {
        alert('Empty list item');
        return;
    }
    listItems.value?.push(inputText.value);
    inputText.value = '';
}

const removeTodo = (ind: number) => {
    listItems.value.splice(ind, 1);
}

</script>