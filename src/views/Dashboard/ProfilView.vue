<template>
  <b-container>
      <h2>Mon Profile</h2>
      <!-- <div class="d-flex w-100 justify-content-end ">
          <div class="bg-primary p-3" style="height: 60px; width: 23%; border-radius: 10px ; flex: none;">
            <span style="font-size: 1.5em; font-weight: 500;color: antiquewhite;">Solde : {{ solde }} CFA</span>
          </div>
      </div> -->

      <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
        <div class="m-3">
            <b-form @submit="onSubmit" v-if="user">

              <div class="mb-3">
                  <label class="required form-label" :for="'name'">Nom:</label>
                  <input class="form-control" type="text" :id="'name'" :state="user.name != null" placeholder="Votre Nom"
                      v-model="user.name" />
              </div>

              <div class="mb-3">
                  <label class="required form-label" :for="'prename'">Prénom:</label>
                  <input class="form-control" type="text" :id="'prename'" :state="user.prename != null" placeholder="Vos Prénoms"
                      v-model="user.prename" />
              </div>

              <div class="mb-3">
                  <label class="required form-label" :for="'phone'">Mobile:</label>
                  <input class="form-control" type="tel" :id="'phone'" :state="user.phone != null" placeholder="Votre Numéro mobile"
                      v-model="user.phone" />
              </div>

              <div class="mb-3">
                  <label class="required form-label" :for="'email'">Email:</label>
                  <input class="form-control" type="email" :id="'email'" :state="user.email != null" 
                      v-model="user.email" />
              </div>
              
              <b-button type="submit" variant="warning">Mettre à jour</b-button>
              <!-- <b-button type="reset" variant="danger">Retour</b-button> -->
            </b-form>
        </div>
        
      </div>
  </b-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import User from '@/entity/User';

@Options({
  components: {
    HelloWorld,
  },
  
})
export default class ProfilView extends Vue {
  user:User | null = null;
    
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
          this.user = new User(dataUser)
      }
  }

  onSubmit(e:any){
    e.preventDefault();
    console.log(this.user)
  }

}
</script>
