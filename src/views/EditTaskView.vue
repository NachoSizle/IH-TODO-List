<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import BackComp from '@/components/BackComp.vue'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)

const route = useRoute()
const router = useRouter()

const actualTask = ref(null)
const newTask = ref({
  title: '',
  is_complete: false,
})

const _updateTask = async () => {
  await tasksStore.updateTask(actualTask.value.id, newTask.value)
  router.push({ name: 'tasks' })
}

onMounted(async () => {
  const taskId = parseInt(route.params.id)
  actualTask.value = tasks.value.find(task => task.id === taskId) || {}
  newTask.value = {
    title: actualTask.value.title,
    is_complete: actualTask.value.is_complete,
  }
})
</script>

<template>
	<BackComp pageToBack="Tasks" />
	<section class="w-full h-full flex flex-col items-center justify-start" v-if="actualTask">
		<form
			class="flex justify-start flex-col items-start border border-solid border-blue-100 rounded-lg mw-full w-80 p-4 gap-8"
		>
			<label class="flex justify-start flex-col items-start w-full gap-0">
				New task Title:
				<input type="text" v-model="newTask.title" class="w-full h-8 rounded px-2 text-black" />
			</label>

			<label class="inline-flex items-center cursor-pointer">
				<input type="checkbox" v-model="newTask.is_complete" class="sr-only peer">
				<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
				<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</span>
			</label>

			<button
				class="rounded border border-1 p-2 py-0 w-full border-green-300 transition-all hover:bg-green-300 hover:text-black"
				@click.prevent.stop="_updateTask"
			>
				Update Task
			</button>
		</form>
	</section>
</template>