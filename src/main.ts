import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import HomePage from './components/HomePage.vue';
import App from './App.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import VueClickAway from 'vue3-click-away';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import router from './router/router';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(VueClickAway);
app.use(router);
app.use(pinia);
app.mount('#app');
