<template>
    <header>
        <div class="grid grid-rows-2 place-content-evenly">
            <div class="text-l">
                <button>Log Out</button>
            </div>
            <div class="grid grid-cols-2 text-2xl">    
                <h1>To do List</h1>
                <button @click="showForm" class="border-4 border-black">+</button>
            </div>    
        </div>
    </header>
</template>

<script setup lang = 'ts'>

const emit = defineEmits<{
    (e: 'showForm'): void
}>();

const showForm = () => {
    emit('showForm');
}

</script>