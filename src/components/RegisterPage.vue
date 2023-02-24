<template>
  <div class="flex flex-col items-center space-y-2 mt-7">
    <h1 class="lg:text-2xl font-semibold">Register</h1>
    <div class="border-2 border-black rounded-xl p-2 w-4/6 lg:w-1/5 space-y-2">
      <div class="flex flex-col space-y-2">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
      </div>
      <UserInputComp @changed-input="changeInput" />
    </div>
    <PrimaryButton class="border-2 border-black rounded-xl p-2 bg-green"
      ><p>Register</p></PrimaryButton
    >
    <p class="text-blue hover:underline">Go back</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { User } from '../types/user';
  import PrimaryButton from './PrimaryButton.vue';
  import UserInputComp from './UserInputComp.vue';

  const password = ref('');
  const email = ref('');
  const firstName = ref('');
  const lastName = ref('');

  const currentUserInput = computed(() => {
    return {
      password: password.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
    };
  });

  function changeInput(userInput: User) {
    email.value = userInput.email;
    password.value = userInput.password;
  }
</script>
