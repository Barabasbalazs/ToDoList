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
      v-if="isLoading"
      class="border-2 border-black rounded-xl p-2 px-4 bg-green"
      disabled
      ><svg class="svg-container" height="25" width="25" viewBox="0 0 100 100">
        <circle class="loader-svg bg" cx="50" cy="50" r="45"></circle>
        <circle class="loader-svg animate" cx="50" cy="50" r="45"></circle>
      </svg>
    </PrimaryButton>
    <PrimaryButton
      v-else
      class="border-2 border-black rounded-xl p-2 bg-green"
      @click="login"
      ><p>Login</p></PrimaryButton
    >
    <p>Don't have an Account yet?</p>
    <p class="text-blue hover:underline">Register here</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { User } from '../types/user';
  import PrimaryButton from './PrimaryButton.vue';
  import UserInputComp from './UserInputComp.vue';
  import { useUserStore } from '../stores/user';
  import ConfirmationModal from './ConfirmationModal.vue';
  import router from '../router/router';

  const userStore = useUserStore();

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
    try {
      isLoading.value = true;
      const res = await userStore.login(currentUserInput.value);
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

<style scoped>
  .svg-loader {
    display: flex;
    position: relative;
    align-content: space-around;
    justify-content: center;
  }
  .loader-svg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    fill: none;
    stroke-width: 5px;
    stroke-linecap: round;
    stroke: rgb(0, 148, 25);
  }
  .loader-svg.bg {
    stroke-width: 8px;
    stroke: rgb(207, 205, 245);
  }
  .animate {
    stroke-dasharray: 242.6;
    animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;
  }

  @keyframes fill-animation {
    0% {
      stroke-dasharray: 40 242.6;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 141.3;
      stroke-dashoffset: 141.3;
    }
    100% {
      stroke-dasharray: 40 242.6;
      stroke-dashoffset: 282.6;
    }
  }
</style>
