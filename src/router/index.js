import { createRouter, createWebHistory } from 'vue-router'

import { generalBeforeEach } from '@/router/utils'
import routes from '@/router/routes'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  beforeEach: [generalBeforeEach]
})
