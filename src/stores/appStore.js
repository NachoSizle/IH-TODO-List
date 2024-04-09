import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => {
    // State
    const actualModal = ref(null)
    const showLoading = ref(false)

    // Getters

    // Actions
    function closeModal() {
      actualModal.value = {
        component: null,
        show: false
      }
    }

    async function openModal({ component }) {
      actualModal.value = {
        component,
        show: true
      }
    }

    return {
      // State
      actualModal,
      showLoading,
      // Getters
      // Actions
      closeModal,
      openModal,
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'appStore',
        storage: localStorage
      }
    ]
  }
})
