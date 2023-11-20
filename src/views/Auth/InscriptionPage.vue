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
                                <b-form @submit="onSubmit" prevent="submit" class="d-flex flex-column ju">
                                    <label class="sr-only" for="username">Numero de telephone</label>
                                    <b-form-input type="tel" id="username" v-model="user.username" class="mb-2 mr-sm-2 mb-sm-3" :class="{}"
                                     placeholder="Entrez votre numero de telephone"></b-form-input>

                                        <label class="sr-only" for="password">Mot de passe</label>
                                    <b-form-input type="password" id="password" v-model="user.password" class="mb-2 mr-sm-2 mb-sm-3"
                                        placeholder="Entrez votre mot de passe"></b-form-input>
                                        <label class="sr-only" for="repeatpassword">Confirmation de mot de passe</label>
                                    <b-form-input type="password" id="repeatpassword" v-model="user.repeatPassword" class="mb-2 mr-sm-2 mb-sm-3"
                                        placeholder="Veuillez confirmer votre mot de passe"></b-form-input>

                                        <h5>Avez vous un parrain ?</h5>
                      
                                        <p>Enttrez le son code et obtenez jusqu'a <strong> 5000 FCFA</strong> de réduction</p>
                                    <label class="sr-only" for="parrain">Code de parrainage</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-4">
                                        <b-form-input  id="parrain" v-model="user.parrain"
                                            placeholder="Entrez votre code de parrainage"></b-form-input>
                                    </b-input-group>

                                    <!-- <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox> -->

                                    <b-button type="submit" style="align-self: end" variant="primary" class="w-50">inscription</b-button>
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
import { auth } from "@/services/Auth";
import { helper } from "@/services/Helper";
import ExceptionCodes from "@/services/ExceptionCodes";
import { phoneManager } from "@/services/PhoneManager";
import {  Vue } from "vue-class-component";
import router from "@/router";
import axios from "axios";

//   @Options({
//     components: {

//     },

//   })

export default class InscriptionPage extends Vue {

user = {
    username: '',
    repeatPassword: '',
    parrain: '',
    password: ''
}


async onSubmit(e: any) {
   
    e.preventDefault()
    const rst = await this.isValuesSet()
    
    if (rst) {
        try {
            const res = await api.post(api.auth, "selfcare/create/account", {
                customer: {
                    username: this.user.username,
                    password: this.user.password,
                    godFather: this.user.parrain,
                },
            });
            
        } catch (error) {
            if (axios.isAxiosError(error)){
                const status = error.response?.status
                switch (status) {
                    case ExceptionCodes.SUCCESS: {
                        router.push({ name: "activation" });
                        break;
                    }
                    case ExceptionCodes.BAD_CREDENTIALS: {
                        break;
                    }
                    case ExceptionCodes.DUPLICATED_ACCOUNT: {
                        alert("Ce numéro de téléphone est déjà lié à un compte. Connectez vous ou cliquez sur mot de passe oublié afin de réinitialiser vos identifiants")
                        router.push({ name: "login" });
                        break;
                    }
                    case ExceptionCodes.UNACTIVE_ACCOUNT: {
                        break;
                    }
                }
            }
        }

    }
   
}

async isValuesSet() { 
const checkGodfather = await this.checkGodFather()
if (!helper.empty(this.user.parrain) && !checkGodfather) {
    return false;
}

return (
    phoneManager.verifyNewFormat(this.user.username) &&
    helper.isValidPassword(this.user.password) &&
    this.user.password === this.user.repeatPassword
);
}

async checkGodFather () {
if (!helper.empty(this.user.parrain)) {
    const res = await api.get(api.auth, "api/check/godfather/"+this.user.parrain);
    if (!res) {
        return false;
    }
    const data = res.data;
    if (data && data.status === "success") {
        return true;
    }
}
return false;
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
.success {
    border-color: rgb(59, 186, 5);
}
.danger {
    border-color: rgb(225, 28, 28);
}
</style>
@/services/ExceptionCodes