<template>
    <div class="sidebar shadow p-3 d-flex flex-column justify-content-between" style="background: white">
        <LogoComponent />

        <div class="d-flex flex-column mt-5">
            
            <b-button variant="primary" class="mb-3 text-start ">Home</b-button>
            <b-button variant="light" class="mb-3 text-start">Home</b-button>
            <b-button variant="light" class="mb-3 text-start">Home</b-button>
            <b-button variant="light" class="mb-3 text-start">Home</b-button>
            <b-button variant="light" class="mb-3 text-start">Home</b-button>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center mt-5 border-top p-3" style="height: 250px">
            <div class="bg-primary" style="height: 80px; width: 80px; border-radius: 100% ; flex: none;"></div>
            <div class="d-flex align-items-end mt-4">
                <h4>Jhon</h4>
                <h4 class="ms-2">Doe</h4>
            </div>

            <p>
                inFO A METTRE
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import LogoComponent from "@/components/UI/LogoComponent.vue";

@Options({
    components: {
        LogoComponent,
    },
})
export default class SideBarComponent extends Vue {
    msg!: string;
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
