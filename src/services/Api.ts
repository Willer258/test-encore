/* eslint-disable */
// @ts-nocheck

import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

import store from '@/store';
import router from "@/router";
// import {auth} from "@/services/Auth";
// import Popup from "@/entity/Popup";
import Vue from 'vue'
import Response from "@/entity/Response";

// import User from "@/Model/User";
import User from '../entity/User';
// import {helper} from '@/services/Helper';
import Tenant from '@/entity/Tenant';

class Api {
    public axios: AxiosInstance;
    public auth = process.env.VUE_APP_AUTH_URL;
    public form = process.env.VUE_APP_FORM_URL;
    public core = process.env.VUE_APP_CORE_URL;
    public com = process.env.VUE_APP_CORE_URL;
    public comparator = process.env.VUE_APP_COMPARATOR_URL;
    public backend = process.env.VUE_APP_BACKEND_URL;
    public master = process.env.VUE_APP_MASTER_URL;
    public legacy = process.env.VUE_APP_LEGACY_BACKEND_URL;
    public uploadRoot = process.env.VUE_APP_MASTER_URL + 'uploads/'
    public logoUrl = process.env.VUE_APP_MASTER_URL + 'images/logo.png'
    public refreshAttempt = 0
    public zone = 'wiassur'
    public platform = 'app-mobile';

    constructor() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const baseUrl = location.origin
        // console.log(baseUrl)
        this.axios = axios.create(
            {
                baseURL: '/',
                headers,
                data: {}
            },
        );
        // this.axios.defaults.withCredentials = true
        this.addLoadingInterceptor(this.axios);
    }

    addLoadingInterceptor(client: AxiosInstance) {
        client.interceptors.request.use((config: AxiosRequestConfig) => {
                if (store.state.userToken && store.state.userToken.length && (!config.params || !config.params.hasOwnProperty('noAuth'))) {
                    config.headers.Authorization = `Bearer ${store.state.userToken}`;
                }
                const ct = store.getters.currentTenant()
                let zone = localStorage.getItem('zone')
                if (zone) {
                    this.zone = zone
                }
                config.headers.Zone = this.zone
                return config;
            },
            (error: AxiosError) => {
                 console.log('REQUEST ERROR');
                console.log(error);
                if (error.response && error.response.status === 401) {
                    // console.log('access denied');
                }
            }
        );

        client.interceptors.response.use((response: any) => {
            if (response.data.hasOwnProperty('status') && response.data.hasOwnProperty('message')) {
                if (response.data.status === 'error') {
                    new Popup('Erreur', response.data.message, 'danger', 'fad fa-ban');
                } else if (response.data.status === 'unknow') {
                    new Popup('Infos', response.data.message, 'warning', 'fad fa-exclamation-triangle');
                }
            }
            // store.commit('stopLoading');
            // Do something with response data
            return response;
        }, async (error: any) => {
            console.log(response.data.status)
            store.commit('stopLoading');
             console.log('RESPONSE ERROR');
            // console.log(error.response);

            if (error.response && error.response.status === 401) {
                // console.log(error.response.data.message)
                if (error.response.data.message === 'Invalid credentials.') {
                    new Popup(Vue.prototype.trans('Identifiants Invalides'),
                        Vue.prototype.trans('Nom d\'utilisateur ou mot de passe incorrect'), 'danger', 'fad user-slash');
                    return Promise.reject(error);
                }
                // console.log(error.config);
                if (this.refreshAttempt > 5) {
                    auth.logout()
                    return
                }
                this.refreshAttempt++
                const refreshSuccess = await this.refreshToken();
                if (!refreshSuccess) {
                    // console.log('refresh failed')
                    this.logout()
                    // Swal.fire({
                    //     title: Vue.prototype.Ktrans('Session_expired'),
                    //     text: Vue.prototype.Ktrans('Sorry_you_have_been_disconnected'),
                    //     icon: "warning",
                    //     timer: 5000
                    // });
                } else {
                    // console.log('refresh succeed')
                    this.refreshAttempt = 0
                    return this.axios.request(error.config);
                }
                // } else {
                //     this.logout();
                // }
                // console.log('access denied');
                new Popup(Vue.prototype.trans('Invalid_credentials'),
                    Vue.prototype.trans('Invalid_username_or_password'), 'danger', 'fad user-slash');
                return Promise.reject(error);
            }
            if (error.response) {
                if (error.response.data) {
                    const data = error.response.data;
                    if (data.hasOwnProperty('detail')) {
                        new Popup('Erreur', data.detail, 'danger');
                    } else if (data.hasOwnProperty('message')) {
                        new Popup('Erreur', data.message, 'danger');
                    } else {
                        new Popup('Erreur', 'Une erreur est survenue lors du chargement', 'danger');
                    }
                }
            }
         //return Promise.reject(error);
        });
    }


    async get(service: string, endpoint: string, config = {}): Promise<any | null> {
        return await this.axios.get(service + endpoint, config);
    }

    async downloadPdf(endpoint: string, name?: string) {
        store.commit('loading');
        const res = await this.axios.get(endpoint, {responseType: 'blob'});
        store.commit('stopLoading');
        const blob = new Blob([res.data], {type: "application/pdf"});
        let url = window.URL || window.webkitURL;
        let link = url.createObjectURL(blob);
        let a = document.createElement('a');
        if (name) {
            a.setAttribute("download", name);
        }
        a.setAttribute("href", link);
        a.setAttribute('target', '_blank')

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async downloadFile(file: any) {
        store.commit('loading');
        const res = await this.axios.get('shared/download/file/' + file.uuid, {
            responseType: 'blob',
            params: {noAuth: true}
        });
        store.commit('stopLoading');
        const blob = new Blob([res.data], {type: file.type});
        let url = window.URL || window.webkitURL;
        let link = url.createObjectURL(blob);
        let a = document.createElement('a');
        a.setAttribute("download", file.realName);
        a.setAttribute("href", link);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    post(service: string, endpoint: string, data: any, config?: any): Promise<AxiosResponse> {
        console.log('init', data);
        data = JSON.stringify(data)
        console.log(service + endpoint, data, config, 'data');
        return axios.post(service + endpoint, data, config);
    }

    purePost(service: string, endpoint: string, data: any, config?: any): Promise<AxiosResponse> {
        data = JSON.parse(Vue.prototype.stringify(data))
        return this.axios.post(endpoint, data, config);
    }

    put(service: string, endpoint: string, body: any, reqOpts?: any) {
        return this.axios.put(service + endpoint, body, reqOpts);
    }

    patch(service: string, endpoint: string, body: any, reqOpts?: any) {
        return this.axios.patch(service + endpoint, body, reqOpts);
    }

    delete(service: string, endpoint: string, reqOpts?: any) {
        return this.axios.delete(service + endpoint, reqOpts);
    }

    async loadManagers() {
        if (store.state.users.length > 0) {
            return store.state.users
        }
        let users = localStorage.getItem('users')
        if (users) {
            users = JSON.parse(users)
            if (users) {
                store.state.users = users
                return store.state.users
            }
        }
        if (store.state.users.length === 0 && auth.hasRole('ROLE_MANAGER')) {
            const res = await this.get(this.auth, 'api/get/managers');
            store.state.users = []
            res.data.managers.forEach((m: any) => {
                store.state.users.push(new User(m))
            })
            localStorage.setItem('users', JSON.stringify(store.state.users))
        }
        return store.state.users
    }

    async getManager(uuid: string) {
        if (!uuid) {
            return null
        }
        let users = await store.getters.users()
        let manager = store.state.users.find((u: User) => {
            return u.email === uuid || u.uuid === uuid
        })
        if (!manager) {
            users = await store.getters.users(true)
            manager = store.state.users.find((u: User) => {
                return u.email === uuid || u.uuid === uuid
            })
        }
        return manager
    }

    async getManagerIdentifier(uuid: string) {
        const user: User = await this.getManager(uuid) as any
        if (user) {
            try {
                let name = (user.name + ' ' + user.prename).trim()
                if (!helper.empty(name.length) && !helper.empty(user.name) && !helper.empty(user.prename)) {
                    return name
                } else {
                    return user.email
                }
            } catch (e) {
            }
        }
        return uuid;
    }

    responses: any[] = [];
    responseTimeout: any = null
    callId: any = null
    callBacks: any[] = []
    sendingResponses = false

    async saveResponse(data: any, callback: any) {
        const callId = this.generateId()
        this.callId = callId
        this.sendingResponses = true
        const index = this.responses.findIndex((r: any) => {
            return r.questionUuid === data.questionUuid && r.rgUuid === data.rgUuid
        })
        if (index !== -1) {
            this.responses.splice(index, 1)
            this.callBacks.splice(index, 1)
        }
        this.responses.push(data);
        this.callBacks.push({responseUuid: data.responseUuid, callback: callback});

        const newIndex = this.responses.findIndex((r: any) => {
            return r.questionUuid === data.questionUuid && r.rgUuid === data.rgUuid
        })
        await store.state.sleep(500)
        if (this.callId && this.callId === callId) {
            await this.saveResponses(callId)
        }
    }

    private async saveResponses(callId: string) {
        if (this.responses.length === 0) {
            return
        }
        if (this.callId === callId) {
            const responses = JSON.parse(JSON.stringify(this.responses))
            const callbacks: any[] = [...this.callBacks];
            responses.forEach((r: any) => {
                const index = this.responses.findIndex((res: any) => {
                    return res.questionUuid === r.questionUuid && res.rgUuid === r.rgUuid
                })
                if (index !== -1) {
                    this.responses.splice(index, 1)
                    this.callBacks.splice(index, 1)
                }
            })
            this.callId = null
            const res = await this.post(this.form, 'api/save/responses', responses);

            callbacks.forEach((c: any) => {
                c.callback(res)
            })
            if (callbacks.length === 0) {
                this.sendingResponses = false
            }
            // store.commit('responseSaved')
            if (res) {

            }
            if (!res || (res && !res.data)) {
                const p = new Popup('Erreur', 'Une erreur a été rencontrée', 'danger', 'fad fa-exclamation');
            }

        }
    }

    subGroups: any[] = []
    subCallId: any = null
    subCallBacks: any[] = []

    async createSubGroup(data: any, callback: any) {
        const subCallId = this.generateId()
        this.subCallId = subCallId
        const index = this.subGroups.findIndex((r: any) => {
            return r.questionUuid === data.questionUuid && r.rgUuid === data.rgUuid
        })
        if (index !== -1) {
            this.subGroups.splice(index, 1)
            this.subCallBacks.splice(index, 1)
        }
        this.subGroups.push(data);
        this.subCallBacks.push(callback);
        await store.state.sleep(500)
        if (this.subCallId && this.subCallId === subCallId) {
            this.createSubGroups(subCallId)
        }
    }

    async createSubGroups(subCallId: string) {
        if (this.subGroups.length === 0) {
            return
        }
        if (this.subCallId === subCallId) {
            const subs = {...this.subGroups}
            this.subCallId = null
            this.subGroups = []
            const res = await this.post(this.form, 'api/create/sub/response/groups', subs);
            if (res) {
                this.subCallBacks.forEach((callback: any) => {
                    callback(res)
                })
                this.subCallBacks = []
            }

        }
    }


    generateId() {
        const number = Math.random();
        number.toString(36);
        return number.toString(36).substr(2, 9);
    }


    // async login(username: string, password: string) {
    //     try {
    //         store.commit('disallowLoading');
    //         const result = await this.post('api/login_check', {username: username, password: password});
    //         const data = result.data;
    //         // console.log(data);
    //         // return;
    //         store.commit('setToken', data.token);
    //         // store.commit('setUser', data.user);
    //         store.commit('setRefreshToken', data.refresh_token);
    //         return true;
    //     } catch (error) {
    //         if (error.response.status === 401) {
    //             // new Popup('Identifiants incorrects', 'Nom d\'utilisateur ou mot de passe incorrect', 'danger', 'fad user-slash');
    //         }
    //         return false;
    //     }
    // }
    //
    //
    logout() {
        store.commit('logout');
        localStorage.removeItem('user');
        localStorage.removeItem('userRefreshToken');
        localStorage.removeItem('token');
        if (router.currentRoute.name !== 'login') {
            router.push({name: 'login'});
        }
    }

    async refreshToken() {
        try {
            // console.log('refresh ' + this.refreshAttempt)
            const ut = localStorage.getItem('userType')
            let endpoint = 'token/refresh'
            if (ut === 'partner') {
                endpoint = 'partner/' + endpoint
            }
            const result = await this.post(this.auth, endpoint, {refreshToken: auth.loadData().refreshToken}, {noAuth: true});
            if (result) {
                const data = result.data;
                store.state.userToken = data.token
                store.state.userRefreshToken = data.refreshToken

                localStorage.setItem('mercureToken', data.mercure)
                localStorage.setItem('refreshToken', data.refreshToken)
                localStorage.setItem('userToken', data.token)
                return true;
            }
            return false;
        } catch (error: any) {
            // console.log('---------->refresh error')
            // console.log(error);
            if (error.response.status === 401) {
                // new Popup('danger', Vue.prototype.Ktrans('invalid_credentials'),
                //     Vue.prototype.Ktrans('bad_username_or_password'),
                //     'fad user-slash', '', []);
            }
            return false;
        }
    }


    loadAuth(): any {
        let token = (store.state as any).userToken;
        if (!token) {
            token = localStorage.getItem('userToken');
            if (token === 'null') {
                token = '';
            }
        }
        // store.commit('setToken', token);

        let refreshToken = (store.state as any).userRefreshToken;
        if (!refreshToken) {
            refreshToken = localStorage.getItem('userRefreshToken');
            if (token === 'null') {
                refreshToken = '';
            }
        }
        // store.commit('setRefreshToken', refreshToken);

        let user = (store.state as any).user;
        if (!user) {
            user = localStorage.getItem('user');
            if (user === 'null') user = null;
            // user = user ? new User(JSON.parse(user)) : null;
        }
        // store.commit('setUser', user);

        return {token, refreshToken, user};
    }

    isConnected(): boolean {
        const data = this.loadAuth();
        if (!data) {
            return false;
        }
        return data.token && data.refreshToken && data.user;
    }


    async loadBranches() {
        const branches = JSON.parse(localStorage.getItem('branches') || '[]')
        // this.get('get/branches').then((res) => {
        //     if (res.status === 'success') {
        //         store.state.branches = res.branches
        //         localStorage.setItem('branches', JSON.stringify(res.branches))
        //     }
        // })
        return branches || store.state.branches
    }

    public setCookie(cookieName: string, cookieValue: string, validityDays: number) {
        const d = new Date();
        if (!validityDays) {
            validityDays = 30;
        }
        d.setTime(d.getTime() + (validityDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        const parts = window.location.hostname.split('.');
        let topDomain = window.location.hostname;
        if (parts.length > 2) {
            topDomain = parts[parts.length - 2] + '.' + parts[parts.length - 1];
        }
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";domain=" + topDomain + ";path=/";
    }


}

export const api = new Api();
