import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Dashboard/HomeView.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'
import InscriptionPage from '@/views/Auth/InscriptionPage.vue'
import ActivationPage from '@/views/Auth/Activation.vue'
import Cotations from '@/views/Dashboard/Cotations.vue'
import ContractView from '@/views/Dashboard/ContractView.vue'
import ParrainageView from '@/views/Dashboard/ParrainageView.vue'
import DeadlineView from '@/views/Dashboard/DeadlineView.vue'

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
      // {
      //   path: '',
      //   name: 'dashboard',
      //   component: HomeView
      // },
      {
        path: 'cotations',
        name: 'cotations',
        component: Cotations
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: ContractView
      },
      {
        path: 'deadline',
        name: 'deadline',
        component: DeadlineView
      },
      {
        path: 'parrainage',
        name: 'parrainage',
        component: ParrainageView
      },
    ],
    meta: {
      requiredRoles: ['ROLE_CUSTOMER']
    }
  },
  {
    path: '/',
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
