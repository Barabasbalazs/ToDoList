<template>
  <div class="flex flex-col items-center space-y-2 mt-7">
    <div class="flex flex-col items-center space-y-2 lg:text-2xl font-semibold">
      <h1>Welcome to the To do list App!</h1>
      <p>Login</p>
    </div>
    <RegisterFormComp class="border-black border-2 rounded-xl w-4/6 lg:w-1/5 p-2" />
    <PrimaryButton class="border-2 border-black rounded-xl p-2 bg-green"
      ><p>Login</p></PrimaryButton
    >
    <p>Don't have an Account yet?</p>
    <p class="text-blue hover:underline">Register here</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import PrimaryButton from './PrimaryButton.vue';
  import RegisterFormComp from './UserInputComp.vue';

</script>
