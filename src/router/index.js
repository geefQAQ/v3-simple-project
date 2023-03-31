import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/all-schools',
    },
    {
      path: '/all-schools',
      name: 'allSchools',
      component: () => import('@views/AllSchools.vue')
    },
    {
      path: '/school/:schoolId',
      name: 'school',
      component: () => import('@views/School.vue')
    },
    {
      path: '/grade/:gradeId',
      name: 'grade',
      component: () => import('@views/Grade.vue')
    },
    {
      path: '/class/:classId',
      name: 'class',
      component: () => import('@views/Class.vue')
    }
  ]
})

export default router
