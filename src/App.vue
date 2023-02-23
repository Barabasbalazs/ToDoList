<script setup lang="ts">
  import HomePage from './components/HomePage.vue';
  import LoginPage from './components/LoginPage.vue';
  import RegisterPage from './components/RegisterPage.vue';
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style>
  @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');

  * {
    font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
  }
</style>
