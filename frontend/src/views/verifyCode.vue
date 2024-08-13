<!--
	./frontend/src/components/popup/verifyCode.vue
-->

<template>
	<div class="auth-container">
	  <div class="auth-form">
		<h3>Email Verification</h3>
		<div class="separator"></div>
		<p>
		  A verification code has been sent to your address:
		  <br />
		  <span class="text-mail">{{ email }}</span>
		  <br />
		  Please enter the code below:
		</p>

		<!-- Conteneur relatif pour l'input et l'icône -->
		<div class="input-resend-container">
		  <input
			v-model="verificationCode"
			type="text"
			maxlength="6"
			placeholder="Code"
			@input="validateInput"
		  />
		  <img
			src="@/assets/images/resend.svg"
			alt="Resend Code"
			class="imageResend"
			@click="resendCode"
			:class="{ disabled: isResending }"
		  />
		</div>

		<br />
		<p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>

		<!-- Indicateur de chargement -->
		<p v-if="isResending">Sending code...</p>
		<!-- Message de succès -->
		<p v-if="successMessage" class="success-message">{{ successMessage }}</p>

		<!-- Désactiver le bouton et changer le texte en fonction de isResending -->
		<button
		  class="button"
		  @click="verifyCode"
		  :disabled="isResending"
		  :class="{ disabled: isResending }"
		>
		  {{ isResending ? 'Sending...' : 'Send' }}
		</button>

		<div class="separator"></div>
		<p>In case of technical issues, contact us.</p>
		<p>
		  06.07.08.09.10
		  <br />
		  atlcanin@gmail.com
		</p>
	  </div>
	</div>
  </template>

  <script>
  import axios from 'axios';
  import { mapActions } from 'vuex';

  export default {
	name: 'VerifyCode',
	created() {
	  document.title = 'AtlCanin - Check Code';
	},
	data() {
	  return {
		verificationCode: '',
		errorMessage: '',
		successMessage: '', // Message de succès
		email: this.$route.query.email || '', // Récupère l'email depuis query
		isResending: false, // Indique si le code est en cours de renvoi
	  };
	},
	methods: {
	  ...mapActions(['login']),
	  validateInput(event) {
		const value = event.target.value;
		this.verificationCode = value.replace(/\D/g, ''); // Garde uniquement les chiffres
	  },
	  async verifyCode() {
    this.errorMessage = ''; // Clear any previous error
    this.successMessage = ''; // Clear any previous success message
    this.isResending = true; // Désactiver le bouton et montrer l'état d'envoi
    try {
        if (this.verificationCode.length === 6) {
            const response = await axios.post(
                'http://localhost:3000/api/auth/verifyCode',
                {
                    email: this.email, // Utilise l'email récupéré
                    code: this.verificationCode,
                },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const { token, user, role } = response.data;
                await this.login({ user, token, role });

                // Redirige vers la page d'accueil
                this.$router.push({ name: 'Home' });
            }
        } else {
            this.errorMessage =
                'Le code de vérification doit comporter 6 chiffres.';
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du code:', error); // Log l'erreur complète

        // Ajout d'une condition stricte pour s'assurer que le code ne passe pas même si incorrect
        if (error.response?.status === 400) {
            this.errorMessage = 'Code de vérification incorrect.';
        } else {
            this.errorMessage =
                error.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.';
        }
    } finally {
        this.isResending = false; // Réactiver le bouton après l'envoi
    }
},
	  async resendCode() {
		this.isResending = true; // Désactiver le bouton pendant le renvoi du code
		this.errorMessage = ''; // Réinitialiser le message d'erreur
		this.successMessage = ''; // Réinitialiser le message de succès
		try {
		  const response = await axios.post(
			'http://localhost:3000/api/auth/resend-code',
			{
			  email: this.email,
			},
			{ withCredentials: true }
		  );

		  if (response.status === 200) {
			this.successMessage = `Le code a été renvoyé à votre adresse e-mail : ${this.email}`;
		  }
		} catch (error) {
		  console.error('Erreur lors du renvoi du code:', error);
		  this.errorMessage =
			error.response?.data?.error ||
			'Impossible de renvoyer le code. Veuillez réessayer plus tard.';
		} finally {
		  this.isResending = false; // Réactiver le bouton après le renvoi
		}
	  },
	},
	mounted() {
	  console.log('Email reçu:', this.email);
	},
  };
  </script>

  <style scoped>
  .text-mail {
	color: var(--color-hover);
	font-weight: bold;
  }

  .separator {
	width: 70%;
	margin-bottom: 20px;
  }

  input {
	width: 100px;
	text-align: center;
	color: green;
	font-weight: bold;
  }

  .imageResend {
	transform: translateY(25%);
	width: 25px;
	height: 25px;
	cursor: pointer;
	margin-left: 10px;
  }
  .imageResend:hover {
	content: url('@/assets/images/resend-hover.svg');
  }
  .imageResend.disabled {
	opacity: 0.5;
	cursor: not-allowed;
  }

  .button.disable {
	color: grey;
	cursor: not-allowed;
  }

  .button {
	margin-top: 20px;
	margin-bottom: 30px;
  }

  .success-message {
	color: green;
	font-weight: bold;
  }

  @media (max-width: 600px) {
	.auth-form {
	  width: 80%;
	}
  }
  </style>
