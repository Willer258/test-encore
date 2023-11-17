import Tenant from '@/entity/Tenant'
import { createStore } from 'vuex'


const defaultTenant = new Tenant()
defaultTenant.code = 'wiassur'
defaultTenant.label = 'WiASSUR'

export default createStore({
  state: {
    isLoading: false,
    user: localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== 'null' ? JSON.parse(localStorage.getItem('user')!) : null,
    userToken: localStorage.getItem('userToken') || null,
    userRefreshToken: localStorage.getItem('userRefreshToken') || null,
    tenants: [],
    currentTenant: localStorage.getItem('currentTenant') ? new Tenant(JSON.parse(localStorage.getItem('currentTenant')!)) : defaultTenant,
          
        
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
