import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, logInWithProvider, logOut } from '@/api/userApi'

export const useUserStore = defineStore('userStore', {
  state: () => {
    // State
    const user = ref(undefined)

    // Getters

    // Actions
    async function fetchUser() {
      try {
        user.value = await fetchActualUser()
      } catch (error) {
        if (error.code === '401') {
          user.value = null
          return
        }
      }
    }

    async function signUp(email, password) {
      try {
        user.value = await createNewUser(email, password)
      } catch (error) {
        console.error(error)
      }
    }

    async function signIn(email, password) {
      try {
        user.value = await logIn(email, password)
      } catch (error) {
        console.error(error)
      }
    }

    async function signInWithProvider(provider) {
      try {
        user.value = await logInWithProvider(provider)
      } catch (error) {
        console.error(error)
      }
    }

    async function signOut() {
      try {
        await logOut()
        user.value = null
      } catch (error) {
        console.error(error)
      }
    }

    return {
      // State
      user,
      // Getters
      // Actions
      fetchUser,
      signUp,
      signIn,
      signInWithProvider,
      signOut
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})
