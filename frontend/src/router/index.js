/*
  ./frontend/src/router/index.js
*/

import { createRouter, createWebHistory } from 'vue-router';
import registerPage from '@/views/registerPage.vue';

const routes = [
  { path: '/', name: 'Register', component: registerPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
