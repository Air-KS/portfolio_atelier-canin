<template>
	<div class="home-container">
		<div class="home-header">
			<h1>
				Welcome Holberton
				<br />
				to our Portfolio
			</h1>
			<p class="description">
				We are happy to introduce you today to Atelier Canin, a site
				specializing in pet grooming services. Come discover our services and
				our passion for the well-being of your four-legged companions!
			</p>
		</div>
		<div class="home-image">
			<img src="path_to_your_image.png" alt="Cat and Dog" />
		</div>
		<button class="button">Book now</button>
		<div class="already-joined">
			<img src="path_to_joined_pets_image.png" alt="Joined Pets" />
			<p>Already 100k+ Pets Joined Us</p>
			<p>Secure Booking with a Groomer Near You</p>
		</div>
		<div class="separator"></div>
		<div class="home-info">
			<div class="info-section">
				<h3>Pick it!</h3>
				<p>Pick from our variety of grooming services for dogs & cats</p>
			</div>
			<div class="info-section">
				<h3>Book it!</h3>
				<p>
					Instantly matched with a professional groomer for an appointment that
					suits you
				</p>
			</div>
			<div class="info-section">
				<h3>Groom it!</h3>
				<p>
					Sit back and relax while we bring the service with all details at your
					fingertips
				</p>
			</div>
		</div>
	</div>
</template>

  <script>
export default {
	name: 'HomeTop',
};
</script>

  <style src="./homeStyles.css"></style>

  <style scoped>
.home-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
	padding: 20px;
}

.home-header {
	text-align: center;
	margin-bottom: 20px;
}

.sub-header {
	font-size: 1em;
	color: #555;
	margin-bottom: 10px;
}

.description {
	font-size: 1em;
	margin-bottom: 20px;
}

@media (min-width: 1024px) {
	.home-container {
		width: 70%;
	}
}
</style>
