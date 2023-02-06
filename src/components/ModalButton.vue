<template>
    <div>
        <button
            class="rounded-full px-2 text-white"
            :class="additionalClasses"
        >
            {{ value }}
        </button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    additionalClasses : {
        type: String,
        default: ''
    },
});

</script>