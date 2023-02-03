<template>
  <select
    v-model="currentPriority"
    class="ml-5 mr-2 text-center"
    :class="priorityClass"
  >
    <option v-for="value in priorityList" :value="value">
      {{ value }}
    </option>
  </select>
</template>
