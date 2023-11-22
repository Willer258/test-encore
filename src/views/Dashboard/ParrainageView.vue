<template>
  <b-container>
      <h2>Mes Parrainage</h2>
      <div class="d-flex w-100 justify-content-end ">
          <div>
              <b-button  variant="primary">
              Creer une cotation
          </b-button>
          </div>
          
      </div>

      <div class="mt-5 rounded-2 overflow-hidden">
        <b-table head-variant="light" 
            :tbody-transition-props="transProps"  sticky-header hover :items="contrats">

          <template #cell(action)="data" >
            <div class="w-50 d-flex">
              <b-button  class="mr-2">
                  Continuer
              </b-button>

              <b-button class="ms-3" variant="danger" :id="data.value"> 
                 Supprimer
              </b-button>
            </div>
          </template>
    
        </b-table>
      </div>
  </b-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { auth } from "@/services/Auth";
import { api } from '@/services/Api';
import { CONTRACT_STATUS, helper } from '@/services/Helper';

@Options({
  components: {
    HelloWorld,
  },
  
})
export default class ParrainageView extends Vue {
  fileuls: any[] = [];
  contrats: any[] = [];
  categories: any[] = [];

  mounted() {
    this.loadBranchCategories();
    this.loadContract();
    this.loadSponsoring();
    console.log(this.fileuls.length, " fileuls count");
  }

  async loadSponsoring(){
    const res = await api.get(api.auth, "selfcare/get/sponsoring/data");
    if (res && res.data && res.data.fileuls) {
      console.log(res.data.fileuls)
      res.data.fileuls.forEach((fileul:any) => {
        const data:any = {}
        const name = fileul.godson.name
        const prename = fileul.godson.prename

        data.action = fileul.id

        console.log(data)
        console.log(fileul)
        this.fileuls.push(data);
      });
    }
  };

  transProps= {
          // Transition name
          name: 'flip-list'
        }

  async loadContract(){
    try {
      const res = await api.get(api.core, "selfcare/contracts");
      //console.log(res.data)
      if (res && res.data && res.data.contracts) {
        res.data.contracts.forEach((cont: any) => {
            const data:any = {}
            data.photo = process.env.VUE_APP_MASTER_URL+"uploads/"+cont.branch.photo
            const marque = cont.assetAliases[0]
            if (marque) {
              data.marque = marque
            } else {
              const parts = (cont.alias).split(" ")
              if (parts.length > 0){
                data.marque = parts[0]+" "+parts[1]
              }
            }
            const immat = cont.assetsIdentifiers[0]
            if (immat) {
              data.immat = immat
            } else {
              const parts = (cont.alias).split(" ")
              if (parts.length > 0){
                data.immat = parts[2]
              }
            }
            
            data.insurer = cont.insurer.label
            data.duration = helper.readable(cont.startAt, 'dMy') +" - "+helper.readable(cont.expireAt, 'dMy')
            data.action = cont.uuid

          console.log(data)
          console.log(cont)
          this.contrats.push(data);
        })
      }
    } catch (e) {
      console.log(e);
    }
  }
  async loadBranchCategories(){
    try {
      const res = await api.get(api.core, "api/branch/list");
      //console.log(res.data)
      if (res && res.data && res.data.categories) {
        res.data.categories.forEach((cat: any) => {
          this.categories.push(cat);
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

}
</script>
