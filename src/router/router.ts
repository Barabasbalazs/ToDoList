import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import { useUserStore } from "../stores/user";

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore();
    if (to.path === '/' && userStore.authToken === '') {
        return next('/login');
    }
    if (to.path === '/login' && userStore.authToken !== '') {
        return next('/');
    }
    return next();
});

export default router;