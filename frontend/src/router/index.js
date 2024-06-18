/*
  ./frontend/src/router/index.js
*/

import { createRouter, createWebHistory } from 'vue-router';
import registerPage from '@/views/registerPage.vue';
import loginPage from '@/views/loginPage';
import adminPage from '@/views/adminPage';
import clientPage from '@/views/clientPage';

const routes = [
  { path: '/', name: 'Login', component: loginPage },
  { path: '/register', name: 'Register', component: registerPage},
  { path: '/admin', name: 'Admin', component: adminPage },
  { path: '/clientPage', name: 'Client', component: clientPage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
