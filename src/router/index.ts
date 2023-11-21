import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Dashboard/HomeView.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'
import InscriptionPage from '@/views/Auth/InscriptionPage.vue'
import ActivationPage from '@/views/Auth/Activation.vue'
import Cotations from '@/views/Dashboard/Cotations.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  //   meta: {requiredRoles: ['ROLE_CUSTOMER']}
  // },
  {
    path: '/dashboard',
    name: 'mainLayout',
    component: () => import('@/Layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: HomeView
      },
      {
        path: 'cotations',
        name: 'cotations',
        component: Cotations
      },
      {
        path: 'contrats',
        name: 'contrats',
        component: Cotations
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
  {
    path: '/activation',
    name: 'activation',
    component: ActivationPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
