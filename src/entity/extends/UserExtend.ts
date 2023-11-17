// /* eslint-disable no-empty */
// /* eslint-disabled */

// // import Prospect from "@/entity/Prospect";
// import { api } from "@/services/Api";
// import { helper } from '@/services/Helper';
// import User from "../User";
// import Role from "../Role";
// import store from "@/store";

// export default class UserExtend {

//   repeatedPassword = ''

//   constructor(object?: any) {

//   }


//   postConstruct() {
//   }

//   get identifier() {
//     const self: User = this as any
//     try {
//       const name = (self.name + ' ' + self.prename).trim()
//       if (!helper.empty(name.length) && !helper.empty(self.name) && !helper.empty(self.prename)) {
//         return name
//       } else {
//         return self.email
//       }
//     } catch (e) { }
//     return null
//   }
// //   get photoLink() {
// //     const self: Prospect = this as any;
// //     if (self.photo) {
// //       return api.master + 'uploads/' + self.photo;
// //     }
// //     return null
// //   }

// //   roleList() {
// //     const self: User = this as any
// //     const result: Role[] = []
// //     self.roles.forEach((r: string) => {
// //       const role = store.state.hierarchy.findByCode(r)
// //       if (role) {
// //         result.push(store.state.hierarchy.findByCode(r))
// //       }
// //     })
// //     return result
// //   }

// //   hasRole(code: string) {
// //     const self: User = this as any
// //     // if (self.roles.includes('ROLE_ADMIN')) {
// //     //   return true
// //     // }
// //     const roles = this.roleList()
// //     for (let role of roles) {
// //       if (role) {
// //         if (role.findByCode(code)) {
// //           return true
// //         }
// //       }
// //     }
// //     return false
// //   }


// }
