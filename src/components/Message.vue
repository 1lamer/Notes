<template>

	<p class="message">

		{{message}} (－‸ლ)

	</p>

</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				required: true
			}
		}
	}
</script>

<style scoped>
	.message {
		color: red;
		text-align: center;
	}
</style>