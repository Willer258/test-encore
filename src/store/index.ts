import Tenant from "@/entity/Tenant";
import { api } from "@/services/Api";
import { createStore } from "vuex";

const defaultTenant = new Tenant();
defaultTenant.code = "wiassur";
defaultTenant.label = "WiASSUR";

export default createStore({
  state: {
    isLoading: false,
    popups: [] as any,
    branchCategories:[] as any,
    user:
      localStorage.getItem("user") &&
      localStorage.getItem("user") !== "undefined" &&
      localStorage.getItem("user") !== "null"
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    userToken: localStorage.getItem("userToken") || null,
    userRefreshToken: localStorage.getItem("userRefreshToken") || null,
    tenants: [],
    currentTenant: localStorage.getItem("currentTenant")
      ? new Tenant(JSON.parse(localStorage.getItem("currentTenant")!))
      : defaultTenant,
  },
  getters: {
    currentTenant: (state, getters) => () => {
        return state.currentTenant
    },
    branchCategories: (state, getters) => async () => {
      if (state.branchCategories.length > 0) {
          return state.branchCategories
      }
      const res = await api.get(api.core, 'branch/category/list');
      if (res && res.data && res.data.categories) {
          state.branchCategories = [];
          res.data.categories.forEach((c: any) => {
              state.branchCategories.push(c)
          })
      }
      return state.branchCategories
  },
  },
  mutations: {
    loading(state: any) {
      state.isLoading = true;
  },
  stopLoading(state: any) {
      state.isLoading = false;
  },
  },
  actions: {},
  modules: {},
});
