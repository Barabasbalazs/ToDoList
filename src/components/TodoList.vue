<template>
    <div>
            <ul v-for="(item, index) in props.listItems">
                    <li>
                        {{ item }}
                        <button @click="removeTodo(index)"> Remove</button>
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