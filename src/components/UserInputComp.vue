<template>
  <div class="flex flex-col space-y-2">
    <input v-model="email" type="text" placeholder="Email" />
    <div class="flex justify-between flex-wrap">
      <input
        v-model="password"
        class="w-3/5"
        :type="typeOfInput"
        placeholder="Password"
      />
      <PrimaryButton
        class="border-2 border-black rounded-xl p-1 text-sm"
        :class="buttonColor"
        @click="togglePassword"
        ><p>{{ buttonText }}</p></PrimaryButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  import { User } from '../types/user';
  import PrimaryButton from './PrimaryButton.vue';

  const emit = defineEmits<{
    (e: 'changedInput', userInput: User): void;
  }>();

  const password = ref('');
  const email = ref('');

  const isPasswordShown = ref(false);

  const buttonColor = computed(() => {
    return isPasswordShown.value
      ? ('text-black px-2' as const)
      : ('bg-black' as const);
  });
  const buttonText = computed(() => {
    return isPasswordShown.value ? 'hide' : 'show';
  });
  const typeOfInput = computed(() => {
    return isPasswordShown.value ? ('text' as const) : ('password' as const);
  });

  function togglePassword() {
    isPasswordShown.value = !isPasswordShown.value;
  }
  watchEffect(() => {
    const userInput = {
      email: email.value,
      password: password.value,
    };
    emit('changedInput', userInput);
  });
</script>
