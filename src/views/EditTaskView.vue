<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'

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
  if (!tasks.value.length) {
    await tasksStore.fetchTasks()
  }

  const taskId = parseInt(route.params.id)
  actualTask.value = tasks.value.find(task => task.id === taskId) || {}
  newTask.value = {
    title: actualTask.value.title,
    is_complete: actualTask.value.is_complete,
  }
})
</script>

<template>
	<section class="w-full h-full flex flex-col items-center justify-start" v-if="actualTask">
		<h2>Edit task: {{ actualTask.title }}</h2>

		<form
			class="flex justify-start flex-col items-start border border-solid border-blue-100 rounded-lg mw-full w-80 p-4 gap-8"
		>
			<label class="flex justify-start flex-col items-start w-full gap-0">
				New task Title:
				<input type="text" v-model="newTask.title" class="w-full h-8 rounded px-2 text-black" />
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