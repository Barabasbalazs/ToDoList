<template>
     <div class="grid grid-rows-2 gap-2 text-center border-2 border-black">
        <div class="grid grid-cols-2">
            <p>{{ props.item.title }}</p>
            <p>{{ props.item.priority }}</p>
        </div>    
        <div>
            <p>{{ props.item.text }}</p>
        </div>
        <div>
            <button>Save</button>
            <button class="border-2" @click="removeTodo(props.index)">Remove</button>
        </div>    
    </div>
</template>

<script setup lang = 'ts'>
import { ToDoItem } from '../models/todoitem-model';

const props = defineProps<{
    item: ToDoItem,
    index: number,
}>();

const emit = defineEmits<{
    (e: 'removeItem', ind: number): void
}>();

const removeTodo = (ind: number) => {
    emit('removeItem', ind);
}

</script>