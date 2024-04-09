import { useUserStore } from '@/stores/userStore'
import { useTasksStore } from '@/stores/tasksStore'

export const generalBeforeEach = async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (userStore.user) {
    const tasksStore = useTasksStore()
    await tasksStore.fetchTasks()
  }

  next()
}

export const canAccess = async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (!userStore.user) {
    next({ name: 'signin' })
  } else {
    const tasksStore = useTasksStore()
    await tasksStore.fetchTasks()
    next()
  }
}

export const isUserLogged = async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user) {
    const tasksStore = useTasksStore()
    await tasksStore.fetchTasks()
    next({ name: 'tasks' })
  } else {
    next()
  }
}
