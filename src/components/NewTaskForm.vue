<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useTasksStore } from '@/stores/tasksStore'

const { closeModal } = useAppStore()
const { createTask } = useTasksStore()

const taskTitle = ref('')

const _createTask = async () => {
	await createTask(taskTitle.value)
	taskTitle.value = ''
	closeModal()
}
</script>

<template>
	<section class="overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex-col">
		<h2>Create new task!</h2>
		<button @click="closeModal">X</button>

		<form
			class="flex justify-start flex-col items-start border border-solid border-blue-100 rounded-lg mw-full w-80 p-4 gap-8"
		>
			<label class="flex justify-start flex-col items-start w-full gap-0">
				Task Name:
				<input type="text" v-model="taskTitle" class="w-full h-8 rounded px-2 text-black" />
			</label>

			<button
				class="rounded border border-1 p-2 py-0 w-full border-green-300 transition-all hover:bg-green-300 hover:text-black"
				@click.prevent.stop="_createTask"
			>
				Create Task
			</button>
		</form>
	</section>
</template>