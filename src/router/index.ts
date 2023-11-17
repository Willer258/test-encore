import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Dashboard/HomeView.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'
import InscriptionPage from '@/views/Auth/InscriptionPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiredRoles: ['ROLE_USER',]
    }
  },
  
  {
    path: '/dashboard',
    name: 'mainLayout',
    component: () => import('@/Layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: HomeView
      }
    ],
    meta: {
      requiredRoles: ['ROLE_USER',]
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
