/* eslint-disabled */
// import Todo from "./Todo";
import Tenant from "./Tenant";
// import UserExtend from "@/entity/extends/UserExtend";

export default class User  {

    public id!: number;
    public email = '';
    // public password?= '';
    public name?= '';
    public prename?= '';
    // public available?: boolean;
    // public todos: Array<Todo> = [];
    // public passwordChangeCode?= '';
    public roles: string[] = [];
    public phone?= '';
    // public tenants: Array<Tenant> = [];
    public blocked?= '';
    public uuid = '';
    // public createdAt?: Date;
    // public updatedAt?: Date;
    // public createdFromIp?= '';
    // public updatedFromIp?= '';
    // public photo?= '';
    // public alt?= '';

    constructor(object?: any) {
        // super(object)
        if (object) {
            this.id = object.uuid;
            this.email = object.email;
            // this.password = object.password;
            this.name = object.name;
            this.prename = object.prename;
            // this.available = object.available;
            // if (object.todos) {
            //     object.todos.forEach((occ: any) => {
            //         const todo = occ instanceof Todo ? occ : new Todo(occ);
            //         this.todos.push(todo);
            //     });
            // }
            // this.passwordChangeCode = object.passwordChangeCode;
            this.roles = object.roles;
            this.phone = object.phone;
            // if (object.tenants) {
            //     object.tenants.forEach((occ: any) => {
            //         const tenant = occ instanceof Tenant ? occ : new Tenant(occ);
            //         this.tenants.push(tenant);
            //     });
            // }
            this.blocked = object.blocked;
            this.uuid = object.uuid;
            // if (object.createdAt) {
            //     this.createdAt = new Date(object.createdAt);
            // }
            // if (object.updatedAt) {
            //     this.updatedAt = new Date(object.updatedAt);
            // }
            // this.createdFromIp = object.createdFromIp;
            // this.updatedFromIp = object.updatedFromIp;
            // this.photo = object.photo;
            // this.alt = object.alt;
        }
        // this.postConstruct()
    }

}
