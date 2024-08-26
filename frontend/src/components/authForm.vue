<!--
	./frontend/src/components/authForm.vue
-->

<template>
	<div class="auth-container">
		<div class="auth-form">
			<form @submit.prevent="handleSubmit">
				<h2>{{ formTitle }}</h2>
				<div class="separator"></div>

				<div class="form-group" style="padding-top: 30px">
					<div v-if="isRegister">
						<label for="name" class="textInput">Name</label>
						<input
							id="name"
							v-model="name"
							required
							title="Enter your Name"
							placeholder="Name"
						/>
					</div>
				</div>
				<div class="form-group">
					<label for="email" class="textInput">E-mail</label>
					<input
						type="email"
						id="email"
						v-model="email"
						required
						title="Enter your E-mail"
						placeholder="E-mail"
					/>
				</div>

				<div class="form-group password-group">
					<label for="password" class="textInput">Password</label>
					<div class="password-container">
						<input
							:type="showPassword ? 'text' : 'password'"
							id="password"
							v-model="password"
							class="password-input"
							required
							title="Enter your Password"
							placeholder="Password"
						/>
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
								title="Repeat your Password"
								placeholder="Repeat your Password"
							/>
						</div>
					</div>
				</div>
				<div v-if="!isRegister" class="forgot-password-container">
					<a
						href="#"
						@click.prevent="forgotPassword"
						class="forgot-passwordText"
					>
						Forgot Password ?
					</a>
				</div>

				<div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
				<button
					class="button"
					:class="{ disabled: isResending }"
					type="submit"
					:disabled="isResending"
				>
					{{ buttonText }}
				</button>
				<div class="separator"></div>
				<div class="link-container">
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
		errorMessage: String,
		isRegister: Boolean,
		isResending: Boolean, // Recevoir isResending en tant que prop
	},
	data() {
		return {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			showPassword: false,
		};
	},
	computed: {
		formTitle() {
			return this.isRegister ? 'Register' : 'Log In';
		},
		buttonText() {
			return this.isRegister ? 'Register' : 'Log In';
		},
		switchText() {
			return this.isRegister
				? 'You have an AtlCanin account ?'
				: "Don't have an AtlCanin account ?";
		},
		switchLink() {
			return this.isRegister ? '/login' : '/register';
		},
		switchLinkText() {
			return this.isRegister ? 'Log In' : 'Sign Up';
		},
	},
	methods: {
		handleSubmit() {
			// L'événement register/login est émis vers le parent
			if (this.isRegister) {
				this.$emit('register', {
					name: this.name,
					email: this.email,
					password: this.password,
					confirmPassword: this.confirmPassword,
				});
			} else {
				this.$emit('login', { email: this.email, password: this.password });
			}
		},
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
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
	padding: 50px 0 70px;
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

/* Label des champs de texte */
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

/* Icônes d'affichage du mot de passe */
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

/* Lien pour basculer entre les modes */
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
	margin-bottom: 20px;
}

/* Media Query pour les écrans plus petits */
@media (max-width: 600px) {
	.auth-form {
		width: 80%;
		padding: 10px;
	}
}
</style>
