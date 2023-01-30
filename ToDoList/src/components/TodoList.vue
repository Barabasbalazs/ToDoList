<template>
    <div>
        <h1>This is the TodoList</h1>
        <div>
            <p>Add To Do item</p>
            <br />
            <input v-model="inputText">
            <br/>
            <button @click="addItemToList">Add item</button>
        </div>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

const listItems : string [] = [];

const inputText = ref();

const addItemToList = () => {
    console.log(inputText.value);
}

</script>