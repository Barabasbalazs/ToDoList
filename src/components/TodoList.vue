<template>
    <div class="grid grid-cols text-xl gap-4">
        <div v-for="(item, index) in props.listItems">
            <ToDoItemComp
                @remove-item="removeTodo"
                :item="item"
                :index="index"
            />   
        </div>
    </div> 
</template>

<script setup lang='ts'>
import { ToDoItem } from '../models/todoitem-model';
import ToDoItemComp from './ToDoItemComp.vue';

const props = defineProps<{
    listItems: ToDoItem []
}>();

const emit = defineEmits<{
    (e: 'removeItem', ind: number): void
}>();

const removeTodo = (ind: number) => {
    emit('removeItem', ind);
}

</script>