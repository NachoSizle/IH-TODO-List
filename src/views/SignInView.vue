<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import SignInEmailPass from '@/components/SignInEmailPass.vue'
import SignInSocialMethods from '@/components/SignInSocialMethods.vue'

const router = useRouter()
const userStore = useUserStore()

watch(
	() => userStore.user,
	(value) => {
		if (value) {
			router.push({ name: 'home' })
		}
	}
)
</script>

<template>
	<h1>Sign In View!</h1>
	<section class="flex flex-col justify-center items-center gap-4 w-full h-full">
		<SignInEmailPass />
		<SignInSocialMethods />
	</section>
</template>

<style scoped></style>