<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()
const { signOut } = userStore
const { user } = storeToRefs(userStore)

const logOut = async () => {
	await signOut()
	router.push({ name: 'signin' })
}
</script>

<template>
	<header v-if="user" class="flex justify-between items-center flex-row h-20 w-full">
		<nav class="flex gap-2">
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/new-task">New Task</RouterLink>
		</nav>

		<button class="rounded bg-red-400 text-white w-32 p-2" @click="logOut">Log out</button>
	</header>
</template>