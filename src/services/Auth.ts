/* eslint-disable */
import store from "@/store";
import { api } from "@/services/Api";
import router from "@/router";
import User from "@/entity/User";
import Tenant from "../entity/Tenant";
import { helper } from "./Helper";

class Auth {
  ROLE_HIERARCHY: any = {
    ROLE_ADMIN: [
      "ROLE_USER",
      "ROLE_COMMUNICATION",
      "ROLE_SELL",
      "ROLE_PRODUCTION",
      "ROLE_INCOME",
    ],
    ROLE_MANAGER: [
      "ROLE_USER",
      "ROLE_COMMUNICATION",
      "ROLE_SELL",
      "ROLE_PRODUCTION",
      "ROLE_INCOME",
    ],
  };

  async login(username: string, password: string) {
    const result = await api.post(api.auth, "selfcare/login", {
      username: username,
      password: password,
    });
    if (!result) {
      return false;
    }
    const data = result.data;
    console.log(data);
    if (data.token) {
      store.state.userToken = data.token;
      store.state.userRefreshToken = data.refreshToken;
      store.state.tenants = [];
      store.state.user = new User(data.user);
      localStorage.setItem("mercureToken", data.mercure);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userToken", data.token);
      //   localStorage.setItem("user", JSON.stringify(data.user));
      router.push({ name: "dashboard" });
      return true;  
    }
    return false;
  }

  async register(username: string, password: string, parrain: string) {
    const result = await api.post(api.auth, "selfcare/login", {
      username: username,
      password: password,
    });
    if (!result) {
      return false;
    }
    const data = result.data;
    console.log(data);
    if (data.token) {
      store.state.userToken = data.token;
      store.state.userRefreshToken = data.refreshToken;
      store.state.tenants = [];
      store.state.user = new User(data.user);
      localStorage.setItem("mercureToken", data.mercure);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userToken", data.token);
      //   localStorage.setItem("user", JSON.stringify(data.user));
      router.push({ name: "home" });
      return true;
    }
    return false;
  }

  loadData() {
    const token = localStorage.getItem("userToken") || "";
    const refreshToken = localStorage.getItem("refreshToken") || "";
    store.state.userToken = token;
    store.state.userRefreshToken = refreshToken;
    return { token, refreshToken };
  }

  isConnected(): any {
    const data = this.loadData();
    if (!data) {
      return false;
    }
    return data.token;
  }

  isAdmin(): boolean {
    const data = this.loadData();
    if (!data) {
      return false;
    }
    const payload = this.parseJwt(data.token);
    if (payload.hasOwnProperty("roles")) {
      return payload.roles.includes("ROLE_ADMIN");
    }
    // new Popup('Erreur', 'L\'authentification a échoué', 'danger', 'fad fa-user');
    this.logout();
    return false;
  }

  logout(): void {
    let route = "login";
    if (this.hasRole("ROLE_MANAGER")) {
      route = "login";
    } else if (this.hasRole("ROLE_PARTNER")) {
      route = "partner-login";
    }
    // console.log(route)
    // return
    store.commit("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("userRefreshToken");
    localStorage.removeItem("token");
    localStorage.clear();
    if (router.currentRoute.value.name !== "login") {
      router.push({ name: route });
    }
  }

  hasRole(role: string) {
    // console.log('on check ' + role)
    const { token } = this.loadData();
    const data = this.parseJwt(token);
    const userRoles: any[] = [];
    const currentTenant: Tenant = store.state.currentTenant;
    for (const r of data.roles) {
      if (
        role === r ||
        (currentTenant &&
          currentTenant.code &&
          r === role + "_" + currentTenant.code.toUpperCase())
      ) {
        return true;
      }
    }
    return data.roles.includes("ROLE_ADMIN");
    // || userRoles.includes('ROLE_ADMIN')
  }

  userHasRole(user: User, role: string) {
    const userRoles: any[] = [];
    for (const r of user.roles) {
      if (role === r) {
        return true;
      }
    }
    return false;
    //user.roles.includes('ROLE_ADMIN')
  }

  getCurrentUser() {
    if (store.state.user instanceof User) {
      // console.log('user from store')
      return store.state.user;
    }
    const data = this.loadData();
    const userData = this.parseJwt(data.token);
    if (userData) {
      return new User(userData);
    }
    return null;
  }

  getRoles() {
    const { token } = this.loadData();
    const data = this.parseJwt(token);
    return data.roles;
  }

  hasRoles(roles: []) {
    const { token } = this.loadData();
    const data = this.parseJwt(token);
    let userRoles: any[] = [];
    data.roles.forEach((role: any) => {
      if (this.ROLE_HIERARCHY.hasOwnProperty(role)) {
        userRoles = userRoles.concat(this.ROLE_HIERARCHY[role]);
      }
      if (!userRoles.includes(role)) {
        userRoles.push(role);
      }
    });
    let fullfit = true;
    if (userRoles.length === 0) {
      fullfit = false;
    }
    if (Array.isArray(roles)) {
      roles.forEach((role) => {
        if (!userRoles.includes(role)) {
          fullfit = false;
        }
      });
    }
    if (typeof roles === "string") {
      if (!userRoles.includes(roles)) {
        fullfit = false;
      }
    }
    // console.log(fullfit)
    return fullfit || userRoles.includes("ROLE_ADMIN");
  }

  hasOneRole(roles: []) {
    const { token } = this.loadData();
    const data = this.parseJwt(token);
    let userRoles: any[] = data.roles;
    // console.log(data.roles);
    for (const role of roles) {
    //   console.log("check " + role);
      if (data.roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  parseJwt(token: string): any {
    if (!token) {
      // this.logout()
      // console.log(token + ' token is empty');
      return { roles: [] };
    }
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}

export const auth = new Auth();
