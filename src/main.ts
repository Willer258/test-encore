import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



import './assets/css/main.css'
import './assets/css/base.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(BootstrapVue)
app.use(IconsPlugin)

app.use(store)
app.use(router)






// router.beforeEach((to, from, next) => {
//     const auth = false
//     // console.log(to)
//     if (to.meta && to.meta.requiredRoles) {
//         if (auth) {
//             next();
//             return;
//         } else {
           
//             console.log(to.meta.requiredRoles)
//             // new Popup(Vue.prototype.trans('Deconnexion'),
//             //     Vue.prototype.trans('Vous n\'avez pas les droits nécéssaires pour effectuer cette action'),
//             //     'danger', 'fad user-slash');
//             // // return;
//             // const type = localStorage.getItem('userType')
//             // if (type === 'partner') {
//             //     next({
//             //         path: '/partner/login',
//             //         query: {redirect: to.fullPath}
//             //     });
//             // } else {
//                 next({
//                     path: '/login',
//                     query: {redirect: to.fullPath}
//                 });
//             // }
//         }
//     }
//     next();
// });


app.mount('#app')

