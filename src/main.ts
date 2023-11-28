import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import BootstrapVue3 from "bootstrap-vue-3";

// import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import "./assets/css/main.css";
import "./assets/css/base.css";
import { auth } from "./services/Auth";
import Popup from "./entity/Popup";

const app = createApp(App);

// app.use(BootstrapVue3);
// app.use(IconsPlugin)

app.use(store);
app.use(router);

router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
  if (to.meta && to.meta.requiredRoles) {
    if (auth.hasOneRole(to.meta.requiredRoles as any)) {
      next();
      return;
    } else {
      console.log(from);
      console.log(auth.getRoles());
      console.log("has no role");
      console.log(to.meta.requiredRoles);
      new Popup(
        "Deconnexion",
        "Vous n'avez pas les droits nécéssaires pour effectuer cette action",
        "danger",
        "fad user-slash"
      );
      const type = localStorage.getItem("userType");
      if (type === "partner") {
        next({
          path: "/partner/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      }
    }
  }
  next();
});

app.mount("#app");
