<template>
    <div class="position-relative">
        <div class="sidebar shadow p-3 d-flex flex-column justify-content-between cursor-pointer" @click="toggle" ref="select" style="background: white">
            <img style="" class="img-fluid"  src="../assets/icons/user.svg"
                    alt="">
        </div>

        <transition name="fade-in-top">
            <div v-if="activeDropdown" class="position-absolute shadow rounded-2 bg-white container-dropdown py-4 px-2  "
                style="top: 70px; right: 0%;z-index: 99999;">
                <div class="d-flex flex-column justify-content-between mt-1  p-3" style="height: 20%" v-if="user">
                    <h4 class="mb-3">Mes Informations</h4>
                    <div class="mb-1">
                        <span>
                            <strong>Nom :</strong>  {{ user.name?.toUpperCase() }}
                        </span>
                    </div>
                    <div class="mb-1">
                        <span >
                            <strong>Prénom :</strong> {{ user.prename }}
                        </span>
                    </div>
                    <div class="mb-1" >
                        <span >
                            <strong>Mobile :</strong> {{ user.phone }}
                        </span>
                    </div>
                    <div class="mb-1">
                        <span >
                            <strong>Email :</strong> {{ user.email }}
                        </span>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-4 border-top">
                        <b-button @click="logout" variant="primary"  class="mt-3 text-start">
                            Deconnexion
                        </b-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
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
export default class Profile extends Vue {
    activeDropdown = false
    user:User | null = null;
    
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
            const prename = dataUser.prename
            const parts = prename.split(" ")
            dataUser.prename = helper.toCapitalize(parts[0])
            this.user = new User(dataUser)
        }
    }

    logout(){
        auth.logout();
    }

    toggle() {
        this.activeDropdown = !this.activeDropdown

        if (this.activeDropdown) {

            window.addEventListener('click', this.detectClickOutside);

        } else {
            window.removeEventListener('click', this.detectClickOutside);
        }
    }

    detectClickOutside() {
        const select: any = this.$refs.select
        document.addEventListener('click', (e) => {
            if (select && !select.contains(e.target)) {
                this.activeDropdown = false
            }
        })
    }


    removeEventListener() {
        window.removeEventListener('click', this.detectClickOutside);
    }
}
</script>

<style scoped>
.sidebar {
    width: 60px;
    height: 60px;

    border-radius: 100%;
    padding: 10px;
}

.container-dropdown {
    min-width: 250px;
    min-height: 200px;
}


.fade-in-top-enter-active,
.fade-in-top-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.fade-in-top-enter,
.fade-in-top-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

</style>
