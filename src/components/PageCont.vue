<template>
    <div>
        <TodoForm @add-to-do="addItem"
            :input-text="inputText"
        />
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

<script setup lang="ts">
import TodoForm from './TodoForm.vue';
import { ref } from 'vue';

const listItems = ref<Array<string>>([]);
const inputText = ref('');

const removeTodo = (ind: number) => {
    listItems.value.splice(ind, 1);
}

const addItem = (text: string) => {
    listItems.value.push(text);
    inputText.value = '';
}

</script>