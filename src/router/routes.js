import { canAccess, isUserLogged } from '@/router/utils'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    beforeEnter: [canAccess],
    children: [
      {
        path: '',
        name: 'tasks',
        component: () => import('@/views/TaskListView.vue')
      },
      {
        path: 'new-task',
        name: 'new-task',
        component: () => import('@/views/NewTaskView.vue')
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: () => import('@/views/SignInView.vue'),
    beforeEnter: [isUserLogged]
  }
]
