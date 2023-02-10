<template>
    <div class="flex flex-col font-semibold text-sm mx-3.5 space-y-5 mb-11">
        <div class="flex justify-between w-full">
            <PrimaryButton
                class="bg-green rounded-md py-1 px-3"
            >
                <p>Title</p>
            </PrimaryButton>
            <PrimaryButton
                class="bg-black rounded-md py-1 px-3"
            >
                <p>Description</p>
            </PrimaryButton>
            <PrimaryButton
                class="text-black border-2 border-black py-1 rounded-md px-3"
            >
                <p>Priority</p>
            </PrimaryButton>
            <PrimaryButton
                class="text-black border-2 border-black py-1 rounded-md px-3"
            >
                <p>Date</p>
            </PrimaryButton>
        </div> 
        <div class="flex space-x-2">
            <PrimaryButton
                class="bg-green px-3 py-2.5 rounded-md"
            >
                <img src="../assets/icons/Vectorup.svg">
            </PrimaryButton>
            <PrimaryButton
                class="bg-black px-3 py-2.5 rounded-md"
            >
            <img src="../assets/icons/Vectordown.svg">
            </PrimaryButton>
        </div>   
    </div>
</template>

<script setup lang="ts">
import PrimaryButton from './PrimaryButton.vue';

</script>