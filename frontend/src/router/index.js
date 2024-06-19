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
import profilePage from '@/views/profilePage.vue';

// Importer le middleware d'authentification
import { authGuard } from '@/middleware/auth.js';

// Définir les routes de l'application
const routes = [
  { path: '/', name: 'Login', component: loginPage },
  { path: '/register', name: 'Register', component: registerPage },
  { path: '/admin', name: 'Admin', component: adminPage, meta: { requiresAuth: true, roles: ['admin', 'responsable'] } },
  { path: '/clientPage', name: 'Client', component: clientPage, meta: { requiresAuth: true, roles: ['client'] } },
  { path: '/profile/:id', name: 'ProfilePage', component: profilePage, meta: { requiresAuth: true } }
];

// Créer le routeur
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // routes: routes en syntaxe ES6
});

// Utiliser le middleware pour vérifier l'authentification et les droits d'accès
router.beforeEach(authGuard);

export default router;
