<script setup>
import { useRouter } from 'vue-router'

defineProps({
  pageToBack: String
})

const router = useRouter()

const _handleGoBack = async () => {
	router.go(-1)
}
</script>

<template>
	<header class="flex justify-between items-center flex-row h-20 w-full">
		<button class="text-white w-32 p-2 flex items-center justify-start gap-4" @click="_handleGoBack">
      <i class="fas fa-arrow-left"></i>
      <span>{{ pageToBack }}</span>
    </button>
	</header>
</template>