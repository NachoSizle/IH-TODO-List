<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const user = ref('')
const password = ref('')

const signIn = () => {
	userStore.signIn(user.value, password.value)
}

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
	<section class="flex justify-center items-center w-full h-full">
		<section
			class="flex justify-start flex-col items-start border border-solid border-blue-100 rounded-lg mw-full w-80 p-4 gap-4"
		>
			<label class="flex justify-start flex-col items-start w-full gap-0">
				User:
				<input type="text" v-model="user" class="w-full h-8 rounded px-2 text-black" />
			</label>
			<label class="flex justify-start flex-col items-start w-full gap-0">
				Password:
				<input type="password" v-model="password" class="w-full h-8 rounded px-2 text-black" />
			</label>

			<button
				class="rounded border border-1 p-2 py-0 w-full border-green-300 transition-all hover:bg-green-300 hover:text-black"
				@click="signIn"
			>
				Sign In
			</button>
		</section>
	</section>
</template>

<style scoped></style>