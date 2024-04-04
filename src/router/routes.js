import { canAccess, isUserLogged } from '@/router/utils'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    redirect: () => {
      return { name: 'tasks' }
    },
    beforeEnter: [canAccess],
    children: [
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/views/TaskListView.vue')
      },
      {
        path: 'new-task',
        name: 'new-task',
        component: () => import('@/views/NewTaskView.vue')
      },
      {
        path: 'edit-task/:id',
        name: 'edit-task',
        component: () => import('@/views/EditTaskView.vue')
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
