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
						<a href="#" class="nav-menu-link">Prix & Services</a>
					</li>
					<li class="nav-menu-item">
						<a href="#" class="nav-menu-link">Location</a>
					</li>
					<li class="nav-menu-item">
						<a href="#" class="nav-menu-link apply">Reserver Maintenant</a>
					</li>
				</ul>
			</nav>
			<!-- Section des boutons -->
			<div class="buttons">
				<!-- Bouton "Book Now" -->
				<button class="book-now">Book Now</button>
				<!-- Profil avec menu déroulant -->
				<div class="profile" @click="toggleDropdown" ref="profile">
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
						<!-- Affichage du menu si l'utilisateur n'est pas connecté -->
						<template v-if="!isLoggedIn">
							<router-link to="/login" class="dropdown-item">
								<img src="@/assets/images/user-log-in.svg" alt="Login" />
								Log in
								<img
									src="@/assets/images/arrow-r-grey.png"
									alt="Arrow Icon"
									class="menu-arrow-icon"
								/>
							</router-link>
							<div class="dropdown-divider"></div>
							<router-link to="/register" class="dropdown-item">
								<img src="@/assets/images/user-add.svg" alt="Sign Up" />
								Sign Up
								<img
									src="@/assets/images/arrow-r-grey.png"
									alt="Arrow Icon"
									class="menu-arrow-icon"
								/>
							</router-link>
						</template>
						<!-- Affichage du menu si l'utilisateur est connecté -->
						<template v-else>
							<router-link
								v-if="user && user.id"
								:to="{ name: 'Profile', params: { id: user.id } }"
								@click.native="navigateToProfile"
								class="dropdown-item"
							>
								<img src="@/assets/images/user-log-in.svg" alt="Profile" />
								Profile
								<img
									src="@/assets/images/arrow-r-grey.png"
									alt="Arrow Icon"
									class="menu-arrow-icon"
								/>
							</router-link>
							<div class="dropdown-divider"></div>
							<a href="#" class="dropdown-item" @click="logout">
								<img src="@/assets/images/user-log-in.svg" alt="Logout" />
								Log Out
								<img
									src="@/assets/images/arrow-r-grey.png"
									alt="Arrow Icon"
									class="menu-arrow-icon"
								/>
							</a>
						</template>
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
		min-height: 50px;
		background-color: var(--color-background);
		border-bottom: 1px solid #ccc;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 10px 0;
		z-index: 1000;
	}

	/* Container principal */
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
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
	.buttons {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	/* Style du bouton "Book Now" */
	.book-now {
		background-color: #ff3b30;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 25px;
		cursor: pointer;
		font-weight: bold;
		font-size: 1rem;
	}

	.book-now:hover {
		background-color: #ff665a;
	}

	/* Profil avec menu déroulant */
	.profile {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 40px;
		border: 1px solid #ccc;
		border-radius: 20px;
		cursor: pointer;
		padding: 0 0 0 0;
	}

	.profile-icon {
		height: 40px;
		border-radius: 50%;
		margin-right: 15px;
	}

	.dropdown-arrow {
		margin-right: 5px;
		width: 15px;
		height: 10px;
	}

	.dropdown-menu {
		position: absolute;
		top: 45px;
		left: 0px;
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
</style>
