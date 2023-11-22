<template>
    <div class="sidebar shadow p-3 d-flex flex-column justify-content-between" style="background: white">
        <LogoComponent />

        <div class="d-flex flex-column mt-5">

           

            <b-button v-for="(item, index) in linksSidBar " :key="index"  :variant="activate(item.name)" :href="item.link" class="mb-3 text-start">{{item.title}}</b-button>

            
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center mt-5 border-top p-3" style="height: 250px">
            <div class="bg-primary" style="height: 80px; width: 80px; border-radius: 100% ; flex: none;"></div>
            <div class="d-flex align-items-end mt-4">
                <h4 v-if="user">{{user.prename}}</h4>
                <h4 class="ms-2" v-if="user">{{user.name}}</h4>
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
@Options({
    components: {
        LogoComponent,
    },
})


export default class SideBarComponent extends Vue {
   
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
        console.log(this.user)
    }
    
    loadUser(){
        // const user = auth.getCurrentUser()
        // if (user) {
        //     this.user = user
        // }
        const user = localStorage.getItem("user");
        if (user) {
            const dataUser = JSON.parse(user);
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
