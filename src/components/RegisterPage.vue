<template>
  <div class="flex flex-col items-center space-y-2 mt-7">
    <h1 class="lg:text-2xl font-semibold">Register</h1>
    <div class="border-2 border-black rounded-xl p-2 w-4/6 lg:w-1/5 space-y-2">
      <div class="flex flex-col space-y-2">
        <input type="text" placeholder="First Name"/>
        <input type="text" placeholder="Last Name"/>
      </div>
      <RegisterFormComp />
    </div>
    <PrimaryButton class="border-2 border-black rounded-xl p-2 text-white bg-green"
      ><p>Register</p></PrimaryButton
    >
    <p class="text-blue hover:underline">Go back</p>
  </div>
</template>

<script setup lang="ts">
  import RegisterFormComp from './UserInputComp.vue';
</script>
