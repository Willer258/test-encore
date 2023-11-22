<template>
    <div class="page">
        <b-container>
            <b-row>
                <b-col>


                    <img src="@/assets/images/welcome.svg" class="w-100" />

                </b-col>

                <b-col cols="1"></b-col>
                <b-col>
                    <div class="d-flex align-items-center flex-column justify-content-center h-100">
                        <div>

                            <b-button variant="link" class=" p-0 mb-5">Retour</b-button>
                            <!-- <div class="rounded-5" style="height: 50px; width: 50px; background-color: #f6eef3" /> -->

                            <h1 class="fs-3">
                                Espace Client : Connectez-vous à Votre Selfcare !
                            </h1>

                            <p>
                                Vous n'avez pas encore de compte ?? <b-button variant="link" to="/inscription"
                                    class="p-0">Inscrivez
                                    vous</b-button>
                            </p>

                            <div>
                                <b-form @submit="onSubmit" prevent="submit" class="d-flex flex-column ">
                                    <label class="sr-only" for="inline-form-input-name">Numero de telephone</label>
                                    <b-form-input v-model="loginData.username" type="tel" id="number"
                                        class="mb-2 mr-sm-2 mb-sm-3"
                                        placeholder="Entrez votre numéro de téléphone" required></b-form-input>

                                    <label class="sr-only" for="inline-form-input-username">Mot de passe</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-4">
                                        <b-form-input v-model="loginData.password" type="password" id="password" required
                                            placeholder="Entrez votre mot de passe"></b-form-input>
                                    </b-input-group>

                                    <!-- <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox> -->

                                    <b-button type="submit" style="align-self: end" variant="primary" class="w-50">
                                        <span>Connexion</span> </b-button>
                                </b-form>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { api } from "@/services/Api";
import { auth } from "@/services/Auth";

//   @Options({
//     components: {

//     },

//   })




export default class ActivationPage extends Vue {

    loginData = {
        username: '',
        password: ''
    }

    async onSubmit(e: any) {
        e.preventDefault()
        auth.login(this.loginData.username, this.loginData.password)
        console.log(this.loginData)

    }


}
</script>

<style scoped>
.page {
    padding-top: 0;
    background: #f6eef3;
    height: 100vh;
    display: flex;
    align-items: center;
}
</style>
