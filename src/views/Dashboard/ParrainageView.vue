<template>
  <b-container>
      <h2>Mes Parrainages</h2>
      <div class="d-flex w-100 justify-content-end ">
          <div class="bg-primary p-3" style="height: 60px; width: 25%; border-radius: 10px ; flex: none;">
            <span style="font-size: 1.5em; font-weight: 500;">Solde : {{ solde }} CFA</span>
          </div>
      </div>

      <div class="mt-5 rounded-2 overflow-hidden d-flex flex-column  bg-white px-3 py-2">
        <b-table head-variant="light" :fields="fields" :current-page="currentPage" id="my-table"
            :tbody-transition-props="transProps"  sticky-header hover :items="fileuls">

          <template #cell(id)="data">
                <img style="" class="img-fluid" :id="data.item.id" src="../../assets/icons/user-bold-duotone.svg"
                    alt="">
          </template>

        </b-table>
        <b-pagination class="align-self-end mt-3" v-model="currentPage" :total-rows="rows()" :per-page="perPage"
                aria-controls="my-table">
        </b-pagination>
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
  solde:any = 0
  transProps= {
  name: 'flip-list'
  }
  fields = [
    { key: 'id', label: '' },
    { key: 'name', label: 'Nom' },
    { key: 'prename', label: 'Prénom' },
    { key: 'primeGs', label: 'Status' },
  ]
  perPage = 10
  currentPage = 1

  mounted() {
    this.loadSponsoring();
    //console.log(this.fileuls.length, " fileuls count");
  }

  rows() {
    return this.fileuls.length
  }

  async loadSponsoring(){
    const res = await api.get(api.auth, "selfcare/get/sponsoring/data");
    if (res && res.data && res.data.fileuls) {
      res.data.fileuls.forEach((fileul:any) => {
        const data:any = {}
        data.name = fileul.godson.name.toUpperCase()
        data.prename = ""
        const parts = fileul.godson.prename.split(" ")
        parts.forEach((prename:any) => {
          data.prename += helper.toCapitalize(prename)+" "
        });
        if (fileul.godfatherPremium) {
          this.solde += fileul.godfatherPremium
        }
        if (fileul.godsonPremium != null) {
          data.primeGs = helper.currencyFormat(fileul.godsonPremium,true, true) 
        } else {
          data.primeGs = 'En attente'
        }
        data.id = fileul.godson.id

        console.log(data)
        console.log(fileul)
        this.fileuls.push(data);
      });
    }
  };

}
</script>
