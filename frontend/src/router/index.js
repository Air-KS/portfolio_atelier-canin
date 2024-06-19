/*
  ./frontend/src/router/index.js
*/

// Importer les fonctions de vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Importer les composants des pages
import registerPage from '@/views/registerPage.vue';
import loginPage from '@/views/loginPage';
import adminPage from '@/views/adminPage';
import clientPage from '@/views/clientPage';
import profilePage from '@/views/profilePage.vue'

// Définir les routes de l'application
const routes = [
  { path: '/', name: 'Login', component: loginPage },
  { path: '/register', name: 'Register', component: registerPage },
  { path: '/admin', name: 'Admin', component: adminPage },
  { path: '/clientPage', name: 'Client', component: clientPage },
  { path: '/profile/:id', name: 'ProfilePage', component: profilePage }
];

// Créer le routeur
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // routes: routes en syntaxe ES6
});

export default router;
