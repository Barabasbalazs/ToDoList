<template>
  <div class="flex flex-col items-center space-y-2 mt-7" @keyup.enter="login">
    <Transition>
      <ConfirmationModal
        v-if="isPopUpShown"
        title="Warning"
        text="Unsuccesfull login"
        :is-login-modal="true"
        @hide-pop-up="hidePopUp"
      />
    </Transition>
    <div class="flex flex-col items-center space-y-2 lg:text-2xl font-semibold">
      <h1>Welcome to the To do list App!</h1>
      <p>Login</p>
    </div>
    <UserInputComp
      class="border-black border-2 rounded-xl w-4/6 lg:w-1/5 p-2"
      @changed-input="changeInput"
    />
    <PrimaryButton
      class="border-2 border-black rounded-xl p-2 bg-green"
      @click="login"
      :disabled="isLoading"
      :is-loading="isLoading"
      ><p>Login</p></PrimaryButton
    >
    <p>Don't have an Account yet?</p>
    <router-link to="/register" class="text-blue hover:underline"
      >Register here</router-link
    >
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { User } from '../types/user';
  import PrimaryButton from './PrimaryButton.vue';
  import UserInputComp from './UserInputComp.vue';
  import { useAuthStore } from '../stores/authentication';
  import ConfirmationModal from './ConfirmationModal.vue';
  import router from '../router/router';
  import { isEmptyInput } from '../utils/input-validation';

  const authStore = useAuthStore();

  const isLoading = ref(false);

  const isPopUpShown = ref(false);

  const currentUserInput = ref({
    password: '',
    email: '',
  });

  function changeInput(userInput: User) {
    currentUserInput.value = userInput;
  }

  async function login() {
    if (isEmptyInput(currentUserInput.value)) {
      isPopUpShown.value = true;
      return;
    }
    try {
      isLoading.value = true;
      const res = await authStore.login(currentUserInput.value);
      if (!res) {
        isPopUpShown.value = true;
        return;
      }
      router.push('/');
    } catch (e) {
      isPopUpShown.value = true;
    }
  }

  function hidePopUp() {
    isPopUpShown.value = false;
  }
</script>
