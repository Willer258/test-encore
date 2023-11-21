<template>
    <b-container>
        <h2>Mes cotations</h2>
        <div class="d-flex w-100 justify-content-end ">
            <div>
                <b-button  variant="primary">
                Creer une cotation
            </b-button>
            </div>
            
        </div>

        <div class="mt-5 rounded-2 overflow-hidden">
            <b-table head-variant="light" 
      :tbody-transition-props="transProps"  sticky-header hover :items="items">



      <template #cell(action)="data" >
        <div class="w-50 d-flex">
            <b-button  class="mr-2">
                Continuer
        </b-button>

        <b-button class="ms-3" variant="danger"> {{ data.value }} Supprimer</b-button>
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
  import { CONTRACT_STATUS } from '@/services/Helper';
  
  @Options({
    components: {
      HelloWorld,
    },
    
  })
  export default class CotationView extends Vue {
    contrats: any[] = [];
    categories: any[] = [];
    defaultFilter = [
      {
        label: "Tous mes contrats", 
        filter: {
          status: CONTRACT_STATUS.ONGOING,
        },
      },
      {
        label: "Expiré", 
        filter: {
          status: CONTRACT_STATUS.TERMINATED,
        },
      },
    ];

    transProps= {
          // Transition name
          name: 'flip-list'
        }

     items =  [
          { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
          { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
          { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
          { type_de_cotation: 40, date: 'Dickerson', progession: 'Macdonald' , action:'d'},
        //   { age: 21, first_name: 'Larsen', last_name: 'Shaw', action:'' },
        //   { age: 89, first_name: 'Geneva', last_name: 'Wilson', action:'' },
        //   { age: 38, first_name: 'Jami', last_name: 'Carney', action:'' }
        ]




    mounted() {
      // auth.logout();
      this.loadBranchCategories();
      this.loadContract();
      console.log(this.contrats, this.categories);
    }
  
    async loadContract(){
      try {
        const res = await api.get(api.core, "selfcare/contracts");
        //console.log(res.data)
        if (res && res.data && res.data.contracts) {
          //console.log(res.data.contracts.length + " contracts loaded");
          this.contrats = res.data.contracts
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
          this.categories = res.data.categories
          //console.log(res.data.categories.length + " categories loaded");
        }
      } catch (e) {
        console.log(e);
      }
    }
 
  }
  </script>
  