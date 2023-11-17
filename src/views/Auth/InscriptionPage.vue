<template>
    <div class="page">
        <b-container>
            <b-row>
                <b-col>


                    <img src="@/assets/images/inscription.svg" class="w-100" />

                </b-col>

                <b-col cols="1"></b-col>
                <b-col>
                    <div class="d-flex align-items-center flex-column justify-content-center h-100">
                        <div>

                            <!-- <div class="rounded-5" style="height: 50px; width: 50px; background-color: #f6eef3" /> -->

                            <h1 class="fs-3">
                                Rejoignez notre Plateforme avec Votre Compte Personnel
                            </h1>

                            <p>
                                Deja membre ?? <b-button variant="link" to="/login" class="p-0">Connectez-vous </b-button>
                            </p>

                            <div>
                                <b-form class="d-flex flex-column ju">
                                    <label class="sr-only" for="inline-form-input-name">Numero de telephone</label>
                                    <b-form-input type="tel" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-3"
                                        placeholder="Entrez votre numero de telephone"></b-form-input>

                                        <label class="sr-only" for="inline-form-input-name">Mot de passe</label>
                                    <b-form-input type="password" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-3"
                                        placeholder="Entrez votre mot de passe"></b-form-input>
                                        <label class="sr-only" for="inline-form-input-name">Confirmation de mot de passe</label>
                                    <b-form-input type="password" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-3"
                                        placeholder="Veuillez confirmer votre mot de passe"></b-form-input>


                                        <h5>Avez vous un parrain ?</h5>

                                        <p>Enttrez le son code et obtenez jusqu'a <strong> 5000 FCFA</strong> de réduction</p>
                                    <label class="sr-only" for="inline-form-input-username">Code de parrainage</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-4">
                                        <b-form-input  id="inline-form-input-password"
                                            placeholder="Entrez votre code de parrainage"></b-form-input>
                                    </b-input-group>

                                    <!-- <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox> -->

                                    <b-button style="align-self: end" variant="primary" class="w-50">inscription</b-button>
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
import { api } from "@/services/Api";
import {  Vue } from "vue-class-component";

//   @Options({
//     components: {

//     },

//   })

export default class LoginPage extends Vue {

loginData = {
    username: '',
    password: ''
}

async onSubmit(event: any) {
   
    event.preventDefault()
    // console.log(this.loginData, 'iyann')
    // console.log(object);
    console.log(api.post);
    const data = await api.post(api.auth,"selfcare/login",
        this.loginData
    )
    console.log(data);
   
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
