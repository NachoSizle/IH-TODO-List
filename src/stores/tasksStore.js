import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createNewTask, removeTaskById, updateTaskById, fetchAllTasks } from '@/api/tasksApi'

import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasksStore', () => {
  // State
  const tasks = ref([])
  const orderOnSorter = ref()

  // Getters
  const tasksOrderedByState = computed(() => {
    return tasks.value.sort((a, b) => {
      if (orderOnSorter.value === 'asc') {
        return a.is_complete - b.is_complete
      } else {
        return b.is_complete - a.is_complete
      }
    })
  })

  // Actions
  async function fetchTasks() {
    try {
      tasks.value = await fetchAllTasks()
    } catch (error) {
      console.error(error)
    }
  }

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

  async function updateTask(taskId, task) {
    try {
      await updateTaskById(taskId, task)
      const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
      tasks.value[taskIndex] = task
    } catch (error) {
      console.error(error)
    }
  }

  async function removeTask(taskId) {
    try {
      await removeTaskById(taskId)
      tasks.value = tasks.value.filter((task) => task.id !== taskId)
    } catch (error) {
      console.error(error)
    }
  }

  function toggleSortOrder() {
    orderOnSorter.value = orderOnSorter.value === 'asc' ? 'desc' : 'asc'
  }

  return {
    // State
    tasks,
    // Getters
    tasksOrderedByState,
    // Actions
    fetchTasks,
    createTask,
    removeTask,
    updateTask,
    toggleSortOrder
  }
})
