<!--
	./frontend/src/components/Header.vue
-->

<template>
	<header class="header">
		<div class="container">
			<!-- Section logo -->
			<div class="logo">
				<img src="@/assets/images/logo.png" alt="Logo" />
			</div>
			<!-- Menu de navigation -->
			<nav>
				<ul class="nav-menu">
					<li class="nav-menu-item">
						<a href="#" class="nav-menu-link">Prices & Services</a>
					</li>
					<li class="nav-menu-item">
						<a href="#" class="nav-menu-link">Location</a>
					</li>
					<li class="nav-menu-item" v-if="isAdminOrResponsable">
						<router-link to="/admin" class="nav-menu-link apply">
							Dashboard
						</router-link>
					</li>
					<li class="nav-menu-item" v-else>
						<a href="#" class="nav-menu-link apply">Book Now</a>
					</li>
				</ul>
			</nav>
			<!-- Section des boutons -->
			<div class="auth-section">
				<!-- Affichage du texte "Login" ou du profil selon l'état de connexion -->
				<div v-if="!isLoggedIn">
					<router-link to="/login" class="login-button">Login</router-link>
				</div>
				<div v-else class="profile" @click="toggleDropdown" ref="profile">
					<img
						src="@/assets/images/profile-circle.svg"
						alt="Profile"
						class="profile-icon"
					/>
					<img
						src="@/assets/images/arrow-down.png"
						alt="Dropdown Arrow"
						class="dropdown-arrow"
					/>
					<div class="dropdown-menu" v-if="dropdownOpen">
						<router-link
							v-if="user && user.id"
							:to="{ name: 'Profile', params: { id: user.id } }"
							@click.native="navigateToProfile"
							class="dropdown-item"
						>
							<img src="@/assets/images/user-profile.svg" alt="Profile" />
							Profile
							<img
								src="@/assets/images/arrow-r-grey.png"
								alt="Arrow Icon"
								class="menu-arrow-icon"
							/>
						</router-link>
						<div class="dropdown-divider"></div>
						<a href="#" class="dropdown-item" @click="logout">
							<img src="@/assets/images/user-disconnected.svg" alt="Logout" />
							Log Out
							<img
								src="@/assets/images/arrow-r-grey.png"
								alt="Arrow Icon"
								class="menu-arrow-icon"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'Header',
		data() {
			return {
				dropdownOpen: false, // État du menu déroulant
			};
		},
		computed: {
			// Mapping des états 'isLoggedIn' et 'user' du store Vuex
			...mapState(['isLoggedIn', 'user']),

			// Propriété calculée pour déterminer le texte du lien
			isAdminOrResponsable() {
				return (
					this.user &&
					(this.user.role === 'admin' || this.user.role === 'responsable')
				);
			},
		},
		methods: {
			toggleDropdown() {
				this.dropdownOpen = !this.dropdownOpen;
			},
			// Ferme le menu déroulant
			closeDropdown() {
				this.dropdownOpen = false;
			},
			handleClickOutside(event) {
				if (this.$refs.profile && !this.$refs.profile.contains(event.target)) {
					this.closeDropdown();
				}
			},
			// Navigue vers la page de profil
			navigateToProfile() {
				this.$router
					.push({ name: 'Profile', params: { id: this.user.id } })
					.then(() => {
						this.$router.go(); // Recharge la page
					});
			},
			// Déconnecte l'utilisateur via une action Vuex
			logout() {
				this.$store.dispatch('logout');
				this.$router.push('/');
			},
		},
		// Ajoute un écouteur d'événements
		mounted() {
			document.addEventListener('click', this.handleClickOutside);
		},
		beforeUnmount() {
			document.removeEventListener('click', this.handleClickOutside);
		},
	};
</script>

<style scoped>
/* Style de l'en-tête */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-background);
    border-bottom: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0;
    z-index: 1000;
}

/* Container principal */
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    height: 70px; /* Hauteur fixe pour le header */
    margin: 0 auto;
    padding: 0 20px;
}

/* Style du logo */
.logo img {
    height: 40px;
}

/* Menu de navigation */
.nav-menu {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

/* Éléments du menu de navigation */
.nav-menu .nav-menu-item {
    font-family: var(--nav-item-font-family);
    font-weight: var(--nav-item-font-weight);
    font-size: 1.1rem;
    padding: 0 20px;
    display: flex;
    align-items: center;
}

.nav-menu .nav-menu-item:not(:last-child) {
    border-right: 3px solid #ccc; /* Séparateur entre les éléments */
}

.nav-menu .nav-menu-link {
    display: block;
    padding: 0.5rem 0;
    position: relative;
    color: var(--color-text-dark);
    text-decoration: none;
}

.nav-menu .nav-menu-link:hover {
    color: var(--nav-color-hover);
    text-decoration: none;
}

.nav-menu .nav-menu-link::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0.2rem;
    transition: var(--transition-duration) var(--transition-cubic-bezier);
}

.nav-menu .nav-menu-item:hover .nav-menu-link::before {
    background-color: var(--nav-color-link);
    width: 100%;
}

.nav-menu .nav-menu-link.apply {
    color: red;
}

.nav-menu .nav-menu-link.apply:hover {
    color: var(--nav-color-hover);
}

.nav-menu .nav-menu-link.apply::before {
    background-color: var(--nav-color-link);
}

/* Section des boutons */
.auth-section {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Profil avec menu déroulant */
.profile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    padding: 0;
}

.profile-icon {
    height: 50px; /* Ajusté pour mieux aligner verticalement */
    border-radius: 50%;
    margin-right: 20px;
}

.dropdown-arrow {
    margin-right: 5px;
    width: 15px;
    height: 10px;
}

.dropdown-menu {
    position: absolute;
    top: 100%; /* Positionné juste en dessous du parent */
    left: 0;
    background-color: var(--color-background);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    z-index: 1000;
    width: 170px; /* Augmenté pour que le texte soit complètement visible */
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: var(--color-text-dark);
    text-decoration: none;
}

.dropdown-item:hover {
    background-color: var(--menu-color-hover);
}

.dropdown-item img {
    margin-right: 10px;
    height: 30px;
}

.menu-arrow-icon {
    margin-left: auto;
    height: 20px !important;
    width: 15px;
}

.dropdown-divider {
    height: 1px;
    background-color: #4687af;
    margin: 0 10px;
}

.header .login-button {
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid var(--color-button);
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-text-dark);
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    font-size: 1.5rem;
}

.header .login-button:hover {
    background-color: var(--menu-color-hover);
    border: 2px solid #4687af;
    color: #4687af;
}

</style>
