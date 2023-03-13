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
