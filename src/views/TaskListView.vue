<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { useTasksStore } from '@/stores/tasksStore'

const appStore = useAppStore()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const {
	user_metadata: { user_name }
} = user.value

const tasksStore = useTasksStore()
const { tasks, tasksOrderedByState } = storeToRefs(tasksStore)

const tasksToShow = ref([])

const _orderTasksByState = () => {
	tasksStore.toggleSortOrder()
	tasksToShow.value = tasksOrderedByState.value
}

const _handleCreateTask = () => {
	appStore.openModal({
		component: 'NewTaskForm'
	})
}

const _handleRemoveTask = async (taskId) => {
	await tasksStore.removeTask(taskId)
	tasksToShow.value = tasks.value
}

onMounted(async () => {
	await tasksStore.fetchTasks()
	tasksToShow.value = tasks.value
})
</script>

<template>
	<h1 class="text-3xl font-bold">Welcome {{ user_name }}</h1>
	<section class="relative overflow-x-auto w-full">
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3">ID</th>
					<th scope="col" class="px-6 py-3">Title</th>
					<th scope="col" class="px-6 py-3 flex items-center">
						<button
							class="green font-medium uppercase flex items-center"
							@click="_orderTasksByState"
						>
							<span>Completed</span>
							<svg
								class="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
								/>
							</svg>
						</button>
					</th>
					<th scope="col" class="px-6 py-3">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
					v-for="task in tasksToShow"
					:key="task.id"
				>
					<th
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						{{ task.id }}
					</th>
					<td class="px-6 py-4">{{ task.title }}</td>
					<td class="px-6 py-4">
						<span
							v-if="task.is_complete"
							class="px-2 py-1 bg-green-200 text-green-800 rounded-full"
						>
							Yes
						</span>
						<span v-else class="px-2 py-1 bg-red-200 text-red-800 rounded-full"> No </span>
					</td>
					<td class="px-6 py-4">
						<RouterLink :to="`/edit-task/${task.id}`" class="font-medium hover:underline">
							Edit
						</RouterLink>
						<button @click="_handleRemoveTask(task.id)" class="font-medium hover:underline">
							Remove
						</button>
					</td>
				</tr>
			</tbody>
			<tfoot class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr class="font-semibold text-gray-900 dark:text-white">
					<td></td>
					<td></td>
					<td></td>
					<td class="px-6 py-3 flex items-center justify-end">
						<button
							class="rounded border border-1 p-2 py-0 w-full h-8 uppercase border-green-300 transition-all hover:bg-green-300 hover:text-black"
							@click="_handleCreateTask"
						>
							Create Task
						</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</section>
</template>