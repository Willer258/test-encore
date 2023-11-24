<template>
    <div class="sidebar shadow p-3 d-flex flex-column justify-content-between" style="background: white">
        <LogoComponent />

        <div class="d-flex flex-column mt-5">
            <!-- <b-button v-for="(item, index) in linksSidBar " :key="index"  :variant="activate(item.name)" :href="item.link" class="mb-3 text-start">{{item.title}}</b-button> -->

            <router-link v-for="(item, index) in linksSidBar" :key="index" :to="item.link" class=" mb-3 btn text-start" :class="'btn-'+activate(item.name)">
                <span class="menu-title">
                    {{item.title}}
                </span>
            </router-link>

            <b-button  :variant="'light'" :href="'https://wa.me/2250701363636'" class="mb-3 text-start">Mes Sinistres</b-button>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center mt-5 border-top p-3" style="height: 250px">
            <div class="bg-primary p-3" style="height: 80px; width: 80px; border-radius: 100% ; flex: none;">
                <img style="" class="img-fluid"  src="../assets/icons/user.svg"
                    alt="">
            </div>
            <div class="d-flex align-items-end mt-4">
                <h4 v-if="user">{{user.prename}}</h4>
                <h4 class="ms-2" v-if="user">{{user.name?.toUpperCase()}}</h4>
            </div>

            <p v-if="user">
                {{user.phone}}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import {clientLinks  } from "@/services/navConfig";
import type {Links} from '@/services/navConfig'
import { Vue, Options } from "vue-class-component";
import LogoComponent from "@/components/UI/LogoComponent.vue";
import { auth } from "@/services/Auth";
import User from "@/entity/User";
import { helper } from "@/services/Helper";
@Options({
    components: {
        LogoComponent,
    },
})


export default class SideBarComponent extends Vue {
    prename: string = "";
    user:User | null = null;
    linksSidBar:any = clientLinks

    activate(item:string){
        if (this.$route.name === item) {
            return 'primary'
        }
        else{
            return 'light'
        }
    }

    mounted(): void {
        this.loadUser();
        // console.log(this.user)
    }
    
    loadUser(){
        // const user = auth.getCurrentUser()
        // if (user) {
        //     this.user = user
        // }
        const user = localStorage.getItem("user");
        if (user) {
            const dataUser = JSON.parse(user);
            const prename = dataUser.prename
            const parts = prename.split(" ")
            dataUser.prename = helper.toCapitalize(parts[0])
            this.user = new User(dataUser)
        }
    }
     
}
</script>

<style scoped>
.sidebar {
    min-width: 300px;
    width: min-content;
    border-radius: 10px;
    padding: 10px;
}
</style>
