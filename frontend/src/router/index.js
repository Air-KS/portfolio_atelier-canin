/*
  ./frontend/src/router/index.js
*/

// Importer les fonctions de vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Importer les composants des pages
import homePage from '@/views/homePage.vue';
import registerPage from '@/views/registerPage.vue';
import loginPage from '@/views/loginPage';
import Dashbord from '@/views/dashbord';
import profilePage from '@/views/profilePage.vue';
import VerifyCode from '@/views/verifyCode.vue';

// Importer le middleware d'authentification
import { authGuard } from '@/middleware/auth.js';

// Définir les routes de l'application
const routes = [
  { path: '/', name: 'Home', component: homePage },
  { path: '/login', name: 'Login', component: loginPage },
  { path: '/register', name: 'Register', component: registerPage },
  { path: '/dashbord', name: 'Dashbord', component: Dashbord, meta: { requiresAuth: true, roles: ['admin', 'responsable'] } },
  { path: '/profile/:id', name: 'Profile', component: profilePage, meta: { requiresAuth: true } },
  { path: '/verify-code', name: 'VerifyCode', component: VerifyCode },
];

// Créer le routeur
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Utiliser le middleware pour vérifier l'authentification et les droits d'accès
router.beforeEach(authGuard);

// Ajouter un afterEach hook pour le défilement vers le haut
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
