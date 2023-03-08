<template>
  <header>
    <div class="flex justify-between items-center mt-10 pb-8 border-b-2 mx-4">
      <div class="flex flex-col text-black lg:text-lg font-medium">
        <p>Welcome</p>
        <p>{{ userName }}</p>
      </div>
      <PrimaryButton class="rounded-xl p-3 border-2 lg:hidden" @click="logout">
        <img src="../assets/icons/Loginlogout.svg" />
      </PrimaryButton>
      <PrimaryButton
        class="bg-slate-200 bg-rounded-xl p-2 px-6 border-2 hidden lg:flex"
        @click="logout"
      >
        <p class="text-black font-semibold">Log out</p>
      </PrimaryButton>
    </div>
    <div class="flex flex-cols justify-between px-4 my-7 items-center w-full">
      <h1 class="text-2xl lg:text-7xl font-semibold">To do list</h1>
      <PrimaryButton
        class="lg:w-14 lg:h-14 w-8 h-8 bg-green px-0 py-0 text-xl text-white lg:text-4xl rounded-full col-end-auto"
        @click="showForm"
      >
        <p>+</p>
      </PrimaryButton>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useAuthStore } from '../stores/authentication';
  import router from '../router/router';
  import PrimaryButton from './PrimaryButton.vue';

  const authStore = useAuthStore();

  const user = computed(() => authStore.user);

  const userName = computed(
    () => `${user.value.firstName} ${user.value.lastName}`
  );

  const emit = defineEmits<{
    (e: 'showForm'): void;
  }>();

  function showForm() {
    emit('showForm');
  }

  async function logout() {
    await authStore.logout();
    router.push('/login');
  }
</script>
