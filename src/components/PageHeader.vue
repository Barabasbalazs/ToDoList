<template>
    <header>
        <div class="flex flex-cols justify-between px-4 pt-7 items-center">    
            <h1 class="text-2xl lg:text-7xl font-semibold">To do List</h1>
            <button @click="showForm" class="lg:w-[59.64px] lg:h-[59.64px] w-8 h-8 bg-green text-xl text-white lg:text-4xl rounded-full col-end-auto">+</button>
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

<style>

.btn {
    background-color:  #38CB89;
}

</style>