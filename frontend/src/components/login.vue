<template>
	<div class="login-container">
		<form @submit.prevent="handleLogin">
			<h2>Log In</h2>
			<!-- Séparateur visuel -->
			<div class="separator"></div>
			<div class="form-group" style="padding-top: 30px">

				<!-- Champ pour entrer l'email de l'utilisateur -->
				<label for="email" class="textInput">E-mail</label>
				<input
					type="email"
					id="email"
					v-model="email"
					required
					title="Entrez votre mail"
					placeholder="E-mail"
				/>
				<!-- Champ pour entrer le mot de passe -->
			</div>
			<div class="form-group password-group">
				<label for="password" class="textInput">Password</label>
				<div class="password-container">
					<input
						:type="showPassword ? 'text' : 'password'"
						id="register-password"
						v-model="password"
						class="password-input"
						required
						title="Entrez votre mot de passe"
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

			<!-- Lien pour mot de passe oublié -->
			<div class="forgot-password-container">
				<a href="#" @click.prevent="forgotPassword" class="forgot-passwordText">
					Forgot Password ?
				</a>
			</div>
			<div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
			<!-- Bouton de soumission du formulaire de login -->
			<button type="submit" class="login-button">
				<div class="login-buttonText">Log In</div>
			</button>
			<div class="separator"></div>
			<!-- Lien vers la page d'inscription -->
			<div class="signup-link">
				<span>
					Don't have a AtlCanin account ?
					<br />
				</span>
				<router-link to="/register">Sign Up</router-link>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	props: {
		errorMessage: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			email: '',
			password: '',
			showPassword: false,
		};
	},
	methods: {
		handleLogin() {
			this.$emit('login', { email: this.email, password: this.password });
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
/* Les messages d'erreur */
.error-message {
	color: red;
	margin-bottom: 10px;
	font-weight: bold;
}

/* Style du conteneur de login */
.login-container {
	width: 400px;
	margin: auto;
	padding: 20px;
	border: 1px solid var(--color-border);
	border-radius: 10px;
	text-align: center;
	box-shadow: 0 0 8px var(--color-border-shadow);
}

/* Style des groupes de formulaire */
.form-group {
	margin-bottom: 15px;
	text-align: left;
}

/* Style des champs de saisie */
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

/* Suppression des icônes de reveal/clear pour Edge */
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

/* Conteneur pour le champ de mot de passe */
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

/* Conteneur pour le lien de mot de passe oublié */
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

/* Style des boutons */
button {
	padding-top: 10px 20px;
	margin: 10px 0;
	width: 100px;
	height: 50px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	box-shadow: 0 0 5px 2px var(--color-border-shadow);
	margin-bottom: 60px;
}
.login-button {
	background-color: var(--color-link);
	color: white;
}
.login-button:hover {
	background-color: var(--color-hover);
}
.login-buttonText {
	font-size: 20px;
	text-shadow: 2px 2px 2px var(--color-shadow);
}

/* Style du lien vers l'inscription */
.signup-link {
	margin-top: 60px;
	margin-bottom: 20px;
}
.signup-link a {
	color: var(--color-link);
	text-decoration: none;
	padding-left: 10px;
	font-weight: bold;
}
.signup-link a:hover {
	color: var(--color-hover);
}

/* Style des séparateurs */
.separator {
	width: 70%;
	margin: 0 auto;
	text-align: left;
	border-bottom: 1px solid var(--color-hover);
	margin-bottom: 10px;
}
</style>
