import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router/router';
import VueClickAway from 'vue3-click-away';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(VueClickAway);
app.use(router);
app.use(pinia);
app.mount('#app');
