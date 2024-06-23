<template>
	<div class="register-container">
		<form @submit.prevent="handleregister">
			<h2>Register</h2>
			<div class="separator"></div>
			<div class="form-group" style="padding-top: 30px">
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
			<!-- Champ mot de passe -->
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
            :class="showPassword ? 'fa-solid fa-eye eye-iconOpen' : 'fa-solid fa-eye-slash eye-iconClose'"
        ></i>
				</div>
				<div class="password-container">
					<input
						:type="showPassword ? 'text' : 'password'"
						id="register-confirmPassword"
						v-model="confirmPassword"
						class="password-input"
						required
						title="Répétez votre mot de passe"
						placeholder="Repeat your Password"
					/>
				</div>
			</div>

			<div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

			<!-- Bouton de d'inscription -->
			<button type="submit" class="register-button">
				<div class="register-buttonText">Register</div>
			</button>
			<div class="separator"></div>
			<div class="signup-link">
				<span>
					You have an AtlCanin account ?
					<br />
				</span>
				<router-link to="/login">Log In</router-link>
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
			confirmPassword: '', // Ajout de confirmPassword
			showPassword: false,
		};
	},
	methods: {
		handleregister() {
			this.$emit('register', {
				email: this.email,
				password: this.password,
				confirmPassword: this.confirmPassword,
			});
		},
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
	},
};
</script>

  <style scoped>
/* Ajout du style pour le message d'erreur */
.error-message {
	color: red;
	margin-bottom: 10px;
	font-weight: bold;
}

/* Style du conteneur de register */
.register-container {
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
.register-button {
	background-color: var(--color-link);
	color: white;
}
.register-button:hover {
	background-color: var(--color-hover);
}
.register-buttonText {
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
