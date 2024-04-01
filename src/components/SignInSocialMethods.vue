<script setup>
import { providers } from '@/utils/logInProviders'
import { useUserStore } from '@/stores/userStore'

const { signInWithProvider } = useUserStore()
</script>

<template>
	<section
		class="flex justify-center items-center border border-solid border-blue-100 rounded-lg mw-full w-80 p-4 gap-4"
	>
		<button
			v-for="provider in providers"
			:key="provider.id"
			class="rounded border border-1 p-0 w-10 h-10 border-green-300 transition-all hover:bg-green-300 hover:text-black"
			@click="signInWithProvider(provider.id)"
		>
			<i :class="`mdi ${provider.icon} text-2xl`"></i>
		</button>
	</section>
</template>