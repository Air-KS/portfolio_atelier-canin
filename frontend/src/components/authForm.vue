<!--
	./frontend/src/components/authForm.vue
-->

<template>
	<div class="auth-container">
		<div :class="containerClass">
			<!-- Conteneur du formulaire d'authentification -->
			<form @submit.prevent="handleSubmit">
				<h2>{{ formTitle }}</h2>
				<div class="separator"></div>
				<div class="form-group" style="padding-top: 30px">
					<!-- Champ pour l'email -->
					<label for="email" class="textInput">E-mail</label>
					<input
						type="email"
						id="email"
						v-model="email"
						required
						title="Entrez votre mail"
						placeholder="E-mail"
					/>
				</div>
				<div class="form-group password-group">
					<!-- Champ pour le mot de passe -->
					<label for="password" class="textInput">Password</label>
					<div class="password-container">
						<input
							:type="showPassword ? 'text' : 'password'"
							id="password"
							v-model="password"
							class="password-input"
							required
							title="Entrez votre mot de passe"
							placeholder="Password"
						/>
						<!-- Icône pour afficher/masquer le mot de passe -->
						<i
							@click="toggleShowPassword"
							:class="
								showPassword
									? 'fa-solid fa-eye eye-iconOpen'
									: 'fa-solid fa-eye-slash eye-iconClose'
							"
						></i>
					</div>
				</div>
				<div v-if="isRegister">
					<div class="form-group password-group">
						<!-- Champ pour confirmer le mot de passe -->
						<label for="confirmPassword" class="textInput">
							Confirm Password
						</label>
						<div class="password-container">
							<input
								:type="showPassword ? 'text' : 'password'"
								id="confirmPassword"
								v-model="confirmPassword"
								class="password-input"
								required
								title="Répétez votre mot de passe"
								placeholder="Repeat your Password"
							/>
						</div>
					</div>
				</div>
				<div v-if="!isRegister" class="forgot-password-container">
					<!-- Lien pour le mot de passe oublié -->
					<a
						href="#"
						@click.prevent="forgotPassword"
						class="forgot-passwordText"
					>
						Forgot Password ?
					</a>
				</div>
				<div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
				<!-- Bouton de soumission -->
				<button :class="buttonClass" type="submit">
					<div>{{ buttonText }}</div>
				</button>
				<div class="separator"></div>
				<div class="link-container">
					<!-- Lien pour changer entre connexion et inscription -->
					<span>{{ switchText }}</span>
					<router-link :to="switchLink">{{ switchLinkText }}</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		errorMessage: {
			type: String,
			default: '',
		},
		isRegister: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			email: '',
			password: '',
			confirmPassword: '',
			showPassword: false,
		};
	},
	computed: {
		// Classe du conteneur basée sur le mode (inscription/connexion)
		containerClass() {
			return this.isRegister ? 'auth-form' : 'auth-form';
		},
		// Titre du formulaire basé sur le mode
		formTitle() {
			return this.isRegister ? 'Register' : 'Log In';
		},
		// Texte du bouton basé sur le mode
		buttonText() {
			return this.isRegister ? 'Register' : 'Log In';
		},
		// Classe du bouton basée sur le mode
		buttonClass() {
			return this.isRegister ? 'auth-button' : 'auth-button';
		},
		// Texte pour basculer entre les modes
		switchText() {
			return this.isRegister
				? 'You have an AtlCanin account ?'
				: "Don't have an AtlCanin account ?";
		},
		// Lien pour basculer entre les modes
		switchLink() {
			return this.isRegister ? '/login' : '/register';
		},
		// Texte du lien pour basculer entre les modes
		switchLinkText() {
			return this.isRegister ? 'Log In' : 'Sign Up';
		},
	},
	methods: {
		// Soumission du formulaire
		handleSubmit() {
			if (this.isRegister) {
				this.$emit('register', {
					email: this.email,
					password: this.password,
					confirmPassword: this.confirmPassword,
				});
			} else {
				this.$emit('login', { email: this.email, password: this.password });
			}
		},
		// Afficher/masquer le mot de passe
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
		// Action pour le mot de passe oublié
		forgotPassword() {
			console.log('Mot de passe oublié');
		},
	},
};
</script>

<style scoped>
/* Message d'erreur */
.error-message {
	color: red;
	margin-bottom: 10px;
	font-weight: bold;
}
/* Conteneur principal de l'authentification */
.auth-container {
	padding-top: 50px;
	padding-bottom: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* Formulaire d'authentification */
.auth-form {
	width: 400px;
	margin: auto;
	padding: 20px;
	border: 1px solid var(--color-border);
	border-radius: 10px;
	text-align: center;
	box-shadow: 0 0 8px var(--color-border-shadow);
}
/* Groupe de champs de formulaire */
.form-group {
	margin-bottom: 15px;
	text-align: left;
}
/* Styles des inputs */
input {
	width: 100%;
	padding: 10px;
	margin-top: 5px;
	margin-bottom: 10px;
	border: 1px solid var(--color-border-input);
	border-radius: 25px;
	box-sizing: border-box;
	font-size: 16px;
	background-color: var(--color-background-placeholder);
}
input::placeholder {
	font-style: italic;
	color: var(--color-placeholder);
}
input:focus {
	border-color: var(--color-border-input-focus);
	box-shadow: 0 0 8px var(--color-border-shadow);
	outline: none;
}
.textInput {
	margin-left: 20px;
	font-weight: bold;
	font-size: 18px;
}

/* Suppression des icônes clear/reveal pour IE/Edge */
input::-ms-reveal,
input::-ms-clear {
	display: none;
}
.eye-iconClose {
	color: var(--color-hover);
}
.eye-iconOpen {
	color: var(--color-link);
}

/* Conteneur du mot de passe */
.password-container {
	position: relative;
	display: flex;
	align-items: center;
}
.password-container .fa-eye,
.password-container .fa-eye-slash {
	position: absolute;
	right: 20px;
	top: 17px;
	cursor: pointer;
}

/* Conteneur du lien mot de passe oublié */
.forgot-password-container {
	text-align: left;
	margin: 20px;
	margin-top: -10px;
	margin-bottom: 50px;
}
.forgot-passwordText {
	font-size: 16px;
	color: var(--color-link);
	text-decoration: none;
	font-weight: bold;
}
.forgot-passwordText:hover {
	color: var(--color-hover);
}

/* Bouton de soumission */
button {
	padding: 10px 20px;
	margin: 10px 0;
	height: 50px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	box-shadow: 0 0 5px 2px var(--color-border-shadow);
	margin-bottom: 60px;
	font-size: 20px;
}
.auth-button {
	background-color: var(--color-link);
	color: white;
}
.auth-button:hover {
	background-color: var(--color-hover);
}

.link-container {
	margin-top: 60px;
	margin-bottom: 20px;
}
.link-container a {
	color: var(--color-link);
	text-decoration: none;
	padding-left: 10px;
	font-weight: bold;
}
.link-container a:hover {
	color: var(--color-hover);
}
.separator {
	width: 70%;
	margin: 0 auto;
	text-align: left;
	border-bottom: 1px solid var(--color-hover);
	margin-bottom: 10px;
}

/* Media Query pour les écrans plus petits */
@media (max-width: 600px) {
	.auth-form {
		width: 80%;
		padding: 10px;
	}
}
</style>
