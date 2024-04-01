import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createNewTask, fetchAllTasks } from '@/api/tasksApi'

import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions
  async function createTask(taskTitle) {
    try {
      const {
        user: { id }
      } = useUserStore()
      const newTask = await createNewTask({ title: taskTitle, user_id: id })

      tasks.value.push(newTask)
    } catch (error) {
      console.error(error)
    }
  }

  function fetchTasks() {
    try {
      tasks.value = fetchAllTasks()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    // Getters
    // Actions
    createTask,
    fetchTasks
  }
})
