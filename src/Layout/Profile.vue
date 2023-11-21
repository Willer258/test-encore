<template>
    <div class="position-relative">
        <div class="sidebar shadow p-3 d-flex flex-column justify-content-between" @click="toggle" ref="select" style="background: white">

        </div>

        <transition name="fade-in-top">
            <div v-if="activeDropdown" class="position-absolute shadow rounded-2 bg-white container-dropdown py-4 px-2  "
                style="top: 70px; right: 0%;">
                <b-button @click="logout" variant="link" class="mb-3 text-start">
                    Deconnexion
                </b-button>
            </div>
        </transition>

    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import LogoComponent from "@/components/UI/LogoComponent.vue";
import { auth } from "@/services/Auth";

@Options({
    components: {
        LogoComponent,
    },
})
export default class Profile extends Vue {
    activeDropdown = false

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
