<template>
  <div
    class="flex flex-col items-center space-y-2 mt-7"
    @keyup.enter="register"
  >
    <Transition>
      <ConfirmationModal
        v-if="isPopUpShown"
        :title="modalTitle"
        :text="modalText"
        :is-login-modal="true"
        @hide-pop-up="hidePopUp"
      />
    </Transition>
    <h1 class="lg:text-2xl font-semibold">Register</h1>
    <div class="border-2 border-black rounded-xl p-2 w-4/6 lg:w-1/5 space-y-2">
      <div class="flex flex-col space-y-2">
        <input v-model="firstName" type="text" placeholder="First Name" />
        <input v-model="lastName" type="text" placeholder="Last Name" />
      </div>
      <UserInputComp @changed-input="changeInput" />
    </div>
    <PrimaryButton
      class="border-2 border-black rounded-xl p-2 bg-green"
      @click="register"
      :disabled="isLoading"
      :is-loading="isLoading"
      ><p>Register</p></PrimaryButton
    >
    <router-link to="/login" class="text-blue hover:underline"
      >Go back</router-link
    >
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { User } from '../models/user-model';
  import router from '../router/router';
  import { authService } from '../services/auth-service';
  import { isEmptyInput } from '../utils/input-validation';
  import PrimaryButton from '../components/PrimaryButton.vue';
  import UserInputComp from '../components/UserInputComp.vue';
  import ConfirmationModal from '../components/ConfirmationModal.vue';

  const password = ref('');
  const email = ref('');
  const firstName = ref('');
  const lastName = ref('');

  const isLoading = ref(false);
  const isPopUpShown = ref(false);

  const modalTitle = ref('');
  const modalText = ref('');
  const modalRedirect = ref(false);

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

  function registrationError() {
    modalTitle.value = 'Unsuccesfull';
    modalText.value = 'Failed to register';
    isPopUpShown.value = true;
  }

  async function register() {
    if (isEmptyInput(currentUserInput.value)) {
      registrationError();
      return;
    }
    try {
      isLoading.value = true;
      const res = await authService.register(currentUserInput.value);
      if (!res) {
        registrationError();
        return;
      }
      modalTitle.value = 'Succes';
      modalText.value =
        'You succesfully registered! We will take you to the login page now.';
      modalRedirect.value = true;
      isPopUpShown.value = true;
    } catch (e) {
      isPopUpShown.value = true;
    }
  }

  function hidePopUp() {
    isPopUpShown.value = false;
    if (modalRedirect.value) {
      router.push('/login');
    }
  }
</script>
