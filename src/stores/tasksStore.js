import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks } from '@/api/tasksApi'

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
    toggleSortOrder
  }
})
