<template>
    <div class="grid grid-cols text-xl gap-4">
        <ul v-for="(item, index) in props.listItems">
            <li class="grid grid-row gap-2 text-center">
                <p>{{ item }}</p>
                <button class="border-2" @click="removeTodo(index)"> Remove</button>
            </li>    
        </ul>
    </div> 
</template>

<script setup lang='ts'>

const props = defineProps<{
    listItems: string []
}>();

const emit = defineEmits<{
    (e: 'removeItem', ind: number): void
}>();

const removeTodo = (ind: number) => {
    emit('removeItem', ind);
}

</script>