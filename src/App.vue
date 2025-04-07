<script setup>
import { useAppStore } from '@/stores/appStore'

import HeaderComp from '@/components/HeaderComp.vue'
import ModalComp from '@/components/ModalComp.vue'

const appStore = useAppStore()
</script>

<template>
	<HeaderComp />
	<RouterView />
	<ModalComp v-show="appStore.actualModal.show"/>
</template>