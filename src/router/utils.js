import { useUserStore } from '@/stores/userStore'

const _fetchUser = async () => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }
}

export const generalBeforeEach = async (to, from, next) => {
  await _fetchUser()

  next()
}

export const canAccess = async (to, from, next) => {
  const userStore = useUserStore()

  await _fetchUser()

  if (!userStore.user) {
    next({ name: 'signin' })
  } else {
    next()
  }
}

export const isUserLogged = (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user) {
    next({ name: 'home' })
  } else {
    next()
  }
}
