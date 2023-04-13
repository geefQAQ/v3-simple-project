import { createRouter, createWebHistory } from 'vue-router';
import { start, close } from '@/utils/nprogress';

// 跳转其他页面时，检查token，如果刷新token失败，才返回登录页面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior() {
  //   return { top: 0 }
  // },
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/all-schools',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/Login.vue'),
    },
    {
      path: '/all-schools',
      name: 'allSchools',
      component: () => import('@views/AllSchools.vue'),
    },
    {
      path: '/school/:schoolId',
      name: 'school',
      component: () => import('@views/School.vue'),
    },
    {
      path: '/grade/:gradeId',
      name: 'grade',
      component: () => import('@views/Grade.vue'),
    },
    {
      path: '/class/:classId',
      name: 'class',
      component: () => import('@views/Class.vue'),
    }
  ]
})
router.beforeEach(() => {
  start();
});

router.afterEach(() => {
  close();
})

export default router;
