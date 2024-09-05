<!--
	./frontend/src/components/profile/profProfile.vue
-->

<template>
	<form @submit.prevent="$emit('update-profile')">
		<div class="form-row">
			<div class="form-group">
				<label for="first_name">First Name</label>
				<input
					id="first_name"
					type="text"
					v-model="user.first_name"
					placeholder="Jérôme Example"
				/>
			</div>
			<div class="form-group">
				<label for="last_name">Last Name</label>
				<input
					id="last_name"
					type="text"
					v-model="user.last_name"
					placeholder="Bernard Example"
				/>
			</div>
		</div>

		<div class="form-row">
			<div class="form-group">
				<label for="date_of_birth">Date of Birth</label>
				<input id="date_of_birth" type="date" v-model="user.date_of_birth" />
			</div>
			<div class="form-group">
				<label for="phone">Phone</label>
				<input
					id="phone"
					type="tel"
					v-model="user.phone"
					placeholder="0607080910"
				/>
			</div>
		</div>

		<div class="email-container">
			<label for="email">Email</label>
			<input
				id="email"
				type="email"
				v-model="user.email"
				placeholder="example@mail.com"
			/>
		</div>

		<button class="button" type="submit">Update</button>
	</form>
</template>

<script>
export default {
	name: 'ProfProfile',
	props: {
		all: [],
		user: Object,
	},
};
</script>

<style scoped>
.form-row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	gap: 20px;
}

.form-group {
	flex: 1;
	min-width: 45%;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
}

label {
	margin-bottom: 5px;
	font-weight: bold;
	padding-left: 20%;
	display: block;
}

.email-container {
	display: flex;
	flex-direction: column;
}

.email-container label {
	padding-left: 14%;
}

input {
	width: 80%;
	margin: 0 auto;
}

.button {
	margin: 20px auto;
	display: block;
}
</style>
