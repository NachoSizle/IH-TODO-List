<script setup>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const {
	user_metadata: { user_name }
} = user.value
</script>

<template>
	<main class="w-full h-full flex flex-col gap-6 items-start justify-start">
		<h1 class="text-3xl font-bold">Welcome {{ user_name }}</h1>

		<RouterView />
	</main>
</template>

<style scoped></style>