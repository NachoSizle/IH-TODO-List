<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const { signIn } = useUserStore()

const user = ref('')
const password = ref('')

const continueLogin = () => {
	signIn(user.value, password.value)
}
</script>

<template>
	<form
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
			@click="continueLogin"
		>
			Sign In
		</button>
	</form>
</template>