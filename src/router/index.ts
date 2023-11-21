import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Dashboard/HomeView.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'
import InscriptionPage from '@/views/Auth/InscriptionPage.vue'
import ActivationPage from '@/views/Auth/Activation.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/Layout/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: HomeView
      }
    ],
    meta: {
      requiredRoles: ['ROLE_CUSTOMER']
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: InscriptionPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
